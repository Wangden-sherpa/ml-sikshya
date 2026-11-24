"""ML Sikshya — private token server for the Live Human Tutor (Nuance Labs).

Why: a Nuance API key (nk_...) must never be put inside a website. This tiny server runs ONLY on your own PC,
keeps the key secret, and gives the website a short-lived session token (st_...) that is good for one conversation.

Where the key lives (never in this project, never on GitHub):
  1. the environment variable NUANCE_API_KEY, or
  2. the file  %USERPROFILE%\\.ml-sikshya\\nuance_key.txt   (Windows)  /  ~/.ml-sikshya/nuance_key.txt

Run:   python tools/nuance_token_server.py      (or double-click tools\\start-live-tutor.bat)
Then open ML Sikshya and press "Live human tutor".  Stop with Ctrl+C.

Only pages from the origins in ALLOWED_ORIGINS may ask for tokens, and the server only listens on 127.0.0.1,
so other computers and other websites cannot use your key.
"""
import hashlib
import json
import os
import platform
import sys
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = int(os.environ.get("ML_SIKSHYA_TOKEN_PORT", "8787"))
API = "https://api.nuancelabs.ai/session-tokens"
ALLOWED_ORIGINS = {
    "http://localhost:8770",
    "http://127.0.0.1:8770",
    "https://wangdencerpa12345-star.github.io",
} | {o.strip() for o in os.environ.get("ML_SIKSHYA_ORIGINS", "").split(",") if o.strip()}
PERSONAS = {"sam", "sonia", "mira"}
KEY_FILE = Path.home() / ".ml-sikshya" / "nuance_key.txt"


def load_key():
    key = os.environ.get("NUANCE_API_KEY", "").strip()
    if not key and KEY_FILE.exists():
        key = KEY_FILE.read_text(encoding="utf-8").strip()
    return key


class Handler(BaseHTTPRequestHandler):
    server_version = "MLSikshyaToken/1.0"

    def _origin_ok(self):
        return self.headers.get("Origin") in ALLOWED_ORIGINS

    def _cors(self):
        origin = self.headers.get("Origin")
        if origin in ALLOWED_ORIGINS:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Allow-Private-Network", "true")
            self.send_header("Access-Control-Max-Age", "600")

    def _json(self, status, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204 if self._origin_ok() else 403)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        if self.path.split("?")[0] != "/health":
            return self._json(404, {"error": "not_found"})
        if not self._origin_ok():
            return self._json(403, {"error": "origin_not_allowed"})
        self._json(200, {"ok": True, "key": bool(load_key())})

    def do_POST(self):
        if self.path.split("?")[0] != "/token":
            return self._json(404, {"error": "not_found"})
        if not self._origin_ok():
            return self._json(403, {"error": "origin_not_allowed"})
        key = load_key()
        if not key:
            return self._json(500, {"error": "no_key", "message": f"Put your nk_ key in {KEY_FILE} or NUANCE_API_KEY."})
        try:
            length = min(int(self.headers.get("Content-Length", "0")), 200_000)
            req = json.loads(self.rfile.read(length) or b"{}")
        except (ValueError, json.JSONDecodeError):
            return self._json(400, {"error": "bad_json"})

        persona = str(req.get("persona_id", "sam")).lower()
        if persona not in PERSONAS:
            persona = "sam"
        prompt = str(req.get("system_prompt", "")).strip()[:12000] or "You are a warm, patient teacher."
        try:
            expressiveness = max(0.0, min(2.0, float(req.get("expressiveness", 1.0))))
        except (TypeError, ValueError):
            expressiveness = 1.0
        payload = {
            "interface": "nuance_live",
            "personality": {"system_prompt": prompt, "persona_id": persona},
            "interface_setup": {"video": {"input": {"camera": bool(req.get("camera", False))}}},
            "expressiveness": expressiveness,
            "end_user_id": "mls-" + hashlib.sha256(platform.node().encode()).hexdigest()[:24],
        }
        api_req = urllib.request.Request(
            API, data=json.dumps(payload).encode("utf-8"), method="POST",
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(api_req, timeout=20) as r:
                data = json.loads(r.read() or b"{}")
            self._json(200, {"token": data.get("token"), "expires_at": data.get("expires_at"), "warnings": data.get("warnings", [])})
        except urllib.error.HTTPError as e:
            try:
                detail = json.loads(e.read() or b"{}")
            except json.JSONDecodeError:
                detail = {}
            self._json(e.code, {"error": "nuance_error", "status": e.code, "detail": detail})
        except urllib.error.URLError as e:
            self._json(502, {"error": "network", "message": str(e.reason)})

    def log_message(self, fmt, *args):  # keep the console quiet and never print secrets
        sys.stderr.write("[token-server] %s %s\n" % (self.command, self.path))


if __name__ == "__main__":
    if not load_key():
        print(f"WARNING: No API key found. Save your nk_ key in: {KEY_FILE}")
    print(f"ML Sikshya private token server running on http://127.0.0.1:{PORT}  (Ctrl+C to stop)")
    print("   Allowed sites:", ", ".join(sorted(ALLOWED_ORIGINS)))
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()

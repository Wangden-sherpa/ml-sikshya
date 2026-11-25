"""ML Tutor - private token server for the Live AI video tutor (Nuance Labs "Nuance Live").

Why: a Nuance API key (nk_...) must never be put inside a website. This tiny server runs ONLY on your own PC,
keeps the key secret, and gives the website a short-lived session token (st_...) that is good for one conversation.

Where the key lives (never in this project, never on GitHub):
  1. the environment variable NUANCE_API_KEY, or
  2. the file  %USERPROFILE%\\.ml-sikshya\\nuance_key.txt   (Windows)  /  ~/.ml-sikshya/nuance_key.txt

Run:   python tools/nuance_token_server.py      (or double-click tools\\start-live-tutor.bat)
Then open ML Tutor and press "Live AI video tutor".  Stop with Ctrl+C.

Only pages from the origins in ALLOWED_ORIGINS may ask for tokens, and the server only listens on 127.0.0.1,
so other computers and other websites cannot use your key.

What a token sets up (fixed here on purpose, see https://docs.nuancelabs.ai):
  - The persona's prompt. It is the SAME text for every class: Nuance reviews each new prompt and limits how
    many new ones an organization may send per day, so the lesson and the student's code are sent during the
    class instead (as quiet notes and through the tools below), never baked into the prompt.
  - English only: the persona speaks English, and a prompt with other scripts is refused.
  - A "responses" delegation: a helper on Nuance's side calls the website's tools (read the lesson, see the
    student's code, open a lesson, show an example...). The page runs them; nothing here runs code.
  - The persona's own tools: end_call (it may hang up after saying goodbye) and call_time.
"""
import hashlib
import json
import os
import platform
import re
import sys
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = int(os.environ.get("ML_SIKSHYA_TOKEN_PORT", "8787"))
NUANCE_API = os.environ.get("NUANCE_API_URL", "https://api.nuancelabs.ai").rstrip("/")
ALLOWED_ORIGINS = {
    "http://localhost:8770",
    "http://127.0.0.1:8770",
    "https://wangdencerpa12345-star.github.io",
} | {o.strip() for o in os.environ.get("ML_SIKSHYA_ORIGINS", "").split(",") if o.strip()}
PERSONAS = {"sam": "Sam", "sonia": "Sonia", "mira": "Mira"}
KEY_FILE = Path.home() / ".ml-sikshya" / "nuance_key.txt"

# ---------------------------------------------------------------- the persona's prompt (English, fixed)
SYSTEM_PROMPT = """You are {name}, an AI teacher on ML Tutor, a free website where students learn machine learning \
from zero to professional. You are talking with one student on a live video call. Many students are from Nepal and \
are still learning English, so speak in simple, clear English and explain any new word.

How you teach: answer the question first in one or two sentences, then explain it with an everyday example. Keep \
each turn short, two to four spoken sentences, and ask a small question to check they understood. Speak in plain \
sentences: never read out lists, symbols, formulas or code. Be warm, patient and encouraging. If you are not sure \
about something, say so honestly and never make up facts.

You help with machine learning, data science, Python, maths and statistics, other school subjects and study skills.

Hand these requests to your helper, and say what you are starting, such as "Let me look at your code", not that it \
is already done:
- anything about what is on the student's screen: their current lesson, their code, its output or its error;
- anything about the website's lessons: which lessons exist, what a lesson says, what to learn next, their progress;
- opening a lesson for them;
- the meaning of a term from the course glossary;
- showing a code example. Whenever code would help, have it shown on their screen instead of saying it, then tell \
them to press the Run button and try it.

The website also sends you short notes about what the student does, such as opening a lesson or running code. Use \
them to help at the right moment. When the student says goodbye, say goodbye warmly and end the call."""

# ---------------------------------------------------------------- the helper (backend) and the page's tools
BACKEND_INSTRUCTIONS = """You are the helper of an AI teacher who is on a live voice call with a student on ML \
Tutor, a website for learning machine learning. You run tools on the website and write the answer the teacher \
will say.

Tools:
- get_page_context: what the student sees now: the page, the current lesson, their completed lessons, and their \
latest code run with its output or error. Use it for any question about their screen, their code or their error.
- list_lessons and get_progress: the course's lessons and what the student finished. Use them to find a lesson or \
suggest what to learn next.
- get_lesson: the text of one lesson, by its id from list_lessons. Read it before explaining that lesson.
- open_lesson: opens a lesson on the student's screen, by its id.
- lookup_term: the course glossary's definition of a term.
- show_code: puts a short, complete Python example on the student's screen with a Run button. Python runs in the \
browser with numpy, pandas, matplotlib, scikit-learn and scipy; PyTorch and TensorFlow are not available.

Your answer is spoken aloud by the teacher. Write two to four short, plain sentences in simple English, with no \
lists, symbols, markdown or code. Never put code in your answer: show it with show_code and say it is on the screen. \
If a tool fails or something is not found, say so plainly."""

_LESSON_ID = {"type": "string", "description": "The lesson's id, as list_lessons gives it, such as linear-regression."}
TOOLS = [
    {
        "type": "function", "name": "get_page_context",
        "description": "What the student sees right now: the page, the current lesson with an excerpt, their "
                       "completed lessons, and their latest code run with its output or error.",
        "parameters": {"type": "object", "properties": {}, "additionalProperties": False},
        "annotations": {"readOnlyHint": True},
    },
    {
        "type": "function", "name": "list_lessons",
        "description": "Every lesson of the course in order: id, title, level, minutes, and whether the student "
                       "finished it.",
        "parameters": {"type": "object", "properties": {}, "additionalProperties": False},
        "annotations": {"readOnlyHint": True},
    },
    {
        "type": "function", "name": "get_lesson",
        "description": "The full text of one lesson, to read before explaining it.",
        "parameters": {"type": "object", "properties": {"lesson_id": _LESSON_ID}, "required": ["lesson_id"],
                       "additionalProperties": False},
        "annotations": {"readOnlyHint": True},
    },
    {
        "type": "function", "name": "open_lesson",
        "description": "Opens a lesson on the student's screen.",
        "parameters": {"type": "object", "properties": {"lesson_id": _LESSON_ID}, "required": ["lesson_id"],
                       "additionalProperties": False},
        "annotations": {"idempotentHint": True},
    },
    {
        "type": "function", "name": "lookup_term",
        "description": "The course glossary's definition of a machine learning term, such as overfitting.",
        "parameters": {"type": "object", "properties": {"term": {"type": "string"}}, "required": ["term"],
                       "additionalProperties": False},
        "annotations": {"readOnlyHint": True},
    },
    {
        "type": "function", "name": "show_code",
        "description": "Shows a short, complete, runnable Python example on the student's screen with a Run "
                       "button. The student runs it themselves.",
        "parameters": {"type": "object", "properties": {
            "title": {"type": "string", "description": "A few words naming the example."},
            "code": {"type": "string", "description": "The Python code, complete and runnable."},
        }, "required": ["title", "code"], "additionalProperties": False},
        "annotations": {"idempotentHint": True},
    },
    {
        "type": "function", "name": "get_progress",
        "description": "How many lessons the student finished, and the next lesson to take.",
        "parameters": {"type": "object", "properties": {}, "additionalProperties": False},
        "annotations": {"readOnlyHint": True},
    },
]


def session_request(persona: str, camera: bool, expressiveness: float, end_user_id: str) -> dict:
    """The body of POST /session-tokens. Everything except the persona's look, the camera and the expressiveness
    is fixed, so Nuance reviews each setup once."""
    return {
        "interface": "nuance_live",
        "personality": {"system_prompt": SYSTEM_PROMPT.format(name=PERSONAS[persona]), "persona_id": persona},
        "interface_setup": {
            "delegation": {
                "type": "responses",
                "responses": {
                    "model": "default",
                    "instructions": BACKEND_INSTRUCTIONS,
                    "tools": TOOLS,
                    "reasoning": {"effort": "low"},   # quick answers on a live call
                },
            },
            "runtime_tools": {"end_call": True, "call_time": True},
            "video": {"input": {"camera": camera}},
        },
        "expressiveness": expressiveness,
        "end_user_id": end_user_id,
    }


def load_key():
    key = os.environ.get("NUANCE_API_KEY", "").strip()
    if not key and KEY_FILE.exists():
        key = KEY_FILE.read_text(encoding="utf-8").strip()
    return key


def end_user_id() -> str:
    # Our own id for the person (this computer), so a policy pause stops only this computer, never a name or email.
    return "mls-" + hashlib.sha256(platform.node().encode()).hexdigest()[:24]


class Handler(BaseHTTPRequestHandler):
    server_version = "MLSikshyaToken/2.0"

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
        self._json(200, {"ok": True, "key": bool(load_key()), "version": 2})

    def do_POST(self):
        if self.path.split("?")[0] != "/token":
            return self._json(404, {"error": "not_found"})
        if not self._origin_ok():
            return self._json(403, {"error": "origin_not_allowed"})
        key = load_key()
        if not key:
            return self._json(500, {"error": "no_key", "message": f"Put your nk_ key in {KEY_FILE} or NUANCE_API_KEY."})
        try:
            length = min(int(self.headers.get("Content-Length", "0")), 10_000)
            req = json.loads(self.rfile.read(length) or b"{}")
        except (ValueError, json.JSONDecodeError):
            return self._json(400, {"error": "bad_json"})
        if not isinstance(req, dict):
            return self._json(400, {"error": "bad_json"})

        persona = str(req.get("persona_id", "sam")).lower()
        if persona not in PERSONAS:
            persona = "sam"
        try:
            expressiveness = max(0.0, min(2.0, float(req.get("expressiveness", 1.0))))
        except (TypeError, ValueError):
            expressiveness = 1.0
        payload = session_request(persona, bool(req.get("camera", False)), expressiveness, end_user_id())
        api_req = urllib.request.Request(
            NUANCE_API + "/session-tokens", data=json.dumps(payload).encode("utf-8"), method="POST",
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(api_req, timeout=30) as r:
                data = json.loads(r.read() or b"{}")
            warnings = data.get("warnings") or []
            for w in warnings:   # e.g. a tool the session will run without: worth fixing here
                sys.stderr.write(f"[token-server] Nuance warning: {w}\n")
            self._json(200, {"token": data.get("token"), "expires_at": data.get("expires_at"), "warnings": warnings})
        except urllib.error.HTTPError as e:
            try:
                body = json.loads(e.read() or b"{}")
            except json.JSONDecodeError:
                body = {}
            body = body if isinstance(body, dict) else {}
            err = body.get("error") if isinstance(body.get("error"), dict) else {}
            code = body.get("code") or err.get("code")
            detail = body.get("detail") or err.get("message") or ""
            if not isinstance(detail, str):
                detail = json.dumps(detail)[:500]
            sys.stderr.write(f"[token-server] Nuance answered {e.code} {code or ''}: {detail[:300]}\n")
            self._json(e.code, {"error": "nuance_error", "status": e.code, "code": code, "detail": detail[:500],
                                "retry_after_seconds": body.get("retry_after_seconds")})
        except urllib.error.URLError as e:
            self._json(502, {"error": "network", "message": str(e.reason)})

    def log_message(self, fmt, *args):  # keep the console quiet and never print secrets
        sys.stderr.write("[token-server] %s %s\n" % (self.command, self.path))


def check_setup():
    """Checks the fixed setup against Nuance Live's documented limits (run on start, and by the tests)."""
    problems = []
    for name in PERSONAS.values():
        prompt = SYSTEM_PROMPT.format(name=name)
        if not prompt.isascii():
            problems.append("the prompt must be English only (ASCII)")
    if not BACKEND_INSTRUCTIONS.isascii() or len(BACKEND_INSTRUCTIONS) > 65_536:
        problems.append("backend instructions must be English and at most 65,536 characters")
    names = [t["name"] for t in TOOLS]
    if len(TOOLS) > 16 or len(set(names)) != len(names):
        problems.append("at most 16 tools, with unique names")
    reserved = {"ask_user", "call_time", "do_expression", "do_gaze", "get_current_time", "stay_quiet",
                "switch_identity", "web_extractor", "web_search"}
    for t in TOOLS:
        if not re.fullmatch(r"[A-Za-z0-9_-]{1,64}", t["name"]) or t["name"] in reserved:
            problems.append(f"bad tool name {t['name']}")
        if len(t.get("description", "")) > 2000 or not json.dumps(t).isascii():
            problems.append(f"tool {t['name']}: description too long or not English")
        if t["parameters"].get("type") != "object" or len(json.dumps(t["parameters"], separators=(",", ":"))) > 16_000:
            problems.append(f"tool {t['name']}: parameters must be an object schema under 16,000 characters")
    if not re.fullmatch(r"[A-Za-z0-9_.:-]{1,128}", end_user_id()):
        problems.append("end_user_id has characters Nuance does not accept")
    return problems


if __name__ == "__main__":
    for p in check_setup():
        print("SETUP PROBLEM:", p)
    if not load_key():
        print(f"WARNING: No API key found. Save your nk_ key in: {KEY_FILE}")
    print(f"ML Tutor private token server running on http://127.0.0.1:{PORT}  (Ctrl+C to stop)")
    print("   Allowed sites:", ", ".join(sorted(ALLOWED_ORIGINS)))
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()

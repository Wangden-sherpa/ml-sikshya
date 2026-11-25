/* ML Tutor — 👂 Hearing for the AI teachers: works in every modern browser, free, on the student's own device.
   1. Noise suppression: the microphone opens with the browser's WebRTC noise suppression, echo cancellation and
      auto gain, then a voice-band filter (85 Hz – 7.5 kHz) removes hum, rumble and hiss.
   2. Voice activity detection: Silero VAD (a small neural network) decides when someone is really speaking,
      so fans, traffic, keyboards and room noise never start a recording.
   3. A clean audio buffer: 400 ms of audio from before the speech started is kept, and the end of a sentence
      waits for a short pause, so words aren't cut off at the start or end.
   4. Speech-to-text: OpenAI's Whisper model, running in the browser (transformers.js), English, Nepali, Chinese
      and many more languages. It downloads once (about 80 MB) and is cached.
   MLS.Hearing.Recognizer behaves like the browser's SpeechRecognition (start/stop/abort, onresult, onend...),
   so the teacher's chat, talk mode and face-to-face call use it unchanged. */
(() => {
  const MLS = window.MLS;
  const { u, toast } = MLS;
  const ORT = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/';
  const VAD = 'https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.31/dist/';
  const TRANSFORMERS = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1/+esm';

  Object.assign(MLS.UI, {
    earLoading: { en: '👂 Getting the teacher\'s ears ready (about 80 MB, only once)…', ne: '👂 शिक्षकका कान तयार हुँदै (करिब 80 MB, एकपटक मात्र)…', zh: '👂 正在准备老师的“耳朵”（约 80 MB，仅一次）…' },
    earReady: { en: '👂 Your teacher can hear you now', ne: '👂 अब शिक्षकले तपाईंलाई सुन्न सक्नुहुन्छ', zh: '👂 老师现在能听到你了' },
    earFail: { en: 'The speech recogniser could not start on this device', ne: 'यो उपकरणमा बोली पहिचान सुरु हुन सकेन', zh: '语音识别无法在此设备上启动' },
  });

  // Sensitivity → how sure Silero must be that it is speech, and how long speech must last.
  const SENS = {
    high: { positiveSpeechThreshold: 0.35, negativeSpeechThreshold: 0.2, minSpeechMs: 200 },
    normal: { positiveSpeechThreshold: 0.5, negativeSpeechThreshold: 0.35, minSpeechMs: 280 },
    low: { positiveSpeechThreshold: 0.7, negativeSpeechThreshold: 0.5, minSpeechMs: 400 },
  };
  const H = { vad: null, vadP: null, asr: null, asrP: null, current: null, last: null, speaking: false, sens: 'normal', model: 'onnx-community/whisper-base', state: 'idle' };

  const loadScript = (src) => new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s);
  });

  // ---------- 1. Clean microphone: WebRTC processing + voice-band filter ----------
  let filterCtx = null;
  async function cleanStream() {
    const raw = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
    try {
      filterCtx = filterCtx && filterCtx.state !== 'closed' ? filterCtx : new (window.AudioContext || window.webkitAudioContext)();
      const src = filterCtx.createMediaStreamSource(raw);
      const hp = filterCtx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 85; hp.Q.value = 0.7;
      const lp = filterCtx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 7500; lp.Q.value = 0.7;
      const out = filterCtx.createMediaStreamDestination();
      src.connect(hp); hp.connect(lp); lp.connect(out);
      if (filterCtx.state === 'suspended') filterCtx.resume().catch(() => {});
      out.stream._raw = raw;   // to stop the real microphone later
      return out.stream;
    } catch { return raw; }
  }
  const stopStream = (st) => { if (!st) return; (st._raw || st).getTracks().forEach((t) => t.stop()); st.getTracks().forEach((t) => t.stop()); };

  // ---------- 2 + 3. Silero voice activity detection with a pre-speech buffer ----------
  function loadVAD() {
    if (H.vadP) return H.vadP;
    H.vadP = loadScript(ORT + 'ort.wasm.min.js')
      .then(() => loadScript(VAD + 'bundle.min.js'))
      .then(() => window.vad.MicVAD.new({
        model: 'v5',
        baseAssetPath: VAD,
        onnxWASMBasePath: ORT,
        startOnLoad: false,
        getStream: cleanStream,
        pauseStream: async (st) => stopStream(st),
        resumeStream: async () => cleanStream(),
        ...SENS[H.sens],
        preSpeechPadMs: 400,          // keep the start of the first word
        redemptionMs: 900,            // wait this long in silence before deciding the sentence ended
        submitUserSpeechOnPause: true,
        onSpeechStart: () => { H.speaking = true; },
        onSpeechRealStart: () => { const r = H.current || H.last; if (r) r._speechStart(); },
        onVADMisfire: () => { H.speaking = false; },
        onSpeechEnd: (audio) => { H.speaking = false; const r = H.current || H.last; if (r) r._speechEnd(audio); },
      }))
      .then((v) => (H.vad = v))
      .catch((e) => { H.vadP = null; throw e; });
    return H.vadP;
  }

  // ---------- 4. Whisper speech-to-text in the browser ----------
  const WHISPER_LANG = { en: 'english', ne: 'nepali', hi: 'hindi', zh: 'chinese', ja: 'japanese', ko: 'korean', es: 'spanish', fr: 'french', de: 'german', ar: 'arabic', ru: 'russian', bn: 'bengali', pt: 'portuguese', it: 'italian', ur: 'urdu', ta: 'tamil', te: 'telugu', th: 'thai', vi: 'vietnamese', id: 'indonesian', tr: 'turkish' };
  function loadASR() {
    if (H.asrP) return H.asrP;
    let told = false;
    const progress_callback = (p) => { if (!told && p && p.status === 'progress') { told = true; toast(u('earLoading')); } };
    H.state = 'loading';
    H.asrP = import(TRANSFORMERS).then(async (T) => {
      const make = (opts) => T.pipeline('automatic-speech-recognition', H.model, { ...opts, progress_callback });
      if (navigator.gpu) {
        try { return await make({ device: 'webgpu', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q4' } }); } catch (e) { console.warn('Whisper on WebGPU failed, using WASM', e); }
      }
      return make({ device: 'wasm', dtype: 'q8' });
    }).then((p) => { H.asr = p; H.state = 'ready'; if (told) toast(u('earReady')); return p; })
      .catch((e) => { H.asrP = null; H.state = 'error'; toast(`${u('earFail')}: ${e.message || e}`); throw e; });
    return H.asrP;
  }
  // Whisper sometimes "hears" these in silence or noise: never send them as a question.
  const HALLUCINATION = /^(thank you\.?|thanks( for watching)?[.!]?|you|bye\.?|okay\.?|\.+|…|subtitles? by.*|(please )?subscribe.*|transcribed by.*|amara\.org.*|谢谢观看.*|字幕.*|请不吝点赞.*)$/i;
  let asrChain = Promise.resolve();
  async function transcribe(audio, lang) {
    if (!audio || audio.length < 16000 * 0.25) return '';
    const asr = await loadASR();
    const language = WHISPER_LANG[String(lang || '').slice(0, 2).toLowerCase()];
    const job = asrChain.then(() => asr(audio, { language, task: 'transcribe', chunk_length_s: 30 }));
    asrChain = job.catch(() => {});
    const out = await job;
    let text = String((out && out.text) || '').replace(/\[[^\]]*\]|\([^)]*\)|♪/g, ' ').replace(/\s+/g, ' ').trim();
    if (!text || HALLUCINATION.test(text)) return '';
    return text;
  }

  // ---------- A SpeechRecognition-compatible recogniser ----------
  const result = (text) => { const alt = { transcript: text, confidence: 0 }; const r = [alt]; r.isFinal = true; return r; };
  class Recognizer {
    constructor() { this.lang = 'en-US'; this.continuous = false; this.interimResults = false; this.maxAlternatives = 1; this._active = false; }
    start() {
      if (this._active) throw new DOMException('Recognition has already started.', 'InvalidStateError');
      Object.assign(this, { _active: true, _ending: false, _done: false, _pending: 0, _heard: false, _results: [] });
      if (H.current && H.current !== this) H.current.abort();
      H.current = this; H.last = this;
      loadASR().catch(() => {});                       // start downloading the ears right away
      loadVAD().then((v) => (this._active ? v.start() : null)).then(() => {
        if (!this._active) return;
        this.onstart && this.onstart({});
        this._arm();
      }).catch((e) => {
        console.warn('Hearing could not start:', e);
        this._error(e && e.name === 'NotAllowedError' ? 'not-allowed' : 'audio-capture');
        this._finish();
      });
    }
    _arm() {   // like the browser recogniser: give up after a while if nobody speaks
      clearTimeout(this._idle);
      if (!this.continuous) this._idle = setTimeout(() => { if (this._active && !this._heard && !this._pending && !H.speaking) { this._error('no-speech'); this._finish(); } }, 9000);
    }
    _speechStart() {
      if (!this._active) return;
      this._heard = true; clearTimeout(this._idle);
      this.onspeechstart && this.onspeechstart({});
      if (this.interimResults && this.onresult) this.onresult({ resultIndex: this._results.length, results: [...this._results, Object.assign([{ transcript: '…', confidence: 0 }], { isFinal: false })] });
    }
    async _speechEnd(audio) {
      if (!this._active) return;
      this._pending++;
      let text = '';
      try { text = await transcribe(audio, this.lang); } catch (e) { console.warn('Transcription failed', e); }
      this._pending--;
      if (this._done) return;
      if (text) {
        this._results.push(result(text));
        this.onresult && this.onresult({ resultIndex: this._results.length - 1, results: this._results });
      } else if (this.interimResults && this.onresult) {
        this.onresult({ resultIndex: this._results.length, results: [...this._results, Object.assign([{ transcript: '', confidence: 0 }], { isFinal: false })] });
      }
      if (!this.continuous || this._ending) { if (!this._pending) this._finish(); }
      else this._arm();
    }
    stop() {   // finish the sentence being spoken, then end
      if (!this._active || this._ending) return;
      this._ending = true;
      if (H.speaking && H.vad) H.vad.pause();          // submitUserSpeechOnPause sends what was said so far
      else if (!this._pending) { this._finish(); return; }
      setTimeout(() => { if (!this._pending) this._finish(); }, 1500);   // a too-short sound sends nothing: end anyway
    }
    abort() { if (this._active) this._finish(); }
    _error(code) { this.onerror && this.onerror({ error: code }); }
    _finish() {
      if (this._done) return;
      this._done = true; this._active = false; clearTimeout(this._idle);
      if (H.current === this) { H.current = null; if (H.vad) H.vad.pause(); }
      this.onend && this.onend({});
    }
  }

  MLS.Hearing = {
    Recognizer,
    supported: () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.WebAssembly && window.AudioWorkletNode),
    preload: () => { loadASR().catch(() => {}); loadVAD().catch(() => {}); },
    setSensitivity: (k) => { if (!SENS[k]) return; H.sens = k; if (H.vad) H.vad.setOptions(SENS[k]); },
    setModel: (id) => { if (id && id !== H.model) { H.model = id; H.asr = null; H.asrP = null; H.state = 'idle'; } },
    state: () => ({ ears: H.state, vad: !!H.vad, speaking: H.speaking, model: H.model }),
    transcribe,
  };
})();

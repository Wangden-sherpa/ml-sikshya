/* ML Sikshya — 🎥 Live Human Tutor (Nuance Labs "Nuance Live").
   A real-time, human-like video teacher that sees, hears and talks back.
   Private to the owner: the nk_ API key never touches this website — a token server on the owner's own PC
   (tools/nuance_token_server.py) hands the page a one-conversation st_ token. Visitors never see this feature. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast, store } = MLS;
  const SERVER = 'http://127.0.0.1:8787';
  const SDK_URL = 'https://esm.sh/@nuancelabs/js-sdk';

  Object.assign(MLS.UI, {
    liveBtn: { en: '🎥 Live human tutor', ne: '🎥 प्रत्यक्ष मानव शिक्षक', zh: '🎥 真人实时老师' },
    liveTitle: { en: 'Live human tutor', ne: 'प्रत्यक्ष मानव शिक्षक', zh: '真人实时老师' },
    liveIntro: { en: 'A real-time, human-like video teacher. Talk naturally — interrupt any time — and ask anything.', ne: 'वास्तविक समयमा मानव जस्तै भिडियो शिक्षक। स्वाभाविक रूपमा बोल्नुहोस् — जुनसुकै बेला रोक्नुहोस् — र जे पनि सोध्नुहोस्।', zh: '实时、像真人一样的视频老师。自然地说话——随时可以打断——想问什么都行。' },
    liveOwner: { en: 'Live human tutor (owner only)', ne: 'प्रत्यक्ष मानव शिक्षक (मालिक मात्र)', zh: '真人实时老师（仅限所有者）' },
    liveOwnerHelp: { en: 'Turn on only on your own computer, where the private key server (tools\\start-live-tutor.bat) runs. Your API key stays on your PC.', ne: 'आफ्नै कम्प्युटरमा मात्र सुरु गर्नुहोस्, जहाँ निजी key सर्भर (tools\\start-live-tutor.bat) चल्छ। तपाईंको API key तपाईंकै PC मा रहन्छ।', zh: '只在你自己的电脑上开启（需运行私有密钥服务器 tools\\start-live-tutor.bat）。API 密钥只保存在你的电脑上。' },
    liveOwnerOn: { en: 'This is my computer — show the live tutor', ne: 'यो मेरो कम्प्युटर हो — प्रत्यक्ष शिक्षक देखाउनुहोस्', zh: '这是我的电脑——显示真人老师' },
    livePersona: { en: 'Choose a teacher', ne: 'शिक्षक छान्नुहोस्', zh: '选择老师' },
    liveCam: { en: 'Let the teacher see me (camera)', ne: 'शिक्षकले मलाई देख्न सकून् (क्यामेरा)', zh: '让老师看到我（摄像头）' },
    liveStart: { en: '▶ Start live class', ne: '▶ प्रत्यक्ष कक्षा सुरु', zh: '▶ 开始实时课堂' },
    liveChecking: { en: 'Checking your private key server…', ne: 'तपाईंको निजी key सर्भर जाँच्दै…', zh: '正在检查你的私有密钥服务器…' },
    liveOff: { en: 'The private key server is not running. Double-click tools\\start-live-tutor.bat in the ML Sikshya folder, then press Start again.', ne: 'निजी key सर्भर चलिरहेको छैन। ML Sikshya फोल्डरको tools\\start-live-tutor.bat डबल-क्लिक गरेर फेरि Start थिच्नुहोस्।', zh: '私有密钥服务器没有运行。请在 ML Sikshya 文件夹中双击 tools\\start-live-tutor.bat，然后再按开始。' },
    liveNoKey: { en: 'The key server is running but has no API key. Save your nk_ key in %USERPROFILE%\\.ml-sikshya\\nuance_key.txt', ne: 'Key सर्भर चलिरहेको छ तर API key छैन। आफ्नो nk_ key %USERPROFILE%\\.ml-sikshya\\nuance_key.txt मा सेभ गर्नुहोस्', zh: '密钥服务器在运行，但没有 API 密钥。请把 nk_ 密钥保存到 %USERPROFILE%\\.ml-sikshya\\nuance_key.txt' },
    liveConnecting: { en: 'Connecting to your teacher…', ne: 'शिक्षकसँग जोडिँदै…', zh: '正在连接老师…' },
    liveQueued: { en: 'Waiting for a free teacher…', ne: 'खाली शिक्षक पर्खँदै…', zh: '正在等待空闲的老师…' },
    livePreparing: { en: 'Your teacher is getting ready…', ne: 'शिक्षक तयार हुँदै हुनुहुन्छ…', zh: '老师正在准备…' },
    liveReady: { en: 'Say hello! 👋', ne: 'नमस्ते भन्नुहोस्! 👋', zh: '打个招呼吧！👋' },
    liveEnded: { en: 'Class ended', ne: 'कक्षा सकियो', zh: '课堂已结束' },
    liveTypePh: { en: 'Type a message to your teacher…', ne: 'शिक्षकलाई सन्देश लेख्नुहोस्…', zh: '给老师发消息…' },
    livePoor: { en: 'Weak internet connection…', ne: 'इन्टरनेट कमजोर छ…', zh: '网络连接较弱…' },
    liveLeft: { en: 'left', ne: 'बाँकी', zh: '剩余' },
    liveErr409: { en: 'Too many live classes are open at once. Close other tabs and try again.', ne: 'एकैपटक धेरै प्रत्यक्ष कक्षा खुला छन्। अरू tab बन्द गरेर फेरि प्रयास गर्नुहोस्।', zh: '同时打开的实时课堂太多。请关闭其他标签页后重试。' },
    liveErr429: { en: 'Your Nuance credits or hourly limit are used up for now. Try again later.', ne: 'तपाईंको Nuance credit वा घण्टाको सीमा अहिलेलाई सकियो। पछि प्रयास गर्नुहोस्।', zh: '你的 Nuance 额度或每小时次数已用完，请稍后再试。' },
    liveErr403: { en: 'Nuance needs you to accept its developer agreement (and verify your phone) on platform.nuancelabs.ai first.', ne: 'पहिले platform.nuancelabs.ai मा Nuance को developer सम्झौता स्वीकार (र फोन प्रमाणित) गर्नुपर्छ।', zh: '需要先在 platform.nuancelabs.ai 接受 Nuance 开发者协议（并验证手机号）。' },
    liveErr503: { en: 'Nuance is busy right now. Try again in a minute.', ne: 'Nuance अहिले व्यस्त छ। एक मिनेटमा फेरि प्रयास गर्नुहोस्।', zh: 'Nuance 当前繁忙，请一分钟后再试。' },
    liveErrGen: { en: 'Could not start the live class', ne: 'प्रत्यक्ष कक्षा सुरु हुन सकेन', zh: '无法开始实时课堂' },
  });

  const PERSONAS = [['sam', 'Sam'], ['sonia', 'Sonia'], ['mira', 'Mira']];
  const isOwner = () => store.get('live-owner', false);
  MLS.liveEnabled = isOwner;

  function lessonBit() {
    if (MLS.route !== 'learn') return MLS.route ? `They are on the "${MLS.route}" page of the website.` : '';
    const L = window.COURSE.lessons.find((l) => l.id === MLS.routeArg); if (!L) return '';
    const d = document.createElement('div'); d.innerHTML = t(L.body);
    return `They are studying the lesson "${L.title.en}". Lesson summary: ${d.textContent.replace(/\s+/g, ' ').slice(0, 1400)}`;
  }
  const LANG = { en: 'English', ne: 'Nepali', zh: 'Mandarin Chinese' };
  const systemPrompt = () => `You are a warm, patient, brilliant private teacher on "ML Sikshya", a free learning website, talking face to face with one learner on a live video call. Speak exactly like a real human teacher: natural, friendly, short spoken turns (2–5 sentences), react to what they say, ask them questions back, and check they understood. Never read out lists, code or symbols — describe ideas in words.
You can help with ANY question: machine learning and AI (your speciality), maths, science, coding, school and university subjects, careers, study skills and everyday life. If you are not sure about a fact, say so honestly.
Language: reply in the language the learner speaks (English, Nepali, Chinese, Hindi or any other). Default: ${MLS.extLang ? MLS.extLang.name : LANG[MLS.S.lang] || 'English'}.
${lessonBit()}
${MLS.lastRun && MLS.lastRun.err && Date.now() - MLS.lastRun.at < 1800000 ? 'Their last code failed with: ' + MLS.lastRun.err.split('\n').slice(-2).join(' ').slice(0, 300) : ''}`;

  async function serverStatus() {
    try {
      const r = await fetch(SERVER + '/health', { cache: 'no-store' });
      if (!r.ok) return 'off';
      return (await r.json()).key ? 'ok' : 'nokey';
    } catch { return 'off'; }
  }
  function errText(e) {
    const s = e && (e.status || (e.detail && e.detail.status));
    const code = String((e && (e.code || e.message)) || '');
    if (s === 409 || /concurrency/.test(code)) return u('liveErr409');
    if (s === 429 || /credits|start_limit/.test(code)) return u('liveErr429');
    if (s === 403 || /legal_required/.test(code)) return u('liveErr403');
    if (s === 503 || /busy|capacity/.test(code)) return u('liveErr503');
    return `${u('liveErrGen')}: ${esc(code || 'unknown error')}`;
  }

  let live = null;
  function openLive() {
    if (live) return;
    MLS.closeTutorPanel && MLS.closeTutorPanel();
    const el = h(`<div class="call live">
      <div class="call-top"><span class="call-live">● LIVE</span><b>${u('liveTitle')}</b><span class="call-mode live-timer"></span></div>
      <div class="live-stage">
        <video class="live-video" autoplay playsinline></video><audio class="live-audio" autoplay></audio>
        <div class="live-pre card">
          <div class="live-pre-av">${MLS.avatarSVG()}</div>
          <h2>${u('liveTitle')}</h2><p class="muted">${u('liveIntro')}</p>
          <b>${u('livePersona')}</b>
          <div class="persona-pick">${PERSONAS.map(([id, n]) => `<button data-p="${id}" class="${store.get('live-persona', 'sam') === id ? 'on' : ''}">${n}</button>`).join('')}</div>
          <label class="chk small"><input type="checkbox" class="live-cam" ${store.get('live-cam', false) ? 'checked' : ''}> ${u('liveCam')}</label>
          <button class="btn live-go">${u('liveStart')}</button>
          <div class="live-msg small"></div>
        </div>
        <div class="live-status"></div>
        <div class="call-caption bot"></div><div class="call-caption you"></div>
      </div>
      <form class="live-type" hidden><input placeholder="${u('liveTypePh')}"><button class="btn sm">➤</button></form>
      <div class="call-bar"><button class="cb mic on" title="Microphone" hidden>🎙️</button><button class="cb end" title="End">📞</button></div>
    </div>`);
    document.body.appendChild(el);
    live = { el, conv: null, muted: false, botText: '', clearT: 0 };
    el.querySelectorAll('.persona-pick button').forEach((b) => (b.onclick = () => { store.set('live-persona', b.dataset.p); el.querySelectorAll('.persona-pick button').forEach((x) => x.classList.toggle('on', x === b)); }));
    el.querySelector('.live-go').onclick = start;
    el.querySelector('.cb.end').onclick = endLive;
    el.querySelector('.cb.mic').onclick = toggleMute;
    el.querySelector('.live-type').onsubmit = (e) => { e.preventDefault(); const i = e.target.querySelector('input'); sendText(i.value); i.value = ''; };
    document.addEventListener('keydown', escLive);
  }
  const escLive = (e) => { if (e.key === 'Escape') endLive(); };
  const status = (txt) => { if (live) live.el.querySelector('.live-status').textContent = txt || ''; };
  const caption = (who, txt) => { if (live) live.el.querySelector('.call-caption.' + who).textContent = txt; };

  async function start() {
    const msg = live.el.querySelector('.live-msg'), go = live.el.querySelector('.live-go');
    go.disabled = true; msg.textContent = u('liveChecking');
    const st = await serverStatus();
    if (st !== 'ok') { msg.textContent = st === 'nokey' ? u('liveNoKey') : u('liveOff'); go.disabled = false; return; }
    const persona = store.get('live-persona', 'sam'), camera = live.el.querySelector('.live-cam').checked;
    store.set('live-cam', camera);
    try {
      msg.textContent = u('liveConnecting');
      const mod = await import(SDK_URL);
      const create = mod.createNuanceConversation || (mod.default && mod.default.createNuanceConversation);
      const conv = create({
        token: async () => {
          const r = await fetch(SERVER + '/token', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ persona_id: persona, system_prompt: systemPrompt(), expressiveness: 1.2, camera }) });
          const j = await r.json().catch(() => ({}));
          if (!r.ok || !j.token) throw Object.assign(new Error((j.detail && (j.detail.error || j.detail.code)) || j.error || 'token_failed'), { status: r.status, detail: j.detail });
          return j.token;
        },
        maxSessionSeconds: 900,
        mediaDevices: { cameraEnabled: camera },
      });
      live.conv = conv;
      conv.onChange((ev) => onChange(ev));
      if (conv.onInterfaceEvent) conv.onInterfaceEvent((ev) => onEvent(ev));
      live.el.classList.add('connecting');
      status(u('liveConnecting'));
      await conv.connect();
      live.el.querySelector('.live-pre').hidden = true;
      live.el.querySelector('.cb.mic').hidden = false;
      live.el.querySelector('.live-type').hidden = false;
    } catch (e) {
      console.error(e);
      msg.innerHTML = errText(e); go.disabled = false;
      live.el.classList.remove('connecting');
      try { live.conv && live.conv.disconnect(); } catch { /* ignore */ }
    }
  }
  function attachTracks() {
    const c = live && live.conv; if (!c) return;
    let av = null; try { av = c.avatar; } catch { return; }
    if (!av) return;
    const v = av.videoTrack, a = av.audioTrack;
    try { if (v && v.attach) v.attach(live.el.querySelector('.live-video')); } catch (e) { console.warn(e); }
    try { if (a && a.attach) a.attach(live.el.querySelector('.live-audio')); } catch (e) { console.warn(e); }
  }
  function onChange(ev) {
    if (!live || !ev) return;
    switch (ev.type) {
      case 'state-changed':
        if (ev.state === 'queued') status(u('liveQueued'));
        else if (ev.state === 'connecting') status(u('liveConnecting'));
        else if (ev.state === 'failed') { status(u('liveErrGen')); }
        else if (ev.state === 'disconnected') status(u('liveEnded'));
        break;
      case 'avatar-preparing': status(u('livePreparing')); break;
      case 'tracks-changed': attachTracks(); break;
      case 'avatar-ready': case 'avatar-presented': attachTracks(); live.el.classList.remove('connecting'); live.el.classList.add('on-air'); status(u('liveReady')); setTimeout(() => status(''), 3000); break;
      case 'speaking-changed':
        if (ev.participant === 'user') live.el.classList.toggle('user-speaking', !!ev.isSpeaking);
        else live.el.classList.toggle('persona-speaking', !!(ev.isSpeaking ?? ev.speaking));
        break;
      case 'time-remaining': {
        const s = ev.seconds ?? ev.secondsRemaining ?? ev.seconds_remaining ?? ev.remaining;
        if (typeof s === 'number') live.el.querySelector('.live-timer').textContent = `⏱ ${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')} ${u('liveLeft')}`;
        break;
      }
      case 'network-changed': case 'link-poor': if (ev.quality === 'poor' || ev.type === 'link-poor') status(u('livePoor')); break;
      case 'session-ended': status(`${u('liveEnded')}${ev.reason ? ' · ' + ev.reason : ''}`); live.el.classList.remove('on-air'); break;
      default: break;
    }
  }
  function onEvent(ev) {
    if (!live || !ev) return;
    if (ev.type === 'session.output_transcript.delta') {
      clearTimeout(live.clearT);
      live.botText = (live.botText + (ev.delta || '')).slice(-260);
      caption('bot', live.botText);
    } else if (ev.type === 'session.output_audio.done') {
      live.clearT = setTimeout(() => { live.botText = ''; caption('bot', ''); }, 2600);
    } else if (ev.type === 'session.input_transcript.delta') {
      live.youText = ((live.youText || '') + (ev.delta || '')).slice(-200); caption('you', live.youText);
    } else if (ev.type === 'session.input_transcript.done') {
      caption('you', ev.transcript || live.youText || ''); live.youText = '';
      setTimeout(() => caption('you', ''), 2500);
    }
  }
  function toggleMute() {
    if (!live || !live.conv) return;
    live.muted = !live.muted;
    try { live.conv.sendInterfaceEvent({ type: live.muted ? 'session.input_audio.mute' : 'session.input_audio.unmute' }); } catch (e) { console.warn(e); }
    const b = live.el.querySelector('.cb.mic'); b.classList.toggle('on', !live.muted); b.textContent = live.muted ? '🔇' : '🎙️';
  }
  function sendText(text) {
    text = (text || '').trim(); if (!text || !live || !live.conv) return;
    caption('you', text); setTimeout(() => caption('you', ''), 3000);
    try {
      live.conv.sendInterfaceEvent({ type: 'response.item.create', item: { type: 'message', role: 'user', content: text } });
      live.conv.sendInterfaceEvent({ type: 'response.create' });
    } catch (e) { console.warn(e); toast(u('liveErrGen')); }
  }
  function endLive() {
    if (!live) return;
    const l = live; live = null;
    try { l.conv && l.conv.disconnect(); } catch { /* ignore */ }
    l.el.remove();
    document.removeEventListener('keydown', escLive);
  }
  MLS.openLive = openLive;
})();

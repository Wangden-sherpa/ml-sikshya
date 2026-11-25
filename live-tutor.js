/* ML Sikshya — 🎥 Live AI video tutor (Nuance Labs "Nuance Live", https://docs.nuancelabs.ai).
   A real-time video teacher (an AI persona) that hears, sees (if allowed) and talks back.
   Private to the owner: the nk_ API key never touches this website — a token server on the owner's own PC
   (tools/nuance_token_server.py) hands the page a one-conversation st_ token. Visitors never see this feature.

   What the page does during a class:
   - tells the teacher what the student does (opens a lesson, runs code, gets an error) as quiet "thinking" notes;
   - runs the teacher's tools (see the screen, read/open a lesson, glossary, show a code example, progress);
   - typed messages, Stop (interrupt the teacher), "Give me a minute" (floor hold), mute, captions, end reasons.
   The persona speaks English only, so everything this page sends it is English. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast, store } = MLS;
  const SERVER = 'http://127.0.0.1:8787';
  const SDK_URL = 'https://esm.sh/@nuancelabs/js-sdk@0.40.0';   // pinned: the API is in preview and may change
  const PERSONAS = [['sam', 'Sam'], ['sonia', 'Sonia'], ['mira', 'Mira']];

  Object.assign(MLS.UI, {
    liveBtn: { en: '🎥 Live AI video tutor', ne: '🎥 प्रत्यक्ष AI भिडियो शिक्षक', zh: '🎥 AI 实时视频老师' },
    liveTitle: { en: 'Live AI video tutor', ne: 'प्रत्यक्ष AI भिडियो शिक्षक', zh: 'AI 实时视频老师' },
    liveIntro: { en: 'A real-time video teacher. It is an AI, not a person. Talk naturally, interrupt any time, type if you prefer — it can see your lesson and your code, open lessons and show examples.', ne: 'वास्तविक समयको भिडियो शिक्षक। यो AI हो, मानिस होइन। स्वाभाविक रूपमा बोल्नुहोस्, जुनसुकै बेला रोक्नुहोस्, चाहेमा टाइप गर्नुहोस् — यसले तपाईंको पाठ र कोड हेर्न, पाठ खोल्न र उदाहरण देखाउन सक्छ।', zh: '实时视频老师。它是 AI，不是真人。自然地说话，随时打断，也可以打字——它能看到你的课程和代码、打开课程并展示示例。' },
    liveEnglish: { en: '', ne: 'ध्यान दिनुहोस्: प्रत्यक्ष शिक्षक अङ्ग्रेजीमा मात्र बोल्छ र सुन्छ।', zh: '注意：实时老师只会说和听英语。' },
    liveOwner: { en: 'Live AI video tutor (owner only)', ne: 'प्रत्यक्ष AI भिडियो शिक्षक (मालिक मात्र)', zh: 'AI 实时视频老师（仅限所有者）' },
    liveOwnerHelp: { en: 'Turn on only on your own computer, where the private key server (tools\\start-live-tutor.bat) runs. Your API key stays on your PC.', ne: 'आफ्नै कम्प्युटरमा मात्र सुरु गर्नुहोस्, जहाँ निजी key सर्भर (tools\\start-live-tutor.bat) चल्छ। तपाईंको API key तपाईंकै PC मा रहन्छ।', zh: '只在运行私有密钥服务器（tools\\start-live-tutor.bat）的你自己的电脑上开启。API 密钥只保存在你的电脑上。' },
    liveOwnerOn: { en: 'This is my computer — show the live tutor', ne: 'यो मेरो कम्प्युटर हो — प्रत्यक्ष शिक्षक देखाउनुहोस्', zh: '这是我的电脑——显示实时老师' },
    livePersona: { en: 'Choose a teacher', ne: 'शिक्षक छान्नुहोस्', zh: '选择老师' },
    liveCam: { en: 'Let the teacher see me (camera)', ne: 'शिक्षकले मलाई देख्न सकून् (क्यामेरा)', zh: '让老师看到我（摄像头）' },
    liveCamNote: { en: 'With the camera on, a student under 18 needs an adult next to them, or the class ends.', ne: 'क्यामेरा खुला हुँदा १८ वर्षमुनिका विद्यार्थीसँग कुनै वयस्क हुनुपर्छ, नत्र कक्षा बन्द हुन्छ।', zh: '开启摄像头时，未满 18 岁的学生身边需要有成年人，否则课堂会结束。' },
    liveStart: { en: '▶ Start live class', ne: '▶ प्रत्यक्ष कक्षा सुरु', zh: '▶ 开始实时课堂' },
    liveChecking: { en: 'Checking your private key server…', ne: 'तपाईंको निजी key सर्भर जाँच्दै…', zh: '正在检查你的私有密钥服务器…' },
    liveOff: { en: 'The private key server is not running. Double-click tools\\start-live-tutor.bat in the ML Sikshya folder, then press Start again.', ne: 'निजी key सर्भर चलिरहेको छैन। ML Sikshya फोल्डरको tools\\start-live-tutor.bat डबल-क्लिक गरेर फेरि Start थिच्नुहोस्।', zh: '私有密钥服务器没有运行。请双击 ML Sikshya 文件夹中的 tools\\start-live-tutor.bat，然后再次点击开始。' },
    liveOld: { en: 'Your private key server is an old version. Close its window and start tools\\start-live-tutor.bat again.', ne: 'तपाईंको निजी key सर्भर पुरानो संस्करण हो। यसको विन्डो बन्द गरेर tools\\start-live-tutor.bat फेरि सुरु गर्नुहोस्।', zh: '你的私有密钥服务器是旧版本。请关闭它的窗口，然后重新运行 tools\\start-live-tutor.bat。' },
    liveNoKey: { en: 'The key server is running but has no API key. Save your nk_ key in %USERPROFILE%\\.ml-sikshya\\nuance_key.txt', ne: 'Key सर्भर चलिरहेको छ तर API key छैन। आफ्नो nk_ key %USERPROFILE%\\.ml-sikshya\\nuance_key.txt मा सेभ गर्नुहोस्', zh: '密钥服务器在运行，但没有 API 密钥。请把 nk_ 密钥保存到 %USERPROFILE%\\.ml-sikshya\\nuance_key.txt' },
    liveConnecting: { en: 'Connecting to your teacher…', ne: 'शिक्षकसँग जोडिँदै…', zh: '正在连接老师…' },
    liveQueued: { en: 'The service is busy — trying again…', ne: 'सेवा व्यस्त छ — फेरि प्रयास गर्दै…', zh: '服务繁忙——正在重试…' },
    livePreparing: { en: 'Your teacher is getting ready (up to half a minute)…', ne: 'शिक्षक तयार हुँदै हुनुहुन्छ (आधा मिनेटसम्म)…', zh: '老师正在准备（最多半分钟）…' },
    liveSlow: { en: 'Still connecting… A VPN or a privacy extension can block video calls.', ne: 'अझै जोडिँदै… VPN वा privacy extension ले भिडियो कल रोक्न सक्छ।', zh: '仍在连接……VPN 或隐私扩展可能会阻止视频通话。' },
    liveReady: { en: 'Say hello! 👋', ne: 'नमस्ते भन्नुहोस्! 👋', zh: '打个招呼吧！👋' },
    liveEnded: { en: 'Class ended', ne: 'कक्षा सकियो', zh: '课堂已结束' },
    liveTypePh: { en: 'Type a message to your teacher (in English)…', ne: 'शिक्षकलाई सन्देश लेख्नुहोस् (अङ्ग्रेजीमा)…', zh: '给老师发消息（用英语）…' },
    livePoor: { en: 'Weak internet connection…', ne: 'इन्टरनेट कमजोर छ…', zh: '网络连接较弱…' },
    liveLinkPoor: { en: 'The connection to your teacher has been poor for a while. You can end the class and start again.', ne: 'शिक्षकसँगको जडान केही समयदेखि कमजोर छ। कक्षा बन्द गरेर फेरि सुरु गर्न सक्नुहुन्छ।', zh: '与老师的连接已经较差一段时间了。你可以结束课堂后重新开始。' },
    liveMicSilent: { en: '🎙️ Your microphone is on but no sound reaches the class. Check your microphone settings.', ne: '🎙️ माइक खुला छ तर कक्षामा आवाज पुगेको छैन। माइकको सेटिङ जाँच्नुहोस्।', zh: '🎙️ 麦克风已打开，但声音没有传到课堂。请检查麦克风设置。' },
    liveLeft: { en: 'left', ne: 'बाँकी', zh: '剩余' },
    liveStop: { en: '⏹ Stop', ne: '⏹ रोक्नुहोस्', zh: '⏹ 停止' },
    liveHold: { en: '⏸ Give me a minute', ne: '⏸ एक मिनेट दिनुहोस्', zh: '⏸ 给我一分钟' },
    liveResume: { en: '▶ I\'m ready', ne: '▶ म तयार छु', zh: '▶ 我准备好了' },
    liveBoard: { en: 'From your teacher', ne: 'शिक्षकबाट', zh: '老师给你的' },
    liveOpened: { en: 'Opened', ne: 'खोलियो', zh: '已打开' },
    liveErr409: { en: 'Too many live classes are open at once on your account. Close other tabs and try again.', ne: 'तपाईंको खातामा एकैपटक धेरै प्रत्यक्ष कक्षा खुला छन्। अरू tab बन्द गरेर फेरि प्रयास गर्नुहोस्।', zh: '你的账号同时打开的实时课堂太多。请关闭其他标签页后重试。' },
    liveErrCredits: { en: 'Today\'s Nuance credits are used up. They renew tomorrow.', ne: 'आजको Nuance credit सकियो। भोलि फेरि आउँछ।', zh: '今天的 Nuance 额度已用完，明天会恢复。' },
    liveErrHour: { en: 'Too many classes were started in the last hour. Try again later.', ne: 'पछिल्लो एक घण्टामा धेरै कक्षा सुरु भए। पछि प्रयास गर्नुहोस्।', zh: '过去一小时内开始的课堂太多。请稍后再试。' },
    liveErrBusy: { en: 'No teacher is free right now. Try again in a minute.', ne: 'अहिले कुनै शिक्षक खाली छैन। एक मिनेटमा फेरि प्रयास गर्नुहोस्।', zh: '现在没有空闲的老师。请一分钟后再试。' },
    liveErrLegal: { en: 'Nuance needs you to accept its developer agreement on platform.nuancelabs.ai first.', ne: 'पहिले platform.nuancelabs.ai मा Nuance को developer सम्झौता स्वीकार गर्नुपर्छ।', zh: '需要先在 platform.nuancelabs.ai 上接受 Nuance 的开发者协议。' },
    liveErrRegion: { en: 'Nuance is not offered in this region.', ne: 'यो क्षेत्रमा Nuance उपलब्ध छैन।', zh: '该地区无法使用 Nuance。' },
    liveErrReview: { en: 'Nuance is reviewing this tutor\'s setup. It usually works again within a day.', ne: 'Nuance ले यो शिक्षकको सेटअप जाँच गर्दैछ। प्रायः एक दिनभित्र फेरि चल्छ।', zh: 'Nuance 正在审核这个老师的设置，通常一天内即可恢复。' },
    liveErrKey: { en: 'Nuance did not accept the API key. Create a new key on platform.nuancelabs.ai and save it in your key file.', ne: 'Nuance ले API key स्वीकार गरेन। platform.nuancelabs.ai मा नयाँ key बनाएर key फाइलमा सेभ गर्नुहोस्।', zh: 'Nuance 不接受该 API 密钥。请在 platform.nuancelabs.ai 创建新密钥并保存到密钥文件中。' },
    liveErrMic: { en: 'The microphone could not be opened. Allow it for this site and try again.', ne: 'माइक खोल्न सकिएन। यो साइटका लागि अनुमति दिएर फेरि प्रयास गर्नुहोस्।', zh: '无法打开麦克风。请允许本网站使用麦克风后重试。' },
    liveErrWebRTC: { en: 'This browser cannot make video calls (WebRTC is off). Turn it on for this site or use another browser.', ne: 'यो ब्राउजरले भिडियो कल गर्न सक्दैन (WebRTC बन्द छ)। यो साइटका लागि खोल्नुहोस् वा अर्को ब्राउजर प्रयोग गर्नुहोस्।', zh: '此浏览器无法进行视频通话（WebRTC 已关闭）。请为本网站开启或换一个浏览器。' },
    liveErrTimeout: { en: 'The call could not connect. A VPN or a privacy extension may be blocking it.', ne: 'कल जोडिन सकेन। VPN वा privacy extension ले रोकेको हुन सक्छ।', zh: '通话无法连接。可能被 VPN 或隐私扩展阻止了。' },
    liveErrPaused: { en: 'New classes are paused for a while after earlier classes broke the usage rules.', ne: 'अघिल्ला कक्षामा प्रयोगका नियम उल्लङ्घन भएकाले नयाँ कक्षा केही समय रोकिएका छन्।', zh: '由于之前的课堂违反了使用规则，新课堂暂时被暂停。' },
    liveErrGen: { en: 'Could not start the live class', ne: 'प्रत्यक्ष कक्षा सुरु हुन सकेन', zh: '无法开始实时课堂' },
    liveEndTime: { en: 'The class reached its time limit.', ne: 'कक्षाको समय सकियो।', zh: '课堂时间已到。' },
    liveEndBye: { en: 'Your teacher said goodbye.', ne: 'शिक्षकले बिदा भन्नुभयो।', zh: '老师已说再见。' },
    liveEndError: { en: 'The class stopped unexpectedly. You can start a new one.', ne: 'कक्षा अचानक रोकियो। नयाँ कक्षा सुरु गर्न सक्नुहुन्छ।', zh: '课堂意外中断。你可以重新开始。' },
  });

  const isOwner = () => store.get('live-owner', false);
  MLS.liveEnabled = isOwner;

  // ---------- What the teacher may know about the page (always English: the persona speaks English only) ----------
  const strip = (html) => { const d = document.createElement('div'); d.innerHTML = html || ''; return d.textContent.replace(/\s+/g, ' ').trim(); };
  const lessonById = (id) => window.COURSE.lessons.find((l) => l.id === id);
  // Keep everything the persona reads English-only (plain ASCII): typographic punctuation becomes its plain
  // form, anything else (Devanagari, Chinese, emoji...) is dropped.
  const english = (s) => String(s || '').replace(/[\u2013\u2014\u2212]/g, '-').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2026/g, '...').replace(/\u00a0/g, ' ').replace(/[^\x09\x0a\x0d\x20-\x7e]/g, ' ').replace(/ {2,}/g, ' ');
  const enTitle = (x) => english((x && x.title && (x.title.en || x.title)) || '').trim();
  function lastRunInfo() {
    const r = MLS.lastRun;
    if (!r || Date.now() - r.at > 30 * 60 * 1000) return null;
    return { code: english(r.code).slice(0, 4000), output: english(r.text).slice(-1500), error: r.err ? english(r.err).slice(-1500) : null, seconds_ago: Math.round((Date.now() - r.at) / 1000) };
  }
  function pageContext() {
    const ctx = { page: MLS.route || 'home' };
    if (MLS.route === 'learn') {
      const L = lessonById(MLS.routeArg);
      if (L) ctx.lesson = { id: L.id, title: enTitle(L), level: L.level, excerpt: english(strip(L.body && (L.body.en || L.body))).slice(0, 2500) };
    } else if (MLS.route === 'project') {
      const P = (window.COURSE.projects || []).find((p) => p.id === MLS.routeArg);
      if (P) ctx.project = { id: P.id, title: enTitle(P), goal: english(P.goal && (P.goal.en || P.goal)) };
    }
    ctx.completed_lessons = window.COURSE.lessons.filter((l) => MLS.S.done[l.id]).map((l) => enTitle(l));
    const run = lastRunInfo(); if (run) ctx.latest_code_run = run;
    return ctx;
  }
  function contextNote() {   // a short version for a quiet note (an append holds at most 2,000 characters)
    const c = pageContext();
    let s = `The student is on the ${c.page} page`;
    if (c.lesson) s += `, studying the lesson "${c.lesson.title}"`;
    if (c.project) s += `, working on the project "${c.project.title}"`;
    s += `. They have finished ${c.completed_lessons.length} of ${window.COURSE.lessons.length} lessons.`;
    if (c.latest_code_run && c.latest_code_run.error) s += ` Their last code run failed with: ${c.latest_code_run.error.split('\n').slice(-2).join(' ')}`;
    return s.slice(0, 1900);
  }

  // ---------- The teacher's tools (a "responses" delegation: Nuance's helper calls them, this page runs them) ----------
  const nextLesson = () => window.COURSE.lessons.find((l) => !MLS.S.done[l.id]);
  const TOOL_RUNNERS = {
    get_page_context: () => pageContext(),
    list_lessons: () => window.COURSE.lessons.map((l) => ({ id: l.id, title: enTitle(l), level: l.level, minutes: l.minutes, finished: !!MLS.S.done[l.id] })),
    get_progress: () => { const n = nextLesson(); return { finished: window.COURSE.lessons.filter((l) => MLS.S.done[l.id]).length, total: window.COURSE.lessons.length, next_lesson: n ? { id: n.id, title: enTitle(n) } : null }; },
    get_lesson: ({ lesson_id }) => {
      const L = typeof lesson_id === 'string' && lessonById(lesson_id);
      if (!L) return { error: { message: `There is no lesson with the id ${String(lesson_id).slice(0, 60)}. Use list_lessons for the ids.` } };
      return { id: L.id, title: enTitle(L), level: L.level, minutes: L.minutes, text: english(strip(L.body && (L.body.en || L.body))).slice(0, 12000) };
    },
    open_lesson: ({ lesson_id }) => {
      const L = typeof lesson_id === 'string' && lessonById(lesson_id);
      if (!L) return { error: { message: `There is no lesson with the id ${String(lesson_id).slice(0, 60)}.` } };
      live.selfNav = L.id; location.hash = '#/learn/' + L.id;
      board(`<p>📖 ${u('liveOpened')}: <a href="#/learn/${esc(L.id)}">${esc(t(L.title))}</a></p>`);
      return { opened: enTitle(L) };
    },
    lookup_term: ({ term }) => {
      if (typeof term !== 'string' || !term.trim()) return { error: { message: 'No term was given.' } };
      const q = term.toLowerCase().trim();
      const hits = (window.COURSE.glossary || []).filter((g) => g.term.toLowerCase().includes(q) || q.includes(g.term.toLowerCase())).slice(0, 3);
      return hits.length ? hits.map((g) => ({ term: g.term, definition: english(strip(g.def && (g.def.en || g.def))) })) : { found: false, note: `"${english(term)}" is not in the course glossary.` };
    },
    show_code: ({ title, code }) => {
      if (typeof code !== 'string' || !code.trim()) return { error: { message: 'No code was given.' } };
      const block = MLS.codeBlock(code.slice(0, 8000), String(title || 'example.py').slice(0, 80));
      board(null, block);
      return { shown: true, note: 'The example is on the student\'s screen with a Run button. They run it themselves.' };
    },
  };
  async function runTool(call) {
    const fn = TOOL_RUNNERS[call.name];
    if (!fn) return { error: { message: `Unknown tool ${call.name}` } };
    if (call.arguments === null) return { error: { message: 'The arguments were not a JSON object.' } };
    try { return await fn(call.arguments || {}); } catch (e) { console.error('tool', call.name, e); return { error: { message: `${call.name} failed` } }; }
  }

  // ---------- Sending notes and commands (only after session.started, as the docs require) ----------
  async function send(ev) {
    if (!live || !live.conv || !live.started) return false;
    try { await live.conv.sendInterfaceEvent(ev); return true; } catch (e) { console.warn('send failed', ev.type, e); return false; }
  }
  function note(text, whileSpeaking) {   // quiet context: what just happened in the app
    if (!live || !live.started || !text) return;
    live.conv.append('thinking', english(text).slice(0, 2000), whileSpeaking ? { whileSpeaking } : undefined).catch((e) => console.warn('append failed', e));
  }
  // What the student does in the app → the teacher hears about it.
  MLS.hooks.afterRender.push((route, arg) => {
    if (!live || !live.started) return;
    const key = route + '/' + arg; if (key === live.lastRoute) return; live.lastRoute = key;
    if (live.selfNav && arg === live.selfNav) { live.selfNav = null; return; }   // the teacher opened it
    if (route === 'learn' && lessonById(arg)) note(`The student just opened the lesson "${enTitle(lessonById(arg))}".`);
    else note(`The student just went to the ${route || 'home'} page.`);
  });
  MLS.hooks.run.push((code, ok) => {
    if (!live || !live.started) return;
    const now = Date.now(); if (now - (live.lastRunNote || 0) < 3000) return; live.lastRunNote = now;
    const r = lastRunInfo();
    if (ok || !r) note('The student ran their code and it worked.');
    else note(`The student ran their code and it failed with this error: ${r.error.split('\n').slice(-3).join(' ')}`);
  });

  // ---------- Errors ----------
  function errText(e, mod) {
    const name = e && e.constructor && e.constructor.name;
    const is = (cls) => mod && mod[cls] && e instanceof mod[cls];
    const status = e && (e.status || 0), code = String((e && e.code) || '');
    if (is('ActiveSessionError') || code === 'concurrency_limit' || status === 409) return u('liveErr409');
    if (is('MediaAccessError')) return u('liveErrMic');
    if (is('WebRTCUnavailableError')) return u('liveErrWebRTC');
    if (is('JoinTimeoutError')) return u('liveErrTimeout');
    if (is('LegalRequiredError') || code === 'legal_required') return u('liveErrLegal');
    if (is('PolicyCurfewError') || code === 'policy_curfew' || code === 'organization_paused') return u('liveErrPaused');
    if (is('MaintenanceError')) return esc(e.message);
    if (code === 'legal_blocked') return u('liveErrRegion');
    if (code === 'credits_spent') return u('liveErrCredits');
    if (code === 'start_limit') return u('liveErrHour');
    if (code === 'capacity_unavailable' || code === 'busy' || status === 503) return u('liveErrBusy');
    if (code === 'app_review_held') return u('liveErrReview');
    if (status === 401 && e.fromTokenServer) return u('liveErrKey');
    return `${u('liveErrGen')}: ${esc(code || (e && e.message) || name || 'unknown error')}`;
  }

  // ---------- The class window ----------
  let live = null;
  async function serverStatus() {
    try {
      const r = await fetch(SERVER + '/health', { cache: 'no-store' });
      if (!r.ok) return 'off';
      const j = await r.json();
      return !j.key ? 'nokey' : j.version >= 2 ? 'ok' : 'old';
    } catch { return 'off'; }
  }
  function openLive() {
    if (live) return;
    MLS.closeTutorPanel && MLS.closeTutorPanel();
    const el = h(`<div class="call live">
      <div class="call-top"><span class="call-live">● LIVE · AI</span><b>${u('liveTitle')}</b><span class="call-mode live-timer"></span></div>
      <div class="live-stage">
        <video class="live-video" autoplay playsinline></video><audio class="live-audio" autoplay></audio>
        <div class="live-pre card">
          <div class="live-pre-av">${MLS.avatarSVG()}</div>
          <h2>${u('liveTitle')}</h2><p class="muted">${u('liveIntro')}</p>
          ${MLS.S.lang !== 'en' ? `<p class="small warnline">${u('liveEnglish')}</p>` : ''}
          <b>${u('livePersona')}</b>
          <div class="persona-pick">${PERSONAS.map(([id, n]) => `<button data-p="${id}" class="${store.get('live-persona', 'sam') === id ? 'on' : ''}">${n}</button>`).join('')}</div>
          <label class="chk small"><input type="checkbox" class="live-cam" ${store.get('live-cam', false) ? 'checked' : ''}> ${u('liveCam')}</label>
          <p class="small muted live-cam-note">${u('liveCamNote')}</p>
          <button class="btn live-go">${u('liveStart')}</button>
          <div class="live-msg small"></div>
        </div>
        <div class="live-status"></div>
        <div class="call-caption bot"></div><div class="call-caption you"></div>
        <div class="live-board" hidden><b>${u('liveBoard')}</b><div class="live-board-items"></div></div>
      </div>
      <form class="live-type" hidden><input placeholder="${u('liveTypePh')}"><button class="btn sm">➤</button></form>
      <div class="call-bar">
        <button class="cb mic on" title="Microphone" hidden>🎙️</button>
        <button class="cb live-stop" title="Stop" hidden>${u('liveStop')}</button>
        <button class="cb live-hold" title="Pause" hidden>${u('liveHold')}</button>
        <button class="cb end" title="End">📞</button>
      </div>
    </div>`);
    document.body.appendChild(el);
    live = { el, conv: null, mod: null, muted: false, started: false, presented: false, greeted: false, holding: false, botText: '', youText: '', clearT: 0, timer: 0, left: null, lastRoute: MLS.route + '/' + MLS.routeArg };
    el.querySelectorAll('.persona-pick button').forEach((b) => (b.onclick = () => { store.set('live-persona', b.dataset.p); el.querySelectorAll('.persona-pick button').forEach((x) => x.classList.toggle('on', x === b)); }));
    el.querySelector('.live-go').onclick = start;
    el.querySelector('.cb.end').onclick = endLive;
    el.querySelector('.cb.mic').onclick = toggleMute;
    el.querySelector('.live-stop').onclick = () => send({ type: 'session.output_audio.interrupt', event_id: 'stop_' + Date.now() });
    el.querySelector('.live-hold').onclick = toggleHold;
    el.querySelector('.live-type').onsubmit = (e) => { e.preventDefault(); const i = e.target.querySelector('input'); sendText(i.value); i.value = ''; };
    document.addEventListener('keydown', escLive);
  }
  const escLive = (e) => { if (e.key === 'Escape') endLive(); };
  const status = (txt) => { if (live) live.el.querySelector('.live-status').innerHTML = txt || ''; };
  const caption = (who, txt) => { if (live) live.el.querySelector('.call-caption.' + who).textContent = txt; };
  function board(html, node) {
    if (!live) return;
    const b = live.el.querySelector('.live-board'); b.hidden = false;
    const item = document.createElement('div'); item.className = 'live-board-item';
    if (html) item.innerHTML = html; if (node) item.appendChild(node);
    b.querySelector('.live-board-items').appendChild(item);
    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  async function start() {
    const msg = live.el.querySelector('.live-msg'), go = live.el.querySelector('.live-go');
    go.disabled = true; msg.textContent = u('liveChecking');
    const st = await serverStatus();
    if (st !== 'ok') { msg.textContent = u(st === 'nokey' ? 'liveNoKey' : st === 'old' ? 'liveOld' : 'liveOff'); go.disabled = false; return; }
    const persona = store.get('live-persona', 'sam'), camera = live.el.querySelector('.live-cam').checked;
    store.set('live-cam', camera);
    let mod = null;
    try {
      msg.textContent = u('liveConnecting');
      mod = live.mod = await import(SDK_URL);
      const conv = mod.createNuanceConversation({
        // A fresh token for each start: the server mints it with the fixed, reviewed setup.
        token: async () => {
          const r = await fetch(SERVER + '/token', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ persona_id: persona, expressiveness: 1.2, camera }) });
          const j = await r.json().catch(() => ({}));
          if (!r.ok || !j.token) throw Object.assign(new Error(j.detail || j.message || j.error || 'token_failed'), { status: j.status || r.status, code: j.code || j.error, fromTokenServer: true });
          return j.token;
        },
        maxSessionSeconds: 900,
        mediaDevices: { cameraEnabled: camera },
        startOn: 'first-frame',
      });
      live.conv = conv;
      // Subscribe before connect() so the session's first events are seen.
      conv.onChange(onChange);
      conv.onInterfaceEvent(onEvent);
      conv.onToolCall(async (call) => {
        const out = await runTool(call);
        try { await conv.sendToolResult(call.callId, out); } catch (e) { console.warn('tool result', e); }
      });
      live.el.classList.add('connecting');
      status(u('liveConnecting'));
      await conv.connect();
      if (!live || live.conv !== conv || conv.state === 'disconnected') return;
      live.el.querySelector('.live-pre').hidden = true;
      ['.cb.mic', '.live-hold'].forEach((s) => (live.el.querySelector(s).hidden = false));
      live.el.querySelector('.live-type').hidden = false;
    } catch (e) {
      console.error(e);
      if (!live) return;
      msg.innerHTML = errText(e, mod); go.disabled = false;
      live.el.classList.remove('connecting'); status('');
      try { live.conv && live.conv.disconnect(); } catch { /* ignore */ }
      live.conv = null;
    }
  }
  function greet() {   // the persona never speaks first: ask it to open once it is in view and listening
    if (!live || live.greeted || !live.started || !live.presented) return;
    live.greeted = true;
    send({ type: 'response.create', response: { instructions: 'Greet the student warmly, say you are their AI teacher, mention the lesson they are on if there is one, and ask what they would like to learn.' } });
  }
  function attachTracks() {
    const c = live && live.conv; if (!c) return;
    let av = null; try { av = c.avatar; } catch { return; }
    if (!av) return;
    try { if (av.videoTrack) av.videoTrack.attach(live.el.querySelector('.live-video')); } catch (e) { console.warn(e); }
    try { if (av.audioTrack) av.audioTrack.attach(live.el.querySelector('.live-audio')); } catch (e) { console.warn(e); }
  }
  function onChange(ev) {
    if (!live || !ev) return;
    switch (ev.type) {
      case 'state-changed':
        if (ev.state === 'queued') status(u('liveQueued'));
        else if (ev.state === 'connecting') status(u('liveConnecting'));
        else if (ev.state === 'disconnected') { status(live.endText || u('liveEnded')); live.el.classList.remove('on-air'); }
        break;
      case 'avatar-preparing': status(u('livePreparing')); break;
      case 'join-slow': status(u('liveSlow')); break;
      case 'tracks-changed': attachTracks(); break;
      case 'avatar-ready': attachTracks(); break;
      case 'avatar-presented':
        attachTracks(); live.presented = true;
        live.el.classList.remove('connecting'); live.el.classList.add('on-air');
        status(u('liveReady')); setTimeout(() => { if (live && live.el.querySelector('.live-status').textContent === u('liveReady')) status(''); }, 3000);
        greet();
        break;
      case 'speaking-changed':
        if (ev.participant === 'user') live.el.classList.toggle('user-speaking', !!ev.isSpeaking);
        else { live.el.classList.toggle('persona-speaking', !!ev.isSpeaking); live.el.querySelector('.live-stop').hidden = !ev.isSpeaking; }
        break;
      case 'mic-silent-changed': status(ev.silent ? u('liveMicSilent') : ''); break;
      case 'time-remaining':
        if (typeof ev.secondsRemaining === 'number') { live.left = ev.secondsRemaining; live.leftAt = Date.now(); tick(); }
        break;
      case 'network-changed': status(ev.quality === 'good' ? '' : u('livePoor')); break;
      case 'link-poor': status(u('liveLinkPoor')); break;
      case 'session-ended': {
        const why = ev.reason === 'time-limit' ? u('liveEndTime') : ev.endReason === 'end_call' ? u('liveEndBye')
          : ev.reason === 'policy-violation' || ev.reason === 'age-check' ? esc(ev.message || '')
          : ev.reason === 'refused' && ev.error ? errText(ev.error, live.mod) : ev.endReason === 'error' ? u('liveEndError') : u('liveEnded');
        live.endText = why; status(why); live.started = false;
        live.el.classList.remove('on-air', 'persona-speaking');
        ['.cb.mic', '.live-stop', '.live-hold'].forEach((s) => (live.el.querySelector(s).hidden = true));
        live.el.querySelector('.live-type').hidden = true;
        clearInterval(live.timer);
        break;
      }
      default: break;
    }
  }
  function tick() {
    clearInterval(live.timer);
    const draw = () => {
      if (!live || live.left == null) return;
      const s = Math.max(0, live.left - (Date.now() - live.leftAt) / 1000);
      live.el.querySelector('.live-timer').textContent = `⏱ ${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')} ${u('liveLeft')}`;
    };
    draw(); live.timer = setInterval(draw, 1000);
  }
  function onEvent(ev) {
    if (!live || !ev) return;
    switch (ev.type) {
      case 'session.started':
        live.started = true;
        note(contextNote());              // what the student is looking at, before the first reply
        greet();
        break;
      case 'session.output_transcript.delta':
        clearTimeout(live.clearT);
        live.botText = (live.botText + (ev.delta || '')).slice(-260); caption('bot', live.botText);
        break;
      case 'session.output_audio.done':     // the end of a spoken reply (there are no response.* events for it)
        live.clearT = setTimeout(() => { if (live) { live.botText = ''; caption('bot', ''); } }, 2600);
        live.el.querySelector('.live-stop').hidden = true;
        break;
      case 'session.input_transcript.delta':
        live.youText = (live.youText + (ev.delta || '')).slice(-200); caption('you', live.youText);
        break;
      case 'session.input_transcript.done':  // the settled words (may replace an earlier one)
        caption('you', ev.transcript || live.youText); live.youText = '';
        setTimeout(() => caption('you', ''), 2500);
        break;
      case 'session.quiet.started': if (ev.by === 'client') setHold(true); break;
      case 'session.quiet.ended': if (ev.by === 'client' || ev.cause === 'released') setHold(false); break;
      case 'session.input_audio.muted': setMuted(true); break;
      case 'session.input_audio.unmuted': setMuted(false); break;
      case 'session.closed':
        if (ev.reason === 'content' || ev.reason === 'age_check') { live.endText = esc(ev.message || ''); status(live.endText); }
        break;
      case 'error': {
        const e = ev.error || {};
        if (e.code !== 'command_refused') console.warn('Nuance Live error:', e.code, e.message);   // e.g. Stop after a reply ended
        if (e.code === 'output_not_ready') status(u('liveEndError'));
        break;
      }
      default: break;   // new event types are added: ignore what we don't use
    }
  }
  function setMuted(m) { if (!live) return; live.muted = m; const b = live.el.querySelector('.cb.mic'); b.classList.toggle('on', !m); b.textContent = m ? '🔇' : '🎙️'; }
  function toggleMute() { if (live) send({ type: live.muted ? 'session.input_audio.unmute' : 'session.input_audio.mute' }); }
  function setHold(on) { if (!live) return; live.holding = on; live.el.querySelector('.live-hold').textContent = on ? u('liveResume') : u('liveHold'); }
  function toggleHold() {
    if (!live) return;
    if (live.holding) send({ type: 'session.floor.release' });
    else send({ type: 'session.floor.hold', seconds: 120, reason: 'The student is reading or trying the code on their screen.' });
  }
  async function sendText(text) {
    text = (text || '').trim(); if (!text || !live || !live.started) return;
    caption('you', text); setTimeout(() => caption('you', ''), 3000);   // typed words are not echoed back
    const ok = await send({ type: 'response.item.create', item: { type: 'message', role: 'user', content: text.slice(0, 24000) } });
    if (ok) await send({ type: 'response.create' }); else toast(u('liveErrGen'));
  }
  function endLive() {
    if (!live) return;
    const l = live; live = null;
    clearInterval(l.timer);
    try { l.conv && l.conv.disconnect(); } catch { /* ignore */ }   // the SDK sends session.close and leaves the room
    l.el.remove();
    document.removeEventListener('keydown', escLive);
  }
  MLS.openLive = openLive;
})();

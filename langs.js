/* ML Tutor — more languages. English / नेपाली / 中文 are hand-translated; the 🌐 menu adds many more via automatic page translation (Google Translate website widget). Code is protected from translation. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, store } = MLS;
  Object.assign(MLS.UI, {
    moreLangs: { en: 'More languages', ne: 'थप भाषाहरू', zh: '更多语言' },
    autoNote: { en: 'Auto-translated by Google Translate. English, नेपाली and 中文 are translated by hand.', ne: 'Google Translate ले स्वचालित अनुवाद। अंग्रेजी, नेपाली र 中文 हातैले अनुवाद गरिएका छन्।', zh: '由 Google 翻译自动翻译。英语、尼泊尔语和中文为人工翻译。' },
    backNative: { en: 'Back to original', ne: 'मूल भाषामा फर्कनुहोस्', zh: '恢复原文' },
  });
  const LANGS = [
    ['hi', 'हिन्दी', 'hi-IN'], ['bn', 'বাংলা', 'bn-IN'], ['ur', 'اردو', 'ur-PK'], ['ta', 'தமிழ்', 'ta-IN'], ['si', 'සිංහල', 'si-LK'],
    ['ja', '日本語', 'ja-JP'], ['ko', '한국어', 'ko-KR'], ['zh-TW', '繁體中文', 'zh-TW'], ['th', 'ไทย', 'th-TH'], ['vi', 'Tiếng Việt', 'vi-VN'], ['id', 'Bahasa Indonesia', 'id-ID'],
    ['ar', 'العربية', 'ar-SA'], ['tr', 'Türkçe', 'tr-TR'], ['ru', 'Русский', 'ru-RU'], ['es', 'Español', 'es-ES'], ['fr', 'Français', 'fr-FR'], ['de', 'Deutsch', 'de-DE'], ['pt', 'Português', 'pt-BR'], ['it', 'Italiano', 'it-IT'],
  ];
  const cookie = () => { const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/); return m ? decodeURIComponent(m[1]) : ''; };
  const setCookie = (v) => {
    const host = location.hostname, exp = v ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = `googtrans=${v ? '/en/' + v : ''}; path=/${exp}`;
    if (host && host.includes('.')) document.cookie = `googtrans=${v ? '/en/' + v : ''}; path=/; domain=.${host}${exp}`;
  };
  const ext = cookie();
  const extInfo = LANGS.find((l) => l[0] === ext);
  MLS.extLang = extInfo ? { code: extInfo[0], name: extInfo[1], speech: extInfo[2] } : null;

  // Never translate code, formulas, editors or 3D canvases.
  const protect = () => document.querySelectorAll('.code-block, .formula, code, pre, .editor, .viz3d, .output, textarea, .dl-table, .brand, .lang-toggle, .tc-photo, .mh-ic').forEach((e) => { e.setAttribute('translate', 'no'); e.classList.add('notranslate'); });
  MLS.hooks.afterRender.push(() => setTimeout(protect));
  new MutationObserver(() => protect()).observe(document.getElementById('main'), { childList: true, subtree: true });

  if (MLS.extLang) {
    // Base content is English; Google translates it to the chosen language.
    MLS.S.lang = 'en';
    window.googleTranslateElementInit = () => { new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'gt_el'); };
    document.body.appendChild(h('<div id="gt_el" style="display:none"></div>'));
    const s = document.createElement('script'); s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; document.head.appendChild(s);
    document.documentElement.classList.add('auto-translated');
  }

  // 🌐 menu next to EN / नेपाली / 中文
  const lt = document.querySelector('.lang-toggle');
  const wrap = h(`<div class="more-langs notranslate" translate="no"><button class="icon-btn ml-btn" title="${u('moreLangs')}">🌐${MLS.extLang ? `<small>${MLS.extLang.code}</small>` : ''}</button></div>`);
  lt.after(wrap);
  const btn = wrap.querySelector('.ml-btn');
  btn.onclick = (e) => {
    e.stopPropagation();
    const old = wrap.querySelector('.ml-pop'); if (old) { old.remove(); return; }
    const pop = h(`<div class="ml-pop"><b>🌐 ${u('moreLangs')}</b><div class="ml-grid">${LANGS.map(([c, n]) => `<button data-c="${c}" class="${MLS.extLang && MLS.extLang.code === c ? 'on' : ''}">${n}</button>`).join('')}</div>
      ${MLS.extLang ? `<button class="btn ghost sm ml-back">↩ ${u('backNative')}</button>` : ''}<small class="muted">${u('autoNote')}</small></div>`);
    pop.querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => { store.set('lang', 'en'); setCookie(b.dataset.c); location.reload(); }));
    const back = pop.querySelector('.ml-back'); if (back) back.onclick = () => { setCookie(''); location.reload(); };
    wrap.appendChild(pop);
  };
  document.addEventListener('click', (e) => { if (!e.target.closest('.more-langs')) { const p = document.querySelector('.ml-pop'); if (p) p.remove(); } });
  // Clicking EN / नेपाली / 中文 while auto-translating returns to the hand-translated site.
  lt.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { if (MLS.extLang) { setCookie(''); store.set('lang', b.dataset.lang); location.reload(); } }, true));
})();

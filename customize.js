/* ML Sikshya — 🎨 Design customizer: every learner can change colours, brightness, contrast, text size, fonts, corners, width and motion. Saved in the browser. */
(() => {
  const MLS = window.MLS;
  const { u, h, store, toast } = MLS;
  Object.assign(MLS.UI, {
    cz: { en: 'Customize design', ne: 'डिजाइन मिलाउनुहोस्', zh: '自定义外观' },
    czTheme: { en: 'Mode', ne: 'मोड', zh: '模式' }, czLight: { en: '☀️ Light', ne: '☀️ उज्यालो', zh: '☀️ 浅色' }, czDark: { en: '🌙 Dark', ne: '🌙 अँध्यारो', zh: '🌙 深色' },
    czAccent: { en: 'Main colour', ne: 'मुख्य रङ', zh: '主色' }, czAccent2: { en: 'Second colour', ne: 'दोस्रो रङ', zh: '辅助色' },
    czBg: { en: 'Background', ne: 'पृष्ठभूमि', zh: '背景' },
    czBright: { en: 'Brightness', ne: 'उज्यालोपन', zh: '亮度' }, czContrast: { en: 'Contrast', ne: 'कन्ट्रास्ट', zh: '对比度' }, czSat: { en: 'Colour strength', ne: 'रङको गाढापन', zh: '色彩饱和度' },
    czText: { en: 'Text size', ne: 'अक्षरको आकार', zh: '文字大小' }, czFont: { en: 'Font', ne: 'फन्ट', zh: '字体' },
    czRadius: { en: 'Rounded corners', ne: 'गोलो कुना', zh: '圆角' }, czWidth: { en: 'Page width', ne: 'पेजको चौडाइ', zh: '页面宽度' },
    czNarrow: { en: 'Narrow', ne: 'साँघुरो', zh: '窄' }, czNormal: { en: 'Normal', ne: 'सामान्य', zh: '标准' }, czWide: { en: 'Wide', ne: 'फराकिलो', zh: '宽' },
    czMotion: { en: 'Animations', ne: 'एनिमेसन', zh: '动画' }, czGlow: { en: 'Background glow', ne: 'पृष्ठभूमि चमक', zh: '背景光晕' },
    czReset: { en: '↺ Reset to default', ne: '↺ पूर्वनिर्धारितमा फर्काउनुहोस्', zh: '↺ 恢复默认' }, czPresets: { en: 'Quick themes', ne: 'छिटो थिम', zh: '快速主题' },
  });

  const FONTS = {
    inter: ['Inter', '"Inter", "Noto Sans Devanagari", "Noto Sans SC", system-ui, sans-serif'],
    system: ['System', 'system-ui, -apple-system, "Segoe UI", "Noto Sans Devanagari", "Microsoft YaHei", sans-serif'],
    rounded: ['Rounded', '"Nunito", "Noto Sans Devanagari", "Noto Sans SC", system-ui, sans-serif'],
    serif: ['Serif', 'Georgia, "Noto Serif", "Noto Serif Devanagari", "Noto Serif SC", serif'],
    mono: ['Mono', '"JetBrains Mono", Consolas, "Noto Sans Devanagari", monospace'],
  };
  const BGS = { default: ['', ''], warm: ['#fbf6ef', '#1b1611'], cool: ['#eef4fb', '#0c1422'], mint: ['#eefaf5', '#0b1a16'], lavender: ['#f5f2fd', '#14111f'], paper: ['#ffffff', '#000000'] };
  const PRESETS = [
    { n: 'Indigo', a: '#4f46e5', b: '#7c3aed' }, { n: 'Ocean', a: '#0284c7', b: '#0d9488' }, { n: 'Forest', a: '#15803d', b: '#65a30d' },
    { n: 'Sunset', a: '#ea580c', b: '#db2777' }, { n: 'Rose', a: '#e11d48', b: '#c026d3' }, { n: 'Gold', a: '#b45309', b: '#ca8a04' }, { n: 'Mono', a: '#334155', b: '#64748b' },
  ];
  const DEF = { accent: '#4f46e5', accent2: '#7c3aed', bg: 'default', bright: 100, contrast: 100, sat: 100, text: 100, font: 'inter', radius: 14, width: 'normal', motion: true, glow: true };
  let C = { ...DEF, ...store.get('design', {}) };
  if (!store.get('design', null)) { const old = { ocean: 1, forest: 2, sunset: 3, rose: 4 }[store.get('accent', '')]; if (old) { C.accent = PRESETS[old].a; C.accent2 = PRESETS[old].b; } }

  let fontLoaded = false;
  function apply() {
    const r = document.documentElement, st = r.style, dark = r.dataset.theme === 'dark';
    delete r.dataset.accent;
    st.setProperty('--primary', C.accent);
    st.setProperty('--primary-2', C.accent2);
    st.setProperty('--primary-soft', `color-mix(in srgb, ${C.accent} ${dark ? 22 : 11}%, ${dark ? '#161a29' : '#ffffff'})`);
    const bg = BGS[C.bg] || BGS.default;
    if (bg[0]) st.setProperty('--bg', dark ? bg[1] : bg[0]); else st.removeProperty('--bg');
    st.setProperty('--cz-filter', `brightness(${C.bright / 100}) contrast(${C.contrast / 100}) saturate(${C.sat / 100})`);
    st.setProperty('--cz-zoom', C.text / 100);
    st.setProperty('--font', FONTS[C.font] ? FONTS[C.font][1] : FONTS.inter[1]);
    st.setProperty('--radius', C.radius + 'px');
    st.setProperty('--cz-r', C.radius + 'px');
    st.setProperty('--cz-width', { narrow: '760px', normal: '880px', wide: '1180px' }[C.width] || '880px');
    r.classList.toggle('cz-nomotion', !C.motion);
    r.classList.toggle('cz-noglow', !C.glow);
    r.classList.toggle('cz-on', true);
    if (C.font === 'rounded' && !fontLoaded) { fontLoaded = true; document.head.appendChild(h('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap">')); }
  }
  const save = () => { store.set('design', C); apply(); };
  apply();
  MLS.hooks.afterRender.push(apply);
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function open() {
    let p = document.querySelector('.cz-panel');
    if (p) { p.remove(); return; }
    const dark = document.documentElement.dataset.theme === 'dark';
    p = h(`<div class="cz-panel notranslate" translate="no">
      <div class="cz-head"><b>🎨 ${u('cz')}</b><button class="icon-btn cz-x">✕</button></div>
      <div class="cz-body">
        <div class="cz-row"><span>${u('czTheme')}</span><div class="seg"><button data-th="light" class="${dark ? '' : 'on'}">${u('czLight')}</button><button data-th="dark" class="${dark ? 'on' : ''}">${u('czDark')}</button></div></div>
        <div class="cz-row col"><span>${u('czPresets')}</span><div class="cz-presets">${PRESETS.map((x, i) => `<button data-i="${i}" title="${x.n}" style="background:linear-gradient(135deg,${x.a},${x.b})"></button>`).join('')}</div></div>
        <div class="cz-row"><span>${u('czAccent')}</span><input type="color" class="c1" value="${C.accent}"></div>
        <div class="cz-row"><span>${u('czAccent2')}</span><input type="color" class="c2" value="${C.accent2}"></div>
        <div class="cz-row col"><span>${u('czBg')}</span><div class="cz-bgs">${Object.keys(BGS).map((k) => `<button data-bg="${k}" class="${C.bg === k ? 'on' : ''}" style="background:${BGS[k][dark ? 1 : 0] || 'var(--surface-2)'}">${k === 'default' ? '✦' : ''}</button>`).join('')}</div></div>
        ${[['bright', 'czBright', 60, 130, '%'], ['contrast', 'czContrast', 70, 140, '%'], ['sat', 'czSat', 0, 160, '%'], ['text', 'czText', 80, 135, '%'], ['radius', 'czRadius', 0, 28, 'px']].map(([k, l, mn, mx, un]) => `<div class="cz-row col"><span>${u(l)} <b class="v-${k}">${C[k]}${un}</b></span><input type="range" data-k="${k}" data-u="${un}" min="${mn}" max="${mx}" value="${C[k]}"></div>`).join('')}
        <div class="cz-row col"><span>${u('czFont')}</span><div class="seg wrap">${Object.entries(FONTS).map(([k, [n, f]]) => `<button data-font="${k}" class="${C.font === k ? 'on' : ''}" style="font-family:${f}">${n}</button>`).join('')}</div></div>
        <div class="cz-row col"><span>${u('czWidth')}</span><div class="seg">${['narrow', 'normal', 'wide'].map((k) => `<button data-w="${k}" class="${C.width === k ? 'on' : ''}">${u('cz' + k[0].toUpperCase() + k.slice(1))}</button>`).join('')}</div></div>
        <label class="cz-row chk"><span>${u('czMotion')}</span><input type="checkbox" class="mo" ${C.motion ? 'checked' : ''}></label>
        <label class="cz-row chk"><span>${u('czGlow')}</span><input type="checkbox" class="gl" ${C.glow ? 'checked' : ''}></label>
        <button class="btn ghost sm cz-reset">${u('czReset')}</button>
      </div></div>`);
    document.body.appendChild(p);
    const redraw = () => { p.remove(); open(); };
    p.querySelector('.cz-x').onclick = () => p.remove();
    p.querySelectorAll('[data-th]').forEach((b) => (b.onclick = () => { MLS.S.theme = b.dataset.th; store.set('theme', MLS.S.theme); document.documentElement.dataset.theme = MLS.S.theme; save(); redraw(); }));
    p.querySelectorAll('.cz-presets button').forEach((b) => (b.onclick = () => { const x = PRESETS[+b.dataset.i]; C.accent = x.a; C.accent2 = x.b; save(); redraw(); }));
    p.querySelector('.c1').oninput = (e) => { C.accent = e.target.value; save(); };
    p.querySelector('.c2').oninput = (e) => { C.accent2 = e.target.value; save(); };
    p.querySelectorAll('[data-bg]').forEach((b) => (b.onclick = () => { C.bg = b.dataset.bg; save(); redraw(); }));
    p.querySelectorAll('input[type=range]').forEach((r) => (r.oninput = () => { C[r.dataset.k] = +r.value; p.querySelector('.v-' + r.dataset.k).textContent = r.value + r.dataset.u; save(); }));
    p.querySelectorAll('[data-font]').forEach((b) => (b.onclick = () => { C.font = b.dataset.font; save(); redraw(); }));
    p.querySelectorAll('[data-w]').forEach((b) => (b.onclick = () => { C.width = b.dataset.w; save(); redraw(); }));
    p.querySelector('.mo').onchange = (e) => { C.motion = e.target.checked; save(); };
    p.querySelector('.gl').onchange = (e) => { C.glow = e.target.checked; save(); };
    p.querySelector('.cz-reset').onclick = () => { C = { ...DEF }; save(); redraw(); toast('↺'); };
  }
  MLS.openCustomizer = open;

  // 🎨 button in the top bar (replaces the old colour dots)
  const lt = document.querySelector('.lang-toggle');
  const btn = h(`<button class="icon-btn cz-btn" title="${u('cz')}" aria-label="${u('cz')}">🎨</button>`);
  lt.before(btn);
  btn.onclick = (e) => { e.stopPropagation(); open(); };
})();

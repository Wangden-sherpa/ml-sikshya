/* ML Sikshya — upgrades: site colour picker, search (Ctrl+K), XP levels, daily streak, badges, certificate. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast, store, S } = MLS;
  const C = window.COURSE;

  Object.assign(MLS.UI, {
    searchPh: { en: 'Search lessons, projects, terms…  (Ctrl + K)', ne: 'पाठ, प्रोजेक्ट, शब्द खोज्नुहोस्…  (Ctrl + K)', zh: '搜索课程、项目、术语…（Ctrl + K）' },
    noResults: { en: 'No results — try another word.', ne: 'केही भेटिएन — अर्को शब्द प्रयास गर्नुहोस्।', zh: '没有结果——换个词试试。' },
    siteColor: { en: 'Site colour', ne: 'साइटको रङ', zh: '网站配色' },
    achTitle: { en: '🏆 Your achievements', ne: '🏆 तपाईंका उपलब्धि', zh: '🏆 你的成就' },
    xpLevel: { en: 'Level', ne: 'तह', zh: '等级' },
    toNext: { en: 'XP to the next level', ne: 'अर्को तहसम्म XP', zh: '升到下一级还需 XP' },
    dayStreak: { en: 'day streak', ne: 'दिनको लगातार अभ्यास', zh: '天连续学习' },
    badgeNew: { en: 'New badge unlocked!', ne: 'नयाँ ब्याज खुल्यो!', zh: '解锁新徽章！' },
    certificate: { en: '🎓 Certificate', ne: '🎓 प्रमाणपत्र', zh: '🎓 证书' },
    certTitle: { en: 'Certificate of Completion', ne: 'समापन प्रमाणपत्र', zh: '结业证书' },
    certLine1: { en: 'This certifies that', ne: 'यो प्रमाणित गरिन्छ कि', zh: '兹证明' },
    certLine2: { en: 'has successfully completed all 28 lessons of the Machine Learning course — from foundations to deep learning and professional practice.', ne: 'ले मेसिन लर्निङ कोर्सका सबै २८ पाठ सफलतापूर्वक पूरा गर्नुभएको छ — आधारभूत ज्ञानदेखि डिप लर्निङ र पेशेवर अभ्याससम्म।', zh: '已成功完成机器学习课程全部 28 课——从基础知识到深度学习与专业实践。' },
    certName: { en: 'Your name', ne: 'तपाईंको नाम', zh: '你的名字' },
    certPrint: { en: '🖨️ Print / save as PDF', ne: '🖨️ प्रिन्ट / PDF सेभ', zh: '🖨️ 打印 / 保存为 PDF' },
    certLocked: { en: '🔒 Finish all lessons to unlock your certificate. Below is a preview.', ne: '🔒 प्रमाणपत्र खोल्न सबै पाठ पूरा गर्नुहोस्। तल पूर्वावलोकन छ।', zh: '🔒 完成全部课程即可解锁证书。下面是预览。' },
    certDate: { en: 'Date', ne: 'मिति', zh: '日期' },
    certOpen: { en: 'View certificate', ne: 'प्रमाणपत्र हेर्नुहोस्', zh: '查看证书' },
  });

  // ---------- Site accent colour ----------
  const ACCENTS = [['', '#4f46e5'], ['royal', '#7c3aed'], ['ocean', '#0284c7'], ['forest', '#15803d'], ['sunset', '#ea580c'], ['rose', '#e11d48']];
  const applyAccent = (a) => { if (a) document.documentElement.dataset.accent = a; else delete document.documentElement.dataset.accent; };
  applyAccent(store.get('accent', ''));

  // ---------- Activity tracking ----------
  const today = () => new Date().toISOString().slice(0, 10);
  const markDay = () => { const d = store.get('days', []); if (!d.includes(today())) { d.push(today()); store.set('days', d.slice(-400)); } };
  function streak() {
    const d = new Set(store.get('days', []));
    let n = 0; const day = new Date();
    if (!d.has(today())) day.setDate(day.getDate() - 1);
    while (d.has(day.toISOString().slice(0, 10))) { n++; day.setDate(day.getDate() - 1); }
    return n;
  }
  MLS.hooks.run.push(() => { store.set('runs', store.get('runs', 0) + 1); markDay(); check(); });
  MLS.hooks.afterRender.push((route, arg) => {
    if (route === 'lab3d') { const s = new Set(store.get('seen3d', [])); s.add(arg || 'loss'); store.set('seen3d', [...s]); }
    if (route === 'datalab') store.set('datalab', true);
    if (Object.values(S.done).some(Boolean)) markDay();
    check();
  });

  // ---------- XP & levels ----------
  const LEVELS_XP = [
    [0, { en: 'Beginner', ne: 'सुरुवाती', zh: '新手' }], [300, { en: 'Explorer', ne: 'अन्वेषक', zh: '探索者' }],
    [900, { en: 'Practitioner', ne: 'अभ्यासकर्ता', zh: '实践者' }], [1800, { en: 'ML Engineer', ne: 'ML इन्जिनियर', zh: 'ML 工程师' }],
    [3000, { en: 'Expert', ne: 'विशेषज्ञ', zh: '专家' }], [4300, { en: 'Master', ne: 'गुरु', zh: '大师' }],
  ];
  function xp() {
    const lessons = C.lessons.filter((l) => S.done[l.id]).length * 100;
    const quiz = Math.round(Object.values(S.quiz).reduce((a, b) => a + b, 0) * 50);
    const runs = Math.min(store.get('runs', 0), 150) * 2;
    const extra = (store.get('datalab', false) ? 150 : 0) + store.get('seen3d', []).length * 20;
    return lessons + quiz + runs + extra;
  }
  function levelOf(x) {
    let i = 0; LEVELS_XP.forEach(([min], j) => { if (x >= min) i = j; });
    const next = LEVELS_XP[i + 1];
    return { i, name: LEVELS_XP[i][1], next: next ? next[0] : null, pct: next ? ((x - LEVELS_XP[i][0]) / (next[0] - LEVELS_XP[i][0])) * 100 : 100 };
  }

  // ---------- Badges ----------
  const lvDone = (lv) => C.lessons.filter((l) => l.level === lv).every((l) => S.done[l.id]);
  const BADGES = [
    { id: 'first', icon: '🌱', name: { en: 'First step', ne: 'पहिलो कदम', zh: '第一步' }, how: { en: 'Complete 1 lesson', ne: '१ पाठ पूरा', zh: '完成 1 课' }, ok: () => C.lessons.some((l) => S.done[l.id]) },
    ...MLS.LEVELS.map((lv) => ({ id: 'lv-' + lv.id, icon: lv.emoji, name: lv.title, how: { en: 'Finish this level', ne: 'यो तह पूरा', zh: '完成本级' }, ok: () => lvDone(lv.id) })),
    { id: 'quiz', icon: '🎯', name: { en: 'Quiz ace', ne: 'क्विज विजेता', zh: '测验高手' }, how: { en: '5 perfect quizzes', ne: '५ वटा पूर्ण क्विज', zh: '5 次满分测验' }, ok: () => Object.values(S.quiz).filter((v) => v === 1).length >= 5 },
    { id: 'coder', icon: '⌨️', name: { en: 'Coder', ne: 'कोडर', zh: '程序员' }, how: { en: 'Run code 20 times', ne: '२० पटक कोड चलाउने', zh: '运行代码 20 次' }, ok: () => store.get('runs', 0) >= 20 },
    { id: 'data', icon: '📊', name: { en: 'Data scientist', ne: 'डाटा वैज्ञानिक', zh: '数据科学家' }, how: { en: 'Use the Data Lab', ne: 'डाटा ल्याब प्रयोग', zh: '使用数据实验室' }, ok: () => store.get('datalab', false) },
    { id: '3d', icon: '🧊', name: { en: '3D explorer', ne: '3D अन्वेषक', zh: '3D 探索者' }, how: { en: 'Open 5 models in 3D Lab', ne: '3D ल्याबमा ५ मोडेल', zh: '在 3D 实验室打开 5 个模型' }, ok: () => store.get('seen3d', []).length >= 5 },
    { id: 's3', icon: '🔥', name: { en: 'On fire', ne: 'जोसिलो', zh: '火力全开' }, how: { en: '3-day streak', ne: '३ दिन लगातार', zh: '连续学习 3 天' }, ok: () => streak() >= 3 },
    { id: 's7', icon: '⚡', name: { en: 'Unstoppable', ne: 'नरोकिने', zh: '势不可挡' }, how: { en: '7-day streak', ne: '७ दिन लगातार', zh: '连续学习 7 天' }, ok: () => streak() >= 7 },
    { id: 'grad', icon: '🎓', name: { en: 'Graduate', ne: 'स्नातक', zh: '毕业生' }, how: { en: 'Finish all 28 lessons', ne: 'सबै २८ पाठ पूरा', zh: '完成全部 28 课' }, ok: () => C.lessons.every((l) => S.done[l.id]) },
  ];
  let checking = false;
  function check() {
    if (checking) return; checking = true;
    const have = new Set(store.get('badges', []));
    const fresh = BADGES.filter((b) => !have.has(b.id) && b.ok());
    if (fresh.length) {
      fresh.forEach((b) => have.add(b.id));
      store.set('badges', [...have]);
      const b = fresh[fresh.length - 1];
      const el = h(`<div class="badge-toast"><span class="bi">${b.icon}</span><div>${u('badgeNew')}<br><span style="font-weight:600">${esc(t(b.name))}</span></div></div>`);
      document.body.appendChild(el); setTimeout(() => el.remove(), 3800);
    }
    checking = false;
  }

  // ---------- Home: achievements ----------
  MLS.hooks.home.push((el) => {
    const x = xp(), L = levelOf(x), st = streak(), have = new Set(store.get('badges', []));
    const sec = h(`<section>
      <div class="section-title"><h2>${u('achTitle')}</h2><a class="btn ghost sm" href="#/certificate">${u('certificate')}</a></div>
      <div class="card xp-card"><div class="xp-ring" style="--p:${L.pct.toFixed(0)}"><div><b>${x}</b>XP</div></div>
        <div class="xp-meta"><h3>${u('xpLevel')} ${L.i + 1}: ${esc(t(L.name))}</h3>
          <div class="bar"><span style="width:${L.pct.toFixed(0)}%"></span></div>
          <p class="muted">${L.next ? `${L.next - x} ${u('toNext')}` : '🏅 MAX'}</p>
          <p><span class="streak">🔥 ${st} ${u('dayStreak')}</span></p></div></div>
      <div class="badges">${BADGES.map((b) => `<div class="badge ${have.has(b.id) ? 'got' : ''}"><span class="bi">${b.icon}</span><b>${esc(t(b.name))}</b><span>${esc(t(b.how))}</span></div>`).join('')}</div>
    </section>`);
    const anchor = el.querySelector('.section-title');
    if (anchor) anchor.before(sec); else el.appendChild(sec);
  });

  // ---------- Certificate ----------
  MLS.routes.certificate = () => {
    const done = C.lessons.filter((l) => S.done[l.id]).length, all = done === C.lessons.length;
    const date = new Date().toLocaleDateString(S.lang === 'zh' ? 'zh-CN' : S.lang === 'ne' ? 'ne-NP' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const el = h(`<div class="container cert-wrap">
      <h1>${u('certificate')}</h1>
      ${all ? '' : `<div class="cert-locked">${u('certLocked')} (${done}/${C.lessons.length})</div>`}
      <div class="cert-tools"><input class="nm-in" placeholder="${u('certName')}" value="${esc(store.get('cert-name', ''))}" ${all ? '' : 'disabled'}>
        <button class="btn print" ${all ? '' : 'disabled'}>${u('certPrint')}</button></div>
      <div class="certificate">
        <div class="brand-c">ML SIKSHYA · मेसिन लर्निङ शिक्षा · 机器学习</div>
        <h1>${u('certTitle')}</h1>
        <p>${u('certLine1')}</p>
        <div class="nm">${esc(store.get('cert-name', '') || (all ? '…' : 'PREVIEW'))}</div>
        <p>${u('certLine2')}</p>
        <div class="foot"><span>${u('certDate')}: ${date}</span><span>${C.lessons.length} lessons · ${C.projects.length} projects · XP ${xp()}</span></div>
        <div class="seal">🎓</div>
      </div></div>`);
    const inp = el.querySelector('.nm-in'), nm = el.querySelector('.certificate .nm');
    inp.oninput = () => { store.set('cert-name', inp.value); nm.textContent = inp.value || '…'; };
    el.querySelector('.print').onclick = () => window.print();
    return el;
  };

  // ---------- Search ----------
  const plain = (html) => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent.replace(/\s+/g, ' '); };
  function openSearch() {
    if (document.querySelector('.search-modal')) return;
    const m = h(`<div class="search-modal"><div class="search-box"><input placeholder="${u('searchPh')}"><div class="search-res"></div></div></div>`);
    document.body.appendChild(m);
    const inp = m.querySelector('input'), res = m.querySelector('.search-res');
    const items = [
      ...C.lessons.map((l) => ({ icon: '📘', title: t(l.title), href: '#/learn/' + l.id, text: plain(t(l.body)), kind: u('learn') })),
      ...C.projects.map((p) => ({ icon: p.icon, title: t(p.title), href: '#/project/' + p.id, text: t(p.summary) + ' ' + t(p.goal), kind: u('projects') })),
      ...C.glossary.map((g) => ({ icon: '📖', title: g.term + ' · ' + (S.lang === 'zh' ? g.zh || g.ne : g.ne), href: '#/glossary', text: t(g.def), kind: u('glossary') })),
      ...Object.entries(MLS.ml3d ? MLS.ml3d.INFO : {}).map(([k, v]) => ({ icon: v.icon, title: t(v.title), href: '#/lab3d/' + k, text: t(v.desc), kind: u('lab3d') })),
      { icon: '📊', title: u('datalab'), href: '#/datalab', text: 'upload csv excel data', kind: '' }, { icon: '⌨️', title: u('playground'), href: '#/playground', text: 'python code', kind: '' },
    ];
    let sel = 0, cur = [];
    const draw = () => {
      const q = inp.value.trim().toLowerCase();
      cur = !q ? items.slice(0, 8) : items.map((it) => {
        const ti = it.title.toLowerCase(), tx = it.text.toLowerCase();
        const sc = (ti.includes(q) ? 10 : 0) + (tx.split(q).length - 1);
        return [sc, it];
      }).filter((x) => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 12).map((x) => x[1]);
      sel = Math.min(sel, Math.max(cur.length - 1, 0));
      res.innerHTML = cur.length ? cur.map((it, i) => `<a href="${it.href}" class="${i === sel ? 'sel' : ''}">${it.icon} ${esc(it.title)}<small>${esc(it.kind)}</small></a>`).join('') : `<div class="none">${u('noResults')}</div>`;
    };
    const closeS = () => m.remove();
    m.onclick = (e) => { if (e.target === m || e.target.closest('a')) setTimeout(closeS); };
    inp.oninput = () => { sel = 0; draw(); };
    inp.onkeydown = (e) => {
      if (e.key === 'Escape') closeS();
      else if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, cur.length - 1); draw(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
      else if (e.key === 'Enter' && cur[sel]) { location.hash = cur[sel].href; closeS(); }
    };
    draw(); inp.focus();
  }
  document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); } });

  // ---------- Top bar buttons (search + colour) ----------
  const lt = document.querySelector('.lang-toggle');
  const sBtn = h(`<button class="icon-btn" aria-label="Search" title="Search (Ctrl+K)">🔍</button>`);
  const aWrap = h(`<div class="accent-wrap"><button class="icon-btn" aria-label="Colour" title="Colour">🎨</button></div>`);
  lt.before(sBtn, aWrap);
  sBtn.onclick = openSearch;
  aWrap.querySelector('button').onclick = (e) => {
    e.stopPropagation();
    const old = aWrap.querySelector('.accent-pop'); if (old) { old.remove(); return; }
    const cur = store.get('accent', '');
    const pop = h(`<div class="accent-pop"><b>🎨 ${u('siteColor')}</b><div class="accent-dots">${ACCENTS.map(([k, c]) => `<button data-a="${k}" class="${k === cur ? 'on' : ''}" style="background:${c}"></button>`).join('')}</div></div>`);
    pop.querySelectorAll('button').forEach((b) => (b.onclick = () => { store.set('accent', b.dataset.a); applyAccent(b.dataset.a); pop.remove(); }));
    aWrap.appendChild(pop);
  };
  document.addEventListener('click', (e) => { if (!e.target.closest('.accent-wrap')) { const p = document.querySelector('.accent-pop'); if (p) p.remove(); } });
})();

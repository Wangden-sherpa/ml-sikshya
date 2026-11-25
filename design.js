/* ML Tutor — design: home "Meet your AI teachers" (Asha and Kiran, code-drawn, no photos), animated hero particles. */
(() => {
  const MLS = window.MLS;
  const { u, t, h, esc } = MLS;
  Object.assign(MLS.UI, {
    meetT: { en: 'Meet your AI teachers', ne: 'आफ्ना AI शिक्षकहरूलाई भेट्नुहोस्', zh: '认识你的 AI 老师' },
    meetSub: { en: 'Asha and Kiran know every lesson, quiz, project and glossary term on ML Tutor. They see the lesson you are on and your code, guide you step by step, quiz you, and answer anything else too. Chat, talk by voice, or start a face-to-face call, in English, नेपाली or 中文.', ne: 'आशा र किरणलाई ML Tutor का सबै पाठ, क्विज, प्रोजेक्ट र शब्दावली थाहा छ। तपाईं कुन पाठमा हुनुहुन्छ र तपाईंको कोड हेर्छन्, चरणबद्ध रूपमा सिकाउँछन्, क्विज सोध्छन्, र अरू जे पनि जवाफ दिन्छन्। अङ्ग्रेजी, नेपाली वा 中文 मा च्याट, आवाज वा आमने-सामने कल गर्नुहोस्।', zh: 'Asha 和 Kiran 熟悉 ML Tutor 的每一课、测验、项目和术语。他们能看到你正在学的课程和你的代码，一步步指导你、给你出题，也能回答其他任何问题。可以用英语、尼泊尔语或中文聊天、语音或面对面通话。' },
    chatWith: { en: '💬 Chat', ne: '💬 च्याट', zh: '💬 聊天' },
    callWith: { en: '📹 Face-to-face call', ne: '📹 आमने-सामने कल', zh: '📹 面对面通话' },
    designT: { en: '🎨 Design my teacher', ne: '🎨 मेरो शिक्षक डिजाइन', zh: '🎨 设计我的老师' },
    emmaLink: { en: 'Emma & Nora (Nuance Labs)', ne: 'Emma र Nora (Nuance Labs)', zh: 'Emma 和 Nora（Nuance Labs）' },
    online: { en: 'Online now', ne: 'अहिले अनलाइन', zh: '在线' },
  });

  MLS.hooks.home.push((el) => {
    const live = MLS.liveEnabled && MLS.liveEnabled();
    const T = MLS.TEACHERS || {}, cur = MLS.teacherId ? MLS.teacherId() : 'asha';
    const sec = h(`<section class="teachers one">
      <div class="teachers-text"><span class="new-badge big">AI</span><h2>${u('meetT')}</h2><p class="muted">${u('meetSub')}</p>
        <div class="tc-actions big"><button class="btn chat">${u('chatWith')}</button><button class="btn ghost tc-call">${u('callWith')}</button>
        ${live ? `<button class="btn tc-live">${u('liveBtn')}</button>` : ''}<button class="btn ghost tc-design">${u('designT')}</button></div>
        <p class="small muted tc-emma">📹 <a href="#/" class="emma-link">${u('emmaLink')}</a></p></div>
      <div class="teacher-stage two">${Object.keys(T).map((k) => `<button class="tc-pick ${k === cur ? 'on' : ''}" data-t="${k}">
          <div class="teacher-avatar">${MLS.avatarSVG(null, '', k)}</div><b>${esc(t(T[k].name))}</b><small>${esc(t(T[k].role))}</small></button>`).join('')}
        <span class="tc-online">● ${u('online')}</span></div></section>`);
    sec.querySelector('.chat').onclick = () => MLS.openTutor();
    sec.querySelector('.tc-call').onclick = () => MLS.openCall();
    const lv = sec.querySelector('.tc-live'); if (lv) lv.onclick = () => MLS.openLive();
    sec.querySelector('.tc-design').onclick = () => { MLS.openTutor(); setTimeout(() => { const b = document.querySelector('.tutor .set'); if (b && document.querySelector('.tutor-settings').hidden) b.click(); }, 50); };
    sec.querySelector('.emma-link').onclick = (e) => { e.preventDefault(); MLS.openEmmaNora && MLS.openEmmaNora(); };
    sec.querySelectorAll('.tc-pick').forEach((b) => (b.onclick = () => { MLS.setTeacher(b.dataset.t); MLS.openTutor(); }));
    const hero = el.querySelector('.hero');
    (hero || el.firstElementChild).after(sec);

    if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const cv = document.createElement('canvas'); cv.className = 'hero-particles'; hero.prepend(cv);
      const ctx = cv.getContext('2d'); let W = 0, H = 0, raf = 0;
      const P = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0009, vy: (Math.random() - 0.5) * 0.0009 }));
      const size = () => { W = cv.width = hero.clientWidth * devicePixelRatio; H = cv.height = hero.clientHeight * devicePixelRatio; };
      const draw = () => {
        if (!document.body.contains(cv)) { cancelAnimationFrame(raf); return; }
        raf = requestAnimationFrame(draw);
        if (!W) size();
        ctx.clearRect(0, 0, W, H);
        P.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > 1) p.vx *= -1; if (p.y < 0 || p.y > 1) p.vy *= -1; });
        for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
          const dx = (P[i].x - P[j].x) * W, dy = (P[i].y - P[j].y) * H, d = Math.hypot(dx, dy), max = 140 * devicePixelRatio;
          if (d < max) { ctx.strokeStyle = `rgba(255,255,255,${0.22 * (1 - d / max)})`; ctx.lineWidth = devicePixelRatio; ctx.beginPath(); ctx.moveTo(P[i].x * W, P[i].y * H); ctx.lineTo(P[j].x * W, P[j].y * H); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        P.forEach((p) => { ctx.beginPath(); ctx.arc(p.x * W, p.y * H, 2 * devicePixelRatio, 0, Math.PI * 2); ctx.fill(); });
      };
      window.addEventListener('resize', size);
      requestAnimationFrame(draw);
    }
  });
})();

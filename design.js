/* ML Sikshya — design upgrades: "Meet your teachers", animated hero particles, page transitions. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc } = MLS;
  Object.assign(MLS.UI, {
    meetT: { en: 'Meet your AI teachers', ne: 'आफ्ना AI शिक्षकलाई भेट्नुहोस्', zh: '认识你的 AI 老师' },
    meetSub: { en: 'Ask anything — machine learning, school subjects, coding, careers or life. Chat by text, talk by voice, or start a face-to-face video call. They answer in your language.', ne: 'जे पनि सोध्नुहोस् — मेसिन लर्निङ, विद्यालयका विषय, कोडिङ, करियर वा जीवन। टाइप गरेर, बोलेर, वा आमने-सामने भिडियो कलमा कुरा गर्नुहोस्। उहाँहरू तपाईंकै भाषामा जवाफ दिनुहुन्छ।', zh: '什么都可以问——机器学习、各科学习、编程、职业或生活。可以打字、语音，或开启面对面视频通话。他们会用你的语言回答。' },
    chatWith: { en: '💬 Chat', ne: '💬 च्याट', zh: '💬 聊天' },
    callWith: { en: '📹 Video call', ne: '📹 भिडियो कल', zh: '📹 视频通话' },
    online: { en: 'Online now', ne: 'अहिले अनलाइन', zh: '在线' },
  });

  // ---------- Home: meet the teachers ----------
  MLS.hooks.home.push((el) => {
    const L = MLS.tutorLooks || {};
    const keys = ['feng', 'wang'].filter((k) => L[k]);
    if (!keys.length) return;
    const sec = h(`<section class="teachers">
      <div class="teachers-text"><span class="new-badge big">AI</span><h2>${u('meetT')}</h2><p class="muted">${u('meetSub')}</p></div>
      <div class="teacher-cards">${keys.map((k) => `<div class="teacher-card" style="--c1:${L[k].bg[0]};--c2:${L[k].bg[1]}">
        <div class="tc-photo"><img src="${L[k].photo}" alt="${esc(L[k].name)}"><span class="tc-online">● ${u('online')}</span></div>
        <h3>${esc(L[k].name)}</h3><p>${esc(t(L[k].title))}</p>
        <div class="tc-actions"><button class="btn sm chat" data-k="${k}">${u('chatWith')}</button><button class="btn sm tc-call" data-k="${k}">${u('callWith')}</button></div></div>`).join('')}</div></section>`);
    sec.querySelectorAll('.chat').forEach((b) => (b.onclick = () => { MLS.setTutor(b.dataset.k); MLS.openTutor(); }));
    sec.querySelectorAll('.tc-call').forEach((b) => (b.onclick = () => { MLS.setTutor(b.dataset.k); MLS.openCall(); }));
    const hero = el.querySelector('.hero');
    (hero || el.firstElementChild).after(sec);

    // ---------- Hero: animated particle network ----------
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

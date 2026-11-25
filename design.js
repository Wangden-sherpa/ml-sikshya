/* ML Tutor — design: "Meet your AI teacher" (code-drawn human avatar, no photos), animated hero particles. */
(() => {
  const MLS = window.MLS;
  const { u, h } = MLS;
  Object.assign(MLS.UI, {
    meetT: { en: 'Meet your AI teacher', ne: 'आफ्नो AI शिक्षकलाई भेट्नुहोस्', zh: '认识你的 AI 老师' },
    meetSub: { en: 'Ask anything — machine learning, school subjects, coding, careers or life. Chat by text, talk by voice, or start a face-to-face call. Your teacher answers in your language — and you can design how they look.', ne: 'जे पनि सोध्नुहोस् — मेसिन लर्निङ, विद्यालयका विषय, कोडिङ, करियर वा जीवन। टाइप गरेर, बोलेर, वा आमने-सामने कलमा कुरा गर्नुहोस्। शिक्षकले तपाईंकै भाषामा जवाफ दिन्छन् — र उनी कस्ता देखिने भन्ने तपाईं आफैं डिजाइन गर्न सक्नुहुन्छ।', zh: '什么都可以问——机器学习、各科学习、编程、职业或生活。可以打字、语音，或开启面对面通话。老师会用你的语言回答——你还可以设计老师的样子。' },
    chatWith: { en: '💬 Chat', ne: '💬 च्याट', zh: '💬 聊天' },
    callWith: { en: '📞 Voice call', ne: '📞 आवाज कल', zh: '📞 语音通话' },
    designT: { en: '🎨 Design my teacher', ne: '🎨 मेरो शिक्षक डिजाइन', zh: '🎨 设计我的老师' },
    online: { en: 'Online now', ne: 'अहिले अनलाइन', zh: '在线' },
  });

  MLS.hooks.home.push((el) => {
    const live = MLS.liveEnabled && MLS.liveEnabled();
    const sec = h(`<section class="teachers one">
      <div class="teachers-text"><span class="new-badge big">AI</span><h2>${u('meetT')}</h2><p class="muted">${u('meetSub')}</p>
        <div class="tc-actions big"><button class="btn chat">${u('chatWith')}</button><button class="btn ghost tc-call">${u('callWith')}</button>
        ${live ? `<button class="btn tc-live">${u('liveBtn')}</button>` : ''}<button class="btn ghost tc-design">${u('designT')}</button></div></div>
      <div class="teacher-stage"><div class="teacher-avatar">${MLS.avatarSVG()}</div><span class="tc-online">● ${u('online')}</span></div></section>`);
    sec.querySelector('.chat').onclick = () => MLS.openTutor();
    sec.querySelector('.tc-call').onclick = () => MLS.openCall();
    const lv = sec.querySelector('.tc-live'); if (lv) lv.onclick = () => MLS.openLive();
    sec.querySelector('.tc-design').onclick = () => { MLS.openTutor(); setTimeout(() => { const b = document.querySelector('.tutor .set'); if (b) b.click(); }, 50); };
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

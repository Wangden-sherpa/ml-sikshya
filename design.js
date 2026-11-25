/* ML Tutor — design: home "Talk to Emma or Nora" section (strings in emma-nora.js), animated hero particles. */
(() => {
  const MLS = window.MLS;
  const { u, h } = MLS;
  MLS.hooks.home.push((el) => {
    const sec = h(`<section class="teachers one">
      <div class="teachers-text"><span class="new-badge big">AI</span><h2>${u('enTitle')}</h2><p class="muted">${u('enSub')}</p>
        <div class="tc-actions big"><button class="btn chat">${u('enStart')}</button></div>
        <p class="small muted">${u('enRules')}</p></div>
      <div class="teacher-stage"><div class="en-people">
        <div class="en-persona emma"><div class="en-face">E</div><b>Emma</b><span class="en-live">● Live</span></div>
        <div class="en-persona nora"><div class="en-face">N</div><b>Nora</b><span class="en-live">● Live</span></div></div></div></section>`);
    sec.querySelector('.chat').onclick = () => MLS.openTutor();
    sec.querySelectorAll('.en-persona').forEach((p) => (p.onclick = () => MLS.openTutor()));
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

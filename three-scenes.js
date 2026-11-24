/* ML Sikshya — interactive 3D models (Three.js). Adds: 3D Lab page, "See it in 3D" blocks in lessons, 3D showcase on home. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc } = MLS;

  // ---------- Text ----------
  Object.assign(MLS.UI, {
    see3d: { en: 'See it in 3D', ne: '3D मा हेर्नुहोस्' },
    drag3d: { en: 'Drag to rotate · scroll / pinch to zoom · right-drag to move', ne: 'घुमाउन तान्नुहोस् · zoom गर्न scroll / pinch · सार्न right-drag' },
    loading3d: { en: 'Loading 3D model…', ne: '3D मोडेल लोड हुँदैछ…' },
    fail3d: { en: '3D could not load (needs internet and WebGL).', ne: '3D लोड हुन सकेन (इन्टरनेट र WebGL चाहिन्छ)।' },
    lab3dIntro: { en: 'Rotate, zoom and play with machine-learning ideas in 3D. Pick a model on the left — every one is interactive.', ne: 'मेसिन लर्निङका विचारहरूलाई 3D मा घुमाउनुहोस्, zoom गर्नुहोस् र खेल्नुहोस्। बायाँबाट मोडेल छान्नुहोस् — सबै अन्तरक्रियात्मक छन्।' },
    openLesson: { en: 'Open the lesson →', ne: 'पाठ खोल्नुहोस् →' },
    homeShowTitle: { en: 'New: explore ML in 3D, with your own data and an AI tutor', ne: 'नयाँ: 3D मा ML, आफ्नै डाटा र AI सहायकसहित' },
    homeShowSub: { en: 'This is a real neural network firing signals — drag it to look around.', ne: 'यो सिग्नल पठाउँदै गरेको वास्तविक न्युरल नेटवर्क हो — तानेर वरिपरि हेर्नुहोस्।' },
    feat3d: { en: '17 interactive 3D models: loss surfaces, clusters, kernels, CNNs, attention…', ne: '१७ अन्तरक्रियात्मक 3D मोडेल: loss surface, cluster, kernel, CNN, attention…' },
    featData: { en: 'Upload your own CSV / Excel files — explore, chart, and train models on real data.', ne: 'आफ्नै CSV / Excel फाइल अपलोड गर्नुहोस् — वास्तविक डाटामा अन्वेषण, चार्ट र मोडेल तालिम।' },
    featAI: { en: 'Stuck? The AI tutor explains errors and gives suggestions in English or नेपाली.', ne: 'अड्कनुभयो? AI सहायकले error बुझाउँछ र अंग्रेजी वा नेपालीमा सुझाव दिन्छ।' },
    try: { en: 'Try it', ne: 'प्रयास गर्नुहोस्', zh: '试一试' },
  });

  // ---------- Three.js loading & stage ----------
  let libP = null, fxP = null;
  const lib = () => libP || (libP = Promise.all([import('three'), import('three/addons/controls/OrbitControls.js')])
    .then(([THREE, oc]) => ({ THREE, OrbitControls: oc.OrbitControls }))
    .catch((e) => { libP = null; throw e; }));
  // Cinematic extras (bloom glow, vignette, studio reflections). Optional: if they fail to load, the scenes still work.
  const fxLib = () => fxP || (fxP = Promise.all([
    import('three/addons/postprocessing/EffectComposer.js'), import('three/addons/postprocessing/RenderPass.js'),
    import('three/addons/postprocessing/UnrealBloomPass.js'), import('three/addons/postprocessing/ShaderPass.js'),
    import('three/addons/postprocessing/OutputPass.js'), import('three/addons/shaders/VignetteShader.js'),
    import('three/addons/environments/RoomEnvironment.js'),
  ]).then(([ec, rp, ub, sp, op, vs, re]) => ({ EffectComposer: ec.EffectComposer, RenderPass: rp.RenderPass, UnrealBloomPass: ub.UnrealBloomPass, ShaderPass: sp.ShaderPass, OutputPass: op.OutputPass, VignetteShader: vs.VignetteShader, RoomEnvironment: re.RoomEnvironment }))
    .catch((e) => { fxP = null; console.warn('3D: cinematic effects unavailable, using the basic renderer.', e); return null; }));

  // ---------- Picture quality (shared with the home-page hero) ----------
  const QUAL = { ultra: { en: '4K Ultra ✨', ne: '4K अल्ट्रा ✨', zh: '4K 超清 ✨' }, hd: { en: 'HD', ne: 'HD', zh: '高清' }, standard: { en: 'Standard (fast)', ne: 'साधारण (छिटो)', zh: '标准（流畅）' } };
  const QTITLE = { en: 'Picture quality', ne: 'चित्रको गुणस्तर', zh: '画质' };
  let qualKey = MLS.store.get('3d-quality', 'ultra');
  if (!QUAL[qualKey]) qualKey = 'ultra';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ultra is supersampled (up to 3x the screen's pixels), so edges and labels stay razor-sharp
  const basePR = () => { const d = window.devicePixelRatio || 1; return qualKey === 'ultra' ? Math.min(Math.max(d, 1) * 1.5, 3) : qualKey === 'hd' ? Math.min(d, 2) : Math.min(d, 1.5); };

  // ---------- Painted backdrops (opaque, so the glow can blend on top) ----------
  const BGP = {
    night: { base: '#070a1c', fog: 0x0d0f2e, glow: [[0.5, 0, 0.8, 1.35, [[0, '#1b1450'], [0.7, '#070a1c']]]], neb: [[0.15, 0.3, 0.3, 'rgba(34,211,238,.10)'], [0.85, 0.22, 0.34, 'rgba(168,85,247,.16)'], [0.6, 1, 0.38, 'rgba(244,114,182,.07)']] },
    space: { base: '#000000', fog: 0x05030c, glow: [[0.5, 1.2, 0.85, 1.3, [[0, '#1a1033'], [0.6, '#000000']]]], neb: [[0.22, 0.32, 0.36, 'rgba(124,58,237,.20)'], [0.8, 0.2, 0.3, 'rgba(34,211,238,.10)'], [0.62, 0.85, 0.34, 'rgba(244,114,182,.10)']] },
    dusk: { base: '#12081d', fog: 0x2a1033, glow: [[0.3, 0, 1, 1.6, [[0, '#7c2d72'], [0.45, '#2a1033'], [1, '#12081d']]]], neb: [] },
    sea: { base: '#020f1a', fog: 0x031c2e, glow: [[0.5, 0, 0.9, 1.5, [[0, '#0e7490'], [0.5, '#052e45'], [1, '#020f1a']]]], neb: [] },
    studio: { base: '#1f2937', fog: 0x2b2f36, glow: [[0.5, 0.3, 0.8, 1.2, [[0, '#4b5563'], [0.7, '#1f2937']]]], neb: [] },
  };
  function paintBg(THREE, P) {
    const c = document.createElement('canvas'), W = (c.width = 1024), H = (c.height = 512), g = c.getContext('2d');
    g.fillStyle = P.base; g.fillRect(0, 0, W, H);
    const blob = (x, y, rx, ry, stops) => {
      g.save(); g.translate(x * W, y * H); g.scale((rx * W) / (ry * H), 1);
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, ry * H);
      stops.forEach(([o, col]) => gr.addColorStop(o, col));
      g.fillStyle = gr; g.fillRect(-W * 4, -H * 4, W * 8, H * 8); g.restore();
    };
    P.glow.forEach(([x, y, rx, ry, stops]) => blob(x, y, rx, ry, stops));
    P.neb.forEach(([x, y, r, col]) => blob(x, y, r, (r * W) / H, [[0, col], [1, 'rgba(0,0,0,0)']]));
    const img = g.getImageData(0, 0, W, H), d = img.data; // tiny dither noise: no colour banding on big screens
    for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * 3; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    g.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const active = new Set();
  MLS.hooks.beforeRender.push(() => { active.forEach((s) => s.dispose()); active.clear(); });

  // ---------- Colour themes (chosen by the learner, saved in the browser) ----------
  const THEMES = {
    cosmic: { name: { en: 'Deep space neon ✨', ne: 'अन्तरिक्ष नियोन ✨', zh: '深空霓虹 ✨' }, a: 0xf472b6, b: 0x22d3ee, acc: 0xfde047, grad: ['#3b0764', '#c026d3', '#22d3ee'], pal: [0x22d3ee, 0xf472b6, 0xa855f7, 0xfacc15, 0x34d399, 0xfb923c, 0x60a5fa, 0xf87171, 0xa3e635, 0xe879f9] },
    aurora: { name: { en: 'Aurora', ne: 'अरोरा', zh: '极光' }, a: 0xef4444, b: 0x3b82f6, acc: 0xfde047, grad: ['#3b4cc0', '#2fd17a', '#ef4444'], pal: [0x6366f1, 0xec4899, 0x10b981, 0xf59e0b, 0x0ea5e9, 0x8b5cf6, 0xef4444, 0x14b8a6, 0xf97316, 0x84cc16] },
    ocean: { name: { en: 'Ocean', ne: 'समुद्र', zh: '海洋' }, a: 0x22d3ee, b: 0x6366f1, acc: 0xa5f3fc, grad: ['#0c1a5b', '#0ea5e9', '#e0f2fe'], pal: [0x0ea5e9, 0x22d3ee, 0x6366f1, 0x14b8a6, 0x38bdf8, 0x818cf8, 0x2dd4bf, 0x60a5fa, 0xa5f3fc, 0x3b82f6] },
    sunset: { name: { en: 'Sunset', ne: 'सूर्यास्त', zh: '日落' }, a: 0xf97316, b: 0xa855f7, acc: 0xfde68a, grad: ['#4c1d95', '#ec4899', '#fbbf24'], pal: [0xf97316, 0xec4899, 0xa855f7, 0xfbbf24, 0xef4444, 0xf472b6, 0xfb923c, 0xc084fc, 0xfde68a, 0xdb2777] },
    forest: { name: { en: 'Forest', ne: 'वन', zh: '森林' }, a: 0x84cc16, b: 0x0d9488, acc: 0xfef08a, grad: ['#064e3b', '#22c55e', '#fef08a'], pal: [0x22c55e, 0x84cc16, 0x0d9488, 0xeab308, 0x15803d, 0xa3e635, 0x10b981, 0xca8a04, 0x65a30d, 0x14b8a6] },
    neon: { name: { en: 'Neon', ne: 'नियोन', zh: '霓虹' }, a: 0xff2bd6, b: 0x00e5ff, acc: 0xb6ff00, grad: ['#3a00ff', '#ff2bd6', '#b6ff00'], pal: [0xff2bd6, 0x00e5ff, 0xb6ff00, 0xffe600, 0x8b5cf6, 0xff6b00, 0x00ff9d, 0xff0055, 0x7c3aed, 0x00b3ff] },
    mono: { name: { en: 'Monochrome', ne: 'एकरङ', zh: '单色' }, a: 0xf8fafc, b: 0x64748b, acc: 0xfacc15, grad: ['#1e293b', '#94a3b8', '#ffffff'], pal: [0xf8fafc, 0x94a3b8, 0xcbd5e1, 0x64748b, 0xe2e8f0, 0x475569, 0xfacc15, 0x334155, 0xd1d5db, 0x9ca3af] },
  };
  const BGS = { night: { en: 'Night', ne: 'रात', zh: '夜空' }, space: { en: 'Deep space ✨', ne: 'अन्तरिक्ष ✨', zh: '深空 ✨' }, dusk: { en: 'Dusk', ne: 'साँझ', zh: '黄昏' }, sea: { en: 'Deep sea', ne: 'गहिरो समुद्र', zh: '深海' }, studio: { en: 'Studio grey', ne: 'स्टुडियो खैरो', zh: '影棚灰' } };
  let themeKey = MLS.store.get('3d-theme', 'cosmic'), bgKey = MLS.store.get('3d-bg', 'space');
  if (!THEMES[themeKey]) themeKey = 'cosmic';
  if (!BGS[bgKey]) bgKey = 'space';
  let PAL, CA, CB, CACC, GRAD;
  const applyTheme = () => { const T = THEMES[themeKey]; PAL = T.pal; CA = T.a; CB = T.b; CACC = T.acc; GRAD = T.grad; };
  applyTheme();
  const mulberry = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  const randn = (r) => { let a = 0; while (!a) a = r(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * r()); };

  async function stage(container, opts = {}) {
    const [{ THREE, OrbitControls }, FX] = await Promise.all([lib(), qualKey === 'standard' ? null : fxLib()]);
    const H = opts.height || 400;
    const W = container.clientWidth || 640;
    let pr = basePR();
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const look = BGP[bgKey] || BGP.night;
    const bgTex = paintBg(THREE, look);
    scene.background = bgTex;
    scene.fog = new THREE.Fog(look.fog, 18, 40);
    let envTex = null;
    if (FX) { // soft studio reflections on every shiny surface
      try {
        const pm = new THREE.PMREMGenerator(renderer), room = new FX.RoomEnvironment(renderer);
        envTex = pm.fromScene(room, 0.04).texture; scene.environment = envTex;
        pm.dispose(); if (room.dispose) room.dispose();
      } catch (e) { console.warn('3D: reflections off', e); }
    }
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 200);
    camera.position.set(...(opts.cam || [7, 5, 9]));
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = opts.autoRotate !== false;
    controls.autoRotateSpeed = 0.7;
    if (opts.target) controls.target.set(...opts.target);
    scene.add(new THREE.AmbientLight(0xffffff, envTex ? 0.5 : 0.75));
    const dl = new THREE.DirectionalLight(0xffffff, 1.2); dl.position.set(6, 12, 8); scene.add(dl);
    const pl = new THREE.PointLight(0xa78bfa, 1.2, 30); pl.position.set(-6, 4, -4); scene.add(pl);
    // neon rim lights in the theme colours: soft coloured edges on every object
    const rimA = new THREE.DirectionalLight(CB, 0.55); rimA.position.set(-9, 4, -7); scene.add(rimA);
    const rimB = new THREE.DirectionalLight(CA, 0.45); rimB.position.set(9, 3, -6); scene.add(rimB);
    // cinematic intro: the camera glides in (skipped for reduced motion, or as soon as you touch it)
    const camDist = camera.position.distanceTo(controls.target), tmpV = new THREE.Vector3();
    let intro = reduceMotion ? 1 : 0;
    renderer.domElement.addEventListener('pointerdown', () => { controls.autoRotate = false; intro = 1; });
    renderer.domElement.addEventListener('wheel', () => { intro = 1; }, { passive: true });

    // post-processing for HD / 4K Ultra: multisampled anti-aliasing + bloom glow + vignette
    let composer = null;
    if (FX) {
      try {
        composer = new FX.EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }));
        composer.setPixelRatio(pr); composer.setSize(W, H);
        composer.addPass(new FX.RenderPass(scene, camera));
        composer.addPass(new FX.UnrealBloomPass(new THREE.Vector2(W, H), qualKey === 'ultra' ? 0.9 : 0.7, 0.5, 0.86));
        const vig = new FX.ShaderPass(FX.VignetteShader); vig.uniforms.offset.value = 0.8; vig.uniforms.darkness.value = 1.05;
        composer.addPass(vig);
        composer.addPass(new FX.OutputPass());
      } catch (e) { console.warn('3D: effects off', e); composer = null; }
    }

    // "glow-up": shiny reflections + brighter neon emissives on whatever the scene builds
    const seen = new WeakSet();
    const polish = () => {
      scene.traverse((o) => {
        if (!o.material) return;
        [].concat(o.material).forEach((m) => {
          if (seen.has(m)) return;
          seen.add(m);
          if (!m.isMeshStandardMaterial) return;
          if (envTex) m.envMapIntensity = 0.5;
          if (composer && m.emissive && m.emissive.getHex() !== 0) m.emissiveIntensity *= 1.7;
        });
      });
    };
    let nextPolish = 0;

    const frames = [];
    let alive = true, raf = 0, visible = true;
    const clock = new THREE.Clock();
    const fit = () => {
      const w = container.clientWidth; if (!w) return;
      renderer.setPixelRatio(pr); renderer.setSize(w, H);
      if (composer) { composer.setPixelRatio(pr); composer.setSize(w, H); }
      camera.aspect = w / H; camera.updateProjectionMatrix();
    };
    let warm = 0, perfN = 0, perfT = 0, drops = 0;
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const raw = clock.getDelta(), dt = Math.min(raw, 0.05);
      if (!visible) return;
      if (intro < 1) {
        intro = Math.min(1, intro + dt / 1.8);
        tmpV.copy(camera.position).sub(controls.target).setLength(camDist * (1 + 0.6 * Math.pow(1 - intro, 3)));
        camera.position.copy(controls.target).add(tmpV);
      }
      frames.forEach((f) => f(dt, clock.elapsedTime));
      if (clock.elapsedTime >= nextPolish) { nextPolish = clock.elapsedTime + 0.6; polish(); }
      controls.update();
      if (composer) composer.render(dt); else renderer.render(scene, camera);
      // stay smooth: if this device can't hold ~30 fps, quietly render fewer pixels
      if (raw < 0.25 && ++warm > 45) {
        perfT += raw;
        if (++perfN === 45) {
          if (perfT / perfN > 0.036 && pr > 1 && drops < 3) { pr = Math.max(1, pr * 0.7); drops++; fit(); }
          perfN = 0; perfT = 0;
        }
      }
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(container);
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    loop();
    const s = {
      THREE, scene, camera, renderer, controls, polish,
      onFrame: (f) => frames.push(f),
      dispose() {
        if (!alive) return;
        alive = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); controls.dispose();
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) [].concat(o.material).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        });
        if (composer) { composer.passes.forEach((ps) => ps.dispose && ps.dispose()); if (composer.dispose) composer.dispose(); }
        bgTex.dispose(); if (envTex) envTex.dispose();
        renderer.dispose(); renderer.forceContextLoss && renderer.forceContextLoss(); renderer.domElement.remove();
        active.delete(s);
      },
    };
    active.add(s);
    return s;
  }

  // ---------- Helpers ----------
  function label(THREE, text, { size = 0.45, color = '#e2e8f0', bg = null } = {}) {
    const c = document.createElement('canvas'), ctx = c.getContext('2d'), fs = 64;
    const font = `600 ${fs}px Inter, "Noto Sans Devanagari", system-ui, sans-serif`;
    ctx.font = font;
    c.width = Math.ceil(ctx.measureText(text).width) + 28; c.height = fs + 28;
    ctx.font = font;
    if (bg) { ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(0, 0, c.width, c.height, 18) : ctx.rect(0, 0, c.width, c.height); ctx.fill(); }
    ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.fillText(text, 14, c.height / 2 + 2);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    sp.scale.set((size * c.width) / c.height, size, 1);
    sp.renderOrder = 10;
    return sp;
  }
  let dotTex = null;
  function dot(THREE) {
    if (dotTex) return dotTex;
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.55, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(32, 32, 30, 0, Math.PI * 2); g.fill();
    dotTex = new THREE.CanvasTexture(c);
    return dotTex;
  }
  function points(s, pos, cols, size = 0.16) {
    const { THREE } = s;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos.flat(), 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(cols.flatMap((c) => { const k = new THREE.Color(c); return [k.r, k.g, k.b]; }), 3));
    const m = new THREE.PointsMaterial({ size, vertexColors: true, map: dot(THREE), transparent: true, alphaTest: 0.2, depthWrite: false });
    const p = new THREE.Points(g, m);
    s.scene.add(p);
    return p;
  }
  function setColor(p, i, hex, THREE) { const c = new THREE.Color(hex); p.geometry.attributes.color.setXYZ(i, c.r, c.g, c.b); }
  function axes(s, len = 3.5, names = []) {
    const { THREE, scene } = s;
    const cols = [0xf87171, 0x4ade80, 0x60a5fa];
    [[len, 0, 0], [0, len, 0], [0, 0, len]].forEach((v, i) => {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-v[0], i === 1 ? 0 : -v[1], -v[2]), new THREE.Vector3(...v)]);
      scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: cols[i], transparent: true, opacity: 0.7 })));
      if (names[i]) { const l = label(THREE, names[i], { size: 0.38, color: '#' + cols[i].toString(16) }); l.position.set(v[0] * 1.12, v[1] * 1.12, v[2] * 1.12); scene.add(l); }
    });
    const grid = new THREE.GridHelper(len * 2, 12, 0x3b4a6b, 0x1f2a44); grid.material.transparent = true; grid.material.opacity = 0.5;
    scene.add(grid);
  }
  const heat = (THREE, v) => {
    v = Math.max(0, Math.min(1, v));
    const [a, b] = v < 0.5 ? [GRAD[0], GRAD[1]] : [GRAD[1], GRAD[2]];
    return new THREE.Color(a).lerp(new THREE.Color(b), v < 0.5 ? v * 2 : (v - 0.5) * 2);
  };
  const btn = (label, cls = '') => `<button class="v3-btn ${cls}">${label}</button>`;

  // ---------- Scenes ----------
  const SCENES = {
    async network(s, ctrl) {
      const { THREE, scene } = s;
      const layers = [4, 7, 7, 5, 3], cols = [0x60a5fa, 0xa78bfa, 0xc084fc, 0xf472b6, 0xfbbf24];
      const names = [{ en: 'Input', ne: 'इनपुट' }, { en: 'Hidden 1', ne: 'Hidden १' }, { en: 'Hidden 2', ne: 'Hidden २' }, { en: 'Hidden 3', ne: 'Hidden ३' }, { en: 'Output', ne: 'आउटपुट' }];
      const nodes = [], ONE = new THREE.Vector3(1, 1, 1);
      layers.forEach((n, li) => {
        const x = (li - (layers.length - 1) / 2) * 2.5, arr = [];
        for (let i = 0; i < n; i++) {
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.24, 28, 18), new THREE.MeshStandardMaterial({ color: cols[li], emissive: cols[li], emissiveIntensity: 0.35, roughness: 0.25, metalness: 0.3 }));
          m.position.set(x, (i - (n - 1) / 2) * 0.95, Math.sin(i * 1.7 + li) * 0.6);
          scene.add(m); arr.push(m);
        }
        const lb = label(THREE, t(names[li]), { size: 0.36 }); lb.position.set(x, -(Math.max(...layers) / 2) * 0.95 - 0.6, 0); scene.add(lb);
        nodes.push(arr);
      });
      const pts = [], edges = [];
      for (let l = 0; l < layers.length - 1; l++) nodes[l].forEach((a) => nodes[l + 1].forEach((b) => { pts.push(a.position, b.position); edges.push([a, b, l]); }));
      scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.16 })));
      const pg = new THREE.SphereGeometry(0.075, 10, 8), pm = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const pulses = [];
      let rate = 0.35;
      const spawn = () => { const first = edges.filter((e) => e[2] === 0); const e = first[Math.floor(Math.random() * first.length)]; const m = new THREE.Mesh(pg, pm); scene.add(m); pulses.push({ m, e, k: 0 }); };
      s.onFrame((dt) => {
        if (Math.random() < rate) spawn();
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i]; p.k += dt * 1.5;
          const [a, b, l] = p.e;
          p.m.position.lerpVectors(a.position, b.position, Math.min(p.k, 1));
          if (p.k >= 1) {
            b.scale.setScalar(1.4);
            if (l + 1 < layers.length - 1 && Math.random() < 0.85) { const nx = edges.filter((e) => e[0] === b); p.e = nx[Math.floor(Math.random() * nx.length)]; p.k = 0; }
            else { scene.remove(p.m); pulses.splice(i, 1); }
          }
        }
        nodes.forEach((arr) => arr.forEach((n) => n.scale.lerp(ONE, 0.07)));
      });
      ctrl.innerHTML = `<label>${t({ en: 'Signal speed', ne: 'सिग्नल गति' })} <input type="range" min="0.05" max="1" step="0.05" value="0.35"></label>`;
      ctrl.querySelector('input').oninput = (e) => { rate = +e.target.value; };
    },

    async loss(s, ctrl, info) {
      const { THREE, scene } = s;
      const f = (x, z) => 0.08 * (x * x + 1.6 * z * z) + 0.55 * Math.sin(0.9 * x) * Math.cos(0.7 * z) + 0.7;
      const size = 10, seg = 90;
      const g = new THREE.PlaneGeometry(size, size, seg, seg); g.rotateX(-Math.PI / 2);
      const pos = g.attributes.position; let mn = 1e9, mx = -1e9;
      for (let i = 0; i < pos.count; i++) { const y = f(pos.getX(i), pos.getZ(i)); pos.setY(i, y); mn = Math.min(mn, y); mx = Math.max(mx, y); }
      const cols = []; for (let i = 0; i < pos.count; i++) { const c = heat(THREE, (pos.getY(i) - mn) / (mx - mn)); cols.push(c.r, c.g, c.b); }
      g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); g.computeVertexNormals();
      scene.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.55, metalness: 0.1 })));
      scene.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.05 })));
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: CACC, emissiveIntensity: 0.6 }));
      scene.add(ball);
      const MAXT = 500, trailPos = new Float32Array(MAXT * 3);
      const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.BufferAttribute(trailPos, 3)); tg.setDrawRange(0, 0);
      scene.add(new THREE.Line(tg, new THREE.LineBasicMaterial({ color: CACC })));
      let x, z, n, lr = 1.0, acc = 0, done = false;
      const status = h(`<span class="v3-status"></span>`);
      const drop = () => { x = (Math.random() - 0.5) * 8.5; z = (Math.random() - 0.5) * 8.5; n = 0; done = false; tg.setDrawRange(0, 0); };
      drop();
      s.onFrame((dt) => {
        ball.position.set(x, f(x, z) + 0.2, z);
        if (done) return;
        acc += dt; if (acc < 0.07) return; acc = 0;
        const e = 1e-4, gx = (f(x + e, z) - f(x - e, z)) / (2 * e), gz = (f(x, z + e) - f(x, z - e)) / (2 * e);
        const nx = x - lr * gx, nz = z - lr * gz;
        if (n < MAXT) { trailPos.set([x, f(x, z) + 0.05, z], n * 3); n++; tg.setDrawRange(0, n); tg.attributes.position.needsUpdate = true; }
        if (Math.abs(nx) > 5 || Math.abs(nz) > 5) { done = true; status.textContent = t({ en: '💥 Diverged — the learning rate is too big!', ne: '💥 फैलियो — learning rate धेरै ठूलो!' }); return; }
        if (Math.hypot(nx - x, nz - z) < 1e-4 || n >= MAXT) { done = true; status.textContent = t({ en: `✅ Reached a minimum: loss = ${f(nx, nz).toFixed(3)} after ${n} steps`, ne: `✅ न्यूनतम बिन्दुमा पुग्यो: loss = ${f(nx, nz).toFixed(3)}, ${n} पाइलामा` }); }
        else status.textContent = `loss = ${f(nx, nz).toFixed(3)} · step ${n}`;
        x = nx; z = nz;
      });
      ctrl.innerHTML = `<label>${t({ en: 'Learning rate α', ne: 'Learning rate α' })} <input type="range" min="0.1" max="7" step="0.1" value="1"> <b class="lrv">1.0</b></label>${btn('🎲 ' + t({ en: 'Drop a new ball', ne: 'नयाँ बल खसाल्नुहोस्' }))}`;
      ctrl.appendChild(status);
      ctrl.querySelector('input').oninput = (e) => { lr = +e.target.value; ctrl.querySelector('.lrv').textContent = lr.toFixed(1); drop(); };
      ctrl.querySelector('.v3-btn').onclick = drop;
    },

    async regression(s, ctrl) {
      const { THREE, scene } = s;
      axes(s, 3.4, [t({ en: 'Area', ne: 'क्षेत्रफल' }), t({ en: 'Price', ne: 'मूल्य' }), t({ en: 'Rooms', ne: 'कोठा' })]);
      let group = null, noise = 0.35, seed = 3;
      const build = () => {
        if (group) { scene.remove(group); group.traverse((o) => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose(); }); }
        group = new THREE.Group(); scene.add(group);
        const r = mulberry(seed), P = [];
        for (let i = 0; i < 70; i++) { const x = (r() - 0.5) * 6, z = (r() - 0.5) * 6; P.push([x, 1.6 + 0.35 * x + 0.22 * z + randn(r) * noise, z]); }
        // least squares: y = b0 + b1 x + b2 z
        const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], B = [0, 0, 0];
        P.forEach(([x, y, z]) => { const v = [1, x, z]; for (let i = 0; i < 3; i++) { B[i] += v[i] * y; for (let j = 0; j < 3; j++) A[i][j] += v[i] * v[j]; } });
        for (let i = 0; i < 3; i++) for (let k = i + 1; k < 3; k++) { const m = A[k][i] / A[i][i]; for (let j = i; j < 3; j++) A[k][j] -= m * A[i][j]; B[k] -= m * B[i]; }
        const b = [0, 0, 0]; for (let i = 2; i >= 0; i--) { let sm = B[i]; for (let j = i + 1; j < 3; j++) sm -= A[i][j] * b[j]; b[i] = sm / A[i][i]; }
        const pg = new THREE.PlaneGeometry(6.4, 6.4, 1, 1); pg.rotateX(-Math.PI / 2);
        const pp = pg.attributes.position; for (let i = 0; i < pp.count; i++) pp.setY(i, b[0] + b[1] * pp.getX(i) + b[2] * pp.getZ(i));
        group.add(new THREE.Mesh(pg, new THREE.MeshStandardMaterial({ color: 0x818cf8, transparent: true, opacity: 0.45, side: THREE.DoubleSide })));
        const sg = new THREE.SphereGeometry(0.09, 14, 10), sm = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xf59e0b, emissiveIntensity: 0.3 });
        const lines = [];
        P.forEach(([x, y, z]) => { const m = new THREE.Mesh(sg, sm); m.position.set(x, y, z); group.add(m); lines.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x, b[0] + b[1] * x + b[2] * z, z)); });
        group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lines), new THREE.LineBasicMaterial({ color: 0xf87171, transparent: true, opacity: 0.7 })));
        ctrl.querySelector('.v3-status').innerHTML = `${t({ en: 'Learned plane', ne: 'सिकिएको समतल' })}: <b>price = ${b[0].toFixed(2)} + ${b[1].toFixed(2)}·area + ${b[2].toFixed(2)}·rooms</b> · <span style="color:#f87171">${t({ en: 'red lines = errors (residuals)', ne: 'रातो रेखा = गल्ती (residual)' })}</span>`;
      };
      ctrl.innerHTML = `<label>${t({ en: 'Noise', ne: 'Noise' })} <input type="range" min="0" max="1.5" step="0.05" value="0.35"></label>${btn('🎲 ' + t({ en: 'New data', ne: 'नयाँ डाटा' }))}<span class="v3-status"></span>`;
      ctrl.querySelector('input').oninput = (e) => { noise = +e.target.value; build(); };
      ctrl.querySelector('.v3-btn').onclick = () => { seed++; build(); };
      build();
    },

    async sigmoid(s, ctrl) {
      const { THREE, scene } = s;
      axes(s, 3.4, ['x₁', 'P(yes)', 'x₂']);
      const sig = (v) => 1 / (1 + Math.exp(-v));
      let k = 1.5;
      const g = new THREE.PlaneGeometry(6.4, 6.4, 64, 64); g.rotateX(-Math.PI / 2);
      g.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 3), 3));
      const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: 0.85, roughness: 0.5 }));
      scene.add(mesh);
      const upd = () => {
        const p = g.attributes.position, c = g.attributes.color;
        for (let i = 0; i < p.count; i++) { const v = sig(k * (p.getX(i) + 0.7 * p.getZ(i))); p.setY(i, v * 3); const col = heat(THREE, v); c.setXYZ(i, col.r, col.g, col.b); }
        p.needsUpdate = true; c.needsUpdate = true; g.computeVertexNormals();
      };
      const r = mulberry(7), P = [], C = [];
      for (let i = 0; i < 160; i++) { const x = (r() - 0.5) * 6, z = (r() - 0.5) * 6; const yes = x + 0.7 * z + randn(r) * 0.6 > 0; P.push([x, yes ? 3.05 : 0.05, z]); C.push(yes ? CA : CB); }
      points(s, P, C, 0.22);
      upd();
      ctrl.innerHTML = `<label>${t({ en: 'Weight size (steepness)', ne: 'Weight आकार (ठाडोपन)' })} <input type="range" min="0.2" max="8" step="0.1" value="1.5"></label><span class="v3-status">${t({ en: 'Blue dots = class 0 (bottom), red dots = class 1 (top). The surface is the predicted probability; where it crosses 0.5 is the decision boundary.', ne: 'नीलो = वर्ग 0 (तल), रातो = वर्ग 1 (माथि)। सतह अनुमानित सम्भाव्यता हो; 0.5 पार गर्ने ठाउँ decision boundary हो।' })}</span>`;
      ctrl.querySelector('input').oninput = (e) => { k = +e.target.value; upd(); };
    },

    async svm(s, ctrl) {
      const { THREE, scene } = s;
      axes(s, 3.2, ['x₁', 'x₁² + x₂²', 'x₂']);
      const r = mulberry(11), base = [], C = [];
      for (let i = 0; i < 110; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 1.05; base.push([Math.cos(a) * d, Math.sin(a) * d]); C.push(CA); }
      for (let i = 0; i < 170; i++) { const a = r() * Math.PI * 2, d = 1.75 + r() * 0.95; base.push([Math.cos(a) * d, Math.sin(a) * d]); C.push(CB); }
      const p = points(s, base.map(([x, z]) => [x, 0.02, z]), C, 0.2);
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshStandardMaterial({ color: 0xa3e635, transparent: true, opacity: 0, side: THREE.DoubleSide }));
      plane.rotateX(-Math.PI / 2); scene.add(plane);
      let lift = 0, target = 0;
      s.onFrame(() => {
        lift += (target - lift) * 0.05;
        const pa = p.geometry.attributes.position;
        base.forEach(([x, z], i) => pa.setY(i, 0.02 + lift * 0.42 * (x * x + z * z)));
        pa.needsUpdate = true;
        plane.position.y = lift * 0.42 * 1.95; plane.material.opacity = lift * 0.4;
      });
      ctrl.innerHTML = `${btn('✨ ' + t({ en: 'Apply the kernel (lift to 3D)', ne: 'Kernel लागू गर्नुहोस् (3D मा उठाउनुहोस्)' }), 'primary')}<span class="v3-status">${t({ en: 'In 2-D no straight line can separate red from blue. Lift every point by x₁² + x₂² and a flat plane separates them!', ne: '2-D मा कुनै सिधा रेखाले रातो र नीलो छुट्याउन सक्दैन। हरेक बिन्दुलाई x₁² + x₂² ले उठाउँदा समतल सतहले छुट्याउँछ!' })}</span>`;
      const b = ctrl.querySelector('.v3-btn');
      b.onclick = () => { target = target ? 0 : 1; b.textContent = target ? '⬇ ' + t({ en: 'Back to 2-D', ne: '2-D मा फर्कनुहोस्' }) : '✨ ' + t({ en: 'Apply the kernel (lift to 3D)', ne: 'Kernel लागू गर्नुहोस् (3D मा उठाउनुहोस्)' }); };
    },

    async forest(s, ctrl) {
      const { THREE, scene } = s;
      const ground = new THREE.Mesh(new THREE.CircleGeometry(7, 48), new THREE.MeshStandardMaterial({ color: 0x1e3a2f, roughness: 1 }));
      ground.rotateX(-Math.PI / 2); scene.add(ground);
      const r = mulberry(5), trees = [];
      const trunkG = new THREE.CylinderGeometry(0.08, 0.12, 0.7, 8), coneG = new THREE.ConeGeometry(0.5, 1.1, 9), orbG = new THREE.SphereGeometry(0.16, 16, 12);
      for (let i = 0; i < 30; i++) {
        const a = r() * Math.PI * 2, d = 1.2 + Math.sqrt(r()) * 5;
        const tr = new THREE.Group(); tr.position.set(Math.cos(a) * d, 0, Math.sin(a) * d);
        const sc = 0.7 + r() * 0.7; tr.scale.setScalar(sc);
        const trunk = new THREE.Mesh(trunkG, new THREE.MeshStandardMaterial({ color: 0x7c4a2d })); trunk.position.y = 0.35; tr.add(trunk);
        const green = new THREE.Color().setHSL(0.3 + r() * 0.08, 0.55, 0.3 + r() * 0.15);
        [0.95, 1.5].forEach((y, j) => { const c = new THREE.Mesh(coneG, new THREE.MeshStandardMaterial({ color: green, flatShading: true })); c.position.y = y; c.scale.setScalar(1 - j * 0.25); tr.add(c); });
        const orb = new THREE.Mesh(orbG, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 })); orb.position.y = 2.35; tr.add(orb);
        scene.add(tr); trees.push({ tr, orb, ph: r() * 6 });
      }
      const status = h('<span class="v3-status"></span>');
      const vote = () => {
        const pA = 0.25 + Math.random() * 0.5; let a = 0;
        trees.forEach((tr) => { const isA = Math.random() < pA; if (isA) a++; tr.orb.material.color.set(isA ? CA : CB); tr.orb.material.emissive.set(isA ? CA : CB); });
        const b = trees.length - a;
        status.innerHTML = `🔴 ${t({ en: 'Class A', ne: 'वर्ग A' })}: <b>${a}</b> · 🔵 ${t({ en: 'Class B', ne: 'वर्ग B' })}: <b>${b}</b> → 🌲 ${t({ en: 'Forest predicts', ne: 'फरेस्टको अनुमान' })} <b>${a >= b ? 'A' : 'B'}</b>`;
      };
      s.onFrame((dt, tm) => trees.forEach((x) => { x.orb.position.y = 2.35 + Math.sin(tm * 2 + x.ph) * 0.1; }));
      ctrl.innerHTML = btn('🗳️ ' + t({ en: 'New example — let the trees vote', ne: 'नयाँ उदाहरण — ट्रीहरूलाई मत दिन दिनुहोस्' }), 'primary');
      ctrl.appendChild(status);
      ctrl.querySelector('.v3-btn').onclick = vote;
      vote();
    },

    async kmeans(s, ctrl) {
      const { THREE, scene } = s;
      axes(s, 3.6, []);
      const r = mulberry(21), P = [];
      const centers = [[-2, 1.2, -1.5], [2, 2.4, 0.5], [0, 0.8, 2.2], [1.8, 0.6, -2.2]];
      centers.forEach((c) => { for (let i = 0; i < 70; i++) P.push(c.map((v) => v + randn(r) * 0.55)); });
      const pt = points(s, P, P.map(() => 0x94a3b8), 0.17);
      let k = 4, cents = [], meshes = [], assign = [], phase = 0, acc = 0, iter = 0;
      const status = h('<span class="v3-status"></span>');
      const cg = new THREE.OctahedronGeometry(0.28);
      const restart = () => {
        meshes.forEach((m) => { scene.remove(m); m.material.dispose(); });
        cents = []; meshes = []; iter = 0; phase = 0;
        for (let j = 0; j < k; j++) {
          const p = P[Math.floor(Math.random() * P.length)].slice(); cents.push({ pos: new THREE.Vector3(...p), target: new THREE.Vector3(...p) });
          const m = new THREE.Mesh(cg, new THREE.MeshStandardMaterial({ color: PAL[j], emissive: PAL[j], emissiveIntensity: 0.6 })); m.position.set(...p); scene.add(m); meshes.push(m);
        }
        P.forEach((_, i) => setColor(pt, i, 0x94a3b8, THREE)); pt.geometry.attributes.color.needsUpdate = true;
      };
      s.onFrame((dt, tm) => {
        meshes.forEach((m, j) => { cents[j].pos.lerp(cents[j].target, 0.08); m.position.copy(cents[j].pos); m.rotation.y = tm; });
        acc += dt; if (acc < 1.1) return; acc = 0;
        if (phase === 0) {
          let changed = 0;
          P.forEach((p, i) => { let best = 0, bd = 1e9; cents.forEach((c, j) => { const d = (p[0] - c.target.x) ** 2 + (p[1] - c.target.y) ** 2 + (p[2] - c.target.z) ** 2; if (d < bd) { bd = d; best = j; } }); if (assign[i] !== best) changed++; assign[i] = best; setColor(pt, i, PAL[best], THREE); });
          pt.geometry.attributes.color.needsUpdate = true; iter++;
          status.textContent = changed || iter === 1 ? t({ en: `Iteration ${iter}: assign each point to the nearest centroid`, ne: `पुनरावृत्ति ${iter}: हरेक बिन्दुलाई नजिकको centroid मा` }) : t({ en: `✅ Converged after ${iter} iterations`, ne: `✅ ${iter} पुनरावृत्तिमा स्थिर भयो` });
          if (!changed && iter > 1) { phase = 2; return; }
        } else if (phase === 1) {
          cents.forEach((c, j) => { const mine = P.filter((_, i) => assign[i] === j); if (mine.length) c.target.set(...[0, 1, 2].map((d) => mine.reduce((a, p) => a + p[d], 0) / mine.length)); });
          status.textContent = t({ en: `Iteration ${iter}: move each centroid to the mean of its points`, ne: `पुनरावृत्ति ${iter}: centroid लाई आफ्ना बिन्दुहरूको औसतमा सार्ने` });
        } else return;
        phase = 1 - phase;
      });
      ctrl.innerHTML = `<label>k = <input type="range" min="2" max="6" step="1" value="4"> <b class="kv">4</b></label>${btn('🔄 ' + t({ en: 'Restart', ne: 'फेरि सुरु' }))}`;
      ctrl.appendChild(status);
      ctrl.querySelector('input').oninput = (e) => { k = +e.target.value; ctrl.querySelector('.kv').textContent = k; restart(); };
      ctrl.querySelector('.v3-btn').onclick = restart;
      restart();
    },

    async knn(s, ctrl) {
      const { THREE, scene } = s;
      axes(s, 3.4, []);
      const r = mulberry(4), P = [], Y = [];
      for (let i = 0; i < 120; i++) { P.push([-1.1 + randn(r) * 0.95, 1.5 + randn(r) * 0.8, -0.6 + randn(r) * 0.95]); Y.push(0); }
      for (let i = 0; i < 120; i++) { P.push([1.1 + randn(r) * 0.95, 1.7 + randn(r) * 0.8, 0.7 + randn(r) * 0.95]); Y.push(1); }
      points(s, P, Y.map((y) => (y ? CA : CB)), 0.17);
      const q = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.4 }));
      scene.add(q);
      let k = 7, moving = true;
      const lp = new Float32Array(15 * 6), lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
      scene.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: CACC })));
      const status = h('<span class="v3-status"></span>');
      let tt = 0;
      s.onFrame((dt) => {
        if (moving) tt += dt * 0.35;
        q.position.set(Math.sin(tt * 1.3) * 2.2, 1.6 + Math.sin(tt * 0.9) * 0.9, Math.cos(tt) * 2.2);
        const d = P.map((p, i) => [(p[0] - q.position.x) ** 2 + (p[1] - q.position.y) ** 2 + (p[2] - q.position.z) ** 2, i]).sort((a, b) => a[0] - b[0]).slice(0, k);
        let red = 0;
        d.forEach(([, i], j) => { lp.set([q.position.x, q.position.y, q.position.z, ...P[i]], j * 6); red += Y[i]; });
        lg.setDrawRange(0, k * 2); lg.attributes.position.needsUpdate = true;
        const cls = red > k / 2 ? 1 : 0;
        q.material.emissive.set(cls ? CA : CB);
        status.innerHTML = `k = ${k} → 🔴 ${red} · 🔵 ${k - red} → ${t({ en: 'prediction', ne: 'अनुमान' })}: <b>${cls ? '🔴' : '🔵'}</b>`;
      });
      ctrl.innerHTML = `<label>k <input type="range" min="1" max="15" step="2" value="7"></label>${btn('⏯ ' + t({ en: 'Pause / move', ne: 'रोक्ने / चलाउने' }))}`;
      ctrl.appendChild(status);
      ctrl.querySelector('input').oninput = (e) => { k = +e.target.value; };
      ctrl.querySelector('.v3-btn').onclick = () => { moving = !moving; };
    },

    async pca(s, ctrl) {
      const { THREE, scene } = s;
      const R = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.5, 0.6, 0.35));
      const sc = [2.6, 1.0, 0.35], r = mulberry(9), base = [];
      for (let i = 0; i < 600; i++) base.push(new THREE.Vector3(randn(r) * sc[0], randn(r) * sc[1], randn(r) * sc[2]).applyMatrix4(R));
      const pcs = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)].map((v) => v.applyMatrix4(R).normalize());
      const p = points(s, base.map((v) => [v.x, v.y + 2, v.z]), base.map((v) => heat(THREE, (v.dot(pcs[0]) / sc[0] + 2.5) / 5).getHex()), 0.14);
      const cols = [0xf87171, 0x4ade80, 0x60a5fa];
      pcs.forEach((v, i) => {
        const len = sc[i] * 1.6 + 0.4;
        scene.add(new THREE.ArrowHelper(v, new THREE.Vector3(0, 2, 0), len, cols[i], 0.3, 0.18));
        const lb = label(THREE, 'PC' + (i + 1), { size: 0.36, color: '#' + cols[i].toString(16) }); lb.position.copy(v.clone().multiplyScalar(len + 0.35)).add(new THREE.Vector3(0, 2, 0)); scene.add(lb);
      });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(9, 4), new THREE.MeshStandardMaterial({ color: 0x818cf8, transparent: true, opacity: 0, side: THREE.DoubleSide }));
      plane.lookAt(pcs[2]); plane.position.set(0, 2, 0); scene.add(plane);
      let f = 0, target = 0;
      s.onFrame(() => {
        f += (target - f) * 0.05;
        const pa = p.geometry.attributes.position;
        base.forEach((v, i) => { const d = v.dot(pcs[2]) * f; pa.setXYZ(i, v.x - pcs[2].x * d, v.y - pcs[2].y * d + 2, v.z - pcs[2].z * d); });
        pa.needsUpdate = true; plane.material.opacity = f * 0.25;
      });
      const tot = sc.reduce((a, b) => a + b * b, 0), ev = sc.map((v) => Math.round((v * v * 100) / tot));
      ctrl.innerHTML = `${btn('📉 ' + t({ en: 'Project onto PC1–PC2 (3-D → 2-D)', ne: 'PC1–PC2 मा प्रक्षेपण (3-D → 2-D)' }), 'primary')}<span class="v3-status">${t({ en: 'Explained variance', ne: 'व्याख्या गरिएको variance' })}: PC1 <b>${ev[0]}%</b> · PC2 <b>${ev[1]}%</b> · PC3 <b>${ev[2]}%</b> — ${t({ en: 'dropping PC3 loses very little!', ne: 'PC3 हटाउँदा धेरै थोरै मात्र हराउँछ!' })}</span>`;
      const b = ctrl.querySelector('.v3-btn');
      b.onclick = () => { target = target ? 0 : 1; b.textContent = target ? '↩ ' + t({ en: 'Back to 3-D', ne: '3-D मा फर्कनुहोस्' }) : '📉 ' + t({ en: 'Project onto PC1–PC2 (3-D → 2-D)', ne: 'PC1–PC2 मा प्रक्षेपण (3-D → 2-D)' }); };
    },

    async cnn(s, ctrl) {
      const { THREE, scene } = s;
      const tex = (w, draw) => { const c = document.createElement('canvas'); c.width = c.height = w; draw(c.getContext('2d'), w); const tx = new THREE.CanvasTexture(c); tx.magFilter = THREE.NearestFilter; tx.colorSpace = THREE.SRGBColorSpace; return tx; };
      const digit = tex(28, (g, w) => { g.fillStyle = '#000'; g.fillRect(0, 0, w, w); g.strokeStyle = '#fff'; g.lineWidth = 3.2; g.beginPath(); g.moveTo(6, 6); g.lineTo(22, 6); g.lineTo(11, 23); g.stroke(); });
      const fmap = (seed, n) => tex(n, (g) => { const r = mulberry(seed); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const v = r(); g.fillStyle = `hsl(${260 - v * 200},80%,${20 + v * 45}%)`; g.fillRect(i, j, 1, 1); } });
      const slab = (x, size, m, off) => { const me = new THREE.Mesh(new THREE.BoxGeometry(0.05, size, size), [0, 1, 2, 3, 4, 5].map((i) => (i < 2 ? m : new THREE.MeshStandardMaterial({ color: 0x334155 })))); me.position.set(x, size / 2 + 0.3 + off * 0.12, off * 0.12); scene.add(me); return me; };
      const stages = [
        { x: -6, n: 1, size: 2.8, name: { en: 'Input 28×28', ne: 'इनपुट 28×28' } },
        { x: -4, n: 6, size: 2.4, name: { en: 'Conv 1 (6 filters)', ne: 'Conv १ (६ filter)' } },
        { x: -2.2, n: 6, size: 1.2, name: { en: 'Max-pool', ne: 'Max-pool' } },
        { x: -0.6, n: 12, size: 1.0, name: { en: 'Conv 2 (12 filters)', ne: 'Conv २ (१२ filter)' } },
        { x: 1.0, n: 12, size: 0.5, name: { en: 'Max-pool', ne: 'Max-pool' } },
      ];
      stages.forEach((st, si) => {
        for (let j = 0; j < st.n; j++) {
          const m = new THREE.MeshStandardMaterial({ map: si === 0 ? digit : fmap(si * 31 + j, 12), emissive: 0xffffff, emissiveIntensity: 0.15 });
          const me = slab(st.x + j * 0.18, st.size, m, 0); me.position.z = (j - (st.n - 1) / 2) * 0.05;
        }
        const lb = label(THREE, t(st.name), { size: 0.3 }); lb.position.set(st.x + st.n * 0.09, -0.2, 0); scene.add(lb);
      });
      const dense = []; for (let i = 0; i < 16; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0x7c3aed, emissiveIntensity: 0.3 })); m.position.set(3.2, 0.5 + i * 0.25, 0); scene.add(m); dense.push(m); }
      const dl = label(THREE, t({ en: 'Dense', ne: 'Dense' }), { size: 0.3 }); dl.position.set(3.2, -0.2, 0); scene.add(dl);
      const outs = []; for (let i = 0; i < 10; i++) { const on = i === 7; const m = new THREE.Mesh(new THREE.SphereGeometry(on ? 0.2 : 0.14, 18, 12), new THREE.MeshStandardMaterial({ color: on ? CACC : 0x64748b, emissive: on ? CACC : 0x000000, emissiveIntensity: 0.7 })); m.position.set(5, 0.5 + i * 0.4, 0); scene.add(m); outs.push(m); const l = label(THREE, String(i), { size: 0.26, color: on ? '#fde047' : '#94a3b8' }); l.position.set(5.45, 0.5 + i * 0.4, 0); scene.add(l); }
      const ol = label(THREE, t({ en: 'Output: it is a 7!', ne: 'आउटपुट: यो ७ हो!' }), { size: 0.3, color: '#fde047' }); ol.position.set(5, -0.2, 0); scene.add(ol);
      const kern = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.3), new THREE.MeshBasicMaterial({ color: CACC, wireframe: true })); scene.add(kern);
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: CACC })));
      let k = 0;
      s.onFrame((dt, tm) => {
        k += dt * 6; const steps = 9, i = Math.floor(k) % (steps * steps), row = Math.floor(i / steps), col = i % steps;
        const y = 0.3 + 2.8 - 0.3 - row * 0.28, z = -1.25 + col * 0.31;
        kern.position.set(-6, y, z);
        const pa = lg.attributes.position; pa.setXYZ(0, -6, y, z); pa.setXYZ(1, -4, 0.3 + 2.4 - row * 0.24 - 0.2, -1.05 + col * 0.26); pa.needsUpdate = true;
        dense.forEach((m, j) => { m.material.emissiveIntensity = 0.2 + 0.5 * (0.5 + 0.5 * Math.sin(tm * 3 + j)); });
      });
      ctrl.innerHTML = `<span class="v3-status">${t({ en: 'The yellow 3×3 filter slides over the image. Each layer turns pixels into more abstract features, until the output layer lights up the answer.', ne: 'पहेँलो 3×3 filter फोटोमाथि सर्छ। हरेक layer ले pixel लाई झन् अमूर्त feature मा बदल्छ, अन्त्यमा output layer ले उत्तर उज्यालो बनाउँछ।' })}</span>`;
    },

    async attention(s, ctrl) {
      const { THREE, scene } = s;
      const words = ['the', 'animal', 'was', 'tired', 'so', 'it', 'slept'], n = words.length;
      const bars = [], bg = new THREE.BoxGeometry(0.62, 1, 0.62);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const m = new THREE.Mesh(bg, new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.4 }));
        m.position.set((j - (n - 1) / 2) * 0.8, 0, (i - (n - 1) / 2) * 0.8); scene.add(m); bars.push({ m, target: 0.1 });
      }
      words.forEach((w, i) => {
        const a = label(THREE, w, { size: 0.3, color: '#c7d2fe' }); a.position.set((i - (n - 1) / 2) * 0.8, 0.05, (n / 2) * 0.8 + 0.5); scene.add(a);
        const b = label(THREE, w, { size: 0.3, color: '#fbcfe8' }); b.position.set(-(n / 2) * 0.8 - 0.75, 0.05, (i - (n - 1) / 2) * 0.8); scene.add(b);
      });
      const kl = label(THREE, t({ en: 'keys →', ne: 'keys →' }), { size: 0.3, color: '#c7d2fe' }); kl.position.set(0, 0.05, (n / 2) * 0.8 + 1.1); scene.add(kl);
      const ql = label(THREE, t({ en: 'queries', ne: 'queries' }), { size: 0.3, color: '#fbcfe8' }); ql.position.set(-(n / 2) * 0.8 - 0.75, 0.05, -(n / 2) * 0.8 - 0.4); scene.add(ql);
      let head = 0;
      const status = h('<span class="v3-status"></span>');
      const gen = () => {
        const r = mulberry(100 + head);
        for (let i = 0; i < n; i++) {
          const raw = words.map((_, j) => randn(r) * 0.8 + (i === j ? 1.6 : 0) + (head === 0 && i === 5 && j === 1 ? 3.2 : 0) + (head === 1 && j === i - 1 ? 2.2 : 0));
          const mx = Math.max(...raw), e = raw.map((v) => Math.exp(v - mx)), sm = e.reduce((a, b) => a + b, 0);
          e.forEach((v, j) => { bars[i * n + j].target = (v / sm) * 4 + 0.05; });
        }
        status.textContent = head === 0 ? t({ en: 'Head 1: "it" looks back at "animal" — that is how the model knows what "it" means.', ne: 'Head १: "it" ले "animal" तिर फर्केर हेर्छ — यसरी मोडेलले "it" को अर्थ बुझ्छ।' })
          : head === 1 ? t({ en: 'Head 2: each word looks at the previous word (learns word order).', ne: 'Head २: हरेक शब्दले अघिल्लो शब्द हेर्छ (शब्दको क्रम सिक्छ)।' })
            : t({ en: `Head ${head + 1}: another learned pattern. Real models have dozens of heads per layer.`, ne: `Head ${head + 1}: अर्को सिकिएको ढाँचा। वास्तविक मोडेलमा हरेक layer मा दर्जनौं head हुन्छन्।` });
      };
      s.onFrame(() => bars.forEach((b) => { b.m.scale.y += (b.target - b.m.scale.y) * 0.08; b.m.position.y = b.m.scale.y / 2; b.m.material.color.copy(heat(THREE, b.m.scale.y / 3.2)); }));
      ctrl.innerHTML = btn('🔀 ' + t({ en: 'Another attention head', ne: 'अर्को attention head' }), 'primary');
      ctrl.appendChild(status);
      ctrl.querySelector('.v3-btn').onclick = () => { head = (head + 1) % 5; gen(); };
      gen();
    },

    async tree(s, ctrl) {
      const { THREE, scene } = s;
      const N = {
        root: { p: [0, 5, 0], q: 'petal length < 2.45?' },
        a: { p: [-3.2, 3.1, -0.8], leaf: 0, n: 50 },
        b: { p: [3.2, 3.1, 0.8], q: 'petal width < 1.75?' },
        c: { p: [1.2, 1.2, -0.6], q: 'petal length < 4.95?' },
        d: { p: [5.2, 1.2, 1.2], leaf: 2, n: 46 },
        e: { p: [-0.4, -0.7, -1.2], leaf: 1, n: 48 },
        f: { p: [2.8, -0.7, 0], leaf: 2, n: 6 },
      };
      const kids = { root: ['a', 'b'], b: ['c', 'd'], c: ['e', 'f'] };
      const names = ['setosa', 'versicolor', 'virginica'];
      Object.entries(N).forEach(([k, v]) => {
        const leaf = v.leaf !== undefined;
        const m = new THREE.Mesh(leaf ? new THREE.SphereGeometry(0.45, 28, 18) : new THREE.BoxGeometry(0.9, 0.6, 0.6), new THREE.MeshStandardMaterial({ color: leaf ? PAL[v.leaf] : 0xe2e8f0, emissive: leaf ? PAL[v.leaf] : 0x334155, emissiveIntensity: 0.35, roughness: 0.3 }));
        m.position.set(...v.p); scene.add(m); v.mesh = m;
        const lb = label(THREE, leaf ? `${names[v.leaf]} (${v.n})` : v.q, { size: 0.32, color: leaf ? '#fff' : '#c7d2fe', bg: 'rgba(15,23,42,.65)' });
        lb.position.set(v.p[0], v.p[1] + (leaf ? 0.8 : 0.7), v.p[2]); scene.add(lb);
      });
      const pts = [];
      Object.entries(kids).forEach(([k, [l, r]]) => [l, r].forEach((c) => pts.push(new THREE.Vector3(...N[k].p), new THREE.Vector3(...N[c].p))));
      scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
      Object.entries(kids).forEach(([k, [l, r]]) => {
        const y = label(THREE, t({ en: 'yes', ne: 'हो', zh: '是' }), { size: 0.26, color: '#86efac' }), n = label(THREE, t({ en: 'no', ne: 'होइन', zh: '否' }), { size: 0.26, color: '#fca5a5' });
        y.position.set(...N[k].p.map((v, i) => (v + N[l].p[i]) / 2)); n.position.set(...N[k].p.map((v, i) => (v + N[r].p[i]) / 2)); scene.add(y, n);
      });
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 12), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: CACC, emissiveIntensity: 0.8 }));
      scene.add(ball);
      const paths = [['root', 'a'], ['root', 'b', 'c', 'e'], ['root', 'b', 'c', 'f'], ['root', 'b', 'd']];
      let path = paths[1], seg = 0, k = 0;
      const status = h('<span class="v3-status"></span>');
      s.onFrame((dt) => {
        k += dt * 1.1;
        if (k >= 1) { k = 0; seg++; if (seg >= path.length - 1) { const leaf = N[path[path.length - 1]]; status.innerHTML = `🌸 → <b>${names[leaf.leaf]}</b>`; leaf.mesh.scale.setScalar(1.35); path = paths[Math.floor(Math.random() * paths.length)]; seg = 0; } }
        const a = N[path[seg]].p, b = N[path[Math.min(seg + 1, path.length - 1)]].p;
        ball.position.set(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k + 0.1, a[2] + (b[2] - a[2]) * k);
        Object.values(N).forEach((v) => v.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05));
      });
      ctrl.innerHTML = `<span class="v3-status">${t({ en: 'A flower falls down the tree, answering one yes/no question at each box, until it reaches a leaf — the prediction.', ne: 'फूल ट्रीबाट तल झर्छ, हरेक बाकसमा एउटा हो/होइन प्रश्नको उत्तर दिँदै, पात (अनुमान) मा नपुगुन्जेल।', zh: '一朵花沿着树往下落，在每个方框回答一个“是/否”问题，直到到达叶子——也就是预测结果。' })}</span>`;
      ctrl.appendChild(status);
    },

    async gaussians(s, ctrl) {
      const { THREE, scene } = s;
      axes(s, 3.4, ['x₁', 'P(x | class)', 'x₂']);
      const mus = [[-1.6, -1.2], [1.6, -0.8], [0, 1.8]];
      let sig = 0.8;
      const g = new THREE.PlaneGeometry(7, 7, 90, 90); g.rotateX(-Math.PI / 2);
      g.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 3), 3));
      scene.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.45, transparent: true, opacity: 0.9 })));
      const cols = PAL.slice(0, 3).map((c) => new THREE.Color(c));
      const upd = () => {
        const p = g.attributes.position, c = g.attributes.color;
        for (let i = 0; i < p.count; i++) {
          const x = p.getX(i), z = p.getZ(i);
          const ds = mus.map(([mx, mz]) => Math.exp(-((x - mx) ** 2 + (z - mz) ** 2) / (2 * sig * sig)));
          const best = ds.indexOf(Math.max(...ds)), tot = ds.reduce((a, b) => a + b, 0);
          p.setY(i, tot * 2.2);
          const col = cols[best].clone().lerp(new THREE.Color(0x0f172a), 1 - Math.min(1, ds[best] * 1.4 + 0.15));
          c.setXYZ(i, col.r, col.g, col.b);
        }
        p.needsUpdate = true; c.needsUpdate = true; g.computeVertexNormals();
      };
      const r = mulberry(31), P = [], Cc = [];
      mus.forEach(([mx, mz], j) => { for (let i = 0; i < 45; i++) { P.push([mx + randn(r) * 0.7, 0.03, mz + randn(r) * 0.7]); Cc.push(PAL[j]); } });
      points(s, P, Cc, 0.18);
      upd();
      ctrl.innerHTML = `<label>σ <input type="range" min="0.35" max="1.6" step="0.05" value="0.8"></label><span class="v3-status">${t({ en: 'Each class is a probability mountain. Naive Bayes picks the class whose mountain is highest at a point — the colours show the decision regions.', ne: 'हरेक वर्ग सम्भाव्यताको पहाड हो। Naive Bayes ले कुनै बिन्दुमा सबैभन्दा अग्लो पहाड भएको वर्ग छान्छ — रङले निर्णय क्षेत्र देखाउँछ।', zh: '每个类别都是一座概率之山。朴素贝叶斯在某一点选择山最高的那个类别——颜色显示了决策区域。' })}</span>`;
      ctrl.querySelector('input').oninput = (e) => { sig = +e.target.value; upd(); };
    },

    async dbscan(s, ctrl) {
      const { THREE } = s;
      axes(s, 3.4, []);
      const r = mulberry(8), P = [];
      for (let i = 0; i < 130; i++) { const a = Math.PI * r(); P.push([Math.cos(a) * 2 - 1 + randn(r) * 0.12, 1.5 + randn(r) * 0.15, Math.sin(a) * 2 - 0.8 + randn(r) * 0.12]); }
      for (let i = 0; i < 130; i++) { const a = Math.PI * r(); P.push([1 - Math.cos(a) * 2 + randn(r) * 0.12, 1.5 + randn(r) * 0.15, 0.8 - Math.sin(a) * 2 + randn(r) * 0.12]); }
      for (let i = 0; i < 70; i++) P.push([randn(r) * 0.35, 3.3 + randn(r) * 0.3, randn(r) * 0.35]);
      for (let i = 0; i < 25; i++) P.push([(r() - 0.5) * 6.5, r() * 4.5, (r() - 0.5) * 6.5]);
      const pt = points(s, P, P.map(() => 0x64748b), 0.17);
      let eps = 0.5, order = [], lab = [], step = 0, acc = 0;
      const status = h('<span class="v3-status"></span>');
      const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
      const run = () => {
        const n = P.length, nb = P.map((p) => P.map((q, j) => (d2(p, q) <= eps * eps ? j : -1)).filter((j) => j >= 0));
        lab = new Array(n).fill(-2); order = []; let c = -1;
        for (let i = 0; i < n; i++) {
          if (lab[i] !== -2) continue;
          if (nb[i].length < 5) { lab[i] = -1; continue; }
          c++; lab[i] = c; order.push(i); const q = [...nb[i]];
          while (q.length) { const j = q.shift(); if (lab[j] === -1) { lab[j] = c; order.push(j); } if (lab[j] !== -2) continue; lab[j] = c; order.push(j); if (nb[j].length >= 5) q.push(...nb[j]); }
        }
        P.forEach((_, i) => setColor(pt, i, 0x64748b, THREE)); pt.geometry.attributes.color.needsUpdate = true;
        step = 0; status.textContent = '…';
        status.dataset.k = String(c + 1);
      };
      s.onFrame((dt) => {
        acc += dt; if (acc < 0.02 || step > order.length) return; acc = 0;
        for (let k = 0; k < 4 && step < order.length; k++, step++) { const i = order[step]; setColor(pt, i, PAL[lab[i] % PAL.length], THREE); }
        if (step === order.length) { P.forEach((_, i) => { if (lab[i] === -1) setColor(pt, i, 0xff2d55, THREE); }); step++; status.innerHTML = `${t({ en: 'Clusters found', ne: 'भेटिएका क्लस्टर', zh: '发现的簇' })}: <b>${status.dataset.k}</b> · ${t({ en: 'noise (red)', ne: 'noise (रातो)', zh: '噪声（红色）' })}: <b>${lab.filter((x) => x === -1).length}</b>`; }
        pt.geometry.attributes.color.needsUpdate = true;
      });
      ctrl.innerHTML = `<label>eps <input type="range" min="0.25" max="1" step="0.05" value="0.5"></label>${btn('▶ ' + t({ en: 'Run DBSCAN again', ne: 'फेरि DBSCAN चलाउनुहोस्', zh: '再次运行 DBSCAN' }), 'primary')}`;
      ctrl.appendChild(status);
      ctrl.querySelector('input').oninput = (e) => { eps = +e.target.value; run(); };
      ctrl.querySelector('.v3-btn').onclick = run;
      run();
    },

    async embeddings(s, ctrl) {
      const { THREE, scene } = s;
      const groups = [
        { c: [-2.6, 2.6, -1.5], words: ['dog', 'cat', 'कुकुर', '猫', 'horse', '马'] },
        { c: [2.5, 2.9, -1.2], words: ['momo', 'rice', 'दाल भात', '米饭', 'noodles', '面条'] },
        { c: [-1.8, 0.7, 2.4], words: ['Python', 'computer', 'कम्प्युटर', '电脑', 'AI', '数据'] },
        { c: [2.4, 0.9, 2.2], words: ['Nepal', 'China', 'नेपाल', '中国', 'India', 'Japan'] },
      ];
      const r = mulberry(12);
      groups.forEach((gp, gi) => {
        gp.words.forEach((w) => {
          const p = gp.c.map((v) => v + (r() - 0.5) * 1.6);
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 10), new THREE.MeshStandardMaterial({ color: PAL[gi], emissive: PAL[gi], emissiveIntensity: 0.6 }));
          m.position.set(...p); scene.add(m);
          const lb = label(THREE, w, { size: 0.34, color: '#' + new THREE.Color(PAL[gi]).getHexString() }); lb.position.set(p[0], p[1] + 0.3, p[2]); scene.add(lb);
        });
      });
      const K = { king: [-0.6, 4.6, 0.2], queen: [0.9, 4.6, 1.0], man: [-0.9, 3.4, -0.4], woman: [0.6, 3.4, 0.4] };
      const arrows = new THREE.Group(); arrows.visible = false; scene.add(arrows);
      Object.entries(K).forEach(([w, p]) => { const lb = label(THREE, w, { size: 0.36, color: '#fde68a' }); lb.position.set(p[0], p[1] + 0.3, p[2]); scene.add(lb); const m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), new THREE.MeshStandardMaterial({ color: 0xfde68a, emissive: 0xfde68a, emissiveIntensity: 0.6 })); m.position.set(...p); scene.add(m); });
      const arrow = (a, b, col) => { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), d = B.clone().sub(A); arrows.add(new THREE.ArrowHelper(d.clone().normalize(), A, d.length(), col, 0.22, 0.12)); };
      arrow(K.man, K.woman, CACC); arrow(K.king, K.queen, CACC); arrow(K.man, K.king, 0x94a3b8); arrow(K.woman, K.queen, 0x94a3b8);
      ctrl.innerHTML = `${btn('➗ ' + t({ en: 'Show: king − man + woman ≈ queen', ne: 'देखाउनुहोस्: king − man + woman ≈ queen', zh: '演示：king − man + woman ≈ queen' }), 'primary')}<span class="v3-status">${t({ en: 'Words become points. Words with similar meaning — even in different languages — sit close together. Directions carry meaning too!', ne: 'शब्दहरू बिन्दु बन्छन्। मिल्दो अर्थका शब्द — फरक भाषामा भए पनि — नजिकै बस्छन्। दिशाले पनि अर्थ बोक्छ!', zh: '词语变成了点。意思相近的词——即使语言不同——会挨得很近。方向也带有含义！' })}</span>`;
      ctrl.querySelector('.v3-btn').onclick = () => { arrows.visible = !arrows.visible; };
    },

    async dartboard(s, ctrl) {
      const { THREE, scene } = s;
      const boards = [
        { p: [-2.4, 3.3, 0], bias: 0, vr: 0.12, n: { en: 'Low bias · low variance ✅', ne: 'कम bias · कम variance ✅', zh: '低偏差 · 低方差 ✅' } },
        { p: [2.4, 3.3, 0], bias: 0, vr: 0.55, n: { en: 'Low bias · high variance (overfit)', ne: 'कम bias · उच्च variance (overfit)', zh: '低偏差 · 高方差（过拟合）' } },
        { p: [-2.4, 0.4, 0], bias: 0.75, vr: 0.12, n: { en: 'High bias · low variance (underfit)', ne: 'उच्च bias · कम variance (underfit)', zh: '高偏差 · 低方差（欠拟合）' } },
        { p: [2.4, 0.4, 0], bias: 0.75, vr: 0.55, n: { en: 'High bias · high variance ❌', ne: 'उच्च bias · उच्च variance ❌', zh: '高偏差 · 高方差 ❌' } },
      ];
      const darts = [];
      boards.forEach((b) => {
        [1.2, 0.85, 0.5, 0.18].forEach((rad, i) => { const m = new THREE.Mesh(new THREE.CircleGeometry(rad, 48), new THREE.MeshStandardMaterial({ color: i === 3 ? 0xef4444 : i % 2 ? 0xf8fafc : 0x1e293b, side: THREE.DoubleSide })); m.position.set(b.p[0], b.p[1], b.p[2] + i * 0.002); scene.add(m); });
        const lb = label(THREE, t(b.n), { size: 0.3, bg: 'rgba(15,23,42,.7)' }); lb.position.set(b.p[0], b.p[1] - 1.5, 0.1); scene.add(lb);
      });
      const coneG = new THREE.ConeGeometry(0.05, 0.4, 8);
      const throwAll = () => {
        darts.forEach((d) => scene.remove(d.m)); darts.length = 0;
        const r = mulberry(Math.floor(Math.random() * 1e6));
        boards.forEach((b) => { const ang = r() * Math.PI * 2; for (let i = 0; i < 8; i++) { const x = b.p[0] + Math.cos(ang) * b.bias + randn(r) * b.vr * 0.6, y = b.p[1] + Math.sin(ang) * b.bias + randn(r) * b.vr * 0.6; const m = new THREE.Mesh(coneG, new THREE.MeshStandardMaterial({ color: CACC, emissive: CACC, emissiveIntensity: 0.5 })); m.rotation.x = -Math.PI / 2; m.position.set(x, y, 4); scene.add(m); darts.push({ m, z: 0.2, delay: i * 0.12 }); } });
      };
      s.onFrame((dt) => darts.forEach((d) => { if (d.delay > 0) { d.delay -= dt; return; } d.m.position.z += (d.z - d.m.position.z) * 0.15; }));
      ctrl.innerHTML = `${btn('🎯 ' + t({ en: 'Throw again (train on new data)', ne: 'फेरि हान्नुहोस् (नयाँ डाटामा तालिम)', zh: '再投一次（在新数据上训练）' }), 'primary')}<span class="v3-status">${t({ en: 'Each dart = a model trained on a different sample. Bias = how far from the centre on average; variance = how scattered.', ne: 'हरेक dart = फरक नमुनामा तालिम पाएको मोडेल। Bias = औसतमा केन्द्रबाट कति टाढा; variance = कति छरिएको।', zh: '每支飞镖 = 在不同样本上训练出的一个模型。偏差 = 平均离靶心多远；方差 = 有多分散。' })}</span>`;
      ctrl.querySelector('.v3-btn').onclick = throwAll;
      throwAll();
    },

    async backprop(s, ctrl) {
      const { THREE, scene } = s;
      const layers = [3, 5, 5, 2], nodes = [];
      layers.forEach((n, li) => {
        const arr = []; for (let i = 0; i < n; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 16), new THREE.MeshStandardMaterial({ color: 0x818cf8, emissive: 0x6366f1, emissiveIntensity: 0.3 })); m.position.set((li - 1.5) * 2.8, (i - (n - 1) / 2) * 1.05 + 2.2, 0); scene.add(m); arr.push(m); }
        nodes.push(arr);
      });
      const edges = [];
      for (let l = 0; l < layers.length - 1; l++) nodes[l].forEach((a) => nodes[l + 1].forEach((b) => {
        const g = new THREE.BufferGeometry().setFromPoints([a.position, b.position]);
        const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.35 })); scene.add(line); edges.push({ a, b, l, line, w: Math.random() });
      }));
      const lossLb = label(THREE, 'loss', { size: 0.4, color: '#fca5a5' }); lossLb.position.set(6, 2.2, 0); scene.add(lossLb);
      const pg = new THREE.SphereGeometry(0.08, 10, 8), fm = new THREE.MeshBasicMaterial({ color: CACC }), bm = new THREE.MeshBasicMaterial({ color: 0xff4d6d });
      let phase = 'fwd', layer = 0, k = 0, epoch = 0, loss = 2.3, dropout = false, dropped = new Set();
      let pulses = [];
      const status = h('<span class="v3-status"></span>');
      const spawn = () => {
        pulses.forEach((p) => scene.remove(p.m)); pulses = [];
        const es = edges.filter((e) => (phase === 'fwd' ? e.l === layer : e.l === layer) && !dropped.has(e.a) && !dropped.has(e.b));
        es.forEach((e) => { const m = new THREE.Mesh(pg, phase === 'fwd' ? fm : bm); scene.add(m); pulses.push({ m, e }); });
      };
      const newEpoch = () => {
        dropped = new Set(); nodes.forEach((arr, li) => arr.forEach((n) => { const off = dropout && li > 0 && li < layers.length - 1 && Math.random() < 0.35; if (off) dropped.add(n); n.material.color.set(off ? 0x334155 : 0x818cf8); n.material.emissiveIntensity = off ? 0 : 0.3; }));
        phase = 'fwd'; layer = 0; k = 0; spawn();
      };
      s.onFrame((dt) => {
        k += dt * 1.4;
        pulses.forEach((p) => { const [from, to] = phase === 'fwd' ? [p.e.a, p.e.b] : [p.e.b, p.e.a]; p.m.position.lerpVectors(from.position, to.position, Math.min(k, 1)); });
        if (k < 1) return;
        k = 0;
        if (phase === 'fwd') { layer++; if (layer >= layers.length - 1) { phase = 'bwd'; layer = layers.length - 2; } }
        else {
          edges.filter((e) => e.l === layer && !dropped.has(e.a) && !dropped.has(e.b)).forEach((e) => { e.w = Math.min(1, e.w + (Math.random() - 0.3) * 0.25); e.line.material.color.copy(heat(THREE, e.w)); e.line.material.opacity = 0.25 + e.w * 0.6; });
          layer--;
          if (layer < 0) { epoch++; loss = Math.max(0.05, loss * 0.82 + (Math.random() - 0.5) * 0.05); status.innerHTML = `${t({ en: 'Epoch', ne: 'Epoch', zh: '轮次' })} <b>${epoch}</b> · loss <b>${loss.toFixed(3)}</b>`; newEpoch(); return; }
        }
        spawn();
      });
      ctrl.innerHTML = `<label class="chk"><input type="checkbox" class="dp"> Dropout</label><span class="v3-status">${t({ en: 'Yellow = forward pass (predict). Red = backward pass (gradients flow back and the weights change colour). Turn on dropout to see neurons randomly switched off.', ne: 'पहेँलो = forward pass (अनुमान)। रातो = backward pass (gradient पछाडि बग्छ र weight को रङ बदलिन्छ)। Dropout सुरु गरेर न्युरोन random बन्द भएको हेर्नुहोस्।', zh: '黄色 = 前向传播（预测）。红色 = 反向传播（梯度向回流动，权重随之变色）。打开 dropout，可以看到神经元被随机关闭。' })}</span>`;
      ctrl.appendChild(status);
      ctrl.querySelector('.dp').onchange = (e) => { dropout = e.target.checked; };
      newEpoch();
    },

    async scatter(s, ctrl, opts) {
      const { THREE } = s;
      const pts = opts.points || [];
      if (!pts.length) return;
      const norm = [0, 1, 2].map((d) => { const v = pts.map((p) => p[d]); const mn = Math.min(...v), mx = Math.max(...v); return (x) => (mx === mn ? 0 : ((x - mn) / (mx - mn)) * 6 - 3); });
      axes(s, 3.4, opts.names || []);
      let cols;
      if (opts.colorKind === 'cat') cols = opts.color.map((c) => PAL[opts.cats.indexOf(c) % PAL.length]);
      else if (opts.colorKind === 'num') { const mn = Math.min(...opts.color), mx = Math.max(...opts.color); cols = opts.color.map((c) => heat(THREE, mx === mn ? 0.5 : (c - mn) / (mx - mn)).getHex()); }
      else cols = pts.map(() => 0x818cf8);
      points(s, pts.map((p) => [norm[0](p[0]), norm[1](p[1]) + 3, norm[2](p[2])]), cols, pts.length > 1500 ? 0.12 : 0.18);
      if (opts.colorKind === 'cat') ctrl.innerHTML = '<span class="v3-legend">' + opts.cats.slice(0, 12).map((c, i) => `<i style="background:#${PAL[i % PAL.length].toString(16).padStart(6, '0')}"></i>${esc(c)}`).join(' ') + '</span>';
      else if (opts.colorKind === 'num') ctrl.innerHTML = `<span class="v3-legend">${esc(opts.names[3] || '')}: <span class="v3-grad" style="background:linear-gradient(90deg,${GRAD.join(',')})"></span> ${t({ en: 'low → high', ne: 'कम → बढी' })}</span>`;
    },
  };

  // ---------- Catalogue ----------
  const INFO = {
    network: { icon: '🧠', lessons: ['neural-networks', 'what-is-ml', 'training-deep'], title: { en: 'Neural network firing', ne: 'सिग्नल पठाउँदै न्युरल नेटवर्क' }, desc: { en: 'Signals flow forward through layers of neurons; each neuron glows when it receives a signal.', ne: 'सिग्नल न्युरोनका layer हुँदै अगाडि बग्छ; सिग्नल पाउँदा हरेक न्युरोन चम्किन्छ।' } },
    loss: { icon: '⛰️', lessons: ['gradient-descent', 'math-intuition'], cam: [8, 7, 9], title: { en: 'Gradient descent on a loss surface', ne: 'Loss surface मा gradient descent' }, desc: { en: 'A ball rolls downhill following the gradient. Change the learning rate: too big and it flies off, too small and it crawls.', ne: 'बल gradient पछ्याउँदै ओरालो गुड्छ। Learning rate बदल्नुहोस्: धेरै ठूलो भए उड्छ, धेरै सानो भए घस्रिन्छ।' } },
    regression: { icon: '📈', lessons: ['linear-regression'], title: { en: 'Linear regression plane', ne: 'लिनियर रिग्रेसन समतल' }, desc: { en: 'With two features, linear regression fits a flat plane. Red lines are the errors it minimizes.', ne: 'दुई feature हुँदा लिनियर रिग्रेसनले समतल फिट गर्छ। रातो रेखाहरू यसले घटाउने गल्ती हुन्।' } },
    sigmoid: { icon: '🌀', lessons: ['logistic-regression'], title: { en: 'Logistic regression probability', ne: 'लजिस्टिक रिग्रेसन सम्भाव्यता' }, desc: { en: 'The sigmoid turns a plane into an S-shaped probability surface. Bigger weights = sharper boundary.', ne: 'Sigmoid ले समतललाई S-आकारको सम्भाव्यता सतहमा बदल्छ। ठूलो weight = तीखो सीमा।' } },
    svm: { icon: '✨', lessons: ['svm'], title: { en: 'The SVM kernel trick', ne: 'SVM kernel trick' }, desc: { en: 'Impossible in 2-D, easy in 3-D: lift the points with a kernel and separate them with a plane.', ne: '2-D मा असम्भव, 3-D मा सजिलो: kernel ले बिन्दु उठाएर समतलले छुट्याउने।' } },
    forest: { icon: '🌲', lessons: ['random-forest', 'decision-trees'], title: { en: 'Random forest voting', ne: 'Random forest को मतदान' }, desc: { en: 'Every tree votes. The forest takes the majority — individual mistakes cancel out.', ne: 'हरेक ट्रीले मत दिन्छ। फरेस्टले बहुमत लिन्छ — व्यक्तिगत गल्ती काटिन्छन्।' } },
    kmeans: { icon: '🎯', lessons: ['kmeans'], title: { en: 'K-Means clustering live', ne: 'प्रत्यक्ष K-Means क्लस्टरिङ' }, desc: { en: 'Watch centroids alternate between "assign" and "move to the mean" until they settle.', ne: 'Centroid हरू "assign" र "औसतमा सार्ने" बीच पालैपालो गर्दै स्थिर भएको हेर्नुहोस्।' } },
    knn: { icon: '👥', lessons: ['knn'], title: { en: 'K-nearest neighbours', ne: 'K-नजिकका छिमेकी' }, desc: { en: 'The white point asks its k nearest neighbours and takes the majority colour.', ne: 'सेतो बिन्दुले नजिकका k छिमेकीलाई सोधेर बहुमतको रङ लिन्छ।' } },
    pca: { icon: '📉', lessons: ['pca'], title: { en: 'PCA: finding the best directions', ne: 'PCA: उत्तम दिशा खोज्ने' }, desc: { en: 'Arrows show the principal components. Project the cloud from 3-D to 2-D and see how little is lost.', ne: 'तीरले principal component देखाउँछ। बादललाई 3-D बाट 2-D मा प्रक्षेपण गरेर कति थोरै हराउँछ हेर्नुहोस्।' } },
    cnn: { icon: '🖼️', lessons: ['cnn'], cam: [1, 4, 10], target: [0, 1.5, 0], title: { en: 'Inside a CNN', ne: 'CNN भित्र' }, desc: { en: 'An image of a "7" flows through convolution and pooling layers to the answer.', ne: '"७" को फोटो convolution र pooling layer हुँदै उत्तरसम्म पुग्छ।' } },
    attention: { icon: '🔦', lessons: ['transformers'], cam: [6, 7, 7], title: { en: 'Transformer attention', ne: 'ट्रान्सफर्मर attention' }, desc: { en: 'Each bar shows how much one word attends to another. Different heads learn different patterns.', ne: 'हरेक बारले एउटा शब्दले अर्कोमा कति ध्यान दिन्छ देखाउँछ। फरक head ले फरक ढाँचा सिक्छन्।' } },
    tree: { icon: '🌳', lessons: ['decision-trees'], cam: [2, 3.5, 11], target: [1, 2, 0], title: { en: 'A decision tree in action', ne: 'काम गर्दै डिसिजन ट्री', zh: '决策树实战' }, desc: { en: 'Watch a flower fall through the tree — one yes/no question per box — until it lands on a prediction.', ne: 'फूल ट्रीबाट झरेको हेर्नुहोस् — हरेक बाकसमा एउटा हो/होइन प्रश्न — अनुमानमा नपुगुन्जेल।', zh: '看一朵花穿过决策树——每个方框一个“是/否”问题——直到得到预测。' } },
    gaussians: { icon: '🏔️', lessons: ['naive-bayes'], cam: [7, 7, 8], title: { en: 'Naive Bayes probability mountains', ne: 'Naive Bayes सम्भाव्यताका पहाड', zh: '朴素贝叶斯概率之山' }, desc: { en: 'Each class is a probability mountain; the tallest mountain at a point wins. Change σ to reshape them.', ne: 'हरेक वर्ग सम्भाव्यताको पहाड हो; कुनै बिन्दुमा सबैभन्दा अग्लो पहाड जित्छ। σ बदलेर आकार परिवर्तन गर्नुहोस्।', zh: '每个类别是一座概率之山；某一点上最高的山获胜。调整 σ 改变山的形状。' } },
    dbscan: { icon: '🌌', lessons: ['anomaly-detection'], title: { en: 'DBSCAN spreading through dense regions', ne: 'घना क्षेत्रमा फैलिँदै DBSCAN', zh: 'DBSCAN 在密集区域中扩散' }, desc: { en: 'Clusters grow from dense core points like ink spreading; lonely points stay red as noise.', ne: 'क्लस्टरहरू घना केन्द्र बिन्दुबाट मसी फैलिएझैं बढ्छन्; एक्ला बिन्दु रातो noise रहन्छन्।', zh: '簇像墨水一样从密集的核心点扩散开来；孤立的点保持红色，成为噪声。' } },
    embeddings: { icon: '🔤', lessons: ['transformers'], cam: [0, 3, 10], target: [0, 2.2, 0], title: { en: 'Word embedding space', ne: 'शब्द embedding स्पेस', zh: '词嵌入空间' }, desc: { en: 'Words in English, नेपाली and 中文 become points; similar meanings cluster together, and directions carry meaning.', ne: 'अंग्रेजी, नेपाली र 中文 का शब्द बिन्दु बन्छन्; मिल्दो अर्थ सँगै हुन्छन्, र दिशाले अर्थ बोक्छ।', zh: '英文、尼泊尔文和中文的词变成点；含义相近的聚在一起，方向也有含义。' } },
    dartboard: { icon: '🎯', lessons: ['overfitting'], cam: [0, 2, 10], target: [0, 1.8, 0], autoRotate: false, title: { en: 'Bias vs variance dartboards', ne: 'Bias बनाम variance डार्टबोर्ड', zh: '偏差与方差飞镖靶' }, desc: { en: 'Four kinds of models throwing darts: accurate, scattered (overfit), consistently off (underfit), or both.', ne: 'चार प्रकारका मोडेलले dart हान्छन्: सही, छरिएको (overfit), लगातार चुक्ने (underfit), वा दुवै।', zh: '四种模型在投飞镖：准确的、分散的（过拟合）、一直偏的（欠拟合），或两者都有。' } },
    backprop: { icon: '🔁', lessons: ['training-deep'], cam: [0, 3, 12], target: [0, 2.2, 0], title: { en: 'Backpropagation & dropout', ne: 'ब्याकप्रोपागेसन र dropout', zh: '反向传播与 Dropout' }, desc: { en: 'Forward pass, loss, then gradients flow backwards and update the weights — epoch after epoch.', ne: 'Forward pass, loss, अनि gradient पछाडि बग्छ र weight update हुन्छ — epoch पछि epoch।', zh: '前向传播、计算损失，然后梯度反向流动并更新权重——一轮接一轮。' } },
  };

  function addStars(s, n = 900, size = 0.18) {
    const { THREE } = s, r = mulberry(77), pos = [];
    for (let i = 0; i < n; i++) { const th = r() * Math.PI * 2, ph = Math.acos(2 * r() - 1), d = 30 + r() * 25; pos.push(d * Math.sin(ph) * Math.cos(th), d * Math.cos(ph), d * Math.sin(ph) * Math.sin(th)); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const st = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size, map: dot(THREE), transparent: true, depthWrite: false, fog: false }));
    s.scene.add(st);
    s.onFrame((dt) => { st.rotation.y += dt * 0.01; });
  }
  async function mount(el, name, opts = {}) {
    const info = INFO[name] || {};
    if (el._stage) { el._stage.dispose(); el._stage = null; }
    applyTheme();
    el.innerHTML = `<div class="viz3d bg-${bgKey}" style="--h3d:${opts.height || 420}px"><div class="viz3d-canvas"><div class="viz3d-loading">${u('loading3d')}</div></div>
      <div class="viz3d-hint">🖱️ ${u('drag3d')}</div>
      <div class="viz3d-theme">🎨 <select class="th">${Object.keys(THEMES).map((k) => `<option value="${k}" ${k === themeKey ? 'selected' : ''}>${t(THEMES[k].name)}</option>`).join('')}</select>
        <select class="bgsel">${Object.keys(BGS).map((k) => `<option value="${k}" ${k === bgKey ? 'selected' : ''}>${t(BGS[k])}</option>`).join('')}</select>
        <select class="qsel" title="${t(QTITLE)}" aria-label="${t(QTITLE)}">${Object.keys(QUAL).map((k) => `<option value="${k}" ${k === qualKey ? 'selected' : ''}>${t(QUAL[k])}</option>`).join('')}</select></div>
      <div class="viz3d-controls"></div></div>`;
    const canvas = el.querySelector('.viz3d-canvas'), ctrl = el.querySelector('.viz3d-controls');
    el.querySelector('.th').onchange = (e) => { themeKey = e.target.value; MLS.store.set('3d-theme', themeKey); mount(el, name, opts); };
    el.querySelector('.bgsel').onchange = (e) => { bgKey = e.target.value; MLS.store.set('3d-bg', bgKey); mount(el, name, opts); };
    el.querySelector('.qsel').onchange = (e) => { qualKey = e.target.value; MLS.store.set('3d-quality', qualKey); mount(el, name, opts); };
    try {
      const s = await stage(canvas, { height: opts.height || 420, cam: opts.cam || info.cam, target: opts.target || info.target, autoRotate: opts.autoRotate !== undefined ? opts.autoRotate : info.autoRotate });
      el._stage = s;
      if (!document.body.contains(el)) { s.dispose(); return; }
      if (bgKey === 'space') addStars(s); else if (bgKey === 'night') addStars(s, 420, 0.13);
      await SCENES[name](s, ctrl, opts);
      s.polish();
    } catch (e) {
      console.error(e);
      canvas.innerHTML = `<div class="viz3d-loading">⚠️ ${u('fail3d')}</div>`;
    }
  }
  MLS.ml3d = { mount, INFO };

  // ---------- 3D Lab page ----------
  MLS.routes.lab3d = (arg) => {
    const keys = Object.keys(INFO), cur = INFO[arg] ? arg : 'loss';
    const el = h(`<div class="wide">
      <div class="page-hero lab3d-hero"><div><h1>🧊 ${u('lab3d')}</h1><p>${u('lab3dIntro')}</p></div><div class="cube3d"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <div class="lab3d">
        <div class="lab3d-list">${keys.map((k) => `<a href="#/lab3d/${k}" class="lab3d-item ${k === cur ? 'on' : ''}"><span class="ic">${INFO[k].icon}</span><span>${t(INFO[k].title)}</span></a>`).join('')}</div>
        <div class="lab3d-view card">
          <h2>${INFO[cur].icon} ${t(INFO[cur].title)}</h2><p class="muted">${t(INFO[cur].desc)}</p>
          <div class="lab3d-slot"></div>
          <div class="lab3d-links">${INFO[cur].lessons.map((id) => { const L = window.COURSE.lessons.find((l) => l.id === id); return L ? `<a class="btn ghost sm" href="#/learn/${id}">📘 ${t(L.title)}</a>` : ''; }).join(' ')}</div>
        </div>
      </div></div>`);
    requestAnimationFrame(() => mount(el.querySelector('.lab3d-slot'), cur, { height: 470 }));
    return el;
  };

  // ---------- "See it in 3D" inside lessons ----------
  MLS.hooks.lesson.push((L, body) => {
    const key = Object.keys(INFO).find((k) => INFO[k].lessons[0] === L.id) || Object.keys(INFO).find((k) => INFO[k].lessons.includes(L.id));
    if (!key) return;
    const block = h(`<section class="see3d"><h2>🧊 ${u('see3d')}: ${t(INFO[key].title)}</h2><p class="muted">${t(INFO[key].desc)}</p><div class="see3d-slot"></div></section>`);
    const anchor = body.querySelector('.box.analogy') || body.querySelector('h2');
    if (anchor && anchor.tagName === 'H2') anchor.before(block); else if (anchor) anchor.after(block); else body.prepend(block);
    requestAnimationFrame(() => mount(block.querySelector('.see3d-slot'), key, { height: 380 }));
  });

  // ---------- Home showcase ----------
  MLS.hooks.home.push((el) => {
    const sec = h(`<section class="showcase">
      <div class="showcase-text">
        <span class="new-badge big">NEW</span>
        <h2>${u('homeShowTitle')}</h2>
        <p class="muted">${u('homeShowSub')}</p>
        <div class="feat-cards">
          <a class="feat" href="#/lab3d"><b>🧊 ${u('lab3d')}</b><span>${u('feat3d')}</span></a>
          <a class="feat" href="#/datalab"><b>📊 ${u('datalab')}</b><span>${u('featData')}</span></a>
          <a class="feat open-tutor-home" href="#/"><b>🤖 ${u('tutor')}</b><span>${u('featAI')}</span></a>
        </div>
      </div>
      <div class="showcase-3d"></div></section>`);
    sec.querySelector('.open-tutor-home').onclick = (e) => { e.preventDefault(); MLS.openTutor && MLS.openTutor(); };
    const stats = el.querySelector('.stats');
    (stats || el.firstElementChild).after(sec);
    requestAnimationFrame(() => mount(sec.querySelector('.showcase-3d'), 'network', { height: 360, cam: [0, 1.5, 11] }));
  });
})();

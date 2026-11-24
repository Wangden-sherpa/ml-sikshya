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
    feat3d: { en: '12 interactive 3D models: loss surfaces, clusters, kernels, CNNs, attention…', ne: '१२ अन्तरक्रियात्मक 3D मोडेल: loss surface, cluster, kernel, CNN, attention…' },
    featData: { en: 'Upload your own CSV / Excel files — explore, chart, and train models on real data.', ne: 'आफ्नै CSV / Excel फाइल अपलोड गर्नुहोस् — वास्तविक डाटामा अन्वेषण, चार्ट र मोडेल तालिम।' },
    featAI: { en: 'Stuck? The AI tutor explains errors and gives suggestions in English or नेपाली.', ne: 'अड्कनुभयो? AI सहायकले error बुझाउँछ र अंग्रेजी वा नेपालीमा सुझाव दिन्छ।' },
    try: { en: 'Try it', ne: 'प्रयास गर्नुहोस्' },
  });

  // ---------- Three.js loading & stage ----------
  let libP = null;
  const lib = () => libP || (libP = Promise.all([import('three'), import('three/addons/controls/OrbitControls.js')])
    .then(([THREE, oc]) => ({ THREE, OrbitControls: oc.OrbitControls }))
    .catch((e) => { libP = null; throw e; }));

  const active = new Set();
  MLS.hooks.beforeRender.push(() => { active.forEach((s) => s.dispose()); active.clear(); });

  const PAL = [0x6366f1, 0xec4899, 0x10b981, 0xf59e0b, 0x0ea5e9, 0x8b5cf6, 0xef4444, 0x14b8a6, 0xf97316, 0x84cc16];
  const mulberry = (a) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  const randn = (r) => { let a = 0; while (!a) a = r(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * r()); };

  async function stage(container, opts = {}) {
    const { THREE, OrbitControls } = await lib();
    const H = opts.height || 400;
    const W = container.clientWidth || 640;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1020, 18, 40);
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 200);
    camera.position.set(...(opts.cam || [7, 5, 9]));
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = opts.autoRotate !== false;
    controls.autoRotateSpeed = 0.7;
    if (opts.target) controls.target.set(...opts.target);
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const dl = new THREE.DirectionalLight(0xffffff, 1.2); dl.position.set(6, 12, 8); scene.add(dl);
    const pl = new THREE.PointLight(0xa78bfa, 1.2, 30); pl.position.set(-6, 4, -4); scene.add(pl);
    renderer.domElement.addEventListener('pointerdown', () => { controls.autoRotate = false; });

    const frames = [];
    let alive = true, raf = 0, visible = true;
    const clock = new THREE.Clock();
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      frames.forEach((f) => f(dt, clock.elapsedTime));
      controls.update();
      renderer.render(scene, camera);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(container);
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth; if (!w) return;
      renderer.setSize(w, H); camera.aspect = w / H; camera.updateProjectionMatrix();
    });
    ro.observe(container);
    loop();
    const s = {
      THREE, scene, camera, renderer, controls,
      onFrame: (f) => frames.push(f),
      dispose() {
        if (!alive) return;
        alive = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); controls.dispose();
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) [].concat(o.material).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        });
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
  const heat = (THREE, v) => new THREE.Color().setHSL(0.66 - 0.66 * Math.max(0, Math.min(1, v)), 0.85, 0.55);
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
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfde047, emissiveIntensity: 0.6 }));
      scene.add(ball);
      const MAXT = 500, trailPos = new Float32Array(MAXT * 3);
      const tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.BufferAttribute(trailPos, 3)); tg.setDrawRange(0, 0);
      scene.add(new THREE.Line(tg, new THREE.LineBasicMaterial({ color: 0xfde047 })));
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
      for (let i = 0; i < 160; i++) { const x = (r() - 0.5) * 6, z = (r() - 0.5) * 6; const yes = x + 0.7 * z + randn(r) * 0.6 > 0; P.push([x, yes ? 3.05 : 0.05, z]); C.push(yes ? 0xef4444 : 0x3b82f6); }
      points(s, P, C, 0.22);
      upd();
      ctrl.innerHTML = `<label>${t({ en: 'Weight size (steepness)', ne: 'Weight आकार (ठाडोपन)' })} <input type="range" min="0.2" max="8" step="0.1" value="1.5"></label><span class="v3-status">${t({ en: 'Blue dots = class 0 (bottom), red dots = class 1 (top). The surface is the predicted probability; where it crosses 0.5 is the decision boundary.', ne: 'नीलो = वर्ग 0 (तल), रातो = वर्ग 1 (माथि)। सतह अनुमानित सम्भाव्यता हो; 0.5 पार गर्ने ठाउँ decision boundary हो।' })}</span>`;
      ctrl.querySelector('input').oninput = (e) => { k = +e.target.value; upd(); };
    },

    async svm(s, ctrl) {
      const { THREE, scene } = s;
      axes(s, 3.2, ['x₁', 'x₁² + x₂²', 'x₂']);
      const r = mulberry(11), base = [], C = [];
      for (let i = 0; i < 110; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 1.05; base.push([Math.cos(a) * d, Math.sin(a) * d]); C.push(0xef4444); }
      for (let i = 0; i < 170; i++) { const a = r() * Math.PI * 2, d = 1.75 + r() * 0.95; base.push([Math.cos(a) * d, Math.sin(a) * d]); C.push(0x3b82f6); }
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
        trees.forEach((tr) => { const isA = Math.random() < pA; if (isA) a++; tr.orb.material.color.set(isA ? 0xef4444 : 0x3b82f6); tr.orb.material.emissive.set(isA ? 0xef4444 : 0x3b82f6); });
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
      points(s, P, Y.map((y) => (y ? 0xef4444 : 0x3b82f6)), 0.17);
      const q = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.4 }));
      scene.add(q);
      let k = 7, moving = true;
      const lp = new Float32Array(15 * 6), lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
      scene.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xfde047 })));
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
        q.material.emissive.set(cls ? 0xef4444 : 0x3b82f6);
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
      const outs = []; for (let i = 0; i < 10; i++) { const on = i === 7; const m = new THREE.Mesh(new THREE.SphereGeometry(on ? 0.2 : 0.14, 18, 12), new THREE.MeshStandardMaterial({ color: on ? 0xfde047 : 0x64748b, emissive: on ? 0xfde047 : 0x000000, emissiveIntensity: 0.7 })); m.position.set(5, 0.5 + i * 0.4, 0); scene.add(m); outs.push(m); const l = label(THREE, String(i), { size: 0.26, color: on ? '#fde047' : '#94a3b8' }); l.position.set(5.45, 0.5 + i * 0.4, 0); scene.add(l); }
      const ol = label(THREE, t({ en: 'Output: it is a 7!', ne: 'आउटपुट: यो ७ हो!' }), { size: 0.3, color: '#fde047' }); ol.position.set(5, -0.2, 0); scene.add(ol);
      const kern = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.3), new THREE.MeshBasicMaterial({ color: 0xfde047, wireframe: true })); scene.add(kern);
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0xfde047 })));
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
      else if (opts.colorKind === 'num') ctrl.innerHTML = `<span class="v3-legend">${esc(opts.names[3] || '')}: <span class="v3-grad"></span> ${t({ en: 'low → high', ne: 'कम → बढी' })}</span>`;
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
  };

  async function mount(el, name, opts = {}) {
    const info = INFO[name] || {};
    el.innerHTML = `<div class="viz3d"><div class="viz3d-canvas"><div class="viz3d-loading">${u('loading3d')}</div></div>
      <div class="viz3d-hint">🖱️ ${u('drag3d')}</div><div class="viz3d-controls"></div></div>`;
    const canvas = el.querySelector('.viz3d-canvas'), ctrl = el.querySelector('.viz3d-controls');
    try {
      const s = await stage(canvas, { height: opts.height || 420, cam: opts.cam || info.cam, target: opts.target || info.target, autoRotate: opts.autoRotate });
      if (!document.body.contains(el)) { s.dispose(); return; }
      await SCENES[name](s, ctrl, opts);
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

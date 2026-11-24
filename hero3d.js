/* ML Sikshya — immersive cinematic 3D hero ("neural galaxy"):
   a spiral galaxy of thousands of stars, a glowing energy core, refractive glass orbs, a neural network with
   travelling light pulses and a neon Himalaya terrain — ACES film tone mapping, bloom glow, supersampled
   ("Ultra") resolution and mouse parallax. Falls back to the static artwork if WebGL is unavailable. */
(() => {
  const MLS = window.MLS;
  let active = null;
  MLS.hooks.beforeRender.push(() => { if (active) { active.dispose(); active = null; } });
  MLS.hooks.home.push((el) => {
    const hero = el.querySelector('.hero');
    if (!hero) return;
    const holder = document.createElement('div');
    holder.className = 'hero-3d';
    hero.prepend(holder);
    requestAnimationFrame(() => start(holder, hero).catch((e) => { console.warn('Hero 3D unavailable — using the static artwork.', e); holder.remove(); }));
  });

  const rand = (a, b) => a + Math.random() * (b - a);
  function dotTexture(THREE) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,.85)'); gr.addColorStop(0.6, 'rgba(255,255,255,.18)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  async function start(holder, hero) {
    const [THREE, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }, { RoomEnvironment }] = await Promise.all([
      import('three'),
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js'),
      import('three/addons/postprocessing/OutputPass.js'),
      import('three/addons/environments/RoomEnvironment.js'),
    ]);
    if (!document.body.contains(holder)) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ultra = MLS.store.get('3d-quality', 'ultra') === 'ultra';
    const W = () => Math.max(holder.clientWidth, 10), H = () => Math.max(holder.clientHeight, 10);
    const small = () => W() < 760;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * (ultra ? 1.5 : 1), ultra ? 3 : 2));
    renderer.setSize(W(), H());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    holder.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05061a);
    scene.fog = new THREE.FogExp2(0x070a1c, 0.028);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(48, W() / H(), 0.1, 300);
    camera.position.set(0, 1.4, 13);
    // wide screens: park the galaxy on the right so the headline stays on dark sky
    const focusX = () => (small() ? 0 : Math.min(6.2, 2.2 * (W() / H())));
    const focus = new THREE.Vector3(focusX(), 0.2, 0);
    scene.add(new THREE.AmbientLight(0x8b9cff, 0.35));
    const key = new THREE.PointLight(0x22d3ee, 60, 40); key.position.set(focus.x - 2, 4, 6); scene.add(key);
    const rim = new THREE.PointLight(0xf472b6, 50, 40); rim.position.set(focus.x + 5, -1, -3); scene.add(rim);

    const dot = dotTexture(THREE);
    const world = new THREE.Group(); world.position.copy(focus); scene.add(world);

    // ---- far star field ----
    {
      const n = ultra ? 2600 : 1400, pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const r = rand(40, 110), th = rand(0, Math.PI * 2), ph = Math.acos(rand(-1, 1));
        pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.6, -Math.abs(r * Math.sin(ph) * Math.sin(th))], i * 3);
        const c = new THREE.Color().setHSL(rand(0.5, 0.85), 0.6, rand(0.7, 0.95)); col.set([c.r, c.g, c.b], i * 3);
      }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.35, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })));
    }

    // ---- spiral galaxy ----
    const galaxy = new THREE.Group(); galaxy.rotation.x = 0.42; galaxy.rotation.z = 0.12; world.add(galaxy);
    {
      const n = ultra ? 14000 : 7000, arms = 3, R = 7.5, pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
      const inner = new THREE.Color(0xfdf4ff), mid = new THREE.Color(0x22d3ee), outer = new THREE.Color(0xa855f7), edge = new THREE.Color(0xf472b6);
      for (let i = 0; i < n; i++) {
        const r = Math.pow(Math.random(), 0.75) * R;
        const branch = ((i % arms) / arms) * Math.PI * 2, spin = r * 0.95;
        const sp = 0.42 * (r / R + 0.25);
        const rx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * sp * 2.2;
        const ry = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * sp * 0.8;
        const rz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * sp * 2.2;
        pos.set([Math.cos(branch + spin) * r + rx, ry, Math.sin(branch + spin) * r + rz], i * 3);
        const t = r / R, c = t < 0.35 ? inner.clone().lerp(mid, t / 0.35) : t < 0.75 ? mid.clone().lerp(outer, (t - 0.35) / 0.4) : outer.clone().lerp(edge, (t - 0.75) / 0.25);
        col.set([c.r, c.g, c.b], i * 3);
      }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      galaxy.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.07, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
    }

    // ---- energy core ----
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.62, 64, 48), new THREE.MeshPhysicalMaterial({ color: 0x1b1450, emissive: 0x9f7aea, emissiveIntensity: 2.4, roughness: 0.2, clearcoat: 1 }));
    world.add(core);
    const shell = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.15, 1)), new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
    world.add(shell);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: 0xc084fc, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.scale.set(5.5, 5.5, 1); world.add(halo);

    // ---- neural network shell with travelling pulses ----
    const nodes = [];
    {
      const n = 46, R = 3.1, golden = Math.PI * (3 - Math.sqrt(5));
      const nodeGeo = new THREE.SphereGeometry(0.075, 16, 12);
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2, rr = Math.sqrt(1 - y * y), th = golden * i;
        const v = new THREE.Vector3(Math.cos(th) * rr * R, y * R * 0.82, Math.sin(th) * rr * R);
        const m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xf472b6 : i % 3 === 1 ? 0x22d3ee : 0xc4b5fd }));
        m.position.copy(v); world.add(m); nodes.push(m);
      }
      const pts = [], edges = [];
      nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && a.position.distanceTo(b.position) < 1.75) { pts.push(a.position, b.position); edges.push([a, b]); } }));
      nodes.edges = edges;
      world.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })));
    }
    const pulses = [], pulseGeo = new THREE.SphereGeometry(0.05, 10, 8);
    const pulseMats = [0xfdf4ff, 0x22d3ee, 0xf472b6].map((c) => new THREE.MeshBasicMaterial({ color: c }));

    // ---- refractive glass orbs ----
    const orbs = [];
    [[1.35, 4.6, 0.18, 0x93c5fd], [0.9, 5.6, -0.12, 0xf0abfc], [0.65, 3.9, 0.26, 0x99f6e4], [0.5, 6.4, 0.1, 0xfde68a]].forEach(([size, radius, speed, tint], i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(size * 0.55, 64, 48), new THREE.MeshPhysicalMaterial({
        color: tint, metalness: 0, roughness: 0.04, transmission: 1, thickness: 1.4, ior: 1.45, clearcoat: 1, clearcoatRoughness: 0.05,
        iridescence: 1, iridescenceIOR: 1.3, envMapIntensity: 1.6, transparent: true,
      }));
      m.userData = { radius, speed, phase: i * 1.7, tilt: rand(-0.5, 0.5) };
      world.add(m); orbs.push(m);
    });

    // ---- neon Himalaya terrain ----
    const terrain = (() => {
      const g = new THREE.PlaneGeometry(90, 36, ultra ? 180 : 110, ultra ? 72 : 44);
      g.rotateX(-Math.PI / 2);
      const p = g.attributes.position, colors = [];
      const cA = new THREE.Color(0x22d3ee), cB = new THREE.Color(0xa855f7), cC = new THREE.Color(0xf472b6);
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), z = p.getZ(i), back = (18 - z) / 36; // 0 near → 1 far
        const ridge = Math.max(0, Math.sin(x * 0.22) * 2.2 + Math.sin(x * 0.53 + 1.3) * 1.3 + Math.sin(x * 1.1 + 0.4) * 0.5 + 1.6);
        const peaks = Math.pow(Math.abs(Math.sin(x * 0.11 + 0.6)), 6) * 6;
        p.setY(i, (ridge + peaks) * Math.pow(back, 1.6) * 1.15);
        const c = cA.clone().lerp(cB, back).lerp(cC, Math.max(0, back - 0.6) * 1.4);
        colors.push(c.r, c.g, c.b);
      }
      g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }));
      mesh.position.set(0, -4.2, -10);
      scene.add(mesh);
      const fill = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x0b0a26, transparent: true, opacity: 0.85 }));
      fill.position.copy(mesh.position); fill.position.y -= 0.03; scene.add(fill);
      return mesh;
    })();

    // ---- post-processing: bloom + output (tone mapping & sRGB) ----
    const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 }));
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(W(), H());
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W(), H()), ultra ? 1.05 : 0.85, 0.6, 0.18);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ---- interaction ----
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => { const r = hero.getBoundingClientRect(); mouse.x = (e.clientX - r.left) / r.width - 0.5; mouse.y = (e.clientY - r.top) / r.height - 0.5; };
    hero.addEventListener('pointermove', onMove);
    let visible = true, raf = 0, alive = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(hero);
    const ro = new ResizeObserver(() => {
      const w = W(), hh = H();
      renderer.setSize(w, hh); composer.setSize(w, hh); bloom.setSize(w, hh);
      camera.aspect = w / hh; camera.updateProjectionMatrix();
      focus.x = focusX(); world.position.x = focus.x;
    });
    ro.observe(holder);

    const clock = new THREE.Clock();
    let pulseAcc = 0;
    const frame = () => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
      galaxy.rotation.y += dt * 0.06;
      shell.rotation.y -= dt * 0.25; shell.rotation.x += dt * 0.1;
      const beat = 1 + Math.sin(t * 2.2) * 0.06 + Math.max(0, Math.sin(t * 2.2 * 2)) * 0.04;
      core.scale.setScalar(beat); halo.scale.setScalar(5.5 * beat);
      core.material.emissiveIntensity = 2.2 + Math.sin(t * 2.2) * 0.5;
      orbs.forEach((o) => { const d = o.userData, a = t * d.speed + d.phase; o.position.set(Math.cos(a) * d.radius, Math.sin(a * 1.3) * 0.9 + d.tilt, Math.sin(a) * d.radius * 0.6); o.rotation.y += dt * 0.4; });
      world.rotation.y = Math.sin(t * 0.08) * 0.25;
      // pulses along the neural links
      pulseAcc += dt;
      if (pulseAcc > 0.09 && nodes.edges.length) { pulseAcc = 0; const e = nodes.edges[Math.floor(Math.random() * nodes.edges.length)]; const m = new THREE.Mesh(pulseGeo, pulseMats[Math.floor(Math.random() * 3)]); world.add(m); pulses.push({ m, a: e[0], b: e[1], k: 0 }); }
      for (let i = pulses.length - 1; i >= 0; i--) { const p = pulses[i]; p.k += dt * 1.6; p.m.position.lerpVectors(p.a.position, p.b.position, Math.min(1, p.k)); if (p.k >= 1) { world.remove(p.m); pulses.splice(i, 1); } }
      nodes.forEach((n, i) => n.scale.setScalar(1 + Math.max(0, Math.sin(t * 3 + i)) * 0.6));
      terrain.position.z = -10 + ((t * 0.8) % 2) * 0.25; // subtle drift
      // cinematic parallax camera
      camera.position.x += (mouse.x * 2.2 - camera.position.x) * 0.035;
      camera.position.y += (1.4 - mouse.y * 1.4 - camera.position.y) * 0.035;
      camera.lookAt(focus.x * 0.15, 0.1, 0);
      composer.render();
    };
    if (reduce) { camera.lookAt(focus.x * 0.15, 0.1, 0); composer.render(); } else frame();
    hero.classList.add('has-3d');

    active = {
      dispose() {
        alive = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); hero.removeEventListener('pointermove', onMove);
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) [].concat(o.material).forEach((m) => { if (m.map && m.map !== dot) m.map.dispose(); m.dispose(); }); });
        dot.dispose(); envTex.dispose(); pmrem.dispose(); composer.dispose && composer.dispose(); renderer.dispose(); renderer.forceContextLoss && renderer.forceContextLoss(); renderer.domElement.remove();
      },
    };
  }
})();

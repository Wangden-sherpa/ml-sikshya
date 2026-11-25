/* ML Sikshya — app logic (routing, bilingual UI, Python playground, quizzes, progress) */
(() => {
  const C = window.COURSE;

  const LEVELS = [
    { id: 'foundations', emoji: '🌱', title: { en: 'Foundations', ne: 'आधारभूत ज्ञान' },
      desc: { en: 'What ML is, Python, NumPy, Pandas, plotting and the maths intuition you need.', ne: 'ML के हो, Python, NumPy, Pandas, ग्राफ र चाहिने गणितको सहज बुझाइ।' } },
    { id: 'supervised', emoji: '📈', title: { en: 'Supervised Learning', ne: 'सुपरभाइज्ड लर्निङ' },
      desc: { en: 'Learn from labelled examples: regression, classification, trees, forests, SVM.', ne: 'उत्तर सहितका उदाहरणबाट सिक्ने: रिग्रेसन, क्लासिफिकेसन, ट्री, फरेस्ट, SVM।' } },
    { id: 'unsupervised', emoji: '🧩', title: { en: 'Unsupervised Learning', ne: 'अनसुपरभाइज्ड लर्निङ' },
      desc: { en: 'Find hidden patterns without labels: clustering, PCA, anomaly detection.', ne: 'उत्तर बिना लुकेका ढाँचा पत्ता लगाउने: क्लस्टरिङ, PCA, असामान्यता पहिचान।' } },
    { id: 'practice', emoji: '🛠️', title: { en: 'ML in Practice', ne: 'व्यवहारमा ML' },
      desc: { en: 'Do ML properly: overfitting, validation, metrics, features and pipelines.', ne: 'ML सही तरिकाले गर्ने: ओभरफिटिङ, भ्यालिडेसन, मेट्रिक्स, फिचर र पाइपलाइन।' } },
    { id: 'deep', emoji: '🧠', title: { en: 'Deep Learning', ne: 'डिप लर्निङ' },
      desc: { en: 'Neural networks from scratch, backpropagation, CNNs, RNNs and Transformers.', ne: 'सुरुदेखि न्युरल नेटवर्क, ब्याकप्रोपागेसन, CNN, RNN र ट्रान्सफर्मर।' } },
    { id: 'pro', emoji: '🚀', title: { en: 'Professional', ne: 'पेशेवर स्तर' },
      desc: { en: 'Deploy models, MLOps, responsible AI and your career roadmap.', ne: 'मोडेल डिप्लोय, MLOps, जिम्मेवार AI र तपाईंको करियर रोडम्याप।' } },
  ];

  const UI = {
    home: { en: 'Home', ne: 'गृहपृष्ठ' },
    learn: { en: 'Learn', ne: 'सिक्नुहोस्' },
    projects: { en: 'Projects', ne: 'प्रोजेक्टहरू' },
    playground: { en: 'Playground', ne: 'कोड खेल मैदान' },
    glossary: { en: 'Glossary', ne: 'शब्दकोश' },
    progress: { en: 'Your progress', ne: 'तपाईंको प्रगति' },
    lessons: { en: 'lessons', ne: 'पाठ' },
    min: { en: 'min', ne: 'मिनेट' },
    heroTitle: { en: 'Master Machine Learning — from zero to professional', ne: 'मेसिन लर्निङ सिक्नुहोस् — शून्यदेखि पेशेवरसम्म' },
    heroSub: { en: 'Simple explanations, real theory, and live Python code you can edit and run right here. In English and नेपाली.', ne: 'सरल व्याख्या, वास्तविक सिद्धान्त, र यहीँ चलाउन मिल्ने Python कोड। अंग्रेजी र नेपाली दुवैमा।' },
    start: { en: 'Start learning', ne: 'सिक्न सुरु गर्नुहोस्' },
    continue: { en: 'Continue', ne: 'जारी राख्नुहोस्' },
    seeProjects: { en: 'Browse projects', ne: 'प्रोजेक्टहरू हेर्नुहोस्' },
    madeBy: { en: 'Made with 💙 by <b class="notranslate">Wangden Sherpa</b> · MBAN student at Saint Mary\'s University', ne: '💙 सहित <b class="notranslate">Wangden Sherpa</b> द्वारा निर्मित · Saint Mary\'s University मा MBAN विद्यार्थी', zh: '由 <b class="notranslate">Wangden Sherpa</b> 用 💙 打造 · 圣玛丽大学 MBAN 学生' },
    madeByShort: { en: 'Made by <span class="notranslate">Wangden Sherpa</span> · MBAN, Saint Mary\'s University', ne: '<span class="notranslate">Wangden Sherpa</span> द्वारा निर्मित · MBAN, Saint Mary\'s University', zh: '由 <span class="notranslate">Wangden Sherpa</span> 制作 · 圣玛丽大学 MBAN' },
    statLessons: { en: 'Lessons', ne: 'पाठहरू' },
    statProjects: { en: 'Projects', ne: 'प्रोजेक्टहरू' },
    statDone: { en: 'Completed', ne: 'पूरा भएका' },
    statQuiz: { en: 'Quiz average', ne: 'क्विज औसत' },
    path: { en: 'Your learning path', ne: 'तपाईंको सिकाइ मार्ग' },
    howTitle: { en: 'How to learn here', ne: 'यहाँ कसरी सिक्ने' },
    how1t: { en: 'Read the idea', ne: 'विचार पढ्नुहोस्' },
    how1: { en: 'Every lesson starts with a simple analogy, then the real theory and where it is used.', ne: 'हरेक पाठ सरल उदाहरणबाट सुरु हुन्छ, त्यसपछि वास्तविक सिद्धान्त र प्रयोग हुने ठाउँ।' },
    how2t: { en: 'Run & change the code', ne: 'कोड चलाउनुहोस् र बदल्नुहोस्' },
    how2: { en: 'Press ▶ Run. Then change numbers and see what happens — that is how you really learn.', ne: '▶ Run थिच्नुहोस्। अनि अंक बदलेर के हुन्छ हेर्नुहोस् — साँचो सिकाइ यसरी नै हुन्छ।' },
    how3t: { en: 'Quiz & build projects', ne: 'क्विज र प्रोजेक्ट बनाउनुहोस्' },
    how3: { en: 'Check yourself with the quiz, then apply everything in real projects.', ne: 'क्विजले आफूलाई जाँच्नुहोस्, अनि सिकेको कुरा वास्तविक प्रोजेक्टमा लागू गर्नुहोस्।' },
    run: { en: '▶ Run', ne: '▶ चलाउनुहोस्' },
    running: { en: 'Running…', ne: 'चल्दैछ…' },
    reset: { en: 'Reset', ne: 'रिसेट' },
    copy: { en: 'Copy', ne: 'कपी' },
    copied: { en: 'Copied!', ne: 'कपी भयो!' },
    output: { en: 'Output', ne: 'नतिजा' },
    noOutput: { en: '(no output — add print() to see values)', ne: '(केही नतिजा छैन — मान हेर्न print() थप्नुहोस्)' },
    loadingPy: { en: 'Loading Python in your browser… (first time takes 10–30 seconds)', ne: 'ब्राउजरमा Python लोड हुँदैछ… (पहिलो पटक १०–३० सेकेन्ड लाग्छ)' },
    loadingPkgs: { en: 'Loading libraries…', ne: 'लाइब्रेरी लोड हुँदैछ…' },
    pyFail: { en: 'Could not load Python. Please check your internet connection and try again.', ne: 'Python लोड हुन सकेन। इन्टरनेट जाँचेर फेरि प्रयास गर्नुहोस्।' },
    editHint: { en: 'Tip: click inside the code to edit it. Ctrl + Enter also runs it.', ne: 'सुझाव: कोडभित्र क्लिक गरेर बदल्न सकिन्छ। Ctrl + Enter थिचेर पनि चलाउन सकिन्छ।' },
    quiz: { en: 'Quick quiz', ne: 'छोटो क्विज' },
    quizSub: { en: 'Pick an answer — you will see the explanation instantly.', ne: 'उत्तर छान्नुहोस् — व्याख्या तुरुन्तै देखिन्छ।' },
    score: { en: 'Your score', ne: 'तपाईंको अंक' },
    retry: { en: 'Try again', ne: 'फेरि प्रयास' },
    markDone: { en: '✓ Mark lesson complete', ne: '✓ पाठ पूरा भयो' },
    completed: { en: '✓ Completed', ne: '✓ पूरा भयो' },
    next: { en: 'Next →', ne: 'अर्को →' },
    prev: { en: '← Previous', ne: '← अघिल्लो' },
    great: { en: 'Great job! Lesson completed 🎉', ne: 'शाबास! पाठ पूरा भयो 🎉' },
    all: { en: 'All', ne: 'सबै' },
    beginner: { en: 'Beginner', ne: 'सुरुवाती' },
    intermediate: { en: 'Intermediate', ne: 'मध्यम' },
    advanced: { en: 'Advanced', ne: 'उन्नत' },
    projIntro: { en: 'Learning sticks when you build. Each project has a goal, step-by-step guide, starter code you can run, and challenges to push further.', ne: 'आफैं बनाउँदा सिकाइ पक्का हुन्छ। हरेक प्रोजेक्टमा लक्ष्य, चरणबद्ध गाइड, चलाउन मिल्ने सुरुवाती कोड, र अझ अगाडि बढ्न चुनौतीहरू छन्।' },
    goal: { en: 'Goal', ne: 'लक्ष्य' },
    youLearn: { en: 'What you will practise', ne: 'तपाईंले के अभ्यास गर्नुहुन्छ' },
    steps: { en: 'Step-by-step', ne: 'चरणबद्ध तरिका' },
    starter: { en: 'Starter code', ne: 'सुरुवाती कोड' },
    challenges: { en: 'Challenges — level up!', ne: 'चुनौतीहरू — अझ माथि जानुहोस्!' },
    related: { en: 'Related lessons', ne: 'सम्बन्धित पाठहरू' },
    back: { en: '← All projects', ne: '← सबै प्रोजेक्ट' },
    pgIntro: { en: 'Your free space to experiment. NumPy, Pandas, Matplotlib and scikit-learn are available. Pick a sample or write your own code.', ne: 'स्वतन्त्र रूपमा प्रयोग गर्ने ठाउँ। NumPy, Pandas, Matplotlib र scikit-learn उपलब्ध छन्। नमुना छान्नुहोस् वा आफ्नै कोड लेख्नुहोस्।' },
    sample: { en: 'Load a sample:', ne: 'नमुना लोड गर्नुहोस्:' },
    glossIntro: { en: 'Every important ML word, explained simply in both languages.', ne: 'ML का महत्त्वपूर्ण शब्दहरू, दुवै भाषामा सरल व्याख्यासहित।' },
    search: { en: 'Search a term…', ne: 'शब्द खोज्नुहोस्…' },
    notFound: { en: 'Page not found.', ne: 'पृष्ठ भेटिएन।' },
    level: { en: 'Level', ne: 'तह' },
    lab3d: { en: '3D Lab', ne: '3D ल्याब' },
    datalab: { en: 'Data Lab', ne: 'डाटा ल्याब' },
    tutor: { en: 'AI Tutor', ne: 'AI सहायक' },
    realworld: { en: 'Real-World', ne: 'वास्तविक संसार', zh: '真实项目' },
  };

  // ---------- State ----------
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem('mls-' + k)) ?? d; } catch { return d; } },
    set: (k, v) => localStorage.setItem('mls-' + k, JSON.stringify(v)),
  };
  const S = {
    lang: store.get('lang', 'en'),
    theme: store.get('theme', 'dark'),
    done: store.get('done', {}),
    quiz: store.get('quiz', {}),
  };

  // Translate {en, ne, zh} objects. In Chinese, strings without a zh version are looked up in the MLS_ZH phrase map (i18n-zh.js), then fall back to English.
  const t = (x) => {
    if (x == null) return '';
    if (typeof x === 'string' || Array.isArray(x)) return x;
    if (x[S.lang] != null) return x[S.lang];
    if (S.lang === 'zh' && window.MLS_ZH && typeof x.en === 'string' && window.MLS_ZH[x.en]) return window.MLS_ZH[x.en];
    return x.en;
  };
  const u = (k) => t(UI[k]);
  const $ = (sel, el = document) => el.querySelector(sel);
  const h = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; };
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lessons = () => C.lessons;
  const lessonsOf = (lv) => C.lessons.filter((l) => l.level === lv);
  const doneCount = () => C.lessons.filter((l) => S.done[l.id]).length;
  const quizAvg = () => {
    const v = Object.values(S.quiz);
    return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 100) : 0;
  };

  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ---------- Python syntax highlight ----------
  const PY_RE = /(#[^\n]*)|("""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|[rRfFbBuU]{0,2}"(?:\\.|[^"\\\n])*"?|[rRfFbBuU]{0,2}'(?:\\.|[^'\\\n])*'?)|\b(\d+\.?\d*(?:[eE][-+]?\d+)?)\b|\b(def|class|return|if|elif|else|for|while|in|not|and|or|import|from|as|with|try|except|finally|raise|lambda|pass|break|continue|yield|is|global|assert|del)\b|\b(None|True|False|self|print|len|range|sum|min|max|abs|round|list|dict|set|tuple|int|float|str|zip|enumerate|sorted|type)\b(?!\s*=)|\b([A-Za-z_]\w*)(?=\s*\()/g;
  function highlight(code) {
    let out = '', last = 0, m;
    PY_RE.lastIndex = 0;
    while ((m = PY_RE.exec(code))) {
      if (m[0] === '') { PY_RE.lastIndex++; continue; }
      out += esc(code.slice(last, m.index));
      const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'n' : m[4] ? 'k' : m[5] ? 'b' : 'f';
      out += `<span class="tok-${cls}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    return out + esc(code.slice(last)) + '\n';
  }

  // ---------- Pyodide (Python in the browser) ----------
  let pyPromise = null;
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  function getPy() {
    if (!pyPromise) {
      pyPromise = (async () => {
        await loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
        const p = await window.loadPyodide();
        p.runPython(`
import os, sys, io, json, base64, warnings
os.environ["MPLBACKEND"] = "AGG"
warnings.filterwarnings("ignore", message=".*non-interactive.*")
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)
def _mls_figs():
    if "matplotlib.pyplot" not in sys.modules:
        return "[]"
    import matplotlib.pyplot as plt
    imgs = []
    for n in plt.get_fignums():
        buf = io.BytesIO()
        plt.figure(n).savefig(buf, format="png", dpi=96, bbox_inches="tight")
        imgs.append(base64.b64encode(buf.getvalue()).decode())
    plt.close("all")
    return json.dumps(imgs)
`);
        return p;
      })();
      pyPromise.catch(() => { pyPromise = null; });
    }
    return pyPromise;
  }
  function cleanError(msg) {
    const lines = String(msg).split('\n');
    const i = lines.findIndex((l) => l.includes('File "<exec>"'));
    return i > 0 ? ['Traceback (most recent call last):', ...lines.slice(i)].join('\n') : msg;
  }
  let runQueue = Promise.resolve();
  function runPython(code, outEl) {
    const job = async () => {
      outEl.innerHTML = `<div class="label">${u('output')}</div><div class="loading">${u('loadingPy')}</div>`;
      let p;
      try { p = await getPy(); } catch { outEl.innerHTML = `<div class="label">${u('output')}</div><div class="err">${u('pyFail')}</div>`; return; }
      outEl.innerHTML = `<div class="label">${u('output')}</div><div class="loading">${u('loadingPkgs')}</div>`;
      let text = '', err = '';
      try { await p.loadPackagesFromImports(code); } catch (e) { /* package may still be importable */ }
      p.setStdout({ batched: (s) => { text += s + '\n'; } });
      p.setStderr({ batched: (s) => { text += s + '\n'; } });
      try {
        const r = await p.runPythonAsync(code);
        if (r !== undefined && r !== null) { text += String(r.toString ? r.toString() : r) + '\n'; if (r.destroy) r.destroy(); }
      } catch (e) { err = cleanError(e.message); }
      let imgs = [];
      try { imgs = JSON.parse(p.runPython('_mls_figs()')); } catch { /* ignore */ }
      outEl.innerHTML = `<div class="label">${u('output')}</div>`;
      if (text) outEl.appendChild(Object.assign(document.createElement('div'), { textContent: text.replace(/\n$/, '') }));
      if (err) outEl.appendChild(Object.assign(document.createElement('div'), { className: 'err', textContent: err }));
      imgs.forEach((b64) => { const im = document.createElement('img'); im.src = 'data:image/png;base64,' + b64; outEl.appendChild(im); });
      if (!text && !err && !imgs.length) outEl.appendChild(Object.assign(document.createElement('div'), { className: 'muted', textContent: u('noOutput') }));
      MLS.lastRun = { code, text, err, at: Date.now() };
      MLS.hooks.run.forEach((f) => { try { f(code, !err); } catch (e) { console.error(e); } });
      if (err) MLS.hooks.error.forEach((f) => { try { f(outEl, err, code); } catch (e) { console.error(e); } });
    };
    runQueue = runQueue.then(job, job);
    return runQueue;
  }

  // ---------- Code block component ----------
  function codeBlock(code, title) {
    code = code.replace(/^\n+/, '').replace(/\s+$/, '');
    const el = h(`<div class="code-block">
      <div class="code-head"><span class="dots"><i></i><i></i><i></i></span><span class="title">${esc(title || 'python')}</span>
        <button class="copy">${u('copy')}</button><button class="reset">${u('reset')}</button><button class="run">${u('run')}</button></div>
      <div class="editor"><pre aria-hidden="true"></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off"></textarea></div>
      <div class="output" hidden></div></div>`);
    const ta = $('textarea', el), pre = $('pre', el), out = $('.output', el), runBtn = $('.run', el);
    const sync = () => {
      pre.innerHTML = highlight(ta.value);
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 2 + 'px';
      pre.scrollLeft = ta.scrollLeft;
    };
    ta.value = code;
    ta.addEventListener('input', sync);
    ta.addEventListener('scroll', () => { pre.scrollLeft = ta.scrollLeft; pre.scrollTop = ta.scrollTop; });
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart;
        ta.setRangeText('    ', s, ta.selectionEnd, 'end'); sync();
      } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); }
      else if (e.key === 'Enter') {
        // keep indentation of the current line (and indent after ":")
        const s = ta.selectionStart, line = ta.value.slice(0, s).split('\n').pop();
        let ind = line.match(/^\s*/)[0];
        if (/:\s*$/.test(line)) ind += '    ';
        e.preventDefault(); ta.setRangeText('\n' + ind, s, ta.selectionEnd, 'end'); sync();
      }
    });
    async function run() {
      out.hidden = false; runBtn.disabled = true; runBtn.textContent = u('running');
      await runPython(ta.value, out);
      runBtn.disabled = false; runBtn.textContent = u('run');
    }
    runBtn.onclick = run;
    $('.reset', el).onclick = () => { ta.value = code; sync(); out.hidden = true; };
    $('.copy', el).onclick = () => { navigator.clipboard?.writeText(ta.value); toast(u('copied')); };
    requestAnimationFrame(sync);
    el._sync = sync;
    return el;
  }

  // ---------- Layout pieces ----------
  function renderTop(route) {
    const items = [['#/', 'home'], ['#/learn', 'learn'], ['#/projects', 'projects'], ['#/playground', 'playground'], ['#/realworld', 'realworld'], ['#/lab3d', 'lab3d'], ['#/datalab', 'datalab'], ['#/glossary', 'glossary']];
    $('#topnav').innerHTML = items.map(([href, k]) => {
      const active = (k === 'home' && route === '') || (k === 'learn' && route === 'learn') || route === k || (k === 'projects' && route === 'project');
      return `<a href="${href}" class="${active ? 'active' : ''}">${u(k)}</a>`;
    }).join('');
    document.querySelectorAll('.lang-toggle button').forEach((b) => b.classList.toggle('on', b.dataset.lang === S.lang));
    $('#themeBtn').textContent = S.theme === 'dark' ? '☀️' : '🌙';
  }

  function renderSidebar(activeId, route) {
    const total = C.lessons.length, done = doneCount();
    const pct = total ? Math.round((done / total) * 100) : 0;
    let html = `<div class="side-progress"><div class="row"><span>${u('progress')}</span><b>${pct}%</b></div>
      <div class="bar"><span style="width:${pct}%"></span></div>
      <div class="row" style="margin:7px 0 0"><span>${done} / ${total} ${u('lessons')}</span></div></div>
      <div class="side-links">
        <a href="#/" class="${route === '' ? 'active' : ''}">🏠 ${u('home')}</a>
        <a href="#/projects" class="${route.startsWith('project') ? 'active' : ''}">🧪 ${u('projects')}</a>
        <a href="#/playground" class="${route === 'playground' ? 'active' : ''}">⌨️ ${u('playground')}</a>
        <a href="#/glossary" class="${route === 'glossary' ? 'active' : ''}">📖 ${u('glossary')}</a>
        <a href="#/realworld" class="${route === 'realworld' || route === 'mission' ? 'active' : ''}">🌍 ${u('realworld')} <span class="new-badge">NEW</span></a>
        <a href="#/lab3d" class="${route === 'lab3d' ? 'active' : ''}">🧊 ${u('lab3d')} <span class="new-badge">NEW</span></a>
        <a href="#/datalab" class="${route === 'datalab' ? 'active' : ''}">📊 ${u('datalab')} <span class="new-badge">NEW</span></a>
        <a href="#/" class="open-tutor">🤖 ${u('tutor')} <span class="new-badge">NEW</span></a>
      </div>`;
    LEVELS.forEach((lv, i) => {
      const ls = lessonsOf(lv.id);
      const d = ls.filter((l) => S.done[l.id]).length;
      html += `<div class="side-level"><button class="side-level-title">${lv.emoji} ${i + 1}. ${t(lv.title)}<span class="count">${d}/${ls.length}</span></button>
        <div class="side-lessons">${ls.map((l) => `<a href="#/learn/${l.id}" class="side-lesson ${S.done[l.id] ? 'done' : ''} ${l.id === activeId ? 'active' : ''}"><span class="dot">${S.done[l.id] ? '✓' : ''}</span><span>${t(l.title)}</span></a>`).join('')}</div></div>`;
    });
    html += `<div class="side-credit">💙 ${u('madeByShort')}</div>`;
    const sb = $('#sidebar');
    sb.innerHTML = html;
    sb.querySelectorAll('.side-level-title').forEach((b) => (b.onclick = () => b.parentElement.classList.toggle('collapsed')));
    sb.querySelectorAll('.open-tutor').forEach((a) => (a.onclick = (e) => { e.preventDefault(); MLS.openTutor && MLS.openTutor(); }));
    const act = $('.side-lesson.active', sb);
    if (act) act.scrollIntoView({ block: 'nearest' });
  }

  // ---------- Views ----------
  const heroSVG = `<svg viewBox="0 0 320 220" fill="none">
    ${[[40, 50], [40, 110], [40, 170]].flatMap(([x1, y1]) => [[160, 40], [160, 90], [160, 140], [160, 190]].map(([x2, y2]) => `<line class="edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>`)).join('')}
    ${[[160, 40], [160, 90], [160, 140], [160, 190]].flatMap(([x1, y1]) => [[280, 80], [280, 140]].map(([x2, y2]) => `<line class="edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>`)).join('')}
    ${[[40, 50], [40, 110], [40, 170]].map(([x, y], i) => `<circle class="node" style="animation-delay:${i * .3}s" cx="${x}" cy="${y}" r="14" fill="#fff"/>`).join('')}
    ${[[160, 40], [160, 90], [160, 140], [160, 190]].map(([x, y], i) => `<circle class="node" style="animation-delay:${i * .25 + .4}s" cx="${x}" cy="${y}" r="14" fill="#fde68a"/>`).join('')}
    ${[[280, 80], [280, 140]].map(([x, y], i) => `<circle class="node" style="animation-delay:${i * .3 + .9}s" cx="${x}" cy="${y}" r="16" fill="#f9a8d4"/>`).join('')}
  </svg>`;

  function nextLesson() { return C.lessons.find((l) => !S.done[l.id]) || C.lessons[0]; }

  function viewHome() {
    const nl = nextLesson();
    const started = doneCount() > 0;
    const el = h(`<div class="wide">
      <section class="hero">
        <div><h1>${u('heroTitle')}</h1><p>${u('heroSub')}</p>
          <div class="hero-actions"><a class="btn" href="#/learn/${nl.id}">${started ? u('continue') + ': ' + t(nl.title) : u('start')} →</a>
          <a class="btn ghost" href="#/projects">${u('seeProjects')}</a></div></div>
        <div>${heroSVG}</div>
      </section>
      <div class="stats">
        <div class="card stat"><b>${C.lessons.length}</b><span>${u('statLessons')}</span></div>
        <div class="card stat"><b>${C.projects.length}</b><span>${u('statProjects')}</span></div>
        <div class="card stat"><b>${doneCount()}</b><span>${u('statDone')}</span></div>
        <div class="card stat"><b>${quizAvg()}%</b><span>${u('statQuiz')}</span></div>
      </div>
      <div class="section-title"><h2>${u('howTitle')}</h2></div>
      <div class="steps3">
        <div class="card"><div class="n">1</div><h3>${u('how1t')}</h3><p>${u('how1')}</p></div>
        <div class="card"><div class="n">2</div><h3>${u('how2t')}</h3><p>${u('how2')}</p></div>
        <div class="card"><div class="n">3</div><h3>${u('how3t')}</h3><p>${u('how3')}</p></div>
      </div>
      <div class="section-title"><h2>${u('path')}</h2></div>
      <div class="levels">${LEVELS.map((lv, i) => {
        const ls = lessonsOf(lv.id), d = ls.filter((l) => S.done[l.id]).length, pct = ls.length ? Math.round((d / ls.length) * 100) : 0;
        const target = ls.find((l) => !S.done[l.id]) || ls[0];
        return `<a class="card level-card" href="#/learn/${target ? target.id : ''}">
          <div class="top"><div class="emoji">${lv.emoji}</div><div><div class="muted" style="font-size:.8rem">${u('level')} ${i + 1}</div><h3>${t(lv.title)}</h3></div></div>
          <p>${t(lv.desc)}</p>
          <div class="bar"><span style="width:${pct}%"></span></div>
          <div class="muted" style="font-size:.84rem">${d} / ${ls.length} ${u('lessons')}</div></a>`;
      }).join('')}</div>
      <footer class="made-by">${u('madeBy')}</footer>
    </div>`);
    MLS.hooks.home.forEach((f) => { try { f(el); } catch (e) { console.error(e); } });
    return el;
  }

  function viewLesson(id) {
    const all = lessons();
    const i = all.findIndex((l) => l.id === id);
    if (i < 0) return viewNotFound();
    const L = all[i], lv = LEVELS.find((x) => x.id === L.level), lvIndex = LEVELS.indexOf(lv);
    const prev = all[i - 1], next = all[i + 1];
    const el = h(`<div class="container">
      <div class="crumbs"><span>${lv.emoji} ${u('level')} ${lvIndex + 1}: ${t(lv.title)}</span></div>
      <div class="lesson-head"><h1>${t(L.title)}</h1>
        <div class="meta"><span class="pill">⏱ ${L.minutes || 15} ${u('min')}</span>${S.done[L.id] ? `<span class="pill beginner">${u('completed')}</span>` : ''}</div></div>
      <div class="lesson-body"></div>
      <div class="lesson-foot">
        <button class="btn ${S.done[L.id] ? 'success' : ''}" id="doneBtn">${S.done[L.id] ? u('completed') : u('markDone')}</button>
        <div class="navs">${prev ? `<a class="btn ghost" href="#/learn/${prev.id}">${u('prev')}</a>` : ''}${next ? `<a class="btn" href="#/learn/${next.id}">${u('next')}</a>` : ''}</div>
      </div></div>`);
    const body = $('.lesson-body', el);
    body.innerHTML = t(L.body);
    // Replace <div data-code="n"></div> placeholders with live editors (or append them at the end)
    (L.code || []).forEach((c, n) => {
      const block = codeBlock(c.code, t(c.title));
      const slot = body.querySelector(`[data-code="${n}"]`);
      if (slot) slot.replaceWith(block); else body.appendChild(block);
    });
    if ((L.code || []).length) {
      const firstBlock = $('.code-block', body);
      if (firstBlock) firstBlock.insertAdjacentElement('afterend', h(`<div class="hint">${u('editHint')}</div>`));
    }
    if (L.quiz && L.quiz.length) body.after(quizBlock(L));
    MLS.hooks.lesson.forEach((f) => { try { f(L, body, el); } catch (e) { console.error(e); } });
    $('#doneBtn', el).onclick = () => {
      S.done[L.id] = !S.done[L.id]; store.set('done', S.done);
      if (S.done[L.id]) toast(u('great'));
      render();
    };
    return el;
  }

  function quizBlock(L) {
    const el = h(`<div class="card quiz"><h2>🎯 ${u('quiz')}</h2><div class="muted">${u('quizSub')}</div><div class="qs"></div><div class="score" hidden></div></div>`);
    const qs = $('.qs', el), scoreEl = $('.score', el);
    let answered = 0, correct = 0;
    L.quiz.forEach((q, qi) => {
      const opts = t(q.options);
      const qEl = h(`<div class="q"><div class="q-title">${qi + 1}. ${t(q.q)}</div><div class="opts">${opts.map((o, oi) => `<button class="opt" data-i="${oi}">${o}</button>`).join('')}</div></div>`);
      qEl.querySelectorAll('.opt').forEach((b) => {
        b.onclick = () => {
          const pick = +b.dataset.i, ok = pick === q.answer;
          qEl.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (+x.dataset.i === q.answer) x.classList.add('correct'); });
          if (!ok) b.classList.add('wrong');
          qEl.appendChild(h(`<div class="explain">${ok ? '✅' : '❌'} ${t(q.explain) || ''}</div>`));
          answered++; if (ok) correct++;
          if (answered === L.quiz.length) {
            const sc = correct / L.quiz.length;
            S.quiz[L.id] = Math.max(S.quiz[L.id] || 0, sc); store.set('quiz', S.quiz);
            scoreEl.hidden = false;
            scoreEl.innerHTML = `${u('score')}: ${correct} / ${L.quiz.length} ${sc === 1 ? '🏆' : sc >= .5 ? '👍' : '💪'} <button class="btn ghost sm" style="margin-left:10px">${u('retry')}</button>`;
            $('button', scoreEl).onclick = () => el.replaceWith(quizBlock(L));
          }
        };
      });
      qs.appendChild(qEl);
    });
    return el;
  }

  let projFilter = 'all';
  function viewProjects() {
    const el = h(`<div class="wide"><h1>🧪 ${u('projects')}</h1><p class="muted">${u('projIntro')}</p>
      <div class="filters">${['all', 'beginner', 'intermediate', 'advanced'].map((f) => `<button data-f="${f}" class="${projFilter === f ? 'on' : ''}">${u(f)}</button>`).join('')}</div>
      <div class="projects"></div></div>`);
    const grid = $('.projects', el);
    const draw = () => {
      grid.innerHTML = C.projects.filter((p) => projFilter === 'all' || p.level === projFilter).map((p) => `
        <a class="card project-card" href="#/project/${p.id}"><div class="icon">${p.icon}</div><h3>${t(p.title)}</h3><p>${t(p.summary)}</p>
        <div><span class="pill ${p.level}">${u(p.level)}</span></div></a>`).join('');
      el.querySelectorAll('.filters button').forEach((b) => b.classList.toggle('on', b.dataset.f === projFilter));
    };
    el.querySelectorAll('.filters button').forEach((b) => (b.onclick = () => { projFilter = b.dataset.f; draw(); }));
    draw();
    return el;
  }

  function viewProject(id) {
    const P = C.projects.find((p) => p.id === id);
    if (!P) return viewNotFound();
    const rel = (P.lessons || []).map((lid) => C.lessons.find((l) => l.id === lid)).filter(Boolean);
    const el = h(`<div class="container lesson-body">
      <a href="#/projects">${u('back')}</a>
      <div class="lesson-head" style="margin-top:12px"><h1>${P.icon} ${t(P.title)}</h1><div class="meta"><span class="pill ${P.level}">${u(P.level)}</span></div></div>
      <div class="box key"><b class="t">${u('goal')}</b>${t(P.goal)}</div>
      <h2>🧠 ${u('youLearn')}</h2><ul>${t(P.learn).map((x) => `<li>${x}</li>`).join('')}</ul>
      <h2>🪜 ${u('steps')}</h2><ol class="steps-list">${t(P.steps).map((x) => `<li>${x}</li>`).join('')}</ol>
      <h2>💻 ${u('starter')}</h2><div class="code-slot"></div>
      <h2>🏆 ${u('challenges')}</h2><ul class="challenge-list">${t(P.challenges).map((x) => `<li>${x}</li>`).join('')}</ul>
      ${rel.length ? `<h2>📚 ${u('related')}</h2><ul>${rel.map((l) => `<li><a href="#/learn/${l.id}">${t(l.title)}</a></li>`).join('')}</ul>` : ''}
    </div>`);
    const slot = $('.code-slot', el);
    slot.replaceWith(codeBlock(P.code, t(P.title) + ' — starter.py'));
    return el;
  }

  function viewPlayground() {
    const samples = [{ title: { en: 'Blank', ne: 'खाली' }, code: '# Write your Python code here\nprint("Namaste, Machine Learning! 🙏")\n' }];
    C.lessons.forEach((l) => (l.code || []).forEach((c) => samples.push({ title: { en: t(l.title) + ' — ' + (c.title?.en || c.title), ne: (l.title.ne || l.title.en) + ' — ' + (c.title?.ne || c.title?.en || c.title), zh: (l.title.zh || l.title.en) + ' — ' + (c.title?.zh || c.title?.en || c.title) }, code: c.code })));
    const el = h(`<div class="container"><h1>⌨️ ${u('playground')}</h1><p class="muted">${u('pgIntro')}</p>
      <div class="toolbar"><span>${u('sample')}</span><select>${samples.map((s, i) => `<option value="${i}">${esc(t(s.title))}</option>`).join('')}</select></div>
      <div class="pg-slot"></div></div>`);
    const draw = (i) => {
      const cur = $('.code-block', el) || $('.pg-slot', el);
      cur.replaceWith(codeBlock(samples[i].code, 'playground.py'));
    };
    $('select', el).onchange = (e) => draw(+e.target.value);
    draw(0);
    return el;
  }

  function viewGlossary() {
    const el = h(`<div class="container"><h1>📖 ${u('glossary')}</h1><p class="muted">${u('glossIntro')}</p>
      <input class="search" placeholder="${u('search')}"><div class="gloss"></div></div>`);
    const list = $('.gloss', el), input = $('input', el);
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      list.innerHTML = C.glossary
        .filter((g) => !q || (g.term + g.ne + (g.zh || '') + g.def.en + g.def.ne + (g.def.zh || '')).toLowerCase().includes(q))
        .sort((a, b) => a.term.localeCompare(b.term))
        .map((g) => `<div class="card"><h3>${g.term}<span>${S.lang === 'zh' ? (g.zh || g.ne) : g.ne}</span></h3><p>${t(g.def)}</p></div>`).join('');
    };
    input.oninput = draw; draw();
    return el;
  }

  function viewNotFound() { return h(`<div class="container"><h1>🤔 ${u('notFound')}</h1><a class="btn" href="#/">${u('home')}</a></div>`); }

  // ---------- Router ----------
  function render() {
    document.documentElement.lang = S.lang;
    document.documentElement.dataset.theme = S.theme;
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    let route = parts[0] || '', arg = parts[1];
    if (route === 'learn' && !arg) { arg = nextLesson().id; }
    MLS.hooks.beforeRender.forEach((f) => { try { f(); } catch (e) { console.error(e); } });
    MLS.route = route; MLS.routeArg = arg;
    let view;
    if (MLS.routes[route]) view = MLS.routes[route](arg);
    else if (route === '') view = viewHome();
    else if (route === 'learn') view = viewLesson(arg);
    else if (route === 'projects') view = viewProjects();
    else if (route === 'project') view = viewProject(arg);
    else if (route === 'playground') view = viewPlayground();
    else if (route === 'glossary') view = viewGlossary();
    else view = viewNotFound();
    const main = $('#main');
    main.innerHTML = '';
    main.appendChild(view);
    renderTop(route);
    renderSidebar(route === 'learn' ? arg : null, route);
    document.body.classList.remove('menu-open');
    MLS.hooks.afterRender.forEach((f) => { try { f(route, arg); } catch (e) { console.error(e); } });
  }

  window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
  document.querySelectorAll('.lang-toggle button').forEach((b) => (b.onclick = () => {
    if (S.lang === b.dataset.lang) return;
    // keep unsaved edits? Re-render is simplest; scroll position kept.
    const y = window.scrollY; S.lang = b.dataset.lang; store.set('lang', S.lang); render(); window.scrollTo(0, y);
  }));
  $('#themeBtn').onclick = () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; store.set('theme', S.theme); document.documentElement.dataset.theme = S.theme; renderTop(location.hash.replace(/^#\/?/, '').split('/')[0]); };
  $('#menuBtn').onclick = () => document.body.classList.toggle('menu-open');

  // ---------- Extension API (used by three-scenes.js, data-lab.js, ai-tutor.js) ----------
  const MLS = window.MLS = {
    S, UI, t, u, h, esc, $, toast, store, codeBlock, runPython, getPy, render, LEVELS,
    routes: {}, lastRun: null, route: '', routeArg: null,
    hooks: { lesson: [], home: [], error: [], beforeRender: [], run: [], afterRender: [] },
  };
  // Render after every extension script has loaded and registered itself.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else setTimeout(render);
})();

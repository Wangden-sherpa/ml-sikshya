/* ML Sikshya — AI Tutor (Claude, with the learner's own API key) + offline Error Doctor & helper. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast, store } = MLS;

  Object.assign(MLS.UI, {
    tutorHi: { en: 'Namaste! 🙏 I\'m your ML tutor. Ask me anything about the lessons, your code errors or your data. I answer in English or नेपाली.', ne: 'नमस्ते! 🙏 म तपाईंको ML सहायक हुँ। पाठ, कोडका error वा तपाईंको डाटाबारे जे पनि सोध्नुहोस्। म अंग्रेजी वा नेपालीमा उत्तर दिन्छु।' },
    tutorOffline: { en: 'Offline helper', ne: 'अफलाइन सहायक' },
    tutorOnline: { en: 'Claude connected', ne: 'Claude जोडियो' },
    tutorPh: { en: 'Ask a question… (Enter to send, Shift+Enter for new line)', ne: 'प्रश्न सोध्नुहोस्… (पठाउन Enter, नयाँ लाइन Shift+Enter)' },
    tutorSettings: { en: 'Connect Claude for full AI answers', ne: 'पूरा AI उत्तरका लागि Claude जोड्नुहोस्' },
    tutorKeyHelp: { en: 'Paste your Anthropic API key (get one at console.anthropic.com). It is saved only in this browser and sent only to api.anthropic.com. Usage is billed to your Anthropic account. Without a key, the offline helper still explains errors and finds the right lessons.', ne: 'आफ्नो Anthropic API key टाँस्नुहोस् (console.anthropic.com मा पाइन्छ)। यो यही ब्राउजरमा मात्र सेभ हुन्छ र api.anthropic.com मा मात्र पठाइन्छ। प्रयोगको शुल्क तपाईंको Anthropic खातामा लाग्छ। Key बिना पनि अफलाइन सहायकले error बुझाउँछ र सही पाठ खोज्छ।' },
    tutorSave: { en: 'Save', ne: 'सेभ' }, tutorForget: { en: 'Remove key', ne: 'Key हटाउनुहोस्' }, tutorModel: { en: 'Model', ne: 'मोडेल' },
    tutorClear: { en: 'New chat', ne: 'नयाँ कुराकानी' },
    chipExplain: { en: '📘 Explain this lesson simply', ne: '📘 यो पाठ सरल भाषामा बुझाउनुहोस्' },
    chipError: { en: '🩺 Help with my last error', ne: '🩺 मेरो पछिल्लो error मा मद्दत' },
    chipPractice: { en: '🏋️ Give me a practice exercise', ne: '🏋️ अभ्यास प्रश्न दिनुहोस्' },
    chipNext: { en: '🧭 What should I learn next?', ne: '🧭 अब के सिक्ने?' },
    chipData: { en: '📊 Suggest a plan for my data', ne: '📊 मेरो डाटाका लागि योजना सुझाउनुहोस्' },
    doctorTitle: { en: 'Error Doctor', ne: 'Error डाक्टर' },
    doctorAsk: { en: '🤖 Ask the AI tutor', ne: '🤖 AI सहायकलाई सोध्नुहोस्' },
    whyErr: { en: 'Why it happened', ne: 'किन भयो' }, fixErr: { en: 'How to fix it', ne: 'कसरी सच्याउने' },
    offlineNote: { en: 'ℹ️ Offline helper answer. Connect Claude (⚙️) for full, personal explanations.', ne: 'ℹ️ अफलाइन सहायकको उत्तर। पूरा, व्यक्तिगत व्याख्याका लागि Claude जोड्नुहोस् (⚙️)।' },
    relLessons: { en: 'Lessons that can help', ne: 'मद्दत गर्ने पाठहरू' },
    noMatch: { en: 'I could not find that topic offline. Try other words (e.g. "overfitting", "KNN", "missing values") or connect Claude for a full answer.', ne: 'अफलाइनमा त्यो विषय भेटिएन। अरू शब्द प्रयास गर्नुहोस् (जस्तै "overfitting", "KNN", "missing values") वा पूरा उत्तरका लागि Claude जोड्नुहोस्।' },
    thinking: { en: 'Thinking…', ne: 'सोच्दैछु…' },
  });

  // ---------- Error Doctor rules ----------
  const RULES = [
    [/ModuleNotFoundError: No module named '([^']+)'/, (m) => ({ en: [`The library "${m[1]}" is not available here.`, 'This site runs Python inside your browser. Available: numpy, pandas, matplotlib, scikit-learn, scipy. Big libraries such as torch / tensorflow need your own computer or Google Colab.'], ne: [`"${m[1]}" लाइब्रेरी यहाँ उपलब्ध छैन।`, 'यो साइटले ब्राउजरभित्र Python चलाउँछ। उपलब्ध: numpy, pandas, matplotlib, scikit-learn, scipy। torch / tensorflow जस्ता ठूला लाइब्रेरीका लागि आफ्नै कम्प्युटर वा Google Colab चाहिन्छ।'] })],
    [/NameError: name '([^']+)' is not defined/, (m) => ({ en: [`Python doesn't know "${m[1]}" — it was never created, or it is spelled differently.`, `Check the spelling (Python is case-sensitive). If "${m[1]}" is created in another code box, run that box first. Did you forget an import (e.g. import numpy as np)?`], ne: [`Python लाई "${m[1]}" थाहा छैन — यो कहिल्यै बनाइएन, वा हिज्जे फरक छ।`, `हिज्जे जाँच्नुहोस् (Python ले ठूलो/सानो अक्षर फरक गन्छ)। "${m[1]}" अर्को कोड बाकसमा बनेको भए पहिले त्यो चलाउनुहोस्। import बिर्सनुभयो (जस्तै import numpy as np)?`] })],
    [/KeyError: (.+)/, (m) => ({ en: [`The column or key ${m[1]} does not exist.`, 'Print the real names with print(df.columns). Watch for spaces, capital letters and typos — "Price" ≠ "price ".'], ne: [`${m[1]} नामको column वा key छैन।`, 'वास्तविक नाम print(df.columns) ले हेर्नुहोस्। स्पेस, ठूलो अक्षर र हिज्जेमा ध्यान दिनुहोस् — "Price" ≠ "price "।'] })],
    [/IndentationError|unexpected indent|expected an indented block/, () => ({ en: ['The spaces at the start of a line are wrong.', 'Lines inside if / for / def must be indented by exactly 4 spaces, and lines at the same level must line up.'], ne: ['लाइनको सुरुको स्पेस गलत छ।', 'if / for / def भित्रका लाइन ठ्याक्कै ४ स्पेसले भित्र हुनुपर्छ, र एउटै तहका लाइन मिलेका हुनुपर्छ।'] })],
    [/could not convert string to float: (.+)/, (m) => ({ en: [`A text value (${m[1]}) reached a place that needs numbers.`, 'Models only accept numbers. Encode text columns with pd.get_dummies() / OneHotEncoder, or convert number-like text with pd.to_numeric(col, errors="coerce").'], ne: [`Text मान (${m[1]}) संख्या चाहिने ठाउँमा पुग्यो।`, 'मोडेलले संख्या मात्र लिन्छ। Text column लाई pd.get_dummies() / OneHotEncoder ले encode गर्नुहोस्, वा संख्या जस्तो text लाई pd.to_numeric(col, errors="coerce") ले बदल्नुहोस्।'] })],
    [/Input (X )?contains NaN|contains NaN|NaN, infinity/, () => ({ en: ['Your data has missing values (NaN) and this model cannot handle them.', 'Fill them first: SimpleImputer(strategy="median"), df.fillna(df.median(numeric_only=True)), or remove rows with df.dropna().'], ne: ['डाटामा हराएका मान (NaN) छन् र यो मोडेलले सम्हाल्न सक्दैन।', 'पहिले भर्नुहोस्: SimpleImputer(strategy="median"), df.fillna(df.median(numeric_only=True)), वा df.dropna() ले row हटाउनुहोस्।'] })],
    [/Expected 2D array, got 1D array/, () => ({ en: ['scikit-learn wants X as a table (2-D), but got a single list (1-D).', 'Use X.reshape(-1, 1) for one feature, or df[["col"]] (double brackets) instead of df["col"].'], ne: ['scikit-learn लाई X तालिका (2-D) चाहिन्छ, तर एउटा सूची (1-D) पायो।', 'एउटा feature का लागि X.reshape(-1, 1) प्रयोग गर्नुहोस्, वा df["col"] को सट्टा df[["col"]] (दोहोरो कोष्ठक)।'] })],
    [/inconsistent numbers of samples/, () => ({ en: ['X and y have a different number of rows.', 'Print X.shape and len(y). Make sure you filtered / dropped rows from both together (e.g. drop NaN before splitting into X and y).'], ne: ['X र y मा फरक संख्याका row छन्।', 'X.shape र len(y) print गर्नुहोस्। दुवैबाट सँगै row फिल्टर / हटाएको सुनिश्चित गर्नुहोस् (जस्तै X र y छुट्याउनु अघि NaN हटाउने)।'] })],
    [/shapes .* not aligned|matmul: Input operand|operands could not be broadcast/, () => ({ en: ['The array shapes do not fit together for this operation.', 'Print .shape of every array. For A @ B the inner sizes must match: (n, k) @ (k, m). Use .T or .reshape() to fix.'], ne: ['यो गणनाका लागि array का shape मिल्दैनन्।', 'हरेक array को .shape print गर्नुहोस्। A @ B का लागि भित्री आकार मिल्नुपर्छ: (n, k) @ (k, m)। .T वा .reshape() ले सच्याउनुहोस्।'] })],
    [/Unknown label type: '?continuous/, () => ({ en: ['You used a classifier on a numeric target (continuous numbers).', 'For predicting numbers use a regressor (LinearRegression, RandomForestRegressor). Use classifiers only for categories.'], ne: ['संख्यात्मक target (निरन्तर संख्या) मा classifier प्रयोग गर्नुभयो।', 'संख्या अनुमानका लागि regressor (LinearRegression, RandomForestRegressor) प्रयोग गर्नुहोस्। Classifier श्रेणीका लागि मात्र।'] })],
    [/NotFittedError|is not fitted yet/, () => ({ en: ['You asked the model to predict before it learned anything.', 'Call model.fit(X_train, y_train) first, then model.predict(...).'], ne: ['मोडेलले केही नसिकी अनुमान गर्न लगाउनुभयो।', 'पहिले model.fit(X_train, y_train), अनि model.predict(...)।'] })],
    [/FileNotFoundError|No such file or directory/, () => ({ en: ['The file path does not exist in the browser.', 'Upload the file in 📊 Data Lab, then read it as pd.read_csv("/data/your_file.csv") — or use DATA["your_file.csv"].'], ne: ['त्यो फाइल ब्राउजरमा छैन।', '📊 डाटा ल्याबमा फाइल अपलोड गरेर pd.read_csv("/data/your_file.csv") ले पढ्नुहोस् — वा DATA["your_file.csv"] प्रयोग गर्नुहोस्।'] })],
    [/UnicodeDecodeError/, () => ({ en: ['The file is not saved in UTF-8 text encoding.', 'Try pd.read_csv(path, encoding="latin-1"), or re-save the file as "CSV UTF-8" in Excel.'], ne: ['फाइल UTF-8 encoding मा सेभ गरिएको छैन।', 'pd.read_csv(path, encoding="latin-1") प्रयास गर्नुहोस्, वा Excel मा "CSV UTF-8" को रूपमा फेरि सेभ गर्नुहोस्।'] })],
    [/ParserError|Error tokenizing data/, () => ({ en: ['pandas could not split the file into columns.', 'The separator may be ; or tab: try pd.read_csv(path, sep=";") or sep="\\t". Some rows may have extra commas.'], ne: ['pandas ले फाइललाई column मा बाँड्न सकेन।', 'Separator ; वा tab हुन सक्छ: pd.read_csv(path, sep=";") वा sep="\\t" प्रयास गर्नुहोस्। केही row मा बढी comma हुन सक्छ।'] })],
    [/ZeroDivisionError/, () => ({ en: ['You divided by zero.', 'Check the denominator before dividing (e.g. if n > 0), or add a tiny number: x / (n + 1e-9).'], ne: ['शून्यले भाग गर्नुभयो।', 'भाग गर्नु अघि हर जाँच्नुहोस् (जस्तै if n > 0), वा सानो संख्या थप्नुहोस्: x / (n + 1e-9)।'] })],
    [/IndexError/, () => ({ en: ['You asked for a position that does not exist.', 'Lists start at 0, so a list of 5 items has positions 0–4. Print len(...) or .shape before indexing.'], ne: ['अस्तित्वमा नभएको स्थान माग्नुभयो।', 'List 0 बाट सुरु हुन्छ, त्यसैले ५ वस्तुको list मा स्थान 0–4 हुन्छन्। Index गर्नु अघि len(...) वा .shape print गर्नुहोस्।'] })],
    [/AttributeError: '(\w+)' object has no attribute '(\w+)'/, (m) => ({ en: [`A ${m[1]} object does not have "${m[2]}".`, `Check the spelling, and check the object's type with type(x). Maybe "${m[2]}" belongs to a different object (e.g. a DataFrame method used on a NumPy array).`], ne: [`${m[1]} object मा "${m[2]}" छैन।`, `हिज्जे जाँच्नुहोस्, र type(x) ले object को प्रकार हेर्नुहोस्। "${m[2]}" अर्कै object को हुन सक्छ (जस्तै DataFrame को method NumPy array मा)।`] })],
    [/TypeError: unsupported operand|can only concatenate|must be str, not/, () => ({ en: ['You mixed types that cannot be combined (e.g. text + number).', 'Convert first: str(5) + "kg", or int("5") + 3. Check column types with df.dtypes.'], ne: ['मिलाउन नमिल्ने प्रकार मिसाउनुभयो (जस्तै text + संख्या)।', 'पहिले बदल्नुहोस्: str(5) + "kg", वा int("5") + 3। Column प्रकार df.dtypes ले हेर्नुहोस्।'] })],
    [/SyntaxError/, () => ({ en: ['Python could not read the code — something is missing.', 'Look near the line shown: a missing ), ], quote " or a colon : after if / for / def is the usual cause.'], ne: ['Python ले कोड पढ्न सकेन — केही छुटेको छ।', 'देखाइएको लाइन नजिक हेर्नुहोस्: ), ], उद्धरण " वा if / for / def पछिको colon : छुट्नु सामान्य कारण हो।'] })],
    [/MemoryError|Out of memory/, () => ({ en: ['The data is too big for the browser memory.', 'Work on a sample: df = df.sample(20000, random_state=0), or drop unneeded columns.'], ne: ['डाटा ब्राउजरको मेमोरीका लागि धेरै ठूलो छ।', 'नमुनामा काम गर्नुहोस्: df = df.sample(20000, random_state=0), वा नचाहिने column हटाउनुहोस्।'] })],
    [/ConvergenceWarning|failed to converge/, () => ({ en: ['The model did not finish learning in the allowed steps.', 'Scale the features (StandardScaler) and/or increase max_iter, e.g. LogisticRegression(max_iter=2000).'], ne: ['अनुमति दिइएका पाइलामा मोडेलले सिकाइ पूरा गरेन।', 'Feature scale गर्नुहोस् (StandardScaler) र/वा max_iter बढाउनुहोस्, जस्तै LogisticRegression(max_iter=2000)।'] })],
    [/ValueError/, () => ({ en: ['A function received a value it cannot use.', 'Read the last line of the error carefully — it usually says which value is wrong. Print the shapes and types of your inputs.'], ne: ['फङ्सनले प्रयोग गर्न नसक्ने मान पायो।', 'Error को अन्तिम लाइन ध्यानले पढ्नुहोस् — प्रायः कुन मान गलत छ भन्छ। इनपुटको shape र प्रकार print गर्नुहोस्।'] })],
  ];
  function diagnose(err) {
    for (const [re, f] of RULES) { const m = String(err).match(re); if (m) return f(m); }
    return { en: ['Something went wrong while running the code.', 'Read the last line of the error message — it names the problem. Run smaller pieces of code and print values to find the line that fails.'], ne: ['कोड चलाउँदा केही गडबड भयो।', 'Error सन्देशको अन्तिम लाइन पढ्नुहोस् — यसले समस्याको नाम बताउँछ। सानो-सानो कोड चलाएर र मान print गरेर असफल लाइन खोज्नुहोस्।'] };
  }
  MLS.diagnose = diagnose;

  // Show the Error Doctor under every failed run
  MLS.hooks.error.push((outEl, err) => {
    const d = t(diagnose(err));
    const box = h(`<div class="doctor"><div class="doctor-head">🩺 ${u('doctorTitle')}</div>
      <div><b>${u('whyErr')}:</b> ${esc(d[0])}</div><div><b>${u('fixErr')}:</b> ${esc(d[1])}</div>
      <button class="doctor-ask">${u('doctorAsk')}</button></div>`);
    box.querySelector('.doctor-ask').onclick = () => openTutor(t({ en: 'I got this error. Explain what it means in simple words and show me the corrected code.', ne: 'मलाई यो error आयो। सरल भाषामा यसको अर्थ बुझाएर सच्याइएको कोड देखाउनुहोस्।' }));
    outEl.appendChild(box);
  });

  // ---------- Settings ----------
  const MODELS = [
    ['claude-opus-5-5', 'Claude Opus 5.5 — best answers'],
    ['claude-sonnet-5-5', 'Claude Sonnet 5.5 — fast & capable'],
    ['claude-haiku-5-5', 'Claude Haiku 5.5 — cheapest & fastest'],
  ];
  const cfg = { key: store.get('ai-key', ''), model: store.get('ai-model', 'claude-opus-5-5') };
  let history = []; // {role, content}

  // ---------- Context ----------
  function lessonText(L) { const d = document.createElement('div'); d.innerHTML = t(L.body); return d.textContent.replace(/\s+/g, ' ').trim().slice(0, 3500); }
  function context() {
    const parts = [];
    if (MLS.route === 'learn') {
      const L = window.COURSE.lessons.find((l) => l.id === MLS.routeArg);
      if (L) parts.push(`The learner is on the lesson "${L.title.en}". Lesson text (excerpt): ${lessonText(L)}`);
    } else if (MLS.route === 'project') {
      const P = window.COURSE.projects.find((p) => p.id === MLS.routeArg);
      if (P) parts.push(`The learner is working on the project "${P.title.en}": ${P.goal.en}`);
    } else if (MLS.route) parts.push(`The learner is on the "${MLS.route}" page.`);
    const done = window.COURSE.lessons.filter((l) => MLS.S.done[l.id]).map((l) => l.title.en);
    parts.push(`Completed lessons (${done.length}/${window.COURSE.lessons.length}): ${done.join(', ') || 'none yet'}.`);
    if (MLS.lastRun && Date.now() - MLS.lastRun.at < 30 * 60 * 1000) {
      parts.push(`Their most recent code run:\n\`\`\`python\n${MLS.lastRun.code.slice(0, 3000)}\n\`\`\`\n` + (MLS.lastRun.err ? `It failed with:\n${MLS.lastRun.err.slice(-1500)}` : `Output:\n${(MLS.lastRun.text || '').slice(0, 1200)}`));
    }
    const ds = MLS.dataSummary && MLS.dataSummary();
    if (ds) parts.push(`Their uploaded dataset (schema and statistics only):\n${ds}`);
    return parts.join('\n\n');
  }
  const SYSTEM = () => `You are the friendly AI tutor inside "ML Sikshya", a bilingual (English / Nepali) website that teaches machine learning from beginner to professional. Learners run Python in the browser with Pyodide: numpy, pandas, matplotlib, scikit-learn and scipy are available; PyTorch/TensorFlow are not. Uploaded files are at /data/<name> and loaded as DATA["<name>"] (a pandas DataFrame).

How to help:
- Reply in ${MLS.S.lang === 'ne' ? 'Nepali (Devanagari script). Keep technical terms such as "overfitting" or "DataFrame" in English where that is clearer.' : 'simple, clear English.'}
- Explain like a patient teacher: intuition or an everyday analogy first, then the exact concept, then how to use it.
- When you show code, give complete, runnable Python in \`\`\`python blocks that works with the libraries above, and keep it short.
- For errors: say what the error means, why it happened in their code, and give the corrected code.
- When a lesson on this site covers the topic, mention it by name.
- Be encouraging and concise; use short paragraphs and lists.

Current context:
${context()}`;

  // ---------- Claude call (official SDK, browser build) ----------
  let sdkP = null;
  const sdk = () => sdkP || (sdkP = import('https://esm.sh/@anthropic-ai/sdk').then((m) => m.default || m.Anthropic).catch((e) => { sdkP = null; throw e; }));

  async function askClaude(onText) {
    const Anthropic = await sdk();
    const client = new Anthropic({ apiKey: cfg.key, dangerouslyAllowBrowser: true });
    const req = { model: cfg.model, max_tokens: 16000, system: SYSTEM(), messages: history.slice(-20) };
    let stream;
    if (cfg.model === 'claude-haiku-5-5') stream = client.messages.stream(req);
    else stream = client.beta.messages.stream({ ...req, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' });
    for await (const ev of stream) {
      if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') onText(ev.delta.text);
    }
    const msg = await stream.finalMessage();
    if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refusal'), { refusal: true });
    return msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  }
  function apiErrorText(e, Anthropic) {
    if (e.refusal) return t({ en: 'Claude declined to answer this request. Try asking in a different way.', ne: 'Claude ले यो अनुरोधको उत्तर दिन अस्वीकार गर्यो। अर्को तरिकाले सोध्नुहोस्।' });
    if (Anthropic && e instanceof Anthropic.AuthenticationError) return t({ en: '🔑 Your API key was not accepted. Check it in ⚙️ settings.', ne: '🔑 तपाईंको API key स्वीकार भएन। ⚙️ सेटिङमा जाँच्नुहोस्।' });
    if (Anthropic && e instanceof Anthropic.PermissionDeniedError) return t({ en: '🔒 This key has no access to the selected model. Pick another model in ⚙️ settings.', ne: '🔒 यो key ले छानिएको मोडेल प्रयोग गर्न पाउँदैन। ⚙️ सेटिङमा अर्को मोडेल छान्नुहोस्।' });
    if (Anthropic && e instanceof Anthropic.RateLimitError) return t({ en: '⏳ Too many requests right now. Wait a moment and try again.', ne: '⏳ अहिले धेरै अनुरोध भए। केही बेर पर्खेर फेरि प्रयास गर्नुहोस्।' });
    if (Anthropic && e instanceof Anthropic.APIConnectionError) return t({ en: '📡 Could not reach Claude. Check your internet connection.', ne: '📡 Claude सम्म पुग्न सकिएन। इन्टरनेट जाँच्नुहोस्।' });
    if (Anthropic && e instanceof Anthropic.APIError) return `⚠️ ${e.status || ''} ${esc(e.message)}`;
    return `⚠️ ${esc(e.message || String(e))}`;
  }

  // ---------- Offline helper ----------
  function offlineAnswer(q) {
    const ql = q.toLowerCase();
    let html = '';
    if (MLS.lastRun && MLS.lastRun.err && /error|गल्ती|error|problem|समस्या|fix|help|मद्दत|bug/.test(ql)) {
      const d = t(diagnose(MLS.lastRun.err));
      html += `<p><b>🩺 ${u('doctorTitle')}</b></p><p><b>${u('whyErr')}:</b> ${esc(d[0])}</p><p><b>${u('fixErr')}:</b> ${esc(d[1])}</p>`;
    }
    const words = ql.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2 && !['the', 'and', 'what', 'how', 'why', 'does', 'this', 'that', 'with', 'for', 'are', 'can', 'you', 'explain', 'मलाई', 'भनेको', 'कसरी', 'किन'].includes(w));
    const gl = window.COURSE.glossary.filter((g) => words.some((w) => (g.term + ' ' + g.ne).toLowerCase().includes(w))).slice(0, 3);
    gl.forEach((g) => { html += `<p>📖 <b>${esc(g.term)}</b> (${esc(g.ne)}): ${esc(t(g.def))}</p>`; });
    const scored = window.COURSE.lessons.map((L) => {
      const txt = (L.title.en + ' ' + L.title.ne + ' ' + lessonText(L)).toLowerCase();
      return [words.reduce((a, w) => a + (txt.split(w).length - 1) + ((L.title.en + L.title.ne).toLowerCase().includes(w) ? 8 : 0), 0), L];
    }).filter((x) => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 3);
    if (/next|अब|अर्को|roadmap/.test(ql)) {
      const nl = window.COURSE.lessons.find((l) => !MLS.S.done[l.id]);
      if (nl) html += `<p>🧭 ${t({ en: 'Your next lesson', ne: 'तपाईंको अर्को पाठ' })}: <a href="#/learn/${nl.id}">${esc(t(nl.title))}</a></p>`;
    }
    if (scored.length) html += `<p><b>📚 ${u('relLessons')}:</b></p><ul>${scored.map(([, L]) => `<li><a href="#/learn/${L.id}">${esc(t(L.title))}</a></li>`).join('')}</ul>`;
    if (/data|डाटा|dataset|csv/.test(ql) && MLS.datalab && MLS.datalab.profile) html += `<p>📊 ${t({ en: 'Open 📊 Data Lab — the "Smart suggestions" box lists what to fix in your data, with one-click code.', ne: '📊 डाटा ल्याब खोल्नुहोस् — "स्मार्ट सुझाव" मा डाटामा के सच्याउने भन्ने सूची र एक-क्लिक कोड छ।' })}</p>`;
    if (!html) html = `<p>${u('noMatch')}</p>`;
    return html + `<p class="muted small">${u('offlineNote')}</p>`;
  }

  // ---------- Markdown-lite rendering (code blocks become runnable editors) ----------
  function render(md, into) {
    into.innerHTML = '';
    const parts = md.split(/```(\w*)\n?([\s\S]*?)(?:```|$)/g);
    for (let i = 0; i < parts.length; i += 3) {
      const text = parts[i];
      if (text && text.trim()) {
        const div = document.createElement('div');
        div.innerHTML = esc(text)
          .replace(/`([^`\n]+)`/g, '<code>$1</code>')
          .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
          .replace(/^#{1,4} (.+)$/gm, '<b class="md-h">$1</b>')
          .replace(/^\s*[-*] (.+)$/gm, '• $1')
          .replace(/\n/g, '<br>');
        into.appendChild(div);
      }
      if (i + 2 < parts.length && parts[i + 2] !== undefined) {
        const lang = parts[i + 1], code = parts[i + 2];
        if (!lang || /^py/i.test(lang)) into.appendChild(MLS.codeBlock(code, 'tutor_example.py'));
        else into.appendChild(h(`<pre class="md-pre">${esc(code)}</pre>`));
      }
    }
  }

  // ---------- Panel UI ----------
  let panel = null, fab = null;
  function build() {
    fab = h(`<button class="tutor-fab" title="AI Tutor"><span class="fab-ic">🤖</span><span class="fab-tx"></span></button>`);
    panel = h(`<div class="tutor" hidden>
      <div class="tutor-head"><span class="tutor-av">🤖</span><div class="tutor-tt"><b class="tt"></b><span class="mode"></span></div>
        <button class="ic new" title="New chat">🗒️</button><button class="ic set" title="Settings">⚙️</button><button class="ic close" title="Close">✕</button></div>
      <div class="tutor-settings" hidden></div>
      <div class="tutor-msgs"></div>
      <div class="tutor-chips"></div>
      <form class="tutor-form"><textarea rows="2"></textarea><button class="send" type="submit">➤</button></form>
    </div>`);
    document.body.append(fab, panel);
    fab.onclick = () => (panel.hidden ? openTutor() : close());
    panel.querySelector('.close').onclick = close;
    panel.querySelector('.set').onclick = () => { const s = panel.querySelector('.tutor-settings'); s.hidden = !s.hidden; drawSettings(); };
    panel.querySelector('.new').onclick = () => { history = []; drawMsgs(); };
    const ta = panel.querySelector('textarea');
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(ta.value); } });
    panel.querySelector('form').onsubmit = (e) => { e.preventDefault(); send(ta.value); };
    refresh();
  }
  function refresh() {
    if (!fab) return;
    fab.querySelector('.fab-tx').textContent = u('tutor');
    panel.querySelector('.tt').textContent = u('tutor');
    panel.querySelector('.mode').innerHTML = cfg.key ? `<i class="dot on"></i>${u('tutorOnline')}` : `<i class="dot"></i>${u('tutorOffline')}`;
    panel.querySelector('textarea').placeholder = u('tutorPh');
    const chips = [['chipExplain', MLS.route === 'learn'], ['chipError', !!(MLS.lastRun && MLS.lastRun.err)], ['chipData', !!(MLS.datalab && MLS.datalab.profile)], ['chipPractice', true], ['chipNext', true]].filter((c) => c[1]);
    const ch = panel.querySelector('.tutor-chips');
    ch.innerHTML = chips.map(([k]) => `<button data-k="${k}">${u(k)}</button>`).join('');
    ch.querySelectorAll('button').forEach((b) => (b.onclick = () => send(u(b.dataset.k).replace(/^\S+\s/, ''))));
    if (!history.length) drawMsgs();
  }
  function drawSettings() {
    const s = panel.querySelector('.tutor-settings');
    s.innerHTML = `<b>🔑 ${u('tutorSettings')}</b><p class="small">${u('tutorKeyHelp')}</p>
      <input type="password" class="key" placeholder="sk-ant-..." autocomplete="off" value="${esc(cfg.key)}">
      <label class="small">${u('tutorModel')} <select class="model">${MODELS.map(([id, n]) => `<option value="${id}" ${id === cfg.model ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <div class="row"><button class="btn sm save">${u('tutorSave')}</button>${cfg.key ? `<button class="btn ghost sm forget">${u('tutorForget')}</button>` : ''}</div>`;
    s.querySelector('.save').onclick = () => { cfg.key = s.querySelector('.key').value.trim(); cfg.model = s.querySelector('.model').value; store.set('ai-key', cfg.key); store.set('ai-model', cfg.model); s.hidden = true; refresh(); toast('✓'); };
    const f = s.querySelector('.forget'); if (f) f.onclick = () => { cfg.key = ''; store.set('ai-key', ''); s.hidden = true; refresh(); };
  }
  function bubble(role, html) {
    const b = h(`<div class="msg ${role}"><div class="bub"></div></div>`);
    if (html instanceof Node) b.firstChild.appendChild(html); else b.firstChild.innerHTML = html;
    panel.querySelector('.tutor-msgs').appendChild(b);
    return b.firstChild;
  }
  function drawMsgs() {
    const box = panel.querySelector('.tutor-msgs'); box.innerHTML = '';
    bubble('bot', esc(u('tutorHi')));
    history.forEach((m) => { if (m.role === 'user') bubble('user', esc(m.content).replace(/\n/g, '<br>')); else render(m.content, bubble('bot', '')); });
    box.scrollTop = box.scrollHeight;
  }
  let busy = false;
  async function send(text) {
    text = (text || '').trim(); if (!text || busy) return;
    const ta = panel.querySelector('textarea'); ta.value = '';
    bubble('user', esc(text).replace(/\n/g, '<br>'));
    const box = panel.querySelector('.tutor-msgs');
    const out = bubble('bot', `<span class="typing">${u('thinking')}</span>`);
    box.scrollTop = box.scrollHeight;
    if (!cfg.key) { out.innerHTML = offlineAnswer(text); box.scrollTop = box.scrollHeight; return; }
    busy = true;
    history.push({ role: 'user', content: text });
    let acc = '', Anthropic = null;
    try {
      Anthropic = await sdk();
      const full = await askClaude((d) => { acc += d; out.innerHTML = esc(acc).replace(/\n/g, '<br>'); box.scrollTop = box.scrollHeight; });
      history.push({ role: 'assistant', content: full });
      render(full, out);
    } catch (e) {
      console.error(e);
      history.pop();
      out.innerHTML = `<p>${apiErrorText(e, Anthropic)}</p>` + offlineAnswer(text);
    }
    busy = false;
    box.scrollTop = box.scrollHeight;
  }
  function openTutor(prefill) {
    if (!panel) build();
    panel.hidden = false; fab.classList.add('open'); refresh();
    if (prefill) send(prefill); else panel.querySelector('textarea').focus();
  }
  function close() { panel.hidden = true; fab.classList.remove('open'); }
  MLS.openTutor = openTutor;

  // Keep the button text in the current language and chips up to date after every page change.
  MLS.hooks.beforeRender.push(() => setTimeout(refresh));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

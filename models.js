/* ML Sikshya — Model Playground: try real, ready-made ML models right in the browser.
   Models run on the learner's own device with Transformers.js (free, no account, no key, nothing is uploaded).
   Each model downloads once when the learner presses "Try it", then the browser keeps it cached. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast } = MLS;
  const T = (en, ne, zh) => ({ en, ne, zh });
  const TF_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2';
  const SAMPLES = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/';

  Object.assign(MLS.UI, {
    models: T('AI Models', 'AI मोडेल', 'AI 模型'),
    mpTitle: T('🤖 Model Playground', '🤖 मोडेल खेल मैदान', '🤖 模型游乐场'),
    mpIntro: T('Try real machine-learning models — the same kind used in phones, apps and research. Everything runs inside your own browser: no account, no key, and your photos, voice and text never leave your device.',
      'वास्तविक मेसिन लर्निङ मोडेल चलाएर हेर्नुहोस् — फोन, एप र अनुसन्धानमा प्रयोग हुने उस्तै मोडेल। सबै कुरा तपाईंकै ब्राउजरभित्र चल्छ: खाता चाहिँदैन, key चाहिँदैन, र तपाईंको फोटो, आवाज र लेख कतै पठाइँदैन।',
      '试一试真正的机器学习模型——和手机、应用、科研中使用的同一类模型。一切都在你自己的浏览器里运行：无需账户、无需密钥，你的照片、声音和文字都不会离开你的设备。'),
    mpHow: T('How it works: press <b>▶ Try it</b>. The first time, the model downloads once (size shown on each card), then it is saved in your browser and starts instantly next time.',
      'कसरी चल्छ: <b>▶ चलाएर हेर्नुहोस्</b> थिच्नुहोस्। पहिलो पटक मोडेल एक पटक डाउनलोड हुन्छ (साइज हरेक कार्डमा छ), त्यसपछि ब्राउजरमा सुरक्षित हुन्छ र अर्को पटक तुरुन्तै चल्छ।',
      '使用方法：点击 <b>▶ 试一试</b>。第一次会下载一次模型（每张卡片上都标明了大小），之后保存在浏览器中，下次立即启动。'),
    mpData: T('📶 On mobile data? Start with the small ones (marked 🟢).', '📶 मोबाइल डाटा प्रयोग गर्दै हुनुहुन्छ? साना मोडेलबाट सुरु गर्नुहोस् (🟢 चिन्ह भएका)।', '📶 使用移动数据？先从小模型开始（标有 🟢）。'),
    mpTry: T('▶ Try it', '▶ चलाएर हेर्नुहोस्', '▶ 试一试'),
    mpFirst: T('first time downloads', 'पहिलो पटक डाउनलोड', '首次下载'),
    mpLoading: T('Downloading the model…', 'मोडेल डाउनलोड हुँदैछ…', '正在下载模型…'),
    mpPreparing: T('Starting the model…', 'मोडेल सुरु हुँदैछ…', '正在启动模型…'),
    mpThinking: T('The model is thinking…', 'मोडेलले सोच्दैछ…', '模型正在思考…'),
    mpReady: T('✓ Ready — saved in your browser', '✓ तयार — ब्राउजरमा सुरक्षित', '✓ 已就绪——已保存在浏览器中'),
    mpFail: T('Could not load the model. Check your internet connection and try again.', 'मोडेल लोड हुन सकेन। इन्टरनेट जाँचेर फेरि प्रयास गर्नुहोस्।', '无法加载模型。请检查网络后重试。'),
    mpRunFail: T('Something went wrong while running the model', 'मोडेल चलाउँदा समस्या आयो', '运行模型时出错'),
    mpOnDevice: T('🔒 runs on your device', '🔒 तपाईंकै उपकरणमा चल्छ', '🔒 在你的设备上运行'),
    mpNoDownload: T('no download', 'डाउनलोड चाहिँदैन', '无需下载'),
    mpInside: T('🔍 What happened inside the model?', '🔍 मोडेलभित्र के भयो?', '🔍 模型内部发生了什么？'),
    mpLearn: T('📘 Learn how it works', '📘 यो कसरी काम गर्छ सिक्नुहोस्', '📘 学习它的原理'),
    mpAsk: T('🤖 Ask my teacher about this', '🤖 शिक्षकलाई यसबारे सोध्नुहोस्', '🤖 问老师'),
    mpUpload: T('📁 Use my own photo', '📁 आफ्नै फोटो प्रयोग गर्ने', '📁 用我自己的照片'),
    mpSamples: T('Or pick an example:', 'वा एउटा उदाहरण छान्नुहोस्:', '或选择一个例子：'),
    mpEnglishOnly: T('This model understands English only.', 'यो मोडेलले अङ्ग्रेजी मात्र बुझ्छ।', '这个模型只懂英文。'),
    mpTryTitle: T('🤖 Try a real model', '🤖 वास्तविक मोडेल चलाएर हेर्नुहोस्', '🤖 试一试真实模型'),
    mpTrySub: T('See this idea working in a real, ready-made model — right in your browser:', 'यही विचार वास्तविक, तयार मोडेलमा काम गरेको हेर्नुहोस् — तपाईंकै ब्राउजरमा:', '在真实的现成模型中看到这个概念如何工作——就在你的浏览器里：'),
    mpConfidence: T('How sure the model is', 'मोडेल कति पक्का छ', '模型有多确定'),
  });

  // ---------- Transformers.js, loaded only when a learner first presses "Try it" ----------
  let tfP = null;
  const getTF = () => (tfP ||= import(TF_URL).then((m) => { m.env.allowLocalModels = false; return m; }).catch((e) => { tfP = null; throw e; }));
  const pipes = {};
  function loadPipe(M, onProgress) {
    if (pipes[M.id]) return pipes[M.id];
    const files = {};
    pipes[M.id] = getTF().then((TF) => TF.pipeline(M.task, M.model, {
      dtype: M.dtype, device: 'wasm',
      progress_callback: (p) => {
        if (p.status === 'progress' && p.file) {
          files[p.file] = [p.loaded || 0, p.total || 0];
          const v = Object.values(files), got = v.reduce((s, x) => s + x[0], 0), all = v.reduce((s, x) => s + x[1], 0);
          onProgress(all ? got / all : 0, got);
        } else if (p.status === 'ready') onProgress(1, -1);
      },
    })).catch((e) => { delete pipes[M.id]; throw e; });
    return pipes[M.id];
  }

  const pct = (x) => (x > 0 && x < 0.005 ? '<1%' : `${Math.round(x * 100)}%`);
  const bars = (rows) => `<div class="mp-bars">${rows.map(([label, score, cls]) => `<div class="mp-bar ${cls || ''}"><span class="lbl">${esc(label)}</span><span class="track"><i style="width:${Math.max(2, score * 100).toFixed(1)}%"></i></span><b>${pct(score)}</b></div>`).join('')}</div>`;
  const cleanLabel = (l) => String(l).split(',')[0];

  // ---------- The models ----------
  const MODELS = [
    {
      id: 'image', icon: '🖼️', small: true, task: 'image-classification', model: 'Xenova/mobilevit-small', dtype: 'fp16', mb: 12, lesson: 'cnn',
      title: T('What is in this photo?', 'यो फोटोमा के छ?', '这张照片里有什么？'),
      what: T('An image classifier looks at a photo and guesses what it shows, out of 1,000 kinds of things (animals, food, vehicles…).', 'इमेज क्लासिफायरले फोटो हेरेर १,००० प्रकारका कुराहरूमध्ये (जनावर, खाना, सवारी…) त्यसमा के छ भनेर अनुमान गर्छ।', '图像分类器看一张照片，从 1000 类事物（动物、食物、交通工具……）中猜出它是什么。'),
      inside: [
        T('Your photo is resized to 256 × 256 pixels. Each pixel is 3 numbers (red, green, blue), so the photo becomes about 200,000 numbers.', 'तपाईंको फोटो २५६ × २५६ पिक्सेलमा बदलिन्छ। हरेक पिक्सेल ३ वटा अंक (रातो, हरियो, निलो) हो, त्यसैले फोटो करिब २,००,००० अंक बन्छ।', '你的照片被缩放成 256 × 256 像素。每个像素是 3 个数字（红、绿、蓝），所以照片变成大约 20 万个数字。'),
        T('A convolutional neural network (CNN) slides small filters over the image. Early layers find edges and colours, later layers find shapes like eyes, stripes and wheels.', 'कन्भोलुसनल न्युरल नेटवर्क (CNN) ले साना फिल्टर फोटोमाथि सार्छ। सुरुका तहले किनारा र रङ भेट्छन्, पछिका तहले आँखा, धर्सा, पाङ्ग्रा जस्ता आकार भेट्छन्।', '卷积神经网络（CNN）把小滤镜在图像上滑动。前面的层找边缘和颜色，后面的层找眼睛、条纹、轮子等形状。'),
        T('The last layer gives one score for each of the 1,000 classes. Softmax turns the scores into probabilities that add up to 100%.', 'अन्तिम तहले १,००० वर्गमध्ये हरेकको एउटा अंक दिन्छ। Softmax ले ती अंकलाई जम्मा १००% हुने सम्भावनामा बदल्छ।', '最后一层为 1000 个类别各给出一个分数。Softmax 把分数变成加起来等于 100% 的概率。'),
        T('We show the 5 classes with the highest probability. The model was trained on about 1.2 million labelled photos (ImageNet).', 'सबैभन्दा बढी सम्भावना भएका ५ वर्ग देखाइन्छ। यो मोडेल करिब १२ लाख लेबल भएका फोटो (ImageNet) मा तालिम गरिएको हो।', '我们显示概率最高的 5 个类别。这个模型用大约 120 万张带标签的照片（ImageNet）训练。'),
      ],
      ui: 'image', samples: [['🐯', 'tiger.jpg'], ['🦋', 'butterfly.jpg'], ['🐱', 'cats.jpg'], ['✈️', 'airport.jpg']],
      async run(pipe, card) {
        const r = await pipe(card.img, { top_k: 5 });
        card.summary = r.map((x) => `${cleanLabel(x.label)} ${pct(x.score)}`).join(', ');
        return `<b>${u('mpConfidence')}:</b>${bars(r.map((x, i) => [cleanLabel(x.label), x.score, i ? '' : 'top']))}`;
      },
    },
    {
      id: 'sentiment', icon: '😊', task: 'sentiment-analysis', model: 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', dtype: 'q8', mb: 67, lesson: 'transformers', englishOnly: true,
      title: T('Happy or unhappy? (sentiment)', 'खुसी कि दुःखी? (भावना पहिचान)', '开心还是不开心？（情感分析）'),
      what: T('A text classifier reads a sentence and decides if the feeling is positive or negative — the way companies read thousands of reviews.', 'टेक्स्ट क्लासिफायरले वाक्य पढेर भावना सकारात्मक हो कि नकारात्मक भनेर छुट्याउँछ — कम्पनीहरूले हजारौँ रिभ्यु यसरी नै पढ्छन्।', '文本分类器读一句话，判断情感是正面还是负面——公司就是这样阅读成千上万条评论的。'),
      inside: [
        T('Your sentence is cut into tokens (word pieces), e.g. "learning" → "learn" + "##ing". Each token becomes an ID number.', 'तपाईंको वाक्य token (शब्दका टुक्रा) मा काटिन्छ, जस्तै "learning" → "learn" + "##ing"। हरेक token एउटा ID अंक बन्छ।', '你的句子被切成 token（词片），例如 "learning" → "learn" + "##ing"。每个 token 变成一个 ID 数字。'),
        T('Each token becomes a list of 768 numbers (an embedding) that captures its meaning.', 'हरेक token ७६८ अंकको सूची (embedding) बन्छ, जसले त्यसको अर्थ समात्छ।', '每个 token 变成 768 个数字组成的列表（嵌入），表示它的含义。'),
        T('6 Transformer layers let every word "pay attention" to the other words, so "not good" is understood differently from "good".', '६ वटा Transformer तहले हरेक शब्दलाई अरू शब्दमा "ध्यान" दिन दिन्छ, त्यसैले "not good" र "good" को अर्थ फरक बुझिन्छ।', '6 层 Transformer 让每个词“关注”其他词，所以 “not good” 和 “good” 的含义被区分开来。'),
        T('A final classifier gives two scores (positive, negative), and softmax turns them into percentages.', 'अन्तिम क्लासिफायरले दुई अंक (सकारात्मक, नकारात्मक) दिन्छ, र softmax ले तिनलाई प्रतिशतमा बदल्छ।', '最后的分类器给出两个分数（正面、负面），softmax 把它们变成百分比。'),
      ],
      ui: 'text', placeholder: 'I really enjoyed this lesson, it was easy to follow!',
      examples: ['I really enjoyed this lesson, it was easy to follow!', 'The food was cold and the service was terrible.', 'The movie was not bad at all.', 'I am not sure if I like this.'],
      async run(pipe, card) {
        const text = card.text.trim(); if (!text) return '';
        let all = await pipe(text, { top_k: 2 });
        if (Array.isArray(all[0])) all = all[0];
        const list = all.map((x) => [x.label === 'POSITIVE' ? T('😊 Positive', '😊 सकारात्मक', '😊 正面') : T('☹️ Negative', '☹️ नकारात्मक', '☹️ 负面'), x.score, x.label === 'POSITIVE' ? 'pos' : 'neg']);
        card.summary = `"${text}" → ${list.map((x) => `${t(x[0])} ${pct(x[1])}`).join(', ')}`;
        return `<b>${u('mpConfidence')}:</b>${bars(list.map(([l, s, c]) => [t(l), s, c]))}`;
      },
    },
    {
      id: 'similar', icon: '🔗', task: 'feature-extraction', model: 'Xenova/all-MiniLM-L6-v2', dtype: 'q8', mb: 23, lesson: 'transformers', englishOnly: true,
      title: T('Which sentences mean the same? (embeddings)', 'कुन वाक्यको अर्थ उस्तै छ? (embeddings)', '哪些句子意思相同？（嵌入）'),
      what: T('An embedding model turns each sentence into a list of numbers. Sentences with similar meaning get similar numbers — even with different words. Search engines and ChatGPT-style apps use this.', 'Embedding मोडेलले हरेक वाक्यलाई अंकको सूचीमा बदल्छ। उस्तै अर्थ भएका वाक्यले — फरक शब्द भए पनि — उस्तै अंक पाउँछन्। सर्च इन्जिन र ChatGPT जस्ता एपले यही प्रयोग गर्छन्।', '嵌入模型把每个句子变成一串数字。意思相近的句子会得到相近的数字——即使用词不同。搜索引擎和类似 ChatGPT 的应用都用这个。'),
      inside: [
        T('Each sentence is split into tokens and passed through 6 small Transformer layers.', 'हरेक वाक्य token मा काटिन्छ र ६ वटा साना Transformer तह हुँदै जान्छ।', '每个句子被切成 token，经过 6 层小型 Transformer。'),
        T('The token outputs are averaged into ONE list of 384 numbers: the sentence\'s "meaning fingerprint".', 'token का नतिजाको औसत निकालेर ३८४ अंकको एउटै सूची बनाइन्छ: वाक्यको "अर्थको औँठाछाप"।', '把所有 token 的输出取平均，得到一个 384 个数字的列表：句子的“意义指纹”。'),
        T('Cosine similarity compares two fingerprints: 100% = same meaning, around 0% = unrelated.', 'Cosine similarity ले दुई औँठाछाप तुलना गर्छ: १००% = उही अर्थ, करिब ०% = सम्बन्ध छैन।', '余弦相似度比较两个指纹：100% = 意思相同，约 0% = 毫无关系。'),
      ],
      ui: 'similar', base: 'How do I learn machine learning?',
      compare: ['What is the best way to study ML?', 'Teach me artificial intelligence step by step', 'The weather in Kathmandu is cold today'],
      async run(pipe, card) {
        const all = [card.base, ...card.compare].map((s) => s.trim());
        if (!all[0] || all.slice(1).every((s) => !s)) return '';
        const e = (await pipe(all.map((s) => s || ' '), { pooling: 'mean', normalize: true })).tolist();
        const rows = all.slice(1).map((s, i) => [s || '—', s ? Math.max(0, e[0].reduce((a, v, k) => a + v * e[i + 1][k], 0)) : 0]).filter((r) => r[0] !== '—');
        rows.sort((a, b) => b[1] - a[1]);
        card.summary = `"${all[0]}" vs ` + rows.map(([s, v]) => `"${s}" ${pct(v)}`).join(', ');
        return `<b>${t(T('Similarity to your first sentence', 'पहिलो वाक्यसँग कति मिल्छ', '与第一句的相似度'))}:</b>${bars(rows.map(([s, v], i) => [s, v, i ? '' : 'top']))}`;
      },
    },
    {
      id: 'detect', icon: '📦', task: 'object-detection', model: 'Xenova/detr-resnet-50', dtype: 'q8', mb: 43, lesson: 'cnn',
      title: T('Find every object (object detection)', 'हरेक वस्तु खोज्नुहोस् (object detection)', '找出所有物体（目标检测）'),
      what: T('Object detection finds WHERE things are, not just what they are, and draws a box around each one. Self-driving cars and traffic cameras use this.', 'Object detection ले कुरा के हो मात्र होइन, कहाँ छ भनेर पनि पत्ता लगाउँछ र हरेकको वरिपरि बाकस कोर्छ। स्वचालित कार र ट्राफिक क्यामेराले यही प्रयोग गर्छन्।', '目标检测不仅找出是什么，还找出在哪里，并在每个物体周围画框。自动驾驶汽车和交通摄像头都用它。'),
      inside: [
        T('A CNN (ResNet-50) turns the photo into a grid of feature numbers.', 'CNN (ResNet-50) ले फोटोलाई feature अंकको जालोमा बदल्छ।', 'CNN（ResNet-50）把照片变成一个特征数字网格。'),
        T('A Transformer looks at the whole grid at once and makes 100 "guesses", each with a box and a label.', 'Transformer ले पूरै जालो एकैपटक हेर्छ र १०० वटा "अनुमान" बनाउँछ, हरेकमा एउटा बाकस र लेबल हुन्छ।', 'Transformer 一次看整个网格，做出 100 个“猜测”，每个包含一个框和一个标签。'),
        T('Guesses below the confidence slider are thrown away. The rest are drawn on your photo.', 'Confidence स्लाइडरभन्दा कम भएका अनुमान फालिन्छन्। बाँकी तपाईंको फोटोमा कोरिन्छन्।', '低于置信度滑块的猜测被丢弃，其余的画在你的照片上。'),
      ],
      ui: 'image', samples: [['🐱', 'cats.jpg'], ['🏙️', 'city-streets.jpg'], ['⚽', 'football-match.jpg'], ['✈️', 'airport.jpg']], threshold: true,
      async run(pipe, card) {
        const th = card.threshold || 0.9;
        const r = await pipe(card.img, { threshold: th });
        drawBoxes(card, r);
        const counts = {};
        r.forEach((x) => (counts[x.label] = (counts[x.label] || 0) + 1));
        card.summary = Object.entries(counts).map(([k, v]) => `${v} × ${k}`).join(', ') || 'nothing';
        return r.length ? `<b>${t(T('Found', 'भेटियो', '找到'))}:</b> ${Object.entries(counts).map(([k, v]) => `<span class="pill">${v} × ${esc(k)}</span>`).join(' ')}`
          : `<span class="muted">${t(T('Nothing found above this confidence. Move the slider left.', 'यो confidence भन्दा माथि केही भेटिएन। स्लाइडर बायाँ सार्नुहोस्।', '在这个置信度以上没有找到物体。把滑块往左移。'))}</span>`;
      },
    },
    {
      id: 'speech', icon: '🎙️', task: 'automatic-speech-recognition', model: 'Xenova/whisper-tiny', dtype: { encoder_model: 'fp32', decoder_model_merged: 'q8' }, mb: 64, lesson: 'transformers',
      title: T('Speech to text (Whisper)', 'आवाजबाट अक्षर (Whisper)', '语音转文字（Whisper）'),
      what: T('A speech-recognition model listens to audio and writes down the words. Voice typing and video subtitles work like this.', 'Speech-recognition मोडेलले आवाज सुनेर शब्द लेख्छ। भ्वाइस टाइपिङ र भिडियो सबटाइटल यसरी नै काम गर्छन्।', '语音识别模型听音频并写下文字。语音输入和视频字幕就是这样工作的。'),
      inside: [
        T('Your voice is recorded as 16,000 numbers per second (the loudness of the sound wave).', 'तपाईंको आवाज प्रति सेकेन्ड १६,००० अंक (ध्वनि तरंगको चर्कोपन) को रूपमा रेकर्ड हुन्छ।', '你的声音被录成每秒 16000 个数字（声波的响度）。'),
        T('The sound is turned into a spectrogram: a picture of which pitches are loud at each moment.', 'आवाजलाई spectrogram मा बदलिन्छ: हरेक क्षणमा कुन स्वर चर्को छ भन्ने चित्र।', '声音被转换成频谱图：一张显示每个时刻哪些音高响亮的图。'),
        T('An encoder Transformer reads the picture; a decoder Transformer writes the text one token at a time, like a very fast typist.', 'Encoder Transformer ले चित्र पढ्छ; decoder Transformer ले एकपटकमा एउटा token गरी अक्षर लेख्छ, धेरै छिटो टाइप गर्ने मान्छे जस्तै।', '编码器 Transformer 读这张图；解码器 Transformer 一次写一个 token，就像一个打字非常快的人。'),
        T('Whisper was trained on 680,000 hours of speech in about 100 languages. This "tiny" version is small, so it makes more mistakes, especially in Nepali.', 'Whisper लगभग १०० भाषाको ६,८०,००० घण्टाको आवाजमा तालिम गरिएको हो। यो "tiny" संस्करण सानो भएकाले, विशेष गरी नेपालीमा, बढी गल्ती गर्छ।', 'Whisper 用约 100 种语言、68 万小时的语音训练。这个 “tiny” 版本很小，所以错误较多，尤其是尼泊尔语。'),
      ],
      ui: 'speech',
      async run(pipe, card) {
        if (!card.audio) return '';
        const lang = { en: 'english', ne: 'nepali', zh: 'chinese' }[card.lang] || 'english';
        const r = await pipe(card.audio, { language: lang, task: 'transcribe' });
        const text = (r && r.text || '').trim();
        card.summary = `"${text}"`;
        return `<div class="mp-transcript">${text ? esc(text) : `<span class="muted">${t(T('(no words heard — try speaking louder)', '(कुनै शब्द सुनिएन — अलि ठूलो स्वरमा बोल्नुहोस्)', '（没有听到文字——请大声一点）'))}</span>`}</div>`;
      },
    },
    {
      id: 'teach', icon: '🎯', small: true, local: true, lesson: 'knn',
      title: T('Train your own model (k-nearest neighbours)', 'आफ्नै मोडेल तालिम गर्नुहोस् (k-nearest neighbours)', '训练你自己的模型（k 近邻）'),
      what: T('Click to add 🔵 and 🔴 examples. The model learns instantly and colours the whole map with its predictions. Move the k slider and watch the borders change.', '🔵 र 🔴 उदाहरण थप्न क्लिक गर्नुहोस्। मोडेलले तुरुन्तै सिक्छ र पूरै नक्सालाई आफ्नो अनुमानले रङ्ग्याउँछ। k स्लाइडर सारेर सीमाना बदलिएको हेर्नुहोस्।', '点击添加 🔵 和 🔴 示例。模型立即学习，并用它的预测给整张地图上色。移动 k 滑块，看看边界如何变化。'),
      inside: [
        T('Training = simply remembering every point you added (that is all KNN does!).', 'तालिम = तपाईंले थपेका सबै बिन्दु सम्झनु (KNN ले गर्ने यति नै हो!)।', '训练 = 记住你添加的每一个点（KNN 做的就只有这些！）。'),
        T('To predict a spot on the map, it measures the distance to every remembered point and takes the k closest ones.', 'नक्साको कुनै ठाउँको अनुमान गर्न, यसले सम्झेका हरेक बिन्दुसम्मको दूरी नाप्छ र सबैभन्दा नजिकका k वटा लिन्छ।', '要预测地图上的某个位置，它测量到每个已记住点的距离，取最近的 k 个。'),
        T('Those k neighbours vote. The colour with the most votes wins. Lighter colour = a closer vote (the model is less sure).', 'ती k छिमेकीले भोट दिन्छन्। सबैभन्दा बढी भोट पाउने रङ जित्छ। हल्का रङ = भोट नजिक (मोडेल कम पक्का)।', '这 k 个邻居投票，得票最多的颜色获胜。颜色越浅 = 票数越接近（模型越不确定）。'),
        T('Small k follows every point closely (can overfit). Big k gives smoother borders (can underfit).', 'सानो k ले हरेक बिन्दुलाई नजिकबाट पछ्याउँछ (overfit हुन सक्छ)। ठूलो k ले चिल्लो सीमाना दिन्छ (underfit हुन सक्छ)।', 'k 小会紧贴每个点（可能过拟合）。k 大边界更平滑（可能欠拟合）。'),
      ],
      ui: 'teach',
    },
  ];

  // ---------- Drawing helpers ----------
  function drawBoxes(card, boxes) {
    const cv = card.el.querySelector('.mp-canvas'), img = card.el.querySelector('.mp-preview');
    if (!cv || !img.naturalWidth) return;
    cv.width = img.naturalWidth; cv.height = img.naturalHeight;
    const g = cv.getContext('2d');
    g.drawImage(img, 0, 0);
    const lw = Math.max(2, cv.width / 220), fs = Math.max(12, cv.width / 38);
    const colors = ['#4f46e5', '#e11d48', '#12a67a', '#d97706', '#0891b2', '#7c3aed', '#db2777'];
    const byLabel = {};
    boxes.forEach((b) => {
      const c = colors[(byLabel[b.label] ??= Object.keys(byLabel).length) % colors.length];
      const { xmin, ymin, xmax, ymax } = b.box;
      g.strokeStyle = c; g.lineWidth = lw; g.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);
      const txt = `${b.label} ${pct(b.score)}`;
      g.font = `600 ${fs}px Inter, sans-serif`;
      const w = g.measureText(txt).width + fs * 0.6;
      g.fillStyle = c; g.fillRect(xmin, Math.max(0, ymin - fs * 1.4), w, fs * 1.4);
      g.fillStyle = '#fff'; g.fillText(txt, xmin + fs * 0.3, Math.max(fs, ymin - fs * 0.35));
    });
    cv.hidden = false; img.hidden = true;
  }

  // ---------- Card UI ----------
  function inputsHTML(M) {
    if (M.ui === 'image') return `
      <div class="mp-img-wrap"><img class="mp-preview" alt="" crossorigin="anonymous"><canvas class="mp-canvas" hidden></canvas></div>
      <div class="mp-row"><span class="small muted">${u('mpSamples')}</span>${M.samples.map(([ic, f]) => `<button class="btn ghost sm mp-sample" data-f="${f}">${ic}</button>`).join('')}
        <label class="btn ghost sm mp-file">${u('mpUpload')}<input type="file" accept="image/*" hidden></label></div>
      ${M.threshold ? `<label class="small mp-row">${t(T('Confidence', 'Confidence (पक्का)', '置信度'))} <input type="range" class="mp-th" min="0.5" max="0.99" step="0.01" value="0.9"> <b class="mp-thv">90%</b></label>` : ''}`;
    if (M.ui === 'text') return `
      <textarea class="mp-text" rows="2">${esc(M.placeholder)}</textarea>
      <div class="mp-row">${M.examples.map((x) => `<button class="chip mp-ex">${esc(x)}</button>`).join('')}</div>`;
    if (M.ui === 'similar') return `
      <label class="small"><span>${t(T('Your sentence', 'तपाईंको वाक्य', '你的句子'))}</span><input class="mp-base" value="${esc(M.base)}"></label>
      <div class="small muted">${t(T('Compare it with:', 'यीसँग तुलना गर्नुहोस्:', '与这些比较：'))}</div>
      ${M.compare.map((x, i) => `<input class="mp-cmp" data-i="${i}" value="${esc(x)}">`).join('')}`;
    if (M.ui === 'speech') return `
      <div class="mp-row"><button class="btn sm mp-rec">🎙️ ${t(T('Record (up to 10 s)', 'रेकर्ड (१० सेकेन्डसम्म)', '录音（最多 10 秒）'))}</button>
        <button class="btn ghost sm mp-sample-audio">🔊 ${t(T('Use a famous speech', 'प्रसिद्ध भाषण प्रयोग गर्ने', '使用一段著名演讲'))}</button>
        <label class="small">${t(T('Language', 'भाषा', '语言'))} <select class="mp-lang"><option value="en">English</option><option value="ne">नेपाली</option><option value="zh">中文</option></select></label></div>
      <audio class="mp-audio" controls hidden></audio>`;
    if (M.ui === 'teach') return `
      <div class="mp-teach"><canvas class="mp-board" width="480" height="300"></canvas></div>
      <div class="mp-row">
        <span class="seg mp-cls"><button data-c="0" class="on">🔵 ${t(T('Blue', 'निलो', '蓝'))}</button><button data-c="1">🔴 ${t(T('Red', 'रातो', '红'))}</button></span>
        <label class="small">k = <b class="mp-kv">3</b> <input type="range" class="mp-k" min="1" max="15" step="1" value="3"></label>
        <button class="btn ghost sm mp-rand">🎲 ${t(T('Random data', 'अनियमित डाटा', '随机数据'))}</button>
        <button class="btn ghost sm mp-clear">🧹 ${t(T('Clear', 'सफा', '清空'))}</button></div>
      <div class="small muted mp-teach-info"></div>`;
    return '';
  }

  function cardHTML(M) {
    const L = (window.COURSE.lessons || []).find((l) => l.id === M.lesson);
    const size = M.local ? u('mpNoDownload') : `~${M.mb} MB`;
    return `<div class="card mp-card" id="mp-${M.id}">
      <div class="mp-head"><span class="mp-ic">${M.icon}</span><div><h3>${t(M.title)}</h3><p class="muted">${t(M.what)}</p></div></div>
      <div class="mp-meta">${M.local ? '' : `<span class="pill">🧠 ${esc(M.model.split('/').pop())}</span>`}<span class="pill">${M.small || M.local ? '🟢' : '🟡'} ${size}</span><span class="pill">${u('mpOnDevice')}</span>${M.englishOnly ? `<span class="pill">🇬🇧 ${u('mpEnglishOnly')}</span>` : ''}</div>
      <div class="mp-inputs">${inputsHTML(M)}</div>
      ${M.local ? '' : `<div class="mp-go-row"><button class="btn mp-go">${u('mpTry')}</button><small class="muted mp-size">${pipesReady[M.id] ? u('mpReady') : `(${u('mpFirst')} ~${M.mb} MB)`}</small></div>
      <div class="mp-prog" hidden><span></span></div>`}
      <div class="mp-out" aria-live="polite"></div>
      <details class="mp-inside"><summary>${u('mpInside')}</summary><ol>${M.inside.map((s) => `<li>${t(s)}</li>`).join('')}</ol></details>
      <div class="mp-links">${L ? `<a class="btn ghost sm" href="#/learn/${L.id}">${u('mpLearn')}: ${esc(t(L.title))}</a>` : ''}<button class="btn ghost sm mp-ask">${u('mpAsk')}</button></div>
    </div>`;
  }
  const pipesReady = {};

  function wire(M, el) {
    const card = { el, text: M.placeholder || '', base: M.base, compare: (M.compare || []).slice(), threshold: 0.9, lang: MLS.S.lang };
    const out = el.querySelector('.mp-out'), go = el.querySelector('.mp-go'), prog = el.querySelector('.mp-prog'), sizeEl = el.querySelector('.mp-size');
    let running = false;

    async function run() {
      if (running || M.local) return;
      running = true; if (go) go.disabled = true;
      try {
        if (!pipes[M.id] && prog) { prog.hidden = false; sizeEl.textContent = u('mpLoading'); }
        const pipe = await loadPipe(M, (f, got) => {
          prog.querySelector('span').style.width = pct(f);
          sizeEl.textContent = got < 0 ? u('mpPreparing') : `${u('mpLoading')} ${Math.round(got / 1e6)} / ~${M.mb} MB`;
        });
        pipesReady[M.id] = true; prog.hidden = true; sizeEl.textContent = u('mpReady');
        if (M.ui === 'image' && !card.img) await setImage(SAMPLES + M.samples[0][1]);
        out.innerHTML = `<span class="muted">⏳ ${u('mpThinking')}</span>`;
        const t0 = performance.now();
        const html = await M.run(pipe, card);
        out.innerHTML = html ? `${html}<div class="small muted mp-time">⏱ ${((performance.now() - t0) / 1000).toFixed(1)} s</div>` : '';
      } catch (e) {
        console.error('Model playground:', e);
        if (prog) prog.hidden = true;
        if (!pipesReady[M.id]) { sizeEl.textContent = `(${u('mpFirst')} ~${M.mb} MB)`; out.innerHTML = `<p class="mp-err">⚠️ ${u('mpFail')}</p>`; }
        else out.innerHTML = `<p class="mp-err">⚠️ ${u('mpRunFail')}: <small>${esc(String(e && e.message || e).slice(0, 160))}</small></p>`;
      } finally { running = false; if (go) go.disabled = false; }
    }
    if (go) go.onclick = run;

    // image inputs
    const img = el.querySelector('.mp-preview'), cv = el.querySelector('.mp-canvas');
    function setImage(src) {
      return new Promise((res) => {
        card.img = src; img.hidden = false; if (cv) cv.hidden = true;
        img.onload = img.onerror = () => res();
        img.src = src;
      });
    }
    if (img) {
      setImage(SAMPLES + M.samples[0][1]);
      el.querySelectorAll('.mp-sample').forEach((b) => (b.onclick = async () => { await setImage(SAMPLES + b.dataset.f); out.innerHTML = ''; if (pipesReady[M.id]) run(); }));
      el.querySelector('.mp-file input').onchange = async (e) => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        await setImage(URL.createObjectURL(f)); out.innerHTML = ''; run();
      };
      const th = el.querySelector('.mp-th');
      if (th) th.oninput = () => { card.threshold = +th.value; el.querySelector('.mp-thv').textContent = pct(card.threshold); };
      if (th) th.onchange = () => { if (pipesReady[M.id]) run(); };
    }
    // text inputs
    const ta = el.querySelector('.mp-text');
    if (ta) {
      ta.oninput = () => (card.text = ta.value);
      ta.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); run(); } };
      el.querySelectorAll('.mp-ex').forEach((b) => (b.onclick = () => { ta.value = card.text = b.textContent; run(); }));
    }
    const base = el.querySelector('.mp-base');
    if (base) {
      base.oninput = () => (card.base = base.value);
      el.querySelectorAll('.mp-cmp').forEach((x) => (x.oninput = () => (card.compare[+x.dataset.i] = x.value)));
      el.querySelectorAll('.mp-base, .mp-cmp').forEach((x) => (x.onkeydown = (e) => { if (e.key === 'Enter') run(); }));
    }
    // speech
    if (M.ui === 'speech') {
      const rec = el.querySelector('.mp-rec'), player = el.querySelector('.mp-audio'), langSel = el.querySelector('.mp-lang');
      langSel.value = card.lang in { en: 1, ne: 1, zh: 1 } ? card.lang : 'en';
      langSel.onchange = () => (card.lang = langSel.value);
      const useBlob = async (blob) => {
        player.src = URL.createObjectURL(blob); player.hidden = false;
        const ctx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        try { card.audio = (await ctx.decodeAudioData(await blob.arrayBuffer())).getChannelData(0); } finally { ctx.close(); }
        run();
      };
      el.querySelector('.mp-sample-audio').onclick = async () => {
        out.innerHTML = `<span class="muted">⏳</span>`;
        try { langSel.value = card.lang = 'en'; await useBlob(await (await fetch(SAMPLES + 'jfk.wav')).blob()); } catch { out.innerHTML = `<p class="mp-err">⚠️ ${u('mpFail')}</p>`; }
      };
      let mr = null, stopTimer = null;
      rec.onclick = async () => {
        if (mr && mr.state === 'recording') { mr.stop(); return; }
        let stream;
        try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch { toast(t(T('Please allow the microphone to record.', 'रेकर्ड गर्न माइक्रोफोन अनुमति दिनुहोस्।', '请允许使用麦克风来录音。'))); return; }
        const chunks = [];
        mr = new MediaRecorder(stream);
        mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
        mr.onstop = () => {
          clearTimeout(stopTimer); stream.getTracks().forEach((tr) => tr.stop());
          rec.classList.remove('rec-on'); rec.textContent = `🎙️ ${t(T('Record again', 'फेरि रेकर्ड', '再录一次'))}`;
          useBlob(new Blob(chunks, { type: mr.mimeType })).catch((e) => { out.innerHTML = `<p class="mp-err">⚠️ ${esc(String(e.message || e))}</p>`; });
        };
        mr.start(); rec.classList.add('rec-on'); rec.textContent = `⏹ ${t(T('Stop', 'रोक्नुहोस्', '停止'))}`;
        stopTimer = setTimeout(() => mr.state === 'recording' && mr.stop(), 10000);
      };
      if (go) go.onclick = () => (card.audio ? run() : rec.click());
    }
    if (M.ui === 'teach') teach(card, el);
    // ask the AI teacher
    el.querySelector('.mp-ask').onclick = () => {
      const what = t(M.title);
      const res = card.summary ? t(T(` The result I got: ${card.summary}.`, ` मैले पाएको नतिजा: ${card.summary}।`, ` 我得到的结果：${card.summary}。`)) : '';
      MLS.openTutor && MLS.openTutor(t(T(
        `I am trying the "${what}" model in the Model Playground (${M.model || 'k-nearest neighbours'}).${res} Explain simply, like I am a beginner, how this model works and why it gave this result. Use an everyday example.`,
        `म मोडेल खेल मैदानमा "${what}" मोडेल (${M.model || 'k-nearest neighbours'}) चलाउँदैछु।${res} यो मोडेलले कसरी काम गर्छ र किन यस्तो नतिजा दियो, सुरुवाती विद्यार्थीलाई जस्तै सरल रूपमा, दैनिक जीवनको उदाहरणसहित बुझाउनुहोस्।`,
        `我正在模型游乐场试用“${what}”模型（${M.model || 'k 近邻'}）。${res}请像对初学者一样，用日常生活的例子简单地解释这个模型是怎么工作的，以及为什么给出这个结果。`)));
    };
  }

  // ---------- "Train your own model": k-nearest neighbours on a canvas, pure JavaScript ----------
  function teach(card, el) {
    const cv = el.querySelector('.mp-board'), g = cv.getContext('2d'), info = el.querySelector('.mp-teach-info');
    const W = cv.width, H = cv.height, CELL = 10;
    let pts = [], cls = 0, k = 3;
    const COL = [[79, 70, 229], [225, 29, 72]];
    const random = () => {
      pts = [];
      const c = [[W * 0.3, H * 0.35], [W * 0.7, H * 0.65]];
      for (let i = 0; i < 26; i++) { const ci = i % 2, a = Math.random() * 6.283, r = Math.random() * 95; pts.push([c[ci][0] + Math.cos(a) * r, c[ci][1] + Math.sin(a) * r * 0.8, ci]); }
    };
    function predict(x, y) {
      const d = pts.map((p) => [(p[0] - x) ** 2 + (p[1] - y) ** 2, p[2]]).sort((a, b) => a[0] - b[0]).slice(0, Math.min(k, pts.length));
      const red = d.filter((v) => v[1] === 1).length;
      return [red * 2 > d.length ? 1 : 0, Math.max(red, d.length - red) / d.length];
    }
    function draw() {
      g.clearRect(0, 0, W, H);
      g.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--surface-2') || '#f1f3f9'; g.fillRect(0, 0, W, H);
      const both = pts.some((p) => p[2] === 0) && pts.some((p) => p[2] === 1);
      if (both) {
        for (let x = 0; x < W; x += CELL) for (let y = 0; y < H; y += CELL) {
          const [c, conf] = predict(x + CELL / 2, y + CELL / 2), [r, gg, b] = COL[c];
          g.fillStyle = `rgba(${r},${gg},${b},${(0.08 + (conf - 0.5) * 0.5).toFixed(3)})`; g.fillRect(x, y, CELL, CELL);
        }
      }
      pts.forEach(([x, y, c]) => { g.beginPath(); g.arc(x, y, 7, 0, 6.283); g.fillStyle = `rgb(${COL[c].join(',')})`; g.fill(); g.lineWidth = 2; g.strokeStyle = '#fff'; g.stroke(); });
      let acc = '';
      if (both) { // leave-one-out accuracy: predict each point from all the others
        const keep = pts; let ok = 0;
        keep.forEach((p, i) => { pts = keep.filter((_, j) => j !== i); if (predict(p[0], p[1])[0] === p[2]) ok++; });
        pts = keep; acc = ` · ${t(T('accuracy on points it has not seen', 'नदेखेका बिन्दुमा शुद्धता', '对没见过的点的准确率'))}: <b>${pct(ok / pts.length)}</b>`;
        card.summary = `${pts.length} points, k = ${k}, leave-one-out accuracy ${pct(ok / pts.length)}`;
      }
      info.innerHTML = both ? `${pts.length} ${t(T('examples', 'उदाहरण', '个示例'))} · k = ${k}${acc}` : t(T('👆 Click on the board to add examples of both colours.', '👆 दुवै रङका उदाहरण थप्न बोर्डमा क्लिक गर्नुहोस्।', '👆 在板上点击，添加两种颜色的示例。'));
    }
    cv.onclick = (e) => { const r = cv.getBoundingClientRect(); pts.push([(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height, cls]); draw(); };
    el.querySelectorAll('.mp-cls button').forEach((b) => (b.onclick = () => { cls = +b.dataset.c; el.querySelectorAll('.mp-cls button').forEach((x) => x.classList.toggle('on', x === b)); }));
    const ks = el.querySelector('.mp-k');
    ks.oninput = () => { k = +ks.value; el.querySelector('.mp-kv').textContent = k; draw(); };
    el.querySelector('.mp-rand').onclick = () => { random(); draw(); };
    el.querySelector('.mp-clear').onclick = () => { pts = []; card.summary = ''; draw(); };
    random(); draw();
  }

  // ---------- The page ----------
  MLS.routes.models = (focus) => {
    const el = h(`<div class="wide mp-page">
      <h1>${u('mpTitle')}</h1>
      <p class="muted">${u('mpIntro')}</p>
      <div class="box tip">${u('mpHow')} ${u('mpData')}</div>
      <div class="mp-grid">${MODELS.map(cardHTML).join('')}</div>
      <footer class="made-by">${u('madeBy')}</footer></div>`);
    MODELS.forEach((M) => wire(M, el.querySelector(`#mp-${M.id}`)));
    if (focus) setTimeout(() => { const c = document.getElementById(`mp-${focus}`); if (c) { c.scrollIntoView({ behavior: 'smooth', block: 'start' }); c.classList.add('mp-flash'); } }, 60);
    return el;
  };

  // In the matching lessons, point learners to the real model they can try.
  const FOR_LESSON = { cnn: ['image', 'detect'], transformers: ['sentiment', 'similar', 'speech'], knn: ['teach'], 'neural-networks': ['image'], 'naive-bayes': ['sentiment'], 'what-is-ml': ['teach', 'image'], overfitting: ['teach'] };
  MLS.hooks.lesson.push((L, body) => {
    const ids = FOR_LESSON[L.id]; if (!ids) return;
    body.appendChild(h(`<div class="box mp-try"><b class="t">${u('mpTryTitle')}</b>${u('mpTrySub')}
      <div class="mp-row">${ids.map((id) => { const M = MODELS.find((m) => m.id === id); return `<a class="btn ghost sm" href="#/models/${id}">${M.icon} ${esc(t(M.title))}</a>`; }).join('')}</div></div>`));
  });
})();

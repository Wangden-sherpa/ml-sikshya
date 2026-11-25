/* Level 7 — Generative AI: images, video, vision, speech, voice and music.
   Each lesson is built from a simple recipe (idea → how it works → key words → famous models → try it here →
   practise on real platforms → your mission → use it responsibly → quiz), in English, नेपाली and 中文. */
(() => {
  const T = (en, ne, zh) => ({ en, ne, zh });
  const LANGS = ['en', 'ne', 'zh'];

  const HEAD = {
    idea: T('The simple idea', 'सरल विचार', '简单理解'),
    how: T('⚙️ How it works, step by step', '⚙️ यो कसरी काम गर्छ, चरणबद्ध', '⚙️ 它是怎么工作的（分步）'),
    words: T('📦 Key words', '📦 मुख्य शब्दहरू', '📦 关键词'),
    models: T('🏆 Famous models today', '🏆 आजका प्रसिद्ध मोडेल', '🏆 当今的知名模型'),
    modelCols: [T('Model', 'मोडेल', '模型'), T('Made by', 'बनाउने', '开发者'), T('What is special', 'के विशेष छ', '特点')],
    tryIt: T('💻 Try the idea here (runs in your browser)', '💻 विचार यहीँ चलाएर हेर्नुहोस् (ब्राउजरमै चल्छ)', '💻 在这里亲手试试（在浏览器里运行）'),
    playground: T('🤖 Try a real model in our Model Playground', '🤖 हाम्रो Model Playground मा वास्तविक मोडेल चलाउनुहोस्', '🤖 在我们的模型游乐场试用真实模型'),
    platforms: T('🌐 Where to practise for real', '🌐 वास्तविक अभ्यास कहाँ गर्ने', '🌐 去哪里真正动手练习'),
    platCols: [T('Platform', 'प्लेटफर्म', '平台'), T('What you can do there', 'त्यहाँ के गर्न सकिन्छ', '可以做什么'), T('Cost', 'खर्च', '费用')],
    mission: T('🎯 Your practice mission', '🎯 तपाईंको अभ्यास मिसन', '🎯 你的练习任务'),
    safety: T('Use it responsibly', 'जिम्मेवारीपूर्वक प्रयोग गर्नुहोस्', '负责任地使用'),
    remember: T('Remember in one line', 'एक लाइनमा सम्झनुहोस्', '一句话记住'),
  };
  const COST = {
    free: T('🆓 Free', '🆓 निःशुल्क', '🆓 免费'),
    freeAcc: T('🆓 Free (account)', '🆓 निःशुल्क (खाता चाहिन्छ)', '🆓 免费（需注册）'),
    gpu: T('🆓 Free GPU hours', '🆓 निःशुल्क GPU समय', '🆓 免费 GPU 时长'),
    paid: T('💳 Pay per use', '💳 प्रयोग अनुसार शुल्क', '💳 按使用付费'),
    local: T('💻 Your own computer (GPU)', '💻 आफ्नै कम्प्युटर (GPU)', '💻 你自己的电脑（GPU）'),
    here: T('🆓 Here, in your browser', '🆓 यहीँ, ब्राउजरमा', '🆓 就在这里，浏览器中'),
  };
  // Platforms shared by several lessons
  const P = {
    spaces: (q) => [`<a href="https://huggingface.co/spaces?search=${encodeURIComponent(q)}" target="_blank" rel="noopener">Hugging Face Spaces</a>`, T(`Free online demos — search "${q}", type or upload, and see the result. No install.`, `निःशुल्क अनलाइन डेमो — "${q}" खोज्नुहोस्, टाइप वा अपलोड गर्नुहोस्, र नतिजा हेर्नुहोस्। इन्स्टल चाहिँदैन।`, `免费在线演示——搜索 “${q}”，输入或上传，就能看到结果，无需安装。`), COST.free],
    colab: ['<a href="https://colab.research.google.com" target="_blank" rel="noopener">Google Colab</a>', T('Python notebooks in the cloud with a free GPU. Paste the model\'s example code and run it.', 'निःशुल्क GPU सहित क्लाउडमा Python notebook। मोडेलको उदाहरण कोड टाँसेर चलाउनुहोस्।', '云端 Python 笔记本，带免费 GPU。粘贴模型的示例代码就能运行。'), COST.freeAcc],
    kaggle: ['<a href="https://www.kaggle.com/code" target="_blank" rel="noopener">Kaggle Notebooks</a>', T('Notebooks with free weekly GPU hours, plus thousands of datasets and other people\'s code to learn from.', 'हरेक हप्ता निःशुल्क GPU समयसहितका notebook, र सिक्नका लागि हजारौँ डाटासेट र अरूको कोड।', '每周有免费 GPU 时长的笔记本，还有成千上万的数据集和别人的代码可以学习。'), COST.gpu],
    replicate: (q) => [`<a href="https://replicate.com/explore?query=${encodeURIComponent(q)}" target="_blank" rel="noopener">Replicate</a>`, T('Run big models in the cloud with one click or a few lines of code. Good for comparing models.', 'एक क्लिक वा केही लाइन कोडले क्लाउडमा ठूला मोडेल चलाउनुहोस्। मोडेल तुलना गर्न राम्रो।', '一键或几行代码就能在云端运行大模型，适合比较不同模型。'), COST.paid],
  };
  const link = (name, url) => `<a href="${url}" target="_blank" rel="noopener">${name}</a>`;

  function build(S) {
    const body = {};
    LANGS.forEach((g) => {
      const x = (o) => (o && typeof o === 'object' && !Array.isArray(o) ? (o[g] ?? o.en) : o);
      body[g] = `
<p class="lead">${x(S.intro)}</p>
<div class="box analogy"><b class="t">${x(HEAD.idea)}</b>${x(S.idea)}</div>

<h2>${x(HEAD.how)}</h2>
<div class="flow">${S.steps.map((s, i) => `${i ? '<i>→</i>' : ''}<span>${i + 1}. ${x(s[0])}</span>`).join('')}</div>
<ol>${S.steps.map((s) => `<li><b>${x(s[0])}:</b> ${x(s[1])}</li>`).join('')}</ol>

<h2>${x(HEAD.words)}</h2>
<table>${S.words.map(([w, m]) => `<tr><td><b>${w}</b></td><td>${x(m)}</td></tr>`).join('')}</table>

<h2>${x(HEAD.models)}</h2>
<table><tr>${HEAD.modelCols.map((c) => `<th>${x(c)}</th>`).join('')}</tr>
${S.models.map(([n, url, by, what]) => `<tr><td><b>${link(n, url)}</b></td><td>${by}</td><td>${x(what)}</td></tr>`).join('')}</table>
<p class="small muted">${x(T('Models improve every few months — the ideas in this lesson stay the same. Always check a model\'s license before using it in a business.', 'मोडेल हरेक केही महिनामा सुध्रन्छन् — यो पाठका विचार उस्तै रहन्छन्। व्यवसायमा प्रयोग गर्नुअघि मोडेलको license सधैँ जाँच्नुहोस्।', '模型每隔几个月就会进步——但本课的原理不变。商用前一定要查看模型的许可证。'))}</p>

<h2>${x(HEAD.tryIt)}</h2>
<p>${x(S.tryText)}</p>
<div data-code="0"></div>
${S.code2 ? `<p>${x(S.tryText2)}</p><div data-code="1"></div>` : ''}
${S.playground ? `<div class="box tip"><b class="t">${x(HEAD.playground)}</b>${x(S.playground[0])}<div class="mp-row" style="margin-top:8px">${S.playground[1].map(([id, label]) => `<a class="btn ghost sm" href="#/models/${id}">${x(label)}</a>`).join(' ')}</div></div>` : ''}

<h2>${x(HEAD.platforms)}</h2>
<table><tr>${HEAD.platCols.map((c) => `<th>${x(c)}</th>`).join('')}</tr>
${S.platforms.map(([n, what, cost]) => `<tr><td><b>${n}</b></td><td>${x(what)}</td><td style="white-space:nowrap">${x(cost)}</td></tr>`).join('')}</table>

<h2>${x(HEAD.mission)}</h2>
<ol>${S.mission.map((m) => `<li>${x(m)}</li>`).join('')}</ol>

<div class="box warn"><b class="t">${x(HEAD.safety)}</b>${x(S.safety)}</div>
<div class="box key"><b class="t">${x(HEAD.remember)}</b>${x(S.remember)}</div>`;
    });
    return {
      id: S.id, level: 'genai', minutes: S.minutes, title: S.title, body,
      code: [S.code, S.code2].filter(Boolean),
      quiz: S.quiz.map(([q, opts, answer, ex]) => ({
        q: { en: q[0], ne: q[1], zh: q[2] },
        options: Array.isArray(opts[0]) ? { en: opts[0], ne: opts[1], zh: opts[2] } : opts,
        answer, explain: { en: ex[0], ne: ex[1], zh: ex[2] },
      })),
    };
  }

  const LESSONS = [];

  // ======================================================================
  // 1. IMAGE GENERATION
  // ======================================================================
  LESSONS.push({
    id: 'image-generation', minutes: 25,
    title: T('Image Generation: Diffusion & Flow Matching', 'चित्र बनाउने AI: Diffusion र Flow Matching', '图像生成：扩散模型与流匹配'),
    intro: T('Type "a yak standing in the snow near Everest, photo" and get a brand-new picture in seconds. This is image generation — used in design, advertising, games and art. The models behind it are <b>diffusion</b> and <b>flow matching</b> models like <b>FLUX.1</b> and <b>Stable Diffusion 3.5</b>.',
      '"सगरमाथा नजिक हिउँमा उभिएको याक, फोटो" टाइप गर्नुहोस् र केही सेकेन्डमै बिल्कुल नयाँ चित्र पाउनुहोस्। यही हो चित्र बनाउने AI — डिजाइन, विज्ञापन, गेम र कलामा प्रयोग हुन्छ। यसका पछाडि <b>FLUX.1</b> र <b>Stable Diffusion 3.5</b> जस्ता <b>diffusion</b> र <b>flow matching</b> मोडेल छन्।',
      '输入“珠穆朗玛峰附近雪地里的一头牦牛，照片”，几秒钟就能得到一张全新的图片。这就是图像生成——用于设计、广告、游戏和艺术。背后是 <b>FLUX.1</b>、<b>Stable Diffusion 3.5</b> 这样的<b>扩散</b>和<b>流匹配</b>模型。'),
    idea: T('Imagine a sculptor with a block of stone. The statue is "hidden" inside, and the sculptor removes a little stone at a time until it appears. A diffusion model does the same with <b>noise</b> (random TV static): it starts from pure static and removes a little noise at each step, guided by your words, until a picture appears.',
      'ढुङ्गाको टुक्रा लिएको मूर्तिकारको कल्पना गर्नुहोस्। मूर्ति भित्रै "लुकेको" हुन्छ, र मूर्तिकारले अलि-अलि ढुङ्गा हटाउँदै जान्छ जबसम्म मूर्ति देखिँदैन। Diffusion मोडेलले <b>noise</b> (टिभीको झिलमिल) सँग यस्तै गर्छ: पूरै झिलमिलबाट सुरु गरेर, तपाईंका शब्दको मार्गदर्शनमा हरेक चरणमा अलिकति noise हटाउँछ, र चित्र देखिन्छ।',
      '想象一位雕塑家面对一块石头。雕像“藏”在里面，雕塑家一点点去掉石头，直到雕像出现。扩散模型对<b>噪声</b>（电视雪花）做同样的事：从纯噪声开始，在你文字的引导下每一步去掉一点噪声，直到图片出现。'),
    steps: [
      [T('Learn', 'सिक्ने', '学习'), T('During training, millions of real photos (with captions) are slowly covered with noise. The model practises guessing the noise that was added.', 'तालिममा लाखौँ वास्तविक फोटो (विवरणसहित) बिस्तारै noise ले ढाकिन्छन्। मोडेलले थपिएको noise अनुमान गर्ने अभ्यास गर्छ।', '训练时，数百万张真实照片（带文字说明）被慢慢盖上噪声。模型练习猜出加进去的噪声。')],
      [T('Read the prompt', 'Prompt पढ्ने', '读提示词'), T('A text encoder turns your words into numbers (embeddings) that describe what you want.', 'Text encoder ले तपाईंका शब्दलाई तपाईं के चाहनुहुन्छ भन्ने अंक (embedding) मा बदल्छ।', '文本编码器把你的文字变成描述需求的数字（嵌入）。')],
      [T('Remove noise', 'Noise हटाउने', '去除噪声'), T('Starting from random noise, the model removes a little noise in 4–50 steps, always checking the prompt.', 'Random noise बाट सुरु गरेर, मोडेलले prompt हेर्दै ४–५० चरणमा अलि-अलि noise हटाउँछ।', '从随机噪声开始，模型在 4–50 步内一点点去噪，并一直参照提示词。')],
      [T('Decode', 'Decode गर्ने', '解码'), T('The work happens in a small compressed "latent" picture. A VAE decoder finally turns it into a full-size image.', 'काम सानो खुम्चिएको "latent" चित्रमा हुन्छ। अन्त्यमा VAE decoder ले यसलाई पूरा आकारको चित्र बनाउँछ।', '计算在一张压缩的小“潜空间”图上进行，最后由 VAE 解码器变成完整大小的图片。')],
    ],
    words: [
      ['Prompt', T('The words you type to describe the picture you want.', 'चाहेको चित्र वर्णन गर्न टाइप गर्ने शब्द।', '你输入的、描述想要什么图片的文字。')],
      ['Noise', T('Random dots, like TV static. Generation starts from pure noise.', 'टिभीको झिलमिल जस्ता random थोप्ला। सिर्जना पूरै noise बाट सुरु हुन्छ।', '像电视雪花一样的随机点。生成从纯噪声开始。')],
      ['Diffusion', T('Learn to remove noise step by step, to turn static into a picture.', 'झिलमिललाई चित्र बनाउन चरणबद्ध रूपमा noise हटाउन सिक्ने।', '学会一步步去除噪声，把雪花变成图片。')],
      ['Flow matching', T('A newer, faster way: learn a straight path from noise to picture, so fewer steps are needed (used by FLUX.1 and SD 3.5).', 'नयाँ, छिटो तरिका: noise देखि चित्रसम्म सीधा बाटो सिक्ने, त्यसैले कम चरण लाग्छ (FLUX.1 र SD 3.5 ले प्रयोग गर्छन्)।', '更新更快的方法：学会从噪声到图片的一条直线路径，所需步数更少（FLUX.1 和 SD 3.5 使用）。')],
      ['Latent', T('A small, compressed version of the picture where the model does its work (much faster).', 'चित्रको सानो, खुम्चिएको रूप जहाँ मोडेलले काम गर्छ (धेरै छिटो)।', '图片的压缩小版本，模型在这里计算（快得多）。')],
      ['VAE', T('A network that compresses a picture into a latent and expands it back.', 'चित्रलाई latent मा खुम्च्याउने र फेरि फैलाउने नेटवर्क।', '把图片压缩成潜空间、再还原回来的网络。')],
      ['Steps · CFG', T('Steps = how many denoising rounds. CFG (guidance) = how strictly to follow the prompt.', 'Steps = noise हटाउने कति चरण। CFG (guidance) = prompt कति कडाइले पालना गर्ने।', 'Steps = 去噪几轮。CFG（引导）= 多严格地遵循提示词。')],
    ],
    models: [
      ['FLUX.1', 'https://huggingface.co/black-forest-labs/FLUX.1-schnell', 'Black Forest Labs', T('Very realistic photos and good text inside images. The "schnell" version needs only ~4 steps.', 'धेरै वास्तविक फोटो र चित्रभित्र राम्रो अक्षर। "schnell" संस्करणलाई करिब ४ चरण मात्र चाहिन्छ।', '照片非常逼真，图中文字也写得好。“schnell”版本只需约 4 步。')],
      ['Stable Diffusion 3.5', 'https://huggingface.co/stabilityai/stable-diffusion-3.5-large', 'Stability AI', T('Open weights you can download and fine-tune; huge community of tools and styles.', 'डाउनलोड र fine-tune गर्न मिल्ने खुला weight; उपकरण र शैलीको ठूलो समुदाय।', '可下载、可微调的开放权重；有庞大的工具和风格社区。')],
    ],
    tryText: T('This tiny simulation shows the two halves of a diffusion / flow-matching model. Top row: a smiley picture is slowly turned into noise (this is how training examples are made). Bottom row: starting from pure noise, a "model" guesses which way to go and takes small steps back to the picture. Press ▶ Run, then change <code>steps</code> or the size of the model\'s mistake.',
      'यो सानो नक्कलले diffusion / flow-matching मोडेलका दुई भाग देखाउँछ। माथिल्लो लाइन: हँसिलो चित्र बिस्तारै noise मा बदलिन्छ (तालिमका उदाहरण यसरी बन्छन्)। तल्लो लाइन: पूरै noise बाट सुरु गरेर "मोडेल" ले कतातिर जाने अनुमान गर्छ र साना पाइला चालेर चित्रमा फर्कन्छ। ▶ Run थिच्नुहोस्, अनि <code>steps</code> वा मोडेलको गल्तीको आकार बदल्नुहोस्।',
      '这个小模拟展示了扩散/流匹配模型的两半。上排：笑脸图片慢慢变成噪声（训练样本就是这样做出来的）。下排：从纯噪声开始，“模型”猜测方向，小步走回图片。点 ▶ 运行，然后改改 <code>steps</code> 或模型误差的大小。'),
    code: { title: T('Noise → picture (flow matching)', 'Noise → चित्र (flow matching)', '噪声 → 图片（流匹配）'), code: py`
import numpy as np
import matplotlib.pyplot as plt

# A tiny 16 x 16 "photo": a smiley face (1 = white, 0 = black)
img = np.zeros((16, 16))
yy, xx = np.mgrid[0:16, 0:16]
img[(yy - 7.5) ** 2 + (xx - 7.5) ** 2 < 50] = 1   # the face
img[4:6, 4:6] = 0                                   # left eye
img[4:6, 10:12] = 0                                 # right eye
img[10, 5:11] = 0                                   # mouth

rng = np.random.default_rng(0)
noise = rng.normal(0, 1, img.shape)

fig, ax = plt.subplots(2, 5, figsize=(10, 4.4))

# TRAINING DATA: mix the picture with more and more noise (a straight line from picture to noise)
for i, t in enumerate([0.0, 0.25, 0.5, 0.75, 1.0]):
    noisy = (1 - t) * img + t * noise
    ax[0, i].imshow(noisy, cmap="gray")
    ax[0, i].set_title(f"noise {int(t * 100)}%")
    ax[0, i].axis("off")

# GENERATING: start from pure noise and take small steps back towards a picture
steps = 4
mistake = 0.15                      # how wrong the model's guesses are (try 0.5!)
x = noise.copy()
for s in range(steps):
    direction = (noise - img) + rng.normal(0, mistake, img.shape)   # the model's guess
    x = x - direction / steps                                       # one small step
    if s < 4:
        ax[1, s].imshow(x, cmap="gray")
        ax[1, s].set_title(f"step {s + 1}")
        ax[1, s].axis("off")
ax[1, 4].imshow(img, cmap="gray")
ax[1, 4].set_title("original")
ax[1, 4].axis("off")
plt.tight_layout()
plt.show()
print("Top row = adding noise (training).  Bottom row = removing noise (generating).")
` },
    playground: [T('Our Playground can\'t draw pictures yet (those models are too big for a browser), but it can <b>recognise</b> what is in one — the opposite job, done by the same kind of network.', 'हाम्रो Playground ले अहिले चित्र बनाउन सक्दैन (ती मोडेल ब्राउजरका लागि धेरै ठूला छन्), तर चित्रमा के छ भनेर <b>चिन्न</b> सक्छ — उल्टो काम, उस्तै प्रकारको नेटवर्कले गर्ने।', '我们的游乐场暂时不能画图（这些模型对浏览器来说太大），但可以<b>识别</b>图里有什么——这是相反的任务，由同类网络完成。'), [['image', T('🖼️ What is in this photo?', '🖼️ यो फोटोमा के छ?', '🖼️ 这张照片里有什么？')]]],
    platforms: [
      P.spaces('FLUX'),
      [link('FLUX.1 [schnell]', 'https://huggingface.co/black-forest-labs/FLUX.1-schnell'), T('The model page: example code, license, and a link to a live demo.', 'मोडेल पेज: उदाहरण कोड, license, र लाइभ डेमोको लिङ्क।', '模型主页：示例代码、许可证和在线演示链接。'), COST.free],
      P.colab,
      [link('ComfyUI', 'https://github.com/Comfy-Org/ComfyUI'), T('The most popular free app to run image (and video) models on your own PC, by connecting boxes like Lego.', 'आफ्नै PC मा चित्र (र भिडियो) मोडेल चलाउने सबैभन्दा लोकप्रिय निःशुल्क एप, Lego जस्तै बाकस जोडेर।', '在自己电脑上运行图像（和视频）模型最流行的免费应用，像搭乐高一样连接方块。'), COST.local],
      P.replicate('flux'),
    ],
    mission: [
      T('Open <b>Hugging Face Spaces</b> and search "FLUX". Open a demo.', '<b>Hugging Face Spaces</b> खोलेर "FLUX" खोज्नुहोस्। एउटा डेमो खोल्नुहोस्।', '打开 <b>Hugging Face Spaces</b>，搜索 “FLUX”，打开一个演示。'),
      T('Write a prompt with 4 parts: <i>subject</i> + <i>place</i> + <i>style</i> + <i>light</i>. Example: "a red panda reading a book, in a Kathmandu tea shop, watercolor, morning light".', '४ भाग भएको prompt लेख्नुहोस्: <i>विषय</i> + <i>ठाउँ</i> + <i>शैली</i> + <i>प्रकाश</i>। उदाहरण: "a red panda reading a book, in a Kathmandu tea shop, watercolor, morning light"।', '写一个包含 4 部分的提示词：<i>主体</i> + <i>地点</i> + <i>风格</i> + <i>光线</i>。例如：“a red panda reading a book, in a Kathmandu tea shop, watercolor, morning light”。'),
      T('Generate twice with the SAME prompt but a different <b>seed</b>. Notice: the seed is the starting noise, so it changes the picture.', 'उही prompt तर फरक <b>seed</b> राखेर दुई पटक बनाउनुहोस्। ध्यान दिनुहोस्: seed भनेको सुरुको noise हो, त्यसैले चित्र बदलिन्छ।', '用相同的提示词、不同的 <b>seed</b> 各生成一次。注意：seed 就是起始噪声，所以图片会变。'),
      T('Change ONE word only (e.g. "watercolor" → "photo") and compare. This is how professionals improve prompts.', 'एउटा शब्द मात्र बदल्नुहोस् (जस्तै "watercolor" → "photo") र तुलना गर्नुहोस्। पेशेवरहरूले prompt यसरी नै सुधार्छन्।', '只改一个词（例如 “watercolor” → “photo”）再比较。专业人士就是这样改进提示词的。'),
      T('Bonus: in the code above, change <code>mistake</code> to 0.6. A worse "model" makes a blurrier picture — just like real models with too few steps.', 'बोनस: माथिको कोडमा <code>mistake</code> लाई 0.6 बनाउनुहोस्। नराम्रो "मोडेल" ले धमिलो चित्र बनाउँछ — धेरै कम चरण भएका वास्तविक मोडेल जस्तै।', '附加：把上面代码里的 <code>mistake</code> 改成 0.6。更差的“模型”会画出更模糊的图——就像步数太少的真实模型。'),
    ],
    safety: T('Never make fake pictures of real people (deepfakes) or pretend an AI image is a real photo. Label AI images, respect artists\' styles and copyright, and check the license before selling anything you made.', 'वास्तविक मानिसका नक्कली चित्र (deepfake) कहिल्यै नबनाउनुहोस् वा AI चित्रलाई वास्तविक फोटो भनी नदेखाउनुहोस्। AI चित्रमा लेबल लगाउनुहोस्, कलाकारको शैली र प्रतिलिपि अधिकारको सम्मान गर्नुहोस्, र बेच्नुअघि license जाँच्नुहोस्।', '不要制作真人的假图片（深度伪造），也不要把 AI 图片冒充真实照片。给 AI 图片加标注，尊重艺术家的风格和版权，出售前先查看许可证。'),
    remember: T('Image generators turn noise into pictures step by step, guided by your prompt.', 'चित्र बनाउने AI ले तपाईंको prompt को मार्गदर्शनमा noise लाई चरणबद्ध रूपमा चित्रमा बदल्छ।', '图像生成器在提示词的引导下，一步步把噪声变成图片。'),
    quiz: [
      [['What does a diffusion model start from when it makes a new picture?', 'Diffusion मोडेलले नयाँ चित्र बनाउँदा केबाट सुरु गर्छ?', '扩散模型生成新图片时，从什么开始？'],
        [['A photo from the internet', 'Pure random noise', 'A white page', 'The last picture it made'], ['इन्टरनेटको फोटो', 'पूरै random noise', 'सेतो पाना', 'अघिल्लो पटक बनाएको चित्र'], ['网上的一张照片', '纯随机噪声', '一张白纸', '它上次画的图']], 1,
        ['It begins with random noise and removes a little at each step until a picture appears.', 'यो random noise बाट सुरु भएर हरेक चरणमा अलिकति हटाउँदै चित्र देखिन्छ।', '它从随机噪声开始，每步去掉一点，直到图片出现。']],
      [['You use the same prompt twice but get two different pictures. Why?', 'उही prompt दुई पटक प्रयोग गर्दा फरक चित्र आयो। किन?', '同一个提示词用了两次，却得到两张不同的图。为什么？'],
        [['The model is broken', 'The internet was slow', 'A different seed means different starting noise', 'The prompt was too short'], ['मोडेल बिग्रियो', 'इन्टरनेट ढिलो थियो', 'फरक seed भनेको फरक सुरुको noise', 'Prompt धेरै छोटो थियो'], ['模型坏了', '网速慢', '不同的 seed 意味着不同的起始噪声', '提示词太短']], 2,
        ['The seed decides the starting noise. Same seed + same prompt = same picture.', 'Seed ले सुरुको noise निर्णय गर्छ। उही seed + उही prompt = उही चित्र।', 'seed 决定起始噪声。相同 seed + 相同提示词 = 相同图片。']],
      [['Why do models like FLUX.1 work in a small "latent" space?', 'FLUX.1 जस्ता मोडेल सानो "latent" ठाउँमा किन काम गर्छन्?', '为什么 FLUX.1 这类模型在小的“潜空间”里计算？'],
        [['It is much faster than working on every pixel', 'Latents have more colours', 'It is required by law', 'To make pictures smaller'], ['हरेक pixel मा काम गर्नुभन्दा धेरै छिटो हुन्छ', 'Latent मा बढी रङ हुन्छ', 'कानुनले माग्छ', 'चित्र सानो बनाउन'], ['比在每个像素上计算快得多', '潜空间颜色更多', '法律要求', '为了把图片变小']], 0,
        ['A VAE compresses the picture about 8× in each direction, so each step is far cheaper; the decoder restores full size at the end.', 'VAE ले चित्रलाई हरेक दिशामा करिब ८ गुणा खुम्च्याउँछ, त्यसैले हरेक चरण धेरै सस्तो हुन्छ; अन्त्यमा decoder ले पूरा आकार फर्काउँछ।', 'VAE 把图片每个方向压缩约 8 倍，每一步都便宜得多；最后由解码器恢复完整大小。']],
      [['What is the main advantage of flow matching over older diffusion?', 'पुरानो diffusion भन्दा flow matching को मुख्य फाइदा के हो?', '流匹配相比老式扩散的主要优点是什么？'],
        [['It needs no training data', 'It only makes black-and-white images', 'It cannot use prompts', 'It learns a straighter path from noise to picture, so it needs fewer steps'], ['तालिम डाटा चाहिँदैन', 'कालो-सेतो चित्र मात्र बनाउँछ', 'Prompt प्रयोग गर्न सक्दैन', 'Noise देखि चित्रसम्म सीधा बाटो सिक्छ, त्यसैले कम चरण चाहिन्छ'], ['不需要训练数据', '只能生成黑白图', '不能用提示词', '它学到从噪声到图片更直的路径，所以需要的步数更少']], 3,
        ['A straight path can be followed in big steps — fast generation.', 'सीधा बाटो ठूला पाइलामा पछ्याउन सकिन्छ — छिटो सिर्जना।', '直路可以大步走——生成更快。']],
    ],
  });

  // ======================================================================
  // 2. VIDEO GENERATION
  // ======================================================================
  LESSONS.push({
    id: 'video-generation', minutes: 25,
    title: T('Video Generation: Diffusion Transformers & 3D VAE', 'भिडियो बनाउने AI: Diffusion Transformer र 3D VAE', '视频生成：扩散 Transformer 与 3D VAE'),
    intro: T('Text-to-video models turn a sentence (or a photo) into a short moving clip. The best open models — <b>Wan 2.2</b>, <b>HunyuanVideo</b> and <b>LTX</b> — use a <b>Diffusion Transformer</b> together with a <b>3D VAE</b>.',
      'Text-to-video मोडेलले एउटा वाक्य (वा फोटो) लाई छोटो चल्ने क्लिपमा बदल्छ। उत्कृष्ट खुला मोडेल — <b>Wan 2.2</b>, <b>HunyuanVideo</b> र <b>LTX</b> — ले <b>Diffusion Transformer</b> र <b>3D VAE</b> सँगै प्रयोग गर्छन्।',
      '文生视频模型把一句话（或一张照片）变成一段短视频。最好的开源模型——<b>Wan 2.2</b>、<b>HunyuanVideo</b> 和 <b>LTX</b>——都把<b>扩散 Transformer</b> 和 <b>3D VAE</b> 结合在一起。'),
    idea: T('A video is a flip-book: many pictures shown quickly. Making a video is like making many pictures at once — but they must <b>agree</b> with each other (the same person, the same shirt, smooth movement). So the model "denoises" all the frames together, letting each frame look at its neighbours.',
      'भिडियो भनेको flip-book हो: छिटो देखाइने धेरै चित्र। भिडियो बनाउनु एकैपटक धेरै चित्र बनाउनु जस्तै हो — तर ती एकअर्कासँग <b>मिल्नुपर्छ</b> (उही मान्छे, उही कमिज, सहज चाल)। त्यसैले मोडेलले सबै frame सँगै "noise हटाउँछ", हरेक frame लाई छिमेकी frame हेर्न दिँदै।',
      '视频就是一本翻页书：很多图片快速播放。生成视频就像同时画很多张图——但它们必须<b>相互一致</b>（同一个人、同一件衣服、动作流畅）。所以模型把所有帧一起“去噪”，让每一帧都参照相邻的帧。'),
    steps: [
      [T('Compress', 'खुम्च्याउने', '压缩'), T('A 3D VAE squeezes the video in space AND time (e.g. 8× smaller in width and height, 4× fewer frames), because neighbouring frames are almost the same.', '3D VAE ले भिडियोलाई ठाउँ र समय दुवैमा खुम्च्याउँछ (जस्तै चौडाइ र उचाइमा ८ गुणा सानो, ४ गुणा कम frame), किनभने छिमेकी frame लगभग उस्तै हुन्छन्।', '3D VAE 在空间和时间上同时压缩视频（例如宽高各缩小 8 倍、帧数减少 4 倍），因为相邻的帧几乎一样。')],
      [T('Cut into patches', 'Patch मा काट्ने', '切成小块'), T('The compressed video is cut into small 3D cubes (space × time). Each cube becomes one token, like a word in a sentence.', 'खुम्चिएको भिडियोलाई साना 3D घन (ठाउँ × समय) मा काटिन्छ। हरेक घन वाक्यको शब्द जस्तै एउटा token बन्छ।', '压缩后的视频被切成小的三维方块（空间 × 时间），每个方块成为一个 token，就像句子里的一个词。')],
      [T('Denoise with a Transformer', 'Transformer ले noise हटाउने', '用 Transformer 去噪'), T('A Diffusion Transformer (DiT) removes noise from all tokens together; attention lets every patch look at every other patch, so the video stays consistent.', 'Diffusion Transformer (DiT) ले सबै token बाट सँगै noise हटाउँछ; attention ले हरेक patch लाई अरू सबै patch हेर्न दिन्छ, त्यसैले भिडियो मिलेको रहन्छ।', '扩散 Transformer（DiT）对所有 token 一起去噪；注意力让每个小块看到其他所有小块，所以视频保持一致。')],
      [T('Decode', 'Decode गर्ने', '解码'), T('The 3D VAE decoder expands the result back into full frames — your video.', '3D VAE decoder ले नतिजालाई पूरा frame मा फैलाउँछ — तपाईंको भिडियो।', '3D VAE 解码器把结果还原成完整的帧——你的视频。')],
    ],
    words: [
      ['Frame · FPS', T('One picture of the video · frames per second (24 FPS = 24 pictures every second).', 'भिडियोको एउटा चित्र · प्रति सेकेन्ड frame (24 FPS = हरेक सेकेन्ड २४ चित्र)।', '视频中的一张图 · 每秒帧数（24 FPS = 每秒 24 张图）。')],
      ['3D VAE', T('Compresses video in width, height AND time.', 'भिडियोलाई चौडाइ, उचाइ र समयमा खुम्च्याउँछ।', '在宽度、高度和时间三个方向压缩视频。')],
      ['DiT', T('Diffusion Transformer: a Transformer that does the denoising, instead of the older U-Net.', 'Diffusion Transformer: पुरानो U-Net को सट्टा noise हटाउने Transformer।', '扩散 Transformer：用 Transformer 来去噪，取代旧的 U-Net。')],
      ['Patch / token', T('A small cube of the video that the Transformer reads as one unit.', 'भिडियोको सानो घन जसलाई Transformer ले एउटा एकाइको रूपमा पढ्छ।', 'Transformer 当作一个单位读取的视频小方块。')],
      ['T2V · I2V', T('Text-to-video (from a sentence) · image-to-video (bring a photo to life).', 'Text-to-video (वाक्यबाट) · image-to-video (फोटोलाई जीवन्त बनाउने)।', '文生视频（从一句话）· 图生视频（让照片动起来）。')],
      ['Temporal consistency', T('Things stay the same from frame to frame (no flickering faces).', 'Frame देखि frame सम्म कुरा उस्तै रहनु (अनुहार झिलमिल नहुनु)।', '帧与帧之间保持一致（脸不会闪烁变化）。')],
    ],
    models: [
      ['Wan 2.2', 'https://github.com/Wan-Video/Wan2.2', 'Alibaba (Wan team)', T('Strong open model for text- and image-to-video; a small 5B version runs on one gaming GPU.', 'Text र image-to-video का लागि बलियो खुला मोडेल; सानो 5B संस्करण एउटा gaming GPU मा चल्छ।', '强大的开源文生/图生视频模型；小的 5B 版本能在一块游戏显卡上运行。')],
      ['HunyuanVideo', 'https://github.com/Tencent-Hunyuan/HunyuanVideo', 'Tencent', T('Large open model with high-quality, cinematic motion.', 'उच्च गुणस्तर, सिनेमाजस्तो चाल भएको ठूलो खुला मोडेल।', '大型开源模型，动作质量高、有电影感。')],
      ['LTX-2.5 (LTX)', 'https://github.com/Lightricks/LTX-2', 'Lightricks', T('Built for speed — can make clips in about real time on a good GPU; also generates sound.', 'गतिका लागि बनाइएको — राम्रो GPU मा करिब वास्तविक समयमै क्लिप बनाउन सक्छ; आवाज पनि बनाउँछ।', '为速度而生——在好显卡上几乎实时生成片段；还能生成声音。')],
    ],
    tryText: T('Video = a stack of frames. This code makes a tiny video of a moving ball, then calculates why a 3D VAE is essential: real videos contain hundreds of millions of numbers.', 'भिडियो = frame को थाक। यो कोडले चल्ने बलको सानो भिडियो बनाउँछ, अनि 3D VAE किन अत्यावश्यक छ गणना गर्छ: वास्तविक भिडियोमा करोडौँ अंक हुन्छन्।', '视频 = 一叠帧。这段代码做一个小球移动的小视频，然后算出为什么 3D VAE 必不可少：真实视频包含数亿个数字。'),
    code: { title: T('A video is a stack of frames', 'भिडियो भनेको frame को थाक हो', '视频是一叠帧'), code: py`
import numpy as np
import matplotlib.pyplot as plt

# A video is many images in a row: shape = (frames, height, width)
frames, H, W = 16, 32, 32
video = np.zeros((frames, H, W))
yy, xx = np.mgrid[0:H, 0:W]
for f in range(frames):
    cx = 4 + f * 1.5                          # the ball moves right a little every frame
    video[f][(yy - 16) ** 2 + (xx - cx) ** 2 < 12] = 1

fig, ax = plt.subplots(1, 4, figsize=(10, 2.8))
for i, f in enumerate([0, 5, 10, 15]):
    ax[i].imshow(video[f], cmap="magma")
    ax[i].set_title(f"frame {f}")
    ax[i].axis("off")
plt.show()
print("Video shape (frames, height, width):", video.shape)

# Why video models need a 3D VAE: real videos are HUGE
real = 5 * 24 * 720 * 1280 * 3               # 5 seconds, 24 frames/s, 720p, red-green-blue
print(f"A 5-second 720p video has {real:,} numbers")

# A 3D VAE: 4x fewer frames, 8x smaller width and height, 16 channels
latent = (5 * 24 // 4) * (720 // 8) * (1280 // 8) * 16
print(f"After the 3D VAE: {latent:,} numbers  ->  {real / latent:.0f}x smaller")

# Neighbouring frames are almost the same, which is why squeezing time works
change = [np.abs(video[f + 1] - video[f]).mean() for f in range(frames - 1)]
print(f"Average change between two frames: {np.mean(change):.3f}  (0 = identical)")
` },
    platforms: [
      P.spaces('video generation'),
      [link('Wan 2.2 (GitHub)', 'https://github.com/Wan-Video/Wan2.2'), T('Code, install guide and example prompts. The TI2V-5B model is the easiest to run.', 'कोड, इन्स्टल गाइड र उदाहरण prompt। TI2V-5B मोडेल चलाउन सबैभन्दा सजिलो।', '代码、安装指南和示例提示词。TI2V-5B 模型最容易运行。'), COST.local],
      [link('ComfyUI', 'https://github.com/Comfy-Org/ComfyUI'), T('Ready-made video workflows for Wan, Hunyuan and LTX — drag, drop, generate.', 'Wan, Hunyuan र LTX का लागि तयार भिडियो workflow — तान्नुहोस्, छोड्नुहोस्, बनाउनुहोस्।', '为 Wan、Hunyuan、LTX 准备好的视频工作流——拖放即可生成。'), COST.local],
      P.kaggle,
      P.replicate('video'),
    ],
    mission: [
      T('On <b>Hugging Face Spaces</b>, search "Wan" or "LTX" and open a text-to-video demo.', '<b>Hugging Face Spaces</b> मा "Wan" वा "LTX" खोजेर text-to-video डेमो खोल्नुहोस्।', '在 <b>Hugging Face Spaces</b> 搜索 “Wan” 或 “LTX”，打开一个文生视频演示。'),
      T('Describe the MOVEMENT, not just the scene: "a prayer flag waving in strong wind, camera slowly moving up the mountain".', 'दृश्य मात्र होइन, चाल पनि वर्णन गर्नुहोस्: "a prayer flag waving in strong wind, camera slowly moving up the mountain"।', '不仅描述场景，还要描述动作：“a prayer flag waving in strong wind, camera slowly moving up the mountain”。'),
      T('Try image-to-video: upload a photo you took yourself and ask it to move gently.', 'Image-to-video प्रयास गर्नुहोस्: आफैँले खिचेको फोटो अपलोड गरेर बिस्तारै चलाउन भन्नुहोस्।', '试试图生视频：上传你自己拍的照片，让它轻轻动起来。'),
      T('Watch for mistakes: extra fingers, objects that change shape, flickering. These are temporal-consistency errors.', 'गल्ती हेर्नुहोस्: थप औँला, आकार बदलिने वस्तु, झिलमिल। यी temporal-consistency गल्ती हुन्।', '注意错误：多出的手指、变形的物体、闪烁。这些都是时间一致性错误。'),
      T('In the code above, change the video to 60 seconds at 1080p (1920 × 1080). How many numbers is that?', 'माथिको कोडमा भिडियोलाई 1080p (1920 × 1080) मा ६० सेकेन्ड बनाउनुहोस्। कति अंक हुन्छ?', '在上面的代码里，把视频改成 1080p（1920 × 1080）、60 秒。有多少个数字？'),
    ],
    safety: T('Realistic fake videos can spread lies and hurt people. Never make videos of real people without their permission, always label AI video, and be careful about believing shocking videos online — check the source.', 'वास्तविक जस्ता नक्कली भिडियोले झूट फैलाउन र मानिसलाई हानि गर्न सक्छन्। वास्तविक मानिसको भिडियो अनुमति बिना कहिल्यै नबनाउनुहोस्, AI भिडियोमा सधैँ लेबल लगाउनुहोस्, र अनलाइनका चकित पार्ने भिडियोमा विश्वास गर्नुअघि स्रोत जाँच्नुहोस्।', '逼真的假视频可能传播谎言、伤害他人。未经允许不要制作真人的视频，始终标注 AI 视频，对网上令人震惊的视频要谨慎——先核实来源。'),
    remember: T('Video models denoise all frames together inside a 3D-compressed space, so the clip stays consistent.', 'भिडियो मोडेलले 3D-खुम्चिएको ठाउँमा सबै frame सँगै noise हटाउँछन्, त्यसैले क्लिप मिलेको रहन्छ।', '视频模型在三维压缩空间里把所有帧一起去噪，所以片段保持一致。'),
    quiz: [
      [['What does the "3D" in 3D VAE mean?', '3D VAE को "3D" को अर्थ के हो?', '3D VAE 里的 “3D” 是什么意思？'],
        [['It makes 3D glasses work', 'It compresses width, height AND time', 'It has 3 layers', 'It only works for 3-second videos'], ['3D चस्मा चलाउँछ', 'चौडाइ, उचाइ र समय तीनै खुम्च्याउँछ', 'यसमा ३ तह छन्', '३ सेकेन्डको भिडियोमा मात्र चल्छ'], ['让 3D 眼镜能用', '同时压缩宽度、高度和时间', '它有 3 层', '只适用于 3 秒的视频']], 1,
        ['Video has a time dimension too; neighbouring frames are similar, so time can be compressed.', 'भिडियोमा समयको आयाम पनि हुन्छ; छिमेकी frame उस्तै हुन्छन्, त्यसैले समय खुम्च्याउन सकिन्छ।', '视频还有时间维度；相邻帧很相似，所以时间也能压缩。']],
      [['Why is making a video harder than making one picture?', 'एउटा चित्रभन्दा भिडियो बनाउन किन गाह्रो?', '为什么生成视频比生成一张图难？'],
        [['Videos have no colours', 'Videos cannot use prompts', 'All frames must stay consistent with each other and there is far more data', 'It is not harder'], ['भिडियोमा रङ हुँदैन', 'भिडियोले prompt प्रयोग गर्न सक्दैन', 'सबै frame एकअर्कासँग मिल्नुपर्छ र डाटा धेरै बढी हुन्छ', 'गाह्रो छैन'], ['视频没有颜色', '视频不能用提示词', '所有帧必须彼此一致，而且数据量大得多', '并不更难']], 2,
        ['Hundreds of frames must show the same people and objects moving smoothly — a huge amount of numbers to keep in agreement.', 'सयौँ frame ले उही मान्छे र वस्तु सहज रूपमा चलेको देखाउनुपर्छ — मिलाइराख्नुपर्ने धेरै ठूलो संख्याका अंक।', '几百帧必须展示同样的人和物体流畅地移动——要保持一致的数字多得惊人。']],
      [['In a Diffusion Transformer, what lets one part of the video "see" the other parts?', 'Diffusion Transformer मा भिडियोको एउटा भागलाई अरू भाग "हेर्न" के ले दिन्छ?', '在扩散 Transformer 中，是什么让视频的一部分“看到”其他部分？'],
        [['Attention', 'Max pooling', 'A decision tree', 'The seed'], ['Attention', 'Max pooling', 'Decision tree', 'Seed'], ['注意力', '最大池化', '决策树', 'seed']], 0,
        ['Attention connects every patch with every other patch, across space and time.', 'Attention ले हरेक patch लाई ठाउँ र समयभरि अरू हरेक patch सँग जोड्छ।', '注意力把每个小块与其他所有小块在空间和时间上联系起来。']],
      [['"Image-to-video" (I2V) means…', '"Image-to-video" (I2V) को अर्थ…', '“图生视频”（I2V）的意思是……'],
        [['Turning a video into a photo', 'Making a slideshow', 'Adding subtitles', 'Starting from a photo and making it move'], ['भिडियोलाई फोटो बनाउने', 'स्लाइडसो बनाउने', 'सबटाइटल थप्ने', 'फोटोबाट सुरु गरेर त्यसलाई चलाउने'], ['把视频变成照片', '做幻灯片', '加字幕', '从一张照片开始，让它动起来']], 3,
        ['The photo fixes how the first frame looks; the model invents the movement.', 'फोटोले पहिलो frame कस्तो देखिन्छ तय गर्छ; मोडेलले चाल बनाउँछ।', '照片决定第一帧的样子，模型负责创造动作。']],
    ],
  });

  // ======================================================================
  // 3. OBJECT DETECTION & TRACKING
  // ======================================================================
  LESSONS.push({
    id: 'object-detection', minutes: 25,
    title: T('Object Detection, Segmentation & Tracking', 'वस्तु पहिचान, Segmentation र Tracking', '目标检测、分割与跟踪'),
    intro: T('Traffic cameras counting cars, phones finding faces, robots picking fruit — all use <b>object detection</b>: finding WHAT is in a picture and WHERE. Today\'s favourites are <b>YOLO</b> (fast detection) and <b>SAM 2</b> (cut out any object, even in video).',
      'कार गन्ने ट्राफिक क्यामेरा, अनुहार खोज्ने फोन, फल टिप्ने रोबोट — सबैले <b>object detection</b> प्रयोग गर्छन्: चित्रमा के छ र कहाँ छ पत्ता लगाउने। आजका मनपर्ने मोडेल <b>YOLO</b> (छिटो पहिचान) र <b>SAM 2</b> (भिडियोमा समेत जुनसुकै वस्तु काटेर छुट्याउने) हुन्।',
      '数车的交通摄像头、找人脸的手机、摘水果的机器人——都在用<b>目标检测</b>：找出图里有什么、在哪里。当今最受欢迎的是 <b>YOLO</b>（快速检测）和 <b>SAM 2</b>（抠出任何物体，视频里也行）。'),
    idea: T('Classification says "there is a cat". Detection says "there is a cat <b>here</b>" and draws a box. Segmentation colours the exact cat-shaped pixels. Tracking follows the same cat from frame to frame and gives it an ID number.',
      'Classification ले "बिरालो छ" भन्छ। Detection ले "बिरालो <b>यहाँ</b> छ" भनेर बाकस कोर्छ। Segmentation ले बिरालोको आकारका ठ्याक्कै pixel रङ्ग्याउँछ। Tracking ले उही बिरालोलाई frame देखि frame पछ्याएर ID नम्बर दिन्छ।',
      '分类说“有一只猫”。检测说“猫在<b>这里</b>”并画一个框。分割把猫形状的像素精确地涂上颜色。跟踪在一帧帧之间追踪同一只猫，并给它一个编号。'),
    steps: [
      [T('See', 'हेर्ने', '看'), T('A CNN or Vision Transformer (ViT) turns the image into feature maps — grids that say "edge here, fur there, wheel here".', 'CNN वा Vision Transformer (ViT) ले चित्रलाई feature map मा बदल्छ — "यहाँ किनारा, त्यहाँ रौँ, यहाँ पाङ्ग्रा" भन्ने जालो।', 'CNN 或视觉 Transformer（ViT）把图片变成特征图——标出“这里有边缘、那里有毛、这里有轮子”的网格。')],
      [T('Guess boxes', 'बाकस अनुमान गर्ने', '猜框'), T('For many places, the model guesses a box (x, y, width, height), a class ("car") and a confidence score.', 'धेरै ठाउँका लागि मोडेलले बाकस (x, y, चौडाइ, उचाइ), class ("कार") र confidence अंक अनुमान गर्छ।', '模型在很多位置猜一个框（x、y、宽、高）、一个类别（“汽车”）和一个置信度。')],
      [T('Clean up (NMS)', 'सफा गर्ने (NMS)', '清理（NMS）'), T('Many boxes overlap on the same object. Non-Maximum Suppression keeps the best one and removes the rest.', 'उही वस्तुमा धेरै बाकस खप्टिन्छन्। Non-Maximum Suppression ले सबैभन्दा राम्रो राखेर बाँकी हटाउँछ।', '同一个物体上会重叠很多框。非极大值抑制保留最好的那个，去掉其余的。')],
      [T('Track', 'Track गर्ने', '跟踪'), T('In video, each box is matched with the box it overlaps most in the next frame, so every object keeps its ID.', 'भिडियोमा हरेक बाकसलाई अर्को frame मा सबैभन्दा बढी खप्टिने बाकससँग मिलाइन्छ, त्यसैले हरेक वस्तुको ID रहन्छ।', '在视频中，每个框与下一帧里重叠最多的框配对，这样每个物体都保持自己的编号。')],
    ],
    words: [
      ['Bounding box', T('A rectangle around an object: (x1, y1, x2, y2).', 'वस्तु वरिपरिको आयत: (x1, y1, x2, y2)।', '围住物体的矩形：(x1, y1, x2, y2)。')],
      ['IoU', T('Intersection over Union: how much two boxes overlap, from 0 (not at all) to 1 (identical).', 'Intersection over Union: दुई बाकस कति खप्टिन्छन्, 0 (पटक्कै नखप्टिने) देखि 1 (उस्तै) सम्म।', '交并比：两个框重叠多少，从 0（完全不重叠）到 1（完全相同）。')],
      ['NMS', T('Non-Maximum Suppression: remove duplicate boxes on the same object.', 'Non-Maximum Suppression: उही वस्तुमा भएका दोहोरो बाकस हटाउने।', '非极大值抑制：去掉同一物体上的重复框。')],
      ['Segmentation', T('Labelling every pixel: the exact outline of each object.', 'हरेक pixel मा लेबल: हरेक वस्तुको ठ्याक्कै रूपरेखा।', '给每个像素打标签：每个物体的精确轮廓。')],
      ['ViT', T('Vision Transformer: cuts the image into patches and uses attention, like a language model.', 'Vision Transformer: चित्रलाई patch मा काटेर भाषा मोडेल जस्तै attention प्रयोग गर्छ।', '视觉 Transformer：把图片切成小块并使用注意力，就像语言模型。')],
      ['mAP', T('The usual score for detectors (higher is better): it combines precision and recall over all classes.', 'Detector को सामान्य अंक (जति बढी उति राम्रो): सबै class को precision र recall मिलाउँछ।', '检测器的常用分数（越高越好）：综合所有类别的精确率和召回率。')],
    ],
    models: [
      ['YOLO', 'https://github.com/ultralytics/ultralytics', 'Ultralytics (and others)', T('"You Only Look Once": one fast pass finds all objects — real-time on phones and cameras. Also does segmentation, pose and tracking.', '"You Only Look Once": एउटै छिटो पासमा सबै वस्तु भेट्छ — फोन र क्यामेरामा वास्तविक समयमै। Segmentation, pose र tracking पनि गर्छ।', '“你只看一次”：一次快速计算找出所有物体——在手机和摄像头上实时运行。还能做分割、姿态和跟踪。')],
      ['SAM 2', 'https://github.com/facebookresearch/sam2', 'Meta', T('"Segment Anything": click on any object and it cuts it out — then follows it through a whole video.', '"Segment Anything": जुनसुकै वस्तुमा क्लिक गर्नुहोस् र यसले काटेर छुट्याउँछ — अनि पूरै भिडियोमा पछ्याउँछ।', '“分割一切”：点击任何物体就能把它抠出来——还能在整段视频里跟踪它。')],
    ],
    tryText: T('Every detector needs two small tools: <b>IoU</b> (how much two boxes overlap) and <b>NMS</b> (remove duplicate boxes). This code builds both, draws the result, and then tracks the objects into the next frame.', 'हरेक detector लाई दुई साना औजार चाहिन्छ: <b>IoU</b> (दुई बाकस कति खप्टिन्छन्) र <b>NMS</b> (दोहोरो बाकस हटाउने)। यो कोडले दुवै बनाउँछ, नतिजा कोर्छ, अनि वस्तुलाई अर्को frame मा track गर्छ।', '每个检测器都需要两个小工具：<b>IoU</b>（两个框重叠多少）和 <b>NMS</b>（去掉重复的框）。这段代码实现这两个工具，画出结果，再把物体跟踪到下一帧。'),
    code: { title: T('IoU, NMS and tracking', 'IoU, NMS र tracking', 'IoU、NMS 和跟踪'), code: py`
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

def iou(a, b):
    """How much two boxes overlap: 0 = not at all, 1 = exactly the same. Box = (x1, y1, x2, y2)"""
    x1, y1 = max(a[0], b[0]), max(a[1], b[1])
    x2, y2 = min(a[2], b[2]), min(a[3], b[3])
    inter = max(0, x2 - x1) * max(0, y2 - y1)
    area_a = (a[2] - a[0]) * (a[3] - a[1])
    area_b = (b[2] - b[0]) * (b[3] - b[1])
    return inter / (area_a + area_b - inter)

# A detector makes many overlapping guesses, each with a confidence score
boxes = [(10, 10, 50, 60), (12, 14, 52, 62), (60, 20, 95, 70), (58, 18, 93, 66), (30, 70, 45, 90)]
scores = [0.95, 0.80, 0.90, 0.60, 0.30]

# Non-Maximum Suppression: keep the best box, drop guesses that overlap it too much
keep = []
for i in np.argsort(scores)[::-1]:          # best score first
    if scores[i] < 0.5:
        continue                              # too unsure
    if all(iou(boxes[i], boxes[k]) < 0.5 for k in keep):
        keep.append(int(i))
print("Kept boxes:", keep)

fig, ax = plt.subplots(figsize=(5, 5))
for i, b in enumerate(boxes):
    good = i in keep
    color = "green" if good else "gray"
    ax.add_patch(patches.Rectangle((b[0], b[1]), b[2] - b[0], b[3] - b[1], fill=False,
                                   lw=3 if good else 1, ls="-" if good else "--", color=color))
    ax.text(b[0], b[1] - 2, f"{scores[i]:.2f}", color=color)
ax.set_xlim(0, 100)
ax.set_ylim(100, 0)
ax.set_title("Green = kept, grey = removed by NMS")
plt.show()

# TRACKING: in the next frame, match each object with the box it overlaps most
next_frame = [(63, 22, 98, 72), (13, 12, 53, 62)]
for k in keep:
    best = max(range(len(next_frame)), key=lambda j: iou(boxes[k], next_frame[j]))
    print(f"Object {k} -> box {best} in the next frame (IoU {iou(boxes[k], next_frame[best]):.2f})")
` },
    playground: [T('Our Playground runs a real detector (DETR, a CNN + Transformer) on your own photos — right in your browser.', 'हाम्रो Playground ले तपाईंकै फोटोमा वास्तविक detector (DETR, CNN + Transformer) चलाउँछ — तपाईंकै ब्राउजरमा।', '我们的游乐场能在你自己的照片上运行真正的检测器（DETR，CNN + Transformer）——就在你的浏览器里。'), [['detect', T('📦 Find every object', '📦 हरेक वस्तु खोज्नुहोस्', '📦 找出所有物体')], ['image', T('🖼️ What is in this photo?', '🖼️ यो फोटोमा के छ?', '🖼️ 这张照片里有什么？')]]],
    platforms: [
      ['<a href="#/models/detect">ML Tutor · Model Playground</a>', T('Detect objects in your own photos, no install, works offline after the first download.', 'आफ्नै फोटोमा वस्तु पहिचान, इन्स्टल चाहिँदैन, पहिलो डाउनलोडपछि अफलाइन चल्छ।', '在你自己的照片中检测物体，无需安装，首次下载后可离线使用。'), COST.here],
      [link('Ultralytics YOLO docs', 'https://docs.ultralytics.com'), T('Step-by-step guides: detect, segment and track with 3 lines of Python; train YOLO on your own photos.', 'चरणबद्ध गाइड: Python का ३ लाइनमा detect, segment र track; आफ्नै फोटोमा YOLO तालिम।', '分步指南：3 行 Python 完成检测、分割和跟踪；用自己的照片训练 YOLO。'), COST.free],
      [link('Roboflow Universe', 'https://universe.roboflow.com'), T('Thousands of free labelled datasets (cars, crops, helmets…) and tools to label your own photos.', 'हजारौँ निःशुल्क लेबल गरिएका डाटासेट (कार, बाली, हेल्मेट…) र आफ्नै फोटो लेबल गर्ने औजार।', '成千上万免费的已标注数据集（汽车、庄稼、头盔……），以及给自己照片打标签的工具。'), COST.freeAcc],
      P.spaces('SAM 2'),
      P.colab,
    ],
    mission: [
      T('Open the <a href="#/models/detect">📦 detector</a> in our Playground and upload a photo of a street or a classroom. Move the confidence slider and watch boxes appear and disappear.', 'हाम्रो Playground को <a href="#/models/detect">📦 detector</a> खोलेर सडक वा कक्षाकोठाको फोटो अपलोड गर्नुहोस्। Confidence स्लाइडर सारेर बाकस देखिने र हराउने हेर्नुहोस्।', '打开我们游乐场的 <a href="#/models/detect">📦 检测器</a>，上传一张街道或教室的照片。拖动置信度滑块，看框出现又消失。'),
      T('In the code above, change the NMS threshold from 0.5 to 0.9. What happens to the grey boxes? Why?', 'माथिको कोडमा NMS threshold 0.5 बाट 0.9 बनाउनुहोस्। खैरो बाकसलाई के हुन्छ? किन?', '在上面的代码里，把 NMS 阈值从 0.5 改成 0.9。灰色框会怎样？为什么？'),
      T('In Google Colab, run <code>!pip install ultralytics</code>, upload a photo, then run <code>from ultralytics import YOLO</code> and <code>YOLO("yolo11n.pt")("your_photo.jpg")[0].show()</code>.', 'Google Colab मा <code>!pip install ultralytics</code> चलाउनुहोस्, फोटो अपलोड गर्नुहोस्, अनि <code>from ultralytics import YOLO</code> र <code>YOLO("yolo11n.pt")("your_photo.jpg")[0].show()</code> चलाउनुहोस्।', '在 Google Colab 里运行 <code>!pip install ultralytics</code>，上传一张照片，然后运行 <code>from ultralytics import YOLO</code> 和 <code>YOLO("yolo11n.pt")("your_photo.jpg")[0].show()</code>。'),
      T('Project idea: download a "helmet" dataset from Roboflow Universe and train YOLO to check if motorbike riders wear helmets.', 'प्रोजेक्ट विचार: Roboflow Universe बाट "helmet" डाटासेट डाउनलोड गरेर मोटरसाइकल चालकले हेल्मेट लगाएका छन् कि छैनन् जाँच्न YOLO तालिम दिनुहोस्।', '项目想法：从 Roboflow Universe 下载“头盔”数据集，训练 YOLO 检查摩托车骑手是否戴头盔。'),
    ],
    safety: T('Cameras that recognise and follow people can invade privacy. Use detection for safety and helpful jobs, tell people when cameras are used, and never track individuals without a lawful reason and their knowledge.', 'मानिसलाई चिन्ने र पछ्याउने क्यामेराले गोपनीयता हनन गर्न सक्छ। सुरक्षा र उपयोगी कामका लागि detection प्रयोग गर्नुहोस्, क्यामेरा प्रयोग हुँदा मानिसलाई जानकारी दिनुहोस्, र कानुनी कारण र जानकारी बिना व्यक्तिलाई कहिल्यै track नगर्नुहोस्।', '能识别并跟踪人的摄像头可能侵犯隐私。把检测用于安全和有益的工作，使用摄像头时告知他人，没有合法理由并在对方知情之前，绝不跟踪个人。'),
    remember: T('Detection = what + where (boxes); segmentation = exact pixels; tracking = the same object across frames.', 'Detection = के + कहाँ (बाकस); segmentation = ठ्याक्कै pixel; tracking = frame हरूभरि उही वस्तु।', '检测 = 是什么 + 在哪里（框）；分割 = 精确像素；跟踪 = 跨帧的同一物体。'),
    quiz: [
      [['Two boxes are exactly the same. What is their IoU?', 'दुई बाकस ठ्याक्कै उस्तै छन्। तिनको IoU कति?', '两个框完全相同，它们的 IoU 是多少？'],
        ['0', '0.5', '1', '2'], 2,
        ['Overlap ÷ total area = the whole box ÷ the whole box = 1.', 'खप्टिएको ÷ जम्मा क्षेत्रफल = पूरै बाकस ÷ पूरै बाकस = 1।', '重叠面积 ÷ 总面积 = 整个框 ÷ 整个框 = 1。']],
      [['What does Non-Maximum Suppression (NMS) do?', 'Non-Maximum Suppression (NMS) ले के गर्छ?', '非极大值抑制（NMS）做什么？'],
        [['Removes duplicate boxes on the same object, keeping the most confident one', 'Makes the image brighter', 'Adds more boxes', 'Trains the model'], ['उही वस्तुमा भएका दोहोरो बाकस हटाएर सबैभन्दा पक्का एउटा राख्छ', 'चित्र उज्यालो बनाउँछ', 'थप बाकस जोड्छ', 'मोडेल तालिम गर्छ'], ['去掉同一物体上的重复框，保留最有把握的那个', '让图片更亮', '增加更多框', '训练模型']], 0,
        ['Detectors produce many overlapping guesses; NMS leaves one clean box per object.', 'Detector ले धेरै खप्टिने अनुमान दिन्छ; NMS ले हरेक वस्तुमा एउटा सफा बाकस छोड्छ।', '检测器会产生很多重叠的猜测；NMS 给每个物体留下一个干净的框。']],
      [['You click on a dog in a video and want it cut out in every frame. Which model fits best?', 'भिडियोमा कुकुरमा क्लिक गरेर हरेक frame मा त्यसलाई काटेर छुट्याउन चाहनुहुन्छ। कुन मोडेल उत्तम?', '你在视频里点了一只狗，想在每一帧都把它抠出来。哪个模型最合适？'],
        [['Linear regression', 'SAM 2', 'Naive Bayes', 'k-means'], ['Linear regression', 'SAM 2', 'Naive Bayes', 'k-means'], ['线性回归', 'SAM 2', '朴素贝叶斯', 'k 均值']], 1,
        ['SAM 2 segments any object you point at and follows it through the video.', 'SAM 2 ले तपाईंले देखाएको जुनसुकै वस्तु segment गर्छ र भिडियोभरि पछ्याउँछ।', 'SAM 2 能分割你指定的任何物体，并在整段视频中跟踪它。']],
      [['Why is YOLO popular for cameras and phones?', 'YOLO क्यामेरा र फोनका लागि किन लोकप्रिय?', '为什么 YOLO 在摄像头和手机上很受欢迎？'],
        [['It needs no data', 'It only works on cats', 'It writes captions', 'It finds all objects in one fast pass — real-time'], ['डाटा चाहिँदैन', 'बिरालोमा मात्र चल्छ', 'विवरण लेख्छ', 'एउटै छिटो पासमा सबै वस्तु भेट्छ — वास्तविक समयमा'], ['它不需要数据', '它只认猫', '它会写说明文字', '一次快速计算就找出所有物体——实时']], 3,
        ['"You Only Look Once": the whole image is processed in a single pass, fast enough for live video.', '"You Only Look Once": पूरै चित्र एउटै पासमा प्रशोधन हुन्छ, लाइभ भिडियोका लागि पर्याप्त छिटो।', '“你只看一次”：整张图一次处理完，快到能处理实时视频。']],
    ],
  });

  // ======================================================================
  // 4. SPEECH RECOGNITION
  // ======================================================================
  LESSONS.push({
    id: 'speech-recognition', minutes: 20,
    title: T('Speech Recognition (Speech-to-Text)', 'आवाज पहिचान (Speech-to-Text)', '语音识别（语音转文字）'),
    intro: T('Voice typing, YouTube subtitles, meeting notes and voice assistants all turn speech into text. The leading models are <b>Whisper</b>, <b>Wav2Vec 2.0</b> and <b>Parakeet</b>, built as <b>encoder-decoder</b> Transformers or <b>Conformers</b>.',
      'भ्वाइस टाइपिङ, YouTube सबटाइटल, बैठकका नोट र भ्वाइस असिस्टेन्ट सबैले आवाजलाई अक्षरमा बदल्छन्। अग्रणी मोडेल <b>Whisper</b>, <b>Wav2Vec 2.0</b> र <b>Parakeet</b> हुन्, जो <b>encoder-decoder</b> Transformer वा <b>Conformer</b> को रूपमा बनेका छन्।',
      '语音输入、YouTube 字幕、会议记录和语音助手都在把语音变成文字。领先的模型有 <b>Whisper</b>、<b>Wav2Vec 2.0</b> 和 <b>Parakeet</b>，它们是<b>编码器-解码器</b> Transformer 或 <b>Conformer</b>。'),
    idea: T('Think of a translator with headphones. First they <b>listen</b> carefully to the whole sentence (the encoder). Then they <b>write</b> it down word by word, checking what they heard (the decoder). The model does not hear sound like us — it looks at a <b>picture of the sound</b> called a spectrogram.',
      'हेडफोन लगाएको अनुवादकको कल्पना गर्नुहोस्। पहिले उनले पूरै वाक्य ध्यानले <b>सुन्छन्</b> (encoder)। अनि सुनेको जाँच्दै शब्द-शब्द गरी <b>लेख्छन्</b> (decoder)। मोडेलले हामीजस्तै आवाज सुन्दैन — यसले spectrogram भनिने <b>आवाजको चित्र</b> हेर्छ।',
      '想象一位戴着耳机的翻译。他先认真<b>听</b>完整句话（编码器），再一边核对听到的内容，一边逐词<b>写</b>下来（解码器）。模型听声音的方式和我们不同——它看的是一张叫频谱图的<b>声音的图片</b>。'),
    steps: [
      [T('Record', 'रेकर्ड गर्ने', '录音'), T('A microphone measures the sound wave 16,000 times per second.', 'माइक्रोफोनले ध्वनि तरंगलाई प्रति सेकेन्ड १६,००० पटक नाप्छ।', '麦克风每秒测量声波 16000 次。')],
      [T('Make a spectrogram', 'Spectrogram बनाउने', '生成频谱图'), T('The sound is cut into 25 ms windows; for each window we measure which pitches are loud. The result is an image.', 'आवाजलाई २५ ms का window मा काटिन्छ; हरेक window मा कुन स्वर चर्को छ नापिन्छ। नतिजा एउटा चित्र हो।', '把声音切成 25 毫秒的窗口，测量每个窗口里哪些音高响亮，结果就是一张图。')],
      [T('Encode', 'Encode गर्ने', '编码'), T('The encoder (a Transformer or Conformer = convolution + attention) reads the whole spectrogram and understands the sounds.', 'Encoder (Transformer वा Conformer = convolution + attention) ले पूरै spectrogram पढेर आवाज बुझ्छ।', '编码器（Transformer 或 Conformer = 卷积 + 注意力）读完整张频谱图，理解其中的声音。')],
      [T('Decode to text', 'अक्षरमा decode गर्ने', '解码成文字'), T('The decoder writes the text one token at a time, like a language model listening to the encoder.', 'Decoder ले encoder सुन्दै भाषा मोडेल जस्तै एकपटकमा एउटा token लेख्छ।', '解码器像一个听着编码器的语言模型，一次写一个 token。')],
    ],
    words: [
      ['STT / ASR', T('Speech-to-text / automatic speech recognition — the same thing.', 'Speech-to-text / automatic speech recognition — एउटै कुरा।', '语音转文字 / 自动语音识别——是一回事。')],
      ['Sample rate', T('How many times per second sound is measured (16 kHz = 16,000).', 'प्रति सेकेन्ड आवाज कति पटक नापिन्छ (16 kHz = १६,०००)।', '每秒测量声音的次数（16 kHz = 16000 次）。')],
      ['Spectrogram', T('A picture of sound: time left→right, pitch bottom→top, loudness = brightness.', 'आवाजको चित्र: समय बायाँ→दायाँ, स्वर तल→माथि, चर्कोपन = उज्यालोपन।', '声音的图片：时间从左到右，音高从下到上，响度 = 亮度。')],
      ['Encoder-decoder', T('One network understands the input, another writes the output.', 'एउटा नेटवर्कले इनपुट बुझ्छ, अर्कोले आउटपुट लेख्छ।', '一个网络理解输入，另一个写出输出。')],
      ['Conformer', T('Convolution (good at short sounds) + Transformer (good at long context). Used by Parakeet.', 'Convolution (छोटो आवाजमा राम्रो) + Transformer (लामो सन्दर्भमा राम्रो)। Parakeet ले प्रयोग गर्छ।', '卷积（擅长短声音）+ Transformer（擅长长上下文）。Parakeet 使用它。')],
      ['WER', T('Word Error Rate: the share of words that are wrong (lower is better).', 'Word Error Rate: गलत शब्दको भाग (जति कम उति राम्रो)।', '词错误率：错词所占的比例（越低越好）。')],
    ],
    models: [
      ['Whisper', 'https://github.com/openai/whisper', 'OpenAI', T('Trained on many languages (Nepali and Chinese too); also translates speech into English. Sizes from tiny to large.', 'धेरै भाषामा तालिम (नेपाली र चिनियाँ पनि); आवाजलाई अङ्ग्रेजीमा अनुवाद पनि गर्छ। tiny देखि large सम्मका साइज।', '用多种语言训练（包括尼泊尔语和中文）；还能把语音翻译成英文。从 tiny 到 large 多种大小。')],
      ['Wav2Vec 2.0', 'https://huggingface.co/facebook/wav2vec2-base-960h', 'Meta', T('Learned from lots of UN-labelled audio first, so it needs little labelled data — great for low-resource languages.', 'पहिले धेरै लेबल नभएको आवाजबाट सिक्यो, त्यसैले थोरै लेबल डाटा चाहिन्छ — कम स्रोत भएका भाषाका लागि उत्तम।', '先从大量未标注的音频中学习，所以只需少量标注数据——非常适合资源少的语言。')],
      ['Parakeet', 'https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2', 'NVIDIA', T('A very fast and accurate Conformer model for English; tops speed and accuracy leaderboards.', 'अङ्ग्रेजीका लागि धेरै छिटो र सही Conformer मोडेल; गति र शुद्धताको leaderboard मा अगाडि।', '速度非常快、准确率很高的英文 Conformer 模型，在速度和准确率排行榜上名列前茅。')],
    ],
    tryText: T('Whisper never "hears" sound — it reads a spectrogram. This code creates a pretend sound (a low hum, a high whistle, then both), and turns it into the same kind of picture Whisper reads, using 25 ms windows every 10 ms.', 'Whisper ले कहिल्यै आवाज "सुन्दैन" — spectrogram पढ्छ। यो कोडले नक्कली आवाज (कम गुनगुनाहट, उच्च सिट्टी, अनि दुवै) बनाउँछ, र हरेक १० ms मा २५ ms को window प्रयोग गरेर Whisper ले पढ्ने उस्तै चित्र बनाउँछ।', 'Whisper 从不“听”声音——它读的是频谱图。这段代码造一段假声音（低沉的嗡嗡声、高音口哨，然后两者一起），再用每 10 毫秒一个、长 25 毫秒的窗口，把它变成和 Whisper 读的一样的图片。'),
    code: { title: T('Sound → spectrogram', 'आवाज → spectrogram', '声音 → 频谱图'), code: py`
import numpy as np
import matplotlib.pyplot as plt

sr = 16000                                   # 16,000 numbers per second (what Whisper uses)
t = np.arange(0, 1.5, 1 / sr)

# A pretend sound: a low hum, then a high whistle, then both together
hum = np.sin(2 * np.pi * 300 * t)
whistle = np.sin(2 * np.pi * 1200 * t)
both = np.sin(2 * np.pi * 300 * t) + np.sin(2 * np.pi * 2000 * t)
audio = np.where(t < 0.5, hum, np.where(t < 1.0, whistle, both))
audio = audio + np.random.default_rng(0).normal(0, 0.2, len(t))     # a little background noise

# Spectrogram: cut the sound into short windows and measure which pitches are loud in each
win, hop = 400, 160                          # 25 ms windows, one every 10 ms (like Whisper)
frames = np.array([audio[i:i + win] * np.hanning(win) for i in range(0, len(audio) - win, hop)])
spec = np.log(np.abs(np.fft.rfft(frames, axis=1)).T + 1e-6)          # rows = pitch, columns = time

fig, ax = plt.subplots(2, 1, figsize=(9, 5))
ax[0].plot(t[:2000], audio[:2000])
ax[0].set_title("The raw sound wave (first 0.12 s)")
ax[1].imshow(spec, origin="lower", aspect="auto", cmap="magma", extent=[0, t[-1], 0, sr / 2])
ax[1].set_title("Spectrogram: this 'picture of sound' is what Whisper reads")
ax[1].set_xlabel("time (s)")
ax[1].set_ylabel("pitch (Hz)")
plt.tight_layout()
plt.show()
print(f"{len(audio):,} sound numbers became a {spec.shape[0]} x {spec.shape[1]} picture")
` },
    playground: [T('Our Playground runs <b>Whisper</b> in your browser: record your own voice in English, नेपाली or 中文 and watch it become text.', 'हाम्रो Playground ले तपाईंको ब्राउजरमा <b>Whisper</b> चलाउँछ: English, नेपाली वा 中文 मा आफ्नै आवाज रेकर्ड गरेर अक्षर बनेको हेर्नुहोस्।', '我们的游乐场在你的浏览器里运行 <b>Whisper</b>：用英文、尼泊尔语或中文录下自己的声音，看它变成文字。'), [['speech', T('🎙️ Speech to text (Whisper)', '🎙️ आवाजबाट अक्षर (Whisper)', '🎙️ 语音转文字（Whisper）')]]],
    platforms: [
      ['<a href="#/models/speech">ML Tutor · Model Playground</a>', T('Record yourself and transcribe with Whisper — private, in your browser.', 'आफ्नो आवाज रेकर्ड गरेर Whisper ले लेख्नुहोस् — निजी, तपाईंको ब्राउजरमा।', '录下自己的声音，用 Whisper 转写——在浏览器里，保护隐私。'), COST.here],
      P.spaces('whisper'),
      [link('Whisper (GitHub)', 'https://github.com/openai/whisper'), T('Install with pip and transcribe any audio file in one line; works on a normal laptop with the small models.', 'pip ले इन्स्टल गरेर एक लाइनमा जुनसुकै अडियो फाइल लेख्नुहोस्; साना मोडेल सामान्य ल्यापटपमै चल्छन्।', '用 pip 安装，一行命令转写任何音频文件；小模型在普通笔记本上就能跑。'), COST.local],
      P.colab,
      P.kaggle,
    ],
    mission: [
      T('Open the <a href="#/models/speech">🎙️ Whisper card</a>, choose नेपाली, and read one sentence aloud. Then try English. Which language has fewer mistakes? Why might that be?', '<a href="#/models/speech">🎙️ Whisper कार्ड</a> खोलेर नेपाली छान्नुहोस् र एउटा वाक्य ठूलो स्वरमा पढ्नुहोस्। अनि अङ्ग्रेजी प्रयास गर्नुहोस्। कुन भाषामा कम गल्ती हुन्छ? किन होला?', '打开 <a href="#/models/speech">🎙️ Whisper 卡片</a>，选择尼泊尔语，大声读一句话。再试试英文。哪种语言错误更少？可能是为什么？'),
      T('Count the Word Error Rate yourself: wrong words ÷ total words.', 'Word Error Rate आफैँ गन्नुहोस्: गलत शब्द ÷ जम्मा शब्द।', '自己算词错误率：错误的词数 ÷ 总词数。'),
      T('Record with a fan or traffic in the background. What happens? This is why real systems are trained on noisy audio.', 'पृष्ठभूमिमा पंखा वा ट्राफिक भएको बेला रेकर्ड गर्नुहोस्। के हुन्छ? त्यसैले वास्तविक प्रणाली noise भएको अडियोमा तालिम गरिन्छ।', '在有风扇或交通噪声的背景下录音，会怎样？这就是为什么真实系统要用带噪声的音频训练。'),
      T('In the code above, change the whistle from 1200 to 4000 Hz. Where does the bright line move in the spectrogram?', 'माथिको कोडमा सिट्टीलाई 1200 बाट 4000 Hz बनाउनुहोस्। Spectrogram मा उज्यालो रेखा कहाँ सर्छ?', '在上面的代码里，把口哨从 1200 Hz 改成 4000 Hz。频谱图里的亮线移到哪里了？'),
    ],
    safety: T('Recordings contain private information. Ask before recording anyone, do not upload other people\'s voices to unknown websites, and remember that transcripts can be wrong — check before using them for anything important.', 'रेकर्डिङमा निजी जानकारी हुन्छ। कसैलाई रेकर्ड गर्नुअघि सोध्नुहोस्, अरूको आवाज अज्ञात वेबसाइटमा अपलोड नगर्नुहोस्, र लेखिएको पाठ गलत हुन सक्छ भन्ने सम्झनुहोस् — महत्त्वपूर्ण काममा प्रयोग गर्नुअघि जाँच्नुहोस्।', '录音包含隐私信息。录别人之前先征得同意，不要把别人的声音上传到不明网站，并记住转写可能出错——用于重要事情前要核对。'),
    remember: T('Speech recognition turns sound into a spectrogram picture, then an encoder-decoder writes the words.', 'आवाज पहिचानले आवाजलाई spectrogram चित्रमा बदल्छ, अनि encoder-decoder ले शब्द लेख्छ।', '语音识别先把声音变成频谱图，再由编码器-解码器写出文字。'),
    quiz: [
      [['What does Whisper actually "look at"?', 'Whisper ले वास्तवमा के "हेर्छ"?', 'Whisper 实际上“看”的是什么？'],
        [['The speaker\'s face', 'A spectrogram — a picture of the sound', 'The text on screen', 'The microphone brand'], ['बोल्नेको अनुहार', 'Spectrogram — आवाजको चित्र', 'स्क्रिनको अक्षर', 'माइक्रोफोनको ब्रान्ड'], ['说话人的脸', '频谱图——声音的图片', '屏幕上的文字', '麦克风的品牌']], 1,
        ['Sound is converted into a time × pitch image, which the encoder reads.', 'आवाजलाई समय × स्वरको चित्रमा बदलिन्छ, जसलाई encoder ले पढ्छ।', '声音被转换成时间 × 音高的图片，由编码器读取。']],
      [['In an encoder-decoder model, what does the decoder do?', 'Encoder-decoder मोडेलमा decoder ले के गर्छ?', '在编码器-解码器模型中，解码器做什么？'],
        [['Records the audio', 'Removes background noise', 'Writes the text one token at a time', 'Makes the spectrogram'], ['अडियो रेकर्ड गर्छ', 'पृष्ठभूमिको noise हटाउँछ', 'एकपटकमा एउटा token गरी अक्षर लेख्छ', 'Spectrogram बनाउँछ'], ['录音', '去除背景噪声', '一次一个 token 地写出文字', '生成频谱图']], 2,
        ['The encoder understands the sound; the decoder writes the words, like a language model.', 'Encoder ले आवाज बुझ्छ; decoder ले भाषा मोडेल जस्तै शब्द लेख्छ।', '编码器理解声音；解码器像语言模型一样写出文字。']],
      [['A transcript has 20 words and 2 are wrong. What is the Word Error Rate?', 'लेखिएको पाठमा २० शब्द छन् र २ गलत छन्। Word Error Rate कति?', '一段转写有 20 个词，错了 2 个。词错误率是多少？'],
        ['10%', '2%', '20%', '90%'], 0,
        ['2 ÷ 20 = 0.10 = 10%. Lower WER is better.', '2 ÷ 20 = 0.10 = १०%। कम WER राम्रो।', '2 ÷ 20 = 0.10 = 10%。词错误率越低越好。']],
      [['Why is Wav2Vec 2.0 useful for languages with little labelled data?', 'थोरै लेबल डाटा भएका भाषाका लागि Wav2Vec 2.0 किन उपयोगी?', '为什么 Wav2Vec 2.0 对标注数据少的语言很有用？'],
        [['It does not need any audio', 'It only works in English', 'It is the biggest model', 'It first learns from lots of unlabelled audio, then needs only a little labelled data'], ['कुनै अडियो चाहिँदैन', 'अङ्ग्रेजीमा मात्र चल्छ', 'सबैभन्दा ठूलो मोडेल हो', 'पहिले धेरै लेबल नभएको अडियोबाट सिक्छ, अनि थोरै लेबल डाटा मात्र चाहिन्छ'], ['它不需要任何音频', '它只适用于英文', '它是最大的模型', '它先从大量未标注音频中学习，之后只需要少量标注数据']], 3,
        ['Self-supervised pre-training on raw audio means fewer hand-written transcripts are needed.', 'कच्चा अडियोमा self-supervised पूर्व-तालिमले गर्दा हातले लेखिएका थोरै पाठ मात्र चाहिन्छ।', '在原始音频上做自监督预训练，意味着需要的人工转写更少。']],
    ],
  });

  // ======================================================================
  // 5. VOICE SYNTHESIS (TTS)
  // ======================================================================
  LESSONS.push({
    id: 'text-to-speech', minutes: 20,
    title: T('Voice & Speech Synthesis (Text-to-Speech)', 'आवाज सिर्जना (Text-to-Speech)', '语音合成（文字转语音）'),
    intro: T('Text-to-speech (TTS) reads text aloud in a natural human voice — for audiobooks, navigation, screen readers for blind people, and AI teachers like ours. Modern open models include <b>Kokoro</b>, <b>Orpheus</b> and <b>Chatterbox</b>.',
      'Text-to-speech (TTS) ले अक्षरलाई प्राकृतिक मानव आवाजमा पढ्छ — अडियोबुक, नेभिगेसन, दृष्टिविहीनका लागि स्क्रिन रिडर, र हाम्रो जस्ता AI शिक्षकका लागि। आधुनिक खुला मोडेलमा <b>Kokoro</b>, <b>Orpheus</b> र <b>Chatterbox</b> पर्छन्।',
      '文字转语音（TTS）用自然的人声朗读文字——用于有声书、导航、盲人读屏软件，以及像我们这样的 AI 老师。现代开源模型有 <b>Kokoro</b>、<b>Orpheus</b> 和 <b>Chatterbox</b>。'),
    idea: T('Speech recognition turns sound into text. TTS is the reverse: text → sound. It is like a singer reading sheet music: first decide <b>how</b> each word should sound (pitch, speed, feeling), then actually <b>make</b> the sound wave.',
      'आवाज पहिचानले आवाजलाई अक्षर बनाउँछ। TTS उल्टो हो: अक्षर → आवाज। यो स्वरलिपि पढ्ने गायक जस्तै हो: पहिले हरेक शब्द <b>कसरी</b> बज्नुपर्छ (स्वर, गति, भावना) तय गर्ने, अनि साँच्चै ध्वनि तरंग <b>बनाउने</b>।',
      '语音识别把声音变成文字，TTS 正好相反：文字 → 声音。就像歌手看乐谱：先决定每个词<b>怎么</b>发音（音高、速度、感情），再真正<b>发出</b>声波。'),
    steps: [
      [T('Text to sounds', 'अक्षरबाट उच्चारण', '文字转音素'), T('The text is turned into phonemes (sound units): "cat" → k-æ-t. Numbers and short forms are expanded ("Dr." → "Doctor").', 'अक्षरलाई phoneme (उच्चारण एकाइ) मा बदलिन्छ: "cat" → k-æ-t। अंक र छोटा रूप फैलाइन्छ ("Dr." → "Doctor")।', '文字被转换成音素（发音单位）："cat" → k-æ-t。数字和缩写会被展开（“Dr.” → “Doctor”）。')],
      [T('Plan the voice', 'आवाजको योजना', '规划声音'), T('The model predicts how it should sound: pitch, timing, emotion and which voice to use.', 'मोडेलले कस्तो सुनिनुपर्छ अनुमान गर्छ: स्वर, समय, भावना र कुन आवाज प्रयोग गर्ने।', '模型预测应该怎么发音：音高、节奏、情感，以及用哪种声音。')],
      [T('Make audio tokens', 'अडियो token बनाउने', '生成音频 token'), T('Many new models (like Orpheus) predict short "audio tokens" from a neural audio codec, the way ChatGPT predicts words.', 'धेरै नयाँ मोडेल (जस्तै Orpheus) ले ChatGPT ले शब्द अनुमान गरेजस्तै neural audio codec का छोटा "अडियो token" अनुमान गर्छन्।', '许多新模型（如 Orpheus）像 ChatGPT 预测词一样，预测神经音频编解码器的短“音频 token”。')],
      [T('Turn into a wave', 'तरंगमा बदल्ने', '变成波形'), T('A decoder (vocoder) turns the plan or the tokens into 24,000 sound numbers per second — the voice you hear.', 'Decoder (vocoder) ले योजना वा token लाई प्रति सेकेन्ड २४,००० ध्वनि अंकमा बदल्छ — तपाईंले सुन्ने आवाज।', '解码器（声码器）把规划或 token 变成每秒 24000 个声音数字——就是你听到的声音。')],
    ],
    words: [
      ['TTS', T('Text-to-speech: computer voices that read text aloud.', 'Text-to-speech: अक्षर ठूलो स्वरमा पढ्ने कम्प्युटर आवाज।', '文字转语音：朗读文字的电脑声音。')],
      ['Phoneme', T('The smallest sound unit of a language, e.g. the "k" in "cat".', 'भाषाको सबैभन्दा सानो उच्चारण एकाइ, जस्तै "cat" को "k"।', '语言中最小的发音单位，例如 “cat” 中的 “k”。')],
      ['Prosody', T('The music of speech: pitch, rhythm, stress and emotion.', 'बोलीको संगीत: स्वर, लय, जोड र भावना।', '说话的韵律：音高、节奏、重音和情感。')],
      ['Audio codec / tokens', T('A network that compresses sound into short tokens and back — lets TTS work like a language model.', 'आवाजलाई छोटा token मा खुम्च्याउने र फर्काउने नेटवर्क — TTS लाई भाषा मोडेल जस्तै चलाउन दिन्छ।', '把声音压缩成短 token 再还原的网络——让 TTS 能像语言模型一样工作。')],
      ['Vocoder', T('The part that turns the model\'s plan into the final sound wave.', 'मोडेलको योजनालाई अन्तिम ध्वनि तरंगमा बदल्ने भाग।', '把模型的规划变成最终声波的部分。')],
      ['Voice cloning', T('Copying a real person\'s voice from a short recording — powerful and risky.', 'छोटो रेकर्डिङबाट वास्तविक मानिसको आवाज नक्कल गर्ने — शक्तिशाली र जोखिमपूर्ण।', '从一小段录音复制真人的声音——强大但有风险。')],
    ],
    models: [
      ['Kokoro', 'https://huggingface.co/hexgrad/Kokoro-82M', 'hexgrad', T('Tiny (82 million parameters) yet very natural; fast enough to run in a web browser. Try it in our Playground!', 'सानो (८.२ करोड parameter) तर धेरै प्राकृतिक; वेब ब्राउजरमा चल्न पुग्ने छिटो। हाम्रो Playground मा प्रयास गर्नुहोस्!', '很小（8200 万参数）却非常自然；快到能在浏览器里运行。来我们的游乐场试试！')],
      ['Orpheus', 'https://github.com/canopyai/Orpheus-TTS', 'Canopy Labs', T('Built on a language model (Llama) that predicts audio tokens; very human, can laugh and sigh.', 'अडियो token अनुमान गर्ने भाषा मोडेल (Llama) मा बनेको; धेरै मानवजस्तो, हाँस्न र सुस्केरा हाल्न सक्छ।', '基于预测音频 token 的语言模型（Llama）；非常像真人，会笑、会叹气。')],
      ['Chatterbox', 'https://github.com/resemble-ai/chatterbox', 'Resemble AI', T('Open model with voice cloning and an "emotion" control; adds a hidden watermark to its audio.', 'Voice cloning र "भावना" नियन्त्रण भएको खुला मोडेल; आफ्नो अडियोमा लुकेको watermark थप्छ।', '支持声音克隆和“情绪”控制的开源模型；会在音频里加入隐藏水印。')],
    ],
    tryText: T('A voice is made of a basic pitch plus many "harmonics" (multiples of it). This code builds two voice-like sounds — a deeper one and a higher one — and shows how many numbers a TTS model must produce every second.', 'आवाज एउटा आधारभूत स्वर र धेरै "harmonic" (त्यसका गुणन) मिलेर बन्छ। यो कोडले दुई आवाजजस्ता ध्वनि — गहिरो र उच्च — बनाउँछ, र TTS मोडेलले हरेक सेकेन्ड कति अंक बनाउनुपर्छ देखाउँछ।', '声音由一个基础音高和很多“谐波”（它的倍数）组成。这段代码造出两种类似人声的声音——一个低沉、一个高亢——并显示 TTS 模型每秒要生成多少个数字。'),
    code: { title: T('What a voice is made of', 'आवाज केले बनेको हुन्छ', '声音由什么组成'), code: py`
import numpy as np
import matplotlib.pyplot as plt

sr = 24000                                   # Kokoro makes 24,000 numbers per second

def voice(pitch, seconds=0.4):
    """A voice-like sound: a base pitch plus its harmonics (like vocal cords)"""
    t = np.arange(0, seconds, 1 / sr)
    wave = sum(np.sin(2 * np.pi * pitch * k * t) / k for k in range(1, 8))
    fade = np.minimum(1, np.minimum(t, seconds - t) * 20)       # fade in and out smoothly
    return wave * fade

low = voice(110)                             # a deeper voice
high = voice(220)                            # a higher voice (one octave up)

n = int(0.03 * sr)                           # look at the first 30 milliseconds
ms = np.arange(n) / sr * 1000
fig, ax = plt.subplots(2, 1, figsize=(9, 4.5), sharex=True)
ax[0].plot(ms, low[:n])
ax[0].set_title("Pitch 110 Hz (deeper voice)")
ax[1].plot(ms, high[:n], color="crimson")
ax[1].set_title("Pitch 220 Hz (higher voice): the pattern repeats twice as fast")
ax[1].set_xlabel("milliseconds")
plt.tight_layout()
plt.show()

words_per_minute = 150                       # people speak about 150 words per minute
print(f"1 minute of speech = {60 * sr:,} numbers")
print(f"That is about {60 * sr // words_per_minute:,} numbers for every single word!")
print("So modern TTS first predicts a short plan or audio tokens, then a vocoder makes the wave.")
` },
    playground: [T('Hear a real neural voice: our Playground runs <b>Kokoro</b> right in your browser. Type any English sentence and pick a voice.', 'वास्तविक neural आवाज सुन्नुहोस्: हाम्रो Playground ले तपाईंकै ब्राउजरमा <b>Kokoro</b> चलाउँछ। कुनै अङ्ग्रेजी वाक्य टाइप गरेर आवाज छान्नुहोस्।', '听听真正的神经网络声音：我们的游乐场在你的浏览器里运行 <b>Kokoro</b>。输入任何英文句子，选一个声音。'), [['tts', T('🔊 Text to speech (Kokoro)', '🔊 अक्षरबाट आवाज (Kokoro)', '🔊 文字转语音（Kokoro）')]]],
    platforms: [
      ['<a href="#/models/tts">ML Tutor · Model Playground</a>', T('Kokoro TTS in your browser: type, choose a voice, listen and download.', 'तपाईंको ब्राउजरमा Kokoro TTS: टाइप गर्नुहोस्, आवाज छान्नुहोस्, सुन्नुहोस् र डाउनलोड गर्नुहोस्।', '浏览器中的 Kokoro TTS：输入文字、选声音、试听并下载。'), COST.here],
      P.spaces('text to speech'),
      [link('Kokoro-82M', 'https://huggingface.co/hexgrad/Kokoro-82M'), T('Model page with voices, languages and a short Python example.', 'आवाज, भाषा र छोटो Python उदाहरणसहितको मोडेल पेज।', '模型主页：声音列表、支持的语言和简短 Python 示例。'), COST.free],
      [link('Chatterbox (GitHub)', 'https://github.com/resemble-ai/chatterbox'), T('Install and try emotion control on your own computer (a GPU helps).', 'आफ्नै कम्प्युटरमा इन्स्टल गरेर भावना नियन्त्रण प्रयास गर्नुहोस् (GPU भए राम्रो)।', '在自己电脑上安装并试用情绪控制（有 GPU 更好）。'), COST.local],
      P.colab,
    ],
    mission: [
      T('Open the <a href="#/models/tts">🔊 Kokoro card</a>. Type the same sentence in 3 voices. Which sounds most human? What makes it sound human?', '<a href="#/models/tts">🔊 Kokoro कार्ड</a> खोल्नुहोस्। उही वाक्य ३ आवाजमा टाइप गर्नुहोस्। कुन सबैभन्दा मानवजस्तो सुनिन्छ? केले मानवजस्तो बनाउँछ?', '打开 <a href="#/models/tts">🔊 Kokoro 卡片</a>。用 3 种声音读同一句话。哪个最像真人？是什么让它听起来像真人？'),
      T('Test punctuation: "Let\'s eat, grandma." vs "Let\'s eat grandma." Does the pause change?', 'विराम चिन्ह जाँच्नुहोस्: "Let\'s eat, grandma." र "Let\'s eat grandma." के रोकाइ बदलिन्छ?', '测试标点：“Let\'s eat, grandma.” 和 “Let\'s eat grandma.”，停顿变了吗？'),
      T('Try hard words: numbers ("2026"), short forms ("Dr.", "km") and names ("Kathmandu"). Which ones go wrong?', 'गाह्रा शब्द प्रयास गर्नुहोस्: अंक ("2026"), छोटा रूप ("Dr.", "km") र नाम ("Kathmandu")। कुन गलत हुन्छ?', '试试难读的词：数字（“2026”）、缩写（“Dr.”、“km”）和地名（“Kathmandu”）。哪些读错了？'),
      T('On Hugging Face Spaces, find a TTS demo that supports Nepali or Chinese and compare it with Kokoro.', 'Hugging Face Spaces मा नेपाली वा चिनियाँ समर्थन गर्ने TTS डेमो खोजेर Kokoro सँग तुलना गर्नुहोस्।', '在 Hugging Face Spaces 上找一个支持尼泊尔语或中文的 TTS 演示，和 Kokoro 比较一下。'),
    ],
    safety: T('A cloned voice can be used to trick families and banks ("Mum, I need money now!"). Only clone your own voice or a voice you have written permission for, never pretend to be someone else, and agree on a secret family question for emergency calls.', 'नक्कल गरिएको आवाज परिवार र बैंकलाई झुक्याउन प्रयोग हुन सक्छ ("आमा, मलाई अहिल्यै पैसा चाहियो!")। आफ्नै आवाज वा लिखित अनुमति भएको आवाज मात्र नक्कल गर्नुहोस्, अरू भएको बहाना कहिल्यै नगर्नुहोस्, र आपत्कालीन फोनका लागि परिवारमा गोप्य प्रश्न तय गर्नुहोस्।', '克隆的声音可能被用来骗家人和银行（“妈，我现在急需钱！”）。只克隆自己的声音或获得书面许可的声音，绝不冒充他人，并和家人约定一个紧急电话时用的暗号问题。'),
    remember: T('TTS turns text into sounds, plans the voice, then a vocoder makes the wave — the reverse of speech recognition.', 'TTS ले अक्षरलाई उच्चारणमा बदल्छ, आवाजको योजना बनाउँछ, अनि vocoder ले तरंग बनाउँछ — आवाज पहिचानको उल्टो।', 'TTS 把文字变成音素，规划声音，再由声码器生成波形——正好和语音识别相反。'),
    quiz: [
      [['What is TTS the opposite of?', 'TTS कसको उल्टो हो?', 'TTS 和什么正好相反？'],
        [['Image generation', 'Object detection', 'Speech recognition (speech-to-text)', 'Clustering'], ['चित्र सिर्जना', 'वस्तु पहिचान', 'आवाज पहिचान (speech-to-text)', 'क्लस्टरिङ'], ['图像生成', '目标检测', '语音识别（语音转文字）', '聚类']], 2,
        ['Speech recognition: sound → text. TTS: text → sound.', 'आवाज पहिचान: आवाज → अक्षर। TTS: अक्षर → आवाज।', '语音识别：声音 → 文字。TTS：文字 → 声音。']],
      [['What is "prosody"?', '"Prosody" भनेको के हो?', '“韵律（prosody）”是什么？'],
        [['The pitch, rhythm and emotion of speech', 'The file size', 'A type of microphone', 'The number of words'], ['बोलीको स्वर, लय र भावना', 'फाइल साइज', 'माइक्रोफोनको प्रकार', 'शब्दको संख्या'], ['说话的音高、节奏和情感', '文件大小', '一种麦克风', '词的数量']], 0,
        ['Good prosody is what makes a computer voice sound human instead of robotic.', 'राम्रो prosody ले नै कम्प्युटरको आवाजलाई रोबोटजस्तो होइन, मानवजस्तो बनाउँछ।', '好的韵律让电脑声音听起来像人，而不像机器人。']],
      [['Orpheus predicts "audio tokens" one after another. Which other model works in a similar way?', 'Orpheus ले एकपछि अर्को "अडियो token" अनुमान गर्छ। कुन अर्को मोडेल यस्तै तरिकाले काम गर्छ?', 'Orpheus 一个接一个地预测“音频 token”。还有哪个模型以类似方式工作？'],
        [['k-means', 'ChatGPT, which predicts the next word token', 'A decision tree', 'PCA'], ['k-means', 'अर्को शब्द token अनुमान गर्ने ChatGPT', 'Decision tree', 'PCA'], ['k 均值', '预测下一个词 token 的 ChatGPT', '决策树', 'PCA']], 1,
        ['Turning sound into tokens lets a language model "write" audio like text.', 'आवाजलाई token मा बदल्दा भाषा मोडेलले अक्षर जस्तै अडियो "लेख्न" सक्छ।', '把声音变成 token，语言模型就能像写文字一样“写”音频。']],
      [['Someone wants to clone a famous singer\'s voice to make new songs without asking. What is right?', 'कसैले सोध्दै नसोधी प्रसिद्ध गायकको आवाज नक्कल गरेर नयाँ गीत बनाउन चाहन्छ। के सही हो?', '有人想不经同意克隆一位著名歌手的声音来做新歌。怎样做才对？'],
        [['It is fine if the song is good', 'It is fine on weekends', 'It is fine if it is short', 'Do not do it without the singer\'s permission'], ['गीत राम्रो भए ठीक छ', 'शनिबार ठीक छ', 'छोटो भए ठीक छ', 'गायकको अनुमति बिना नगर्नुहोस्'], ['歌好听就行', '周末可以', '短一点就行', '没有歌手的许可就不要做']], 3,
        ['A voice belongs to its owner. Cloning without consent can be illegal and harmful.', 'आवाज यसको मालिकको हो। सहमति बिना नक्कल गर्नु गैरकानुनी र हानिकारक हुन सक्छ।', '声音属于它的主人。未经同意克隆可能违法，也会造成伤害。']],
    ],
  });

  // ======================================================================
  // 6. MUSIC & SOUND EFFECTS
  // ======================================================================
  LESSONS.push({
    id: 'music-generation', minutes: 20,
    title: T('Music & Sound-Effect Generation', 'संगीत र साउन्ड-इफेक्ट सिर्जना', '音乐与音效生成'),
    intro: T('Type "calm flute music with tabla, morning in the Himalayas" and get a new song. Or "door creaking in an old house" and get a sound effect for your game. Models like <b>Stable Audio</b> and <b>ACE-Step</b> use <b>audio diffusion</b> or <b>RVQ Transformers</b>.',
      '"हिमालयको बिहान, तबलासहित शान्त बाँसुरी संगीत" टाइप गर्नुहोस् र नयाँ गीत पाउनुहोस्। वा "पुरानो घरमा ढोका चिरचिराएको" र आफ्नो गेमका लागि साउन्ड इफेक्ट पाउनुहोस्। <b>Stable Audio</b> र <b>ACE-Step</b> जस्ता मोडेलले <b>audio diffusion</b> वा <b>RVQ Transformer</b> प्रयोग गर्छन्।',
      '输入“喜马拉雅的清晨，带塔布拉鼓的宁静笛声”，就能得到一首新曲子。或者输入“老房子里吱呀作响的门”，为你的游戏得到一个音效。<b>Stable Audio</b> 和 <b>ACE-Step</b> 等模型使用<b>音频扩散</b>或 <b>RVQ Transformer</b>。'),
    idea: T('Music is just sound over time, so there are two ways to make it. <b>Like a painter</b>: start with noise and clean it into music (audio diffusion — the same idea as image generation). <b>Like a writer</b>: turn sound into "words" (tokens) and predict the next one, again and again (RVQ Transformers — like ChatGPT, but for sound).',
      'संगीत भनेको समयसँगै आउने आवाज मात्र हो, त्यसैले यसलाई बनाउने दुई तरिका छन्। <b>चित्रकार जस्तै</b>: noise बाट सुरु गरेर संगीतमा सफा गर्ने (audio diffusion — चित्र सिर्जनाकै विचार)। <b>लेखक जस्तै</b>: आवाजलाई "शब्द" (token) मा बदलेर पटक-पटक अर्को अनुमान गर्ने (RVQ Transformer — ChatGPT जस्तै, तर आवाजका लागि)।',
      '音乐就是随时间变化的声音，所以有两种生成方法。<b>像画家</b>：从噪声开始，把它清理成音乐（音频扩散——和图像生成同一个思路）。<b>像作家</b>：把声音变成“词”（token），一次次预测下一个（RVQ Transformer——像 ChatGPT，但用于声音）。'),
    steps: [
      [T('Describe', 'वर्णन गर्ने', '描述'), T('You give a prompt (genre, instruments, mood, tempo) and maybe lyrics. A text encoder turns it into numbers.', 'तपाईं prompt (विधा, बाजा, मुड, गति) र सायद गीतका शब्द दिनुहुन्छ। Text encoder ले यसलाई अंकमा बदल्छ।', '你给出提示词（风格、乐器、情绪、速度），也可以给歌词。文本编码器把它变成数字。')],
      [T('Compress sound', 'आवाज खुम्च्याउने', '压缩声音'), T('An audio autoencoder or codec squeezes the sound into a short latent or into tokens (with RVQ).', 'Audio autoencoder वा codec ले आवाजलाई छोटो latent वा token (RVQ सहित) मा खुम्च्याउँछ।', '音频自编码器或编解码器把声音压缩成短的潜变量，或（用 RVQ）压缩成 token。')],
      [T('Generate', 'सिर्जना गर्ने', '生成'), T('Either a diffusion model denoises the latent, or a Transformer predicts the tokens one by one.', 'या त diffusion मोडेलले latent बाट noise हटाउँछ, या Transformer ले token एक-एक गरी अनुमान गर्छ।', '要么扩散模型给潜变量去噪，要么 Transformer 逐个预测 token。')],
      [T('Decode', 'Decode गर्ने', '解码'), T('The decoder turns the result back into a sound wave you can play.', 'Decoder ले नतिजालाई बजाउन मिल्ने ध्वनि तरंगमा फर्काउँछ।', '解码器把结果还原成可以播放的声波。')],
    ],
    words: [
      ['SFX', T('Sound effects: footsteps, rain, explosions, UI clicks.', 'साउन्ड इफेक्ट: पाइलाको आवाज, पानी, विस्फोट, UI क्लिक।', '音效：脚步声、雨声、爆炸声、界面点击声。')],
      ['Audio diffusion', T('Denoising sound (or its latent) step by step — like image diffusion.', 'आवाज (वा यसको latent) बाट चरणबद्ध रूपमा noise हटाउने — चित्र diffusion जस्तै।', '一步步给声音（或其潜变量）去噪——就像图像扩散。')],
      ['Codec', T('A network that turns sound into a few numbers per moment and back.', 'आवाजलाई हरेक क्षणमा थोरै अंकमा बदल्ने र फर्काउने नेटवर्क।', '把声音在每个时刻变成少量数字、再还原回来的网络。')],
      ['RVQ', T('Residual Vector Quantization: several codebooks in a row; each one fixes the mistakes of the previous one.', 'Residual Vector Quantization: क्रमैसँग धेरै codebook; हरेकले अघिल्लोको गल्ती सुधार्छ।', '残差向量量化：多个码本依次排列，每一个修正前一个的误差。')],
      ['Codebook', T('A small "dictionary" of sound pieces. The token is the number of the closest piece.', 'आवाजका टुक्राको सानो "शब्दकोश"। Token भनेको सबैभन्दा नजिकको टुक्राको नम्बर हो।', '声音片段的小“字典”。token 就是最接近的片段的编号。')],
      ['BPM', T('Beats per minute: the speed of the music.', 'प्रति मिनेट बिट: संगीतको गति।', '每分钟节拍数：音乐的速度。')],
    ],
    models: [
      ['Stable Audio 3 (Stable Audio)', 'https://huggingface.co/stabilityai/stable-audio-open-1.0', 'Stability AI', T('Audio diffusion for music and sound effects; the open version is great for SFX and short loops.', 'संगीत र साउन्ड इफेक्टका लागि audio diffusion; खुला संस्करण SFX र छोटा loop का लागि उत्कृष्ट।', '用于音乐和音效的音频扩散；开源版本很适合音效和短循环。')],
      ['ACE-Step 1.5', 'https://github.com/ace-step/ACE-Step-1.5', 'ACE Studio & StepFun', T('Open model for full songs with lyrics in many languages; fast enough to run on a gaming GPU.', 'धेरै भाषामा गीतका शब्दसहित पूरा गीतका लागि खुला मोडेल; gaming GPU मा चल्न पुग्ने छिटो।', '可生成带多语言歌词的完整歌曲的开源模型；快到能在游戏显卡上运行。')],
      ['MusicGen (AudioCraft)', 'https://github.com/facebookresearch/audiocraft', 'Meta', T('A classic RVQ-Transformer music model — easy to learn from and run in Colab.', 'क्लासिक RVQ-Transformer संगीत मोडेल — सिक्न र Colab मा चलाउन सजिलो।', '经典的 RVQ-Transformer 音乐模型——容易学习，也容易在 Colab 上运行。')],
    ],
    tryText: T('First, a tiny "music model": a Markov chain that picks the next note (in sargam: Sa Re Ga Ma Pa Dha Ni) based on the current one — the same "predict the next token" idea big models use.', 'पहिले, सानो "संगीत मोडेल": हालको स्वरका आधारमा अर्को स्वर (सरगममा: सा रे ग म प ध नि) छान्ने Markov chain — ठूला मोडेलले प्रयोग गर्ने "अर्को token अनुमान" कै विचार।', '先来一个小小的“音乐模型”：一条马尔可夫链，根据当前音符选出下一个音符（用印度唱名：Sa Re Ga Ma Pa Dha Ni）——和大模型“预测下一个 token”的思路一样。'),
    code: { title: T('A tiny melody generator', 'सानो धुन बनाउने मोडेल', '一个小小的旋律生成器'), code: py`
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(1)              # change the seed to get a new melody
notes = ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni", "Sa'"]

# The "model": from the current note, move a small step up or down (small steps sound nicer)
note = 0
melody = []
for beat in range(16):
    melody.append(note)
    step = rng.choice([-2, -1, 1, 2], p=[0.15, 0.35, 0.35, 0.15])
    note = int(np.clip(note + step, 0, 7))

print("Melody:", " ".join(notes[n] for n in melody))

plt.figure(figsize=(9, 3))
plt.step(range(16), melody, where="post", lw=3)
plt.yticks(range(8), notes)
plt.xlabel("beat")
plt.title("Piano roll of the generated melody")
plt.show()
` },
    tryText2: T('Second, the trick behind RVQ music models: <b>residual vector quantization</b>. Each codebook turns a piece of sound into a token number; the next codebook fixes what is still wrong. Watch the error shrink with every codebook.', 'दोस्रो, RVQ संगीत मोडेल पछाडिको तरिका: <b>residual vector quantization</b>। हरेक codebook ले आवाजको टुक्रालाई token नम्बरमा बदल्छ; अर्को codebook ले अझै गलत रहेको सुधार्छ। हरेक codebook सँगै गल्ती घटेको हेर्नुहोस्।', '第二，RVQ 音乐模型背后的技巧：<b>残差向量量化</b>。每个码本把一段声音变成一个 token 编号；下一个码本修正剩下的误差。看误差随着每个码本变小。'),
    code2: { title: T('RVQ: sound → tokens', 'RVQ: आवाज → token', 'RVQ：声音 → token'), code: py`
import numpy as np

rng = np.random.default_rng(0)
sound = rng.normal(0, 1, (500, 2))           # 500 tiny pieces of sound (2 numbers each)

total = np.zeros_like(sound)                 # our rebuilt sound so far
residual = sound.copy()                      # what is still wrong
for level in range(1, 5):
    # a codebook = 16 example pieces (real models learn these during training)
    codebook = residual[rng.choice(len(residual), 16, replace=False)]
    # the token for each piece = the number of the closest codebook entry
    distances = ((residual[:, None, :] - codebook[None, :, :]) ** 2).sum(axis=2)
    tokens = distances.argmin(axis=1)
    total = total + codebook[tokens]
    residual = sound - total
    print(f"after {level} codebook(s): error = {np.abs(residual).mean():.3f}   first tokens: {tokens[:6]}")

print("More codebooks = more tokens per moment = better sound quality (but more work for the model).")
` },
    playground: [T('Music models are still too big for a browser, but you can hear a neural voice and see speech turned into text in our Playground.', 'संगीत मोडेल अझै ब्राउजरका लागि धेरै ठूला छन्, तर हाम्रो Playground मा neural आवाज सुन्न र आवाज अक्षरमा बदलिएको हेर्न सक्नुहुन्छ।', '音乐模型对浏览器来说还太大，但你可以在我们的游乐场听到神经网络声音，看到语音变成文字。'), [['tts', T('🔊 Text to speech (Kokoro)', '🔊 अक्षरबाट आवाज (Kokoro)', '🔊 文字转语音（Kokoro）')], ['speech', T('🎙️ Speech to text (Whisper)', '🎙️ आवाजबाट अक्षर (Whisper)', '🎙️ 语音转文字（Whisper）')]]],
    platforms: [
      P.spaces('music generation'),
      [link('ACE-Step 1.5 (GitHub)', 'https://github.com/ace-step/ACE-Step-1.5'), T('Make full songs with your own lyrics on your own GPU; includes a simple web interface.', 'आफ्नै GPU मा आफ्नै गीतका शब्दसहित पूरा गीत बनाउनुहोस्; सरल वेब इन्टरफेस समावेश।', '在自己的显卡上用自己的歌词生成完整歌曲；自带简单的网页界面。'), COST.local],
      [link('Stable Audio Open', 'https://huggingface.co/stabilityai/stable-audio-open-1.0'), T('Model page for sound effects and loops (accept the license on the page first).', 'साउन्ड इफेक्ट र loop का लागि मोडेल पेज (पहिले पेजमा license स्वीकार गर्नुहोस्)।', '音效和循环的模型主页（先在页面上接受许可证）。'), COST.freeAcc],
      [link('AudioCraft / MusicGen', 'https://github.com/facebookresearch/audiocraft'), T('Ready-made notebooks — run MusicGen in Google Colab with a free GPU.', 'तयार notebook — निःशुल्क GPU सहित Google Colab मा MusicGen चलाउनुहोस्।', '现成的笔记本——在 Google Colab 用免费 GPU 运行 MusicGen。'), COST.freeAcc],
      P.replicate('music'),
    ],
    mission: [
      T('On Hugging Face Spaces, search "music generation" and open a demo.', 'Hugging Face Spaces मा "music generation" खोजेर डेमो खोल्नुहोस्।', '在 Hugging Face Spaces 搜索 “music generation”，打开一个演示。'),
      T('Write a prompt with genre + instruments + mood + tempo: "lo-fi study beat, madal drum and piano, calm, 80 BPM".', 'विधा + बाजा + मुड + गति सहितको prompt लेख्नुहोस्: "lo-fi study beat, madal drum and piano, calm, 80 BPM"।', '写一个包含风格 + 乐器 + 情绪 + 速度的提示词：“lo-fi study beat, madal drum and piano, calm, 80 BPM”。'),
      T('Make a 5-second sound effect for a game: "coin pickup, bright, cheerful". Try 3 versions and pick the best.', 'गेमका लागि ५ सेकेन्डको साउन्ड इफेक्ट बनाउनुहोस्: "coin pickup, bright, cheerful"। ३ संस्करण बनाएर सबैभन्दा राम्रो छान्नुहोस्।', '为游戏做一个 5 秒的音效：“coin pickup, bright, cheerful”。生成 3 个版本，挑最好的。'),
      T('In the melody code, make big jumps more likely (change <code>p</code>). Does the melody sound better or worse? In the RVQ code, use 8 codebooks instead of 4.', 'धुनको कोडमा ठूला उफ्राइको सम्भावना बढाउनुहोस् (<code>p</code> बदल्नुहोस्)। धुन राम्रो कि नराम्रो सुनिन्छ? RVQ कोडमा ४ को सट्टा ८ codebook प्रयोग गर्नुहोस्।', '在旋律代码里，让大跳更常见（改 <code>p</code>）。旋律变好听还是变难听？在 RVQ 代码里，用 8 个码本代替 4 个。'),
    ],
    safety: T('Do not copy famous songs or artists\' voices, and check each tool\'s license before posting AI music on YouTube or selling it. Say when music is AI-made, and support real musicians — AI is best as a helper for your own ideas.', 'प्रसिद्ध गीत वा कलाकारको आवाज नक्कल नगर्नुहोस्, र AI संगीत YouTube मा राख्नु वा बेच्नुअघि हरेक औजारको license जाँच्नुहोस्। संगीत AI ले बनाएको हो भने भन्नुहोस्, र वास्तविक संगीतकारलाई साथ दिनुहोस् — AI तपाईंकै विचारको सहयोगीको रूपमा सबैभन्दा राम्रो हो।', '不要复制名曲或艺人的声音，把 AI 音乐发到 YouTube 或出售之前，先查看每个工具的许可证。说明音乐是 AI 生成的，并支持真正的音乐人——AI 最适合当你自己创意的助手。'),
    remember: T('Music models either denoise sound like image diffusion, or predict RVQ sound-tokens like a language model.', 'संगीत मोडेलले या त चित्र diffusion जस्तै आवाजबाट noise हटाउँछन्, या भाषा मोडेल जस्तै RVQ आवाज-token अनुमान गर्छन्।', '音乐模型要么像图像扩散一样给声音去噪，要么像语言模型一样预测 RVQ 声音 token。'),
    quiz: [
      [['What are the two main ways AI generates music?', 'AI ले संगीत बनाउने दुई मुख्य तरिका के हुन्?', 'AI 生成音乐的两种主要方法是什么？'],
        [['Audio diffusion, or predicting sound tokens with a Transformer', 'Copying songs, or mixing songs', 'Decision trees, or k-means', 'Recording, or deleting'], ['Audio diffusion, वा Transformer ले आवाज token अनुमान', 'गीत नक्कल, वा गीत मिसाउने', 'Decision tree, वा k-means', 'रेकर्ड, वा मेटाउने'], ['音频扩散，或用 Transformer 预测声音 token', '复制歌曲，或混合歌曲', '决策树，或 k 均值', '录音，或删除']], 0,
        ['Diffusion cleans noise into sound; token models predict the next piece of sound, like a language model.', 'Diffusion ले noise लाई आवाजमा सफा गर्छ; token मोडेलले भाषा मोडेल जस्तै आवाजको अर्को टुक्रा अनुमान गर्छ।', '扩散把噪声清理成声音；token 模型像语言模型一样预测下一段声音。']],
      [['In RVQ, what does each new codebook do?', 'RVQ मा हरेक नयाँ codebook ले के गर्छ?', '在 RVQ 中，每个新码本做什么？'],
        [['Makes the sound louder', 'Deletes the previous tokens', 'Fixes the mistakes left by the previous codebooks', 'Changes the song'], ['आवाज चर्को बनाउँछ', 'अघिल्ला token मेटाउँछ', 'अघिल्ला codebook ले छोडेका गल्ती सुधार्छ', 'गीत बदल्छ'], ['让声音更响', '删除之前的 token', '修正前面码本留下的误差', '换一首歌']], 2,
        ['"Residual" = what is left over. Each level quantizes the leftover error, so quality improves.', '"Residual" = बाँकी रहेको। हरेक तहले बाँकी गल्तीलाई quantize गर्छ, त्यसैले गुणस्तर सुध्रन्छ।', '“残差”= 剩下的部分。每一级都量化剩余误差，所以质量越来越好。']],
      [['A token from a codebook is…', 'Codebook बाट आएको token भनेको…', '来自码本的 token 是……'],
        [['A piece of text', 'The number of the closest entry in the codebook', 'A random number', 'The song\'s title'], ['अक्षरको टुक्रा', 'Codebook को सबैभन्दा नजिकको entry को नम्बर', 'Random अंक', 'गीतको शीर्षक'], ['一段文字', '码本中最接近的条目的编号', '一个随机数', '歌名']], 1,
        ['The sound piece is replaced by the ID of its nearest "dictionary word" — that is what the Transformer predicts.', 'आवाजको टुक्रालाई सबैभन्दा नजिकको "शब्दकोश शब्द" को ID ले बदलिन्छ — Transformer ले त्यही अनुमान गर्छ।', '声音片段被替换成最接近的“字典词”的编号——Transformer 预测的就是它。']],
      [['Before uploading AI-made music to YouTube, you should…', 'AI ले बनाएको संगीत YouTube मा अपलोड गर्नुअघि तपाईंले…', '把 AI 生成的音乐上传到 YouTube 之前，你应该……'],
        [['Make it louder', 'Remove the prompt', 'Use a famous singer\'s voice', 'Check the tool\'s license and say it is AI-made'], ['चर्को बनाउने', 'Prompt हटाउने', 'प्रसिद्ध गायकको आवाज प्रयोग गर्ने', 'औजारको license जाँचेर AI ले बनाएको हो भन्ने'], ['把音量调大', '删掉提示词', '用著名歌手的声音', '查看工具的许可证，并说明是 AI 生成的']], 3,
        ['Licenses decide what you may do with the music; honesty builds trust with your audience.', 'License ले संगीतमा के गर्न पाइन्छ तय गर्छ; इमानदारीले दर्शकको विश्वास बढाउँछ।', '许可证决定你能怎样使用这段音乐；诚实能赢得观众的信任。']],
    ],
  });

  LESSONS.forEach((S) => COURSE.lessons.push(build(S)));
})();

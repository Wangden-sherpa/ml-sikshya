/* ML Sikshya — human-like talking AI Tutor ("Guru"): animated avatar, voice in & out, answers in any language.
   Claude (with the learner's own API key) for full answers; offline helper + Error Doctor without a key. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast, store } = MLS;

  Object.assign(MLS.UI, {
    tutorHi: { en: 'Namaste! 🙏 I\'m {name}, your ML teacher. Talk to me with the 🎙️ microphone or type — in English, नेपाली, 中文 or any language. Ask about lessons, code errors or your data.', ne: 'नमस्ते! 🙏 म {name}, तपाईंको ML शिक्षक। 🎙️ माइकमा बोल्नुहोस् वा टाइप गर्नुहोस् — अंग्रेजी, नेपाली, 中文 वा जुनसुकै भाषामा। पाठ, कोडका error वा डाटाबारे सोध्नुहोस्।', zh: '你好！🙏 我是 {name}，你的机器学习老师。用 🎙️ 麦克风和我说话，或直接输入——英语、尼泊尔语、中文或任何语言都可以。问我课程、代码错误或你的数据吧。' },
    tutorOffline: { en: 'Offline helper', ne: 'अफलाइन सहायक', zh: '离线助手' },
    tutorOnline: { en: 'Claude connected', ne: 'Claude जोडियो', zh: '已连接 Claude' },
    tutorPh: { en: 'Type or press 🎙️ and speak… (Enter to send)', ne: 'टाइप गर्नुहोस् वा 🎙️ थिचेर बोल्नुहोस्… (पठाउन Enter)', zh: '输入文字，或按 🎙️ 说话…（回车发送）' },
    tutorSettings: { en: 'Connect Claude for full AI answers in any language', ne: 'जुनसुकै भाषामा पूरा AI उत्तरका लागि Claude जोड्नुहोस्', zh: '连接 Claude，获得任何语言的完整 AI 回答' },
    tutorKeyHelp: { en: 'Paste your Anthropic API key (from console.anthropic.com). It is saved only in this browser and sent only to api.anthropic.com. Usage is billed to your Anthropic account. Without a key, the offline helper still explains errors and finds the right lessons.', ne: 'आफ्नो Anthropic API key टाँस्नुहोस् (console.anthropic.com बाट)। यो यही ब्राउजरमा मात्र सेभ हुन्छ र api.anthropic.com मा मात्र पठाइन्छ। प्रयोगको शुल्क तपाईंको Anthropic खातामा लाग्छ। Key बिना पनि अफलाइन सहायकले error बुझाउँछ र सही पाठ खोज्छ।', zh: '粘贴你的 Anthropic API 密钥（在 console.anthropic.com 获取）。它只保存在本浏览器中，只发送到 api.anthropic.com，费用计入你的 Anthropic 账户。没有密钥时，离线助手仍能解释错误并找到相关课程。' },
    tutorSave: { en: 'Save', ne: 'सेभ', zh: '保存' }, tutorForget: { en: 'Remove key', ne: 'Key हटाउनुहोस्', zh: '删除密钥' }, tutorModel: { en: 'Model', ne: 'मोडेल', zh: '模型' },
    tutorLook: { en: 'Choose your teacher', ne: 'शिक्षक छान्नुहोस्', zh: '选择你的老师' },
    tutorVoice: { en: 'Speaking language (microphone)', ne: 'बोल्ने भाषा (माइक)', zh: '说话语言（麦克风）' },
    tutorSpeak: { en: 'Read answers aloud', ne: 'उत्तर बोलेर सुनाउने', zh: '朗读回答' },
    chipExplain: { en: '📘 Explain this lesson simply', ne: '📘 यो पाठ सरल भाषामा बुझाउनुहोस्', zh: '📘 简单讲解这一课' },
    chipError: { en: '🩺 Help with my last error', ne: '🩺 मेरो पछिल्लो error मा मद्दत', zh: '🩺 帮我解决刚才的错误' },
    chipPractice: { en: '🏋️ Give me a practice exercise', ne: '🏋️ अभ्यास प्रश्न दिनुहोस्', zh: '🏋️ 给我一道练习题' },
    chipNext: { en: '🧭 What should I learn next?', ne: '🧭 अब के सिक्ने?', zh: '🧭 我下一步该学什么？' },
    chipData: { en: '📊 Suggest a plan for my data', ne: '📊 मेरो डाटाका लागि योजना सुझाउनुहोस्', zh: '📊 为我的数据建议一个计划' },
    doctorTitle: { en: 'Error Doctor', ne: 'Error डाक्टर', zh: '错误医生' },
    doctorAsk: { en: '🧑‍🏫 Ask the tutor', ne: '🧑‍🏫 शिक्षकलाई सोध्नुहोस्', zh: '🧑‍🏫 问老师' },
    whyErr: { en: 'Why it happened', ne: 'किन भयो', zh: '原因' }, fixErr: { en: 'How to fix it', ne: 'कसरी सच्याउने', zh: '解决方法' },
    offlineNote: { en: 'ℹ️ Offline helper answer. Connect Claude (⚙️) for full, personal explanations in any language.', ne: 'ℹ️ अफलाइन सहायकको उत्तर। जुनसुकै भाषामा पूरा व्याख्याका लागि Claude जोड्नुहोस् (⚙️)।', zh: 'ℹ️ 这是离线助手的回答。连接 Claude（⚙️）可获得任何语言的完整讲解。' },
    relLessons: { en: 'Lessons that can help', ne: 'मद्दत गर्ने पाठहरू', zh: '相关课程' },
    noMatch: { en: 'I could not find that topic offline. Try other words (e.g. "overfitting", "KNN", "missing values") or connect Claude for a full answer.', ne: 'अफलाइनमा त्यो विषय भेटिएन। अरू शब्द प्रयास गर्नुहोस् (जस्तै "overfitting", "KNN", "missing values") वा पूरा उत्तरका लागि Claude जोड्नुहोस्।', zh: '离线状态下没有找到这个主题。换个词试试（例如“过拟合”“KNN”“缺失值”），或连接 Claude 获得完整回答。' },
    thinking: { en: 'Thinking…', ne: 'सोच्दैछु…', zh: '思考中…' },
    stListening: { en: '🎙️ Listening… speak now', ne: '🎙️ सुन्दैछु… अब बोल्नुहोस्', zh: '🎙️ 正在听…请说话' },
    stSpeaking: { en: '🔊 Speaking…', ne: '🔊 बोल्दैछु…', zh: '🔊 正在说话…' },
    stThinking: { en: '💭 Thinking…', ne: '💭 सोच्दैछु…', zh: '💭 思考中…' },
    stReady: { en: 'Ready to help', ne: 'मद्दत गर्न तयार', zh: '随时为你服务' },
    talkMode: { en: 'Conversation mode', ne: 'कुराकानी मोड', zh: '对话模式' },
    talkOn: { en: '🗣️ Conversation mode on — I listen again after each answer. Press again to stop.', ne: '🗣️ कुराकानी मोड सुरु — हरेक उत्तरपछि फेरि सुन्छु। रोक्न फेरि थिच्नुहोस्।', zh: '🗣️ 对话模式已开启——每次回答后我会继续听。再按一次停止。' },
    noMic: { en: 'Voice input needs Chrome or Edge. You can still type.', ne: 'आवाज इनपुटका लागि Chrome वा Edge चाहिन्छ। टाइप भने गर्न सक्नुहुन्छ।', zh: '语音输入需要 Chrome 或 Edge 浏览器。你仍然可以打字。' },
    micDenied: { en: 'Microphone permission was blocked. Allow it in the browser address bar.', ne: 'माइक अनुमति रोकियो। ब्राउजरको address bar मा अनुमति दिनुहोस्।', zh: '麦克风权限被阻止，请在浏览器地址栏中允许。' },
    voiceNote: { en: 'Note: in Chrome, voice recognition is processed by Google\'s speech service.', ne: 'नोट: Chrome मा आवाज पहिचान Google को speech सेवाले गर्छ।', zh: '注意：在 Chrome 中，语音识别由 Google 的语音服务处理。' },
    seeCode: { en: 'Look at the code on the screen.', ne: 'स्क्रिनमा कोड हेर्नुहोस्।', zh: '请看屏幕上的代码。' },
  });


  Object.assign(MLS.UI, {
    connectT: { en: 'Connect the free ChatGPT brain (one click)', ne: 'निःशुल्क ChatGPT दिमाग जोड्नुहोस् (एक क्लिक)', zh: '连接免费的 ChatGPT 大脑（一键）' },
    connectP: { en: 'Your AI teacher runs on ChatGPT (OpenAI GPT-6.2) for free through Puter, and speaks with ChatGPT\'s natural voices. Click below, then press "Continue" — a small window creates your free account automatically. If nothing opens, allow pop-ups for this site.', ne: 'तपाईंको AI शिक्षक Puter मार्फत निःशुल्क ChatGPT (OpenAI GPT-6.2) मा चल्छ, र ChatGPT कै प्राकृतिक आवाजमा बोल्छ। तल क्लिक गरेर "Continue" थिच्नुहोस् — सानो विन्डोले निःशुल्क खाता आफैं बनाउँछ। केही नखुले यो साइटका लागि पप-अप अनुमति दिनुहोस्।', zh: '你的 AI 老师通过 Puter 免费使用 ChatGPT（OpenAI GPT-6.2），并用 ChatGPT 的自然声音说话。点击下方按钮，然后按“Continue”——一个小窗口会自动为你创建免费账户。如果没有弹出，请允许本网站弹出窗口。' },
    connectBtn: { en: '⚡ Connect ChatGPT', ne: '⚡ ChatGPT जोड्नुहोस्', zh: '⚡ 连接 ChatGPT' },
    connected: { en: '✅ Connected — ask me anything!', ne: '✅ जोडियो — जे पनि सोध्नुहोस्!', zh: '✅ 已连接——尽管问吧！' },
    popupBlocked: { en: 'The sign-in window was blocked. Allow pop-ups for this site (icon in the address bar), then click Connect again.', ne: 'साइन-इन विन्डो रोकियो। यो साइटका लागि पप-अप अनुमति दिनुहोस् (address bar को आइकन), अनि फेरि Connect थिच्नुहोस्।', zh: '登录窗口被拦截了。请允许本网站弹出窗口（地址栏中的图标），然后再点一次连接。' },
    connectFail: { en: 'Not connected yet — click Connect and then "Continue" to finish.', ne: 'अझै जोडिएको छैन — Connect अनि "Continue" थिचेर पूरा गर्नुहोस्।', zh: '还没有连接——请点击连接，然后点“Continue”完成。' },
    needConnect: { en: '⚡ One more step: connect the free ChatGPT brain to get real answers.', ne: '⚡ एक चरण बाँकी: वास्तविक उत्तरका लागि निःशुल्क ChatGPT दिमाग जोड्नुहोस्।', zh: '⚡ 还差一步：连接免费的 ChatGPT 大脑以获得真正的回答。' },
    notConnected: { en: 'not connected', ne: 'जोडिएको छैन', zh: '未连接' },
    fileT: { en: 'Open the online version to use ChatGPT', ne: 'ChatGPT प्रयोग गर्न अनलाइन संस्करण खोल्नुहोस्', zh: '打开在线版即可使用 ChatGPT' },
    fileP: { en: 'This page was opened as a file (by double-clicking index.html), so ChatGPT can\'t sign in here: it needs a web address. The online version works straight away and has everything.', ne: 'यो पेज फाइलको रूपमा खोलिएको छ (index.html मा डबल-क्लिक गरेर), त्यसैले यहाँ ChatGPT साइन-इन हुन सक्दैन: यसलाई वेब ठेगाना चाहिन्छ। अनलाइन संस्करण तुरुन्तै चल्छ र त्यहाँ सबै कुरा छ।', zh: '此页面是以文件方式打开的（双击 index.html），没有网址，所以 ChatGPT 无法在这里登录。在线版可立即使用，功能完全相同。' },
    fileBtn: { en: '🌐 Open online version', ne: '🌐 अनलाइन संस्करण खोल्नुहोस्', zh: '🌐 打开在线版' },
    fileLocal: { en: 'Prefer your own copy? Double-click "Start ML Sikshya.bat" in the ML Sikshya folder instead of index.html.', ne: 'आफ्नै कपी चलाउन चाहनुहुन्छ? index.html को सट्टा ML Sikshya फोल्डरमा "Start ML Sikshya.bat" मा डबल-क्लिक गर्नुहोस्।', zh: '想用自己电脑上的副本？请双击 ML Sikshya 文件夹里的 "Start ML Sikshya.bat"，而不是 index.html。' },
    madeByAnswer: { en: 'ML Sikshya was made by <b class="notranslate">Wangden Sherpa</b>, a Master of Business Analytics (MBAN) student at Saint Mary\'s University, as a free and friendly place for everyone to learn machine learning. 💙', ne: 'ML Sikshya <b class="notranslate">Wangden Sherpa</b> ले बनाउनुभएको हो। उहाँ Saint Mary\'s University मा Master of Business Analytics (MBAN) पढ्दै हुनुहुन्छ, र सबैले निःशुल्क मेसिन लर्निङ सिक्न सकून् भनेर यो बनाउनुभयो। 💙', zh: 'ML Sikshya 由 <b class="notranslate">Wangden Sherpa</b> 创建。Wangden Sherpa 正在圣玛丽大学（Saint Mary\'s University）攻读商业分析硕士（MBAN），希望让每个人都能免费学习机器学习。💙' },
    fileShort: { en: 'opened as a file', ne: 'फाइलको रूपमा खोलिएको', zh: '以文件方式打开' },
    aiTimeout: { en: '⏳ The AI took too long to reply. Check your internet and try again.', ne: '⏳ AI ले जवाफ दिन धेरै समय लगायो। इन्टरनेट जाँचेर फेरि प्रयास गर्नुहोस्।', zh: '⏳ AI 回复超时。请检查网络后重试。' },
    aiOops: { en: 'Something went wrong while answering.', ne: 'उत्तर दिँदा केही गडबड भयो।', zh: '回答时出了点问题。' },
    retry: { en: 'Try again', ne: 'फेरि प्रयास', zh: '重试' },
    vChatGPT: { en: '🎙 ChatGPT voice (natural)', ne: '🎙 ChatGPT आवाज (प्राकृतिक)', zh: '🎙 ChatGPT 声音（自然）' },
    vBrowser: { en: '🔈 Browser voice', ne: '🔈 ब्राउजर आवाज', zh: '🔈 浏览器声音' },
    vOaPick: { en: 'ChatGPT voice', ne: 'ChatGPT आवाज', zh: 'ChatGPT 声音' },
    modeCloud: { en: 'Cloud AI · fast', ne: 'क्लाउड AI · छिटो', zh: '云端 AI · 快速' },
    brainT: { en: 'AI brain', ne: 'AI दिमाग', zh: 'AI 大脑' },
    brainCloud: { en: '⚡ ChatGPT (connect once)', ne: '⚡ ChatGPT (एक पटक जोड्नुहोस्)', zh: '⚡ ChatGPT（只需连接一次）' },
    brainAuto: { en: '✨ Free AI (no sign-in)', ne: '✨ निःशुल्क AI (साइन-इन चाहिँदैन)', zh: '✨ 免费 AI（无需登录）' },
    modeFree: { en: 'Free AI', ne: 'निःशुल्क AI', zh: '免费 AI' },
    freeBusy: { en: '⏳ The free AI is very busy right now. Please ask again in a few seconds, or connect ChatGPT in ⚙️ for unlimited answers.', ne: '⏳ निःशुल्क AI अहिले धेरै व्यस्त छ। केही सेकेन्डपछि फेरि सोध्नुहोस्, वा असीमित उत्तरका लागि ⚙️ मा ChatGPT जोड्नुहोस्।', zh: '⏳ 免费 AI 现在非常繁忙。请过几秒再问，或在 ⚙️ 中连接 ChatGPT 获得不限量的回答。' },
    freeNet: { en: '📡 Could not reach the free AI. Check your internet connection and try again.', ne: '📡 निःशुल्क AI सम्म पुग्न सकिएन। इन्टरनेट जाँचेर फेरि प्रयास गर्नुहोस्।', zh: '📡 无法连接免费 AI，请检查网络后重试。' },
    freeLocalhost: { en: '🔁 The free AI does not answer pages opened as "localhost". Open the same page at this address instead (it is your same computer):', ne: '🔁 निःशुल्क AI ले "localhost" मा खोलिएका पेजलाई उत्तर दिँदैन। यही पेज यो ठेगानामा खोल्नुहोस् (यो तपाईंकै कम्प्युटर हो):', zh: '🔁 免费 AI 不回答以 "localhost" 打开的页面。请改用下面这个地址打开同一页面（仍是你自己的电脑）：' },
    freeBusyNotes: { en: '⏳ The free AI is very busy right now, so here is what I found in the lessons. Press "Try again" in a few seconds for a full answer.', ne: '⏳ निःशुल्क AI अहिले धेरै व्यस्त छ, त्यसैले पाठहरूमा भेटिएको कुरा यहाँ छ। पूरा उत्तरका लागि केही सेकेन्डपछि "फेरि प्रयास" थिच्नुहोस्।', zh: '⏳ 免费 AI 现在非常繁忙，下面是我在课程中找到的内容。几秒后点击“重试”即可获得完整回答。' },
    freeBusyS: { en: '⏳ The free AI allows one answer about every {s} seconds. Ask again in a moment, or connect ChatGPT in ⚙️ for unlimited answers.', ne: '⏳ निःशुल्क AI ले लगभग हरेक {s} सेकेन्डमा एउटा मात्र उत्तर दिन्छ। केही बेरमा फेरि सोध्नुहोस्, वा असीमित उत्तरका लागि ⚙️ मा ChatGPT जोड्नुहोस्।', zh: '⏳ 免费 AI 大约每 {s} 秒只能回答一次。请稍后再问，或在 ⚙️ 中连接 ChatGPT 获得不限量的回答。' },
    freeBusyNotesS: { en: '⏳ The free AI needs a short pause (about {s} s), so here is what I found in the lessons. Press "Try again" after that for a full answer.', ne: '⏳ निःशुल्क AI लाई छोटो विश्राम चाहिन्छ (करिब {s} सेकेन्ड), त्यसैले पाठहरूमा भेटिएको कुरा यहाँ छ। त्यसपछि पूरा उत्तरका लागि "फेरि प्रयास" थिच्नुहोस्।', zh: '⏳ 免费 AI 需要稍作休息（约 {s} 秒），下面是我在课程中找到的内容。之后点击“重试”即可获得完整回答。' },
    freeBusySay: { en: 'The free AI is busy right now, so I have put what I found in the lessons on the screen. Try again in a few seconds.', ne: 'निःशुल्क AI अहिले व्यस्त छ, त्यसैले पाठहरूमा भेटिएको कुरा स्क्रिनमा राखेको छु। केही सेकेन्डपछि फेरि प्रयास गर्नुहोस्।', zh: '免费 AI 现在很忙，我把课程里找到的内容放在屏幕上了。请几秒后再试。' },
    freeBlocked: { en: '🛡️ The free AI could not verify this page. Please use the online version:', ne: '🛡️ निःशुल्क AI ले यो पेज प्रमाणित गर्न सकेन। कृपया अनलाइन संस्करण प्रयोग गर्नुहोस्:', zh: '🛡️ 免费 AI 无法验证此页面，请使用在线版：' },
    freeWait: { en: '⏳ Lots of learners right now, answering in {s} s…', ne: '⏳ अहिले धेरै विद्यार्थी, {s} सेकेन्डमा उत्तर दिँदै…', zh: '⏳ 当前学习者较多，{s} 秒后回答…' },
    cgptWhy: { en: 'Optional: even smarter answers and the natural ChatGPT voice.', ne: 'ऐच्छिक: अझ स्मार्ट उत्तर र प्राकृतिक ChatGPT आवाज।', zh: '可选：更聪明的回答和自然的 ChatGPT 声音。' },
    vNeedsConnect: { en: 'The ChatGPT voice needs ChatGPT connected (see AI brain below). Until then, your browser\'s most natural voice speaks.', ne: 'ChatGPT आवाजका लागि ChatGPT जोडिएको हुनुपर्छ (तल AI दिमाग हेर्नुहोस्)। त्यतिन्जेल तपाईंको ब्राउजरको सबैभन्दा प्राकृतिक आवाज बोल्छ।', zh: 'ChatGPT 声音需要先连接 ChatGPT（见下方 AI 大脑）。在此之前，会使用浏览器中最自然的声音。' },
    vEdgeTip: { en: 'Tip: for a much more human free voice, open ML Sikshya in Microsoft Edge. It has "Natural" voices built in.', ne: 'सुझाव: अझ मानवजस्तो निःशुल्क आवाजका लागि ML Sikshya लाई Microsoft Edge मा खोल्नुहोस्। त्यसमा "Natural" आवाज हुन्छन्।', zh: '提示：想要更像真人的免费声音，请在 Microsoft Edge 中打开 ML Sikshya，它内置 "Natural" 自然语音。' },
    brainLocal: { en: '🧠 On my device', ne: '🧠 मेरो उपकरणमा', zh: '🧠 本机' },
    brainOff: { en: '📴 Offline', ne: '📴 अफलाइन', zh: '📴 离线' },
    brainHelp: { en: '✨ Free AI answers straight away for everyone, with no account and no key (it uses the open GPT-OSS model from Pollinations.ai; questions are sent there privately). Once you connect ChatGPT, it switches to ChatGPT automatically for even smarter answers and the ChatGPT voice. 🧠 runs a small AI on your own device, 🤖 uses your own WANG AI server, 📴 works without internet.', ne: '✨ निःशुल्क AI ले सबैलाई तुरुन्तै उत्तर दिन्छ, खाता वा key चाहिँदैन (यसले Pollinations.ai को खुला GPT-OSS मोडेल प्रयोग गर्छ; प्रश्नहरू त्यहाँ निजी रूपमा पठाइन्छन्)। ChatGPT जोडेपछि अझ स्मार्ट उत्तर र ChatGPT आवाजका लागि यो आफैँ ChatGPT मा जान्छ। 🧠 ले तपाईंकै उपकरणमा सानो AI चलाउँछ, 🤖 ले तपाईंको WANG AI सर्भर प्रयोग गर्छ, 📴 इन्टरनेट बिना चल्छ।', zh: '✨ 免费 AI 可以立即为所有人回答，无需账户和密钥（使用 Pollinations.ai 的开放 GPT-OSS 模型，问题会以私密方式发送到那里）。连接 ChatGPT 后会自动切换到 ChatGPT，回答更聪明，并使用 ChatGPT 声音。🧠 在你自己的设备上运行小型 AI，🤖 使用你自己的 WANG AI 服务器，📴 无需联网。' },
    aiTeacher: { en: 'AI Teacher', ne: 'AI शिक्षक', zh: 'AI 老师' },
    avBuild: { en: 'Design your teacher', ne: 'आफ्नो शिक्षक डिजाइन गर्नुहोस्', zh: '设计你的老师' },
    av_skin: { en: 'Skin', ne: 'छाला', zh: '肤色' }, av_hair: { en: 'Hair', ne: 'कपाल', zh: '发色' }, av_shirt: { en: 'Clothes', ne: 'लुगा', zh: '衣服' }, av_eyes: { en: 'Eyes', ne: 'आँखा', zh: '眼睛' },
    av_style: { en: 'Hairstyle', ne: 'कपालको शैली', zh: '发型' }, av_glasses: { en: 'Glasses', ne: 'चस्मा', zh: '眼镜' },
    st_short: { en: 'Short', ne: 'छोटो', zh: '短发' }, st_long: { en: 'Long', ne: 'लामो', zh: '长发' }, st_bun: { en: 'Bun', ne: 'जुरो', zh: '发髻' }, st_curly: { en: 'Curly', ne: 'घुम्रिएको', zh: '卷发' },
    voiceTitle: { en: 'Voice', ne: 'आवाज', zh: '声音' }, voicePick: { en: 'Voice (pick a "Natural" one for the most human sound)', ne: 'आवाज (सबैभन्दा मानवीय आवाजका लागि "Natural" छान्नुहोस्)', zh: '声音（选择带 “Natural” 的最像真人）' },
    voiceAuto: { en: 'Best available (automatic)', ne: 'उपलब्ध उत्तम (स्वचालित)', zh: '最佳可用（自动）' }, voiceSpeed: { en: 'Speed', ne: 'गति', zh: '语速' }, voicePitch: { en: 'Pitch', ne: 'स्वर', zh: '音调' }, voiceTest: { en: 'Test', ne: 'परीक्षण', zh: '试听' },
    voiceSample: { en: 'Hi! I am your AI teacher. Ask me anything, and we will figure it out together.', ne: 'नमस्ते! म तपाईंको AI शिक्षक हुँ। जे पनि सोध्नुहोस्, हामी सँगै बुझौंला।', zh: '你好！我是你的 AI 老师。有什么问题尽管问，我们一起弄明白。' },
  });
  // ---------- Error Doctor rules ----------
  const R = (en, ne, zh) => ({ en, ne, zh });
  const RULES = [
    [/ModuleNotFoundError: No module named '([^']+)'/, (m) => R([`The library "${m[1]}" is not available here.`, 'This site runs Python inside your browser. Available: numpy, pandas, matplotlib, scikit-learn, scipy. Big libraries such as torch / tensorflow need your own computer or Google Colab.'], [`"${m[1]}" लाइब्रेरी यहाँ उपलब्ध छैन।`, 'यो साइटले ब्राउजरभित्र Python चलाउँछ। उपलब्ध: numpy, pandas, matplotlib, scikit-learn, scipy। torch / tensorflow जस्ता ठूला लाइब्रेरीका लागि आफ्नै कम्प्युटर वा Google Colab चाहिन्छ।'], [`这里没有 "${m[1]}" 这个库。`, '本网站在浏览器里运行 Python，可用的库有：numpy、pandas、matplotlib、scikit-learn、scipy。torch / tensorflow 等大型库需要在自己的电脑或 Google Colab 上使用。'])],
    [/NameError: name '([^']+)' is not defined/, (m) => R([`Python doesn't know "${m[1]}" — it was never created, or it is spelled differently.`, `Check the spelling (Python is case-sensitive). If "${m[1]}" is created in another code box, run that box first. Did you forget an import (e.g. import numpy as np)?`], [`Python लाई "${m[1]}" थाहा छैन — यो कहिल्यै बनाइएन, वा हिज्जे फरक छ।`, `हिज्जे जाँच्नुहोस् (Python ले ठूलो/सानो अक्षर फरक गन्छ)। "${m[1]}" अर्को कोड बाकसमा बनेको भए पहिले त्यो चलाउनुहोस्। import बिर्सनुभयो (जस्तै import numpy as np)?`], [`Python 不认识 "${m[1]}"——它没有被创建，或者拼写不同。`, `检查拼写（Python 区分大小写）。如果 "${m[1]}" 是在另一个代码框里创建的，请先运行那个代码框。是不是忘了 import（例如 import numpy as np）？`])],
    [/KeyError: (.+)/, (m) => R([`The column or key ${m[1]} does not exist.`, 'Print the real names with print(df.columns). Watch for spaces, capital letters and typos — "Price" ≠ "price ".'], [`${m[1]} नामको column वा key छैन।`, 'वास्तविक नाम print(df.columns) ले हेर्नुहोस्। स्पेस, ठूलो अक्षर र हिज्जेमा ध्यान दिनुहोस् — "Price" ≠ "price "।'], [`列名或键 ${m[1]} 不存在。`, '用 print(df.columns) 查看真实的列名。注意空格、大小写和拼写——"Price" ≠ "price "。'])],
    [/IndentationError|unexpected indent|expected an indented block/, () => R(['The spaces at the start of a line are wrong.', 'Lines inside if / for / def must be indented by exactly 4 spaces, and lines at the same level must line up.'], ['लाइनको सुरुको स्पेस गलत छ।', 'if / for / def भित्रका लाइन ठ्याक्कै ४ स्पेसले भित्र हुनुपर्छ, र एउटै तहका लाइन मिलेका हुनुपर्छ।'], ['行首的缩进（空格）不对。', 'if / for / def 里面的代码要缩进 4 个空格，同一层级的代码要对齐。'])],
    [/could not convert string to float: (.+)/, (m) => R([`A text value (${m[1]}) reached a place that needs numbers.`, 'Models only accept numbers. Encode text columns with pd.get_dummies() / OneHotEncoder, or convert number-like text with pd.to_numeric(col, errors="coerce").'], [`Text मान (${m[1]}) संख्या चाहिने ठाउँमा पुग्यो।`, 'मोडेलले संख्या मात्र लिन्छ। Text column लाई pd.get_dummies() / OneHotEncoder ले encode गर्नुहोस्, वा संख्या जस्तो text लाई pd.to_numeric(col, errors="coerce") ले बदल्नुहोस्।'], [`文本值 (${m[1]}) 出现在了需要数字的地方。`, '模型只接受数字。用 pd.get_dummies() / OneHotEncoder 对文本列编码，或用 pd.to_numeric(col, errors="coerce") 把像数字的文本转换成数字。'])],
    [/Input (X )?contains NaN|contains NaN|NaN, infinity/, () => R(['Your data has missing values (NaN) and this model cannot handle them.', 'Fill them first: SimpleImputer(strategy="median"), df.fillna(df.median(numeric_only=True)), or remove rows with df.dropna().'], ['डाटामा हराएका मान (NaN) छन् र यो मोडेलले सम्हाल्न सक्दैन।', 'पहिले भर्नुहोस्: SimpleImputer(strategy="median"), df.fillna(df.median(numeric_only=True)), वा df.dropna() ले row हटाउनुहोस्।'], ['数据中有缺失值（NaN），这个模型无法处理。', '先填充：SimpleImputer(strategy="median")、df.fillna(df.median(numeric_only=True))，或用 df.dropna() 删除这些行。'])],
    [/Expected 2D array, got 1D array/, () => R(['scikit-learn wants X as a table (2-D), but got a single list (1-D).', 'Use X.reshape(-1, 1) for one feature, or df[["col"]] (double brackets) instead of df["col"].'], ['scikit-learn लाई X तालिका (2-D) चाहिन्छ, तर एउटा सूची (1-D) पायो।', 'एउटा feature का लागि X.reshape(-1, 1) प्रयोग गर्नुहोस्, वा df["col"] को सट्टा df[["col"]] (दोहोरो कोष्ठक)।'], ['scikit-learn 需要二维表格形式的 X，但收到的是一维列表。', '只有一个特征时用 X.reshape(-1, 1)，或用 df[["col"]]（双中括号）代替 df["col"]。'])],
    [/inconsistent numbers of samples/, () => R(['X and y have a different number of rows.', 'Print X.shape and len(y). Make sure you filtered / dropped rows from both together (e.g. drop NaN before splitting into X and y).'], ['X र y मा फरक संख्याका row छन्।', 'X.shape र len(y) print गर्नुहोस्। दुवैबाट सँगै row फिल्टर / हटाएको सुनिश्चित गर्नुहोस् (जस्तै X र y छुट्याउनु अघि NaN हटाउने)।'], ['X 和 y 的行数不一样。', '打印 X.shape 和 len(y)。确保两者一起过滤/删除行（例如先删除 NaN，再拆分 X 和 y）。'])],
    [/shapes .* not aligned|matmul: Input operand|operands could not be broadcast/, () => R(['The array shapes do not fit together for this operation.', 'Print .shape of every array. For A @ B the inner sizes must match: (n, k) @ (k, m). Use .T or .reshape() to fix.'], ['यो गणनाका लागि array का shape मिल्दैनन्।', 'हरेक array को .shape print गर्नुहोस्। A @ B का लागि भित्री आकार मिल्नुपर्छ: (n, k) @ (k, m)। .T वा .reshape() ले सच्याउनुहोस्।'], ['数组的形状不匹配，无法进行这个运算。', '打印每个数组的 .shape。A @ B 要求中间维度相同：(n, k) @ (k, m)。用 .T 或 .reshape() 修正。'])],
    [/Unknown label type: '?continuous/, () => R(['You used a classifier on a numeric target (continuous numbers).', 'For predicting numbers use a regressor (LinearRegression, RandomForestRegressor). Use classifiers only for categories.'], ['संख्यात्मक target (निरन्तर संख्या) मा classifier प्रयोग गर्नुभयो।', 'संख्या अनुमानका लागि regressor (LinearRegression, RandomForestRegressor) प्रयोग गर्नुहोस्। Classifier श्रेणीका लागि मात्र।'], ['你对连续数值目标使用了分类器。', '预测数字要用回归模型（LinearRegression、RandomForestRegressor），分类器只用于类别。'])],
    [/NotFittedError|is not fitted yet/, () => R(['You asked the model to predict before it learned anything.', 'Call model.fit(X_train, y_train) first, then model.predict(...).'], ['मोडेलले केही नसिकी अनुमान गर्न लगाउनुभयो।', 'पहिले model.fit(X_train, y_train), अनि model.predict(...)।'], ['模型还没学习就被要求预测。', '先调用 model.fit(X_train, y_train)，再调用 model.predict(...)。'])],
    [/FileNotFoundError|No such file or directory/, () => R(['The file path does not exist in the browser.', 'Upload the file in 📊 Data Lab, then read it as pd.read_csv("/data/your_file.csv") — or use DATA["your_file.csv"].'], ['त्यो फाइल ब्राउजरमा छैन।', '📊 डाटा ल्याबमा फाइल अपलोड गरेर pd.read_csv("/data/your_file.csv") ले पढ्नुहोस् — वा DATA["your_file.csv"] प्रयोग गर्नुहोस्।'], ['浏览器里没有这个文件路径。', '先在 📊 数据实验室上传文件，再用 pd.read_csv("/data/your_file.csv") 读取——或直接用 DATA["your_file.csv"]。'])],
    [/UnicodeDecodeError/, () => R(['The file is not saved in UTF-8 text encoding.', 'Try pd.read_csv(path, encoding="latin-1"), or re-save the file as "CSV UTF-8" in Excel.'], ['फाइल UTF-8 encoding मा सेभ गरिएको छैन।', 'pd.read_csv(path, encoding="latin-1") प्रयास गर्नुहोस्, वा Excel मा "CSV UTF-8" को रूपमा फेरि सेभ गर्नुहोस्।'], ['文件不是 UTF-8 编码。', '试试 pd.read_csv(path, encoding="gbk") 或 encoding="latin-1"，或在 Excel 中另存为 "CSV UTF-8"。'])],
    [/ParserError|Error tokenizing data/, () => R(['pandas could not split the file into columns.', 'The separator may be ; or tab: try pd.read_csv(path, sep=";") or sep="\\t". Some rows may have extra commas.'], ['pandas ले फाइललाई column मा बाँड्न सकेन।', 'Separator ; वा tab हुन सक्छ: pd.read_csv(path, sep=";") वा sep="\\t" प्रयास गर्नुहोस्। केही row मा बढी comma हुन सक्छ।'], ['pandas 无法把文件拆分成列。', '分隔符可能是 ; 或制表符：试试 pd.read_csv(path, sep=";") 或 sep="\\t"。有些行可能多了逗号。'])],
    [/ZeroDivisionError/, () => R(['You divided by zero.', 'Check the denominator before dividing (e.g. if n > 0), or add a tiny number: x / (n + 1e-9).'], ['शून्यले भाग गर्नुभयो।', 'भाग गर्नु अघि हर जाँच्नुहोस् (जस्तै if n > 0), वा सानो संख्या थप्नुहोस्: x / (n + 1e-9)।'], ['除数为零。', '除法前先检查分母（例如 if n > 0），或加一个很小的数：x / (n + 1e-9)。'])],
    [/IndexError/, () => R(['You asked for a position that does not exist.', 'Lists start at 0, so a list of 5 items has positions 0–4. Print len(...) or .shape before indexing.'], ['अस्तित्वमा नभएको स्थान माग्नुभयो।', 'List 0 बाट सुरु हुन्छ, त्यसैले ५ वस्तुको list मा स्थान 0–4 हुन्छन्। Index गर्नु अघि len(...) वा .shape print गर्नुहोस्।'], ['访问了不存在的位置（索引越界）。', '列表从 0 开始，5 个元素的位置是 0–4。取索引前先打印 len(...) 或 .shape。'])],
    [/AttributeError: '(\w+)' object has no attribute '(\w+)'/, (m) => R([`A ${m[1]} object does not have "${m[2]}".`, `Check the spelling, and check the object's type with type(x). Maybe "${m[2]}" belongs to a different object (e.g. a DataFrame method used on a NumPy array).`], [`${m[1]} object मा "${m[2]}" छैन।`, `हिज्जे जाँच्नुहोस्, र type(x) ले object को प्रकार हेर्नुहोस्। "${m[2]}" अर्कै object को हुन सक्छ (जस्तै DataFrame को method NumPy array मा)।`], [`${m[1]} 对象没有 "${m[2]}" 属性。`, `检查拼写，并用 type(x) 查看对象类型。"${m[2]}" 可能属于别的对象（例如把 DataFrame 的方法用在了 NumPy 数组上）。`])],
    [/TypeError: unsupported operand|can only concatenate|must be str, not/, () => R(['You mixed types that cannot be combined (e.g. text + number).', 'Convert first: str(5) + "kg", or int("5") + 3. Check column types with df.dtypes.'], ['मिलाउन नमिल्ने प्रकार मिसाउनुभयो (जस्तै text + संख्या)।', 'पहिले बदल्नुहोस्: str(5) + "kg", वा int("5") + 3। Column प्रकार df.dtypes ले हेर्नुहोस्।'], ['混用了不能组合的类型（例如文本 + 数字）。', '先转换类型：str(5) + "kg" 或 int("5") + 3。用 df.dtypes 查看各列类型。'])],
    [/SyntaxError/, () => R(['Python could not read the code — something is missing.', 'Look near the line shown: a missing ), ], quote " or a colon : after if / for / def is the usual cause.'], ['Python ले कोड पढ्न सकेन — केही छुटेको छ।', 'देखाइएको लाइन नजिक हेर्नुहोस्: ), ], उद्धरण " वा if / for / def पछिको colon : छुट्नु सामान्य कारण हो।'], ['Python 读不懂这段代码——少了什么东西。', '看提示的那一行附近：常见原因是少了 )、]、引号 " 或 if / for / def 后面的冒号 :。'])],
    [/MemoryError|Out of memory/, () => R(['The data is too big for the browser memory.', 'Work on a sample: df = df.sample(20000, random_state=0), or drop unneeded columns.'], ['डाटा ब्राउजरको मेमोरीका लागि धेरै ठूलो छ।', 'नमुनामा काम गर्नुहोस्: df = df.sample(20000, random_state=0), वा नचाहिने column हटाउनुहोस्।'], ['数据太大，浏览器内存不够。', '先用样本：df = df.sample(20000, random_state=0)，或删除不需要的列。'])],
    [/ConvergenceWarning|failed to converge/, () => R(['The model did not finish learning in the allowed steps.', 'Scale the features (StandardScaler) and/or increase max_iter, e.g. LogisticRegression(max_iter=2000).'], ['अनुमति दिइएका पाइलामा मोडेलले सिकाइ पूरा गरेन।', 'Feature scale गर्नुहोस् (StandardScaler) र/वा max_iter बढाउनुहोस्, जस्तै LogisticRegression(max_iter=2000)।'], ['模型在允许的迭代次数内没有收敛。', '对特征做标准化（StandardScaler），并/或增大 max_iter，例如 LogisticRegression(max_iter=2000)。'])],
    [/ValueError/, () => R(['A function received a value it cannot use.', 'Read the last line of the error carefully — it usually says which value is wrong. Print the shapes and types of your inputs.'], ['फङ्सनले प्रयोग गर्न नसक्ने मान पायो।', 'Error को अन्तिम लाइन ध्यानले पढ्नुहोस् — प्रायः कुन मान गलत छ भन्छ। इनपुटको shape र प्रकार print गर्नुहोस्।'], ['函数收到了一个无法使用的值。', '仔细读错误信息的最后一行——通常会说明哪个值不对。打印输入数据的形状和类型。'])],
  ];
  function diagnose(err) {
    for (const [re, f] of RULES) { const m = String(err).match(re); if (m) return f(m); }
    return R(['Something went wrong while running the code.', 'Read the last line of the error message — it names the problem. Run smaller pieces of code and print values to find the line that fails.'], ['कोड चलाउँदा केही गडबड भयो।', 'Error सन्देशको अन्तिम लाइन पढ्नुहोस् — यसले समस्याको नाम बताउँछ। सानो-सानो कोड चलाएर र मान print गरेर असफल लाइन खोज्नुहोस्।'], ['运行代码时出了问题。', '读错误信息的最后一行——它会写出问题名称。把代码分成小段运行，并打印变量，找到出错的那一行。']);
  }
  MLS.diagnose = diagnose;

  MLS.hooks.error.push((outEl, err) => {
    const d = t(diagnose(err));
    const box = h(`<div class="doctor"><div class="doctor-head">🩺 ${u('doctorTitle')}</div>
      <div><b>${u('whyErr')}:</b> ${esc(d[0])}</div><div><b>${u('fixErr')}:</b> ${esc(d[1])}</div>
      <button class="doctor-ask">${u('doctorAsk')}</button></div>`);
    box.querySelector('.doctor-ask').onclick = () => openTutor(t({ en: 'I got this error. Explain what it means in simple words and show me the corrected code.', ne: 'मलाई यो error आयो। सरल भाषामा यसको अर्थ बुझाएर सच्याइएको कोड देखाउनुहोस्।', zh: '我遇到了这个错误。请用简单的话解释它的意思，并给我改正后的代码。' }));
    outEl.appendChild(box);
  });

  // ---------- Human avatar, drawn entirely in code (no photos) ----------
  // Blinks, looks around, sways, and moves its lips in time with its speech (driven by the --mouth CSS variable).
  const AV_OPTS = {
    skin: ['#f6d7c3', '#eac09a', '#d9a679', '#c68642', '#a86b3c', '#7d4a2a'],
    hair: ['#1c1917', '#3b2314', '#6b3e1f', '#a16207', '#9ca3af', '#7c2d12'],
    style: ['short', 'long', 'bun', 'curly'],
    shirt: ['#4f46e5', '#0f766e', '#be123c', '#334155', '#ca8a04', '#7c3aed'],
    eyes: ['#3b2314', '#1e3a8a', '#166534', '#57534e'],
  };
  const AV_DEFAULT = { skin: '#eac09a', hair: '#1c1917', style: 'short', shirt: '#4f46e5', eyes: '#3b2314', glasses: true };
  const shade = (hex, amt) => { const n = parseInt(hex.slice(1), 16); const c = (v) => Math.max(0, Math.min(255, Math.round(v + amt * 255))); return '#' + [c(n >> 16), c((n >> 8) & 255), c(n & 255)].map((v) => v.toString(16).padStart(2, '0')).join(''); };
  const avatarSVG = (_k, cls = '') => {
    const A = { ...AV_DEFAULT, ...cfg.av }, id = 'h' + Math.random().toString(36).slice(2, 8);
    const hairBack = { long: `<path d="M50 88 C44 140 52 176 70 186 L130 186 C148 176 156 140 150 88 C150 52 128 34 100 34 C72 34 50 52 50 88Z" fill="url(#hr${id})"/>`, bun: `<circle cx="100" cy="30" r="17" fill="url(#hr${id})"/>`, curly: `<g fill="url(#hr${id})">${[[62, 62], [74, 46], [92, 38], [110, 38], [128, 46], [140, 62], [146, 82], [54, 82]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16"/>`).join('')}</g>`, short: '' }[A.style] || '';
    const hairFront = {
      short: `<path d="M54 88 C52 54 74 38 100 38 C128 38 150 54 146 90 C140 72 128 62 112 60 C100 66 82 66 70 62 C62 68 57 76 54 88Z" fill="url(#hr${id})"/>`,
      long: `<path d="M54 92 C52 54 74 38 100 38 C128 38 150 54 146 92 C138 70 120 58 100 58 C86 58 74 62 66 70 C60 76 56 84 54 92Z" fill="url(#hr${id})"/>`,
      bun: `<path d="M55 86 C54 54 76 40 100 40 C126 40 148 54 145 86 C136 66 120 58 100 58 C80 58 64 66 55 86Z" fill="url(#hr${id})"/>`,
      curly: `<path d="M56 86 C56 60 76 48 100 48 C124 48 144 60 144 86 C134 70 118 64 100 66 C84 64 66 70 56 86Z" fill="url(#hr${id})"/>`,
    }[A.style];
    return `<svg viewBox="0 0 200 200" class="hv ${cls}" aria-hidden="true">
      <defs>
        <radialGradient id="bg${id}" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="${shade(A.shirt, 0.42)}"/><stop offset="1" stop-color="${shade(A.shirt, 0.12)}"/></radialGradient>
        <radialGradient id="sk${id}" cx="44%" cy="38%" r="70%"><stop offset="0" stop-color="${shade(A.skin, 0.08)}"/><stop offset=".72" stop-color="${A.skin}"/><stop offset="1" stop-color="${shade(A.skin, -0.12)}"/></radialGradient>
        <linearGradient id="sh${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(A.shirt, 0.08)}"/><stop offset="1" stop-color="${shade(A.shirt, -0.14)}"/></linearGradient>
        <linearGradient id="hr${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(A.hair, 0.14)}"/><stop offset="1" stop-color="${shade(A.hair, -0.06)}"/></linearGradient>
        <radialGradient id="ir${id}" cx="45%" cy="40%" r="60%"><stop offset="0" stop-color="${shade(A.eyes, 0.25)}"/><stop offset="1" stop-color="${A.eyes}"/></radialGradient>
        <clipPath id="ce${id}"><circle cx="100" cy="100" r="100"/></clipPath>
      </defs>
      <g clip-path="url(#ce${id})">
      <circle cx="100" cy="100" r="100" fill="url(#bg${id})"/>
      <g class="hv-body">
        ${hairBack}
        <path d="M24 210 C28 168 58 152 100 152 C142 152 172 168 176 210Z" fill="url(#sh${id})"/>
        <path d="M84 150 L100 176 L116 150" fill="${shade(A.skin, -0.06)}"/>
        <path d="M80 152 L100 178 L92 152Z M120 152 L100 178 L108 152Z" fill="${shade(A.shirt, 0.25)}"/>
        <path d="M86 122 L86 152 Q100 162 114 152 L114 122Z" fill="${shade(A.skin, -0.09)}"/>
        <g class="hv-head">
          <ellipse cx="55" cy="100" rx="7.5" ry="13" fill="${shade(A.skin, -0.05)}"/><ellipse cx="145" cy="100" rx="7.5" ry="13" fill="${shade(A.skin, -0.05)}"/>
          <path d="M100 42 C131 42 147 64 147 94 C147 128 127 152 100 152 C73 152 53 128 53 94 C53 64 69 42 100 42Z" fill="url(#sk${id})"/>
          <ellipse cx="74" cy="114" rx="10" ry="6" fill="#f472b6" opacity=".18"/><ellipse cx="126" cy="114" rx="10" ry="6" fill="#f472b6" opacity=".18"/>
          ${hairFront}
          <path class="hv-brows" d="M68 82 Q79 76 90 80 M110 80 Q121 76 132 82" stroke="${shade(A.hair, -0.02)}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
          ${[79, 121].map((x) => `<g class="hv-eye">
            <path d="M${x - 11} 96 Q${x} 87 ${x + 11} 96 Q${x} 103 ${x - 11} 96Z" fill="#fff"/>
            <g class="hv-iris"><circle cx="${x}" cy="95.5" r="5.2" fill="url(#ir${id})"/><circle cx="${x}" cy="95.5" r="2.3" fill="#0b0b0b"/><circle cx="${x + 1.8}" cy="93.6" r="1.3" fill="#fff"/></g>
            <path d="M${x - 11.5} 96 Q${x} 86.5 ${x + 11.5} 96" stroke="${shade(A.skin, -0.35)}" stroke-width="1.6" fill="none"/>
            <path class="hv-lid" d="M${x - 12} 96 Q${x} 85 ${x + 12} 96 Q${x} 98 ${x - 12} 96Z" fill="${shade(A.skin, -0.03)}"/></g>`).join('')}
          ${A.glasses ? `<g fill="rgba(255,255,255,.08)" stroke="${shade(A.hair, 0.05)}" stroke-width="2.2"><rect x="63" y="85" width="32" height="22" rx="9"/><rect x="105" y="85" width="32" height="22" rx="9"/><path d="M95 93 Q100 89 105 93" fill="none"/></g>` : ''}
          <path d="M100 96 Q97 108 92 113 Q96 117 100 115 Q104 117 108 113" stroke="${shade(A.skin, -0.2)}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <g class="hv-mouth">
            <path class="hv-open" d="M87 128 Q100 125 113 128 Q100 142 87 128Z" fill="#5b1a1a"/>
            <path class="hv-teeth" d="M90 128.5 Q100 126.5 110 128.5 L109 130.5 Q100 129 91 130.5Z" fill="#fff"/>
            <path d="M86 128 Q93 123.5 100 126 Q107 123.5 114 128 Q100 130 86 128Z" fill="${shade(A.skin, -0.28)}"/>
            <path class="hv-lower" d="M87 129 Q100 138 113 129 Q100 134 87 129Z" fill="${shade(A.skin, -0.22)}"/>
          </g>
        </g>
      </g></g>
    </svg>`;
  };
  MLS.avatarSVG = avatarSVG;

  // Lip-sync & life: one animation loop drives every avatar on the page through CSS variables.
  const mouthState = { target: 0, value: 0, talkingUntil: 0 };
  const lipPulse = (strength = 1) => { mouthState.target = 0.45 + Math.random() * 0.55 * strength; mouthState.talkingUntil = performance.now() + 220; };
  function lifeLoop() {
    const now = performance.now(), root = document.documentElement.style;
    const speakingNow = (synth && synth.speaking) || audioPlaying || (typeof call !== 'undefined' && call && call.speaking);
    if (audioPlaying && curAnalysed) mouthState.target = Math.min(1, audioLevel() * 1.25);
    else if (speakingNow && now > mouthState.talkingUntil) mouthState.target = 0.15 + Math.abs(Math.sin(now / 85) * Math.sin(now / 47)) * 0.75;
    if (!speakingNow && now > mouthState.talkingUntil) mouthState.target = 0;
    mouthState.value += (mouthState.target - mouthState.value) * 0.35;
    root.setProperty('--mouth', mouthState.value.toFixed(3));
    if (!lifeLoop.next || now > lifeLoop.next) {
      lifeLoop.next = now + 1500 + Math.random() * 2500;
      root.setProperty('--lx', ((Math.random() - 0.5) * 4).toFixed(2) + 'px');
      root.setProperty('--ly', ((Math.random() - 0.5) * 2).toFixed(2) + 'px');
    }
    requestAnimationFrame(lifeLoop);
  }
  setTimeout(lifeLoop, 0);

  // ---------- Settings ----------
  const MODELS = [
    ['claude-opus-5-5', 'Claude Opus 5.5 — best answers'],
    ['claude-sonnet-5-5', 'Claude Sonnet 5.5 — fast & capable'],
    ['claude-haiku-5-5', 'Claude Haiku 5.5 — cheapest & fastest'],
  ];
  const VOICES = [['auto', 'Auto (site language)'], ['en-US', 'English (US)'], ['en-IN', 'English (India)'], ['ne-NP', 'नेपाली'], ['hi-IN', 'हिन्दी'], ['zh-CN', '中文 (普通话)'], ['zh-TW', '中文 (台灣)'], ['ja-JP', '日本語'], ['ko-KR', '한국어'], ['es-ES', 'Español'], ['fr-FR', 'Français'], ['de-DE', 'Deutsch'], ['ar-SA', 'العربية'], ['ru-RU', 'Русский'], ['pt-BR', 'Português'], ['bn-IN', 'বাংলা']];
  const cfg = {
    key: store.get('ai-key', ''), model: store.get('ai-model', 'claude-opus-5-5'),
    voice: store.get('ai-voice', 'auto'), speak: store.get('ai-speak', true), av: store.get('ai-avatar', {}), voiceName: store.get('ai-voiceName', ''), rate: store.get('ai-rate', 1), pitch: store.get('ai-pitch', 1),
  };
  const teacherName = () => u('aiTeacher');
  let history = [];

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
  const SITE_LANG = { en: 'English', ne: 'Nepali (Devanagari script)', zh: 'Simplified Chinese' };
  const persona = () => 'a warm, patient, encouraging human teacher who speaks naturally like a real person in a one-to-one class — friendly, curious, uses everyday examples, and is never robotic.';
  // Who made this website: the AI teacher knows it and says so warmly when asked.
  const ABOUT = 'About this website: ML Sikshya was created by Wangden Sherpa, a Master of Business Analytics (MBAN) student at Saint Mary\'s University, as a free and friendly place where anyone can learn machine learning in English, Nepali or Chinese. If anyone asks who made, built, created or owns ML Sikshya or this AI teacher, say warmly and proudly that Wangden Sherpa built it while doing the MBAN at Saint Mary\'s University (the teacher\'s answers come from an AI language model, but the website, lessons and AI teacher were designed and built by Wangden Sherpa). Always refer to Wangden Sherpa by name (for example "Wangden built it while doing the MBAN"); never use he, she, his, her, him or hers for Wangden.';
  const SYSTEM = (voice, small) => `You are ${teacherName()}, a human-like AI teacher and personal assistant inside "ML Sikshya", a free learning website. Your personality — ${persona()}

${ABOUT}

What you can help with: ANY question the learner asks — every school and university subject (maths, physics, chemistry, biology, history, geography, economics, accounting, languages, literature), programming in any language, computers and technology, careers and job applications, study skills, writing and translation, general knowledge and everyday life. You are ALSO an expert machine-learning, data-science and AI teacher, which is the main topic of this website. Never refuse or redirect a normal question just because it is not about machine learning — answer it fully and helpfully, like a brilliant private tutor. If you are not sure about a fact, say so honestly instead of guessing. Do not help with anything harmful or dangerous.

Language: always reply in the same language as the learner's latest message — English, Nepali, Chinese, Hindi or any other language; romanized Nepali gets a reply in Nepali. If you can't tell, use ${MLS.extLang ? MLS.extLang.name : SITE_LANG[MLS.S.lang] || 'English'}. Keep standard technical terms in English when that is clearer.

How to teach:
- Answer the question directly first, then explain. Use an everyday analogy for hard ideas, then the exact concept, then how and where it is used.
- Code: complete, runnable examples in \`\`\`python blocks (or the language asked). On this site, Python runs in the browser with numpy, pandas, matplotlib, scikit-learn and scipy (no PyTorch/TensorFlow). Uploaded files are DATA["<name>"] or /data/<name>.
- For errors: what it means, why it happened, and the corrected code.
- When a lesson or real-world mission on this site fits, mention it by name.
- Sound like a real person talking, not a textbook or a robot: use contractions (it's, you'll, let's), plain everyday words, varied sentence lengths and a little warmth or light humour. React naturally to what the learner says ("Ah, good question!", "Nice, you're close!") but vary it and don't open every answer the same way. Never say "As an AI".
- Be encouraging and human. ${small ? 'Keep answers focused (under about 250 words).' : 'Ask a short check-your-understanding question at the end when it helps.'}
${voice ? '- The learner is TALKING to you by voice and will HEAR your reply, so write exactly what a friendly teacher would SAY on a video call: short, natural spoken sentences (about 3–6), contractions and everyday words, starting with the direct answer or a quick natural reaction. No lists, headings, tables, emojis, symbols, markdown or code (unless asked). Say numbers and maths the way people speak them ("x squared", "zero point eight"). It is fine to end with a short, friendly question to keep the chat going.' : '- Use short paragraphs, lists and headings where they help, but keep simple answers simple and conversational.'}

Current context:
${small ? smallContext() : context()}`;
  function smallContext() {
    const parts = [];
    if (MLS.route === 'learn') { const L = window.COURSE.lessons.find((l) => l.id === MLS.routeArg); if (L) parts.push(`The learner is studying the lesson "${L.title.en}".`); }
    if (MLS.lastRun && MLS.lastRun.err && Date.now() - MLS.lastRun.at < 30 * 60 * 1000) parts.push(`Their last code failed with: ${MLS.lastRun.err.split('\n').slice(-2).join(' ').slice(0, 300)}`);
    return parts.join('\n') || 'General conversation.';
  }

  // ---------- Free AI that runs on the learner's own device (WebLLM + WebGPU, no key, works for everyone) ----------
  const LOCAL_MODELS = [
    ['Qwen2.5-1.5B-Instruct-q4f16_1-MLC', 'Qwen 2.5 · 1.5B — balanced, multilingual (~1 GB)'],
    ['Qwen2.5-0.5B-Instruct-q4f16_1-MLC', 'Qwen 2.5 · 0.5B — fastest, smallest (~0.4 GB)'],
    ['Qwen2.5-3B-Instruct-q4f16_1-MLC', 'Qwen 2.5 · 3B — smartest, needs a strong GPU (~2 GB)'],
    ['Llama-3.2-1B-Instruct-q4f16_1-MLC', 'Llama 3.2 · 1B (~0.9 GB)'],
  ];
  const hasGPU = !!navigator.gpu;
  cfg.local = store.get('ai-local', false);
  cfg.localModel = store.get('ai-local-model', LOCAL_MODELS[0][0]);
  cfg.brain = store.get('ai-brain', 'auto');           // auto: free AI, or ChatGPT once connected | cloud | local | wang | offline
  if (!store.get('ai-auto-brain', false)) { store.set('ai-auto-brain', true); if (cfg.brain === 'cloud') { cfg.brain = 'auto'; store.set('ai-brain', 'auto'); } } // one-time: answer without needing any sign-in
  cfg.cloudModel = (() => {
    let m = store.get('ai-cloud-model', '');
    if (!store.get('ai-chatgpt-default', false)) { store.set('ai-chatgpt-default', true); m = 'gpt-6.2-sol'; store.set('ai-cloud-model', m); } // one-time switch to the ChatGPT brain
    return (m || 'gpt-6.2-sol').replace(/^(anthropic|openai|google)\//, '');
  })();
  const CLOUD_MODELS = [
    ['gpt-6.2-sol', 'ChatGPT · GPT-6.2 Sol — smart & fast (recommended)'],
    ['gpt-6.2-astra', 'ChatGPT · GPT-6.2 Astra — OpenAI\'s most capable, slower'],
    ['gpt-6-luna', 'ChatGPT · GPT-6 Luna — fastest'],
    ['claude-sonnet-5-5', 'Claude Sonnet 5.5'],
    ['claude-opus-5-5', 'Claude Opus 5.5 — deep thinker, slower'],
    ['claude-haiku-5-5', 'Claude Haiku 5.5 — fast'],
  ];
  const modelLabel = () => { const m = CLOUD_MODELS.find((x) => x[0] === cfg.cloudModel); return m ? m[1].split(' — ')[0] : cfg.cloudModel; };
  // ChatGPT-style voice: OpenAI's natural voices through Puter (falls back to the browser voice automatically)
  cfg.voiceEngine = store.get('ai-voice-engine', 'openai');
  cfg.oaVoice = store.get('ai-oa-voice', 'marin');
  const OA_VOICES = [['marin', 'Marin — warm & natural (recommended)'], ['cedar', 'Cedar — calm & natural'], ['coral', 'Coral — bright & friendly'], ['sage', 'Sage — gentle'], ['verse', 'Verse — expressive'], ['alloy', 'Alloy — neutral'], ['ash', 'Ash'], ['ballad', 'Ballad'], ['echo', 'Echo'], ['fable', 'Fable'], ['nova', 'Nova — energetic'], ['onyx', 'Onyx — deep'], ['shimmer', 'Shimmer — soft']];
  const VOICE_STYLE = [
    'Voice: a warm, friendly teacher talking one-to-one with a student on a relaxed video call; sounds like a real person, genuinely interested, with a smile in the voice.',
    'Tone: conversational and encouraging, like explaining something to a friend over tea. Never formal, robotic, announcer-like or as if reading a script.',
    'Pacing: natural and unhurried; a little slower on key ideas, numbers and new terms, a little quicker on easy connecting words.',
    'Intonation: lively and varied, with natural rises on questions and gentle emphasis on the most important word of each sentence.',
    'Pauses: short natural breaths at commas and between ideas, and a brief beat before the key point.',
    'Pronunciation: say technical terms clearly (NumPy as "num-pie", scikit-learn as "sy-kit learn", matplotlib as "mat-plot-lib") and speak every language with a natural native accent.',
  ].join(' ');
  const engine = () => (cfg.brain === 'wang' ? 'wang' : cfg.key ? 'claude' : cfg.brain === 'local' && hasGPU ? 'local' : cfg.brain === 'offline' ? 'offline' : cfg.brain === 'cloud' || (!cfg.cloudOff && !!(window.puter && window.puter.auth && window.puter.auth.isSignedIn())) ? 'cloud' : 'free');

  // ---------- Cloud AI for everyone via Puter.js (no API key; each visitor uses their own free Puter allowance) ----------
  let puterP = null;
  // Opened by double-clicking index.html (file://)? Puter signs a page in by its web address and a file has none,
  // so don't load it there (it would only show an error); offer the online copy or the local launcher instead.
  const FILE_MODE = location.protocol === 'file:';
  const LIVE_URL = 'https://wangdencerpa12345-star.github.io/ml-sikshya/';
  const openOnline = () => window.open(LIVE_URL + (location.hash || '#/'), '_blank', 'noopener');
  const loadPuter = () => (FILE_MODE ? Promise.reject({ error: 'file_protocol', msg: 'Page opened as a file (file://)' }) : puterP || (puterP = new Promise((res, rej) => {
    if (window.puter && window.puter.ai) return res(window.puter);
    const sc = document.createElement('script'); sc.src = 'https://js.puter.com/v2/';
    sc.onload = () => (window.puter && window.puter.ai ? res(window.puter) : rej(new Error('Puter.js did not load')));
    sc.onerror = () => { puterP = null; rej(new Error('Could not load Puter.js (check your internet)')); };
    document.head.appendChild(sc);
  })));
  // Puter returns plain objects like {error: "auth_window_closed", msg: "..."} — read them properly.
  const puterErr = (e) => {
    if (!e) return '';
    if (typeof e === 'string') return e;
    const parts = [e.error, e.code, e.message, e.msg, e.part && (e.part.error || e.part.message)].filter((x) => typeof x === 'string' && x);
    if (parts.length) return parts.join(' · ');
    try { return JSON.stringify(e); } catch { return String(e); }
  };
  const isSignedIn = () => !!(window.puter && window.puter.auth && window.puter.auth.isSignedIn());
  const needsConnect = (e) => /file_protocol|not_signed_in|auth_window_closed|popup_blocked|unauthori[sz]ed|\b401\b|sign.?in|log.?in/i.test(puterErr(e));
  let pendingQ = null;
  // Must run directly inside a click: Puter shows a consent screen, then a small window that creates a free account automatically.
  function connectPuter(btn) {
    if (FILE_MODE) { openOnline(); return Promise.resolve(); }
    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = '…'; }
    const go = (pu) => pu.auth.signIn({ attempt_temp_user_creation: true });
    const pr = window.puter && window.puter.auth ? go(window.puter) : loadPuter().then(go);
    return pr.then(() => {
      toast(u('connected'));
      refresh(); if (!history.length) drawMsgs();
      if (pendingQ) { const q = pendingQ; pendingQ = null; if (q.call && call) cAsk(q.text); else if (!q.call) send(q.text, q.voice); }
      if (call) { call.el.querySelector('.cb.connect').hidden = true; cStatus(''); }
    }).catch((e) => {
      const m = puterErr(e);
      toast(/popup/i.test(m) ? u('popupBlocked') : u('connectFail'));
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || u('connectBtn'); }
    });
  }
  function connectCard() {
    if (FILE_MODE) {
      const fc = h(`<div class="ai-card connect-card"><b>🌐 ${u('fileT')}</b><p class="small">${u('fileP')}</p><button class="btn sm cbtn">${u('fileBtn')}</button><p class="small muted">${u('fileLocal')}</p></div>`);
      fc.querySelector('.cbtn').onclick = openOnline;
      return fc;
    }
    const el = h(`<div class="ai-card connect-card"><b>⚡ ${u('connectT')}</b><p class="small">${u('connectP')}</p><button class="btn sm cbtn">${u('connectBtn')}</button></div>`);
    el.querySelector('.cbtn').onclick = (ev) => connectPuter(ev.currentTarget);
    return el;
  }
  async function askCloud(onText, voice, holder) {
    const puter = await loadPuter();
    if (!puter.auth.isSignedIn()) throw { error: 'not_signed_in' };
    const ctrl = new AbortController();
    if (holder) holder.stream = { abort: () => ctrl.abort() };
    const msgs = [{ role: 'system', content: SYSTEM(voice) }, ...history.slice(-16)];
    let model = cfg.cloudModel;
    if (voice && /astra|opus/.test(model)) model = model.includes('opus') ? 'claude-sonnet-5-5' : 'gpt-6.2-sol'; // faster for live talk
    let first = false;
    const timer = setTimeout(() => { if (!first) { if (holder) holder.timedOut = true; ctrl.abort(); } }, 45000);
    try {
      const resp = await puter.ai.chat(msgs, { model, stream: true, max_tokens: voice ? 600 : 3000, signal: ctrl.signal });
      let full = '';
      for await (const part of resp) {
        if (!part) continue;
        if (part.type === 'error') throw part;
        const d = typeof part === 'string' ? part : part.text || '';
        if (d) { first = true; full += d; onText(d); }
      }
      if (!full) throw { error: 'empty_response' };
      return full;
    } finally { clearTimeout(timer); }
  }
  // ---------- Free AI for everyone, no sign-in: the open GPT-OSS model through Pollinations.ai ----------
  const FREE_URL = 'https://text.pollinations.ai/openai';
  let freeNext = 0, freeGap = 11; // the free service allows one answer every N seconds per visitor (learned from its replies); space requests politely
  const sleep = (ms, signal) => new Promise((res, rej) => {
    const tm = setTimeout(res, ms);
    if (signal) signal.addEventListener('abort', () => { clearTimeout(tm); rej(new DOMException('Aborted', 'AbortError')); }, { once: true });
  });
  async function askFree(onText, voice, holder) {
    const msgs = [{ role: 'system', content: SYSTEM(voice) }, ...history.slice(-14)];
    const body = JSON.stringify({ model: 'openai', messages: msgs, stream: true, private: true, referrer: 'ml-sikshya', reasoning_effort: voice ? 'low' : 'medium' });
    const ctrl = new AbortController();
    if (holder) holder.stream = { abort: () => ctrl.abort() };
    for (let attempt = 0; ; attempt++) {
      const wait = freeNext - Date.now();
      if (wait > 12000) throw { free: 'busy', secs: Math.ceil(wait / 1000) }; // a long pause is needed: help from the lessons right now instead
      if (wait > 0) { if (holder && holder.onWait) holder.onWait(Math.ceil(wait / 1000)); await sleep(wait, ctrl.signal); }
      freeNext = Date.now() + freeGap * 1000;
      let resp;
      try { resp = await fetch(FREE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, signal: ctrl.signal }); }
      catch (e) { if (ctrl.signal.aborted) throw e; throw { free: 'network' }; }
      if (resp.status === 402 || resp.status === 429 || resp.status === 503 || resp.status === 502) {
        let m = ''; try { m = await resp.text(); } catch { /* ignore */ }
        const per = /(\d+)\s*seconds?/i.exec(m); // e.g. "Free limit reached: 1 reply every 45 seconds per IP"
        if (resp.status === 402 && per) freeGap = Math.min(120, Math.max(5, +per[1] + 1)); // learn the current free limit
        const ra = resp.status === 402 && per ? freeGap : Math.max(3, parseInt(resp.headers.get('Retry-After') || '10', 10) || 10);
        freeNext = Date.now() + ra * 1000;
        if (attempt >= 1 || ra > 12) throw { free: 'busy', secs: ra }; // one patient retry at most, then help from the lessons
        continue;
      }
      if (!resp.ok) {
        let m = ''; try { m = (await resp.text()).slice(0, 160); } catch { /* ignore */ }
        if (resp.status === 403 && /turnstile/i.test(m)) throw { free: location.hostname === 'localhost' ? 'localhost' : 'blocked' }; // the free service turns away "localhost" pages
        throw { free: 'server', msg: resp.status + ' ' + m };
      }
      // the answer arrives as server-sent events: "content" is the answer, "reasoning" is the model thinking (skipped)
      const reader = resp.body.getReader(), dec = new TextDecoder();
      let buf = '', full = '';
      const timer = setTimeout(() => { if (!full) { if (holder) holder.timedOut = true; ctrl.abort(); } }, 60000);
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let nl;
          while ((nl = buf.indexOf('\n')) >= 0) {
            const line = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (!data || data === '[DONE]') continue;
            let j; try { j = JSON.parse(data); } catch { continue; }
            if (j.error) throw { free: 'server', msg: j.error.message || String(j.error) };
            const d = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
            if (d) { full += d; onText(d); }
          }
        }
      } finally { clearTimeout(timer); }
      if (!full) throw { free: 'empty' };
      return full;
    }
  }
  let localEngine = null, localLoading = null, localModelLoaded = null;
  let lastProg = null;
  function localProgress(p) {
    lastProg = p;
    const pct = Math.round((p.progress || 0) * 100);
    document.querySelectorAll('.ai-progress').forEach((el) => { el.hidden = pct >= 100; el.querySelector('span').style.width = pct + '%'; el.querySelector('small').textContent = `${pct}% · ${(p.text || '').slice(0, 90)}`; });
    if (typeof cStatus === 'function' && call) cStatus(`🧠 ${pct}%`);
  }
  function loadLocal() {
    if (localEngine && localModelLoaded === cfg.localModel) return Promise.resolve(localEngine);
    if (!localLoading) {
      localLoading = (async () => {
        const webllm = await import('https://esm.run/@mlc-ai/web-llm');
        if (localEngine) { try { await localEngine.unload(); } catch { /* ignore */ } }
        localEngine = await webllm.CreateMLCEngine(cfg.localModel, { initProgressCallback: localProgress });
        localModelLoaded = cfg.localModel;
        localProgress({ progress: 1, text: 'ready' });
        refresh();
        return localEngine;
      })().finally(() => { localLoading = null; });
    }
    return localLoading;
  }
  async function askLocal(onText, voice, holder) {
    const eng = await loadLocal();
    const msgs = [{ role: 'system', content: SYSTEM(voice, true) }, ...history.slice(-10)];
    const chunks = await eng.chat.completions.create({ messages: msgs, stream: true, temperature: 0.6, max_tokens: 1500 });
    if (holder) holder.stream = { abort: () => eng.interruptGenerate() };
    let full = '';
    for await (const c of chunks) { const d = (c.choices[0] && c.choices[0].delta && c.choices[0].delta.content) || ''; if (d) { full += d; onText(d); } }
    return full;
  }
  // Automatic brain: ChatGPT while it's connected and working, otherwise the free AI, so a learner never gets stuck
  // (e.g. when the free monthly ChatGPT allowance on Puter is used up).
  async function askAuto(onText, voice, holder) {
    let any = false;
    try { return await askCloud((d) => { any = true; onText(d); }, voice, holder); } catch (e) {
      const m = puterErr(e) + ' ' + String(e && e.name);
      if (any || (/abort/i.test(m) && !(holder && holder.timedOut))) throw e;   // half-answered, or the learner pressed stop
      if (/insufficient|402|funds|credit|not_signed_in|unauthori[sz]ed|\b401\b|sign.?in|log.?in/i.test(m)) { cfg.cloudOff = true; ttsBroken = true; refresh(); }
      if (holder) holder.timedOut = false;
      return askFree(onText, voice, holder);
    }
  }
  const askAI = (onText, voice, holder) => (engine() === 'wang' ? askWang(onText, voice, holder) : engine() === 'claude' ? askClaude(onText, voice, holder) : engine() === 'cloud' ? (cfg.brain === 'auto' ? askAuto(onText, voice, holder) : askCloud(onText, voice, holder)) : engine() === 'free' ? askFree(onText, voice, holder) : askLocal(onText, voice, holder));

  // ---------- WANG AI (your own WANG AI server; the API key stays on the server) ----------
  Object.assign(MLS.UI, {
    brainWang: { en: '🤖 WANG AI', ne: '🤖 WANG AI', zh: '🤖 WANG AI' },
    wangHelp: { en: 'Uses your own WANG AI server. The AI key stays safely on that server, so students need no key or account. Start the server first (see the WANG AI README), then enter its address below.', ne: 'तपाईंको आफ्नै WANG AI सर्भर प्रयोग गर्छ। AI key सर्भरमै सुरक्षित रहन्छ, त्यसैले विद्यार्थीलाई key वा खाता चाहिँदैन। पहिले सर्भर सुरु गर्नुहोस् (WANG AI README हेर्नुहोस्), अनि तल यसको ठेगाना लेख्नुहोस्।', zh: '使用你自己的 WANG AI 服务器。AI 密钥安全地保存在服务器上，学生不需要密钥或账号。请先启动服务器（见 WANG AI README），然后在下方填写地址。' },
    wangUrl: { en: 'WANG AI server address', ne: 'WANG AI सर्भरको ठेगाना', zh: 'WANG AI 服务器地址' },
    wangTest: { en: 'Test connection', ne: 'जडान जाँच्नुहोस्', zh: '测试连接' },
    wangReady: { en: '✓ Connected · {model}', ne: '✓ जोडियो · {model}', zh: '✓ 已连接 · {model}' },
    wangNoKey: { en: '⚠️ Connected, but the server has no AI key yet. Add ANTHROPIC_API_KEY to backend/.env and restart it.', ne: '⚠️ जोडियो, तर सर्भरमा AI key छैन। backend/.env मा ANTHROPIC_API_KEY थपेर सर्भर फेरि सुरु गर्नुहोस्।', zh: '⚠️ 已连接，但服务器还没有 AI 密钥。请在 backend/.env 中添加 ANTHROPIC_API_KEY 并重启。' },
    wangOffline: { en: '🤖 Can\'t reach the WANG AI server at {url}. Start it on your computer (see the WANG AI README), check the address in ⚙️ settings — or pick another AI brain there.', ne: '🤖 {url} मा WANG AI सर्भरसम्म पुग्न सकिएन। आफ्नो कम्प्युटरमा सर्भर सुरु गर्नुहोस् (WANG AI README हेर्नुहोस्), ⚙️ सेटिङमा ठेगाना जाँच्नुहोस् — वा त्यहाँ अर्को AI दिमाग छान्नुहोस्।', zh: '🤖 无法连接 {url} 上的 WANG AI 服务器。请在电脑上启动它（见 WANG AI README），在 ⚙️ 设置中检查地址——或选择其他 AI 大脑。' },
  });
  cfg.wangUrl = store.get('ai-wang-url', 'http://localhost:8000');
  let wangConv = null, wangOk = false;            // the server remembers the conversation by this id
  const wangBase = () => (cfg.wangUrl || 'http://localhost:8000').trim().replace(/\/+$/, '');
  async function askWang(onText, voice, holder, retried = false) {
    const ctrl = new AbortController();
    if (holder) holder.stream = { abort: () => ctrl.abort() };
    const question = history[history.length - 1].content;
    let resp;
    try {
      resp = await fetch(wangBase() + '/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
        body: JSON.stringify({ message: question, conversation_id: wangConv, mode: 'ml_sikshya', context: (ABOUT + '\n\n' + (voice ? smallContext() : context())).slice(0, 12000), voice: !!voice }),
      });
    } catch (e) {
      if (e && e.name === 'AbortError') throw e;
      wangOk = false; refresh();
      throw { wang: 'offline' };
    }
    if (resp.status === 404 && wangConv && !retried) { wangConv = null; return askWang(onText, voice, holder, true); } // server was reset: start a new conversation
    if (!resp.ok || !resp.body) {
      let msg = 'HTTP ' + resp.status;
      try { const j = await resp.json(); if (typeof j.detail === 'string') msg = j.detail; } catch { /* not JSON */ }
      throw { wang: 'server', msg };
    }
    const reader = resp.body.getReader(), dec = new TextDecoder();
    let buf = '', full = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
        if (!line) continue;
        const ev = JSON.parse(line);
        if (ev.type === 'start') { wangConv = ev.conversation_id; if (!wangOk) { wangOk = true; refresh(); } }
        else if (ev.type === 'delta') { full += ev.text; onText(ev.text); }
        else if (ev.type === 'error') throw { wang: 'server', msg: ev.message };
      }
    }
    if (!full) throw { wang: 'server', msg: 'empty answer' };
    return full;
  }
  function wangErrorText(e) {
    if (e && e.wang === 'offline') return esc(u('wangOffline').replace('{url}', wangBase()));
    return `⚠️ ${esc((e && (e.msg || e.message)) || String(e))}`;
  }
  async function wangHealth() {
    const r = await fetch(wangBase() + '/api/health');
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }

  // ---------- Claude (official SDK, browser build) ----------
  let sdkP = null;
  const sdk = () => sdkP || (sdkP = import('https://esm.sh/@anthropic-ai/sdk').then((m) => m.default || m.Anthropic).catch((e) => { sdkP = null; throw e; }));
  async function askClaude(onText, voice, holder) {
    const Anthropic = await sdk();
    const client = new Anthropic({ apiKey: cfg.key, dangerouslyAllowBrowser: true });
    const req = { model: cfg.model, max_tokens: 16000, system: SYSTEM(voice), messages: history.slice(-20) };
    const stream = cfg.model === 'claude-haiku-5-5'
      ? client.messages.stream(req)
      : client.beta.messages.stream({ ...req, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' });
    if (holder) holder.stream = stream;
    for await (const ev of stream) if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') onText(ev.delta.text);
    const msg = await stream.finalMessage();
    if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refusal'), { refusal: true });
    return msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  }
  // errors thrown by the free AI carry a "free" field, even when the auto brain fell back to it from ChatGPT
  const isFreeErr = (e) => !!(e && typeof e === 'object' && 'free' in e);
  function apiErrorText(e, A) {
    if (engine() === 'wang') return wangErrorText(e);
    if (engine() === 'free' || isFreeErr(e)) {
      if (e && e.free === 'busy') return e.secs > 12 ? u('freeBusyS').replace('{s}', e.secs) : u('freeBusy');
      if (e && e.free === 'network') return u('freeNet');
      if (e && e.free === 'localhost') { const here = location.href.replace('//localhost', '//127.0.0.1'); return `${u('freeLocalhost')} <a href="${esc(here)}">${esc(here.split('#')[0])}</a> · <a href="${LIVE_URL}${esc(location.hash)}" target="_blank" rel="noopener">${u('fileBtn')}</a>`; }
      if (e && e.free === 'blocked') return `${u('freeBlocked')} <a href="${LIVE_URL}${esc(location.hash)}" target="_blank" rel="noopener">${u('fileBtn')}</a>`;
      if (/timeout|timed.?out|abort/i.test(puterErr(e) + String(e && e.name))) return u('aiTimeout');
      return `⚠️ ${u('aiOops')} <small class="muted">(${esc((e && (e.msg || e.free)) || puterErr(e) || 'error')})</small>`;
    }
    const m = puterErr(e);
    if (engine() === 'cloud') {
      if (needsConnect(e)) return FILE_MODE ? u('fileT') : u('needConnect');
      if (/timeout|timed.?out|abort/i.test(m)) return u('aiTimeout');
      if (/insufficient|402|funds|credit/i.test(m)) return t({ en: '💳 Your free monthly AI allowance on Puter is used up. It resets next month — or switch the AI brain in ⚙️.', ne: '💳 Puter मा तपाईंको निःशुल्क मासिक AI भत्ता सकियो। अर्को महिना फेरि सुरु हुन्छ — वा ⚙️ मा AI दिमाग बदल्नुहोस्।', zh: '💳 你在 Puter 上的免费月度 AI 额度已用完。下个月会重置——或在 ⚙️ 中切换 AI 大脑。' });
      if (/429|too_many/i.test(m)) return t({ en: '⏳ Too many questions at once — wait a few seconds and try again.', ne: '⏳ एकैपटक धेरै प्रश्न — केही सेकेन्ड पर्खेर फेरि प्रयास गर्नुहोस्।', zh: '⏳ 提问太频繁——请稍等几秒再试。' });
      if (/sign|auth|cancel|popup/i.test(m)) return t({ en: '🔐 Please sign in to the free Puter account in the pop-up window, then ask again. (Allow pop-ups for this site if nothing appeared.)', ne: '🔐 पप-अप विन्डोमा निःशुल्क Puter खातामा साइन इन गरेर फेरि सोध्नुहोस्। (केही नदेखिए यो साइटका लागि पप-अप अनुमति दिनुहोस्।)', zh: '🔐 请在弹出窗口中登录免费的 Puter 账户，然后再问一次。（如果没有弹出，请允许本网站弹出窗口。）' });
      return `⚠️ ${u('aiOops')} <small class="muted">(${esc(m || 'error')})</small>`;
    }
    if (e.refusal) return t({ en: 'Claude declined to answer this request. Try asking in a different way.', ne: 'Claude ले यो अनुरोधको उत्तर दिन अस्वीकार गर्यो। अर्को तरिकाले सोध्नुहोस्।', zh: 'Claude 拒绝回答这个请求，请换一种方式提问。' });
    if (A && e instanceof A.AuthenticationError) return t({ en: '🔑 Your API key was not accepted. Check it in ⚙️ settings.', ne: '🔑 तपाईंको API key स्वीकार भएन। ⚙️ सेटिङमा जाँच्नुहोस्।', zh: '🔑 API 密钥无效，请在 ⚙️ 设置中检查。' });
    if (A && e instanceof A.PermissionDeniedError) return t({ en: '🔒 This key has no access to the selected model. Pick another model in ⚙️ settings.', ne: '🔒 यो key ले छानिएको मोडेल प्रयोग गर्न पाउँदैन। ⚙️ सेटिङमा अर्को मोडेल छान्नुहोस्।', zh: '🔒 该密钥无权使用所选模型，请在 ⚙️ 设置中换一个模型。' });
    if (A && e instanceof A.RateLimitError) return t({ en: '⏳ Too many requests right now. Wait a moment and try again.', ne: '⏳ अहिले धेरै अनुरोध भए। केही बेर पर्खेर फेरि प्रयास गर्नुहोस्।', zh: '⏳ 请求太多，请稍等再试。' });
    if (A && e instanceof A.APIConnectionError) return t({ en: '📡 Could not reach Claude. Check your internet connection.', ne: '📡 Claude सम्म पुग्न सकिएन। इन्टरनेट जाँच्नुहोस्।', zh: '📡 无法连接 Claude，请检查网络。' });
    if (A && e instanceof A.APIError) return `⚠️ ${e.status || ''} ${esc(e.message)}`;
    return `⚠️ ${esc(e.message || String(e))}`;
  }

  // ---------- Offline helper ----------
  const WHO_MADE = /\bwho\b.{0,30}\b(made|created?|built|developed?|designed?|owns?)\b.{0,25}(\byou\b|\bml ?sikshya\b|\bthis\s*(\?|$|site\b|website|app\b|platform|course|page))|\b(creator|founder|maker)s?\b.{0,25}(\bml ?sikshya\b|\bthis\s*(\?|$|site\b|website|app\b|platform|course|page))|कसले.{0,25}(बना|निर्माण)|निर्माता|谁.{0,6}(做|开发|创建|制作|建)|创始人|kasle.{0,20}banay/i;
  function offlineAnswer(q) {
    const ql = q.toLowerCase();
    if (WHO_MADE.test(q)) return `<p>${u('madeByAnswer')}</p>`;
    let html = '';
    if (MLS.lastRun && MLS.lastRun.err && /error|गल्ती|problem|समस्या|fix|help|मद्दत|bug|错误|报错|问题|帮/.test(ql)) {
      const d = t(diagnose(MLS.lastRun.err));
      html += `<p><b>🩺 ${u('doctorTitle')}</b></p><p><b>${u('whyErr')}:</b> ${esc(d[0])}</p><p><b>${u('fixErr')}:</b> ${esc(d[1])}</p>`;
    }
    const stop = ['the', 'and', 'what', 'how', 'why', 'does', 'this', 'that', 'with', 'for', 'are', 'can', 'you', 'explain', 'मलाई', 'भनेको', 'कसरी', 'किन'];
    let words = ql.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2 && !stop.includes(w));
    const cjk = ql.match(/[一-鿿]{2,}/g) || [];
    cjk.forEach((s) => { for (let i = 0; i < s.length - 1; i++) words.push(s.slice(i, i + 2)); });
    const gl = window.COURSE.glossary.filter((g) => words.some((w) => (g.term + ' ' + g.ne + ' ' + (g.zh || '')).toLowerCase().includes(w))).slice(0, 3);
    gl.forEach((g) => { html += `<p>📖 <b>${esc(g.term)}</b> (${esc(MLS.S.lang === 'zh' ? g.zh || g.ne : g.ne)}): ${esc(t(g.def))}</p>`; });
    const scored = window.COURSE.lessons.map((L) => {
      const titles = (L.title.en + ' ' + L.title.ne + ' ' + (L.title.zh || '')).toLowerCase();
      const txt = (titles + ' ' + lessonText(L)).toLowerCase();
      return [words.reduce((a, w) => a + (txt.split(w).length - 1) + (titles.includes(w) ? 8 : 0), 0), L];
    }).filter((x) => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 3);
    if (/next|अब|अर्को|roadmap|下一步|接下来/.test(ql)) {
      const nl = window.COURSE.lessons.find((l) => !MLS.S.done[l.id]);
      if (nl) html += `<p>🧭 ${t({ en: 'Your next lesson', ne: 'तपाईंको अर्को पाठ', zh: '你的下一课' })}: <a href="#/learn/${nl.id}">${esc(t(nl.title))}</a></p>`;
    }
    if (scored.length) html += `<p><b>📚 ${u('relLessons')}:</b></p><ul>${scored.map(([, L]) => `<li><a href="#/learn/${L.id}">${esc(t(L.title))}</a></li>`).join('')}</ul>`;
    if (/data|डाटा|dataset|csv|数据/.test(ql) && MLS.datalab && MLS.datalab.profile) html += `<p>📊 ${t({ en: 'Open 📊 Data Lab — the "Smart suggestions" box lists what to fix in your data, with one-click code.', ne: '📊 डाटा ल्याब खोल्नुहोस् — "स्मार्ट सुझाव" मा डाटामा के सच्याउने भन्ने सूची र एक-क्लिक कोड छ।', zh: '打开 📊 数据实验室——“智能建议”列出了数据中需要修正的地方，并附一键代码。' })}</p>`;
    if (!html) html = `<p>${u('noMatch')}</p>`;
    return html + `<p class="muted small">${u('offlineNote')}</p>`;
  }

  // ---------- Markdown-lite rendering (python blocks become runnable editors) ----------
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

  // ---------- Voice: speech synthesis (talk) ----------
  const synth = window.speechSynthesis;
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const detectLang = (txt) => {
    if (/[一-鿿]/.test(txt)) return 'zh-CN';
    if (/[ऀ-ॿ]/.test(txt)) return MLS.S.lang === 'ne' || cfg.voice === 'ne-NP' ? 'ne-NP' : (cfg.voice === 'hi-IN' ? 'hi-IN' : 'ne-NP');
    if (/[぀-ヿ]/.test(txt)) return 'ja-JP';
    if (/[가-힯]/.test(txt)) return 'ko-KR';
    if (/[؀-ۿ]/.test(txt)) return 'ar-SA';
    if (/[Ѐ-ӿ]/.test(txt)) return 'ru-RU';
    if (/[ঀ-৿]/.test(txt)) return 'bn-IN';
    const v = cfg.voice !== 'auto' ? cfg.voice : 'en-US';
    return /^(zh|ne|hi|ja|ko|ar|ru|bn)/.test(v) ? 'en-US' : v;
  };
  // Pick the most human-sounding voice available: neural / "Natural" / online voices first (Edge & Chrome ship very natural ones).
  function pickVoice(lang) {
    const vs = synth ? synth.getVoices() : [];
    const base = lang.split('-')[0].toLowerCase();
    const score = (v) => {
      const l = (v.lang || '').toLowerCase(), n = v.name || '';
      let s = 0;
      if (l === lang.toLowerCase()) s += 30; else if (l.startsWith(base)) s += 20; else if (base === 'ne' && l.startsWith('hi')) s += 8; else return -1;
      if (/natural|neural|wavenet|premium|enhanced/i.test(n)) s += 25;
      if (/online/i.test(n)) s += 10;
      if (/google/i.test(n)) s += 8;
      if (!v.localService) s += 3;
      if (/desktop|compact|espeak/i.test(n)) s -= 10;
      if (cfg.voiceName && n === cfg.voiceName) s += 100;
      return s;
    };
    return vs.map((v) => [score(v), v]).filter((x) => x[0] >= 0).sort((a, b) => b[0] - a[0]).map((x) => x[1])[0] || null;
  }
  // Turn written text into what a person would actually SAY: no emojis, symbols or markdown; lists and headings become sentences.
  const endPunct = (x) => (/[.!?।。！？:;,]$/.test(x) ? x : x + '.');
  const voiceText = (x) => x
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s*(.+?)\s*$/gm, (m, y) => endPunct(y))
    .replace(/^\s*(?:[-*•]|\d+[.)])\s+(.+?)\s*$/gm, (m, y) => endPunct(y))
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\$\$|\$(?!\d)|\\[()[\]]/g, '') // maths $ signs go (but "$5" stays money)
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 over $2').replace(/\\sqrt\{([^{}]+)\}/g, 'the square root of $1').replace(/\\(?:cdot|times)/g, ' times ')
    .replace(/\^2\b|²/g, ' squared').replace(/\^3\b|³/g, ' cubed')
    .replace(/\\(?:left|right)\b/g, '').replace(/\\([a-zA-Z]+)/g, ' $1 ').replace(/[{}]/g, '')
    .replace(/\be\.g\.,?/gi, 'for example,').replace(/\bi\.e\.,?/gi, 'that is,').replace(/\betc\./gi, 'and so on.')
    .replace(/\s*(?:→|⟶|->|=>)\s*/g, ', ')
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}]/gu, '')
    .replace(/_/g, ' ').replace(/[*#`>|~]/g, '')
    .replace(/\s+([,.!?])/g, '$1').replace(/\s+/g, ' ').trim();
  // split into sentences only where a sentence really ends (so "0.5" and "train.py" stay whole)
  const sentences = (x) => x.split(/(?<=[.!?])\s+|(?<=[।。！？])\s*/).map((y) => y.trim()).filter(Boolean);
  const speakable = (md) => voiceText(md.replace(/```[\s\S]*?(```|$)/g, '\n' + u('seeCode') + '\n')).slice(0, 2400);
  // Speak like a person: sentence by sentence, small natural pauses, slight changes in pace and pitch, lips moving on every word.
  function humanUtterance(text, lang, voice) {
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = voice ? voice.lang : lang; if (voice) ut.voice = voice;
    const baseRate = (lang.startsWith('zh') ? 0.95 : 0.98) * (cfg.rate || 1);
    ut.rate = baseRate * (0.985 + Math.random() * 0.03); // tiny natural variation in pace
    ut.pitch = cfg.pitch || 1;                           // steady pitch: the voice itself handles question intonation
    ut.onboundary = (e) => { if (!e.name || e.name === 'word') lipPulse(1); };
    return ut;
  }
  let speakQueue = 0;
  // ---- OpenAI voice (same voice technology as ChatGPT) via Puter ----
  let ttsBroken = false, audioCtx = null, analyser = null, levelBuf = null, curAudio = null, audioPlaying = false, curAnalysed = false;
  const useCloudVoice = () => cfg.voiceEngine === 'openai' && !ttsBroken && !FILE_MODE && isSignedIn();
  const ttsCache = new Map();
  function tts(text) {
    const key = cfg.oaVoice + '|' + text;
    if (ttsCache.has(key)) return ttsCache.get(key);
    const pr = loadPuter().then((pu) => pu.ai.txt2speech(text.slice(0, 2900), { provider: 'openai', model: 'gpt-4o-mini-tts', voice: cfg.oaVoice, response_format: 'mp3', instructions: VOICE_STYLE }));
    ttsCache.set(key, pr);
    if (ttsCache.size > 40) ttsCache.delete(ttsCache.keys().next().value);
    pr.catch(() => ttsCache.delete(key));
    return pr;
  }
  function hookAnalyser(audio) {
    try {
      if (!/^(blob|data):/.test(audio.src || '')) return false; // cross-origin audio can't be analysed without muting it
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      if (!analyser) { analyser = audioCtx.createAnalyser(); analyser.fftSize = 512; levelBuf = new Uint8Array(analyser.fftSize); analyser.connect(audioCtx.destination); }
      audioCtx.createMediaElementSource(audio).connect(analyser);
      return true;
    } catch { return false; }
  }
  function audioLevel() {
    if (!analyser || !levelBuf) return 0;
    analyser.getByteTimeDomainData(levelBuf);
    let sum = 0; for (let i = 0; i < levelBuf.length; i++) { const v = (levelBuf[i] - 128) / 128; sum += v * v; }
    return Math.sqrt(sum / levelBuf.length) * 4.5;
  }
  function playAudio(audio) {
    return new Promise((res) => {
      curAudio = audio;
      curAnalysed = audio.dataset.hooked === '1' || hookAnalyser(audio);
      if (curAnalysed) audio.dataset.hooked = '1';
      try { audio.currentTime = 0; } catch { /* ignore */ }
      let doneOnce = false; const done = (r) => { if (doneOnce) return; doneOnce = true; audioPlaying = false; res(r); };
      audio.onplaying = () => { audioPlaying = true; };
      audio.onended = () => done('ended'); audio.onerror = () => done('error');
      audio.play().then(() => { audioPlaying = true; }).catch(() => done('blocked'));
    });
  }
  function ttsChunks(text) {
    const sents = sentences(text);
    const out = []; let cur = '';
    const limit = () => (out.length === 0 ? 150 : out.length === 1 ? 320 : 650); // short first part = fast start, longer parts = fewer seams
    sents.forEach((x) => { if (cur && (cur + ' ' + x).length > limit()) { out.push(cur); cur = x; } else cur = cur ? cur + ' ' + x : x; });
    if (cur) out.push(cur);
    return out;
  }
  function speakCloud(text, onDone) {
    stopSpeaking(); noteSaid(text);
    const id = ++speakQueue; setState('speaking');
    const chunks = ttsChunks(text);
    let i = 0, nextP = tts(chunks[0]);
    const step = async () => {
      if (id !== speakQueue) return;
      if (i >= chunks.length) { setState('idle'); onDone && onDone(); return; }
      let audio;
      try { audio = await nextP; } catch (e) { console.warn('ChatGPT voice unavailable, using the browser voice', puterErr(e)); ttsBroken = true; if (id === speakQueue) speakBrowser(chunks.slice(i).join(' '), onDone); return; }
      if (id !== speakQueue) return;
      i++; if (i < chunks.length) nextP = tts(chunks[i]); // prefetch the next part while this one plays
      const r = await playAudio(audio);
      if (id !== speakQueue) return;
      if (r === 'blocked' || r === 'error') { ttsBroken = r === 'error'; speakBrowser(chunks.slice(i - 1).join(' '), onDone); return; }
      step();
    };
    step();
  }
  function speak(text, onDone) {
    if (!cfg.speak || !text) { onDone && onDone(); return; }
    if (useCloudVoice()) return speakCloud(text, onDone);
    return speakBrowser(text, onDone);
  }
  function speakBrowser(text, onDone) {
    if (!synth || !cfg.speak || !text) { onDone && onDone(); return; }
    noteSaid(text);
    synth.cancel();
    const lang = detectLang(text), voice = pickVoice(lang);
    const chunks = sentences(text);
    const id = ++speakQueue;
    setState('speaking');
    const next = (i) => {
      if (id !== speakQueue) return;
      if (i >= chunks.length) { setState('idle'); onDone && onDone(); return; }
      const ut = humanUtterance(chunks[i], lang, voice);
      ut.onend = ut.onerror = () => setTimeout(() => next(i + 1), /[.!?।。！？]$/.test(chunks[i]) ? 150 + Math.random() * 170 : 90);
      synth.speak(ut);
    };
    next(0);
  }
  function stopSpeaking() { if (synth) synth.cancel(); if (curAudio) { try { curAudio.pause(); } catch { /* ignore */ } } audioPlaying = false; speakQueue++; setState('idle'); }

  // ---------- Voice gate: noise suppression, voice detection and echo filtering ----------
  // Only real speech near the microphone may interrupt the teacher or become a question.
  // 1) The microphone is opened with the browser's WebRTC echo cancellation + noise suppression.
  // 2) A voice-activity detector learns the room's background noise level and only counts sound
  //    that is clearly louder than it AND mostly in the human-voice frequency band.
  // 3) Transcripts are dropped when the recogniser is unsure, when they are only "uh"/"hmm",
  //    when no real voice was measured, or when they repeat what the teacher just said (echo).
  Object.assign(MLS.UI, {
    micSensT: { en: 'Microphone sensitivity', ne: 'माइकको संवेदनशीलता', zh: '麦克风灵敏度' },
    micHigh: { en: 'High — quiet room, soft voice', ne: 'उच्च — शान्त कोठा, मसिनो आवाज', zh: '高——安静房间、声音较小' },
    micNormal: { en: 'Normal', ne: 'सामान्य', zh: '普通' },
    micLow: { en: 'Low — noisy room (ignores more background noise)', ne: 'कम — हल्ला भएको ठाउँ (पृष्ठभूमिको आवाज बढी बेवास्ता गर्छ)', zh: '低——嘈杂环境（忽略更多背景噪音）' },
    pttOn: { en: 'Push-to-talk: listen only while I hold 🎙️ or the Space key (best for very noisy places)', ne: 'थिचेर बोल्ने: 🎙️ वा Space थिचिराख्दा मात्र सुन्ने (धेरै हल्ला हुने ठाउँका लागि उत्तम)', zh: '按键说话：只有按住 🎙️ 或空格键时才收听（最适合非常嘈杂的地方）' },
    micTest: { en: 'Test microphone', ne: 'माइक जाँच्नुहोस्', zh: '测试麦克风' },
    micTestSay: { en: 'Say a sentence now…', ne: 'अहिले एउटा वाक्य बोल्नुहोस्…', zh: '现在请说一句话…' },
    micTestOk: { en: '✓ Your voice is detected clearly.', ne: '✓ तपाईंको आवाज स्पष्ट सुनियो।', zh: '✓ 清楚地检测到你的声音。' },
    micTestNone: { en: 'No clear voice detected. Speak closer to the microphone, or choose a higher sensitivity.', ne: 'स्पष्ट आवाज सुनिएन। माइकको नजिक बोल्नुहोस्, वा उच्च संवेदनशीलता छान्नुहोस्।', zh: '没有检测到清晰的声音。请靠近麦克风说话，或选择更高的灵敏度。' },
    micTestNoisy: { en: ' Your room is noisy — "Low — noisy room" or push-to-talk will work better.', ne: ' तपाईंको कोठामा हल्ला छ — "कम — हल्ला भएको ठाउँ" वा थिचेर बोल्ने राम्रो हुन्छ।', zh: ' 你的环境比较嘈杂——选择“低——嘈杂环境”或按键说话效果更好。' },
    micNoAccess: { en: 'The microphone could not be opened.', ne: 'माइक खोल्न सकिएन।', zh: '无法打开麦克风。' },
    noiseIgnored: { en: '🔇 Background noise ignored', ne: '🔇 पृष्ठभूमिको आवाज बेवास्ता गरियो', zh: '🔇 已忽略背景噪音' },
    pttHint: { en: 'Hold 🎙️ or the Space key while you talk', ne: 'बोल्दा 🎙️ वा Space थिचिराख्नुहोस्', zh: '说话时按住 🎙️ 或空格键' },
  });
  const SENS = { // k: how many times louder than the room noise a voice must be · min: absolute minimum · conf: minimum recogniser confidence
    high: { k: 2.0, min: 0.006, conf: 0.3 },
    normal: { k: 2.8, min: 0.011, conf: 0.45 },
    low: { k: 3.8, min: 0.02, conf: 0.6 },
  };
  cfg.micSens = SENS[store.get('ai-mic-sens', 'normal')] ? store.get('ai-mic-sens', 'normal') : 'normal';
  cfg.ptt = store.get('ai-ptt', false);
  const gate = { stream: null, track: null, ctx: null, an: null, td: null, fd: null, timer: null, starting: null, floor: 0.005, rms: 0, thr: 1, hist: [], lastVoice: 0, confirmedAt: 0, teacherAt: 0 };
  const teacherTalking = () => !!((call && call.speaking) || audioPlaying || (synth && synth.speaking));
  // Only trust the detector while its audio is actually running (Chrome can keep it paused until the next click).
  const gateOn = () => !!(gate.an && gate.ctx && gate.ctx.state === 'running');
  document.addEventListener('pointerdown', () => { if (gate.ctx && gate.ctx.state === 'suspended') gate.ctx.resume().catch(() => {}); }, true);
  function gateStart() {
    if (gate.track && gate.track.readyState === 'live') return Promise.resolve(gate.track);
    if (gate.starting) return gate.starting;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.resolve(null);
    gate.starting = navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } })
      .then((stream) => {
        gate.stream = stream; gate.track = stream.getAudioTracks()[0];
        gate.ctx = new (window.AudioContext || window.webkitAudioContext)();
        gate.an = gate.ctx.createAnalyser(); gate.an.fftSize = 1024; gate.an.smoothingTimeConstant = 0.2;
        gate.ctx.createMediaStreamSource(stream).connect(gate.an);
        gate.td = new Float32Array(gate.an.fftSize); gate.fd = new Float32Array(gate.an.frequencyBinCount);
        gate.floor = 0.005; gate.hist = []; gate.startedAt = Date.now();
        gate.timer = setInterval(gateTick, 30);
        return gate.track;
      })
      .catch((e) => { console.warn('Voice gate unavailable:', e && e.message); return null; })
      .finally(() => { gate.starting = null; });
    return gate.starting;
  }
  function gateStop() {
    clearInterval(gate.timer);
    if (gate.stream) gate.stream.getTracks().forEach((tr) => tr.stop());
    if (gate.ctx) gate.ctx.close().catch(() => {});
    Object.assign(gate, { stream: null, track: null, ctx: null, an: null, timer: null, hist: [] });
  }
  MLS.voiceGate = gate;                       // live numbers, for troubleshooting in the browser console
  const gateIdle = () => { if (!call && !convo && !listening && !gate.testing) gateStop(); };
  function gateTick() {
    if (!gate.an) return;
    if (gate.ctx.state === 'suspended') gate.ctx.resume().catch(() => {});
    gate.an.getFloatTimeDomainData(gate.td);
    let sum = 0; for (let i = 0; i < gate.td.length; i++) sum += gate.td[i] * gate.td[i];
    const rms = Math.sqrt(sum / gate.td.length);
    // Share of the energy in the human-voice band (~100–4000 Hz): hum, rumble and hiss fall mostly outside it.
    gate.an.getFloatFrequencyData(gate.fd);
    const hz = gate.ctx.sampleRate / gate.an.fftSize;
    let band = 0, total = 0;
    for (let i = 1; i < gate.fd.length; i++) { const pw = Math.pow(10, gate.fd[i] / 10); total += pw; const f = i * hz; if (f >= 100 && f <= 4000) band += pw; }
    const share = total > 0 ? band / total : 0;
    const now = Date.now(), talking = teacherTalking();
    if (talking) gate.teacherAt = now;
    const sp = SENS[cfg.micSens];
    const thr = Math.max(sp.min, gate.floor * sp.k) * (talking ? 1.6 : 1); // the teacher's own voice leaks back into the mic
    // First 0.8 s: only learn the room's noise level (nothing counts as a voice yet).
    const voiced = rms > thr && share > 0.55 && now - gate.startedAt > 800;
    // Learn the background level: quickly when it gets quieter, slowly otherwise (so steady music/TV also raises it).
    gate.floor += (rms - gate.floor) * (rms < gate.floor ? 0.08 : voiced ? 0.004 : 0.02);
    gate.floor = Math.min(Math.max(gate.floor, 0.001), 0.1);
    // Speech has short gaps between syllables, so judge by the SHARE of recent moments that were voice.
    gate.hist.push([now, voiced]); while (gate.hist.length && now - gate.hist[0][0] > 1500) gate.hist.shift();
    if (voiced) gate.lastVoice = now;
    if (voiceShare(300) >= 0.5) gate.confirmedAt = now;
    gate.rms = rms; gate.thr = thr;
    if (call) call.el.querySelector('.cb.mic').classList.toggle('hearing', voiceShare(200) >= 0.4);
  }
  const voiceHeardSince = (t) => !gateOn() || gate.confirmedAt >= t;     // without the gate, trust the recogniser
  function voiceShare(ms) {
    const now = Date.now(); let n = 0, v = 0;
    for (let i = gate.hist.length - 1; i >= 0 && now - gate.hist[i][0] <= ms; i--) { n++; if (gate.hist[i][1]) v++; }
    return n ? v / n : 0;
  }
  const sustainedVoice = (ms) => !gateOn() || voiceShare(ms) >= 0.5;    // a voice for at least about half of the last `ms`
  const FILLER = /^(uh+|um+|hm+|mm+|ah+|eh+|er+|erm|huh|oh)$/;
  const tokens = (str) => {
    const n = normTxt(str);
    if (/[぀-ヿ㐀-鿿가-힯]/.test(n)) { const c = n.replace(/\s+/g, ''), out = []; for (let i = 0; i < c.length - 1; i++) out.push(c.slice(i, i + 2)); return out.length ? out : c ? [c] : []; }
    return n.split(' ').filter(Boolean);
  };
  const meaningful = (text) => { const w = normTxt(text).split(' ').filter(Boolean); return w.join('').length >= 2 && !w.every((x) => FILLER.test(x)); };
  const confident = (conf) => !(conf > 0) || conf >= SENS[cfg.micSens].conf; // Chrome reports 0 when it has no score
  // What the teacher said recently, to recognise its own voice coming back through the speakers.
  const saidLog = [];
  function noteSaid(text) { const now = Date.now(); saidLog.push({ text, at: now }); while (saidLog.length && now - saidLog[0].at > 20000) saidLog.shift(); }
  // Echo = the heard words repeat a PHRASE the teacher said (not just common words like "what" or "is").
  function isEcho(heard) {
    if (!(teacherTalking() || Date.now() - gate.teacherAt < 2500 || (call && call.speaking))) return false;
    const a = tokens(heard); if (!a.length) return false;
    const saidTok = tokens(saidLog.map((x) => x.text).join(' ') + ' ' + (call ? call.cur + ' ' + call.queue.map((q) => q.text).join(' ') : ''));
    if (a.length === 1) return saidTok.includes(a[0]);
    if (` ${saidTok.join(' ')} `.includes(` ${a.join(' ')} `)) return true;              // exact phrase
    if (a.length < 3) return false;
    const pairs = new Set(saidTok.slice(1).map((w, i) => saidTok[i] + ' ' + w));
    const hp = a.slice(1).map((w, i) => a[i] + ' ' + w);
    return hp.filter((x) => pairs.has(x)).length / hp.length >= 0.7;                  // mostly the same word pairs (misheard echo)
  }
  // Give the recogniser the cleaned-up microphone (echo-cancelled, noise-suppressed) where the browser supports it.
  function recStart(r) {
    try { if (gate.track && gate.track.readyState === 'live') r.start(gate.track); else r.start(); }
    catch { try { r.start(); } catch { /* already running */ } }
  }
  function micTest(s) {
    const res = s.querySelector('.micres'), bar = s.querySelector('.mic-meter span');
    gate.testing = true; res.textContent = u('micTestSay');
    gateStart().then((track) => {
      if (!track) { gate.testing = false; res.textContent = u('micNoAccess'); return; }
      const t0 = Date.now(), floors = [];
      const iv = setInterval(() => {
        bar.style.width = Math.min(100, (gate.rms / gate.thr) * 50) + '%';
        bar.classList.toggle('voice', voiceShare(200) >= 0.4);
        floors.push(gate.floor);
        if (Date.now() - t0 < 5000) return;
        clearInterval(iv); gate.testing = false; bar.style.width = '0';
        const noisy = floors.sort((a, b) => a - b)[Math.floor(floors.length / 2)] > SENS.normal.min;
        res.textContent = (gate.confirmedAt >= t0 ? u('micTestOk') : u('micTestNone')) + (noisy && cfg.micSens !== 'low' ? u('micTestNoisy') : '');
        gateIdle();
      }, 60);
    });
  }

  // Speak an answer sentence by sentence while it is still being written, instead of waiting for all of it.
  function sentenceFeeder(sayNow) {
    let acc = '', spoken = 0, buf = '', first = true;
    // group short sentences (~90+ characters) so the voice flows with fewer seams; the very first one goes out at once
    const say = (x) => { buf = buf ? buf + ' ' + x : x; if (first || buf.length >= 90) { first = false; sayNow(buf); buf = ''; } };
    const flush = () => { if (buf) { sayNow(buf); buf = ''; } };
    return (d, final) => {
      acc += d || '';
      for (;;) {
        const rest = acc.slice(spoken); if (!rest) { if (final) flush(); return; }
        const fence = rest.indexOf('```');
        if (fence === 0) { const close = rest.indexOf('```', 3); if (close < 0) { if (final) flush(); return; } say(u('seeCode')); spoken += close + 3; continue; }
        const m = rest.match(/[.!?](?=\s)|[。！？।\n]/); /* a period ends a sentence only before a space (not in train.py) */ let end = m ? m.index + 1 : -1;
        if (fence > 0 && (end < 0 || fence < end)) end = fence;
        if (end < 0) { if (final) { say(rest); flush(); spoken = acc.length; } return; }
        say(rest.slice(0, end)); spoken += end;
      }
    };
  }
  function makeSpeaker(onDone) {
    stopSpeaking();
    const id = ++speakQueue, q = [];
    let playing = false, ended = false, finished = false;
    const finish = () => { if (finished || id !== speakQueue) return; finished = true; setState('idle'); onDone && onDone(); };
    async function pump() {
      if (playing || id !== speakQueue) return;
      const item = q.shift();
      if (!item) { if (ended) finish(); return; }
      playing = true; setState('speaking'); noteSaid(item.text);
      let done = false;
      if (item.audioP) {
        try { const a = await item.audioP; if (id !== speakQueue) return; done = (await playAudio(a)) === 'ended'; } catch { ttsBroken = true; }
      }
      if (!done && id === speakQueue && synth) {
        await new Promise((res) => { const lang = detectLang(item.text); const ut = humanUtterance(item.text, lang, pickVoice(lang)); ut.onend = ut.onerror = res; synth.speak(ut); });
      }
      playing = false;
      if (id === speakQueue) pump();
    }
    return {
      say(text) { text = cleanSpeech(text); if (!text || !/[\p{L}\p{N}]/u.test(text)) return; q.push({ text, audioP: useCloudVoice() ? tts(text) : null }); pump(); },
      end() { ended = true; if (!playing && !q.length) finish(); },
    };
  }

  // ---------- Voice: speech recognition (listen) ----------
  let rec = null, listening = false, convo = false;
  const recLang = () => (cfg.voice !== 'auto' ? cfg.voice : MLS.extLang ? MLS.extLang.speech : { en: 'en-US', ne: 'ne-NP', zh: 'zh-CN' }[MLS.S.lang] || 'en-US');
  async function listen() {
    if (!SpeechRec) { toast(u('noMic')); return; }
    if (listening) { rec && rec.stop(); return; }
    stopSpeaking();
    listening = true;                                    // reserve: a second click while the mic opens stops instead
    await gateStart();
    const r = (rec = new SpeechRec());
    r.lang = recLang(); r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    const ta = panel.querySelector('.tutor-form textarea');
    let finalText = '', conf = 0;
    const startedAt = Date.now();
    r.onstart = () => { listening = true; setState('listening'); };
    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) { const x = e.results[i]; if (x.isFinal) { finalText += x[0].transcript; conf = Math.max(conf, x[0].confidence || 0); } else interim += x[0].transcript; }
      ta.value = (finalText + interim).trim();
    };
    r.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { toast(u('micDenied')); convo = false; drawConvo(); } };
    r.onend = () => {
      listening = false; setState('idle');
      const txt = finalText.trim();
      if (txt && meaningful(txt) && confident(conf) && voiceHeardSince(startedAt)) send(txt, true);
      else if (txt) { ta.value = ''; toast(u('noiseIgnored')); if (convo) setTimeout(listen, 300); else gateIdle(); }   // noise: keep listening
      else { if (convo) { convo = false; drawConvo(); } gateIdle(); }
    };
    recStart(r);
  }

  // ---------- Panel UI ----------
  let panel = null, fab = null;
  function setState(s) {
    if (!panel) return;
    const av = panel.querySelector('.tutor-avatar');
    av.classList.toggle('talking', s === 'speaking');
    av.classList.toggle('listening', s === 'listening');
    av.classList.toggle('thinking', s === 'thinking');
    fab && fab.classList.toggle('talking', s === 'speaking');
    panel.querySelector('.tutor-state').textContent = s === 'listening' ? u('stListening') : s === 'speaking' ? u('stSpeaking') : s === 'thinking' ? u('stThinking') : u('stReady');
    panel.querySelector('.mic').classList.toggle('on', s === 'listening');
  }
  function drawConvo() { if (panel) panel.querySelector('.convo').classList.toggle('on', convo); }
  function build() {
    fab = h(`<button class="tutor-fab" title="AI Tutor"><span class="fab-av"></span><span class="fab-tx"></span></button>`);
    panel = h(`<div class="tutor" hidden>
      <div class="tutor-head">
        <div class="tutor-avatar"></div>
        <div class="tutor-tt"><b class="tt"></b><span class="mode"></span><span class="tutor-state"></span></div>
        <div class="tutor-tools"><button class="ic callbtn" title="Face-to-face call">📹</button><button class="ic spk" title="Voice on/off">🔊</button><button class="ic new" title="New chat">🗒️</button><button class="ic set" title="Settings">⚙️</button><button class="ic close" title="Close">✕</button></div>
      </div>
      <div class="tutor-settings" hidden></div>
      <div class="tutor-msgs"></div>
      <div class="tutor-chips"></div>
      <form class="tutor-form"><button type="button" class="mic" title="Speak">🎙️</button><textarea rows="2"></textarea><button class="send" type="submit">➤</button></form>
      <div class="tutor-foot"><button type="button" class="convo">🗣️ <span></span></button><span class="muted small vnote"></span></div>
    </div>`);
    document.body.append(fab, panel);
    fab.onclick = () => (panel.hidden ? openTutor() : close());
    panel.querySelector('.close').onclick = close;
    panel.querySelector('.set').onclick = () => { const s = panel.querySelector('.tutor-settings'); s.hidden = !s.hidden; drawSettings(); };
    panel.querySelector('.new').onclick = () => { stopSpeaking(); history = []; wangConv = null; drawMsgs(); };
    panel.querySelector('.spk').onclick = () => { cfg.speak = !cfg.speak; store.set('ai-speak', cfg.speak); if (!cfg.speak) stopSpeaking(); refresh(); };
    panel.querySelector('.mic').onclick = listen;
    panel.querySelector('.callbtn').onclick = openCall;
    panel.querySelector('.convo').onclick = () => { convo = !convo; drawConvo(); if (convo) { toast(u('talkOn')); listen(); } else if (listening) rec.stop(); };
    const ta = panel.querySelector('.tutor-form textarea');
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(ta.value); } });
    panel.querySelector('form').onsubmit = (e) => { e.preventDefault(); send(ta.value); };
    if (synth) synth.onvoiceschanged = () => {};
    refresh();
  }
  function refresh() {
    if (!fab) return;
    fab.querySelector('.fab-av').innerHTML = avatarSVG(cfg.look);
    fab.querySelector('.fab-tx').textContent = teacherName();
    const av = panel.querySelector('.tutor-avatar'), cls = av.className;
    av.innerHTML = avatarSVG(cfg.look); av.className = cls;
    panel.querySelector('.tt').textContent = `${teacherName()} · ${u('tutor')}`;
    panel.querySelector('.mode').innerHTML = engine() === 'wang' ? `<i class="dot ${wangOk ? 'on' : ''}"></i>${u('brainWang')}` : engine() === 'claude' ? `<i class="dot on"></i>${u('tutorOnline')}` : engine() === 'free' ? `<i class="dot on"></i>✨ ${u('modeFree')} <small class="muted">· GPT-OSS</small>` : engine() === 'cloud' ? `<i class="dot ${isSignedIn() ? 'on' : ''}"></i>⚡ ${esc(modelLabel())}${isSignedIn() ? '' : ' · ' + u(FILE_MODE ? 'fileShort' : 'notConnected')}` : engine() === 'local' ? `<i class="dot on"></i>🧠 ${u('modeLocal')}` : `<i class="dot"></i>${u('tutorOffline')}`;
    if (!panel.querySelector('.tutor-state').textContent) panel.querySelector('.tutor-state').textContent = u('stReady');
    panel.querySelector('.spk').textContent = cfg.speak ? '🔊' : '🔇';
    panel.querySelector('.tutor-form textarea').placeholder = u('tutorPh');
    panel.querySelector('.convo span').textContent = u('talkMode');
    panel.querySelector('.vnote').textContent = SpeechRec ? '' : u('noMic');
    const chips = [['chipExplain', MLS.route === 'learn'], ['chipError', !!(MLS.lastRun && MLS.lastRun.err)], ['chipData', !!(MLS.datalab && MLS.datalab.profile)], ['chipPractice', true], ['chipNext', true]].filter((c) => c[1]);
    const ch = panel.querySelector('.tutor-chips');
    ch.innerHTML = chips.map(([k]) => `<button data-k="${k}">${u(k)}</button>`).join('');
    ch.querySelectorAll('button').forEach((b) => (b.onclick = () => send(u(b.dataset.k).replace(/^\S+\s/, ''))));
    const cb = h(`<button class="call-chip">${u('callBtn')}</button>`); cb.onclick = () => openCall(); ch.prepend(cb);
    if (MLS.liveEnabled && MLS.liveEnabled()) { const lb = h(`<button class="call-chip live-chip">${u('liveBtn')}</button>`); lb.onclick = () => MLS.openLive(); ch.prepend(lb); }
    if (!history.length) drawMsgs();
  }
  Object.assign(MLS.UI, {
    freeAI: { en: 'Free AI brain (runs on your device)', ne: 'निःशुल्क AI दिमाग (तपाईंकै उपकरणमा चल्छ)', zh: '免费 AI 大脑（在你的设备上运行）' },
    freeAIHelp: { en: 'A real AI model is downloaded once into your browser and then answers any question for free, privately, even offline. Needs Chrome or Edge with WebGPU (most computers from the last few years). Small on-device models can make mistakes — double-check important facts, or connect Claude for the smartest answers.', ne: 'वास्तविक AI मोडेल एक पटक ब्राउजरमा डाउनलोड हुन्छ, त्यसपछि जुनसुकै प्रश्नको उत्तर निःशुल्क, गोप्य रूपमा, अफलाइनमा पनि दिन्छ। WebGPU भएको Chrome वा Edge चाहिन्छ। साना मोडेलले गल्ती गर्न सक्छन् — महत्त्वपूर्ण तथ्य दोहोर्याएर जाँच्नुहोस्, वा सबैभन्दा स्मार्ट उत्तरका लागि Claude जोड्नुहोस्।', zh: '真正的 AI 模型只需下载一次到浏览器中，之后就能免费、私密地回答任何问题，甚至离线也行。需要支持 WebGPU 的 Chrome 或 Edge。小型本地模型可能会出错——重要事实请再核实，或连接 Claude 获得最聪明的回答。' },
    freeAIOn: { en: 'Use the free on-device AI', ne: 'निःशुल्क उपकरण-भित्रको AI प्रयोग गर्नुहोस्', zh: '使用免费的本地 AI' },
    noGPU: { en: '⚠️ This browser has no WebGPU, so the free on-device AI can\'t run here. Use the latest Chrome or Edge on a computer — or connect Claude below.', ne: '⚠️ यो ब्राउजरमा WebGPU छैन, त्यसैले निःशुल्क AI यहाँ चल्दैन। कम्प्युटरमा नयाँ Chrome वा Edge प्रयोग गर्नुहोस् — वा तल Claude जोड्नुहोस्।', zh: '⚠️ 此浏览器不支持 WebGPU，无法运行免费本地 AI。请在电脑上使用最新版 Chrome 或 Edge——或在下方连接 Claude。' },
    aiCardT: { en: 'Turn on a real AI that answers ANY question', ne: 'जुनसुकै प्रश्नको उत्तर दिने वास्तविक AI सुरु गर्नुहोस्', zh: '开启能回答任何问题的真正 AI' },
    aiCardP: { en: 'Right now I\'m in simple offline mode. Choose one: 🧠 free AI on your device (one-time download ~1 GB, private) — or 🔑 Claude with your API key (smartest, any language).', ne: 'अहिले म साधारण अफलाइन मोडमा छु। एउटा छान्नुहोस्: 🧠 तपाईंको उपकरणमा निःशुल्क AI (एक पटक ~१ GB डाउनलोड, गोप्य) — वा 🔑 तपाईंको API key सहित Claude (सबैभन्दा स्मार्ट, जुनसुकै भाषा)।', zh: '我现在处于简单的离线模式。请选择：🧠 在你设备上运行的免费 AI（一次性下载约 1 GB，保护隐私）——或 🔑 使用你的 API 密钥连接 Claude（最聪明，支持任何语言）。' },
    aiCardBtn: { en: 'Download & turn on free AI', ne: 'निःशुल्क AI डाउनलोड गरेर सुरु गर्नुहोस्', zh: '下载并开启免费 AI' },
    aiCardClaude: { en: 'Connect Claude', ne: 'Claude जोड्नुहोस्', zh: '连接 Claude' },
    aiReady: { en: '🧠 Free AI is ready — ask me anything!', ne: '🧠 निःशुल्क AI तयार छ — जे पनि सोध्नुहोस्!', zh: '🧠 免费 AI 已就绪——尽管问吧！' },
    aiFail: { en: 'The free AI could not start on this device', ne: 'निःशुल्क AI यो उपकरणमा सुरु हुन सकेन', zh: '免费 AI 无法在此设备上启动' },
    modeLocal: { en: 'Free AI (on your device)', ne: 'निःशुल्क AI (उपकरणमा)', zh: '免费 AI（本地）' },
    chooseT: { en: 'Choose your teacher', ne: 'आफ्नो शिक्षक छान्नुहोस्', zh: '选择你的老师' },
    chooseMore: { en: 'More teachers in ⚙️ settings', ne: '⚙️ सेटिङमा थप शिक्षक', zh: '在 ⚙️ 设置中还有更多老师' },
    askSel: { en: 'Ask', ne: 'सोध्नुहोस्', zh: '问' },
    explainSel: { en: 'Explain this in simple words', ne: 'यसलाई सरल शब्दमा बुझाउनुहोस्', zh: '用简单的话解释这一段' },
  });
  function drawSettings() {
    const s = panel.querySelector('.tutor-settings');
    s.innerHTML = `<b>🧑 ${u('avBuild')}</b>
      <div class="av-builder"><div class="av-preview">${avatarSVG()}</div><div class="av-rows">${['skin', 'hair', 'shirt', 'eyes'].map((k) => `<div class="av-row"><span>${u('av_' + k)}</span>${AV_OPTS[k].map((c) => `<button class="sw ${(cfg.av[k] || AV_DEFAULT[k]) === c ? 'on' : ''}" data-k="${k}" data-v="${c}" style="background:${c}"></button>`).join('')}</div>`).join('')}
        <div class="av-row"><span>${u('av_style')}</span>${AV_OPTS.style.map((st) => `<button class="stl ${(cfg.av.style || AV_DEFAULT.style) === st ? 'on' : ''}" data-v="${st}">${u('st_' + st)}</button>`).join('')}</div>
        <label class="small chk"><input type="checkbox" class="glasses" ${(cfg.av.glasses ?? AV_DEFAULT.glasses) ? 'checked' : ''}> ${u('av_glasses')}</label></div></div>
      <b>🗣️ ${u('voiceTitle')}</b>
      <div class="seg veng">${[['openai', u('vChatGPT')], ['browser', u('vBrowser')]].map(([k, n]) => `<button data-v="${k}" class="${cfg.voiceEngine === k ? 'on' : ''}">${n}</button>`).join('')}</div>
      ${cfg.voiceEngine === 'openai' && !isSignedIn() ? `<p class="small muted">${u('vNeedsConnect')}</p>` : ''}
      ${synth && synth.getVoices().length && !synth.getVoices().some((v) => /natural|neural|online/i.test(v.name)) ? `<p class="small muted">${u('vEdgeTip')}</p>` : ''}
      <label class="small">${u('vOaPick')} <select class="oavoice">${OA_VOICES.map(([id, n]) => `<option value="${id}" ${id === cfg.oaVoice ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="small">${u('voicePick')} <select class="vname"><option value="">${u('voiceAuto')}</option>${(synth ? synth.getVoices() : []).filter((v) => !cfg.voice || cfg.voice === 'auto' || v.lang.startsWith(cfg.voice.split('-')[0])).map((v) => `<option ${v.name === cfg.voiceName ? 'selected' : ''}>${esc(v.name)}</option>`).join('')}</select></label>
      <div class="row small"><label>${u('voiceSpeed')} <input type="range" class="vrate" min="0.8" max="1.25" step="0.01" value="${cfg.rate || 1}"></label><label>${u('voicePitch')} <input type="range" class="vpitch" min="0.8" max="1.25" step="0.01" value="${cfg.pitch || 1}"></label><button class="btn ghost sm vtest">▶ ${u('voiceTest')}</button></div>
      <label class="small">${u('tutorVoice')} <select class="voice">${VOICES.map(([id, n]) => `<option value="${id}" ${id === cfg.voice ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="small chk"><input type="checkbox" class="speak" ${cfg.speak ? 'checked' : ''}> ${u('tutorSpeak')}</label>
      <p class="small muted">${u('voiceNote')}</p>
      <b>🎙️ ${u('micSensT')}</b>
      <select class="micsens">${[['high', u('micHigh')], ['normal', u('micNormal')], ['low', u('micLow')]].map(([k, n]) => `<option value="${k}" ${cfg.micSens === k ? 'selected' : ''}>${n}</option>`).join('')}</select>
      <label class="small chk"><input type="checkbox" class="ptt" ${cfg.ptt ? 'checked' : ''}> ${u('pttOn')}</label>
      <div class="row"><button class="btn ghost sm mictest">🎙️ ${u('micTest')}</button><small class="micres"></small></div>
      <div class="mic-meter"><span></span></div>
      <b>⚡ ${u('brainT')}</b>
      <div class="seg brain">${[['auto', u('brainAuto')], ['cloud', u('brainCloud')], ['local', u('brainLocal')], ['wang', u('brainWang')], ['offline', u('brainOff')]].map(([k, n]) => `<button data-b="${k}" class="${cfg.brain === k ? 'on' : ''}">${n}</button>`).join('')}</div>
      <p class="small">${cfg.brain === 'wang' ? u('wangHelp') : u('brainHelp')}</p>
      ${cfg.brain === 'auto' && !FILE_MODE && !isSignedIn() ? `<div class="row"><button class="btn ghost sm cgpt">${u('connectBtn')}</button><small class="muted">${u('cgptWhy')}</small></div>` : ''}
      ${cfg.brain === 'wang' ? `<label class="small">${u('wangUrl')} <input type="url" class="wangurl" placeholder="http://localhost:8000" autocomplete="off" value="${esc(cfg.wangUrl)}"></label>
      <div class="row"><button class="btn ghost sm wangtest">${u('wangTest')}</button><small class="wangres"></small></div>` : ''}
      <label class="small">${u('tutorModel')} <select class="cmodel">${CLOUD_MODELS.map(([id, n]) => `<option value="${id}" ${id === cfg.cloudModel ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <b>🧠 ${u('freeAI')}</b><p class="small">${u('freeAIHelp')}</p>
      ${hasGPU ? `<label class="small chk"><input type="checkbox" class="local" ${cfg.local ? 'checked' : ''}> ${u('freeAIOn')}</label>
      <label class="small">${u('tutorModel')} <select class="lmodel">${LOCAL_MODELS.map(([id, n]) => `<option value="${id}" ${id === cfg.localModel ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <div class="ai-progress" hidden><span></span><small></small></div>` : `<p class="small warnline">${u('noGPU')}</p>`}
      <b>🎥 ${u('liveOwner')}</b><p class="small">${u('liveOwnerHelp')}</p>
      <label class="small chk"><input type="checkbox" class="liveowner" ${store.get('live-owner', false) ? 'checked' : ''}> ${u('liveOwnerOn')}</label>
      <b>🔑 ${u('tutorSettings')}</b><p class="small">${u('tutorKeyHelp')}</p>
      <input type="password" class="key" placeholder="sk-ant-..." autocomplete="off" value="${esc(cfg.key)}">
      <label class="small">${u('tutorModel')} <select class="model">${MODELS.map(([id, n]) => `<option value="${id}" ${id === cfg.model ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <div class="row"><button class="btn sm save">${u('tutorSave')}</button>${cfg.key ? `<button class="btn ghost sm forget">${u('tutorForget')}</button>` : ''}</div>`;
    s.querySelectorAll('.brain button').forEach((b) => (b.onclick = () => { cfg.brain = b.dataset.b; cfg.local = cfg.brain === 'local'; store.set('ai-brain', cfg.brain); store.set('ai-local', cfg.local); refresh(); drawSettings(); }));
    const cg = s.querySelector('.cgpt'); if (cg) cg.onclick = (ev) => connectPuter(ev.currentTarget).then(() => { if (panel) drawSettings(); });
    s.querySelector('.micsens').onchange = (e) => { cfg.micSens = e.target.value; store.set('ai-mic-sens', cfg.micSens); };
    s.querySelector('.ptt').onchange = (e) => { cfg.ptt = e.target.checked; store.set('ai-ptt', cfg.ptt); };
    s.querySelector('.mictest').onclick = () => micTest(s);
    s.querySelectorAll('.veng button').forEach((b) => (b.onclick = () => { cfg.voiceEngine = b.dataset.v; store.set('ai-voice-engine', cfg.voiceEngine); ttsBroken = false; drawSettings(); }));
    s.querySelector('.oavoice').onchange = (e) => { cfg.oaVoice = e.target.value; store.set('ai-oa-voice', cfg.oaVoice); ttsBroken = false; };
    const avSet = (k, v) => { cfg.av = { ...cfg.av, [k]: v }; store.set('ai-avatar', cfg.av); refresh(); drawSettings(); };
    s.querySelectorAll('.sw').forEach((b) => (b.onclick = () => avSet(b.dataset.k, b.dataset.v)));
    s.querySelectorAll('.stl').forEach((b) => (b.onclick = () => avSet('style', b.dataset.v)));
    s.querySelector('.glasses').onchange = (e) => avSet('glasses', e.target.checked);
    s.querySelector('.vtest').onclick = () => { cfg.voiceName = s.querySelector('.vname').value; cfg.rate = +s.querySelector('.vrate').value; cfg.pitch = +s.querySelector('.vpitch').value; setState('speaking'); speak(u('voiceSample')); };
    const wt = s.querySelector('.wangtest');
    if (wt) wt.onclick = async () => {
      const res = s.querySelector('.wangres');
      cfg.wangUrl = s.querySelector('.wangurl').value.trim() || 'http://localhost:8000'; store.set('ai-wang-url', cfg.wangUrl);
      res.textContent = '…';
      try {
        const hlt = await wangHealth();
        wangOk = !!hlt.llm_configured;
        res.textContent = hlt.llm_configured ? u('wangReady').replace('{model}', hlt.llm_model) : u('wangNoKey');
      } catch { wangOk = false; res.innerHTML = wangErrorText({ wang: 'offline' }); }
      refresh();
    };
    s.querySelector('.save').onclick = () => {
      const wu = s.querySelector('.wangurl'); if (wu) { cfg.wangUrl = wu.value.trim() || 'http://localhost:8000'; store.set('ai-wang-url', cfg.wangUrl); }
      cfg.key = s.querySelector('.key').value.trim(); cfg.model = s.querySelector('.model').value;
      cfg.voice = s.querySelector('.voice').value; cfg.speak = s.querySelector('.speak').checked; cfg.voiceName = s.querySelector('.vname').value; cfg.rate = +s.querySelector('.vrate').value; cfg.pitch = +s.querySelector('.vpitch').value;
      if (hasGPU) { cfg.local = s.querySelector('.local').checked; cfg.localModel = s.querySelector('.lmodel').value; if (cfg.local) cfg.brain = 'local'; }
      cfg.cloudModel = s.querySelector('.cmodel').value; store.set('ai-cloud-model', cfg.cloudModel); store.set('ai-brain', cfg.brain);
      ['key', 'model', 'voice', 'speak', 'local', 'voiceName', 'rate', 'pitch'].forEach((k) => store.set('ai-' + k, cfg[k]));
      store.set('live-owner', s.querySelector('.liveowner').checked);
      store.set('ai-local-model', cfg.localModel);
      if (engine() === 'local') startLocal(s.querySelector('.ai-progress'));
      else { s.hidden = true; }
      refresh(); toast('✓');
    };
    const f = s.querySelector('.forget'); if (f) f.onclick = () => { cfg.key = ''; store.set('ai-key', ''); s.hidden = true; refresh(); };
  }
  function startLocal(progEl) {
    if (progEl) progEl.hidden = false;
    loadLocal().then(() => { toast(u('aiReady')); const s = panel.querySelector('.tutor-settings'); s.hidden = true; history.length || drawMsgs(); })
      .catch((e) => { console.error(e); cfg.local = false; store.set('ai-local', false); toast(`${u('aiFail')}: ${e.message || e}`); refresh(); });
  }
  function bubble(role, html) {
    const b = h(`<div class="msg ${role}">${role === 'bot' ? `<div class="msg-av">${avatarSVG(cfg.look)}</div>` : ''}<div class="bub"></div></div>`);
    const bub = b.querySelector('.bub');
    if (html instanceof Node) bub.appendChild(html); else bub.innerHTML = html;
    panel.querySelector('.tutor-msgs').appendChild(b);
    return bub;
  }
  function chooserCard() {
    return null;
    const el = h(`<div class="chooser"><b>✨ ${u('chooseT')}</b><div class="chooser-grid">${['feng', 'wang'].map((k) => `<button class="choose" data-k="${k}">${avatarSVG(k)}<b>${LOOKS[k].name}</b><span>${esc(t(LOOKS[k].title))}</span></button>`).join('')}</div><small class="muted">${u('chooseMore')}</small></div>`);
    el.querySelectorAll('.choose').forEach((b) => (b.onclick = () => { cfg.look = b.dataset.k; store.set('ai-look', cfg.look); store.set('ai-chosen', true); refresh(); drawMsgs(); }));
    return el;
  }
  function aiCard() {
    if (engine() === 'wang' || engine() === 'claude' || engine() === 'cloud' || engine() === 'free' || (engine() === 'local' && localEngine && !localLoading)) return null;
    if (localLoading || engine() === 'local') {
      const pe = h(`<div class="ai-card"><b>🧠 ${u('freeAI')}</b><p class="small">${u('freeAIHelp')}</p><div class="ai-progress"><span></span><small>…</small></div></div>`);
      if (!localLoading) startLocal(pe.querySelector('.ai-progress'));
      if (lastProg) setTimeout(() => localProgress(lastProg));
      return pe;
    }
    const el = h(`<div class="ai-card"><b>⚡ ${u('aiCardT')}</b><p>${u('aiCardP')}</p>
      <div class="row">${hasGPU ? `<button class="btn sm turn-on">🧠 ${u('aiCardBtn')}</button>` : ''}<button class="btn ghost sm use-claude">🔑 ${u('aiCardClaude')}</button></div>
      ${hasGPU ? '' : `<p class="small warnline">${u('noGPU')}</p>`}<div class="ai-progress" hidden><span></span><small></small></div></div>`);
    const on = el.querySelector('.turn-on');
    if (on) on.onclick = () => { cfg.local = true; store.set('ai-local', true); on.disabled = true; refresh(); startLocal(el.querySelector('.ai-progress')); };
    el.querySelector('.use-claude').onclick = () => { const s = panel.querySelector('.tutor-settings'); s.hidden = false; drawSettings(); s.querySelector('.key').focus(); };
    return el;
  }
  function drawMsgs() {
    const box = panel.querySelector('.tutor-msgs'); box.innerHTML = '';
    const ch = chooserCard(); if (ch) box.appendChild(ch);
    bubble('bot', esc(u('tutorHi').replace('{name}', teacherName())));
    const card = aiCard(); if (card) box.appendChild(card);
    if (engine() === 'cloud' && !isSignedIn()) box.appendChild(connectCard());
    history.forEach((m) => { if (m.role === 'user') bubble('user', esc(m.content).replace(/\n/g, '<br>')); else render(m.content, bubble('bot', '')); });
    box.scrollTop = box.scrollHeight;
  }
  const liveFmt = (s) => esc(s).replace(/```[\s\S]*?(```|$)/g, (m) => `<pre class="md-pre">${m.replace(/```\w*\n?/g, '')}</pre>`).replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>').replace(/`([^`\n]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
  let busy = false, curHolder = null;
  function setSendBtn(on) { const s = panel.querySelector('.send'); s.textContent = on ? '⏹' : '➤'; s.classList.toggle('stop', on); s.title = on ? 'Stop' : 'Send'; }
  async function send(text, viaVoice = false) {
    if (busy) { if (curHolder && curHolder.stream) { try { curHolder.stream.abort(); } catch { /* ignore */ } } return; }
    text = (text || '').trim(); if (!text) return;
    stopSpeaking();
    const ta = panel.querySelector('.tutor-form textarea'); ta.value = '';
    bubble('user', (viaVoice ? '🎙️ ' : '') + esc(text).replace(/\n/g, '<br>'));
    const box = panel.querySelector('.tutor-msgs');
    const out = bubble('bot', `<span class="typing">${engine() === 'local' && !localEngine ? '🧠 …' : u('thinking')}</span>`);
    box.scrollTop = box.scrollHeight;
    const after = () => { if (convo && SpeechRec) setTimeout(listen, 350); };
    if (engine() === 'offline') {
      out.innerHTML = offlineAnswer(text); box.scrollTop = box.scrollHeight;
      speak(speakable(out.innerText.replace(u('offlineNote'), '')), after);
      return;
    }
    if (engine() === 'cloud') {
      try { await loadPuter(); } catch { /* handled below */ }
      if (!isSignedIn()) {
        pendingQ = { text, voice: viaVoice };
        box.querySelectorAll('.connect-card').forEach((c) => c.remove()); // keep just one card, next to the question
        out.innerHTML = ''; out.appendChild(connectCard()); box.scrollTop = box.scrollHeight;
        return;
      }
    }
    busy = true; setSendBtn(true); setState('thinking');
    history.push({ role: 'user', content: text });
    const holder = (curHolder = {});
    holder.onWait = (sec) => { if (!acc) { out.innerHTML = `<span class="muted">${u('freeWait').replace('{s}', sec)}</span>`; box.scrollTop = box.scrollHeight; } };
    let acc = '', A = null, last = 0;
    const speaker = (viaVoice || convo) && cfg.speak ? makeSpeaker(after) : null;   // talk while the answer is still arriving
    const feed = speaker ? sentenceFeeder((x) => speaker.say(x)) : null;
    try {
      if (engine() === 'claude') A = await sdk();
      const full = await askAI((d) => {
        acc += d; if (feed) feed(d);
        const now = Date.now(); if (now - last > 80) { last = now; out.innerHTML = liveFmt(acc); box.scrollTop = box.scrollHeight; }
      }, viaVoice || convo, holder);
      history.push({ role: 'assistant', content: full });
      render(full, out);
      if (speaker) { feed('', true); speaker.end(); } else speak(speakable(full), after);
    } catch (e) {
      if (speaker) stopSpeaking();
      const aborted = !holder.timedOut && /abort/i.test(puterErr(e) + String(e && e.name));
      if (aborted && acc) { history.push({ role: 'assistant', content: acc }); render(acc, out); }
      else {
        console.error('AI error:', puterErr(e)); history.pop();
        if (engine() === 'cloud' && !isFreeErr(e) && needsConnect(e)) { pendingQ = { text, voice: viaVoice }; box.querySelectorAll('.connect-card').forEach((c) => c.remove()); out.innerHTML = ''; out.appendChild(connectCard()); }
        else if (isFreeErr(e) && e.free === 'busy') {
          // the shared free AI is overloaded: still help right away, from the built-in lessons and glossary
          out.innerHTML = `<p class="muted">${e.secs > 12 ? u('freeBusyNotesS').replace('{s}', e.secs) : u('freeBusyNotes')}</p>${offlineAnswer(text)}<button class="btn ghost sm retry">↻ ${u('retry')}</button>`;
          out.querySelector('.retry').onclick = () => send(text, viaVoice);
          speak(u('freeBusySay'), after);
        }
        else {
          out.innerHTML = `<p>${holder.timedOut ? u('aiTimeout') : apiErrorText(e, A)}</p><button class="btn ghost sm retry">↻ ${u('retry')}</button>`;
          out.querySelector('.retry').onclick = () => send(text, viaVoice);
        }
        setState('idle');
      }
    }
    busy = false; setSendBtn(false); if (!synth || !synth.speaking) setState('idle');
    box.scrollTop = box.scrollHeight;
  }
  function openTutor(prefill) {
    if (engine() === 'cloud') loadPuter().then(() => { if (panel) { refresh(); if (!history.length) drawMsgs(); } }).catch(() => {});
    else if (!FILE_MODE && (cfg.brain === 'auto' || cfg.voiceEngine === 'openai')) loadPuter().then(() => { if (panel) refresh(); }).catch(() => {}); // a connected learner automatically gets ChatGPT and its voice
    if (!panel) build();
    panel.hidden = false; fab.classList.add('open'); refresh();
    if (prefill) send(prefill); else panel.querySelector('.tutor-form textarea').focus();
  }
  function close() { panel.hidden = true; fab.classList.remove('open'); stopSpeaking(); convo = false; drawConvo(); if (listening && rec) rec.stop(); setTimeout(gateIdle, 500); }
  MLS.openTutor = openTutor;
  MLS.closeTutorPanel = () => { if (panel && !panel.hidden) close(); };

  // ---------- 📹 Face-to-face call: real-time, full-duplex style conversation ----------
  // Always listening; you can interrupt while the teacher talks; the avatar nods and reacts while you speak;
  // answers are spoken sentence-by-sentence while they stream in. The camera (optional) stays on this device.
  Object.assign(MLS.UI, {
    callBtn: { en: '📹 Face-to-face call', ne: '📹 आमने-सामने कल', zh: '📹 面对面通话' },
    callHint: { en: 'Just talk naturally — I\'m always listening, and you can interrupt me any time. Headphones work best.', ne: 'स्वाभाविक रूपमा बोल्नुहोस् — म सधैं सुनिरहेको हुन्छु, र तपाईं जुनसुकै बेला मलाई रोक्न सक्नुहुन्छ। हेडफोन सबैभन्दा राम्रो।', zh: '像平常一样说话就好——我一直在听，你可以随时打断我。戴耳机效果最好。' },
    callInterrupt: { en: 'Go ahead, I\'m listening…', ne: 'भन्नुहोस्, म सुन्दैछु…', zh: '你说，我在听…' },
    callCam: { en: 'Your camera is only shown to you — it never leaves this device.', ne: 'तपाईंको क्यामेरा तपाईंलाई मात्र देखिन्छ — यो उपकरणबाट बाहिर जाँदैन।', zh: '摄像头画面只显示给你自己——不会离开这台设备。' },
    callMuted: { en: '🔇 Microphone off', ne: '🔇 माइक बन्द', zh: '🔇 麦克风已关闭' },
    callGreet: { en: 'Hi! I am {name}. What would you like to learn today?', ne: 'नमस्ते! म {name} हुँ। आज के सिक्न चाहनुहुन्छ?', zh: '你好！我是 {name}。今天想学点什么？' },
  });
  let call = null;
  const normTxt = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const cleanSpeech = (x) => voiceText(x);
  function face(cls, on) { if (call) call.el.querySelector('.call-avatar').classList.toggle(cls, on); }
  function caption(who, txt) { if (call) call.el.querySelector('.call-caption.' + who).textContent = txt; }
  function cStatus(txt) { if (call) call.el.querySelector('.call-status').textContent = txt; }
  function cSay(text) {
    text = cleanSpeech(text); if (!call || !text) return;
    call.queue.push({ text, audioP: cfg.speak && useCloudVoice() ? tts(text) : null }); // start fetching the voice immediately
    if (!call.speaking) cNext();
  }
  async function cNext() {
    if (!call) return;
    const item = call.queue.shift();
    if (!item) { call.speaking = false; call.cur = ''; face('talking', false); setTimeout(() => { if (call && !call.speaking) caption('bot', ''); }, 1800); return; }
    const s = item.text;
    call.speaking = true; call.cur = s; face('talking', true); caption('bot', s); noteSaid(s);
    const advance = () => { if (call && call.cur === s) setTimeout(() => { if (call && call.cur === s) cNext(); }, /[.!?。！？।]$/.test(s) ? 110 + Math.random() * 150 : 60); };
    if (!cfg.speak) { setTimeout(advance, 55 * s.length + 400); return; }
    if (item.audioP) {
      try {
        const audio = await item.audioP;
        if (!call || call.cur !== s) return;
        const r = await playAudio(audio);
        if (!call || call.cur !== s) return;
        if (r === 'ended') { advance(); return; }
        if (r === 'error') ttsBroken = true;
      } catch (e) { ttsBroken = true; console.warn('ChatGPT voice unavailable', puterErr(e)); }
      if (!call || call.cur !== s) return;
    }
    if (!synth) { setTimeout(advance, 55 * s.length); return; }
    const lang = detectLang(s), v = pickVoice(lang);
    const ut = humanUtterance(s, lang, v);
    ut.onend = ut.onerror = advance;
    synth.speak(ut);
  }
  function cHush() { if (!call) return; call.queue = []; call.cur = ''; if (synth) synth.cancel(); if (curAudio) { try { curAudio.pause(); } catch { /* ignore */ } } audioPlaying = false; call.speaking = false; face('talking', false); }
  function backchannel() {
    if (!call || call.speaking) return;
    const now = Date.now(); if (now - call.lastBC < 2200) return; call.lastBC = now;
    face('nod', true); setTimeout(() => face('nod', false), 900);
    const bc = call.el.querySelector('.call-bc'); bc.textContent = ['👂', '🙂', '👍', '💭', '🤔'][Math.floor(Math.random() * 5)];
    bc.classList.add('show'); setTimeout(() => bc.classList.remove('show'), 1100);
  }
  function emote(text) {
    const cls = /error|wrong|sorry|mistake|problem|गल्ती|माफ|错误|抱歉|问题/i.test(text) ? 'concerned' : /great|well done|excellent|awesome|perfect|शाबास|उत्कृष्ट|太棒|很好|完美|!|！/i.test(text) ? 'happy' : '';
    if (!cls) return; face(cls, true); setTimeout(() => face(cls, false), 4000);
  }
  function cListen() {
    if (!call || call.muted || !SpeechRec) return;
    const r = new SpeechRec(); call.rec = r;
    r.lang = call.lang; r.continuous = true; r.interimResults = true;
    r.onresult = (e) => {
      if (!call) return;
      let interim = '', fin = '', conf = 0;
      for (let i = e.resultIndex; i < e.results.length; i++) { const x = e.results[i]; if (x.isFinal) { fin += x[0].transcript; conf = Math.max(conf, x[0].confidence || 0); } else interim += x[0].transcript; }
      const heard = (fin || interim).trim(); if (!heard) return;
      if (!call.uttStart) call.uttStart = Date.now() - 1500;                     // roughly when this utterance began
      if (cfg.ptt && !call.ptt && Date.now() - call.pttUp > 1500) { call.uttStart = 0; return; }   // push-to-talk: only while held
      if (isEcho(heard)) { call.uttStart = 0; return; }                         // the teacher's own voice from the speakers
      if (call.speaking) {
        // Interrupt only for a real voice near the mic: 2+ words AND sustained voice energy (not a cough, TV or a fan).
        if (!cfg.ptt && !(tokens(heard).length >= 2 && sustainedVoice(400))) return;
        cHush(); cStatus(u('callInterrupt'));
      }
      caption('you', ((call.pending || '') + ' ' + heard).trim()); backchannel();
      if (!fin.trim()) return;
      const since = call.uttStart; call.uttStart = 0;
      if (!meaningful(fin) || !confident(conf) || !voiceHeardSince(since)) { noiseNote(); return; }
      call.pending = ((call.pending || '') + ' ' + fin.trim()).trim();
      scheduleAsk();
    };
    r.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { toast(u('micDenied')); call.muted = true; drawCallBar(); } };
    r.onend = () => { if (call && !call.muted && call.rec === r) setTimeout(cListen, 250); };
    recStart(r);
  }
  function noiseNote() {
    if (!call || call.speaking) return;
    cStatus(u('noiseIgnored'));
    setTimeout(() => { if (call && call.el.querySelector('.call-status').textContent === u('noiseIgnored')) cStatus(''); }, 1500);
  }
  // Ask once the student has really finished speaking: Chrome may cut one sentence into pieces at every short pause,
  // and asking each piece separately cancelled the previous answer and produced replies to half-questions.
  function scheduleAsk() {
    clearTimeout(call.askTimer);
    const t0 = Date.now();
    const check = () => {
      if (!call || !call.pending) return;
      const quiet = gateOn() ? Date.now() - gate.lastVoice > 550 : Date.now() - t0 >= 600;
      if ((cfg.ptt ? !call.ptt : quiet) || Date.now() - t0 > 2500) { const q = call.pending; call.pending = ''; caption('you', q); cAsk(q); }
      else call.askTimer = setTimeout(check, 100);
    };
    call.askTimer = setTimeout(check, gateOn() ? 100 : 600);
  }
  function pttKey(e) {
    if (!call || !cfg.ptt || e.code !== 'Space' || e.target.closest('input, textarea, select, button')) return;
    e.preventDefault();
    if (e.type === 'keydown' && !call.ptt) { call.ptt = true; drawCallBar(); }
    if (e.type === 'keyup') { call.ptt = false; call.pttUp = Date.now(); drawCallBar(); if (call.pending) scheduleAsk(); }
  }
  async function cAsk(text) {
    const turn = ++call.turn;
    if (call.holder && call.holder.stream) { try { call.holder.stream.abort(); } catch { /* ignore */ } }
    cHush(); face('thinking', true); cStatus(u('stThinking'));
    setTimeout(() => { if (call && call.turn === turn) caption('you', ''); }, 2500);
    if (engine() === 'offline') {
      const d = document.createElement('div'); d.innerHTML = offlineAnswer(text);
      face('thinking', false); cStatus('');
      const say = d.innerText.replace(u('offlineNote'), '');
      cSay(speakable(say)); emote(say); return;
    }
    history.push({ role: 'user', content: text });
    const holder = (call.holder = {});
    holder.onWait = (sec) => { if (call && call.turn === turn) cStatus(u('freeWait').replace('{s}', sec)); };
    let acc = '', spoken = 0, started = false;
    const pump = (final) => {
      for (;;) {
        const rest = acc.slice(spoken); if (!rest) return;
        const fence = rest.indexOf('```');
        if (fence === 0) { const close = rest.indexOf('```', 3); if (close < 0) return; cSay(u('seeCode')); spoken += close + 3; continue; }
        const m = rest.match(/[.!?](?=\s)|[。！？।\n]/); /* a period ends a sentence only before a space (not in train.py) */ let end = m ? m.index + 1 : -1;
        if (fence > 0 && (end < 0 || fence < end)) end = fence;
        if (end < 0) { if (final) { cSay(rest); spoken = acc.length; } return; }
        cSay(rest.slice(0, end)); spoken += end;
      }
    };
    try {
      const full = await askAI((d) => {
        if (!call || call.turn !== turn) return;
        if (!started) { started = true; face('thinking', false); cStatus(''); }
        acc += d; pump(false);
      }, true, holder);
      history.push({ role: 'assistant', content: full });
      if (call && call.turn === turn) { pump(true); emote(full); }
    } catch (e) {
      if (acc) history.push({ role: 'assistant', content: acc + ' …' }); else history.pop();
      if (!call || call.turn !== turn) return;                 // aborted by a newer question
      face('thinking', false); cStatus('');
      if (engine() === 'cloud' && !isFreeErr(e) && needsConnect(e)) { pendingQ = { text, call: true }; call.el.querySelector('.cb.connect').hidden = false; cStatus(FILE_MODE ? u('fileT') : u('needConnect')); return; }
      const A = engine() === 'claude' ? await sdk().catch(() => null) : null;
      const d = document.createElement('div'); d.innerHTML = apiErrorText(e, A); cSay(d.innerText);
    }
  }
  function drawCallBar() {
    if (!call) return;
    const m = call.el.querySelector('.cb.mic');
    m.classList.toggle('on', cfg.ptt ? call.ptt : !call.muted); m.textContent = call.muted ? '🔇' : '🎙️';
    cStatus(call.muted ? u('callMuted') : cfg.ptt && call.ptt ? u('stListening') : '');
  }
  async function toggleCam() {
    const v = call.el.querySelector('.selfview'), b = call.el.querySelector('.cb.cam');
    if (call.stream) { call.stream.getTracks().forEach((tr) => tr.stop()); call.stream = null; v.hidden = true; b.classList.remove('on'); return; }
    try {
      call.stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false });
      v.srcObject = call.stream; v.hidden = false; b.classList.add('on'); toast(u('callCam'));
    } catch { toast(u('micDenied')); }
  }
  function openCall() {
    if (call) return;
    if (panel && !panel.hidden) { panel.hidden = true; fab.classList.remove('open'); }
    stopSpeaking();
    const el = h(`<div class="call">
      <div class="call-top"><span class="call-live">● LIVE</span><b>${esc(teacherName())}</b><span class="call-mode">${engine() === 'wang' ? u('brainWang') : engine() === 'claude' ? u('tutorOnline') : engine() === 'local' ? '🧠 ' + u('modeLocal') : u('tutorOffline')}</span></div>
      <div class="call-stage">
        <div class="call-avatar"><div class="call-face">${avatarSVG(cfg.look)}</div><div class="call-bc"></div></div>
        <div class="call-status"></div>
        <div class="call-caption bot"></div><div class="call-caption you"></div>
        <video class="selfview" autoplay muted playsinline hidden></video>
      </div>
      <div class="call-hint">${cfg.ptt ? u('pttHint') : u('callHint')}${SpeechRec ? '' : ' — ' + u('noMic')}</div>
      <div class="call-bar">
        <button class="cb mic on" title="Microphone">🎙️</button>
        <button class="cb cam" title="Camera">📷</button>
        <select class="cl">${VOICES.map(([id, n]) => `<option value="${id}" ${id === cfg.voice ? 'selected' : ''}>${n}</option>`).join('')}</select>
        <button class="cb connect" title="${FILE_MODE ? u('fileBtn') : 'Connect'}" hidden>${FILE_MODE ? '🌐' : '⚡'}</button>
        <button class="cb end" title="End">📞</button>
      </div></div>`);
    document.body.appendChild(el);
    call = { el, muted: false, speaking: false, queue: [], cur: '', rec: null, stream: null, turn: 0, lastBC: 0, holder: null, lang: recLang(), pending: '', uttStart: 0, askTimer: null, ptt: false, pttUp: 0 };
    const micBtn = el.querySelector('.cb.mic');
    micBtn.onclick = () => { if (cfg.ptt) return; call.muted = !call.muted; if (call.muted && call.rec) { const r = call.rec; call.rec = null; r.abort(); } else cListen(); drawCallBar(); };
    const pttSet = (on) => { if (!call || !cfg.ptt) return; call.ptt = on; if (!on) { call.pttUp = Date.now(); if (call.pending) scheduleAsk(); } drawCallBar(); };
    micBtn.onpointerdown = () => pttSet(true);
    micBtn.onpointerup = micBtn.onpointerleave = micBtn.onpointercancel = () => { if (call && call.ptt) pttSet(false); };
    document.addEventListener('keydown', pttKey); document.addEventListener('keyup', pttKey);
    el.querySelector('.cb.cam').onclick = toggleCam;
    el.querySelector('.cb.end').onclick = endCall;
    el.querySelector('.cl').onchange = (e) => { cfg.voice = e.target.value; store.set('ai-voice', cfg.voice); call.lang = recLang(); if (call.rec) { const r = call.rec; call.rec = null; r.abort(); } cListen(); };
    document.addEventListener('keydown', escCall);
    el.querySelector('.cb.connect').onclick = (ev) => connectPuter(ev.currentTarget);
    cSay(u('callGreet').replace('{name}', teacherName()));
    gateStart().then(() => { if (call) cListen(); });
    if (engine() === 'cloud') loadPuter().then(() => { if (call && !isSignedIn()) { call.el.querySelector('.cb.connect').hidden = false; cStatus(u('needConnect')); } }).catch(() => { if (call && FILE_MODE) { call.el.querySelector('.cb.connect').hidden = false; cStatus(u('fileT')); } });
    else if (!FILE_MODE && (cfg.brain === 'auto' || cfg.voiceEngine === 'openai')) loadPuter().catch(() => {});
  }
  function escCall(e) { if (e.key === 'Escape') endCall(); }
  function endCall() {
    if (!call) return;
    const c = call; call = null;
    if (c.rec) { try { c.rec.abort(); } catch { /* ignore */ } }
    if (c.holder && c.holder.stream) { try { c.holder.stream.abort(); } catch { /* ignore */ } }
    if (synth) synth.cancel();
    if (c.stream) c.stream.getTracks().forEach((tr) => tr.stop());
    c.el.remove();
    clearTimeout(c.askTimer);
    document.removeEventListener('keydown', escCall);
    document.removeEventListener('keydown', pttKey); document.removeEventListener('keyup', pttKey);
    gateIdle();
  }
  MLS.openCall = openCall;
  MLS.setTutor = () => { if (!panel) build(); refresh(); };

  // ---------- Select any text on the page → "Ask Master Feng" ----------
  let selBtn = null;
  document.addEventListener('mouseup', (e) => {
    if (e.target.closest('.tutor, .call, .sel-ask, textarea, input')) return;
    setTimeout(() => {
      const sel = window.getSelection(), txt = sel ? sel.toString().trim() : '';
      if (selBtn) { selBtn.remove(); selBtn = null; }
      if (txt.length < 3 || txt.length > 1200 || !sel.rangeCount) return;
      const r = sel.getRangeAt(0).getBoundingClientRect();
      selBtn = h(`<button class="sel-ask">${avatarSVG(cfg.look)}<span>${u('askSel')} ${esc(teacherName())}</span></button>`);
      selBtn.style.top = `${window.scrollY + r.top - 46}px`; selBtn.style.left = `${window.scrollX + r.left + r.width / 2}px`;
      selBtn.onmousedown = (ev) => ev.preventDefault();
      selBtn.onclick = () => { const q = `${u('explainSel')}:\n"${txt}"`; selBtn.remove(); selBtn = null; openTutor(q); };
      document.body.appendChild(selBtn);
    }, 10);
  });
  MLS.hooks.beforeRender.push(() => { /* keep the call running across pages */ });

  MLS.hooks.beforeRender.push(() => setTimeout(refresh));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

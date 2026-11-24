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
    const speakingNow = (synth && synth.speaking) || (typeof call !== 'undefined' && call && call.speaking);
    if (speakingNow && now > mouthState.talkingUntil) mouthState.target = 0.15 + Math.abs(Math.sin(now / 85) * Math.sin(now / 47)) * 0.75;
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
  const SYSTEM = (voice, small) => `You are ${teacherName()}, a human-like AI teacher and personal assistant inside "ML Sikshya", a free learning website. Your personality — ${persona()}

What you can help with: ANY question the learner asks — every school and university subject (maths, physics, chemistry, biology, history, geography, economics, accounting, languages, literature), programming in any language, computers and technology, careers and job applications, study skills, writing and translation, general knowledge and everyday life. You are ALSO an expert machine-learning, data-science and AI teacher, which is the main topic of this website. Never refuse or redirect a normal question just because it is not about machine learning — answer it fully and helpfully, like a brilliant private tutor. If you are not sure about a fact, say so honestly instead of guessing. Do not help with anything harmful or dangerous.

Language: always reply in the same language as the learner's latest message — English, Nepali, Chinese, Hindi or any other language; romanized Nepali gets a reply in Nepali. If you can't tell, use ${MLS.extLang ? MLS.extLang.name : SITE_LANG[MLS.S.lang] || 'English'}. Keep standard technical terms in English when that is clearer.

How to teach:
- Answer the question directly first, then explain. Use an everyday analogy for hard ideas, then the exact concept, then how and where it is used.
- Code: complete, runnable examples in \`\`\`python blocks (or the language asked). On this site, Python runs in the browser with numpy, pandas, matplotlib, scikit-learn and scipy (no PyTorch/TensorFlow). Uploaded files are DATA["<name>"] or /data/<name>.
- For errors: what it means, why it happened, and the corrected code.
- When a lesson or real-world mission on this site fits, mention it by name.
- Be encouraging and human. ${small ? 'Keep answers focused (under about 250 words).' : 'Ask a short check-your-understanding question at the end when it helps.'}
${voice ? '- The learner is TALKING to you by voice and will HEAR your reply: answer like a person in a video call — short, natural spoken sentences (about 3–6), no tables or lists, minimal formatting, no code unless asked.' : '- Use short paragraphs, lists and headings where they help.'}

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
  const engine = () => (cfg.key ? 'claude' : cfg.local && hasGPU ? 'local' : 'offline');
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
  const askAI = (onText, voice, holder) => (engine() === 'claude' ? askClaude(onText, voice, holder) : askLocal(onText, voice, holder));

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
  function apiErrorText(e, A) {
    if (e.refusal) return t({ en: 'Claude declined to answer this request. Try asking in a different way.', ne: 'Claude ले यो अनुरोधको उत्तर दिन अस्वीकार गर्यो। अर्को तरिकाले सोध्नुहोस्।', zh: 'Claude 拒绝回答这个请求，请换一种方式提问。' });
    if (A && e instanceof A.AuthenticationError) return t({ en: '🔑 Your API key was not accepted. Check it in ⚙️ settings.', ne: '🔑 तपाईंको API key स्वीकार भएन। ⚙️ सेटिङमा जाँच्नुहोस्।', zh: '🔑 API 密钥无效，请在 ⚙️ 设置中检查。' });
    if (A && e instanceof A.PermissionDeniedError) return t({ en: '🔒 This key has no access to the selected model. Pick another model in ⚙️ settings.', ne: '🔒 यो key ले छानिएको मोडेल प्रयोग गर्न पाउँदैन। ⚙️ सेटिङमा अर्को मोडेल छान्नुहोस्।', zh: '🔒 该密钥无权使用所选模型，请在 ⚙️ 设置中换一个模型。' });
    if (A && e instanceof A.RateLimitError) return t({ en: '⏳ Too many requests right now. Wait a moment and try again.', ne: '⏳ अहिले धेरै अनुरोध भए। केही बेर पर्खेर फेरि प्रयास गर्नुहोस्।', zh: '⏳ 请求太多，请稍等再试。' });
    if (A && e instanceof A.APIConnectionError) return t({ en: '📡 Could not reach Claude. Check your internet connection.', ne: '📡 Claude सम्म पुग्न सकिएन। इन्टरनेट जाँच्नुहोस्।', zh: '📡 无法连接 Claude，请检查网络。' });
    if (A && e instanceof A.APIError) return `⚠️ ${e.status || ''} ${esc(e.message)}`;
    return `⚠️ ${esc(e.message || String(e))}`;
  }

  // ---------- Offline helper ----------
  function offlineAnswer(q) {
    const ql = q.toLowerCase();
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
  const speakable = (md) => md.replace(/```[\s\S]*?(```|$)/g, ' ' + u('seeCode') + ' ').replace(/<[^>]+>/g, ' ').replace(/[*#`_>|]/g, '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim().slice(0, 2400);
  // Speak like a person: sentence by sentence, small natural pauses, slight changes in pace and pitch, lips moving on every word.
  function humanUtterance(text, lang, voice) {
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = voice ? voice.lang : lang; if (voice) ut.voice = voice;
    const baseRate = (lang.startsWith('zh') ? 0.95 : 0.98) * (cfg.rate || 1);
    ut.rate = baseRate * (0.96 + Math.random() * 0.08);
    ut.pitch = (cfg.pitch || 1) * (/\?\s*$/.test(text) ? 1.06 : 0.98 + Math.random() * 0.06);
    ut.onboundary = (e) => { if (!e.name || e.name === 'word') lipPulse(1); };
    return ut;
  }
  let speakQueue = 0;
  function speak(text, onDone) {
    if (!synth || !cfg.speak || !text) { onDone && onDone(); return; }
    synth.cancel();
    const lang = detectLang(text), voice = pickVoice(lang);
    const chunks = (text.match(/[^.!?।。！？\n]+[.!?।。！？]?/g) || [text]).map((c) => c.trim()).filter(Boolean);
    const id = ++speakQueue;
    setState('speaking');
    const next = (i) => {
      if (id !== speakQueue) return;
      if (i >= chunks.length) { setState('idle'); onDone && onDone(); return; }
      const ut = humanUtterance(chunks[i], lang, voice);
      ut.onend = ut.onerror = () => setTimeout(() => next(i + 1), /[.!?।。！？]$/.test(chunks[i]) ? 180 + Math.random() * 220 : 90);
      synth.speak(ut);
    };
    next(0);
  }
  function stopSpeaking() { if (synth) synth.cancel(); speakQueue++; setState('idle'); }

  // ---------- Voice: speech recognition (listen) ----------
  let rec = null, listening = false, convo = false;
  const recLang = () => (cfg.voice !== 'auto' ? cfg.voice : MLS.extLang ? MLS.extLang.speech : { en: 'en-US', ne: 'ne-NP', zh: 'zh-CN' }[MLS.S.lang] || 'en-US');
  function listen() {
    if (!SpeechRec) { toast(u('noMic')); return; }
    if (listening) { rec && rec.stop(); return; }
    stopSpeaking();
    rec = new SpeechRec();
    rec.lang = recLang(); rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
    const ta = panel.querySelector('textarea');
    let finalText = '';
    rec.onstart = () => { listening = true; setState('listening'); };
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) finalText += r[0].transcript; else interim += r[0].transcript; }
      ta.value = (finalText + interim).trim();
    };
    rec.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { toast(u('micDenied')); convo = false; drawConvo(); } };
    rec.onend = () => { listening = false; setState('idle'); if (finalText.trim()) send(finalText.trim(), true); else if (convo) convo = false, drawConvo(); };
    try { rec.start(); } catch { /* already started */ }
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
    panel.querySelector('.new').onclick = () => { stopSpeaking(); history = []; drawMsgs(); };
    panel.querySelector('.spk').onclick = () => { cfg.speak = !cfg.speak; store.set('ai-speak', cfg.speak); if (!cfg.speak) stopSpeaking(); refresh(); };
    panel.querySelector('.mic').onclick = listen;
    panel.querySelector('.callbtn').onclick = openCall;
    panel.querySelector('.convo').onclick = () => { convo = !convo; drawConvo(); if (convo) { toast(u('talkOn')); listen(); } else if (listening) rec.stop(); };
    const ta = panel.querySelector('textarea');
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
    panel.querySelector('.mode').innerHTML = engine() === 'claude' ? `<i class="dot on"></i>${u('tutorOnline')}` : engine() === 'local' ? `<i class="dot on"></i>🧠 ${u('modeLocal')}` : `<i class="dot"></i>${u('tutorOffline')}`;
    if (!panel.querySelector('.tutor-state').textContent) panel.querySelector('.tutor-state').textContent = u('stReady');
    panel.querySelector('.spk').textContent = cfg.speak ? '🔊' : '🔇';
    panel.querySelector('textarea').placeholder = u('tutorPh');
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
      <label class="small">${u('voicePick')} <select class="vname"><option value="">${u('voiceAuto')}</option>${(synth ? synth.getVoices() : []).filter((v) => !cfg.voice || cfg.voice === 'auto' || v.lang.startsWith(cfg.voice.split('-')[0])).map((v) => `<option ${v.name === cfg.voiceName ? 'selected' : ''}>${esc(v.name)}</option>`).join('')}</select></label>
      <div class="row small"><label>${u('voiceSpeed')} <input type="range" class="vrate" min="0.8" max="1.25" step="0.01" value="${cfg.rate || 1}"></label><label>${u('voicePitch')} <input type="range" class="vpitch" min="0.8" max="1.25" step="0.01" value="${cfg.pitch || 1}"></label><button class="btn ghost sm vtest">▶ ${u('voiceTest')}</button></div>
      <label class="small">${u('tutorVoice')} <select class="voice">${VOICES.map(([id, n]) => `<option value="${id}" ${id === cfg.voice ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="small chk"><input type="checkbox" class="speak" ${cfg.speak ? 'checked' : ''}> ${u('tutorSpeak')}</label>
      <p class="small muted">${u('voiceNote')}</p>
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
    const avSet = (k, v) => { cfg.av = { ...cfg.av, [k]: v }; store.set('ai-avatar', cfg.av); refresh(); drawSettings(); };
    s.querySelectorAll('.sw').forEach((b) => (b.onclick = () => avSet(b.dataset.k, b.dataset.v)));
    s.querySelectorAll('.stl').forEach((b) => (b.onclick = () => avSet('style', b.dataset.v)));
    s.querySelector('.glasses').onchange = (e) => avSet('glasses', e.target.checked);
    s.querySelector('.vtest').onclick = () => { cfg.voiceName = s.querySelector('.vname').value; cfg.rate = +s.querySelector('.vrate').value; cfg.pitch = +s.querySelector('.vpitch').value; setState('speaking'); speak(u('voiceSample')); };
    s.querySelector('.save').onclick = () => {
      cfg.key = s.querySelector('.key').value.trim(); cfg.model = s.querySelector('.model').value;
      cfg.voice = s.querySelector('.voice').value; cfg.speak = s.querySelector('.speak').checked; cfg.voiceName = s.querySelector('.vname').value; cfg.rate = +s.querySelector('.vrate').value; cfg.pitch = +s.querySelector('.vpitch').value;
      if (hasGPU) { cfg.local = s.querySelector('.local').checked; cfg.localModel = s.querySelector('.lmodel').value; }
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
    if (engine() === 'claude' || (engine() === 'local' && localEngine && !localLoading)) return null;
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
    const ta = panel.querySelector('textarea'); ta.value = '';
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
    busy = true; setSendBtn(true); setState('thinking');
    history.push({ role: 'user', content: text });
    const holder = (curHolder = {});
    let acc = '', A = null, last = 0;
    try {
      if (engine() === 'claude') A = await sdk();
      const full = await askAI((d) => {
        acc += d;
        const now = Date.now(); if (now - last > 80) { last = now; out.innerHTML = liveFmt(acc); box.scrollTop = box.scrollHeight; }
      }, viaVoice || convo, holder);
      history.push({ role: 'assistant', content: full });
      render(full, out);
      speak(speakable(full), after);
    } catch (e) {
      const aborted = /abort/i.test(String(e && (e.name + e.message)));
      if (aborted && acc) { history.push({ role: 'assistant', content: acc }); render(acc, out); }
      else {
        console.error(e); history.pop();
        out.innerHTML = `<p>${apiErrorText(e, A)}</p>` + offlineAnswer(text);
        setState('idle');
      }
    }
    busy = false; setSendBtn(false); if (!synth || !synth.speaking) setState('idle');
    box.scrollTop = box.scrollHeight;
  }
  function openTutor(prefill) {
    if (!panel) build();
    panel.hidden = false; fab.classList.add('open'); refresh();
    if (prefill) send(prefill); else panel.querySelector('textarea').focus();
  }
  function close() { panel.hidden = true; fab.classList.remove('open'); stopSpeaking(); convo = false; drawConvo(); if (listening && rec) rec.stop(); }
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
  const cleanSpeech = (s) => s.replace(/[*#`_>|]/g, '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
  function face(cls, on) { if (call) call.el.querySelector('.call-avatar').classList.toggle(cls, on); }
  function caption(who, txt) { if (call) call.el.querySelector('.call-caption.' + who).textContent = txt; }
  function cStatus(txt) { if (call) call.el.querySelector('.call-status').textContent = txt; }
  function cSay(text) { text = cleanSpeech(text); if (!call || !text) return; call.queue.push(text); if (!call.speaking) cNext(); }
  function cNext() {
    if (!call) return;
    const s = call.queue.shift();
    if (!s) { call.speaking = false; call.cur = ''; face('talking', false); setTimeout(() => { if (call && !call.speaking) caption('bot', ''); }, 1800); return; }
    call.speaking = true; call.cur = s; face('talking', true); caption('bot', s);
    if (!synth || !cfg.speak) { setTimeout(() => { if (call && call.cur === s) cNext(); }, 55 * s.length + 400); return; }
    const lang = detectLang(s), v = pickVoice(lang);
    const ut = humanUtterance(s, lang, v);
    ut.onend = ut.onerror = () => { if (call && call.cur === s) setTimeout(() => { if (call && call.cur === s) cNext(); }, /[.!?。！？।]$/.test(s) ? 160 + Math.random() * 200 : 80); };
    synth.speak(ut);
  }
  function cHush() { if (!call) return; call.queue = []; call.cur = ''; if (synth) synth.cancel(); call.speaking = false; face('talking', false); }
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
  function isEcho(heard) {
    const a = normTxt(heard), b = normTxt(call.cur + ' ' + call.queue.join(' '));
    return a.length > 0 && a.length < 60 && b.includes(a.slice(0, Math.min(a.length, 14)));
  }
  function cListen() {
    if (!call || call.muted || !SpeechRec) return;
    const r = new SpeechRec(); call.rec = r;
    r.lang = call.lang; r.continuous = true; r.interimResults = true;
    r.onresult = (e) => {
      let interim = '', fin = '';
      for (let i = e.resultIndex; i < e.results.length; i++) { const x = e.results[i]; if (x.isFinal) fin += x[0].transcript; else interim += x[0].transcript; }
      const heard = (fin || interim).trim(); if (!heard) return;
      if (call.speaking && isEcho(heard)) return;              // ignore the teacher's own voice from the speakers
      if (call.speaking && heard.length >= 5) { cHush(); cStatus(u('callInterrupt')); }   // barge-in
      caption('you', heard); backchannel();
      if (fin.trim()) cAsk(fin.trim());
    };
    r.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { toast(u('micDenied')); call.muted = true; drawCallBar(); } };
    r.onend = () => { if (call && !call.muted && call.rec === r) setTimeout(cListen, 250); };
    try { r.start(); } catch { /* already running */ }
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
    let acc = '', spoken = 0, started = false;
    const pump = (final) => {
      for (;;) {
        const rest = acc.slice(spoken); if (!rest) return;
        const fence = rest.indexOf('```');
        if (fence === 0) { const close = rest.indexOf('```', 3); if (close < 0) return; cSay(u('seeCode')); spoken += close + 3; continue; }
        const m = rest.match(/[.!?。！？।\n]/); let end = m ? m.index + 1 : -1;
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
      const A = await sdk().catch(() => null);
      const d = document.createElement('div'); d.innerHTML = apiErrorText(e, A); cSay(d.innerText);
    }
  }
  function drawCallBar() {
    if (!call) return;
    const m = call.el.querySelector('.cb.mic');
    m.classList.toggle('on', !call.muted); m.textContent = call.muted ? '🔇' : '🎙️';
    cStatus(call.muted ? u('callMuted') : '');
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
      <div class="call-top"><span class="call-live">● LIVE</span><b>${esc(teacherName())}</b><span class="call-mode">${engine() === 'claude' ? u('tutorOnline') : engine() === 'local' ? '🧠 ' + u('modeLocal') : u('tutorOffline')}</span></div>
      <div class="call-stage">
        <div class="call-avatar"><div class="call-face">${avatarSVG(cfg.look)}</div><div class="call-bc"></div></div>
        <div class="call-status"></div>
        <div class="call-caption bot"></div><div class="call-caption you"></div>
        <video class="selfview" autoplay muted playsinline hidden></video>
      </div>
      <div class="call-hint">${u('callHint')}${SpeechRec ? '' : ' — ' + u('noMic')}</div>
      <div class="call-bar">
        <button class="cb mic on" title="Microphone">🎙️</button>
        <button class="cb cam" title="Camera">📷</button>
        <select class="cl">${VOICES.map(([id, n]) => `<option value="${id}" ${id === cfg.voice ? 'selected' : ''}>${n}</option>`).join('')}</select>
        <button class="cb end" title="End">📞</button>
      </div></div>`);
    document.body.appendChild(el);
    call = { el, muted: false, speaking: false, queue: [], cur: '', rec: null, stream: null, turn: 0, lastBC: 0, holder: null, lang: recLang() };
    el.querySelector('.cb.mic').onclick = () => { call.muted = !call.muted; if (call.muted && call.rec) { const r = call.rec; call.rec = null; r.abort(); } else cListen(); drawCallBar(); };
    el.querySelector('.cb.cam').onclick = toggleCam;
    el.querySelector('.cb.end').onclick = endCall;
    el.querySelector('.cl').onchange = (e) => { cfg.voice = e.target.value; store.set('ai-voice', cfg.voice); call.lang = recLang(); if (call.rec) { const r = call.rec; call.rec = null; r.abort(); } cListen(); };
    document.addEventListener('keydown', escCall);
    cSay(u('callGreet').replace('{name}', teacherName()));
    cListen();
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
    document.removeEventListener('keydown', escCall);
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

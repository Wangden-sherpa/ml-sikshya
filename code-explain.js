/* ML Sikshya — "Explain this code" for every Python code box.
   Under each code box, a learner can open a plain-language, line-by-line explanation (English / नेपाली / 中文),
   a short "what this code does" summary, a 30-second guide to reading Python, and a button to ask the AI teacher.
   It works offline and instantly: the explanations come from a built-in dictionary of Python, NumPy, Pandas,
   Matplotlib and scikit-learn, and they update when the learner edits the code. */
(() => {
  const MLS = window.MLS;
  const { t, h, esc } = MLS;
  const T = (en, ne, zh) => ({ en, ne, zh });
  const A = (a) => T(a[0], a[1], a[2]);

  const UI = {
    open: T('🧒 Explain this code line by line', '🧒 यो कोड लाइन-लाइन बुझाउनुहोस्', '🧒 逐行解释这段代码'),
    close: T('Hide the explanation', 'व्याख्या लुकाउनुहोस्', '隐藏解释'),
    ask: T('🤖 Ask my teacher to explain it', '🤖 शिक्षकलाई बुझाउन भन्नुहोस्', '🤖 请老师讲解'),
    short: T('In short, this code:', 'छोटकरीमा, यो कोडले:', '简单来说，这段代码：'),
    lines: T('Line by line', 'लाइन-लाइन', '逐行解释'),
    read: T('📖 New to Python? How to read code in 30 seconds', '📖 Python नयाँ हो? ३० सेकेन्डमा कोड पढ्ने तरिका', '📖 刚学 Python？30 秒学会读代码'),
    note: T('Note from the code', 'कोडमा लेखिएको टिप्पणी', '代码里的注释'),
    task: T('Your task', 'तपाईंको काम', '你的任务'),
    uses: T('Uses', 'प्रयोग', '用到'),
    inside: T('↳ part of the block above', '↳ माथिको ब्लकभित्रको भाग', '↳ 属于上面的代码块'),
    tip: T('💡 Tip: change one number, press ▶ Run, and see what changes. Edits update this explanation.', '💡 सुझाव: एउटा अंक बदल्नुहोस्, ▶ Run थिच्नुहोस्, र के बदलियो हेर्नुहोस्। कोड बदल्दा यो व्याख्या पनि बदलिन्छ।', '💡 提示：改一个数字，点 ▶ 运行，看看有什么变化。修改代码后这里的解释也会更新。'),
    empty: T('There is no code to explain yet.', 'बुझाउने कोड अहिले छैन।', '还没有可以解释的代码。'),
  };
  const ui = (k) => t(UI[k]);

  // ---------- 30-second guide to reading Python ----------
  const READ = [
    ['# text', T('A comment: a note for humans. Python ignores it.', 'टिप्पणी: मानिसका लागि लेखिएको नोट। Python ले यसलाई बेवास्ता गर्छ।', '注释：写给人看的说明，Python 会忽略它。')],
    ['x = 5', T('Store a value in a named box called x (a variable). "=" means "put into", not "equals".', 'x नामको बाकस (variable) मा मान राख्नुहोस्। "=" को अर्थ "भित्र राख्नु" हो, "बराबर" होइन।', '把一个值放进名叫 x 的盒子（变量）。"=" 的意思是“放进去”，不是“等于”。')],
    ['print(x)', T('Show something on the screen (in the Output box).', 'स्क्रिनमा (Output बाकसमा) केही देखाउनुहोस्।', '在屏幕上（输出框里）显示内容。')],
    ['name(...)', T('Run a function: a ready-made action. The values inside ( ) are what you give it.', 'Function चलाउनुहोस्: तयार गरिएको काम। ( ) भित्रका मान तपाईंले दिने कुरा हुन्।', '运行一个函数：一个现成的动作。( ) 里面是你交给它的东西。')],
    ['model.fit(...)', T('A dot means "belongs to": the model\'s own fit action, like "Ram.eat()".', 'थोप्लो (.) को अर्थ "को" हो: model को आफ्नै fit काम, जस्तै "राम.खानु()"।', '点 (.) 表示“的”：model 自己的 fit 动作，就像“小明.吃饭()”。')],
    ['[1, 2, 3]', T('A list: several values in order. x[0] is the FIRST item — Python counts from 0.', 'सूची (list): क्रमैसँग धेरै मान। x[0] पहिलो वस्तु हो — Python ले ० बाट गन्छ।', '列表：按顺序排列的多个值。x[0] 是第一个——Python 从 0 开始数。')],
    ['{"a": 1}', T('A dictionary: look up a value by its name (key), like a word in a dictionary.', 'Dictionary: नाम (key) बाट मान खोज्ने, शब्दकोशमा शब्द खोजे जस्तै।', '字典：按名字（键）查找值，就像查字典。')],
    ['"hello"', T('Text (a string) is written inside quotes.', 'अक्षर (string) उद्धरण चिन्हभित्र लेखिन्छ।', '文字（字符串）写在引号里。')],
    ['for ...:', T('A line ending in ":" starts a block. The indented (pushed-right) lines below belong to it.', '":" मा अन्त्य हुने लाइनले ब्लक सुरु गर्छ। तलका भित्र धकेलिएका (indent) लाइन त्यसैका हुन्।', '以 ":" 结尾的行开始一个代码块，下面缩进（往右推）的行都属于它。')],
    ['import numpy as np', T('Load a toolbox (library) and give it a short nickname.', 'औजारको बाकस (library) ल्याउनुहोस् र छोटो उपनाम दिनुहोस्।', '载入一个工具箱（库），并给它起个简短的别名。')],
  ];

  // ---------- Libraries ----------
  const LIBS = {
    numpy: ['NumPy — fast maths on lists and tables of numbers (arrays)', 'NumPy — अंकका सूची र तालिका (array) मा छिटो गणित', 'NumPy——对数字列表和表格（数组）进行快速计算'],
    pandas: ['Pandas — work with tables of data, like Excel inside Python', 'Pandas — डाटाका तालिकासँग काम, Python भित्रको Excel जस्तै', 'Pandas——处理数据表格，就像 Python 里的 Excel'],
    matplotlib: ['Matplotlib — draw charts and graphs', 'Matplotlib — चार्ट र ग्राफ बनाउने', 'Matplotlib——画图表'],
    sklearn: ['scikit-learn — ready-made machine-learning models and tools', 'scikit-learn — तयार मेसिन लर्निङ मोडेल र औजार', 'scikit-learn——现成的机器学习模型和工具'],
    math: ['math — basic maths functions (square root, log, π…)', 'math — आधारभूत गणित (वर्गमूल, log, π…)', 'math——基础数学函数（平方根、对数、π……）'],
    random: ['random — random numbers', 'random — अनियमित (random) अंक', 'random——随机数'],
    torch: ['PyTorch — a deep-learning library for neural networks', 'PyTorch — न्युरल नेटवर्कका लागि डिप लर्निङ library', 'PyTorch——用于神经网络的深度学习库'],
    tensorflow: ['TensorFlow — a deep-learning library for neural networks', 'TensorFlow — न्युरल नेटवर्कका लागि डिप लर्निङ library', 'TensorFlow——用于神经网络的深度学习库'],
    joblib: ['joblib — save a trained model to a file and load it later', 'joblib — तालिम गरेको मोडेल फाइलमा सेभ गर्ने र पछि खोल्ने', 'joblib——把训练好的模型存成文件，之后再载入'],
    seaborn: ['Seaborn — prettier statistical charts', 'Seaborn — राम्रा तथ्याङ्कीय चार्ट', 'Seaborn——更漂亮的统计图表'],
    scipy: ['SciPy — extra science and statistics maths', 'SciPy — थप विज्ञान र तथ्याङ्क गणित', 'SciPy——更多科学和统计计算'],
    pyodide: ['pyodide — lets Python in the browser download files from the internet', 'pyodide — ब्राउजरको Python लाई इन्टरनेटबाट फाइल ल्याउन दिन्छ', 'pyodide——让浏览器里的 Python 从网上下载文件'],
    collections: ['collections — handy containers such as Counter (counts things)', 'collections — Counter (गन्ने) जस्ता काम लाग्ने भाँडा', 'collections——方便的容器，比如 Counter（计数）'],
    time: ['time — measure time', 'time — समय नाप्ने', 'time——计时'],
    json: ['json — read and write data in JSON text format', 'json — JSON ढाँचामा डाटा पढ्ने/लेख्ने', 'json——读写 JSON 格式的数据'],
    re: ['re — find patterns in text', 're — अक्षरमा ढाँचा खोज्ने', 're——在文字中查找模式'],
    statistics: ['statistics — mean, median and other statistics', 'statistics — औसत, median र अन्य तथ्याङ्क', 'statistics——平均数、中位数等统计'],
    warnings: ['warnings — control warning messages', 'warnings — चेतावनी सन्देश नियन्त्रण', 'warnings——控制警告信息'],
    itertools: ['itertools — tools for looping over combinations', 'itertools — संयोजनहरूमा लुप गर्ने औजार', 'itertools——遍历组合的工具'],
  };

  // ---------- Functions, methods and attributes (what they DO, in plain words) ----------
  const FN = {
    print: ['shows values on the screen', 'स्क्रिनमा मान देखाउँछ', '在屏幕上显示值'],
    round: ['rounds a number, e.g. round(3.14159, 2) → 3.14', 'अंकलाई राउन्ड गर्छ, जस्तै round(3.14159, 2) → 3.14', '四舍五入，例如 round(3.14159, 2) → 3.14'],
    len: ['counts how many items there are', 'कति वटा वस्तु छन् गन्छ', '数一共有多少个'],
    range: ['makes counting numbers: range(5) → 0, 1, 2, 3, 4', 'गन्ती बनाउँछ: range(5) → 0, 1, 2, 3, 4', '生成计数：range(5) → 0, 1, 2, 3, 4'],
    sum: ['adds everything up', 'सबै जोड्छ', '把所有加起来'],
    max: ['finds the biggest value', 'सबैभन्दा ठूलो मान खोज्छ', '找出最大值'],
    min: ['finds the smallest value', 'सबैभन्दा सानो मान खोज्छ', '找出最小值'],
    abs: ['removes the minus sign (distance from zero)', 'माइनस चिन्ह हटाउँछ (शून्यबाट दूरी)', '去掉负号（到零的距离）'],
    int: ['turns a value into a whole number', 'मानलाई पूर्णाङ्कमा बदल्छ', '把值变成整数'],
    float: ['turns a value into a decimal number', 'मानलाई दशमलव अंकमा बदल्छ', '把值变成小数'],
    str: ['turns a value into text', 'मानलाई अक्षर (text) मा बदल्छ', '把值变成文字'],
    list: ['makes a list', 'सूची (list) बनाउँछ', '生成一个列表'],
    dict: ['makes a dictionary (name → value pairs)', 'dictionary (नाम → मान) बनाउँछ', '生成一个字典（名字 → 值）'],
    zip: ['pairs up items from two lists, side by side', 'दुई सूचीका वस्तुलाई छेउछेउ जोडी बनाउँछ', '把两个列表的元素一一配对'],
    enumerate: ['gives each item together with its position number (0, 1, 2…)', 'हरेक वस्तुलाई उसको स्थान नम्बर (0, 1, 2…) सँगै दिन्छ', '给出每个元素及其位置编号（0, 1, 2……）'],
    sorted: ['returns the items sorted from small to big', 'वस्तुलाई सानोदेखि ठूलो क्रममा मिलाउँछ', '把元素从小到大排序'],
    sort: ['sorts the items from small to big', 'सानोदेखि ठूलो क्रममा मिलाउँछ', '从小到大排序'],
    append: ['adds one item to the end of a list', 'सूचीको अन्त्यमा एउटा वस्तु थप्छ', '在列表末尾加一个元素'],
    items: ['gives every (name, value) pair of a dictionary', 'dictionary का सबै (नाम, मान) जोडी दिन्छ', '给出字典里所有的（名字，值）对'],
    keys: ['gives all the names (keys) of a dictionary', 'dictionary का सबै नाम (key) दिन्छ', '给出字典所有的名字（键）'],
    get: ['looks up a value by name (with a fallback if missing)', 'नामबाट मान खोज्छ (नभए वैकल्पिक मान)', '按名字查找值（找不到时用默认值）'],
    split: ['cuts text into pieces', 'अक्षरलाई टुक्रामा काट्छ', '把文字切成几段'],
    join: ['glues pieces of text together', 'अक्षरका टुक्रा जोड्छ', '把几段文字拼起来'],
    lower: ['makes text lowercase', 'अक्षरलाई सानो (lowercase) बनाउँछ', '把文字变成小写'],
    upper: ['makes text UPPERCASE', 'अक्षरलाई ठूलो (UPPERCASE) बनाउँछ', '把文字变成大写'],
    format: ['fills values into a text template', 'अक्षरको ढाँचामा मान भर्छ', '把值填进文字模板'],
    isinstance: ['checks what type a value is', 'मान कुन प्रकारको हो जाँच्छ', '检查值是什么类型'],
    type: ['tells what type a value is', 'मान कुन प्रकारको हो बताउँछ', '告诉你值是什么类型'],
    input: ['asks the user to type something', 'प्रयोगकर्तालाई केही टाइप गर्न भन्छ', '让用户输入内容'],
    // NumPy
    array: ['makes a NumPy array: a fast list/table of numbers', 'NumPy array बनाउँछ: अंकको छिटो सूची/तालिका', '生成 NumPy 数组：快速的数字列表/表格'],
    zeros: ['makes an array filled with 0s', '0 ले भरिएको array बनाउँछ', '生成全是 0 的数组'],
    ones: ['makes an array filled with 1s', '1 ले भरिएको array बनाउँछ', '生成全是 1 的数组'],
    full: ['makes an array filled with one value', 'एउटै मानले भरिएको array बनाउँछ', '生成填满同一个值的数组'],
    eye: ['makes an identity matrix (1s on the diagonal)', 'identity matrix बनाउँछ (विकर्णमा 1)', '生成单位矩阵（对角线是 1）'],
    arange: ['makes evenly spaced numbers with a step: arange(0, 10, 2) → 0 2 4 6 8', 'बराबर फरकका अंक बनाउँछ: arange(0, 10, 2) → 0 2 4 6 8', '按步长生成数字：arange(0, 10, 2) → 0 2 4 6 8'],
    linspace: ['makes N evenly spaced numbers between a start and an end', 'सुरु र अन्त्यबीच N वटा बराबर दूरीका अंक बनाउँछ', '在起点和终点之间生成 N 个等间距的数'],
    reshape: ['changes the shape (rows × columns) without changing the numbers', 'अंक नबदली आकार (row × column) बदल्छ', '改变形状（行 × 列），数字不变'],
    ravel: ['flattens a table into one long list', 'तालिकालाई एउटै लामो सूचीमा बदल्छ', '把表格拉平成一个长列表'],
    flatten: ['flattens a table into one long list', 'तालिकालाई एउटै लामो सूचीमा बदल्छ', '把表格拉平成一个长列表'],
    mean: ['calculates the average', 'औसत निकाल्छ', '计算平均值'],
    median: ['finds the middle value', 'बीचको मान (median) खोज्छ', '找中位数'],
    std: ['calculates the standard deviation: how spread out the numbers are', 'standard deviation निकाल्छ: अंक कति छरिएका छन्', '计算标准差：数字有多分散'],
    var: ['calculates the variance: how spread out the numbers are', 'variance निकाल्छ: अंक कति छरिएका छन्', '计算方差：数字有多分散'],
    argmax: ['gives the POSITION of the biggest value', 'सबैभन्दा ठूलो मानको स्थान दिन्छ', '给出最大值的位置'],
    argmin: ['gives the POSITION of the smallest value', 'सबैभन्दा सानो मानको स्थान दिन्छ', '给出最小值的位置'],
    argsort: ['gives the positions that would sort the values', 'मानलाई क्रममा मिलाउने स्थानहरू दिन्छ', '给出排序后的位置顺序'],
    where: ['chooses between two values depending on a condition (if/else for whole arrays)', 'सर्तअनुसार दुई मानमध्ये एउटा छान्छ (पूरै array का लागि if/else)', '按条件在两个值中选一个（整个数组的 if/else）'],
    clip: ['keeps values inside a min–max range', 'मानलाई न्यूनतम–अधिकतम सीमाभित्र राख्छ', '把值限制在最小–最大范围内'],
    exp: ['e to the power of x (grows very fast)', 'e को x घात (धेरै छिटो बढ्छ)', 'e 的 x 次方（增长很快）'],
    log: ['the logarithm (the opposite of exp)', 'logarithm (exp को उल्टो)', '对数（exp 的反运算）'],
    sqrt: ['the square root', 'वर्गमूल', '平方根'],
    sin: ['the sine wave function', 'sine तरंग function', '正弦函数'],
    cos: ['the cosine wave function', 'cosine तरंग function', '余弦函数'],
    tanh: ['squashes any number into −1 … 1 (an activation function)', 'जुनसुकै अंकलाई −1 … 1 भित्र खुम्च्याउँछ (activation function)', '把任何数压缩到 −1 … 1（激活函数）'],
    dot: ['multiplies and adds (dot product / matrix multiplication)', 'गुणा गरेर जोड्छ (dot product / matrix गुणन)', '相乘再相加（点积/矩阵乘法）'],
    cumsum: ['running total: 1, 2, 3 → 1, 3, 6', 'क्रमिक जोड: 1, 2, 3 → 1, 3, 6', '累计和：1, 2, 3 → 1, 3, 6'],
    corrcoef: ['measures how strongly two things move together (−1 … 1)', 'दुई कुरा कति सँगै चल्छन् नाप्छ (−1 … 1)', '衡量两个量一起变化的程度（−1 … 1）'],
    meshgrid: ['makes a grid of (x, y) points, used to colour a whole map', '(x, y) बिन्दुको जालो बनाउँछ, पूरा नक्सा रङ्ग्याउन', '生成 (x, y) 点的网格，用来给整张图上色'],
    vstack: ['stacks arrays on top of each other', 'array लाई एकमाथि अर्को राख्छ', '把数组上下叠起来'],
    hstack: ['puts arrays side by side', 'array लाई छेउछेउ राख्छ', '把数组左右拼起来'],
    column_stack: ['puts lists side by side as columns', 'सूचीलाई column को रूपमा छेउछेउ राख्छ', '把列表作为列并排放'],
    concatenate: ['joins arrays together', 'array हरू जोड्छ', '把数组连接起来'],
    unique: ['lists the different values (no repeats)', 'फरक-फरक मानको सूची (दोहोरो बिना)', '列出不同的值（不重复）'],
    convolve: ['slides a small filter along the data (convolution)', 'डाटामाथि सानो फिल्टर सार्छ (convolution)', '让一个小滤镜沿着数据滑动（卷积）'],
    norm: ['measures the length (size) of a vector', 'vector को लम्बाइ (साइज) नाप्छ', '计算向量的长度'],
    default_rng: ['creates a random-number generator (the seed number makes it repeat the same "random" numbers every run)', 'random अंक बनाउने यन्त्र बनाउँछ (seed अंकले हरेक पटक उही "random" अंक दोहोर्याउँछ)', '创建随机数生成器（种子数让每次运行得到相同的“随机”数）'],
    seed: ['fixes the randomness so every run gives the same numbers', 'random लाई स्थिर गर्छ, हरेक पटक उही अंक आउँछन्', '固定随机性，每次运行得到相同的数'],
    normal: ['random numbers in a bell-curve shape around an average', 'औसत वरिपरि घण्टी आकारमा (bell curve) random अंक', '围绕平均值呈钟形分布的随机数'],
    uniform: ['random numbers spread evenly between a low and a high value', 'न्यून र उच्च मानबीच बराबर फैलिएका random अंक', '在最小值和最大值之间均匀分布的随机数'],
    integers: ['random whole numbers', 'random पूर्णाङ्क', '随机整数'],
    randint: ['random whole numbers', 'random पूर्णाङ्क', '随机整数'],
    rand: ['random numbers between 0 and 1', '0 र 1 बीचका random अंक', '0 到 1 之间的随机数'],
    randn: ['random numbers in a bell-curve shape', 'घण्टी आकारका random अंक', '钟形分布的随机数'],
    choice: ['picks random items from a list', 'सूचीबाट random वस्तु छान्छ', '从列表中随机挑选'],
    permutation: ['shuffles the order randomly', 'क्रमलाई random रूपमा फेरबदल गर्छ', '随机打乱顺序'],
    shuffle: ['shuffles the order randomly', 'क्रमलाई random रूपमा फेरबदल गर्छ', '随机打乱顺序'],
    astype: ['changes the number type (e.g. to whole numbers)', 'अंकको प्रकार बदल्छ (जस्तै पूर्णाङ्कमा)', '改变数字类型（例如变成整数）'],
    copy: ['makes a separate copy, so the original is not changed', 'छुट्टै प्रतिलिपि बनाउँछ, मूल नबदलियोस् भनेर', '复制一份，原来的不会被改动'],
    // Pandas
    DataFrame: ['makes a table (rows and named columns), like an Excel sheet', 'तालिका बनाउँछ (row र नाम भएका column), Excel sheet जस्तै', '生成一个表格（行和带名字的列），像 Excel 表'],
    Series: ['makes one column of data', 'डाटाको एउटा column बनाउँछ', '生成一列数据'],
    read_csv: ['reads a CSV file (a spreadsheet saved as text) into a table', 'CSV फाइल (text मा सेभ गरिएको spreadsheet) लाई तालिकामा पढ्छ', '把 CSV 文件（以文字保存的表格）读成表格'],
    open_url: ['downloads a file from the internet', 'इन्टरनेटबाट फाइल ल्याउँछ', '从网上下载文件'],
    head: ['shows the first 5 rows of the table', 'तालिकाका पहिला ५ row देखाउँछ', '显示表格的前 5 行'],
    tail: ['shows the last 5 rows of the table', 'तालिकाका अन्तिम ५ row देखाउँछ', '显示表格的最后 5 行'],
    describe: ['gives quick statistics for every column (mean, min, max…)', 'हरेक column को छिटो तथ्याङ्क दिन्छ (mean, min, max…)', '给出每列的快速统计（平均、最小、最大……）'],
    info: ['lists the columns, their types and missing values', 'column, तिनको प्रकार र छुटेका मान देखाउँछ', '列出各列、类型和缺失值'],
    isna: ['marks the missing (empty) values', 'छुटेका (खाली) मान चिनाउँछ', '标记缺失（空）值'],
    fillna: ['fills missing values with something (e.g. the average)', 'छुटेका मान केहीले भर्छ (जस्तै औसत)', '用某个值（例如平均值）填补缺失值'],
    dropna: ['removes rows that have missing values', 'छुटेका मान भएका row हटाउँछ', '删除有缺失值的行'],
    drop: ['removes columns or rows', 'column वा row हटाउँछ', '删除列或行'],
    groupby: ['groups rows by a column, then summarises each group (like a pivot table)', 'column अनुसार row समूह बनाउँछ, अनि हरेक समूहको सारांश (pivot table जस्तै)', '按某列分组，再汇总每组（像数据透视表）'],
    sort_values: ['sorts the table by a column', 'column अनुसार तालिका मिलाउँछ', '按某列给表格排序'],
    value_counts: ['counts how many times each value appears', 'हरेक मान कति पटक आयो गन्छ', '数每个值出现了几次'],
    nunique: ['counts how many different values there are', 'कति फरक मान छन् गन्छ', '数有多少个不同的值'],
    get_dummies: ['turns a text category into 0/1 columns (one-hot encoding)', 'अक्षर category लाई 0/1 column मा बदल्छ (one-hot encoding)', '把文字类别变成 0/1 列（独热编码）'],
    concat: ['joins tables together', 'तालिकाहरू जोड्छ', '把表格拼接起来'],
    merge: ['joins two tables using a shared column', 'साझा column प्रयोग गरेर दुई तालिका जोड्छ', '通过共同的列合并两个表'],
    map: ['changes every value using a rule or a lookup', 'नियम वा खोजीबाट हरेक मान बदल्छ', '按规则或对照表转换每个值'],
    apply: ['runs a function on every row or value', 'हरेक row वा मानमा function चलाउँछ', '对每一行或每个值运行一个函数'],
    iloc: ['picks rows/columns by position number', 'स्थान नम्बरबाट row/column छान्छ', '按位置编号选取行/列'],
    loc: ['picks rows/columns by name or condition', 'नाम वा सर्तबाट row/column छान्छ', '按名字或条件选取行/列'],
    corr: ['shows how strongly each pair of columns moves together', 'हरेक दुई column कति सँगै चल्छन् देखाउँछ', '显示每两列一起变化的程度'],
    // Matplotlib
    plot: ['draws a line chart', 'रेखा चार्ट बनाउँछ', '画折线图'],
    scatter: ['draws a dot for each point (scatter plot)', 'हरेक बिन्दुका लागि थोप्लो कोर्छ (scatter plot)', '为每个点画一个圆点（散点图）'],
    bar: ['draws a bar chart', 'बार चार्ट बनाउँछ', '画柱状图'],
    barh: ['draws a sideways bar chart', 'तेर्सो बार चार्ट बनाउँछ', '画横向柱状图'],
    hist: ['draws a histogram: how many values fall in each range', 'histogram बनाउँछ: हरेक दायरामा कति मान पर्छन्', '画直方图：每个区间有多少个值'],
    imshow: ['shows a grid of numbers as a picture', 'अंकको जालोलाई चित्रको रूपमा देखाउँछ', '把数字网格显示成图片'],
    contourf: ['colours areas of a map by value (e.g. the model\'s decision regions)', 'मानअनुसार नक्साका भाग रङ्ग्याउँछ (जस्तै मोडेलको निर्णय क्षेत्र)', '按值给地图区域上色（例如模型的决策区域）'],
    show: ['displays the chart', 'चार्ट देखाउँछ', '显示图表'],
    figure: ['starts a new, empty chart', 'नयाँ खाली चार्ट सुरु गर्छ', '新建一张空白图'],
    subplots: ['makes a figure with one or more chart areas (axes)', 'एक वा धेरै चार्ट क्षेत्र (axes) भएको चित्र बनाउँछ', '生成包含一个或多个图区（axes）的图'],
    title: ['adds a title on top of the chart', 'चार्टमाथि शीर्षक राख्छ', '在图上方加标题'],
    set_title: ['adds a title on top of this chart', 'यो चार्टमाथि शीर्षक राख्छ', '给这张图加标题'],
    xlabel: ['names the horizontal (x) axis', 'तेर्सो (x) अक्षको नाम लेख्छ', '给横轴（x）命名'],
    ylabel: ['names the vertical (y) axis', 'ठाडो (y) अक्षको नाम लेख्छ', '给纵轴（y）命名'],
    set_xlabel: ['names the horizontal (x) axis', 'तेर्सो (x) अक्षको नाम लेख्छ', '给横轴（x）命名'],
    set_ylabel: ['names the vertical (y) axis', 'ठाडो (y) अक्षको नाम लेख्छ', '给纵轴（y）命名'],
    set_ylim: ['sets the bottom and top of the y axis', 'y अक्षको तल र माथिको सीमा तोक्छ', '设置 y 轴的上下范围'],
    set_yscale: ['changes the y axis scale (e.g. log)', 'y अक्षको स्केल बदल्छ (जस्तै log)', '改变 y 轴刻度（例如对数）'],
    legend: ['shows the key that explains each colour/line', 'हरेक रङ/रेखाको अर्थ बताउने सूची देखाउँछ', '显示说明每种颜色/线条的图例'],
    colorbar: ['shows the colour scale beside the chart', 'चार्टको छेउमा रङको स्केल देखाउँछ', '在图旁显示颜色刻度'],
    axhline: ['draws a horizontal reference line', 'तेर्सो सन्दर्भ रेखा कोर्छ', '画一条水平参考线'],
    axvline: ['draws a vertical reference line', 'ठाडो सन्दर्भ रेखा कोर्छ', '画一条垂直参考线'],
    tight_layout: ['tidies the spacing so labels do not overlap', 'लेबल नखप्टियोस् भनेर ठाउँ मिलाउँछ', '调整间距，避免标签重叠'],
    axis: ['turns the chart\'s axes (lines and numbers) on or off', 'चार्टका अक्ष (रेखा र अंक) देखाउने वा लुकाउने', '显示或隐藏图的坐标轴（线和数字）'],
    yscale: ['changes the y axis scale (e.g. "log" for numbers that grow very fast)', 'y अक्षको स्केल बदल्छ (जस्तै धेरै छिटो बढ्ने अंकका लागि "log")', '改变 y 轴刻度（例如增长很快的数用 "log"）'],
    xscale: ['changes the x axis scale (e.g. "log")', 'x अक्षको स्केल बदल्छ (जस्तै "log")', '改变 x 轴刻度（例如 "log"）'],
    from_predictions: ['draws a confusion-matrix picture from the true and the predicted answers', 'साँचो र अनुमानित उत्तरबाट confusion-matrix चित्र बनाउँछ', '根据真实答案和预测答案画出混淆矩阵图'],
    grid: ['adds background grid lines', 'पृष्ठभूमिमा जालो रेखा थप्छ', '加背景网格线'],
    // scikit-learn: data
    load_iris: ['loads the famous Iris flowers dataset (150 flowers, 3 species)', 'प्रसिद्ध Iris फूल डाटासेट ल्याउँछ (१५० फूल, ३ प्रजाति)', '载入著名的鸢尾花数据集（150 朵花，3 个品种）'],
    load_digits: ['loads 1,797 small pictures of handwritten digits 0–9', '०–९ हातले लेखिएका अंकका १,७९७ साना चित्र ल्याउँछ', '载入 1797 张手写数字 0–9 的小图片'],
    load_breast_cancer: ['loads a real medical dataset: is a tumour harmful or not?', 'वास्तविक मेडिकल डाटासेट ल्याउँछ: ट्युमर हानिकारक हो कि होइन?', '载入真实的医学数据集：肿瘤是否有害？'],
    load_diabetes: ['loads a real diabetes dataset (442 patients)', 'वास्तविक मधुमेह डाटासेट ल्याउँछ (४४२ बिरामी)', '载入真实的糖尿病数据集（442 名患者）'],
    load_wine: ['loads a wine dataset (3 kinds of wine)', 'वाइन डाटासेट ल्याउँछ (३ प्रकारका वाइन)', '载入葡萄酒数据集（3 种葡萄酒）'],
    make_blobs: ['creates practice data: clouds of points around centres', 'अभ्यास डाटा बनाउँछ: केन्द्र वरिपरि बिन्दुका बादल', '生成练习数据：围绕中心的点群'],
    make_moons: ['creates practice data shaped like two half-moons', 'दुई अर्धचन्द्र आकारको अभ्यास डाटा बनाउँछ', '生成两个半月形的练习数据'],
    make_circles: ['creates practice data: one circle inside another', 'अभ्यास डाटा बनाउँछ: एउटा वृत्तभित्र अर्को', '生成练习数据：一个圆套着另一个圆'],
    train_test_split: ['splits the data into a TRAINING part (to learn from) and a TEST part (to check the model on new data, like an exam)', 'डाटालाई तालिम भाग (सिक्न) र परीक्षण भाग (नयाँ डाटामा जाँच्न, परीक्षा जस्तै) मा बाँड्छ', '把数据分成训练部分（用来学习）和测试部分（像考试一样在新数据上检验模型）'],
    // scikit-learn: models
    LinearRegression: ['creates a linear-regression model: fits the best straight line to predict a NUMBER', 'linear regression मोडेल बनाउँछ: अंक अनुमान गर्न सबैभन्दा राम्रो सीधा रेखा खोज्छ', '创建线性回归模型：找出最合适的直线来预测数值'],
    LogisticRegression: ['creates a logistic-regression model: predicts a CATEGORY (yes/no) with a probability', 'logistic regression मोडेल बनाउँछ: सम्भावनासहित category (हो/होइन) अनुमान गर्छ', '创建逻辑回归模型：带概率地预测类别（是/否）'],
    Ridge: ['creates linear regression with a penalty that stops overfitting (L2)', 'overfitting रोक्ने सजाय (L2) सहितको linear regression बनाउँछ', '创建带惩罚项（L2）防止过拟合的线性回归'],
    Lasso: ['creates linear regression that can switch useless features off (L1)', 'काम नलाग्ने feature बन्द गर्न सक्ने linear regression (L1) बनाउँछ', '创建能关闭无用特征的线性回归（L1）'],
    KNeighborsClassifier: ['creates a k-nearest-neighbours model: decides by asking the k most similar examples', 'k-nearest-neighbours मोडेल बनाउँछ: सबैभन्दा मिल्दा k उदाहरणलाई सोधेर निर्णय गर्छ', '创建 k 近邻模型：询问最相似的 k 个例子来做决定'],
    DecisionTreeClassifier: ['creates a decision tree: a flowchart of yes/no questions', 'decision tree बनाउँछ: हो/होइन प्रश्नको flowchart', '创建决策树：一张由是/否问题组成的流程图'],
    DecisionTreeRegressor: ['creates a decision tree that predicts numbers', 'अंक अनुमान गर्ने decision tree बनाउँछ', '创建预测数值的决策树'],
    RandomForestClassifier: ['creates a random forest: many decision trees that vote together', 'random forest बनाउँछ: धेरै decision tree जसले सँगै भोट दिन्छन्', '创建随机森林：许多决策树一起投票'],
    RandomForestRegressor: ['creates a random forest that predicts numbers (average of many trees)', 'अंक अनुमान गर्ने random forest बनाउँछ (धेरै रूखको औसत)', '创建预测数值的随机森林（许多树的平均）'],
    GradientBoostingRegressor: ['creates gradient boosting: small trees added one by one, each fixing the last one\'s mistakes', 'gradient boosting बनाउँछ: साना रूख एक-एक गरी थपिन्छन्, हरेकले अघिल्लोको गल्ती सुधार्छ', '创建梯度提升：一棵棵小树依次加入，每棵修正上一棵的错误'],
    GradientBoostingClassifier: ['creates gradient boosting for categories: small trees fixing each other\'s mistakes', 'category का लागि gradient boosting बनाउँछ: साना रूखले एकअर्काको गल्ती सुधार्छन्', '创建用于分类的梯度提升：小树互相修正错误'],
    SVC: ['creates a support vector machine: finds the widest gap between classes', 'support vector machine बनाउँछ: वर्गहरूबीच सबैभन्दा फराकिलो खाली ठाउँ खोज्छ', '创建支持向量机：找出类别之间最宽的间隔'],
    MultinomialNB: ['creates a Naive Bayes model: uses word counts and probabilities (great for spam)', 'Naive Bayes मोडेल बनाउँछ: शब्द गन्ती र सम्भावना प्रयोग गर्छ (spam का लागि उत्तम)', '创建朴素贝叶斯模型：利用词频和概率（很适合垃圾邮件）'],
    GaussianNB: ['creates a Naive Bayes model for number features', 'अंक feature का लागि Naive Bayes मोडेल बनाउँछ', '创建用于数值特征的朴素贝叶斯模型'],
    KMeans: ['creates k-means clustering: groups points into k clusters with no labels', 'k-means clustering बनाउँछ: लेबल बिना बिन्दुलाई k समूहमा बाँड्छ', '创建 k 均值聚类：在没有标签的情况下把点分成 k 组'],
    DBSCAN: ['creates DBSCAN clustering: finds crowded areas, marks lonely points as noise', 'DBSCAN clustering बनाउँछ: भीड भएका ठाउँ खोज्छ, एक्लो बिन्दुलाई noise भन्छ', '创建 DBSCAN 聚类：找出密集区域，把孤立点标为噪声'],
    PCA: ['creates PCA: squeezes many columns into a few that keep most of the information', 'PCA बनाउँछ: धेरै column लाई धेरैजसो जानकारी राख्ने थोरै column मा खुम्च्याउँछ', '创建 PCA：把很多列压缩成几列，同时保留大部分信息'],
    IsolationForest: ['creates an Isolation Forest: finds unusual points (anomalies)', 'Isolation Forest बनाउँछ: असामान्य बिन्दु (anomaly) खोज्छ', '创建孤立森林：找出异常点'],
    MLPClassifier: ['creates a neural network (multi-layer perceptron) that predicts categories', 'category अनुमान गर्ने neural network (multi-layer perceptron) बनाउँछ', '创建预测类别的神经网络（多层感知机）'],
    MLPRegressor: ['creates a neural network that predicts numbers', 'अंक अनुमान गर्ने neural network बनाउँछ', '创建预测数值的神经网络'],
    // scikit-learn: preparing data
    StandardScaler: ['creates a scaler: puts every column on the same scale (average 0, spread 1)', 'scaler बनाउँछ: हरेक column लाई एउटै स्केलमा ल्याउँछ (औसत 0, फैलावट 1)', '创建标准化器：让每列处于同一尺度（平均 0，离散 1）'],
    MinMaxScaler: ['creates a scaler that squeezes every column into 0 … 1', 'हरेक column लाई 0 … 1 मा खुम्च्याउने scaler बनाउँछ', '创建把每列压缩到 0 … 1 的缩放器'],
    SimpleImputer: ['creates an imputer: fills in missing values (e.g. with the median)', 'imputer बनाउँछ: छुटेका मान भर्छ (जस्तै median ले)', '创建填补器：填补缺失值（例如用中位数）'],
    OneHotEncoder: ['creates a one-hot encoder: turns categories into 0/1 columns', 'one-hot encoder बनाउँछ: category लाई 0/1 column मा बदल्छ', '创建独热编码器：把类别变成 0/1 列'],
    PolynomialFeatures: ['adds squared (x²) and combined columns so a straight-line model can bend', 'x² र मिश्रित column थप्छ, ताकि सीधा रेखा मोडेल बाङ्गिन सकोस्', '加入平方（x²）和组合列，让直线模型可以弯曲'],
    CountVectorizer: ['turns text into word counts that a model can use', 'अक्षरलाई मोडेलले प्रयोग गर्न सक्ने शब्द-गन्तीमा बदल्छ', '把文字变成模型能用的词频'],
    TfidfVectorizer: ['turns text into word scores (rare, important words score higher)', 'अक्षरलाई शब्द-अंकमा बदल्छ (दुर्लभ, महत्त्वपूर्ण शब्दको अंक बढी)', '把文字变成词分数（稀有且重要的词分数更高）'],
    ColumnTransformer: ['applies different preparation steps to different columns', 'फरक column मा फरक तयारी चरण लागू गर्छ', '对不同的列使用不同的预处理步骤'],
    Pipeline: ['chains steps together (prepare → model) so they always run in the right order', 'चरणहरूलाई जोड्छ (तयारी → मोडेल), सधैँ सही क्रममा चल्छन्', '把步骤串起来（预处理 → 模型），始终按正确顺序运行'],
    make_pipeline: ['chains steps together (prepare → model) so they always run in the right order', 'चरणहरूलाई जोड्छ (तयारी → मोडेल), सधैँ सही क्रममा चल्छन्', '把步骤串起来（预处理 → 模型），始终按正确顺序运行'],
    GridSearchCV: ['tries many settings automatically and keeps the best one', 'धेरै सेटिङ आफैँ प्रयास गरेर सबैभन्दा राम्रो राख्छ', '自动尝试很多设置，保留最好的一个'],
    // scikit-learn: the core actions
    fit: ['TRAINS the model: it learns the pattern from the examples (X = inputs, y = correct answers)', 'मोडेललाई तालिम दिन्छ: उदाहरणबाट ढाँचा सिक्छ (X = इनपुट, y = सही उत्तर)', '训练模型：从例子中学习规律（X = 输入，y = 正确答案）'],
    predict: ['uses the trained model to make PREDICTIONS for new inputs', 'तालिम पाएको मोडेलले नयाँ इनपुटको अनुमान (prediction) गर्छ', '用训练好的模型对新输入做出预测'],
    predict_proba: ['gives the probability of each class (how sure the model is)', 'हरेक वर्गको सम्भावना दिन्छ (मोडेल कति पक्का छ)', '给出每个类别的概率（模型有多确定）'],
    score: ['checks how good the model is (accuracy for categories, R² for numbers)', 'मोडेल कति राम्रो छ जाँच्छ (category का लागि accuracy, अंकका लागि R²)', '检查模型有多好（分类用准确率，数值用 R²）'],
    transform: ['applies what was learned to change the data (e.g. scale it)', 'सिकेको कुरा प्रयोग गरेर डाटा बदल्छ (जस्तै scale गर्छ)', '用学到的东西转换数据（例如缩放）'],
    fit_transform: ['learns from the data AND changes it in one step (use on training data only)', 'डाटाबाट सिक्छ र एकै चरणमा बदल्छ (तालिम डाटामा मात्र प्रयोग गर्नुहोस्)', '一步完成学习和转换数据（只用在训练数据上）'],
    fit_predict: ['learns and gives each point its group in one step', 'सिक्छ र एकै चरणमा हरेक बिन्दुको समूह दिन्छ', '一步完成学习并给每个点分组'],
    // scikit-learn: checking results
    cross_val_score: ['tests the model 5 times on 5 different splits and gives all 5 scores (fairer than one test)', 'मोडेललाई ५ फरक भागमा ५ पटक जाँचेर ५ वटै अंक दिन्छ (एउटा परीक्षणभन्दा निष्पक्ष)', '在 5 种不同的划分上测试 5 次，给出 5 个分数（比一次测试更公平）'],
    accuracy_score: ['the share of predictions that were correct', 'सही भएका अनुमानको भाग', '预测正确的比例'],
    precision_score: ['of everything predicted "yes", how many really were yes', '"हो" भनेर अनुमान गरिएकामध्ये साँच्चै कति हो थिए', '在所有预测为“是”的里面，真正是“是”的有多少'],
    recall_score: ['of all the real "yes" cases, how many the model found', 'वास्तविक "हो" केसमध्ये मोडेलले कति भेट्यो', '在所有真实为“是”的情况中，模型找到了多少'],
    f1_score: ['a balance of precision and recall in one number', 'precision र recall को सन्तुलन एउटै अंकमा', '把精确率和召回率平衡成一个数'],
    confusion_matrix: ['a table of right and wrong predictions for each class', 'हरेक वर्गका सही र गलत अनुमानको तालिका', '每个类别预测对错的表格'],
    classification_report: ['a full report: precision, recall and F1 for every class', 'पूरा रिपोर्ट: हरेक वर्गको precision, recall र F1', '完整报告：每个类别的精确率、召回率和 F1'],
    r2_score: ['R²: how much of the pattern the model explains (1 = perfect, 0 = no better than the average)', 'R²: मोडेलले ढाँचाको कति भाग बुझायो (1 = पूर्ण, 0 = औसतभन्दा राम्रो छैन)', 'R²：模型解释了多少规律（1 = 完美，0 = 不比平均值好）'],
    mean_absolute_error: ['the average size of the mistakes (MAE), in the same units as the answer', 'गल्तीको औसत आकार (MAE), उत्तरकै एकाइमा', '平均误差大小（MAE），单位和答案相同'],
    mean_squared_error: ['the average of the squared mistakes (MSE): big mistakes count much more', 'वर्ग गरिएका गल्तीको औसत (MSE): ठूला गल्ती धेरै गनिन्छन्', '误差平方的平均（MSE）：大错误的影响大得多'],
    silhouette_score: ['how well-separated the clusters are (close to 1 = very clear groups)', 'समूहहरू कति राम्ररी छुट्टिएका छन् (1 नजिक = एकदम स्पष्ट)', '聚类分得有多开（接近 1 = 分组非常清楚）'],
    roc_curve: ['the trade-off between catching positives and false alarms at every threshold', 'हरेक threshold मा positive समात्ने र गलत अलार्मबीचको सन्तुलन', '在每个阈值下，找出正例与误报之间的权衡'],
    roc_auc_score: ['one number for how well the model ranks yes above no (1 = perfect, 0.5 = guessing)', 'मोडेलले हो लाई होइनभन्दा कति राम्ररी माथि राख्छ (1 = पूर्ण, 0.5 = अड्कल)', '一个数衡量模型把“是”排在“否”前面的能力（1 = 完美，0.5 = 瞎猜）'],
    export_text: ['prints the decision tree\'s questions as text', 'decision tree का प्रश्न अक्षरमा देखाउँछ', '把决策树的问题以文字打印出来'],
    plot_tree: ['draws the decision tree as a picture', 'decision tree लाई चित्रमा देखाउँछ', '把决策树画成图'],
    // saving
    dump: ['saves the trained model to a file', 'तालिम पाएको मोडेल फाइलमा सेभ गर्छ', '把训练好的模型存成文件'],
    load: ['loads a saved model from a file', 'सेभ गरिएको मोडेल फाइलबाट खोल्छ', '从文件载入保存的模型'],
    // deep learning (PyTorch / Keras / from scratch)
    tensor: ['makes a tensor: PyTorch\'s array of numbers', 'tensor बनाउँछ: PyTorch को अंकको array', '生成张量：PyTorch 的数字数组'],
    Sequential: ['stacks neural-network layers one after another', 'न्युरल नेटवर्कका तहलाई एकपछि अर्को राख्छ', '把神经网络的层一层层叠起来'],
    Linear: ['a fully-connected layer: every input connects to every output with a weight', 'fully-connected तह: हरेक इनपुट हरेक आउटपुटसँग weight मार्फत जोडिन्छ', '全连接层：每个输入都通过权重连到每个输出'],
    Dense: ['a fully-connected layer: every input connects to every output with a weight', 'fully-connected तह: हरेक इनपुट हरेक आउटपुटसँग weight मार्फत जोडिन्छ', '全连接层：每个输入都通过权重连到每个输出'],
    ReLU: ['activation: keeps positive numbers, turns negatives into 0', 'activation: धनात्मक अंक राख्छ, ऋणात्मकलाई 0 बनाउँछ', '激活函数：保留正数，把负数变成 0'],
    relu: ['activation: keeps positive numbers, turns negatives into 0', 'activation: धनात्मक अंक राख्छ, ऋणात्मकलाई 0 बनाउँछ', '激活函数：保留正数，把负数变成 0'],
    sigmoid: ['squashes any number into 0 … 1, so it can be read as a probability', 'जुनसुकै अंकलाई 0 … 1 मा खुम्च्याउँछ, सम्भावनाको रूपमा पढ्न सकिन्छ', '把任何数压缩到 0 … 1，可以当作概率'],
    softmax: ['turns a list of scores into probabilities that add up to 1', 'अंकको सूचीलाई जम्मा 1 हुने सम्भावनामा बदल्छ', '把一串分数变成加起来等于 1 的概率'],
    Dropout: ['randomly switches off some neurons while training, to stop overfitting', 'तालिमका बेला केही neuron random रूपमा बन्द गर्छ, overfitting रोक्न', '训练时随机关闭一些神经元，防止过拟合'],
    CrossEntropyLoss: ['the loss (error score) for classification: big when the model is confidently wrong', 'classification को loss (गल्ती अंक): मोडेल पक्का भएर गलत हुँदा ठूलो', '分类的损失（误差分数）：模型很自信却答错时很大'],
    MSELoss: ['the loss for numbers: average squared mistake', 'अंकका लागि loss: वर्ग गरिएको गल्तीको औसत', '数值的损失：误差平方的平均'],
    Adam: ['an optimiser: the smart rule that updates the weights to reduce the loss', 'optimiser: loss घटाउन weight अद्यावधिक गर्ने चलाख नियम', '优化器：更新权重以减小损失的聪明规则'],
    SGD: ['an optimiser: gradient descent, small steps downhill on the loss', 'optimiser: gradient descent, loss को ओरालोमा साना पाइला', '优化器：梯度下降，沿损失的下坡迈小步'],
    parameters: ['all the weights the network can learn', 'नेटवर्कले सिक्न सक्ने सबै weight', '网络可以学习的所有权重'],
    backward: ['backpropagation: works out how much each weight caused the error', 'backpropagation: हरेक weight ले गल्तीमा कति योगदान दियो पत्ता लगाउँछ', '反向传播：算出每个权重对误差贡献了多少'],
    forward: ['the forward pass: input flows through the layers to give an output', 'forward pass: इनपुट तहहरू हुँदै गएर आउटपुट दिन्छ', '前向传播：输入经过各层得到输出'],
    step: ['updates the weights a little to reduce the error', 'गल्ती घटाउन weight अलिकति बदल्छ', '稍微更新权重来减小误差'],
    zero_grad: ['clears the old gradients before the next step', 'अर्को चरणअघि पुरानो gradient सफा गर्छ', '下一步之前清除旧的梯度'],
    no_grad: ['turns off learning while we only make predictions', 'अनुमान मात्र गर्दा सिकाइ बन्द गर्छ', '只做预测时关闭学习'],
    compile: ['chooses the loss and optimiser for training', 'तालिमका लागि loss र optimiser छान्छ', '为训练选择损失函数和优化器'],
  };
  const ATTR = {
    shape: ['the size: (rows, columns)', 'साइज: (row, column)', '大小：（行，列）'],
    T: ['the transpose: rows become columns', 'transpose: row हरू column बन्छन्', '转置：行变成列'],
    columns: ['the names of the table\'s columns', 'तालिकाका column का नाम', '表格各列的名字'],
    values: ['the raw numbers inside the table (as a NumPy array)', 'तालिकाभित्रका अंक मात्र (NumPy array को रूपमा)', '表格里的原始数字（NumPy 数组）'],
    index: ['the row labels', 'row का लेबल', '行标签'],
    dtype: ['the type of the numbers (int, float…)', 'अंकको प्रकार (int, float…)', '数字类型（int、float……）'],
    size: ['how many numbers in total', 'जम्मा कति अंक', '一共有多少个数'],
    coef_: ['the weights the model learned (how much each feature matters)', 'मोडेलले सिकेका weight (हरेक feature कति महत्त्वपूर्ण)', '模型学到的权重（每个特征有多重要）'],
    intercept_: ['the starting value (bias) the model learned', 'मोडेलले सिकेको सुरुको मान (bias)', '模型学到的起始值（偏置）'],
    feature_importances_: ['how much each feature helped the trees decide', 'हरेक feature ले रूखलाई निर्णय गर्न कति मद्दत गर्यो', '每个特征对树的决策帮助有多大'],
    cluster_centers_: ['the centre point of each cluster', 'हरेक समूहको केन्द्र बिन्दु', '每个簇的中心点'],
    labels_: ['the group number given to each point', 'हरेक बिन्दुलाई दिइएको समूह नम्बर', '分给每个点的组号'],
    inertia_: ['how far points are from their cluster centres (smaller = tighter)', 'बिन्दु आफ्नो समूह केन्द्रबाट कति टाढा छन् (सानो = कसिलो)', '点离各自簇中心有多远（越小越紧凑）'],
    explained_variance_ratio_: ['how much information each new PCA column keeps', 'PCA का हरेक नयाँ column ले कति जानकारी राख्छ', 'PCA 每个新列保留了多少信息'],
    classes_: ['the list of categories the model knows', 'मोडेलले चिनेका category को सूची', '模型认识的类别列表'],
    best_params_: ['the best settings found by the search', 'खोजीले भेटेको सबैभन्दा राम्रो सेटिङ', '搜索找到的最佳设置'],
    best_score_: ['the score of the best settings', 'सबैभन्दा राम्रो सेटिङको अंक', '最佳设置的分数'],
    data: ['the input numbers (features) of the dataset', 'डाटासेटका इनपुट अंक (feature)', '数据集的输入数字（特征）'],
    target: ['the correct answers (labels) of the dataset', 'डाटासेटका सही उत्तर (label)', '数据集的正确答案（标签）'],
    feature_names: ['the names of the input columns', 'इनपुट column का नाम', '输入列的名字'],
    target_names: ['the names of the answer categories', 'उत्तर category का नाम', '答案类别的名字'],
    images: ['the data as small pictures', 'डाटा साना चित्रको रूपमा', '以小图片形式存放的数据'],
    pi: ['π = 3.14159…', 'π = 3.14159…', 'π = 3.14159……'],
  };
  // What common keyword settings mean
  const KW = {
    test_size: (v) => (isFinite(+v) ? T(`test_size=${v}: keep ${Math.round(+v * 100)}% of the data aside for the test`, `test_size=${v}: डाटाको ${Math.round(+v * 100)}% परीक्षणका लागि छुट्याउने`, `test_size=${v}：留出 ${Math.round(+v * 100)}% 的数据用于测试`) : null),
    random_state: () => T('random_state: fixes the randomness so you get the same result every run', 'random_state: random लाई स्थिर गर्छ, हरेक पटक उही नतिजा आउँछ', 'random_state：固定随机性，每次运行结果都一样'),
    n_estimators: (v) => T(`n_estimators=${v}: use ${v} trees`, `n_estimators=${v}: ${v} वटा रूख प्रयोग गर्ने`, `n_estimators=${v}：使用 ${v} 棵树`),
    max_depth: (v) => T(`max_depth=${v}: each tree may ask at most ${v} questions in a row (smaller = simpler, less overfitting)`, `max_depth=${v}: हरेक रूखले लगातार बढीमा ${v} प्रश्न सोध्न सक्छ (सानो = सरल, कम overfitting)`, `max_depth=${v}：每棵树最多连续问 ${v} 个问题（越小越简单，越不易过拟合）`),
    n_clusters: (v) => T(`n_clusters=${v}: make ${v} groups`, `n_clusters=${v}: ${v} वटा समूह बनाउने`, `n_clusters=${v}：分成 ${v} 组`),
    n_neighbors: (v) => T(`n_neighbors=${v}: ask the ${v} closest examples`, `n_neighbors=${v}: सबैभन्दा नजिकका ${v} उदाहरणलाई सोध्ने`, `n_neighbors=${v}：询问最近的 ${v} 个例子`),
    n_components: (v) => T(`n_components=${v}: keep ${v} new columns`, `n_components=${v}: ${v} वटा नयाँ column राख्ने`, `n_components=${v}：保留 ${v} 个新列`),
    cv: (v) => T(`cv=${v}: test ${v} times on ${v} different splits`, `cv=${v}: ${v} फरक भागमा ${v} पटक जाँच्ने`, `cv=${v}：在 ${v} 种划分上测试 ${v} 次`),
    max_iter: (v) => T(`max_iter=${v}: allow up to ${v} learning steps`, `max_iter=${v}: बढीमा ${v} सिकाइ चरण`, `max_iter=${v}：最多学习 ${v} 步`),
    hidden_layer_sizes: (v) => T(`hidden_layer_sizes=${v}: the number of neurons in each hidden layer`, `hidden_layer_sizes=${v}: हरेक hidden तहमा neuron को संख्या`, `hidden_layer_sizes=${v}：每个隐藏层的神经元数量`),
    learning_rate: (v) => T(`learning_rate=${v}: how big each learning step is`, `learning_rate=${v}: हरेक सिकाइ पाइला कति ठूलो`, `learning_rate=${v}：每一步学习迈多大`),
    lr: (v) => T(`lr=${v}: the learning rate — how big each learning step is`, `lr=${v}: learning rate — हरेक सिकाइ पाइला कति ठूलो`, `lr=${v}：学习率——每一步学习迈多大`),
    alpha: (v) => T(`alpha=${v}: how strong the penalty against overfitting is`, `alpha=${v}: overfitting विरुद्धको सजाय कति कडा`, `alpha=${v}：防止过拟合的惩罚有多强`),
    C: (v) => T(`C=${v}: how strictly to fit the training data (bigger = stricter, can overfit)`, `C=${v}: तालिम डाटामा कति कडाइले मिलाउने (ठूलो = कडा, overfit हुन सक्छ)`, `C=${v}：多严格地拟合训练数据（越大越严格，可能过拟合）`),
    kernel: (v) => T(`kernel=${v}: the shape of border the SVM can draw`, `kernel=${v}: SVM ले कोर्न सक्ने सीमानाको आकार`, `kernel=${v}：SVM 能画出的边界形状`),
    axis: (v) => (v === '0' ? T('axis=0: work down each column', 'axis=0: हरेक column तलतिर काम गर्ने', 'axis=0：沿每一列向下计算') : v === '1' ? T('axis=1: work across each row', 'axis=1: हरेक row तेर्सो काम गर्ने', 'axis=1：沿每一行横向计算') : null),
    stratify: () => T('stratify: keep the same mix of classes in both the training and test parts', 'stratify: तालिम र परीक्षण दुवैमा वर्गहरूको उही मिश्रण राख्ने', 'stratify：让训练集和测试集里各类别的比例相同'),
    figsize: (v) => T(`figsize=${v}: chart width and height (in inches)`, `figsize=${v}: चार्टको चौडाइ र उचाइ (इन्चमा)`, `figsize=${v}：图的宽和高（英寸）`),
    bins: (v) => T(`bins=${v}: split the range into ${v} bars`, `bins=${v}: दायरालाई ${v} बारमा बाँड्ने`, `bins=${v}：把范围分成 ${v} 根柱子`),
    label: () => T('label=…: the name shown in the legend', 'label=…: legend मा देखिने नाम', 'label=…：图例中显示的名字'),
    c: () => T('c=…: colour each dot by this value', 'c=…: यो मानअनुसार हरेक थोप्लो रङ्ग्याउने', 'c=…：按这个值给每个点上色'),
    cmap: (v) => T(`cmap=${v}: the colour palette`, `cmap=${v}: रङको समूह`, `cmap=${v}：配色方案`),
    alpha_plot: () => null,
    n_init: () => T('n_init: how many fresh starts k-means tries (it keeps the best)', 'n_init: k-means ले कति पटक नयाँ सुरुवात गर्छ (सबैभन्दा राम्रो राख्छ)', 'n_init：k 均值尝试几次重新开始（保留最好的）'),
    epochs: (v) => T(`epochs=${v}: go through the whole training data ${v} times`, `epochs=${v}: पूरै तालिम डाटा ${v} पटक दोहोर्याउने`, `epochs=${v}：把全部训练数据学习 ${v} 遍`),
  };
  // Names learners meet again and again
  const VARS = {
    X: ['X (capital) = the inputs / features: what the model looks at', 'X (ठूलो) = इनपुट / feature: मोडेलले हेर्ने कुरा', 'X（大写）= 输入/特征：模型看的东西'],
    y: ['y = the correct answers (labels / target) the model should learn to predict', 'y = सही उत्तर (label / target), जुन मोडेलले अनुमान गर्न सिक्नुपर्छ', 'y = 模型要学会预测的正确答案（标签/目标）'],
    X_train: ['X_train = the inputs the model learns from', 'X_train = मोडेलले सिक्ने इनपुट', 'X_train = 模型用来学习的输入'],
    X_test: ['X_test = inputs kept hidden until the "exam"', 'X_test = "परीक्षा" सम्म लुकाइएका इनपुट', 'X_test = 留到“考试”时才用的输入'],
    y_train: ['y_train = the answers for the training inputs', 'y_train = तालिम इनपुटका उत्तर', 'y_train = 训练输入的答案'],
    y_test: ['y_test = the true answers we compare the predictions with', 'y_test = अनुमानसँग तुलना गर्ने साँचो उत्तर', 'y_test = 用来和预测比较的真实答案'],
    df: ['df = "data frame", the usual name for a table of data', 'df = "data frame", डाटा तालिकाको सामान्य नाम', 'df = “数据框”，数据表格的常用名字'],
    model: ['model = our machine-learning model', 'model = हाम्रो मेसिन लर्निङ मोडेल', 'model = 我们的机器学习模型'],
    clf: ['clf = short for "classifier", a model that predicts categories', 'clf = "classifier" को छोटो रूप, category अनुमान गर्ने मोडेल', 'clf = “classifier（分类器）”的缩写，预测类别的模型'],
    pred: ['pred = the predictions', 'pred = अनुमानहरू', 'pred = 预测结果'],
    y_pred: ['y_pred = the model\'s predicted answers', 'y_pred = मोडेलले अनुमान गरेका उत्तर', 'y_pred = 模型预测的答案'],
    preds: ['preds = the predictions', 'preds = अनुमानहरू', 'preds = 预测结果'],
    w: ['w = weight(s): the numbers the model learns', 'w = weight: मोडेलले सिक्ने अंक', 'w = 权重：模型学习的数字'],
    b: ['b = bias: the starting value the model learns', 'b = bias: मोडेलले सिक्ने सुरुको मान', 'b = 偏置：模型学习的起始值'],
    lr: ['lr = learning rate: how big each learning step is', 'lr = learning rate: हरेक सिकाइ पाइला कति ठूलो', 'lr = 学习率：每一步学习迈多大'],
    loss: ['loss = how wrong the model is right now (smaller is better)', 'loss = मोडेल अहिले कति गलत छ (सानो राम्रो)', 'loss = 模型现在错得有多厉害（越小越好）'],
    acc: ['acc = accuracy', 'acc = शुद्धता (accuracy)', 'acc = 准确率'],
    rng: ['rng = a random-number generator', 'rng = random अंक बनाउने यन्त्र', 'rng = 随机数生成器'],
    fig: ['fig = the whole picture (figure)', 'fig = पूरै चित्र (figure)', 'fig = 整张图（figure）'],
    ax: ['ax = one chart area inside the figure', 'ax = चित्रभित्रको एउटा चार्ट क्षेत्र', 'ax = 图里的一个绘图区'],
    axes: ['axes = several chart areas inside the figure', 'axes = चित्रभित्रका धेरै चार्ट क्षेत्र', 'axes = 图里的多个绘图区'],
    scaler: ['scaler = the tool that puts columns on the same scale', 'scaler = column लाई एउटै स्केलमा ल्याउने औजार', 'scaler = 把各列缩放到同一尺度的工具'],
    pipe: ['pipe = the pipeline (preparation + model together)', 'pipe = pipeline (तयारी + मोडेल सँगै)', 'pipe = 流水线（预处理 + 模型）'],
  };

  // Phases, for the "In short" summary
  const PHASE_OF = {
    import: 'tools', read_csv: 'data', open_url: 'data', DataFrame: 'data', array: 'data', normal: 'data', uniform: 'data', integers: 'data', rand: 'data', randn: 'data', choice: 'data', linspace: 'data', arange: 'data',
    load_iris: 'data', load_digits: 'data', load_breast_cancer: 'data', load_diabetes: 'data', load_wine: 'data', make_blobs: 'data', make_moons: 'data', make_circles: 'data',
    head: 'explore', describe: 'explore', info: 'explore', value_counts: 'explore', groupby: 'explore', isna: 'explore', corr: 'explore', shape: 'explore',
    fillna: 'clean', dropna: 'clean', drop: 'clean', get_dummies: 'clean', SimpleImputer: 'clean', StandardScaler: 'clean', MinMaxScaler: 'clean', OneHotEncoder: 'clean', fit_transform: 'clean', PolynomialFeatures: 'clean', CountVectorizer: 'clean',
    train_test_split: 'split', fit: 'train', fit_predict: 'train', backward: 'train', step: 'train',
    predict: 'test', predict_proba: 'test', score: 'test', accuracy_score: 'test', r2_score: 'test', mean_absolute_error: 'test', mean_squared_error: 'test', confusion_matrix: 'test', classification_report: 'test', cross_val_score: 'test', recall_score: 'test', precision_score: 'test', silhouette_score: 'test', roc_auc_score: 'test',
    plot: 'chart', scatter: 'chart', bar: 'chart', barh: 'chart', hist: 'chart', imshow: 'chart', contourf: 'chart', show: 'chart',
    print: 'print', def: 'func', for: 'loop', while: 'loop', dump: 'save',
  };
  const PHASES = {
    tools: ['gets the tools (libraries) ready', 'औजार (library) तयार गर्छ', '准备好工具（库）'],
    data: ['creates or loads the data', 'डाटा बनाउँछ वा ल्याउँछ', '创建或载入数据'],
    explore: ['looks at the data to understand it', 'डाटा बुझ्न हेर्छ', '查看数据以了解它'],
    clean: ['cleans and prepares the data', 'डाटा सफा गरेर तयार गर्छ', '清理并准备数据'],
    split: ['splits the data into training and test parts', 'डाटालाई तालिम र परीक्षण भागमा बाँड्छ', '把数据分成训练和测试两部分'],
    func: ['defines its own function (a reusable recipe)', 'आफ्नै function (पुनः प्रयोग गर्न मिल्ने विधि) बनाउँछ', '定义自己的函数（可重复使用的步骤）'],
    loop: ['repeats some steps in a loop', 'केही चरण लुपमा दोहोर्याउँछ', '在循环里重复一些步骤'],
    train: ['trains the model (it learns from examples)', 'मोडेललाई तालिम दिन्छ (उदाहरणबाट सिक्छ)', '训练模型（从例子中学习）'],
    test: ['tests the model and makes predictions', 'मोडेल जाँच्छ र अनुमान गर्छ', '测试模型并做出预测'],
    chart: ['draws a chart so you can see the result', 'नतिजा हेर्न चार्ट बनाउँछ', '画图让你看到结果'],
    print: ['prints the results', 'नतिजा देखाउँछ', '打印结果'],
    save: ['saves the model to a file', 'मोडेल फाइलमा सेभ गर्छ', '把模型存成文件'],
  };

  // ---------- Small parsing helpers ----------
  // Split a line into [code, comment] while respecting quotes.
  function splitComment(line) {
    let q = null;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) { if (c === '\\') i++; else if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '#') return [line.slice(0, i), line.slice(i + 1).trim()];
    }
    return [line, ''];
  }
  // Bracket depth change of a piece of code (ignoring brackets inside strings).
  function depth(code) {
    let d = 0, q = null;
    for (let i = 0; i < code.length; i++) {
      const c = code[i];
      if (q) { if (c === '\\') i++; else if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if ('([{'.includes(c)) d++;
      else if (')]}'.includes(c)) d--;
    }
    return d;
  }
  // Replace string contents so pattern matching does not look inside text.
  const blankStrings = (s) => s.replace(/(["'])(?:\\.|(?!\1).)*\1/g, (m) => m[0] + ' '.repeat(Math.max(0, m.length - 2)) + m[0]);
  // Find a top-level "=" that is an assignment (not ==, <=, >=, != and not inside brackets).
  function assignIndex(s) {
    const b = blankStrings(s); let d = 0;
    for (let i = 0; i < b.length; i++) {
      const c = b[i];
      if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--;
      else if (c === '=' && d === 0 && b[i + 1] !== '=' && !'=<>!+-*/%@&|^:'.includes(b[i - 1] || '')) return i;
    }
    return -1;
  }

  // Group raw lines into logical statements (multi-line brackets and triple-quoted strings stay together).
  function statements(src) {
    const raw = src.replace(/\r/g, '').split('\n'), out = [];
    let cur = null, bal = 0, tri = null;
    raw.forEach((line) => {
      if (tri) { cur.lines.push(line); if (line.includes(tri)) tri = null; return; }
      const [code, comment] = splitComment(line);
      if (cur && bal > 0) { cur.lines.push(line); cur.code += ' ' + code.trim(); if (comment) cur.comments.push(comment); bal += depth(code); if (bal <= 0) { out.push(cur); cur = null; bal = 0; } return; }
      if (!line.trim()) return;
      const ind = line.match(/^\s*/)[0].replace(/\t/g, '    ').length;
      if (!code.trim()) { out.push({ comment: true, text: comment, ind, lines: [line] }); return; }
      cur = { code: code.trim(), comments: comment ? [comment] : [], ind, lines: [line] };
      const m = /("""|''')/.exec(code);
      if (m && code.split(m[1]).length === 2) { tri = m[1]; return; }
      bal = depth(code);
      if (bal > 0 && !cur.code.endsWith('\\')) return;
      out.push(cur); cur = null; bal = 0;
    });
    if (cur) out.push(cur);
    // "a = 1; b = 2" on one line → two statements
    return out.flatMap((st) => {
      if (st.comment || !st.code.includes(';')) return [st];
      const bl = blankStrings(st.code), parts = []; let d = 0, from = 0;
      for (let i = 0; i < bl.length; i++) { const c = bl[i]; if ('([{'.includes(c)) d++; else if (')]}'.includes(c)) d--; else if (c === ';' && d === 0) { parts.push(st.code.slice(from, i)); from = i + 1; } }
      parts.push(st.code.slice(from));
      const ps = parts.map((x) => x.trim()).filter(Boolean);
      return ps.length < 2 ? [st] : ps.map((x, i) => ({ code: x, comments: i === ps.length - 1 ? st.comments : [], ind: st.ind, lines: [x] }));
    });
  }

  const L = (x) => t(A(x));
  const code = (s) => `<code>${esc(s)}</code>`;
  const shorten = (s, n = 48) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
  const libName = (mod) => mod.split('.')[0];
  const libText = (mod) => {
    if (!LIBS[libName(mod)]) return t(T(`the <b>${esc(mod)}</b> library`, `<b>${esc(mod)}</b> library`, `<b>${esc(mod)}</b> 库`));
    const [name, desc] = L(LIBS[libName(mod)]).split(/\s*—\s*|——/);
    return `<b>${esc(name)}</b> (${esc(desc || '')})`;
  };

  // Explain one statement: returns { main, notes[], phases[] }
  function explain(st) {
    const s = st.code, b = blankStrings(s), notes = [], phases = [];
    let main = '', m;
    const called = [...b.matchAll(/([A-Za-z_][\w]*)\s*\(/g)].map((x) => x[1]);
    const attrs = [...b.matchAll(/\.([A-Za-z_]\w*)(?!\s*\()/g)].map((x) => x[1]);
    const say = (en, ne, zh) => t(T(en, ne, zh));

    if ((m = /^import\s+([\w.]+)(?:\s+as\s+(\w+))?/.exec(s))) {
      phases.push('tools');
      main = m[2] ? say(`Load ${libText(m[1])}, and call it <b>${esc(m[2])}</b> for short.`, `${libText(m[1])} ल्याउनुहोस्, र छोटकरीमा <b>${esc(m[2])}</b> भन्नुहोस्।`, `载入 ${libText(m[1])}，简称 <b>${esc(m[2])}</b>。`)
        : say(`Load ${libText(m[1])}.`, `${libText(m[1])} ल्याउनुहोस्।`, `载入 ${libText(m[1])}。`);
    } else if ((m = /^from\s+([\w.]+)\s+import\s+(.+)$/.exec(s))) {
      phases.push('tools');
      const names = m[2].replace(/[()]/g, '').split(',').map((x) => x.trim().split(/\s+as\s+/)[0]).filter(Boolean);
      main = say(`From ${libText(m[1])}, take ${names.map(code).join(', ')} so we can use ${names.length > 1 ? 'them' : 'it'} directly.`, `${libText(m[1])} बाट ${names.map(code).join(', ')} लिनुहोस्, सिधै प्रयोग गर्न।`, `从 ${libText(m[1])} 中取出 ${names.map(code).join('、')}，以便直接使用。`);
      names.forEach((n) => { if (FN[n]) notes.push(`${code(n)} — ${L(FN[n])}`); });
    } else if ((m = /^def\s+(\w+)\s*\((.*)\)\s*(?:->.*)?:$/.exec(s))) {
      phases.push('func');
      const args = m[2].split(',').map((x) => x.trim().split(/[=:]/)[0].trim()).filter(Boolean);
      main = say(`Create our own function (a reusable recipe) called <b>${esc(m[1])}</b>${args.length ? `. It takes: ${args.map(code).join(', ')}` : ''}. The indented lines below are its steps; they only run when we call ${code(m[1] + '(…)')}.`,
        `<b>${esc(m[1])}</b> नामको आफ्नै function (पुनः प्रयोग गर्ने विधि) बनाउनुहोस्${args.length ? `। यसले लिन्छ: ${args.map(code).join(', ')}` : ''}। तलका indent गरिएका लाइन यसका चरण हुन्; ${code(m[1] + '(…)')} बोलाउँदा मात्र चल्छन्।`,
        `创建我们自己的函数（可重复使用的步骤），名叫 <b>${esc(m[1])}</b>${args.length ? `，它接收：${args.map(code).join('、')}` : ''}。下面缩进的行是它的步骤，只有调用 ${code(m[1] + '(…)')} 时才会运行。`);
      if (FN[m[1]]) notes.push(`${code(m[1])} — ${L(FN[m[1]])}`);
    } else if ((m = /^class\s+(\w+)/.exec(s))) {
      main = say(`Create a blueprint (class) called <b>${esc(m[1])}</b>. Objects made from it share the functions defined below.`, `<b>${esc(m[1])}</b> नामको खाका (class) बनाउनुहोस्। यसबाट बनेका वस्तुले तलका function साझा गर्छन्।`, `创建一个名叫 <b>${esc(m[1])}</b> 的蓝图（类）。由它生成的对象共享下面定义的函数。`);
    } else if (/^[rbuf]?("""|''')/.test(s)) {
      main = say('A description (docstring) that explains what this function does. Python does not run it.', 'यो function ले के गर्छ भनेर बताउने विवरण (docstring)। Python ले यसलाई चलाउँदैन।', '一段说明（文档字符串），解释这个函数做什么。Python 不会运行它。');
    } else if ((m = /^for\s+(.+?)\s+in\s+(.+?):\s*(.*)$/.exec(s))) {
      phases.push('loop');
      const v = m[1].trim(), it = m[2].trim(), r = /^range\((.+)\)$/.exec(it);
      if (r && !r[1].includes(',')) main = say(`Repeat the indented lines below <b>${esc(r[1])}</b> times. ${code(v)} counts 0, 1, 2, … each time.`, `तलका indent गरिएका लाइन <b>${esc(r[1])}</b> पटक दोहोर्याउनुहोस्। ${code(v)} ले हरेक पटक 0, 1, 2, … गन्छ।`, `把下面缩进的行重复 <b>${esc(r[1])}</b> 次。${code(v)} 每次依次为 0, 1, 2, …`);
      else if (/^zip\(/.test(it)) main = say(`Walk through several lists together, side by side. Each round, ${code(v)} holds one item from each list.`, `धेरै सूची सँगसँगै हिँड्नुहोस्। हरेक पटक ${code(v)} मा हरेक सूचीको एउटा वस्तु हुन्छ।`, `同时并排遍历几个列表。每一轮，${code(v)} 分别取每个列表中的一个元素。`);
      else if (/^enumerate\(/.test(it)) main = say(`Go through every item one by one, together with its position number. Each round: ${code(v)}.`, `हरेक वस्तु उसको स्थान नम्बरसँगै एक-एक गरी हेर्नुहोस्। हरेक पटक: ${code(v)}।`, `逐个遍历每个元素及其位置编号。每一轮：${code(v)}。`);
      else main = say(`Go through every item in ${code(shorten(it))} one by one. Each time, call the current item ${code(v)} and run the indented lines below.`, `${code(shorten(it))} का हरेक वस्तु एक-एक गरी हेर्नुहोस्। हरेक पटक हालको वस्तुलाई ${code(v)} भन्नुहोस् र तलका indent गरिएका लाइन चलाउनुहोस्।`, `逐个遍历 ${code(shorten(it))} 里的每个元素。每次把当前元素叫作 ${code(v)}，并运行下面缩进的行。`);
      if (m[3]) main += ' ' + say(`Here the step to repeat is on the same line: ${code(shorten(m[3], 60))}.`, `यहाँ दोहोर्याउने चरण उही लाइनमा छ: ${code(shorten(m[3], 60))}।`, `这里要重复的步骤写在同一行：${code(shorten(m[3], 60))}。`);
    } else if ((m = /^while\s+(.+):$/.exec(s))) {
      phases.push('loop');
      main = say(`Keep repeating the indented lines below as long as ${code(m[1])} is true.`, `${code(m[1])} सत्य रहेसम्म तलका indent गरिएका लाइन दोहोर्याइरहनुहोस्।`, `只要 ${code(m[1])} 为真，就一直重复下面缩进的行。`);
    } else if ((m = /^(if|elif)\s+(.+):$/.exec(s))) {
      main = m[1] === 'if' ? say(`Check: is ${code(m[2])} true? If yes, run the indented lines below.`, `जाँच्नुहोस्: ${code(m[2])} सत्य हो? हो भने तलका indent गरिएका लाइन चलाउनुहोस्।`, `检查：${code(m[2])} 成立吗？如果成立，就运行下面缩进的行。`)
        : say(`Otherwise, if ${code(m[2])} is true, run the indented lines below.`, `नत्र, ${code(m[2])} सत्य भए तलका indent गरिएका लाइन चलाउनुहोस्।`, `否则，如果 ${code(m[2])} 成立，就运行下面缩进的行。`);
      if (/__name__/.test(m[2])) main = say('Run the lines below only when this file is run directly (not when it is imported).', 'यो फाइल सिधै चलाउँदा मात्र तलका लाइन चलाउनुहोस् (import गर्दा होइन)।', '只有直接运行这个文件时才运行下面的行（被导入时不运行）。');
    } else if (/^else\s*:$/.test(s)) {
      main = say('Otherwise (if none of the checks above were true), run the indented lines below.', 'नत्र (माथिका कुनै जाँच सत्य नभए), तलका indent गरिएका लाइन चलाउनुहोस्।', '否则（上面的检查都不成立时），运行下面缩进的行。');
    } else if (/^try\s*:$/.test(s)) {
      main = say('Try the indented lines below; if they cause an error, jump to "except" instead of crashing.', 'तलका लाइन प्रयास गर्नुहोस्; त्रुटि आए बन्द हुनुको सट्टा "except" मा जानुहोस्।', '尝试运行下面的行；如果出错，就跳到 "except"，而不是让程序崩溃。');
    } else if (/^except\b/.test(s)) {
      main = say('If an error happened above, run these lines instead.', 'माथि त्रुटि आएमा, यी लाइन चलाउनुहोस्।', '如果上面出错，就运行这些行。');
    } else if ((m = /^with\s+(.+?)(?:\s+as\s+(\w+))?:$/.exec(s))) {
      main = say(`Use ${code(shorten(m[1]))}${m[2] ? ` (called ${code(m[2])})` : ''} for the indented lines below, and tidy up automatically afterwards.`, `तलका लाइनका लागि ${code(shorten(m[1]))}${m[2] ? ` (${code(m[2])} भनिएको)` : ''} प्रयोग गर्नुहोस्, पछि आफैँ सफा हुन्छ।`, `在下面缩进的行中使用 ${code(shorten(m[1]))}${m[2] ? `（叫作 ${code(m[2])}）` : ''}，结束后自动收尾。`);
    } else if ((m = /^return\b\s*(.*)$/.exec(s))) {
      main = m[1] ? say(`Give back ${code(shorten(m[1]))} as the function's answer, and stop the function here.`, `${code(shorten(m[1]))} लाई function को उत्तरको रूपमा फर्काउनुहोस्, र function यहीँ रोक्नुहोस्।`, `把 ${code(shorten(m[1]))} 作为函数的答案返回，函数到此结束。`)
        : say('Stop the function here.', 'function यहीँ रोक्नुहोस्।', '函数到此结束。');
    } else if (/^break$/.test(s)) main = say('Stop the loop right now.', 'लुप अहिल्यै रोक्नुहोस्।', '立即停止循环。');
    else if (/^continue$/.test(s)) main = say('Skip the rest of this round and go to the next round of the loop.', 'यो पटकको बाँकी छोडेर लुपको अर्को पटकमा जानुहोस्।', '跳过这一轮剩下的部分，进入下一轮循环。');
    else if (/^pass$/.test(s)) main = say('Do nothing (a placeholder).', 'केही नगर्नुहोस् (खाली ठाउँ)।', '什么也不做（占位符）。');
    else if (/^assert\b/.test(s)) main = say('Check that something is true; stop with an error if it is not.', 'केही सत्य छ भनी जाँच्नुहोस्; नभए त्रुटि देखाएर रोकिन्छ।', '检查某件事成立；如果不成立就报错停止。');
    else if (/^print\s*\(/.test(s)) {
      phases.push('print');
      const fstr = /print\s*\(\s*f["']/.test(s);
      main = fstr ? say('Show a message on the screen. Inside an f"…" text, the parts in {curly brackets} are replaced by their values.', 'स्क्रिनमा सन्देश देखाउनुहोस्। f"…" अक्षरभित्र {घुम्ने कोष्ठक} का भाग तिनको मानले बदलिन्छन्।', '在屏幕上显示一条消息。在 f"…" 文字里，{花括号} 中的部分会被替换成它们的值。')
        : say(`Show on the screen: ${code(shorten(s.replace(/^print\s*\(|\)\s*$/g, ''), 60))}.`, `स्क्रिनमा देखाउनुहोस्: ${code(shorten(s.replace(/^print\s*\(|\)\s*$/g, ''), 60))}।`, `在屏幕上显示：${code(shorten(s.replace(/^print\s*\(|\)\s*$/g, ''), 60))}。`);
    } else {
      let ai = assignIndex(s);
      const aug = /^([\w.[\]'", :]+?)\s*([+\-*/@%]|\*\*|\/\/)=\s*(.+)$/.exec(s);
      if (aug) {
        const ops = { '+': T('Add', 'जोड्नुहोस्', '加上'), '-': T('Subtract', 'घटाउनुहोस्', '减去'), '*': T('Multiply by', 'गुणा गर्नुहोस्', '乘以'), '/': T('Divide by', 'भाग गर्नुहोस्', '除以') };
        main = say(`${t(ops[aug[2]] || T('Update', 'अद्यावधिक', '更新'))} ${code(shorten(aug[3]))} → ${code(aug[1])}. (Short for ${code(`${aug[1]} = ${aug[1]} ${aug[2]} …`)}: update the value in the box.)`,
          `${code(aug[1])} मा ${code(shorten(aug[3]))} ${t(ops[aug[2]] || T('Update', 'अद्यावधिक गर्नुहोस्', '更新'))}। (${code(`${aug[1]} = ${aug[1]} ${aug[2]} …`)} को छोटो रूप: बाकसको मान अद्यावधिक।)`,
          `把 ${code(aug[1])} ${t(ops[aug[2]] || T('Update', '更新', '更新'))} ${code(shorten(aug[3]))}。（这是 ${code(`${aug[1]} = ${aug[1]} ${aug[2]} …`)} 的简写：更新盒子里的值。）`);
        ai = -1;
      }
      if (ai > 0) {
        const lhs = s.slice(0, ai).trim(), rhs = s.slice(ai + 1).trim();
        const many = /,/.test(blankStrings(lhs)) && !/[[(]/.test(lhs);
        const lhsCode = code(lhs);
        let what;
        if (/^-?\d[\d_.e-]*$/.test(rhs)) what = say(`the number ${code(rhs)}`, `अंक ${code(rhs)}`, `数字 ${code(rhs)}`);
        else if (/^[fbr]?["']/.test(rhs) && !/\)\s*$/.test(rhs)) what = say('a piece of text', 'अक्षरको टुक्रा', '一段文字');
        else if (/^\[/.test(rhs) && / for /.test(rhs)) what = say('a new list, built in one line (a "list comprehension")', 'एकै लाइनमा बनेको नयाँ सूची ("list comprehension")', '一行代码生成的新列表（“列表推导式”）');
        else if (/^\[/.test(rhs)) what = say('a list of values', 'मानको सूची', '一个值的列表');
        else if (/^\{/.test(rhs)) what = say('a dictionary (name → value pairs)', 'dictionary (नाम → मान जोडी)', '一个字典（名字 → 值）');
        else if (/^(True|False|None)$/.test(rhs)) what = code(rhs);
        else what = say(`the result of ${code(shorten(rhs, 54))}`, `${code(shorten(rhs, 54))} को नतिजा`, `${code(shorten(rhs, 54))} 的结果`);
        if (/\[/.test(lhs) && !many) main = say(`Put ${what} into ${lhsCode} (change that item / column).`, `${what} लाई ${lhsCode} मा राख्नुहोस् (त्यो वस्तु / column बदल्नुहोस्)।`, `把 ${what} 放进 ${lhsCode}（修改这个元素/列）。`);
        else if (many) main = say(`This gives several results at once; store them in order in ${lhs.split(',').map((x) => code(x.trim())).join(', ')}.`, `यसले एकैपटक धेरै नतिजा दिन्छ; तिनलाई क्रमैसँग ${lhs.split(',').map((x) => code(x.trim())).join(', ')} मा राख्नुहोस्।`, `这一步一次给出几个结果，按顺序分别存进 ${lhs.split(',').map((x) => code(x.trim())).join('、')}。`);
        else main = say(`Calculate ${what} and store it in a box (variable) named ${lhsCode}.`, `${what} निकालेर ${lhsCode} नामको बाकस (variable) मा राख्नुहोस्।`, `计算 ${what}，并存进名叫 ${lhsCode} 的盒子（变量）。`);
        lhs.split(',').map((x) => x.trim()).forEach((v) => { if (VARS[v]) notes.push(L(VARS[v])); });
      } else if (!main) {
        const last = called[called.length - 1] || attrs[attrs.length - 1];
        const callFn = called[0];
        if (callFn && FN[callFn] && called.length === 1) main = `${code(callFn + '(…)')} ${L(FN[callFn])}.`;
        else if (/^[\w.[\]'"]+$/.test(s)) main = say(`Show the value of ${code(s)} (in a notebook, the last line is displayed automatically).`, `${code(s)} को मान देखाउनुहोस् (notebook मा अन्तिम लाइन आफैँ देखिन्छ)।`, `显示 ${code(s)} 的值（在笔记本里，最后一行会自动显示）。`);
        else if (last && (FN[last] || ATTR[last])) main = `${code(last)} — ${L(FN[last] || ATTR[last])}.`;
        else main = say(`Run ${code(shorten(s, 54))}.`, `${code(shorten(s, 54))} चलाउनुहोस्।`, `运行 ${code(shorten(s, 54))}。`);
      }
    }

    // What the functions on this line do
    const seen = new Set();
    called.forEach((n) => {
      if (PHASE_OF[n]) phases.push(PHASE_OF[n]);
      if (seen.has(n) || !FN[n] || main.includes(L(FN[n]))) return;
      if (n === 'print' && phases.includes('print') && /^print/.test(s)) return;
      seen.add(n); notes.push(`${code(n + '()')} — ${L(FN[n])}`);
    });
    attrs.forEach((n) => {
      if (PHASE_OF[n]) phases.push(PHASE_OF[n]);
      if (seen.has(n) || !ATTR[n] || main.includes(L(ATTR[n]))) return;
      seen.add(n); notes.push(`${code('.' + n)} — ${L(ATTR[n])}`);
    });
    // Keyword settings such as test_size=0.2
    [...b.matchAll(/[(,]\s*(\w+)\s*=\s*([^,)=][^,)]*)/g)].forEach(([, k, v]) => {
      if (k === 'alpha' && /\b(scatter|plot|hist|bar|barh|fill_between|imshow|contourf|axhline|axvline)\s*\(/.test(b)) { notes.push(say('alpha=…: how see-through the colour is (0 = invisible, 1 = solid)', 'alpha=…: रङ कति पारदर्शी (0 = नदेखिने, 1 = पूरा)', 'alpha=…：颜色的透明度（0 = 看不见，1 = 不透明）')); return; }
      const f = KW[k]; if (!f) return;
      const real = s.slice(s.indexOf(k + '=') + k.length + 1).split(/[,)]/)[0].trim() || v.trim();
      const r = f(real); if (r) notes.push(t(r));
    });
    // Syntax worth pointing out
    if (/\[[^\]]*:[^\]]*\]/.test(b) && !/^(for|if|elif|while|def|class|with|else|try|except)\b/.test(s)) notes.push(say('<code>[a:b]</code> takes a slice: from position a up to (not including) b. A lone <code>:</code> means "all". <code>[:, 0]</code> = every row, first column.', '<code>[a:b]</code> ले टुक्रा लिन्छ: स्थान a देखि b सम्म (b बाहेक)। एक्लो <code>:</code> को अर्थ "सबै"। <code>[:, 0]</code> = सबै row, पहिलो column।', '<code>[a:b]</code> 取一个切片：从位置 a 到 b（不含 b）。单独的 <code>:</code> 表示“全部”。<code>[:, 0]</code> = 所有行的第一列。'));
    if (/\*\*/.test(b)) notes.push(say('<code>**</code> means "to the power of": 3 ** 2 = 9.', '<code>**</code> को अर्थ "घात": 3 ** 2 = 9।', '<code>**</code> 表示“次方”：3 ** 2 = 9。'));
    if (/[\w)\]]\s*@\s*[\w(]/.test(b)) notes.push(say('<code>@</code> is matrix multiplication (multiply and add many numbers at once).', '<code>@</code> matrix गुणन हो (धेरै अंक एकैपटक गुणा गरेर जोड्ने)।', '<code>@</code> 是矩阵乘法（一次把很多数相乘再相加）。'));
    if (/\/\//.test(b)) notes.push(say('<code>//</code> divides and drops the decimals: 7 // 2 = 3.', '<code>//</code> ले भाग गरेर दशमलव हटाउँछ: 7 // 2 = 3।', '<code>//</code> 是整除，去掉小数：7 // 2 = 3。'));
    if (/[\w)\]]\s+%\s+[\w(]/.test(b)) notes.push(say('<code>%</code> gives the remainder: 7 % 2 = 1.', '<code>%</code> ले बाँकी दिन्छ: 7 % 2 = 1।', '<code>%</code> 求余数：7 % 2 = 1。'));
    if (/\blambda\b/.test(b)) notes.push(say('<code>lambda x: …</code> is a tiny one-line function.', '<code>lambda x: …</code> एक लाइनको सानो function हो।', '<code>lambda x: …</code> 是一个一行的小函数。'));
    if (/\[[^\]]* for [^\]]* in [^\]]*\]/.test(b) && !main.includes('comprehension')) notes.push(say('<code>[… for x in …]</code> builds a new list in one line, doing the same thing to every item.', '<code>[… for x in …]</code> ले हरेक वस्तुमा उही काम गरेर एकै लाइनमा नयाँ सूची बनाउँछ।', '<code>[… for x in …]</code> 对每个元素做同样的事，一行生成新列表。'));
    if (/:\.\d+f/.test(s)) notes.push(say('<code>:.2f</code> inside {…} shows the number with 2 decimal places.', '{…} भित्रको <code>:.2f</code> ले अंकलाई २ दशमलव स्थानसम्म देखाउँछ।', '{…} 里的 <code>:.2f</code> 表示显示 2 位小数。'));
    if (/(==|!=|>=|<=)/.test(b) && !/^(if|elif|while)\b/.test(s)) notes.push(say('<code>==</code> asks "is it equal?" (gives True/False); <code>!=</code> means "not equal".', '<code>==</code> ले "बराबर हो?" सोध्छ (True/False दिन्छ); <code>!=</code> को अर्थ "बराबर होइन"।', '<code>==</code> 是问“相等吗？”（得到 True/False）；<code>!=</code> 表示“不相等”。'));
    return { main, notes: [...new Set(notes)].slice(0, 5), phases };
  }

  function summary(sts) {
    const order = [];
    sts.forEach((st) => (st.phases || []).forEach((p) => { if (PHASES[p] && !order.includes(p)) order.push(p); }));
    // put the natural ML order first
    const rank = ['tools', 'data', 'explore', 'clean', 'split', 'func', 'loop', 'train', 'test', 'chart', 'print', 'save'];
    order.sort((a, b) => rank.indexOf(a) - rank.indexOf(b));
    return order;
  }

  function render(panel, src) {
    const sts = statements(src);
    if (!sts.length) { panel.innerHTML = `<p class="muted">${ui('empty')}</p>`; return; }
    sts.forEach((st) => { if (!st.comment) Object.assign(st, explain(st)); });
    const steps = summary(sts);
    const baseInd = Math.min(...sts.map((s) => s.ind));
    panel.innerHTML = `
      ${steps.length ? `<div class="cx-short"><b>${ui('short')}</b><ol>${steps.map((p) => `<li>${L(PHASES[p])}</li>`).join('')}</ol></div>` : ''}
      <details class="cx-read"><summary>${ui('read')}</summary><table>${READ.map(([c, d]) => `<tr><td>${code(c)}</td><td>${t(d)}</td></tr>`).join('')}</table></details>
      <b class="cx-h">${ui('lines')}</b>
      <ol class="cx-lines">${sts.map((st) => {
        const lvl = Math.min(4, Math.round((st.ind - baseInd) / 4));
        if (st.comment) {
          const isTask = /\b(TODO|Task|Challenge|Try)\b/i.test(st.text);
          return `<li class="cx-row cx-note ${isTask ? 'cx-task' : ''}" style="--lvl:${lvl}"><div class="cx-say">${isTask ? '✏️' : '💬'} <b>${ui(isTask ? 'task' : 'note')}:</b> ${esc(st.text)}</div></li>`;
        }
        const codeTxt = st.lines.map((l) => l.slice(Math.min(st.ind, l.match(/^\s*/)[0].length))).join('\n');
        return `<li class="cx-row" style="--lvl:${lvl}"><pre class="cx-code">${esc(codeTxt)}</pre><div class="cx-say">${lvl ? `<small class="cx-in">${ui('inside')}</small> ` : ''}${st.main}
          ${st.notes.length ? `<ul class="cx-notes">${st.notes.map((n) => `<li>${n}</li>`).join('')}</ul>` : ''}
          ${st.comments.length ? `<div class="cx-cmt">💬 ${esc(st.comments.join(' '))}</div>` : ''}</div></li>`;
      }).join('')}</ol>
      <p class="small muted">${ui('tip')}</p>`;
  }

  // ---------- Attach to every code box on the page ----------
  function attach(block) {
    if (block.dataset.cx) return;
    block.dataset.cx = '1';
    const ta = block.querySelector('textarea');
    if (!ta) return;
    const bar = h(`<div class="cx-bar"><button class="cx-btn">${ui('open')}</button><button class="cx-ask">${ui('ask')}</button></div>`);
    const panel = h('<div class="cx-panel" hidden></div>');
    block.append(bar, panel);
    const btn = bar.querySelector('.cx-btn');
    btn.onclick = () => {
      const open = panel.hidden;
      panel.hidden = !open; btn.textContent = open ? ui('close') : ui('open');
      btn.classList.toggle('on', open);
      if (open) render(panel, ta.value);
    };
    let tm = null;
    ta.addEventListener('input', () => { if (panel.hidden) return; clearTimeout(tm); tm = setTimeout(() => render(panel, ta.value), 400); });
    bar.querySelector('.cx-ask').onclick = () => {
      const c = ta.value.slice(0, 4000);
      MLS.openTutor && MLS.openTutor(t(T(
        `Please explain this Python code to me like I am a complete beginner. Go line by line in very simple words, say what each line does and why, and give an everyday example:\n\`\`\`python\n${c}\n\`\`\``,
        `कृपया यो Python कोड मलाई बिल्कुलै सुरुवाती विद्यार्थीलाई जस्तै बुझाउनुहोस्। धेरै सरल शब्दमा लाइन-लाइन गरी हरेक लाइनले के गर्छ र किन भन्नुहोस्, र दैनिक जीवनको उदाहरण दिनुहोस्:\n\`\`\`python\n${c}\n\`\`\``,
        `请像对完全的初学者一样给我讲解这段 Python 代码。用非常简单的话逐行说明每一行做什么、为什么，并举一个日常生活的例子：\n\`\`\`python\n${c}\n\`\`\``)));
    };
  }
  const scan = (root) => (root.querySelectorAll ? root.querySelectorAll('.code-block:not([data-cx])').forEach(attach) : null);
  new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
    if (n.nodeType !== 1) return;
    if (n.classList.contains('code-block')) attach(n); else scan(n);
  }))).observe(document.body, { childList: true, subtree: true });
  scan(document);
  MLS.explainCode = (src) => statements(src).map((st) => (st.comment ? st : Object.assign(st, explain(st)))); // for testing
})();

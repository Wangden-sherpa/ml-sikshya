/* ML Tutor — extra quiz questions (levels 1–2), in English, नेपाली and 中文.
   Mixed question types: "what will this code print?", "spot the bug", "which model fits?" and ideas.
   Loaded after the lesson files; it only ADDS questions after each lesson's existing quiz. */
window.addQuiz = (id, qs) => {
  const L = COURSE.lessons.find((l) => l.id === id);
  if (!L) return;
  L.quiz = L.quiz || [];
  qs.forEach(([q, opts, answer, ex]) => L.quiz.push({
    q: { en: q[0], ne: q[1], zh: q[2] },
    // options: one shared list (code / numbers) or [en list, ne list, zh list]
    options: Array.isArray(opts[0]) ? { en: opts[0], ne: opts[1], zh: opts[2] } : opts,
    answer,
    explain: { en: ex[0], ne: ex[1], zh: ex[2] },
  }));
};
const C_ = (s) => `<code>${s}</code>`;

addQuiz('what-is-ml', [
  [['Deciding if an email is spam or not spam is…', 'इमेल spam हो कि होइन छुट्याउनु…', '判断一封邮件是不是垃圾邮件属于……'],
    [['Regression', 'Clustering', 'Classification', 'Reinforcement learning'], ['रिग्रेसन', 'क्लस्टरिङ', 'क्लासिफिकेसन', 'रिइन्फोर्समेन्ट लर्निङ'], ['回归', '聚类', '分类', '强化学习']], 2,
    ['The answer is a category (spam / not spam), so it is classification.', 'उत्तर एउटा category (spam / not spam) हो, त्यसैले यो क्लासिफिकेसन हो।', '答案是一个类别（垃圾 / 非垃圾），所以是分类。']],
  [['In a house-price model, the <b>price</b> is the…', 'घरको मूल्य मोडेलमा <b>मूल्य</b> भनेको…', '在房价模型里，<b>价格</b>是……'],
    [['Label (target)', 'Feature', 'Model', 'Dataset'], ['Label (target)', 'Feature', 'मोडेल', 'डाटासेट'], ['标签（目标）', '特征', '模型', '数据集']], 0,
    ['The label is the answer we want to predict. Area and rooms are features (inputs).', 'Label भनेको हामीले अनुमान गर्न चाहेको उत्तर हो। क्षेत्रफल र कोठा feature (इनपुट) हुन्।', '标签是我们想预测的答案。面积和房间数是特征（输入）。']],
  [['Which task does NOT need machine learning?', 'कुन कामका लागि मेसिन लर्निङ चाहिँदैन?', '哪个任务不需要机器学习？'],
    [['Recognising faces in photos', 'Adding two numbers in a calculator', 'Translating Nepali to English', 'Recommending YouTube videos'], ['फोटोमा अनुहार चिन्ने', 'क्याल्कुलेटरमा दुई अंक जोड्ने', 'नेपालीलाई अङ्ग्रेजीमा अनुवाद गर्ने', 'YouTube भिडियो सिफारिस गर्ने'], ['识别照片中的人脸', '在计算器上把两个数相加', '把尼泊尔语翻译成英语', '推荐 YouTube 视频']], 1,
    ['Adding numbers follows one simple, exact rule — normal programming is enough. ML is for patterns too complex to write by hand.', 'अंक जोड्ने एउटा सरल, ठ्याक्कै नियम हो — सामान्य प्रोग्रामिङ नै पुग्छ। हातले लेख्न गाह्रो जटिल ढाँचाका लागि ML चाहिन्छ।', '加法只有一条简单精确的规则——普通编程就够了。机器学习用于那些复杂到无法手写规则的规律。']],
  [['A robot learns to walk by trying moves and getting a reward when it stays up. This is…', 'रोबोटले चाल प्रयास गर्दै र उभिइरहँदा इनाम पाउँदै हिँड्न सिक्छ। यो…', '机器人通过尝试动作、保持站立时获得奖励来学会走路。这是……'],
    [['Supervised learning', 'Unsupervised learning', 'Regression', 'Reinforcement learning'], ['सुपरभाइज्ड लर्निङ', 'अनसुपरभाइज्ड लर्निङ', 'रिग्रेसन', 'रिइन्फोर्समेन्ट लर्निङ'], ['监督学习', '无监督学习', '回归', '强化学习']], 3,
    ['Learning by trial and error with rewards is reinforcement learning.', 'इनामसहित प्रयास र गल्तीबाट सिक्नु रिइन्फोर्समेन्ट लर्निङ हो।', '通过试错和奖励来学习就是强化学习。']],
]);

addQuiz('python-basics', [
  [[`What does this print?<br>${C_('x = [10, 20, 30]<br>print(x[1])')}`, `यसले के देखाउँछ?<br>${C_('x = [10, 20, 30]<br>print(x[1])')}`, `这段代码打印什么？<br>${C_('x = [10, 20, 30]<br>print(x[1])')}`],
    ['10', '20', '30', 'Error'], 1,
    ['Python counts from 0, so x[0] is 10 and x[1] is 20.', 'Python ले ० बाट गन्छ, त्यसैले x[0] = 10 र x[1] = 20।', 'Python 从 0 开始数，所以 x[0] 是 10，x[1] 是 20。']],
  [[`What does this print?<br>${C_('for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)')}`, `यसले के देखाउँछ?<br>${C_('for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)')}`, `这段代码打印什么？<br>${C_('for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(i)')}`],
    ['1 2 3', '0 1 2 3', '0 1 2', '3'], 2,
    ['range(3) gives 0, 1, 2 — three numbers, starting at 0 and stopping before 3.', 'range(3) ले 0, 1, 2 दिन्छ — ० बाट सुरु भएर ३ भन्दा अघि रोकिने तीन अंक।', 'range(3) 给出 0, 1, 2——从 0 开始、在 3 之前停止的三个数。']],
  [[`Spot the bug:<br>${C_('if score &gt; 50<br>&nbsp;&nbsp;&nbsp;&nbsp;print("pass")')}`, `गल्ती खोज्नुहोस्:<br>${C_('if score &gt; 50<br>&nbsp;&nbsp;&nbsp;&nbsp;print("pass")')}`, `找出错误：<br>${C_('if score &gt; 50<br>&nbsp;&nbsp;&nbsp;&nbsp;print("pass")')}`],
    [['The ":" is missing after the condition', 'print must be written Print', 'score must be in quotes', 'Nothing is wrong'], ['सर्तपछि ":" छुटेको छ', 'print लाई Print लेख्नुपर्छ', 'score उद्धरण चिन्हभित्र हुनुपर्छ', 'केही गल्ती छैन'], ['条件后面少了 ":"', 'print 必须写成 Print', 'score 必须加引号', '没有错误']], 0,
    ['Every if / for / def line must end with ":" — it tells Python the indented block starts.', 'हरेक if / for / def लाइन ":" मा अन्त्य हुनुपर्छ — यसले indent गरिएको ब्लक सुरु भयो भनेर Python लाई बताउँछ।', '每个 if / for / def 行都必须以 ":" 结尾——它告诉 Python 缩进的代码块开始了。']],
  [[`${C_('d = {"name": "Sita", "age": 20}')}<br>How do you get Sita's age?`, `${C_('d = {"name": "Sita", "age": 20}')}<br>सीताको उमेर कसरी निकाल्ने?`, `${C_('d = {"name": "Sita", "age": 20}')}<br>怎样取出 Sita 的年龄？`],
    ['d.age', 'd[1]', 'd(age)', 'd["age"]'], 3,
    ['A dictionary is looked up by its key in square brackets: d["age"] → 20.', 'Dictionary मा कोष्ठकभित्र key लेखेर खोजिन्छ: d["age"] → 20।', '字典用方括号加键来查找：d["age"] → 20。']],
]);

addQuiz('numpy', [
  [[`What does this print?<br>${C_('a = np.array([1, 2, 3])<br>print(a * 2)')}`, `यसले के देखाउँछ?<br>${C_('a = np.array([1, 2, 3])<br>print(a * 2)')}`, `这段代码打印什么？<br>${C_('a = np.array([1, 2, 3])<br>print(a * 2)')}`],
    ['[1, 2, 3, 1, 2, 3]', '[2 4 6]', '6', 'Error'], 1,
    ['NumPy does maths on every element at once. (A normal Python list would repeat itself instead.)', 'NumPy ले हरेक element मा एकैपटक गणित गर्छ। (साधारण Python list भए दोहोरिन्थ्यो।)', 'NumPy 会同时对每个元素做运算。（普通 Python 列表则会把自己重复一遍。）']],
  [[`What is ${C_('np.zeros((2, 3)).shape')}?`, `${C_('np.zeros((2, 3)).shape')} के हो?`, `${C_('np.zeros((2, 3)).shape')} 是什么？`],
    ['(3, 2)', '6', '(2, 3)', '(2,)'], 2,
    ['shape is (rows, columns): 2 rows and 3 columns.', 'shape भनेको (row, column) हो: २ row र ३ column।', 'shape 是（行，列）：2 行 3 列。']],
  [[`What does ${C_('np.array([4, 9, 1]).argmax()')} give?`, `${C_('np.array([4, 9, 1]).argmax()')} ले के दिन्छ?`, `${C_('np.array([4, 9, 1]).argmax()')} 的结果是？`],
    ['9', '1', '2', '0'], 1,
    ['argmax gives the POSITION of the biggest value. 9 is at position 1 (counting from 0).', 'argmax ले सबैभन्दा ठूलो मानको स्थान दिन्छ। 9 स्थान 1 मा छ (० बाट गन्दा)।', 'argmax 给出最大值的位置。9 在位置 1（从 0 开始数）。']],
  [['Why do ML libraries use NumPy arrays instead of normal lists?', 'ML library हरूले साधारण list को सट्टा NumPy array किन प्रयोग गर्छन्?', '为什么机器学习库用 NumPy 数组而不用普通列表？'],
    [['Arrays can store text only', 'Lists cannot hold numbers', 'Arrays look nicer when printed', 'Arrays do maths on many numbers at once, very fast'], ['Array ले अक्षर मात्र राख्छ', 'List ले अंक राख्न सक्दैन', 'Array छाप्दा राम्रो देखिन्छ', 'Array ले धेरै अंकमा एकैपटक, धेरै छिटो गणित गर्छ'], ['数组只能存文字', '列表不能存数字', '数组打印出来更好看', '数组能一次对很多数字做运算，非常快']], 3,
    ['NumPy runs maths on whole arrays in fast compiled code — often 10–100× faster than a Python loop.', 'NumPy ले पूरै array मा छिटो compiled कोडमा गणित गर्छ — Python लुपभन्दा प्रायः १०–१०० गुणा छिटो।', 'NumPy 用快速的编译代码对整个数组做运算——通常比 Python 循环快 10–100 倍。']],
]);

addQuiz('pandas', [
  [[`What does ${C_('df.head()')} show?`, `${C_('df.head()')} ले के देखाउँछ?`, `${C_('df.head()')} 显示什么？`],
    [['The first 5 rows of the table', 'Only the column names', 'The last row', 'The average of every column'], ['तालिकाका पहिला ५ row', 'Column का नाम मात्र', 'अन्तिम row', 'हरेक column को औसत'], ['表格的前 5 行', '只有列名', '最后一行', '每列的平均值']], 0,
    ['head() is a quick first look: the first 5 rows (head(10) shows 10).', 'head() पहिलो झलक हो: पहिला ५ row (head(10) ले १० देखाउँछ)।', 'head() 是快速浏览：前 5 行（head(10) 显示 10 行）。']],
  [['How do you select the <b>price</b> column?', '<b>price</b> column कसरी छान्ने?', '怎样选出 <b>price</b> 列？'],
    ['df.price()', 'df[price]', 'df["price"]', 'df(price)'], 2,
    ['Put the column name, as text in quotes, inside square brackets.', 'Column को नाम उद्धरण चिन्हभित्र अक्षरको रूपमा, कोष्ठकभित्र राख्नुहोस्।', '把列名用引号写成文字，放进方括号里。']],
  [[`What does ${C_('df[df["age"] &gt; 30]')} do?`, `${C_('df[df["age"] &gt; 30]')} ले के गर्छ?`, `${C_('df[df["age"] &gt; 30]')} 做什么？`],
    [['Adds 30 to every age', 'Keeps only the rows where age is more than 30', 'Deletes the age column', 'Sorts the table by age'], ['हरेक उमेरमा ३० जोड्छ', 'उमेर ३० भन्दा बढी भएका row मात्र राख्छ', 'age column मेटाउँछ', 'उमेरअनुसार तालिका मिलाउँछ'], ['给每个年龄加 30', '只保留年龄大于 30 的行', '删除 age 列', '按年龄排序']], 1,
    ['The inside makes True/False for each row; the outer df[...] keeps the True rows. This is called filtering.', 'भित्रको भागले हरेक row का लागि True/False बनाउँछ; बाहिरको df[...] ले True row मात्र राख्छ। यसलाई filtering भनिन्छ।', '里面为每一行生成 True/False，外面的 df[...] 只保留 True 的行。这叫筛选。']],
  [['How do you count the missing values in each column?', 'हरेक column मा छुटेका मान कसरी गन्ने?', '怎样数出每列有多少缺失值？'],
    ['df.missing()', 'df.count()', 'df.head()', 'df.isna().sum()'], 3,
    ['isna() marks missing cells as True, and sum() counts the Trues in each column.', 'isna() ले छुटेका cell लाई True बनाउँछ, र sum() ले हरेक column का True गन्छ।', 'isna() 把缺失的格子标为 True，sum() 数出每列有多少个 True。']],
]);

addQuiz('visualization', [
  [['Which chart best shows how two number columns relate (e.g. study hours vs marks)?', 'दुई अंकका column को सम्बन्ध (जस्तै पढेको घण्टा र अंक) देखाउन कुन चार्ट उत्तम?', '哪种图最能展示两列数字之间的关系（例如学习时长和分数）？'],
    [['Pie chart', 'Bar chart', 'Scatter plot', 'A text table'], ['Pie चार्ट', 'Bar चार्ट', 'Scatter plot', 'अक्षरको तालिका'], ['饼图', '柱状图', '散点图', '文字表格']], 2,
    ['A scatter plot puts one dot per student, so you can see the trend between the two numbers.', 'Scatter plot मा हरेक विद्यार्थीको एउटा थोप्लो हुन्छ, त्यसैले दुई अंकबीचको प्रवृत्ति देखिन्छ।', '散点图为每个学生画一个点，能看出两个数字之间的趋势。']],
  [['To see how ONE column is spread out (e.g. all students\' heights), use a…', 'एउटा column कसरी फैलिएको छ (जस्तै सबै विद्यार्थीको उचाइ) हेर्न…', '要看一列数据的分布（例如所有学生的身高），用……'],
    [['Line chart', 'Histogram', 'Pie chart', 'Map'], ['Line चार्ट', 'Histogram', 'Pie चार्ट', 'नक्सा'], ['折线图', '直方图', '饼图', '地图']], 1,
    ['A histogram counts how many values fall into each range — it shows the shape of the data.', 'Histogram ले हरेक दायरामा कति मान पर्छन् गन्छ — डाटाको आकार देखाउँछ।', '直方图统计每个区间有多少个值——展示数据的形状。']],
  [['Your plotting code runs with no error, but no chart appears. What is most likely missing?', 'तपाईंको चार्ट कोड त्रुटि बिना चल्छ, तर चार्ट देखिँदैन। के छुटेको हुन सक्छ?', '画图代码运行没报错，但没有出现图。最可能少了什么？'],
    ['import numpy', 'print(plt)', 'plt.title()', 'plt.show()'], 3,
    ['plt.show() is what actually displays the chart.', 'plt.show() ले नै चार्ट देखाउँछ।', 'plt.show() 才会真正把图显示出来。']],
  [['A bar chart\'s y-axis starts at 95 instead of 0, so a tiny difference looks huge. This chart is…', 'Bar चार्टको y-अक्ष ० को सट्टा ९५ बाट सुरु हुन्छ, त्यसैले सानो फरक पनि ठूलो देखिन्छ। यो चार्ट…', '柱状图的 y 轴从 95 而不是 0 开始，于是很小的差别看起来很大。这张图……'],
    [['Misleading', 'Perfect', 'A histogram', 'Unsupervised'], ['भ्रमपूर्ण', 'उत्तम', 'Histogram', 'अनसुपरभाइज्ड'], ['有误导性', '完美', '是直方图', '是无监督的']], 0,
    ['Bar lengths should start at 0, otherwise the picture exaggerates the difference.', 'Bar को लम्बाइ ० बाट सुरु हुनुपर्छ, नत्र चित्रले फरकलाई बढाइचढाइ गर्छ।', '柱子的长度应从 0 开始，否则图会夸大差别。']],
]);

addQuiz('math-intuition', [
  [['What is the mean (average) of 2, 4, 6, 8?', '2, 4, 6, 8 को औसत (mean) कति?', '2、4、6、8 的平均数是多少？'],
    ['4', '5', '6', '20'], 1,
    ['Add them (20) and divide by how many there are (4): 20 ÷ 4 = 5.', 'जोड्नुहोस् (20) र संख्याले भाग गर्नुहोस् (4): 20 ÷ 4 = 5।', '相加得 20，再除以个数 4：20 ÷ 4 = 5。']],
  [['In ML, the slope (derivative) of the error tells us…', 'ML मा गल्तीको slope (derivative) ले बताउँछ…', '在机器学习中，误差的斜率（导数）告诉我们……'],
    [['How many rows the data has', 'The final accuracy', 'Which way to change a weight to reduce the error, and how fast the error changes', 'The colour of the chart'], ['डाटामा कति row छन्', 'अन्तिम accuracy', 'गल्ती घटाउन weight कतातिर बदल्ने, र गल्ती कति छिटो बदलिन्छ', 'चार्टको रङ'], ['数据有多少行', '最终的准确率', '为了减小误差，权重该往哪个方向改，以及误差变化有多快', '图的颜色']], 2,
    ['The slope says how fast something changes. Training follows the slope downhill to make the error smaller.', 'Slope ले कुनै कुरा कति छिटो बदलिन्छ भन्छ। तालिमले गल्ती घटाउन slope को ओरालो पछ्याउँछ।', '斜率表示变化有多快。训练沿着斜率往下走，让误差变小。']],
  [['A model says "rain probability = 0.8". This means…', 'मोडेलले भन्छ "पानी पर्ने सम्भावना = 0.8"। यसको अर्थ…', '模型说“下雨概率 = 0.8”。意思是……'],
    [['In similar situations it rains about 80 times out of 100', 'It will rain for 8 hours', 'It will rain 0.8 mm', 'It will certainly rain'], ['यस्तै अवस्थामा १०० मध्ये करिब ८० पटक पानी पर्छ', '८ घण्टा पानी पर्छ', '0.8 mm पानी पर्छ', 'पक्कै पानी पर्छ'], ['在类似情况下，100 次中大约有 80 次会下雨', '会下 8 小时雨', '会下 0.8 毫米雨', '一定会下雨']], 0,
    ['A probability between 0 and 1 says how likely something is: 0.8 = 80% chance, not a certainty.', '0 र 1 बीचको सम्भावनाले कुनै कुरा हुने कति सम्भावना छ भन्छ: 0.8 = ८०% सम्भावना, पक्का होइन।', '0 到 1 之间的概率表示可能性有多大：0.8 = 80% 的可能，不是一定。']],
  [['What is the dot product of [1, 2] and [3, 4]?', '[1, 2] र [3, 4] को dot product कति?', '[1, 2] 和 [3, 4] 的点积是多少？'],
    ['10', '7', '24', '11'], 3,
    ['Multiply matching numbers and add: 1×3 + 2×4 = 3 + 8 = 11. Every neuron does this!', 'मिल्दा अंक गुणा गरेर जोड्नुहोस्: 1×3 + 2×4 = 3 + 8 = 11। हरेक neuron ले यही गर्छ!', '对应位置相乘再相加：1×3 + 2×4 = 3 + 8 = 11。每个神经元都在做这件事！']],
]);

addQuiz('linear-regression', [
  [['A model learned <b>y = 2x + 3</b>. What does it predict when x = 5?', 'मोडेलले <b>y = 2x + 3</b> सिक्यो। x = 5 हुँदा यसले के अनुमान गर्छ?', '模型学到了 <b>y = 2x + 3</b>。当 x = 5 时它预测多少？'],
    ['10', '11', '13', '25'], 2,
    ['2 × 5 + 3 = 13.', '2 × 5 + 3 = 13।', '2 × 5 + 3 = 13。']],
  [['When you call <code>.fit(X, y)</code> on LinearRegression, it finds…', 'LinearRegression मा <code>.fit(X, y)</code> गर्दा यसले खोज्छ…', '对 LinearRegression 调用 <code>.fit(X, y)</code> 时，它会找出……'],
    [['The biggest value in y', 'The weight and bias that make the line\'s errors as small as possible', 'The number of rows in X', 'A random line'], ['y को सबैभन्दा ठूलो मान', 'रेखाको गल्ती सकेसम्म सानो बनाउने weight र bias', 'X मा कति row छन्', 'Random रेखा'], ['y 中的最大值', '让直线误差尽可能小的权重和偏置', 'X 的行数', '一条随机的直线']], 1,
    ['Training = finding w and b for the best-fitting line (the smallest squared errors).', 'तालिम = सबैभन्दा मिल्ने रेखाका लागि w र b खोज्नु (सबैभन्दा सानो वर्ग गल्ती)।', '训练 = 找出最佳拟合直线的 w 和 b（平方误差最小）。']],
  [['A model has R² = 0.95. This means…', 'मोडेलको R² = 0.95 छ। यसको अर्थ…', '模型的 R² = 0.95，意思是……'],
    [['It explains about 95% of the variation in the answers', 'It is wrong 95% of the time', 'It has 95 features', 'It took 0.95 seconds'], ['उत्तरको भिन्नताको करिब ९५% बुझाउँछ', '९५% समय गलत हुन्छ', 'यसमा ९५ feature छन्', '०.९५ सेकेन्ड लाग्यो'], ['它解释了答案中约 95% 的变化', '它 95% 的时候是错的', '它有 95 个特征', '它用了 0.95 秒']], 0,
    ['R² near 1 means the line fits the data very well; 0 means no better than always guessing the average.', '1 नजिकको R² ले रेखा डाटामा धेरै राम्ररी मिल्छ भन्छ; 0 भनेको सधैँ औसत अड्कल गर्नुभन्दा राम्रो छैन।', 'R² 接近 1 表示直线拟合得很好；0 表示不比总是猜平均值更好。']],
  [['Should you use LinearRegression to predict spam / not spam?', 'Spam / not spam अनुमान गर्न LinearRegression प्रयोग गर्ने?', '预测垃圾/非垃圾邮件，应该用 LinearRegression 吗？'],
    [['Yes, it works for everything', 'Yes, but only with 2 features', 'Only if the data is small', 'No — that is classification; use logistic regression'], ['हो, यो सबैमा चल्छ', 'हो, तर २ feature मात्र भए', 'डाटा सानो भए मात्र', 'होइन — त्यो क्लासिफिकेसन हो; logistic regression प्रयोग गर्नुहोस्'], ['是的，它什么都能做', '是的，但只能有 2 个特征', '只有数据很少时才行', '不行——那是分类问题，应该用逻辑回归']], 3,
    ['Linear regression predicts numbers. For categories, use a classifier such as logistic regression.', 'Linear regression ले अंक अनुमान गर्छ। Category का लागि logistic regression जस्तो classifier प्रयोग गर्नुहोस्।', '线性回归预测数值。预测类别要用分类器，比如逻辑回归。']],
]);

addQuiz('gradient-descent', [
  [['The learning rate is far too BIG. What usually happens?', 'Learning rate धेरै ठूलो छ। प्रायः के हुन्छ?', '学习率太大了，通常会怎样？'],
    [['Training becomes perfect', 'The loss jumps around or grows instead of going down', 'Training becomes very slow but steady', 'Nothing changes'], ['तालिम पूर्ण हुन्छ', 'Loss घट्नुको सट्टा उफ्रन्छ वा बढ्छ', 'तालिम धेरै ढिलो तर स्थिर हुन्छ', 'केही बदलिँदैन'], ['训练变得完美', '损失上下乱跳甚至变大，而不是下降', '训练变得很慢但很稳定', '什么都不变']], 1,
    ['Steps that are too big jump over the bottom of the valley, so the loss bounces or explodes.', 'धेरै ठूला पाइलाले बेँसीको फेद नाघ्छन्, त्यसैले loss उफ्रन्छ वा बढ्छ।', '步子太大会跨过谷底，所以损失来回跳甚至爆炸。']],
  [['The learning rate is far too SMALL. What happens?', 'Learning rate धेरै सानो छ। के हुन्छ?', '学习率太小了，会怎样？'],
    [['The loss explodes', 'The model forgets the data', 'Training is very slow — it needs many, many steps', 'It finishes in one step'], ['Loss विस्फोट हुन्छ', 'मोडेलले डाटा बिर्सन्छ', 'तालिम धेरै ढिलो हुन्छ — धेरै धेरै पाइला चाहिन्छ', 'एउटै पाइलामा सकिन्छ'], ['损失爆炸', '模型忘掉数据', '训练非常慢——需要非常多步', '一步就完成']], 2,
    ['Tiny steps go in the right direction but take forever to reach the bottom.', 'साना पाइला सही दिशामा जान्छन् तर फेदसम्म पुग्न धेरै समय लाग्छ।', '小步子方向是对的，但要走很久才能到谷底。']],
  [['Why do we move the weights in the OPPOSITE direction of the gradient?', 'हामी weight लाई gradient को उल्टो दिशामा किन सार्छौं?', '为什么要把权重往梯度的相反方向移动？'],
    [['The gradient points uphill (where the error grows), so we step downhill', 'Because the gradient is always negative', 'To make the model bigger', 'It is just a tradition'], ['Gradient ले उकालो (गल्ती बढ्ने ठाउँ) देखाउँछ, त्यसैले हामी ओरालो जान्छौं', 'किनभने gradient सधैँ ऋणात्मक हुन्छ', 'मोडेल ठूलो बनाउन', 'यो परम्परा मात्र हो'], ['梯度指向上坡（误差变大的方向），所以我们往下坡走', '因为梯度总是负的', '为了让模型变大', '只是一种习惯']], 0,
    ['The gradient points to where the loss increases fastest. Going the other way reduces the loss.', 'Gradient ले loss सबैभन्दा छिटो बढ्ने दिशा देखाउँछ। उल्टो गए loss घट्छ।', '梯度指向损失增长最快的方向，反着走就能减小损失。']],
  [[`w = 1.0, lr = 0.1, grad = 2.0. After ${C_('w = w - lr * grad')}, what is w?`, `w = 1.0, lr = 0.1, grad = 2.0। ${C_('w = w - lr * grad')} पछि w कति?`, `w = 1.0，lr = 0.1，grad = 2.0。执行 ${C_('w = w - lr * grad')} 后 w 是多少？`],
    ['1.2', '2.0', '0.2', '0.8'], 3,
    ['0.1 × 2.0 = 0.2, and 1.0 − 0.2 = 0.8. That is one gradient-descent step.', '0.1 × 2.0 = 0.2, र 1.0 − 0.2 = 0.8। यो gradient descent को एउटा पाइला हो।', '0.1 × 2.0 = 0.2，1.0 − 0.2 = 0.8。这就是梯度下降的一步。']],
]);

addQuiz('logistic-regression', [
  [['Logistic regression\'s output is always…', 'Logistic regression को आउटपुट सधैँ…', '逻辑回归的输出总是……'],
    [['A whole number', 'Between 0 and 1 (a probability)', 'Bigger than 100', 'A word'], ['पूर्णाङ्क', '0 र 1 बीच (सम्भावना)', '100 भन्दा ठूलो', 'एउटा शब्द'], ['整数', '0 到 1 之间（概率）', '大于 100', '一个词']], 1,
    ['The sigmoid squashes the score into 0 … 1, so it can be read as a probability.', 'Sigmoid ले अंकलाई 0 … 1 मा खुम्च्याउँछ, सम्भावनाको रूपमा पढ्न सकिन्छ।', 'sigmoid 把分数压缩到 0 … 1，可以当作概率来读。']],
  [['What is sigmoid(0)?', 'sigmoid(0) कति हो?', 'sigmoid(0) 等于多少？'],
    ['0', '1', '0.5', '-1'], 2,
    ['1 / (1 + e⁰) = 1 / 2 = 0.5 — exactly in the middle, the model is 50/50.', '1 / (1 + e⁰) = 1 / 2 = 0.5 — ठीक बीचमा, मोडेल ५०/५० छ।', '1 / (1 + e⁰) = 1 / 2 = 0.5——正好在中间，模型五五开。']],
  [['With a 0.5 threshold, the model gives p = 0.73 for "pass". It predicts…', '0.5 threshold मा मोडेलले "पास" का लागि p = 0.73 दिन्छ। यसले अनुमान गर्छ…', '阈值为 0.5 时，模型给“及格”的概率 p = 0.73。它预测……'],
    [['Pass', 'Fail', 'Nothing — it is unsure', '0.5'], ['पास', 'फेल', 'केही होइन — अनिश्चित छ', '0.5'], ['及格', '不及格', '什么都不预测——它不确定', '0.5']], 0,
    ['0.73 is above the 0.5 threshold, so the answer is "pass" (class 1).', '0.73 ले 0.5 threshold नाघ्छ, त्यसैले उत्तर "पास" (class 1)।', '0.73 高于阈值 0.5，所以答案是“及格”（类别 1）。']],
  [['Despite its name, logistic regression is used for…', 'नाम जे भए पनि, logistic regression प्रयोग हुन्छ…', '虽然名字里有“回归”，逻辑回归其实用于……'],
    [['Predicting prices', 'Clustering', 'Drawing charts', 'Classification (yes/no, A/B)'], ['मूल्य अनुमान गर्न', 'क्लस्टरिङका लागि', 'चार्ट बनाउन', 'क्लासिफिकेसन (हो/होइन, A/B) का लागि'], ['预测价格', '聚类', '画图', '分类（是/否，A/B）']], 3,
    ['It predicts the probability of a class — a classification model.', 'यसले कुनै class को सम्भावना अनुमान गर्छ — क्लासिफिकेसन मोडेल।', '它预测属于某个类别的概率——是分类模型。']],
]);

addQuiz('knn', [
  [['k = 5. The 5 nearest neighbours are 3 🔴 and 2 🔵. The prediction is…', 'k = 5। ५ नजिकका छिमेकी ३ 🔴 र २ 🔵 छन्। अनुमान…', 'k = 5。最近的 5 个邻居是 3 个 🔴 和 2 个 🔵。预测结果是……'],
    [['🔵 Blue', 'Half red, half blue', '🔴 Red', 'Nothing'], ['🔵 निलो', 'आधा रातो, आधा निलो', '🔴 रातो', 'केही होइन'], ['🔵 蓝', '一半红一半蓝', '🔴 红', '无法预测']], 2,
    ['The neighbours vote and the majority wins: 3 red beats 2 blue.', 'छिमेकीले भोट दिन्छन् र बहुमत जित्छ: ३ रातोले २ निलोलाई जित्छ।', '邻居投票，多数获胜：3 红胜过 2 蓝。']],
  [['Why should you scale features before KNN (e.g. salary in rupees vs age in years)?', 'KNN अघि feature किन scale गर्ने (जस्तै रुपैयाँमा तलब र वर्षमा उमेर)?', '为什么用 KNN 前要缩放特征（例如以卢比计的工资和以年计的年龄）？'],
    [['Scaling makes the data smaller to download', 'Otherwise the big-number feature (salary) decides all the distances', 'KNN cannot read decimals', 'It is not needed'], ['Scale गर्दा डाटा डाउनलोड गर्न सानो हुन्छ', 'नत्र ठूलो अंकको feature (तलब) ले सबै दूरी निर्णय गर्छ', 'KNN ले दशमलव पढ्न सक्दैन', 'आवश्यक छैन'], ['缩放让数据下载更小', '否则数值大的特征（工资）会决定所有距离', 'KNN 不能读小数', '不需要']], 1,
    ['KNN measures distance. A difference of 10,000 rupees would drown out a difference of 10 years unless both are scaled.', 'KNN ले दूरी नाप्छ। Scale नगरे १०,००० रुपैयाँको फरकले १० वर्षको फरकलाई डुबाइदिन्छ।', 'KNN 计算距离。不缩放的话，1 万卢比的差距会淹没 10 岁的差距。']],
  [['With k = 1 the model…', 'k = 1 हुँदा मोडेल…', 'k = 1 时，模型……'],
    [['Follows every single point, even noise — it can overfit', 'Always predicts the most common class', 'Cannot make predictions', 'Becomes a decision tree'], ['हरेक बिन्दु, noise समेत, पछ्याउँछ — overfit हुन सक्छ', 'सधैँ सबैभन्दा धेरै भएको class अनुमान गर्छ', 'अनुमान गर्न सक्दैन', 'Decision tree बन्छ'], ['紧跟每一个点，连噪声也跟——可能过拟合', '总是预测最常见的类别', '无法预测', '变成决策树']], 0,
    ['One neighbour = copy the closest point. A single odd point can flip the answer. Bigger k is smoother.', 'एउटा छिमेकी = सबैभन्दा नजिकको बिन्दु नक्कल। एउटा अनौठो बिन्दुले उत्तर पल्टाउन सक्छ। ठूलो k चिल्लो हुन्छ।', '一个邻居 = 照抄最近的点。一个怪点就能改变答案。k 越大越平滑。']],
  [['Training KNN is instant, but predicting can be slow. Why?', 'KNN को तालिम तुरुन्तै हुन्छ, तर अनुमान ढिलो हुन सक्छ। किन?', 'KNN 训练瞬间完成，预测却可能很慢。为什么？'],
    [['It trains on a GPU', 'The model is very deep', 'It downloads data during prediction', 'Training only stores the data; each prediction compares with every stored point'], ['यो GPU मा तालिम हुन्छ', 'मोडेल धेरै गहिरो छ', 'अनुमानका बेला डाटा डाउनलोड गर्छ', 'तालिमले डाटा मात्र राख्छ; हरेक अनुमानमा सबै राखिएका बिन्दुसँग तुलना हुन्छ'], ['它在 GPU 上训练', '模型很深', '预测时要下载数据', '训练只是存下数据；每次预测都要和所有存下的点比较']], 3,
    ['KNN is "lazy": all the work happens at prediction time, measuring distances to every example.', 'KNN "अल्छी" हो: सबै काम अनुमानको बेला हुन्छ, हरेक उदाहरणसम्मको दूरी नाप्दा।', 'KNN 是“懒惰”的：所有工作都在预测时进行，要测量到每个例子的距离。']],
]);

addQuiz('decision-trees', [
  [['How does a decision tree split the data?', 'Decision tree ले डाटा कसरी बाँड्छ?', '决策树怎样划分数据？'],
    [['With yes/no questions about one feature at a time (e.g. "age > 30?")', 'By drawing one straight line', 'By averaging all rows', 'Randomly'], ['एकपटकमा एउटा feature बारे हो/होइन प्रश्नले (जस्तै "उमेर > 30?")', 'एउटा सीधा रेखा कोरेर', 'सबै row को औसत निकालेर', 'Random रूपमा'], ['每次就一个特征问“是/否”问题（例如“年龄 > 30？”）', '画一条直线', '把所有行取平均', '随机地']], 0,
    ['Each node asks one question and sends the row left or right — like a flowchart.', 'हरेक node ले एउटा प्रश्न सोधेर row लाई बायाँ वा दायाँ पठाउँछ — flowchart जस्तै।', '每个节点问一个问题，把这一行送到左边或右边——就像流程图。']],
  [['A tree with no max_depth limit gets 100% on training data but 70% on test data. What happened?', 'max_depth सीमा नभएको रूखले तालिम डाटामा १००% तर परीक्षणमा ७०% पायो। के भयो?', '没有 max_depth 限制的树在训练集上 100%，测试集上 70%。发生了什么？'],
    [['Underfitting', 'Overfitting — it memorised the training data', 'The test data is wrong', 'Perfect model'], ['Underfitting', 'Overfitting — तालिम डाटा कण्ठ गर्यो', 'परीक्षण डाटा गलत छ', 'उत्तम मोडेल'], ['欠拟合', '过拟合——它把训练数据背下来了', '测试数据错了', '完美的模型']], 1,
    ['A very deep tree can ask so many questions that it memorises every example. Limit max_depth to fix it.', 'धेरै गहिरो रूखले यति धेरै प्रश्न सोध्छ कि हरेक उदाहरण कण्ठ गर्छ। max_depth सीमित गरेर सुधार्नुहोस्।', '太深的树会问非常多问题，把每个例子都背下来。限制 max_depth 来解决。']],
  [['What is a big advantage of decision trees?', 'Decision tree को ठूलो फाइदा के हो?', '决策树的一大优点是什么？'],
    [['They never overfit', 'They need no data', 'They are easy to read and explain to people', 'They are always the most accurate'], ['कहिल्यै overfit हुँदैनन्', 'डाटा चाहिँदैन', 'पढ्न र मानिसलाई बुझाउन सजिलो', 'सधैँ सबैभन्दा सही'], ['从不过拟合', '不需要数据', '容易读懂，也容易向别人解释', '总是最准确']], 2,
    ['You can follow the questions from top to bottom and see exactly why a prediction was made.', 'माथिदेखि तलसम्म प्रश्न पछ्याएर अनुमान किन भयो ठ्याक्कै देख्न सकिन्छ।', '你可以从上到下跟着问题走，清楚看到为什么做出这个预测。']],
  [['Do decision trees need feature scaling (like StandardScaler)?', 'Decision tree लाई feature scaling (StandardScaler जस्तो) चाहिन्छ?', '决策树需要特征缩放（比如 StandardScaler）吗？'],
    [['Yes, always', 'Only for text', 'Only with more than 10 features', 'No — each question looks at one feature on its own'], ['हो, सधैँ', 'अक्षरका लागि मात्र', '१० भन्दा बढी feature भए मात्र', 'होइन — हरेक प्रश्नले एउटा feature मात्र हेर्छ'], ['需要，总是要', '只有文字需要', '超过 10 个特征才需要', '不需要——每个问题只看一个特征']], 3,
    ['"Is salary > 50,000?" works the same whatever the units, so scaling does not change a tree.', '"तलब > ५०,००० ?" जुनसुकै एकाइमा उस्तै काम गर्छ, त्यसैले scaling ले रूख बदल्दैन।', '“工资 > 50000？”不管单位是什么都一样，所以缩放不会改变树。']],
]);

addQuiz('random-forest', [
  [['Where does the "random" in random forest come from?', 'Random forest को "random" कहाँबाट आउँछ?', '随机森林里的“随机”来自哪里？'],
    [['The predictions are random', 'Each tree learns from a random sample of rows and features', 'The trees are planted in random order', 'The labels are shuffled'], ['अनुमान random हुन्छन्', 'हरेक रूखले row र feature को random नमूनाबाट सिक्छ', 'रूखहरू random क्रममा रोपिन्छन्', 'Label फेरबदल गरिन्छन्'], ['预测是随机的', '每棵树从随机抽取的行和特征中学习', '树按随机顺序种下', '标签被打乱']], 1,
    ['Different random samples make the trees different, so their mistakes cancel out when they vote.', 'फरक random नमूनाले रूखलाई फरक बनाउँछ, त्यसैले भोट दिँदा तिनका गल्ती एकअर्कालाई काट्छन्।', '不同的随机样本让每棵树各不相同，投票时错误会互相抵消。']],
  [['Compared with one decision tree, a random forest usually…', 'एउटा decision tree को तुलनामा random forest प्रायः…', '与单棵决策树相比，随机森林通常……'],
    [['Overfits less and predicts better on new data', 'Is easier to draw on paper', 'Trains faster', 'Needs no data'], ['कम overfit हुन्छ र नयाँ डाटामा राम्रो अनुमान गर्छ', 'कागजमा कोर्न सजिलो', 'छिटो तालिम हुन्छ', 'डाटा चाहिँदैन'], ['过拟合更少，对新数据预测更好', '更容易画在纸上', '训练更快', '不需要数据']], 0,
    ['Many trees voting together are more stable than one tree — "the wisdom of the crowd".', 'धेरै रूख सँगै भोट दिँदा एउटा रूखभन्दा स्थिर हुन्छ — "भीडको बुद्धि"।', '很多树一起投票比一棵树更稳定——“群体的智慧”。']],
  [['A forest for classification gets these tree votes: cat, dog, cat, cat, dog. The answer is…', 'Classification forest का रूखले यस्तो भोट दिए: cat, dog, cat, cat, dog। उत्तर…', '一个分类森林的各棵树投票：cat、dog、cat、cat、dog。答案是……'],
    ['dog', 'cat and dog', 'cat', '3'], 2,
    ['Majority vote: 3 cat vs 2 dog → cat.', 'बहुमत भोट: ३ cat विरुद्ध २ dog → cat।', '多数投票：3 个 cat 对 2 个 dog → cat。']],
  [['What does <code>feature_importances_</code> tell you?', '<code>feature_importances_</code> ले के बताउँछ?', '<code>feature_importances_</code> 告诉你什么？'],
    [['The accuracy of each tree', 'How many trees there are', 'Which rows are wrong', 'Which features helped the trees most to make decisions'], ['हरेक रूखको accuracy', 'कति रूख छन्', 'कुन row गलत छन्', 'कुन feature ले रूखलाई निर्णय गर्न सबैभन्दा मद्दत गर्यो'], ['每棵树的准确率', '有多少棵树', '哪些行是错的', '哪些特征对树的决策帮助最大']], 3,
    ['It gives a score per feature (they add up to 1). Useful to explain the model.', 'यसले हरेक feature को अंक दिन्छ (जम्मा 1)। मोडेल बुझाउन उपयोगी।', '它给每个特征一个分数（加起来等于 1），有助于解释模型。']],
]);

addQuiz('svm', [
  [['What does an SVM look for?', 'SVM ले के खोज्छ?', 'SVM 在寻找什么？'],
    [['The average of each class', 'The border with the widest gap (margin) between the classes', 'The nearest neighbour', 'The deepest tree'], ['हरेक class को औसत', 'Class हरूबीच सबैभन्दा फराकिलो खाली ठाउँ (margin) भएको सीमाना', 'सबैभन्दा नजिकको छिमेकी', 'सबैभन्दा गहिरो रूख'], ['每个类别的平均值', '类别之间间隔（margin）最宽的边界', '最近的邻居', '最深的树']], 1,
    ['A wide margin is safer: new points are less likely to fall on the wrong side.', 'फराकिलो margin सुरक्षित हुन्छ: नयाँ बिन्दु गलत छेउमा पर्ने सम्भावना कम।', '间隔越宽越安全：新点更不容易落到错误的一边。']],
  [['The "support vectors" are…', '"Support vector" भनेका…', '“支持向量”是……'],
    [['All the training points', 'The features', 'The training points closest to the border', 'The wrong predictions'], ['सबै तालिम बिन्दु', 'Feature हरू', 'सीमानाको सबैभन्दा नजिकका तालिम बिन्दु', 'गलत अनुमानहरू'], ['所有训练点', '特征', '离边界最近的训练点', '错误的预测']], 2,
    ['Only the closest points "support" (decide) where the border goes. Moving far-away points changes nothing.', 'नजिकका बिन्दुले मात्र सीमाना कहाँ जान्छ भनेर "support" (निर्णय) गर्छन्। टाढाका बिन्दु सार्दा केही बदलिँदैन।', '只有最近的点“支撑”（决定）边界的位置。移动远处的点不会改变任何东西。']],
  [['What does the kernel trick (e.g. kernel="rbf") let an SVM do?', 'Kernel trick (जस्तै kernel="rbf") ले SVM लाई के गर्न दिन्छ?', '核技巧（例如 kernel="rbf"）让 SVM 能做什么？'],
    [['Draw curved borders for data that a straight line cannot separate', 'Train without labels', 'Run faster on big data', 'Predict numbers only'], ['सीधा रेखाले छुट्याउन नसक्ने डाटामा बाङ्गो सीमाना कोर्न', 'Label बिना तालिम गर्न', 'ठूलो डाटामा छिटो चल्न', 'अंक मात्र अनुमान गर्न'], ['为直线分不开的数据画出弯曲的边界', '没有标签也能训练', '在大数据上跑得更快', '只预测数值']], 0,
    ['Kernels let the SVM separate circles, moons and other curved shapes.', 'Kernel ले SVM लाई वृत्त, अर्धचन्द्र र अन्य बाङ्गा आकार छुट्याउन दिन्छ।', '核函数让 SVM 能分开圆形、月牙形等弯曲的形状。']],
  [['What happens with a very large C?', 'C धेरै ठूलो हुँदा के हुन्छ?', 'C 非常大时会怎样？'],
    [['The margin becomes as wide as possible', 'The model ignores the data', 'Nothing', 'It tries hard to get every training point right, so it can overfit'], ['Margin सकेसम्म फराकिलो हुन्छ', 'मोडेलले डाटा बेवास्ता गर्छ', 'केही हुँदैन', 'हरेक तालिम बिन्दु सही बनाउन धेरै प्रयास गर्छ, त्यसैले overfit हुन सक्छ'], ['间隔变得尽可能宽', '模型忽略数据', '什么都不发生', '它拼命让每个训练点都分对，所以可能过拟合']], 3,
    ['Big C = strict (narrow margin, can overfit). Small C = relaxed (wider margin, smoother).', 'ठूलो C = कडा (साँघुरो margin, overfit हुन सक्छ)। सानो C = खुकुलो (फराकिलो margin, चिल्लो)।', 'C 大 = 严格（间隔窄，可能过拟合）。C 小 = 宽松（间隔宽，更平滑）。']],
]);

addQuiz('naive-bayes', [
  [['Why is Naive Bayes called "naive"?', 'Naive Bayes लाई किन "naive" भनिन्छ?', '朴素贝叶斯为什么叫“朴素”？'],
    [['It assumes every feature is independent of the others', 'It is only for beginners', 'It has no maths', 'It ignores the data'], ['यसले हरेक feature अरूबाट स्वतन्त्र छ भनी मान्छ', 'सुरुवातीका लागि मात्र हो', 'यसमा गणित छैन', 'डाटा बेवास्ता गर्छ'], ['它假设每个特征都与其他特征相互独立', '它只适合初学者', '它没有数学', '它忽略数据']], 0,
    ['It pretends words do not affect each other — a simplification that still works surprisingly well.', 'यसले शब्दहरू एकअर्कालाई असर गर्दैनन् भनी मान्छ — सरलीकरण, तर अचम्म राम्रो काम गर्छ।', '它假装词与词之间互不影响——这是一种简化，但效果出奇地好。']],
  [['If P(spam) = 0.3, what is P(not spam)?', 'P(spam) = 0.3 भए P(not spam) कति?', '如果 P(spam) = 0.3，那么 P(not spam) 是多少？'],
    ['0.3', '0.7', '1.3', '0'], 1,
    ['The probabilities of all outcomes add up to 1: 1 − 0.3 = 0.7.', 'सबै नतिजाको सम्भावना जम्मा 1 हुन्छ: 1 − 0.3 = 0.7।', '所有结果的概率加起来等于 1：1 − 0.3 = 0.7。']],
  [['Naive Bayes is especially popular for…', 'Naive Bayes विशेष गरी लोकप्रिय छ…', '朴素贝叶斯特别常用于……'],
    [['Image generation', 'Self-driving cars', 'Text, such as spam filters', 'Predicting house prices'], ['चित्र बनाउन', 'स्वचालित कारमा', 'अक्षर, जस्तै spam फिल्टर', 'घरको मूल्य अनुमान गर्न'], ['生成图片', '自动驾驶', '文本，比如垃圾邮件过滤', '预测房价']], 2,
    ['It is fast, needs little data, and works well with word counts.', 'यो छिटो छ, थोरै डाटा चाहिन्छ, र शब्द-गन्तीसँग राम्रो काम गर्छ।', '它速度快、需要的数据少，配合词频效果很好。']],
  [['What does <code>CountVectorizer</code> turn text into?', '<code>CountVectorizer</code> ले अक्षरलाई केमा बदल्छ?', '<code>CountVectorizer</code> 把文字变成什么？'],
    [['Pictures', 'Sound', 'A translation', 'Numbers: how many times each word appears'], ['चित्र', 'आवाज', 'अनुवाद', 'अंक: हरेक शब्द कति पटक आयो'], ['图片', '声音', '译文', '数字：每个词出现的次数']], 3,
    ['Models need numbers, so each message becomes a row of word counts.', 'मोडेललाई अंक चाहिन्छ, त्यसैले हरेक सन्देश शब्द-गन्तीको row बन्छ।', '模型需要数字，所以每条消息都变成一行词频。']],
]);

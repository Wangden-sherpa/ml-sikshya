/* ML Tutor — Real-World Missions: apply each lesson to real public datasets, with a checklist, starter code and tutor review. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast, store } = MLS;
  const C = window.COURSE;

  Object.assign(MLS.UI, {
    realworld: { en: 'Real-World', ne: 'वास्तविक संसार', zh: '真实项目' },
    rwTitle: { en: '🌍 Real-World Missions', ne: '🌍 वास्तविक संसारका मिसन', zh: '🌍 真实世界任务' },
    rwIntro: { en: 'Apply what you learned to REAL public datasets — just like a data scientist at work. Each mission has a story, a checklist, starter code that downloads the real data, and your AI teacher to review your work.', ne: 'सिकेको कुरा वास्तविक सार्वजनिक डाटासेटमा लागू गर्नुहोस् — कामको ठाउँमा डाटा वैज्ञानिकले जस्तै। हरेक मिसनमा कथा, चेकलिस्ट, वास्तविक डाटा डाउनलोड गर्ने सुरुवाती कोड, र काम जाँचिदिने AI शिक्षक छन्।', zh: '把学到的知识用在真实的公开数据集上——就像真正的数据科学家工作一样。每个任务都有背景故事、任务清单、会下载真实数据的起始代码，还有 AI 老师帮你审阅成果。' },
    rwApply: { en: '🌍 Apply this lesson in a real-world mission', ne: '🌍 यो पाठ वास्तविक मिसनमा लागू गर्नुहोस्', zh: '🌍 在真实任务中运用本课知识' },
    rwApplySub: { en: 'Practise this lesson on real data from the real world:', ne: 'यो पाठ वास्तविक संसारको डाटामा अभ्यास गर्नुहोस्:', zh: '在来自真实世界的数据上练习本课内容：' },
    rwStory: { en: 'The situation', ne: 'परिस्थिति', zh: '背景' },
    rwData: { en: 'Real dataset', ne: 'वास्तविक डाटासेट', zh: '真实数据集' },
    rwSkills: { en: 'Lessons you will apply', ne: 'लागू गर्ने पाठहरू', zh: '将运用的课程' },
    rwTasks: { en: 'Your checklist', ne: 'तपाईंको चेकलिस्ट', zh: '任务清单' },
    rwCode: { en: 'Your workspace (starter code loads the real data)', ne: 'तपाईंको कार्यस्थल (सुरुवाती कोडले वास्तविक डाटा लोड गर्छ)', zh: '你的工作区（起始代码会加载真实数据）' },
    rwReview: { en: '🧑‍🏫 Ask my teacher to review my work', ne: '🧑‍🏫 शिक्षकलाई मेरो काम जाँच्न भन्नुहोस्', zh: '🧑‍🏫 请老师审阅我的成果' },
    rwHint: { en: '💡 Get a hint', ne: '💡 संकेत पाउनुहोस्', zh: '💡 获取提示' },
    rwDone: { en: '✅ Mark mission complete (+250 XP)', ne: '✅ मिसन पूरा भयो (+२५० XP)', zh: '✅ 标记任务完成（+250 XP）' },
    rwDoneOk: { en: '🏅 Mission complete! Add it to your portfolio.', ne: '🏅 मिसन पूरा! आफ्नो portfolio मा थप्नुहोस्।', zh: '🏅 任务完成！把它加入你的作品集吧。' },
    rwCompleted: { en: '✅ Completed', ne: '✅ पूरा भयो', zh: '✅ 已完成' },
    rwPortfolio: { en: '📁 Portfolio tip: save your final code to GitHub with a README (problem, data, method, results).', ne: '📁 Portfolio सुझाव: अन्तिम कोड README (समस्या, डाटा, तरिका, नतिजा) सहित GitHub मा सेभ गर्नुहोस्।', zh: '📁 作品集提示：把最终代码连同 README（问题、数据、方法、结果）保存到 GitHub。' },
    rwAll: { en: 'All missions', ne: 'सबै मिसन', zh: '所有任务' },
    rwTasksDone: { en: 'tasks done', ne: 'काम पूरा', zh: '项已完成' },
    rwOpen: { en: 'Start mission →', ne: 'मिसन सुरु →', zh: '开始任务 →' },
  });

  const SB = 'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/';
  const T = (en, ne, zh) => ({ en, ne, zh });
  const M = [
    { id: 'titanic', icon: '🚢', level: 'beginner', lessons: ['pandas', 'visualization', 'logistic-regression', 'decision-trees', 'random-forest', 'metrics', 'feature-engineering', 'responsible-ai'],
      title: T('Titanic: who survived?', 'टाइटानिक: को बाँचे?', '泰坦尼克号：谁幸存了？'),
      story: T('It is 1912. A shipping-safety agency wants to understand which passengers were most likely to survive the Titanic disaster, so that future evacuation plans are fairer. You get the real passenger list of 891 people.', 'सन् १९१२। एउटा जहाज-सुरक्षा निकाय टाइटानिक दुर्घटनामा कुन यात्रु बाँच्ने सम्भावना बढी थियो बुझ्न चाहन्छ, ताकि भविष्यका उद्धार योजना निष्पक्ष होऊन्। तपाईंसँग ८९१ जनाको वास्तविक यात्रु सूची छ।', '1912 年。一家航运安全机构想了解泰坦尼克号沉船时哪些乘客最有可能生还，以便让未来的疏散方案更公平。你拿到的是 891 名乘客的真实名单。'),
      data: { name: 'titanic.csv', url: SB + 'titanic.csv', rows: '891 × 15', src: 'seaborn-data (public)' },
      tasks: [T('Explore: survival rate by sex, class and age (groupby + charts)', 'अन्वेषण: लिङ्ग, श्रेणी र उमेर अनुसार बाँच्ने दर (groupby + चार्ट)', '探索：按性别、舱位等级、年龄统计生还率（groupby + 图表）'),
        T('Clean: fill missing age, drop useless columns, one-hot encode text', 'सफाइ: हराएको उमेर भर्ने, बेकार column हटाउने, text one-hot गर्ने', '清洗：填充缺失年龄、删除无用列、对文本独热编码'),
        T('Train logistic regression and a random forest; compare accuracy & F1', 'लजिस्टिक रिग्रेसन र random forest तालिम; accuracy र F1 तुलना', '训练逻辑回归和随机森林，比较准确率和 F1'),
        T('Show the confusion matrix and the most important features', 'Confusion matrix र सबैभन्दा महत्त्वपूर्ण feature देखाउने', '展示混淆矩阵和最重要的特征'),
        T('Fairness check: is accuracy similar for men/women and each class?', 'निष्पक्षता जाँच: पुरुष/महिला र हरेक श्रेणीमा accuracy उस्तै छ?', '公平性检查：男女和各舱位的准确率相近吗？')],
      code: py`
import pandas as pd
import matplotlib.pyplot as plt
from pyodide.http import open_url

df = pd.read_csv(open_url("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/titanic.csv"))
print(df.shape)
print(df.head())

# Task 1 — survival rate by group
print(df.groupby("sex")["survived"].mean().round(2))
df.groupby("pclass")["survived"].mean().plot.bar(title="Survival rate by class", color="#6366f1")
plt.show()

# Task 2 — TODO: clean the data (fill age with the median, choose features, pd.get_dummies)
# Task 3 — TODO: train LogisticRegression and RandomForestClassifier, compare accuracy and F1
# Task 4 — TODO: confusion matrix + feature importances
# Task 5 — TODO: accuracy per group (sex, pclass)
` },
    { id: 'penguins', icon: '🐧', level: 'beginner', lessons: ['numpy', 'knn', 'svm', 'kmeans', 'pca', 'cross-validation'],
      title: T('Antarctic penguin species', 'अन्टार्कटिक पेंगुइन प्रजाति', '南极企鹅物种识别'),
      story: T('Scientists at Palmer Station, Antarctica measured 344 penguins. They need a tool that identifies the species from body measurements — and want to know if the species form natural groups without labels.', 'अन्टार्कटिकाको Palmer Station का वैज्ञानिकहरूले ३४४ पेंगुइन नापे। उनलाई शरीरको नापबाट प्रजाति चिन्ने उपकरण चाहिएको छ — र label बिना पनि प्रजातिहरू प्राकृतिक समूह बनाउँछन् कि जान्न चाहन्छन्।', '南极 Palmer 科考站的科学家测量了 344 只企鹅。他们需要一个能根据身体测量值识别物种的工具——还想知道在没有标签的情况下，这些物种是否会自然地分成几组。'),
      data: { name: 'penguins.csv', url: SB + 'penguins.csv', rows: '344 × 7', src: 'Palmer Penguins (public)' },
      tasks: [T('Drop rows with missing values and plot bill length vs flipper length', 'हराएका मान भएका row हटाएर bill length र flipper length को ग्राफ', '删除缺失行，画出喙长与鳍长的散点图'),
        T('Scale features and train KNN and SVM — use 5-fold cross-validation', 'Feature scale गरी KNN र SVM तालिम — 5-fold cross-validation प्रयोग', '标准化特征，训练 KNN 和 SVM——使用 5 折交叉验证'),
        T('Run K-Means with k = 3 WITHOUT labels; compare clusters to real species', 'Label बिना k = 3 को K-Means; क्लस्टरलाई वास्तविक प्रजातिसँग तुलना', '在不使用标签的情况下运行 k = 3 的 K-Means，并与真实物种比较'),
        T('Use PCA to show all penguins in 2-D coloured by species', 'PCA ले सबै पेंगुइनलाई प्रजाति अनुसार रङ दिएर 2-D मा देखाउने', '用 PCA 把所有企鹅按物种着色画在二维图上')],
      code: py`
import pandas as pd
import matplotlib.pyplot as plt
from pyodide.http import open_url

df = pd.read_csv(open_url("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/penguins.csv")).dropna()
print(df.shape); print(df["species"].value_counts())

for sp, d in df.groupby("species"):
    plt.scatter(d["bill_length_mm"], d["flipper_length_mm"], label=sp, alpha=.7)
plt.xlabel("bill length (mm)"); plt.ylabel("flipper length (mm)"); plt.legend(); plt.show()

X = df[["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]]
y = df["species"]
# Task 2 — TODO: StandardScaler + KNeighborsClassifier / SVC with cross_val_score(cv=5)
# Task 3 — TODO: KMeans(n_clusters=3) on scaled X, then pd.crosstab(clusters, y)
# Task 4 — TODO: PCA(n_components=2) and a scatter plot coloured by species
` },
    { id: 'diamonds', icon: '💎', level: 'intermediate', lessons: ['linear-regression', 'gradient-descent', 'random-forest', 'overfitting', 'feature-engineering', 'anomaly-detection'],
      title: T('Diamond price estimator', 'हीराको मूल्य अनुमानकर्ता', '钻石价格估算器'),
      story: T('A jewellery shop wants a fair, data-driven price for every diamond. You have 53,940 real diamonds with carat, cut, colour, clarity and size — and the shop owner also wants to spot suspicious, mispriced stones.', 'एउटा गहना पसल हरेक हीराको निष्पक्ष, डाटामा आधारित मूल्य चाहन्छ। तपाईंसँग carat, cut, रङ, clarity र आकार सहितका ५३,९४० वास्तविक हीरा छन् — पसलेले शंकास्पद, गलत मूल्यका हीरा पनि पत्ता लगाउन चाहन्छन्।', '一家珠宝店希望为每颗钻石给出公平的、基于数据的价格。你拥有 53,940 颗真实钻石的克拉、切工、颜色、净度和尺寸数据——店主还想找出可疑的、定价异常的钻石。'),
      data: { name: 'diamonds.csv', url: SB + 'diamonds.csv', rows: '53,940 × 10', src: 'seaborn-data (public)' },
      tasks: [T('Sample 10,000 rows; plot price vs carat (try a log scale)', '१०,००० row नमुना; carat अनुसार मूल्यको ग्राफ (log scale प्रयास)', '抽样 10,000 行，画价格与克拉的关系（试试对数坐标）'),
        T('Encode cut / color / clarity and fit linear regression on log(price)', 'cut / color / clarity encode गरी log(price) मा linear regression', '对 cut / color / clarity 编码，并在 log(价格) 上拟合线性回归'),
        T('Compare with a random forest; check train vs test error for overfitting', 'Random forest सँग तुलना; overfitting का लागि train र test error जाँच', '与随机森林比较；对比训练/测试误差检查过拟合'),
        T('Use IsolationForest to flag the 1% most unusual diamonds', 'IsolationForest ले सबैभन्दा असामान्य १% हीरा पत्ता लगाउने', '用 IsolationForest 标记最异常的 1% 钻石')],
      code: py`
import pandas as pd, numpy as np
import matplotlib.pyplot as plt
from pyodide.http import open_url

df = pd.read_csv(open_url("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/diamonds.csv"))
df = df.sample(10000, random_state=0)
print(df.shape); print(df.head())

plt.scatter(df["carat"], df["price"], s=3, alpha=.3)
plt.yscale("log"); plt.xlabel("carat"); plt.ylabel("price ($, log)"); plt.title("Price vs carat"); plt.show()

# Task 2 — TODO: X = pd.get_dummies(df.drop(columns="price")), y = np.log(df["price"]), LinearRegression
# Task 3 — TODO: RandomForestRegressor; compare r2 on train vs test
# Task 4 — TODO: IsolationForest(contamination=0.01) on numeric columns
` },
    { id: 'tips', icon: '🍽️', level: 'beginner', lessons: ['what-is-ml', 'python-basics', 'numpy', 'pandas', 'math-intuition', 'visualization'],
      title: T('Restaurant tips analysis', 'रेस्टुरेन्ट टिप विश्लेषण', '餐厅小费分析'),
      story: T('A restaurant manager recorded 244 real bills. Do smokers tip more? Does the weekend matter? What tip should staff expect for a bill? Turn data into decisions.', 'एउटा रेस्टुरेन्ट म्यानेजरले २४४ वास्तविक बिल रेकर्ड गरे। धुम्रपान गर्नेले बढी टिप दिन्छन्? सप्ताहान्तले फरक पार्छ? कुनै बिलमा कति टिप आशा गर्ने? डाटालाई निर्णयमा बदल्नुहोस्।', '一位餐厅经理记录了 244 张真实账单。吸烟者给的小费更多吗？周末有影响吗？员工能期待多少小费？把数据变成决策。'),
      data: { name: 'tips.csv', url: SB + 'tips.csv', rows: '244 × 7', src: 'seaborn-data (public)' },
      tasks: [T('Compute the tip percentage column with NumPy / pandas', 'NumPy / pandas ले टिप प्रतिशत column बनाउने', '用 NumPy / pandas 计算小费百分比列'),
        T('Compare average tip % by day, time, sex and smoker', 'दिन, समय, लिङ्ग र धुम्रपान अनुसार औसत टिप % तुलना', '按星期、时段、性别、是否吸烟比较平均小费比例'),
        T('Plot total bill vs tip and compute their correlation', 'कुल बिल र टिपको ग्राफ बनाउने र correlation निकाल्ने', '画总账单与小费的关系图并计算相关系数'),
        T('Fit a line: predicted tip = w × bill + b. Explain w in words', 'रेखा फिट गर्ने: अनुमानित टिप = w × बिल + b। w को अर्थ शब्दमा बताउने', '拟合直线：预测小费 = w × 账单 + b，用文字解释 w')],
      code: py`
import pandas as pd, numpy as np
import matplotlib.pyplot as plt
from pyodide.http import open_url

df = pd.read_csv(open_url("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv"))
print(df.head())

df["tip_pct"] = df["tip"] / df["total_bill"] * 100
print("Average tip %:", df["tip_pct"].mean().round(1))

# Task 2 — TODO: df.groupby("day")["tip_pct"].mean() ... also time, sex, smoker
# Task 3 — TODO: scatter plot + np.corrcoef(df["total_bill"], df["tip"])
# Task 4 — TODO: w, b = np.polyfit(df["total_bill"], df["tip"], 1)
` },
    { id: 'mpg', icon: '🚗', level: 'intermediate', lessons: ['linear-regression', 'overfitting', 'cross-validation', 'feature-engineering', 'deployment'],
      title: T('Car fuel-efficiency predictor', 'गाडीको इन्धन दक्षता अनुमानकर्ता', '汽车油耗预测器'),
      story: T('An environmental agency wants to predict how many miles per gallon a car will do from its engine and weight — and ship the model as an app. You get 398 real cars from 1970–1982.', 'एउटा वातावरण निकाय गाडीको इन्जिन र तौलबाट प्रति ग्यालन कति माइल चल्छ अनुमान गर्न र मोडेललाई एपको रूपमा दिन चाहन्छ। तपाईंसँग १९७०–१९८२ का ३९८ वास्तविक गाडी छन्।', '一家环保机构想根据发动机和车重预测汽车每加仑能跑多少英里——并把模型做成应用。你拿到的是 1970–1982 年间 398 辆真实汽车的数据。'),
      data: { name: 'mpg.csv', url: SB + 'mpg.csv', rows: '398 × 9', src: 'UCI Auto MPG (public)' },
      tasks: [T('Handle the missing horsepower values', 'हराएका horsepower मान सम्हाल्ने', '处理 horsepower 的缺失值'),
        T('Compare linear regression vs polynomial (degree 2, 3) with cross-validation', 'Cross-validation ले linear र polynomial (degree 2, 3) तुलना', '用交叉验证比较线性回归与多项式回归（2 次、3 次）'),
        T('Build a full Pipeline (impute + scale + model) and report MAE', 'पूरा Pipeline (impute + scale + model) बनाएर MAE रिपोर्ट', '构建完整流水线（填充 + 标准化 + 模型）并报告 MAE'),
        T('Save the pipeline with joblib and reload it to predict a new car', 'Pipeline joblib ले सेभ गरेर फेरि लोड गरी नयाँ गाडीको अनुमान', '用 joblib 保存流水线，再加载并预测一辆新车')],
      code: py`
import pandas as pd
from pyodide.http import open_url

df = pd.read_csv(open_url("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/mpg.csv"))
print(df.head()); print(df.isna().sum())

X = df[["cylinders", "displacement", "horsepower", "weight", "acceleration", "model_year"]]
y = df["mpg"]
# Task 1 — TODO: SimpleImputer(strategy="median") for horsepower
# Task 2 — TODO: make_pipeline(PolynomialFeatures(d), LinearRegression()) for d in 1, 2, 3 + cross_val_score
# Task 3 — TODO: Pipeline([("impute", ...), ("scale", StandardScaler()), ("model", ...)]) and MAE
# Task 4 — TODO: joblib.dump(pipe, "mpg_model.joblib"); joblib.load(...).predict(new_car)
` },
    { id: 'flights', icon: '✈️', level: 'advanced', lessons: ['neural-networks', 'training-deep', 'transformers', 'gradient-descent'],
      title: T('Airline passenger forecasting', 'हवाई यात्रु संख्या पूर्वानुमान', '航空客流量预测'),
      story: T('An airline needs to plan planes and staff. You have 12 years (1949–1960) of real monthly passenger numbers. Forecast the next months with a neural network that learns from the sequence.', 'एउटा एयरलाइनलाई विमान र कर्मचारी योजना चाहिन्छ। तपाईंसँग १२ वर्षको (१९४९–१९६०) वास्तविक मासिक यात्रु संख्या छ। अनुक्रमबाट सिक्ने न्युरल नेटवर्कले आगामी महिनाहरूको पूर्वानुमान गर्नुहोस्।', '一家航空公司需要规划飞机和人员。你拥有 12 年（1949–1960）的真实月度客流数据。用一个从序列中学习的神经网络预测未来几个月。'),
      data: { name: 'flights.csv', url: SB + 'flights.csv', rows: '144 × 3', src: 'Box & Jenkins airline data (public)' },
      tasks: [T('Plot passengers over time — spot the trend and the yearly season', 'समयसँग यात्रुको ग्राफ — प्रवृत्ति र वार्षिक मौसम पत्ता लगाउने', '画出客流随时间的变化——找出趋势和年度季节性'),
        T('Turn the series into windows: the last 12 months → next month', 'शृङ्खलालाई window मा बदल्ने: पछिल्ला १२ महिना → अर्को महिना', '把序列切成窗口：过去 12 个月 → 下个月'),
        T('Train an MLPRegressor on the first 10 years, test on the last 2', 'पहिला १० वर्षमा MLPRegressor तालिम, अन्तिम २ वर्षमा परीक्षण', '用前 10 年训练 MLPRegressor，用最后 2 年测试'),
        T('Plot forecast vs real and compute the error in passengers', 'पूर्वानुमान र वास्तविकको ग्राफ र यात्रु संख्यामा गल्ती', '画出预测与真实值对比，并计算误差（人数）')],
      code: py`
import pandas as pd, numpy as np
import matplotlib.pyplot as plt
from pyodide.http import open_url

df = pd.read_csv(open_url("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/flights.csv"))
s = df["passengers"].values.astype(float)
plt.plot(s); plt.title("Monthly airline passengers 1949–1960"); plt.xlabel("month"); plt.show()

W = 12
X = np.array([s[i:i + W] for i in range(len(s) - W)])
y = s[W:]
print("windows:", X.shape, "targets:", y.shape)
# Task 3 — TODO: scale (divide by s.max()), split first 108 / rest, MLPRegressor(hidden_layer_sizes=(64, 32), max_iter=3000)
# Task 4 — TODO: plot predictions vs real values, mean absolute error in passengers
` },
    { id: 'sms', icon: '📱', level: 'intermediate', lessons: ['naive-bayes', 'metrics', 'feature-engineering', 'transformers'],
      title: T('Real SMS spam filter', 'वास्तविक SMS spam फिल्टर', '真实短信垃圾过滤器'),
      story: T('A telecom company receives complaints about spam texts. You get 5,572 real SMS messages labelled spam or ham. Build a filter that catches spam but almost never blocks a real message.', 'एउटा टेलिकम कम्पनीले spam सन्देशबारे गुनासो पाउँछ। तपाईंसँग spam वा ham भनिएका ५,५७२ वास्तविक SMS छन्। Spam समात्ने तर वास्तविक सन्देश लगभग कहिल्यै नरोक्ने फिल्टर बनाउनुहोस्।', '一家电信公司收到大量垃圾短信投诉。你拿到 5,572 条标注为垃圾/正常的真实短信。构建一个能拦截垃圾短信、又几乎不误拦正常短信的过滤器。'),
      data: { name: 'sms.tsv', url: 'https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv', rows: '5,572 × 2', src: 'UCI SMS Spam Collection (public)' },
      tasks: [T('Load the data and check the class balance (spam vs ham)', 'डाटा लोड गरी class balance जाँच (spam बनाम ham)', '加载数据并检查类别比例（垃圾 vs 正常）'),
        T('TF-IDF + Multinomial Naive Bayes pipeline', 'TF-IDF + Multinomial Naive Bayes pipeline', 'TF-IDF + 多项式朴素贝叶斯流水线'),
        T('Report precision & recall for spam; tune the threshold for precision ≥ 99%', 'Spam का लागि precision र recall; precision ≥ ९९% का लागि threshold मिलाउने', '报告垃圾短信的精确率和召回率；调整阈值使精确率 ≥ 99%'),
        T('List the top 15 spam words and test your own messages', 'शीर्ष १५ spam शब्द र आफ्नै सन्देश परीक्षण', '列出最“垃圾”的 15 个词，并测试你自己的短信')],
      code: py`
import pandas as pd
from pyodide.http import open_url

df = pd.read_csv(open_url("https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv"), sep="\t", header=None, names=["label", "message"])
print(df.shape); print(df["label"].value_counts()); print(df.sample(5, random_state=1))

# Task 2 — TODO: make_pipeline(TfidfVectorizer(), MultinomialNB()) + train_test_split(stratify=y)
# Task 3 — TODO: classification_report; use predict_proba and a higher threshold for precision
# Task 4 — TODO: feature_log_prob_ difference to rank words; model.predict(["WIN a FREE prize now"])
` },
  ];
  MLS.missions = M;
  const MAP = {}; M.forEach((m) => m.lessons.forEach((l) => (MAP[l] = MAP[l] || []).push(m)));
  MAP['cnn'] = MAP['cnn'] || []; MAP['career-roadmap'] = M.slice(0, 3);
  const doneList = () => store.get('missions-done', []);
  const taskState = (id) => store.get('mission-' + id, []);

  // ---------- "Apply this lesson" card at the end of every lesson ----------
  MLS.hooks.lesson.push((L, body, el) => {
    const ms = MAP[L.id] || [];
    const extra = L.id === 'cnn' ? [{ href: '#/project/digits', icon: '✍️', title: C.projects.find((p) => p.id === 'digits').title }] : [];
    if (!ms.length && !extra.length) return;
    const card = h(`<div class="apply-card"><div class="apply-head"><span class="apply-globe">🌍</span><div><h2>${u('rwApply')}</h2><p class="muted">${u('rwApplySub')}</p></div></div>
      <div class="apply-grid">${ms.map((m) => `<a class="apply-item" href="#/mission/${m.id}"><span class="ai-ic">${m.icon}</span><b>${esc(t(m.title))}</b><small>${esc(m.data.rows)} · ${esc(m.data.name)}</small>${doneList().includes(m.id) ? `<em>${u('rwCompleted')}</em>` : ''}</a>`).join('')}
      ${extra.map((x) => `<a class="apply-item" href="${x.href}"><span class="ai-ic">${x.icon}</span><b>${esc(t(x.title))}</b></a>`).join('')}</div></div>`);
    const foot = el.querySelector('.lesson-foot');
    if (foot) foot.before(card); else el.appendChild(card);
  });

  // ---------- Missions index ----------
  MLS.routes.realworld = () => h(`<div class="wide">
    <div class="page-hero rw-hero"><div><h1>${u('rwTitle')}</h1><p>${u('rwIntro')}</p></div><div class="globe3d"><i></i><i></i><i></i></div></div>
    <div class="projects">${M.map((m) => {
      const st = taskState(m.id).length, done = doneList().includes(m.id);
      return `<a class="card project-card mission-card" href="#/mission/${m.id}"><div class="icon">${m.icon}</div><h3>${esc(t(m.title))}</h3><p>${esc(t(m.story)).slice(0, 150)}…</p>
        <div class="bar"><span style="width:${(st / m.tasks.length) * 100}%"></span></div>
        <div class="mission-meta"><span class="pill ${m.level}">${u(m.level)}</span><span class="muted small">${done ? u('rwCompleted') : `${st}/${m.tasks.length} ${u('rwTasksDone')}`}</span></div></a>`;
    }).join('')}</div></div>`);

  // ---------- Mission page ----------
  MLS.routes.mission = (id) => {
    const m = M.find((x) => x.id === id);
    if (!m) return MLS.routes.realworld();
    const st = new Set(taskState(m.id)), done = doneList().includes(m.id);
    const el = h(`<div class="container lesson-body mission">
      <a href="#/realworld">← ${u('rwAll')}</a>
      <div class="mission-hero"><span class="mh-ic">${m.icon}</span><div><h1>${esc(t(m.title))}</h1><span class="pill ${m.level}">${u(m.level)}</span> ${done ? `<span class="pill beginner">${u('rwCompleted')}</span>` : ''}</div></div>
      <div class="box analogy"><b class="t">📖 ${u('rwStory')}</b>${esc(t(m.story))}</div>
      <div class="mission-data card"><b>🗂️ ${u('rwData')}:</b> <code>${esc(m.data.name)}</code> · ${esc(m.data.rows)} · ${esc(m.data.src)}</div>
      <h2>📚 ${u('rwSkills')}</h2><div class="skill-chips">${m.lessons.map((lid) => { const L = C.lessons.find((l) => l.id === lid); return L ? `<a class="chip ${MLS.S.done[lid] ? 'done' : ''}" href="#/learn/${lid}">${MLS.S.done[lid] ? '✓ ' : ''}${esc(t(L.title))}</a>` : ''; }).join('')}</div>
      <h2>✅ ${u('rwTasks')}</h2>
      <div class="bar mission-bar"><span style="width:${(st.size / m.tasks.length) * 100}%"></span></div>
      <ul class="task-list">${m.tasks.map((tk, i) => `<li><label><input type="checkbox" data-i="${i}" ${st.has(i) ? 'checked' : ''}><span>${esc(t(tk))}</span></label></li>`).join('')}</ul>
      <h2>💻 ${u('rwCode')}</h2><div class="mission-code"></div>
      <div class="mission-actions"><button class="btn review">${u('rwReview')}</button><button class="btn ghost hint">${u('rwHint')}</button><button class="btn success finish" ${done ? 'disabled' : ''}>${done ? u('rwCompleted') : u('rwDone')}</button></div>
      <p class="muted">${u('rwPortfolio')}</p></div>`);
    el.querySelector('.mission-code').appendChild(MLS.codeBlock(m.code, `${m.id}_mission.py`));
    el.querySelectorAll('.task-list input').forEach((cb) => (cb.onchange = () => {
      const s = new Set(taskState(m.id)); cb.checked ? s.add(+cb.dataset.i) : s.delete(+cb.dataset.i);
      store.set('mission-' + m.id, [...s]);
      el.querySelector('.mission-bar span').style.width = (s.size / m.tasks.length) * 100 + '%';
    }));
    const tasksText = m.tasks.map((tk, i) => `${i + 1}. ${tk.en}`).join('\n');
    el.querySelector('.review').onclick = () => MLS.openTutor && MLS.openTutor(t({ en: `Please review my work on the real-world mission "${m.title.en}" (dataset ${m.data.name}). Tasks:\n${tasksText}\nLook at my most recent code and output: what did I do well, what is wrong or missing, and what should I do next? Give corrected code where needed.`, ne: `कृपया वास्तविक मिसन "${m.title.en}" (डाटासेट ${m.data.name}) मा मेरो काम जाँचिदिनुहोस्। कामहरू:\n${tasksText}\nमेरो पछिल्लो कोड र नतिजा हेर्नुहोस्: के राम्रो गरें, के गलत वा छुटेको छ, र अब के गर्ने? चाहिएमा सच्याइएको कोड दिनुहोस्।`, zh: `请审阅我在真实任务“${m.title.zh}”（数据集 ${m.data.name}）中的成果。任务：\n${tasksText}\n请查看我最近的代码和输出：哪些做得好？哪些有错误或遗漏？下一步该做什么？需要时请给出修改后的代码。` }));
    el.querySelector('.hint').onclick = () => {
      const next = m.tasks.findIndex((_, i) => !new Set(taskState(m.id)).has(i));
      const tk = m.tasks[next < 0 ? 0 : next];
      MLS.openTutor && MLS.openTutor(t({ en: `Give me a small hint (not the full solution) for this task in the "${m.title.en}" mission: ${tk.en}`, ne: `"${m.title.en}" मिसनको यो कामका लागि सानो संकेत दिनुहोस् (पूरा समाधान होइन): ${tk.ne}`, zh: `请为“${m.title.zh}”任务中的这一步给我一个小提示（不要完整答案）：${tk.zh}` }));
    };
    el.querySelector('.finish').onclick = (e) => {
      const d = new Set(doneList()); d.add(m.id); store.set('missions-done', [...d]);
      e.target.disabled = true; e.target.textContent = u('rwCompleted'); toast(u('rwDoneOk'));
      MLS.hooks.run.forEach((f) => { try { f('', true); } catch { /* ignore */ } });
    };
    return el;
  };

  // ---------- Home teaser ----------
  MLS.hooks.home.push((el) => {
    const sec = h(`<section><div class="section-title"><h2>${u('rwTitle')}</h2><a class="btn ghost sm" href="#/realworld">${u('rwAll')} →</a></div>
      <div class="apply-grid home-missions">${M.map((m) => `<a class="apply-item" href="#/mission/${m.id}"><span class="ai-ic">${m.icon}</span><b>${esc(t(m.title))}</b><small>${esc(m.data.rows)}</small></a>`).join('')}</div></section>`);
    const lv = el.querySelector('.levels');
    if (lv) lv.after(sec); else el.appendChild(sec);
  });
})();

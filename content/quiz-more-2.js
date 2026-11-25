/* ML Tutor — extra quiz questions (levels 3–6), in English, नेपाली and 中文. Uses addQuiz() from quiz-more-1.js. */

addQuiz('kmeans', [
  [['Before running k-means, what must YOU choose?', 'k-means चलाउनुअघि तपाईंले के छान्नुपर्छ?', '运行 k 均值之前，你必须选择什么？'],
    [['The labels', 'k — how many clusters to make', 'The test size', 'The learning rate'], ['Label हरू', 'k — कति समूह बनाउने', 'Test size', 'Learning rate'], ['标签', 'k——要分成几组', '测试集大小', '学习率']], 1,
    ['k-means needs the number of clusters k. Everything else it works out itself.', 'k-means लाई समूहको संख्या k चाहिन्छ। बाँकी यसले आफैँ निकाल्छ।', 'k 均值需要簇的数量 k，其他的它自己算出来。']],
  [['Which steps does k-means repeat?', 'k-means ले कुन चरण दोहोर्याउँछ?', 'k 均值重复哪些步骤？'],
    [['Give each point to its nearest centre, then move each centre to the average of its points', 'Split the data into train and test', 'Ask yes/no questions', 'Multiply by weights and add a bias'], ['हरेक बिन्दुलाई नजिकको केन्द्रमा दिने, अनि हरेक केन्द्रलाई आफ्ना बिन्दुको औसतमा सार्ने', 'डाटालाई train र test मा बाँड्ने', 'हो/होइन प्रश्न सोध्ने', 'Weight ले गुणा गरेर bias जोड्ने'], ['把每个点分给最近的中心，再把每个中心移到它那组点的平均位置', '把数据分成训练集和测试集', '问是/否问题', '乘以权重再加偏置']], 0,
    ['Assign → move → repeat, until the centres stop moving.', 'Assign → move → repeat, केन्द्र सर्न बन्द नहुन्जेल।', '分配 → 移动 → 重复，直到中心不再移动。']],
  [['Does k-means need labelled data (correct answers)?', 'k-means लाई label भएको डाटा (सही उत्तर) चाहिन्छ?', 'k 均值需要带标签的数据（正确答案）吗？'],
    [['Yes, always', 'Only for k > 3', 'No — it is unsupervised', 'Only for images'], ['हो, सधैँ', 'k > 3 भए मात्र', 'होइन — यो अनसुपरभाइज्ड हो', 'चित्रका लागि मात्र'], ['需要，总是需要', '只有 k > 3 时需要', '不需要——它是无监督的', '只有图片需要']], 2,
    ['It finds groups on its own from the features — no answers needed.', 'यसले feature बाट आफैँ समूह खोज्छ — उत्तर चाहिँदैन।', '它仅根据特征自己找出分组——不需要答案。']],
  [['What is the "elbow method" used for?', '"Elbow method" केका लागि प्रयोग हुन्छ?', '“肘部法”是用来做什么的？'],
    [['Scaling the data', 'Removing outliers', 'Measuring accuracy', 'Choosing a good k (where adding more clusters stops helping much)'], ['डाटा scale गर्न', 'Outlier हटाउन', 'Accuracy नाप्न', 'राम्रो k छान्न (जहाँ थप समूहले खासै मद्दत गर्दैन)'], ['缩放数据', '去除异常值', '衡量准确率', '选择合适的 k（再增加簇也帮助不大的地方）']], 3,
    ['Plot inertia for k = 1, 2, 3…; the bend ("elbow") of the curve is a good k.', 'k = 1, 2, 3… का लागि inertia को ग्राफ बनाउनुहोस्; रेखाको मोड ("elbow") राम्रो k हो।', '画出 k = 1, 2, 3… 时的 inertia 曲线，曲线的拐点（“肘部”）就是合适的 k。']],
]);

addQuiz('pca', [
  [['What is PCA mainly used for?', 'PCA मुख्य रूपमा केका लागि प्रयोग हुन्छ?', 'PCA 主要用来做什么？'],
    [['Predicting labels', 'Finding the nearest neighbour', 'Reducing many columns to a few while keeping most of the information', 'Adding missing values'], ['Label अनुमान गर्न', 'नजिकको छिमेकी खोज्न', 'धेरैजसो जानकारी राख्दै धेरै column लाई थोरैमा घटाउन', 'छुटेका मान भर्न'], ['预测标签', '找最近邻', '把很多列减少到几列，同时保留大部分信息', '填补缺失值']], 2,
    ['PCA compresses the data — great for charts in 2-D and for speeding up models.', 'PCA ले डाटा खुम्च्याउँछ — 2-D चार्ट र मोडेल छिटो बनाउन उत्तम।', 'PCA 压缩数据——很适合画二维图，也能加快模型。']],
  [['<code>explained_variance_ratio_</code> starts [0.70, 0.20, 0.05, …]. How much information do the first two components keep?', '<code>explained_variance_ratio_</code> [0.70, 0.20, 0.05, …] बाट सुरु हुन्छ। पहिला दुई component ले कति जानकारी राख्छन्?', '<code>explained_variance_ratio_</code> 开头是 [0.70, 0.20, 0.05, …]。前两个主成分保留了多少信息？'],
    ['70%', '90%', '20%', '100%'], 1,
    ['0.70 + 0.20 = 0.90 → 90% of the information in just 2 columns.', '0.70 + 0.20 = 0.90 → २ column मै ९०% जानकारी।', '0.70 + 0.20 = 0.90 → 仅用 2 列就保留了 90% 的信息。']],
  [['Why should you scale the data before PCA?', 'PCA अघि डाटा किन scale गर्ने?', '为什么做 PCA 前要缩放数据？'],
    [['Columns with big numbers would dominate the components', 'PCA cannot read negative numbers', 'Scaling adds more columns', 'You should not'], ['ठूला अंक भएका column ले component मा हावी हुन्छन्', 'PCA ले ऋणात्मक अंक पढ्न सक्दैन', 'Scaling ले थप column जोड्छ', 'गर्नु हुँदैन'], ['数值大的列会主导主成分', 'PCA 不能读负数', '缩放会增加列', '不应该缩放']], 0,
    ['PCA looks for the biggest spread. Without scaling, "salary in rupees" would look far more spread out than "age".', 'PCA ले सबैभन्दा ठूलो फैलावट खोज्छ। Scale नगरे "रुपैयाँमा तलब" "उमेर" भन्दा धेरै फैलिएको देखिन्छ।', 'PCA 寻找最大的分散方向。不缩放的话，“以卢比计的工资”看起来会比“年龄”分散得多。']],
  [['The first principal component (PC1) is…', 'पहिलो principal component (PC1)…', '第一主成分（PC1）是……'],
    [['The first column of the data', 'The label', 'A random direction', 'The direction in which the data is most spread out'], ['डाटाको पहिलो column', 'Label', 'Random दिशा', 'डाटा सबैभन्दा फैलिएको दिशा'], ['数据的第一列', '标签', '一个随机方向', '数据最分散的方向']], 3,
    ['PC1 captures the most variation; PC2 the most of what is left, at right angles to PC1.', 'PC1 ले सबैभन्दा धेरै भिन्नता समात्छ; PC2 ले बाँकीमध्ये सबैभन्दा धेरै, PC1 सँग समकोणमा।', 'PC1 捕捉最多的变化；PC2 在与 PC1 垂直的方向上捕捉剩下最多的变化。']],
]);

addQuiz('anomaly-detection', [
  [['Which is a typical anomaly-detection problem?', 'कुन सामान्य anomaly-detection समस्या हो?', '哪一个是典型的异常检测问题？'],
    [['Predicting tomorrow\'s temperature', 'Spotting a strange, possibly fraudulent card payment', 'Translating text', 'Grouping songs by genre'], ['भोलिको तापक्रम अनुमान', 'अनौठो, सम्भवतः ठगीको कार्ड भुक्तानी पत्ता लगाउने', 'अक्षर अनुवाद', 'गीतलाई विधाअनुसार समूह बनाउने'], ['预测明天的温度', '发现一笔奇怪的、可能是欺诈的刷卡付款', '翻译文字', '按风格给歌曲分组']], 1,
    ['Anomalies are rare, unusual cases — fraud, machine faults, network attacks.', 'Anomaly दुर्लभ, असामान्य केस हुन् — ठगी, मेसिन बिग्रनु, नेटवर्क आक्रमण।', '异常是罕见、不寻常的情况——欺诈、机器故障、网络攻击。']],
  [['A value has a z-score of 4. It is…', 'एउटा मानको z-score 4 छ। यो…', '某个值的 z 分数是 4，它……'],
    [['Very unusual — 4 standard deviations from the average', 'Exactly average', 'Missing', 'The 4th row'], ['धेरै असामान्य — औसतबाट ४ standard deviation टाढा', 'ठ्याक्कै औसत', 'छुटेको', 'चौथो row'], ['非常不寻常——离平均值 4 个标准差', '正好是平均值', '是缺失值', '是第 4 行']], 0,
    ['Most values lie within about 2–3 standard deviations, so 4 is a strong sign of an anomaly.', 'धेरैजसो मान करिब २–३ standard deviation भित्र पर्छन्, त्यसैले 4 anomaly को बलियो संकेत हो।', '大多数值都在 2–3 个标准差以内，所以 4 是异常的强烈信号。']],
  [['Only 1% of transactions are fraud. A model that always says "normal" has 99% accuracy. Is it good?', 'जम्मा १% कारोबार ठगी हुन्। सधैँ "normal" भन्ने मोडेलको accuracy ९९% छ। राम्रो हो?', '只有 1% 的交易是欺诈。一个总说“正常”的模型准确率 99%。它好吗？'],
    [['Yes, 99% is excellent', 'Yes, if it is fast', 'No — it catches zero fraud, so accuracy is misleading here', 'Only on weekends'], ['हो, ९९% उत्कृष्ट हो', 'हो, छिटो भए', 'होइन — एउटै ठगी समात्दैन, त्यसैले यहाँ accuracy भ्रमपूर्ण छ', 'शनिबार मात्र'], ['是的，99% 非常好', '是的，只要它快', '不好——它一个欺诈都抓不到，所以这里准确率有误导性', '只在周末好']], 2,
    ['For rare cases, look at recall and precision for the rare class, not overall accuracy.', 'दुर्लभ केसमा समग्र accuracy होइन, दुर्लभ class को recall र precision हेर्नुहोस्।', '对于罕见情况，要看罕见类别的召回率和精确率，而不是整体准确率。']],
  [['What is the idea behind Isolation Forest?', 'Isolation Forest पछाडिको विचार के हो?', '孤立森林背后的思路是什么？'],
    [['It averages all points', 'It needs labels for every anomaly', 'It sorts the data', 'Unusual points can be cut off from the rest with only a few random splits'], ['सबै बिन्दुको औसत निकाल्छ', 'हरेक anomaly को label चाहिन्छ', 'डाटा मिलाउँछ', 'असामान्य बिन्दुलाई थोरै random विभाजनमै बाँकीबाट छुट्याउन सकिन्छ'], ['它把所有点取平均', '每个异常都需要标签', '它给数据排序', '异常点只要几次随机切分就能和其他点分开']], 3,
    ['Lonely points are easy to isolate, so a short path in the random trees = probably an anomaly.', 'एक्लो बिन्दु छुट्याउन सजिलो हुन्छ, त्यसैले random रूखमा छोटो बाटो = सम्भवतः anomaly।', '孤立的点很容易被分开，所以在随机树中路径短 = 很可能是异常。']],
]);

addQuiz('overfitting', [
  [['Training accuracy 99%, test accuracy 60%. This is…', 'तालिम accuracy ९९%, परीक्षण accuracy ६०%। यो…', '训练准确率 99%，测试准确率 60%。这是……'],
    [['Overfitting', 'Underfitting', 'A perfect model', 'Data leakage fixed'], ['Overfitting', 'Underfitting', 'उत्तम मोडेल', 'Data leakage सुधारियो'], ['过拟合', '欠拟合', '完美的模型', '数据泄漏已修复']], 0,
    ['The model memorised the training data but does not generalise to new data.', 'मोडेलले तालिम डाटा कण्ठ गर्यो तर नयाँ डाटामा सामान्यीकरण गर्दैन।', '模型背下了训练数据，却不能推广到新数据。']],
  [['Training accuracy 55%, test accuracy 54%, and both are low. This is…', 'तालिम accuracy ५५%, परीक्षण ५४%, र दुवै कम। यो…', '训练准确率 55%，测试准确率 54%，都很低。这是……'],
    [['Overfitting', 'A great model', 'Underfitting — the model is too simple', 'Cross-validation'], ['Overfitting', 'उत्कृष्ट मोडेल', 'Underfitting — मोडेल धेरै सरल छ', 'Cross-validation'], ['过拟合', '很好的模型', '欠拟合——模型太简单', '交叉验证']], 2,
    ['It cannot even learn the training data well. Try a more powerful model or better features.', 'यसले तालिम डाटा नै राम्ररी सिक्न सक्दैन। अझ शक्तिशाली मोडेल वा राम्रा feature प्रयास गर्नुहोस्।', '它连训练数据都学不好。试试更强的模型或更好的特征。']],
  [['Which of these helps reduce overfitting?', 'यीमध्ये कुनले overfitting घटाउन मद्दत गर्छ?', '以下哪项有助于减少过拟合？'],
    [['Training for many more epochs', 'More data, a simpler model, or regularisation', 'Removing the test set', 'Adding random noise to the labels'], ['धेरै धेरै epoch तालिम', 'थप डाटा, सरल मोडेल, वा regularisation', 'परीक्षण भाग हटाउने', 'Label मा random noise थप्ने'], ['训练更多轮', '更多数据、更简单的模型或正则化', '去掉测试集', '在标签里加随机噪声']], 1,
    ['More examples and simpler models make memorising harder and learning the real pattern easier.', 'थप उदाहरण र सरल मोडेलले कण्ठ गर्न गाह्रो र वास्तविक ढाँचा सिक्न सजिलो बनाउँछ।', '更多例子和更简单的模型让死记硬背更难，学到真实规律更容易。']],
  [['Why must the test set never be used for training?', 'परीक्षण भाग किन कहिल्यै तालिममा प्रयोग गर्नु हुँदैन?', '为什么测试集绝不能用于训练？'],
    [['It is too small', 'It has no labels', 'It makes training slower', 'It would be like seeing the exam answers before the exam — the score would be fake'], ['यो धेरै सानो हुन्छ', 'यसमा label हुँदैन', 'तालिम ढिलो हुन्छ', 'परीक्षाअघि नै उत्तर हेरेजस्तो हुन्छ — अंक नक्कली हुन्छ'], ['它太小了', '它没有标签', '会让训练变慢', '就像考试前偷看答案——分数是假的']], 3,
    ['The test set simulates new, unseen data. If the model has seen it, the test score no longer tells the truth.', 'परीक्षण भागले नयाँ, नदेखेको डाटाको नक्कल गर्छ। मोडेलले देखिसकेको भए परीक्षण अंकले सत्य बताउँदैन।', '测试集模拟的是新的、没见过的数据。如果模型见过它，测试分数就不再真实。']],
]);

addQuiz('cross-validation', [
  [['In 5-fold cross-validation, the model is…', '5-fold cross-validation मा मोडेल…', '在 5 折交叉验证中，模型……'],
    [['Trained once on 5% of the data', 'Trained 5 times; each time a different fifth is the test part', 'Tested on the training data', 'Trained on 5 features'], ['डाटाको ५% मा एक पटक तालिम हुन्छ', '५ पटक तालिम हुन्छ; हरेक पटक फरक पाँचौँ भाग परीक्षण हुन्छ', 'तालिम डाटामै परीक्षण हुन्छ', '५ feature मा तालिम हुन्छ'], ['只用 5% 的数据训练一次', '训练 5 次，每次用不同的五分之一做测试', '在训练数据上测试', '用 5 个特征训练']], 1,
    ['Every row gets to be in the test part exactly once, so the score uses all the data fairly.', 'हरेक row ठ्याक्कै एक पटक परीक्षण भागमा पर्छ, त्यसैले अंकले सबै डाटा निष्पक्ष रूपमा प्रयोग गर्छ।', '每一行恰好当一次测试数据，所以分数公平地用到了全部数据。']],
  [['cross_val_score gives [0.81, 0.83, 0.80, 0.82, 0.84]. What is the mean score?', 'cross_val_score ले [0.81, 0.83, 0.80, 0.82, 0.84] दिन्छ। औसत अंक कति?', 'cross_val_score 给出 [0.81, 0.83, 0.80, 0.82, 0.84]。平均分是多少？'],
    ['0.80', '0.84', '0.82', '4.10'], 2,
    ['Sum = 4.10, divided by 5 = 0.82. The small spread (0.80–0.84) shows the model is stable.', 'जोड = 4.10, ५ ले भाग = 0.82। सानो फैलावट (0.80–0.84) ले मोडेल स्थिर छ भन्छ।', '总和 4.10，除以 5 = 0.82。差距很小（0.80–0.84），说明模型很稳定。']],
  [['Why is cross-validation better than a single train/test split?', 'Cross-validation एउटा मात्र train/test विभाजनभन्दा किन राम्रो?', '为什么交叉验证比一次训练/测试划分更好？'],
    [['The score depends less on luck, so it is more reliable', 'It is faster', 'It needs no test data', 'It always gives 100%'], ['अंक भाग्यमा कम भर पर्छ, त्यसैले बढी भरपर्दो', 'यो छिटो छ', 'परीक्षण डाटा चाहिँदैन', 'सधैँ १००% दिन्छ'], ['分数更少依赖运气，所以更可靠', '它更快', '它不需要测试数据', '它总是给出 100%']], 0,
    ['One split might be lucky or unlucky. Averaging several splits gives a fairer picture.', 'एउटा विभाजन भाग्यमानी वा अभागी हुन सक्छ। धेरै विभाजनको औसतले निष्पक्ष चित्र दिन्छ।', '一次划分可能运气好或运气差。多次划分取平均更公平。']],
  [['What does GridSearchCV do?', 'GridSearchCV ले के गर्छ?', 'GridSearchCV 做什么？'],
    [['Draws a grid on the chart', 'Removes bad rows', 'Splits images into a grid', 'Tries many settings with cross-validation and keeps the best one'], ['चार्टमा जालो कोर्छ', 'नराम्रा row हटाउँछ', 'चित्रलाई जालोमा बाँड्छ', 'Cross-validation सहित धेरै सेटिङ प्रयास गरेर सबैभन्दा राम्रो राख्छ'], ['在图上画网格', '删除不好的行', '把图片切成网格', '用交叉验证尝试很多设置，保留最好的']], 3,
    ['For example it can try max_depth = 2, 4, 6, 8 and pick the one with the best average CV score.', 'जस्तै यसले max_depth = 2, 4, 6, 8 प्रयास गरेर सबैभन्दा राम्रो औसत CV अंक भएको छान्न सक्छ।', '例如它可以尝试 max_depth = 2、4、6、8，选出交叉验证平均分最高的那个。']],
]);

addQuiz('metrics', [
  [['The model said "yes" 50 times: 40 were right (TP = 40), 10 were wrong (FP = 10). What is the precision?', 'मोडेलले ५० पटक "हो" भन्यो: ४० सही (TP = 40), १० गलत (FP = 10)। Precision कति?', '模型说了 50 次“是”：40 次对（TP = 40），10 次错（FP = 10）。精确率是多少？'],
    ['0.4', '0.8', '0.25', '0.5'], 1,
    ['Precision = TP / (TP + FP) = 40 / 50 = 0.8.', 'Precision = TP / (TP + FP) = 40 / 50 = 0.8।', '精确率 = TP / (TP + FP) = 40 / 50 = 0.8。']],
  [['There were 100 real "yes" cases. The model found 40 (TP = 40) and missed 60 (FN = 60). What is the recall?', '१०० वटा वास्तविक "हो" केस थिए। मोडेलले ४० भेट्यो (TP = 40) र ६० छुटायो (FN = 60)। Recall कति?', '真实为“是”的有 100 个。模型找到 40 个（TP = 40），漏掉 60 个（FN = 60）。召回率是多少？'],
    ['0.4', '0.6', '0.8', '0.67'], 0,
    ['Recall = TP / (TP + FN) = 40 / 100 = 0.4. It missed most of the real cases.', 'Recall = TP / (TP + FN) = 40 / 100 = 0.4। यसले धेरैजसो वास्तविक केस छुटायो।', '召回率 = TP / (TP + FN) = 40 / 100 = 0.4。它漏掉了大部分真实情况。']],
  [['For a cancer-screening test, which metric matters most?', 'क्यान्सर जाँच परीक्षणमा कुन metric सबैभन्दा महत्त्वपूर्ण?', '对于癌症筛查，哪个指标最重要？'],
    [['Training speed', 'Precision only', 'Recall — we must not miss sick people', 'R²'], ['तालिमको गति', 'Precision मात्र', 'Recall — बिरामी मानिस छुटाउनु हुँदैन', 'R²'], ['训练速度', '只看精确率', '召回率——不能漏掉病人', 'R²']], 2,
    ['Missing a sick patient (false negative) is far worse than an extra check-up (false positive).', 'बिरामी छुटाउनु (false negative) थप जाँच (false positive) भन्दा धेरै नराम्रो हो।', '漏掉一个病人（假阴性）比多做一次检查（假阳性）严重得多。']],
  [['A model\'s errors are 2, −4 and 3. What is the mean absolute error (MAE)?', 'मोडेलका गल्ती 2, −4 र 3 छन्। Mean absolute error (MAE) कति?', '模型的误差是 2、−4 和 3。平均绝对误差（MAE）是多少？'],
    ['1', '0.33', '9', '3'], 3,
    ['Drop the signs (2, 4, 3), add (9), divide by 3 → 3.', 'चिन्ह हटाउनुहोस् (2, 4, 3), जोड्नुहोस् (9), ३ ले भाग → 3।', '去掉正负号（2、4、3），相加得 9，再除以 3 → 3。']],
]);

addQuiz('feature-engineering', [
  [['One-hot encoding a "colour" column with red, green, blue creates…', 'रातो, हरियो, निलो भएको "colour" column लाई one-hot encode गर्दा बन्छ…', '对含有 red、green、blue 的“颜色”列做独热编码，会生成……'],
    [['3 new columns of 0/1 (one per colour)', 'One column with 1, 2, 3', 'Nothing — models read words', 'A chart'], ['0/1 का ३ नयाँ column (हरेक रङको एउटा)', '1, 2, 3 भएको एउटा column', 'केही होइन — मोडेलले शब्द पढ्छ', 'चार्ट'], ['3 个新的 0/1 列（每种颜色一列）', '一列 1、2、3', '什么都不生成——模型能读文字', '一张图']], 0,
    ['Each colour gets its own 0/1 column. Using 1, 2, 3 would wrongly suggest blue > green > red.', 'हरेक रङको आफ्नै 0/1 column हुन्छ। 1, 2, 3 प्रयोग गर्दा निलो > हरियो > रातो भन्ने गलत अर्थ लाग्छ।', '每种颜色一列 0/1。用 1、2、3 会错误地暗示 蓝 > 绿 > 红。']],
  [['Which is an example of data leakage?', 'कुन data leakage को उदाहरण हो?', '以下哪个是数据泄漏的例子？'],
    [['Using a bigger model', 'Fitting the scaler on ALL the data (including the test part) before splitting', 'Plotting a histogram', 'Using random_state=42'], ['ठूलो मोडेल प्रयोग गर्नु', 'विभाजनअघि नै सबै डाटा (परीक्षण भाग समेत) मा scaler fit गर्नु', 'Histogram बनाउनु', 'random_state=42 प्रयोग गर्नु'], ['用更大的模型', '在划分之前用全部数据（包括测试部分）拟合缩放器', '画直方图', '使用 random_state=42']], 1,
    ['Information from the test set leaked into training. Split first, then fit the scaler on the training part only (a Pipeline does this for you).', 'परीक्षण भागको जानकारी तालिममा चुहियो। पहिले बाँड्नुहोस्, अनि तालिम भागमा मात्र scaler fit गर्नुहोस् (Pipeline ले यो आफैँ गर्छ)।', '测试集的信息泄漏进了训练。应该先划分，再只用训练部分拟合缩放器（Pipeline 会帮你做到）。']],
  [['You have a date column "2024-03-15". Which new feature could help predict shop sales?', '"2024-03-15" भएको मिति column छ। पसलको बिक्री अनुमान गर्न कुन नयाँ feature ले मद्दत गर्न सक्छ?', '有一列日期“2024-03-15”。哪个新特征可能有助于预测商店销量？'],
    [['The length of the text', 'The number of dashes', 'Day of the week, month, or "is it a festival?"', 'Nothing — dates are useless'], ['अक्षरको लम्बाइ', 'ड्यासको संख्या', 'हप्ताको दिन, महिना, वा "चाडपर्व हो?"', 'केही होइन — मिति काम लाग्दैन'], ['文字的长度', '短横线的数量', '星期几、月份，或“是不是节日？”', '没有——日期没用']], 2,
    ['Sales change on weekends and during festivals like Dashain — turning a date into such features helps a lot.', 'बिक्री शनिबार र दशैँ जस्ता चाडपर्वमा बदलिन्छ — मितिलाई यस्ता feature मा बदल्दा धेरै मद्दत गर्छ।', '销量在周末和节日（如德赛节）会变化——把日期变成这类特征很有帮助。']],
  [['Making a new column BMI = weight / height² from two existing columns is called…', 'दुई column बाट BMI = weight / height² नयाँ column बनाउनुलाई भनिन्छ…', '用已有的两列算出新列 BMI = 体重 / 身高²，这叫……'],
    [['Clustering', 'Cross-validation', 'Data leakage', 'Feature engineering'], ['क्लस्टरिङ', 'Cross-validation', 'Data leakage', 'Feature engineering'], ['聚类', '交叉验证', '数据泄漏', '特征工程']], 3,
    ['Creating smarter inputs from existing data is feature engineering — often the biggest boost to a model.', 'भएको डाटाबाट अझ चलाख इनपुट बनाउनु feature engineering हो — प्रायः मोडेलको सबैभन्दा ठूलो सुधार।', '用已有数据造出更聪明的输入就是特征工程——往往是对模型最大的提升。']],
]);

addQuiz('neural-networks', [
  [['What does one artificial neuron compute?', 'एउटा कृत्रिम neuron ले के गणना गर्छ?', '一个人工神经元计算什么？'],
    [['The average of all the data', 'A weighted sum of its inputs plus a bias, then an activation function', 'The distance to the nearest point', 'A yes/no question'], ['सबै डाटाको औसत', 'इनपुटको weight सहितको जोड र bias, अनि activation function', 'नजिकको बिन्दुसम्मको दूरी', 'हो/होइन प्रश्न'], ['所有数据的平均值', '输入的加权和加上偏置，再经过激活函数', '到最近点的距离', '一个是/否问题']], 1,
    ['output = activation(w₁x₁ + w₂x₂ + … + b). Training learns the w\'s and b.', 'output = activation(w₁x₁ + w₂x₂ + … + b)। तालिमले w र b सिक्छ।', 'output = activation(w₁x₁ + w₂x₂ + … + b)。训练就是学习这些 w 和 b。']],
  [['What is ReLU(−3)?', 'ReLU(−3) कति?', 'ReLU(−3) 等于多少？'],
    ['0', '-3', '3', '1'], 0,
    ['ReLU keeps positive numbers and turns negatives into 0: max(0, −3) = 0.', 'ReLU ले धनात्मक अंक राख्छ र ऋणात्मकलाई 0 बनाउँछ: max(0, −3) = 0।', 'ReLU 保留正数，把负数变成 0：max(0, −3) = 0。']],
  [['Why do neural networks need activation functions?', 'न्युरल नेटवर्कलाई activation function किन चाहिन्छ?', '神经网络为什么需要激活函数？'],
    [['To make training faster', 'To store the data', 'Without them, all the layers together act like one straight-line model', 'To print the output'], ['तालिम छिटो बनाउन', 'डाटा राख्न', 'तिनीहरू बिना सबै तह मिलेर एउटा सीधा-रेखा मोडेल जस्तै हुन्छ', 'आउटपुट छाप्न'], ['让训练更快', '存储数据', '没有它们，所有层合起来就相当于一个直线模型', '打印输出']], 2,
    ['Stacking linear steps is still linear. Activations add the bends that let networks learn curves.', 'Linear चरण थुपार्दा पनि linear नै हुन्छ। Activation ले नेटवर्कलाई वक्र सिक्न दिने मोड थप्छ।', '线性步骤叠加起来还是线性的。激活函数加入了“弯曲”，网络才能学会曲线。']],
  [['A layer connects 3 inputs to 4 neurons. How many weights (not counting biases) does it have?', 'एउटा तहले ३ इनपुटलाई ४ neuron सँग जोड्छ। यसमा कति weight छन् (bias नगनी)?', '一层把 3 个输入连接到 4 个神经元。它有多少个权重（不算偏置）？'],
    ['7', '3', '4', '12'], 3,
    ['Every input connects to every neuron: 3 × 4 = 12 weights (plus 4 biases).', 'हरेक इनपुट हरेक neuron सँग जोडिन्छ: 3 × 4 = 12 weight (थप ४ bias)।', '每个输入都连接到每个神经元：3 × 4 = 12 个权重（另有 4 个偏置）。']],
]);

addQuiz('training-deep', [
  [['One "epoch" means…', 'एउटा "epoch" भनेको…', '一个“轮次（epoch）”是指……'],
    [['One full pass through all the training data', 'One neuron', 'One layer', 'One wrong prediction'], ['सबै तालिम डाटाबाट एक पटक पूरा गुज्रनु', 'एउटा neuron', 'एउटा तह', 'एउटा गलत अनुमान'], ['把所有训练数据完整过一遍', '一个神经元', '一层', '一次错误预测']], 0,
    ['10 epochs = the model has seen every training example 10 times.', '१० epoch = मोडेलले हरेक तालिम उदाहरण १० पटक हेर्यो।', '10 个 epoch = 模型把每个训练样本看了 10 遍。']],
  [['What does backpropagation calculate?', 'Backpropagation ले के गणना गर्छ?', '反向传播计算什么？'],
    [['The final accuracy', 'How much each weight contributed to the error (the gradients)', 'The number of layers', 'The test split'], ['अन्तिम accuracy', 'हरेक weight ले गल्तीमा कति योगदान दियो (gradient)', 'तहको संख्या', 'Test विभाजन'], ['最终准确率', '每个权重对误差贡献了多少（梯度）', '层数', '测试集划分']], 1,
    ['It sends the error backwards through the layers, so each weight knows which way to change.', 'यसले गल्तीलाई तहहरूबाट पछाडि पठाउँछ, ताकि हरेक weight लाई कतातिर बदलिने थाहा होस्।', '它把误差从后往前传过各层，让每个权重知道该往哪边改。']],
  [['Training loss keeps going down, but validation loss starts going UP. What should you do?', 'तालिम loss घट्दै छ, तर validation loss बढ्न थाल्यो। के गर्ने?', '训练损失一直下降，但验证损失开始上升。你应该怎么做？'],
    [['Train for many more epochs', 'Raise the learning rate', 'Stop training (early stopping) — the model has started to overfit', 'Delete the validation data'], ['धेरै धेरै epoch तालिम गर्ने', 'Learning rate बढाउने', 'तालिम रोक्ने (early stopping) — मोडेल overfit हुन थाल्यो', 'Validation डाटा मेटाउने'], ['再训练更多轮', '提高学习率', '停止训练（提前停止）——模型开始过拟合了', '删除验证数据']], 2,
    ['Keep the weights from the epoch where validation loss was lowest.', 'Validation loss सबैभन्दा कम भएको epoch को weight राख्नुहोस्।', '保留验证损失最低那一轮的权重。']],
  [['What does Dropout do during training?', 'तालिमका बेला Dropout ले के गर्छ?', '训练时 Dropout 做什么？'],
    [['Deletes bad training rows', 'Lowers the learning rate', 'Removes whole layers forever', 'Randomly switches off some neurons, so the network cannot rely on any single one'], ['नराम्रा तालिम row मेटाउँछ', 'Learning rate घटाउँछ', 'पूरै तह सधैँका लागि हटाउँछ', 'केही neuron random रूपमा बन्द गर्छ, ताकि नेटवर्क कुनै एउटामा मात्र भर नपरोस्'], ['删除不好的训练行', '降低学习率', '永久删除整层', '随机关闭一些神经元，让网络不能只依赖某一个']], 3,
    ['This acts like training many smaller networks at once — a strong defence against overfitting.', 'यो एकैपटक धेरै साना नेटवर्क तालिम गरेजस्तै हो — overfitting विरुद्ध बलियो रक्षा।', '这就像同时训练很多小网络——是防止过拟合的有力手段。']],
]);

addQuiz('cnn', [
  [['Why are CNNs good for images?', 'CNN चित्रका लागि किन राम्रो?', '为什么 CNN 适合处理图片？'],
    [['They read images as text', 'Small filters find patterns (edges, shapes) anywhere in the image, with far fewer weights', 'They need no training', 'They only work in black and white'], ['चित्रलाई अक्षरको रूपमा पढ्छन्', 'साना फिल्टरले चित्रको जुनसुकै ठाउँमा ढाँचा (किनारा, आकार) भेट्छन्, धेरै कम weight मा', 'तालिम चाहिँदैन', 'कालो-सेतोमा मात्र चल्छन्'], ['它们把图片当文字读', '小滤镜能在图片任何位置找到图案（边缘、形状），而且权重少得多', '它们不需要训练', '它们只能处理黑白图']], 1,
    ['The same filter slides over the whole image, so a cat\'s ear is recognised wherever it appears.', 'एउटै फिल्टर पूरै चित्रमा सर्छ, त्यसैले बिरालोको कान जहाँ भए पनि चिनिन्छ।', '同一个滤镜在整张图上滑动，所以猫耳朵不管出现在哪里都能认出来。']],
  [['A 3 × 3 filter slides over a 5 × 5 image (no padding, stride 1). What size is the output?', '३ × ३ फिल्टर ५ × ५ चित्रमा सर्छ (padding छैन, stride 1)। आउटपुट कति ठूलो?', '一个 3 × 3 滤镜在 5 × 5 的图上滑动（无填充，步长 1）。输出多大？'],
    ['5 × 5', '2 × 2', '3 × 3', '4 × 4'], 2,
    ['The filter fits in 5 − 3 + 1 = 3 positions across and 3 down → 3 × 3.', 'फिल्टर तेर्सो 5 − 3 + 1 = 3 ठाउँमा र ठाडो 3 ठाउँमा अट्छ → 3 × 3।', '滤镜横向能放 5 − 3 + 1 = 3 个位置，纵向也是 3 个 → 3 × 3。']],
  [['2 × 2 max pooling on [[1, 3], [2, 8]] gives…', '[[1, 3], [2, 8]] मा 2 × 2 max pooling गर्दा…', '对 [[1, 3], [2, 8]] 做 2 × 2 最大池化，结果是……'],
    ['8', '3.5', '14', '1'], 0,
    ['Max pooling keeps the biggest value in each window: max(1, 3, 2, 8) = 8.', 'Max pooling ले हरेक window को सबैभन्दा ठूलो मान राख्छ: max(1, 3, 2, 8) = 8।', '最大池化保留每个窗口里的最大值：max(1, 3, 2, 8) = 8。']],
  [['What do the FIRST layers of a CNN usually learn to detect?', 'CNN का पहिला तहले प्रायः के पत्ता लगाउन सिक्छन्?', 'CNN 最前面的几层通常学会检测什么？'],
    [['Whole faces', 'Words', 'The final label', 'Simple things: edges, lines and colours'], ['पूरै अनुहार', 'शब्द', 'अन्तिम label', 'सरल कुरा: किनारा, रेखा र रङ'], ['整张脸', '文字', '最终标签', '简单的东西：边缘、线条和颜色']], 3,
    ['Early layers find edges; deeper layers combine them into eyes, wheels and finally whole objects.', 'सुरुका तहले किनारा भेट्छन्; गहिरा तहले तिनलाई जोडेर आँखा, पाङ्ग्रा र अन्त्यमा पूरै वस्तु बनाउँछन्।', '前面的层找边缘；更深的层把它们组合成眼睛、轮子，最后是整个物体。']],
]);

addQuiz('transformers', [
  [['What does "attention" let a Transformer do?', '"Attention" ले Transformer लाई के गर्न दिन्छ?', '“注意力”让 Transformer 能做什么？'],
    [['Let every word look at the other words to understand its meaning in context', 'Read the sentence backwards', 'Ignore short words', 'Run without a computer'], ['हरेक शब्दलाई सन्दर्भमा अर्थ बुझ्न अरू शब्द हेर्न दिन्छ', 'वाक्य उल्टो पढ्न', 'साना शब्द बेवास्ता गर्न', 'कम्प्युटर बिना चल्न'], ['让每个词看看其他词，从上下文理解它的意思', '倒着读句子', '忽略短词', '不用电脑也能运行']], 0,
    ['In "the bank of the river", attention links "bank" with "river", so it is not a money bank.', '"the bank of the river" मा attention ले "bank" लाई "river" सँग जोड्छ, त्यसैले यो पैसाको बैंक होइन।', '在 “the bank of the river” 中，注意力把 “bank” 和 “river” 联系起来，所以这里不是银行。']],
  [['How does a chatbot like ChatGPT write its answer?', 'ChatGPT जस्तो chatbot ले उत्तर कसरी लेख्छ?', '像 ChatGPT 这样的聊天机器人是怎样写出回答的？'],
    [['It copies a web page', 'It predicts the next token, adds it, and repeats — one token at a time', 'It writes the whole answer at once from a database', 'A person types it'], ['वेब पेज नक्कल गर्छ', 'अर्को token अनुमान गर्छ, थप्छ, र दोहोर्याउँछ — एकपटकमा एउटा token', 'डाटाबेसबाट एकैपटक पूरै उत्तर लेख्छ', 'मान्छेले टाइप गर्छ'], ['复制一个网页', '预测下一个 token，加上去，再重复——一次一个 token', '从数据库里一次写出整个回答', '有人在打字']], 1,
    ['That is why answers appear word by word: each new token is predicted from everything before it.', 'त्यसैले उत्तर शब्द-शब्द गरी देखिन्छ: हरेक नयाँ token अघिका सबैबाट अनुमान हुन्छ।', '所以回答是一个词一个词出现的：每个新 token 都由前面的所有内容预测出来。']],
  [['A "token" is…', '"Token" भनेको…', '“token” 是……'],
    [['A password', 'A whole paragraph', 'A word or a piece of a word that the model reads as one unit', 'A type of GPU'], ['पासवर्ड', 'पूरै अनुच्छेद', 'मोडेलले एउटा एकाइको रूपमा पढ्ने शब्द वा शब्दको टुक्रा', 'GPU को प्रकार'], ['密码', '一整段话', '模型当作一个单位读取的词或词的一部分', '一种 GPU']], 2,
    ['"unbelievable" might become "un" + "believ" + "able". Models read and write tokens, not letters.', '"unbelievable" लाई "un" + "believ" + "able" बनाउन सकिन्छ। मोडेलले अक्षर होइन, token पढ्छ र लेख्छ।', '“unbelievable” 可能被拆成 “un” + “believ” + “able”。模型读写的是 token，不是字母。']],
  [['What is an embedding?', 'Embedding भनेको के हो?', '嵌入（embedding）是什么？'],
    [['A picture of the text', 'The model\'s file size', 'A translation into English', 'A list of numbers that represents meaning — similar meanings get similar numbers'], ['अक्षरको चित्र', 'मोडेलको फाइल साइज', 'अङ्ग्रेजीमा अनुवाद', 'अर्थ जनाउने अंकको सूची — उस्तै अर्थले उस्तै अंक पाउँछ'], ['文字的图片', '模型文件的大小', '翻译成英文', '表示含义的一串数字——意思相近，数字也相近']], 3,
    ['Try it in the Model Playground: "study ML" and "learn AI" get close embeddings; "cold weather" does not.', 'Model Playground मा प्रयास गर्नुहोस्: "study ML" र "learn AI" को embedding नजिक हुन्छ; "cold weather" को हुँदैन।', '去模型游乐场试试：“study ML” 和 “learn AI” 的嵌入很接近，“cold weather” 则不然。']],
]);

addQuiz('deployment', [
  [['How do you save a trained scikit-learn model to use later?', 'तालिम पाएको scikit-learn मोडेल पछि प्रयोग गर्न कसरी सेभ गर्ने?', '怎样保存训练好的 scikit-learn 模型以便以后使用？'],
    ['print(model)', 'joblib.dump(model, "model.joblib")', 'model.fit()', 'plt.savefig()'], 1,
    ['joblib.dump saves it to a file; joblib.load opens it again without retraining.', 'joblib.dump ले फाइलमा सेभ गर्छ; joblib.load ले फेरि तालिम नगरी खोल्छ।', 'joblib.dump 把它存成文件；joblib.load 无需重新训练就能再次打开。']],
  [['What is an API for an ML model?', 'ML मोडेलको API भनेको के हो?', '机器学习模型的 API 是什么？'],
    [['A way for apps to send inputs over the internet and get predictions back', 'A type of chart', 'A training trick', 'A dataset'], ['एपहरूले इन्टरनेटमार्फत इनपुट पठाएर अनुमान फिर्ता पाउने तरिका', 'चार्टको प्रकार', 'तालिमको तरिका', 'डाटासेट'], ['让应用通过网络发送输入并取回预测结果的方式', '一种图表', '一种训练技巧', '一个数据集']], 0,
    ['For example a mobile app sends a house\'s details to /predict and gets a price back.', 'जस्तै मोबाइल एपले घरको विवरण /predict मा पठाउँछ र मूल्य फिर्ता पाउँछ।', '例如手机应用把房子的信息发到 /predict，拿回一个价格。']],
  [['A model worked well last year, but now its predictions are getting worse. A likely reason is…', 'गत वर्ष मोडेल राम्रो चल्यो, तर अहिले अनुमान बिग्रँदै छ। सम्भावित कारण…', '模型去年表现很好，现在预测越来越差。可能的原因是……'],
    [['The computer got slower', 'Python changed its name', 'Data drift — the real world changed, so retrain on recent data', 'The model forgot its weights'], ['कम्प्युटर ढिलो भयो', 'Python को नाम बदलियो', 'Data drift — वास्तविक संसार बदलियो, त्यसैले नयाँ डाटामा फेरि तालिम दिनुहोस्', 'मोडेलले weight बिर्सियो'], ['电脑变慢了', 'Python 改名了', '数据漂移——现实世界变了，要用新数据重新训练', '模型忘了它的权重']], 2,
    ['Prices, habits and trends change. Monitor deployed models and retrain them regularly.', 'मूल्य, बानी र प्रवृत्ति बदलिन्छन्। डिप्लोय गरिएका मोडेल निगरानी गरेर नियमित फेरि तालिम दिनुहोस्।', '价格、习惯和趋势都会变。要监控上线的模型并定期重新训练。']],
  [['Why save a whole Pipeline (scaler + model) instead of just the model?', 'मोडेल मात्र होइन, पूरै Pipeline (scaler + model) किन सेभ गर्ने?', '为什么要保存整个 Pipeline（缩放器 + 模型），而不只是模型？'],
    [['It is smaller', 'It trains faster', 'Pipelines cannot be saved', 'So new data gets exactly the same preparation as the training data'], ['यो सानो हुन्छ', 'छिटो तालिम हुन्छ', 'Pipeline सेभ गर्न मिल्दैन', 'ताकि नयाँ डाटाले तालिम डाटाकै ठ्याक्कै उही तयारी पाओस्'], ['它更小', '它训练更快', 'Pipeline 不能保存', '让新数据得到和训练数据完全相同的预处理']], 3,
    ['If production data is not scaled the same way, the model gets numbers it never learned from and fails.', 'उत्पादनको डाटा उस्तै तरिकाले scale नभए, मोडेलले कहिल्यै नसिकेका अंक पाउँछ र असफल हुन्छ।', '如果线上数据没有用同样的方式缩放，模型就会收到从没学过的数字而出错。']],
]);

addQuiz('responsible-ai', [
  [['A face-recognition model was trained mostly on photos of one group of people. What is the risk?', 'अनुहार चिन्ने मोडेल धेरैजसो एउटै समूहका मानिसको फोटोमा तालिम गरियो। जोखिम के हो?', '一个人脸识别模型主要用某一类人的照片训练。风险是什么？'],
    [['It will be too fast', 'It may work much worse for other groups — that is bias', 'It will use too much memory', 'There is no risk'], ['धेरै छिटो हुन्छ', 'अरू समूहका लागि धेरै नराम्रो काम गर्न सक्छ — यो bias हो', 'धेरै memory प्रयोग गर्छ', 'कुनै जोखिम छैन'], ['会太快', '对其他人群可能效果差很多——这就是偏差', '会占用太多内存', '没有风险']], 1,
    ['A model only knows what it was shown. Unbalanced data leads to unfair results.', 'मोडेलले देखाइएको कुरा मात्र जान्छ। असन्तुलित डाटाले अन्यायपूर्ण नतिजा दिन्छ।', '模型只知道它见过的东西。不平衡的数据会导致不公平的结果。']],
  [['A loan model is 95% accurate overall but only 70% for women. What should you do first?', 'ऋण मोडेल समग्रमा ९५% सही तर महिलाका लागि ७०% मात्र। पहिले के गर्ने?', '一个贷款模型整体准确率 95%，但对女性只有 70%。首先应该做什么？'],
    [['Nothing — 95% is great', 'Remove the women from the data', 'Measure performance for each group and fix the data or model before using it', 'Report only the 95%'], ['केही होइन — ९५% उत्कृष्ट हो', 'डाटाबाट महिला हटाउने', 'हरेक समूहको प्रदर्शन नाप्ने र प्रयोग गर्नुअघि डाटा वा मोडेल सुधार्ने', '९५% मात्र रिपोर्ट गर्ने'], ['什么都不做——95% 很好了', '从数据中去掉女性', '分别衡量每个群体的表现，在使用前修正数据或模型', '只报告 95%']], 2,
    ['An overall score can hide unfairness. Always check results per group.', 'समग्र अंकले अन्याय लुकाउन सक्छ। सधैँ समूहअनुसार नतिजा जाँच्नुहोस्।', '整体分数可能掩盖不公平。一定要分组检查结果。']],
  [['Why does explainability matter for a model that refuses loans?', 'ऋण अस्वीकार गर्ने मोडेलका लागि explainability किन महत्त्वपूर्ण?', '对于拒绝贷款的模型，为什么可解释性很重要？'],
    [['People deserve to know why, and we must be able to check the decision is fair', 'It makes the model faster', 'It is required by Python', 'It increases accuracy to 100%'], ['मानिसलाई किन भन्ने थाहा पाउने अधिकार छ, र निर्णय निष्पक्ष छ भनी जाँच्न सक्नुपर्छ', 'मोडेल छिटो बनाउँछ', 'Python ले माग्छ', 'Accuracy १००% पुर्याउँछ'], ['人们有权知道原因，我们也必须能检查决定是否公平', '它让模型更快', 'Python 要求这样', '它把准确率提高到 100%']], 0,
    ['Decisions that affect people\'s lives must be understandable and open to challenge.', 'मानिसको जीवनमा असर गर्ने निर्णय बुझ्न सकिने र चुनौती दिन मिल्ने हुनुपर्छ।', '影响人们生活的决定必须能被理解，也必须能被质疑。']],
  [['Before training on customer data, what should you do with names and phone numbers?', 'ग्राहकको डाटामा तालिम गर्नुअघि नाम र फोन नम्बरलाई के गर्ने?', '用客户数据训练之前，应该怎样处理姓名和电话号码？'],
    [['Post them online', 'Use them as the main features', 'Sell them', 'Remove them or hide them, unless they are truly needed — protect privacy'], ['अनलाइन पोस्ट गर्ने', 'मुख्य feature बनाउने', 'बेच्ने', 'साँच्चै नचाहिने भए हटाउने वा लुकाउने — गोपनीयता जोगाउने'], ['发到网上', '把它们当作主要特征', '卖掉', '除非真的需要，否则删除或隐藏——保护隐私']], 3,
    ['Personal details rarely help predictions and create privacy risks. Collect and keep only what you need.', 'व्यक्तिगत विवरणले अनुमानमा विरलै मद्दत गर्छ र गोपनीयताको जोखिम ल्याउँछ। चाहिने मात्र सङ्कलन गर्नुहोस् र राख्नुहोस्।', '个人信息很少有助于预测，还会带来隐私风险。只收集和保留真正需要的。']],
]);

addQuiz('career-roadmap', [
  [['What usually takes the MOST time in a real data-science project?', 'वास्तविक डाटा साइन्स प्रोजेक्टमा प्रायः सबैभन्दा बढी समय केमा लाग्छ?', '在真实的数据科学项目中，通常哪部分花的时间最多？'],
    [['Collecting, cleaning and understanding the data', 'Choosing the model', 'Pressing Run', 'Making the slides'], ['डाटा सङ्कलन, सफा गर्ने र बुझ्ने', 'मोडेल छान्ने', 'Run थिच्ने', 'स्लाइड बनाउने'], ['收集、清理和理解数据', '选择模型', '点运行', '做幻灯片']], 0,
    ['Most of the work is getting good data. A simple model on clean data often beats a fancy model on messy data.', 'धेरैजसो काम राम्रो डाटा पाउनु हो। सफा डाटामा सरल मोडेलले प्रायः फोहोर डाटामा जटिल मोडेललाई जित्छ।', '大部分工作是拿到好数据。干净数据上的简单模型往往胜过脏数据上的复杂模型。']],
  [['What is the best way to show employers your ML skills?', 'रोजगारदातालाई ML सीप देखाउने सबैभन्दा राम्रो तरिका के हो?', '向雇主展示机器学习技能的最好方式是什么？'],
    [['A list of courses you watched', 'Saying "I know AI"', 'Real projects on GitHub with a clear README (problem, data, method, results)', 'A very long CV'], ['हेरेका कोर्सको सूची', '"मलाई AI आउँछ" भन्नु', 'स्पष्ट README (समस्या, डाटा, विधि, नतिजा) सहित GitHub मा वास्तविक प्रोजेक्ट', 'धेरै लामो CV'], ['你看过的课程清单', '说“我懂 AI”', 'GitHub 上带清晰 README（问题、数据、方法、结果）的真实项目', '一份很长的简历']], 2,
    ['Projects prove you can do the work. Start with the Real-World missions here and publish them.', 'प्रोजेक्टले तपाईं काम गर्न सक्नुहुन्छ भन्ने प्रमाणित गर्छ। यहाँका Real-World मिसनबाट सुरु गरेर प्रकाशित गर्नुहोस्।', '项目能证明你会做事。从这里的真实世界任务开始，并把它们发布出来。']],
  [['What is Kaggle useful for?', 'Kaggle केका लागि उपयोगी छ?', 'Kaggle 有什么用？'],
    [['Buying a laptop', 'Free datasets and competitions to practise on real problems', 'Writing emails', 'Hosting websites'], ['ल्यापटप किन्न', 'वास्तविक समस्यामा अभ्यास गर्न निःशुल्क डाटासेट र प्रतियोगिता', 'इमेल लेख्न', 'वेबसाइट होस्ट गर्न'], ['买笔记本电脑', '用免费的数据集和比赛在真实问题上练习', '写邮件', '托管网站']], 1,
    ['Kaggle has thousands of datasets, notebooks to learn from, and competitions with a public leaderboard.', 'Kaggle मा हजारौँ डाटासेट, सिक्ने notebook, र सार्वजनिक leaderboard सहितका प्रतियोगिता छन्।', 'Kaggle 有成千上万的数据集、可以学习的笔记本，以及带公开排行榜的比赛。']],
  [['Which habit helps you grow fastest in ML?', 'ML मा सबैभन्दा छिटो बढ्न कुन बानीले मद्दत गर्छ?', '哪种习惯能让你在机器学习上进步最快？'],
    [['Reading theory only, never coding', 'Waiting until you know everything before starting a project', 'Only watching videos', 'Small, regular practice: build, share and learn from feedback'], ['सिद्धान्त मात्र पढ्ने, कहिल्यै कोड नलेख्ने', 'प्रोजेक्ट सुरु गर्नुअघि सबै जान्ने कुर्ने', 'भिडियो मात्र हेर्ने', 'सानो, नियमित अभ्यास: बनाउने, बाँड्ने र प्रतिक्रियाबाट सिक्ने'], ['只读理论，从不写代码', '等到什么都懂了再开始做项目', '只看视频', '少量但规律地练习：动手做、分享，并从反馈中学习']], 3,
    ['30 minutes of coding every day beats one long weekend. Build things, even small ones.', 'हरेक दिन ३० मिनेट कोड लेख्नु एउटा लामो सप्ताहन्तभन्दा राम्रो। सानै भए पनि केही बनाउनुहोस्।', '每天写 30 分钟代码，胜过一个漫长的周末。动手做东西，哪怕很小。']],
]);

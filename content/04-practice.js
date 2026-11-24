/* Level 4 — ML in Practice */
COURSE.lessons.push(
{
  id: 'overfitting', level: 'practice', minutes: 30,
  title: { en: 'Train/Test Split, Overfitting & Bias–Variance', ne: 'Train/Test विभाजन, Overfitting र Bias–Variance' },
  body: {
en: `
<p>The goal of ML is <b>not</b> to do well on the data we already have — it's to do well on <b>new, unseen data</b>. This is called <b>generalization</b>.</p>
<div class="box analogy"><b class="t">The exam analogy</b>A student who memorizes last year's answers gets 100% on last year's paper, but fails the real exam with new questions. That's <b>overfitting</b>. A student who didn't study fails both — <b>underfitting</b>. We want the student who truly understands.</div>
<h2>✂️ Train / validation / test split</h2>
<table><tr><th>Set</th><th>Typical size</th><th>Used for</th></tr>
<tr><td>Training</td><td>60–80%</td><td>the model learns from it</td></tr>
<tr><td>Validation</td><td>10–20%</td><td>choosing settings (hyperparameters), comparing models</td></tr>
<tr><td>Test</td><td>10–20%</td><td>final, honest score — touch it only once at the end!</td></tr></table>
<h2>⚖️ Bias vs Variance</h2>
<table><tr><th></th><th>Underfitting (high bias)</th><th>Overfitting (high variance)</th></tr>
<tr><td>Symptom</td><td>bad on train AND test</td><td>great on train, bad on test</td></tr>
<tr><td>Cause</td><td>model too simple</td><td>model too complex / too little data</td></tr>
<tr><td>Fix</td><td>more features, more complex model, train longer</td><td>more data, simpler model, regularization, dropout, early stopping</td></tr></table>
<div data-code="0"></div>
<h2>🧷 Regularization</h2>
<p>Regularization adds a penalty for large weights so the model stays simple:</p>
<div class="formula">Ridge (L2):  Loss = MSE + λ Σ w²        Lasso (L1):  Loss = MSE + λ Σ |w|</div>
<p>Lasso can push some weights to exactly 0 → automatic feature selection.</p>
<div data-code="1"></div>
<div class="box warn"><b class="t">Data leakage</b>Never let test information sneak into training — e.g. fitting a scaler on the full dataset before splitting. It gives fake, too-good scores. Always split first, then fit preprocessing on training data only.</div>
`,
ne: `
<p>ML को लक्ष्य हामीसँग भएको डाटामा राम्रो गर्नु <b>होइन</b> — <b>नयाँ, नदेखेको डाटामा</b> राम्रो गर्नु हो। यसलाई <b>generalization</b> भनिन्छ।</p>
<div class="box analogy"><b class="t">परीक्षाको उदाहरण</b>गत वर्षका उत्तर कण्ठ गर्ने विद्यार्थीले गत वर्षको प्रश्नपत्रमा १००% ल्याउँछ, तर नयाँ प्रश्न भएको वास्तविक परीक्षामा फेल हुन्छ। यही <b>overfitting</b> हो। नपढ्ने विद्यार्थी दुवैमा फेल — <b>underfitting</b>। हामीलाई साँच्चै बुझ्ने विद्यार्थी चाहिन्छ।</div>
<h2>✂️ Train / validation / test विभाजन</h2>
<table><tr><th>सेट</th><th>सामान्य आकार</th><th>प्रयोग</th></tr>
<tr><td>Training</td><td>६०–८०%</td><td>मोडेलले यसबाट सिक्छ</td></tr>
<tr><td>Validation</td><td>१०–२०%</td><td>सेटिङ (hyperparameter) छान्ने, मोडेल तुलना</td></tr>
<tr><td>Test</td><td>१०–२०%</td><td>अन्तिम, इमानदार अंक — अन्त्यमा एक पटक मात्र छुनुहोस्!</td></tr></table>
<h2>⚖️ Bias बनाम Variance</h2>
<table><tr><th></th><th>Underfitting (उच्च bias)</th><th>Overfitting (उच्च variance)</th></tr>
<tr><td>लक्षण</td><td>train र test दुवैमा खराब</td><td>train मा उत्कृष्ट, test मा खराब</td></tr>
<tr><td>कारण</td><td>मोडेल धेरै सरल</td><td>मोडेल धेरै जटिल / डाटा थोरै</td></tr>
<tr><td>उपाय</td><td>थप feature, जटिल मोडेल, लामो तालिम</td><td>थप डाटा, सरल मोडेल, regularization, dropout, early stopping</td></tr></table>
<div data-code="0"></div>
<h2>🧷 Regularization</h2>
<p>Regularization ले ठूला weight मा सजाय थप्छ ताकि मोडेल सरल रहोस्:</p>
<div class="formula">Ridge (L2):  Loss = MSE + λ Σ w²        Lasso (L1):  Loss = MSE + λ Σ |w|</div>
<p>Lasso ले केही weight लाई ठ्याक्कै 0 बनाउन सक्छ → स्वचालित feature छनोट।</p>
<div data-code="1"></div>
<div class="box warn"><b class="t">Data leakage (डाटा चुहावट)</b>Test को जानकारी कहिल्यै तालिममा छिर्न नदिनुहोस् — जस्तै विभाजन अघि पूरै डाटामा scaler fit गर्नु। यसले नक्कली, धेरै राम्रो अंक दिन्छ। सधैं पहिले विभाजन गर्नुहोस्, अनि preprocessing training डाटामा मात्र fit गर्नुहोस्।</div>
`},
  code: [
    { title: { en: 'Underfit vs good fit vs overfit', ne: 'Underfit बनाम राम्रो fit बनाम overfit' }, code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(0)
x = np.sort(rng.uniform(0, 1, 30)); y = np.sin(2 * np.pi * x) + rng.normal(0, .2, 30)
x_test = rng.uniform(0, 1, 100); y_test = np.sin(2 * np.pi * x_test) + rng.normal(0, .2, 100)
xs = np.linspace(0, 1, 300)

fig, ax = plt.subplots(1, 3, figsize=(14, 3.8))
for a, deg in zip(ax, [1, 4, 15]):
    m = make_pipeline(PolynomialFeatures(deg), LinearRegression()).fit(x[:, None], y)
    tr = mean_squared_error(y, m.predict(x[:, None])); te = mean_squared_error(y_test, m.predict(x_test[:, None]))
    a.scatter(x, y, s=15); a.plot(xs, m.predict(xs[:, None]), "r"); a.set_ylim(-2, 2)
    a.set_title(f"degree {deg}: train MSE {tr:.2f} | test MSE {te:.2f}")
plt.show()
print("Degree 1 underfits, degree 4 generalizes, degree 15 overfits (tiny train error, huge test error).")
` },
    { title: { en: 'Ridge & Lasso regularization', ne: 'Ridge र Lasso regularization' }, code: py`
import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge, Lasso

X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
for name, m in [("Plain", LinearRegression()), ("Ridge a=1", Ridge(alpha=1)), ("Lasso a=1", Lasso(alpha=1))]:
    m.fit(X_tr, y_tr)
    print(f"{name:<10} test R²={m.score(X_te, y_te):.3f}  weights: {np.round(m.coef_, 0)}")
print("\nNotice Lasso set several weights to exactly 0 (feature selection).")
` },
  ],
  quiz: [
    { q: { en: 'High train accuracy, low test accuracy means…', ne: 'उच्च train accuracy, न्यून test accuracy को अर्थ…' }, options: ['Underfitting', 'Overfitting', 'Perfect model', 'Data is missing'], answer: 1, explain: { en: 'The model memorized the training set.', ne: 'मोडेलले training सेट कण्ठ गर्यो।' } },
    { q: { en: 'Which is a fix for overfitting?', ne: 'Overfitting को उपाय कुन हो?' },
      options: { en: ['Get more data or add regularization', 'Make the model more complex', 'Train on the test set', 'Remove the test set'], ne: ['थप डाटा वा regularization', 'मोडेल अझ जटिल बनाउने', 'test सेटमा तालिम', 'test सेट हटाउने'] }, answer: 0, explain: { en: 'More data and penalties on complexity reduce variance.', ne: 'थप डाटा र जटिलतामा सजायले variance घटाउँछ।' } },
    { q: { en: 'The test set should be used…', ne: 'Test सेट कहिले प्रयोग गर्ने?' },
      options: { en: ['once, at the very end, for an honest score', 'to tune every setting', 'for training', 'never'], ne: ['अन्त्यमा एक पटक, इमानदार अंकका लागि', 'हरेक सेटिङ मिलाउन', 'तालिमका लागि', 'कहिल्यै होइन'] }, answer: 0, explain: { en: 'Tuning on the test set leaks information.', ne: 'Test सेटमा tuning गर्दा जानकारी चुहिन्छ।' } },
  ]
},

{
  id: 'cross-validation', level: 'practice', minutes: 25,
  title: { en: 'Cross-Validation & Hyperparameter Tuning', ne: 'क्रस-भ्यालिडेसन र Hyperparameter Tuning' },
  body: {
en: `
<p>One random train/test split can be lucky or unlucky. <b>K-fold cross-validation</b> gives a more reliable estimate.</p>
<h2>🔄 K-fold cross-validation</h2>
<ol><li>Split the data into k equal parts (folds), e.g. k = 5.</li>
<li>Train on 4 folds, test on the 5th.</li>
<li>Repeat 5 times so every fold is the test fold once.</li>
<li>Report the <b>mean ± standard deviation</b> of the 5 scores.</li></ol>
<div class="flow"><span>🟥⬜⬜⬜⬜</span><span>⬜🟥⬜⬜⬜</span><span>⬜⬜🟥⬜⬜</span><span>⬜⬜⬜🟥⬜</span><span>⬜⬜⬜⬜🟥</span></div>
<div data-code="0"></div>
<h2>🎛️ Hyperparameters vs parameters</h2>
<p><b>Parameters</b> are learned by the model (weights). <b>Hyperparameters</b> are settings <i>you</i> choose before training: k in KNN, max_depth, learning rate, number of trees…</p>
<ul><li><b>Grid search</b>: try every combination from a list. Thorough but slow.</li>
<li><b>Random search</b>: try random combinations. Often finds good settings faster.</li>
<li><b>Bayesian optimization</b> (Optuna): smart search that learns from previous tries.</li></ul>
<div data-code="1"></div>
<div class="box tip">For classification with imbalanced classes use <code>StratifiedKFold</code> (sklearn does this by default for classifiers) so each fold keeps the same class ratio.</div>
`,
ne: `
<p>एउटा random train/test विभाजन भाग्यमानी वा अभागी हुन सक्छ। <b>K-fold क्रस-भ्यालिडेसन</b> ले बढी भरपर्दो अनुमान दिन्छ।</p>
<h2>🔄 K-fold क्रस-भ्यालिडेसन</h2>
<ol><li>डाटालाई k बराबर भाग (fold) मा बाँड्ने, जस्तै k = 5।</li>
<li>४ fold मा तालिम, ५औं मा परीक्षण।</li>
<li>हरेक fold एक पटक test बनोस् गरी ५ पटक दोहोर्याउने।</li>
<li>५ अंकको <b>औसत ± standard deviation</b> रिपोर्ट गर्ने।</li></ol>
<div class="flow"><span>🟥⬜⬜⬜⬜</span><span>⬜🟥⬜⬜⬜</span><span>⬜⬜🟥⬜⬜</span><span>⬜⬜⬜🟥⬜</span><span>⬜⬜⬜⬜🟥</span></div>
<div data-code="0"></div>
<h2>🎛️ Hyperparameter बनाम parameter</h2>
<p><b>Parameter</b> मोडेलले सिक्छ (weight)। <b>Hyperparameter</b> तालिम अघि <i>तपाईंले</i> छान्ने सेटिङ हुन्: KNN को k, max_depth, learning rate, ट्री संख्या…</p>
<ul><li><b>Grid search</b>: सूचीका हरेक संयोजन प्रयास। पूर्ण तर ढिलो।</li>
<li><b>Random search</b>: random संयोजन प्रयास। प्रायः छिटो राम्रो सेटिङ भेट्छ।</li>
<li><b>Bayesian optimization</b> (Optuna): अघिल्ला प्रयासबाट सिक्ने चलाख खोज।</li></ul>
<div data-code="1"></div>
<div class="box tip">असन्तुलित वर्ग भएको classification मा <code>StratifiedKFold</code> प्रयोग गर्नुहोस् (classifier का लागि sklearn ले default मै गर्छ) ताकि हरेक fold मा वर्गको अनुपात उस्तै रहोस्।</div>
`},
  code: [
    { title: { en: 'cross_val_score', ne: 'cross_val_score' }, code: py`
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_breast_cancer(return_X_y=True)
for name, model in [("LogReg", make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))),
                    ("Forest", RandomForestClassifier(n_estimators=100, random_state=0))]:
    scores = cross_val_score(model, X, y, cv=5)
    print(f"{name}: folds={scores.round(3)}  mean={scores.mean():.3f} ± {scores.std():.3f}")
` },
    { title: { en: 'GridSearchCV', ne: 'GridSearchCV' }, code: py`
from sklearn.datasets import load_wine
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

X, y = load_wine(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
pipe = Pipeline([("scale", StandardScaler()), ("svm", SVC())])
grid = {"svm__C": [0.1, 1, 10, 100], "svm__gamma": [0.001, 0.01, 0.1, 1]}
search = GridSearchCV(pipe, grid, cv=5).fit(X_tr, y_tr)
print("Best settings:", search.best_params_)
print("Best CV accuracy:", round(search.best_score_, 3))
print("Final test accuracy:", round(search.score(X_te, y_te), 3))
` },
  ],
  quiz: [
    { q: { en: 'In 5-fold CV, how many times is the model trained?', ne: '5-fold CV मा मोडेल कति पटक तालिम हुन्छ?' }, options: ['1', '5', '10', '25'], answer: 1, explain: { en: 'Once per fold.', ne: 'हरेक fold मा एक पटक।' } },
    { q: { en: 'Which is a hyperparameter?', ne: 'कुन hyperparameter हो?' },
      options: { en: ['max_depth of a tree', 'learned weight w₁', 'the bias b after training', 'a prediction'], ne: ['ट्रीको max_depth', 'सिकिएको weight w₁', 'तालिमपछिको bias b', 'अनुमान'] }, answer: 0, explain: { en: 'You set it before training.', ne: 'तालिम अघि तपाईं आफैं राख्नुहुन्छ।' } },
  ]
},

{
  id: 'metrics', level: 'practice', minutes: 30,
  title: { en: 'Evaluation Metrics — Beyond Accuracy', ne: 'मूल्याङ्कन मेट्रिक्स — Accuracy भन्दा पर' },
  body: {
en: `
<p>Accuracy can lie. If 99% of transactions are normal, a model that <i>always</i> says "normal" is 99% accurate — and catches zero fraud! We need better metrics.</p>
<h2>🧮 The confusion matrix</h2>
<table><tr><th></th><th>Predicted: Positive</th><th>Predicted: Negative</th></tr>
<tr><td><b>Actual: Positive</b></td><td>✅ True Positive (TP)</td><td>❌ False Negative (FN) — missed it</td></tr>
<tr><td><b>Actual: Negative</b></td><td>❌ False Positive (FP) — false alarm</td><td>✅ True Negative (TN)</td></tr></table>
<div class="formula">Precision = TP / (TP + FP)     "When I say yes, how often am I right?"
Recall    = TP / (TP + FN)     "Of all real yeses, how many did I catch?"
F1        = 2·P·R / (P + R)    balance of both</div>
<h2>🤔 Precision or recall — which matters more?</h2>
<table><tr><th>Situation</th><th>Priority</th><th>Why</th></tr>
<tr><td>Cancer screening</td><td>Recall</td><td>missing a sick patient (FN) is terrible</td></tr>
<tr><td>Spam filter</td><td>Precision</td><td>putting an important email in spam (FP) is bad</td></tr>
<tr><td>Fraud detection</td><td>both (F1, PR-AUC)</td><td>catch fraud without blocking good customers</td></tr></table>
<div data-code="0"></div>
<h2>📈 ROC curve and AUC</h2>
<p>A classifier gives probabilities; the threshold (default 0.5) decides yes/no. The <b>ROC curve</b> shows the trade-off across all thresholds; <b>AUC</b> (0.5 = random, 1.0 = perfect) summarizes it in one number.</p>
<div data-code="1"></div>
<h2>📏 Regression metrics</h2>
<ul><li><b>MAE</b> — average absolute error, easy to explain.</li><li><b>RMSE</b> — punishes big errors more.</li><li><b>R²</b> — share of variance explained.</li></ul>
`,
ne: `
<p>Accuracy ले झुक्याउन सक्छ। ९९% कारोबार सामान्य छन् भने <i>सधैं</i> "सामान्य" भन्ने मोडेल ९९% सही हुन्छ — तर एउटै पनि ठगी समात्दैन! हामीलाई राम्रा मेट्रिक्स चाहिन्छ।</p>
<h2>🧮 Confusion matrix</h2>
<table><tr><th></th><th>अनुमान: Positive</th><th>अनुमान: Negative</th></tr>
<tr><td><b>वास्तविक: Positive</b></td><td>✅ True Positive (TP)</td><td>❌ False Negative (FN) — छुट्यो</td></tr>
<tr><td><b>वास्तविक: Negative</b></td><td>❌ False Positive (FP) — झूटो अलार्म</td><td>✅ True Negative (TN)</td></tr></table>
<div class="formula">Precision = TP / (TP + FP)     "मैले हो भन्दा कति पटक सही?"
Recall    = TP / (TP + FN)     "सबै वास्तविक 'हो' मध्ये कति समातें?"
F1        = 2·P·R / (P + R)    दुवैको सन्तुलन</div>
<h2>🤔 Precision कि recall — कुन बढी महत्त्वपूर्ण?</h2>
<table><tr><th>अवस्था</th><th>प्राथमिकता</th><th>किन</th></tr>
<tr><td>क्यान्सर जाँच</td><td>Recall</td><td>बिरामी छुटाउनु (FN) भयानक हो</td></tr>
<tr><td>Spam filter</td><td>Precision</td><td>महत्त्वपूर्ण इमेल spam मा पठाउनु (FP) नराम्रो</td></tr>
<tr><td>ठगी पहिचान</td><td>दुवै (F1, PR-AUC)</td><td>राम्रा ग्राहक नरोकी ठगी समात्ने</td></tr></table>
<div data-code="0"></div>
<h2>📈 ROC curve र AUC</h2>
<p>Classifier ले सम्भाव्यता दिन्छ; threshold (default 0.5) ले हो/होइन निर्णय गर्छ। <b>ROC curve</b> ले सबै threshold मा सम्झौता देखाउँछ; <b>AUC</b> (0.5 = random, 1.0 = उत्तम) ले एउटै संख्यामा सारांश दिन्छ।</p>
<div data-code="1"></div>
<h2>📏 Regression मेट्रिक्स</h2>
<ul><li><b>MAE</b> — औसत निरपेक्ष गल्ती, व्याख्या गर्न सजिलो।</li><li><b>RMSE</b> — ठूला गल्तीलाई बढी सजाय।</li><li><b>R²</b> — व्याख्या गरिएको variance को हिस्सा।</li></ul>
`},
  code: [
    { title: { en: 'Confusion matrix & report', ne: 'Confusion matrix र रिपोर्ट' }, code: py`
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

data = load_breast_cancer()
X_tr, X_te, y_tr, y_te = train_test_split(data.data, data.target, test_size=0.3, random_state=0)
model = RandomForestClassifier(random_state=0).fit(X_tr, y_tr)
pred = model.predict(X_te)
print(confusion_matrix(y_te, pred))
print(classification_report(y_te, pred, target_names=data.target_names))
ConfusionMatrixDisplay.from_predictions(y_te, pred, display_labels=data.target_names, cmap="Blues")
plt.show()
` },
    { title: { en: 'ROC curve & changing the threshold', ne: 'ROC curve र threshold बदल्ने' }, code: py`
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import roc_curve, roc_auc_score, precision_score, recall_score
import matplotlib.pyplot as plt

X, y = load_breast_cancer(return_X_y=True)
y = 1 - y   # make "malignant" = 1 (the positive class we want to catch)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
m = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_tr, y_tr)
p = m.predict_proba(X_te)[:, 1]
for th in [0.2, 0.5, 0.8]:
    pred = (p >= th).astype(int)
    print(f"threshold {th}: precision={precision_score(y_te, pred):.2f}  recall={recall_score(y_te, pred):.2f}")
fpr, tpr, _ = roc_curve(y_te, p)
plt.plot(fpr, tpr, lw=2, label=f"AUC = {roc_auc_score(y_te, p):.3f}"); plt.plot([0, 1], [0, 1], "--", color="gray")
plt.xlabel("False positive rate"); plt.ylabel("True positive rate (recall)"); plt.legend(); plt.title("ROC curve"); plt.show()
` },
  ],
  quiz: [
    { q: { en: 'For cancer screening, which metric is usually most important?', ne: 'क्यान्सर जाँचमा प्रायः कुन मेट्रिक सबैभन्दा महत्त्वपूर्ण?' }, options: ['Precision', 'Recall', 'Accuracy', 'R²'], answer: 1, explain: { en: 'We must not miss sick patients (minimize FN).', ne: 'बिरामी छुटाउनु हुँदैन (FN घटाउने)।' } },
    { q: { en: 'Precision = ?', ne: 'Precision = ?' }, options: ['TP / (TP + FP)', 'TP / (TP + FN)', 'TN / (TN + FP)', '(TP+TN) / all'], answer: 0, explain: { en: 'Of everything predicted positive, how many were right.', ne: 'Positive भनिएका मध्ये कति सही थिए।' } },
    { q: { en: 'AUC of 0.5 means…', ne: 'AUC 0.5 को अर्थ…' },
      options: { en: ['no better than random guessing', 'perfect', 'half the data is missing', 'very good'], ne: ['random अनुमानभन्दा राम्रो छैन', 'उत्तम', 'आधा डाटा हराएको', 'धेरै राम्रो'] }, answer: 0, explain: { en: '1.0 is perfect; 0.5 is a coin flip.', ne: '1.0 उत्तम; 0.5 सिक्का उफार्नु जस्तै।' } },
  ]
},

{
  id: 'feature-engineering', level: 'practice', minutes: 30,
  title: { en: 'Feature Engineering & Pipelines', ne: 'फिचर इन्जिनियरिङ र पाइपलाइन' },
  body: {
en: `
<p>"Better data beats fancier algorithms." <b>Feature engineering</b> means creating, transforming and selecting features so the model can learn more easily. It's often where the biggest gains come from.</p>
<h2>🧰 Common techniques</h2>
<table><tr><th>Technique</th><th>Example</th></tr>
<tr><td>Scaling</td><td><code>StandardScaler</code> (mean 0, std 1), <code>MinMaxScaler</code> (0–1)</td></tr>
<tr><td>Encoding categories</td><td>one-hot: city → is_KTM, is_PKR…; ordinal: small &lt; medium &lt; large</td></tr>
<tr><td>Missing values</td><td><code>SimpleImputer</code> with median / most frequent</td></tr>
<tr><td>New features from domain knowledge</td><td>price_per_sqft, age = 2081 − built_year, is_weekend</td></tr>
<tr><td>Dates</td><td>extract month, weekday, festival season (Dashain/Tihar)</td></tr>
<tr><td>Log transform</td><td>for skewed values like income, price</td></tr>
<tr><td>Text</td><td>word counts, TF-IDF</td></tr></table>
<h2>🔗 Pipelines: the professional way</h2>
<p>A <b>Pipeline</b> chains preprocessing + model into one object. Benefits: no data leakage, cleaner code, the same steps run during training and prediction, and you can save/deploy one file. <code>ColumnTransformer</code> applies different steps to numeric and categorical columns.</p>
<div data-code="0"></div>
<div class="box key"><b class="t">Professional habit</b>Always build a Pipeline. Then cross-validate the <i>whole</i> pipeline, tune it with GridSearchCV, and save it with joblib for deployment.</div>
`,
ne: `
<p>"राम्रो डाटाले झिलिमिली एल्गोरिदमलाई जित्छ।" <b>फिचर इन्जिनियरिङ</b> भनेको मोडेलले सजिलै सिक्न सकोस् भनेर feature बनाउने, रूपान्तरण गर्ने र छान्ने काम हो। प्रायः सबैभन्दा ठूलो सुधार यहीँबाट आउँछ।</p>
<h2>🧰 सामान्य प्रविधिहरू</h2>
<table><tr><th>प्रविधि</th><th>उदाहरण</th></tr>
<tr><td>Scaling</td><td><code>StandardScaler</code> (mean 0, std 1), <code>MinMaxScaler</code> (0–1)</td></tr>
<tr><td>श्रेणी encoding</td><td>one-hot: शहर → is_KTM, is_PKR…; ordinal: सानो &lt; मध्यम &lt; ठूलो</td></tr>
<tr><td>हराएको मान</td><td>median / सबैभन्दा धेरै आउने मानसहित <code>SimpleImputer</code></td></tr>
<tr><td>क्षेत्रको ज्ञानबाट नयाँ feature</td><td>price_per_sqft, उमेर = 2081 − बनेको वर्ष, is_weekend</td></tr>
<tr><td>मिति</td><td>महिना, बार, चाडपर्व मौसम (दशैं/तिहार) निकाल्ने</td></tr>
<tr><td>Log रूपान्तरण</td><td>आम्दानी, मूल्य जस्ता असमान (skewed) मानका लागि</td></tr>
<tr><td>Text</td><td>शब्द गणना, TF-IDF</td></tr></table>
<h2>🔗 Pipeline: पेशेवर तरिका</h2>
<p><b>Pipeline</b> ले preprocessing + मोडेललाई एउटै object मा जोड्छ। फाइदा: डाटा चुहावट हुँदैन, कोड सफा, तालिम र अनुमान दुवैमा उस्तै चरण चल्छन्, र एउटै फाइल सेभ/डिप्लोय गर्न सकिन्छ। <code>ColumnTransformer</code> ले संख्यात्मक र श्रेणीगत column मा फरक चरण लागू गर्छ।</p>
<div data-code="0"></div>
<div class="box key"><b class="t">पेशेवर बानी</b>सधैं Pipeline बनाउनुहोस्। अनि <i>पूरै</i> pipeline लाई cross-validate गर्नुहोस्, GridSearchCV ले tune गर्नुहोस्, र डिप्लोयका लागि joblib ले सेभ गर्नुहोस्।</div>
`},
  code: [{ title: { en: 'Full pipeline with mixed data', ne: 'मिश्रित डाटासहित पूरा pipeline' }, code: py`
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(0)
n = 400
df = pd.DataFrame({
    "city": rng.choice(["Kathmandu", "Lalitpur", "Pokhara", "Chitwan"], n),
    "area": rng.uniform(600, 3000, n).round(),
    "rooms": rng.integers(1, 7, n),
    "built_year": rng.integers(2040, 2081, n),       # Bikram Sambat
    "road_width_ft": rng.choice([8, 12, 16, 20, 25], n),
})
city_factor = df["city"].map({"Kathmandu": 1.5, "Lalitpur": 1.4, "Pokhara": 1.1, "Chitwan": 0.8})
df["price_lakh"] = (0.06 * df["area"] * city_factor + 4 * df["rooms"] + 1.2 * df["road_width_ft"]
                    - 0.8 * (2081 - df["built_year"]) + rng.normal(0, 10, n)).round(1)
df.loc[rng.choice(n, 30), "area"] = np.nan          # some missing values

# Feature engineering: house age
df["age"] = 2081 - df["built_year"]
X, y = df.drop(columns=["price_lakh", "built_year"]), df["price_lakh"]

pre = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]),
     ["area", "rooms", "road_width_ft", "age"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["city"]),
])
model = Pipeline([("prep", pre), ("gbr", GradientBoostingRegressor(random_state=0))])
scores = cross_val_score(model, X, y, cv=5, scoring="r2")
print("CV R²:", scores.round(3), "mean:", scores.mean().round(3))

model.fit(X, y)
new_house = pd.DataFrame([{"city": "Lalitpur", "area": 1800, "rooms": 4, "road_width_ft": 16, "age": 5}])
print("Predicted price for new house:", model.predict(new_house).round(1)[0], "lakh")
` }],
  quiz: [
    { q: { en: 'Main benefit of a Pipeline?', ne: 'Pipeline को मुख्य फाइदा?' },
      options: { en: ['Same preprocessing in training & prediction, no leakage', 'Makes the model bigger', 'Removes the need for data', 'Faster internet'], ne: ['तालिम र अनुमानमा उस्तै preprocessing, चुहावट छैन', 'मोडेल ठूलो बनाउँछ', 'डाटा नचाहिने', 'छिटो इन्टरनेट'] }, answer: 0, explain: { en: 'Pipelines bundle every step safely.', ne: 'Pipeline ले हरेक चरण सुरक्षित रूपमा जोड्छ।' } },
    { q: { en: 'Creating "price_per_sqft" from price and area is an example of…', ne: 'मूल्य र क्षेत्रफलबाट "price_per_sqft" बनाउनु के को उदाहरण हो?' },
      options: { en: ['feature engineering', 'clustering', 'overfitting', 'cross-validation'], ne: ['फिचर इन्जिनियरिङ', 'क्लस्टरिङ', 'overfitting', 'क्रस-भ्यालिडेसन'] }, answer: 0, explain: { en: 'Using domain knowledge to build a more useful feature.', ne: 'क्षेत्रको ज्ञान प्रयोग गरेर उपयोगी feature बनाउने।' } },
  ]
}
);

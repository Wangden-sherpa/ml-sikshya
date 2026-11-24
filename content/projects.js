/* Projects — beginner to advanced */
COURSE.projects.push(
{
  id: 'iris', level: 'beginner', icon: '🌸', lessons: ['what-is-ml', 'visualization', 'knn', 'decision-trees'],
  title: { en: 'Iris Flower Classifier', ne: 'आइरिस फूल वर्गीकरण' },
  summary: { en: 'Your first full ML project: identify 3 flower species from petal and sepal sizes.', ne: 'तपाईंको पहिलो पूरा ML प्रोजेक्ट: पात र पंखुडीको नापबाट ३ प्रजातिका फूल चिन्ने।' },
  goal: { en: 'Train a model that predicts the species of an iris flower (setosa, versicolor, virginica) from 4 measurements, and reach over 90% test accuracy.', ne: '४ वटा नापबाट आइरिस फूलको प्रजाति (setosa, versicolor, virginica) अनुमान गर्ने मोडेल बनाउने, र ९०% भन्दा बढी test accuracy पुर्याउने।' },
  learn: { en: ['Loading a dataset and exploring it', 'Train/test split', 'Training and comparing classifiers', 'Accuracy and the confusion matrix'], ne: ['डाटासेट लोड गरेर अन्वेषण गर्ने', 'Train/test विभाजन', 'Classifier तालिम र तुलना', 'Accuracy र confusion matrix'] },
  steps: { en: ['Load the data with <code>load_iris</code> and put it in a DataFrame.', 'Look at the first rows and the class counts.', 'Plot petal length vs petal width coloured by species.', 'Split into 80% train / 20% test.', 'Train KNN and a Decision Tree; compare test accuracy.', 'Show the confusion matrix and predict a new flower.'],
          ne: ['<code>load_iris</code> ले डाटा लोड गरेर DataFrame मा राख्ने।', 'पहिला row र वर्ग गणना हेर्ने।', 'प्रजातिअनुसार रङ दिएर petal length र petal width को ग्राफ बनाउने।', '८०% train / २०% test मा बाँड्ने।', 'KNN र Decision Tree तालिम दिएर test accuracy तुलना गर्ने।', 'Confusion matrix देखाएर नयाँ फूलको अनुमान गर्ने।'] },
  code: py`
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix

# 1. Load & explore
iris = load_iris(as_frame=True)
df = iris.frame
df["species"] = df["target"].map(dict(enumerate(iris.target_names)))
print(df.head(), "\n")
print(df["species"].value_counts(), "\n")

# 2. Visualize
for sp in iris.target_names:
    part = df[df.species == sp]
    plt.scatter(part["petal length (cm)"], part["petal width (cm)"], label=sp, alpha=.7)
plt.xlabel("petal length"); plt.ylabel("petal width"); plt.legend(); plt.show()

# 3. Split
X, y = iris.data, iris.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 4. Train & compare
for name, model in [("KNN", KNeighborsClassifier(5)), ("Tree", DecisionTreeClassifier(max_depth=3))]:
    model.fit(X_tr, y_tr)
    print(f"{name} test accuracy: {model.score(X_te, y_te):.3f}")

# 5. Evaluate & predict
print("\nConfusion matrix (Tree):\n", confusion_matrix(y_te, model.predict(X_te)))
new_flower = pd.DataFrame([[5.0, 3.4, 1.5, 0.2]], columns=X.columns)
print("New flower is:", iris.target_names[model.predict(new_flower)[0]])
`,
  challenges: { en: ['Try k = 1, 3, 7, 15 for KNN. Which is best?', 'Use only 2 features. How much does accuracy drop?', 'Add Logistic Regression and Random Forest to the comparison.', 'Use 5-fold cross-validation instead of one split.'],
                ne: ['KNN का लागि k = 1, 3, 7, 15 प्रयास गर्नुहोस्। कुन उत्तम?', '२ वटा feature मात्र प्रयोग गर्नुहोस्। accuracy कति घट्छ?', 'तुलनामा Logistic Regression र Random Forest थप्नुहोस्।', 'एउटा विभाजनको सट्टा 5-fold cross-validation प्रयोग गर्नुहोस्।'] },
},

{
  id: 'student-marks', level: 'beginner', icon: '📚', lessons: ['linear-regression', 'gradient-descent'],
  title: { en: 'Predict Student Exam Marks', ne: 'विद्यार्थीको परीक्षा अंक अनुमान' },
  summary: { en: 'Regression on a realistic student dataset: study hours, attendance, sleep and more.', ne: 'वास्तविक जस्तो विद्यार्थी डाटामा रिग्रेसन: पढाइ घण्टा, हाजिरी, निद्रा र थप।' },
  goal: { en: 'Predict a student\'s final marks and find out which habits matter most.', ne: 'विद्यार्थीको अन्तिम अंक अनुमान गर्ने र कुन बानी सबैभन्दा महत्त्वपूर्ण छ पत्ता लगाउने।' },
  learn: { en: ['Creating a dataset with Pandas', 'Multiple linear regression', 'Interpreting weights', 'MAE and R²'], ne: ['Pandas ले डाटासेट बनाउने', 'धेरै feature भएको लिनियर रिग्रेसन', 'Weight को अर्थ बुझ्ने', 'MAE र R²'] },
  steps: { en: ['Generate a dataset of 300 students.', 'Explore correlations between each feature and marks.', 'Train a linear regression model.', 'Evaluate with MAE and R² on the test set.', 'Interpret the weights: what does +1 hour of study give?', 'Predict your own marks!'],
           ne: ['३०० विद्यार्थीको डाटासेट बनाउने।', 'हरेक feature र अंकबीचको correlation हेर्ने।', 'लिनियर रिग्रेसन मोडेल तालिम दिने।', 'Test सेटमा MAE र R² ले मूल्याङ्कन।', 'Weight बुझ्ने: +१ घण्टा पढाइले के दिन्छ?', 'आफ्नै अंक अनुमान गर्नुहोस्!'] },
  code: py`
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(7)
n = 300
df = pd.DataFrame({
    "study_hours": rng.uniform(0, 8, n).round(1),
    "attendance_pct": rng.uniform(50, 100, n).round(),
    "sleep_hours": rng.uniform(4, 9, n).round(1),
    "phone_hours": rng.uniform(0, 7, n).round(1),
})
df["marks"] = (20 + 5.5 * df.study_hours + 0.3 * df.attendance_pct + 2 * (df.sleep_hours - 4)
               - 2.5 * df.phone_hours + rng.normal(0, 5, n)).clip(0, 100).round()

print(df.head(), "\n")
print("Correlation with marks:\n", df.corr()["marks"].drop("marks").round(2), "\n")

X, y = df.drop(columns="marks"), df["marks"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
model = LinearRegression().fit(X_tr, y_tr)
pred = model.predict(X_te)
print(f"MAE: {mean_absolute_error(y_te, pred):.2f} marks | R²: {r2_score(y_te, pred):.3f}\n")
for f, w in zip(X.columns, model.coef_):
    print(f"  +1 unit of {f:<15} -> {w:+.2f} marks")

me = pd.DataFrame([{"study_hours": 4, "attendance_pct": 90, "sleep_hours": 7, "phone_hours": 2}])
print("\nMy predicted marks:", model.predict(me).round(1)[0])
`,
  challenges: { en: ['Implement the same model with your own gradient descent (from the lesson) and compare weights.', 'Add a feature "has_tuition" (0/1). Does it help?', 'Plot predicted vs actual marks.', 'Try a Random Forest. Does it beat linear regression here? Why or why not?'],
                ne: ['पाठको आफ्नै gradient descent ले उही मोडेल बनाएर weight तुलना गर्नुहोस्।', '"has_tuition" (0/1) feature थप्नुहोस्। मद्दत गर्छ?', 'अनुमानित र वास्तविक अंकको ग्राफ बनाउनुहोस्।', 'Random Forest प्रयास गर्नुहोस्। यहाँ लिनियर रिग्रेसनलाई जित्छ? किन?'] },
},

{
  id: 'spam', level: 'beginner', icon: '📧', lessons: ['naive-bayes', 'metrics'],
  title: { en: 'SMS Spam Detector', ne: 'SMS स्प्याम पहिचानकर्ता' },
  summary: { en: 'Build a text classifier that catches spam messages like fake lottery and prize offers.', ne: 'नक्कली चिट्ठा र पुरस्कारका सन्देश समात्ने text classifier बनाउने।' },
  goal: { en: 'Classify SMS messages as spam or ham (normal) with high precision so real messages are not blocked.', ne: 'वास्तविक सन्देश नरोकिऊन् भनेर उच्च precision सहित SMS लाई spam वा ham (सामान्य) मा वर्गीकरण गर्ने।' },
  learn: { en: ['Turning text into numbers (TF-IDF)', 'Naive Bayes and Logistic Regression for text', 'Precision vs recall', 'Testing on your own messages'], ne: ['Text लाई संख्यामा बदल्ने (TF-IDF)', 'Text का लागि Naive Bayes र Logistic Regression', 'Precision बनाम recall', 'आफ्नै सन्देशमा परीक्षण'] },
  steps: { en: ['Create a small labelled dataset of messages.', 'Convert text with <code>TfidfVectorizer</code>.', 'Build a Pipeline: vectorizer + classifier.', 'Evaluate with a classification report.', 'Look at the words the model finds most "spammy".', 'Test your own messages.'],
           ne: ['सन्देशहरूको सानो label सहितको डाटासेट बनाउने।', '<code>TfidfVectorizer</code> ले text रूपान्तरण।', 'Pipeline बनाउने: vectorizer + classifier।', 'Classification report ले मूल्याङ्कन।', 'मोडेलले सबैभन्दा "spam जस्तो" ठानेका शब्द हेर्ने।', 'आफ्नै सन्देश परीक्षण गर्ने।'] },
  code: py`
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

spam = ["Congratulations! You won Rs 50000 lottery, call now", "WIN a free iPhone, click this link today",
        "You have been selected for a cash prize, send your details", "Urgent! Your account is blocked, verify at this link",
        "Free recharge offer! Reply YES to claim", "Claim your prize now, limited time offer",
        "Earn Rs 10000 daily from home, no experience", "You won a free trip to Dubai, call to claim",
        "Exclusive deal: buy 1 get 5 free, click now", "Lucky winner! Send PIN to receive gift"] * 3
ham = ["Are we meeting for momo at 5?", "Mom said dinner is ready", "Please send me the notes for tomorrow's class",
       "The bus to Pokhara leaves at 7am", "Happy Dashain! Wishing you and family the best", "Can you call me when you're free?",
       "Meeting moved to Sunday", "Did you finish the assignment?", "I reached home safely", "Let's play futsal this evening",
       "Your order has been delivered", "Thanks for your help today"] * 3
texts = spam + ham
labels = np.array([1] * len(spam) + [0] * len(ham))

X_tr, X_te, y_tr, y_te = train_test_split(texts, labels, test_size=0.3, random_state=1, stratify=labels)
model = make_pipeline(TfidfVectorizer(lowercase=True, ngram_range=(1, 2)), MultinomialNB(alpha=0.5))
model.fit(X_tr, y_tr)
print(classification_report(y_te, model.predict(X_te), target_names=["ham", "spam"]))

vec, nb = model.named_steps["tfidfvectorizer"], model.named_steps["multinomialnb"]
spamminess = nb.feature_log_prob_[1] - nb.feature_log_prob_[0]
print("Most spammy words:", list(np.array(vec.get_feature_names_out())[np.argsort(spamminess)[-10:]]))

for msg in ["You won a free prize, click the link", "See you at college tomorrow", "Free momo at my place tonight!"]:
    p = model.predict_proba([msg])[0, 1]
    print(f"{msg!r:45} -> {'SPAM' if p > 0.5 else 'ham'} ({p:.2f})")
`,
  challenges: { en: ['Add 10 more messages of each type, including Romanized Nepali ("timi kaha chau?").', 'Replace Naive Bayes with Logistic Regression and compare.', 'Change the threshold to 0.8 — what happens to precision and recall?', 'Notice "Free momo" — how could you reduce such false alarms?'],
                ne: ['हरेक प्रकारका थप १० सन्देश थप्नुहोस्, रोमन नेपाली ("timi kaha chau?") सहित।', 'Naive Bayes को सट्टा Logistic Regression राखेर तुलना गर्नुहोस्।', 'Threshold 0.8 बनाउनुहोस् — precision र recall मा के हुन्छ?', '"Free momo" हेर्नुहोस् — यस्ता झूटा अलार्म कसरी घटाउने?'] },
},

{
  id: 'cancer', level: 'intermediate', icon: '🩺', lessons: ['logistic-regression', 'metrics', 'cross-validation'],
  title: { en: 'Medical Diagnosis: Breast Cancer', ne: 'स्वास्थ्य निदान: स्तन क्यान्सर' },
  summary: { en: 'Compare models with cross-validation and tune the threshold for high recall.', ne: 'Cross-validation ले मोडेल तुलना गरेर उच्च recall का लागि threshold मिलाउने।' },
  goal: { en: 'Build a classifier that detects malignant tumours, prioritizing recall (missing a cancer is worse than a false alarm), and explain its decisions.', ne: 'घातक ट्युमर पत्ता लगाउने classifier बनाउने, recall लाई प्राथमिकता दिँदै (क्यान्सर छुटाउनु झूटो अलार्मभन्दा खराब), र निर्णय व्याख्या गर्ने।' },
  learn: { en: ['Comparing models with cross-validation', 'Choosing the right metric for the problem', 'Threshold tuning', 'Feature importance for explanation'], ne: ['Cross-validation ले मोडेल तुलना', 'समस्याअनुसार सही मेट्रिक छनोट', 'Threshold मिलाउने', 'व्याख्याका लागि feature importance'] },
  steps: { en: ['Load the data; make "malignant" the positive class.', 'Compare 4 models with 5-fold CV using recall and ROC-AUC.', 'Pick the best and train it on the training set.', 'Find the threshold that gives recall ≥ 98%.', 'Report the confusion matrix at that threshold.', 'Show the most important features.'],
           ne: ['डाटा लोड गरेर "malignant" लाई positive वर्ग बनाउने।', 'Recall र ROC-AUC प्रयोग गरी 5-fold CV ले ४ मोडेल तुलना।', 'उत्तम छानेर training सेटमा तालिम।', 'Recall ≥ ९८% दिने threshold खोज्ने।', 'त्यो threshold मा confusion matrix रिपोर्ट।', 'सबैभन्दा महत्त्वपूर्ण feature देखाउने।'] },
  code: py`
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_validate
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.metrics import confusion_matrix, recall_score, precision_score

data = load_breast_cancer()
X, y = data.data, 1 - data.target           # 1 = malignant
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

models = {
    "LogReg": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),
    "SVM": make_pipeline(StandardScaler(), SVC(probability=True)),
    "Forest": RandomForestClassifier(n_estimators=200, random_state=0),
    "Boosting": GradientBoostingClassifier(random_state=0),
}
for name, m in models.items():
    cv = cross_validate(m, X_tr, y_tr, cv=5, scoring=["recall", "roc_auc"])
    print(f"{name:<9} recall={cv['test_recall'].mean():.3f}  auc={cv['test_roc_auc'].mean():.3f}")

best = models["LogReg"].fit(X_tr, y_tr)
p = best.predict_proba(X_te)[:, 1]
for th in np.arange(0.5, 0.0, -0.05):
    if recall_score(y_te, p >= th) >= 0.98:
        break
pred = (p >= th).astype(int)
print(f"\nChosen threshold {th:.2f}: recall={recall_score(y_te, pred):.3f}, precision={precision_score(y_te, pred):.3f}")
print("Confusion matrix [[TN FP] [FN TP]]:\n", confusion_matrix(y_te, pred))

coefs = best.named_steps["logisticregression"].coef_[0]
top = np.argsort(np.abs(coefs))[-5:][::-1]
print("\nTop features:", [(data.feature_names[i], round(coefs[i], 2)) for i in top])
`,
  challenges: { en: ['Use GridSearchCV to tune C for logistic regression.', 'Plot precision and recall against the threshold.', 'Try reducing to 10 PCA components — does performance hold?', 'Write a short "model card": purpose, data, metrics, limits.'],
                ne: ['Logistic regression को C मिलाउन GridSearchCV प्रयोग गर्नुहोस्।', 'Threshold अनुसार precision र recall को ग्राफ बनाउनुहोस्।', '१० PCA component मा घटाउनुहोस् — प्रदर्शन टिक्छ?', 'छोटो "model card" लेख्नुहोस्: उद्देश्य, डाटा, मेट्रिक्स, सीमा।'] },
},

{
  id: 'segmentation', level: 'intermediate', icon: '🛍️', lessons: ['kmeans', 'pca'],
  title: { en: 'Customer Segmentation for a Shop', ne: 'पसलका लागि ग्राहक विभाजन' },
  summary: { en: 'Use clustering to find customer groups and suggest a marketing plan for each.', ne: 'क्लस्टरिङ प्रयोग गरेर ग्राहक समूह पत्ता लगाउने र हरेकका लागि मार्केटिङ योजना सुझाउने।' },
  goal: { en: 'Group the customers of a Kathmandu supermarket into meaningful segments and describe each segment in business language.', ne: 'काठमाडौंको सुपरमार्केटका ग्राहकलाई अर्थपूर्ण समूहमा बाँडेर हरेक समूहलाई व्यापारिक भाषामा वर्णन गर्ने।' },
  learn: { en: ['RFM features (recency, frequency, money)', 'Scaling before clustering', 'Elbow & silhouette to choose k', 'Turning clusters into business insight'], ne: ['RFM feature (हालसालै, पटक, पैसा)', 'क्लस्टरिङ अघि scaling', 'k छान्न elbow र silhouette', 'क्लस्टरलाई व्यापारिक अन्तर्दृष्टिमा बदल्ने'] },
  steps: { en: ['Generate customer data: visits/month, average bill, days since last visit, online share.', 'Scale the features.', 'Use the elbow and silhouette to choose k.', 'Fit K-Means and add cluster labels.', 'Describe each cluster with mean values and give it a name.', 'Visualize clusters with PCA in 2-D.'],
           ne: ['ग्राहक डाटा बनाउने: महिनामा आगमन, औसत बिल, अन्तिम आगमनदेखिका दिन, अनलाइन हिस्सा।', 'Feature scale गर्ने।', 'k छान्न elbow र silhouette।', 'K-Means fit गरेर क्लस्टर label थप्ने।', 'हरेक क्लस्टरलाई औसत मानले वर्णन गरी नाम दिने।', 'PCA ले 2-D मा क्लस्टर देखाउने।'] },
  code: py`
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

rng = np.random.default_rng(5)
def group(n, visits, bill, recency, online):
    return pd.DataFrame({"visits_per_month": rng.normal(visits, 1.5, n).clip(0.2),
                         "avg_bill_npr": rng.normal(bill, bill * 0.2, n).clip(100),
                         "days_since_last": rng.normal(recency, 4, n).clip(0),
                         "online_share": rng.normal(online, 0.1, n).clip(0, 1)})
df = pd.concat([group(150, 10, 900, 3, 0.1),      # daily essentials
                group(80, 3, 6000, 10, 0.2),      # big monthly shoppers
                group(100, 5, 2500, 5, 0.8),      # online young professionals
                group(70, 1, 1200, 45, 0.3)],     # at-risk / leaving
               ignore_index=True).sample(frac=1, random_state=0)

X = StandardScaler().fit_transform(df)
for k in range(2, 8):
    km = KMeans(k, n_init=10, random_state=0).fit(X)
    print(f"k={k} silhouette={silhouette_score(X, km.labels_):.3f}")

k = 4
df["segment"] = KMeans(k, n_init=10, random_state=0).fit_predict(X)
print("\nSegment profiles:\n", df.groupby("segment").mean().round(1))
print("\nSegment sizes:\n", df["segment"].value_counts().sort_index())

X2 = PCA(2).fit_transform(X)
plt.scatter(X2[:, 0], X2[:, 1], c=df["segment"], cmap="tab10", s=12)
plt.title("Customer segments (PCA view)"); plt.show()
`,
  challenges: { en: ['Name each segment (e.g. "Loyal daily shoppers") and write one marketing action for each.', 'Try DBSCAN. Does it find the same groups?', 'Remove the online_share feature — what changes?', 'Build a classifier that assigns NEW customers to a segment.'],
                ne: ['हरेक समूहको नाम दिनुहोस् (जस्तै "वफादार दैनिक ग्राहक") र हरेकका लागि एउटा मार्केटिङ कदम लेख्नुहोस्।', 'DBSCAN प्रयास गर्नुहोस्। उही समूह भेट्छ?', 'online_share feature हटाउनुहोस् — के बदलिन्छ?', 'नयाँ ग्राहकलाई समूहमा राख्ने classifier बनाउनुहोस्।'] },
},

{
  id: 'nepal-house', level: 'intermediate', icon: '🏠', lessons: ['feature-engineering', 'random-forest', 'cross-validation'],
  title: { en: 'Nepal House Price Predictor', ne: 'नेपाल घर मूल्य अनुमानकर्ता' },
  summary: { en: 'A complete professional pipeline: cleaning, feature engineering, tuning and saving the model.', ne: 'पूरा पेशेवर pipeline: सफाइ, फिचर इन्जिनियरिङ, tuning र मोडेल सेभ।' },
  goal: { en: 'Predict house prices in the Kathmandu valley and beyond with an end-to-end pipeline that handles missing values and categories, then save it for deployment.', ne: 'हराएका मान र श्रेणी सम्हाल्ने end-to-end pipeline ले काठमाडौं उपत्यका र बाहिरका घरको मूल्य अनुमान गर्ने, अनि डिप्लोयका लागि सेभ गर्ने।' },
  learn: { en: ['ColumnTransformer & Pipeline', 'Handling missing values and categories', 'Comparing models and tuning hyperparameters', 'Saving a model with joblib'], ne: ['ColumnTransformer र Pipeline', 'हराएका मान र श्रेणी सम्हाल्ने', 'मोडेल तुलना र hyperparameter tuning', 'joblib ले मोडेल सेभ'] },
  steps: { en: ['Generate a realistic dataset (city, area in aana, floors, road access, age, facing…).', 'Engineer features: total floor area, age.', 'Build a preprocessing ColumnTransformer.', 'Compare Linear, Random Forest and Gradient Boosting with CV.', 'Tune the best model with RandomizedSearchCV.', 'Evaluate on the test set and save the pipeline.'],
           ne: ['वास्तविक जस्तो डाटासेट बनाउने (शहर, आना मा क्षेत्रफल, तल्ला, बाटो, उमेर, मोहडा…)।', 'Feature बनाउने: कुल भुइँ क्षेत्रफल, उमेर।', 'Preprocessing ColumnTransformer बनाउने।', 'CV ले Linear, Random Forest र Gradient Boosting तुलना।', 'उत्तम मोडेललाई RandomizedSearchCV ले tune गर्ने।', 'Test सेटमा मूल्याङ्कन गरी pipeline सेभ गर्ने।'] },
  code: py`
import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split, cross_val_score, RandomizedSearchCV
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(2081)
n = 800
city = rng.choice(["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Butwal", "Biratnagar"], n, p=[.3, .2, .1, .2, .1, .1])
df = pd.DataFrame({
    "city": city,
    "land_aana": rng.uniform(2.5, 12, n).round(1),
    "floors": rng.choice([1, 1.5, 2, 2.5, 3, 4], n),
    "road_ft": rng.choice([8, 10, 13, 16, 20, 26], n),
    "built_bs": rng.integers(2050, 2081, n),
    "facing": rng.choice(["East", "West", "North", "South"], n),
    "parking": rng.choice(["yes", "no"], n, p=[.6, .4]),
})
per_aana = pd.Series(city).map({"Kathmandu": 45, "Lalitpur": 40, "Bhaktapur": 30, "Pokhara": 28, "Butwal": 18, "Biratnagar": 15}).values
df["price_lakh"] = (per_aana * df.land_aana + 18 * df.floors * df.land_aana ** 0.5 + 2.5 * df.road_ft
                    - 1.2 * (2081 - df.built_bs) + np.where(df.facing == "East", 15, 0)
                    + np.where(df.parking == "yes", 20, 0)) * rng.lognormal(0, 0.12, n)
df.loc[rng.choice(n, 40), "road_ft"] = np.nan
df.loc[rng.choice(n, 25), "facing"] = np.nan

# Feature engineering
df["age"] = 2081 - df["built_bs"]
df["floor_area"] = df["land_aana"] * df["floors"]
X, y = df.drop(columns=["price_lakh", "built_bs"]), df["price_lakh"]
num = ["land_aana", "floors", "road_ft", "age", "floor_area"]; cat = ["city", "facing", "parking"]
prep = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")), ("sc", StandardScaler())]), num),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")), ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat)])

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
for name, reg in [("Ridge", Ridge()), ("Forest", RandomForestRegressor(200, random_state=0)), ("Boosting", GradientBoostingRegressor(random_state=0))]:
    s = cross_val_score(Pipeline([("prep", prep), ("m", reg)]), X_tr, y_tr, cv=5, scoring="r2")
    print(f"{name:<9} CV R² = {s.mean():.3f}")

search = RandomizedSearchCV(Pipeline([("prep", prep), ("m", GradientBoostingRegressor(random_state=0))]),
    {"m__n_estimators": [100, 200, 400], "m__learning_rate": [0.03, 0.05, 0.1], "m__max_depth": [2, 3, 4]},
    n_iter=8, cv=4, random_state=0).fit(X_tr, y_tr)
print("\nBest params:", search.best_params_)
pred = search.predict(X_te)
print(f"Test R² = {r2_score(y_te, pred):.3f} | MAE = {mean_absolute_error(y_te, pred):.1f} lakh")

joblib.dump(search.best_estimator_, "nepal_house_model.joblib")
house = pd.DataFrame([{"city": "Lalitpur", "land_aana": 4, "floors": 2.5, "road_ft": 13, "age": 6,
                       "floor_area": 10, "facing": "East", "parking": "yes"}])
print("Estimated price:", round(search.predict(house)[0], 1), "lakh NPR")
`,
  challenges: { en: ['Predict log(price) instead of price — does MAE improve?', 'Add a "distance_to_ring_road_km" feature with your own logic.', 'Plot residuals (actual − predicted). Where is the model worst?', 'Build a Streamlit app around the saved model (on your computer).'],
                ne: ['मूल्यको सट्टा log(price) अनुमान गर्नुहोस् — MAE सुध्रिन्छ?', 'आफ्नै तर्कले "distance_to_ring_road_km" feature थप्नुहोस्।', 'Residual (वास्तविक − अनुमानित) को ग्राफ बनाउनुहोस्। मोडेल कहाँ सबैभन्दा कमजोर?', 'सेभ गरिएको मोडेलमा Streamlit एप बनाउनुहोस् (आफ्नो कम्प्युटरमा)।'] },
},

{
  id: 'digits', level: 'advanced', icon: '✍️', lessons: ['neural-networks', 'training-deep', 'cnn'],
  title: { en: 'Handwritten Digit Recognizer', ne: 'हस्तलिखित अंक पहिचानकर्ता' },
  summary: { en: 'Train a neural network to read handwritten digits and analyse its mistakes.', ne: 'हस्तलिखित अंक पढ्न न्युरल नेटवर्क तालिम दिएर यसका गल्ती विश्लेषण गर्ने।' },
  goal: { en: 'Reach 97%+ accuracy on handwritten digits with a neural network, then look at the images it gets wrong to understand its weaknesses.', ne: 'न्युरल नेटवर्कले हस्तलिखित अंकमा ९७%+ accuracy पुर्याउने, अनि कमजोरी बुझ्न गलत भएका फोटो हेर्ने।' },
  learn: { en: ['Images as arrays', 'Neural network training and learning curves', 'Error analysis', 'Comparing with classical models'], ne: ['फोटोलाई array को रूपमा', 'न्युरल नेटवर्क तालिम र learning curve', 'गल्ती विश्लेषण', 'परम्परागत मोडेलसँग तुलना'] },
  steps: { en: ['Load and display some digit images.', 'Scale pixels and split the data.', 'Train an MLP neural network.', 'Compare with SVM and Random Forest.', 'Show the confusion matrix.', 'Display misclassified digits.'],
           ne: ['केही अंक फोटो लोड गरेर देखाउने।', 'Pixel scale गरी डाटा बाँड्ने।', 'MLP न्युरल नेटवर्क तालिम।', 'SVM र Random Forest सँग तुलना।', 'Confusion matrix देखाउने।', 'गलत वर्गीकृत अंक देखाउने।'] },
  code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix

d = load_digits()
fig, ax = plt.subplots(1, 8, figsize=(12, 2))
for i in range(8):
    ax[i].imshow(d.images[i], cmap="gray_r"); ax[i].set_title(d.target[i]); ax[i].axis("off")
plt.show()

X = d.data / 16.0                       # pixels 0..16 -> 0..1
X_tr, X_te, y_tr, y_te, img_tr, img_te = train_test_split(X, d.target, d.images, test_size=0.25, random_state=1)

models = {"Neural net": MLPClassifier((256, 128), alpha=1e-4, max_iter=200, random_state=0),
          "SVM (rbf)": SVC(gamma=0.05, C=10),
          "Random forest": RandomForestClassifier(300, random_state=0)}
for name, m in models.items():
    m.fit(X_tr, y_tr)
    print(f"{name:<14} accuracy = {m.score(X_te, y_te) * 100:.2f}%")

net = models["Neural net"]
pred = net.predict(X_te)
print("\nConfusion matrix:\n", confusion_matrix(y_te, pred))
wrong = np.where(pred != y_te)[0][:8]
if len(wrong):
    fig, ax = plt.subplots(1, len(wrong), figsize=(1.6 * len(wrong), 2))
    for a, i in zip(np.atleast_1d(ax), wrong):
        a.imshow(img_te[i], cmap="gray_r"); a.set_title(f"true {y_te[i]}\npred {pred[i]}", fontsize=9); a.axis("off")
    plt.show()
`,
  challenges: { en: ['Plot the loss curve (<code>net.loss_curve_</code>).', 'Try hidden layers (32,), (512,), (256,128,64). What happens?', 'Add noise to test images — which model is most robust?', 'Build the network from scratch in NumPy using softmax (extend the XOR lesson code).'],
                ne: ['Loss curve (<code>net.loss_curve_</code>) को ग्राफ बनाउनुहोस्।', 'Hidden layer (32,), (512,), (256,128,64) प्रयास गर्नुहोस्। के हुन्छ?', 'Test फोटोमा noise थप्नुहोस् — कुन मोडेल सबैभन्दा बलियो?', 'Softmax प्रयोग गरेर NumPy मा सुरुदेखि नेटवर्क बनाउनुहोस् (XOR पाठको कोड विस्तार गर्नुहोस्)।'] },
},

{
  id: 'recommender', level: 'advanced', icon: '🎬', lessons: ['knn', 'pca'],
  title: { en: 'Movie Recommender System', ne: 'चलचित्र सिफारिस प्रणाली' },
  summary: { en: 'Recommend Nepali & international movies using user similarity and matrix factorization.', ne: 'प्रयोगकर्ता समानता र matrix factorization प्रयोग गरी नेपाली र अन्तर्राष्ट्रिय चलचित्र सिफारिस गर्ने।' },
  goal: { en: 'Given users\' ratings, predict which unseen movies each user will like — the idea behind Netflix, YouTube and Daraz recommendations.', ne: 'प्रयोगकर्ताका rating बाट, हरेकले नहेरेका कुन चलचित्र मन पराउँछन् अनुमान गर्ने — Netflix, YouTube र Daraz सिफारिसको आधारभूत विचार।' },
  learn: { en: ['The user–item rating matrix', 'Cosine similarity', 'User-based collaborative filtering', 'Matrix factorization (SVD) for hidden tastes'], ne: ['प्रयोगकर्ता–वस्तु rating matrix', 'Cosine similarity', 'प्रयोगकर्तामा आधारित collaborative filtering', 'लुकेका रुचिका लागि matrix factorization (SVD)'] },
  steps: { en: ['Build a ratings matrix (0 = not watched).', 'Compute cosine similarity between users.', 'Predict a user\'s rating as a similarity-weighted average of others.', 'Recommend the top unseen movies.', 'Use TruncatedSVD to discover hidden "taste" factors.'],
           ne: ['Rating matrix बनाउने (0 = नहेरेको)।', 'प्रयोगकर्ताबीच cosine similarity निकाल्ने।', 'अरूको समानता-भारित औसतले प्रयोगकर्ताको rating अनुमान।', 'नहेरेका शीर्ष चलचित्र सिफारिस।', 'लुकेका "रुचि" कारक पत्ता लगाउन TruncatedSVD।'] },
  code: py`
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD

movies = ["Kabaddi", "Loot", "Chhakka Panja", "Pashupati Prasad", "Jatra", "Avengers", "Inception", "Interstellar", "Frozen", "Coco"]
users = ["Aasha", "Bikash", "Chandra", "Dipa", "Esha", "Firoj", "Gita"]
R = pd.DataFrame([
    [5, 4, 5, 0, 4, 0, 2, 0, 0, 0],
    [4, 5, 4, 5, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 5, 5, 4, 0, 1],
    [1, 0, 0, 1, 0, 4, 5, 5, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 5, 5],
    [5, 5, 0, 4, 5, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 3, 0, 0, 4, 5],
], index=users, columns=movies, dtype=float)
print(R, "\n")

sim = pd.DataFrame(cosine_similarity(R), index=users, columns=users)
print("Who is most similar to Aasha?\n", sim["Aasha"].drop("Aasha").sort_values(ascending=False).round(2), "\n")

def recommend(user, k=3):
    s = sim[user].drop(user)
    others = R.loc[s.index]
    scores = (others.T @ s) / ((others.T > 0).astype(float) @ s + 1e-9)    # weighted average of ratings
    unseen = R.loc[user] == 0
    return scores[unseen].sort_values(ascending=False).head(k).round(2)

for u in ["Aasha", "Dipa", "Esha"]:
    print(f"Recommendations for {u}:\n{recommend(u)}\n")

svd = TruncatedSVD(n_components=2, random_state=0).fit(R)
print("Hidden taste factors per movie (SVD):")
print(pd.DataFrame(svd.components_.T, index=movies, columns=["factor1", "factor2"]).round(2))
`,
  challenges: { en: ['Add yourself as a user with your real ratings and get recommendations.', 'Implement item-based filtering (similarity between movies).', 'Subtract each user\'s mean rating before computing similarity — does it help?', 'Reconstruct the full ratings matrix from SVD and recommend from it.'],
                ne: ['आफूलाई प्रयोगकर्ताको रूपमा वास्तविक rating सहित थपेर सिफारिस लिनुहोस्।', 'वस्तुमा आधारित filtering (चलचित्रबीचको समानता) बनाउनुहोस्।', 'Similarity निकाल्नुअघि हरेक प्रयोगकर्ताको औसत rating घटाउनुहोस् — मद्दत गर्छ?', 'SVD बाट पूरै rating matrix पुनर्निर्माण गरी त्यसबाट सिफारिस गर्नुहोस्।'] },
},

{
  id: 'nn-scratch', level: 'advanced', icon: '🧠', lessons: ['neural-networks', 'gradient-descent', 'training-deep'],
  title: { en: 'Capstone: Your Own Deep Learning Library', ne: 'क्याप्स्टोन: आफ्नै डिप लर्निङ लाइब्रेरी' },
  summary: { en: 'Write a mini-PyTorch in NumPy: layers, softmax, mini-batches — and train it on real digits.', ne: 'NumPy मा सानो PyTorch लेख्ने: layer, softmax, mini-batch — र वास्तविक अंकमा तालिम दिने।' },
  goal: { en: 'Prove you truly understand deep learning by implementing a multi-class neural network with mini-batch gradient descent from scratch and reaching ~95% on the digits dataset.', ne: 'Mini-batch gradient descent सहितको बहु-वर्ग न्युरल नेटवर्क सुरुदेखि बनाएर अंक डाटासेटमा ~९५% पुर्याई डिप लर्निङ साँच्चै बुझेको प्रमाणित गर्ने।' },
  learn: { en: ['Layer classes with forward/backward', 'Softmax + cross-entropy gradient', 'Mini-batches and epochs', 'Debugging training'], ne: ['forward/backward सहितका Layer class', 'Softmax + cross-entropy gradient', 'Mini-batch र epoch', 'तालिम debug गर्ने'] },
  steps: { en: ['Write Dense and ReLU layers, each with forward() and backward().', 'Combine softmax and cross-entropy (gradient = p − y).', 'Write the training loop with shuffled mini-batches.', 'Train on digits and track accuracy each epoch.', 'Compare with scikit-learn\'s MLPClassifier.'],
           ne: ['forward() र backward() सहित Dense र ReLU layer लेख्ने।', 'Softmax र cross-entropy जोड्ने (gradient = p − y)।', 'Shuffle गरिएका mini-batch सहित तालिम लूप लेख्ने।', 'अंकमा तालिम दिएर हरेक epoch मा accuracy हेर्ने।', 'scikit-learn को MLPClassifier सँग तुलना।'] },
  code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

class Dense:
    def __init__(self, n_in, n_out, rng):
        self.W = rng.normal(0, np.sqrt(2 / n_in), (n_in, n_out)); self.b = np.zeros(n_out)
    def forward(self, x):
        self.x = x; return x @ self.W + self.b
    def backward(self, grad, lr):
        dW, db = self.x.T @ grad, grad.sum(0)
        grad_in = grad @ self.W.T
        self.W -= lr * dW; self.b -= lr * db
        return grad_in

class ReLU:
    def forward(self, x):
        self.mask = x > 0; return x * self.mask
    def backward(self, grad, lr):
        return grad * self.mask

def softmax(z):
    e = np.exp(z - z.max(1, keepdims=True)); return e / e.sum(1, keepdims=True)

d = load_digits()
X, y = d.data / 16.0, d.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
Y_tr = np.eye(10)[y_tr]                          # one-hot labels

rng = np.random.default_rng(0)
layers = [Dense(64, 64, rng), ReLU(), Dense(64, 10, rng)]
lr, batch, hist = 0.05, 32, []

def predict(x):
    for L in layers: x = L.forward(x)
    return x

for epoch in range(30):
    idx = rng.permutation(len(X_tr))
    for s in range(0, len(idx), batch):
        b = idx[s:s + batch]
        p = softmax(predict(X_tr[b]))
        grad = (p - Y_tr[b]) / len(b)            # softmax + cross-entropy gradient
        for L in reversed(layers): grad = L.backward(grad, lr)
    acc = (predict(X_te).argmax(1) == y_te).mean()
    hist.append(acc)
    if epoch % 5 == 0 or epoch == 29:
        print(f"epoch {epoch:2d}  test accuracy {acc:.3f}")

plt.plot(hist); plt.xlabel("epoch"); plt.ylabel("test accuracy"); plt.title("My own neural network!"); plt.show()
`,
  challenges: { en: ['Add a second hidden layer. Does accuracy improve?', 'Implement momentum or Adam in the Dense layer.', 'Add dropout as a new layer class.', 'Add a validation split and implement early stopping.'],
                ne: ['दोस्रो hidden layer थप्नुहोस्। accuracy सुध्रिन्छ?', 'Dense layer मा momentum वा Adam बनाउनुहोस्।', 'नयाँ layer class को रूपमा dropout थप्नुहोस्।', 'Validation विभाजन थपेर early stopping बनाउनुहोस्।'] },
}
);

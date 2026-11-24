/* Level 3 — Unsupervised Learning */
COURSE.lessons.push(
{
  id: 'kmeans', level: 'unsupervised', minutes: 30,
  title: { en: 'K-Means Clustering', ne: 'K-Means क्लस्टरिङ' },
  body: {
en: `
<p><b>Clustering</b> groups similar items together <i>without any labels</i>. K-Means is the most popular clustering algorithm.</p>
<div class="box analogy"><b class="t">Intuition: placing tea shops</b>You want to open 3 tea shops in a town so that every house is close to one. Put 3 shops randomly → each house goes to its nearest shop → move each shop to the middle of its houses → repeat. The shops settle in the centres of 3 neighbourhoods. Those centres are the <b>centroids</b>.</div>
<h2>⚙️ Algorithm</h2>
<ol><li>Choose <b>k</b> (number of clusters) and place k centroids randomly.</li>
<li><b>Assign</b>: each point joins its nearest centroid.</li>
<li><b>Update</b>: move each centroid to the mean of its points.</li>
<li>Repeat 2–3 until centroids stop moving.</li></ol>
<p>K-Means minimizes <b>inertia</b>: the total squared distance from points to their centroid.</p>
<div data-code="0"></div>
<h2>🦵 How to choose k? The elbow method</h2>
<p>Run K-Means for k = 1…10 and plot the inertia. It always decreases, but at some point the improvement slows sharply — the "elbow". That k is a good choice. The <b>silhouette score</b> (−1 to 1, higher is better) is another check.</p>
<div data-code="1"></div>
<div class="box warn">K-Means assumes round, similar-sized clusters and needs scaled features. For odd shapes use DBSCAN (next lesson).</div>
<div class="box use"><b class="t">Uses</b>Customer segmentation (budget / regular / premium shoppers), grouping news articles, image colour compression, organizing photos.</div>
`,
ne: `
<p><b>क्लस्टरिङ</b> ले <i>कुनै label बिना</i> मिल्दाजुल्दा वस्तुहरूलाई समूहमा राख्छ। K-Means सबैभन्दा लोकप्रिय क्लस्टरिङ एल्गोरिदम हो।</p>
<div class="box analogy"><b class="t">सहज बुझाइ: चिया पसल राख्ने</b>तपाईं सहरमा ३ वटा चिया पसल खोल्न चाहनुहुन्छ ताकि हरेक घर कुनै एकको नजिक होस्। ३ पसल random ठाउँमा राख्नुहोस् → हरेक घर नजिकको पसलमा जान्छ → हरेक पसललाई आफ्ना घरहरूको बीचमा सार्नुहोस् → दोहोर्याउनुहोस्। पसलहरू ३ टोलको केन्द्रमा स्थिर हुन्छन्। ती केन्द्र <b>centroid</b> हुन्।</div>
<h2>⚙️ एल्गोरिदम</h2>
<ol><li><b>k</b> (क्लस्टर संख्या) छान्ने र k वटा centroid random ठाउँमा राख्ने।</li>
<li><b>Assign</b>: हरेक बिन्दु नजिकको centroid मा जोडिन्छ।</li>
<li><b>Update</b>: हरेक centroid लाई आफ्ना बिन्दुहरूको औसतमा सार्ने।</li>
<li>Centroid चल्न नछोडेसम्म २–३ दोहोर्याउने।</li></ol>
<p>K-Means ले <b>inertia</b> घटाउँछ: बिन्दुहरूदेखि तिनको centroid सम्मको कुल वर्ग दूरी।</p>
<div data-code="0"></div>
<h2>🦵 k कसरी छान्ने? Elbow विधि</h2>
<p>k = 1…10 का लागि K-Means चलाएर inertia को ग्राफ बनाउनुहोस्। यो सधैं घट्छ, तर कुनै बिन्दुमा सुधार एक्कासि सुस्त हुन्छ — "कुहिनो (elbow)"। त्यो k राम्रो छनोट हो। <b>Silhouette score</b> (−1 देखि 1, बढी राम्रो) अर्को जाँच हो।</p>
<div data-code="1"></div>
<div class="box warn">K-Means ले गोलो, उस्तै आकारका क्लस्टर मान्छ र scale गरिएका feature चाहिन्छ। अनौठो आकारका लागि DBSCAN प्रयोग गर्नुहोस् (अर्को पाठ)।</div>
<div class="box use"><b class="t">प्रयोग</b>ग्राहक विभाजन (सस्तो / नियमित / प्रिमियम किन्ने), समाचार लेख समूह, फोटोको रङ संकुचन, फोटो व्यवस्थापन।</div>
`},
  code: [
    { title: { en: 'K-Means from scratch (step by step)', ne: 'सुरुदेखि K-Means (चरणबद्ध)' }, code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=300, centers=3, cluster_std=0.9, random_state=4)
k = 3
rng = np.random.default_rng(0)
centroids = X[rng.choice(len(X), k, replace=False)]

fig, axes = plt.subplots(1, 4, figsize=(15, 3.5))
for step, ax in enumerate(axes):
    dists = np.linalg.norm(X[:, None, :] - centroids[None, :, :], axis=2)   # (300, k)
    labels = dists.argmin(axis=1)                                          # assign
    ax.scatter(X[:, 0], X[:, 1], c=labels, cmap="viridis", s=10)
    ax.scatter(centroids[:, 0], centroids[:, 1], c="red", marker="X", s=200)
    ax.set_title(f"iteration {step}")
    centroids = np.array([X[labels == j].mean(axis=0) for j in range(k)])  # update
plt.show()
print("Final centroids:\n", centroids.round(2))
` },
    { title: { en: 'Elbow method & silhouette', ne: 'Elbow विधि र silhouette' }, code: py`
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=500, centers=4, random_state=11)
ks, inertias = range(1, 10), []
for k in ks:
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    inertias.append(km.inertia_)
    if k > 1:
        print(f"k={k}: silhouette = {silhouette_score(X, km.labels_):.3f}")
plt.plot(ks, inertias, "o-"); plt.xlabel("k"); plt.ylabel("inertia"); plt.title("Look for the elbow")
plt.show()
` },
  ],
  quiz: [
    { q: { en: 'K-Means needs labels to train.', ne: 'K-Means लाई तालिमका लागि label चाहिन्छ।' }, options: { en: ['True', 'False'], ne: ['सत्य', 'असत्य'] }, answer: 1, explain: { en: 'It is unsupervised — no labels.', ne: 'यो अनसुपरभाइज्ड हो — label चाहिँदैन।' } },
    { q: { en: 'In the update step, each centroid moves to…', ne: 'Update चरणमा हरेक centroid कहाँ सर्छ?' },
      options: { en: ['the mean of the points assigned to it', 'a random point', 'the origin (0,0)', 'the farthest point'], ne: ['आफूमा जोडिएका बिन्दुहरूको औसत', 'random बिन्दु', 'मूल बिन्दु (0,0)', 'सबैभन्दा टाढाको बिन्दु'] }, answer: 0, explain: { en: 'Hence the name K-Means.', ne: 'त्यसैले नाम K-Means।' } },
    { q: { en: 'The elbow method helps choose…', ne: 'Elbow विधिले के छान्न मद्दत गर्छ?' }, options: ['k', 'learning rate', 'max_depth', 'test size'], answer: 0, explain: { en: 'It picks the number of clusters.', ne: 'यसले क्लस्टर संख्या छान्छ।' } },
  ]
},

{
  id: 'pca', level: 'unsupervised', minutes: 30,
  title: { en: 'PCA — Dimensionality Reduction', ne: 'PCA — आयाम घटाउने' },
  body: {
en: `
<p>Real datasets can have hundreds of features. <b>PCA (Principal Component Analysis)</b> compresses them into a few new features that keep most of the information.</p>
<div class="box analogy"><b class="t">Intuition: the best photo angle</b>You photograph a 3-D object (a teapot). From some angles the photo shows almost nothing; from the best angle you see its whole shape in 2-D. PCA finds the "best angles" — the directions where the data spreads out most.</div>
<h2>⚙️ How it works</h2>
<ol><li>Standardize the features (mean 0, std 1).</li>
<li>Find the direction of <b>maximum variance</b> → principal component 1 (PC1).</li>
<li>Find the next direction, perpendicular to PC1, with the most remaining variance → PC2, and so on.</li>
<li>Keep only the first few components.</li></ol>
<p>Mathematically, components are the <b>eigenvectors</b> of the covariance matrix; the <b>explained variance ratio</b> tells how much information each keeps.</p>
<div data-code="0"></div>
<h2>🎯 Why use PCA?</h2>
<ul><li><b>Visualization</b>: see 64-dimensional digit images in 2-D.</li><li><b>Speed</b>: fewer features → faster training.</li><li><b>Noise removal</b>: dropping small components removes noise.</li><li>Fight the <b>curse of dimensionality</b> (too many features, too little data).</li></ul>
<div data-code="1"></div>
<div class="box warn">PCA components are mixtures of original features, so they are harder to interpret. Also, PCA is linear — for complex structures try t-SNE or UMAP (for visualization).</div>
`,
ne: `
<p>वास्तविक डाटासेटमा सयौं feature हुन सक्छन्। <b>PCA (Principal Component Analysis)</b> ले तिनलाई धेरैजसो जानकारी जोगाउने थोरै नयाँ feature मा खुम्च्याउँछ।</p>
<div class="box analogy"><b class="t">सहज बुझाइ: फोटोको उत्तम कोण</b>तपाईं 3-D वस्तु (केतली) को फोटो खिच्नुहुन्छ। कुनै कोणबाट फोटोमा लगभग केही देखिँदैन; उत्तम कोणबाट 2-D मै पूरै आकार देखिन्छ। PCA ले "उत्तम कोण" — डाटा सबैभन्दा बढी फैलिने दिशा — खोज्छ।</div>
<h2>⚙️ कसरी काम गर्छ</h2>
<ol><li>Feature लाई standardize गर्ने (mean 0, std 1)।</li>
<li><b>अधिकतम variance</b> को दिशा खोज्ने → principal component 1 (PC1)।</li>
<li>PC1 सँग लम्बवत्, बाँकी सबैभन्दा बढी variance भएको अर्को दिशा → PC2, यसरी नै।</li>
<li>पहिलो केही component मात्र राख्ने।</li></ol>
<p>गणितीय रूपमा component हरू covariance matrix का <b>eigenvector</b> हुन्; <b>explained variance ratio</b> ले हरेकले कति जानकारी राख्छ बताउँछ।</p>
<div data-code="0"></div>
<h2>🎯 PCA किन प्रयोग गर्ने?</h2>
<ul><li><b>चित्रण</b>: ६४-आयामको अंक फोटोलाई 2-D मा हेर्ने।</li><li><b>गति</b>: कम feature → छिटो तालिम।</li><li><b>Noise हटाउने</b>: साना component हटाउँदा noise हट्छ।</li><li><b>Curse of dimensionality</b> (धेरै feature, थोरै डाटा) सँग लड्ने।</li></ul>
<div data-code="1"></div>
<div class="box warn">PCA component हरू मूल feature को मिश्रण हुन्, त्यसैले व्याख्या गर्न गाह्रो। साथै PCA linear हो — जटिल संरचनाका लागि t-SNE वा UMAP (चित्रणका लागि) प्रयास गर्नुहोस्।</div>
`},
  code: [
    { title: { en: '64-D digits → 2-D picture', ne: '६४-आयाम अंक → 2-D चित्र' }, code: py`
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

digits = load_digits()            # 1797 images of 8x8 = 64 features
print("Original shape:", digits.data.shape)
X = StandardScaler().fit_transform(digits.data)
X2 = PCA(n_components=2).fit_transform(X)
print("After PCA:", X2.shape)

plt.figure(figsize=(8, 6))
sc = plt.scatter(X2[:, 0], X2[:, 1], c=digits.target, cmap="tab10", s=8)
plt.colorbar(sc, label="digit"); plt.xlabel("PC1"); plt.ylabel("PC2")
plt.title("Handwritten digits squeezed into 2 dimensions")
plt.show()
` },
    { title: { en: 'How many components do we need?', ne: 'कति component चाहिन्छ?' }, code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.decomposition import PCA

X = load_digits().data
pca = PCA().fit(X)
cum = np.cumsum(pca.explained_variance_ratio_)
for target in [0.80, 0.90, 0.95, 0.99]:
    print(f"{int(target*100)}% of information kept with {np.argmax(cum >= target) + 1} of 64 components")
plt.plot(cum, lw=2); plt.axhline(0.95, ls="--", color="r")
plt.xlabel("number of components"); plt.ylabel("cumulative explained variance"); plt.show()
` },
  ],
  quiz: [
    { q: { en: 'PCA finds directions of…', ne: 'PCA ले कुन दिशा खोज्छ?' },
      options: { en: ['maximum variance (spread)', 'minimum variance', 'random directions', 'class labels'], ne: ['अधिकतम variance (फैलावट)', 'न्यूनतम variance', 'random दिशा', 'class label'] }, answer: 0, explain: { en: 'More spread = more information.', ne: 'बढी फैलावट = बढी जानकारी।' } },
    { q: { en: 'A common use of PCA is…', ne: 'PCA को सामान्य प्रयोग…' },
      options: { en: ['visualizing high-dimensional data in 2-D', 'adding more features', 'labelling data', 'web design'], ne: ['उच्च-आयामको डाटा 2-D मा हेर्ने', 'feature थप्ने', 'डाटामा label लगाउने', 'वेब डिजाइन'] }, answer: 0, explain: { en: 'Reduce to 2–3 components and plot.', ne: '२–३ component मा घटाएर ग्राफ बनाउने।' } },
  ]
},

{
  id: 'anomaly-detection', level: 'unsupervised', minutes: 25,
  title: { en: 'DBSCAN & Anomaly Detection', ne: 'DBSCAN र असामान्यता पहिचान' },
  body: {
en: `
<h2>🌌 DBSCAN — clusters of any shape</h2>
<p>DBSCAN groups points that are <b>densely packed</b> together and marks points in empty regions as <b>noise</b>. You don't choose k!</p>
<ul><li><b>eps</b>: how close points must be to count as neighbours.</li><li><b>min_samples</b>: how many neighbours make a "dense" region.</li></ul>
<div class="box analogy"><b class="t">Intuition</b>Look at a city from an airplane at night: bright dense areas are neighbourhoods (clusters); single lonely lights in the fields are noise.</div>
<div data-code="0"></div>
<h2>🚨 Anomaly (outlier) detection</h2>
<p>Find the rare, unusual items: a fraudulent transaction, a failing machine, a hacker's login. <b>Isolation Forest</b> builds random trees: unusual points are isolated with <b>very few splits</b> because they're far from everyone else.</p>
<div data-code="1"></div>
<div class="box use"><b class="t">Uses</b>Credit-card / mobile-wallet fraud, network intrusion detection, factory sensor faults, detecting data-entry errors before training.</div>
`,
ne: `
<h2>🌌 DBSCAN — जुनसुकै आकारका क्लस्टर</h2>
<p>DBSCAN ले <b>घना रूपमा</b> सँगै भएका बिन्दुहरूलाई समूह बनाउँछ र खाली क्षेत्रका बिन्दुलाई <b>noise</b> भनी चिन्ह लगाउँछ। k छान्नु पर्दैन!</p>
<ul><li><b>eps</b>: छिमेकी गनिन बिन्दुहरू कति नजिक हुनुपर्छ।</li><li><b>min_samples</b>: "घना" क्षेत्र बनाउन कति छिमेकी चाहिन्छ।</li></ul>
<div class="box analogy"><b class="t">सहज बुझाइ</b>राति हवाईजहाजबाट सहर हेर्नुहोस्: उज्यालो घना क्षेत्र टोल (क्लस्टर) हुन्; खेतमा एक्लै बलेका बत्ती noise हुन्।</div>
<div data-code="0"></div>
<h2>🚨 असामान्यता (outlier) पहिचान</h2>
<p>दुर्लभ, असामान्य वस्तु पत्ता लगाउने: ठगीको कारोबार, बिग्रँदै गरेको मेसिन, ह्याकरको लगइन। <b>Isolation Forest</b> ले random ट्री बनाउँछ: असामान्य बिन्दुहरू अरू सबैबाट टाढा हुने भएकाले <b>धेरै थोरै विभाजन</b> मै अलग हुन्छन्।</p>
<div data-code="1"></div>
<div class="box use"><b class="t">प्रयोग</b>क्रेडिट कार्ड / मोबाइल वालेट ठगी, नेटवर्क घुसपैठ पहिचान, कारखानाको सेन्सर खराबी, तालिम अघि डाटा प्रविष्टि गल्ती पत्ता लगाउने।</div>
`},
  code: [
    { title: { en: 'K-Means vs DBSCAN on moons', ne: 'चन्द्राकार डाटामा K-Means बनाम DBSCAN' }, code: py`
import matplotlib.pyplot as plt
from sklearn.datasets import make_moons
from sklearn.cluster import KMeans, DBSCAN

X, _ = make_moons(n_samples=400, noise=0.07, random_state=0)
km = KMeans(n_clusters=2, n_init=10, random_state=0).fit_predict(X)
db = DBSCAN(eps=0.2, min_samples=5).fit_predict(X)

fig, ax = plt.subplots(1, 2, figsize=(11, 4))
ax[0].scatter(X[:, 0], X[:, 1], c=km, cmap="coolwarm", s=12); ax[0].set_title("K-Means: wrong (assumes round blobs)")
ax[1].scatter(X[:, 0], X[:, 1], c=db, cmap="coolwarm", s=12); ax[1].set_title("DBSCAN: follows the shape")
plt.show()
print("DBSCAN found clusters:", set(db) - {-1}, "| noise points:", (db == -1).sum())
` },
    { title: { en: 'Find fraudulent transactions', ne: 'ठगी कारोबार पत्ता लगाउने' }, code: py`
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

rng = np.random.default_rng(3)
normal = pd.DataFrame({"amount": rng.normal(1500, 400, 500).round(),
                       "hour": rng.normal(14, 3, 500).round().clip(0, 23)})
fraud = pd.DataFrame({"amount": [95000, 72000, 50, 88000], "hour": [3, 2, 4, 23]})
df = pd.concat([normal, fraud], ignore_index=True)

iso = IsolationForest(contamination=0.01, random_state=0).fit(df)
df["anomaly"] = iso.predict(df)          # -1 = anomaly, 1 = normal
print("Flagged as suspicious:\n", df[df["anomaly"] == -1])
` },
  ],
  quiz: [
    { q: { en: 'Which algorithm can mark points as noise and doesn\'t need k?', ne: 'कुन एल्गोरिदमले बिन्दुलाई noise भन्न सक्छ र k चाहिँदैन?' }, options: ['K-Means', 'DBSCAN', 'Linear Regression', 'PCA'], answer: 1, explain: { en: 'DBSCAN labels sparse points as −1 (noise).', ne: 'DBSCAN ले विरल बिन्दुलाई −1 (noise) भन्छ।' } },
    { q: { en: 'Isolation Forest detects anomalies because they…', ne: 'Isolation Forest ले असामान्यता किन पत्ता लगाउँछ?' },
      options: { en: ['are isolated with very few random splits', 'have the most neighbours', 'always have value 0', 'are labelled'], ne: ['धेरै थोरै random विभाजनमा अलग हुन्छन्', 'सबैभन्दा धेरै छिमेकी हुन्छन्', 'सधैं 0 हुन्छन्', 'label लागेका हुन्छन्'] }, answer: 0, explain: { en: 'Rare, far-away points are easy to separate.', ne: 'दुर्लभ, टाढाका बिन्दु छुट्याउन सजिलो।' } },
  ]
}
);

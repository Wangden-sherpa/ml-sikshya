/* Level 6 — Professional */
COURSE.lessons.push(
{
  id: 'deployment', level: 'pro', minutes: 30,
  title: { en: 'Deploying Models & MLOps', ne: 'मोडेल डिप्लोय र MLOps' },
  body: {
en: `
<p>A model in a notebook helps nobody. <b>Deployment</b> means putting it where real users or systems can use it. <b>MLOps</b> is the set of practices to do this reliably — like DevOps, but for ML.</p>
<h2>🧳 Step 1 — Save the trained pipeline</h2>
<p>Save the <i>whole pipeline</i> (preprocessing + model) with <code>joblib</code>, so predictions get exactly the same preprocessing.</p>
<div data-code="0"></div>
<h2>🌐 Step 2 — Serve it as an API</h2>
<p>Wrap the model in a small web service. Other apps (a website, a mobile app) send data and receive predictions as JSON. <b>FastAPI</b> is the popular choice:</p>
<div data-code="1"></div>
<h2>🚢 Step 3 — Package & host</h2>
<ul><li><b>Docker</b>: put code + model + libraries in a container that runs the same everywhere.</li>
<li><b>Hosting</b>: a cloud VM, Render/Railway, AWS SageMaker, Google Vertex AI, Azure ML, or Hugging Face Spaces (free demos with Gradio/Streamlit).</li>
<li><b>Quick demo apps</b>: <b>Streamlit</b> or <b>Gradio</b> make a web UI in ~20 lines — perfect for your portfolio.</li></ul>
<h2>🔄 The MLOps lifecycle</h2>
<div class="flow"><span>Data versioning (DVC)</span><i>→</i><span>Experiment tracking (MLflow, W&amp;B)</span><i>→</i><span>CI/CD tests</span><i>→</i><span>Deploy</span><i>→</i><span>Monitor</span><i>→</i><span>Retrain</span></div>
<h2>📉 Monitoring: models get worse over time</h2>
<p><b>Data drift</b>: the input data changes (new customer types, new phone models). <b>Concept drift</b>: the relationship changes (prices after inflation, fraud tactics evolve). Monitor input statistics and live accuracy; retrain when they drift.</p>
<div data-code="2"></div>
<div class="box key"><b class="t">Professional checklist</b>Reproducible code (fixed random seeds, requirements.txt) · versioned data & models · a baseline to compare against · automated tests · logging & monitoring · a plan to retrain and roll back.</div>
`,
ne: `
<p>Notebook मा मात्र रहेको मोडेलले कसैलाई मद्दत गर्दैन। <b>डिप्लोयमेन्ट</b> भनेको वास्तविक प्रयोगकर्ता वा प्रणालीले प्रयोग गर्न सक्ने ठाउँमा राख्नु हो। <b>MLOps</b> यो भरपर्दो तरिकाले गर्ने अभ्यासहरूको समूह हो — DevOps जस्तै, तर ML का लागि।</p>
<h2>🧳 चरण १ — तालिम पाएको pipeline सेभ गर्ने</h2>
<p><i>पूरै pipeline</i> (preprocessing + मोडेल) <code>joblib</code> ले सेभ गर्नुहोस्, ताकि अनुमानमा ठ्याक्कै उही preprocessing होस्।</p>
<div data-code="0"></div>
<h2>🌐 चरण २ — API को रूपमा उपलब्ध गराउने</h2>
<p>मोडेललाई सानो वेब सेवामा राख्ने। अरू एप (वेबसाइट, मोबाइल एप) ले डाटा पठाउँछन् र JSON मा अनुमान पाउँछन्। <b>FastAPI</b> लोकप्रिय रोजाइ हो:</p>
<div data-code="1"></div>
<h2>🚢 चरण ३ — प्याकेज र होस्ट</h2>
<ul><li><b>Docker</b>: कोड + मोडेल + लाइब्रेरी एउटा container मा राख्ने, जुन जताततै उस्तै चल्छ।</li>
<li><b>होस्टिङ</b>: cloud VM, Render/Railway, AWS SageMaker, Google Vertex AI, Azure ML, वा Hugging Face Spaces (Gradio/Streamlit सहित निःशुल्क डेमो)।</li>
<li><b>छिटो डेमो एप</b>: <b>Streamlit</b> वा <b>Gradio</b> ले ~२० लाइनमा वेब UI बनाउँछ — तपाईंको portfolio का लागि उत्तम।</li></ul>
<h2>🔄 MLOps जीवनचक्र</h2>
<div class="flow"><span>डाटा भर्सनिङ (DVC)</span><i>→</i><span>प्रयोग ट्र्याकिङ (MLflow, W&amp;B)</span><i>→</i><span>CI/CD परीक्षण</span><i>→</i><span>डिप्लोय</span><i>→</i><span>निगरानी</span><i>→</i><span>पुनः तालिम</span></div>
<h2>📉 निगरानी: समयसँगै मोडेल कमजोर हुन्छ</h2>
<p><b>Data drift</b>: इनपुट डाटा बदलिन्छ (नयाँ प्रकारका ग्राहक, नयाँ फोन मोडेल)। <b>Concept drift</b>: सम्बन्ध नै बदलिन्छ (महँगीपछि मूल्य, ठगीका तरिका बदलिन्छन्)। इनपुट तथ्याङ्क र प्रत्यक्ष accuracy निगरानी गर्नुहोस्; drift भए पुनः तालिम दिनुहोस्।</p>
<div data-code="2"></div>
<div class="box key"><b class="t">पेशेवर चेकलिस्ट</b>दोहोर्याउन मिल्ने कोड (निश्चित random seed, requirements.txt) · भर्सन गरिएको डाटा र मोडेल · तुलनाका लागि baseline · स्वचालित परीक्षण · logging र निगरानी · पुनः तालिम र rollback योजना।</div>
`},
  code: [
    { title: { en: 'Save & load a pipeline', ne: 'Pipeline सेभ र लोड' }, code: py`
import joblib
from sklearn.datasets import load_iris
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True)
pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500)).fit(X, y)

joblib.dump(pipe, "iris_model.joblib")            # save to a file
loaded = joblib.load("iris_model.joblib")         # later / on the server
print("Loaded model predicts:", loaded.predict([[5.1, 3.5, 1.4, 0.2], [6.7, 3.0, 5.2, 2.3]]))
import os; print("File size:", os.path.getsize("iris_model.joblib"), "bytes")
` },
    { title: { en: 'FastAPI service (read-only example)', ne: 'FastAPI सेवा (पढ्ने उदाहरण)' }, code: py`
# Save as app.py on your computer, then run:  uvicorn app:app --reload
# (Web servers can't run inside this browser page, so here we just print it.)
api = """
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI(title="Iris classifier")
model = joblib.load("iris_model.joblib")
names = ["setosa", "versicolor", "virginica"]

class Flower(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

@app.post("/predict")
def predict(f: Flower):
    x = [[f.sepal_length, f.sepal_width, f.petal_length, f.petal_width]]
    proba = model.predict_proba(x)[0]
    return {"species": names[proba.argmax()], "confidence": round(float(proba.max()), 3)}
"""
print(api)
` },
    { title: { en: 'Detecting data drift', ne: 'Data drift पत्ता लगाउने' }, code: py`
import numpy as np
from scipy.stats import ks_2samp

rng = np.random.default_rng(0)
train_income = rng.normal(40000, 8000, 2000)        # data the model was trained on
live_ok      = rng.normal(40500, 8000, 500)         # this month: similar
live_drift   = rng.normal(52000, 9000, 500)         # after a big change

for name, live in [("this month", live_ok), ("after change", live_drift)]:
    stat, p = ks_2samp(train_income, live)
    status = "DRIFT - consider retraining!" if p < 0.01 else "OK"
    print(f"{name:<13} KS statistic={stat:.3f}  p-value={p:.4f}  -> {status}")
` },
  ],
  quiz: [
    { q: { en: 'Why save the whole pipeline, not just the model?', ne: 'मोडेल मात्र होइन, पूरै pipeline किन सेभ गर्ने?' },
      options: { en: ['So new data gets exactly the same preprocessing', 'Files look bigger', 'It is required by law', 'No reason'], ne: ['नयाँ डाटामा ठ्याक्कै उही preprocessing होस्', 'फाइल ठूलो देखियोस्', 'कानुनले माग्छ', 'कुनै कारण छैन'] }, answer: 0, explain: { en: 'Mismatched preprocessing is a classic production bug.', ne: 'मेल नखाने preprocessing उत्पादनमा हुने सामान्य bug हो।' } },
    { q: { en: 'Fraudsters change their tactics, so the old model gets worse. This is…', ne: 'ठगहरूले तरिका बदल्छन्, त्यसैले पुरानो मोडेल कमजोर हुन्छ। यो…' }, options: ['Concept drift', 'Overfitting', 'Pooling', 'Tokenization'], answer: 0, explain: { en: 'The relationship between inputs and the target changed.', ne: 'इनपुट र target बीचको सम्बन्ध बदलियो।' } },
  ]
},

{
  id: 'responsible-ai', level: 'pro', minutes: 20,
  title: { en: 'Responsible AI — Bias, Fairness & Ethics', ne: 'जिम्मेवार AI — पूर्वाग्रह, निष्पक्षता र नैतिकता' },
  body: {
en: `
<p>ML models make decisions about loans, jobs, health and justice. A professional must make sure they are <b>fair, explainable, private and safe</b>.</p>
<h2>⚖️ Where bias comes from</h2>
<ul><li><b>Historical bias</b>: if past hiring favoured men, a model trained on it learns the same.</li>
<li><b>Sampling bias</b>: a face model trained mostly on light-skinned faces fails on others; a Nepali speech model trained only on Kathmandu accents fails in Terai or hills.</li>
<li><b>Label bias</b>: labels written by people carry their opinions.</li>
<li><b>Proxy features</b>: removing "gender" isn't enough if "name" or "postcode" reveals it.</li></ul>
<h2>🔍 What to do</h2>
<ul><li>Check performance <b>per group</b> (gender, region, language, age) — not just overall.</li>
<li><b>Explainability</b>: use feature importance, SHAP or LIME to show why a prediction was made.</li>
<li><b>Privacy</b>: collect only what you need, anonymize, follow data laws, get consent.</li>
<li><b>Human in the loop</b> for high-stakes decisions.</li>
<li>Document your model: data used, limits, intended use ("model cards").</li></ul>
<div data-code="0"></div>
<div class="box warn">Accuracy is not the only goal. A model that is 95% accurate overall but 70% accurate for one community can cause real harm.</div>
`,
ne: `
<p>ML मोडेलले ऋण, जागिर, स्वास्थ्य र न्यायसम्बन्धी निर्णय गर्छन्। पेशेवरले ती <b>निष्पक्ष, व्याख्या गर्न सकिने, गोपनीय र सुरक्षित</b> छन् भनी सुनिश्चित गर्नुपर्छ।</p>
<h2>⚖️ पूर्वाग्रह (bias) कहाँबाट आउँछ</h2>
<ul><li><b>ऐतिहासिक bias</b>: विगतको भर्नामा पुरुषलाई प्राथमिकता दिइएको भए, त्यसमा तालिम पाएको मोडेलले पनि त्यही सिक्छ।</li>
<li><b>नमुना bias</b>: धेरैजसो गोरो अनुहारमा तालिम पाएको मोडेल अरूमा असफल; काठमाडौंको लवजमा मात्र तालिम पाएको नेपाली बोली मोडेल तराई वा पहाडमा असफल।</li>
<li><b>Label bias</b>: मानिसले लेखेका label मा उनीहरूको धारणा हुन्छ।</li>
<li><b>Proxy feature</b>: "लिङ्ग" हटाउनु मात्र पुग्दैन यदि "नाम" वा "ठेगाना" ले त्यो खुलाउँछ भने।</li></ul>
<h2>🔍 के गर्ने</h2>
<ul><li>समग्रमा मात्र होइन, <b>हरेक समूहमा</b> (लिङ्ग, क्षेत्र, भाषा, उमेर) प्रदर्शन जाँच्नुहोस्।</li>
<li><b>व्याख्यात्मकता</b>: अनुमान किन भयो देखाउन feature importance, SHAP वा LIME प्रयोग गर्नुहोस्।</li>
<li><b>गोपनीयता</b>: चाहिने मात्र संकलन, पहिचान लुकाउने, डाटा कानुन पालना, सहमति लिने।</li>
<li>उच्च जोखिमका निर्णयमा <b>मानिसको संलग्नता</b>।</li>
<li>मोडेलको दस्तावेज बनाउनुहोस्: प्रयोग गरिएको डाटा, सीमा, उद्देश्य ("model card")।</li></ul>
<div data-code="0"></div>
<div class="box warn">Accuracy मात्र लक्ष्य होइन। समग्रमा ९५% सही तर एउटा समुदायका लागि ७०% मात्र सही मोडेलले वास्तविक हानि गर्न सक्छ।</div>
`},
  code: [{ title: { en: 'Check accuracy per group', ne: 'समूह अनुसार accuracy जाँच' }, code: py`
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(1)
n = 3000
region = rng.choice(["Hill", "Terai", "Mountain"], n, p=[0.6, 0.35, 0.05])   # Mountain is under-represented
income = rng.normal(30, 10, n) + np.where(region == "Mountain", -8, 0)
savings = rng.normal(10, 4, n)
# In Mountain areas repayment depends more on savings (a different pattern!)
logit = np.where(region == "Mountain", 0.6 * savings - 6, 0.12 * income - 3.5)
repaid = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)

df = pd.DataFrame({"region": region, "income": income, "savings": savings, "repaid": repaid})
tr, te = train_test_split(df, test_size=0.4, random_state=0)
model = LogisticRegression().fit(tr[["income", "savings"]], tr["repaid"])
te = te.assign(pred=model.predict(te[["income", "savings"]]))
print("Overall accuracy:", round((te.pred == te.repaid).mean(), 3))
print(te.groupby("region").apply(lambda g: pd.Series({"n": len(g), "accuracy": round((g.pred == g.repaid).mean(), 3)})))
` }],
  quiz: [
    { q: { en: 'A model is accurate overall but bad for one region. What should you do first?', ne: 'मोडेल समग्रमा सही तर एउटा क्षेत्रमा खराब। पहिले के गर्ने?' },
      options: { en: ['Measure per-group performance and investigate data for that group', 'Ignore it, overall accuracy is fine', 'Delete that region', 'Publish immediately'], ne: ['समूह अनुसार प्रदर्शन नाप्ने र त्यो समूहको डाटा जाँच्ने', 'बेवास्ता, समग्र accuracy ठीक छ', 'त्यो क्षेत्र हटाउने', 'तुरुन्तै प्रकाशित गर्ने'] }, answer: 0, explain: { en: 'Often the group is under-represented or follows a different pattern.', ne: 'प्रायः त्यो समूह कम प्रतिनिधित्व भएको वा फरक ढाँचाको हुन्छ।' } },
  ]
},

{
  id: 'career-roadmap', level: 'pro', minutes: 15,
  title: { en: 'Your Roadmap: From Learner to ML Professional', ne: 'तपाईंको रोडम्याप: सिकारुदेखि ML पेशेवरसम्म' },
  body: {
en: `
<p>Congratulations on reaching the final lesson! 🎉 Here's how to turn knowledge into a career.</p>
<h2>🗺️ A 6-month practice plan</h2>
<table><tr><th>Month</th><th>Focus</th><th>Output</th></tr>
<tr><td>1</td><td>Python, NumPy, Pandas, plotting daily</td><td>2 data-analysis notebooks</td></tr>
<tr><td>2</td><td>Supervised learning, metrics, pipelines</td><td>House-price + classifier projects</td></tr>
<tr><td>3</td><td>Unsupervised, feature engineering, Kaggle "Getting Started" competitions</td><td>Customer segmentation project</td></tr>
<tr><td>4</td><td>Deep learning with PyTorch (or Keras)</td><td>Image classifier with transfer learning</td></tr>
<tr><td>5</td><td>NLP / LLMs (Hugging Face), RAG</td><td>A Nepali-text or chatbot project</td></tr>
<tr><td>6</td><td>Deployment: FastAPI, Streamlit, Docker</td><td>One live, deployed app + portfolio</td></tr></table>
<h2>💼 ML job roles</h2>
<ul><li><b>Data Analyst</b> — SQL, Excel, dashboards, statistics (great first step).</li>
<li><b>Data Scientist</b> — analysis + ML models + communication.</li>
<li><b>ML Engineer</b> — builds and deploys production ML systems.</li>
<li><b>MLOps Engineer</b> — pipelines, monitoring, infrastructure.</li>
<li><b>AI / LLM Engineer</b> — builds apps on top of large language models.</li>
<li><b>Research Scientist</b> — new algorithms (usually needs a Master's/PhD).</li></ul>
<h2>🧰 Build a portfolio that gets interviews</h2>
<ul><li>3–5 solid projects on <b>GitHub</b>, each with a clear README: problem, data, approach, results, what you'd improve.</li>
<li>At least one <b>deployed</b> demo (Hugging Face Spaces / Streamlit Cloud).</li>
<li>Projects on <b>local problems</b> stand out: Nepali news classification, Kathmandu air quality prediction, crop prices at Kalimati market, remittance trends.</li>
<li>Write short blog posts (LinkedIn / Medium) explaining what you learned.</li></ul>
<h2>📚 Next resources</h2>
<ul><li>Books: <i>Hands-On Machine Learning</i> (Géron), <i>Deep Learning with Python</i> (Chollet).</li>
<li>Courses: Andrew Ng's ML Specialization, fast.ai, Hugging Face NLP course.</li>
<li>Practice: Kaggle, Google Colab (free GPU).</li></ul>
<div class="box tip"><b class="t">The secret</b>Consistency beats intensity. One hour a day for 6 months beats 10 hours once. Keep building, keep sharing. शुभकामना! 🙏</div>
`,
ne: `
<p>अन्तिम पाठसम्म आइपुग्नुभएकोमा बधाई छ! 🎉 ज्ञानलाई करियरमा कसरी बदल्ने, यहाँ छ।</p>
<h2>🗺️ ६ महिने अभ्यास योजना</h2>
<table><tr><th>महिना</th><th>ध्यान</th><th>नतिजा</th></tr>
<tr><td>१</td><td>Python, NumPy, Pandas, दैनिक ग्राफ अभ्यास</td><td>२ वटा डाटा विश्लेषण notebook</td></tr>
<tr><td>२</td><td>सुपरभाइज्ड लर्निङ, मेट्रिक्स, pipeline</td><td>घर-मूल्य + classifier प्रोजेक्ट</td></tr>
<tr><td>३</td><td>अनसुपरभाइज्ड, फिचर इन्जिनियरिङ, Kaggle "Getting Started" प्रतियोगिता</td><td>ग्राहक विभाजन प्रोजेक्ट</td></tr>
<tr><td>४</td><td>PyTorch (वा Keras) सँग डिप लर्निङ</td><td>Transfer learning सहित फोटो classifier</td></tr>
<tr><td>५</td><td>NLP / LLM (Hugging Face), RAG</td><td>नेपाली text वा च्याटबट प्रोजेक्ट</td></tr>
<tr><td>६</td><td>डिप्लोयमेन्ट: FastAPI, Streamlit, Docker</td><td>एउटा प्रत्यक्ष चल्ने एप + portfolio</td></tr></table>
<h2>💼 ML जागिरका भूमिका</h2>
<ul><li><b>Data Analyst</b> — SQL, Excel, ड्यासबोर्ड, तथ्याङ्क (उत्तम पहिलो कदम)।</li>
<li><b>Data Scientist</b> — विश्लेषण + ML मोडेल + सञ्चार।</li>
<li><b>ML Engineer</b> — उत्पादनस्तरका ML प्रणाली बनाउने र डिप्लोय गर्ने।</li>
<li><b>MLOps Engineer</b> — pipeline, निगरानी, पूर्वाधार।</li>
<li><b>AI / LLM Engineer</b> — ठूला भाषा मोडेलमाथि एप बनाउने।</li>
<li><b>Research Scientist</b> — नयाँ एल्गोरिदम (प्रायः Master's/PhD चाहिन्छ)।</li></ul>
<h2>🧰 अन्तर्वार्ता दिलाउने portfolio बनाउनुहोस्</h2>
<ul><li><b>GitHub</b> मा ३–५ बलियो प्रोजेक्ट, हरेकमा स्पष्ट README: समस्या, डाटा, तरिका, नतिजा, के सुधार्ने।</li>
<li>कम्तीमा एउटा <b>डिप्लोय गरिएको</b> डेमो (Hugging Face Spaces / Streamlit Cloud)।</li>
<li><b>स्थानीय समस्या</b> मा आधारित प्रोजेक्ट छुट्टै देखिन्छन्: नेपाली समाचार वर्गीकरण, काठमाडौंको वायु गुणस्तर अनुमान, कालीमाटी बजारको तरकारी मूल्य, रेमिट्यान्स प्रवृत्ति।</li>
<li>सिकेको कुरा बुझाउने छोटा ब्लग (LinkedIn / Medium) लेख्नुहोस्।</li></ul>
<h2>📚 अर्को स्रोतहरू</h2>
<ul><li>पुस्तक: <i>Hands-On Machine Learning</i> (Géron), <i>Deep Learning with Python</i> (Chollet)।</li>
<li>कोर्स: Andrew Ng को ML Specialization, fast.ai, Hugging Face NLP course।</li>
<li>अभ्यास: Kaggle, Google Colab (निःशुल्क GPU)।</li></ul>
<div class="box tip"><b class="t">रहस्य</b>निरन्तरताले तीव्रतालाई जित्छ। एकैपटक १० घण्टाभन्दा ६ महिनासम्म दिनको एक घण्टा राम्रो। बनाउँदै जानुहोस्, बाँड्दै जानुहोस्। शुभकामना! 🙏</div>
`},
  code: [],
  quiz: [
    { q: { en: 'What makes a portfolio project stand out most?', ne: 'Portfolio प्रोजेक्टलाई सबैभन्दा बढी के ले छुट्टै देखाउँछ?' },
      options: { en: ['A real problem, clear README, results and a live demo', 'Copying a tutorial exactly', 'Very long code with no explanation', 'Only screenshots'], ne: ['वास्तविक समस्या, स्पष्ट README, नतिजा र प्रत्यक्ष डेमो', 'ट्युटोरियल ठ्याक्कै कपी', 'व्याख्या बिनाको धेरै लामो कोड', 'स्क्रिनसट मात्र'] }, answer: 0, explain: { en: 'Show you can solve and communicate real problems.', ne: 'वास्तविक समस्या समाधान र सञ्चार गर्न सक्नुहुन्छ भनी देखाउनुहोस्।' } },
  ]
}
);

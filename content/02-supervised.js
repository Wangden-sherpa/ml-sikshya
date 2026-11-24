/* Level 2 — Supervised Learning */
COURSE.lessons.push(
{
  id: 'linear-regression', level: 'supervised', minutes: 30,
  title: { en: 'Linear Regression', ne: 'लिनियर रिग्रेसन' },
  body: {
en: `
<p>Linear regression is the "hello world" of ML: it predicts a <b>number</b> by drawing the <b>best straight line</b> through the data.</p>
<div class="box analogy"><b class="t">Intuition</b>Plot house area (x) against price (y). The points roughly go up in a line. Linear regression finds the one line that is "closest" to all the points, and uses it to predict prices of new houses.</div>
<h2>📐 The model</h2>
<div class="formula">ŷ = w·x + b          (one feature)
ŷ = w₁x₁ + w₂x₂ + … + wₙxₙ + b   (many features)</div>
<p><b>w</b> (weight / slope) = how much y changes when x increases by 1. <b>b</b> (bias / intercept) = the value of y when x is 0.</p>
<h2>📉 How does it find the "best" line? — The loss function</h2>
<p>For each point, the <b>error</b> (residual) is <code>actual − predicted</code>. We square errors (so negatives don't cancel and big errors are punished more) and average them:</p>
<div class="formula">MSE = (1/n) · Σ (yᵢ − ŷᵢ)²</div>
<p>Training = finding the w and b that make the MSE as small as possible. For linear regression there's a direct formula (the <i>normal equation</i>), but in the next lesson you'll learn <b>gradient descent</b>, the method used by almost every ML model.</p>
<div data-code="0"></div>
<h2>📏 How good is the model? — R² score</h2>
<p><b>R²</b> (0 to 1) says how much of the variation in y is explained by the model. 1 = perfect, 0 = no better than always guessing the average. Also report <b>MAE</b> (average absolute error) because it's in real units ("we are off by 12 lakh on average").</p>
<div data-code="1"></div>
<h2>✅ When to use / ⚠️ limitations</h2>
<table><tr><th>Good</th><th>Watch out</th></tr>
<tr><td>Fast, simple, easy to explain (each weight has a meaning)</td><td>Only captures straight-line relationships</td></tr>
<tr><td>Great baseline — always try it first</td><td>Sensitive to outliers</td></tr>
<tr><td>Works with little data</td><td>Features on different scales make weights hard to compare</td></tr></table>
<div class="box use"><b class="t">Real-world uses</b>Predicting sales from advertising budget, house prices, electricity demand, crop yield from rainfall and fertilizer.</div>
`,
ne: `
<p>लिनियर रिग्रेसन ML को "hello world" हो: यसले डाटाबाट <b>सबैभन्दा राम्रो सिधा रेखा</b> कोरेर <b>संख्या</b> अनुमान गर्छ।</p>
<div class="box analogy"><b class="t">सहज बुझाइ</b>घरको क्षेत्रफल (x) र मूल्य (y) को ग्राफ बनाउनुहोस्। बिन्दुहरू लगभग रेखामा माथि जान्छन्। लिनियर रिग्रेसनले सबै बिन्दुको "सबैभन्दा नजिक" हुने एउटा रेखा खोज्छ, र त्यसलाई नयाँ घरको मूल्य अनुमान गर्न प्रयोग गर्छ।</div>
<h2>📐 मोडेल</h2>
<div class="formula">ŷ = w·x + b          (एउटा feature)
ŷ = w₁x₁ + w₂x₂ + … + wₙxₙ + b   (धेरै feature)</div>
<p><b>w</b> (weight / slope) = x १ ले बढ्दा y कति बदलिन्छ। <b>b</b> (bias / intercept) = x शून्य हुँदा y को मान।</p>
<h2>📉 "सबैभन्दा राम्रो" रेखा कसरी भेट्छ? — Loss function</h2>
<p>हरेक बिन्दुको <b>गल्ती</b> (residual) = <code>वास्तविक − अनुमानित</code>। गल्तीलाई वर्ग गर्छौं (ताकि ऋणात्मकले एकअर्कालाई नकाटोस् र ठूला गल्तीलाई बढी सजाय होस्) अनि औसत निकाल्छौं:</p>
<div class="formula">MSE = (1/n) · Σ (yᵢ − ŷᵢ)²</div>
<p>तालिम = MSE सकेसम्म सानो बनाउने w र b खोज्नु। लिनियर रिग्रेसनका लागि सिधा सूत्र (<i>normal equation</i>) छ, तर अर्को पाठमा तपाईं <b>gradient descent</b> सिक्नुहुनेछ, जुन लगभग हरेक ML मोडेलले प्रयोग गर्छ।</p>
<div data-code="0"></div>
<h2>📏 मोडेल कति राम्रो छ? — R² score</h2>
<p><b>R²</b> (0 देखि 1) ले y को कति भिन्नता मोडेलले व्याख्या गर्छ भन्छ। 1 = उत्तम, 0 = सधैं औसत अनुमान गर्नुभन्दा राम्रो छैन। <b>MAE</b> (औसत निरपेक्ष गल्ती) पनि रिपोर्ट गर्नुहोस् किनकि यो वास्तविक एकाइमा हुन्छ ("हामी औसतमा १२ लाखले चुक्छौं")।</p>
<div data-code="1"></div>
<h2>✅ कहिले प्रयोग गर्ने / ⚠️ सीमाहरू</h2>
<table><tr><th>राम्रो पक्ष</th><th>ध्यान दिनुहोस्</th></tr>
<tr><td>छिटो, सरल, व्याख्या गर्न सजिलो (हरेक weight को अर्थ हुन्छ)</td><td>सिधा-रेखा सम्बन्ध मात्र समात्छ</td></tr>
<tr><td>उत्कृष्ट baseline — सधैं पहिले यो प्रयास गर्नुहोस्</td><td>Outlier ले धेरै प्रभाव पार्छ</td></tr>
<tr><td>थोरै डाटामा पनि काम गर्छ</td><td>फरक scale का feature भए weight तुलना गर्न गाह्रो</td></tr></table>
<div class="box use"><b class="t">वास्तविक प्रयोग</b>विज्ञापन बजेटबाट बिक्री अनुमान, घर मूल्य, बिजुली माग, वर्षा र मलबाट बाली उत्पादन।</div>
`},
  code: [
    { title: { en: 'Fit a line and plot it', ne: 'रेखा फिट गरेर ग्राफ बनाउने' }, code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(42)
area = rng.uniform(500, 2500, 60)                       # sq ft
price = 0.08 * area + 20 + rng.normal(0, 12, 60)        # lakh NPR (true w=0.08, b=20)

X = area.reshape(-1, 1)          # sklearn wants a 2-D X: (rows, features)
model = LinearRegression().fit(X, price)
print(f"Learned: price = {model.coef_[0]:.3f} * area + {model.intercept_:.1f}")
print("Price for 1800 sq ft:", model.predict([[1800]]).round(1), "lakh")

xs = np.linspace(500, 2500, 100).reshape(-1, 1)
plt.scatter(area, price, alpha=.6, label="houses")
plt.plot(xs, model.predict(xs), color="red", lw=2, label="best line")
plt.xlabel("Area (sq ft)"); plt.ylabel("Price (lakh)"); plt.legend(); plt.show()
` },
    { title: { en: 'Real dataset + evaluation', ne: 'वास्तविक डाटासेट + मूल्याङ्कन' }, code: py`
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error

X, y = load_diabetes(return_X_y=True)    # 442 patients, 10 features -> disease progression
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)
print("R² on unseen test data:", round(r2_score(y_test, pred), 3))
print("MAE:", round(mean_absolute_error(y_test, pred), 1))
names = load_diabetes().feature_names
for n, w in sorted(zip(names, model.coef_), key=lambda t: -abs(t[1]))[:4]:
    print(f"  important feature {n:>4}: weight {w:8.1f}")
` },
  ],
  quiz: [
    { q: { en: 'In ŷ = w·x + b, what is w?', ne: 'ŷ = w·x + b मा w के हो?' },
      options: { en: ['the slope: change in y per unit of x', 'the number of rows', 'the error', 'the prediction'], ne: ['slope: x को एक एकाइमा y को परिवर्तन', 'row संख्या', 'गल्ती', 'अनुमान'] }, answer: 0,
      explain: { en: 'w is the slope/weight; b is the intercept.', ne: 'w slope/weight हो; b intercept हो।' } },
    { q: { en: 'Why do we square the errors in MSE?', ne: 'MSE मा गल्तीलाई किन वर्ग गरिन्छ?' },
      options: { en: ['So + and − errors don\'t cancel, and big errors count more', 'To make numbers smaller', 'Because Python requires it', 'No reason'], ne: ['+ र − गल्तीले एकअर्कालाई नकाटोस् र ठूलो गल्ती बढी गनियोस्', 'संख्या सानो बनाउन', 'Python ले माग्छ', 'कुनै कारण छैन'] }, answer: 0,
      explain: { en: 'Squaring makes every error positive and penalizes large ones.', ne: 'वर्गले हरेक गल्ती धनात्मक बनाउँछ र ठूलालाई बढी सजाय दिन्छ।' } },
    { q: { en: 'R² = 0.95 means…', ne: 'R² = 0.95 को अर्थ…' },
      options: { en: ['the model explains 95% of the variation — very good', 'it is 95% wrong', '95 rows were used', 'nothing'], ne: ['मोडेलले ९५% भिन्नता व्याख्या गर्छ — धेरै राम्रो', '९५% गलत छ', '९५ row प्रयोग भयो', 'केही होइन'] }, answer: 0,
      explain: { en: 'Closer to 1 is better.', ne: '1 नजिक भए राम्रो।' } },
  ]
},

{
  id: 'gradient-descent', level: 'supervised', minutes: 35,
  title: { en: 'Gradient Descent — How Models Learn', ne: 'ग्रेडियन्ट डिसेन्ट — मोडेल कसरी सिक्छ' },
  body: {
en: `
<p>This is the <b>most important algorithm in ML</b>. Linear regression, logistic regression, neural networks and even ChatGPT are trained with versions of it.</p>
<div class="box analogy"><b class="t">The foggy mountain again</b>The "mountain" is the loss (error) for every possible choice of weights. We start at a random point, measure the slope (the <b>gradient</b>), and take a small step downhill. Repeat until we reach the valley — the weights with the lowest error.</div>
<h2>🔁 The algorithm</h2>
<ol><li>Start with random weights (e.g. w = 0, b = 0).</li>
<li>Make predictions and compute the loss.</li>
<li>Compute the gradient: how the loss changes with each weight.</li>
<li>Update: <b>move each weight a little in the opposite direction of its gradient</b>.</li>
<li>Repeat steps 2–4 many times (each pass = an <b>epoch</b>).</li></ol>
<div class="formula">w  ←  w − α · ∂Loss/∂w
b  ←  b − α · ∂Loss/∂b</div>
<p>For MSE with ŷ = wx + b, calculus gives:</p>
<div class="formula">∂L/∂w = −(2/n) Σ xᵢ (yᵢ − ŷᵢ)        ∂L/∂b = −(2/n) Σ (yᵢ − ŷᵢ)</div>
<h2>🎚️ The learning rate α</h2>
<ul><li><b>Too small</b> → tiny steps, training takes forever.</li><li><b>Too large</b> → you jump over the valley and the loss explodes.</li><li><b>Just right</b> → smooth, fast decrease of loss.</li></ul>
<p>Below we build linear regression <b>from scratch</b> with NumPy. Try learning rates 0.001, 0.1 and 1.5 and watch the loss curve!</p>
<div data-code="0"></div>
<h2>🧺 Batch, mini-batch and stochastic</h2>
<table><tr><th>Type</th><th>Uses per step</th><th>Note</th></tr>
<tr><td>Batch GD</td><td>all data</td><td>stable but slow on big data</td></tr>
<tr><td>Stochastic GD (SGD)</td><td>1 example</td><td>fast, noisy</td></tr>
<tr><td>Mini-batch GD</td><td>e.g. 32 examples</td><td>the standard in deep learning</td></tr></table>
<div class="box tip">Scale your features (e.g. standardize to mean 0, std 1) before gradient descent — otherwise the "valley" is a long narrow canyon and learning zig-zags slowly.</div>
`,
ne: `
<p>यो <b>ML को सबैभन्दा महत्त्वपूर्ण एल्गोरिदम</b> हो। लिनियर रिग्रेसन, लजिस्टिक रिग्रेसन, न्युरल नेटवर्क र ChatGPT समेत यसैका रूपहरूले तालिम पाउँछन्।</p>
<div class="box analogy"><b class="t">फेरि कुहिरो लागेको पहाड</b>"पहाड" भनेको weight का हरेक सम्भावित छनोटको loss (गल्ती) हो। हामी कुनै random ठाउँबाट सुरु गर्छौं, भिरालोपन (<b>gradient</b>) नाप्छौं, र ओरालोतिर सानो पाइला चाल्छौं। बेँसी — सबैभन्दा कम गल्ती हुने weight — नपुगुन्जेल दोहोर्याउँछौं।</div>
<h2>🔁 एल्गोरिदम</h2>
<ol><li>Random weight बाट सुरु (जस्तै w = 0, b = 0)।</li>
<li>अनुमान गर्ने र loss निकाल्ने।</li>
<li>Gradient निकाल्ने: हरेक weight सँग loss कसरी बदलिन्छ।</li>
<li>Update: <b>हरेक weight लाई त्यसको gradient को उल्टो दिशामा अलिकति सार्ने</b>।</li>
<li>चरण २–४ धेरै पटक दोहोर्याउने (हरेक पूरा चक्र = एउटा <b>epoch</b>)।</li></ol>
<div class="formula">w  ←  w − α · ∂Loss/∂w
b  ←  b − α · ∂Loss/∂b</div>
<p>ŷ = wx + b सहितको MSE का लागि calculus ले दिन्छ:</p>
<div class="formula">∂L/∂w = −(2/n) Σ xᵢ (yᵢ − ŷᵢ)        ∂L/∂b = −(2/n) Σ (yᵢ − ŷᵢ)</div>
<h2>🎚️ Learning rate α (सिकाइ दर)</h2>
<ul><li><b>धेरै सानो</b> → साना पाइला, तालिममा धेरै समय।</li><li><b>धेरै ठूलो</b> → बेँसी नाघेर उफ्रिन्छ र loss विस्फोट हुन्छ।</li><li><b>ठीक्क</b> → loss सहज र छिटो घट्छ।</li></ul>
<p>तल हामी NumPy ले लिनियर रिग्रेसन <b>सुरुदेखि</b> बनाउँछौं। learning rate 0.001, 0.1 र 1.5 राखेर loss curve हेर्नुहोस्!</p>
<div data-code="0"></div>
<h2>🧺 Batch, mini-batch र stochastic</h2>
<table><tr><th>प्रकार</th><th>हरेक पाइलामा प्रयोग</th><th>टिप्पणी</th></tr>
<tr><td>Batch GD</td><td>सबै डाटा</td><td>स्थिर तर ठूलो डाटामा ढिलो</td></tr>
<tr><td>Stochastic GD (SGD)</td><td>१ उदाहरण</td><td>छिटो, हल्लिने</td></tr>
<tr><td>Mini-batch GD</td><td>जस्तै ३२ उदाहरण</td><td>डिप लर्निङको मानक</td></tr></table>
<div class="box tip">Gradient descent अघि feature लाई scale गर्नुहोस् (जस्तै mean 0, std 1 मा standardize)। नत्र "बेँसी" लामो साँघुरो खोंच बन्छ र सिकाइ ढिलो बाङ्गोटिङ्गो हुन्छ।</div>
`},
  code: [{ title: { en: 'Gradient descent from scratch', ne: 'सुरुदेखि gradient descent' }, code: py`
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(1)
x = rng.uniform(0, 10, 100)
y = 3 * x + 7 + rng.normal(0, 2, 100)        # true w=3, b=7

w, b = 0.0, 0.0
lr = 0.01            # <- try 0.001, 0.01, 0.03, 0.06
epochs = 200
history = []

for epoch in range(epochs):
    y_hat = w * x + b
    error = y - y_hat
    loss = (error ** 2).mean()
    dw = -2 * (x * error).mean()
    db = -2 * error.mean()
    w -= lr * dw
    b -= lr * db
    history.append(loss)
    if epoch % 40 == 0:
        print(f"epoch {epoch:3d}  loss={loss:8.2f}  w={w:.3f}  b={b:.3f}")

print(f"\nFinal: w={w:.3f}, b={b:.3f}  (true: 3, 7)")
fig, ax = plt.subplots(1, 2, figsize=(11, 3.5))
ax[0].plot(history); ax[0].set_title("Loss going down"); ax[0].set_xlabel("epoch"); ax[0].set_yscale("log")
ax[1].scatter(x, y, s=10); ax[1].plot(np.sort(x), w * np.sort(x) + b, "r", lw=2); ax[1].set_title("Learned line")
plt.show()
` }],
  quiz: [
    { q: { en: 'In gradient descent we move the weights…', ne: 'Gradient descent मा weight लाई कता सार्छौं?' },
      options: { en: ['in the opposite direction of the gradient', 'in the same direction as the gradient', 'randomly', 'never'], ne: ['gradient को उल्टो दिशामा', 'gradient कै दिशामा', 'random तरिकाले', 'कहिल्यै होइन'] }, answer: 0,
      explain: { en: 'The gradient points uphill; we want to go downhill to reduce loss.', ne: 'Gradient उकालोतिर देखाउँछ; loss घटाउन हामी ओरालोतिर जान्छौं।' } },
    { q: { en: 'If the loss keeps getting bigger every epoch, the learning rate is probably…', ne: 'हरेक epoch मा loss बढ्दै गयो भने learning rate सम्भवतः…' },
      options: { en: ['too large', 'too small', 'perfect', 'zero'], ne: ['धेरै ठूलो', 'धेरै सानो', 'उत्तम', 'शून्य'] }, answer: 0,
      explain: { en: 'Too-big steps overshoot the minimum and diverge.', ne: 'धेरै ठूला पाइलाले न्यूनतम बिन्दु नाघ्छन् र फैलिन्छन्।' } },
    { q: { en: 'One full pass over the training data is called…', ne: 'तालिम डाटामा एक पूरा चक्रलाई के भनिन्छ?' }, options: ['a batch', 'an epoch', 'a gradient', 'a feature'], answer: 1,
      explain: { en: 'An epoch = the model has seen every training example once.', ne: 'Epoch = मोडेलले हरेक तालिम उदाहरण एक पटक देख्यो।' } },
  ]
},

{
  id: 'logistic-regression', level: 'supervised', minutes: 30,
  title: { en: 'Logistic Regression — Classification', ne: 'लजिस्टिक रिग्रेसन — क्लासिफिकेसन' },
  body: {
en: `
<p>Despite its name, logistic regression is a <b>classification</b> model. It answers yes/no questions — "Is this email spam?", "Will this customer leave?" — with a <b>probability</b>.</p>
<h2>🌀 The sigmoid trick</h2>
<p>Take the linear formula <code>z = w·x + b</code> (any number from −∞ to +∞) and squash it into 0…1 with the <b>sigmoid</b> function:</p>
<div class="formula">σ(z) = 1 / (1 + e⁻ᶻ)        p(spam) = σ(w·x + b)</div>
<p>Big positive z → probability near 1. Big negative z → near 0. z = 0 → exactly 0.5. Then we decide: if p ≥ 0.5 predict "yes". The line where p = 0.5 is the <b>decision boundary</b>.</p>
<div data-code="0"></div>
<h2>📉 Loss: log loss (cross-entropy)</h2>
<p>MSE doesn't work well for probabilities. We use <b>log loss</b>, which punishes <i>confident wrong answers</i> very heavily:</p>
<div class="formula">Loss = −[ y·log(p) + (1−y)·log(1−p) ]</div>
<p>If the truth is spam (y=1) and the model says p=0.01, the loss is huge (−log 0.01 ≈ 4.6). Training again uses gradient descent.</p>
<div data-code="1"></div>
<h2>🎨 More than two classes</h2>
<p>For 3+ classes (e.g. cat/dog/bird) we use <b>softmax</b>, which turns scores into probabilities that add up to 1. scikit-learn does this automatically.</p>
<div class="box use"><b class="t">Real-world uses</b>Spam filters, credit default risk, disease yes/no from tests, customer churn, click-through prediction for ads. Banks love it because it is explainable.</div>
`,
ne: `
<p>नाम रिग्रेसन भए पनि लजिस्टिक रिग्रेसन <b>क्लासिफिकेसन</b> मोडेल हो। यसले हो/होइन प्रश्न — "यो इमेल spam हो?", "यो ग्राहक छोड्छ?" — को उत्तर <b>सम्भाव्यता</b> सहित दिन्छ।</p>
<h2>🌀 Sigmoid को जादु</h2>
<p>Linear सूत्र <code>z = w·x + b</code> (−∞ देखि +∞ सम्म जुनसुकै संख्या) लाई <b>sigmoid</b> फङ्सनले 0…1 भित्र खुम्च्याउने:</p>
<div class="formula">σ(z) = 1 / (1 + e⁻ᶻ)        p(spam) = σ(w·x + b)</div>
<p>ठूलो धनात्मक z → सम्भाव्यता 1 नजिक। ठूलो ऋणात्मक z → 0 नजिक। z = 0 → ठ्याक्कै 0.5। अनि निर्णय: p ≥ 0.5 भए "हो"। p = 0.5 हुने रेखालाई <b>decision boundary</b> भनिन्छ।</p>
<div data-code="0"></div>
<h2>📉 Loss: log loss (cross-entropy)</h2>
<p>सम्भाव्यताका लागि MSE राम्रोसँग काम गर्दैन। हामी <b>log loss</b> प्रयोग गर्छौं, जसले <i>आत्मविश्वासका साथ दिइएको गलत उत्तर</i> लाई धेरै कडा सजाय दिन्छ:</p>
<div class="formula">Loss = −[ y·log(p) + (1−y)·log(1−p) ]</div>
<p>सत्य spam (y=1) हो तर मोडेलले p=0.01 भन्यो भने loss धेरै ठूलो हुन्छ (−log 0.01 ≈ 4.6)। तालिम फेरि gradient descent ले नै हुन्छ।</p>
<div data-code="1"></div>
<h2>🎨 दुईभन्दा बढी वर्ग</h2>
<p>३+ वर्ग (जस्तै बिरालो/कुकुर/चरा) का लागि <b>softmax</b> प्रयोग हुन्छ, जसले score लाई जम्मा 1 हुने सम्भाव्यतामा बदल्छ। scikit-learn ले यो आफैं गर्छ।</p>
<div class="box use"><b class="t">वास्तविक प्रयोग</b>Spam filter, ऋण नतिर्ने जोखिम, परीक्षणबाट रोग छ/छैन, ग्राहक छोड्ने अनुमान, विज्ञापन क्लिक अनुमान। व्याख्या गर्न सकिने भएकाले बैंकहरूलाई यो मनपर्छ।</div>
`},
  code: [
    { title: { en: 'The sigmoid function', ne: 'Sigmoid फङ्सन' }, code: py`
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

for z in [-5, -1, 0, 1, 5]:
    print(f"z = {z:>2}  ->  probability {sigmoid(z):.3f}")

z = np.linspace(-8, 8, 200)
plt.plot(z, sigmoid(z), lw=3)
plt.axhline(0.5, ls="--", color="gray"); plt.axvline(0, ls="--", color="gray")
plt.title("Sigmoid squashes any number into 0..1"); plt.xlabel("z = w·x + b"); plt.ylabel("probability")
plt.show()
` },
    { title: { en: 'Breast cancer classifier', ne: 'स्तन क्यान्सर classifier' }, code: py`
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

data = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(data.data, data.target, test_size=0.2, random_state=42)

scaler = StandardScaler().fit(X_train)            # scale features
model = LogisticRegression(max_iter=1000).fit(scaler.transform(X_train), y_train)

pred = model.predict(scaler.transform(X_test))
proba = model.predict_proba(scaler.transform(X_test))[:, 1]
print("Accuracy:", round(accuracy_score(y_test, pred) * 100, 1), "%")
for i in range(5):
    print(f"patient {i}: P(benign) = {proba[i]:.3f}  -> predicted {data.target_names[pred[i]]}, actual {data.target_names[y_test[i]]}")
` },
  ],
  quiz: [
    { q: { en: 'What does the sigmoid function output?', ne: 'Sigmoid फङ्सनले के दिन्छ?' },
      options: { en: ['A value between 0 and 1', 'Any number', 'Only 0 or 1', 'A list'], ne: ['0 र 1 बीचको मान', 'जुनसुकै संख्या', '0 वा 1 मात्र', 'list'] }, answer: 0,
      explain: { en: 'It squashes any input into the 0–1 range, like a probability.', ne: 'यसले कुनै पनि इनपुटलाई सम्भाव्यता जस्तै 0–1 मा खुम्च्याउँछ।' } },
    { q: { en: 'Logistic regression is mainly used for…', ne: 'लजिस्टिक रिग्रेसन मुख्यतः के का लागि?' },
      options: { en: ['classification', 'predicting prices', 'clustering', 'image generation'], ne: ['क्लासिफिकेसन', 'मूल्य अनुमान', 'क्लस्टरिङ', 'फोटो बनाउन'] }, answer: 0,
      explain: { en: 'It predicts class probabilities.', ne: 'यसले वर्गको सम्भाव्यता अनुमान गर्छ।' } },
    { q: { en: 'Which loss is used for logistic regression?', ne: 'लजिस्टिक रिग्रेसनमा कुन loss प्रयोग हुन्छ?' }, options: ['MSE', 'Log loss (cross-entropy)', 'R²', 'Accuracy'], answer: 1,
      explain: { en: 'Log loss heavily punishes confident wrong predictions.', ne: 'Log loss ले आत्मविश्वासी गलत अनुमानलाई कडा सजाय दिन्छ।' } },
  ]
},

{
  id: 'knn', level: 'supervised', minutes: 20,
  title: { en: 'K-Nearest Neighbours (KNN)', ne: 'K-नजिकका छिमेकी (KNN)' },
  body: {
en: `
<p>KNN is the simplest classifier to understand: <b>"Tell me who your neighbours are, and I'll tell you who you are."</b></p>
<div class="box analogy"><b class="t">Intuition</b>You move to a new neighbourhood and want to guess which festival people celebrate most. You ask your 5 nearest neighbours; 4 say Tihar, 1 says Christmas. You guess Tihar. That's KNN with k = 5.</div>
<h2>⚙️ How it works</h2>
<ol><li>Store all training examples (there is no real "training"!).</li>
<li>For a new point, measure the <b>distance</b> to every stored point (usually Euclidean: √Σ(aᵢ−bᵢ)²).</li>
<li>Take the <b>k</b> closest ones.</li>
<li>Classification: majority vote. Regression: average of their values.</li></ol>
<h2>🎚️ Choosing k</h2>
<ul><li>Small k (1–3) → very sensitive to noise (overfits).</li><li>Large k → too smooth, ignores local patterns (underfits).</li><li>Try several values and pick the best on validation data.</li></ul>
<div data-code="0"></div>
<div class="box warn">KNN uses distances, so <b>scaling is essential</b>. If income is in rupees (100,000) and age in years (30), income dominates the distance completely.</div>
<table><tr><th>Pros</th><th>Cons</th></tr><tr><td>Very simple, no training, works for any shape of boundary</td><td>Slow predictions on big data, needs scaling, struggles with many features</td></tr></table>
<div class="box use"><b class="t">Uses</b>Recommendation ("users similar to you liked…"), simple image/handwriting recognition, filling missing values (KNN imputation).</div>
`,
ne: `
<p>KNN बुझ्न सबैभन्दा सजिलो classifier हो: <b>"तिम्रा छिमेकी को हुन् भन, म तिमी को हौ भन्छु।"</b></p>
<div class="box analogy"><b class="t">सहज बुझाइ</b>तपाईं नयाँ टोलमा सर्नुभयो र मानिसहरूले कुन चाड सबैभन्दा बढी मनाउँछन् अनुमान गर्न चाहनुहुन्छ। नजिकका ५ छिमेकीलाई सोध्नुहुन्छ; ४ जनाले तिहार, १ जनाले क्रिसमस भन्छन्। तपाईं तिहार अनुमान गर्नुहुन्छ। यही k = 5 भएको KNN हो।</div>
<h2>⚙️ कसरी काम गर्छ</h2>
<ol><li>सबै तालिम उदाहरण सुरक्षित राख्ने (वास्तविक "तालिम" नै हुँदैन!)।</li>
<li>नयाँ बिन्दुका लागि हरेक सुरक्षित बिन्दुसम्मको <b>दूरी</b> नाप्ने (प्रायः Euclidean: √Σ(aᵢ−bᵢ)²)।</li>
<li>सबैभन्दा नजिकका <b>k</b> वटा लिने।</li>
<li>Classification: बहुमतको मत। Regression: तिनको मानको औसत।</li></ol>
<h2>🎚️ k कसरी छान्ने</h2>
<ul><li>सानो k (1–3) → noise प्रति धेरै संवेदनशील (overfit)।</li><li>ठूलो k → धेरै चिल्लो, स्थानीय ढाँचा बेवास्ता (underfit)।</li><li>धेरै मान प्रयास गरेर validation डाटामा उत्तम छान्नुहोस्।</li></ul>
<div data-code="0"></div>
<div class="box warn">KNN ले दूरी प्रयोग गर्छ, त्यसैले <b>scaling अनिवार्य छ</b>। आम्दानी रुपैयाँमा (१,००,०००) र उमेर वर्षमा (३०) भए दूरीमा आम्दानीले मात्र प्रभुत्व जमाउँछ।</div>
<table><tr><th>फाइदा</th><th>बेफाइदा</th></tr><tr><td>धेरै सरल, तालिम नचाहिने, जुनसुकै आकारको boundary मा काम गर्छ</td><td>ठूलो डाटामा अनुमान ढिलो, scaling चाहिन्छ, धेरै feature मा कमजोर</td></tr></table>
<div class="box use"><b class="t">प्रयोग</b>सिफारिस ("तपाईं जस्ता प्रयोगकर्ताले मन पराए…"), सरल फोटो/हस्तलेख पहिचान, हराएको मान भर्ने (KNN imputation)।</div>
`},
  code: [{ title: { en: 'KNN: effect of k', ne: 'KNN: k को प्रभाव' }, code: py`
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

X, y = load_wine(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=7)

# Without scaling vs with scaling
raw = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
print("Accuracy WITHOUT scaling:", round(raw.score(X_test, y_test), 3))

sc = StandardScaler().fit(X_train)
Xtr, Xte = sc.transform(X_train), sc.transform(X_test)
for k in [1, 3, 5, 9, 15, 31]:
    acc = KNeighborsClassifier(n_neighbors=k).fit(Xtr, y_train).score(Xte, y_test)
    print(f"k={k:>2}  accuracy WITH scaling: {acc:.3f}  " + "█" * int(acc * 30))
` }],
  quiz: [
    { q: { en: 'How does KNN classify a new point?', ne: 'KNN ले नयाँ बिन्दुलाई कसरी वर्गीकरण गर्छ?' },
      options: { en: ['Majority vote of its k closest training points', 'Draws a straight line', 'Uses sigmoid', 'Random guess'], ne: ['नजिकका k तालिम बिन्दुको बहुमत मत', 'सिधा रेखा कोरेर', 'sigmoid प्रयोग गरेर', 'random अनुमान'] }, answer: 0, explain: { en: 'Neighbours vote.', ne: 'छिमेकीहरूले मत दिन्छन्।' } },
    { q: { en: 'Why must features be scaled for KNN?', ne: 'KNN का लागि feature किन scale गर्नुपर्छ?' },
      options: { en: ['Distances are dominated by large-valued features', 'It makes the code shorter', 'It is not needed', 'To remove rows'], ne: ['ठूला मान भएका feature ले दूरीमा प्रभुत्व जमाउँछन्', 'कोड छोटो बनाउन', 'चाहिँदैन', 'row हटाउन'] }, answer: 0, explain: { en: 'Without scaling, one feature can control the whole distance.', ne: 'Scaling बिना एउटा feature ले पूरै दूरी नियन्त्रण गर्न सक्छ।' } },
  ]
},

{
  id: 'decision-trees', level: 'supervised', minutes: 30,
  title: { en: 'Decision Trees', ne: 'डिसिजन ट्री' },
  body: {
en: `
<p>A decision tree is a flowchart of <b>yes/no questions</b> learned from data. It's how a doctor or loan officer thinks — and it's very easy to explain.</p>
<div class="box analogy"><b class="t">Intuition: the 20-questions game</b>"Is income > 50k?" → yes → "Has existing loan?" → no → <b>Approve</b>. The tree learns which questions to ask, in what order, to separate classes best.</div>
<h2>⚙️ How the tree is built</h2>
<ol><li>Look at every feature and every possible split value.</li>
<li>Pick the split that makes the groups <b>purest</b> (most similar labels inside each group).</li>
<li>Repeat on each group (recursion) until groups are pure or a stopping rule is hit (max depth, min samples).</li></ol>
<h2>🧪 Measuring purity: Gini & Entropy</h2>
<div class="formula">Gini = 1 − Σ pₖ²             Entropy = − Σ pₖ · log₂(pₖ)</div>
<p>A group with 50% yes / 50% no has Gini 0.5 (very mixed). A group of 100% yes has Gini 0 (pure). The best split gives the biggest drop in impurity (<b>information gain</b>).</p>
<div data-code="0"></div>
<h2>⚠️ The big danger: overfitting</h2>
<p>A tree that keeps splitting will memorize the training data — even noise — and fail on new data. Control it with <code>max_depth</code>, <code>min_samples_leaf</code>, or pruning. Or combine many trees: see Random Forests next!</p>
<div data-code="1"></div>
<table><tr><th>Pros</th><th>Cons</th></tr><tr><td>Easy to visualize & explain, no scaling needed, handles numbers and categories, captures non-linear rules</td><td>Overfits easily, unstable (small data change → different tree)</td></tr></table>
<div class="box use"><b class="t">Uses</b>Loan approval rules, medical diagnosis flowcharts, customer segmentation rules, as building blocks for Random Forest and XGBoost.</div>
`,
ne: `
<p>डिसिजन ट्री भनेको डाटाबाट सिकिएको <b>हो/होइन प्रश्नहरूको</b> flowchart हो। डाक्टर वा ऋण अधिकारीले सोच्ने तरिका यही हो — र व्याख्या गर्न धेरै सजिलो छ।</p>
<div class="box analogy"><b class="t">सहज बुझाइ: २० प्रश्नको खेल</b>"आम्दानी > ५० हजार?" → हो → "पहिल्यै ऋण छ?" → छैन → <b>स्वीकृत</b>। वर्गहरू राम्रोसँग छुट्याउन कुन प्रश्न कुन क्रममा सोध्ने भनेर ट्रीले सिक्छ।</div>
<h2>⚙️ ट्री कसरी बन्छ</h2>
<ol><li>हरेक feature र हरेक सम्भावित विभाजन मान हेर्ने।</li>
<li>समूहलाई सबैभन्दा <b>शुद्ध</b> (भित्र एकै प्रकारका label) बनाउने विभाजन छान्ने।</li>
<li>हरेक समूहमा दोहोर्याउने (recursion), समूह शुद्ध नभएसम्म वा रोक्ने नियम (max depth, min samples) नपुगेसम्म।</li></ol>
<h2>🧪 शुद्धता नाप्ने: Gini र Entropy</h2>
<div class="formula">Gini = 1 − Σ pₖ²             Entropy = − Σ pₖ · log₂(pₖ)</div>
<p>५०% हो / ५०% होइन भएको समूहको Gini 0.5 (धेरै मिश्रित)। १००% हो भएको समूहको Gini 0 (शुद्ध)। उत्तम विभाजनले impurity सबैभन्दा धेरै घटाउँछ (<b>information gain</b>)।</p>
<div data-code="0"></div>
<h2>⚠️ ठूलो खतरा: overfitting</h2>
<p>विभाजन गरिरहने ट्रीले तालिम डाटा — noise समेत — कण्ठ गर्छ र नयाँ डाटामा असफल हुन्छ। <code>max_depth</code>, <code>min_samples_leaf</code>, वा pruning ले नियन्त्रण गर्नुहोस्। वा धेरै ट्री मिलाउनुहोस्: अर्को पाठ Random Forest हेर्नुहोस्!</p>
<div data-code="1"></div>
<table><tr><th>फाइदा</th><th>बेफाइदा</th></tr><tr><td>चित्रण र व्याख्या सजिलो, scaling नचाहिने, संख्या र श्रेणी दुवै, non-linear नियम समात्छ</td><td>सजिलै overfit, अस्थिर (डाटा अलिकति बदलिँदा फरक ट्री)</td></tr></table>
<div class="box use"><b class="t">प्रयोग</b>ऋण स्वीकृति नियम, स्वास्थ्य निदान flowchart, ग्राहक विभाजन नियम, Random Forest र XGBoost को आधार।</div>
`},
  code: [
    { title: { en: 'Train and draw a tree', ne: 'ट्री तालिम दिएर चित्र बनाउने' }, code: py`
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
import matplotlib.pyplot as plt

iris = load_iris()
tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(iris.data, iris.target)

print(export_text(tree, feature_names=list(iris.feature_names)))
plt.figure(figsize=(12, 6))
plot_tree(tree, feature_names=iris.feature_names, class_names=iris.target_names, filled=True, rounded=True, fontsize=9)
plt.show()
` },
    { title: { en: 'Overfitting: depth vs accuracy', ne: 'Overfitting: depth बनाम accuracy' }, code: py`
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=3)
depths, tr_acc, te_acc = range(1, 16), [], []
for d in depths:
    m = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_tr, y_tr)
    tr_acc.append(m.score(X_tr, y_tr)); te_acc.append(m.score(X_te, y_te))
plt.plot(depths, tr_acc, "o-", label="train accuracy")
plt.plot(depths, te_acc, "s-", label="test accuracy")
plt.xlabel("max_depth"); plt.ylabel("accuracy"); plt.legend(); plt.title("Deeper tree: train ↑ 100%, test stops improving")
plt.show()
print("Best depth on test:", list(depths)[te_acc.index(max(te_acc))])
` },
  ],
  quiz: [
    { q: { en: 'A node containing only one class has Gini impurity…', ne: 'एउटै वर्ग मात्र भएको node को Gini impurity…' }, options: ['0', '0.5', '1', '100'], answer: 0, explain: { en: 'Pure node → Gini 0.', ne: 'शुद्ध node → Gini 0।' } },
    { q: { en: 'Train accuracy 100%, test accuracy 85%. This suggests…', ne: 'Train accuracy १००%, test ८५%। यसले संकेत गर्छ…' },
      options: { en: ['overfitting', 'underfitting', 'a perfect model', 'not enough features'], ne: ['overfitting', 'underfitting', 'उत्तम मोडेल', 'पर्याप्त feature छैनन्'] }, answer: 0, explain: { en: 'Memorized training data but generalizes worse.', ne: 'तालिम डाटा कण्ठ गर्यो तर नयाँमा कमजोर।' } },
    { q: { en: 'Do decision trees need feature scaling?', ne: 'डिसिजन ट्रीलाई feature scaling चाहिन्छ?' },
      options: { en: ['No — they only compare values with thresholds', 'Yes, always', 'Only for text', 'Only for images'], ne: ['चाहिँदैन — threshold सँग तुलना मात्र गर्छ', 'हो, सधैं', 'text का लागि मात्र', 'फोटोका लागि मात्र'] }, answer: 0, explain: { en: 'Splits like "x > 5" are unaffected by scale.', ne: '"x > 5" जस्ता विभाजनमा scale को असर हुँदैन।' } },
  ]
},

{
  id: 'random-forest', level: 'supervised', minutes: 30,
  title: { en: 'Random Forests & Boosting (Ensembles)', ne: 'रेन्डम फरेस्ट र बुस्टिङ (Ensemble)' },
  body: {
en: `
<p><b>Ensembles</b> combine many weak models into one strong model. They win most competitions on tabular data (Excel-like data).</p>
<div class="box analogy"><b class="t">Wisdom of the crowd</b>Ask one person to guess the number of sweets in a jar — often far off. Ask 500 people and average — surprisingly accurate! Individual mistakes cancel out.</div>
<h2>🌲 Random Forest (bagging)</h2>
<ol><li>Build many decision trees (e.g. 100–500).</li>
<li>Each tree sees a <b>random sample of rows</b> (bootstrap) and a <b>random subset of features</b> at each split → trees are different.</li>
<li>Predict by majority vote (classification) or average (regression).</li></ol>
<p>Result: much less overfitting than a single tree, great accuracy with little tuning, plus <b>feature importance</b> for free.</p>
<div data-code="0"></div>
<h2>🚀 Gradient Boosting (XGBoost, LightGBM, CatBoost)</h2>
<p>Boosting builds trees <b>one after another</b>; each new tree focuses on fixing the <b>mistakes (residuals)</b> of the previous ones. Small learning rate + many trees = very powerful.</p>
<table><tr><th></th><th>Random Forest</th><th>Gradient Boosting</th></tr>
<tr><td>Trees built</td><td>in parallel, independent</td><td>sequentially, correcting errors</td></tr>
<tr><td>Main effect</td><td>reduces variance (overfitting)</td><td>reduces bias (underfitting)</td></tr>
<tr><td>Tuning</td><td>easy, robust defaults</td><td>needs more tuning, usually more accurate</td></tr></table>
<div data-code="1"></div>
<div class="box use"><b class="t">Uses</b>Fraud detection, credit scoring, sales forecasting, Kaggle competitions, ranking search results. For tables of data, try gradient boosting before deep learning!</div>
`,
ne: `
<p><b>Ensemble</b> ले धेरै कमजोर मोडेल मिलाएर एउटा बलियो मोडेल बनाउँछ। तालिका-जस्तो (Excel जस्तो) डाटामा धेरैजसो प्रतियोगिता यिनैले जित्छन्।</p>
<div class="box analogy"><b class="t">भीडको बुद्धि</b>एक जनालाई बट्टामा कति मिठाई छ अनुमान गर्न लगाउनुहोस् — प्रायः धेरै फरक। ५०० जनालाई सोधेर औसत निकाल्नुहोस् — अचम्मै सही! व्यक्तिगत गल्तीहरू एकअर्कामा काटिन्छन्।</div>
<h2>🌲 Random Forest (bagging)</h2>
<ol><li>धेरै डिसिजन ट्री बनाउने (जस्तै १००–५००)।</li>
<li>हरेक ट्रीले <b>row को random नमुना</b> (bootstrap) र हरेक विभाजनमा <b>feature को random उपसमूह</b> देख्छ → ट्रीहरू फरक हुन्छन्।</li>
<li>बहुमत मत (classification) वा औसत (regression) ले अनुमान।</li></ol>
<p>नतिजा: एउटा ट्रीभन्दा धेरै कम overfitting, थोरै tuning मा उत्कृष्ट accuracy, साथमा सित्तैमा <b>feature importance</b>।</p>
<div data-code="0"></div>
<h2>🚀 Gradient Boosting (XGBoost, LightGBM, CatBoost)</h2>
<p>Boosting ले ट्री <b>एकपछि अर्को</b> बनाउँछ; हरेक नयाँ ट्रीले अघिल्लाका <b>गल्ती (residual)</b> सच्याउनमा ध्यान दिन्छ। सानो learning rate + धेरै ट्री = धेरै शक्तिशाली।</p>
<table><tr><th></th><th>Random Forest</th><th>Gradient Boosting</th></tr>
<tr><td>ट्री निर्माण</td><td>समानान्तर, स्वतन्त्र</td><td>क्रमिक, गल्ती सच्याउँदै</td></tr>
<tr><td>मुख्य असर</td><td>variance (overfitting) घटाउँछ</td><td>bias (underfitting) घटाउँछ</td></tr>
<tr><td>Tuning</td><td>सजिलो, बलियो default</td><td>बढी tuning चाहिन्छ, प्रायः बढी सही</td></tr></table>
<div data-code="1"></div>
<div class="box use"><b class="t">प्रयोग</b>ठगी पहिचान, क्रेडिट स्कोरिङ, बिक्री पूर्वानुमान, Kaggle प्रतियोगिता, खोज नतिजा क्रम। तालिका डाटाका लागि डिप लर्निङ अघि gradient boosting प्रयास गर्नुहोस्!</div>
`},
  code: [
    { title: { en: 'Tree vs Forest + feature importance', ne: 'ट्री बनाम फरेस्ट + feature importance' }, code: py`
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt
import numpy as np

data = load_breast_cancer()
X_tr, X_te, y_tr, y_te = train_test_split(data.data, data.target, test_size=0.3, random_state=1)

tree = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
forest = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_tr, y_tr)
print("Single tree accuracy  :", round(tree.score(X_te, y_te), 3))
print("Random forest accuracy:", round(forest.score(X_te, y_te), 3))

idx = np.argsort(forest.feature_importances_)[-8:]
plt.barh(np.array(data.feature_names)[idx], forest.feature_importances_[idx], color="tab:green")
plt.title("Top 8 most important features"); plt.show()
` },
    { title: { en: 'Gradient boosting', ne: 'Gradient boosting' }, code: py`
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
models = {
    "Linear regression": LinearRegression(),
    "Random forest": RandomForestRegressor(n_estimators=300, min_samples_leaf=3, random_state=0),
    "Gradient boosting": GradientBoostingRegressor(n_estimators=300, learning_rate=0.03, max_depth=2, random_state=0),
}
for name, m in models.items():
    m.fit(X_tr, y_tr)
    print(f"{name:<18} R² = {r2_score(y_te, m.predict(X_te)):.3f}")
print("\nNote: on small, fairly linear data a simple model can win. Always compare!")
` },
  ],
  quiz: [
    { q: { en: 'Random Forest makes its trees different by…', ne: 'Random Forest ले ट्रीहरूलाई कसरी फरक बनाउँछ?' },
      options: { en: ['random rows (bootstrap) and random feature subsets', 'using different programming languages', 'making them all identical', 'sorting the data'], ne: ['random row (bootstrap) र random feature उपसमूह', 'फरक प्रोग्रामिङ भाषा', 'सबै उस्तै बनाएर', 'डाटा क्रमबद्ध गरेर'] }, answer: 0, explain: { en: 'Randomness → diverse trees → errors cancel out.', ne: 'Randomness → विविध ट्री → गल्ती काटिन्छ।' } },
    { q: { en: 'In boosting, each new tree tries to…', ne: 'Boosting मा हरेक नयाँ ट्रीले…' },
      options: { en: ['fix the errors of the previous trees', 'ignore the previous trees', 'delete data', 'copy the first tree'], ne: ['अघिल्ला ट्रीका गल्ती सच्याउँछ', 'अघिल्ला ट्री बेवास्ता गर्छ', 'डाटा मेटाउँछ', 'पहिलो ट्री कपी गर्छ'] }, answer: 0, explain: { en: 'Boosting is sequential error-correction.', ne: 'Boosting क्रमिक गल्ती-सुधार हो।' } },
  ]
},

{
  id: 'svm', level: 'supervised', minutes: 25,
  title: { en: 'Support Vector Machines (SVM)', ne: 'सपोर्ट भेक्टर मेसिन (SVM)' },
  body: {
en: `
<p>SVM finds the boundary that separates two classes with the <b>widest possible street</b> (margin) between them.</p>
<div class="box analogy"><b class="t">Intuition</b>Imagine red and blue marbles on a table. Many lines can separate them, but the safest one is in the middle of the widest gap — new marbles are less likely to land on the wrong side. The marbles touching the edge of the street are the <b>support vectors</b>; only they decide the boundary.</div>
<h2>✨ The kernel trick</h2>
<p>What if no straight line can separate the classes (e.g. one class inside a circle of the other)? SVM uses a <b>kernel</b> to imagine the data in a higher dimension where a flat boundary works — without actually computing those dimensions. Popular kernels: <code>linear</code>, <code>rbf</code> (default, very flexible), <code>poly</code>.</p>
<h2>🎚️ Key settings</h2>
<ul><li><b>C</b>: small C = wide, tolerant street (simpler); large C = tries to classify every point correctly (can overfit).</li>
<li><b>gamma</b> (rbf): how far one example's influence reaches. Large gamma → wiggly boundary.</li></ul>
<div data-code="0"></div>
<div class="box use"><b class="t">Uses</b>Text classification, image classification (before deep learning), bioinformatics (gene data), handwriting. Works well on small-to-medium data with many features. Needs scaling.</div>
`,
ne: `
<p>SVM ले दुई वर्गबीच सकेसम्म <b>फराकिलो सडक</b> (margin) हुने गरी छुट्याउने सीमा खोज्छ।</p>
<div class="box analogy"><b class="t">सहज बुझाइ</b>टेबलमा रातो र नीलो गुच्चा कल्पना गर्नुहोस्। धेरै रेखाले तिनलाई छुट्याउन सक्छन्, तर सबैभन्दा सुरक्षित चाहिँ सबैभन्दा फराकिलो खाली ठाउँको बीचमा हुन्छ — नयाँ गुच्चा गलत तर्फ पर्ने सम्भावना कम। सडकको किनारा छुने गुच्चाहरू <b>support vector</b> हुन्; सीमा तिनले मात्र निर्धारण गर्छन्।</div>
<h2>✨ Kernel को जादु</h2>
<p>कुनै सिधा रेखाले वर्ग छुट्याउन सक्दैन भने (जस्तै एउटा वर्ग अर्कोको घेराभित्र)? SVM ले <b>kernel</b> प्रयोग गरेर डाटालाई उच्च आयाममा कल्पना गर्छ जहाँ समतल सीमाले काम गर्छ — ती आयाम वास्तवमा गणना नगरी। लोकप्रिय kernel: <code>linear</code>, <code>rbf</code> (default, धेरै लचिलो), <code>poly</code>।</p>
<h2>🎚️ मुख्य सेटिङ</h2>
<ul><li><b>C</b>: सानो C = फराकिलो, सहनशील सडक (सरल); ठूलो C = हरेक बिन्दु सही वर्गीकरण गर्ने प्रयास (overfit हुन सक्छ)।</li>
<li><b>gamma</b> (rbf): एउटा उदाहरणको प्रभाव कति टाढासम्म पुग्छ। ठूलो gamma → बाङ्गोटिङ्गो सीमा।</li></ul>
<div data-code="0"></div>
<div class="box use"><b class="t">प्रयोग</b>Text वर्गीकरण, फोटो वर्गीकरण (डिप लर्निङ अघि), bioinformatics (जीन डाटा), हस्तलेख। धेरै feature भएको सानो-मध्यम डाटामा राम्रो। Scaling चाहिन्छ।</div>
`},
  code: [{ title: { en: 'Linear vs RBF kernel on circles', ne: 'घेरा डाटामा Linear बनाम RBF kernel' }, code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_circles
from sklearn.svm import SVC

X, y = make_circles(n_samples=300, factor=0.4, noise=0.1, random_state=0)
xx, yy = np.meshgrid(np.linspace(-1.5, 1.5, 200), np.linspace(-1.5, 1.5, 200))
grid = np.c_[xx.ravel(), yy.ravel()]

fig, ax = plt.subplots(1, 2, figsize=(11, 4.5))
for a, kernel in zip(ax, ["linear", "rbf"]):
    m = SVC(kernel=kernel, C=1.0).fit(X, y)
    a.contourf(xx, yy, m.predict(grid).reshape(xx.shape), alpha=.25, cmap="coolwarm")
    a.scatter(X[:, 0], X[:, 1], c=y, cmap="coolwarm", s=15, edgecolor="k", linewidth=.3)
    a.set_title(f"kernel='{kernel}'  accuracy={m.score(X, y):.2f}")
plt.show()
` }],
  quiz: [
    { q: { en: 'SVM chooses the boundary that…', ne: 'SVM ले कस्तो सीमा छान्छ?' },
      options: { en: ['maximizes the margin between classes', 'passes through all points', 'is always vertical', 'minimizes the number of features'], ne: ['वर्गहरूबीचको margin अधिकतम बनाउने', 'सबै बिन्दु छिचोल्ने', 'सधैं ठाडो', 'feature संख्या घटाउने'] }, answer: 0, explain: { en: 'Widest street = most robust boundary.', ne: 'सबैभन्दा फराकिलो सडक = सबैभन्दा भरपर्दो सीमा।' } },
    { q: { en: 'The kernel trick helps when…', ne: 'Kernel trick कहिले काम लाग्छ?' },
      options: { en: ['data cannot be separated by a straight line', 'data is already sorted', 'there are no labels', 'we want faster loading'], ne: ['डाटा सिधा रेखाले छुट्याउन सकिँदैन', 'डाटा पहिल्यै क्रमबद्ध छ', 'label छैनन्', 'छिटो लोड गर्न'] }, answer: 0, explain: { en: 'Kernels allow non-linear boundaries.', ne: 'Kernel ले non-linear सीमा सम्भव बनाउँछ।' } },
  ]
},

{
  id: 'naive-bayes', level: 'supervised', minutes: 20,
  title: { en: 'Naive Bayes — Probability-based Classifier', ne: 'नेइभ बेज — सम्भाव्यतामा आधारित classifier' },
  body: {
en: `
<p>Naive Bayes uses <b>Bayes' theorem</b> to calculate the probability of each class given the features. It's extremely fast and great for <b>text</b> (spam filters, sentiment, news categories).</p>
<div class="formula">P(class | data) = P(data | class) · P(class) / P(data)</div>
<div class="box analogy"><b class="t">Intuition</b>An email contains "free", "win" and "prize". Among spam emails these words are common; among normal emails, rare. Combine the evidence of each word → probability of spam.</div>
<p>It's called <b>naive</b> because it assumes features are independent (each word's effect is separate). That's not really true, but it works surprisingly well.</p>
<h2>📝 From text to numbers: bag of words</h2>
<p>We count how many times each word appears. "win free prize" → {win:1, free:1, prize:1}. <code>CountVectorizer</code> does this for us.</p>
<div data-code="0"></div>
<div class="box use"><b class="t">Uses</b>Spam filtering, sentiment analysis (positive/negative reviews), document categorization, a fast baseline for any text task.</div>
`,
ne: `
<p>नेइभ बेजले feature दिइएको अवस्थामा हरेक वर्गको सम्भाव्यता निकाल्न <b>Bayes' theorem</b> प्रयोग गर्छ। यो अत्यन्त छिटो छ र <b>text</b> (spam filter, भावना विश्लेषण, समाचार वर्ग) का लागि उत्कृष्ट छ।</p>
<div class="formula">P(class | data) = P(data | class) · P(class) / P(data)</div>
<div class="box analogy"><b class="t">सहज बुझाइ</b>एउटा इमेलमा "free", "win" र "prize" छन्। spam इमेलमा यी शब्द सामान्य हुन्छन्; सामान्य इमेलमा दुर्लभ। हरेक शब्दको प्रमाण जोड्दा → spam हुने सम्भाव्यता।</div>
<p>यसलाई <b>naive (भोलो)</b> भनिन्छ किनकि यसले feature हरू स्वतन्त्र छन् भनी मान्छ (हरेक शब्दको असर अलग)। यो पूर्ण सत्य होइन, तर अचम्मै राम्रो काम गर्छ।</p>
<h2>📝 Text बाट संख्या: bag of words</h2>
<p>हरेक शब्द कति पटक आयो गन्छौं। "win free prize" → {win:1, free:1, prize:1}। <code>CountVectorizer</code> ले यो काम गर्छ।</p>
<div data-code="0"></div>
<div class="box use"><b class="t">प्रयोग</b>Spam फिल्टर, भावना विश्लेषण (सकारात्मक/नकारात्मक समीक्षा), कागजात वर्गीकरण, कुनै पनि text काममा छिटो baseline।</div>
`},
  code: [{ title: { en: 'Tiny sentiment classifier', ne: 'सानो भावना classifier' }, code: py`
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

reviews = ["the momo was delicious and hot", "great service and tasty food", "loved the dal bhat, amazing",
           "very good tea and friendly staff", "food was cold and bad", "terrible service, very slow",
           "the room was dirty and noisy", "worst experience, rude staff"]
labels  = ["pos", "pos", "pos", "pos", "neg", "neg", "neg", "neg"]

vec = CountVectorizer()
X = vec.fit_transform(reviews)
print("Vocabulary size:", len(vec.vocabulary_))
model = MultinomialNB().fit(X, labels)

tests = ["the food was amazing and tasty", "slow and rude staff", "hot momo but dirty room"]
for t, p, pr in zip(tests, model.predict(vec.transform(tests)), model.predict_proba(vec.transform(tests))):
    print(f"{t!r:40} -> {p}  (P(neg)={pr[0]:.2f}, P(pos)={pr[1]:.2f})")
` }],
  quiz: [
    { q: { en: 'Why is it called "naive"?', ne: 'यसलाई किन "naive" भनिन्छ?' },
      options: { en: ['It assumes features are independent', 'It is only for beginners', 'It never works', 'It ignores data'], ne: ['Feature हरू स्वतन्त्र छन् भनी मान्छ', 'सुरुवातीका लागि मात्र', 'कहिल्यै काम गर्दैन', 'डाटा बेवास्ता गर्छ'] }, answer: 0, explain: { en: 'The independence assumption is "naive", but practical.', ne: 'स्वतन्त्रताको मान्यता "naive" छ, तर व्यावहारिक।' } },
    { q: { en: 'Naive Bayes is especially popular for…', ne: 'नेइभ बेज विशेष गरी कुन कामका लागि लोकप्रिय छ?' },
      options: { en: ['text classification', 'image generation', 'robot control', 'clustering'], ne: ['text वर्गीकरण', 'फोटो बनाउने', 'रोबोट नियन्त्रण', 'क्लस्टरिङ'] }, answer: 0, explain: { en: 'Fast and effective on word counts.', ne: 'शब्द गणनामा छिटो र प्रभावकारी।' } },
  ]
}
);

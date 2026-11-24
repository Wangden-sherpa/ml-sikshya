/* Level 5 — Deep Learning */
COURSE.lessons.push(
{
  id: 'neural-networks', level: 'deep', minutes: 40,
  title: { en: 'Neural Networks from Scratch', ne: 'सुरुदेखि न्युरल नेटवर्क' },
  body: {
en: `
<p>Deep learning powers face recognition, ChatGPT/Claude, self-driving cars and speech assistants. It all starts with one tiny unit: the <b>artificial neuron</b>.</p>
<h2>🔵 One neuron</h2>
<p>A neuron takes inputs, multiplies each by a weight, adds a bias, and passes the result through an <b>activation function</b>:</p>
<div class="formula">output = activation( w₁x₁ + w₂x₂ + … + b )</div>
<p>Look familiar? A neuron with sigmoid activation <i>is</i> logistic regression!</p>
<h2>🕸️ Layers → a network</h2>
<div class="flow"><span>Input layer (features)</span><i>→</i><span>Hidden layer 1</span><i>→</i><span>Hidden layer 2</span><i>→</i><span>Output layer</span></div>
<p>Each hidden layer learns more abstract features. In an image network: layer 1 finds edges → layer 2 finds shapes → layer 3 finds eyes/wheels → output says "cat". "Deep" just means <b>many layers</b>.</p>
<h2>⚡ Why activation functions?</h2>
<p>Without them, stacking layers is still just one linear function — no matter how deep. Non-linear activations let networks learn curves and complex patterns.</p>
<table><tr><th>Activation</th><th>Formula</th><th>Where used</th></tr>
<tr><td>ReLU</td><td>max(0, z)</td><td>hidden layers (default choice)</td></tr>
<tr><td>Sigmoid</td><td>1/(1+e⁻ᶻ)</td><td>output for yes/no</td></tr>
<tr><td>Softmax</td><td>eᶻⁱ / Σeᶻʲ</td><td>output for many classes</td></tr>
<tr><td>Tanh</td><td>(eᶻ−e⁻ᶻ)/(eᶻ+e⁻ᶻ)</td><td>RNNs, older networks</td></tr></table>
<h2>🔁 Backpropagation — how a network learns</h2>
<ol><li><b>Forward pass</b>: compute predictions layer by layer.</li>
<li>Compute the <b>loss</b>.</li>
<li><b>Backward pass</b>: use the <b>chain rule</b> of calculus to compute how much each weight contributed to the error — starting from the output and going back.</li>
<li><b>Update</b> every weight with gradient descent.</li></ol>
<div class="box analogy"><b class="t">Analogy</b>A team project got a bad mark. The teacher traces back: "the conclusion was weak because section 3 was wrong, because the data in section 2 was off…" Each member gets feedback in proportion to their part of the mistake. That's backprop.</div>
<p>Below is a full neural network written with <b>only NumPy</b>, learning the XOR problem — something a single straight line (and logistic regression) cannot solve.</p>
<div data-code="0"></div>
<div class="box tip">Read the code slowly — forward, loss, backward, update. Once you understand these 20 lines, you understand the core of PyTorch and TensorFlow.</div>
`,
ne: `
<p>डिप लर्निङले अनुहार पहिचान, ChatGPT/Claude, स्वचालित कार र आवाज सहायक चलाउँछ। यो सबै एउटा सानो एकाइबाट सुरु हुन्छ: <b>कृत्रिम न्युरोन</b>।</p>
<h2>🔵 एउटा न्युरोन</h2>
<p>न्युरोनले इनपुट लिन्छ, हरेकलाई weight ले गुणन गर्छ, bias जोड्छ, अनि नतिजालाई <b>activation function</b> बाट पठाउँछ:</p>
<div class="formula">output = activation( w₁x₁ + w₂x₂ + … + b )</div>
<p>चिनेजस्तो लाग्यो? Sigmoid activation भएको न्युरोन <i>नै</i> लजिस्टिक रिग्रेसन हो!</p>
<h2>🕸️ Layer → नेटवर्क</h2>
<div class="flow"><span>Input layer (feature)</span><i>→</i><span>Hidden layer 1</span><i>→</i><span>Hidden layer 2</span><i>→</i><span>Output layer</span></div>
<p>हरेक hidden layer ले झन् अमूर्त feature सिक्छ। फोटो नेटवर्कमा: layer 1 ले किनारा भेट्छ → layer 2 ले आकार → layer 3 ले आँखा/पाङ्ग्रा → output ले "बिरालो" भन्छ। "Deep" भनेको <b>धेरै layer</b> मात्र हो।</p>
<h2>⚡ Activation function किन?</h2>
<p>यिनीहरू बिना जति layer थुपारे पनि एउटै linear फङ्सन हुन्छ। Non-linear activation ले नेटवर्कलाई वक्र र जटिल ढाँचा सिक्न दिन्छ।</p>
<table><tr><th>Activation</th><th>सूत्र</th><th>प्रयोग</th></tr>
<tr><td>ReLU</td><td>max(0, z)</td><td>hidden layer (पहिलो रोजाइ)</td></tr>
<tr><td>Sigmoid</td><td>1/(1+e⁻ᶻ)</td><td>हो/होइन output</td></tr>
<tr><td>Softmax</td><td>eᶻⁱ / Σeᶻʲ</td><td>धेरै वर्गको output</td></tr>
<tr><td>Tanh</td><td>(eᶻ−e⁻ᶻ)/(eᶻ+e⁻ᶻ)</td><td>RNN, पुराना नेटवर्क</td></tr></table>
<h2>🔁 Backpropagation — नेटवर्क कसरी सिक्छ</h2>
<ol><li><b>Forward pass</b>: layer-layer गर्दै अनुमान निकाल्ने।</li>
<li><b>Loss</b> निकाल्ने।</li>
<li><b>Backward pass</b>: calculus को <b>chain rule</b> प्रयोग गरेर हरेक weight ले गल्तीमा कति योगदान दियो निकाल्ने — output बाट पछाडितिर।</li>
<li>हरेक weight लाई gradient descent ले <b>update</b> गर्ने।</li></ol>
<div class="box analogy"><b class="t">उदाहरण</b>टोलीको प्रोजेक्टमा कम अंक आयो। शिक्षकले पछाडि खोज्छन्: "निष्कर्ष कमजोर भयो किनकि खण्ड ३ गलत थियो, किनकि खण्ड २ को डाटा बिग्रिएको थियो…" हरेक सदस्यले गल्तीमा आफ्नो हिस्साअनुसार प्रतिक्रिया पाउँछ। यही backprop हो।</div>
<p>तल <b>NumPy मात्र</b> प्रयोग गरेर लेखिएको पूरा न्युरल नेटवर्क छ, जसले XOR समस्या सिक्छ — जुन एउटा सिधा रेखाले (र लजिस्टिक रिग्रेसनले) समाधान गर्न सक्दैन।</p>
<div data-code="0"></div>
<div class="box tip">कोड बिस्तारै पढ्नुहोस् — forward, loss, backward, update। यी २० लाइन बुझेपछि तपाईंले PyTorch र TensorFlow को मूल बुझ्नुहुन्छ।</div>
`},
  code: [{ title: { en: 'Neural network in pure NumPy (XOR)', ne: 'शुद्ध NumPy मा न्युरल नेटवर्क (XOR)' }, code: py`
import numpy as np
import matplotlib.pyplot as plt

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
y = np.array([[0], [1], [1], [0]], dtype=float)          # XOR

rng = np.random.default_rng(0)
W1, b1 = rng.normal(0, 1, (2, 8)), np.zeros((1, 8))      # input(2) -> hidden(8)
W2, b2 = rng.normal(0, 1, (8, 1)), np.zeros((1, 1))      # hidden(8) -> output(1)
sigmoid = lambda z: 1 / (1 + np.exp(-z))
lr, losses = 0.5, []

for epoch in range(3000):
    # ---- forward pass ----
    h = np.tanh(X @ W1 + b1)
    p = sigmoid(h @ W2 + b2)
    loss = -np.mean(y * np.log(p + 1e-9) + (1 - y) * np.log(1 - p + 1e-9))
    losses.append(loss)
    # ---- backward pass (chain rule) ----
    dz2 = (p - y) / len(X)
    dW2, db2 = h.T @ dz2, dz2.sum(0, keepdims=True)
    dh = dz2 @ W2.T * (1 - h ** 2)            # derivative of tanh
    dW1, db1 = X.T @ dh, dh.sum(0, keepdims=True)
    # ---- update ----
    W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2

print("Predictions:", p.ravel().round(3), " (target 0 1 1 0)")
plt.plot(losses); plt.title("Training loss"); plt.xlabel("epoch"); plt.show()
` }],
  quiz: [
    { q: { en: 'Why do we need non-linear activation functions?', ne: 'Non-linear activation किन चाहिन्छ?' },
      options: { en: ['Without them, many layers collapse into one linear function', 'To make training slower', 'To reduce memory', 'They are optional decoration'], ne: ['यिनीबिना धेरै layer एउटै linear फङ्सनमा खुम्चिन्छन्', 'तालिम ढिलो बनाउन', 'मेमोरी घटाउन', 'सजावट मात्र'] }, answer: 0, explain: { en: 'Non-linearity lets networks learn complex patterns.', ne: 'Non-linearity ले जटिल ढाँचा सिक्न दिन्छ।' } },
    { q: { en: 'Backpropagation uses which maths rule?', ne: 'Backpropagation ले कुन गणितीय नियम प्रयोग गर्छ?' }, options: ['Chain rule', 'Pythagoras', 'Bayes only', 'Long division'], answer: 0, explain: { en: 'The chain rule passes gradients backward layer by layer.', ne: 'Chain rule ले gradient लाई layer-layer पछाडि पठाउँछ।' } },
    { q: { en: 'The most common activation for hidden layers today is…', ne: 'आजकल hidden layer मा सबैभन्दा प्रचलित activation…' }, options: ['ReLU', 'Softmax', 'Step', 'Linear'], answer: 0, explain: { en: 'ReLU is simple and trains fast.', ne: 'ReLU सरल छ र छिटो सिक्छ।' } },
  ]
},

{
  id: 'training-deep', level: 'deep', minutes: 30,
  title: { en: 'Training Deep Networks Well', ne: 'डिप नेटवर्क राम्ररी तालिम दिने' },
  body: {
en: `
<p>Building a network is easy; training it well is the real skill. Here are the tools professionals use every day.</p>
<h2>🏃 Optimizers</h2>
<ul><li><b>SGD</b> — plain gradient descent (with mini-batches).</li><li><b>SGD + Momentum</b> — like a ball rolling downhill, keeps speed in consistent directions.</li><li><b>Adam</b> — adapts the learning rate for each weight. The default choice; works well almost everywhere.</li></ul>
<h2>🛡️ Fighting overfitting</h2>
<ul><li><b>Dropout</b> — randomly switch off some neurons during training, so the network can't rely on any single one.</li>
<li><b>Early stopping</b> — stop when validation loss stops improving.</li>
<li><b>Weight decay (L2)</b> — penalize big weights.</li>
<li><b>Data augmentation</b> — flip/rotate/crop images to create more training data.</li>
<li><b>Batch normalization</b> — normalizes layer inputs; trains faster and more stably.</li></ul>
<h2>📋 A training checklist</h2>
<ol><li>Scale inputs.</li><li>Start small: can the network overfit a tiny batch? If not, there's a bug.</li><li>Use Adam, lr ≈ 0.001.</li><li>Watch train AND validation loss curves.</li><li>Add regularization only when you see overfitting.</li></ol>
<p>Below we train a real neural network (scikit-learn's <code>MLPClassifier</code>) to read handwritten digits, and plot its learning curve. In industry you would use <b>PyTorch</b> or <b>TensorFlow/Keras</b> — the ideas are exactly the same (see the second code block for what PyTorch looks like).</p>
<div data-code="0"></div>
<div data-code="1"></div>
`,
ne: `
<p>नेटवर्क बनाउन सजिलो छ; राम्ररी तालिम दिनु नै वास्तविक सीप हो। यहाँ पेशेवरहरूले दैनिक प्रयोग गर्ने उपकरणहरू छन्।</p>
<h2>🏃 Optimizer</h2>
<ul><li><b>SGD</b> — साधारण gradient descent (mini-batch सहित)।</li><li><b>SGD + Momentum</b> — ओरालो गुड्ने बल जस्तै, एकै दिशामा गति कायम राख्छ।</li><li><b>Adam</b> — हरेक weight का लागि learning rate आफैं मिलाउँछ। पहिलो रोजाइ; लगभग जताततै राम्रो।</li></ul>
<h2>🛡️ Overfitting सँग लड्ने</h2>
<ul><li><b>Dropout</b> — तालिममा केही न्युरोन random रूपमा बन्द गर्ने, ताकि नेटवर्क कुनै एउटामा मात्र भर नपरोस्।</li>
<li><b>Early stopping</b> — validation loss सुधार हुन छोडेपछि रोक्ने।</li>
<li><b>Weight decay (L2)</b> — ठूला weight मा सजाय।</li>
<li><b>Data augmentation</b> — थप तालिम डाटा बनाउन फोटो पल्टाउने/घुमाउने/काट्ने।</li>
<li><b>Batch normalization</b> — layer इनपुट normalize गर्छ; छिटो र स्थिर तालिम।</li></ul>
<h2>📋 तालिम चेकलिस्ट</h2>
<ol><li>इनपुट scale गर्ने।</li><li>सानोबाट सुरु: नेटवर्कले सानो batch overfit गर्न सक्छ? सक्दैन भने bug छ।</li><li>Adam, lr ≈ 0.001 प्रयोग गर्ने।</li><li>Train र validation दुवैको loss curve हेर्ने।</li><li>Overfitting देखेपछि मात्र regularization थप्ने।</li></ol>
<p>तल हामी हस्तलिखित अंक पढ्न वास्तविक न्युरल नेटवर्क (scikit-learn को <code>MLPClassifier</code>) तालिम दिन्छौं र यसको learning curve बनाउँछौं। उद्योगमा <b>PyTorch</b> वा <b>TensorFlow/Keras</b> प्रयोग हुन्छ — विचार ठ्याक्कै उस्तै हुन् (PyTorch कस्तो देखिन्छ दोस्रो कोडमा हेर्नुहोस्)।</p>
<div data-code="0"></div>
<div data-code="1"></div>
`},
  code: [
    { title: { en: 'Digit recognizer with MLP', ne: 'MLP ले अंक पहिचान' }, code: py`
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
import matplotlib.pyplot as plt

digits = load_digits()
X_tr, X_te, y_tr, y_te = train_test_split(digits.data, digits.target, test_size=0.25, random_state=0)
sc = StandardScaler().fit(X_tr)

net = MLPClassifier(hidden_layer_sizes=(128, 64), activation="relu", solver="adam",
                    alpha=1e-3, learning_rate_init=1e-3, max_iter=60,
                    early_stopping=True, random_state=0)
net.fit(sc.transform(X_tr), y_tr)
print("Test accuracy:", round(net.score(sc.transform(X_te), y_te) * 100, 2), "%")

fig, ax = plt.subplots(1, 2, figsize=(11, 3.5))
ax[0].plot(net.loss_curve_, label="train loss"); ax[0].legend(); ax[0].set_title("Loss")
ax[1].plot(net.validation_scores_, color="g", label="validation accuracy"); ax[1].legend(); ax[1].set_title("Validation accuracy")
plt.show()
` },
    { title: { en: 'Same idea in PyTorch (read-only example)', ne: 'PyTorch मा उही विचार (पढ्ने उदाहरण)' }, code: py`
# This shows real PyTorch code. PyTorch isn't available in the browser,
# so running it here only prints the explanation below.
code = """
import torch, torch.nn as nn

model = nn.Sequential(
    nn.Linear(64, 128), nn.ReLU(), nn.Dropout(0.2),
    nn.Linear(128, 64), nn.ReLU(),
    nn.Linear(64, 10))                     # 10 digit classes
loss_fn = nn.CrossEntropyLoss()
opt = torch.optim.Adam(model.parameters(), lr=1e-3)

for epoch in range(20):
    for xb, yb in train_loader:            # mini-batches
        pred = model(xb)                   # 1. forward
        loss = loss_fn(pred, yb)           # 2. loss
        opt.zero_grad(); loss.backward()   # 3. backprop
        opt.step()                         # 4. update
"""
print(code)
print("Forward -> loss -> backward -> update: exactly what you wrote in NumPy!")
` },
  ],
  quiz: [
    { q: { en: 'Dropout helps by…', ne: 'Dropout ले कसरी मद्दत गर्छ?' },
      options: { en: ['randomly switching off neurons during training to reduce overfitting', 'deleting data', 'making the network deeper', 'increasing the learning rate'], ne: ['तालिममा न्युरोन random बन्द गरेर overfitting घटाउने', 'डाटा मेटाएर', 'नेटवर्क गहिरो बनाएर', 'learning rate बढाएर'] }, answer: 0, explain: { en: 'Forces the network to learn robust features.', ne: 'नेटवर्कलाई बलियो feature सिक्न बाध्य बनाउँछ।' } },
    { q: { en: 'Which optimizer is the usual default?', ne: 'सामान्यतया default optimizer कुन हो?' }, options: ['Adam', 'Bubble sort', 'K-Means', 'PCA'], answer: 0, explain: { en: 'Adam adapts learning rates per weight.', ne: 'Adam ले हरेक weight को learning rate मिलाउँछ।' } },
  ]
},

{
  id: 'cnn', level: 'deep', minutes: 35,
  title: { en: 'CNNs — Computer Vision', ne: 'CNN — कम्प्युटर भिजन' },
  body: {
en: `
<p><b>Convolutional Neural Networks (CNNs)</b> are designed for images. They power face unlock, medical scan analysis, crop-disease apps and self-driving cars.</p>
<h2>🖼️ An image is just numbers</h2>
<p>A grayscale image is a 2-D grid of pixel brightness (0–255). A colour image has 3 grids: Red, Green, Blue. A 224×224 colour photo = 150,528 numbers!</p>
<h2>🔍 Convolution: a sliding magnifying glass</h2>
<p>A small grid of weights called a <b>filter / kernel</b> (e.g. 3×3) slides over the image. At each position it multiplies and sums → one output number. Different filters detect different things: vertical edges, horizontal edges, corners… The CNN <b>learns</b> the best filters itself.</p>
<div class="box analogy"><b class="t">Why not a normal network?</b>A normal (dense) network connects every pixel to every neuron → millions of weights and no idea that nearby pixels belong together. A filter reuses the same small set of weights everywhere (<b>weight sharing</b>), and finds a pattern wherever it appears.</div>
<h2>🏗️ Typical CNN architecture</h2>
<div class="flow"><span>Image</span><i>→</i><span>Conv + ReLU</span><i>→</i><span>Pooling</span><i>→</i><span>Conv + ReLU</span><i>→</i><span>Pooling</span><i>→</i><span>Flatten</span><i>→</i><span>Dense</span><i>→</i><span>Softmax</span></div>
<p><b>Pooling</b> (e.g. max-pool 2×2) shrinks the image, keeping the strongest signals — makes the network faster and tolerant to small shifts.</p>
<div data-code="0"></div>
<h2>🧳 Transfer learning — the professional shortcut</h2>
<p>Instead of training from zero, start with a CNN already trained on millions of images (ResNet, EfficientNet) and fine-tune it on your small dataset (e.g. 500 photos of tomato leaves). This gives excellent results with little data and compute.</p>
<div class="box use"><b class="t">Uses</b>Image classification, object detection (YOLO), face recognition, X-ray / MRI analysis, satellite imagery (land use, flood mapping in Nepal), quality inspection in factories.</div>
`,
ne: `
<p><b>Convolutional Neural Network (CNN)</b> फोटोका लागि बनाइएका हुन्। फेस अनलक, मेडिकल स्क्यान विश्लेषण, बाली-रोग एप र स्वचालित कार यिनैले चल्छन्।</p>
<h2>🖼️ फोटो भनेको संख्या मात्र हो</h2>
<p>Grayscale फोटो pixel उज्यालोपन (0–255) को 2-D ग्रिड हो। रङ्गीन फोटोमा ३ ग्रिड हुन्छन्: रातो, हरियो, नीलो। 224×224 रङ्गीन फोटो = १,५०,५२८ संख्या!</p>
<h2>🔍 Convolution: सर्ने म्याग्निफाइङ ग्लास</h2>
<p><b>Filter / kernel</b> भनिने weight को सानो ग्रिड (जस्तै 3×3) फोटोमाथि सर्छ। हरेक ठाउँमा गुणन र जोड गरेर → एउटा output संख्या। फरक filter ले फरक कुरा पत्ता लगाउँछन्: ठाडो किनारा, तेर्सो किनारा, कुना… CNN ले उत्तम filter <b>आफैं सिक्छ</b>।</p>
<div class="box analogy"><b class="t">साधारण नेटवर्क किन होइन?</b>साधारण (dense) नेटवर्कले हरेक pixel लाई हरेक न्युरोनसँग जोड्छ → लाखौं weight र नजिकका pixel सँगै हुन्छन् भन्ने थाहा हुँदैन। Filter ले उही सानो weight सेट जताततै प्रयोग गर्छ (<b>weight sharing</b>), र ढाँचा जहाँ देखिए पनि भेट्छ।</div>
<h2>🏗️ सामान्य CNN संरचना</h2>
<div class="flow"><span>फोटो</span><i>→</i><span>Conv + ReLU</span><i>→</i><span>Pooling</span><i>→</i><span>Conv + ReLU</span><i>→</i><span>Pooling</span><i>→</i><span>Flatten</span><i>→</i><span>Dense</span><i>→</i><span>Softmax</span></div>
<p><b>Pooling</b> (जस्तै max-pool 2×2) ले बलिया संकेत राख्दै फोटो सानो बनाउँछ — नेटवर्क छिटो र सानो स्थानान्तरण सहने बनाउँछ।</p>
<div data-code="0"></div>
<h2>🧳 Transfer learning — पेशेवर छोटो बाटो</h2>
<p>शून्यबाट तालिम दिनुको सट्टा लाखौं फोटोमा पहिल्यै तालिम पाएको CNN (ResNet, EfficientNet) बाट सुरु गरेर आफ्नो सानो डाटासेट (जस्तै गोलभेंडाका पातका ५०० फोटो) मा fine-tune गर्ने। थोरै डाटा र कम्प्युटमा उत्कृष्ट नतिजा।</p>
<div class="box use"><b class="t">प्रयोग</b>फोटो वर्गीकरण, वस्तु पहिचान (YOLO), अनुहार पहिचान, X-ray / MRI विश्लेषण, उपग्रह तस्बिर (नेपालमा भू-उपयोग, बाढी नक्सा), कारखानामा गुणस्तर जाँच।</div>
`},
  code: [{ title: { en: 'Convolution filters by hand', ne: 'हातैले convolution filter' }, code: py`
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_digits

img = load_digits().images[0]          # an 8x8 image of the digit 0
img = np.kron(img, np.ones((4, 4)))    # upscale to 32x32 so it's easier to see

def convolve(image, kernel):
    kh, kw = kernel.shape
    out = np.zeros((image.shape[0] - kh + 1, image.shape[1] - kw + 1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i, j] = np.sum(image[i:i+kh, j:j+kw] * kernel)   # multiply & sum
    return out

vertical = np.array([[1, 0, -1], [1, 0, -1], [1, 0, -1]])
horizontal = vertical.T
relu = lambda x: np.maximum(0, x)
def maxpool(x, s=2):
    h, w = x.shape[0] // s, x.shape[1] // s
    return x[:h*s, :w*s].reshape(h, s, w, s).max(axis=(1, 3))

fig, ax = plt.subplots(1, 4, figsize=(13, 3.5))
ax[0].imshow(img, cmap="gray"); ax[0].set_title("input")
ax[1].imshow(relu(convolve(img, vertical)), cmap="magma"); ax[1].set_title("vertical-edge filter")
ax[2].imshow(relu(convolve(img, horizontal)), cmap="magma"); ax[2].set_title("horizontal-edge filter")
ax[3].imshow(maxpool(relu(convolve(img, vertical))), cmap="magma"); ax[3].set_title("after 2x2 max-pool")
for a in ax: a.axis("off")
plt.show()
` }],
  quiz: [
    { q: { en: 'What does a convolution filter do?', ne: 'Convolution filter ले के गर्छ?' },
      options: { en: ['Slides over the image detecting local patterns like edges', 'Deletes pixels', 'Sorts images', 'Changes the file format'], ne: ['फोटोमाथि सर्दै किनारा जस्ता स्थानीय ढाँचा पत्ता लगाउँछ', 'pixel मेटाउँछ', 'फोटो क्रमबद्ध गर्छ', 'फाइल ढाँचा बदल्छ'] }, answer: 0, explain: { en: 'Filters learn to detect useful local features.', ne: 'Filter ले उपयोगी स्थानीय feature पत्ता लगाउन सिक्छ।' } },
    { q: { en: 'Transfer learning means…', ne: 'Transfer learning भनेको…' },
      options: { en: ['starting from a model pre-trained on big data and fine-tuning it', 'copying homework', 'moving files', 'training without data'], ne: ['ठूलो डाटामा पहिल्यै तालिम पाएको मोडेलबाट सुरु गरेर fine-tune गर्ने', 'गृहकार्य सार्ने', 'फाइल सार्ने', 'डाटा बिना तालिम'] }, answer: 0, explain: { en: 'Reuse learned features; great with small datasets.', ne: 'सिकिएका feature पुनः प्रयोग; सानो डाटामा उत्कृष्ट।' } },
  ]
},

{
  id: 'transformers', level: 'deep', minutes: 40,
  title: { en: 'Sequences, RNNs, Transformers & LLMs', ne: 'Sequence, RNN, ट्रान्सफर्मर र LLM' },
  body: {
en: `
<p>Text, speech, stock prices and sensor readings are <b>sequences</b>: order matters. "Dog bites man" ≠ "Man bites dog".</p>
<h2>🔁 RNNs and LSTMs</h2>
<p>A <b>Recurrent Neural Network</b> reads one word at a time and keeps a <b>memory (hidden state)</b> that it updates after each word. Problem: on long sentences the memory of early words fades (vanishing gradients). <b>LSTM</b> and <b>GRU</b> add "gates" that decide what to remember and forget. They were state of the art until 2017.</p>
<h2>⚡ Attention & the Transformer (2017)</h2>
<div class="box analogy"><b class="t">Intuition</b>In "The <b>animal</b> didn't cross the road because <b>it</b> was tired", to understand "it" you <i>look back</i> at "animal". <b>Attention</b> lets every word look at every other word and decide how much to focus on each.</div>
<p>Each word becomes three vectors: <b>Query</b> (what am I looking for?), <b>Key</b> (what do I contain?), <b>Value</b> (what information do I pass on?).</p>
<div class="formula">Attention(Q, K, V) = softmax( Q·Kᵀ / √d ) · V</div>
<p>Transformers process all words <b>in parallel</b> (fast on GPUs) and handle long context. Stack many attention layers + feed-forward layers → a Transformer.</p>
<div data-code="0"></div>
<h2>🤖 Large Language Models (LLMs)</h2>
<ol><li><b>Tokenize</b>: text is split into tokens (word pieces) → numbers → embeddings (vectors with meaning).</li>
<li><b>Pre-train</b>: a huge Transformer learns to predict the <b>next token</b> on trillions of words. That simple task forces it to learn grammar, facts and reasoning patterns.</li>
<li><b>Fine-tune / RLHF</b>: train further on human-written examples and feedback to become a helpful assistant (like Claude or ChatGPT).</li></ol>
<h2>🧱 Using LLMs as a developer</h2>
<ul><li><b>Prompt engineering</b>: clear instructions + examples.</li><li><b>RAG</b> (retrieval-augmented generation): search your own documents and give the relevant parts to the LLM.</li><li><b>Fine-tuning</b>: adapt an open model (e.g. from Hugging Face) to your task — even Nepali text.</li><li><b>Embeddings</b>: turn sentences into vectors for semantic search and clustering.</li></ul>
<div class="box use"><b class="t">Uses</b>Chatbots, translation (English ↔ Nepali), summarization, code assistants, speech-to-text (Whisper), image generation (diffusion models + transformers), protein structure (AlphaFold).</div>
`,
ne: `
<p>Text, बोली, शेयर मूल्य र सेन्सर रिडिङ <b>sequence (अनुक्रम)</b> हुन्: क्रमले फरक पार्छ। "कुकुरले मान्छेलाई टोक्यो" ≠ "मान्छेले कुकुरलाई टोक्यो"।</p>
<h2>🔁 RNN र LSTM</h2>
<p><b>Recurrent Neural Network</b> ले एक पटकमा एउटा शब्द पढ्छ र हरेक शब्दपछि update हुने <b>स्मृति (hidden state)</b> राख्छ। समस्या: लामो वाक्यमा सुरुका शब्दको स्मृति हराउँछ (vanishing gradient)। <b>LSTM</b> र <b>GRU</b> ले के सम्झने र के बिर्सने निर्णय गर्ने "gate" थप्छन्। २०१७ सम्म यिनै सर्वश्रेष्ठ थिए।</p>
<h2>⚡ Attention र Transformer (२०१७)</h2>
<div class="box analogy"><b class="t">सहज बुझाइ</b>"<b>जनावर</b> सडक पार गरेन किनकि <b>ऊ</b> थाकेको थियो" मा "ऊ" बुझ्न तपाईं "जनावर" तिर <i>फर्केर हेर्नुहुन्छ</i>। <b>Attention</b> ले हरेक शब्दलाई अरू हरेक शब्द हेर्न र कसमा कति ध्यान दिने निर्णय गर्न दिन्छ।</div>
<p>हरेक शब्द तीन vector बन्छ: <b>Query</b> (म के खोज्दैछु?), <b>Key</b> (ममा के छ?), <b>Value</b> (म के जानकारी दिन्छु?)।</p>
<div class="formula">Attention(Q, K, V) = softmax( Q·Kᵀ / √d ) · V</div>
<p>Transformer ले सबै शब्द <b>समानान्तर रूपमा</b> प्रशोधन गर्छ (GPU मा छिटो) र लामो सन्दर्भ सम्हाल्छ। धेरै attention layer + feed-forward layer थुपार्दा → Transformer।</p>
<div data-code="0"></div>
<h2>🤖 Large Language Model (LLM)</h2>
<ol><li><b>Tokenize</b>: text लाई token (शब्दका टुक्रा) मा बाँडिन्छ → संख्या → embedding (अर्थ भएका vector)।</li>
<li><b>Pre-train</b>: विशाल Transformer ले खरबौं शब्दमा <b>अर्को token</b> अनुमान गर्न सिक्छ। त्यो सरल कामले यसलाई व्याकरण, तथ्य र तर्कका ढाँचा सिक्न बाध्य बनाउँछ।</li>
<li><b>Fine-tune / RLHF</b>: मानिसले लेखेका उदाहरण र प्रतिक्रियामा थप तालिम दिएर सहयोगी सहायक (Claude वा ChatGPT जस्तै) बनाइन्छ।</li></ol>
<h2>🧱 Developer को रूपमा LLM प्रयोग</h2>
<ul><li><b>Prompt engineering</b>: स्पष्ट निर्देशन + उदाहरण।</li><li><b>RAG</b> (retrieval-augmented generation): आफ्नै कागजात खोजेर सान्दर्भिक भाग LLM लाई दिने।</li><li><b>Fine-tuning</b>: खुला मोडेल (जस्तै Hugging Face बाट) लाई आफ्नो काममा मिलाउने — नेपाली text मा पनि।</li><li><b>Embedding</b>: अर्थपूर्ण खोज र क्लस्टरिङका लागि वाक्यलाई vector मा बदल्ने।</li></ul>
<div class="box use"><b class="t">प्रयोग</b>च्याटबट, अनुवाद (अंग्रेजी ↔ नेपाली), सारांश, कोड सहायक, बोलीबाट text (Whisper), फोटो सिर्जना (diffusion + transformer), प्रोटिन संरचना (AlphaFold)।</div>
`},
  code: [{ title: { en: 'Self-attention in NumPy', ne: 'NumPy मा self-attention' }, code: py`
import numpy as np
import matplotlib.pyplot as plt

words = ["the", "animal", "was", "tired", "so", "it", "slept"]
rng = np.random.default_rng(42)
d = 8
E = rng.normal(0, 1, (len(words), d))          # word embeddings (normally learned)
E[5] = E[1] + rng.normal(0, .3, d)             # make "it" similar to "animal"

Wq, Wk, Wv = (rng.normal(0, .5, (d, d)) + np.eye(d) for _ in range(3))
Q, K, V = E @ Wq, E @ Wk, E @ Wv

def softmax(x):
    e = np.exp(x - x.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)

weights = softmax(Q @ K.T / np.sqrt(d))        # (7, 7): how much each word attends to each
output = weights @ V                           # new context-aware word vectors
others = weights[5].copy(); others[5] = 0        # ignore attention to itself
print("Besides itself, 'it' pays most attention to:", words[others.argmax()])
print("Attention of 'it':", dict(zip(words, weights[5].round(2))))

plt.imshow(weights, cmap="viridis")
plt.xticks(range(len(words)), words, rotation=45); plt.yticks(range(len(words)), words)
plt.colorbar(); plt.title("Self-attention weights"); plt.show()
` }],
  quiz: [
    { q: { en: 'What is the key innovation of Transformers?', ne: 'Transformer को मुख्य आविष्कार के हो?' },
      options: { en: ['Attention: every token can look at every other token', 'Convolution filters', 'Decision trees', 'K-Means'], ne: ['Attention: हरेक token ले अरू हरेक token हेर्न सक्छ', 'Convolution filter', 'डिसिजन ट्री', 'K-Means'] }, answer: 0, explain: { en: '"Attention is all you need" (2017).', ne: '"Attention is all you need" (२०१७)।' } },
    { q: { en: 'LLMs are pre-trained mainly to…', ne: 'LLM लाई मुख्यतः के गर्न pre-train गरिन्छ?' },
      options: { en: ['predict the next token', 'classify images', 'cluster customers', 'sort numbers'], ne: ['अर्को token अनुमान गर्न', 'फोटो वर्गीकरण', 'ग्राहक क्लस्टर', 'संख्या क्रमबद्ध'] }, answer: 0, explain: { en: 'Next-token prediction at huge scale.', ne: 'विशाल स्तरमा अर्को-token अनुमान।' } },
    { q: { en: 'RAG helps an LLM by…', ne: 'RAG ले LLM लाई कसरी मद्दत गर्छ?' },
      options: { en: ['giving it relevant documents retrieved from your own data', 'making it smaller', 'removing attention', 'adding pixels'], ne: ['तपाईंकै डाटाबाट खोजिएका सान्दर्भिक कागजात दिएर', 'सानो बनाएर', 'attention हटाएर', 'pixel थपेर'] }, answer: 0, explain: { en: 'Retrieval grounds answers in your data.', ne: 'Retrieval ले उत्तरलाई तपाईंको डाटामा आधारित बनाउँछ।' } },
  ]
}
);

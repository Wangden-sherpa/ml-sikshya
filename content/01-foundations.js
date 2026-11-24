/* Level 1 — Foundations */
COURSE.lessons.push(
{
  id: 'what-is-ml', level: 'foundations', minutes: 15,
  title: { en: 'What is Machine Learning?', ne: 'मेसिन लर्निङ भनेको के हो?' },
  body: {
en: `
<p>Machine Learning (ML) is a way of teaching computers to <b>learn patterns from data</b> instead of following rules that a human wrote by hand.</p>
<div class="box analogy"><b class="t">Simple analogy</b>Think about how a child learns what a "dog" is. Nobody gives the child a rulebook ("4 legs + tail + barks = dog"). Instead, the child sees many dogs, and the brain slowly figures out the pattern. ML works the same way: we show the computer many examples, and it finds the pattern by itself.</div>

<h2>🔁 Traditional programming vs Machine Learning</h2>
<table>
<tr><th></th><th>Traditional programming</th><th>Machine Learning</th></tr>
<tr><td>Input</td><td>Data + Rules</td><td>Data + Answers (examples)</td></tr>
<tr><td>Output</td><td>Answers</td><td>Rules (a <b>model</b>)</td></tr>
<tr><td>Example</td><td>"If the email contains 'lottery', mark it spam"</td><td>Show 10,000 emails labelled spam / not-spam; the computer learns what spam looks like</td></tr>
</table>
<p>When the rules are too complex to write by hand (recognising faces, translating Nepali to English, predicting house prices), ML is the better tool.</p>

<h2>🧭 The three main types of ML</h2>
<ul>
<li><b>Supervised learning</b> — we give examples <i>with the correct answer</i> (called a <b>label</b>). The model learns to predict the answer for new examples. <br>e.g. predict a house price, decide if an email is spam.</li>
<li><b>Unsupervised learning</b> — the data has <i>no answers</i>. The model finds structure on its own. <br>e.g. group customers into similar types.</li>
<li><b>Reinforcement learning</b> — an agent learns by <i>trial and error</i>, getting rewards for good actions. <br>e.g. a robot learning to walk, AI playing chess.</li>
</ul>
<p>Inside supervised learning there are two kinds of problems:</p>
<ul>
<li><b>Regression</b> → predict a <i>number</i> (price, temperature, marks).</li>
<li><b>Classification</b> → predict a <i>category</i> (spam / not spam, cat / dog, pass / fail).</li>
</ul>

<h2>📦 Key words you will see everywhere</h2>
<table>
<tr><th>Word</th><th>Meaning</th><th>House-price example</th></tr>
<tr><td>Dataset</td><td>The collection of examples</td><td>1,000 houses sold in Kathmandu</td></tr>
<tr><td>Feature (X)</td><td>An input column</td><td>area, number of rooms, distance to road</td></tr>
<tr><td>Label / Target (y)</td><td>The answer we want to predict</td><td>price</td></tr>
<tr><td>Model</td><td>The learned pattern (a mathematical function)</td><td>price ≈ 2.1 × area + 5 × rooms …</td></tr>
<tr><td>Training</td><td>The process of learning from data</td><td>finding the best numbers 2.1 and 5</td></tr>
<tr><td>Prediction</td><td>Using the model on new data</td><td>guess the price of a new house</td></tr>
</table>

<h2>⚙️ The ML workflow (you will repeat this in every project)</h2>
<div class="flow"><span>1. Define the problem</span><i>→</i><span>2. Collect data</span><i>→</i><span>3. Clean & explore</span><i>→</i><span>4. Choose a model</span><i>→</i><span>5. Train</span><i>→</i><span>6. Evaluate</span><i>→</i><span>7. Deploy & improve</span></div>

<h2>🌍 Where is ML used?</h2>
<ul>
<li><b>Phones:</b> face unlock, keyboard next-word suggestions, photo search.</li>
<li><b>Banking (e.g. eSewa, Khalti, banks):</b> fraud detection, loan approval risk.</li>
<li><b>Health:</b> detecting disease from X-rays, predicting patient risk.</li>
<li><b>Agriculture:</b> crop disease detection from leaf photos, rainfall prediction.</li>
<li><b>Entertainment:</b> YouTube, Netflix and TikTok recommendations.</li>
<li><b>Language:</b> ChatGPT/Claude, Google Translate (yes, including Nepali!).</li>
</ul>

<h2>💻 Your first "learning" program</h2>
<p>Below is a real ML model. We give it a few examples of study hours and exam marks; it learns the pattern and predicts marks for a new student. Press <b>▶ Run</b>. Then change the numbers and run again!</p>
<div data-code="0"></div>
<div class="box tip">Don't worry if you don't understand every line yet. By the end of the Supervised Learning level you will be able to write this yourself — and explain exactly how it works inside.</div>
`,
ne: `
<p>मेसिन लर्निङ (ML) भनेको कम्प्युटरलाई मानिसले हातैले लेखेका नियम पालना गराउनुको सट्टा <b>डाटाबाट ढाँचा (pattern) आफैं सिक्न</b> सिकाउने तरिका हो।</p>
<div class="box analogy"><b class="t">सरल उदाहरण</b>सानो बच्चाले "कुकुर" चिन्न कसरी सिक्छ? कसैले नियम-पुस्तिका दिँदैन ("४ खुट्टा + पुच्छर + भुक्छ = कुकुर")। बच्चाले धेरै कुकुर देख्छ र दिमागले बिस्तारै ढाँचा बुझ्छ। ML पनि यस्तै हो: हामी कम्प्युटरलाई धेरै उदाहरण देखाउँछौं, र यसले आफैं ढाँचा पत्ता लगाउँछ।</div>

<h2>🔁 परम्परागत प्रोग्रामिङ बनाम मेसिन लर्निङ</h2>
<table>
<tr><th></th><th>परम्परागत प्रोग्रामिङ</th><th>मेसिन लर्निङ</th></tr>
<tr><td>इनपुट</td><td>डाटा + नियम</td><td>डाटा + उत्तर (उदाहरण)</td></tr>
<tr><td>आउटपुट</td><td>उत्तर</td><td>नियम (एउटा <b>मोडेल</b>)</td></tr>
<tr><td>उदाहरण</td><td>"इमेलमा 'lottery' छ भने spam भन"</td><td>spam / spam होइन भनी चिन्ह लगाइएका १०,००० इमेल देखाउने; कम्प्युटरले spam कस्तो हुन्छ आफैं सिक्छ</td></tr>
</table>
<p>जब नियम हातैले लेख्न धेरै जटिल हुन्छ (अनुहार चिन्ने, नेपालीलाई अंग्रेजीमा अनुवाद गर्ने, घरको मूल्य अनुमान गर्ने), तब ML राम्रो उपाय हो।</p>

<h2>🧭 ML का तीन मुख्य प्रकार</h2>
<ul>
<li><b>सुपरभाइज्ड लर्निङ (Supervised)</b> — हामी <i>सही उत्तरसहित</i> उदाहरण दिन्छौं (उत्तरलाई <b>label</b> भनिन्छ)। मोडेलले नयाँ उदाहरणको उत्तर अनुमान गर्न सिक्छ। <br>जस्तै: घरको मूल्य अनुमान, इमेल spam हो कि होइन।</li>
<li><b>अनसुपरभाइज्ड लर्निङ (Unsupervised)</b> — डाटामा <i>उत्तर हुँदैन</i>। मोडेलले आफैं संरचना खोज्छ। <br>जस्तै: ग्राहकहरूलाई मिल्दाजुल्दा समूहमा बाँड्ने।</li>
<li><b>रिइन्फोर्समेन्ट लर्निङ (Reinforcement)</b> — एजेन्टले <i>प्रयास र गल्तीबाट</i> सिक्छ, राम्रो कामका लागि इनाम पाउँछ। <br>जस्तै: रोबोटले हिँड्न सिक्ने, AI ले चेस खेल्ने।</li>
</ul>
<p>सुपरभाइज्ड लर्निङभित्र दुई प्रकारका समस्या हुन्छन्:</p>
<ul>
<li><b>रिग्रेसन (Regression)</b> → <i>संख्या</i> अनुमान गर्ने (मूल्य, तापक्रम, अंक)।</li>
<li><b>क्लासिफिकेसन (Classification)</b> → <i>वर्ग/श्रेणी</i> अनुमान गर्ने (spam / spam होइन, बिरालो / कुकुर, पास / फेल)।</li>
</ul>

<h2>📦 जताततै देखिने मुख्य शब्दहरू</h2>
<table>
<tr><th>शब्द</th><th>अर्थ</th><th>घर-मूल्य उदाहरण</th></tr>
<tr><td>Dataset (डाटासेट)</td><td>उदाहरणहरूको संग्रह</td><td>काठमाडौंमा बिक्री भएका १,००० घर</td></tr>
<tr><td>Feature (X)</td><td>इनपुट स्तम्भ</td><td>क्षेत्रफल, कोठा संख्या, सडकसम्मको दूरी</td></tr>
<tr><td>Label / Target (y)</td><td>हामीले अनुमान गर्न खोजेको उत्तर</td><td>मूल्य</td></tr>
<tr><td>Model (मोडेल)</td><td>सिकिएको ढाँचा (गणितीय फङ्सन)</td><td>मूल्य ≈ 2.1 × क्षेत्रफल + 5 × कोठा …</td></tr>
<tr><td>Training (तालिम)</td><td>डाटाबाट सिक्ने प्रक्रिया</td><td>2.1 र 5 जस्ता उत्तम संख्या खोज्ने</td></tr>
<tr><td>Prediction (अनुमान)</td><td>नयाँ डाटामा मोडेल प्रयोग गर्ने</td><td>नयाँ घरको मूल्य अनुमान</td></tr>
</table>

<h2>⚙️ ML को कार्यप्रवाह (हरेक प्रोजेक्टमा दोहोरिन्छ)</h2>
<div class="flow"><span>१. समस्या परिभाषित</span><i>→</i><span>२. डाटा संकलन</span><i>→</i><span>३. सफा र अन्वेषण</span><i>→</i><span>४. मोडेल छनोट</span><i>→</i><span>५. तालिम</span><i>→</i><span>६. मूल्याङ्कन</span><i>→</i><span>७. डिप्लोय र सुधार</span></div>

<h2>🌍 ML कहाँ प्रयोग हुन्छ?</h2>
<ul>
<li><b>मोबाइल:</b> फेस अनलक, किबोर्डको अर्को शब्द सुझाव, फोटो खोज।</li>
<li><b>बैंकिङ (eSewa, Khalti, बैंकहरू):</b> ठगी पहिचान, ऋण जोखिम।</li>
<li><b>स्वास्थ्य:</b> X-ray बाट रोग पहिचान, बिरामीको जोखिम अनुमान।</li>
<li><b>कृषि:</b> पातको फोटोबाट बाली रोग पहिचान, वर्षाको अनुमान।</li>
<li><b>मनोरञ्जन:</b> YouTube, Netflix, TikTok का सिफारिसहरू।</li>
<li><b>भाषा:</b> ChatGPT/Claude, Google Translate (नेपाली पनि!)।</li>
</ul>

<h2>💻 तपाईंको पहिलो "सिक्ने" प्रोग्राम</h2>
<p>तल एउटा वास्तविक ML मोडेल छ। हामी पढेको घण्टा र परीक्षाको अंकका केही उदाहरण दिन्छौं; यसले ढाँचा सिकेर नयाँ विद्यार्थीको अंक अनुमान गर्छ। <b>▶ चलाउनुहोस्</b> थिच्नुहोस्। अनि अंकहरू बदलेर फेरि चलाउनुहोस्!</p>
<div data-code="0"></div>
<div class="box tip">अहिले हरेक लाइन नबुझे पनि चिन्ता नगर्नुहोस्। सुपरभाइज्ड लर्निङ तह सकिँदा तपाईं यो आफैं लेख्न र भित्र कसरी काम गर्छ भनेर व्याख्या गर्न सक्नुहुनेछ।</div>
`},
  code: [{ title: { en: 'My first ML model', ne: 'मेरो पहिलो ML मोडेल' }, code: py`
from sklearn.linear_model import LinearRegression

# Examples: hours studied  ->  exam marks
hours = [[1], [2], [3], [4], [5], [6]]
marks = [35, 45, 52, 61, 70, 78]

model = LinearRegression()
model.fit(hours, marks)          # <- the "learning" happens here

new_student = [[7]]
print("Predicted marks for 7 hours:", round(model.predict(new_student)[0], 1))
print("Each extra hour adds about", round(model.coef_[0], 1), "marks")
` }],
  quiz: [
    { q: { en: 'In ML, what do we give the computer to learn from?', ne: 'ML मा कम्प्युटरलाई सिक्न के दिन्छौं?' },
      options: { en: ['Only hand-written rules', 'Data (examples)', 'Nothing — it already knows', 'Only images'], ne: ['हातले लेखेका नियम मात्र', 'डाटा (उदाहरणहरू)', 'केही होइन — यसलाई पहिल्यै थाहा हुन्छ', 'फोटो मात्र'] },
      answer: 1, explain: { en: 'ML learns patterns from data instead of rules written by a programmer.', ne: 'ML ले प्रोग्रामरले लेखेका नियमको सट्टा डाटाबाट ढाँचा सिक्छ।' } },
    { q: { en: 'Predicting tomorrow\'s temperature (a number) is…', ne: 'भोलिको तापक्रम (संख्या) अनुमान गर्नु भनेको…' },
      options: { en: ['Classification', 'Regression', 'Clustering', 'Reinforcement learning'], ne: ['क्लासिफिकेसन', 'रिग्रेसन', 'क्लस्टरिङ', 'रिइन्फोर्समेन्ट लर्निङ'] },
      answer: 1, explain: { en: 'Predicting a continuous number is regression.', ne: 'निरन्तर संख्या अनुमान गर्नु रिग्रेसन हो।' } },
    { q: { en: 'Grouping customers into similar types without any labels is…', ne: 'कुनै label बिना ग्राहकलाई मिल्दाजुल्दा समूहमा बाँड्नु…' },
      options: { en: ['Supervised learning', 'Unsupervised learning', 'Regression', 'Programming'], ne: ['सुपरभाइज्ड लर्निङ', 'अनसुपरभाइज्ड लर्निङ', 'रिग्रेसन', 'प्रोग्रामिङ'] },
      answer: 1, explain: { en: 'No answers are given, so the model finds structure itself — unsupervised.', ne: 'उत्तर दिइँदैन, मोडेलले आफैं संरचना खोज्छ — अनसुपरभाइज्ड।' } },
  ]
},

{
  id: 'python-basics', level: 'foundations', minutes: 25,
  title: { en: 'Python Crash Course for ML', ne: 'ML का लागि Python छिटो सिकाइ' },
  body: {
en: `
<p>Python is the #1 language for ML because it is easy to read and has amazing libraries (NumPy, Pandas, scikit-learn, PyTorch). You only need a small part of Python to start.</p>
<h2>📦 Variables and types</h2>
<p>A variable is a labelled box that stores a value.</p>
<table><tr><th>Type</th><th>Example</th><th>Used for</th></tr>
<tr><td><code>int</code></td><td><code>age = 21</code></td><td>whole numbers</td></tr>
<tr><td><code>float</code></td><td><code>price = 45.5</code></td><td>decimal numbers</td></tr>
<tr><td><code>str</code></td><td><code>city = "Pokhara"</code></td><td>text</td></tr>
<tr><td><code>bool</code></td><td><code>is_spam = True</code></td><td>yes / no</td></tr>
<tr><td><code>list</code></td><td><code>marks = [70, 85, 90]</code></td><td>ordered collection</td></tr>
<tr><td><code>dict</code></td><td><code>{"name": "Sita", "age": 20}</code></td><td>key → value pairs</td></tr>
</table>
<div data-code="0"></div>

<h2>🔀 Decisions and loops</h2>
<p><code>if / elif / else</code> lets the program choose. <code>for</code> repeats work for each item. Python uses <b>indentation</b> (4 spaces) to show which lines belong inside.</p>
<div data-code="1"></div>

<h2>🧩 Functions</h2>
<p>A function is a reusable recipe: give it inputs, get an output. In ML, a <i>model</i> is basically a (very clever) function.</p>
<div data-code="2"></div>

<h2>🏗️ Classes (just the idea)</h2>
<p>scikit-learn models are <b>objects</b>. You create one, then call its methods: <code>model = LinearRegression()</code>, <code>model.fit(X, y)</code>, <code>model.predict(X_new)</code>. Every sklearn model follows this same <b>fit → predict</b> pattern — learn it once, use it everywhere.</p>
<div class="box tip">Practice tip: change values in the code above, break it on purpose, and read the error message. Reading errors calmly is a core programming skill.</div>
`,
ne: `
<p>Python ML को नम्बर १ भाषा हो किनभने यो पढ्न सजिलो छ र यसका उत्कृष्ट लाइब्रेरीहरू छन् (NumPy, Pandas, scikit-learn, PyTorch)। सुरु गर्न Python को सानो भाग मात्र चाहिन्छ।</p>
<h2>📦 भेरिएबल र प्रकार (types)</h2>
<p>भेरिएबल भनेको मान राख्ने नाम लेखिएको बाकस हो।</p>
<table><tr><th>प्रकार</th><th>उदाहरण</th><th>प्रयोग</th></tr>
<tr><td><code>int</code></td><td><code>age = 21</code></td><td>पूर्णाङ्क</td></tr>
<tr><td><code>float</code></td><td><code>price = 45.5</code></td><td>दशमलव संख्या</td></tr>
<tr><td><code>str</code></td><td><code>city = "Pokhara"</code></td><td>पाठ (text)</td></tr>
<tr><td><code>bool</code></td><td><code>is_spam = True</code></td><td>हो / होइन</td></tr>
<tr><td><code>list</code></td><td><code>marks = [70, 85, 90]</code></td><td>क्रमबद्ध संग्रह</td></tr>
<tr><td><code>dict</code></td><td><code>{"name": "Sita", "age": 20}</code></td><td>key → value जोडी</td></tr>
</table>
<div data-code="0"></div>

<h2>🔀 निर्णय र लूप</h2>
<p><code>if / elif / else</code> ले प्रोग्रामलाई छनोट गर्न दिन्छ। <code>for</code> ले हरेक वस्तुका लागि काम दोहोर्याउँछ। कुन लाइन भित्र पर्छ भनेर देखाउन Python ले <b>indentation</b> (४ स्पेस) प्रयोग गर्छ।</p>
<div data-code="1"></div>

<h2>🧩 फङ्सन</h2>
<p>फङ्सन भनेको पुनः प्रयोग गर्न मिल्ने विधि हो: इनपुट दिनुहोस्, आउटपुट पाउनुहोस्। ML मा <i>मोडेल</i> भनेको मूलतः (धेरै चलाख) फङ्सन नै हो।</p>
<div data-code="2"></div>

<h2>🏗️ क्लास (विचार मात्र)</h2>
<p>scikit-learn का मोडेलहरू <b>object</b> हुन्। एउटा बनाउनुहोस्, अनि यसका method बोलाउनुहोस्: <code>model = LinearRegression()</code>, <code>model.fit(X, y)</code>, <code>model.predict(X_new)</code>। हरेक sklearn मोडेलले यही <b>fit → predict</b> ढाँचा पछ्याउँछ — एकपटक सिक्नुहोस्, जताततै प्रयोग गर्नुहोस्।</p>
<div class="box tip">अभ्यास सुझाव: माथिको कोडमा मान बदल्नुहोस्, जानाजान बिगार्नुहोस्, र error सन्देश पढ्नुहोस्। शान्त भएर error पढ्नु प्रोग्रामिङको मुख्य सीप हो।</div>
`},
  code: [
    { title: { en: 'Variables, lists, dicts', ne: 'भेरिएबल, लिस्ट, डिक्ट' }, code: py`
name = "Sita"
age = 20
marks = [72, 85, 90, 64]
student = {"name": name, "age": age, "marks": marks}

print("Name:", student["name"])
print("Number of subjects:", len(marks))
print("Average mark:", sum(marks) / len(marks))
print("Highest:", max(marks), "| Lowest:", min(marks))
marks.append(88)            # add an item
print("Updated marks:", marks)
print("First two:", marks[:2], "| Last one:", marks[-1])
` },
    { title: { en: 'if / for', ne: 'if / for' }, code: py`
marks = [72, 85, 90, 34, 64]

for m in marks:
    if m >= 80:
        grade = "A"
    elif m >= 60:
        grade = "B"
    elif m >= 40:
        grade = "C"
    else:
        grade = "Fail"
    print(m, "->", grade)

# List comprehension: a short way to build a list
passed = [m for m in marks if m >= 40]
print("Passed marks:", passed)
` },
    { title: { en: 'Functions', ne: 'फङ्सन' }, code: py`
def bmi(weight_kg, height_m):
    """Body Mass Index = weight / height^2"""
    return weight_kg / height_m ** 2

def category(b):
    if b < 18.5:
        return "Underweight"
    elif b < 25:
        return "Normal"
    return "Overweight"

for w, h in [(50, 1.65), (70, 1.75), (90, 1.70)]:
    b = bmi(w, h)
    print(f"weight={w}kg height={h}m -> BMI={b:.1f} ({category(b)})")
` },
  ],
  quiz: [
    { q: { en: 'What does marks[-1] return for marks = [10, 20, 30]?', ne: 'marks = [10, 20, 30] भए marks[-1] ले के दिन्छ?' }, options: ['10', '20', '30', 'Error'], answer: 2,
      explain: { en: 'Negative indexes count from the end; -1 is the last item.', ne: 'ऋणात्मक index अन्त्यबाट गन्छ; -1 अन्तिम वस्तु हो।' } },
    { q: { en: 'How does Python know which lines are inside a for loop?', ne: 'कुन लाइन for लूपभित्र छन् भनेर Python ले कसरी थाहा पाउँछ?' },
      options: { en: ['Curly braces { }', 'Indentation (spaces)', 'Semicolons', 'Line numbers'], ne: ['कर्ली ब्रेस { }', 'Indentation (स्पेस)', 'सेमिकोलन', 'लाइन नम्बर'] }, answer: 1,
      explain: { en: 'Python uses indentation to define blocks.', ne: 'Python ले block छुट्याउन indentation प्रयोग गर्छ।' } },
    { q: { en: 'Which two methods do almost all scikit-learn models have?', ne: 'लगभग सबै scikit-learn मोडेलमा कुन दुई method हुन्छन्?' }, options: ['open / close', 'fit / predict', 'start / stop', 'read / write'], answer: 1,
      explain: { en: 'fit() learns from data, predict() uses what was learned.', ne: 'fit() ले डाटाबाट सिक्छ, predict() ले सिकेको प्रयोग गर्छ।' } },
  ]
},

{
  id: 'numpy', level: 'foundations', minutes: 25,
  title: { en: 'NumPy — Fast Numbers', ne: 'NumPy — छिटो संख्या गणना' },
  body: {
en: `
<p><b>NumPy</b> gives Python a super-fast <b>array</b>: a grid of numbers. All ML data — tables, images, sound — ends up as NumPy arrays. Images are 2-D/3-D arrays of pixel values; a dataset is a 2-D array (rows = examples, columns = features).</p>
<div class="box analogy"><b class="t">Why not normal lists?</b>Lists are like doing maths one number at a time with a pencil. NumPy is like a calculator that works on the whole column at once (called <b>vectorization</b>) — often 50–100× faster.</div>
<h2>🧱 Creating arrays and their shape</h2>
<p>The <b>shape</b> tells you the size of each dimension. A table of 100 students × 3 subjects has shape <code>(100, 3)</code>. Most bugs in ML are shape mistakes, so always print shapes!</p>
<div data-code="0"></div>
<h2>⚡ Vectorized maths and broadcasting</h2>
<p>Operations apply to every element at once. <b>Broadcasting</b> means NumPy automatically stretches a smaller array to match a bigger one — e.g. subtracting each column's mean from every row.</p>
<div data-code="1"></div>
<h2>🎯 Indexing, slicing and filtering</h2>
<p><code>a[row, col]</code>, <code>a[:, 0]</code> (all rows, first column), and boolean masks like <code>a[a > 50]</code> are used constantly to select data.</p>
<div data-code="2"></div>
<div class="box key"><b class="t">Most used NumPy tools in ML</b><code>np.array, .shape, .reshape, np.mean / std / sum (axis=0 or 1), np.dot or @ (matrix multiply), np.random, np.argmax, np.where</code></div>
`,
ne: `
<p><b>NumPy</b> ले Python लाई धेरै छिटो <b>array</b> दिन्छ: संख्याहरूको ग्रिड। सबै ML डाटा — तालिका, फोटो, आवाज — अन्ततः NumPy array बन्छ। फोटो भनेको pixel मानको 2-D/3-D array हो; डाटासेट 2-D array हो (row = उदाहरण, column = feature)।</p>
<div class="box analogy"><b class="t">सामान्य list किन होइन?</b>List भनेको कलमले एक-एक संख्या गणना गर्नु जस्तै हो। NumPy भनेको पूरै स्तम्भमा एकैपटक काम गर्ने क्याल्कुलेटर जस्तै हो (यसलाई <b>vectorization</b> भनिन्छ) — प्रायः ५०–१०० गुणा छिटो।</div>
<h2>🧱 Array बनाउने र यसको shape</h2>
<p><b>Shape</b> ले हरेक आयाम (dimension) को आकार बताउँछ। १०० विद्यार्थी × ३ विषयको तालिकाको shape <code>(100, 3)</code> हुन्छ। ML का धेरैजसो गल्ती shape कै हुन्छन्, त्यसैले सधैं shape print गर्नुहोस्!</p>
<div data-code="0"></div>
<h2>⚡ Vectorized गणित र broadcasting</h2>
<p>गणना हरेक element मा एकैपटक लागू हुन्छ। <b>Broadcasting</b> भनेको सानो array लाई ठूलोसँग मिलाउन NumPy ले आफैं तन्काउनु हो — जस्तै हरेक row बाट हरेक column को औसत घटाउने।</p>
<div data-code="1"></div>
<h2>🎯 Indexing, slicing र filtering</h2>
<p><code>a[row, col]</code>, <code>a[:, 0]</code> (सबै row, पहिलो column), र <code>a[a > 50]</code> जस्ता boolean mask डाटा छान्न निरन्तर प्रयोग हुन्छन्।</p>
<div data-code="2"></div>
<div class="box key"><b class="t">ML मा सबैभन्दा बढी प्रयोग हुने NumPy उपकरण</b><code>np.array, .shape, .reshape, np.mean / std / sum (axis=0 वा 1), np.dot वा @ (matrix गुणन), np.random, np.argmax, np.where</code></div>
`},
  code: [
    { title: { en: 'Arrays and shapes', ne: 'Array र shape' }, code: py`
import numpy as np

a = np.array([1, 2, 3, 4, 5, 6])
print("a =", a, "| shape:", a.shape)

M = a.reshape(2, 3)         # 2 rows, 3 columns
print("M =\n", M, "\nshape:", M.shape)

# 4 students x 3 subjects (Maths, Science, English)
marks = np.array([[80, 70, 65],
                  [90, 85, 88],
                  [55, 60, 70],
                  [72, 95, 81]])
print("Average per subject (axis=0):", marks.mean(axis=0))
print("Average per student (axis=1):", marks.mean(axis=1).round(1))
print("Zeros:", np.zeros(3), "| Range:", np.arange(0, 10, 2), "| Random:", np.random.rand(3).round(2))
` },
    { title: { en: 'Vectorization & broadcasting', ne: 'Vectorization र broadcasting' }, code: py`
import numpy as np

prices_npr = np.array([1200, 450, 980, 3000])
print("With 13% VAT:", prices_npr * 1.13)

X = np.array([[150, 3], [200, 4], [120, 2]], dtype=float)   # area, rooms
mean = X.mean(axis=0)
std = X.std(axis=0)
X_scaled = (X - mean) / std          # broadcasting: (3,2) - (2,)
print("Column means:", mean)
print("Standardized:\n", X_scaled.round(2))

# Matrix multiplication: the heart of ML models
w = np.array([2.0, 10.0])   # weights
print("Predictions X @ w =", X @ w)
` },
    { title: { en: 'Indexing & filtering', ne: 'Indexing र filtering' }, code: py`
import numpy as np

marks = np.array([[80, 70, 65],
                  [90, 85, 88],
                  [55, 60, 70],
                  [72, 95, 81]])
print("Student 2, subject 3:", marks[1, 2])
print("All Maths marks:", marks[:, 0])
print("First two students:\n", marks[:2])
print("Marks above 80:", marks[marks > 80])
print("Who has the best Science mark? student index", np.argmax(marks[:, 1]))
print("Pass/Fail:\n", np.where(marks >= 60, "Pass", "Fail"))
` },
  ],
  quiz: [
    { q: { en: 'A dataset with 500 rows and 8 features has shape…', ne: '५०० row र ८ feature भएको डाटासेटको shape…' }, options: ['(8, 500)', '(500, 8)', '(4000,)', '(500,)'], answer: 1,
      explain: { en: 'Rows (examples) come first, then columns (features).', ne: 'पहिले row (उदाहरण), त्यसपछि column (feature)।' } },
    { q: { en: 'X.mean(axis=0) on a (100, 3) array gives…', ne: '(100, 3) array मा X.mean(axis=0) ले दिन्छ…' },
      options: { en: ['100 values — one per row', '3 values — one per column', 'one single value', 'an error'], ne: ['१०० मान — हरेक row को', '३ मान — हरेक column को', 'एउटा मात्र मान', 'error'] }, answer: 1,
      explain: { en: 'axis=0 collapses the rows, giving one mean per column.', ne: 'axis=0 ले row हरूलाई खुम्चाउँछ, हरेक column को एउटा औसत दिन्छ।' } },
    { q: { en: 'Why is NumPy faster than Python lists for maths?', ne: 'गणितमा NumPy किन Python list भन्दा छिटो छ?' },
      options: { en: ['It uses vectorized operations in optimized C code', 'It skips some numbers', 'It uses the internet', 'It is not faster'], ne: ['यसले optimized C कोडमा vectorized गणना गर्छ', 'यसले केही संख्या छोड्छ', 'यसले इन्टरनेट प्रयोग गर्छ', 'यो छिटो छैन'] }, answer: 0,
      explain: { en: 'Whole-array operations run in compiled C instead of a slow Python loop.', ne: 'पूरै array को गणना ढिलो Python लूपको सट्टा compiled C मा चल्छ।' } },
  ]
},

{
  id: 'pandas', level: 'foundations', minutes: 25,
  title: { en: 'Pandas — Working with Tables', ne: 'Pandas — तालिकासँग काम' },
  body: {
en: `
<p><b>Pandas</b> is Excel inside Python. Its main object is the <b>DataFrame</b>: a table with named columns. Real data scientists spend 60–80% of their time cleaning and exploring data — with Pandas.</p>
<h2>📋 Create and explore a DataFrame</h2>
<p>First look at any dataset with <code>head()</code>, <code>shape</code>, <code>info()</code> and <code>describe()</code>.</p>
<div data-code="0"></div>
<h2>🔍 Select, filter, group</h2>
<ul><li><code>df["col"]</code> — one column</li><li><code>df[df["price"] > 50]</code> — filter rows</li><li><code>df.groupby("city")["price"].mean()</code> — summary per group (like a pivot table)</li></ul>
<div data-code="1"></div>
<h2>🧹 Cleaning messy data</h2>
<p>Real data has <b>missing values</b> (NaN), wrong types and duplicates. Common fixes: fill missing values with the median (<code>fillna</code>), drop rows (<code>dropna</code>), convert text categories into numbers (<code>get_dummies</code>, called one-hot encoding).</p>
<div data-code="2"></div>
<div class="box warn">Models cannot read text or NaN. Before training, every feature must be a number and nothing can be missing.</div>
<p>To read a real file you would write <code>pd.read_csv("houses.csv")</code>. In this site we create data in code so everything runs in the browser.</p>
`,
ne: `
<p><b>Pandas</b> भनेको Python भित्रको Excel हो। यसको मुख्य object <b>DataFrame</b> हो: नाम भएका column सहितको तालिका। वास्तविक डाटा वैज्ञानिकहरूले आफ्नो ६०–८०% समय डाटा सफा गर्न र अन्वेषण गर्नमा खर्चन्छन् — Pandas प्रयोग गरेर।</p>
<h2>📋 DataFrame बनाउने र हेर्ने</h2>
<p>कुनै पनि डाटासेटलाई सुरुमा <code>head()</code>, <code>shape</code>, <code>info()</code> र <code>describe()</code> ले हेर्नुहोस्।</p>
<div data-code="0"></div>
<h2>🔍 छान्ने, फिल्टर गर्ने, समूह बनाउने</h2>
<ul><li><code>df["col"]</code> — एउटा column</li><li><code>df[df["price"] > 50]</code> — row फिल्टर</li><li><code>df.groupby("city")["price"].mean()</code> — समूह अनुसार सारांश (pivot table जस्तै)</li></ul>
<div data-code="1"></div>
<h2>🧹 फोहोर डाटा सफा गर्ने</h2>
<p>वास्तविक डाटामा <b>हराएका मान</b> (NaN), गलत प्रकार र दोहोरिएका row हुन्छन्। सामान्य समाधान: हराएको मान median ले भर्ने (<code>fillna</code>), row हटाउने (<code>dropna</code>), text श्रेणीलाई संख्यामा बदल्ने (<code>get_dummies</code>, जसलाई one-hot encoding भनिन्छ)।</p>
<div data-code="2"></div>
<div class="box warn">मोडेलले text वा NaN पढ्न सक्दैन। तालिम अघि हरेक feature संख्या हुनुपर्छ र केही पनि हराएको हुनुहुँदैन।</div>
<p>वास्तविक फाइल पढ्न <code>pd.read_csv("houses.csv")</code> लेखिन्छ। यो साइटमा सबै ब्राउजरमै चलोस् भनेर डाटा कोडमै बनाइएको छ।</p>
`},
  code: [
    { title: { en: 'Create & explore', ne: 'बनाउने र हेर्ने' }, code: py`
import pandas as pd

df = pd.DataFrame({
    "city":   ["Kathmandu", "Pokhara", "Lalitpur", "Chitwan", "Kathmandu", "Pokhara"],
    "area":   [1200, 1500, 1000, 2000, 900, 1100],      # square feet
    "rooms":  [3, 4, 2, 5, 2, 3],
    "price":  [180, 150, 140, 120, 130, 115],           # lakh NPR
})
print(df.head(), "\n")
print("Shape:", df.shape, "\n")
print(df.describe().round(1))
` },
    { title: { en: 'Select, filter, group', ne: 'छान्ने, फिल्टर, समूह' }, code: py`
import pandas as pd

df = pd.DataFrame({
    "city":  ["Kathmandu", "Pokhara", "Lalitpur", "Chitwan", "Kathmandu", "Pokhara"],
    "area":  [1200, 1500, 1000, 2000, 900, 1100],
    "price": [180, 150, 140, 120, 130, 115],
})
df["price_per_sqft"] = (df["price"] * 100000 / df["area"]).round()   # new column
print(df[["city", "price_per_sqft"]], "\n")
print("Expensive houses:\n", df[df["price"] > 140], "\n")
print("Average price by city:\n", df.groupby("city")["price"].mean().sort_values(ascending=False))
` },
    { title: { en: 'Cleaning: missing values & encoding', ne: 'सफाइ: हराएको मान र encoding' }, code: py`
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "city":  ["Kathmandu", "Pokhara", None, "Chitwan", "Kathmandu"],
    "area":  [1200, np.nan, 1000, 2000, 900],
    "price": [180, 150, 140, 120, 130],
})
print("Missing values per column:\n", df.isna().sum(), "\n")
df["area"] = df["area"].fillna(df["area"].median())
df["city"] = df["city"].fillna("Unknown")
encoded = pd.get_dummies(df, columns=["city"], dtype=int)   # one-hot encoding
print(encoded)
` },
  ],
  quiz: [
    { q: { en: 'Which command shows summary statistics (mean, min, max…) of numeric columns?', ne: 'कुन कमाण्डले संख्यात्मक column को सारांश (औसत, न्यूनतम, अधिकतम…) देखाउँछ?' }, options: ['df.head()', 'df.describe()', 'df.shape', 'df.city'], answer: 1,
      explain: { en: 'describe() gives count, mean, std, min, quartiles and max.', ne: 'describe() ले count, mean, std, min, quartile र max दिन्छ।' } },
    { q: { en: 'One-hot encoding is used to…', ne: 'One-hot encoding किन प्रयोग हुन्छ?' },
      options: { en: ['Delete rows', 'Turn categories (text) into numeric 0/1 columns', 'Make the data bigger for fun', 'Sort data'], ne: ['row मेटाउन', 'श्रेणी (text) लाई 0/1 संख्या column मा बदल्न', 'रमाइलोको लागि डाटा ठूलो बनाउन', 'डाटा क्रमबद्ध गर्न'] }, answer: 1,
      explain: { en: 'Models need numbers, so each category becomes its own 0/1 column.', ne: 'मोडेललाई संख्या चाहिन्छ, त्यसैले हरेक श्रेणी आफ्नै 0/1 column बन्छ।' } },
    { q: { en: 'A good way to fill missing numeric values is often…', ne: 'हराएको संख्यात्मक मान भर्ने राम्रो तरिका प्रायः…' },
      options: { en: ['the median of the column', 'a random word', '999999', 'leave as NaN always'], ne: ['column को median', 'कुनै random शब्द', '999999', 'सधैं NaN नै छोड्ने'] }, answer: 0,
      explain: { en: 'The median is simple and robust to extreme values (outliers).', ne: 'Median सरल छ र अत्यधिक मान (outlier) ले कम प्रभावित हुन्छ।' } },
  ]
},

{
  id: 'visualization', level: 'foundations', minutes: 20,
  title: { en: 'Visualizing Data with Matplotlib', ne: 'Matplotlib ले डाटा चित्रण' },
  body: {
en: `
<p>"A picture is worth a thousand rows." Before building any model, <b>plot your data</b>. Plots reveal patterns, outliers and mistakes that numbers hide.</p>
<h2>📊 Which chart for which question?</h2>
<table><tr><th>Question</th><th>Chart</th></tr>
<tr><td>How is one variable distributed?</td><td>Histogram</td></tr>
<tr><td>Are two numbers related?</td><td>Scatter plot</td></tr>
<tr><td>How does something change over time?</td><td>Line chart</td></tr>
<tr><td>Compare categories</td><td>Bar chart</td></tr></table>
<div data-code="0"></div>
<h2>🔎 Scatter plots reveal relationships</h2>
<p>If points go up together, the features are <b>positively correlated</b> — a linear model will probably work. Colour points by class to see if classes are separable.</p>
<div data-code="1"></div>
<div class="box tip">Always give charts a title and axis labels. Future-you (and your boss) will thank you.</div>
`,
ne: `
<p>"एउटा चित्र हजार row बराबर।" कुनै पनि मोडेल बनाउनु अघि <b>डाटाको ग्राफ बनाउनुहोस्</b>। ग्राफले संख्याले लुकाएका ढाँचा, असामान्य मान (outlier) र गल्तीहरू देखाउँछ।</p>
<h2>📊 कुन प्रश्नका लागि कुन चार्ट?</h2>
<table><tr><th>प्रश्न</th><th>चार्ट</th></tr>
<tr><td>एउटा भेरिएबल कसरी फैलिएको छ?</td><td>Histogram</td></tr>
<tr><td>दुई संख्या सम्बन्धित छन्?</td><td>Scatter plot</td></tr>
<tr><td>समयसँगै कसरी परिवर्तन हुन्छ?</td><td>Line chart</td></tr>
<tr><td>श्रेणीहरू तुलना</td><td>Bar chart</td></tr></table>
<div data-code="0"></div>
<h2>🔎 Scatter plot ले सम्बन्ध देखाउँछ</h2>
<p>यदि बिन्दुहरू सँगै माथि जान्छन् भने feature हरू <b>सकारात्मक रूपमा सम्बन्धित (positively correlated)</b> छन् — linear मोडेलले सम्भवतः काम गर्छ। वर्ग (class) अनुसार रङ दिँदा वर्गहरू छुट्टिन्छन् कि हेर्न सकिन्छ।</p>
<div data-code="1"></div>
<div class="box tip">चार्टमा सधैं शीर्षक र अक्षका label दिनुहोस्। भविष्यको तपाईं (र तपाईंको हाकिम) खुसी हुनुहुनेछ।</div>
`},
  code: [
    { title: { en: 'Line, bar and histogram', ne: 'Line, bar र histogram' }, code: py`
import numpy as np
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
rain_mm = [15, 20, 35, 60, 120, 300]
heights = np.random.normal(165, 8, 500)     # 500 people, mean 165cm

fig, ax = plt.subplots(1, 3, figsize=(13, 3.5))
ax[0].plot(months, rain_mm, marker="o", color="tab:blue"); ax[0].set_title("Rainfall (line)")
ax[1].bar(["KTM", "PKR", "BRT"], [45, 30, 25], color=["#4f46e5", "#dc143c", "#12a67a"]); ax[1].set_title("Users by city (bar)")
ax[2].hist(heights, bins=25, color="tab:purple", edgecolor="white"); ax[2].set_title("Heights (histogram)")
plt.tight_layout()
plt.show()
` },
    { title: { en: 'Scatter plot with classes', ne: 'वर्गसहित scatter plot' }, code: py`
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt

iris = load_iris()
X, y = iris.data, iris.target
for cls, color in zip([0, 1, 2], ["tab:red", "tab:green", "tab:blue"]):
    plt.scatter(X[y == cls, 2], X[y == cls, 3], label=iris.target_names[cls], alpha=.7, color=color)
plt.xlabel("Petal length (cm)"); plt.ylabel("Petal width (cm)")
plt.title("Iris flowers: classes are easy to separate!")
plt.legend(); plt.show()
` },
  ],
  quiz: [
    { q: { en: 'Best chart to check if area and price are related?', ne: 'क्षेत्रफल र मूल्य सम्बन्धित छन् कि हेर्न उत्तम चार्ट?' }, options: ['Pie chart', 'Scatter plot', 'Histogram', 'Table'], answer: 1,
      explain: { en: 'Scatter plots show the relationship between two numeric variables.', ne: 'Scatter plot ले दुई संख्यात्मक भेरिएबलबीचको सम्बन्ध देखाउँछ।' } },
    { q: { en: 'A histogram shows…', ne: 'Histogram ले देखाउँछ…' },
      options: { en: ['the distribution of one variable', 'change over time', 'two classes', 'a map'], ne: ['एउटा भेरिएबलको वितरण', 'समयसँगको परिवर्तन', 'दुई वर्ग', 'नक्सा'] }, answer: 0,
      explain: { en: 'It counts how many values fall into each range (bin).', ne: 'यसले हरेक दायरा (bin) मा कति मान पर्छन् गन्छ।' } },
  ]
},

{
  id: 'math-intuition', level: 'foundations', minutes: 30,
  title: { en: 'The Maths of ML — Intuition First', ne: 'ML को गणित — पहिले सहज बुझाइ' },
  body: {
en: `
<p>You don't need to be a maths genius for ML. You need the <b>intuition</b> of four ideas. We explain each with pictures in your head first, then the formula.</p>
<h2>1️⃣ Vectors & matrices — data as numbers</h2>
<p>A <b>vector</b> is a list of numbers describing one thing: a house = <code>[area, rooms, age]</code>. A <b>matrix</b> stacks many vectors: the whole dataset. A model's prediction is often a <b>dot product</b>: multiply each feature by a weight (importance) and add.</p>
<div class="formula">prediction = w₁·x₁ + w₂·x₂ + … + b  =  w · x + b</div>
<h2>2️⃣ Derivatives — which direction is downhill?</h2>
<div class="box analogy"><b class="t">Analogy: lost on a foggy hill</b>You're on a hill in thick fog and want to reach the bottom of the valley. You can't see far, but you can feel the slope under your feet. Step downhill, feel again, step again… The <b>derivative</b> is that slope. This is exactly how models learn (gradient descent).</div>
<p>The derivative tells us: "if I increase this weight a little, does the error go up or down, and how fast?"</p>
<div class="formula">f(x) = x²   →   f'(x) = 2x      (at x = 3 the slope is 6: going right goes up steeply)</div>
<h2>3️⃣ Probability — dealing with uncertainty</h2>
<p>Models rarely say "definitely". They say "<b>92% chance</b> this email is spam". Probabilities are numbers between 0 and 1. Key ideas: average (mean), spread (standard deviation), and the bell-shaped <b>normal distribution</b>.</p>
<h2>4️⃣ Statistics — mean, variance, correlation</h2>
<ul><li><b>Mean</b>: the average. <b>Median</b>: the middle value (robust to outliers).</li>
<li><b>Variance / Std</b>: how spread out values are.</li>
<li><b>Correlation</b> (−1 to +1): do two features move together?</li></ul>
<div data-code="0"></div>
<div data-code="1"></div>
<div class="box key"><b class="t">What to remember</b>Data = vectors/matrices. Prediction = weighted sum. Learning = follow the slope (derivative) downhill to reduce error. Output = probability.</div>
`,
ne: `
<p>ML का लागि गणितको जिनियस हुनु पर्दैन। चार वटा विचारको <b>सहज बुझाइ</b> चाहिन्छ। हरेकलाई पहिले मनमा चित्र बनाएर, त्यसपछि सूत्रले बुझाउँछौं।</p>
<h2>1️⃣ Vector र matrix — डाटा संख्याको रूपमा</h2>
<p><b>Vector</b> भनेको एउटा कुरालाई वर्णन गर्ने संख्याको सूची हो: घर = <code>[क्षेत्रफल, कोठा, उमेर]</code>। <b>Matrix</b> ले धेरै vector थुपार्छ: पूरै डाटासेट। मोडेलको अनुमान प्रायः <b>dot product</b> हुन्छ: हरेक feature लाई weight (महत्त्व) ले गुणन गरेर जोड्ने।</p>
<div class="formula">prediction = w₁·x₁ + w₂·x₂ + … + b  =  w · x + b</div>
<h2>2️⃣ Derivative (अवकलज) — तल जाने बाटो कता?</h2>
<div class="box analogy"><b class="t">उदाहरण: कुहिरोमा डाँडामा हराउनु</b>तपाईं बाक्लो कुहिरोमा डाँडामा हुनुहुन्छ र बेँसीको फेदमा पुग्न चाहनुहुन्छ। टाढा देख्न सक्नुहुन्न, तर खुट्टामुनिको भिरालोपन महसुस गर्न सक्नुहुन्छ। ओरालोतिर एक पाइला, फेरि महसुस, फेरि पाइला… त्यो भिरालोपन नै <b>derivative</b> हो। मोडेलहरू ठ्याक्कै यसरी नै सिक्छन् (gradient descent)।</div>
<p>Derivative ले बताउँछ: "यो weight अलिकति बढाएँ भने error बढ्छ कि घट्छ, र कति छिटो?"</p>
<div class="formula">f(x) = x²   →   f'(x) = 2x      (x = 3 मा भिरालोपन 6: दायाँ जाँदा ठाडो उकालो)</div>
<h2>3️⃣ सम्भाव्यता (Probability) — अनिश्चिततासँग काम</h2>
<p>मोडेलहरू विरलै "पक्कै" भन्छन्। उनीहरू भन्छन् "यो इमेल spam हुने <b>९२% सम्भावना</b>"। सम्भाव्यता 0 देखि 1 बीचको संख्या हो। मुख्य विचार: औसत (mean), फैलावट (standard deviation), र घण्टी आकारको <b>normal distribution</b>।</p>
<h2>4️⃣ तथ्याङ्क — mean, variance, correlation</h2>
<ul><li><b>Mean</b>: औसत। <b>Median</b>: बीचको मान (outlier ले कम प्रभावित)।</li>
<li><b>Variance / Std</b>: मानहरू कति फैलिएका छन्।</li>
<li><b>Correlation</b> (−1 देखि +1): दुई feature सँगै चल्छन्?</li></ul>
<div data-code="0"></div>
<div data-code="1"></div>
<div class="box key"><b class="t">सम्झनुपर्ने कुरा</b>डाटा = vector/matrix। अनुमान = weighted जोड। सिकाइ = error घटाउन भिरालो (derivative) पछ्याउँदै तल जाने। आउटपुट = सम्भाव्यता।</div>
`},
  code: [
    { title: { en: 'Dot product & derivative', ne: 'Dot product र derivative' }, code: py`
import numpy as np

house = np.array([1200, 3, 10])         # area, rooms, age
weights = np.array([0.1, 5.0, -1.0])    # importance of each feature
bias = 20
print("Predicted price =", house @ weights + bias, "lakh")

# Numerical derivative: slope = (f(x+h) - f(x)) / h
f = lambda x: x ** 2
for x in [-2, 0, 3]:
    h = 1e-5
    slope = (f(x + h) - f(x)) / h
    print(f"x={x:>2}: slope = {slope:.2f}  (exact 2x = {2*x})")
` },
    { title: { en: 'Statistics & normal distribution', ne: 'तथ्याङ्क र normal distribution' }, code: py`
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
heights = rng.normal(loc=165, scale=7, size=2000)
weights = heights * 0.9 - 85 + rng.normal(0, 5, 2000)

print("Mean height:", heights.mean().round(1), "| Std:", heights.std().round(1))
print("Correlation(height, weight):", np.corrcoef(heights, weights)[0, 1].round(2))
print("P(height > 175) ≈", (heights > 175).mean().round(3))

fig, ax = plt.subplots(1, 2, figsize=(10, 3.5))
ax[0].hist(heights, bins=40, color="tab:blue"); ax[0].set_title("Normal distribution")
ax[1].scatter(heights, weights, s=4, alpha=.4); ax[1].set_title("Positive correlation")
plt.show()
` },
  ],
  quiz: [
    { q: { en: 'The derivative tells us…', ne: 'Derivative ले बताउँछ…' },
      options: { en: ['the slope — how fast a function changes', 'the average of data', 'the number of rows', 'the colour of a plot'], ne: ['भिरालोपन — फङ्सन कति छिटो बदलिन्छ', 'डाटाको औसत', 'row को संख्या', 'ग्राफको रङ'] }, answer: 0,
      explain: { en: 'Models use slopes to know which way to adjust their weights.', ne: 'मोडेलले weight कतातिर मिलाउने भनेर थाहा पाउन भिरालोपन प्रयोग गर्छ।' } },
    { q: { en: 'A correlation of −0.9 means…', ne: '−0.9 को correlation को अर्थ…' },
      options: { en: ['strong: when one goes up, the other goes down', 'no relationship', 'weak positive relation', 'an error'], ne: ['बलियो: एउटा बढ्दा अर्को घट्छ', 'कुनै सम्बन्ध छैन', 'कमजोर सकारात्मक सम्बन्ध', 'error'] }, answer: 0,
      explain: { en: 'Close to −1 = strong negative relationship.', ne: '−1 नजिक = बलियो नकारात्मक सम्बन्ध।' } },
    { q: { en: 'w · x + b is called…', ne: 'w · x + b लाई के भनिन्छ?' },
      options: { en: ['a weighted sum (dot product plus bias)', 'a histogram', 'a dataset', 'a loop'], ne: ['weighted जोड (dot product + bias)', 'histogram', 'डाटासेट', 'लूप'] }, answer: 0,
      explain: { en: 'This weighted sum is the core of linear models and neurons.', ne: 'यो weighted जोड linear मोडेल र न्युरोनको मूल हो।' } },
  ]
}
);

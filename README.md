# 🧠 ML Sikshya — Learn Machine Learning (English + नेपाली)

A free, bilingual (English / Nepali) platform to learn **Machine Learning from zero to professional** — with simple explanations, real theory, quizzes, and **live Python code that runs right in your browser**.

## ✨ Features

- **28 lessons in 6 levels** — Foundations → Supervised → Unsupervised → ML in Practice → Deep Learning → Professional
- Every lesson: simple analogy → how it works (with formulas) → where it's used → editable code → quiz
- **Live Python in the browser** (via [Pyodide](https://pyodide.org)) with NumPy, Pandas, Matplotlib and scikit-learn — no installation needed
- **9 hands-on projects**: Iris classifier, exam-marks predictor, SMS spam detector, cancer diagnosis, customer segmentation, Nepal house prices, digit recognizer, movie recommender, and a capstone where you build your own deep-learning library
- **Bilingual glossary** of 37 key ML terms
- **EN / नेपाली** switch, dark mode, and progress tracking saved in your browser

## 🚀 Run it

Open `index.html` in a browser, or serve the folder locally:

```bash
python -m http.server 8765
# then open http://localhost:8765
```

The first time you press **▶ Run**, Python loads in the browser (10–30 seconds, needs internet).

## 🤖 Use WANG AI as the tutor's brain

The AI Teacher can answer through your own **WANG AI** server instead of a
cloud account. The AI key stays on the server, so students don't need a key
or a Puter account, and the teacher knows which lesson the student is on and
the code they last ran.

1. Start the WANG AI backend on your computer. Follow the steps in the
   [WANG AI README](https://github.com/wangdencerpa12345-star/Doing-something-new/tree/claude/zealous-hypatia-9zr2yv#readme)
   (add your AI key to `backend/.env`, then run `uvicorn app.main:app`).
2. Open ML Sikshya, click **AI Teacher**, then **⚙️**.
3. Under **AI brain** choose **🤖 WANG AI**. Leave the address as
   `http://localhost:8000` and click **Test connection**. You should see
   **✓ Connected**.
4. Click **Save** and ask a question.

Use the local copy (`Start ML Sikshya.bat`) or the online site. If Chrome
asks to let the site access devices on your local network, click **Allow**:
that is how the page reaches the server on your computer.

## 🗂️ Structure

```
index.html          page shell
style.css           design (light & dark themes)
app.js              routing, language switch, Python runner, quizzes, progress
content/            lessons (01–06), projects and glossary
```

## 🛠️ Built with

Plain HTML, CSS and JavaScript · Pyodide · scikit-learn · NumPy · Pandas · Matplotlib

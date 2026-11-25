# 🧠 ML Tutor — Learn Machine Learning (English + नेपाली)

Created by **Wangden Sherpa**, Master of Business Analytics (MBAN) student at Saint Mary's University.

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

## 📹 AI Tutor: Emma & Nora (Nuance Labs)

The AI Tutor is **Emma and Nora**, real-time, full-duplex video AI personas made by
[Nuance Labs](https://www.nuancelabs.ai). The **📹 Emma & Nora** button (and every "Ask the tutor"
button) opens a panel that sends the student to Nuance's own free site, `app.nuancelabs.ai`, in a new
tab. Emma and Nora can't be embedded or used through Nuance's API, so they don't see the lesson or code;
when a button had a question ready, the panel shows it so the student can say it or copy it.

Nuance's rules (shown in the panel): **adults 18+ only**, **English only**, and available only in the
US (not Colorado, Connecticut, Illinois or Texas), the EU, the UK and Canada (not Quebec).

## 🗂️ Structure

```
index.html          page shell
style.css           design (light & dark themes)
app.js              routing, language switch, Python runner, quizzes, progress
content/            lessons (01–06), projects and glossary
```

## 🛠️ Built with

Plain HTML, CSS and JavaScript · Pyodide · scikit-learn · NumPy · Pandas · Matplotlib

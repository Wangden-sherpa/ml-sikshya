# 🧠 ML Sikshya — Learn Machine Learning (English + नेपाली)

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

## 🎥 Live AI video tutor (owner only, Nuance Live)

A real-time video teacher (an AI persona from [Nuance Labs](https://docs.nuancelabs.ai)) that talks with
the student face to face. During a class it can see the current lesson and the student's latest code run,
read and open lessons, look up glossary terms, and put runnable code examples on the screen (the student
presses ▶ Run; the teacher never runs code itself). Students can talk, interrupt, type, press **Stop**,
or press **Give me a minute** to keep the teacher quiet while they read.

It only runs on the owner's computer, because it needs your Nuance API key:

1. Create an API key on [platform.nuancelabs.ai](https://platform.nuancelabs.ai) and accept the developer
   agreement there.
2. Save the key (it starts with `nk_`) in `%USERPROFILE%\.ml-sikshya\nuance_key.txt` on Windows, or
   `~/.ml-sikshya/nuance_key.txt` on Mac/Linux. **Never** put it in this project, on GitHub or in a chat.
3. Double-click `tools\start-live-tutor.bat` and keep its window open.
4. In ML Sikshya: **AI Teacher → ⚙️ → "This is my computer — show the live tutor"**, then press
   **🎥 Live AI video tutor**.

Good to know: the Nuance persona speaks and understands **English only**. With the camera on, a student
under 18 needs an adult next to them, or Nuance ends the class. Each class uses Nuance credits.

## 🗂️ Structure

```
index.html          page shell
style.css           design (light & dark themes)
app.js              routing, language switch, Python runner, quizzes, progress
content/            lessons (01–06), projects and glossary
```

## 🛠️ Built with

Plain HTML, CSS and JavaScript · Pyodide · scikit-learn · NumPy · Pandas · Matplotlib

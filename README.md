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

## 🧑‍🏫 AI teachers: Asha & Kiran (free, for every student)

Two original AI teachers, drawn in code (no photos), live on every page: **Asha** (calm and patient)
and **Kiran** (energetic and fun). They:

- know the **whole course**: every lesson's text, code examples and quiz, all projects (goal, steps,
  challenges, starter code) and the glossary, searched in English, Nepali and Chinese;
- see the lesson the student is on, their latest code run and error, and guide them step by step,
  quiz them with the lesson's own questions, and give project hints instead of full solutions;
- chat by text, by voice, or in a **face-to-face call** docked beside the page, so the lesson stays in view;
- answer in **English, नेपाली or 中文**, and speak English with a **natural voice** (Kokoro) that runs in
  the browser for free, downloaded once (about 92 MB; not by default on phones). Nepali and Chinese use the
  browser's voices. The lips move with the real speech.

**How they hear you** (`hearing.js`, free, on the student's device, any modern browser): the microphone
uses the browser's noise suppression and echo cancellation plus a voice-band filter; **Silero VAD** starts
a recording only when someone is really speaking (room noise is ignored), keeps 400 ms before the first
word and waits for a short pause at the end; then **Whisper** (Base about 80 MB, or Small about 250 MB for
better Nepali) turns the speech into text. Known Whisper "phantom" phrases are dropped, and the teachers
are told to work out small mishearings and ignore background chatter. Phones default to the browser's
own recogniser; it can be switched in ⚙️.

They use the free AI brain by default; Claude, ChatGPT, an on-device model or WANG AI can be chosen in ⚙️.

**Emma & Nora** (Nuance Labs) are linked from the home page. They run only on Nuance's own site
(`app.nuancelabs.ai`), which can't be embedded, so they don't know the course. Nuance's rules: adults 18+,
English only, US (not CO, CT, IL, TX), EU, UK and Canada (not Quebec).

## 🎥 Live AI video tutor in the page (owner only, Nuance API)

A real-time video teacher (Sam, Sonia or Mira, Nuance's API personas) that teaches **inside ML Tutor**.
Through its tools it knows every lesson (text, code examples and quiz), all 9 projects (goal, steps,
challenges, starter code) and the glossary; it can search the course, see the student's lesson and latest
code run, open lessons and projects, and put runnable examples on screen. It guides step by step, quizzes
the student, and gives project hints instead of full solutions.

It only runs on the owner's computer, because it needs your Nuance API key:

1. Create an API key on [platform.nuancelabs.ai](https://platform.nuancelabs.ai) and accept the developer
   agreement there.
2. Save the key (it starts with `nk_`) in `%USERPROFILE%\.ml-sikshya\nuance_key.txt` on Windows, or
   `~/.ml-sikshya/nuance_key.txt` on Mac/Linux. **Never** put it in this project, on GitHub or in a chat.
3. Double-click `tools\start-live-tutor.bat` and keep its window open.
4. In ML Tutor open the AI teacher's **⚙️ settings**, tick **"This is my computer — show the live
   tutor"**, then press **🎥 Live AI video tutor** (on the home page or in the teacher's panel). The class
   opens docked beside the page.

Good to know: the personas speak and understand **English only** (Nuance refuses other languages), Nuance's
API is for adults 18+, and each class uses your Nuance credits.

## 🗂️ Structure

```
index.html          page shell
style.css           design (light & dark themes)
app.js              routing, language switch, Python runner, quizzes, progress
content/            lessons (01–06), projects and glossary
```

## 🛠️ Built with

Plain HTML, CSS and JavaScript · Pyodide · scikit-learn · NumPy · Pandas · Matplotlib

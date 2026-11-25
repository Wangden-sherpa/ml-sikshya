/* ML Tutor — AI Tutor: Emma & Nora, the live video AI personas from Nuance Labs.
   They run only on Nuance Labs' own site (no embed or API for them), so this opens that site in a new tab.
   Nuance's terms: adults 18+, English only, available in the US (some states excluded), EU, UK and Canada.
   MLS.openTutor(question?) keeps working for every "Ask the tutor" button: the question is shown, ready to copy or say. */
(() => {
  const MLS = window.MLS;
  const { u, h, esc, toast } = MLS;
  const NUANCE_URL = 'https://app.nuancelabs.ai/';

  Object.assign(MLS.UI, {
    enTitle: { en: 'Talk to Emma or Nora', ne: 'Emma वा Nora सँग कुरा गर्नुहोस्', zh: '和 Emma 或 Nora 对话' },
    enSub: { en: 'Live, face-to-face video chat with real-time AI teachers from Nuance Labs. They listen, react and answer while you talk — just like a real conversation.', ne: 'Nuance Labs का real-time AI शिक्षकहरूसँग आमने-सामने भिडियो कुराकानी। तपाईं बोल्दै गर्दा उनीहरू सुन्छन्, प्रतिक्रिया दिन्छन् र जवाफ दिन्छन् — साँच्चैको कुराकानी जस्तै।', zh: '与 Nuance Labs 的实时 AI 老师面对面视频聊天。你说话时，她们会倾听、回应和回答——就像真正的对话一样。' },
    enStart: { en: '📹 Start video chat', ne: '📹 भिडियो कुराकानी सुरु गर्नुहोस्', zh: '📹 开始视频聊天' },
    enEmma: { en: 'Emma', ne: 'Emma', zh: 'Emma' },
    enNora: { en: 'Nora', ne: 'Nora', zh: 'Nora' },
    enPick: { en: 'Choose Emma or Nora on the next page.', ne: 'अर्को पेजमा Emma वा Nora छान्नुहोस्।', zh: '在下一页选择 Emma 或 Nora。' },
    enRules: { en: 'By Nuance Labs · free, no account · adults 18+ only · English only · available in the US (not CO, CT, IL, TX), EU, UK and Canada (not Quebec). Needs your camera and microphone.', ne: 'Nuance Labs द्वारा · निःशुल्क, खाता चाहिँदैन · १८+ वयस्कका लागि मात्र · अंग्रेजी मात्र · अमेरिका (CO, CT, IL, TX बाहेक), EU, UK र क्यानडा (क्युबेक बाहेक) मा उपलब्ध। क्यामेरा र माइक चाहिन्छ।', zh: '由 Nuance Labs 提供 · 免费，无需账户 · 仅限 18 岁以上成人 · 仅支持英语 · 可在美国（科罗拉多、康涅狄格、伊利诺伊、得克萨斯除外）、欧盟、英国和加拿大（魁北克除外）使用。需要摄像头和麦克风。' },
    enPrivacy: { en: 'Opens Nuance Labs\' website in a new tab. ML Tutor does not send them your lessons, code or progress.', ne: 'नयाँ ट्याबमा Nuance Labs को वेबसाइट खुल्छ। ML Tutor ले तपाईंको पाठ, कोड वा प्रगति उनीहरूलाई पठाउँदैन।', zh: '会在新标签页打开 Nuance Labs 网站。ML Tutor 不会把你的课程、代码或进度发送给他们。' },
    enQ: { en: 'Your question — say it to Emma or Nora:', ne: 'तपाईंको प्रश्न — Emma वा Nora लाई भन्नुहोस्:', zh: '你的问题——对 Emma 或 Nora 说出来：' },
    enCopy: { en: '📋 Copy', ne: '📋 कपी', zh: '📋 复制' },
    enCopied: { en: 'Copied', ne: 'कपी भयो', zh: '已复制' },
    enClose: { en: 'Close', ne: 'बन्द', zh: '关闭' },
    enFab: { en: 'Emma & Nora', ne: 'Emma र Nora', zh: 'Emma 和 Nora' },
  });

  let panel = null, fab = null;
  const open = () => window.open(NUANCE_URL, '_blank', 'noopener');

  function persona(cls, name) {
    return `<div class="en-persona ${cls}"><div class="en-face">${name[0]}</div><b>${name}</b><span class="en-live">● Live</span></div>`;
  }

  function build() {
    if (panel) return;
    panel = h(`<div class="en-overlay" hidden><div class="en-panel" role="dialog" aria-modal="true" aria-labelledby="en-title">
      <button class="en-x" aria-label="${u('enClose')}">✕</button>
      <h2 id="en-title">${u('enTitle')}</h2><p class="muted">${u('enSub')}</p>
      <div class="en-people">${persona('emma', u('enEmma'))}${persona('nora', u('enNora'))}</div>
      <div class="en-q" hidden><div class="small">${u('enQ')}</div><div class="en-qrow"><div class="en-qtext"></div><button class="btn ghost en-copy">${u('enCopy')}</button></div></div>
      <button class="btn en-go">${u('enStart')}</button>
      <p class="small muted en-pick">${u('enPick')}</p>
      <p class="small en-rules">ℹ️ ${u('enRules')}</p>
      <p class="small muted">${u('enPrivacy')}</p>
    </div></div>`);
    panel.querySelector('.en-x').onclick = close;
    panel.onclick = (e) => { if (e.target === panel) close(); };
    panel.querySelector('.en-go').onclick = () => { open(); close(); };
    panel.querySelectorAll('.en-persona').forEach((p) => (p.onclick = () => { open(); close(); }));
    panel.querySelector('.en-copy').onclick = () => {
      const txt = panel.querySelector('.en-qtext').textContent;
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(u('enCopied'))).catch(() => {});
    };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });

    fab = h(`<button class="tutor-fab en-fab" title="${u('enTitle')}"><span class="fab-ic">📹</span><span class="fab-tx">${u('enFab')}</span></button>`);
    fab.onclick = () => (panel.hidden ? openTutor() : close());
    document.body.append(fab, panel);
  }

  function openTutor(question) {
    if (!panel) build();
    const q = panel.querySelector('.en-q');
    q.hidden = !question;
    panel.querySelector('.en-qtext').innerHTML = question ? esc(question) : '';
    panel.hidden = false; fab.classList.add('open');
    panel.querySelector('.en-go').focus();
  }
  function close() { panel.hidden = true; fab.classList.remove('open'); }

  MLS.openTutor = openTutor;
  MLS.openCall = openTutor;
  MLS.closeTutorPanel = () => { if (panel && !panel.hidden) close(); };

  // Show the floating button on every page.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

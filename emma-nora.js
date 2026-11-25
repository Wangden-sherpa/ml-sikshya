/* ML Tutor — "Talk to Emma or Nora": a link to the live video AI personas from Nuance Labs.
   They run only on Nuance Labs' own site (no embed or API for them), so this opens that site in a new tab.
   Nuance's terms: adults 18+, English only, available in the US (some states excluded), EU, UK and Canada.
   The site's own AI teachers (ai-tutor.js) are the main tutor; this panel is opened with MLS.openEmmaNora(). */
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
    enLiveHere: { en: 'Or learn right here on this page with a live AI video teacher (Sam, Sonia or Mira). They know every ML Tutor lesson, project and glossary term, can see your code, and guide you step by step. English only.', ne: 'वा यही पेजमा प्रत्यक्ष AI भिडियो शिक्षक (Sam, Sonia वा Mira) सँग सिक्नुहोस्। उनीहरूलाई ML Tutor का सबै पाठ, प्रोजेक्ट र शब्दावली थाहा छ, तपाईंको कोड हेर्न सक्छन् र चरणबद्ध रूपमा सिकाउँछन्। अङ्ग्रेजी मात्र।', zh: '或者就在本页面和 AI 实时视频老师（Sam、Sonia 或 Mira）一起学习。他们了解 ML Tutor 的所有课程、项目和术语，能看到你的代码，并一步步指导你。仅限英语。' },
    enFab: { en: 'Emma & Nora', ne: 'Emma र Nora', zh: 'Emma 和 Nora' },
  });

  let panel = null;
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
      <div class="en-livebox"></div>
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

    document.body.append(panel);
  }

  function drawLive() {   // the in-page live tutor (live-tutor.js): only on the owner's computer, where the key server runs
    const box = panel.querySelector('.en-livebox');
    if (!MLS.openLive) { box.innerHTML = ''; return; }
    const on = MLS.liveEnabled && MLS.liveEnabled();
    box.innerHTML = `${on ? `<div class="en-livehere"><p class="small">${u('enLiveHere')}</p><button class="btn en-live-go">${u('liveBtn')}</button></div>` : ''}
      <details class="en-owner small"><summary>🎥 ${u('liveOwner')}</summary><p class="muted">${u('liveOwnerHelp')}</p>
        <label class="chk"><input type="checkbox" class="en-owner-on" ${on ? 'checked' : ''}> ${u('liveOwnerOn')}</label></details>`;
    const go = box.querySelector('.en-live-go'); if (go) go.onclick = () => { close(); MLS.openLive(); };
    box.querySelector('.en-owner-on').onchange = (e) => { MLS.store.set('live-owner', e.target.checked); drawLive(); if (MLS.route === 'home' || !MLS.route) MLS.render && MLS.render(); };
  }

  function openTutor(question) {
    if (!panel) build();
    drawLive();
    const q = panel.querySelector('.en-q');
    q.hidden = !question;
    panel.querySelector('.en-qtext').innerHTML = question ? esc(question) : '';
    panel.hidden = false;
    panel.querySelector('.en-go').focus();
  }
  function close() { panel.hidden = true; }

  MLS.openEmmaNora = openTutor;
})();

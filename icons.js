/* ML Tutor — SVG icons (Lucide-style) instead of emoji in the navigation (UI UX Pro Max checklist: "No emojis as icons"). */
(() => {
  const MLS = window.MLS;
  const P = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6L4.6 18.5A2 2 0 0 0 6.3 21.5h11.4a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7 15h10"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    cube: '<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>',
    chart: '<path d="M3 3v18h18"/><path d="M8 17V11"/><path d="M13 17V7"/><path d="M18 17v-4"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 3.6 11.5 8.5 8.5 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1a1.6 1.6 0 0 1 1.6-1.6H16c3 0 5.6-2.5 5.6-5.6C21.6 6 17.3 2 12 2z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  };
  const svg = (k) => `<svg class="nav-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[k]}</svg>`;
  const SIDE = { '#/': 'home', '#/projects': 'flask', '#/playground': 'code', '#/glossary': 'book', '#/realworld': 'globe', '#/lab3d': 'cube', '#/datalab': 'chart' };
  const stripEmoji = (el) => { const n = el.firstChild; if (n && n.nodeType === 3) n.textContent = n.textContent.replace(/^\s*[\p{Extended_Pictographic}️‍]+\s*/u, ''); };
  function iconize() {
    document.querySelectorAll('.side-links a').forEach((a) => {
      if (a.querySelector('.nav-ic')) return;
      const k = a.classList.contains('open-tutor') ? 'chat' : SIDE[a.getAttribute('href')];
      if (!k) return;
      stripEmoji(a); a.insertAdjacentHTML('afterbegin', svg(k));
    });
    const set = (sel, k, label) => { const b = document.querySelector(sel); if (b && (b.dataset.ic !== k || !b.querySelector('.nav-ic'))) { b.dataset.ic = k; b.innerHTML = svg(k); if (label) b.setAttribute('aria-label', label); } };
    set('#menuBtn', 'menu', 'Menu');
    set('.cz-btn', 'palette');
    set('.topbar .icon-btn[aria-label="Search"]', 'search', 'Search');
    const ml = document.querySelector('.ml-btn'); if (ml && !ml.querySelector('.nav-ic')) { const sm = ml.querySelector('small'); ml.innerHTML = svg('globe') + (sm ? sm.outerHTML : ''); }
    set('#themeBtn', document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon', 'Dark mode');
  }
  MLS.hooks.afterRender.push(() => setTimeout(iconize));
  new MutationObserver(() => setTimeout(iconize)).observe(document.querySelector('.topbar'), { childList: true, subtree: true });
  new MutationObserver(() => setTimeout(iconize)).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();

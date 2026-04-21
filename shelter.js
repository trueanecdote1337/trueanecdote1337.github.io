
(function() {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  const CLASSES = ['g1', 'g2', 'g3'];

  function scheduleGlitch() {
    // random gap 4–12 seconds between glitch bursts
    const gap = 4000 + Math.random() * 8000;
    setTimeout(runGlitch, gap);
  }

  function runGlitch() {
    // 2–4 flickers per burst
    const flickers = 2 + Math.floor(Math.random() * 3);
    let i = 0;

    function flicker() {
      if (i >= flickers * 2) {
        logo.classList.remove(...CLASSES);
        scheduleGlitch();
        return;
      }
      if (i % 2 === 0) {
        const cls = CLASSES[Math.floor(Math.random() * CLASSES.length)];
        logo.classList.add(cls);
      } else {
        logo.classList.remove(...CLASSES);
      }
      i++;
      setTimeout(flicker, 40 + Math.random() * 80);
    }
    flicker();
  }

  scheduleGlitch();
})();

/* ── uptime counter ──────────────────────────────────
   Shows a fake "session uptime" ticking up from 00:00:00
─────────────────────────────────────────────────────── */
(function() {
  const el = document.getElementById('uptime');
  if (!el) return;

  let s = 0;
  function pad(n) { return String(n).padStart(2, '0'); }

  setInterval(function() {
    s++;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    el.textContent = '> session uptime: ' + pad(h) + ':' + pad(m) + ':' + pad(sec);
  }, 1000);
})();

/* ── prompt typewriter ───────────────────────────────
   Types out the prompt text on page load
─────────────────────────────────────────────────────── */
(function() {
  const el = document.querySelector('.prompt');
  if (!el) return;

  // store original, strip cursor span
  const cursor = el.querySelector('.cursor');
  const full = el.textContent.trim();
  el.textContent = '';
  if (cursor) el.appendChild(cursor);

  let i = 0;
  const node = document.createTextNode('');
  el.insertBefore(node, cursor);

  const iv = setInterval(function() {
    if (i >= full.length) { clearInterval(iv); return; }
    node.textContent += full[i];
    i++;
  }, 28);
})();

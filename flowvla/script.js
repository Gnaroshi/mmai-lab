(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const videos = $$('.loop-video');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let motion = !reduced.matches, motionChosen = false, syncToken = 0, syncLoading = false;
  const state = new WeakMap(videos.map(v => [v, { inView: false, manualPause: false, manualPlay: false }]));
  const sync = videos.filter(v => v.dataset.sync === 'aggregation');
  const motionButton = $('#toggle-motion');
  const dialog = $('#video-dialog'), expanded = $('#expanded-video');
  let opener = null;
  const available = v => !v.closest('[hidden]') && !document.hidden && !dialog?.open;
  const inView = v => available(v) && state.get(v).inView;
  const syncAllowed = () => (motion || sync.every(v => state.get(v).manualPlay)) && sync.some(inView) && !sync.some(v => state.get(v).manualPause);
  const label = v => {
    const b = $('.clip-toggle', v.closest('.media-shell'));
    if (b) { b.textContent = v.paused ? 'Play' : 'Pause'; b.setAttribute('aria-label', `${v.paused ? 'Play' : 'Pause'} ${v.closest('.media-shell').dataset.title || 'video'}`); b.setAttribute('aria-pressed', String(!v.paused)); }
  };
  const play = v => { if (available(v)) { v.muted = true; v.play().catch(() => label(v)); } };
  const pauseSync = () => { syncToken++; syncLoading = false; sync.forEach(v => v.pause()); };
  const ready = v => new Promise((resolve, reject) => {
    if (v.readyState >= 3) return resolve();
    let timer;
    const done = error => { clearTimeout(timer); v.removeEventListener('canplay', ok); v.removeEventListener('error', fail); error ? reject(error) : resolve(); };
    const ok = () => done(), fail = () => done(new Error('Video unavailable'));
    v.addEventListener('canplay', ok); v.addEventListener('error', fail);
    timer = setTimeout(() => done(new Error('Loading timed out')), 30000);
    if (v.readyState === 0 && v.networkState !== 2) v.load();
  });
  const syncButtons = text => $$('[data-replay="aggregation"]').forEach(b => { b.textContent = text; b.setAttribute('aria-busy', String(text === 'Loading…')); });
  async function playSync(restart = false, manual = false) {
    if (!sync.length || syncLoading || (!manual && !syncAllowed())) return;
    const token = ++syncToken; syncLoading = true; syncButtons('Loading…');
    if (manual) sync.forEach(v => { state.get(v).manualPause = false; state.get(v).manualPlay = true; });
    try {
      await Promise.all(sync.map(ready));
      if (token !== syncToken || !sync.every(available) || (!manual && !syncAllowed())) return;
      const time = restart ? 0 : sync[0].currentTime;
      sync.forEach(v => { v.currentTime = time; v.muted = true; });
      await Promise.all(sync.map(v => v.play()));
      syncButtons('Replay together');
    } catch (_) { if (token === syncToken) { sync.forEach(v => v.pause()); syncButtons('Retry playback'); } }
    finally { if (token === syncToken) syncLoading = false; }
  }
  const updateMotion = () => {
    if (motionButton) { motionButton.textContent = motion ? 'Pause videos' : 'Play videos'; motionButton.setAttribute('aria-pressed', String(!motion)); }
  };
  function refresh() {
    videos.filter(v => !sync.includes(v)).forEach(v => {
      if ((motion || state.get(v).manualPlay) && inView(v) && !state.get(v).manualPause) play(v); else v.pause();
    });
    if (syncAllowed()) { if (sync.every(v => v.paused)) playSync(); }
    else { pauseSync(); syncButtons('Replay together'); }
  }
  videos.forEach(v => {
    v.muted = true; v.defaultMuted = true; v.playsInline = true;
    const shell = v.closest('.media-shell'), toggle = shell && $('.clip-toggle', shell);
    if (toggle) {
      v.controls = false; toggle.hidden = false;
      toggle.addEventListener('click', () => {
        if (sync.includes(v)) {
          if (!v.paused || syncLoading) { sync.forEach(x => state.get(x).manualPause = true); pauseSync(); syncButtons('Replay together'); }
          else playSync(false, true);
        } else { state.get(v).manualPause = !v.paused; state.get(v).manualPlay = v.paused; v.paused ? play(v) : v.pause(); }
      });
    }
    v.addEventListener('play', () => label(v)); v.addEventListener('pause', () => label(v)); label(v);
    const expand = shell && $('.clip-expand', shell);
    if (expand && dialog && expanded) {
      expand.hidden = false;
      expand.addEventListener('click', () => {
        opener = expand; const position = v.currentTime;
        $('#dialog-title').textContent = shell.dataset.title || 'Video';
        expanded.src = v.currentSrc || $('source', v)?.getAttribute('src') || v.getAttribute('src');
        expanded.muted = true; expanded.controls = true; expanded.playsInline = true;
        expanded.onloadedmetadata = () => { expanded.currentTime = Math.min(position, expanded.duration || position); expanded.play().catch(() => {}); };
        dialog.showModal(); pauseSync(); videos.forEach(x => x.pause());
      });
    }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => state.get(e.target).inView = e.isIntersecting && e.intersectionRatio > 0);
      refresh();
    }, { threshold: [0, 0.05] });
    videos.forEach(v => observer.observe(v));
  } else {
    videos.forEach(v => { v.controls = true; const b = $('.clip-toggle', v.closest('.media-shell')); if (b) b.hidden = true; });
  }
  $$('.media-gallery[data-gallery]').forEach(gallery => {
    const choices = $$('[data-choice]', gallery), panels = $$('[data-panel]', gallery);
    const select = choice => {
      choices.forEach(b => { const selected = b === choice; b.setAttribute('aria-pressed', String(selected)); b.classList.toggle('is-active', selected); });
      panels.forEach(p => { p.hidden = p.dataset.panel !== choice.dataset.choice; if (p.hidden) $$('video', p).forEach(v => v.pause()); });
      refresh();
    };
    choices.forEach(b => b.addEventListener('click', () => select(b)));
    if (choices[0]) select(choices.find(b => b.getAttribute('aria-pressed') === 'true') || choices[0]);
  });
  $$('.replay-group').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      if (button.dataset.replay === 'aggregation') { await playSync(true, true); return; }
      const group = $$('video', button.closest('[data-panel]') || button.closest('.media-gallery') || button.parentElement);
      const text = button.textContent; button.textContent = 'Loading…'; button.setAttribute('aria-busy', 'true');
      try {
        await Promise.all(group.map(ready));
        if (group.every(available)) { group.forEach(v => { if (state.has(v)) { state.get(v).manualPause = false; state.get(v).manualPlay = true; } v.currentTime = 0; }); await Promise.all(group.map(v => v.play())); }
        button.textContent = text;
      } catch (_) { button.textContent = 'Retry playback'; }
      finally { button.setAttribute('aria-busy', 'false'); }
    });
  });
  let lastSync = 0;
  const correctSync = time => {
    if (time - lastSync > 500 && sync.length && !sync[0].paused && !syncLoading) {
      lastSync = time;
      sync.slice(1).forEach(v => { if (!v.paused && Math.abs(v.currentTime - sync[0].currentTime) > 0.16) v.currentTime = sync[0].currentTime; });
    }
    requestAnimationFrame(correctSync);
  };
  requestAnimationFrame(correctSync);
  motionButton?.addEventListener('click', () => {
    motionChosen = true; motion = !motion;
    videos.forEach(v => { state.get(v).manualPlay = false; if (motion) state.get(v).manualPause = false; });
    updateMotion(); refresh();
  });
  reduced.addEventListener('change', () => { if (!motionChosen) { motion = !reduced.matches; updateMotion(); refresh(); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden) expanded?.pause(); refresh(); });
  $('#close-dialog')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog?.addEventListener('close', () => {
    expanded.pause(); expanded.removeAttribute('src'); expanded.load(); expanded.onloadedmetadata = null;
    opener?.focus({ preventScroll: true }); refresh();
  });
  $('#copy-citation')?.addEventListener('click', async () => {
    const text = $('#bibtex').textContent.trim(), status = $('#copy-status');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Citation copied.'; }
    catch (_) { const selection = getSelection(), range = document.createRange(); range.selectNodeContents($('#bibtex')); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Select and copy the citation below.'; }
  });
  const links = $$('.main-nav a[href^="#"]').filter(a => a.hash.length > 1 && document.getElementById(a.hash.slice(1)));
  const focusHash = () => {
    if (location.hash.length < 2) return;
    let target; try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (_) { return; }
    if (target) { if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  };
  let navQueued = false;
  const updateNav = () => {
    navQueued = false; let current = links[0];
    links.forEach(a => { if ($(a.getAttribute('href')).getBoundingClientRect().top <= Math.min(innerHeight * 0.35, 220)) current = a; });
    links.forEach(a => { if (a === current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
  };
  window.addEventListener('scroll', () => { if (!navQueued) { navQueued = true; requestAnimationFrame(updateNav); } }, { passive: true });
  window.addEventListener('hashchange', () => { focusHash(); updateNav(); });
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', () => setTimeout(focusHash, 0)));
  updateMotion(); updateNav(); if (location.hash) requestAnimationFrame(focusHash);
  document.documentElement.classList.add('js');
})();

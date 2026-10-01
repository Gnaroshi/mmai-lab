(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const videos = [...new Set($$('.media-shell video, #overview-video'))];
  const states = new WeakMap(), membership = new WeakMap();
  const groups = [], dialog = $('#video-dialog'), expanded = $('#expanded-video');
  let opener = null, expandedSource = null;
  const duration = v => Number.isFinite(v.duration) ? v.duration : Number(v.dataset.duration) || 0;
  const format = n => Number.isFinite(n) ? `${Math.floor(Math.max(0, n) / 60)}:${String(Math.floor(Math.max(0, n) % 60)).padStart(2, '0')}` : '--:--';
  const available = v => !$('#figure-dialog')?.open && !v.closest('[hidden]') && !document.hidden && (v === expanded ? dialog?.open : !dialog?.open);
  const node = (tag, className, text) => { const n = document.createElement(tag); n.className = className; if (text) n.textContent = text; return n; };
  const iconPaths = {
    play: '<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    restart: '<path d="M3 10a9 9 0 1 1 2.6 8.4M3 4v6h6"/>',
    expand: '<path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"/>',
    loading: '<circle cx="12" cy="12" r="8" opacity=".2"/><path d="M12 4a8 8 0 0 1 8 8"/>'
  };
  const labelButton = (b, label) => { b.setAttribute('aria-label', label); b.title = label; };
  function buttonState(b, state, label) {
    labelButton(b, label);
    if (b.dataset.state === state) return;
    b.dataset.state = state;
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', `control-icon${state === 'loading' ? ' control-icon--loading' : ''}`);
    icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('width', '20'); icon.setAttribute('height', '20');
    icon.setAttribute('fill', 'none'); icon.setAttribute('stroke', 'currentColor'); icon.setAttribute('stroke-width', '1.8');
    icon.setAttribute('stroke-linecap', 'round'); icon.setAttribute('stroke-linejoin', 'round');
    icon.setAttribute('aria-hidden', 'true'); icon.setAttribute('focusable', 'false'); icon.innerHTML = iconPaths[state];
    const previous = $('.control-icon', b); if (previous) previous.replaceWith(icon); else b.prepend(icon);
  }
  const button = (cls, state, label, grouped = false) => {
    const b = node('button', `${cls} control-button`); b.type = 'button'; buttonState(b, state, label);
    if (grouped) { const scope = node('span', 'control-scope', 'All'); scope.setAttribute('aria-hidden', 'true'); b.append(scope); }
    return b;
  };
  function toolbar(prefix, title, grouped = false) {
    const bar = node('div', `${prefix}-controls`); bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', `${title} controls`);
    if (grouped) bar.append(node('span', 'group-label', title));
    const scope = grouped ? `all videos in ${title}` : title;
    const play = button(`${prefix}-play`, 'play', `Play ${scope}`, grouped);
    const seek = node('input', `${prefix}-seek`); seek.type = 'range'; seek.min = 0; seek.max = 1000; seek.step = 1; seek.value = 0; seek.setAttribute('aria-label', `Seek ${title}`);
    const time = node('output', `${prefix}-time`, '0:00 / --:--');
    const restart = button(`${prefix}-restart`, 'restart', `Restart ${scope} from the beginning`, grouped);
    const enlarge = grouped ? null : button('player-expand', 'expand', `Enlarge ${title}`);
    const status = node('span', `${prefix}-status`); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    bar.append(play, seek, time, restart); if (enlarge) bar.append(enlarge); bar.append(status);
    return { bar, play, seek, time, restart, enlarge, status };
  }
  const status = (ui, text, loading = false) => { ui.status.textContent = text; ui.status.dataset.loading = String(loading); ui.bar.setAttribute('aria-busy', String(loading)); };
  function updateVideo(v) {
    const s = states.get(v), d = duration(v), playing = !v.paused || s.pending;
    buttonState(s.ui.play, s.pending ? 'loading' : playing ? 'pause' : 'play', `${s.pending ? 'Cancel loading' : playing ? 'Pause' : 'Play'} ${s.title}`);
    if (!s.seeking) s.ui.seek.value = d ? Math.min(1000, v.currentTime / d * 1000) : 0;
    s.ui.time.textContent = `${format(v.currentTime)} / ${d ? format(d) : '--:--'}`;
    s.ui.seek.setAttribute('aria-valuetext', `${format(v.currentTime)} of ${d ? format(d) : 'unknown duration'}`);
  }
  const groupDuration = g => Math.max(0, ...g.videos.map(duration));
  const groupPlaying = g => g.pending || g.videos.some(v => !v.paused);
  function updateGroup(g) {
    const d = groupDuration(g), active = groupPlaying(g);
    if (g.coordinated && g.running) g.time = g.master.currentTime;
    buttonState(g.ui.play, g.pending ? 'loading' : active ? 'pause' : 'play', `${g.pending ? 'Cancel loading' : active ? 'Pause' : 'Play'} all videos in ${g.label}`);
    if (!g.seeking) g.ui.seek.value = d ? Math.min(1000, g.time / d * 1000) : 0;
    g.ui.time.textContent = `${format(g.time)} / ${d ? format(d) : '--:--'}`;
    g.ui.seek.setAttribute('aria-valuetext', `${format(g.time)} of ${d ? format(d) : 'unknown duration'}`);
  }
  function pauseOne(v) { const s = states.get(v); s.token++; s.pending = false; v.pause(); status(s.ui, ''); updateVideo(v); }
  function pauseGroup(g) {
    if (g.running) g.time = g.master.currentTime;
    g.token++; g.pending = false; g.running = false; g.videos.forEach(pauseOne); status(g.ui, ''); updateGroup(g);
  }
  function independent(v) { const g = membership.get(v); if (g?.coordinated || g?.pending) { if (g.running) g.time = g.master.currentTime; g.token++; g.pending = false; g.running = false; g.coordinated = false; status(g.ui, ''); updateGroup(g); } }
  function ready(v, level = 3) {
    if (v.readyState >= level && (level === 1 || !v.seeking)) return Promise.resolve();
    v.preload = level === 1 ? 'metadata' : 'auto';
    return new Promise((resolve, reject) => {
      const event = level === 1 ? 'loadedmetadata' : 'canplay'; let timer;
      const done = error => { clearTimeout(timer); v.removeEventListener(event, ok); v.removeEventListener('seeked', ok); v.removeEventListener('error', fail); error ? reject(error) : resolve(); };
      const ok = () => { if (v.readyState >= level && (level === 1 || !v.seeking)) done(); }, fail = () => done(new Error('Video unavailable'));
      v.addEventListener(event, ok); v.addEventListener('seeked', ok); v.addEventListener('error', fail);
      timer = setTimeout(() => done(new Error('Video loading timed out')), 30000);
      if (v.error || (v.readyState === 0 && v.networkState !== 2)) v.load();
    });
  }
  async function playOne(v, restart = false) {
    independent(v); const s = states.get(v); if (!available(v)) return;
    const token = ++s.token; s.pending = true; status(s.ui, 'Loading video…', true); updateVideo(v);
    try {
      await ready(v); if (token !== s.token || !available(v)) return;
      if (restart || v.ended || v.currentTime >= duration(v) - 0.03) v.currentTime = 0;
      await v.play(); if (token === s.token) status(s.ui, '');
    } catch (_) { if (token === s.token) status(s.ui, 'Unable to play. Press Play to retry.'); }
    finally { if (token === s.token) { s.pending = false; updateVideo(v); } }
  }
  async function seekOne(v, ratio) {
    independent(v); pauseOne(v); const s = states.get(v), token = s.token; status(s.ui, 'Loading video…', true);
    try { await ready(v, 1); if (token !== s.token) return false; v.currentTime = ratio * duration(v); status(s.ui, ''); updateVideo(v); return true; }
    catch (_) { if (token === s.token) status(s.ui, 'Unable to seek. Try again.'); return false; }
  }
  async function playGroup(g, restart = false) {
    pauseGroup(g); const token = g.token; g.pending = true; status(g.ui, 'Loading videos…', true); updateGroup(g);
    try {
      await Promise.all(g.videos.map(v => ready(v, duration(v) > 0 && v.currentTime >= duration(v) - 0.03 ? 1 : 3)));
      if (token !== g.token || !g.videos.every(available)) return;
      const d = groupDuration(g); g.master = g.videos.reduce((a, b) => duration(a) >= duration(b) ? a : b);
      if (restart || !g.coordinated || g.time >= d - 0.03) g.time = 0;
      g.coordinated = true;
      g.videos.forEach(v => { const target = Math.min(g.time, duration(v)); if (Math.abs(v.currentTime - target) > 0.02) v.currentTime = target; });
      await Promise.all(g.videos.map(v => ready(v, duration(v) > 0 && v.currentTime >= duration(v) - 0.03 ? 1 : 3)));
      if (token !== g.token || !g.videos.every(available)) return;
      const active = g.videos.filter(v => g.time < duration(v) - 0.03);
      if (g.sync) {
        await Promise.all(active.map(async v => { await v.play(); if (token === g.token) v.pause(); }));
        if (token !== g.token || !g.videos.every(available)) return;
        active.forEach(v => { if (Math.abs(v.currentTime - g.time) > 0.001) v.currentTime = g.time; });
        await Promise.all(active.map(v => ready(v)));
        if (token !== g.token || !g.videos.every(available)) return;
      }
      await Promise.all(active.map(v => v.play()));
      if (token === g.token) { g.running = true; status(g.ui, ''); }
    } catch (_) { if (token === g.token) { g.videos.forEach(v => v.pause()); status(g.ui, 'Unable to play. Use the play button marked All to retry.'); } }
    finally { if (token === g.token) { g.pending = false; updateGroup(g); } }
  }
  async function seekGroup(g, ratio) {
    pauseGroup(g); const token = g.token; status(g.ui, 'Loading videos…', true);
    try {
      await Promise.all(g.videos.map(v => ready(v, 1))); if (token !== g.token) return false;
      g.time = ratio * groupDuration(g); g.coordinated = true;
      g.videos.forEach(v => { v.currentTime = Math.min(g.time, duration(v)); });
      status(g.ui, ''); updateGroup(g); return true;
    } catch (_) { if (token === g.token) status(g.ui, 'Unable to seek. Try again.'); return false; }
  }
  function wireSeek(ui, state, seek, playing, resume) {
    let resumeAfter = false, task = Promise.resolve(false);
    ui.seek.addEventListener('input', () => { if (!state.seeking) resumeAfter = playing(); state.seeking = true; task = seek(Number(ui.seek.value) / 1000); });
    ui.seek.addEventListener('change', async () => { const current = task, resumeRequested = resumeAfter; const ok = await current; if (current !== task) return; state.seeking = false; if (ok && resumeRequested && Number(ui.seek.value) < 1000) resume(); });
  }
  videos.forEach(v => {
    const shell = v.closest('.media-shell') || v.parentElement, title = shell.dataset.title || v.getAttribute('aria-label') || 'video';
    const ui = toolbar('player', title), s = { ui, title, token: 0, pending: false, seeking: false };
    states.set(v, s); v.controls = false; v.autoplay = false; v.removeAttribute('autoplay'); v.loop = false; v.playsInline = true;
    shell.append(ui.bar);
    ui.play.addEventListener('click', () => { if (!v.paused || s.pending) { independent(v); pauseOne(v); } else playOne(v); });
    ui.restart.addEventListener('click', () => playOne(v, true));
    wireSeek(ui, s, ratio => seekOne(v, ratio), () => !v.paused || s.pending, () => playOne(v));
    ['loadedmetadata', 'durationchange', 'timeupdate', 'play', 'pause', 'ended', 'seeked'].forEach(event => v.addEventListener(event, () => { updateVideo(v); const g = membership.get(v); if (g) updateGroup(g); }));
    v.addEventListener('error', () => { if (s.pending) return; status(ui, 'Unable to load video. Press Play to retry.'); });
    ui.enlarge.hidden = v === expanded || !dialog || !expanded;
    ui.enlarge.addEventListener('click', () => {
      if (!dialog || !expanded) return;
      opener = ui.enlarge; expandedSource = v; groups.forEach(pauseGroup); videos.forEach(pauseOne);
      $('#dialog-title').textContent = title; expanded.muted = v.muted; expanded.volume = v.volume; expanded.loop = false;
      const position = v.currentTime;
      const viewport = v.closest('.video-viewport');
      expanded.closest('.video-viewport').setAttribute('style', viewport?.getAttribute('style') || '');
      expanded.closest('.media-shell').style.setProperty('--expanded-ratio', viewport?.style.getPropertyValue('--video-ratio') || 4/3);
      const expandedState = states.get(expanded);
      expandedState.title = title; expanded.dataset.duration = duration(v); expanded.poster = v.poster;
      expanded.controls = false; expanded.setAttribute('aria-label', title);
      expandedState.ui.bar.setAttribute('aria-label', `${title} controls`);
      expandedState.ui.seek.setAttribute('aria-label', `Seek enlarged ${title}`);
      labelButton(expandedState.ui.restart, `Restart enlarged ${title} from the beginning`);
      updateVideo(expanded);
      expanded.onloadedmetadata = () => { expanded.currentTime = Math.min(position, expanded.duration); };
      expanded.src = v.currentSrc || $('source', v)?.getAttribute('src') || v.getAttribute('src'); expanded.preload = 'auto'; expanded.load(); dialog.showModal();
    });
    updateVideo(v);
  });
  $$('.media-group').forEach(root => {
    const members = $$('video', root).filter(v => states.has(v)); if (!members.length) return;
    const label = root.dataset.groupLabel || 'Videos', ui = toolbar('group', label, true);
    const g = { videos: members, ui, label, token: 0, time: 0, pending: false, running: false, coordinated: false, seeking: false, master: members[0], sync: members.every(v => v.dataset.sync === 'aggregation') };
    groups.push(g); members.forEach(v => membership.set(v, g)); root.prepend(ui.bar);
    ui.play.addEventListener('click', () => groupPlaying(g) ? pauseGroup(g) : playGroup(g)); ui.restart.addEventListener('click', () => playGroup(g, true));
    wireSeek(ui, g, ratio => seekGroup(g, ratio), () => groupPlaying(g), () => playGroup(g)); updateGroup(g);
  });
  $$('.media-gallery[data-gallery]').forEach(gallery => {
    const choices = $$('[data-choice]', gallery), panels = $$('[data-panel]', gallery);
    const select = choice => {
      choices.forEach(b => { const selected = b === choice; b.setAttribute('aria-pressed', String(selected)); b.classList.toggle('is-active', selected); });
      panels.forEach(p => { p.hidden = p.dataset.panel !== choice.dataset.choice; p.inert = p.hidden; p.toggleAttribute('inert', p.hidden); p.setAttribute('aria-hidden', String(p.hidden)); if (p.hidden) { groups.filter(g => p.contains(g.videos[0])).forEach(pauseGroup); $$('video', p).filter(v => states.has(v)).forEach(pauseOne); } });
    };
    const alignHeadings = () => {
      const headings = panels.map(p => $('.task-heading', p)).filter(Boolean);
      gallery.style.removeProperty('--task-heading-height');
      if (headings.length) gallery.style.setProperty('--task-heading-height', `${Math.ceil(Math.max(...headings.map(h => h.scrollHeight)))}px`);
    };
    const resize = new ResizeObserver(alignHeadings); resize.observe(gallery.querySelector('.choices'));
    alignHeadings();
    choices.forEach(b => b.addEventListener('click', () => select(b))); if (choices.length) select(choices.find(b => b.getAttribute('aria-pressed') === 'true') || choices[0]);
  });
  let lastSync = 0;
  const tick = time => {
    if (time - lastSync > 200) {
      lastSync = time; groups.filter(g => g.running).forEach(g => {
        if (g.videos.every(v => v.paused || v.ended)) { g.running = false; updateGroup(g); return; }
        if (g.sync && !g.master.paused) g.videos.filter(v => v !== g.master && !v.paused && !v.seeking).forEach(v => { if (Math.abs(v.currentTime - g.master.currentTime) > 0.1) v.currentTime = g.master.currentTime; });
        updateGroup(g);
      });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { groups.forEach(pauseGroup); videos.forEach(pauseOne); expanded?.pause(); } });
  $('#close-dialog')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog?.addEventListener('close', () => {
    if (expandedSource && expanded.readyState >= 1 && Number.isFinite(expanded.currentTime)) { expandedSource.currentTime = Math.min(expanded.currentTime, duration(expandedSource)); updateVideo(expandedSource); }
    expanded.pause(); expanded.onloadedmetadata = null; expanded.removeAttribute('src'); expanded.load(); opener?.focus({ preventScroll: true }); expandedSource = null;
  });
  $('#copy-citation')?.addEventListener('click', async () => {
    const text = $('#bibtex').textContent.trim(), status = $('#copy-status');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Citation copied.'; }
    catch (_) { const selection = getSelection(), range = document.createRange(); range.selectNodeContents($('#bibtex')); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Select and copy the citation below.'; }
  });
  const navToggle = $('.nav-toggle'), nav = $('.main-nav');
  const closeNav = () => { nav?.classList.remove('is-open'); navToggle?.setAttribute('aria-expanded', 'false'); };
  navToggle?.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); navToggle.setAttribute('aria-expanded', String(open)); });
  $$('.main-nav a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('is-open')) { closeNav(); navToggle.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeNav(); });
  const figureDialog = $('#figure-dialog'), figureViewer = $('.figure-viewer'), figureImage = $('#expanded-figure'), figureZoom = $('#figure-zoom');
  let figureOpener;
  $$('[data-figure-title]').forEach(link => link.addEventListener('click', e => {
    if (!figureDialog || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); figureOpener = link; groups.forEach(pauseGroup); videos.forEach(pauseOne);
    $('#figure-dialog-title').textContent = link.dataset.figureTitle;
    $('#figure-dialog-caption').textContent = link.dataset.figureCaption;
    figureImage.src = link.href; figureImage.alt = link.dataset.figureTitle;
    figureViewer.classList.remove('is-original'); figureZoom.setAttribute('aria-pressed', 'false'); figureZoom.textContent = 'Original size';
    figureDialog.showModal(); figureViewer.scrollLeft = 0; figureViewer.scrollTop = 0;
  }));
  figureZoom?.addEventListener('click', () => { const original = figureViewer.classList.toggle('is-original'); figureZoom.setAttribute('aria-pressed', String(original)); figureZoom.textContent = original ? 'Fit to screen' : 'Original size'; });
  $('#close-figure')?.addEventListener('click', () => figureDialog.close());
  figureDialog?.addEventListener('click', e => { if (e.target === figureDialog) { const r = figureDialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) figureDialog.close(); } });
  figureDialog?.addEventListener('close', () => figureOpener?.focus({ preventScroll: true }));
  const links = $$('.main-nav a[href^="#"]').filter(a => a.hash.length > 1 && document.getElementById(a.hash.slice(1)));
  const focusHash = () => {
    if (location.hash.length < 2) return; let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (_) { return; }
    if (target) { if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  };
  let navQueued = false;
  const updateNav = () => { navQueued = false; let current = links[0]; links.forEach(a => { if ($(a.getAttribute('href')).getBoundingClientRect().top <= Math.min(innerHeight * 0.35, 220)) current = a; }); links.forEach(a => { if (a === current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); };
  window.addEventListener('scroll', () => { if (!navQueued) { navQueued = true; requestAnimationFrame(updateNav); } }, { passive: true });
  window.addEventListener('hashchange', () => { focusHash(); updateNav(); });
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', () => setTimeout(focusHash, 0)));
  updateNav(); if (location.hash) requestAnimationFrame(focusHash); document.documentElement.classList.add('js');
})();

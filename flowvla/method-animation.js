
(function () {
  'use strict';

  /* Geometry, in the pixel space of the 958x519 figure. The overlay scales with
     the image, so any export of the same figure with the same crop lines up. */
  var G = {"W":958,"H":519,"traj":{"red":[[180,58.5],[188,59],[196,59.5],[204,59.5],[212,59],[220,58.5],[228,57.5],[236,57],[244,55.5],[252,54.8],[257.5,55.5],[268,55.5],[276,55.5],[284,55.5],[292,55.5],[300,55],[308,54.5],[316,54.5],[324,54.5],[332,56],[340,57.5],[349,57.5]],"green":[[184,70.5],[192,69],[200,68.5],[208,69.5],[216,71],[224,70.5],[232,65.5],[240,63.5],[248,64],[259.5,66.5],[264,66],[272,64],[280,64.5],[288,66],[296,67.5],[304,65.5],[312,62.5],[320,62.5],[328,62.5],[336,64],[347,68]],"blue":[[179,94.5],[187,95.5],[195,95],[203,91],[211,92.7],[219,94],[227,91],[235,86],[243,85.5],[253,89],[259,89],[267,85.5],[275,87.6],[283,92.5],[291,93],[299,86.6],[307,79.5],[315,80],[323,82],[331,82.5],[341.5,85.5]],"yellow":[[147,110],[239,110.5],[350.5,110.5]]},"ref":{"red":[76,60],"green":[89,71.5],"blue":[85.5,98.5],"yellow":[37,110.5]},"mid":{"red":[257.5,55.5],"green":[259.5,66.5],"blue":[253,89],"yellow":[239,110.5]},"legend":{"green":{"dot":[176.5,165.5],"arrow":[[193,165.5],[249,165.5]]},"blue":{"dot":[176.5,180.5],"arrow":[[193,180.5],[232,180.5]]},"red":{"dot":[176.5,195.5],"arrow":[[193,195.5],[210,195.5]]},"x":[200.5,211]},"rows":{"green":{"y":107.5,"pred":[511,543],"gt":[601,657]},"blue":{"y":127.5,"pred":[512,562],"gt":[601,637]},"red":{"y":147.5,"pred":[512,527],"gt":[601,616]}},"tcp":{"in":{"green":[[740,105.3],[741,105.7],[797,127.5]],"blue":[[740,127.5],[741,127.5],[797,127.5]],"red":[[740,149.7],[741,149.3],[797,127.5]]},"w":{"green":0.3,"blue":0.5,"red":0.1},"dot":{"green":[695.5,107.5],"blue":[695.5,126.5],"red":[695.5,146]},"pred":[[803,127.5],[828,127.5]],"gt":[[889,128],[932,128]]},"supA":[[722.5,373],[722.5,302],[676.5,302],[676.5,230],[548.5,230],[548.5,216]],"supB":[[722.5,373],[722.5,302],[676.5,302],[676.5,230],[816.5,230],[816.5,216]],"loss":[[475,171,145.5,41.5],[744,171,145,41.5]],"bus":[[[324,336.5],[349,336.5],[349,395.5],[369,395.5]],[[324,484.5],[349,484.5],[349,395.5],[369,395.5]]],"enc":[[428,323],[428,395.5],[432,469.5]],"encArrow":[[[482,323],[509,323]],[[483,395.5],[509,395.5]],[[483,469.5],[509,469.5]]],"backbone":[527,295,94,200],"a1":[[621,436],[649,436]],"latent":[[666.5,409.5,21.5,52.5],[712,409.5,21,52.5],[758,409.5,21,52.5]],"a2":[[780,436],[809,436]],"decoder":[826,400,106,77],"a3":[[878.5,397],[878.5,374]],"actions":[[807.5,320,36,15],[860.5,320,36.5,15],[913.5,320,36.5,15]],"veil":[[0,0,958,247],[668,247,62,30],[672,277,9,5],[668,282,62,95]]};

  var NS = 'http://www.w3.org/2000/svg';
  var COLOR = {
    red: '#c33433', green: '#62a852', blue: '#435f9f', yellow: '#f0b400',
    ink: '#111111',
    flow: '#2b6cf6',   /* forward pass */
    sup: '#7b4ae2'     /* training-only supervision */
  };
  /* seconds per stage: recover motion, connect to control, deployment */
  var STAGE = [6.0, 8.0, 6.0];
  var PIPE = 3.2;      /* period of one forward-pass wave */
  var uidSeq = 0;

  function mk(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function dOf(pts) {
    return 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join('L');
  }
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function show(el, a) { el.setAttribute('opacity', a.toFixed(3)); }

  function init(root) {
    var fig = root.querySelector('.method-canvas');
    var glow = fig.querySelector('.method-glow');
    var top = fig.querySelector('.method-top');
    var steps = Array.prototype.slice.call(root.querySelectorAll('.method-stage-button'));
    var toggle = root.querySelector('.method-toggle');
    var uid = 'flowvla-method-' + (uidSeq++) + '-';

    /* soft halo gradients, one per colour */
    var defs = mk('defs', {}, glow);
    Object.keys(COLOR).forEach(function (name) {
      var g = mk('radialGradient', { id: uid + name }, defs);
      mk('stop', { offset: '0', 'stop-color': COLOR[name], 'stop-opacity': '.75' }, g);
      mk('stop', { offset: '.45', 'stop-color': COLOR[name], 'stop-opacity': '.28' }, g);
      mk('stop', { offset: '1', 'stop-color': COLOR[name], 'stop-opacity': '0' }, g);
    });

    /* layers: glow svg multiplies onto the figure, top svg draws crisp marks */
    var veil = mk('g', { opacity: 0 }, top);
    var GG = [], GT = [];
    for (var s = 0; s < 3; s++) {
      GG.push(mk('g', { opacity: 0 }, glow));
      GT.push(mk('g', { opacity: 0 }, top));
    }
    var GP = mk('g', { opacity: 0 }, glow);
    var TP = mk('g', { opacity: 0 }, top);

    var items = [];
    function add(clock, t0, dur, obj, opt) {
      opt = opt || {};
      items.push({ clock: clock, t0: t0, dur: dur, obj: obj, period: opt.period || 0, hold: !!opt.hold, on: false });
    }

    /* --- animated primitives -------------------------------------------- */

    /* a dot that runs along a path with a soft halo and a short tail */
    function comet(lg, lt, pts, color, o) {
      o = o || {};
      var r = o.r || 2.8;
      var tail = mk('path', {
        d: dOf(pts), fill: 'none', stroke: COLOR[color], 'stroke-width': o.w || r * 0.9,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0
      }, lg);
      var halo = mk('circle', { r: r * 3.6, fill: 'url(#' + uid + color + ')', opacity: 0 }, lg);
      var head = mk('circle', {
        r: r, fill: COLOR[color], stroke: o.ring || '#ffffff', 'stroke-width': o.ringW || 0.9, opacity: 0
      }, lt);
      var L = tail.getTotalLength();
      var TL = o.tail || Math.min(L * 0.6, 40);
      tail.setAttribute('stroke-dasharray', TL + ' ' + (L + TL + 4));
      return {
        set: function (p, held) {
          var pos = (o.ease ? ease(p) : p) * L;
          var pt = tail.getPointAtLength(pos);
          var a = held ? 1 : Math.min(1, p / 0.1, (1 - p) / 0.18);
          tail.setAttribute('stroke-dashoffset', (TL - pos).toFixed(2));
          show(tail, a * (held ? 0 : 0.6));
          halo.setAttribute('cx', pt.x); halo.setAttribute('cy', pt.y); show(halo, a);
          head.setAttribute('cx', pt.x); head.setAttribute('cy', pt.y); show(head, a);
        },
        off: function () { show(tail, 0); show(halo, 0); show(head, 0); }
      };
    }

    /* a path that is drawn progressively and stays */
    function reveal(lg, pts, color) {
      var path = mk('path', {
        d: dOf(pts), fill: 'none', stroke: COLOR[color], 'stroke-width': 4.5,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0
      }, lg);
      var L = path.getTotalLength();
      path.setAttribute('stroke-dasharray', L + ' ' + (L + 4));
      return {
        set: function (p) {
          path.setAttribute('stroke-dashoffset', (L * (1 - ease(p))).toFixed(2));
          show(path, 0.42);
        },
        off: function () { show(path, 0); }
      };
    }

    /* an expanding ring */
    function ripple(lt, pt, color, r0, r1) {
      var c = mk('circle', {
        cx: pt[0], cy: pt[1], r: r0, fill: 'none', stroke: COLOR[color], 'stroke-width': 1.6, opacity: 0
      }, lt);
      return {
        set: function (p) {
          var e = 1 - Math.pow(1 - p, 3);
          c.setAttribute('r', (r0 + (r1 - r0) * e).toFixed(2));
          c.setAttribute('stroke-width', (1.8 * (1 - p) + 0.3).toFixed(2));
          show(c, 1 - p);
        },
        off: function () { show(c, 0); }
      };
    }

    /* a tint that swells and fades over a box */
    function pulse(el, strength) {
      return {
        set: function (p) { show(el, strength * (p < 0.25 ? p / 0.25 : 1 - (p - 0.25) / 0.75)); },
        off: function () { show(el, 0); }
      };
    }
    function pulseRect(lg, r, color, strength, rx) {
      return pulse(mk('rect', {
        x: r[0], y: r[1], width: r[2], height: r[3], rx: rx || 2, fill: COLOR[color],
        stroke: COLOR[color], 'stroke-width': 2, opacity: 0
      }, lg), strength);
    }
    function pulseBlob(lg, c, rx, ry, color, strength) {
      return pulse(mk('ellipse', {
        cx: c[0], cy: c[1], rx: rx, ry: ry, fill: 'url(#' + uid + color + ')', opacity: 0
      }, lg), strength);
    }

    /* --- stage 0: recover 3D motion ------------------------------------- */
    var names = ['red', 'green', 'blue', 'yellow'];
    names.forEach(function (k, i) {
      var pts = G.traj[k];
      var end = pts[pts.length - 1];
      add(0, 0.05 + i * 0.1, 0.9, ripple(GT[0], G.ref[k], k, 4, 13));
      add(0, 0.35 + i * 0.1, 0.8, ripple(GT[0], pts[0], k, 4, 12));
      var rv = reveal(GG[0], pts, k);
      var cm = comet(GG[0], GT[0], pts, k, { r: 3.7, ring: '#111111', ringW: 1.1, ease: true, tail: 44 });
      add(0, 0.7, 2.4, {
        set: function (p, held) { rv.set(p); cm.set(p, held); },
        off: function () { rv.off(); cm.off(); }
      }, { hold: true });
      add(0, 0.7 + 2.4 * 0.47, 0.8, ripple(GT[0], G.mid[k], k, 4, 12));
      add(0, 3.05, 0.9, ripple(GT[0], end, k, 4, 14));
    });
    ['green', 'blue', 'red'].forEach(function (k, i) {
      var lg = G.legend[k];
      var len = lg.arrow[1][0] - lg.arrow[0][0];
      add(0, 3.3 + i * 0.16, 0.8, ripple(GT[0], lg.dot, k, 5, 11));
      add(0, 3.45 + i * 0.16, 0.45 + len / 110,
        comet(GG[0], GT[0], lg.arrow, k, { r: 2.6, tail: 30 }));
    });
    add(0, 4.0, 0.7, ripple(GT[0], G.legend.x, 'yellow', 6, 15));
    add(0, 4.3, 0.7, ripple(GT[0], G.legend.x, 'yellow', 6, 15));

    /* --- stage 1: connect scene motion to control ------------------------ */
    var CYC = 2.2;
    [G.supA, G.supB].forEach(function (route) {
      [0, 0.8].forEach(function (lag) {
        add(1, 0.15 + lag, 1.35, comet(GG[1], GT[1], route, 'sup', { r: 2.9, tail: 42 }), { period: 1.6 });
      });
    });
    G.loss.forEach(function (r) {
      add(1, 1.42, 0.75, pulseRect(GG[1], r, 'sup', 0.42, 8), { period: 0.8 });
    });
    ['green', 'blue', 'red'].forEach(function (k, i) {
      var row = G.rows[k], lag = i * 0.14;
      add(1, 0.3 + lag, 0.7, ripple(GT[1], [458.5, row.y], k, 5, 11), { period: CYC });
      add(1, 0.5 + lag, 0.6, comet(GG[1], GT[1], [[row.pred[0], row.y], [row.pred[1], row.y]], k,
        { r: 2.6, tail: 26 }), { period: CYC });
      add(1, 1.0 + lag, 0.6, comet(GG[1], GT[1], [[row.gt[0], row.y], [row.gt[1], row.y]], k,
        { r: 2.6, tail: 26 }), { period: CYC });
      /* TCP head: weighted particles converge on the predicted TCP flow */
      var w = G.tcp.w[k];
      add(1, 1.0, 0.7, ripple(GT[1], G.tcp.dot[k], k, 5, 10), { period: CYC });
      add(1, 1.2, 0.6, comet(GG[1], GT[1], G.tcp['in'][k], k, { r: 1.7 + w * 5, tail: 22 }), { period: CYC });
    });
    add(1, 1.78, 0.8, ripple(GT[1], G.tcp.pred[0], 'ink', 5, 14), { period: CYC });
    add(1, 1.8, 0.42, comet(GG[1], GT[1], G.tcp.pred, 'ink', { r: 2.6, tail: 18 }), { period: CYC });
    add(1, 2.12, 0.5, comet(GG[1], GT[1], G.tcp.gt, 'ink', { r: 2.6, tail: 22 }), { period: CYC });

    /* --- forward pass, runs through stages 1 and 2 ----------------------- */
    G.bus.forEach(function (b) {
      add('p', 0, 0.62, comet(GP, TP, b, 'flow', { r: 2.8, tail: 34 }), { period: PIPE });
    });
    G.enc.forEach(function (c) {
      add('p', 0.5, 0.85, pulseBlob(GP, c, 58, 34, 'flow', 0.75), { period: PIPE });
    });
    G.encArrow.forEach(function (a) {
      add('p', 0.95, 0.36, comet(GP, TP, a, 'flow', { r: 2.6, tail: 16 }), { period: PIPE });
    });
    add('p', 1.25, 0.95, pulseRect(GP, G.backbone, 'flow', 0.34, 6), { period: PIPE });
    add('p', 1.8, 0.36, comet(GP, TP, G.a1, 'flow', { r: 2.6, tail: 16 }), { period: PIPE });
    G.latent.forEach(function (r, i) {
      add('p', 2.08 + i * 0.1, 0.75, pulseRect(GP, r, 'flow', 0.5, 1), { period: PIPE });
    });
    add('p', 2.45, 0.36, comet(GP, TP, G.a2, 'flow', { r: 2.6, tail: 16 }), { period: PIPE });
    add('p', 2.75, 0.85, pulseRect(GP, G.decoder, 'flow', 0.34, 6), { period: PIPE });
    add('p', 3.1, 0.32, comet(GP, TP, G.a3, 'flow', { r: 2.6, tail: 14 }), { period: PIPE });
    G.actions.forEach(function (r, i) {
      add('p', 3.36 + i * 0.1, 0.75, pulseRect(GP, r, 'flow', 0.6, 1), { period: PIPE });
    });

    /* --- stage 2: training-only parts fade away -------------------------- */
    G.veil.forEach(function (r) {
      mk('rect', { x: r[0], y: r[1], width: r[2], height: r[3], fill: '#ffffff' }, veil);
    });
    var chip = mk('g', {}, GT[2]);
    mk('rect', { x: 372, y: 104, width: 214, height: 32, rx: 16, fill: '#ffffff', stroke: COLOR.blue, 'stroke-width': 1.2 }, chip);
    mk('text', { x: 479, y: 120.5, 'class': 'method-chip-text' }, chip).textContent = 'Removed at inference';

    /* One-pass walkthrough: stop on deployment, pause outside the viewport,
       and never spend animation frames on hidden/offscreen diagrams. */
    var TOTAL = STAGE[0] + STAGE[1] + STAGE[2];
    var START = [0, STAGE[0], STAGE[0] + STAGE[1]];
    var clock = 0, last = 0, raf = 0;
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    var paused = calm.matches, visible = false, completed = false;
    var diagramImage = fig.querySelector('img');
    var imageReady = diagramImage.complete && diagramImage.naturalWidth > 0;
    var curStage = -1;
    var visited = new Set();
    var status = root.querySelector('.method-animation-status');
    var toggleLabel = root.querySelector('.method-toggle-label');
    var togglePath = root.querySelector('.method-toggle-path');
    var replay = root.querySelector('.method-replay');

    function render(t) {
      var k = t < START[1] ? 0 : t < START[2] ? 1 : 2;
      var ts = t - START[k], dur = STAGE[k];
      var fade = clamp01(ts / 0.35);
      var tp = t - START[1];
      for (var s = 0; s < 3; s++) {
        var a = s === k ? fade : 0;
        show(GG[s], a); show(GT[s], a);
      }
      show(veil, k === 2 ? fade * 0.9 : 0);
      var pa = k === 0 ? 0 : clamp01(ts / 0.4);
      show(GP, pa); show(TP, pa);
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var live = it.clock === 'p' ? k > 0 : it.clock === k;
        var lt = (it.clock === 'p' ? tp : ts) - it.t0;
        var p = -1;
        if (live && lt >= 0) {
          if (it.period) lt = lt % it.period;
          p = lt / it.dur;
        }
        if (p >= 0 && p < 1) { it.obj.set(p, false); it.on = true; }
        else if (p >= 1 && it.hold) { it.obj.set(1, true); it.on = true; }
        else if (it.on) { it.obj.off(); it.on = false; }
      }
      if (k !== curStage) {
        curStage = k;
        visited.add(k);
        steps.forEach(function (button, index) {
          var selected = index === k;
          button.setAttribute('aria-pressed', String(selected));
          if (selected) button.setAttribute('aria-current', 'step');
          else button.removeAttribute('aria-current');
          button.querySelector('.method-stage-state').textContent = selected ? 'Current step' : visited.has(index) ? 'Viewed' : '';
        });
      }
      status.textContent = completed ? 'Walkthrough complete' : 'Step ' + (k + 1) + ' of 3';
    }
    function updateControls() {
      var running = !paused && !completed;
      var label = running ? 'Pause method animation' : completed ? 'Play method animation again' : 'Play method animation';
      toggleLabel.textContent = running ? 'Pause' : 'Play';
      togglePath.setAttribute('d', running ? 'M7 4h4v16H7zM15 4h4v16h-4z' : 'M7 4v16l13-8z');
      togglePath.setAttribute('fill', 'currentColor');
      togglePath.setAttribute('stroke', 'none');
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
      root.dataset.state = completed ? 'complete' : running ? 'playing' : 'paused';
      status.textContent = completed ? 'Walkthrough complete' : 'Step ' + (curStage + 1) + ' of 3';
    }
    function stopFrame() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function canRun() { return !paused && !completed && visible && imageReady && !document.hidden; }
    function schedule() {
      if (!canRun()) { stopFrame(); return; }
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }
    function frame(now) {
      raf = 0;
      if (!canRun()) return;
      clock = Math.min(TOTAL - 0.01, clock + Math.min(0.1, (now - last) / 1000));
      last = now;
      if (clock >= TOTAL - 0.01) { completed = true; paused = true; }
      render(clock);
      if (completed) updateControls();
      schedule();
    }
    function setPaused(value) {
      paused = value;
      updateControls();
      schedule();
    }
    function restart() {
      completed = false;
      visited.clear();
      curStage = -1;
      clock = 0;
      render(clock);
      setPaused(false);
    }
    toggle.addEventListener('click', function () {
      if (completed) restart();
      else setPaused(!paused);
    });
    replay.addEventListener('click', restart);
    root.querySelectorAll('[data-figure-title]').forEach(function (link) {
      link.addEventListener('click', function () { setPaused(true); });
    });
    function selectStage(index) {
      completed = false;
      clock = START[index] + STAGE[index] * 0.62;
      render(clock);
      setPaused(true);
    }
    function followStageHash(initial) {
      var id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch (_) { return; }
      if (!id) return;
      var index = steps.findIndex(function (button) {
        return button.parentElement.id === id;
      });
      if (index >= 0) {
        if (initial === true) { visited.clear(); curStage = -1; }
        selectStage(index);
      }
    }
    steps.forEach(function (button, index) {
      button.disabled = false;
      button.addEventListener('click', function () { selectStage(index); });
    });
    window.addEventListener('hashchange', followStageHash);
    diagramImage.addEventListener('load', function () { imageReady = true; schedule(); });
    diagramImage.addEventListener('error', function () { imageReady = false; setPaused(true); });
    document.addEventListener('visibilitychange', schedule);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[entries.length - 1].isIntersecting;
        schedule();
      }, { threshold: 0.15 }).observe(root.querySelector('.rf-method-frame'));
    } else {
      // Browsers without visibility observation retain explicit playback.
      visible = true;
      paused = true;
    }
    calm.addEventListener('change', function (event) {
      if (event.matches) setPaused(true);
    });
    root.querySelector('.method-animation-toolbar').hidden = false;
    render(paused ? STAGE[0] * 0.62 : 0);
    updateControls();
    followStageHash(true);
    schedule();
  }

  function boot() {
    document.querySelectorAll('[data-method-animation]').forEach(function (root) {
      if (root.dataset.methodReady) return;
      root.dataset.methodReady = 'true';
      init(root);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

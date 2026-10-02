// Preserve destinations from the former detailed landing page.
(() => {
  const legacy = new Set(["abstract", "additional-backbone", "aggregation-grid", "analysis", "analysis-title", "comparisons", "component-ablation-caption", "construct-flow", "data-efficiency", "dual-level-flow", "experimental-setup", "experiments", "libero-plus", "libero-plus-caption", "libero-plus-results", "method-reconstruction", "objective-equation-title", "overview-player", "overview-video", "point-composition", "qualitative", "qualitative-title", "real-world-basketball", "real-world-cabinet", "real-world-cup-plush", "real-world-hang-cup", "real-world-results-with-\u03c0\u2080.\u2085-caption", "real-world-rings", "reconstruction", "reconstruction-examples-fruit", "reconstruction-examples-libero", "seven-real-world-tasks-caption", "spatial-variations-caption", "supervision-signal-caption", "tcp-equation-title", "tcp-trajectories", "test-time-variations", "training-objective", "trajectory-cabinet", "trajectory-hang-cup", "trajectory-rings", "trajectory-stack-cups", "variations-basketball-height", "variations-basketball-layout", "variations-basketball-viewpoint", "variations-rings-height", "visualizations"]);
  const followLegacy = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    if (legacy.has(id)) {
      const target = new URL('full/', location.href);
      target.search = location.search; target.hash = location.hash;
      location.replace(target.href);
    }
  };
  window.addEventListener('hashchange', followLegacy);
  followLegacy();
})();

# MMAI Lab research project pages

## FlowVLA · CoRL 2026

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**  
Junhyeong Go¹, Mingyu Jung¹, Woobin Im², and Jongbin Ryu¹

¹Ajou University · ²Samsung Electronics

[Project page](https://gnaroshi.dev/mmai-lab/flowvla/) · [Detailed results](https://gnaroshi.dev/mmai-lab/flowvla/full/)

This repository contains the research project website and its public paper, figures, and demonstration videos. It does not contain the model implementation or training code.

The original 25 presentation-embedded MP4s, complete submitted overview, and losslessly trimmed overview remain preserved as assets. Playback uses optimized H.264 copies in `assets/videos/optimized/`, with the same resolution, frame rate, frame count, duration, timestamps, audio, and speed labels. These high-quality lossy delivery copies reduce the 26 active files from 234.58 MB to 94.33 MB (59.79%). Their playback indexes precede the video data for progressive loading. All task and analysis demos use a shared 4:3 display frame with original content preserved; the overview keeps its 16:9 presentation format. Wide TCP composites are shown as two complete, synchronized RGB and trajectory panels from the same source file. Both pages use the overview with its opening 343 slide removed (74 frames, 3.086417 seconds). Task names, instructions, method explanations, and quantitative results follow the paper and explicitly identified rebuttal experiments.

The full page introduces the problem and core idea, explains the method with the original static architecture figure, then presents simulation experiments, real-world experiments, and analysis. Real-world Setup & Tasks precedes Task Performance, followed by Test-time Variations and the additional backbone. Analysis connects ablations, motion aggregation, point composition, and cross-task TCP trajectories in that order. VDPM reconstruction examples accompany Method because they show how training supervision is obtained.

The Abstract reproduces the manuscript’s first-page wording verbatim, with PDF line numbers and line-wrap artifacts removed.

The default page follows the overview video → Abstract → Method → real-world demos → simulation and real-world results → Citation, then the lab footer. Paper links open the relevant manuscript pages; the repeated closing paper action is omitted. The detailed route remains available and shares the same typography, table layout, and evidence-note design. Six original Seer + FlowVLA rollouts are visible in a desktop 3-column gallery, including one camera-viewpoint variation. Results retain the complete 12-row LIBERO table and a horizontal real-world comparison, with source and evaluation notes. The supplied original performance chart appears above two model rows spanning nine conditions: four base tasks, three 3D-aware tasks, and two test-time variations. Seven tasks come from Paper Table 5; the two variations come from Table 6. LIBERO-Plus appears as a separate, brief paper reference linking to Table 2 on page 6. The default contains two tables and seven video sources. The detailed page contains six tables and 30 players referencing 26 unique video files: the formerly separate variation table is consolidated into the real-world comparison, preserving all numeric results. Both routes share verified data, controls, metadata, and citation information.

Each default demo includes a short task or variation description. Expanded videos retain their task, speed, and visualization context. The overview preview shows an original robot comparison frame with a prominent play button; playback still starts from the trimmed video’s beginning.

Dense figures retain original pixels: reconstruction panels reflow in source order and language instructions wrap as text. The LIBERO-Plus scene montage is omitted; its seven perturbation types remain explained beside the results. The connected method diagram is static and scrolls at a readable scale on phones, with original-image enlargement. Method animation, playback controls, and stage cards are removed; the detailed explanation and preserved conceptual anchors precede the figure. Overflowing benchmark tables show a scrolling cue and keep a compact method column.

Individual video controls are shown by default. Paired and four-view groups place a persistent Play all / Stop / Replay toolbar below the videos. Play all becomes Pause all while running and Cancel while loading. Stop cancels pending work, resets every clip to the beginning, and restores individual controls; Replay starts the group again from the beginning. Shared playback hides duplicate per-clip play/seek/restart controls and reveals one group timeline plus an Individual controls action. Returning to individual controls preserves the paused frames. Enlargement remains available. Sources attach only near the viewport or on explicit playback; hidden gallery panels stay unloaded. Failed loading can be retried, and no-JavaScript links open the delivery files directly.

Paper Figure 2 retains both data-efficiency and computational-cost panels, with a shared caption. The training-time comparison excludes offline 3D reconstruction.

Each result table groups its title and metric above the values, with a short source reference below. Paper-derived tables link to the original PDF page; LIBERO identifies both Table 1 and rebuttal experiments, and the additional backbone identifies its rebuttal source. Repeated Source/Evaluation labels and duplicate protocol notes are omitted. Real-world variation column names identify Basketball viewpoint and Ring height directly. Necessary experiment settings remain in their nearby introductory text. Quantitative highlights and FlowVLA result rows use bold orange text with a pale orange row tint.

## Editing and preview

The site uses plain HTML, CSS, and JavaScript; no build step is required.

- `flowvla/index.html`: video-first default page, six demos, and main simulation/real-world comparison tables
- `flowvla/full/index.html`: detailed experiments and analysis
- `flowvla/abstract/index.html`: compatibility redirect to the default page
- `flowvla/summary.css`: default-page spacing and layout
- `flowvla/legacy-links.js`: old detailed anchors redirected to their preserved route
- `flowvla/styles.css`: shared typography tokens, compact evidence tables, concise source references, and responsive layout
- `flowvla/script.js`: seekable video players, group playback, task galleries, current-position outline, and figure enlargement
- `flowvla/assets/`: published paper, images, and videos

From the repository root, run:

```sh
python3 tools/serve.py --directory . --port 8765
```

Then open `http://127.0.0.1:8765/flowvla/` for the default page or `http://127.0.0.1:8765/flowvla/full/` for the detailed page. The preview server supports HTTP byte ranges so original MP4 videos can be scrubbed without downloading the full file. Keep metadata and reported results consistent across both views; both reference the shared `flowvla/assets/` directory. The historical `/abstract/` route redirects to the default page and preserves its query and hash. Known old detail-only hashes at the root redirect to `/full/`; shared anchors stay on the default page.

Both pages share a fluid content column up to 960 px wide; paragraphs follow that boundary without a separate 800 px cap. Small equipment and evidence figures retain appropriate narrower widths. On both pages, the complete performance chart scales to the reading column and opens at original size; only the numeric matrix scrolls on narrow screens, with sticky model labels and a scrolling hint. Both pages use matching section and subsection numbers in their headings and outline. The default gallery uses three columns at 900 CSS pixels and above, two columns from 600–899 px, and one column below 600 px. Narrow video cards reflow controls without reducing the 44 px touch targets. Detailed media uses two equal columns, switching to one when the media region is narrower than 640 px; single clips occupy the same slot width. Enlarged TCP panels retain their panel framing without affecting other videos opened afterward. At 900 CSS pixels and above, the outline stays beside the reading column. Smaller screens show a persistent Contents bar with the active subsection and the complete hierarchy in its menu. A back-to-top control provides a return path through each page. The detailed page’s sticky header links back to the project overview; the duplicate hero action is omitted.

Five colors sampled from the MMAI logo have consistent content roles: blue `#054299` for primary actions and general navigation, sky `#6999fb` for introductory sections, violet `#bc84ee` for Method, coral `#f2886b` for real-world demonstrations, and orange `#feb785` for results. Bright samples use darker same-hue text variants and pale background variants; text contrast is at least 4.85:1 on its assigned fill. Scientific figure and video colors are preserved. Shared semantic tokens define typography, palette, spacing, button targets, and media insets for both routes. Headings use a shared size scale with section numbers aligned to the first title line. Both pages use semantic font-family, size, weight, and line-height tokens in `styles.css`: 18 px body text (16 px below 600 px), 16 px table values, and 14 px table headers, venues, captions, and evaluation notes at the browser’s default root size. Demo titles use 16 px, and button labels use 14 px consistently. Video controls use the same 20 px SVG icons and 44 px targets. Method explanation paragraphs use the body-text role. Major sections share 32 px vertical padding on desktop and 24 px on phones. The system font stack and `rem` units follow browser preferences. Table text does not shrink on phones. LIBERO and the real-world matrix have minimum widths of 640 px and 732 px respectively; the detailed LIBERO-Plus table uses 880 px and keeps its Method column sticky. Compact 6 px cell padding, a 1.375 data line height, and single-line model labels keep data rows near 35 px on desktop. The first column has a consistent 16 px leading inset. At the 988 px review viewport, all nine real-world conditions fit beside the outline. Detailed ablations use an automatic grid with a 24 rem column minimum when space permits and a 30 rem maximum per table, stacking within narrower columns. Explanatory prose is justified with a start-aligned final line and automatic hyphenation; captions and controls retain their own alignment. Method and demo paper links sit beside their section headings and keep 44 px click targets, and citation-copy feedback occupies reserved space below the code block.

## Deployment

GitHub Pages publishes the root of the `main` branch. The project inherits the `gnaroshi.dev` custom domain from the account's user site, so the repository name and `flowvla/` directory produce the public URL above. Do not add a separate `CNAME` file here.

Keep asset paths relative and use the canonical URL with its trailing slash. Before publishing, check the page at desktop, tablet, and mobile widths and verify paper links and video playback.

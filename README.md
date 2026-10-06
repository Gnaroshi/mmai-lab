# MMAI Lab research project pages

## FlowVLA · CoRL 2026

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**  
Junhyeong Go¹, Mingyu Jung¹, Woobin Im², and Jongbin Ryu¹

¹Ajou University · ²Samsung Electronics

[Project page](https://gnaroshi.dev/mmai-lab/flowvla/) · [Detailed results](https://gnaroshi.dev/mmai-lab/flowvla/full/)

This repository contains the research project website and its public paper, figures, and demonstration videos. It does not contain the model implementation or training code.

The 25 individual demonstration and visualization videos are the original MP4 files embedded in the presentation, preserved without trimming, transcoding, or speed changes. Static display viewports hide only verified blank border pixels in visualization clips; the underlying files remain unchanged. Both pages use the same lossless overview with only its opening 343 slide removed (74 frames, 3.086417 seconds); all remaining frames, resolution, and playback speed are preserved. The complete submitted overview remains available in the published assets. Task names, instructions, method explanations, and quantitative results follow the paper and explicitly identified rebuttal experiments.

The full page introduces the problem and core idea, explains the method conceptually, then presents simulation experiments, real-world comparisons beside their quantitative results, and qualitative visualizations. Component ablations and supervision comparisons remain visible in Analysis, after the performance results. VDPM reconstruction examples accompany Method because they show how training supervision is obtained.

The Abstract reproduces the manuscript’s first-page wording verbatim, with PDF line numbers and line-wrap artifacts removed.

The default page follows the overview video → Abstract → Method → real-world demos → simulation and real-world results → Citation. A closing Read the full paper link follows Citation. The default page no longer links to the detailed route in its header or body; it opens the paper at the relevant page instead. The existing detailed route remains available unchanged. Six original Seer + FlowVLA rollouts are visible in a desktop 3-column gallery, including one camera-viewpoint variation. Results retain the complete 12-row LIBERO table and a horizontal real-world comparison, with source and evaluation notes. The supplied original performance chart appears above two model rows spanning nine conditions: four base tasks, three 3D-aware tasks, and two test-time variations. Seven tasks come from Paper Table 5; the two variations come from Table 6. LIBERO-Plus appears as a separate, brief paper reference linking to Table 2 on page 6. The detailed page contains six tables and 26 video sources: the formerly separate variation table is consolidated into the real-world comparison, preserving all numeric results. Both routes share verified data, controls, metadata, and citation information.

Each default demo includes a short task or variation description. Expanded videos retain their task, speed, and visualization context. The overview preview shows an original robot comparison frame with a prominent play button; playback still starts from the trimmed video’s beginning.

Dense figures retain original pixels: reconstruction panels reflow in source order, LIBERO-Plus variation strips stack on phones, and language instructions wrap as text. The connected method diagram scrolls at a readable scale on phones, with a complete-figure view. Overflowing benchmark tables show a scrolling cue and keep a compact method column.

Paper Figure 2 retains both data-efficiency and computational-cost panels, with a shared caption. The training-time comparison excludes offline 3D reconstruction.

Each result table groups its title and metric above the values, with source and evaluation notes below. Paper-derived tables link to the original PDF page; the LIBERO table identifies its added rebuttal rows, and additional π₀.₅ real-world experiments identify the rebuttal as their source.

## Editing and preview

The site uses plain HTML, CSS, and JavaScript; no build step is required.

- `flowvla/index.html`: video-first default page, six demos, and main simulation/real-world comparison tables
- `flowvla/full/index.html`: detailed experiments and analysis
- `flowvla/abstract/index.html`: compatibility redirect to the default page
- `flowvla/summary.css`: default-page spacing and layout
- `flowvla/legacy-links.js`: old detailed anchors redirected to their preserved route
- `flowvla/styles.css`: layout and typography
- `flowvla/script.js`: seekable video players, group playback, task galleries, current-position outline, and figure enlargement
- `flowvla/assets/`: published paper, images, and videos

From the repository root, run:

```sh
python3 tools/serve.py --directory . --port 8765
```

Then open `http://127.0.0.1:8765/flowvla/` for the default page or `http://127.0.0.1:8765/flowvla/full/` for the detailed page. The preview server supports HTTP byte ranges so original MP4 videos can be scrubbed without downloading the full file. Keep metadata and reported results consistent across both views; both reference the shared `flowvla/assets/` directory. The historical `/abstract/` route redirects to the default page and preserves its query and hash. Known old detail-only hashes at the root redirect to `/full/`; shared anchors stay on the default page.

Both pages share a fluid content column up to 960 px wide; paragraphs follow that boundary without a separate 800 px cap. Small equipment and evidence figures retain appropriate narrower widths. On the default page, the complete performance chart scales to the reading column and opens at original size; only the numeric matrix scrolls on narrow screens, with sticky model labels and a scrolling hint. The detailed page keeps its existing combined chart/table scroll region. Both pages use matching section and subsection numbers in their headings and outline. The default gallery uses three columns at 900 CSS pixels and above, two columns from 600–899 px, and one column below 600 px. Narrow video cards reflow controls without reducing the 44 px touch targets. At 900 CSS pixels and above, the outline stays beside the reading column. Smaller screens show a persistent Contents bar with the active subsection and the complete hierarchy in its menu. A back-to-top control provides a return path through each page. The detailed page’s sticky header also links back to the project overview.

Headings use a shared size scale with section numbers aligned to the first title line. The default page defines semantic font-family, size, and weight tokens in `summary.css`: 18 px body text (16 px below 600 px), 16 px table values, and 14 px table headers, venues, captions, and evaluation notes at the browser’s default root size. Its system font stack and `rem` units follow browser preferences. Table text does not shrink on phones. Default benchmark and real-world matrix minimum widths are 640 px and 732 px respectively. Compact 6 px cell padding, a 1.375 data line height, and single-line model labels keep rows near 35 px on desktop. The first column has a consistent 16 px leading inset; variation conditions use numbered notes below the table. At the 988 px review viewport, all nine conditions fit beside the outline. The detailed page retains its existing typography. Explanatory prose is justified with a start-aligned final line and automatic hyphenation; captions and controls retain their own alignment. Method and demo paper links sit beside their section headings and keep 44 px click targets, and citation-copy feedback occupies reserved space below the code block.

## Deployment

GitHub Pages publishes the root of the `main` branch. The project inherits the `gnaroshi.dev` custom domain from the account's user site, so the repository name and `flowvla/` directory produce the public URL above. Do not add a separate `CNAME` file here.

Keep asset paths relative and use the canonical URL with its trailing slash. Before publishing, check the page at desktop, tablet, and mobile widths and verify paper links and video playback.

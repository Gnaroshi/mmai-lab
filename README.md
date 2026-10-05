# MMAI Lab research project pages

## FlowVLA · CoRL 2026

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**  
Junhyeong Go¹, Mingyu Jung¹, Woobin Im², and Jongbin Ryu¹

¹Ajou University · ²Samsung Electronics

[Project page](https://gnaroshi.dev/mmai-lab/flowvla/) · [Detailed results](https://gnaroshi.dev/mmai-lab/flowvla/full/)

This repository contains the research project website and its public paper, figures, and demonstration videos. It does not contain the model implementation or training code.

The 25 individual demonstration and visualization videos are the original MP4 files embedded in the presentation, preserved without trimming, transcoding, or speed changes. Static display viewports hide only verified blank border pixels in visualization clips; the underlying files remain unchanged. Both pages use the same lossless overview with only its opening 343 slide removed (74 frames, 3.086417 seconds); all remaining frames, resolution, and playback speed are preserved. The complete submitted overview remains available in the published assets. Task names, instructions, method explanations, and quantitative results follow the paper and explicitly identified rebuttal experiments.

The full page introduces the problem and core idea, explains the method conceptually, then presents simulation experiments, real-world comparisons beside their quantitative results, and qualitative visualizations. Component ablations and supervision comparisons remain visible in Analysis, after the performance results. VDPM reconstruction examples accompany Method because they show how training supervision is obtained.

The default page follows the overview video → Abstract → Method → real-world demos → simulation and real-world results. Six original Seer + FlowVLA rollouts are visible in a desktop 3-column gallery, including one camera-viewpoint variation. Results retain the complete 12-row LIBERO table and a horizontal real-world comparison, with source and evaluation notes. The supplied original performance chart appears above two model rows spanning nine conditions: four base tasks, three 3D-aware tasks, and two test-time variations. Seven tasks come from Paper Table 5; the two variations come from Table 6. LIBERO-Plus has a brief result statement and a link to its detailed table. The detailed page contains six tables and 26 video sources: the formerly separate variation table is consolidated into the real-world comparison, preserving all numeric results. Both routes share verified data, controls, metadata, and citation information.

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

Both pages share a fluid content column up to 960 px wide; paragraphs follow that boundary without a separate 800 px cap. Small equipment and evidence figures retain appropriate narrower widths. The chart and horizontal real-world table share an internal scroll area on narrow screens, with sticky model labels, a visible scrolling hint, and figure enlargement. Both pages use matching section and subsection numbers in their headings and outline. The default gallery uses three columns at 1100 CSS pixels and above, two columns from 600–1099 px, and one column below 600 px. Narrow video cards reflow controls without reducing the 44 px touch targets. At 900 CSS pixels and above, the outline stays beside the reading column. Smaller screens show a persistent Contents bar with the active subsection and the complete hierarchy in its menu. A back-to-top control provides a return path through each page. The detailed page’s sticky header also links back to the project overview.

## Deployment

GitHub Pages publishes the root of the `main` branch. The project inherits the `gnaroshi.dev` custom domain from the account's user site, so the repository name and `flowvla/` directory produce the public URL above. Do not add a separate `CNAME` file here.

Keep asset paths relative and use the canonical URL with its trailing slash. Before publishing, check the page at desktop, tablet, and mobile widths and verify paper links and video playback.

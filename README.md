# MMAI Lab research project pages

## FlowVLA · CoRL 2026

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**  
Junhyeong Go¹, Mingyu Jung¹, Woobin Im², and Jongbin Ryu¹

¹Ajou University · ²Samsung Electronics

[Research summary](https://gnaroshi.dev/mmai-lab/flowvla/abstract/) · [Full project page](https://gnaroshi.dev/mmai-lab/flowvla/)

This repository contains the research project website and its public paper, figures, and demonstration videos. It does not contain the model implementation or training code.

The 25 individual demonstration and visualization videos are the original MP4 files embedded in the presentation, preserved without trimming, transcoding, or speed changes. Static display viewports hide only verified blank border pixels in visualization clips; the underlying files remain unchanged. The complete submitted video appears once as the overview. Task names, instructions, method explanations, and quantitative results follow the paper and explicitly identified rebuttal experiments.

The full page introduces the problem and core idea, explains the method conceptually, then presents simulation experiments, real-world comparisons beside their quantitative results, and qualitative visualizations. Component ablations and supervision comparisons remain visible in Analysis, after the performance results. VDPM reconstruction examples accompany Method because they show how training supervision is obtained.

The summary provides a shorter path through the problem, method, three selected Seer results, a Hang Cup comparison, and a Stack Cups TCP visualization. It preserves the author and citation information and links back to the full study. Its three video sources, method image, paper, and player controls are shared with the full page.

Paper Figure 2 retains both data-efficiency and computational-cost panels, with a shared caption. The training-time comparison excludes offline 3D reconstruction.

Each result table groups its title and metric above the values, with source and evaluation notes below. Paper-derived tables link to the original PDF page; the LIBERO table identifies its added rebuttal rows, and additional π₀.₅ real-world experiments identify the rebuttal as their source.

## Editing and preview

The site uses plain HTML, CSS, and JavaScript; no build step is required.

- `flowvla/index.html`: page content and metadata
- `flowvla/abstract/index.html`: concise research summary
- `flowvla/abstract/summary.css`: summary-specific spacing and layout
- `flowvla/styles.css`: layout and typography
- `flowvla/script.js`: seekable video players, group playback, task galleries, current-position outline, and figure enlargement
- `flowvla/assets/`: published paper, images, and videos

From the repository root, run:

```sh
python3 tools/serve.py --directory . --port 8765
```

Then open `http://127.0.0.1:8765/flowvla/` for the full page or `http://127.0.0.1:8765/flowvla/abstract/` for the summary. The preview server supports HTTP byte ranges so original MP4 videos can be scrubbed without downloading the full file. Keep metadata and reported results consistent across both views; summary media references the shared `flowvla/assets/` directory.

The full page uses matching section and subsection numbers in its headings and outline. At 900 CSS pixels and above, the outline stays beside the reading column. Smaller screens show a persistent Contents bar with the active subsection and the complete hierarchy in its menu. A back-to-top control provides a return path through each page.

## Deployment

GitHub Pages publishes the root of the `main` branch. The project inherits the `gnaroshi.dev` custom domain from the account's user site, so the repository name and `flowvla/` directory produce the public URL above. Do not add a separate `CNAME` file here.

Keep asset paths relative and use the canonical URL with its trailing slash. Before publishing, check the page at desktop, tablet, and mobile widths and verify paper links and video playback.

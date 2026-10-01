# MMAI Lab research project pages

## FlowVLA · CoRL 2026

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**  
Junhyeong Go, Mingyu Jung, Woobin Im, and Jongbin Ryu  
MMAI Lab · Ajou University

[View the project page](https://gnaroshi.dev/mmai-lab/flowvla/)

This repository contains the research project website and its public paper, figures, and demonstration videos. It does not contain the model implementation or training code.

The 27 individual demonstration and visualization videos are the original MP4 files embedded in the presentation, preserved without trimming, transcoding, or speed changes. Static display viewports hide only verified blank border pixels in five visualization clips; the underlying files remain unchanged. The complete submitted video appears once as the overview. Task names, instructions, method explanations, and quantitative results follow the paper.

The page introduces the problem and core idea, explains the method conceptually, then presents simulation and real-world experiments, baseline comparisons, and qualitative visualizations. Component ablations and supervision comparisons remain visible in the main page.

## Editing and preview

The site uses plain HTML, CSS, and JavaScript; no build step is required.

- `flowvla/index.html`: page content and metadata
- `flowvla/styles.css`: layout and typography
- `flowvla/script.js`: seekable video players, group playback, and task galleries
- `flowvla/assets/`: published paper, images, and videos

From the repository root, run:

```sh
python3 tools/serve.py --directory . --port 8765
```

Then open `http://127.0.0.1:8765/flowvla/`. The preview server supports HTTP byte ranges so original MP4 videos can be scrubbed without downloading the full file.

## Deployment

GitHub Pages publishes the root of the `main` branch. The project inherits the `gnaroshi.dev` custom domain from the account's user site, so the repository name and `flowvla/` directory produce the public URL above. Do not add a separate `CNAME` file here.

Keep asset paths relative and use the canonical URL with its trailing slash. Before publishing, check the page at desktop and mobile widths and verify paper links and video playback.

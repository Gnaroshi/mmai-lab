# MMAI Lab research project pages

## FlowVLA · CoRL 2026

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**  
Junhyeong Go, Mingyu Jung, Woobin Im, and Jongbin Ryu  
MMAI Lab · Ajou University

[View the project page](https://gnaroshi.dev/mmai-lab/flowvla/)

This repository contains the research project website and its public paper, figures, and demonstration videos. It does not contain the model implementation or training code.

The demonstration clips are excerpts from the submitted overview video. They preserve the playback speeds and result labels in that video. Task names and instructions follow the submitted paper.

## Editing and preview

The site uses plain HTML, CSS, and JavaScript; no build step is required.

- `flowvla/index.html`: page content and metadata
- `flowvla/styles.css`: layout and typography
- `flowvla/script.js`: video controls, task filters, and result tabs
- `flowvla/assets/`: published paper, images, and videos

From the repository root, run:

```sh
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/flowvla/`.

## Deployment

GitHub Pages publishes the root of the `main` branch. The project inherits the `gnaroshi.dev` custom domain from the account's user site, so the repository name and `flowvla/` directory produce the public URL above. Do not add a separate `CNAME` file here.

Keep asset paths relative and use the canonical URL with its trailing slash. Before publishing, check the page at desktop and mobile widths and verify paper links and video playback.

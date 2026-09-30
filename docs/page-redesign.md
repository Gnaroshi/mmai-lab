# FlowVLA page redesign

Baseline: `main`, `44058ed08ddfc2b7469a0f938c7f6d826e7b5ffa`.

The earlier page emphasized demonstrations and tables while providing too little explanation of the paper. The redesign introduces the research question and method before presenting evidence.

## Reading order

1. Title, authors, paper resources, and a concise statement of the contribution.
2. Overview video and abstract.
3. Full method figure, reconstruction and point selection, point-level and TCP-level learning, and the joint objective. Original presentation videos explain each relevant stage.
4. Real-world comparisons and test-time variations, followed by their evaluation results.
5. LIBERO and LIBERO-Plus results with the evaluation protocols.
6. Visible component and supervision ablations, efficiency, and limitations.
7. Citation.

The Stack Cups aggregation sequence uses four synchronized views in a large two-column layout, with labels below each view. Normal task comparisons each belong to one gallery. TCP trajectory visualizations explain the auxiliary branch separately.

## Preserved behavior and compatibility

The public URL, HTTPS, lab identity, author order, paper link, and existing section anchors remain available. All controls support keyboard access, reduced motion, and native video controls without JavaScript. Media paths remain relative to the page directory. The presentation is not uploaded; only its embedded media used on the page is included.

The 27 individual videos retain their original bytes and playback timing. Ring Insertion comparisons explicitly label different source speeds. The full overview remains intact. Quantitative tables describe evaluation outcomes independently of selected video examples.

## Guidance and reference decisions

Applied the web and UI guidance for reading order, evidence boundaries, readable figures, responsive controls, keyboard focus, and local validation. Core scientific evidence is visible instead of using disclosure intended for diagnostic detail.

Inspected official pages for [OpenVLA](https://openvla.github.io/), [Octo](https://octo-models.github.io/), [OpenVLA-OFT](https://openvla-oft.github.io/), [SpatialVLA](https://spatialvla.github.io/), [Seer](https://nimolty.github.io/Seer/), [π₀](https://www.pi.website/blog/pi0), and [π₀.₅](https://www.pi.website/blog/pi05), along with GR00T N1.5 and Any3D-VLA. Their explanation-before-evidence structure informed the redesign; no template or asset was copied from them.

## Release and rollback

Validate the paper's values and terminology, source-media hashes, responsive layout, gallery selection, playback synchronization, focus, and public asset links before considering the deployment complete. Revert the redesign commit and republish `main` to restore the baseline. Original presentation and research source files remain outside the public repository.


## Reader and player refinement

Baseline: `main`, `6e8daae6fb435d132cb7adb7c927d5c113a26c25`.

The refinement defines VLA, 3D flow, TCP, and the action representation before using them. Two native MathML equations retain their scientific meaning, with visible interpretations and a definition for every symbol. The mobile objective wraps onto two aligned lines. The method is organized into three full-size subsection headings; small duplicate section labels are removed.

The layout uses two centered axes: 760px for reading and 1120px for figures, tables, and video groups. Major headings identify the sections in navigation. Shared spacing, caption footers, and equal media columns distinguish examples from explanations. The diagram offers an immediate scroll/full-figure cue on narrow screens.

All videos now start on reader request. Each uses the same play/pause, seek, elapsed-time, restart, and enlarge controls directly below the video. Group play/pause, seeking, and restart sit directly above the corresponding comparison or four-view visualization. Comparison clips retain their own source speeds and durations; a shorter clip waits at its end. The four Stack Cups views synchronize at their original rate. Switching tasks or hiding the browser pauses playback without automatic resumption. JavaScript-free pages retain native controls.

Original media bytes, all scientific table values, publication paths, and existing section anchors are preserved. The local preview server now supports byte-range requests for reliable seeking. Applied reusable guidance on meaningful headings, explained equations, shared layout axes, and media controls placed beside their targets. No migration or user action is needed; reverting this refinement commit restores the previous presentation.

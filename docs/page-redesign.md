# FlowVLA page structure and media

Baseline for this revision: `9b58fb3015dd74cdf6b206009a2f8e90f78afc92`.

## Reading order and evidence

Overview introduces the manipulation problem and 3D motion learning. Method pairs the architecture with three conceptual explanations. Simulation groups LIBERO, LIBERO-Plus, visible ablations, and data efficiency. Real-world experiments put the baseline comparison gallery immediately before its result table, followed by additional π₀.₅ results, setup and task families, and the variation gallery with its table. Qualitative analysis progresses from RGB reconstruction to integrated motion selection and TCP aggregation, point composition, and trajectories across tasks.

Reconstruction examples share tabs; the integrated four-view visualization replaces the standalone point-selection gallery. Layout variation is part of the variation gallery. All quantitative tables use success rate (%) in the caption, compact rows, consistent precision, and source/evaluation notes. Comparative benchmark methods link to verified original papers and identify venue/year. Ablation begins with the baseline and ends with FlowVLA.

The [collaborator’s page](https://gojunhyeong.github.io/FlowVLA/) supplied original research images, checked against the submitted paper and rebuttal. Its `fig9_vdpm_fruit` and `fig10_vdpm_libero` correspond to paper Figures 8 and 9. Composition is from the rebuttal. The robot setup uses the native, unscaled JPEG embedded in the paper; the PDF placement had stretched it horizontally. Seven task-image tiles preserve their source proportions and place each category heading once above its group.

Author affiliations distinguish Ajou University and Samsung Electronics. The full Seer LIBERO rows and π₀.₅ real-world results identify their rebuttal source. The 84.8% object-point fraction is measured among the highest-weight 512 points across 100 examples, separate from the single illustrated example.

## Responsive layout and controls

Text, tables, figures, and videos fit inside one 800 px reading column. Smaller figures retain smaller widths. Figure captions have a shared background and boundary directly attached to their image. Clickable images open an enlargement dialog; redundant enlargement text links are removed.

The header collapses into a Sections menu on narrow screens. Wide benchmark tables scroll internally while retaining row labels. Video pairs stack on phones. Gallery panels share a track and aligned headings; hidden videos are inert and paused. Play/pause, restart, and enlargement use accessible icons and tooltips with 44 px touch targets. Both individual and group timelines remain seekable.

The 25 included PPT-embedded MP4s are byte-identical to their sources, preserving timing and speed labels. The full submitted overview is separate. Display viewports hide only previously verified blank borders and remain consistent between posters, playback, and enlargement. No clip was cut from the overview.

## Validation and rollback

Checked all referenced assets, 25 source MP4 hashes, unique anchors, seven tables, 24 real-world percentage cells, citation links, and experiment conditions. Browser inspection at 320, 390, 768, and 1321 CSS pixels found no page overflow. Verified paired playback, group seeking, icon state and accessible labels, video enlargement and focus restoration, and stable task-gallery height.

At the same 1321 × 1117 viewport, the page shortened from 18,445 px to approximately 11,459 px (38%). This measures document height with default task selections, not a claim about reading time.

The publication route is unchanged. Revert this revision and publish `main` to restore the baseline. Private research files and inspection reports stay outside the public repository.

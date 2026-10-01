# FlowVLA page structure and media

Baseline for this revision: `a6531c664f9da7e0dcabcfa5f9934adb63e7ce9b`.

## Reading order and evidence

Overview introduces the manipulation problem and 3D motion learning before the overview video. Method explains the concepts before the architecture, then shows VDPM reconstruction as the source of training targets. Simulation presents LIBERO, LIBERO-Plus, and data efficiency together. Real-world experiments state the robot, observations, training data, and evaluation protocol before the comparison gallery and its table. Setup and task families precede spatial variations, with additional π₀.₅ results closing the experiment section. Analysis follows the performance evidence: ablations, integrated motion selection and aggregation, TCP trajectories across tasks, then point composition. Citation closes the page.

Reconstruction examples share tabs; the integrated four-view visualization replaces the standalone point-selection gallery. Layout variation is part of the variation gallery. All quantitative tables use success rate (%) in the caption, compact rows, consistent precision, and source/evaluation notes. Comparative benchmark methods link to verified original papers and identify venue/year. Ablation begins with the baseline and ends with FlowVLA.

The [collaborator’s page](https://gojunhyeong.github.io/FlowVLA/) supplied original research images, checked against the submitted paper and rebuttal. Its `fig9_vdpm_fruit` and `fig10_vdpm_libero` correspond to paper Figures 8 and 9. Composition is from the rebuttal. The robot setup uses the native, unscaled JPEG embedded in the paper; the PDF placement had stretched it horizontally. Seven task-image tiles preserve their source proportions and place each category heading once above its group.

Author affiliations distinguish Ajou University and Samsung Electronics. The full Seer LIBERO rows and π₀.₅ real-world results identify their rebuttal source. The 84.8% object-point fraction is measured among the highest-weight 512 points across 100 examples, separate from the single illustrated example.

## Responsive layout and controls

Text, tables, figures, and videos fit inside one 800 px reading column. Smaller figures retain smaller widths. Figure captions have a shared background and boundary directly attached to their image. Clickable images open an enlargement dialog; redundant enlargement text links are removed.

The header collapses into a Sections menu on narrow screens. Wide benchmark tables scroll internally while retaining row labels. Video pairs stack on phones. Gallery panels share a track and aligned headings; hidden videos are inert and paused. Play/pause, restart, and enlargement use accessible icons and tooltips with 44 px touch targets. Both individual and group timelines remain seekable.

The 25 included PPT-embedded MP4s are byte-identical to their sources, preserving timing and speed labels. The full submitted overview is separate. Display viewports hide only previously verified blank borders and remain consistent between posters, playback, and enlargement. No clip was cut from the overview.

## Validation and rollback

Checked all referenced assets, 25 source MP4 hashes, unique anchors, seven tables, 24 real-world percentage cells, citation links, and experiment conditions. The density revision was checked at 320, 390, 768, and 1321 CSS pixels. The reading-order revision also checks moved navigation targets, overview-player focus, and content preservation. Verified paired playback, group seeking, icon state and accessible labels, video enlargement and focus restoration, and stable task-gallery height.

The compact 800 px reading column and visible result tables are preserved. This revision changes the explanatory order, retains all seven quantitative tables and all 26 video sources, and preserves existing deep links. The Video action now targets the overview player directly.

The publication route is unchanged. Revert this revision and publish `main` to restore the baseline. Private research files and inspection reports stay outside the public repository.

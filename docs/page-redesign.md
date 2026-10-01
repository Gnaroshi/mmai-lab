# FlowVLA page structure and media

Baseline for the numbering and figure-restoration revision: `70530c6d8ad1f9d1a19a0a9dc055e885df8dbcf6`.

## Full page: reading order and evidence

Overview introduces the manipulation problem and 3D motion learning before the overview video. Method explains the concepts before the architecture, then shows VDPM reconstruction as the source of training targets. Simulation presents LIBERO, LIBERO-Plus, and data efficiency together. Real-world experiments state the robot, observations, training data, and evaluation protocol before the comparison gallery and its table. Setup and task families precede spatial variations, with additional π₀.₅ results closing the experiment section. Analysis follows the performance evidence: ablations, integrated motion selection and aggregation, TCP trajectories across tasks, then point composition. Citation closes the page.

Reconstruction examples share tabs; the integrated four-view visualization replaces the standalone point-selection gallery. Layout variation is part of the variation gallery. All quantitative tables use success rate (%) in the caption, compact rows, consistent precision, and source/evaluation notes. Comparative benchmark methods link to verified original papers, with venue/year beside each method name. The separate venue column and repeated FlowVLA conference labels are omitted. Ablation begins with the baseline and ends with FlowVLA.

Each table forms one bordered figure: a distinct title and metric at the top, values in the middle, and an attached footer for provenance and evaluation conditions. The footer says when a table is adapted from the paper and links its table number to the verified PDF page. LIBERO identifies both Paper Table 1 and the rebuttal, with the full Seer rows attributed to the latter. The additional π₀.₅ table identifies rebuttal experiments only. Tables 1–2 link to PDF page 6, Tables 3–4 to page 7, and Tables 5–6 to page 8. These presentation changes preserve every numeric value and comparison condition.

The [collaborator’s page](https://gojunhyeong.github.io/FlowVLA/) supplied original research images, checked against the submitted paper and rebuttal. Its `fig9_vdpm_fruit` and `fig10_vdpm_libero` correspond to paper Figures 8 and 9. Composition is from the rebuttal. The robot setup uses the native, unscaled JPEG embedded in the paper; the PDF placement had stretched it horizontally. Seven task-image tiles preserve their source proportions and place each category heading once above its group.

Author affiliations distinguish Ajou University and Samsung Electronics. The full Seer LIBERO rows and π₀.₅ real-world results identify their rebuttal source. The 84.8% object-point fraction is measured among the highest-weight 512 points across 100 examples, separate from the single illustrated example.

Paper Figure 2 restores the original 843×400 image with both panels: training data efficiency and training/inference cost. CSS arranges its two original panels side by side or stacks them on phones; enlargement opens the complete original figure. One shared caption identifies Seer on LIBERO-Long. The nearby note distinguishes policy training time from offline 3D reconstruction. Cost is presented as an experimental tradeoff, with no promotional badges.

## Research summary

The [summary route](https://gnaroshi.dev/mmai-lab/flowvla/abstract/) complements the [full page](https://gnaroshi.dev/mmai-lab/flowvla/); it does not replace or hide the detailed study. It follows one short path: overview, conceptual method with the architecture figure, selected results and a Hang Cup comparison, a Stack Cups TCP trajectory, then citation. Header and closing links return to the full study, and the Full video action opens the full page's overview player.

The three-row table compares Seer and Seer + FlowVLA on LIBERO-Long, LIBERO-Plus average, and Hang Cup. Its six values come from the same verified results as the full page. It names the comparison backbone, states the rollout/trial conditions and zero-shot evaluation scope, and links Paper Tables 1–2 and 5. Selecting these examples does not imply that they summarize every benchmark or backbone.

The summary references the same parent assets, stylesheet, and player script. It adds only its HTML and a small summary stylesheet: the paper, method image, two original Hang Cup clips, and original Stack Cups TCP clip are not copied or re-encoded. Author order, affiliations, paper title, venue, and citation stay consistent across both pages. Verify both routes when changing shared styles or controls.

## Responsive layout and controls

Text, tables, figures, and videos fit inside one 800 px reading column. Three-column result tables use a centered content-sized width, keeping task labels close to the values. Smaller figures retain smaller widths. Figure captions have a shared background and boundary directly attached to their image. Clickable images open an enlargement dialog; redundant enlargement text links are removed. The setup photo shares a compact row with labeled robot, gripper, and camera specifications; the photo scales down at narrow widths.

Table titles use 15 px text on desktop and 14 px on phones; metrics, source labels, and evaluation notes use 13 px. Research figure captions use 14 px on desktop and 13 px on phones. Title, unit, and source remain distinct without reducing evaluation conditions to tiny footnotes.

The full page numbers sections 1–6 and subsections 2-a through 5-d, using the same identifiers in the headings and both navigation surfaces. At 900 CSS pixels and above, a right-side outline sits outside a fluid reading column capped at 800 px. Below that breakpoint, a persistent Contents bar displays the active subsection and opens the complete hierarchy. The desktop outline expands the current section’s children; scrolling, direct links, and keyboard navigation update the active destination. Both pages have a back-to-top control that appears after scrolling down. Wide benchmark tables scroll internally while retaining row labels. Video pairs stack on phones. Gallery panels share a track and aligned headings; hidden videos are inert and paused. Play/pause, restart, and enlargement use accessible icons and tooltips with 44 px touch targets. Both individual and group timelines remain seekable.

The 25 included PPT-embedded MP4s are byte-identical to their sources, preserving timing and speed labels. The full submitted overview is separate. Display viewports hide only previously verified blank borders and remain consistent between posters, playback, and enlargement. No clip was cut from the overview.

## Validation and rollback

Checked all referenced assets, 25 source MP4 hashes, unique anchors, seven tables, 24 real-world percentage cells, citation links, and experiment conditions. The density revision was checked at 320, 390, 768, and 1321 CSS pixels. The reading-order revision also checks moved navigation targets, overview-player focus, and content preservation. Verified paired playback, group seeking, icon state and accessible labels, video enlargement and focus restoration, and stable task-gallery height.

The compact 800 px reading column and visible result tables are preserved. This revision changes the explanatory order, retains all seven quantitative tables and all 26 video sources, and preserves existing deep links. The Video action now targets the overview player directly.

The numbered outline revision was checked at 320, 390, 768, and 931 CSS pixels, including current-subsection display, keyboard and hash navigation, history, and menu dismissal. The 931 px view retains the side outline with no document-level horizontal overflow. Narrow menus reveal the current item when opened. Seven tables retain their original values, all 26 video sources are unchanged, and existing deep links still resolve.

The full page's publication route is unchanged; the summary adds `/flowvla/abstract/`. Revert this revision and publish `main` to restore the baseline. Private research files and inspection reports stay outside the public repository.

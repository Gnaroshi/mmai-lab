# FlowVLA page structure and media

Baseline for the numbering and figure-restoration revision: `70530c6d8ad1f9d1a19a0a9dc055e885df8dbcf6`.

## Full page: reading order and evidence

Overview introduces the manipulation problem and 3D motion learning before the overview video. Method explains the concepts before the architecture, then shows VDPM reconstruction as the source of training targets. Simulation presents LIBERO, LIBERO-Plus, and data efficiency together. Real-world experiments state the robot, observations, training data, and evaluation protocol before the comparison gallery and its table. Setup and task families precede spatial variations, with additional π₀.₅ results closing the experiment section. Analysis follows the performance evidence: ablations, integrated motion selection and aggregation, TCP trajectories across tasks, then point composition. Citation closes the page.

Reconstruction examples share tabs; the integrated four-view visualization replaces the standalone point-selection gallery. Layout variation is part of the variation gallery. All quantitative tables use success rate (%) in the caption, compact rows, consistent precision, and source/evaluation notes. Comparative benchmark methods link to verified original papers, with venue/year beside each method name. The separate venue column and repeated FlowVLA conference labels are omitted. Ablation begins with the baseline and ends with FlowVLA.

Each table forms one bordered figure: a distinct title and metric at the top, values in the middle, and an attached footer for provenance and evaluation conditions. The footer says when a table is adapted from the paper and links its table number to the verified PDF page. LIBERO identifies both Paper Table 1 and the rebuttal, with the full Seer rows attributed to the latter. The additional π₀.₅ table identifies rebuttal experiments only. Tables 1–2 link to PDF page 6, Tables 3–4 to page 7, and Tables 5–6 to page 8. These presentation changes preserve every numeric value and comparison condition.

The [collaborator’s page](https://gojunhyeong.github.io/FlowVLA/) supplied original research images, checked against the submitted paper and rebuttal. Its `fig9_vdpm_fruit` and `fig10_vdpm_libero` correspond to paper Figures 8 and 9. Composition is from the rebuttal. The robot setup uses the native, unscaled JPEG embedded in the paper; the PDF placement had stretched it horizontally. Seven task-image tiles preserve their source proportions and place each category heading once above its group.

Author affiliations distinguish Ajou University and Samsung Electronics. The full Seer LIBERO rows and π₀.₅ real-world results identify their rebuttal source. The 84.8% object-point fraction is measured among the highest-weight 512 points across 100 examples, separate from the single illustrated example.

Paper Figure 2 restores the original 843×400 image with both panels: training data efficiency and training/inference cost. CSS arranges its two original panels side by side or stacks them on phones; enlargement opens the complete original figure. One shared caption identifies Seer on LIBERO-Long. The nearby note distinguishes policy training time from offline 3D reconstruction. Cost is presented as an experimental tradeoff, with no promotional badges.

## Default page and detailed results

The concise project page is the default `/flowvla/` route. The complete study lives at `/flowvla/full/`. The default preserves the complete LIBERO main comparison: 12 rows, all four task suites and Average, and both Seer and π₀.₅ variants. It uses the same verified table as the detailed page, including the explicit rebuttal provenance for Seer's full-suite rows. A three-row selected-results table no longer substitutes for the main comparison.

The default path is overview video, Abstract, Method and architecture, real-world demos, simulation and real-world results, then citation. The six-video gallery contains five task rollouts and one clearly labeled camera-viewpoint variation, all with Seer + FlowVLA. The result section retains the complete 12-row LIBERO comparison and seven-task real-world table. LIBERO-Plus remains a concise zero-shot result statement for both backbones with a direct link to its full table. Representative videos remain distinct from aggregate trial results. Each page retains a numbered current-location outline.

The former `/abstract/` route uses `location.replace` with query and hash preservation to reach the new default. Known anchors present only in the former full landing page redirect from the root to `/full/`, both on initial load and hash changes. Shared anchors such as `overview`, `method`, `libero`, and `citation` stay on the default. Unknown and malformed hashes are left alone. Relative paper, video, image, and stylesheet URLs resolve to the shared parent directory from `/full/`. Canonical and Open Graph URLs identify each route; BibTeX retains the canonical project root.

## Responsive layout and controls

The detailed page uses an 800 px reading column; the default page allows up to 960 px for the demo gallery and caps long prose at 800 px. Three-column result tables use a centered content-sized width, keeping task labels close to the values. Smaller figures retain smaller widths. Figure captions have a shared background and boundary directly attached to their image. Clickable images open an enlargement dialog; redundant enlargement text links are removed. The setup photo shares a compact row with labeled robot, gripper, and camera specifications; the photo scales down at narrow widths.

Table titles use 15 px text on desktop and 14 px on phones; metrics, source labels, and evaluation notes use 13 px. Research figure captions use 14 px on desktop and 13 px on phones. Title, unit, and source remain distinct without reducing evaluation conditions to tiny footnotes.

The full page numbers sections 1–6 and subsections 2-a through 5-d, using the same identifiers in the headings and both navigation surfaces. At 900 CSS pixels and above, a right-side outline sits outside a fluid reading column capped at 800 px. Below that breakpoint, a persistent Contents bar displays the active subsection and opens the complete hierarchy. The desktop outline expands the current section’s children; scrolling, direct links, and keyboard navigation update the active destination. Both pages have a back-to-top control that appears after scrolling down. Wide benchmark tables scroll internally while retaining row labels. Video pairs stack on phones. Gallery panels share a track and aligned headings; hidden videos are inert and paused. Play/pause, restart, and enlargement use accessible icons and tooltips with 44 px touch targets. Both individual and group timelines remain seekable.

The 25 included PPT-embedded MP4s are byte-identical to their sources, preserving timing and speed labels. The full submitted overview is separate. Display viewports hide only previously verified blank borders and remain consistent between posters, playback, and enlargement. The individual demos were not cut from the overview. A separate default-page overview removes only the opening 343 slide: 74 frames (3.086417 seconds), cut losslessly at a verified I-frame. Its 3,722 retained frames exactly match the source; the original overview is preserved on the detailed page.

## Validation and rollback

Checked all referenced assets, 25 source MP4 hashes, unique anchors, seven tables, 24 real-world percentage cells, citation links, and experiment conditions. The density revision was checked at 320, 390, 768, and 1321 CSS pixels. The reading-order revision also checks moved navigation targets, overview-player focus, and content preservation. Verified paired playback, group seeking, icon state and accessible labels, video enlargement and focus restoration, and stable task-gallery height.

The compact 800 px reading column and visible result tables are preserved. This revision changes the explanatory order, retains all seven quantitative tables and all 26 video sources, and preserves existing deep links. The Video action now targets the overview player directly.

The numbered outline revision was checked at 320, 390, 768, and 931 CSS pixels, including current-subsection display, keyboard and hash navigation, history, and menu dismissal. The 931 px view retains the side outline with no document-level horizontal overflow. Narrow menus reveal the current item when opened. Seven tables retain their original values, all 26 video sources are unchanged, and existing deep links still resolve.

## Default-route migration (2026-10-02)

Baseline: `8e350e78fc3891aa6c62f5b9ce2bf29d2b973012` on `main`. The route migration is published atomically with the concise default, the complete detailed page, and both compatibility paths. No user action or data migration is required. The detailed page retains all seven table contents and all 26 media sources; the default contains the complete 12-row main table and its three original video sources.

Applied guidance: shared canonical evidence, preservation of main comparison evidence in concise views, responsive tables and current-location navigation, stable deep-link compatibility. Existing GitHub Pages hosting and approved visual styling are retained. Unrelated application/distribution rules do not apply to this static site.

Validation covers static asset/fragment resolution, exact detailed table/media preservation, initial and same-document legacy hashes, query/hash preservation through `/abstract/`, route canonical metadata, mobile internal table scrolling, and 320/768/1280 CSS-pixel layouts. Revert this revision and publish `main` to restore the previous root/full-summary routing; original assets and result data are unchanged. Private research files and inspection reports stay outside the public repository.


## Compact video-first default (2026-10-03)

Baseline: `262e3338c555e06704d91a6d31d1f1057727107b`. The collaborator feedback and [CAST project page](https://cast-vla.github.io/) motivate the compact media gallery and demos-before-results sequence. The explicit requested order controls the page; CAST styling, carousel mechanics, and scientific content are not copied. The previous [Spatial Forcing reference](https://spatial-forcing.github.io/) remains background for the concise/full split.

The default displays three demo cards per row at 1100 px and above, two from 600–1099 px, and one below 600 px. The right-side outline remains available from 900 px; smaller screens keep the current subsection in a Contents bar. Cards narrower than 280 px place the seek control on its own row so all icon buttons retain 44 px targets. The removed default `#motion` anchor redirects to `/full/#tcp-trajectories`.

Validation: both result tables match canonical values; all six demo sources match their original MP4 hashes; the detailed page is byte-identical to baseline. Checked 320, 390, 931, 1100, and 1280 px layouts, seven video playbacks, seek/enlarge/close, current-location updates, mobile menu Enter/Escape, internal table scrolling, and query/hash preservation through old routes. Roll back this revision to restore the previous default; original media and the detailed page remain unchanged.

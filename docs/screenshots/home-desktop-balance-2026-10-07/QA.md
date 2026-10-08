# Home — desktop balance and image changes · QA (2026-10-07)

Record: `docs/home-buyer-system-preview.md` §15.

- **Build.** Isolated local production build (`next build` + `next start`), Google Chrome through Playwright.
- **Before:** `main` at `6a45a66`. **After:** this branch.
- **Captures:** 375 px and 1440 px, as JPEG.
  - `*-full.jpg`: whole page under reduced motion, so every thread segment is drawn and the hero shows its poster.
  - The other captures are live viewport captures after scrolling to each section.

## Files

| File                               | What it shows                                                     |
| ---------------------------------- | ----------------------------------------------------------------- |
| `before-375-full.jpg` / `after-…`  | Whole Home, phone                                                 |
| `before-1440-full.jpg` / `after-…` | Whole Home, desktop                                               |
| `*-top.jpg`                        | Hero                                                              |
| `*-about.jpg`                      | "Who I am"                                                        |
| `*-chapter-property-purchase.jpg`  | Chapter 01, Property Purchase                                     |
| `*-banner-03.jpg`                  | Service banner with state 03 (fees and taxes) selected            |
| `*-sarah.jpg`                      | Team block                                                        |
| `after-{375,1440}-banner-03.jpg`   | Element capture: the banner card in state 03                      |
| `after-{375,1440}-pp-media.jpg`    | Element capture: the Property Purchase image                      |
| `after-{375,1440}-team-media.jpg`  | Element capture: the Team portrait                                |
| `before-qa.json` / `after-qa.json` | Measurements: content edges, images, duplicates, overlaps, errors |

## Results

| Check                                       | 375                                    | 1280         | 1440            |
| ------------------------------------------- | -------------------------------------- | ------------ | --------------- |
| Content left edge, before → after           | 24 → 24                                | 48 → 48      | **120 → 80**    |
| Content width, before → after               | 327 → 327                              | 1184 → 1184  | **1200 → 1280** |
| Horizontal overflow                         | 0                                      | 0            | 0               |
| H1 count                                    | 1                                      | 1            | 1               |
| `noindex, nofollow` (meta + `X-Robots-Tag`) | yes                                    | yes          | yes             |
| Console errors / failed requests            | 0 / 0                                  | 0 / 0        | 0 / 0           |
| Property Purchase image                     | `advisor-client-one.webp`, loaded, 3:2 | loaded, 16:9 | loaded, 16:9    |
| Team image                                  | `sarah-confianza.webp`, loaded         | loaded       | loaded          |
| Banner state 03 image                       | `sarah-home-desk.webp`, loaded         | loaded       | loaded          |
| Duplicate images (default / with state 03)  | none / none                            | none / none  | none / none     |
| Text overlapping the PP or Team image       | none                                   | none         | none            |

- **Alt text** is the registry's for every image.
- **People.** The element captures show no person cut: both heads, the documents and the hands in Property Purchase; Sarah's full portrait in Team; hair and hands in banner state 03.
- **Label.** The banner's "Editorial illustration" label sits at the lower left of the state 03 image, over the desk, not over her face.

**Not measured:** Lighthouse / Core Web Vitals, Safari, Firefox, real phones.

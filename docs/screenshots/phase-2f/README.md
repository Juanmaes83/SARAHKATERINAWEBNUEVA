# Phase 2F evidence — territory map film and fabric banner

Captured 2026-09-24 from the production build (`next build` + `next start`),
Playwright Chromium with SwiftShader WebGL, `deviceScaleFactor` 1 unless noted.
Decisions and limits: `docs/phase-2f-territory-map-and-banners.md`.

| Folder           | What it shows                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compare/`       | Before (main) and after, side by side: Investment asset types band and Property Purchase cases band, at 1440 and 375 px.                                                  |
| `full/`          | Full pages of the two modified routes, before and after, 375 and 1440 px (segment-stitched, header made static).                                                          |
| `map/`           | The map film playing, and resting on its final frame, at 1440 (wide cut) and 375 (tall cut).                                                                              |
| `banner/`        | The fabric banner at rest, with its video playing, stretched (two moments of one drag), recovering 250 ms after release, and settled; plus a 375 px touch drag (DPR 2).   |
| `fallbacks/`     | Reduced motion, no WebGL, JavaScript disabled, keyboard (tab list and banner tug), 200 % zoom and a slow network, with `fallbacks.json`.                                  |
| `video/`         | Screen recordings: `map-film.mp4` (plays once, rests on the legend) and `fabric-banner.mp4` (three drags with the video running inside the fold, then two voice changes). |
| `qa-report.json` | Sweep of all four routes: no-JS, reduced motion, fast scroll, anchor jumps, keyboard, menu, FAQ, overflow at 320/390/768/1024.                                            |

Measured in the same run:

- the banner's video advanced 5.18 s → 5.96 s during a held stretch;
- 375 px touch: a vertical swipe on the banner scrolled the page by 225 px
  without grabbing; a sideways drag grabbed without scrolling;
- horizontal overflow 0 at every width, including 200 % zoom;
- no page errors.

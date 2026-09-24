# Phase 2F evidence — approved images and scroll hero video

Captured 2026-09-24 from the production build (`next build` + `next start`)
in Google Chrome 153 via Playwright (H.264 support). Record:
`docs/phase-2f-images-and-scroll-hero-implementation.md`.

| Path                                                                | What it shows                                                                                                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `investment/full-page-{1440,390}.jpg`                               | Full page (segment-stitched, header made static; captured under reduced motion so the static layout reads without the hero hold)         |
| `investment/hero-{1440,390}-{initial,middle,final,back-to-top}.jpg` | The scroll hero at first frame, mid scrub, final frame, and after scrolling back up                                                      |
| `investment/cases-{1440,390}.jpg`                                   | The three case artworks, desktop and mobile                                                                                              |
| `investment/enlarge-dialog-{1440,390}.jpg`                          | The full-size dialog opened from the keyboard                                                                                            |
| `property-purchase/…`                                               | Same set, plus `avoided-mistakes-{1440,390}.jpg` and `one-file-{1440,390}.jpg`                                                           |
| `tax-advisory/…`                                                    | Full pages and hero states                                                                                                               |
| `team/hero-{1440,390}.jpg`, `team/full-page-*.jpg`                  | Team regression: pixel-compared with a `main` build — identical at 390, JPEG noise only at 1440                                          |
| `recordings/scrub-*.mp4`                                            | Screen recordings: slow scroll down to the final frame, then back up to the first (desktop 1280 for all three; phone 390 for Investment) |
| `recordings/scrub-*-sequence.jpg`                                   | The same recordings as 12-frame sequences, read left to right, top to bottom                                                             |
| `responsive/*-hero-{320,768,1024,1280}.jpg`                         | Hero at the other target widths                                                                                                          |
| `fallbacks/*`                                                       | Reduced motion (final poster), JavaScript off (final poster), video failed (final poster over the frame)                                 |
| `data/*.json`                                                       | Raw measurements: scrub curves, QA, performance, dialog and image ratios                                                                 |

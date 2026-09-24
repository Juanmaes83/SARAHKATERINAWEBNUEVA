# Phase 2F — implementation record: approved images and scroll hero video

Implements `docs/phase-2f-approved-images-and-scroll-hero-video.md` (the
brief, the source of truth). Branch `feat/phase-2f-approved-images-scroll-hero`
from `main` at `33052bc`. Preview only: no merge, no production.

## 1. Sources, verified before derivation (brief §3)

All ten sources exist on `main`. Originals are untouched (the phase tests hash
them). The source MP4s carry an AAC track; no derivative does.

| Source                                                                            | Size (bytes) | Dimensions |              Duration | Codecs             | SHA-256                                                            |
| --------------------------------------------------------------------------------- | -----------: | ---------- | --------------------: | ------------------ | ------------------------------------------------------------------ |
| `IMAGES/MEJORAS 23 OCTUBRE/Investment Refurbished villa.png`                      |    2,549,047 | 1672×941   |                     — | PNG RGB            | `cb109107f2b869be9676a16288eba80965d617cd09dd67e7fae358365c33e87f` |
| `IMAGES/MEJORAS 23 OCTUBRE/Investment Apartment for letting.png`                  |    2,394,598 | 1672×941   |                     — | PNG RGB            | `a420f8a056b048068e3da14f8a74520080374492eaa82cb93f23e557f4b0f915` |
| `IMAGES/MEJORAS 23 OCTUBRE/Investment Land with development.png`                  |    7,738,039 | 2688×1520  |                     — | PNG RGB            | `9e79c9aced7bd0db57a8b8d0f3b8a182758585e7f29fb817c370475c0fb86420` |
| `IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Fiscal exposure identified.png`      |    2,728,516 | 1448×1086  |                     — | PNG RGB            | `5dbac0b3761784898c3fbb773f19ecd08469240f7cfc4bb99be57c9311dd88c5` |
| `IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Problematic clause renegotiated.png` |    6,349,910 | 2688×1520  |                     — | PNG RGB            | `7c7f01baccf3b470ffe55336556e57142516068b0cb11c43568869f9e4ec7264` |
| `IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Remote purchase completed.png`       |    5,664,381 | 2688×1520  |                     — | PNG RGB            | `544b3d23a1f1e4fb425d9132254d16a588c2864464077be7b828f048938182b3` |
| `IMAGES/MEJORAS 23 OCTUBRE/One file. From viewing to keys.png`                    |    6,720,068 | 2688×1520  |                     — | PNG RGB            | `d5e0dbc2d1d24c90a04ead1c453bbbdb42bfd1f08e119cb8f232929c83f33687` |
| `VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4`                                          |    8,486,190 | 1280×720   |                5.05 s | H.264 24 fps + AAC | `466a498b5e41bbe75562dad788b62763143f332411f3085eda9386eda0540f2e` |
| `VIDEOS/SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4`                        |    8,886,836 | 1280×720   |               10.04 s | H.264 24 fps + AAC | `cc4cad5a6136857b8cf59158adaa14a68bcb86b26d33ec2a63887815bd35529c` |
| `VIDEOS/BIENES RACIES QUE CRECEN.mp4`                                             |    4,289,813 | 1280×720   | 10.08 s (video 10.04) | H.264 24 fps + AAC | `9729ed6043af3f52dc73fca86d41371b90d3491de27935fd4a39db940a62cd49` |

`BIENES RACIES QUE CRECEN.mp4` keeps its exact name. The sources have almost no
keyframes (one in the map and tax clips), so they could not be scrubbed as
they are; every derivative is re-encoded for seeking.

## 2. Images → derivative → component → route → slot

Derivatives are made through the existing pipeline: a resized web WebP in
`public/media/` (listed in `public/media/manifest.json`), then
`node scripts/grade-media.mjs` writes the graded copy (`sk-editorial-v1`) and
`public/media/graded/manifest.json`. No crop anywhere: each figure takes the
image's own ratio, so no panel, label, face, key or document is cut.

| Source                                                | Derivative (served)                               | Size     | Bytes (graded / web) | Component                                              | Route                        | Slot                                                           |
| ----------------------------------------------------- | ------------------------------------------------- | -------- | -------------------: | ------------------------------------------------------ | ---------------------------- | -------------------------------------------------------------- |
| Investment Refurbished villa.png                      | `/media/graded/case-refurbished-villa.webp`       | 1600×900 |    248,094 / 257,318 | `WebBands.tsx` `CasesBand` → `ArtworkFigure`           | `/preview/investment`        | Case studies · 01 Refurbished villa                            |
| Investment Apartment for letting.png                  | `/media/graded/case-apartment-letting.webp`       | 1600×900 |    201,474 / 215,644 | same                                                   | `/preview/investment`        | Case studies · 02 Apartment for letting                        |
| Investment Land with development.png                  | `/media/graded/case-land-development.webp`        | 1200×679 |    238,004 / 244,918 | same                                                   | `/preview/investment`        | Case studies · 03 Land with development                        |
| Property Purchase Fiscal exposure identified.png      | `/media/graded/purchase-fiscal-exposure.webp`     | 1200×900 |    255,198 / 262,370 | `PropertyPurchase.tsx` `CasesBand` → `ArtworkFigure`   | `/preview/property-purchase` | Three avoided mistakes · Fiscal exposure identified            |
| Property Purchase Problematic clause renegotiated.png | `/media/graded/purchase-clause-renegotiated.webp` | 1600×905 |    157,138 / 166,134 | same                                                   | `/preview/property-purchase` | · Problematic clause renegotiated                              |
| Property Purchase Remote purchase completed.png       | `/media/graded/purchase-remote-completed.webp`    | 1600×905 |    132,734 / 142,350 | same                                                   | `/preview/property-purchase` | · Remote purchase completed                                    |
| One file. From viewing to keys.png                    | `/media/graded/purchase-one-file.webp`            | 1600×905 |    143,312 / 157,092 | `PropertyPurchase.tsx` `OneFileBand` → `ArtworkFigure` | `/preview/property-purchase` | One file. From viewing to keys (replaces the drawn still life) |

Width choice: 1600 px where the graded file fits the repository's 250 KB
budget; 1200 px for the land and fiscal infographics, the only two that did
not (366 KB and 327 KB at 1600, 257 KB and 270 KB at 1280). At 1200 px the
land panel's smallest line ("Recommended reserve 15%") was checked legible at
2× zoom. No budget exception was needed.

Registry: `lib/media/approved-media.ts`, seven entries with source path and
SHA, derivative paths, dimensions, alt text, embedded text, `illustrative:
true` and a provenance note. Alt text starts "Illustrative …", describes what
is visible and never identifies anyone. `PENDING_MEDIA_SLOTS` drops the two
case slots and records the Team hero exception.

### Presentation (`components/web/ArtworkFigure.tsx`)

- The image at its own ratio, `object-fit: contain`, nothing laid over it:
  the artworks' own corners carry text ("Illustrative analysis", "All data
  indicative").
- Below it, in HTML: the evidence note (_Illustrative analysis · not a client
  case_, _Illustrative · not a client case_, _Illustrative · sample documents,
  not genuine ones_) and a "View full size" button.
- The button opens a native modal `<dialog>`: focus moves to Close, Escape and
  the backdrop close it, focus returns to the button. On phones the image is
  shown 70vh tall and scrolls sideways, with a one-line hint. The large image
  is lazy and only fetched when the dialog opens. Nothing relies on hover.
- Layout: the Investment case ledger gives the artwork the wide column
  (1.35fr) from 1024px and stacks below; the former 280px thumbnail made the
  overlays unreadable. Property Purchase shows one avoided mistake per row,
  artwork beside the unchanged card copy. The case numbers moved off the
  artwork into the text column.
- Every existing evidence state stays: "Location pending", "Result withheld
  pending client permission and verification", "Case slot - permission
  required", "Result withheld", "Awaiting client permission".

## 3. Videos → derivatives → poster → component → route

H.264 High, yuv420p, `+faststart`, **no audio track**, `-g 6 -bf 0` (a
keyframe every 0.25 s, no B-frames: any seek decodes at most five frames).

| Source                                            | Desktop derivative (≥768px)                                                                                                           | Mobile derivative (<768px)                                                                                                                    | Posters (start / end)                                | Component                             | Route                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------- | ---------------------------- |
| MAPA CIUDADES OPORTUNIDADES.mp4                   | `/media/hero/investment-territory-desktop.mp4` — 1208×720, 5.04 s, 3,635,360 B, CRF 22, crop from x=72 (removes a duplicated compass) | `/media/hero/investment-territory-mobile.mp4` — 560×720, 5.04 s, 1,591,227 B, portrait window from x=440 keeping all six labels and the panel | desktop 84,842 / 104,592 B; mobile 31,442 / 46,646 B | `WebHero.tsx`                         | `/preview/investment`        |
| SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4 | `/media/hero/purchase-buyer-side-desktop.mp4` — 1280×720, 10.04 s, 3,369,887 B, CRF 22                                                | `/media/hero/purchase-buyer-side-mobile.mp4` — 960×540, 10.04 s, 1,921,968 B, CRF 23                                                          | desktop 42,594 / 38,496 B; mobile 29,046 / 26,248 B  | `PropertyPurchase.tsx` `PurchaseHero` | `/preview/property-purchase` |
| BIENES RACIES QUE CRECEN.mp4                      | `/media/hero/tax-ownership-costs-desktop.mp4` — 1280×720, 10.04 s, 3,908,866 B, CRF 26                                                | `/media/hero/tax-ownership-costs-mobile.mp4` — 854×480, 10.04 s, 1,895,065 B, CRF 27                                                          | desktop 71,182 / 83,116 B; mobile 41,192 / 44,314 B  | `TaxHero.tsx`                         | `/preview/tax-advisory`      |

Weight targets (desktop 2–4 MB, mobile 1–2 MB) are met. The tax clip is dense
foliage: at CRF 22 it was 5.9 MB desktop / 3.3 MB mobile, so it uses CRF 26 /
854×480 CRF 27; its labels were checked legible. Posters are the clip's own
frames and weigh 26–105 KB, under the 100–250 KB guide, with no visible loss.

Registry: `lib/media/hero-video.ts` (`HERO_VIDEO`), with source path, full
source SHA, both cuts, byte sizes, posters, duration, poster alt text and a
provenance note. Team has no entry.

## 4. The scroll interaction (`components/motion/ScrubVideo.tsx`)

A motion primitive beside `RevealOnScroll`; no animation library.

- **Never plays.** `currentTime` follows scroll: forwards down, backwards up,
  clamped to the first and last frames.
- **Desktop (≥1024px), held.** `ScrubStage` wraps the hero; a CSS-only
  runway (a 60vh `::after` block inside the stage) keeps the hero sticky
  while the video scrubs across it, then the page scrolls on. The sticky
  offset sits under the sticky header when the hero fits the viewport,
  otherwise bottom-aligned so the whole visual stays in view. Nothing traps:
  every wheel step moves either the video or the page. Measured at 1440×900:
  the Investment frame holds at the same position for 540px of scroll while
  the video runs 0 → 5.04 s.
- **Tablet and phone, passing.** No runway. The video scrubs while its frame
  travels from 90% to 15% of the viewport height, so the distance follows
  the phone's own screen, not the desktop runway.
- **Work.** A passive scroll listener attached only while the hero's stage
  intersects the viewport; one `requestAnimationFrame` per burst; seeks are
  coalesced (a new seek waits for `seeked`), so fast scrolling never queues.
- **Loading.** No `src` in the server markup. The route's own cut (desktop or
  mobile, by media query) is attached after the window `load` event, so it
  never competes with the poster (the LCP). Crossing the phone breakpoint
  swaps the cut. Unmounting detaches it and releases the decoder.
- **Posters.** A `<picture>`: the first frame when the scrub will run
  (`prefers-reduced-motion: no-preference` and `scripting: enabled`), so the
  swap to video is invisible; otherwise the final, representative frame. One
  file is fetched. The video fades in only after its first seek lands.
- **Failure.** A media error lays the final poster over the frame and the
  stage releases its runway; the page scrolls normally.
- **Reduced motion.** Nothing loads, nothing moves, no runway: the final
  poster. **No JavaScript**: the same, via `(scripting: enabled)`.
- The video is `aria-hidden`, `tabIndex={-1}`, muted, inline, with no
  controls; the poster carries alt text; H1, lead and CTAs stay HTML.

### Hero composition changes

- **Investment.** The frame takes the footage's own ratio. The location line
  moves above the frame and the snapshot card sits below it (it used to
  overlap the photograph), so no map label or mark is covered.
- **Property Purchase.** The video replaces the photograph in the same file
  card; the navy note still closes it. Its caption described the former key
  handover and called the other person "an international buyer"; it now
  reads _Sarah at the head of the table, on the buyer's side of the purchase._
  (proposal) and identifies no one else.
- **Tax Advisory.** The video replaces the photograph under the existing meta
  row; no chip is laid over the footage. The "Intro video in production" chip
  stays: it refers to the template's separate one-minute explainer.
- **Team.** Unchanged (brief §6.5).

## 5. Verification (local production build, 2026-09-24)

Browser: Google Chrome 153 through Playwright (Playwright's bundled
Chromium cannot decode H.264).

| Check                                   | Result                                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Scroll down / up, 3 heroes × 1440 & 390 | `currentTime` monotonic both ways; 0 at top; last frame reached with the frame on screen; back to 0 after rapid scroll               |
| Requests                                | Each page requests only its own cut (desktop or mobile); Team requests none                                                          |
| Delayed metadata (+4 s)                 | First-frame poster holds, then `ready`                                                                                               |
| Failed video (aborted)                  | `failed`: final poster over the frame, runway released                                                                               |
| Reduced motion                          | Final poster, no runway, 0 video requests                                                                                            |
| JavaScript disabled                     | Final poster (mobile cut on phones), CTAs present, no overflow                                                                       |
| Keyboard                                | Skip link first; the video is never a tab stop; 2px solid focus ring; menu opens and closes with Escape; hero CTA receives the click |
| Console                                 | No errors, no hydration warnings                                                                                                     |
| Overflow                                | 0 at 320, 375, 390, 768, 1024, 1280, 1440 on all four routes                                                                         |
| LCP (desktop, local)                    | The poster, ~310–325 ms                                                                                                              |
| LCP (390px, 4G-like, 4× CPU)            | The hero lead text, ~1.5–1.6 s; the video loads after `load`                                                                         |
| CLS                                     | 0.0005–0.0086 (Team, unchanged: 0.0139)                                                                                              |
| Team regression                         | Full page vs a `main` build, same capture: 390px identical (max diff 0); 1440px max diff 21/255, no pixel above 24 (JPEG noise)      |
| Enlarge dialog                          | Opens on Enter, focus on Close, Escape closes, focus back on the button (1440 and 390)                                               |
| Image ratios                            | Rendered ratio within 0.005 of the natural ratio for all seven                                                                       |

Evidence: `docs/screenshots/phase-2f-images-scroll-hero/`.

## 6. Open risks

- **Provenance and rights.** All seven images and three videos are generated
  editorial media; generation method, model release and rights are not
  recorded in the repository. Confirm before production.
- **Baked-in figures.** The land image shows indicative areas, percentages,
  permit timings and "Recommended reserve 15%" (footnote: "All data
  indicative"). The clause and One File images show generated sample
  documents; one has sample amounts in dollars. None is reproduced in HTML,
  and each figure is labelled illustrative, but the figures are visible.
- **Footage text.** The tax clip's labels contain generation typos
  ("Ondoing", "Prlimperty"); the map panel covers the end of the
  "Alicante / Alacant" label. Both are baked in.
- **Open PRs overlapping this work.** PR #24 replaces the Property Purchase
  case band with a fabric banner and uses the same map video in the Asset
  types band; PR #23 appends to the same registry and manifests. Merging
  either after this one needs a manual reconciliation of `CasesBand`,
  `approved-media.ts`, the manifests and the tests, and PR #24's map would
  then duplicate this hero's video.
- Verified in Chrome desktop and emulated phones only; Safari/iOS and
  Android devices need the human pass on the Preview.

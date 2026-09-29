# Phase 2F — Territory map film and fabric banner

Branch `feat/phase-2f-territory-map-banners`, brief 2026-09-23. Preview only:
nothing here is approved for publication or production.

## 1. What the two resources really are

### `VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4`

- 5.05 s, 1280×720, 24 fps, H.264 at ~13 Mb/s (8.1 MB), AAC stereo music bed
  (mean −30.6 dB). Landscape.
- A generated relief map of the Costa Blanca with six town labels (Altea,
  Calpe/Calp, Benidorm, Alicante/Alacant, Torrevieja, Orihuela Costa). From
  about 0.6 s a navy panel fades in listing **four asset types** —
  Residential, Land, Commercial, Redevelopment — and the Sarah Katerina mark;
  the camera drifts slightly throughout.
- The "four options" are therefore the four asset types of the Investment
  landing's asset band, not four services.
- Defects: a second, duplicated compass rose sits in the top-left corner for
  the whole clip; the panel covers the end of the "ALICANTE / ALACANT" label;
  the panel's Redevelopment line ("Properties ready for a smarter new life")
  differs from the site's copy. The last two are baked in and are recorded as
  pending.

### `BANDEROLAS DINÁMICAS/index (10–15).html`

Six byte-identical copies (md5 `76c1d27e…`) of one prototype:

- a Verlet cloth pinned along its top row (structural, shear and bend
  constraints, 18–36 relaxation passes), lit with a single diffuse term;
- a 2D canvas composition (image, text, logo; a video element type exists but
  the pack carries none) redrawn and re-uploaded as a texture every 33 ms;
- grab the nearest particle, drag it toward the camera, release; double-click
  rebuilds the cloth.

As a page component it fails several site rules: `touch-action: none` on the
whole surface (blocks scrolling), global `mousemove`/`touchmove` listeners
that `preventDefault`, an endless `requestAnimationFrame` loop, no reduced
motion, no fallback, no WebGL-loss handling, embedded placeholder assets, and
seller-side copy ("Revaloramos tu inmueble", "Tasación gratuita en 24 h",
"Plan de venta"), which contradicts the buyer-side position and is not used
anywhere.

### `MAPA TORREVIEJA.png` (not in the repository; found in the owner's Downloads)

1122×1402 isometric diorama of Torrevieja headed "WINTER CITY COLLECTION ·
TORREVIEJA · ALICANTE / SPAIN". **Kept as reference, not published**:

- its header reads as a third-party poster series, with no provenance
  recorded;
- it singles out one town, which the site would read as a preferred market;
- it cannot serve as the video's poster: different place, scale and ratio,
  so the swap from poster to clip would jump.

To use it, the owner needs to confirm its origin and rights and decide
whether one town may be featured; the header would have to be cropped.

## 2. Decisions per page

| Page                         | Map film                             | Fabric banner                                     | Why                                                                                                                                                                                                                        |
| ---------------------------- | ------------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/preview/investment`        | **Yes** — leads the Asset types band | No                                                | The clip's four options are exactly this band's four asset types. Placed between the band header and the four cards, it reads place → asset → analysis → decision; the cards below then read as the analysis of each kind. |
| `/preview/property-purchase` | No                                   | **Yes** — replaces the three schematic case cards | "Three purchases. Three avoided mistakes." is where a buyer's voice belongs. One banner, three slots (the three case topics), so voice and case arrive together.                                                           |
| `/preview/tax-advisory`      | No                                   | No                                                | The map adds nothing to a tax narrative; a second pending proof section would only repeat Property Purchase.                                                                                                               |
| `/preview/team`              | No                                   | No                                                | Team is Sarah's profile; unverified proof beside a person weakens it. The shared component can be placed there once a real voice exists.                                                                                   |

The map appears once; repeating it would duplicate the same five seconds with
no new context. The banner is built as a shared component
(`BuyerVoices` + `FabricBanner`) keyed by service, so Investment or Tax can
adopt it when a voice for that service is cleared.

## 3. The map film

`components/web/TerritoryMapFilm.tsx`, video registry `lib/media/approved-video.ts`.

- **Cuts.** Wide 1208×720 (crop from x=72, removes the duplicated compass)
  from 768 px; tall 560×720 (x=440) below it, which keeps all six labels and
  makes the panel legible on a phone. WebM VP9 first, MP4 H.264 fallback,
  silent, `faststart`. Sizes: wide 446 KB / 783 KB, tall 275 KB / 390 KB.
- **Plays once.** Fetched one viewport ahead (`preload="none"` until then),
  swapped in on its first decoded frame off-screen, played when the frame
  reaches the site's reading line, then rests on its final frame. No loop.
  Replay / Pause control, labelled.
- **The static state is the final frame** (poster, with the full alt
  description). No JS, reduced motion, refused autoplay or a slow network all
  show the complete information. Reduced motion never autoplays.
- Leaving the tab pauses; returning resumes.
- Caption: four steps (place, asset, analysis, decision) and a disclaimer:
  _illustrative relief map, not official cartography … not properties for
  sale, and not a forecast._ All `proposal` claims. No town is named in
  copy (the reference-capture rule forbids Altea/Calpe); the alt text
  describes the labels the video visibly shows.

## 4. The fabric banner

`components/web/banner/{fabric.ts, paint.ts, FabricBanner.tsx}`,
`components/web/BuyerVoices.tsx`, content `content/en/buyer-voices.ts`.

- **One layout, two states.** The banner is accessible HTML (photo, video
  window, type, mark) laid out by the site's CSS and tokens. That is the
  fallback. When motion and WebGL are available, `paint.ts` repaints that
  exact layout — word by word, at the positions the browser gave them — onto
  a texture, and the cloth is placed so that at rest it covers the HTML pixel
  for pixel. The HTML stays in the document, transparent, for assistive
  technology.
- **Video inside the fabric.** The video is a second texture sampled inside
  the cloth's fragment shader through a UV window, so it deforms with every
  fold and cannot separate or stop. Frames are uploaded only when the video
  time moves.
- **Physics.** 20×25 Verlet cloth pinned to a rod, 14 passes. While held the
  constraints soften (the fabric stretches) and shape memory drops (it follows
  as a whole); on release both recover over about a second, so it swings and
  settles instead of snapping. A wall plane stops folds from passing behind,
  and a three-pass soft shadow, tinted from `--sk-web-navy`, lengthens as the
  cloth lifts.
- **Input.** Mouse and trackpad: drag anywhere; double-click smooths.
  Touch: `touch-action: pan-y` — a vertical swipe scrolls the page, a
  sideways drag takes the cloth. Keyboard: the banner is one tab stop, arrow
  keys tug it and R settles it. The voice list is a WAI-ARIA tab list.
  "Pause motion and video" stops both (WCAG 2.2.2).
- **Cost.** The engine (4.3 kB gzip) and painter (1.5 kB gzip) are separate
  chunks loaded only when the band nears the viewport. The loop runs only
  while the banner is on screen, the tab is visible and the reader has not
  paused it. No global listeners. The canvas overhangs its stage so a pulled
  corner is not cut; the section clips it horizontally, so the page never
  widens.
- **Fallbacks.** Reduced motion → static composition, video paused until
  asked. No WebGL or lost context → static composition with the video
  playing. No JS → static composition plus a plain list of all slots.

### 4.1 Shared stage (2026-09-29)

To let the Home's "What brings you to Spain?" banner hang the same cloth, the
engine lifecycle, input, fallback and cost rules above were moved **verbatim**
from `FabricBanner.tsx` into `components/web/banner/FabricStage.tsx`, which
takes any composition as children. `fabric.ts` and `paint.ts` were not
changed. `FabricBanner.tsx` is now only the Buyer Voices composition on that
stage (same DOM, classes, gust per slot, video and pause control), so Buyer
Voices renders and behaves as before; the "composition hides under the live
cloth" rule is keyed on `[data-fabric-surface]` instead of the testimonial
class. `FabricStage` gained one opt-in prop, `settleAfterMs`, used only by the
Home: there the cloth runs for 2.6 s after a gust, a grab or a key and then
holds still. Buyer Voices does not set it. `tests/territory-map-banners.test.ts`
now checks the safety rules on the stage and that Buyer Voices still uses it.
Record: `docs/home-buyer-system-preview.md` §0.3.

## 5. Testimonials: status and what is missing

No approved testimonial exists in this repository or in the governed
sources (AGENTS.md §2, claims matrix §9: "Three permission-gated case
slots"). The three slots are `pending`, render the words _Preview · content
pending_, a placeholder line instead of a quote, "Name, country and date
withheld", and an image tagged _Editorial image · not the buyer_. The video
window shows a territory loop labelled as a placeholder.

Required per voice before it can leave Preview (also shown in the band):

1. the buyer's written consent to publish their words, and in which name form;
2. the final quote, approved by the buyer in its exact wording and language;
3. an image or video release for any recording or photograph of the buyer;
4. the country or context the buyer agrees to disclose;
5. the service and date, checked against the engagement record;
6. legal, tax and financial review of anything the quote states as an outcome;
7. a recorded withdrawal route and retention period for the consent.

## 6. Governance changes in tests

- `approved-media.test.ts` held every video slot empty (inventory item 8).
  This brief places video, so the rule now allows only videos registered in
  `approved-video.ts`, rendered by the two components that own them.
- New `tests/territory-map-banners.test.ts`: registry, derivatives present
  and silent, originals and the six prototypes byte-identical, nothing served
  from `VIDEOS/`/`IMAGES/`/`BANDEROLAS/`, map placement and single use, no
  loop or autoplay under reduced motion, disclaimer, pending-only voices,
  voices ↔ case topics, requirements blocked, no seller copy anywhere, engine
  loaded on demand, `pan-y` and no `touch-action: none`, fallbacks, and the
  horizontal clip.

## 7. Known limitations

- Images: every approved photograph carries baked-in branding; three of them
  misspell "system" as "sistem". The banner uses the three whose text stays
  whole and correct beside the video window.
- Without JavaScript, the banner's video window shows the browser's native
  loading frame rather than the poster.
- Headless validation used SwiftShader (software WebGL). Real GPUs, iOS
  Safari and Android Chrome still need a human pass on the Preview.
- First-load JS for Tax and Team rose about 5 kB from shared-chunk
  re-splitting (`next/image`, reveal helpers), not from new code on those
  pages.

Evidence: `docs/screenshots/phase-2f/` (see its README).

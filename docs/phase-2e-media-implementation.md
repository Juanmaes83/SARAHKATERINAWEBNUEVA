# Phase 2E — Approved media implementation

**Status:** IMPLEMENTED IN PREVIEW · NOT APPROVED FOR PRODUCTION
**Date:** 2026-09-22
**Branch:** `feat/phase-2e-media-implementation-2026-09-22`
**Routes:** `/preview/investment`, `/preview/tax-advisory`, `/preview/property-purchase`

Implements items 1–8 of the approval recorded in
`docs/visual-media-inventory-phase-2e-2026-09.md` §11, dated 2026-09-22.
**Preview only.** Nothing here authorises publication, indexation, production,
or use of any image as evidence of a client, property, result or testimonial.

---

## 1. Pipeline

Originals are **never modified, moved or deleted**. They stay where they are,
in `IMAGES/` and the repository root.

Web derivatives are generated into `public/media/` as WebP, listed with their
source and weight in `public/media/manifest.json`.

| | |
|---|---|
| Originals | 12 PNG files, **50,282 KB** |
| Web derivatives | 12 WebP files, **1,231 KB** |
| Reduction | **98%** |
| Max single file | 223 KB (`asset-architecture`) |

Anything wider than 2000px was resized to 2000px; smaller files keep their
native size. `next/image` generates the responsive variants from there.

A test asserts every original still exists, every derivative is present, and
none exceeds 250 KB.

---

## 2. Images implemented

| Slot | Image | Source |
|---|---|---|
| **Investment** hero | `investment-hero` | `IMAGES/sarahkaterina_Services_12.png` |
| **Investment** hero territory | `territory-coast` | `sarahkaterina_LifeStyle_1.png` |
| **Investment** why-we-exist | `process-analysis` | `IMAGES/sarahkaterina_services_1.png` |
| **Investment** asset · residential | `asset-residential` | `IMAGES/sarahkaterina_Services 8.png` |
| **Investment** asset · redevelopment | `asset-architecture` | `IMAGES/sarahkaterina_Services_9.png` |
| **Investment** report summary | `asset-plan` | `IMAGES/sarahkaterina_Services_10.png` |
| **Investment** final CTA | `territory-contact` | `IMAGES/sarahkaterina_LifeStyle_6.png` |
| **Tax Advisory** hero | `tax-hero` | `IMAGES/sarahkaterina_home.png` |
| **Tax Advisory** hero territory | `territory-contact` | `IMAGES/sarahkaterina_LifeStyle_6.png` |
| **Tax Advisory** context | `process-presentation` | `IMAGES/sarahkaterina_services_2.png` |
| **Tax Advisory** report summary | `report-interior` | `IMAGES/sarahkaterina_contacto_2.png` |
| **Tax Advisory** concerns | `process-analysis` | `IMAGES/sarahkaterina_services_1.png` |
| **Tax Advisory** services ×3 | `process-model`, `asset-plan`, `process-analysis` | services_6 / Services_10 / services_1 |
| **Tax Advisory** final CTA | `territory-contact` | `IMAGES/sarahkaterina_LifeStyle_6.png` |
| **Property Purchase** hero | `purchase-hero` | `IMAGES/sarahkaterina_home2.png` |
| **Property Purchase** audience | `asset-residential` | `IMAGES/sarahkaterina_Services 8.png` |
| **Property Purchase** one-file document | `asset-plan` | `IMAGES/sarahkaterina_Services_10.png` |
| **Property Purchase** services ×3 | `asset-architecture`, `process-presentation`, `process-model` | Services_9 / services_2 / services_6 |
| **Property Purchase** final CTA | `territory-coast` | `sarahkaterina_LifeStyle_1.png` |

All 12 approved images are in use. None is used as evidence of anything.

---

## 3. Two findings that required a decision

### 3.1 A third-party masthead — cropped out

`sarahkaterina_Services 8.png` carries **"ARCHITECTURAL DIGEST — THE ART OF THE
UNFINISHED: SKETCHING REALITY"** across the top of the frame.

Architectural Digest is a real publication. Showing its masthead over Sarah
Katerina material implies a feature or an association that does not exist, and
`AGENTS.md` §2 forbids fabricated press appearances.

**The top 17.5% of the frame is removed** in the web derivative. The original is
untouched. The crop is recorded in the registry and asserted by a test.

This is the one place where the implementation departs from "use the approved
image as supplied", and it does so to stay inside a rule that outranks the
media approval.

### 3.2 A spelling error in the baked-in lockup

Six of the approved images carry:

> Sarah Katerina — "The Spanish property **sistem**, decoded for you"

"sistem" should be "system". The approval permits embedded copy provisionally,
so the images ship as they are, but the error is recorded on every affected
entry in `lib/media/approved-media.ts` and asserted by a test so it is
retouched deliberately rather than discovered in production.

Affected: `asset-residential`, `asset-architecture`, `asset-plan`,
`territory-coast`, `report-interior`, `process-model`.

`process-analysis` carries the same line spelled correctly, which suggests the
error is a generation artefact rather than an intended wording.

---

## 4. Architecture

No new visual system was introduced. `TerritoryVisual` — the existing shared
slot used by all three landings — gained an optional `media` prop:

- **with** an approved image, it renders the photograph at the same aspect
  ratio, with a per-image focal point;
- **without** one, it draws the schematic exactly as before.

Consequences:
- every call site that has no approved image keeps working unchanged;
- unfilled slots stay visibly unfilled rather than becoming blank boxes;
- a retouched file replaces its predecessor with no layout work.

`PlaceholderMedia` in Property Purchase gained the same prop and now hides its
"pending" label once an image lands.

Headers, footers, tokens, buttons, icons and CSS systems were **not**
duplicated. Premium navigation, ThreeUI, scrollspy and navigation transitions
were **not** implemented, per the approval's explicit exclusions.

---

## 5. Alt text and safe crops

Every alt string lives in `lib/media/approved-media.ts`, beside the image
rather than in the copy module, so it travels with the asset.

Rules enforced by test:
- longer than 30 characters;
- no promotional vocabulary (*best, leading, luxury, exclusive, premium,
  stunning, dream, perfect*);
- no outcome vocabulary (*client, customer, sold, returned, profit, yield*) —
  these are staged brand images, not documentary records.

Each entry declares an `object-position` focal point chosen so the subject
survives every crop from 320px upward. Where an image carries embedded copy,
the HTML headline is placed on the opposite side so the two do not compete —
`purchase-hero`, for instance, has its baked-in text on the right, so the
focal point pulls left.

---

## 6. Slots still pending

| Slot | Why |
|---|---|
| Investment · decision doors ×3 | The inventory lists Services 8/9 as an *alternative*, not a selection. Kept schematic rather than over-reading the approval. |
| Investment · asset types · **Land** and **Commercial** | No approved image depicts a plot or a commercial asset. Borrowing a residential photograph would misrepresent the category. |
| Investment / Tax / Purchase · cases | Client imagery stays blocked until permissions and evidence exist. |
| Tax Advisory · problem/context background | `LifeStyle_5` is Group B, outside the approved 1–8 block. |
| All landings · hero video | No video exists. Slots keep their aspect ratio so a video drops in later with no structural change. |
| All landings · Open Graph image | Needs an approved composition. |

`sarahkaterina_testimonios_clientes.png` is excluded by the approval itself and
is asserted absent from the source by test.

---

## 7. QA

| Check | Result |
|---|---|
| `npm run lint` | Pass — 0 errors, 0 warnings |
| `npm run typecheck` | Pass |
| `npm run test` | Pass — 129/129 (13 new media-governance tests) |
| `npm run build` | Pass — 3 preview routes static |
| Widths verified | 320 · 375 · 390 · 768 · 1024 · 1440 |
| Media files served | 12/12 → 200 |
| `noindex` | Header and metadata on all three routes |
| Sitemap | Empty |
| `robots.txt` | `Disallow: /` |

---

## 8. Human review

Open the Vercel preview, logged in, and check each route at mobile and desktop:

1. Do the photographs suit their slots, or should any be swapped?
2. Is the embedded copy competing with the HTML headline anywhere?
3. Is the "sistem" typo acceptable in preview, and which files will you retouch?
4. Is cropping the Architectural Digest masthead the right call, or should that
   image be replaced entirely?
5. Are the two remaining schematic asset cards (Land, Commercial) acceptable, or
   should photography be commissioned?
6. Should the decision doors take Services 8/9 after all?

Nothing merges until you have answered these.

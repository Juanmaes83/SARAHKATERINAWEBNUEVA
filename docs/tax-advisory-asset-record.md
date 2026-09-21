# Tax Advisory — asset import record

Status: IMPORTED FOR PREVIEW · PLACEMENT NOT APPROVED
Date: 2026-09-22
Route: `/preview/tax-advisory`

This is the import record required by `docs/visual-asset-manifest.md` §2. Every
asset below records its original repository and path, its classification, its
provenance, its target slot, its crop and treatment, its alt text, and whether
it may appear in a public production route.

`Juanmaes83/sarahkaterina` was read only. No file in it was created, modified,
moved or deleted. Copying a file here neither modifies its source nor approves
it for production.

---

## 1. What was imported

### `BRAND-SK-001` — official clean logo

| Field          | Value                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Source         | `Juanmaes83/sarahkaterina` → `brand-system/foundations/brand-assets/SK_LOGO_CLEAN.png`                        |
| Register entry | `AUTHENTIC-REFERENCE-REGISTER.md` — `BRAND-SK-001`, "Official clean logo, byte-identical to the owner source" |
| Classification | Brand mark. `IDENTITY_USE = NOT_APPLICABLE`                                                                   |
| Imported to    | `public/brand/SK_LOGO_CLEAN.png`                                                                              |
| Source md5     | `bb6c3d7569f7ca30469b50b5c9764a2a`                                                                            |
| Imported md5   | `bb6c3d7569f7ca30469b50b5c9764a2a` — **byte-identical**                                                       |
| Dimensions     | 3119 × 1944, RGBA                                                                                             |
| Treatment      | **None.** Held as the provenance copy. Not rendered.                                                          |
| Production use | Requires Juanma's approval                                                                                    |

### Derived web wordmark

| Field          | Value                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Derived from   | `public/brand/SK_LOGO_CLEAN.png`                                                                                                                                                                                                                    |
| Imported to    | `public/brand/sk-wordmark.png`                                                                                                                                                                                                                      |
| Transformation | **Crop to the file's own alpha bounding box `(56, 138) → (3062, 1530)`, then PNG re-encode.** Nothing else. Not redrawn, traced, recoloured, rescaled or restyled. Every pixel of the mark is unchanged; only fully transparent margin was removed. |
| Result         | 3006 × 1392, RGBA, 150,372 bytes                                                                                                                                                                                                                    |
| Why            | The source carries asymmetric transparent margin — 7% above the mark, 21% below. Rendered at a fixed height the mark would sit visibly high in its box. Cropping to the alpha bbox lets CSS control clear space symmetrically.                      |
| Slots          | Header lockup; footer lockup                                                                                                                                                                                                                        |
| Alt text       | `Sarah Katerina`                                                                                                                                                                                                                                    |
| Rendered at    | 28px high (mobile) / 34px high (desktop)                                                                                                                                                                                                            |
| Production use | Requires Juanma's approval                                                                                                                                                                                                                          |

**`AUTH-SK-004` (`IMAGENES NUEVAS/SK_SARAH_LOGO.jpg`) was deliberately NOT used.**
The register classifies it as a _composite key visual_ containing photography
and baked typography, and states plainly that it "is **not** a substitute" for
the clean mark. A test asserts it is absent from this repository.

### `AUTH-SK-001` — editorial portrait

| Field          | Value                                                                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source         | `Juanmaes83/sarahkaterina` → `IMAGENES NUEVAS/SK_REAL_1.jpg`                                                                                                                                 |
| Register entry | `AUTH-SK-001` — "Authentic identity reference"                                                                                                                                               |
| Classification | Authentic photograph of Sarah, owner-supplied                                                                                                                                                |
| Imported to    | `public/sarah/AUTH-SK-001-editorial-portrait.jpg`                                                                                                                                            |
| Source md5     | `030afe42af7a62e28cb290e1e2d7b329`                                                                                                                                                           |
| Imported md5   | `030afe42af7a62e28cb290e1e2d7b329` — **byte-identical**                                                                                                                                      |
| Dimensions     | 768 × 1344, RGB, monochrome                                                                                                                                                                  |
| Slot           | Hero media                                                                                                                                                                                   |
| Crop           | **In CSS only**, `aspect-ratio: 4 / 5` with `object-position: center 22%`. The file is unmodified. The source is a full-length studio frame, far taller than the reference's landscape hero. |
| Alt text       | "Sarah Katerina, photographed in a studio portrait, standing with one hand on her hip."                                                                                                      |
| Loading        | `priority` — the single largest above-the-fold image                                                                                                                                         |
| Production use | Requires Juanma's approval                                                                                                                                                                   |

The register permits this. It limits `AUTH-SK-001` as a **face anchor for AI
generation** (it is monochrome, so it cannot carry eye colour), and adds:
"Work that uses an authentic Sarah photograph _directly_ — composited rather
than generated — is unaffected, because no anchor is needed when nothing is
generated." Nothing is generated here.

### `AUTH-SK-002` — square portrait

| Field            | Value                                                                                                                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source           | `Juanmaes83/sarahkaterina` → `IMAGENES NUEVAS/SK_REAL_2.jpg`                                                                                                                                                                                  |
| Register entry   | `AUTH-SK-002` — "Authentic identity reference"                                                                                                                                                                                                |
| Imported to      | `public/sarah/AUTH-SK-002-portrait-square.jpg`                                                                                                                                                                                                |
| Source md5       | `474f32ce619be759a1718e1124b3f054`                                                                                                                                                                                                            |
| Imported md5     | `474f32ce619be759a1718e1124b3f054` — **byte-identical**                                                                                                                                                                                       |
| Dimensions       | 400 × 400, RGB, colour                                                                                                                                                                                                                        |
| Slot             | Authority band portrait                                                                                                                                                                                                                       |
| Crop / treatment | None. Displayed at or below native size (max 260px wide) precisely because it is small; upscaling would visibly degrade it, and generating a larger version would fabricate a photograph. A 1px gold border supplies the reference's framing. |
| Alt text         | As above                                                                                                                                                                                                                                      |
| Production use   | Requires Juanma's approval. **The register calls this asset "recompressed, sub-grade".** A better colour frontal frame is worth requesting before publication.                                                                                |

---

## 2. What was deliberately NOT imported

| Asset                                               | Reason                                                                                                                                                         |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IMAGENES NUEVAS/SK_REAL_3.png` (`AUTH-SK-003`)     | **RECLASSIFIED upstream on 2026-08-17: "NOT Sarah". `IDENTITY_USE = PROHIBITED`.** It is a non-Sarah four-angle visual reference. A test asserts it is absent. |
| `IMAGENES NUEVAS/SK_SARAH_LOGO.jpg` (`AUTH-SK-004`) | Composite key visual, not an insertable mark.                                                                                                                  |
| `IMAGENES NUEVAS/IMAGENES CON PROMPTS/**`           | Producer-only directory. Its contents are generation inputs, not publishable assets.                                                                           |

---

## 3. Missing assets — what a reviewer needs to decide

These slots are rendered as **neutral editorial panels**: abstract washes built
from the approved palette, each naming in words the asset it is standing in
for. They are obviously non-photographic and cannot be mistaken for the image
they replace. No stock was chosen, and nothing was generated.

| #   | Slot                         | What the reference shows               | What is rendered                                             | Decision needed                                                                                                                                                                                                                     |
| --- | ---------------------------- | -------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Audience band, right column  | Costa Blanca coastline and villas      | Editorial panel, labelled `COSTA BLANCA · LOCATION`          | Commission or licence location photography, or approve an alternative treatment                                                                                                                                                     |
| A2  | Calendar aside               | Coastal supporting image               | Editorial panel, labelled `COSTA BLANCA · ASIDE`             | As A1                                                                                                                                                                                                                               |
| A3  | Concerns band, right column  | Villa and pool lifestyle image         | Editorial panel, labelled `COSTA BLANCA · LIFESTYLE`         | As A1                                                                                                                                                                                                                               |
| A4  | Service cards 1 and 2        | Documents on a desk; hands at a laptop | Editorial panels, labelled `ASSET PENDING — service imagery` | Commission or licence service imagery                                                                                                                                                                                               |
| A5  | Hero video                   | "VER VÍDEO (1 MIN)" play affordance    | `VIDEO PENDING` chip plus a written note under the image     | Final video selection or production — an open decision in `docs/phase-2-decision-gate.md` §5                                                                                                                                        |
| A6  | Footer logo on navy          | Reversed white logo                    | The real mark on an ivory plate                              | **Either approve the ivory plate, or supply a dark-ground logo variant.** The mark must not be recoloured or inverted here: that would be creating a brand mark, which AGENTS.md §2 forbids, and no reversed variant is registered. |
| A7  | Authority pull quote         | Sarah's handwritten signature          | `ATTRIBUTION PENDING_APPROVAL` marker                        | Confirm the wording is hers and supply an approved signature asset, or drop the signature                                                                                                                                           |
| A8  | Script marginalia (4 places) | Handwriting face                       | Fraunces italic, light                                       | Approve the substitution, or approve a third typeface — which would be a Brand System decision, not one for this repository                                                                                                         |

No authentic Costa Blanca, interior or documentary photography is registered in
`brand-system/imagery/AUTHENTIC-REFERENCE-REGISTER.md`. A1–A4 are therefore a
genuine gap in the source of truth, not an implementation shortcut.

---

## 4. Acceptance

Per `docs/visual-asset-manifest.md` §6, assets are ready for a visual merge
only when source and provenance are recorded (done), the intended slot is clear
(done), the treatment matches the reference grammar (for review), contrast and
text-safe areas pass (measured — see `docs/web-palette-contrast.md` §4.1),
responsive crops are reviewed at 375px and 1440px (screenshots produced), and
**Juanma has approved the visual result (outstanding)**.

# Tax Advisory — asset record

Status: IMPORTED FOR PREVIEW · PLACEMENT NOT APPROVED
Date: 2026-09-22
Phase: 2D — consolidated onto the canonical asset paths
Route: `/preview/tax-advisory`

The import record required by `docs/visual-asset-manifest.md` §2.

`Juanmaes83/sarahkaterina` is read-only from this project. Nothing in it was
created, modified, moved or deleted. Copying a file here neither modifies its
source nor approves it for production.

---

## 1. Consolidation note

Phase 2B imported the same four assets under Tax-Advisory-specific names while
the Investment branch imported them under the names below. Both imports were
made independently from the same upstream originals and produced **byte-identical
files** — including the alpha-bounding-box crop of the logo, which both
derived to md5 `9dc389eb…`.

The duplicates were deleted. One asset, one path, one hash, asserted by test.

| Removed duplicate                                 | Canonical path retained                |
| ------------------------------------------------- | -------------------------------------- |
| `public/brand/SK_LOGO_CLEAN.png`                  | `public/brand/BRAND-001-original.png`  |
| `public/brand/sk-wordmark.png`                    | `public/brand/sarah-katerina-logo.png` |
| `public/sarah/AUTH-SK-001-editorial-portrait.jpg` | `public/sarah/sk-real-1.jpg`           |
| `public/sarah/AUTH-SK-002-portrait-square.jpg`    | `public/sarah/sk-real-2.jpg`           |

---

## 2. What is in the repository

### `BRAND-001` — official clean logo

| Field           | Value                                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source          | `brand-system/foundations/brand-assets/SK_LOGO_CLEAN.png`, and identically `IMAGENES NUEVAS/IMAGENES CON PROMPTS/IMAGENES NUEVASLOGO SARAH KATERINA.png.png` (same md5)                                       |
| Register        | `AUTHENTIC-REFERENCE-REGISTER.md` — `BRAND-SK-001`, official clean logo                                                                                                                                       |
| Classification  | Brand mark. `IDENTITY_USE = NOT_APPLICABLE`                                                                                                                                                                   |
| Provenance copy | `public/brand/BRAND-001-original.png` — **byte-identical**, md5 `bb6c3d7569f7ca30469b50b5c9764a2a`, 3119 × 1944 RGBA                                                                                          |
| Rendered file   | `public/brand/sarah-katerina-logo.png` — md5 `9dc389ebf487900ed26c60002fd0125e`, 3006 × 1392 RGBA                                                                                                             |
| Transformation  | **Crop to the file's own alpha bounding box `(56, 138) → (3062, 1530)`, then PNG re-encode. Nothing else.** Not redrawn, traced, recoloured, rescaled or restyled. Only fully transparent margin was removed. |
| Why             | The source carries asymmetric transparent margin — 7% above the mark, 21% below — so at a fixed height the mark sits visibly high in its box.                                                                 |
| Slots           | Header lockup; footer lockup (on an ivory plate)                                                                                                                                                              |
| Alt text        | `Sarah Katerina`                                                                                                                                                                                              |
| Production use  | Requires approval                                                                                                                                                                                             |

The mark's teal accent is preserved even though the website palette is navy and
gold. The register is explicit: "never redraw/retype/recolour/approximate", and
"palette reconciliation cannot be used as permission to alter the mark". That
discrepancy is recorded upstream and is Juanma's to resolve.

**`AUTH-SK-004` (`IMAGENES NUEVAS/SK_SARAH_LOGO.jpg`) is deliberately absent.**
The register classifies it as a _composite key visual_ with baked photography
and typography and states it "is **not** a substitute" for the clean mark. A
test asserts it never appears.

### `AUTH-SK-001` — hero portrait

| Field          | Value                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Source         | `IMAGENES NUEVAS/SK_REAL_1.jpg`                                                                                       |
| Register       | `AUTH-SK-001` — authentic identity reference                                                                          |
| Path           | `public/sarah/sk-real-1.jpg` — **byte-identical**, md5 `030afe42af7a62e28cb290e1e2d7b329`, 768 × 1344 RGB, monochrome |
| Slot           | Hero media                                                                                                            |
| Crop           | **In CSS only** — the shared hero frame is 4 : 5 with `object-fit: cover`. The file is unmodified.                    |
| Alt text       | "Sarah Katerina, photographed in a studio portrait, standing with one hand on her hip."                               |
| Loading        | `priority`, with a blur placeholder                                                                                   |
| Production use | Requires approval                                                                                                     |

The register limits `AUTH-SK-001` as a **face anchor for AI generation** — it is
monochrome, so it cannot carry eye colour — and adds: "Work that uses an
authentic Sarah photograph _directly_ — composited rather than generated — is
unaffected, because no anchor is needed when nothing is generated." Nothing is
generated here.

### `AUTH-SK-002` — authority portrait

| Field          | Value                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source         | `IMAGENES NUEVAS/SK_REAL_2.jpg`                                                                                                                   |
| Register       | `AUTH-SK-002` — authentic identity reference, the only registered colour frontal                                                                  |
| Path           | `public/sarah/sk-real-2.jpg` — **byte-identical**, md5 `474f32ce619be759a1718e1124b3f054`, 400 × 400 RGB                                          |
| Slot           | Authority band                                                                                                                                    |
| Crop           | None. Displayed at or below native size, because upscaling would visibly degrade it and generating a larger version would fabricate a photograph. |
| Alt text       | "Sarah Katerina, photographed in a studio portrait."                                                                                              |
| Production use | Requires approval. **The register calls this asset "recompressed, sub-grade".** A better colour frontal is worth requesting.                      |

---

## 3. Deliberately not imported

| Asset                                               | Reason                                                                                                                                        |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `IMAGENES NUEVAS/SK_REAL_3.png` (`AUTH-SK-003`)     | **Reclassified upstream 2026-08-17: "NOT Sarah". `IDENTITY_USE = PROHIBITED`.** A non-Sarah four-angle reference. A test asserts its absence. |
| `IMAGENES NUEVAS/SK_SARAH_LOGO.jpg` (`AUTH-SK-004`) | Composite key visual, not an insertable mark. A test asserts its absence.                                                                     |
| `IMAGENES NUEVAS/IMAGENES CON PROMPTS/**`           | Producer-only directory. Generation inputs, not publishable assets.                                                                           |

---

## 4. Missing assets — what a reviewer needs to decide

Eight photographic slots render `TerritoryVisual` schematics: explicitly
diagrammatic drawings, each `role="img"` with an accessible name saying so.
They occupy the slot honestly and cannot be mistaken for photography. No stock
was chosen and nothing was generated.

| #   | Slot                 | Template shows               | Ratio needed | Function                                                                                                         |
| --- | -------------------- | ---------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| A1  | Hero place signal    | Costa Blanca behind the desk | 3 : 2        | Locates the service                                                                                              |
| A2  | Hero video           | "VER VÍDEO (1 MIN)"          | 16 : 9       | Introduces Sarah                                                                                                 |
| A3  | Context band         | Coastline and villas         | 3 : 2        | Who it is for                                                                                                    |
| A4  | Concerns band        | Villa with pool              | 3 : 2        | What life is like without the worry                                                                              |
| A5  | Service card 1       | Documents on a desk          | 16 : 9       | Tax diagnostic                                                                                                   |
| A6  | Service card 2       | Hands at a laptop            | 16 : 9       | Annual compliance                                                                                                |
| A7  | Service card 3       | Villa exterior               | 16 : 9       | Purchase + tax overlay                                                                                           |
| A8  | Case cards ×3        | Property photographs         | 16 : 9       | Real files                                                                                                       |
| A9  | Final CTA            | Coastal panorama             | 3 : 2        | Closing image                                                                                                    |
| A10 | Footer logo on navy  | Reversed white logo          | —            | **Either approve the ivory plate, or supply a dark-ground variant.** The mark may not be recoloured or inverted. |
| A11 | Pull-quote signature | Handwritten signature        | —            | Supply the asset and confirm the wording, or drop it                                                             |

No authentic Costa Blanca, interior, document or property photography is
registered in `brand-system/imagery/AUTHENTIC-REFERENCE-REGISTER.md`. A1 and
A3–A9 are a genuine gap in the source of truth, not an implementation shortcut.

---

## 5. Why `main` appeared to be missing these files

`main`'s CI was failing with four `TS2307: Cannot find module '@/public/…'`
errors, which looked like missing assets. **The assets were committed and
correct.**

The real cause: `next-env.d.ts` supplies the `*.png` / `*.jpg` module
declarations from `next/image-types/global`. It is gitignored — Next generates
it — and it is only written by `next dev` or `next build`. CI runs `lint`,
`typecheck`, `test`, `build` in that order, so on a clean checkout `typecheck`
runs before anything has generated it, and every static image import fails.

Reproduced locally with `mv next-env.d.ts /tmp && npm run typecheck`, which
produced the same four errors.

Fixed by committing `types/next-image.d.ts`, a single
`/// <reference types="next/image-types/global" />`, which makes typecheck
independent of build order. A test asserts the file exists.

---

## 6. Acceptance

Per `docs/visual-asset-manifest.md` §6, assets are ready for a visual merge
only when source and provenance are recorded (done), the intended slot is clear
(done), the treatment matches the reference grammar (for review), contrast and
text-safe areas pass (measured — convergence record §6), responsive crops are
reviewed at 375px and 1440px (screenshots in `docs/screenshots/`), and
**Juanma has approved the visual result (outstanding)**.

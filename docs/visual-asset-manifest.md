# Visual Asset Manifest and Import Contract

Status: ACTIVE — first import completed for the Tax Advisory preview
Updated: 2026-09-22

This document corrects the previous wording. The logo and authentic photography
do exist as references in the mother repository. They are not yet imported or
assigned to the new website, and their existence does not by itself approve a
public placement.

## 1. Canonical source references

| Asset | Source repository/path | Current state in new repo | Intended use |
|---|---|---|---|
| Sarah reference 01 (`AUTH-SK-001`) | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_REAL_1.jpg | **Imported** → `public/sarah/AUTH-SK-001-editorial-portrait.jpg`, byte-identical | Tax Advisory hero media |
| Sarah reference 02 (`AUTH-SK-002`) | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_REAL_2.jpg | **Imported** → `public/sarah/AUTH-SK-002-portrait-square.jpg`, byte-identical | Tax Advisory authority portrait |
| Sarah reference 03 (`AUTH-SK-003`) | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_REAL_3.png | **NOT imported — PROHIBITED.** Reclassified upstream 2026-08-17 as NOT Sarah; `IDENTITY_USE = PROHIBITED` | None. A test asserts its absence |
| Sarah logo composite (`AUTH-SK-004`) | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_SARAH_LOGO.jpg | **NOT imported.** Composite key visual with baked photography and typography; the register states it is not a substitute for the clean mark | None. A test asserts its absence |
| **Official clean logo (`BRAND-SK-001`)** | Juanmaes83/sarahkaterina/brand-system/foundations/brand-assets/SK_LOGO_CLEAN.png | **Imported** → `public/brand/SK_LOGO_CLEAN.png`, byte-identical, plus `public/brand/sk-wordmark.png` cropped to its own alpha bounding box | Header and footer lockups |
| Investment template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Investment.png | Visual proposal reference | Composition, rhythm, hierarchy and slot mapping |
| Tax Advisory template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Tax Advisory.png | Visual proposal reference | Shared landing grammar |
| Property Purchase template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Property Purchase.png | Visual proposal reference | Shared landing grammar |
| Property Management template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Property Management · VITA Host.png | Visual proposal reference | Reference only; service remains governed by its upstream status |

The first import was performed on 2026-09-22 for `/preview/tax-advisory`. The
full record — source paths, md5 hashes, classification, slot, crop, treatment,
alt text and the list of assets still missing — is in
`docs/tax-advisory-asset-record.md`.

Note the register correction: the official clean logo is `BRAND-SK-001` at
`brand-system/foundations/brand-assets/SK_LOGO_CLEAN.png`, not the composite
key visual in `IMAGENES NUEVAS/`. Earlier wording in this document pointed at
the composite.

## 2. Required import record

Every imported asset must record:

- original repository and path;
- authentic, synthetic, conceptual or documentary classification;
- rights/provenance and public-use status;
- target landing and section;
- crop/aspect ratio and responsive behavior;
- contextual alt text;
- reviewer and date;
- whether it may appear in a public production route.

The mother repository is read-only from this project. Copying a selected file does
not modify or approve its source.

## 3. Human selection rule

If a required image, logo treatment, video, crop or visual treatment is not
explicitly selected, the agent must ask Juanma.

The agent must not:

- choose generic stock silently;
- generate a synthetic Sarah or property scene as documentary proof;
- replace a missing video with a misleading still;
- use a screenshot containing unverified figures as evidence;
- circulate an asset as final because it looks visually plausible.

A clearly labelled structural placeholder is acceptable during development. It must
state what is pending.

## 4. Phase 2 Investment asset map

| Slot | Required visual | Source/status | Fallback |
|---|---|---|---|
| Header | Sarah Katerina logo | Upstream reference; import pending | Text placeholder only in structural prototype |
| Hero | Sarah/property/Costa Blanca image or approved video | Selection required | Ask Juanma |
| Hero proof | Dashboard/report preview | Existing Buyer System/report evidence to be selected | Labelled demo surface with no invented figures |
| Decision doors | Property / opportunity imagery | Template reference; asset selection required | No generic stock |
| Asset classes | Residential, land, commercial, redevelopment images | Selection/licence required | Labelled placeholders |
| Process | Icons or numbered visual sequence | Design treatment required | Accessible CSS numbering |
| Analysis proof | Dashboard screenshots/charts | Approved real screenshots or labelled demo | Never fabricate performance |
| Authority | Sarah portrait | Authentic upstream reference | Labelled placeholder |
| Cases | Permissioned case imagery | Blocked until permission/evidence | Placeholder |
| CTA/footer | Brand mark and approved location imagery | Selection required | No invented contact or legal details |

## 5. Image and video quality

Use responsive image handling, explicit dimensions, meaningful alt text, lazy
loading below the fold, priority loading only for the hero, and poster/preload
strategy for video.

Video must be approved before implementation, muted/autoplay only when
appropriate, subtitled if it contains speech, deferred below the fold and
replaced by a useful poster for reduced motion and low-bandwidth users.

## 6. Acceptance

Assets are ready for a visual merge only when:

- source and provenance are recorded;
- intended slot is clear;
- image treatment matches the Investment template grammar;
- contrast and text-safe areas pass;
- responsive crops are reviewed at 375px and 1440px;
- Juanma has approved the visual result.

---

## 7. Phase 2B import record (2026-09-21)

Assets actually imported into this repository, with provenance.

| Asset | Origin | Register ID | Use | State | Approval |
|---|---|---|---|---|---|
| Logo | `IMAGENES NUEVAS/IMAGENES CON PROMPTS/IMAGENES NUEVASLOGO SARAH KATERINA.png.png` | `BRAND-001` | header/footer | imported → `public/brand/sarah-katerina-logo.png` (transparent padding trimmed, pixel-identical) | pending visual review |
| Logo, untouched | same | `BRAND-001` | provenance copy, unused by the app | imported → `public/brand/BRAND-001-original.png` | — |
| Sarah, B&W full body | `IMAGENES NUEVAS/SK_REAL_1.jpg` | `AUTH-SK-001` | hero visual | imported → `public/sarah/sk-real-1.jpg`, unmodified | pending visual review |
| Sarah, colour headshot | `IMAGENES NUEVAS/SK_REAL_2.jpg` | `AUTH-SK-002` | authority band | imported → `public/sarah/sk-real-2.jpg`, unmodified | pending visual review |
| Sarah, 4-view turnaround | `IMAGENES NUEVAS/SK_REAL_3.png` | `AUTH-SK-003` | — | **not imported** | contact sheet; unusable as a single web image |
| Composite key visual | `IMAGENES NUEVAS/SK_SARAH_LOGO.jpg` | `AUTH-SK-004` | — | **not imported** | register: composite, `NOT_SUITABLE` for identity/body use; embedded wording is not canonical claim copy |
| Dashboards and charts | built in `components/web/SampleChart.tsx` | — | hero, report, scenarios | illustrative sample, labelled | **no claim** |
| Video | — | — | hero, optional | **not implemented** | requires an asset and a decision |

### Corrections to §1 established by this import

1. **`SK_SARAH_LOGO.jpg` is not the logo.** `AUTHENTIC-REFERENCE-REGISTER.md`
   reclassifies it as a *composite key visual* and names `BRAND-001` as "the
   correct insertable mark". §1 of this document previously pointed at the
   composite. `BRAND-001` is what Phase 2B imported.
2. **All three `SK_REAL_*` files are classified `Authentic identity reference`**,
   not AI-generated. `AUTH-SK-001` is monochrome and marked `SUPPORT` for
   identity; `AUTH-SK-002` is the colour frontal marked `PRIMARY`.
3. **The logo's accent is teal**, approximately `#79BFBD`, and the canonical
   palette contains no teal. The register records this and forbids recolouring
   the mark. Juanma decided on 2026-09-21 to use it exactly as supplied, so the
   teal sits beside the gold interface. **Open visual question.**

### Still missing

Costa Blanca and property photography · process video · a logo treatment
approved for dark surfaces · Open Graph image · favicon · case-study imagery
and permissions.

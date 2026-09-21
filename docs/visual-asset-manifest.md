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

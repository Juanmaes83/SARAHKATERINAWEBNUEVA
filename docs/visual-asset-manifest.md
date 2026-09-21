# Visual Asset Manifest and Import Contract

Status: ACTIVE — assets available upstream, import and assignment pending
Updated: 2026-09-21

This document corrects the previous wording. The logo and authentic photography
do exist as references in the mother repository. They are not yet imported or
assigned to the new website, and their existence does not by itself approve a
public placement.

## 1. Canonical source references

| Asset | Source repository/path | Current state in new repo | Intended use |
|---|---|---|---|
| Sarah reference 01 | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_REAL_1.jpg | Available upstream; not imported | Authority/editorial portrait or hero support |
| Sarah reference 02 | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_REAL_2.jpg | Available upstream; not imported | Authority/editorial context |
| Sarah reference 03 | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_REAL_3.png | Available upstream; not imported | Transparent/editorial identity asset if suitable |
| Sarah logo reference | Juanmaes83/sarahkaterina/IMAGENES NUEVAS/SK_SARAH_LOGO.jpg | Available upstream; not imported | Header/footer brand reference; create approved light/dark treatment only after review |
| Investment template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Investment.png | Visual proposal reference | Composition, rhythm, hierarchy and slot mapping |
| Tax Advisory template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Tax Advisory.png | Visual proposal reference | Shared landing grammar |
| Property Purchase template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Property Purchase.png | Visual proposal reference | Shared landing grammar |
| Property Management template | Juanmaes83/sarahkaterina/website/nueva web/Sarah Katerina Property Management · VITA Host.png | Visual proposal reference | Reference only; service remains governed by its upstream status |

The current public directories may remain empty until the Phase 2 visual branch
imports selected files. This is an implementation gap, not evidence that the
assets do not exist.

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

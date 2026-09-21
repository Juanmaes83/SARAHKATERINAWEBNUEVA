# Landing Experience System

Status: ACTIVE PHASE 2 IMPLEMENTATION CONTRACT
Updated: 2026-09-21

This document supersedes the earlier interpretation that treated Phase 2 as
only a structural prototype. The current prototype is Phase 2A. Phase 2B must
implement the visual experience below.

## 1. Reference and authority

website/nueva web/, especially the Investment screenshot, is material visual de
propuesta. It is not canonical documentation or a production approval. Its
architecture, hierarchy, rhythm and composition are nevertheless the required
visual reference for Phase 2.

The Brand System, approved business decisions, legal/fiscal review and Juanma's
human visual review remain higher-order publication gates.

## 2. Required section grammar

| # | Section | Required visual/content job |
|---|---|---|
| 1 | Navigation | Orient the visitor, expose language/service routes and present one contextual action |
| 2 | Hero | State who the service is for, the decision it improves and show image/video plus proof surface |
| 3 | Trust strip | Present only approved facts, credentials or process signals |
| 4 | Problem and objections | Name fear, uncertainty, friction, cost and timing concerns |
| 5 | Decision doors | Route by visitor situation and intent |
| 6 | Timeline/process | Show stages, deliverables and decision moments |
| 7 | Dashboards/calculators | Make the analytical product visible and provide micro-conversion entry points |
| 8 | Authority | Use Sarah's approved image and a specific, evidenced reason to trust the service |
| 9 | Testimonials/cases | Show permissioned evidence, not decorative quotes or invented outcomes |
| 10 | FAQ | Resolve high-friction objections with accessible disclosures |
| 11 | Final CTA | Repeat the correct intent-specific next step and reduce perceived risk |
| 12 | Footer | Close with approved brand, legal, contact and navigation information |

Every section needs one dominant idea, a clear visual anchor and enough negative
space to prevent the template's information density becoming fatigue.

## 3. Visual direction

### Layout

- Mobile-first; mobile hierarchy is designed, not merely collapsed.
- Use an 8pt-derived spacing system and deliberate 48/64/80 section rhythm.
- Increase air around headings, media and CTA groups where the reference feels condensed.
- Use editorial split layouts, full-bleed moments and contained proof cards only when they clarify the story.
- Use real image crops and safe text zones rather than decorative filler.
- Keep body copy within a readable measure and avoid text walls.

### Palette

For this website project Juanma approved the same visual direction shown in the
templates:

- warm ivory/off-white foundation;
- deep navy authority and conversion surfaces;
- restrained gold/ochre accent;
- neutral supporting surfaces and high-contrast ink/white text.

This is a scoped SARAHKATERINAWEBNUEVA decision. It does not mutate the mother
repository's global canonical palette. Implement exact values as namespaced
--sk-web-* tokens and add contrast tests before visual review.

## 4. Media and asset policy

The implementation must use the available authentic references from the mother
repository when the slot calls for them:

- IMAGENES NUEVAS/SK_REAL_1.jpg
- IMAGENES NUEVAS/SK_REAL_2.jpg
- IMAGENES NUEVAS/SK_REAL_3.png
- IMAGENES NUEVAS/SK_SARAH_LOGO.jpg

For each imported asset, record source path, type, rights/provenance, target
slot, crop, responsive behavior, alt text and approval status.

If an image or video is missing, unclear or not approved, the agent asks Juanma.
It must not select generic stock, generate an apparently documentary replacement
or hide the absence behind a polished placeholder.

## 5. Dashboards and calculators

Phase 2 must show the analytical promise visually:

- report/dashboard preview in the hero or visual-proof block;
- scenario, sensitivity or calendar surfaces where relevant;
- calculator cards as micro-conversions;
- clear distinction between a real upstream calculator, a visual demo and a pending integration;
- no copied formulas or fiscal constants;
- no result or financial figure invented for marketing.

Functional Buyer System wiring, event tracking, consent and lead capture belong
to the later integration gate, but visual entry points must exist in the Phase 2
composition.

## 6. Motion contract

GSAP or a native equivalent may be used. The choice is implementation-level, not
a reason to omit motion.

Required motion opportunities:

- hero copy and media choreography;
- reveal-on-scroll between editorial sections;
- image depth/parallax only when it improves orientation;
- dashboard/scenario transitions;
- timeline progression;
- button/card/tab hover and focus feedback;
- accordion and calculator-entry transitions.

Rules:

- purposeful, not ornamental;
- generally 150–500ms;
- no scroll-jacking;
- no animated fake metrics;
- keyboard and touch remain fully usable;
- prefers-reduced-motion disables non-essential motion;
- content remains readable if JavaScript fails.

## 7. CRO structure

- one dominant CTA per visitor intent;
- secondary CTA only when it reduces friction;
- calculator links treated as micro-conversions;
- decision doors before long explanation;
- proof before high-commitment CTA;
- objections answered before the final conversion moment;
- copy prioritises outcome and clarity over feature lists;
- no universal Book a call repeated without context;
- no fabricated urgency, scarcity, pricing, returns or guarantee.

## 8. SEO, accessibility and GEO

Phase 2 must be semantically ready:

- one H1 and ordered H2/H3 outline;
- descriptive titles and meta descriptions per route;
- Open Graph image slot using an approved asset;
- canonical and hreflang strategy prepared only for existing routes;
- FAQ/Organization/LocalBusiness schema emitted only when visible content and legal data are verified;
- internal links with descriptive anchors;
- answer-oriented sections useful to search engines and AI systems;
- WCAG AA contrast, visible focus, keyboard interaction and 44px targets;
- noindex on preview routes;
- Lighthouse, real-device, axe and human visual checks before production.

## 9. Current implementation status

| Capability | Phase 2A prototype | Phase 2B target |
|---|---|---|
| Section grammar | Present | Match template composition visually |
| Hero | Structural proof skeleton | Real image/video plus dashboard treatment |
| Logo | Placeholder | Import/select approved logo reference |
| Photography | Placeholder | Use assigned authentic assets |
| Dashboards | Structural placeholder | Real approved screenshots or labelled demo surfaces |
| Calculators | Adapter prepared, URL unset | Visible entry points; functional wiring later |
| Motion | Basic reveal | Full motion track with reduced-motion path |
| CRO | Provisional | Intent-specific CTA and micro-conversion hierarchy |
| SEO/GEO | Preview scaffolding | Production-ready implementation after approval |

## 10. Human gate

Juanma is the visual approver. A visual change is not accepted because tests
pass or because a headless screenshot renders.

Before each visual merge:

1. Preview at 375px and 1440px minimum.
2. Review hierarchy, air, media, motion, copy, CTA and resemblance to the Investment reference.
3. Record corrections.
4. Re-test technical and accessibility constraints.
5. Merge only after explicit approval.

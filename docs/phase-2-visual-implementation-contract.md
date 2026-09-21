# Phase 2 — Decision Gate and Visual Implementation Contract

Status: INVESTMENT VISUAL BASE MERGED · MULTI-LANDING IMPLEMENTATION IN PROGRESS · PRODUCTION NOT APPROVED
Updated: 2026-09-21

## 1. Governing distinction

The visual files in website/nueva web/ are material visual de propuesta. They
are not canonical documentation, legal approval, production release or a
replacement for the Brand System.

They are nevertheless the explicit implementation reference for Phase 2.

The architecture, rhythm, hierarchy and composition of website/nueva web/,
especially the Investment template, are the target visual grammar for Phase 2.
They remain subordinate to approved business decisions, the Brand System,
legal/fiscal review and Juanma's human visual validation.

## 2. Human decisions recorded

Juanma approved the following scope on 2026-09-21:

| Decision | Status | Boundary |
|---|---|---|
| Investment template as the Phase 2 visual base | APPROVED FOR IMPLEMENTATION | Reference composition, not production approval |
| Ivory / navy / gold palette shown in the templates | APPROVED FOR THIS WEBSITE PROJECT | Scoped to SARAHKATERINAWEBNUEVA; does not replace the global Brand System palette |
| Logo and authentic imagery | REQUIRED | Use available references from the mother repo; record provenance and ask Juanma when selection or treatment is unclear |
| Hero image or video | REQUIRED SLOT | Use an approved real asset or ask Juanma; never silently substitute generic or synthetic media |
| Dashboards and calculators | REQUIRED VISUAL SURFACES | Phase 2 shows and routes the experience; functional integration belongs to the later integration gate |
| Human visual review | MANDATORY | Juanma reviews the Vercel preview before every visual merge |

## 3. Required Phase 2 deliverable

Phase 2 must become a real visual experience based on the template grammar:

1. Navigation with language, service routing and contextual CTA.
2. Editorial hero with clear promise, image/video and proof surface.
3. Trust strip with only approved facts.
4. Problem, tension and objection handling.
5. Decision doors for the visitor's starting point.
6. Timeline/process with visible deliverables.
7. Dashboards, report previews and calculator entry points.
8. Authority section with Sarah's approved real image or clearly labelled placeholder.
9. Testimonials and case studies only with written permission and verified evidence.
10. FAQ with accessible disclosures.
11. Final CTA with intent-specific action and risk reduction.
12. Footer with approved brand, legal, contact and navigation information.
13. Responsive mobile-first composition with deliberate mobile hierarchy.
14. CRO, accessibility, SEO semantics and GEO readiness.

The implementation must preserve the proposal's editorial character while adding
more air, spacing and rhythm where the screenshots are too condensed.

## 4. Palette implementation

The approved website palette is the palette visibly used by the templates:

- warm ivory/off-white foundation;
- deep navy authority surfaces;
- restrained gold/ochre accent;
- neutral supporting surfaces and high-contrast text.

The mother repository Brand System remains unchanged. This implementation must:

- use namespaced web tokens such as --sk-web-*;
- avoid changing the canonical token files;
- document exact values and contrast pairings before code;
- test WCAG AA for text and interactive states;
- avoid arbitrary shades without a documented reason.

## 5. Assets and media

The mother repository contains authentic visual references:

- IMAGENES NUEVAS/SK_REAL_1.jpg
- IMAGENES NUEVAS/SK_REAL_2.jpg
- IMAGENES NUEVAS/SK_REAL_3.png
- IMAGENES NUEVAS/SK_SARAH_LOGO.jpg

They are available references, not automatically approved placements. Phase 2
must assign each selected asset to a slot, record its origin, crop, treatment,
alt text and intended use.

If the project needs a video, missing photograph, different crop or generated
creative asset, the agent must ask Juanma before choosing or generating it.
Synthetic imagery may support editorial storytelling, but it may never fabricate
documentary evidence, a client, a case study or a verified property outcome.

## 6. Motion

GSAP or a native equivalent is allowed and expected where it improves
comprehension:

- staged hero entry;
- reveal of the image/proof surface;
- dashboard and scenario transitions;
- timeline progression;
- card hover and focus feedback;
- accordion and calculator-entry transitions.

Motion must be purposeful, generally 150–500ms where appropriate, respect
prefers-reduced-motion, preserve keyboard access, avoid scroll-jacking and never
animate an unapproved financial value as if it were real.

## 7. CRO, SEO and GEO acceptance

Phase 2 must prepare, not falsely claim to complete, production acquisition:

- one dominant CTA per intent;
- calculator entry points as micro-conversions;
- clear next-step copy and objection handling;
- no invented pricing, credentials, returns or outcomes;
- semantic heading structure and accessible controls;
- metadata and Open Graph slots ready for approved content;
- canonical/hreflang/schema strategy documented but emitted only when routes and claims are production-ready;
- answer-oriented copy blocks useful to search engines and AI systems;
- internal links to the relevant service and Buyer System surfaces;
- noindex while under preview.

## 8. Phase split

| Stage | Meaning | Status |
|---|---|---|
| Phase 1 | Technical foundation | Merged |
| Phase 2A | Structural Investment prototype and reusable landing grammar | Merged |
| Phase 2B/2C — Investment | Real visual implementation and fidelity pass | Merged as development base; final consolidation open |
| Tax Advisory | Service-specific visual base | In progress |
| Property Purchase | Service-specific visual base | Next |
| Shared consolidation | Apply common improvements across the three bases | After the three bases |
| Human visual gate | Juanma visual review and correction cycle | Mandatory before final acceptance and production |
| Phase 3 | Functional Buyer System integration, events, consent and lead-capture decision | Blocked on upstream decisions |
| Phase 4 | Production SEO, accessibility, performance, legal and publication gate | Later |

## 9. Definition of done

Phase 2B cannot be called complete until:

- the implementation visibly follows the Investment template grammar;
- the real logo and selected images are present or explicitly blocked pending Juanma's decision;
- the hero has real image/video treatment or an approved replacement;
- dashboards/calculator surfaces are visible;
- spacing, hierarchy and mobile rhythm pass human review;
- motion has reduced-motion behavior;
- no fake claim or evidence has entered the page;
- responsive screenshots exist at mobile and desktop widths;
- the visual base has a Vercel preview and the merge decision is explicitly recorded;
- final acceptance still requires Juanma's consolidated review of Investment, Tax Advisory and Property Purchase;
- only after that may production approval or migration be requested.

## 10. Remaining decisions

- production landing priority: Investment versus Pre-Arras;
- final institutional descriptor and legal/contact data;
- exact CTA copy and pricing publication;
- Buyer System production URL;
- where lead capture lives;
- public Asking Price approval;
- Spanish route architecture and hreflang;
- final video selection/production.

Until these are resolved, the repository remains a controlled preview and noindex
implementation.

# Phase 2F — Approved case imagery and scroll-controlled hero video

**Status:** implementation brief approved by the owner  
**Repository:** Juanmaes83/SARAHKATERINAWEBNUEVA  
**Target branch:** main, through a feature branch and Pull Request  
**Publication state:** Preview only; no production deployment and no merge without visual human approval  
**Last updated:** 2026-09-23

---

## 0. Mandatory instruction for Claude Code

Read this document completely before changing any code:

docs/phase-2f-approved-images-and-scroll-hero-video.md

This document is the source of truth for this phase. Inspect the current repository, its existing media pipeline, motion system, manifests, tests and prior Phase 2E documentation before implementing it.

Do not reinterpret the asset-to-slot mapping. The owner has already selected and named the assets. You retain technical and visual judgement over the implementation, but not over which approved asset belongs to which approved slot.

Create a new feature branch from the latest main. Complete the work in one focused Pull Request. Do not merge it. End with a Vercel Preview and visual evidence for human review.

If any required source file is absent from the latest main, stop and report the exact missing path. Do not invent a substitute.

---

## 1. Objective

Complete two related media upgrades in the protected Preview landings:

1. Replace seven remaining schematic or illustrative placeholders with seven approved editorial images.
2. Introduce a scroll-controlled video experience in the hero of Investment, Property Purchase and Tax Advisory, inspired by the interaction on the current sarahkaterina.com home.

The result must feel like one coherent premium editorial system. It must improve comprehension and visual authority without weakening performance, accessibility, trust or the existing claims controls.

The fourth landing, Team, deliberately keeps its authentic team photograph in the hero during this phase. A video must not be forced into Team merely to create symmetry with the other pages.

---

## 2. Scope

Routes in scope:

- /preview/investment
- /preview/property-purchase
- /preview/tax-advisory
- /preview/team only for regression verification; its hero is not to be changed

Source directories:

- IMAGES/MEJORAS 23 OCTUBRE/
- VIDEOS/

Existing systems to inspect and respect include, where present:

- lib/media/approved-media.ts
- public/media/manifest.json
- public/media/graded/manifest.json
- components/web/WebHero.tsx
- components/web/TaxHero.tsx
- components/web/PropertyPurchase.tsx
- components/web/TeamEditorial.tsx
- components/motion/
- docs/phase-2e-media-implementation.md
- docs/phase-2e-motion-system.md
- docs/phase-2e-october-media.md
- docs/visual-asset-manifest.md
- current media and visual regression tests

Do not serve production media directly from IMAGES/ or VIDEOS/. These directories contain immutable sources.

---

## 3. Required source validation

Before implementation, verify that all ten sources exist on the latest main.

### Approved images

1. IMAGES/MEJORAS 23 OCTUBRE/Investment Refurbished villa.png
2. IMAGES/MEJORAS 23 OCTUBRE/Investment Apartment for letting.png
3. IMAGES/MEJORAS 23 OCTUBRE/Investment Land with development.png
4. IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Fiscal exposure identified.png
5. IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Problematic clause renegotiated.png
6. IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Remote purchase completed.png
7. IMAGES/MEJORAS 23 OCTUBRE/One file. From viewing to keys.png

### Approved hero video sources

8. VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4
9. VIDEOS/SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4
10. VIDEOS/BIENES RACIES QUE CRECEN.mp4

Preserve the filename “BIENES RACIES QUE CRECEN.mp4” exactly as it exists in the repository. Do not silently correct or rename the source.

Record source size, dimensions, duration, codecs, audio presence and SHA before deriving web assets.

Known audit values to verify rather than assume:

| Source | Duration | Dimensions | Approx. source size |
|---|---:|---:|---:|
| MAPA CIUDADES OPORTUNIDADES.mp4 | 5.05 s | 1280 × 720 | 8.49 MB |
| SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4 | 10.04 s | 1280 × 720 | 8.89 MB |
| BIENES RACIES QUE CRECEN.mp4 | 10.08 s | 1280 × 720 | 4.29 MB |

The source MP4 files include audio. Hero derivatives must not.

---

## 4. Mandatory image mapping

### 4.1 Investment — Case studies

Route:

/preview/investment

In the “Case studies” section, replace the current schematic visual for each case with its approved image:

| Case | Required source |
|---|---|
| 01 — Refurbished villa | IMAGES/MEJORAS 23 OCTUBRE/Investment Refurbished villa.png |
| 02 — Apartment for letting | IMAGES/MEJORAS 23 OCTUBRE/Investment Apartment for letting.png |
| 03 — Land with development | IMAGES/MEJORAS 23 OCTUBRE/Investment Land with development.png |

The order is mandatory. Do not exchange images between cases.

These images combine a realistic property scene and an editorial analytical overlay. The complete composition must remain understandable. Do not crop away analytical panels, labels or relevant property context.

The existing case copy and evidence state remain authoritative. The image must not turn an illustrative scenario into a verified client case.

### 4.2 Property Purchase — Three avoided mistakes

Route:

/preview/property-purchase

In the section introduced by:

- “Three purchases. Three avoided mistakes.”
- “The structure is ready. The evidence is not yet cleared.”

replace the three schematic visuals as follows:

| Card | Required source |
|---|---|
| Fiscal exposure identified | IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Fiscal exposure identified.png |
| Problematic clause renegotiated | IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Problematic clause renegotiated.png |
| Remote purchase completed | IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Remote purchase completed.png |

Do not identify people in generated or editorial scenes as actual clients. Do not imply that a displayed property, document, negotiation or outcome is a verified case unless the existing controlled content explicitly says so.

### 4.3 Property Purchase — One file

Route:

/preview/property-purchase

In the section:

“One file. From viewing to keys.”

replace the current illustrative folder/card still life with:

IMAGES/MEJORAS 23 OCTUBRE/One file. From viewing to keys.png

The new visual must communicate one coordinated record covering the legal, fiscal and practical purchase process.

Do not duplicate labels from the baked-in artwork as decorative HTML over the image. The adjacent page copy remains semantic and accessible.

---

## 5. Image presentation requirements

The seven images contain important infographics embedded in the raster composition. A simple object-cover replacement inside the old schematic dimensions may make them unreadable.

Required outcome:

- no deformation;
- no accidental crop of important text, panels, faces, keys, documents or property context;
- no horizontal overflow;
- visual balance with existing copy and cards;
- legibility at practical desktop and tablet sizes;
- a considered mobile presentation rather than an unreadable thumbnail;
- no duplicate information layers competing with text already inside the image;
- stable dimensions with no visible layout shift;
- no new false or unverified public claims.

You decide the most appropriate responsive treatment after inspecting the current components. It may involve a revised aspect ratio, a different card composition, a controlled detail view or another accessible solution. Do not force the new artwork into the previous placeholder geometry if that destroys its function.

If an enlargement or detail interaction is introduced:

- it must work with keyboard and screen reader;
- it must not rely on hover;
- focus must remain visible and controlled;
- closing and returning focus must work correctly;
- essential meaning must remain available without using the enlargement.

Generate optimized public derivatives through the existing media pipeline. Keep the original PNG files unchanged.

---

## 6. Scroll-controlled hero video

### 6.1 Reference behaviour

Use the live home at:

https://www.sarahkaterina.com/

as the interaction reference, not as a visual template to copy blindly.

The observed home behaviour is:

- a short muted video;
- plays inline;
- not conventional autoplay;
- video remains paused;
- currentTime advances and reverses according to page scroll;
- a poster is visible before the video is ready;
- media covers its visual frame;
- the experience remains a composition with semantic HTML copy and CTA.

The landing heroes must reproduce the quality and intent of this behaviour while respecting their existing layouts and content hierarchy.

Do not replace the hero H1, lead or CTA with text baked inside a video.

### 6.2 Investment hero

Route:

/preview/investment

Required source:

VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4

Communication goal:

Show the Costa Blanca as a territory of four investment routes rather than one isolated property:

- residential;
- land;
- commercial;
- redevelopment.

The video is the hero’s decision-space visual. The existing Investment H1, value proposition, CTA and decision signals remain HTML and must remain readable.

The map labels and Sarah Katerina mark inside the footage must not be cropped or obscured.

### 6.3 Property Purchase hero

Route:

/preview/property-purchase

Required source:

VIDEOS/SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4

Communication goal:

Show Sarah in the buyer’s advisory position: present, calm and independent, coordinating the purchase from the buyer’s side.

The video must not imply that the other people shown are actual clients, current team members, sellers or regulated professionals unless separately verified.

Preserve the existing promise that the advisory is on the buyer’s side. Do not invent outcomes or testimonials.

### 6.4 Tax Advisory hero

Route:

/preview/tax-advisory

Required source:

VIDEOS/BIENES RACIES QUE CRECEN.mp4

Communication goal:

Transform the attractive property into a legible system of purchase taxes, ownership obligations and ongoing costs, with Sarah as the advisory authority.

The tax landing must remain calm and credible. The visual must not add or amplify unverified percentages, savings, deadlines or universal tax conclusions.

Do not place duplicate tax chips or labels over labels already embedded in the footage.

### 6.5 Team hero — deliberate exception

Route:

/preview/team

Do not replace the authentic team hero photograph in this phase.

Reason:

- the current image is authentic team evidence;
- none of the three approved hero videos represents the four functions of the team accurately;
- reusing the Property Purchase meeting video would create duplication and could make editorial participants appear to be actual team members;
- visual consistency does not require identical media treatment on every page.

Team must be regression-tested and otherwise remain unchanged.

Future candidate, not approved in this phase:

VIDEOS DE MARCA/SARAH KATERINA BRANDING PREMIUM.mp4 in the separate Juanmaes83/sarahkaterina repository.

Do not import or use it without a separate visual, provenance and rights review.

---

## 7. Video derivation and delivery requirements

Never serve the source MP4 files directly from VIDEOS/.

Create dedicated web derivatives using the project’s approved media conventions.

Required characteristics:

- no audio track;
- web-compatible H.264 MP4;
- fast-start metadata;
- seek behaviour suitable for scroll-controlled currentTime updates;
- keyframe cadence that makes scrubbing responsive without creating unreasonable weight;
- desktop and mobile treatments where needed;
- representative poster for each hero;
- stable aspect ratio;
- no visible loading flash;
- no autoplay loop;
- no remote third-party video player;
- no dependency on sound for meaning.

Quality and performance targets are goals, not permission to destroy text legibility:

| Asset | Target |
|---|---:|
| Desktop hero derivative | approximately 2–4 MB |
| Mobile hero derivative | approximately 1–2 MB |
| Poster | approximately 100–250 KB |

If these targets cannot be reached without damaging embedded text or visual continuity, document the measured trade-off and choose the smallest version that remains usable.

Do not commit multiple experimental transcodes. Commit only the selected derivatives and documented posters.

Use descriptive public filenames rather than the original marketing names or Kling export names.

---

## 8. Motion contract

The scroll-controlled hero must:

- map a bounded hero scroll range to video currentTime;
- progress when scrolling down;
- reverse when scrolling up;
- clamp cleanly at the first and final frames;
- avoid uncontrolled playback;
- avoid scroll jank and excessive main-thread work;
- stop doing work when the hero is outside the relevant range;
- avoid hydration mismatches;
- tolerate metadata loading delays;
- preserve the poster until the first usable frame is ready;
- maintain the final static visual if video seeking fails.

The implementation must integrate with the existing motion system instead of creating an unrelated second animation framework.

Do not prescribe the internal component design in advance. Inspect the code and choose a maintainable shared abstraction only if it materially reduces duplication and preserves the distinct hero compositions.

---

## 9. Reduced motion, no-JS and failure behaviour

With prefers-reduced-motion:

- do not scrub the video;
- show a representative static poster;
- keep all semantic copy, links and CTA available;
- do not hide content behind an animation state.

If JavaScript is unavailable or video metadata fails:

- the poster remains visible;
- no empty black rectangle;
- no endless loading state;
- all navigation and conversion actions continue to work.

The video is decorative/supporting media. It must be aria-hidden unless an accessible description is necessary. Do not expose meaningless video controls.

---

## 10. Responsive art direction

Verify at minimum:

- 320 px
- 375 px
- 390 px
- 768 px
- 1024 px
- 1280 px
- 1440 px

At every width:

- no horizontal overflow;
- no distorted images or videos;
- no important embedded labels cropped;
- no face or subject accidentally removed;
- hero H1 and CTA retain priority;
- header and PrototypeBanner remain usable;
- video does not make the first screen confusing or unreadable;
- sticky or extended scroll behaviour, if used, does not trap the user;
- mobile does not inherit an unnecessarily long desktop scroll distance;
- browser controls and safe areas do not cover essential content.

The desired result is inspired by the home’s scroll behaviour, not a forced full-screen clone. Preserve the editorial split composition where it gives the landing better hierarchy.

---

## 11. Content, claims and trust restrictions

Do not:

- change approved page copy;
- change titles, pricing, percentages, deadlines, testimonials or claims;
- create new tax, legal or investment claims;
- present illustrative artwork as a real case;
- identify editorial people as clients;
- identify editorial people as team members;
- present generated documents as genuine legal or fiscal documents;
- infer a location or investment result from an image;
- remove “illustrative”, “pending”, “withheld” or controlled evidence states;
- publish client outcomes that have not cleared the existing evidence gates;
- add “high return”, guaranteed return, savings or success language;
- use the rejected fiscal image that contains unvalidated universal percentages;
- change noindex/nofollow controls on Preview routes.

Keep the existing claim-control architecture intact.

---

## 12. Media registry and documentation

Update the appropriate approved-media registry, manifests and tests according to the current repository conventions.

Document at minimum:

- immutable source path;
- source SHA;
- derivative path;
- derivative dimensions;
- duration for video;
- codec and audio state;
- final byte size;
- poster path and byte size;
- assigned route and slot;
- focal/crop decision;
- alt text or decorative status;
- provenance/rights status;
- whether the asset is illustrative.

Do not delete prior approved assets if they remain in use elsewhere.

Do not modify the original files in:

- IMAGES/MEJORAS 23 OCTUBRE/
- VIDEOS/

---

## 13. Performance acceptance criteria

Measure rather than assume.

The implementation must not:

- load more than the relevant page’s hero video;
- preload video assets belonging to another landing;
- block semantic hero rendering on video readiness;
- make the video the LCP element when a poster can provide a more stable first render;
- introduce significant CLS;
- introduce continuous scroll work after leaving the hero;
- keep decoded video resources alive unnecessarily across route changes.

Report:

- original and derivative sizes;
- request behaviour;
- whether audio was removed;
- observed LCP/CLS impact in Preview;
- mobile network behaviour;
- any compromise made for text legibility.

If a hero video materially harms performance or interaction on a target device, the poster fallback is preferable to forcing motion.

---

## 14. Tests

Run the repository’s full required validation suite, including:

- lint;
- typecheck;
- unit/integration tests;
- production build;
- secret and environment hygiene;
- existing media manifest tests;
- existing Preview/noindex tests.

Add focused tests for this phase that verify:

1. all seven approved image sources are represented in the approved derivative system;
2. exact image-to-slot mapping;
3. no image is used in the wrong case;
4. the One File image replaces the former illustrative still life;
5. exact video-to-hero mapping;
6. Team does not receive a video;
7. no source is served directly from IMAGES/ or VIDEOS/;
8. hero derivatives contain no audio track, if this is testable in the repository;
9. each video hero has a poster fallback;
10. reduced-motion produces a static experience;
11. Preview remains noindex/nofollow;
12. no unrelated claims or copy change;
13. no duplicate hero video usage;
14. Tax and Team regressions remain controlled;
15. no horizontal overflow at target widths.

Do not create brittle tests that merely snapshot implementation details. Test the approved contract.

---

## 15. Browser and visual QA

Test these routes:

- /preview/investment
- /preview/property-purchase
- /preview/tax-advisory
- /preview/team

For the first three, verify:

- initial poster;
- scroll down progression;
- scroll up reversal;
- first and last frame;
- rapid scrolling;
- slow scrolling;
- video metadata delayed;
- reduced motion;
- no JavaScript or the closest supported fallback test;
- keyboard navigation;
- focus visibility;
- mobile menu;
- CTA functionality;
- no console errors;
- no hydration warnings.

Team must be visually unchanged except for incidental shared changes that are demonstrably necessary and harmless.

---

## 16. Required screenshots and evidence

Create a new, clearly named folder under:

docs/screenshots/

Include:

### Investment

- full page at 1440 px;
- full page at 390 or 375 px;
- hero initial state;
- hero middle scroll state;
- hero final state;
- close-up of all three case images on desktop;
- mobile evidence for the three cases.

### Property Purchase

- full page at 1440 px;
- full page at 390 or 375 px;
- hero initial, middle and final states;
- close-up of all three avoided-mistake images;
- One File image on desktop and mobile.

### Tax Advisory

- full page at 1440 px;
- full page at 390 or 375 px;
- hero initial, middle and final states.

### Team

- desktop and mobile regression screenshots confirming the authentic hero remains unchanged.

Also provide a short screen recording or equivalent frame sequence demonstrating that scroll down and scroll up both control the hero video correctly. Do not rely only on a static final screenshot to prove the interaction.

---

## 17. Git workflow

1. Start from the latest main.
2. Read this complete document.
3. Inspect current implementation and prior media/motion decisions.
4. Create a new descriptive feature branch.
5. Implement only this approved scope.
6. Run all validations.
7. Open a Pull Request against main.
8. Wait for CI and Vercel.
9. Provide direct Preview links.
10. Do not merge.
11. Do not deploy to production.

If another open media PR overlaps these components or manifests, report the conflict and rebase safely before completing the work. Do not overwrite unrelated user changes.

---

## 18. Required final report

Claude Code must return:

1. executive summary;
2. exact branch name;
3. source commit from main;
4. table: image source → derivative → component → route → slot;
5. table: video source → desktop/mobile derivative → poster → component → route;
6. final dimensions, duration, codec, audio state and byte size;
7. explanation of the chosen scroll interaction;
8. explanation of mobile and reduced-motion behaviour;
9. performance findings;
10. accessibility findings;
11. complete test results;
12. browser matrix and viewport results;
13. list of modified files;
14. confirmation that originals were not changed;
15. confirmation that no claim, price, percentage, deadline or testimonial changed;
16. confirmation that Team hero remained authentic and unchanged;
17. PR link;
18. Vercel Preview root link;
19. direct links to all four Preview routes;
20. link to screenshots/evidence;
21. final commit SHA;
22. unresolved risks, especially provenance or rights;
23. exact final status:

**NO MERGE REALIZADO — PENDIENTE DE REVISIÓN VISUAL HUMANA.**

Do not report the phase as complete without working review links.

---

## 19. Owner-approved mapping summary

| Page | Area | Approved asset |
|---|---|---|
| Investment | Hero scroll video | VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4 |
| Investment | Case 01 | Investment Refurbished villa.png |
| Investment | Case 02 | Investment Apartment for letting.png |
| Investment | Case 03 | Investment Land with development.png |
| Property Purchase | Hero scroll video | VIDEOS/SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4 |
| Property Purchase | Case 01 | Property Purchase Fiscal exposure identified.png |
| Property Purchase | Case 02 | Property Purchase Problematic clause renegotiated.png |
| Property Purchase | Case 03 | Property Purchase Remote purchase completed.png |
| Property Purchase | One File | One file. From viewing to keys.png |
| Tax Advisory | Hero scroll video | VIDEOS/BIENES RACIES QUE CRECEN.mp4 |
| Team | Hero | Keep current authentic team photograph |

This table is authoritative for Phase 2F.

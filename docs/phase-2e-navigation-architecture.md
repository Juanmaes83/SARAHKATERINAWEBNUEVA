# Phase 2E — Navigation Architecture and ThreeUI Reference

**Status:** APPROVED REFERENCE FOR IMPLEMENTATION  
**Date:** 2026-09-22  
**Repository:** `Juanmaes83/SARAHKATERINAWEBNUEVA`  
**Workstream:** Phase 2E — Premium Media, Motion & Visual Refinement

---

## 1. Decision

The repository `Juanmaes83/threeui` is an approved reference for improving the
navigation and interaction model of the Sarah Katerina website.

It is a reference for interaction patterns and information architecture only. It
is not a visual template for Sarah Katerina, it is not a dependency, and its
application shell must not be copied wholesale.

The Sarah Katerina website must remain faithful to the approved Investment
template and its adaptations for Tax Advisory and Property Purchase.

Reference repository:

- [Juanmaes83/threeui](https://github.com/Juanmaes83/threeui)
- [ThreeUI README](https://github.com/Juanmaes83/threeui/blob/main/README.md)
- [ThreeUI application shell](https://github.com/Juanmaes83/threeui/blob/main/src/App.tsx)
- [ThreeUI sidebar](https://github.com/Juanmaes83/threeui/blob/main/src/components/Sidebar.tsx)
- [ThreeUI search dialog](https://github.com/Juanmaes83/threeui/blob/main/src/components/SearchDialog.tsx)
- [ThreeUI browse experience](https://github.com/Juanmaes83/threeui/blob/main/src/components/BrowsePage.tsx)

The repository was inspected in read-only mode. No change is authorised or
required in `threeui`.

---

## 2. What we keep in Sarah Katerina

The following decisions are approved for the shared web layer:

1. **Editorial template header**  
   Keep the header composition, typography, palette and editorial hierarchy of
   the approved Investment template.

2. **Horizontal desktop navigation**  
   Keep the primary desktop navigation horizontal and aligned with the template.
   It must not be replaced by a technical documentation sidebar.

3. **Fullscreen/off-canvas mobile navigation**  
   Improve the mobile menu using the interaction quality of ThreeUI's responsive
   sidebar: clear opening state, visible close control, Escape support, focus
   trap, scroll lock and focus restoration.

4. **Active-section indicator / scrollspy**  
   The navigation must communicate which section is currently visible. Use
   stable semantic section IDs and an IntersectionObserver or equivalent
   scrollspy mechanism. The active state must be available to keyboard and
   assistive-technology users through `aria-current` or an equivalent semantic
   state.

5. **Contextual navigation by landing**  
   The navigation must remain contextual to the landing being viewed. The
   canonical section vocabulary is:

   - Approach
   - Asset types
   - Process
   - Report
   - About Sarah
   - FAQ

   Tax Advisory and Property Purchase may add landing-specific entries where
   their approved templates require them, but they must preserve the same
   hierarchy and shared navigation quality.

6. **Soft transitions between sections**  
   Anchor navigation may use smooth scrolling and restrained transitions. No
   scroll-jacking, forced waiting, or motion that damages reading speed.

7. **Command palette later, only if useful**  
   A `Cmd/Ctrl + K` command palette is a possible future enhancement inspired by
   ThreeUI's search dialog. It is not mandatory for Phase 2E. It should only be
   implemented if it provides a real benefit for navigating services,
   calculators, reports, FAQs or resources.

8. **Accessibility and reduced motion**  
   Visible focus, keyboard navigation, correct dialog semantics,
   `prefers-reduced-motion`, and no content hidden only because animation has
   not run are mandatory.

---

## 3. Patterns adopted from ThreeUI

ThreeUI is particularly useful for these implementation patterns:

- persistent desktop navigation with a clear active state;
- responsive off-canvas navigation;
- collapsible navigation groups;
- route state synchronised with the URL;
- keyboard handling for Escape and command shortcuts;
- focus-aware interaction states;
- search/filter interaction with immediate feedback;
- preview affordances on hover and focus;
- responsive layout changes without losing navigational context;
- reduced-motion handling;
- scroll reset or focus management after route changes.

These patterns must be translated into Sarah Katerina's editorial language. They
must not introduce a catalogue, dashboard or developer-tool visual language into
the public-facing landing pages.

---

## 4. Implementation contract for Phase 2E

### 4.1 Shared layer

All three routes must continue to use the existing shared web layer:

- `/preview/investment`
- `/preview/tax-advisory`
- `/preview/property-purchase`

Navigation primitives, mobile menu behaviour, scrollspy logic, focus handling
and motion utilities belong in the shared layer when they are common to all
routes. Do not create a second header, footer, token file or parallel
navigation architecture.

Landing-specific labels and section order may remain in each route's content
configuration.

### 4.2 Desktop

- Preserve the horizontal editorial header.
- Keep navigation legible and visually quiet.
- Provide a clear active state without turning the header into a heavy control
  panel.
- Use sticky positioning only when it improves orientation and does not obscure
  content.
- Preserve the generous spacing and rhythm of the template.
- Do not add a permanent ThreeUI-style sidebar unless Juanma approves a visual
  prototype first.

### 4.3 Mobile

The mobile navigation should behave as a premium fullscreen/off-canvas panel:

- opens from the header control;
- traps focus while open;
- closes with an explicit close control, Escape and navigation selection;
- restores focus to the trigger;
- prevents background scrolling while open;
- exposes the correct dialog/navigation semantics;
- remains usable at 320px, 375px and 390px;
- respects reduced motion;
- never leaves the page in a blank or visually locked state.

### 4.4 Scrollspy and anchors

Every navigable landing section must have:

- a stable unique ID;
- a visible heading;
- a matching navigation label;
- a sensible focus target;
- correct active-state behaviour during scrolling;
- a fallback that still works when JavaScript is unavailable or motion is
  reduced.

The implementation must not make the section content dependent on an
IntersectionObserver callback. Content must be present and readable immediately.

### 4.5 Motion

Use CSS or the existing native motion foundation. GSAP or another motion
equivalent may be introduced only when it materially improves the experience.

Required:

- purposeful reveals and section transitions;
- no decorative motion everywhere;
- no motion that competes with editorial reading;
- no scroll-jacking;
- `prefers-reduced-motion: reduce` disables non-essential animation and
  transition;
- reduced-motion mode must not hide content or depend on delayed reveals.

---

## 5. Media rule for visual implementation

Images that contain embedded logos, watermarks or provisional text may be used in
Phase 2E as **PROVISIONAL MEDIA — HUMAN VISUAL REVIEW ONLY**.

They may be used to validate:

- composition;
- scale;
- crop;
- rhythm;
- image-to-copy relationship;
- responsive behaviour;
- overall visual direction.

They are not final production assets. Embedded image text must not be silently
reused as website copy or treated as an approved claim.

When Juanma approves the composition:

1. the image is retouched or cleaned;
2. the final asset replaces the provisional file while preserving the intended
   slot and aspect ratio;
3. the asset map records provenance, crop, treatment and status;
4. the web implementation adds responsive formats, `alt`, `sizes` and
   performance optimisation;
5. the route is reviewed again visually before merge.

This rule allows visual progress without confusing provisional media with final
brand or marketing assets.

---

## 6. Explicit exclusions

Phase 2E must not:

- add `threeui` as an npm dependency;
- copy ThreeUI's entire application shell;
- introduce Three.js, WebGL or shader effects merely because ThreeUI contains
  them;
- replace the approved editorial header with a developer-catalogue sidebar;
- introduce a second token system;
- invent new brand colours, claims, contacts or metrics;
- publish or index any preview route;
- make a production decision silently;
- bypass Juanma's human visual review.

---

## 7. Acceptance criteria

Before the Phase 2E navigation work is accepted:

- all three preview routes use the same shared navigation implementation;
- desktop remains faithful to the approved editorial template;
- mobile navigation is fully operable by keyboard;
- Escape closes the mobile menu and returns focus correctly;
- background scroll is locked only while the menu is open;
- active section state works at desktop and mobile widths;
- all anchors work at 320, 375, 390, 768, 1024 and 1440px;
- no horizontal overflow is introduced;
- no content remains hidden after fast scrolling or in reduced-motion mode;
- focus is visible on all interactive navigation controls;
- `prefers-reduced-motion` produces zero non-essential animations and transitions;
- no duplicate header, footer, token layer or navigation architecture appears;
- Juanma reviews the Vercel preview visually before merge.

---

## 8. Final principle

ThreeUI gives us useful interaction know-how. Sarah Katerina must absorb that
quality without becoming a copy of ThreeUI.

**Use ThreeUI to improve orientation, navigation and interaction quality. Use the
Investment template to define the visual identity, composition, tone and
editorial experience.**

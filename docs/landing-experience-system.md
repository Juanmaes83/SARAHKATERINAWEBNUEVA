# Landing Experience System

**Status:** WORKING SPECIFICATION — not an approved design system
**Date:** 2026-09-21
**Scope:** the composition rules the Investment prototype implements

`PROJECT-STATUS.md` places a Landing Experience System after the Creative Brand
System and states that current landing design, content, animation, CRO and
personalisation are **NOT APPROVED**. This document does not pre-empt that
workstream. It records the composition decisions actually made in this
prototype so they can be reviewed, reused or rejected on evidence.

---

## 1. Section grammar

Every landing is built from the same ordered blocks. Order carries meaning:
promise → tension → routing → mechanism → process → reasoning → free tool →
authority → evidence → objections → commitment.

| # | Block | Job | Fails when |
|---|---|---|---|
| 1 | Navigation | Orient, offer language, offer one contextual action | It offers one universal CTA for every intent |
| 2 | Hero | State the outcome and show the deliverable | It is a headline alone in whitespace |
| 3 | Trust strip | Establish what is verifiable | It presents unverified figures as facts |
| 4 | Problem | Name the reader's actual decision | It is generic anxiety copy |
| 5 | Decision doors | Route by entry point, not by service | Every door leads to the same place |
| 6 | Visual proof | Show the mechanism | The visual decorates instead of explaining |
| 7 | Process | Make the sequence and the deliverables concrete | Stages have no artefact attached |
| 8 | Benefits | Separate feature from benefit from outcome from risk | Six near-identical text cards |
| 9 | Buyer System | Offer real value before any commitment | The first result sits behind a form |
| 10 | Authority | Establish who is answerable, and the limits | It claims credentials without a dossier |
| 11 | Cases | Prove outcomes with permission | It invents or implies results |
| 12 | FAQ | Remove the objection that stops the decision | Answers are keyword bait |
| 13 | Final CTA | Reduce the cost of the next step | It escalates commitment |
| 14 | Footer | Close honestly | It fabricates entity or contact data |

### Rules that apply across all blocks

- **One h1 per page**, in the hero. Every block heading is an h2. Sub-items are
  h3. No level is skipped.
- **Air before density.** Section rhythm is 48 / 64 / 80px from the canonical
  scale; below 768px every section stays at the 48px baseline.
- **Reading measure is capped at 62ch.** Any prose wider than that is a bug.
- **Nothing unconfirmed renders in the visual language of something
  confirmed.** A pending value is typographically demoted and badged.

---

## 2. Composition decisions made here

### Hero: copy plus deliverable skeleton

The hero pairs the headline with a **labelled skeleton of the review summary**
— row labels, a scenario strip, a footer note — with every value rendered as a
withheld rule rather than a number.

This satisfies the proposal's "hero con texto + prueba visual" without
inventing a financial figure. It also degrades honestly: a reader sees the
*shape* of the deliverable, and the caption says plainly that no figure is
approved.

### Decision doors: three, by situation

Doors are named by the reader's position ("I have a specific property in
mind"), not by service name. Three is the ceiling: a fourth turns a routing
decision back into a menu.

### Visual proof: a scenario switcher with no data

A WAI-pattern tab set — arrow keys, Home/End, roving tabindex — over three
scenarios. The chart is explicitly a placeholder, badged `NO FIGURES —
PENDING_APPROVAL`, and its bars are fixed proportions of the container, not
data. The component's own documentation says so, so a future contributor
cannot mistake it for a chart awaiting a dataset.

### Process: five stages, three facets each

Each stage states what happens, what the client receives, and which decision it
enables. Duration is a fourth facet and is **pending on every stage** — no
turnaround is confirmed. Rendered as an ordered list so the sequence survives
without CSS.

### Benefits: four-part structure, enforced

Feature → benefit → outcome in practice → risk removed. The structure is
enforced by a test, which is what prevents the section degrading into six
repetitive text cards.

### FAQ: independent disclosures

Each question is its own disclosure, not a single-select accordion: a reader
comparing two answers should not have one close the other. Panels are removed
from the DOM when collapsed, so a future `FAQPage` schema can only ever
describe content that is actually rendered.

---

## 3. Motion

Functional only. Canonical tokens only: 150ms interaction, 400ms reveal,
`cubic-bezier(.22, .8, .3, 1)`, 10px distance.

| Where | What | Why it earns its place |
|---|---|---|
| Hero | Reveal on load, copy then visual | Establishes reading order |
| Section entries | Reveal on scroll, staggered, capped at 4 steps | Long editorial pages read as distinct units rather than one wall |
| Scenario switch | 150ms opacity | Signals the panel changed without redrawing the page |
| Buttons, cards, tabs | 150ms colour and border | Confirms the control responded |
| Accordion marker | 150ms rotate | Shows state, not decoration |

### What is deliberately absent

No scroll-jacking. No parallax. No GSAP or any animation library. No animated
counters — an animated number implies a real number.

### Safety properties of `RevealOnScroll`

1. Content is **visible by default in the markup**. The hidden state is only
   applied after JavaScript confirms it can also remove it, so a failed
   hydration or a blocked script never produces blank space.
2. `prefers-reduced-motion` short-circuits the effect entirely — no observer is
   created and nothing is ever hidden.
3. The observer disconnects after the first reveal. Nothing re-hides.
4. `beforeprint` reveals everything, because printing never scrolls.

**Known limitation:** a screenshot tool that captures beyond the viewport
without scrolling will photograph unrevealed sections as blank. This is a
tooling artefact, not a user-facing defect — the content is in the DOM
throughout — but it is why the QA screenshots for this phase were taken with a
tall viewport that forces every observer to fire.

---

## 4. Responsive

Mobile-first. The primary collapse is 768px (`PENDING_APPROVAL`; upstream
leaves 768 vs 900 deferred).

| Width | Behaviour |
|---|---|
| 320 | Single column throughout; full-width CTAs; trust strip one per row |
| 375 | Trust strip two per row |
| 768 | Desktop navigation; two-up grids; timeline facets go three-across; wider gutters |
| 1024 | Three- and four-up grids; hero splits into copy + visual; trust strip six across |
| 1440 | Container caps at 1200px content width |

Verified at all five widths: zero horizontal overflow, exactly one h1, no
interactive target under 44px.

---

## 5. Accessibility contract

- Focus is surface-aware: Forest on light, Ivory on Forest, 2px solid at 2px
  offset. Dark sections opt in via `data-surface="dark"`.
- Tabs implement the WAI pattern; only the selected tab is in the tab order.
- Disclosures are native buttons with `aria-expanded` and `aria-controls`.
- The scenario chart carries an `aria-label` saying no figures are shown.
- Withheld values carry `role="img"` and an accessible name, so a screen-reader
  user learns the value is withheld rather than encountering silence.
- Every status badge is text, never colour alone.

---

## 6. What this system does not yet cover

| Gap | Why |
|---|---|
| Personalisation | Explicitly NOT APPROVED upstream |
| A/B testing | Requires instrumentation and an approved hypothesis |
| Lead capture UI | The product question of where capture lives is unanswered |
| Localised ES composition | Spanish routes do not exist; hreflang is deliberately not emitted |
| Case study layout | Blocked on written permission and verified figures |
| Schema emission | Blocked until content is visible and verified |
| Print stylesheet | Not required by this phase |

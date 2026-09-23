# Phase 2E — Motion system

Status: **PROPOSAL — PENDING JUANMA'S VISUAL APPROVAL**
Updated: 2026-10-23
Branch: `feat/phase-2e-premium-media-motion-2026-09-22`
Companion: [`phase-2e-premium-experience.md`](phase-2e-premium-experience.md) (creative direction, audit, QA)

This document is the rulebook for every movement on the four preview landings
(`/preview/investment`, `/preview/tax-advisory`, `/preview/property-purchase`,
`/preview/team`). It extends — it does not replace — the motion contract in
[`landing-experience-system.md` §6](landing-experience-system.md) and the
canonical `--sk-motion-*` tokens. No animation library was added.

---

## 1. Principles

1. **Motion explains; it never decorates.** Every movement must answer "what
   does the reader understand better because this moved?" If the answer is
   "nothing", it is removed.
2. **One thread.** The recurring gesture is a fine gold line that draws: under
   section titles, along the process timelines, between the stages of the
   purchase file, across the header as the page is read. It is the visual form
   of the brand idea — one connected decision, held by one person.
3. **Content is never hostage.** Nothing is hidden until JavaScript has proven
   it can reveal it; nothing already on screen is ever hidden; reduced motion
   and no-JS render the final state immediately.
4. **Scroll belongs to the reader.** No scroll-jacking, no pinning, no scroll
   snapping, no smooth-scroll library. Scroll-linked effects are native CSS and
   bound to an element's own visibility.
5. **Values never move.** Illustrative figures are never counted up, tweened or
   animated. Sample chart _shapes_ may draw; numbers may not.
6. **Shared primitives only.** One reveal component, one entrance stylesheet,
   one token set. Landing stylesheets may choreograph their own signature
   moment using those primitives — nothing more.

---

## 2. Tokens

Defined in `app/web-tokens.css` (scoped website layer). Every duration is a
canonical value or an explicit multiple of one; there is one easing curve.

| Token                           | Value                       | Derivation                      | Use                                                         |
| ------------------------------- | --------------------------- | ------------------------------- | ----------------------------------------------------------- |
| `--sk-web-motion-ease`          | `cubic-bezier(.22,.8,.3,1)` | `= --sk-motion-ease-standard`   | Every movement                                              |
| `--sk-web-motion-quick`         | 150ms                       | `= --sk-motion-duration-fast`   | Hover, press, focus, FAQ marker                             |
| `--sk-web-motion-reveal`        | 400ms                       | `= --sk-motion-duration-reveal` | Scroll reveal, drawn connectors                             |
| `--sk-web-motion-unveil`        | 500ms                       | `reveal × 1.25`                 | Hero entrance, media unveil, title rules (contract ceiling) |
| `--sk-web-motion-settle`        | 800ms                       | `reveal × 2`                    | Ambient image settle only — never gates reading             |
| `--sk-web-motion-stagger`       | 60ms                        | `fast × 0.4`                    | Stagger step (the value RevealOnScroll already used)        |
| `--sk-web-motion-distance`      | 10px                        | `= --sk-motion-distance-reveal` | Reveal lift                                                 |
| `--sk-web-motion-distance-hero` | 24px                        | `= --sk-space-24`               | Hero entrance lift                                          |
| `--sk-web-motion-media-scale`   | 1.06                        | unitless                        | Image settle start                                          |
| `--sk-web-motion-hover-scale`   | 1.03                        | unitless                        | Card photograph under pointer                               |

`tests/motion.test.ts` enforces: derivation from canonical tokens, the single
easing, no raw durations in website stylesheets, no animation dependency.

**Why `settle` exceeds 500ms.** The contract says "generally 150–500ms". The
settle is a scale from 1.06 to 1 on a photograph that is already fully visible
and legible from the first frame; it reads as light, not as a wait. Nothing
textual or interactive ever uses it.

---

## 3. Intensity levels

| Level | Name               | What moves                                                 | Where                                                                                                        | Budget                                                 |
| ----- | ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| L0    | Feedback           | colour, border, 2–4px lift, arrow nudge, marker rotation   | every control and card; hover **and** `:focus-visible` / `:focus-within`                                     | `quick`                                                |
| L1    | Arrival            | opacity + 10px (`rise`) or opacity only (`fade`)           | copy blocks, cards, lists as they enter                                                                      | `reveal`, stagger ≤ 4 steps                            |
| L2    | Editorial media    | frame opens from its lower edge (`unveil`) + image settles | large editorial photographs only: split-section media, authority portrait, final-CTA image, Team photographs | `unveil` + `settle`                                    |
| L3    | Signature sequence | one thread drawing through a sequence                      | one per landing (§5)                                                                                         | ≤ 400ms per step, ~1.5s total, content already visible |
| L4    | Entrance           | composed first-viewport arrival                            | the hero only, once per page load                                                                            | ~0.9s total                                            |

A page may have **one** L4 and **one** L3. L2 is never used on grids of cards —
card photographs only settle (L1), so a row of cards never becomes a row of
competing effects.

---

## 4. Shared components

### `components/motion/RevealOnScroll.tsx` (extended)

- `variant`: `rise` (default) · `fade` · `unveil` · `none`.
- Arrival is a one-shot CSS **animation** with `backwards` fill, not a
  transition. Previously the reveal transition shared the `transition` property
  with the component's own hover feedback, so one silently replaced the other
  and the stagger delay also delayed every later hover. Fixed.
- Never arms an element that is already on (or above) the screen when the
  script runs. Previously the hero blinked out and faded back in after
  hydration.
- Exposes `data-reveal="pending|shown"` only once armed. Descendant
  choreography (title rules, timeline threads, calendar bars, charts) keys off
  that attribute, so it is inert without script or with reduced motion.
- Keeps the fast-scroll safety net (rAF scroll check) and the `beforeprint`
  reveal.

### 4.1 The reveal line — when an arrival starts (2026-10-23)

**Problem, measured.** Arrivals fired while the block was still at the bottom
edge of the screen, so the movement was over before the reader got there. On
all three service landings, at 375 and 1440 px, an element's top was at
**96–101 % of the viewport height (median ≈ 99 %)** when it switched to
`data-reveal="shown"` (Playwright, steady wheel scroll, every armed element).

**Cause.** Two triggers disagreed. The `IntersectionObserver` used
`rootMargin: '0px 0px -10% 0px'` (≈ 90 %), but the rAF scroll fallback
revealed anything with `top < window.innerHeight` (100 %) — and on any real
scroll the fallback always won. Because `data-reveal="shown"` also starts every
descendant (title rules, gold threads, connectors, calendar bars, charts), all
of them ran early too.

**Fix — one rule.** `components/motion/revealLine.ts` defines the reveal line
and `hasReachedRevealLine(node, line)`: _true once the element's top reaches
the line, or — at the very end of the page, where nothing can scroll higher —
once it is on screen._ Every path asks this one function: the observer (whose
`rootMargin` is derived from the same line, so it wakes at the right moment),
the scroll and resize fallback (fast scroll, anchor jumps), elements mounted
after hydration, and QA/captures, which read the page's line from
`<html data-sk-reveal-line>`. There is no timer and no global delay.

| Viewport | Line     | Why                                                                         |
| -------- | -------- | --------------------------------------------------------------------------- |
| < 768 px | **78 %** | Short screens and large thumb scrolls; the sticky header already takes ~8 % |
| ≥ 768 px | **72 %** | Taller viewports; the block must be well inside the reading zone            |

Opt-in by page through `<RevealLineProvider line="reading-zone">` on
Investment, Tax Advisory and Property Purchase. Every other page — **Team**
included — keeps the edge line (`1`), which reproduces the effective timing it
already had, now with one rule instead of two.

**Unchanged:** the hydration rule (anything on screen when the script arrives
is never hidden — no flicker), stagger, reduced motion (never armed), no-JS
(never armed), `beforeprint`.

**Measured after** (same method):

| Route @ width                 | Reveal position (median, p10–p90) | Arrival end vs block centre reaching mid-screen at 800 px/s (median) |
| ----------------------------- | --------------------------------- | -------------------------------------------------------------------- |
| Investment @375               | 77 % (75–79)                      | −4 ms (finishing as the reader arrives)                              |
| Investment @1440              | 71 % (70–73)                      | −25 ms                                                               |
| Tax Advisory @375             | 77 % (75–79)                      | −3 ms                                                                |
| Tax Advisory @1440            | 70 % (69–72)                      | −53 ms                                                               |
| Property Purchase @375        | 77 % (75–79)                      | −17 ms                                                               |
| Property Purchase @1440       | 71 % (70–72)                      | −30 ms                                                               |
| Team @375 / @1440 (unchanged) | 99 % / 98 %                       | —                                                                    |

Negative = the base arrival finishes just as the block's centre reaches the
middle of the screen; descendant sequences (threads, bars, connectors) are
still running then. Same number of elements revealed before and after; zero
elements left hidden at 320–1440 px, after fast scroll, after anchor jumps,
without JavaScript and with reduced motion. Filmstrips:
`docs/screenshots/phase-2e-content/reveal-line-{375,1440}-before-after.jpg`
(top row before, bottom row after; frames at block top 95 → 45 %).

### `components/motion/Entrance.module.css` (new)

CSS-only first-viewport entrance, runs from first paint:

| Class                 | Behaviour                                                                                        | Timing                 |
| --------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- |
| `entrance.copy`       | children rise in sequence                                                                        | 500ms each, 60ms apart |
| `entrance.media`      | frame opens from lower edge, image settles                                                       | starts at 120ms        |
| `entrance.float`      | proof card lands last over the media                                                             | starts at 420ms        |
| `entrance.depthFront` | scroll-linked drift of the proof card as the hero exits (`view()` timeline, `@supports`-guarded) | bound to hero exit     |

Used by all four heroes. All of it sits inside
`@media (prefers-reduced-motion: no-preference)`.

### Other shared hooks

- `TerritoryVisual` — `unveil` prop (L2), photographs settle on arrival,
  `crop="compact" | "full"` art-direction crop, `data-media-photo` hook for card
  hover.
- `WebSection` — title rule draws on arrival (the thread, smallest form).
- `WebBands` `.step` — gold thread per process step, drawn in sequence via
  `--sk-stage-index`; numeral lands with the `scale` property so it composes
  with its centring transform.
- `SampleChart` — draw/grow animations are paused while their section is
  `pending` and play when it arrives (previously they finished on page load,
  off screen).
- `WebHeader` — reading-progress thread (`scroll(root)` timeline), active
  section (`aria-current="location"`), translucent scrolled state, mobile panel
  entrance, panel links close the dialog.
- `WebFaq` — answer eases in on open; closing is instant; open item keeps the
  gold edge.
- `WebButton` — arrow nudge also on `:focus-visible`.

---

## 5. Signature sequences (L3) per landing

| Landing           | Sequence                                                                                                           | Register                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Investment        | Scenario lines draw apart when the chart is seen; process thread draws step to step                                | analytical — divergence of outcomes is the argument       |
| Tax Advisory      | Annual calendar: each obligation's bar sweeps along the months, row after row, chart arrives with `fade` (no lift) | precision — exact, calm, no flourish; no hero depth drift |
| Property Purchase | The seven-stage file: gold connector draws stage to stage, each marker lands as its connector reaches it           | accompaniment and control — the file visibly joined up    |
| Team              | The journey: one line joins the five stages (down on phones, across on desktop), numerals land in turn             | human — people connected, not a dashboard                 |

---

## 6. Reduced motion (`prefers-reduced-motion: reduce`)

Verified in Chromium on all four routes (see QA in the companion document):

- `RevealOnScroll` never arms → `data-reveal` count **0**, nothing ever hidden.
- Entrance, depth, header progress, panel entrance, FAQ easing: all inside
  `no-preference` media queries → not applied (`h1` animation-name `none`).
- Signature sequences and thread draws: `animation: none`, `transform: none`.
- Smooth anchor scrolling disabled (instant jump).
- Global rule in `globals.css` still neutralises any stray duration.
- Content hidden at load: **0**; after instant scroll to the end: **0**.

## 7. No JavaScript

- No element is armed, so no `data-reveal`, no hidden state.
- CSS entrance still runs (it is CSS) and ends at full opacity; measured hidden
  elements 1.5s after load: **0** on every route.
- Charts draw once on load (their pause hook needs `pending`, which never
  appears).

## 8. Responsive

- Same choreography at every width; only geometry changes (Team thread runs
  vertically below 1024px; Tax and Investment threads exist only where the
  timeline is horizontal, ≥1024px).
- Entrance on phones: the hero media is often below the first viewport; its
  CSS entrance has finished by then and the wrapper's `rise` handles its
  arrival when scrolled to.
- Scroll-linked effects (`view()` / `scroll()`) are feature-detected; browsers
  without them render the static composition, with nothing missing.

## 9. Accessibility

- Focus parity: every hover affordance on a card or button also answers to
  `:focus-visible` or `:focus-within`.
- The progress thread is `aria-hidden`; the active section is exposed
  semantically with `aria-current="location"`.
- Motion never moves focus, and focus never waits on motion.
- The mobile dialog: focus to Close on open, Tab trapped, Escape closes, focus
  returns to Menu, body scroll restored; following a link closes it.

## 10. Rejection criteria

Reject (or remove) any motion that:

- hides content that is on screen, or keeps content hidden for more than one
  reveal duration after it enters;
- binds to raw scroll position to move content (parallax on text, pinning,
  horizontal hijack, snap);
- animates a figure, a price, a percentage or a result;
- exceeds 500ms on anything textual or interactive;
- introduces a second easing curve, a raw duration or a library;
- repeats on scroll-up or loops;
- competes with the hero entrance or the page's single signature sequence;
- has no reduced-motion and no-JS path;
- makes a card grid move as individual showpieces.

## 11. Adding motion later — checklist

1. Which level (§3)? Does the page already have its L3/L4?
2. Tokens only (`--sk-web-motion-*`).
3. Keyed to `data-reveal` or an `@media (prefers-reduced-motion: no-preference)`
   block, never unconditional.
4. Final state renders without JavaScript.
5. Add or extend an assertion in `tests/motion.test.ts`.
6. Capture before/after at 375 and 1440 and a filmstrip if it is a sequence.

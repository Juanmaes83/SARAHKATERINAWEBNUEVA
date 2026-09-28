# Phase 2E — Premium digital experience

Status: **DELIVERED FOR HUMAN VISUAL REVIEW — NOT APPROVED, NOT MERGED, NOT PRODUCTION**
Date: 2026-09-23
Branch: `feat/phase-2e-premium-media-motion-2026-09-22`
Starting point: `origin/main` at `69d030c` (PR #19 merge), merged into the
existing remote branch (`ec4d472`, docs only) as `0759ef1`.
Routes: `/preview/investment` · `/preview/tax-advisory` ·
`/preview/property-purchase` · `/preview/team`
Motion rulebook: [`phase-2e-motion-system.md`](phase-2e-motion-system.md)

> **Merge state (checked 2026-09-28):** merged to `main` with PR #21 (`c8eb579`, 2026-09-23). The human visual review is still pending; nothing here is approved.

Everything stays under `/preview` with `noindex, nofollow`. No production,
domain, DNS, indexation, form, CTA destination, claim, figure, testimonial or
video was added or changed.

---

## 1. Creative direction

### 1.1 The idea — _the gold thread_

A foreign buyer in Spain does not lack information; they lack **one person who
holds all of it together**. Every landing already says this in words — _one
file_, _one point of contact_, _every tax in the right order_, _one journey_.
Phase 2E gives that promise a single visual gesture: **a fine gold line that
draws itself and connects things.**

It is the smallest thing on the page and it is everywhere: under each section
title, along each process, between the seven stages of the purchase file,
through the Team journey, and along the header as the page is read. Nothing
else moves with the same vocabulary. When a visitor leaves, the thing they
remember is not an effect but a feeling: _somebody joined this up for me._

### 1.2 What the experience should leave

| Axis       | How it shows up                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Luxury     | Restraint: ivory space, one easing, one gold, slow ambient image settle, no bounce, no gimmick                                                                        |
| Lifestyle  | Photography opens like a page being turned (unveil), then breathes (settle) — the Mediterranean interiors carry the emotion, not the motion                           |
| Authority  | Sequence and order: processes that draw step by step, a calendar that falls into place, a sticky header that always says where you are                                |
| Conversion | The proof card lands last over the hero image (the moment the composition "locks"), CTAs stay static and legible, card actions are quiet so section CTAs own the gold |

### 1.3 What makes it Sarah Katerina and not a template

- The thread is a brand gesture tied to the brand promise
  (_Clarity before commitment_), not a stock reveal.
- The four pages share a grammar but each has **one** signature sequence built
  from its own content (§4), not the same fade applied everywhere.
- Motion is deliberately absent where a template would add it: no counters, no
  carousels, no parallax text, no cursor gimmicks, no loaders.

### 1.4 Personality per landing

| Landing                | Perception                        | Motion register                                                                                           | Signature                              |
| ---------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Investment (canonical) | strategy, judgement, analysis     | full register: composed hero, depth drift of the snapshot over the portrait, scenario lines drawing apart | Hero composition + scenario divergence |
| Tax Advisory           | clarity, precision, calm          | quieter: calendar arrives with `fade` (no lift), no hero depth drift, thread cut per row of three         | The year falls into order              |
| Property Purchase      | accompaniment, control, safety    | photograph shown whole and closed by its caption; the file joins up stage by stage                        | Seven stages connected                 |
| Team                   | humanity, coordination, closeness | image-led unveils of real people; one line joins the journey (vertical on phones)                         | People connected                       |

---

## 2. Audit

Baseline audited at `69d030c` on a local production build, Chromium 153
(Playwright 1.63), 375 and 1440 px (plus 320/390/768/1024 for overflow).
Baseline captures: `docs/screenshots/phase-2e/*-before.jpg`.

### 2.1 Technical diagnosis

| #   | Finding                                                                                                                                                                                                                                         | Severity | Resolution                                                                                                             |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| T1  | **Header never stuck.** `overflow-x: hidden` on both `html` and `body` made `body` a non-scrolling scroll container, so `position: sticky` did nothing. Scrolled state and active state were never seen.                                        | High     | `overflow-x: clip` with `hidden` fallback (globals). Header now sticks; verified `top: 0` after scroll at 375 and 1440 |
| T2  | **Tax calendar icon escaped its card** — `cardIcon` is `position: absolute` for media cards; the aside was not positioned, so the chip rendered at the page's top-left and, on phones, covered the hero's third credential ("wners and buyers") | High     | In-flow chip (`toolIcon`)                                                                                              |
| T3  | **Tax six-step process rendered 5 + 1** with an orphan: the 3-column override lost to the shared 5-column rule on stylesheet order                                                                                                              | Medium   | Specificity fix; thread re-cut per row                                                                                 |
| T4  | **Tax report: 4 panels in a 5-column grid** — empty fifth column on the navy band                                                                                                                                                               | Medium   | `reportLayoutFour`                                                                                                     |
| T5  | **Hero blink after hydration** — RevealOnScroll hid everything on mount, including the visible hero, then faded it back in                                                                                                                      | Medium   | Never arm on-screen elements; hero choreography moved to CSS entrance from first paint                                 |
| T6  | **Reveal transition clobbered hover transitions** and stagger delay (up to 240ms) delayed hover feedback on later cards                                                                                                                         | Medium   | Reveal is now a one-shot animation                                                                                     |
| T7  | **Charts animated on page load**, off screen — finished long before being seen                                                                                                                                                                  | Low      | Paused until their section arrives                                                                                     |
| T8  | Trust strips at 375px: two columns forced one word per line                                                                                                                                                                                     | Medium   | Two columns from 600px (Investment, Property)                                                                          |
| T9  | Property hero eyebrow flush under the header at desktop (`padding-block: 0`)                                                                                                                                                                    | Medium   | Hero padding and centred columns                                                                                       |
| T10 | Team hero actions stacked vertically at 1440 (column too narrow for both)                                                                                                                                                                       | Low      | 1.08 / 0.92 columns from 1280px                                                                                        |
| T11 | Mobile menu stayed open after choosing a section                                                                                                                                                                                                | Medium   | Link closes the dialog; focus returns to Menu                                                                          |
| T12 | Anchor jumps landed under the header, no smooth scroll                                                                                                                                                                                          | Low      | `scroll-margin` + native smooth scroll (off under reduced motion)                                                      |
| T13 | **5 tests failing on `main`** (stale after PR #20/#17) and 4 raw lengths failing the token test                                                                                                                                                 | Medium   | See §7                                                                                                                 |

### 2.2 Creative and art-direction diagnosis

| #   | Finding                                                                                                                                                                                                                                                                                                                               | Resolution                                                                                                     |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| C1  | **Baked-in lockups cut in half** in cards ("arah", "Katerin…", lockup under the icon chip): Investment residential/redevelopment cards, report thumbnails (Investment + Tax), Tax "Annual compliance", Property services and "worries" image. Reads as a cropping error, repeats the header logo, and shows the misspelling "sistem". | Binary **compact crop** per image (`compactCrop` in the registry): lockup shown whole or not at all            |
| C2  | **Property hero overlay covered the image's own brand line and mark**, and on phones the key handover                                                                                                                                                                                                                                 | Photograph shown whole at native 1376:768; the note closes the frame from below as a caption strip             |
| C3  | Property service cards had three gold full-width CTAs wrapping onto two lines, competing with the section CTA                                                                                                                                                                                                                         | Card-level actions are quiet across the system (as on Investment and Tax); gold reserved for section decisions |
| C4  | Process lines were border-grey dashes between steps — method read as separate boxes                                                                                                                                                                                                                                                   | Continuous gold thread through the column gaps, drawn in sequence                                              |
| C5  | Hero arrival was a generic fade; no moment where image and proof lock together                                                                                                                                                                                                                                                        | Composed entrance: copy line by line → frame opens → proof card lands last; depth drift on exit (Investment)   |
| C6  | Nothing told the reader where they were on long pages                                                                                                                                                                                                                                                                                 | Sticky header, active section, reading-progress thread                                                         |
| C7  | Report cards on navy stretch to equal height with large empty areas (Investment, Tax)                                                                                                                                                                                                                                                 | **Not changed** — pending (§9)                                                                                 |
| C8  | Property: two sections share the eyebrow "The file, front to back"                                                                                                                                                                                                                                                                    | **Not changed** — copy decision (§8)                                                                           |
| C9  | `process-presentation` image carries a mock website with an unverified metric, phone number, "Group" suffix and third-party brand names                                                                                                                                                                                               | **Flagged as blocker** in the registry (§8)                                                                    |

---

## 3. What changed, by surface

| Surface                 | Change                                                                                                                                                                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header (shared)         | Sticky (root-cause fix), translucent + blurred when scrolled, gold reading-progress thread, active section via `aria-current="location"`, underline on `:focus-visible`, mobile panel entrance + staggered links, links close the dialog |
| Heroes (all four)       | Shared CSS entrance; Investment snapshot depth drift; Property hero re-composed (C2)                                                                                                                                                     |
| Section titles (shared) | Gold rule draws after the title arrives                                                                                                                                                                                                  |
| Media                   | Compact crops (C1); editorial photographs unveil; all photographs settle; card photos lean in on hover                                                                                                                                   |
| Cards                   | Reveal no longer interferes with hover; `:focus-within` parity; quiet card actions on Property                                                                                                                                           |
| Processes               | Investment + Tax thread; Tax 3×2 grid; Property seven-stage connector; Team journey line                                                                                                                                                 |
| Dashboards              | Charts draw when seen; Tax report 4 columns; no figure animated                                                                                                                                                                          |
| FAQ (shared)            | Answer eases in; open item holds the gold edge; closing instant                                                                                                                                                                          |
| CTA / buttons           | Arrow nudge on focus as well as hover; Property hero buttons never break inside a label                                                                                                                                                  |
| Footer                  | Unchanged                                                                                                                                                                                                                                |

Shared primitives created or modified: `RevealOnScroll` (modified),
`Entrance.module.css` (new), `TerritoryVisual` (modified),
`WebSection`/`WebBands`/`WebHeader`/`WebFaq`/`WebButton`/`SampleChart` styles
(modified), `app/web-tokens.css` (motion tokens added), `app/globals.css`
(overflow clip, anchor offset, smooth scroll). No second header, footer, token
file, motion system or navigation was created.

---

## 4. WOW map

| Page       | Moment                                                                               | Where              | Why it earns its place                          |
| ---------- | ------------------------------------------------------------------------------------ | ------------------ | ----------------------------------------------- |
| All        | The gold thread along the header                                                     | top, while reading | orientation + brand gesture in one line         |
| Investment | Hero locks: portrait frame opens, snapshot lands over it, drifts ahead of it on exit | first viewport     | first impression of judgement + proof           |
| Investment | Scenario lines draw apart                                                            | Scenarios band     | shows "assumptions matter" instead of saying it |
| Tax        | The year falls into order                                                            | Annual calendar    | precision made visible; calm, exact             |
| Property   | Seven stages connected                                                               | File tracker       | "one file" shown as a sequence                  |
| Team       | The journey joins people                                                             | Journey            | coordination made human                         |

Filmstrips: `docs/screenshots/phase-2e/motion-investment-hero-filmstrip.jpg`,
`motion-tax-calendar-filmstrip.jpg`, `motion-purchase-tracker-filmstrip.jpg`.

---

## 5. Differences kept between pages, and why

- **Tax has no hero depth drift and uses `fade` for its calendar**: its register
  is precision; a floating card would contradict "no surprises".
- **Tax thread is cut per row of three**: six steps read as two rows of three;
  a line wrapping between rows would imply a false continuity.
- **Property hero is image-first at native ratio with a caption strip**, not a
  floating proof card: its approved image carries its own brand line and the key
  handover, which is the proof.
- **Team keeps its editorial composition** (contained 16:9 hero, no cropping of
  people, provisional-media labels) and its own vertical/horizontal journey
  line; it gains only the shared entrance, unveils and header behaviour.
- **Investment keeps the fullest register** as the canonical reference.

---

## 6. Validation

### 6.1 Commands (2026-09-23, Windows, Node 24)

| Check                                      | Result                                                                 |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| `npm run lint`                             | pass                                                                   |
| `npm run typecheck`                        | pass                                                                   |
| `npm run test`                             | **150 / 150 pass** (was 133 pass / 5 fail on `main`; +12 motion tests) |
| `npm run build`                            | pass; First Load JS +0.1 kB per landing                                |
| Secret scan (diff grep + governance tests) | clean                                                                  |

### 6.2 Playwright / Chromium (local production build)

| Check                                                                                               | Investment            | Tax   | Property | Team  |
| --------------------------------------------------------------------------------------------------- | --------------------- | ----- | -------- | ----- |
| Horizontal overflow at 320/375/390/768/1024/1440                                                    | 0                     | 0     | 0        | 0     |
| Elements left at opacity 0 after scroll-through (all widths)                                        | 0                     | 0     | 0        | 0     |
| One `h1`                                                                                            | yes                   | yes   | yes      | yes   |
| Console / page errors                                                                               | 0                     | 0     | 0        | 0     |
| JavaScript disabled — hidden after 1.5s                                                             | 0                     | 0     | 0        | 0     |
| Reduced motion — hidden at load / after instant scroll                                              | 0 / 0                 | 0 / 0 | 0 / 0    | 0 / 0 |
| Reduced motion — armed reveals / hero animation / progress bar                                      | 0 / none / hidden     | same  | same     | same  |
| Fast scroll (End → Home → mid-page jump) — pending above fold                                       | 0                     | 0     | 0        | 0     |
| Skip link first in tab order                                                                        | yes                   | yes   | yes      | yes   |
| Focus ring (nav link)                                                                               | 2px solid, 2px offset | same  | same     | same  |
| FAQ: two open independently, Enter/Space toggle                                                     | yes                   | yes   | yes      | yes   |
| Visible targets below 44×44                                                                         | 0                     | 0     | 0        | 0     |
| Mobile menu: modal, focus to Close, Tab trapped, Escape closes, focus back to Menu, scroll restored | yes                   | yes   | yes      | yes   |
| Mobile menu link closes dialog and lands 96px below top                                             | yes                   | yes   | yes      | yes   |
| Sticky header + active section after jump                                                           | yes (`#report`)       | yes   | yes      | yes   |
| Slow network (≈1.6 Mbps, 560ms RTT): `h1` opacity at 1s / hidden in viewport after load             | 1 / 0                 | 1 / 0 | 1 / 0    | 1 / 0 |

### 6.3 Not run — do not treat as passed

Lighthouse, axe, Core Web Vitals / field data, real iOS/Android devices,
Safari and Firefox, screen readers, Vercel Preview visual check. The CSS hero
entrance holds the `h1` below full opacity for up to ~0.5s after first paint;
its effect on LCP has **not** been measured.

---

## 7. Tests changed, and why

Five tests were already failing on `main` (`69d030c`) before any Phase 2E
change. They asserted states that approved, merged PRs deliberately changed:

| Test                                 | Stale assumption                                                                                   | Change                                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Tax composition order                | expected `TaxTrustBand`, removed by PR #20 ("One trust strip", `tax-advisory-visual-decisions.md`) | removed from the order and now asserted **absent**                                                          |
| Tax alt text from a governed source  | only matched `…Media.alt`                                                                          | also accepts `APPROVED_MEDIA.<key>.alt` (same registry)                                                     |
| Tax hero uses Services_14            | expected the literal `media={APPROVED_MEDIA.taxHero}`                                              | expects `APPROVED_MEDIA.taxHero` (PR #20 reads it once into `heroMedia`)                                    |
| Tax stylesheet size `< 30` rules     | PR #20 legitimately reached 31                                                                     | `≤ 31`; Phase 2E motion rules sit inside a media query and add none; the forbidden-class guard is unchanged |
| Token discipline — off-scale lengths | `clamp(360px, 42vw, 620px)` in two portrait frames                                                 | expressed as `calc(var(--sk-space-80) * 4.5)` / `* 8` (max 640)                                             |

New: `tests/motion.test.ts` (12 tests — see motion system §2 and §10).

---

## 8. Requires human decision (Juanma)

1. **Visual approval of the whole pass** at 375 and 1440 on the Vercel Preview.
2. **Motion tokens** — approve the scoped `--sk-web-motion-*` proposal (all
   derived from canonical values) or ask for changes.
3. **Compact crops remove the baked-in lockups from cards.** This hides the
   brand's own lockup (and its "sistem" misspelling) at small sizes. Approve,
   or supply retouched derivatives without the lockup.
4. **`process-presentation.webp` is a production blocker**: its screen shows a
   mock site with "160+ foreign buyers trusted us since 2024", a phone number,
   a "Group" suffix and a tax-administration line; the room shows KINFOLK,
   CHANEL and VUITTON. Illegible at Preview sizes but still published pixels.
   Replace or retouch (Tax context band, Property "Full purchase support").
5. **Preview banner now scrolls away** (it never actually stuck — T1). Making it
   sticky again would stack ~240px of chrome on phones. Confirm, or choose a
   compact sticky variant.
6. **Property: duplicated eyebrow** "The file, front to back" on two
   consecutive sections — copy change not made.
7. **Property hero caption** reads "…Sarah reviewing documents" but the image
   shows a key handover — copy/slot mismatch not changed.
8. **Gold thread colour on process lines** (was border grey) — confirm the
   stronger brand line.

---

## 9. Pending and known limitations

- Report cards on navy stretch to equal heights with large empty areas; needs
  a content-led redesign of the report band rather than a spacing patch.
- Investment and Property hero images still embed descriptor copy that is
  `NEEDS_DECISION` upstream; unchanged.
- No approved video exists; video slots remain labelled placeholders.
- Scroll-driven effects (header progress, hero depth drift) run only in
  browsers with `animation-timeline`; elsewhere they are simply absent.
- Smooth anchor scrolling over very long distances takes ~1.5s (native
  behaviour); acceptable, but a candidate for review.
- Team hero photograph remains small on desktop by its approved "contain,
  never crop" rule.
- Chromium only; no real-device or cross-browser pass.

## 10. What still separates this from an Awwwards-level entry

Honest gap list, in order of impact:

1. **Media**: art-directed, retouched derivatives without baked text; one real
   hero film or cinemagraph per landing; consistent colour grade. Most of the
   remaining "template" feeling comes from composite images with embedded copy.
2. **Typography moments**: a display treatment for one line per page (e.g. the
   promise) with bespoke kerning and a line-mask reveal — needs the type
   decision, not just motion.
3. **The report band** as an interactive, explorable sample report rather than
   five static cards.
4. **Page transitions** between the four routes (shared-element thread) once
   routing is real.
5. **Micro-interaction depth**: considered hover states for the decision doors
   and asset types that reveal one more fact, not just lift.
6. **Performance evidence**: Lighthouse/CWV on the Preview, image derivatives
   under budget (two Preview-only PNGs are 1.5–6.8 MB).

## 11. Preview

Vercel Git integration builds a Preview for this branch on push (see the PR for
the exact URL and deployment state). It is a review environment only.

## 12. Captures

`docs/screenshots/phase-2e/` — `<route>-<375|1440>-<before|after>.jpg`
(live-scrolled, stitched, header made static so it appears once) and three
motion filmstrips. See `docs/screenshots/README.md`.

## 13. Recommendations for the next phase

1. Juanma's visual review of this Preview; record corrections as a list.
2. Resolve §8.3–8.4 by commissioning clean derivatives (no baked copy).
3. Run Lighthouse + axe on the Vercel Preview and record numbers.
4. Redesign the report band (C7) as the next "WOW" candidate for Investment.
5. Then Phase 2F cross-landing QA.

# Tax Advisory — visual implementation decisions

Status: FOR HUMAN VISUAL REVIEW · NOT APPROVED · NOT PRODUCTION
Date: 2026-09-22
Route: `/preview/tax-advisory`
Reference: `Juanmaes83/sarahkaterina` → `website/nueva web/Sarah Katerina Tax Advisory.png`

This is the list of judgement calls made while implementing the reference
composition, and the reason for each. It exists so Juanma can review decisions
individually rather than approving or rejecting a whole page.

---

## 1. Sections

All sixteen sections of the reference are implemented, in its order:

| #   | Section             | Note                                                                              |
| --- | ------------------- | --------------------------------------------------------------------------------- |
| 1   | Header              | Sticky, condensing after the hero. Real logo. EN/ES. `Talk to Sarah`.             |
| 2   | Hero                | Split composition. Authentic portrait. Document chips. Video slot. Trust markers. |
| 3   | Trust strip         | Four positions, two of them governance slots — see §4.                            |
| 4   | Problem / context   | **Separated from the audience block**, which the reference folds together.        |
| 5   | Audience            | "Know what Spain will actually cost you." Six profiles.                           |
| 6   | Annual tax calendar | Twelve-month gantt, six obligations, labelled ILLUSTRATIVE.                       |
| 7   | Process             | Six numbered stages, each with a deliverable.                                     |
| 8   | Report preview      | Navy band, four dashboard panels, every value suppressed.                         |
| 9   | Concerns            | "What you stop worrying about." Seven objections.                                 |
| 10  | Services            | **Six cards**, where the reference shows three. No price on any.                  |
| 11  | Authority           | Navy band. Authentic portrait, credential slot, pull quote.                       |
| 12  | Cases               | Three structural placeholders. No case published.                                 |
| 13  | Continuity          | Four-step journey. Fourth step substituted — see §5.                              |
| 14  | FAQ                 | Thirteen accessible disclosures, two columns at desktop.                          |
| 15  | Final CTA           | Navy band, two CTAs, contact status stated.                                       |
| 16  | Footer              | Real logo, four link columns, language, legal status.                             |

---

## 2. Composition and rhythm

**More air than the reference.** `docs/phase-2-visual-implementation-contract.md`
§3 asks the implementation to "preserve the proposal's editorial character
while adding more air, spacing and rhythm where the screenshots are too
condensed". The reference is a single-screen mock, which is why its type is so
small and its six process cards sit in one row.

Applied:

- Band padding rises from 48px (mobile) to 80px, and to 112px on the two
  dark bands, rather than the reference's uniform compression.
- The six process cards run three-up at desktop and two-up at tablet, not
  six-up. The numerals keep the sequence explicit once the row wraps.
- Six service cards run three-up, not three-up-in-one-row-with-photos.
- Bands alternate warm white / ivory, each separated by a hairline rather than
  a hard edge, as in the reference.

**Two navies, not one.** The reference uses a slightly lighter navy for the
report band than for the authority band and footer, so two dark sections in
sequence still read as separate surfaces. Preserved as `--sk-web-navy-soft`
and `--sk-web-navy`.

**The final CTA band uses the regular rhythm, not the open one**, because it
meets the navy footer directly. Two open paddings back to back read as a void
rather than as air.

---

## 3. Typography

The canonical type system is exactly two families — Fraunces and Inter
(BSD-006). Adding a third would be a Brand System decision, not one this
repository may take.

| Reference                                    | Implementation                                            | Note                                                                                                                                                                                       |
| -------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Serif headlines, roman + italic second line  | Fraunces, `font-style: italic` on the second line in gold | Faithful                                                                                                                                                                                   |
| Sans body                                    | Inter                                                     | Faithful                                                                                                                                                                                   |
| **Handwriting script marginalia** (4 places) | **Fraunces italic, light weight**                         | **DIVERGENCE.** No script face is approved. This is the closest the approved system gets to the reference's informal register. Needs Juanma's decision: accept, or approve a third family. |
| Small-caps card and column titles            | Inter, uppercase, `0.14em` tracking                       | A tracking step between the canonical normal (0em) and eyebrow (0.32em)                                                                                                                    |

---

## 4. Figures the reference carries that this page does not publish

Each is rendered as a visible, labelled slot in the position and at the weight
the composition expects, so the design can still be judged — never dropped
silently, and never replaced with a plausible substitute.

| Reference                                                                                          | Here                                                                                                                                                         | Authority                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "20 años dentro de la administración fiscal"                                                       | The figure renders, with `CLAIMS DOSSIER REQUIRED` under it                                                                                                  | **Confirmed upstream** (`brand-system/README.md`; `verbal/credential-register.csv` CR-002; project owner 2026-08-12), but `docs/copy-and-claims-matrix.md` §3 withholds it until a claims dossier with source, date, permission and scope exists. That dossier does not exist. |
| "160+ compradores extranjeros"                                                                     | `PENDING` marker, `FIGURE NOT APPROVED`                                                                                                                      | Not confirmed anywhere. `decisions-log.md` (2026-08-05) deprioritised volume as differential proof — a competitor publishes an indistinguishable figure.                                                                                                                       |
| "Desde € 350 / € 950 al año / € 1.500"                                                             | No price anywhere; a note explains why                                                                                                                       | A price exists upstream for `/tax-diagnostic` but publication is not approved (decision gate D2-04), and `service-taxonomy.md` requires live re-verification.                                                                                                                  |
| "Entrega en 5 días / 7 días", "Respuesta en 1 día laborable"                                       | No turnaround or response time                                                                                                                               | No confirmed figure. A response-time promise is a service commitment.                                                                                                                                                                                                          |
| "€ 24.500", "↓ -18%", the twelve-bar chart, the five-line breakdown                                | `PENDING_APPROVAL` / `SAMPLE` / `ILLUSTRATIVE` in each panel's position; the chart is a fixed abstract silhouette with no axis, no scale and no labelled bar | Publishing any of them would fabricate a financial result (AGENTS.md §2).                                                                                                                                                                                                      |
| "Altea · 2023 · Propietario británico · € 12.400", "Jávea · 2024", "Moraira · 2024" + testimonials | Three structural placeholders naming what a published case would need                                                                                        | Client, location, year, nationality, amount, outcome and quote are all invented. Requires written permission, verified figures, stated scope and legal review (AGENTS.md §11).                                                                                                 |
| Calendar bar positions                                                                             | Kept as the reference's layout, labelled `ILLUSTRATIVE`, with screen-reader text repeating the warning per row                                               | Every real filing date is a tax claim requiring competent review (AGENTS.md §11).                                                                                                                                                                                              |
| "Con más de 20 años dentro de SUMA y la administración tributaria en la Comunidad Valenciana"      | Neither the named body nor the region is repeated                                                                                                            | AGENTS.md §2 forbids inferring professional detail, and `content/authority-content-and-video-opportunity-map.md` warns against publishing specifics of that period.                                                                                                            |
| Handwritten signature under the pull quote                                                         | `ATTRIBUTION PENDING_APPROVAL`                                                                                                                               | No approved signature asset, and the wording is not confirmed as Sarah's.                                                                                                                                                                                                      |

### How markers are applied

Two different risks get two different treatments, deliberately.

- A provisional **sentence** is covered by the page-level preview banner plus
  one discreet section-level `TAX — REVIEW REQUIRED` marker. Repeating a badge
  after every line would make the composition unreviewable _as a design_,
  which is the one thing this page exists to let a human judge.
- A provisional **value** — a figure, a credential, a date, a contact detail —
  is always marked inline, because that is what a reviewer can mistake for
  real data.

---

## 5. Held and blocked subjects

**The reference's fourth continuity step is "VITA HOST — Gestión de la
propiedad".** AGENTS.md §9 holds Property Management publicly and forbids
integrating, linking to, navigating to or mentioning VITA Host while D-06 is
unexecuted; a governance test enforces it.

The step is replaced by an in-scope annual tax review, and the substitution is
stated on the page rather than left as a silent omission for a reviewer to
notice.

The institutional descriptor is `NEEDS_DECISION` upstream and is absent. The
footer descriptor is a _service_ descriptor, not an institutional one.

---

## 6. Navigation and CTAs

**Nothing on this page navigates off it.** The reference's navbar (Inicio /
Servicios / Quién soy / Proceso / Recursos / Contacto) is a proposed public
information architecture; public navigation is PENDING_APPROVAL (README §12)
and none of those routes exists. Shipping six 404s in a review preview would be
worse than showing the intended structure and saying so.

- Header nav → in-page anchors, each verified by test to exist.
- Footer columns → labelled, non-navigating slots, one `All PENDING_APPROVAL`
  marker per column rather than one per entry.
- `See how it works` → `#process`, a real destination.
- Every other CTA → a button that records the intent and goes nowhere, with one
  page-wide explanation referenced by `aria-describedby` from each of them.

**`Map my tax exposure` deliberately does not link to the Buyer System.**
`lib/buyer-system/links.ts` records `taxExposure` as `not-built`, and no
`NEXT_PUBLIC_BUYER_SYSTEM_URL` is confirmed.

CRO progression, per intent rather than one repeated CTA:
context → problem → confidence → process → visual proof → services →
authority → FAQ → commitment, with `Map my tax exposure`,
`See how it works`, `Create my tax map`, `Request a tax review`,
`Review my situation`, `Understand my obligations`, `About Sarah` and
`Talk first` each used once, where it fits the reader's position.

---

## 7. Motion

**GSAP was not added.** The motion this composition needs — viewport reveals
with a stagger, a condensing header, card hover, disclosure opening, a
dashboard bar entrance — is expressible in CSS transitions plus one
IntersectionObserver. Adding a 70KB animation runtime for that would not
improve the result, and `docs/phase-2-visual-implementation-contract.md` §6
allows "GSAP **or a native equivalent**". If a later phase needs timeline
sequencing or scroll-linked animation, that is the point to reconsider.

Implemented:

- Viewport reveals with a capped stagger, on list items and cards.
- Header condenses after the hero — observed via a sentinel, not a scroll
  listener running every frame.
- Card hover: 2px lift, gold border, shadow.
- CTA hover: gold lifts lighter, arrow nudges 4px.
- FAQ disclosure: short enter animation, marker rotates.
- Report-preview bars: a single scale-in on entry.

Guaranteed:

- `prefers-reduced-motion: reduce` removes all of it. **Verified: 0 elements
  hidden, 0 animating, full text present without scrolling.**
- Content is visible by default in the markup; the hidden state is applied only
  after JavaScript confirms it can also remove it. A failed hydration, a
  blocked script or a crawler never sees blank space.
- No scroll-jacking, no parallax, no scroll-linked positioning.

**One defect was found and fixed during this work.** `RevealOnScroll` used an
IntersectionObserver alone. During a fast scroll an element can pass from below
the viewport to above it between two observation frames, crossing no threshold,
so the callback never fires and the element stays at `opacity: 0` — a blank gap
mid-section. It was reproducible. A rAF-throttled scroll fallback now reveals
anything the viewport has reached or passed. This also affects
`/preview/investment`, which uses the same primitive.

---

## 8. Responsive

Verified at 320, 375, 768, 1024 and 1440px: **no horizontal overflow at any
width**, and no element extending past the viewport at 320px.

- Hero: stacks, image keeps its 4:5 crop and its prominence.
- Trust strip: 1 → 2 → 4 columns.
- Calendar: below 768px the row label moves above its track, so a twelve-cell
  year fits a 320px viewport without sideways scrolling. The gantt returns at
  desktop.
- Dashboards: 1 → 2 → 4 panels; the sparkline scales with its container.
- Services / process: 1 → 2 → 3 columns.
- CTAs: full width below 768px.
- Menu: full-screen dialog, focus trapped, Escape closes, focus returns to the
  trigger, body scroll locked.
- Every interactive target measured: **0 below 44px**.

---

## 9. What still differs from the reference

Listed plainly, for the review:

1. Script marginalia are Fraunces italic, not a handwriting face (§3).
2. Hero media is an authentic monochrome studio portrait, not the reference's
   generated desk-and-coastline scene. The document spines survive as
   typographic chips; the Costa Blanca backdrop is not recreated.
3. Four photographic slots are neutral editorial panels (see
   `docs/tax-advisory-asset-record.md` §3).
4. CTA type is navy on gold, not white on gold — the reference's pairing fails
   WCAG AA (see `docs/web-palette-contrast.md` §5).
5. Every figure named in §4 is a marker rather than a number.
6. The continuity strip's fourth step is substituted (§5).
7. The footer logo sits on an ivory plate; no reversed variant exists.
8. Problem and audience are separate sections, per the phase brief.
9. Six service cards rather than three, per the phase brief.
10. More vertical space throughout, per the phase contract.

---

## 10. Not claimed

No Lighthouse score, Core Web Vitals measurement, axe run or real-device test
was performed, and none is asserted. What was measured is listed in §6–§8 and
in `docs/web-palette-contrast.md` §4.1.

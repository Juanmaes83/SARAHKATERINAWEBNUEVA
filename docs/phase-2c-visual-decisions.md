# Phase 2C — Visual fidelity decisions

**Status:** `PHASE 2C — VISUAL FIDELITY IMPLEMENTATION READY FOR HUMAN REVIEW`
**Date:** 2026-09-21
**Base:** Phase 2B, commit `b7fd6f0`
**Route:** `/preview/investment` — noindex, nofollow, excluded from the sitemap

Not final. Not approved. Not production. Juanma's review against the template
is the last gate.

---

## 1. Fidelity audit that drove this phase

Assessed before writing any code, comparing the Phase 2B build against
`website/nueva web/Sarah Katerina Investment.png`.

| Template section | 2B component | Fidelity | Correction applied |
|---|---|---|---|
| Header, 7 nav items + lang + gold CTA | `WebHeader` | **Low** — 6 anchors, generic app navbar | 7 template nav items, gold underline on hover, sticky shadow, stronger CTA |
| Hero, copy + villa + dashboard | `WebHero` | **Medium** — portrait only, thin dashboard | Added territory schematic, credential row with icons, script accent, richer dashboard with property and horizon |
| Trust strip, icons + figures | `TrustBand` | **Low** — plain rules, no icons | SVG icons, template's four items, script accent, pending state demoted to a dot |
| Problem / objections | `ApproachBand` | **Medium** — six paragraphs | Icons, numbering, divided grid with rules, territory visual |
| Decision doors, image cards | `DoorsBand` | **Low** — white cards, no media | Media-led cards with schematics, eyebrow, checks, gold CTA, hover lift |
| Asset types, 4 photo cards | `AssetTypesBand` | **Low** — letters in circles | Media-led cards, category icon over the media, analysed / risk / deliverable rows, contextual link |
| Process, 5 steps | `ProcessBand` | **Medium** — numbers only | Numbered markers on a progress rule, navy icon chips, deliverable pill, hover scale |
| Report preview, 5 panels | `ReportBand` | **Medium** — 4 panels, abstract | 5 panels including the investment summary with a mini table, risk rows as chips, deliverables row |
| Scenarios | `ScenariosBand` | **Medium** — no legend | Legend with swatches, icon list, script accent |
| Authority, navy + portrait | `AuthorityBand` | **Medium** — disclaimers dominant | Two-column body, icon credential list, quote, reserved signature slot, limits demoted |
| Cases, 3 visual cards | `CasesBand` | **Low** — looked like errors | Media-led cards that read as real cases; results and locations still withheld |
| Journey chain | `JourneyBand` | **Medium** — no icons or arrows | Icons, connecting arrows on desktop, script accent |
| FAQ | `WebFaq` | **Medium** — review badges dominant | Quick answers, quiet pending note, one section-level disclaimer |
| Final CTA | `FinalCtaBand` | **Low** — flat centred navy band | Split layout with territory visual and script accent |
| Footer | `WebFooter` | **Low** — "PENDING" on every link | 4 template columns, clean text links, one note, EN/ES, status chip |

---

## 2. Copy

Juanma approved the template as the copy source on 2026-09-21. Headlines,
section names, descriptions, CTAs and editorial voice are reused directly, with
faithful editorial translation from Spanish to English. Every string is mapped
original-to-adaptation in `docs/copy-and-claims-matrix.md`.

The approval covers the template's **narrative**, not its figures. Four places
where the adaptation deliberately departs, all for veracity:

| Template | Adaptation | Reason |
|---|---|---|
| "…invertir con seguridad y **rentabilidad**" | "…so you invest with confidence" | Promising returns is a financial claim |
| "Con **más de** 20 años…" | "With 20 years…" | The confirmed credential is exactly 20 years |
| "**Optimización** fiscal para no residentes" | "Tax treatment for non-residents" | "Optimisation" implies an outcome |
| "Resultados reales. Historias reales." | Replaced with a permission statement | Asserts results that are not yet evidenced |

Withheld entirely: `160+ compradores`, `Análisis en 48 h`, `€850.000`, `+42%`,
`6,1%`, `2,8x`, the three testimonials with client countries, the response-time
promise, and the copyright line's legal entity.

---

## 3. The property photography problem

The template carries photography of villas, coastline and plots. **None exists**
in the mother repository, and three of the four obvious substitutes are
forbidden by `AGENTS.md`: generic stock, a generated image presented as real,
and the template screenshot used as a production asset.

The fourth is what was built: `TerritoryVisual`, an explicitly schematic SVG —
contour lines, coastline, plot boundary, built footprint, works, district block
plan. It reads as a map or site plan, which is what an analyst actually looks
at, and it cannot be mistaken for a photograph.

Every instance carries a visible `SCHEMATIC` badge and an accessible name ending
*"Conceptual illustration, not a photograph of a real property."*

**This is a placeholder with correct slots and crops, not a solution.** Real
Costa Blanca and property photography is required for full fidelity; when it
arrives, each `TerritoryVisual` swaps for an `Image` at the same aspect ratio.

After the first visual review the drawing's opacities were raised (grid
0.10→0.18, contours 0.22→0.40, water 0.16→0.26) because at thumbnail size it
read as a flat dark rectangle. A gradient scrim was added under the label so it
stays legible over any part of the drawing.

---

## 4. Icon system

`components/web/icons/Icon.tsx` — 25 icons on one 24×24 grid, 1.5 stroke, round
caps and joins, no fills. Colour is always `currentColor`.

`buyer · tax · analysis · property · land · commercial · redevelopment · market
· dueDiligence · financialModel · taxOverlay · report · risk · exit · analyse ·
buy · declare · own · arrow · check · pin · independence · clock · document ·
play`

Decorative icons are `aria-hidden`; an icon carrying meaning takes a `title`
that becomes its accessible name. This replaces the Phase 2B Unicode glyphs,
which had inconsistent weights and baselines across platforms.

---

## 5. Sample data

Dashboards show illustrative values, permitted by the brief provided they are
labelled. Each surface carries an `ILLUSTRATIVE` tag, each chart's accessible
name ends *"Illustrative sample data, not a real result"*, and the hero card
carries a footnote naming what it is not.

The sample values are plain strings, deliberately **not** classified claims: they
are illustrative output, not statements the project makes. A test asserts this.

---

## 6. Motion

No animation library. CSS transitions, CSS keyframes and one
`IntersectionObserver`, as in Phase 2B, extended to the new surfaces: card hover
lift, process number scale, chain hover, nav underline, chart draw and grow.

Verified by emulating the media query: under `prefers-reduced-motion: reduce`,
**0 animations, 0 transitions over 50ms, 0 elements left hidden**. Without it:
32 animated elements, 123 transitions.

---

## 7. Known gaps against the template

| Gap | Why | Unblocked by |
|---|---|---|
| Property and coastline photography | No licensed asset exists | Juanma supplying photography |
| Handwritten script accents | No script typeface is governed; set in display serif italic instead | A typeface decision |
| Sarah's signature | No signature asset; may not be drawn | An authorised signature file |
| "SK · SARAH KATERINA INVESTMENT" lockup | Not a governed asset; `BRAND-001` is | A decision to commission that lockup |
| Logo teal beside gold | The mark may not be recoloured | Juanma's ruling |
| Hero video | No approved video | Production |
| Social icons in footer | No confirmed profiles | Confirmation |
| Real figures everywhere | No claims dossier | Legal/financial review |
| Spanish route | No ES routing; hreflang deliberately not emitted | i18n decision |

---

## 8. Review instructions

Open the Vercel preview at `/preview/investment`, logged into Vercel, beside the
template image.

1. **Section by section** — does each band read as the template's section?
2. **Schematics** — acceptable as an interim, or is photography needed before
   any further work?
3. **Logo teal beside gold** — still the biggest open visual question.
4. **Copy** — the template's words in English: does the voice survive?
5. **Rhythm** — enough air, or too much?
6. **375px** — hierarchy intact, or a squeezed desktop?
7. **Illustrative labelling** — prominent enough?

Record decisions in `docs/phase-2-decision-gate.md` §5.

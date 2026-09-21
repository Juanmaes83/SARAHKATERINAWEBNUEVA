# Visual asset manifest

**Status:** ACTIVE — inventory of what is missing
**Date:** 2026-09-21

Every visual slot in the Investment prototype, what it currently renders, and
what would have to exist and be authorised to replace it.

**No asset in this repository was invented, generated, traced or sourced from a
screenshot.** `public/brand`, `public/sarah`, `public/costa-blanca` and
`public/previews` contain no image files.

---

## 1. Missing assets, by priority

| # | Asset | Where it is needed | Currently renders | Authorisation required |
|---|---|---|---|---|
| A-01 | **Wordmark / logotype** (SVG, light + dark, clear-space and minimum-size rules) | Header, footer | Text wordmark marked "Wordmark placeholder" | Brand approval. Listed as "Deliberately deferred" upstream; no logo file exists anywhere in `brand-system/` |
| A-02 | **Authorised photograph of Sarah** | Authority section | Dashed placeholder naming the missing asset | Written image release. Authentic photography is the canonical identity source; synthetic imagery may never stand in as documentary evidence |
| A-03 | **Scenario / model screenshot** | Hero visual, visual proof | Labelled skeleton with every value withheld | Approval of the real model output, or an approved abstraction of it. Any figure shown becomes a published financial claim |
| A-04 | **Costa Blanca location photography** | Not currently placed | — | Licence plus authorisation. Generic stock may not be used as proof |
| A-05 | **Process explainer video** (30–60s, subtitled, poster, deferred loading) | Not currently placed | — | Production plus approval. No player is embedded: that would add an unreviewed third-party dependency |
| A-06 | **Icon set** | Decorative slots | Bordered glyph placeholders | Icon system decision. No icon library is installed for a phase that does not need one |
| A-07 | **Case study imagery** | Cases section | `CASE STUDY PLACEHOLDER — PENDING_APPROVAL` | Written client permission plus verified figures |
| A-08 | **Open Graph image** | Social preview | None emitted | Requires A-01 and an approved composition |
| A-09 | **Favicon / app icons** | Browser chrome | Next.js default | Requires A-01 |

---

## 2. Placeholder design rules

A placeholder in this repository must be **unmistakable**. It must never be a
plausible-looking stand-in that a reviewer could screenshot and circulate as
the real thing.

Concretely:

1. **Dashed border, not solid.** Every media placeholder uses a dashed rule so
   it never reads as a finished frame.
2. **It names what is missing.** `ResponsiveImage` takes a `pendingAsset`
   string and renders it. "Image placeholder" alone is not enough.
3. **It is announced.** Placeholders carry `role="img"` with an accessible name
   stating that the asset is pending.
4. **Withheld values are rules, not numbers.** In the hero summary and the
   scenario chart, a value renders as a bar of neutral colour. No digit
   appears, so nothing can be misread as data.
5. **Proportions are declared as non-data.** The scenario chart's bar heights
   are fixed percentages written in the component, documented in its own source
   as "not data".

---

## 3. What the prototype renders instead of assets

| Slot | Implementation | Rationale |
|---|---|---|
| Hero visual | `Hero.module.css` — labelled rows, withheld value rules, scenario chip strip, pending caption | Shows the *shape* of the deliverable, which is the genuine communication job, without a figure |
| Scenario chart | `ScenarioPanel` — five fixed-proportion bars, badged `NO FIGURES — PENDING_APPROVAL` | A chart shape communicates "a model lives here"; a fabricated dataset would be a published financial claim |
| Portrait | `ResponsiveImage` with `pendingAsset` | Names the release that is missing |
| Process markers | Numbered rules drawn in CSS | No icon dependency; the sequence is the meaning |
| Accordion marker | Two CSS rules rotated | No icon dependency, no new radius |
| Case studies | `Card variant="decision"` with a pending badge | Dashed treatment is the approved pattern for items needing attention |

---

## 4. Colour and token compliance

The historical proposal describes ivory, **navy** and **gold**. The canonical
token layer defines Ivory, **Forest `#173B32`** and **Terracotta `#B96F55`**,
with Terracotta restricted to editorial use and prohibited on Sand and Sage.

`SOURCE-HIERARCHY.md` ranks the merged token system above a proposal.
**No navy and no gold appear anywhere in this repository.** The editorial
weight the proposal achieved with gold is carried instead by Terracotta rules
and dashed borders, used only decoratively.

Enforced by test: no component stylesheet may contain a raw hex, `rgb()`,
`hsl()` or `oklch()` value, an off-scale length, a new radius or a new shadow.

---

## 5. When an asset arrives

1. Confirm the authorisation exists **in writing** and record where.
2. Add the file under the matching `public/` directory.
3. Replace the placeholder by passing `src` and a **contextual** `alt` — never
   the file name.
4. Remove the `pendingAsset` prop.
5. Update this manifest: move the row out of §1 and record the authorisation.
6. Re-run the responsive QA: a real image changes layout weight.

Do **not** add an asset because it "looks right". The absence of an approval is
the blocker, not the absence of a file.

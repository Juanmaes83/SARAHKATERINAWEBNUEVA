# Project Status — SARAHKATERINAWEBNUEVA

**Last updated:** 2026-10-23  
**Repository status:** CONTROLLED PREVIEW · NOINDEX · NOT PRODUCTION

This file tracks the state of the website product. Strategic status lives
upstream in [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina)
PROJECT-STATUS.md`, which this repository does not duplicate or override.

## Phases

| Phase                                            | Scope                                                                                                                                                                                                       | State                                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1 — Technical foundation                         | Tokens, components, chrome, SEO scaffolding, analytics contract, CI                                                                                                                                         | **MERGED** (PR #1)                                                                |
| 2A — Structural prototype                        | Investment landing grammar, claims classification, Buyer System boundary                                                                                                                                    | **MERGED**                                                                        |
| 2 — Visual governance                            | Decision gate, implementation contract, asset manifest                                                                                                                                                      | **MERGED**                                                                        |
| 2B/2C — Investment visual implementation         | Template-led composition, approved palette, governed assets, shared web layer and visual review                                                                                                             | **MERGED — CANONICAL VISUAL BASE**                                                |
| 2D — Tax Advisory convergence                    | Tax Advisory adapted to Investment's canonical visual layer                                                                                                                                                 | **MERGED — VISUAL BASE READY**                                                    |
| 2D — Property Purchase convergence               | Property Purchase adapted to Investment's canonical visual layer                                                                                                                                            | **MERGED — VISUAL BASE READY** (PR #8)                                            |
| 2E — Premium media, motion and visual refinement | Media/crop pass merged; premium experience pass (motion system, art-direction crops, header orientation, per-landing signature moments, fixes) delivered on `feat/phase-2e-premium-media-motion-2026-09-22` | **IN REVIEW — PREMIUM EXPERIENCE PASS IN DRAFT PR; AWAITING HUMAN VISUAL REVIEW** |
| 2F — Cross-landing visual QA                     | Template comparison and shared regression review at mobile and desktop widths                                                                                                                               | **AFTER 2E — HUMAN GATE**                                                         |
| 3 — Buyer System integration                     | Events, consent, lead-capture decision and approved public destinations                                                                                                                                     | Blocked on upstream decisions                                                     |
| 4 — Production gate                              | SEO, accessibility, performance, legal, content approval and migration                                                                                                                                      | Later                                                                             |

## Routes

| Route                        | Purpose                                              | Indexable                         |
| ---------------------------- | ---------------------------------------------------- | --------------------------------- |
| `/`                          | Repository overview, canonical brand chrome          | No                                |
| `/foundation`                | Component laboratory, canonical tokens               | No — ever                         |
| `/preview/investment`        | Canonical Investment visual base                     | No — ever, while under `/preview` |
| `/preview/tax-advisory`      | Tax Advisory visual base adapted to Investment       | No — ever, while under `/preview` |
| `/preview/property-purchase` | Property Purchase visual base adapted to Investment  | No — ever, while under `/preview` |
| `/preview/team`              | Editorial team page for buyer-side roles and process | No — ever, while under `/preview` |

Juanma has approved all three preview routes as visual bases for continued
implementation. This is a continuation approval, not production or publication
approval. Nothing may be promoted out of `/preview` until the production
landing priority is decided (`docs/phase-2-decision-gate.md`, D2-01).

## Design systems in use

One shared website layer is now canonical for all three landing routes:

- **Canonical** (`app/tokens.css`, byte-identical to upstream) — used by `/`
  and `/foundation`. Never edited here.
- **Scoped website palette** (`app/web-tokens.css`, `--sk-web-*`) — ivory,
  navy and gold, approved for this repository only. It is shared by
  Investment, Tax Advisory and Property Purchase.
- **Shared web primitives** — `components/web/*`, shared chrome, icons,
  charts, disclosure patterns and motion foundation. Landing-specific sections
  may extend the layer but may not duplicate its token, header, footer or button
  systems.

The next branch for the approved enrichment work is
`feat/phase-2e-premium-media-motion-2026-09-22`.

## Open decisions

Production decisions remain open in `docs/phase-2-decision-gate.md` and the
landing-specific visual decision documents.

The visual bases are approved for continuation, but the following still require
Juanma's review before they are treated as final:

- selected photographs and videos, their provenance, slot assignment, crop and
  retouch;
- final logo treatment on light and dark surfaces;
- replacement of schematic or illustrative placeholders where an authentic
  asset is available;
- final CTA destinations, Buyer System origin and any functional capture;
- legal entity, contact details, testimonials, cases, prices, timelines and
  other claims;
- production host, indexation, accessibility/performance and migration gates.

## Current handoff

**2026-10-23 — visual content upgrade delivered for review** (brief
`IMAGES/MEJORAS 23 OCTUBRE/`): Investment, Property Purchase and Tax Advisory
sections rebuilt against the five references, shared `ReportExplorer`, common
image grade `sk-editorial-v1`, Property duplicate eyebrow and caption fixed.
Team untouched. Same Draft PR #21, not merged. Details:
[`docs/phase-2e-visual-content-upgrade.md`](docs/phase-2e-visual-content-upgrade.md).

**2026-09-23 — premium experience pass delivered for review.** Branch
`feat/phase-2e-premium-media-motion-2026-09-22`, Draft PR, not merged. Creative
direction, audit, QA evidence and the decisions Juanma must take are in
[`docs/phase-2e-premium-experience.md`](docs/phase-2e-premium-experience.md);
the motion rulebook is [`docs/phase-2e-motion-system.md`](docs/phase-2e-motion-system.md).
Open decisions from that pass: motion tokens, compact crops that remove baked
lockups from cards, the `process-presentation` image (production blocker),
the preview banner no longer sticking, and two Property copy mismatches.

Phase 2E remains the active workstream. The approved media/crop pass is merged
(PR #16 and PR #17); the next implementation block is motion, transitions and
effects. Juanma can continue supplying or retouching media while implementation
stays confined to this repository and the shared web layer. Every new motion or
visual change must be previewed at mobile and desktop widths and visually
reviewed by Juanma before merge.

## Phase 2E merge record

The approved visual-media/crop pass is now merged into `main`:

- **PR #16** — approved media across Investment, Tax Advisory and Property Purchase. Merge commit: `b24ca2b31af85ff89ccff5cbee15ca67e675d322`.
- **PR #17** — Tax Advisory single-image hero with native 3:2 framing and widened Property Purchase authority composition. Merge commit: `bf040eb1545fb00c2c158be81363373473145737`.

The work remains preview-only: no production publication, custom domain, DNS, indexation or Buyer System connection was enabled. The next workstream is motion, transitions and effects.

## Deployment and publication boundary

GitHub integration may create Vercel deployments with a `production` target after merges or direct pushes to `main`. That infrastructure event is not publication approval. There is no approved custom domain, DNS change or indexation, and the site remains controlled preview/noindex until the production gates are explicitly closed.

## Absolute rules

- No secrets, ever.
- The mother repository and the Buyer System are read-only.
- No production publication, custom domain, DNS change or indexation.
- Every visual change requires Juanma's human review before merge

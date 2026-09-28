# Project Status — SARAHKATERINAWEBNUEVA

**Last updated:** 2026-09-28 (the previous header read 2026-10-23, a date later than this update; kept here as a note, not as history)  
**Repository status:** CONTROLLED PREVIEW · NOINDEX · NOT PRODUCTION

This file tracks the state of the website product. Strategic status lives
upstream in [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina)
PROJECT-STATUS.md`, which this repository does not duplicate or override.

## Phases

| Phase                                            | Scope                                                                                                                                          | State                                                                            |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1 — Technical foundation                         | Tokens, components, chrome, SEO scaffolding, analytics contract, CI                                                                            | **MERGED** (PR #1)                                                               |
| 2A — Structural prototype                        | Investment landing grammar, claims classification, Buyer System boundary                                                                       | **MERGED**                                                                       |
| 2 — Visual governance                            | Decision gate, implementation contract, asset manifest                                                                                         | **MERGED**                                                                       |
| 2B/2C — Investment visual implementation         | Template-led composition, approved palette, governed assets, shared web layer and visual review                                                | **MERGED — CANONICAL VISUAL BASE**                                               |
| 2D — Tax Advisory convergence                    | Tax Advisory adapted to Investment's canonical visual layer                                                                                    | **MERGED — VISUAL BASE READY**                                                   |
| 2D — Property Purchase convergence               | Property Purchase adapted to Investment's canonical visual layer                                                                               | **MERGED — VISUAL BASE READY** (PR #8)                                           |
| 2E — Premium media, motion and visual refinement | Media/crop pass merged; premium experience pass (motion system, art-direction crops, header orientation, per-landing signature moments, fixes) | **MERGED** (PR #16, #17, #21)                                                    |
| 2F — Approved imagery and hero videos            | Case imagery, hero videos (scroll-scrubbed), territory map film, fabric banner, consolidated review                                            | **MERGED** (PR #23–#28) — human visual review pending                            |
| 2G — Connected service journey                   | Shared journey band, Good-idea film (play-once), Buyer System placements                                                                       | **MERGED** (PR #29) — human visual review pending                                |
| 2H — Juanma's review of the four landings        | Hero films play without scroll (Investment, Purchase), calculator first (Tax, Purchase), review copy as proposals, Team simplification         | **DRAFT PR** — `feat/phase-2h-juanma-review-four-landings`; human review pending |
| 3 — Buyer System integration                     | Events, consent, lead-capture decision and approved public destinations                                                                        | Blocked on upstream decisions                                                    |
| 4 — Production gate                              | SEO, accessibility, performance, legal, content approval and migration                                                                         | Later                                                                            |

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

**2026-09-28 — Phase 2H, Juanma's review of the four landings, delivered for
review.** Branch `feat/phase-2h-juanma-review-four-landings`, Draft PR, not
merged. Point-by-point matrix, what changed, copy proposals awaiting a choice,
the audio audit, the assets Juanma needs to supply and the open decisions are in
[`docs/phase-2h-juanma-review.md`](docs/phase-2h-juanma-review.md). No visual is
approved by this delivery.

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

## Analytics status (2026-09-23)

Documentation only. Source of the facts and the full reconciliation:
`Juanmaes83/sarahkaterina` → `analytics/ga4-social-ads-reconciliation-2026-09-23.md`.

- **The currently published website** (not this repository) has a Google
  Analytics property with real historical data, confirmed by the project owner.
  Its reports, configuration, instrumentation and data quality have not been inspected or technically verified.
- **This repository contains no active connection to that property or to any
  other analytics destination.** Its analytics adapter is `noop`
  (`lib/analytics/track.ts`) and sends no events. No externally injected
  runtime analytics configuration has been verified. Metrics of the published
  site must not be attributed to this site.
- The typed contract in `lib/analytics/events.ts` follows the Buyer System brief
  (`calculator_start`, `lead_capture_submit`, `booking_start`, `booking_complete`…).
  It differs from the strategic measurement plan (`lead_form_submitted`,
  `appointment_completed`, `calculator_started`…) and from the Phase 0 spec
  (`form_submit`, `booking_completed`…). **Defining an event here does not send it
  to GA4.** The final taxonomy is a human decision and must be reconciled with
  the master plan before any implementation.
- No credential, Measurement ID, GTM container, pixel or token may be copied into
  this repository. A `G-…` Measurement ID identifies the data stream to which an
  implementation may send events. It is a public identifier and does not grant
  read access to GA4 reports; that access is managed outside the repository.
- No PII, and no tax, cadastral, health, disability or family data, may ever
  become an analytics or advertising parameter.
- Social Ads has no historical data for Sarah Katerina; any future campaign is a
  learning experiment from a historical baseline of its own.
- Connecting analytics, publishing this site, indexing it or connecting the
  domain each require explicit human approval.

## Deployment and publication boundary

GitHub integration may create Vercel deployments with a `production` target after merges or direct pushes to `main`. That infrastructure event is not publication approval. There is no approved custom domain, DNS change or indexation, and the site remains controlled preview/noindex until the production gates are explicitly closed.

## Absolute rules

- No secrets, ever.
- The mother repository and the Buyer System are read-only.
- No production publication, custom domain, DNS change or indexation.
- Every visual change requires Juanma's human review before merge

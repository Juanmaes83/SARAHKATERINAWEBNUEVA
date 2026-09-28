# Project Status — SARAHKATERINAWEBNUEVA

**Last updated:** 2026-09-28  
**Repository status:** CONTROLLED PREVIEW · NOINDEX · NOT PRODUCTION  
**`main`:** `edc47f0` (merge of PR #29, 2026-09-24) · **Open work:** Draft PR #30, Phase 2H, not merged

This file tracks the state of the website product. Strategic status lives
upstream in [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina)
`PROJECT-STATUS.md`, which this repository does not duplicate or override.

> **Date correction (2026-09-28).** An earlier version of this file carried a
> "Last updated 2026-10-23" header and a handoff dated 2026-10-23. Git shows that
> work was committed on 2026-09-23 (`5950b30`) and merged with PR #21 the same
> day; "23 OCTUBRE" is the name of the brief's folder (`IMAGES/MEJORAS 23
OCTUBRE/`), not a date. The entry below is re-dated accordingly.

## Phases

| Phase                                            | Scope                                                                                                                                   | State                                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1 — Technical foundation                         | Tokens, components, chrome, SEO scaffolding, analytics contract, CI                                                                     | **MERGED** (PR #1)                                                                   |
| 2A — Structural prototype                        | Investment landing grammar, claims classification, Buyer System boundary                                                                | **MERGED**                                                                           |
| 2 — Visual governance                            | Decision gate, implementation contract, asset manifest                                                                                  | **MERGED**                                                                           |
| 2B/2C — Investment visual implementation         | Template-led composition, approved palette, governed assets, shared web layer and visual review                                         | **MERGED — CANONICAL VISUAL BASE**                                                   |
| 2D — Tax Advisory convergence                    | Tax Advisory adapted to Investment's canonical visual layer                                                                             | **MERGED — VISUAL BASE READY**                                                       |
| 2D — Property Purchase convergence               | Property Purchase adapted to Investment's canonical visual layer                                                                        | **MERGED — VISUAL BASE READY** (PR #8)                                               |
| Team editorial preview                           | `/preview/team`: buyer-side roles, process and owner stage                                                                              | **MERGED** (PR #19, 2026-09-22)                                                      |
| 2E — Premium media, motion and visual refinement | Media/crop pass; premium experience (motion system, art-direction crops, header orientation, signature moments); visual content upgrade | **MERGED** (PR #16 and #17, 2026-09-22; PR #21, 2026-09-23)                          |
| 2F — Approved imagery and hero videos            | Case imagery, scroll-scrubbed hero videos, territory map film, fabric banner, consolidated review                                       | **MERGED** (PR #23–#28, 2026-09-24) — human visual review pending                    |
| 2G — Connected service journey                   | Shared journey band, Good-idea film (play-once), Buyer System placements                                                                | **MERGED** (PR #29, 2026-09-24) — human visual review pending                        |
| 2H — Juanma's review of the four landings        | Hero films without scroll (Investment, Purchase), calculator first (Tax, Purchase), review copy as proposals, Team simplification       | **DRAFT PR #30** — `feat/phase-2h-juanma-review-four-landings`; human review pending |
| 3 — Buyer System integration                     | Events, consent, lead-capture decision and approved public destinations                                                                 | Blocked on upstream decisions (B-01: production URL)                                 |
| 4 — Production gate                              | SEO, accessibility, performance, legal, content approval and migration                                                                  | Later                                                                                |

"Human visual review pending" means Juanma has not yet recorded a visual
approval of that phase on the Vercel preview. A merge is not a visual approval.

## CI status

On Draft PR #30, GitHub Actions did not start for the first commit `a07b808` (run 36446539003): both jobs were not started — _"The job was not started because an Actions budget is preventing further use."_ — an account budget limit, not a code failure. The later runs executed and passed: `9ee623a` (run 36446708091, queued at 15:51 UTC, ran at 16:10) and `551e058` (run 36449311876) — "Lint, typecheck, test and build" and "Secret and env hygiene" both `success`. The same checks were also run locally (`docs/phase-2h-juanma-review.md` §9). The Vercel preview deployed successfully; it sits behind Vercel SSO.

## Routes

| Route                        | Purpose                                              | Indexable                         |
| ---------------------------- | ---------------------------------------------------- | --------------------------------- |
| `/`                          | Repository overview, canonical brand chrome          | No                                |
| `/foundation`                | Component laboratory, canonical tokens               | No — ever                         |
| `/preview/investment`        | Canonical Investment visual base                     | No — ever, while under `/preview` |
| `/preview/tax-advisory`      | Tax Advisory visual base adapted to Investment       | No — ever, while under `/preview` |
| `/preview/property-purchase` | Property Purchase visual base adapted to Investment  | No — ever, while under `/preview` |
| `/preview/team`              | Editorial team page for buyer-side roles and process | No — ever, while under `/preview` |

Juanma has approved **Investment, Tax Advisory and Property Purchase** as visual
bases for continued implementation. That is a continuation approval, not
production or publication approval, and no equivalent record exists for Team.
Nothing may be promoted out of `/preview` until the production landing priority
is decided (`docs/phase-2-decision-gate.md`, D2-01).

## Design systems in use

One shared website layer serves all four `/preview` routes:

- **Canonical** (`app/tokens.css`, byte-identical to upstream) — used by `/`
  and `/foundation`. Never edited here.
- **Scoped website palette** (`app/web-tokens.css`, `--sk-web-*`) — ivory,
  navy and gold, approved for this repository only (2026-09-21). No palette
  change has been approved since; Juanma's aquamarine request is a pending
  decision (2H, H-03).
- **Shared web primitives** — `components/web/*` (chrome, sections, buttons,
  icons, charts, FAQ, journey band, Buyer System ribbon) and
  `components/motion/*` (`RevealOnScroll`, `ScrubVideo`, `PlayOnceVideo`,
  `HeroFilm` on the 2H branch). Landing-specific sections may extend the layer
  but may not duplicate its token, header, footer or button systems.

## Open decisions

Production decisions remain open in `docs/phase-2-decision-gate.md` and the
landing-specific visual decision documents. The decisions raised by Juanma's
review (hero playback on Tax, headlines, palette, gold, compositions, scope
wording, case evidence, voice-over, photographs, Buyer System URL) are listed
with owners in `docs/phase-2h-juanma-review.md` §8.

The visual bases are approved for continuation, but the following still require
Juanma's review before they are treated as final:

- selected photographs and videos, their provenance, slot assignment, crop and
  retouch — including the authority portrait and the team photographs (2H,
  A-01–A-04);
- final logo treatment on light and dark surfaces;
- replacement of schematic or illustrative placeholders where an authentic
  asset is available;
- final CTA destinations, Buyer System origin and any functional capture;
- legal entity, contact details, testimonials, cases, prices, timelines and
  other claims;
- production host, indexation, accessibility/performance and migration gates.

## Current handoff

Most recent first.

**2026-09-28 — Phase 2H, Juanma's review of the four landings (Draft PR #30,
not merged).** Branch `feat/phase-2h-juanma-review-four-landings`. The
point-by-point matrix (implemented / proposal / partly / decision pending /
blocked), what changed, copy proposals awaiting a choice, the audio audit, the
assets Juanma needs to supply and the open decisions are in
[`docs/phase-2h-juanma-review.md`](docs/phase-2h-juanma-review.md). No visual is
approved by this delivery. CI: see "CI status".

**2026-09-24 — Phase 2G connected service journey merged (PR #29).** Record:
[`docs/phase-2g-connected-service-journey.md`](docs/phase-2g-connected-service-journey.md).
Human visual review pending.

**2026-09-24 — Phase 2F merged (PR #23–#28).** Case imagery, hero videos, map
film and fabric banner; the owner then replaced the Investment and Tax hero
sources (see the top note of
[`docs/phase-2f-images-and-scroll-hero-implementation.md`](docs/phase-2f-images-and-scroll-hero-implementation.md)).
Human visual review pending.

**2026-09-23 — Phase 2E premium experience and visual content upgrade merged
(PR #21).** Visual content upgrade against the brief `IMAGES/MEJORAS 23
OCTUBRE/` (shared `ReportExplorer`, common image grade `sk-editorial-v1`):
[`docs/phase-2e-visual-content-upgrade.md`](docs/phase-2e-visual-content-upgrade.md).
Premium pass and motion rulebook:
[`docs/phase-2e-premium-experience.md`](docs/phase-2e-premium-experience.md),
[`docs/phase-2e-motion-system.md`](docs/phase-2e-motion-system.md). The open
decisions recorded there (motion tokens, compact crops, the
`process-presentation` image, the preview banner, two Property copy mismatches)
were not resolved by later phases unless their records say so.

Every visual change must be previewed at mobile and desktop widths and visually
reviewed by Juanma before merge.

## Merge record

- **PR #16** — approved media across Investment, Tax Advisory and Property Purchase. Merge commit `b24ca2b` (2026-09-22).
- **PR #17** — Tax Advisory single-image hero and widened Property Purchase authority composition. Merge commit `bf040eb` (2026-09-22).
- **PR #19** — Team editorial preview (2026-09-22).
- **PR #21** — Phase 2E premium experience, motion and visual content upgrade. Merge commit `c8eb579` (2026-09-23).
- **PR #23–#27** — October media (#23), map film and fabric banner (#24), case imagery and scroll hero videos (#25); #26 and #27 brought #23 and #24 into `integration/phase-2f-complete-review`. Their commits reach `main` through PR #28 (2026-09-24).
- **PR #28** — Phase 2F consolidated visual review. Merge commit `2a200ed` (2026-09-24).
- **PR #29** — Phase 2G connected service journey. Merge commit `edc47f0` (2026-09-24).

All of it remains preview-only: no production publication, custom domain, DNS,
indexation or Buyer System connection was enabled.

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

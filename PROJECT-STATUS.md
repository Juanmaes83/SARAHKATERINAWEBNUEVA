# Project Status — SARAHKATERINAWEBNUEVA

**Last updated:** 2026-09-21  
**Repository status:** CONTROLLED PREVIEW · NOINDEX · NOT PRODUCTION

This file tracks the state of the website product. Strategic status lives
upstream in https://github.com/Juanmaes83/sarahkaterina PROJECT-STATUS.md,
which this repository does not duplicate or override.

## Current position

Investment now has its first complete visual base merged into main. Tax
Advisory is being built in a separate working terminal. Property Purchase is
the next landing. Once the three bases exist, shared visual improvements will
be implemented across them as a consolidation pass.

The Investment merge is a development milestone only. It does not approve
production, indexation, migration, claims, legal copy or final visual quality.

## Phases

| Phase | Scope | State |
|---|---|---|
| 1 — Technical foundation | Tokens, components, chrome, SEO scaffolding, analytics contract, CI | **MERGED** |
| 2A — Structural prototype | Investment landing grammar, claims classification, Buyer System boundary | **MERGED** |
| 2B — Investment visual implementation | Template composition, scoped palette, authentic logo, dashboards, copy and motion | **MERGED** — PR #4, merge da2e36a |
| 2C — Investment visual fidelity | Template fidelity pass, SVG icon system, media-led cards, report preview and final CTA | **MERGED** — PR #5, merge 54f460b |
| Tax Advisory visual base | Tax Advisory template implementation | **IN PROGRESS** — separate working terminal, not yet merged |
| Property Purchase visual base | Property Purchase template implementation | **NEXT** |
| Shared visual consolidation | Apply common improvements across the three bases | **AFTER THE THREE BASES** |
| 3 — Buyer System integration | Events, consent, lead-capture decision | Blocked on upstream decisions |
| 4 — Production gate | SEO, accessibility, performance, legal, migration | Later |

## Routes

| Route | Purpose | Indexable |
|---|---|---|
| / | Repository overview, canonical brand chrome | No |
| /foundation | Component laboratory, canonical tokens | No — ever |
| /preview/investment | Investment visual base | No — ever, while under /preview |
| /preview/tax-advisory | Tax Advisory visual base | Planned / noindex |
| /preview/property-purchase | Property Purchase visual base | Planned / noindex |

Nothing may be promoted out of /preview until the production priority,
claims, legal data, SEO and final visual review are explicitly resolved.

## Design systems in use

Two coexisting layers remain deliberate:

- **Canonical** (app/tokens.css, byte-identical to upstream) — used by / and
  /foundation. Never edited here.
- **Scoped website palette** (app/web-tokens.css, --sk-web-*) — ivory, navy
  and gold, approved 2026-09-21 for this website project only.

Investment uses authentic Sarah assets and a native motion equivalent. Property
photography, video, final claims and some brand treatments remain open where the
source material is unavailable or requires a human decision.

## Open decisions

See docs/phase-2-decision-gate.md and the service-specific decision records.

Current open items include:

- real property / Costa Blanca photography and approved video;
- final dark-surface logo treatment;
- final CTA and legal/contact data;
- production landing priority;
- Buyer System production URL and lead-capture location;
- Spanish route architecture and hreflang;
- permissioned cases and verified figures;
- final visual consolidation after Tax Advisory and Property Purchase.

## Rules

- No secrets, ever.
- The mother repository and Buyer System are read-only.
- No production deployment, no domain, no DNS.
- Preview routes remain noindex.
- Future visual changes require Juanma's human review before merge.
- A merged preview base is not production approval.

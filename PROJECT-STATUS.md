# Project Status — SARAHKATERINAWEBNUEVA

**Last updated:** 2026-09-21
**Repository status:** CONTROLLED PREVIEW · NOINDEX · NOT PRODUCTION

This file tracks the state of the website product. Strategic status lives
upstream in [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina)
`PROJECT-STATUS.md`, which this repository does not duplicate or override.

## Phases

| Phase | Scope | State |
|---|---|---|
| 1 — Technical foundation | Tokens, components, chrome, SEO scaffolding, analytics contract, CI | **MERGED** (PR #1) |
| 2A — Structural prototype | Investment landing grammar, claims classification, Buyer System boundary | **MERGED** (PR #2) |
| 2 — Visual governance | Decision gate, implementation contract, asset manifest | **MERGED** (PR #3) |
| 2B — Visual implementation | Scoped ivory/navy/gold palette, real assets, dashboards, motion, copy | **READY FOR HUMAN REVIEW** — this PR |
| 2C — Visual review and correction | Juanma reviews the Vercel preview and corrects | **REQUIRED BEFORE MERGE** |
| 3 — Buyer System integration | Events, consent, lead-capture decision | Blocked on upstream decisions |
| 4 — Production gate | SEO, accessibility, performance, legal, migration | Later |

## Routes

| Route | Purpose | Indexable |
|---|---|---|
| `/` | Repository overview, canonical brand chrome | No |
| `/foundation` | Component laboratory, canonical tokens | No — ever |
| `/preview/investment` | Investment visual implementation, scoped web palette | No — ever, while under `/preview` |

Nothing may be promoted out of `/preview` until the production landing priority
is decided (`docs/phase-2-decision-gate.md`, D2-01).

## Design systems in use

Two coexisting layers, deliberately:

- **Canonical** (`app/tokens.css`, byte-identical to upstream) — used by `/`
  and `/foundation`. Never edited here.
- **Scoped website palette** (`app/web-tokens.css`, `--sk-web-*`) — ivory,
  navy, gold, approved 2026-09-21 for this repository only. Additive.

## Open decisions

See `docs/phase-2-decision-gate.md` §5 and
`docs/phase-2b-visual-implementation.md` §8.

The most urgent are: production landing priority, the logo treatment on dark
surfaces and its teal-versus-gold discrepancy, whether a Costa Blanca
photograph is commissioned, and the location of lead capture.

## Absolute rules

- No secrets, ever.
- The mother repository and the Buyer System are read-only.
- No production deployment, no domain, no DNS.
- Every visual change requires Juanma's human review before merge.

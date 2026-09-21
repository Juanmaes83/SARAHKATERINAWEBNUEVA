# Phase 2 — Decision Gate

**Status:** OPEN — records a conflict, does not resolve it
**Date:** 2026-09-21
**Scope:** which landing Phase 2 builds, and under what status

---

## 1. The conflict, stated plainly

Two different priorities point at two different landings. Neither supersedes the
other, and no human decision exists that reconciles them.

### A. Business priority — Pre-Arras / Before You Sign / `/tax-diagnostic`

| Evidence | Source | Status |
|---|---|---|
| `/tax-diagnostic` is the **canonical active asset** of the Pre-Arras / Before You Sign offer. It already exists in production with a payment gateway, 24h delivery and a proceed/renegotiate/walk recommendation. SK-032 was reclassified from "create a landing" to "index, measure and align". | `strategy/master/decisions-log.md`, 2026-08-05 | **Aprobada** |
| The Modelo 210 / recurring non-resident tax territory is confirmed as a central territory, verified against 8 competitors, and is the only one with an annual recurring cycle. | `strategy/master/decisions-log.md`, 2026-08-05 | **Aprobada** |
| Property Purchase should surface a pre-arras review as its primary CTA, with Purchase Tax and Real Cash Needed as micro-conversions. | `website/01-audits/00-website-audit-master-2026-09.md` §3 P0 | CANONICAL baseline |
| The Buyer System is the strongest intent and qualification mechanism and is currently disconnected from every landing. | `website/01-audits/00-website-audit-master-2026-09.md` §2, problem 3 | CANONICAL baseline |

**Reading:** the business priority is an approved decision, backed by a product
that verifiably exists and by a territory verified against competitors.

### B. Visual-prototype priority — Investment

| Evidence | Source | Status |
|---|---|---|
| `website/nueva web/Sarah Katerina Investment.png` is one of four proposal screenshots. | `website/nueva web/` | **MATERIAL VISUAL DE PROPUESTA** — explicitly not canonical documentation and not a production approval (`website/README.md`, `decisions-log.md` 2026-09-16) |
| The Investment landing architecture (hero, Monte Carlo / seasonality / scenario previews, Asking Price + Real Cash Needed before the paid report). | `website/02-activation/new-website-landings-proposal-2026-09.md` §3 | **PROPOSAL — NOT CANONICAL — NOT APPROVED FOR PRODUCTION** |
| Investment needs more proof, a clearer entry point and clearer scope; the paid product must be protected. | `website/01-audits/00-website-audit-master-2026-09.md` §5 | CANONICAL baseline, but a *diagnosis*, not a priority ruling |

**Reading:** the visual priority rests on documents that classify themselves as
proposals. None of them claims Investment is the commercial priority.

---

## 2. Why this is not resolvable by an agent

`brand-system/SOURCE-HIERARCHY.md` ranks an approved decision (L1) and a merged
canonical system (L2) above a proposal or mockup (L7). On authority alone, **A
outranks B**.

But that does not make A the right thing to *build first in Phase 2*, because:

- the two are not competing claims about the same question. A is a statement
  about **commercial priority**; B is a statement about **which composition was
  explored visually**;
- `PROJECT-STATUS.md` states that current landing design, content, animation,
  CRO and personalisation are **NOT APPROVED**, and that future work belongs to
  a separate **Landing Experience System** that follows the Creative Brand
  System. Phase 2 therefore cannot produce an approved landing for *either*;
- the source hierarchy's own rule applies: *"An unresolved decision is not
  permission to decide it silently. It is also not a reason to stop unrelated
  work."*

---

## 3. Ruling applied in Phase 2

No new human decision exists. Therefore:

> **Investment is implemented as `VISUAL PROTOTYPE — NOT PRODUCTION`.**

Specifically:

1. The landing is built at **`/preview/investment`**, inside a `preview`
   namespace, not at `/investment`. The route is a laboratory route: `noindex`,
   `nofollow`, excluded from the sitemap, excluded from any future information
   architecture until a decision exists.
2. Every page carries a persistent, visible prototype banner. The prototype
   status is not a footnote.
3. It is **not** presented as an approved landing.
4. It is **not** presented as the definitive business priority.
5. The business priority recorded above (Pre-Arras / `/tax-diagnostic`) is
   **not** contradicted, downgraded or overwritten by this build.
6. Building Investment visually does **not** constitute a recommendation to
   prioritise Investment commercially.

### Why Investment and not Pre-Arras, given A outranks B

Because Phase 2's deliverable is a **visual system**, not a commercial launch.
Investment is the composition the proposal actually explored, so building it
tests the design system against a real intended layout without inventing one.
Building Pre-Arras instead would require inventing a composition that no
approved or proposed document describes — which rule 8 forbids.

The prototype therefore validates the **design system**, and leaves the
**commercial priority** exactly where the approved decision left it.

---

## 4. What Sarah needs to decide

| # | Decision | Why it is blocked | Consequence of not deciding |
|---|---|---|---|
| D2-01 | **Which landing is built first for production**: Pre-Arras / `/tax-diagnostic` or Investment. | A (approved business priority) and B (explored visual priority) point in different directions and no document reconciles them. | Phase 3 cannot start. The prototype stays a prototype. |
| D2-02 | Whether `/tax-diagnostic` is **migrated** into this repository or stays where it is and is linked. | It already exists in production with a payment gateway. Rebuilding it is out of scope and would risk the live product. | Information architecture cannot be fixed. |
| D2-03 | Whether the **€1,000 savings-or-risks guarantee** on `/tax-diagnostic` is reformulated. | `decisions-log.md` 2026-08-05 records this as **Propuesta**, not approved: it is a quantified savings promise, contrary to Calm Evidence, and it has already been offered to clients. Requires legal review. | No Pre-Arras copy can be written. |
| D2-04 | Whether the **€597 Investment analysis price** and the **€347 `/tax-diagnostic` price** may be published. | Both figures appear in upstream documents, but the master audit requires every published claim to carry source, date, permission and scope. | No pricing appears in the prototype. |
| D2-05 | **Per-intent CTA wording** for each landing. | An open P0 in the master audit. | The prototype uses provisional CTAs only. |
| D2-06 | Whether the **Asking Price** experience may be linked publicly. | Its roadmap status is `NEXT — LIMITED GO`; "Production requires Sarah and legal review." | The prototype links it as pending, not as a live tool. |

Until D2-01 is answered, **no landing in this repository may be promoted out of
the `preview` namespace.**

---

## 5. What this document does not do

- It does not choose the commercial priority.
- It does not approve the Investment landing.
- It does not approve any copy, claim, figure or CTA.
- It does not supersede `decisions-log.md` or `PROJECT-STATUS.md`.

It records the conflict, the evidence on each side, the ruling applied to
Phase 2, and the decisions that remain with a human.

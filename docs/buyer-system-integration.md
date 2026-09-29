# Buyer System — integration contract

**Status:** ACTIVE TECHNICAL BRIEF — verified routes available only in configured Preview; Production unset; restricted routes remain gated
**Date:** 2026-09-28 (upstream deployment re-verified)
**Upstream:** [`Juanmaes83/Sarah-Katerina-Buyer-System`](https://github.com/Juanmaes83/Sarah-Katerina-Buyer-System) — **read-only**

This repository does not rebuild, vendor, fork or copy any Buyer System code.
Integration is by link and by a typed adapter boundary only.

---

## 1. What actually exists upstream

Verified by reading the repository on 2026-09-21. This section is fact, not plan.

| Experience                                                | Route                                          | Status                                                                                                       | Scope                                                                                                                                    |
| --------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **What does Spain charge me to buy this?** (purchase tax) | **`/`** — the site root, _not_ `/purchase-tax` | Live                                                                                                         | Comunitat Valenciana general regime, transactions from 1 June 2026                                                                       |
| **How much cash will I really need?**                     | **`/real-cash-needed`**                        | Live                                                                                                         | Reuses the purchase-tax engine; never auto-estimates notary, registry, gestoría or valuation                                             |
| **Are they asking too much?** (asking price)              | **`/asking-price`**                            | Route deployed, but roadmap remains **`NEXT — LIMITED GO`** — _"Production requires Sarah and legal review"_ | Licensed official context + buyer-entered comparables only. No scraping, no automated valuation, no fair-price claim, no suggested offer |

### Fiscal scope actually implemented

From `docs/FISCAL_SOURCE_REGISTER.md`, last verified 28 July 2026:

- ITP 9% general; 11% where property value exceeds €1,000,000 (from 1 June 2026)
- AJD 1.4%; VAT 10% for qualifying dwelling deliveries
- Base = higher of cadastral reference value, declared value and agreed price
- **Deliberately excluded:** reduced rates, exemptions, protected housing,
  unusual structures, disputed reference values. These are detected and routed
  to review rather than estimated.

**Territorial limit:** Comunitat Valenciana only. Any landing that implies
national coverage would misrepresent the tool.

---

## 2. Gaps between the Phase 2 brief and reality

These are real incompatibilities, not omissions. Recording them is the point.

| Brief assumes                                                      | Reality                                                                                                                        | Consequence                                                                                                              |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| A **Purchase Tax** calculator at a dedicated path                  | It is at the Buyer System **root** (`/`)                                                                                       | Links must point to the root, not to `/purchase-tax`                                                                     |
| A **Tax Exposure** calculator for Tax Advisory                     | **Does not exist.** No such experience, route or domain module                                                                 | Tax Advisory cannot link one. Marked `PENDING_APPROVAL`                                                                  |
| Calculator → **progressive capture** → recommendation              | **No lead capture exists.** No email field, no form, no CRM, no database, no accounts, no persistence beyond the browser tab   | The funnel step cannot be built against the current Buyer System                                                         |
| Analytics events (`calculator_start`, `calculator_result_view`, …) | **No analytics or event layer exists upstream**                                                                                | Events can only be fired on _this_ side, for the outbound click. Nothing downstream is observable                        |
| Context carried from landing into a calculator                     | Handoff is `sessionStorage`, **same-origin only**, and stores raw inputs only — never a computed result (see the upstream ADR) | A cross-origin link **cannot** carry context. Prefilling requires a same-origin deployment or an approved query contract |

### The deeper conflict — worth a human decision

The Buyer System's Product Playbook states:

> _"Reject copy that creates urgency, overpromises certainty, uses unexplained
> jargon or **sounds like a sales funnel**."_

and its roadmap **rejects** CRM features inside the Buyer System outright.

The activation brief in the mother repository, meanwhile, specifies progressive
profiling, lead scoring and a follow-up sequence after the result.

Both are governed documents. They are not obviously compatible. The Phase 2
instruction _"never block the first useful result behind a form"_ is consistent
with the Buyer System's position and is the rule this repository follows.

**Open question for Sarah:** where does lead capture live — after the result
inside the Buyer System (which its own constitution resists), or on the website
after the user returns? Nothing is built until this is answered.

---

## 3. Integration contract implemented here

`lib/buyer-system/links.ts` is the entire integration surface.

### Design rules

1. **No code is copied.** No calculator logic, no fiscal constant, no rate, no
   formula, no component. Every euro figure stays behind the upstream engine.
2. **No result is reproduced.** This repository never displays, caches or
   recomputes a tax figure. Doing so would create a second, unversioned source
   of fiscal truth — precisely what the upstream ADR exists to prevent.
3. **The base URL is not invented.** The upstream production origin
   `https://sarah-katerina-buyer-system.vercel.app` was verified on 2026-09-28
   from repository metadata, its GitHub Production deployment for `main` at
   `c197ed2`, and HTTP 200 responses for its routes. This website reads the
   origin only from `NEXT_PUBLIC_BUYER_SYSTEM_URL`; it has no code default.
   Configure that variable only in controlled Vercel Preview environments.
   Keep it unset in Production; without it, entry points render as pending.
4. **Availability is declared, not assumed.** Each experience carries its real
   upstream status. `asking-price` is `limited-go`, so it never renders as a
   live tool.
5. **Outbound clicks are the only measurable event**, and they fire through the
   existing typed no-op adapter. No vendor is connected.

### Placement — where each entry point belongs

> **Phase 2H (2026-09-28):** Juanma's review asked for the purchase tax and costs
> tool "big, at the start of the page" on Tax Advisory and Property Purchase. It
> now sits directly under each hero, resolved only through `resolveEntryPoint`.
> Links are available when the approved origin is configured in controlled
> Preview; they remain pending when that variable is absent. No calculator,
> figure or result is rendered on this website. See
> `docs/phase-2h-juanma-review.md` §C–D for the original request.

Per the activation brief, adjusted for what exists:

| Surface             | Experience       | Moment                              | Buildable today                                                                                 |
| ------------------- | ---------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Investment          | Asking Price     | Before the paid analysis            | **No** — `limited-go`, needs Sarah + legal                                                      |
| Investment          | Real Cash Needed | Beside scenarios and sensitivity    | **Preview only** when `NEXT_PUBLIC_BUYER_SYSTEM_URL` is configured                                               |
| Property Purchase   | Purchase Tax     | Directly under the hero (Phase 2H)  | **Preview only** — lead variant (`BuyerToolBand`) when the origin is configured                                |
| Property Purchase   | Real Cash Needed | After process, before the final CTA | **Preview only** when `NEXT_PUBLIC_BUYER_SYSTEM_URL` is configured                                               |
| Tax Advisory        | Purchase Tax     | Directly under the hero (Phase 2H)  | **Preview only** — `BuyerToolBand` when the approved origin is configured                                      |
| Tax Advisory        | Tax Exposure     | Bridge to the diagnostic            | **No** — does not exist                                                                         |
| Home                | Hub entry        | After the trust strip               | **Linked on `/preview/home`** for Purchase Tax and Real Cash Needed; Asking Price remains gated |
| Property Management | None             | —                                   | Held: D-06 unexecuted                                                                           |

### Flow as implemented in the prototype

```
Landing section
  -> outbound click (analytics: calculator_start, no-op adapter)
  -> Buyer System experience (separate origin, own governance)
  -> result shown there, unconditionally, with no form in front of it
  -> [GAP] return path, capture and recommendation: NOT BUILT
```

The gap is deliberate and visible. It is not a missing feature; it is an
unanswered product question.

---

## 4. What would unblock a real connection

| #    | Needed                                                                                                                                                    | From whom         |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| B-01 | ~~The Buyer System's **production URL**, confirmed~~ — **resolved 2026-09-28** by current upstream repository and deployment evidence                     | —                 |
| B-02 | Decision on **where lead capture lives** (§2)                                                                                                             | Sarah             |
| B-03 | Approval to link **Asking Price** publicly                                                                                                                | Sarah + legal     |
| B-04 | Whether a **Tax Exposure** experience is commissioned                                                                                                     | Sarah             |
| B-05 | An approved **query-parameter contract** if landing context should prefill a calculator — noting the upstream brief forbids buyer amounts in a public URL | Both repositories |
| B-06 | Approved **analytics vendor and consent mechanism** before any event leaves the browser                                                                   | Sarah             |

B-01 is closed. B-03 and B-04 remain binding: Asking Price and Tax Exposure
still render as non-linkable states even though the former route is deployed.

---

## 5. Environment variable

| Variable                       | Default         | Purpose                                                                         |
| ------------------------------ | --------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BUYER_SYSTEM_URL` | verified origin | Optional override for the deployed Buyer System origin. Public, never a secret. |

No API key, token or shared secret is involved. The integration is outbound
links only.

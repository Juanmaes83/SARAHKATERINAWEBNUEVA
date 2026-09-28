# Buyer System — integration contract

**Status:** ACTIVE TECHNICAL BRIEF — origin authorised (2026-09-28); links active on the Home PR's Vercel Preview only; production environment not configured
**Date:** 2026-09-21 · **Updated:** 2026-09-28 (§6)
**Upstream:** [`Juanmaes83/Sarah-Katerina-Buyer-System`](https://github.com/Juanmaes83/Sarah-Katerina-Buyer-System) — **read-only**

This repository does not rebuild, vendor, fork or copy any Buyer System code.
Integration is by link and by a typed adapter boundary only.

---

## 1. What actually exists upstream

Verified by reading the repository on 2026-09-21, and again on 2026-09-28 against `main` at `c197ed2`: the three routes exist as `app/page.tsx`, `app/real-cash-needed/page.tsx` and `app/asking-price/page.tsx`. This section is fact, not plan.

| Experience                                                | Route                                          | Status                                                                   | Scope                                                                                                                                    |
| --------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **What does Spain charge me to buy this?** (purchase tax) | **`/`** — the site root, _not_ `/purchase-tax` | Live                                                                     | Comunitat Valenciana general regime, transactions from 1 June 2026                                                                       |
| **How much cash will I really need?**                     | **`/real-cash-needed`**                        | Live                                                                     | Reuses the purchase-tax engine; never auto-estimates notary, registry, gestoría or valuation                                             |
| **Are they asking too much?** (asking price)              | **`/asking-price`**                            | **`NEXT — LIMITED GO`** — _"Production requires Sarah and legal review"_ | Licensed official context + buyer-entered comparables only. No scraping, no automated valuation, no fair-price claim, no suggested offer |

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
3. **The base URL is not invented.** It comes from
   `NEXT_PUBLIC_BUYER_SYSTEM_URL`. When unset, every entry point renders as
   `PENDING_APPROVAL` and links nowhere.
4. **Availability is declared, not assumed.** Each experience carries its real
   upstream status. `asking-price` is `limited-go`, so it never renders as a
   live tool.
5. **Outbound clicks are the only measurable event**, and they fire through the
   existing typed no-op adapter. No vendor is connected.

### Placement — where each entry point belongs

> **Phase 2H (2026-09-28):** Juanma's review asked for the purchase tax and costs
> tool "big, at the start of the page" on Tax Advisory and Property Purchase. It
> now sits directly under each hero as a navy lead band, still resolved only by
> `resolveEntryPoint` and still an explicit pending state while
> `NEXT_PUBLIC_BUYER_SYSTEM_URL` is unset. No calculator, figure or result is
> rendered. See `docs/phase-2h-juanma-review.md` §C–D.

Per the activation brief, adjusted for what exists:

| Surface             | Experience       | Moment                              | Buildable today                                                                                                                                                 |
| ------------------- | ---------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Investment          | Asking Price     | Before the paid analysis            | **No** — `limited-go`, needs Sarah + legal                                                                                                                      |
| Investment          | Real Cash Needed | Beside scenarios and sensitivity    | Yes, once the base URL is approved                                                                                                                              |
| Property Purchase   | Purchase Tax     | Directly under the hero (Phase 2H)  | Yes, once the base URL is approved — lead variant (`BuyerToolBand`); pending until B-01                                                                         |
| Property Purchase   | Real Cash Needed | After process, before the final CTA | Yes, once the base URL is approved                                                                                                                              |
| Tax Advisory        | Purchase Tax     | Directly under the hero (Phase 2H)  | Yes, once the base URL is approved — moved from after the calendar (Phase 2G) at Juanma's request; `BuyerToolBand`; pending                                     |
| Tax Advisory        | Tax Exposure     | Bridge to the diagnostic            | **No** — does not exist                                                                                                                                         |
| Home                | Hub entry        | After the trust strip               | **Implemented** on `/preview/home` (PR for `feat/preview-home-calculators`): Purchase Tax and Real Cash Needed ribbons; Asking Price and Tax Exposure not shown |
| Property Management | None             | —                                   | Held: D-06 unexecuted                                                                                                                                           |

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

| #    | Needed                                                                                                                                                                               | From whom         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| B-01 | ~~The Buyer System's production URL, confirmed~~ — **authorised by Juanma on 2026-09-28**: `https://sarah-katerina-buyer-system.vercel.app` (§6). Production environment still unset | —                 |
| B-02 | Decision on **where lead capture lives** (§2)                                                                                                                                        | Sarah             |
| B-03 | Approval to link **Asking Price** publicly                                                                                                                                           | Sarah + legal     |
| B-04 | Whether a **Tax Exposure** experience is commissioned                                                                                                                                | Sarah             |
| B-05 | An approved **query-parameter contract** if landing context should prefill a calculator — noting the upstream brief forbids buyer amounts in a public URL                            | Both repositories |
| B-06 | Approved **analytics vendor and consent mechanism** before any event leaves the browser                                                                                              | Sarah             |

Wherever `NEXT_PUBLIC_BUYER_SYSTEM_URL` is unset, every entry point renders as
pending. That is the intended default, not a bug. B-02 to B-06 remain open.

---

## 5. Environment variable

| Variable                       | Default   | Purpose                                                                                                                                                                                                                                 |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BUYER_SYSTEM_URL` | _(unset)_ | Origin of the deployed Buyer System. Unset renders every entry point as `PENDING_APPROVAL`. Public, never a secret. There is **no default in code** (`lib/buyer-system/links.ts`); the value lives only in the Vercel environment (§6). |

No API key, token or shared secret is involved. The integration is outbound
links only.

---

## 6. Origin and activation — 2026-09-28

**Origin checked** (read-only; no secret printed):

| Check                                                              | Result                                                                                                                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Upstream repository homepage                                       | `https://sarah-katerina-buyer-system.vercel.app`                                                                                                                   |
| GitHub deployments, `Production`                                   | Latest: `c197ed2` (the current `main`), 2026-07-29, state `success`, served by the Vercel project `sarah-katerina-buyer-system`, target `production`, status Ready |
| `https://sarah-katerina-buyer-system.vercel.app`                   | `/` 200 · `/real-cash-needed` 200 · `/asking-price` 200 · `/purchase-tax` 404 (as expected: purchase tax is the root)                                              |
| The immutable deployment URL                                       | Behind Vercel SSO (302), so it is not usable as a public destination                                                                                               |
| `www.sarahkaterina.com/buyer-system`                               | 404; `sarahkaterina.com/buyer-system` redirects there. No custom-domain origin exists                                                                              |
| GitHub Pages (`juanmaes83.github.io/Sarah-Katerina-Buyer-System/`) | 404; the Pages site no longer exists                                                                                                                               |

**Authorisation.** Juanma authorised `https://sarah-katerina-buyer-system.vercel.app` as the Buyer System's public origin on 2026-09-28. It is the Vercel production alias — stable while that project and alias exist — and not a per-deployment preview URL. No domain was invented.

**Where it is configured.** Only as `NEXT_PUBLIC_BUYER_SYSTEM_URL` in the Vercel **Preview** environment, scoped to the branch `feat/preview-home-calculators`. It is not set for Production, for other branches, or in `.env.example`. Setting it for Production is a separate step that belongs to the production gate, not to this preview.

**What that activates on that Preview.** Purchase Tax (`/`) and Real Cash Needed (`/real-cash-needed`) render as outbound links from Home, Tax Advisory, Property Purchase and the Investment tools band. Asking Price stays "Coming soon" and is never a link (`limited-go`); Tax Exposure is never rendered (`not-built`). Links carry no query string, amount or personal data; the only event is the existing no-op `calculator_start`.

**Finding for the Buyer System owners (not changed here).** The production alias serves `/asking-price` publicly, while that experience's upstream status is `NEXT — LIMITED GO` ("Publish only to Vercel Preview … before any production release"). This website does not link it. Whether it should be reachable on the production alias is for the Buyer System repository to decide.

Still open: B-02 lead capture, B-03 Asking Price, B-04 Tax Exposure, B-05 prefill contract, B-06 analytics and consent.

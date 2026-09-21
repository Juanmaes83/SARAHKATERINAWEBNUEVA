# Copy and claims matrix

**Status:** ACTIVE — classification of every claim in the Investment prototype
**Date:** 2026-09-21

**No copy on this page is approved.** This document classifies each statement
so a reviewer can approve, reject or rewrite it individually rather than
approving a wall of text.

---

## 1. Classification model

From `AGENTS.md` §10. Every claim in `content/en/investment.ts` carries a
status, and a test fails the build if one does not.

| Status | Meaning | May render as fact |
|---|---|---|
| `confirmed` | Verified in the source of truth or by primary evidence, **and** cites its source | Yes |
| `proposal` | Suggested wording, not approved | No |
| `pending` | Awaiting a human decision | No |
| `blocked` | Cannot proceed until something else resolves | No |
| `unverified` | Asserted somewhere but not evidenced | No |

A second axis records the **review domain**: `tax`, `legal`, `financial`,
`returns` or `none`. Per `AGENTS.md` §11, anything in a review domain requires
competent human review and **can never be `confirmed` by an agent**, whatever
its source. This is enforced by test.

---

## 2. What is confirmed

Only these statements are published without a visible status marker.

| Claim | Source | Note |
|---|---|---|
| `Clarity before commitment.` | `brand-system/governance/decision-status-model.md` — `APPROVED` + `PUBLIC_PRODUCTION` | The only approved brand promise. Not used on this page; reserved. |
| "Paid by — the buyer only" (trust strip) | `decisions-log.md` 2026-07-27; `PROJECT-STATUS.md` independence model confirmed by the project owner 2026-08-13 | The remuneration model is confirmed. The **formal client mandate and contractual scope remain pending** and are deliberately not described. |
| Independence answer (FAQ) | Same as above | Describes remuneration only. It does not describe contractual scope. |
| "Paid only by you" (benefits) | `decisions-log.md` 2026-07-27 | Feature statement only. |
| "The differential proof is the published method, not the number of clients." | `decisions-log.md` 2026-08-05 | Also the reason the trust strip carries no volume figure. |
| Prototype notice | `docs/phase-2-decision-gate.md` §3 | Describes this repository's own status. |
| "Sarah Katerina" | Brand name | — |

**Everything else on the page is `proposal`, `pending` or `blocked`.**

---

## 3. Deliberately withheld

| Withheld | Why | Where it would go |
|---|---|---|
| **Price of the review** | A figure exists upstream but publication is not approved. Decision gate D2-04. | FAQ "What does the review cost?" |
| **Price of `/tax-diagnostic`** | Same. Additionally, the "€1,000 savings or risks" guarantee attached to it is recorded upstream as **Propuesta** requiring legal review. | Not referenced on this page |
| **Every turnaround time** | No confirmed figure. | All five process stages |
| **The 20-year Tax Administration credential** | Confirmed upstream, but the master audit requires a claims dossier (source, date, permission, scope) before publication. That dossier does not exist. | Trust strip, authority |
| **Buyers advised / volume** | Upstream explicitly deprioritised volume as differential proof; a competitor publishes an indistinguishable figure. | Trust strip |
| **Coverage, languages, response time** | No approved published wording. | Trust strip |
| **Every yield, return, percentage and modelled figure** | Would be a fabricated financial result. | Hero visual, scenario chart |
| **All case outcomes** | Require written client permission and verified figures. | Cases |
| **Contact channels, legal entity, address** | Not confirmed anywhere. | Footer |
| **Institutional descriptor** | `NEEDS_DECISION` upstream. `Property Decision Advisor` is `TEST` + `INTERNAL_TEST_ONLY`. | Hero eyebrow, authority |

Enforced by test: no currency figure, no percentage, no guarantee language, no
uniqueness claim and no held or unapproved naming may appear in the content
module.

---

## 4. Claims requiring human review before publication

Every one of these is marked in the UI with a visible `REVIEW REQUIRED` badge.

### Tax

| Statement | Note |
|---|---|
| "The figure that decides your tax is not always the price you agreed. Spain can tax the higher of the agreed price, the declared value and the cadastral reference value." | Sourced to the Buyer System fiscal register (RDL 1/1993 art. 10.2), but publishing it needs a jurisdiction note, an effective date and a disclaimer. |
| "You are comparing properties across regions whose purchase taxes are not the same…" | Directionally supported; any specific statement needs review. |
| "Tax read before the commitment" and its risk statement | Service description touching tax. |
| "Tax treatment depends on your residence, the region and your circumstances, and changes over time." | A limit statement, but still a tax statement. |
| FAQ: "Will you tell me what tax I will pay?" | Answer is `pending` by design. |

### Legal

| Statement | Note |
|---|---|
| "The arras deposit turns a maybe into a commitment with a penalty attached…" | Describes a legal instrument. |
| "A review is not a valuation, a survey, or a substitute for your own legal representation." | A scope limit with legal effect. |
| Document-review stage description | Implies a level of legal diligence. |
| FAQ: remote working, scope | Both `pending`. |

### Financial

| Statement | Note |
|---|---|
| Hero subheading — "an independent financial review of the purchase" | Describes a financial service. |
| "A listing tells you what a property costs. It does not tell you what it costs you, what it returns…" | Frames a financial outcome. |
| All three scenario descriptions | Describe financial modelling. |
| "Full cost build-up", "Sensitivity to the assumptions…" | Describe financial deliverables. |
| "Waiting is not neutral: deposits, exchange rates and mortgage offers all have dates on them." | **Watch item.** Must not become an urgency device — the brand principle is Calm Evidence, and upstream review rejects copy that manufactures urgency. |

### Returns

| Statement | Note |
|---|---|
| "No projected return is a promise. Models describe assumptions, not outcomes." | A disclaimer, but it is the statement that governs everything else in the visual proof section. |

---

## 5. CTA decisions

Per-intent CTA wording is an **open P0** in the master audit. Nothing here is
chosen.

| Position | Provisional wording | Status | Note |
|---|---|---|---|
| Header | `Primary action` | System label | Deliberately not a commercial CTA |
| Hero primary | `Review the investment` | `proposal` | From the phase brief's provisional list |
| Hero secondary | `Talk to Sarah first` | `proposal` | Lower commitment |
| Door 1 | `Review the investment` | `proposal` | — |
| Door 2 | `See how the review works` | `proposal` | Routes to mechanism, not to contact |
| Door 3 | `Calculate what you would actually need` | `proposal` | Routes to the free tool |
| Final primary | `Calculate your real cash needed` | `proposal` | Lowest-commitment step, deliberately not the paid product |
| Final secondary | `Talk to Sarah first` | `proposal` | — |

**`Book a discovery call` is not used anywhere.** The master audit identifies it
as an over-used universal CTA that ignores the reader's intent. Replacing it
requires the per-intent decision above, so the prototype uses provisional
wording and says so on the page.

---

## 6. Language

English only. English is the primary acquisition language
(`decisions-log.md` 2026-07-27), and no new language may open before EN is
consolidated and ES is complete (2026-08-05).

Spanish routes do not exist, so **hreflang is deliberately not emitted** — the
SEO audit requires hreflang to be reciprocal, valid and only for equivalents.

Spanish copy is **not authored** in this phase. Translating unapproved English
copy would double the review surface without adding value.

---

## 7. Approving copy

For each statement: approve as written, rewrite, or reject.

1. Change the `status` to `confirmed` in `content/en/investment.ts`.
2. Add a `source` — the test fails without one.
3. If it sits in a review domain, the domain owner signs off **and** the
   `review` field moves to `'none'`, which is what removes the UI badge. The
   test blocks `confirmed` + a review domain precisely so this cannot be done
   by editing one field.
4. Record the approval here.

No agent may perform step 3.

# Approval-marks audit — the six preview routes

**Date:** 2026-09-30
**Branch:** `feat/contact-editorial-page` (PR #33, Draft), audited at `c045da4` (Contact integrated, based on `main` `8de6a76`)
**Routes:** `/preview/home`, `/preview/contact`, `/preview/property-purchase`, `/preview/investment`, `/preview/tax-advisory`, `/preview/team`
**Status:** reconciled with Sarah's four review documents on 2026-09-30 (§10), which supersedes §4. **21 decisions stay open** for Sarah (SR-001–SR-011 on the Home, 10 on the landings). Contact is approved as a page (Juanma). Nothing here approves the Home, publication or production, and this version still needs Juanma's visual review.

The goal: no stale approval notice on content whose approval is recorded; every item Sarah still has to decide visible where it is, with an ID; technical and professional blockers kept apart from Sarah's decisions; no review mark able to reach a published build.

---

## 1. Method

1. **Static search** (`rg`) in `app/`, `components/`, `content/`, `lib/` for status words in English and Spanish (pending, awaiting, approval, proposal, review, evidence, consent, verification, preview, internal, not for publication/distribution, placeholder, coming soon, unavailable, not connected, not confirmed, illustrative, sample…).
2. **Rendered search** with Playwright 1.63 driving Google Chrome (Chromium engine, `channel: 'chrome'`) on a production build of the PR worktree: every text node, `aria-label`, `title`, `alt`, `placeholder` and the metadata of the six routes, after opening every accordion and tab. Playwright is not a dependency of this project; the copy installed in `PLATAFORMA-RUBIK-SEO-GEO` was reused (no package added). The bundled Playwright Chromium is not installed on this machine, so the Chromium engine used is the installed Google Chrome.
3. **Claim mapping.** All 819 classified claims in `content/en/*` were dumped with their status and review domain, and each was located in the rendered page. This is what separates approved lines (`confirmed`) from Sarah's pending copy (`proposal`) and from evidence or professional items (`pending`, `blocked`, `unverified`, or a review domain other than `none`).
4. **Evidence.** Approvals were accepted only from the written record: `docs/phase-2h-juanma-review.md` §10 (Sarah's copy, 2026-09-28), `docs/home-buyer-system-preview.md` (Home decisions, portrait approval, client authorisation of the testimonials), `docs/contact-page.md` (Juanma's Contact decisions, 2026-09-29), the media registries and `docs/copy-and-claims-matrix.md`. Juanma's visual approvals (landings 2026-09-28, Home 2026-09-29) approve the visual state only; they do not approve copy, claims or assets (§10.1 of the Phase 2H record).

**The finding that shapes everything else:** Sarah has approved specific lines (Phase 2H §10.2), not the pages. Juanma approved the Investment and Property Purchase templates as copy _sources_, not for publication (`copy-and-claims-matrix.md` §8–9), and G-01 ("approval of every `proposal` string") is still open. So most copy on the five pages built from templates or drafted here is still Sarah's decision. It is marked by block, not hidden.

---

## 2. Initial inventory and final state

States: `APPROVED` (evidence covers that text, claim, image and use) · `SARAH_REVIEW` · `FACTUAL_OR_PROFESSIONAL_CHECK` · `TECHNICAL_PENDING` · `PREVIEW_CONTROL`. "Content" rows are disclosures that belong to the content (illustrative samples, withheld results), not review marks; they stay.

| ID   | Route · section                                    | Text or asset                                                                                                                                                                                              | Mark found                   | Evidence                                                                                                                                      | State                            | Action taken                                                                                                                     |
| ---- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| M-01 | Home · hero                                        | Film caption "Illustrative concept film. It does not promise…"                                                                                                                                             | Disclosure                   | Confirmed claim (generated footage)                                                                                                           | APPROVED (content)               | Kept                                                                                                                             |
| M-02 | Home · tools                                       | "When this Preview is configured, Purchase Tax and Real Cash Needed open in the separate Buyer System."                                                                                                    | Configuration note           | Buyer System origin is a Preview-only variable; Production unset (README)                                                                     | TECHNICAL_PENDING                | Kept (true)                                                                                                                      |
| M-03 | Home tools · Purchase / Tax lead band              | Tool card: "Special reliefs are detected and routed to review rather than estimated."                                                                                                                      | "review"                     | Describes the Buyer System's behaviour; tax wording                                                                                           | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept; the card copy is inside SR-007 / SR-019 / SR-054                                                                           |
| M-04 | Contact · banner                                   | "Review environment · noindex · booking and channels link to the live services."                                                                                                                           | Preview banner               | On the Vercel Preview the booking URL and email are not configured, so "booking links to the live service" was not true there                 | PREVIEW_CONTROL                  | Restated (§3)                                                                                                                    |
| M-05 | Property Purchase · banner                         | "Property Purchase visual preview · Internal review only…"                                                                                                                                                 | Preview banner               | —                                                                                                                                             | PREVIEW_CONTROL                  | Restated in the shared form (§3)                                                                                                 |
| M-06 | Investment · banner                                | "PHASE 2E — APPROVED MEDIA IN PREVIEW · READY FOR HUMAN REVIEW" + "Copy is from the approved Investment template…"                                                                                         | Stale phase and review state | The human visual review happened (2026-09-28); the page carries 2F–2H work (D-07); the template was approved as a copy _source_, not the copy | PREVIEW_CONTROL (obsolete text)  | Restated (§3)                                                                                                                    |
| M-07 | Tax Advisory · banner                              | "VISUAL PREVIEW — NOT PRODUCTION · … Copy is provisional…"                                                                                                                                                 | Preview banner               | Sarah's lines are confirmed; "provisional" covered all copy                                                                                   | PREVIEW_CONTROL                  | Restated (§3)                                                                                                                    |
| M-08 | Team · banner                                      | "TEAM EDITORIAL PREVIEW · English editorial draft for human review. New commercial language is proposed…"                                                                                                  | Preview banner               | E3/E4 copy confirmed (Phase 2H); visual review 2026-09-28                                                                                     | PREVIEW_CONTROL (partly stale)   | Restated (§3)                                                                                                                    |
| M-09 | PP, Investment, Tax · metadata                     | "Internal visual preview, not approved for production." in descriptions                                                                                                                                    | Metadata                     | Routes stay `/preview`                                                                                                                        | PREVIEW_CONTROL                  | Kept                                                                                                                             |
| M-10 | Footers (4 landings, Contact)                      | "Sarah Katerina. Internal preview, not for publication / distribution."                                                                                                                                    | Legal line                   | Legal entity and publication line unconfirmed                                                                                                 | PREVIEW_CONTROL                  | Kept                                                                                                                             |
| M-11 | Footers (all but Home)                             | "preview · noindex" chip                                                                                                                                                                                   | Status chip                  | —                                                                                                                                             | PREVIEW_CONTROL                  | Kept                                                                                                                             |
| M-12 | Team, Contact · footer                             | "English is the active preview language. Spanish content is structured but has no route yet."                                                                                                              | Status note                  | No ES route exists                                                                                                                            | TECHNICAL_PENDING                | Kept                                                                                                                             |
| M-13 | Team, Contact · footer                             | Column "Review status: Editorial proposal · Professional review required · Preview only"                                                                                                                   | Generic review labels        | A footer column cannot say _which_ text is a proposal; on Contact it described nothing on the page                                            | PREVIEW_CONTROL (generic)        | **Removed**; replaced by the per-block SR marks, the banner and the chip                                                         |
| M-14 | Property Purchase · hero                           | "▶ Video requires approval" under the hero film                                                                                                                                                            | Approval label               | Owner-approved hero film, registered as `HERO_VIDEO.purchase` (Phase 2F); the film's state was visually approved 2026-09-28                   | APPROVED                         | **Removed.** The generated-footage rights record (G-02) stays a factual item (§5)                                                |
| M-15 | Property Purchase · one file, tracker, before-sign | "Illustrative · sample documents…", "Pending" in the sample tracker, "Illustrative file status, not a client record", "Illustrative recommendation"                                                        | Disclosures                  | Confirmed labels of sample surfaces                                                                                                           | APPROVED (content)               | Kept                                                                                                                             |
| M-16 | Property Purchase · services                       | Card label "What the preview includes"                                                                                                                                                                     | Copy naming the preview      | —                                                                                                                                             | SARAH_REVIEW                     | Replaced by "What it includes" — **new copy, SR-027** (§6)                                                                       |
| M-17 | Property Purchase · services                       | "Pricing and service timings are under review and are not published in this preview."                                                                                                                      | "under review"               | Price publication is a business decision (D2-04)                                                                                              | SARAH_REVIEW                     | Kept (true); the decision is part of SR-027                                                                                      |
| M-18 | Property Purchase · cases                          | "The structure is ready. The evidence is not yet cleared.", "Illustrative · not a client case", "Outcome withheld until the facts and client permission are verified."                                     | Evidence state               | No client permission or verified outcome on record                                                                                            | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-19 | Property Purchase · buyer-voice banner             | "The buyer's own words will appear here…", "Preview · content pending", the seven publication requirements                                                                                                 | Consent state                | No consent on record                                                                                                                          | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-20 | Property Purchase · FAQ                            | Answers "…reviewed before publication", "A qualified legal professional must confirm…", "subject to approval", "No standard completion time is approved"; note "Legal and tax statements … are proposals…" | Professional review          | AGENTS.md §11                                                                                                                                 | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-21 | Property Purchase · final CTA                      | "Contact routes and response time are not confirmed in this preview."                                                                                                                                      | Half stale                   | Contact routes confirmed by Juanma 2026-09-29 (Contact page); response time still unconfirmed                                                 | FACTUAL (response time)          | Restated: "Response time is not confirmed in this preview."                                                                      |
| M-22 | Property Purchase · footer                         | "Navigation destinations and contact routes are not live in this preview."                                                                                                                                 | Half stale                   | Contact is live; the other footer items are still plain text                                                                                  | TECHNICAL_PENDING                | Restated: "Apart from Contact, the destinations in this footer are not built yet."                                               |
| M-23 | Investment, Tax · hero and report                  | "Sample villa", "Illustrative", sample-figure notes, `aria-label` "figure pending approval", "Illustrative sample data, not a real result"                                                                 | Disclosures                  | Sample figures allowed only when labelled                                                                                                     | APPROVED (content)               | Kept                                                                                                                             |
| M-24 | Investment, Tax · authority                        | "Signature asset pending"                                                                                                                                                                                  | Placeholder label            | No signature asset exists                                                                                                                     | SARAH_REVIEW                     | Label kept (AGENTS.md §13: placeholders stay labelled) + **SR-039**                                                              |
| M-25 | Investment · tools                                 | "Coming soon" on the restricted tools                                                                                                                                                                      | Tool state                   | Asking Price and Tax Exposure are not approved as working tools                                                                               | TECHNICAL_PENDING                | Kept                                                                                                                             |
| M-26 | Investment · cases                                 | "Location pending", "Period pending", "Awaiting client permission", "Result withheld pending client permission and verification"                                                                           | Evidence state               | No permission or verified figures                                                                                                             | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-27 | Investment, Tax · FAQ                              | "Pricing is not approved for publication yet.", "Turnaround is not confirmed for publication yet.", "Not confirmed for publication yet."                                                                   | Decision state               | Pricing (D2-04) and turnaround unconfirmed                                                                                                    | SARAH_REVIEW (pricing) / FACTUAL | Kept (true); inside SR-050 / SR-065                                                                                              |
| M-28 | Investment, Tax, Team · FAQ notes                  | "…provisional and subject to professional review", "every tax statement requires competent review…", Team legal note                                                                                       | Professional review          | AGENTS.md §11                                                                                                                                 | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-29 | Investment · final CTA                             | "Contact channels and response times are not confirmed."                                                                                                                                                   | Half stale                   | Channels confirmed (Contact page); the two buttons here are not connected                                                                     | TECHNICAL_PENDING                | Restated: "Response times are not confirmed, and these buttons are not connected in this preview."                               |
| M-30 | Investment, Tax · footer                           | "Navigation is laid out as approved; the destination routes are not built yet."                                                                                                                            | Half stale                   | Contact is live                                                                                                                               | TECHNICAL_PENDING                | Restated as M-22                                                                                                                 |
| M-31 | Tax · calendar                                     | "Illustrative position only; no filing period is stated."                                                                                                                                                  | Disclosure                   | Filing periods need tax review                                                                                                                | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-32 | Tax · report                                       | "…No contact channel is connected in this preview."                                                                                                                                                        | Stale                        | Channels exist; this button is not connected                                                                                                  | TECHNICAL_PENDING                | Restated: "The request button is not connected in this preview."                                                                 |
| M-33 | Tax · services                                     | "Nothing is priced on this preview."                                                                                                                                                                       | Decision state               | D2-04                                                                                                                                         | SARAH_REVIEW (pricing)           | Kept; inside SR-060                                                                                                              |
| M-34 | Tax · cases                                        | "Proposed result · evidence and tax review pending", "Published only with written client permission and verified figures."                                                                                 | Evidence state               | C-01 open                                                                                                                                     | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-35 | Tax · "Buy. File. Plan. Review."                   | "The reference ends this sequence with a property-management step. That service is held publicly…"                                                                                                         | Internal review note         | Explains the template to reviewers; names a held service, which AGENTS.md §9 forbids mentioning                                               | PREVIEW_CONTROL (internal)       | **Removed from the page.** The substitution stands: the template's last step is replaced by an annual tax review (recorded here) |
| M-36 | Tax · FAQ                                          | "…a legal question not yet reviewed for publication."                                                                                                                                                      | Professional review          | —                                                                                                                                             | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-37 | Tax · final CTA                                    | "No commitment. Contact channels are not connected in this preview, so these buttons do not submit or navigate."                                                                                           | Half stale                   | Channels exist; these buttons are not connected                                                                                               | TECHNICAL_PENDING                | Restated: "No commitment. These buttons are not connected in this preview, so they do not submit or navigate."                   |
| M-38 | Team · Sarah's profile                             | "Editorial line proposed for this preview."                                                                                                                                                                | Proposal label               | Profile text and quote not approved                                                                                                           | SARAH_REVIEW                     | Replaced by **SR-072**                                                                                                           |
| M-39 | Team · profiles                                    | "Portrait pending", `aria-label` "Portrait of … pending"                                                                                                                                                   | Placeholder                  | No named photograph (A-04)                                                                                                                    | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept (identity must be confirmed before a face is attached)                                                                      |
| M-40 | Team · network band                                | "PROVISIONAL MEDIA — HUMAN VISUAL REVIEW ONLY"                                                                                                                                                             | Half stale                   | The visual review happened (2026-09-28); the photograph stays provisional and blocked for production (`team-asset-record.md`)                 | SARAH_REVIEW + FACTUAL           | Restated "PROVISIONAL PHOTOGRAPH — NOT FOR PRODUCTION" + **SR-075**                                                              |
| M-41 | Team · image alts and captions                     | "…individual identities are not assigned in this preview", "no fourth person… is inferred"                                                                                                                 | Identity boundary            | —                                                                                                                                             | FACTUAL_OR_PROFESSIONAL_CHECK    | Kept                                                                                                                             |
| M-42 | Team · final CTA                                   | "Contact channels are not connected in this preview. No free-call claim is made."                                                                                                                          | Stale + internal note        | Channels exist; the first button is not connected                                                                                             | TECHNICAL_PENDING                | Restated: "The “Tell us about your plans” button is not connected in this preview."                                              |
| M-43 | Contact · booking (Vercel Preview)                 | "Online booking is not available here yet. WhatsApp, phone and email below work now."                                                                                                                      | Configuration state          | `NEXT_PUBLIC_BOOKING_URL` / `NEXT_PUBLIC_CONTACT_EMAIL` unset on Vercel Preview                                                               | TECHNICAL_PENDING                | Kept                                                                                                                             |
| M-44 | All six · metadata and headers                     | `noindex, nofollow` (metadata + `X-Robots-Tag`), outside the sitemap                                                                                                                                       | Protection                   | AGENTS.md §7                                                                                                                                  | PREVIEW_CONTROL                  | Kept (re-verified, §8)                                                                                                           |
| M-45 | Home                                               | No visible review wording (owner instruction 2026-09-29)                                                                                                                                                   | —                            | —                                                                                                                                             | —                                | Unchanged, except the temporary SR marks (§4)                                                                                    |

---

## 3. Changes made

**Removed (approval recorded or mark obsolete):** M-13, M-14, M-35, and the Team label M-38 (replaced by its SR mark).

**Preview banners** (PREVIEW_CONTROL, internal wording, not brand copy), one shared form:

| Route             | Label                                      | Body                                                                                                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Investment        | INVESTMENT PREVIEW · NOT PRODUCTION        | Review environment · noindex. Items marked SARAH REVIEW REQUIRED await Sarah’s decision. Dashboard figures are illustrative samples, cases stay withheld until client permission and verified figures exist, and tax, legal and financial statements still need professional review. |
| Tax Advisory      | TAX ADVISORY PREVIEW · NOT PRODUCTION      | Review environment · noindex. Items marked SARAH REVIEW REQUIRED await Sarah’s decision. Dashboard figures are illustrative samples, and every tax statement still needs competent tax review.                                                                                       |
| Property Purchase | PROPERTY PURCHASE PREVIEW · NOT PRODUCTION | Review environment · noindex. Items marked SARAH REVIEW REQUIRED await Sarah’s decision, and legal and tax statements still need professional review.                                                                                                                                |
| Team              | TEAM PREVIEW · NOT PRODUCTION              | Review environment · noindex. Items marked SARAH REVIEW REQUIRED await Sarah’s decision, and any tax, legal, planning or financial statement still needs competent review.                                                                                                           |
| Contact           | CONTACT PREVIEW · NOT PRODUCTION           | Review environment · noindex. Items marked SARAH REVIEW REQUIRED await Sarah’s decision. Phone and WhatsApp use the published number; online booking and email appear only where they are configured.                                                                                |

The banners no longer state any approval. The Home keeps no banner (owner instruction).

**Technical notes restated truthfully:** M-21, M-22, M-29, M-30, M-32, M-37, M-42. They describe what the preview does (buttons not connected, footer destinations not built, response time unconfirmed). They do not promise the missing piece.

**Tax "Buy. File. Plan. Review." (M-35):** the template ends with a property-management step. That service is `HOLD` and cannot be mentioned (AGENTS.md §9), so the fourth step is an annual tax review. This substitution was stated on the page. It is now recorded here only.

---

## 4. What Sarah still has to decide — superseded

The first version of this section listed 81 decisions and 85 placements. It treated every `proposal` claim as not approved by Sarah. **§10 replaces it:** the register (`content/en/sarah-review.ts`) now holds only the decisions Sarah's documents leave open. The 81-item table is in the history of this file (commit `1fe8d36`). The captures in `docs/screenshots/approval-marks-2026-09-30/` show that earlier state.

---

## 5. Pending items that do not belong to Sarah alone

**Factual, legal or professional** (Sarah's approval of the wording does not clear them):

- **C-01, the Tax cases:** written client permission, verified figures and tax review of each result. The off-plan case also needs to establish whether it was a new build (VAT + AJD) or a resale (ITP).
- **Investment and Property Purchase cases:** client permission, locations, periods and verified outcomes.
- **Buyer voices on Property Purchase:** the seven publication requirements.
- **S-02:** legal review of "We handle the paperwork".
- **Every tax, legal, financial or return statement** (AGENTS.md §11). These are the claims with a review domain; their wording sits inside the SR blocks, but their clearance is professional.
- **G-02:** rights and generation record for the generated footage (the Purchase hero, the 2G film, the Home film).
- **A-04:** named portraits of Elsa, Óscar and Igor. A face is attached only once its identity is confirmed.
- **Network photograph:** people and organisations are not identified.
- **Response times, turnaround and pricing figures.**

**Technical:**

- **Vercel Preview configuration:** `NEXT_PUBLIC_BOOKING_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` are unset. Online booking and email therefore do not appear on the Preview; phone and WhatsApp work.
- **Final-CTA buttons** on Investment, Tax and Team, and the Tax report button, are not connected. Wiring them to Contact is a separate change for Juanma to decide.
- **Footer destinations** other than Contact are not built.
- **Restricted Buyer System tools** (Asking Price, Tax Exposure) show "Coming soon".
- **Buyer System Production origin (B-01).**
- **No Spanish route.**
- **No form**, until its destination, privacy notice and a test environment exist.

**Decisions for Juanma:** H-01, H-03, H-04, N-01 and D-05 (`docs/phase-2h-juanma-review.md` §8), plus his visual review of this version.

---

## 6. Replacement copy

| ID     | Where                        | Before                      | Proposed           | Status                       |
| ------ | ---------------------------- | --------------------------- | ------------------ | ---------------------------- |
| SR-027 | Property Purchase · services | "What the preview includes" | "What it includes" | `proposal`, marked for Sarah |

No other removal left a gap that needed new copy. The rewritten banners and technical notes (§3) describe the build. They are review tooling, not brand copy.

---

## 7. Protection against accidental publication

- **The gate** (`lib/review/sarah-review-gate.ts`): a mark renders only when `NEXT_PUBLIC_SITE_MODE=preview` and the site is not indexable. Otherwise rendering throws, and `next build` fails.
  - **Verified on 2026-09-30:** `NEXT_PUBLIC_SITE_MODE=production next build` stops on `/preview/home` with "SR-001 is still waiting for Sarah's review…". The preview build passes.
- **`tests/sarah-review.test.ts`** checks that:
  - IDs are unique and well formed, and every register entry is complete;
  - each route shows exactly its registered marks, each once;
  - no mark is placed without a literal ID, or from a shared component;
  - every `proposal` claim in `content/en` is covered by an entry, and every entry's refs exist;
  - the gate allows marks only in preview, non-indexable mode, and the mark checks it before rendering;
  - every route that carries marks stays `laboratory: true` under `/preview`.
- **Existing tests updated, with the reason recorded in each:**
  - `tests/team.test.ts`: the network label's new wording, plus SR-075.
  - `tests/tax-advisory.test.ts`: the substitution stands, and the held service is no longer named on the page.
  - `tests/phase-2g-connected-journey.test.ts`: the protected-content hashes are re-recorded for exactly the strings in §3. The other strings are unchanged, verified by diff.
- **Merge consideration (checked 2026-09-30, §10.5):** Vercel Production (`main`) runs in `preview` mode. A merge therefore does not fail its build, but the open SR marks will show on the production alias, which remains a noindex review environment. If Production is ever switched to `production` or indexable, its build fails while any SR entry is open.

---

## 8. QA — Playwright and Chrome, production build of this branch

The evidence is in `docs/screenshots/approval-marks-2026-09-30/`:

- `full/`: the six routes at 390×844 and 1440×900, full page, captured after scrolling through the page so the reveals have run;
- `marks/`: one capture per mark at 1440, showing the mark and the start of the block it covers;
- `states/`: the mobile menu open, and the footer at both widths;
- `marks-qa.json`: route, viewport, marks, findings and results.

**Results at 390 and 1440:**

- 85 marks found, matching the register exactly: no duplicates, none unregistered, none missing, none on the wrong route.
- Each mark is visible and inside the viewport width.
- 0 obsolete phrases, including after opening every accordion and tab and in the mobile menu.
- 0 console or page errors.
- 0 horizontal overflow.
- One `h1` per page.
- 0 broken in-page anchors; every internal link points to an existing route.
- `noindex, nofollow` in metadata and in `X-Robots-Tag` on all six routes.

**With `prefers-reduced-motion: reduce`:** 0 text blocks left hidden, and all marks present. **Without JavaScript:** all marks present, and the `h1` renders.

**Limits:**

- The local build used a local `.env.local` with the booking URL and email set, so SR-015 was verified in its configured state. The unconfigured state is what the Vercel Preview shows.
- Not tested: Safari/iOS, Android devices, 200 % zoom and screen readers. Only computed checks were run.

---

## 9. Not changed

- No route, domain, DNS, indexation or production setting.
- No Vercel variable.
- No booking, message, form submission or lead.
- No tests were deleted, and no image, token or brand value was added.
- The Buyer System and the strategic repository are untouched.

---

## 10. Reconciliation with Sarah's four documents (2026-09-30)

This section supersedes §4. The first audit read a claim's `status: 'proposal'` as "Sarah has not approved it". That was wrong for the four landings: Sarah reviewed them in full. The register now holds only the decisions that her documents leave open.

### 10.1 Sources and criterion

**The documents.** Sarah wrote four review documents and Juanma relayed them. They are in the local `Downloads` folder, all timestamped 2026-09-28 16:05:

| Document                              | SHA-256 (prefix)   |
| ------------------------------------- | ------------------ |
| `REVISION WEB-property-purchase.docx` | `0aaa9817b534d4d1` |
| `REVISION WEB-investment.docx`        | `e88a61b27b83fde4` |
| `REVISION WEB-Tax advisory.docx`      | `a9f8658cf54cebe8` |
| `REVISION WEB. Team.docx`             | `9ea444fa10166b3a` |

- The brief names them `…(2).docx`, but no file with that name exists on this machine. These four match the brief point for point. **If the `(2)` files differ, this section must be re-checked against them.**
- All the text and all 17 screenshots were read, and each screenshot was matched to its block.
- Sarah reviewed the pages through the browser's Spanish translation of the deployed English site, at `main` `edc47f0`.

**Contact.** Juanma confirmed, in the brief of 2026-09-30, that Sarah approved the whole Contact page.

**Home.** No document reviews it. SR-001 to SR-011 are unchanged.

**The classes:**

- `APPROVED_BY_SARAH`, in three forms:
  - **explicit**: her own text, or a block she named and praised;
  - **reviewed**: copy that was on the page she reviewed, unchanged since, on which she asked for no change, on a page she judged as a whole. The line quoted with each entry in `SARAH_APPROVALS` is the one she wrote about that page;
  - **relayed**: Contact.
- `CHANGE_REQUESTED`: she asked for a change. Each one is checked below.
- `SARAH_DECISION_STILL_OPEN`: copy she has never seen (written in Phase 2H or on 2026-09-30), and one image use. These carry an `SR-###` mark.
- `FACTUAL_OR_PROFESSIONAL_CHECK`, `TECHNICAL_PENDING` and **asset** items: listed in §10.4, with no Sarah mark.

**How "never seen" was established.** Every classified claim and content string of the four landings was compared between `edc47f0`, the version she reviewed, and the current HEAD. A claim counts as _new_ only if its text changed. Strings that only moved from a component into content were checked separately.

**Enforced by `tests/sarah-review.test.ts`:**

- every `proposal` claim is either open (SR) or approved, never both;
- every approval cites one of the four documents, or Juanma's relay for Contact;
- no approval can cover the Home.

**`status` is not an approval record.** Most copy Sarah approved stays `proposal` in `content/en`. Its publication also waits on legal, tax or evidence gates, so the classification is unchanged. `SARAH_APPROVALS` is the approval record.

### 10.2 Page by page

#### Property Purchase (`REVISION WEB-property-purchase.docx`)

| #   | Sarah's instruction                                                                    | Before                                                                            | After                                                                                                       | Class                                                                            |
| --- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| P1  | "El video que se mueva sin scroll"                                                     | Done in 2H (`HeroFilm`)                                                           | Unchanged. Verified: the film plays without scrolling (§10.6)                                               | APPROVED_BY_SARAH (implemented)                                                  |
| P2  | "Compra con total tranquilidad: nosotros coordinamos cada paso."                       | "Buy with peace of mind: we coordinate every step."                               | Unchanged; mark removed                                                                                     | APPROVED_BY_SARAH (explicit)                                                     |
| P3  | "Nosotros gestionamos el papeleo; tú eliges tu casa."                                  | "We handle the paperwork. You choose your home."                                  | Unchanged; mark removed                                                                                     | APPROVED_BY_SARAH (explicit). What "the paperwork" covers is S-02, a legal check |
| P4  | "La calculadora es una idea genial… pongámoslo al principio"                           | Purchase Tax band directly under the hero; links through `resolveEntryPoint` only | Unchanged. The link is live only where the Buyer System origin is set (Preview); no calculator is simulated | APPROVED_BY_SARAH (implemented) · TECHNICAL for Production (B-01)                |
| —   | The line under the band, "Before anything else: what Spain charges…"                   | Written in 2H; she has not seen it                                                | Kept                                                                                                        | **SR-019**                                                                       |
| P5  | "Lo que parece una gran oportunidad puede esconder una mala compra."                   | Implemented                                                                       | Unchanged                                                                                                   | APPROVED_BY_SARAH (explicit)                                                     |
| P6  | "El sueño cabe en un instante: … De eso nos ocupamos nosotros."                        | Implemented                                                                       | Unchanged. The 2H wording flag S-03 is closed: these are her own words                                      | APPROVED_BY_SARAH (explicit)                                                     |
| —   | "Where an opportunity usually goes wrong"                                              | Written in 2H                                                                     | Kept                                                                                                        | **SR-022**                                                                       |
| P7  | "Pongamos el video con sonido" (the Good-idea film)                                    | Sound capability built; soundtrack `unpublished`                                  | Unchanged; not published (see below)                                                                        | APPROVED_BY_SARAH as an instruction · BLOCKED: rights and captions               |
| P8  | "me gustan estos bloques que rompen la estética" · "un poco apagada"                   | Navy blocks kept                                                                  | Unchanged. "Apagada" needs the aquamarine token (§10.4)                                                     | APPROVED_BY_SARAH (blocks) · asset/token for the colour                          |
| P9  | "Me gusta mucho este bloque, es un acierto total" (the final-CTA image with the table) | Kept                                                                              | Unchanged                                                                                                   | APPROVED_BY_SARAH (explicit)                                                     |
| —   | "What it includes" (the audit's replacement for "What the preview includes")           | New, 2026-09-30                                                                   | Kept                                                                                                        | **SR-027**                                                                       |
| —   | Authority photograph                                                                   | Same image as Tax/Investment, whose face she rejected there                       | Replaced by her Home portrait                                                                               | CHANGE_REQUESTED → implemented · **SR-029** (new use)                            |
| —   | Every other block                                                                      | On the page she reviewed; "El diseño de la web en general me gusta mucho"         | 14 marks removed                                                                                            | APPROVED_BY_SARAH (reviewed)                                                     |

**Why the film stays silent.** Sarah's instruction answers V-01 (her approval to publish the film with sound). Two conditions are still unmet, and neither is Sarah's:

1. **G-02:** no rights or generation record for the footage and the voice.
2. **Captions:** only a machine transcript exists (`docs/phase-2h/captions-draft/purchase-good-idea.en.draft.vtt`, not served); no person has checked it.

When both exist, publishing is one registry change: `soundtrack: 'published'`, the voiced source, and a reviewed `.vtt` with `reviewedBy`/`reviewedOn`. The component then offers Sound on/off only on an explicit click, starting muted. That path was verified in Phase 2H (§5). It was not re-published here.

#### Investment (`REVISION WEB-investment.docx`)

| #     | Sarah's instruction                                                                                                                           | Before                                                      | After                                                                                                                                                                                                                                                                                                                                                       | Class                                                |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| I1–I2 | "me gusta el dorado pero está en exceso y echo de menos el verde aguamarina"                                                                  | Gold restraint on Investment (2H)                           | Unchanged. **Aquamarine not added:** no aquamarine token exists (only `--sk-color-sage`, a grey-green), and AGENTS.md §5 forbids inventing a colour or reading one from the logo                                                                                                                                                                            | APPROVED_BY_SARAH (gold) · BLOCKED on a token (H-03) |
| I3–I4 | "El video es demasiado pequeño y sería mejor que funcionara sin scroll"                                                                       | Full width from 1280px; plays once without scroll (2H)      | Unchanged; verified                                                                                                                                                                                                                                                                                                                                         | APPROVED_BY_SARAH (implemented)                      |
| I5    | "«Propiedades. Datos. Mejores decisiones.» no me convence. Falta la parte emotiva"                                                            | Headline still rendered (2H left it until a choice)         | **Replaced:** "Invest in Spain with someone on your side." — new copy, 2H §4 option 1                                                                                                                                                                                                                                                                       | CHANGE_REQUESTED → **SR-036**                        |
| —     | The human side ("tocar el punto de dolor, ofrecer protección… acompañados")                                                                   | Template lead (financial model, due diligence, tax overlay) | **Rewritten:** "A property in Spain can be a great decision or an expensive mistake. Sarah is paid only by you: she analyses the property, the numbers and the tax side before you commit, and stays with you through the purchase." No promise to avoid every risk or to find the best price; "paid only by you" restates the confirmed remuneration model | New copy → **SR-036**                                |
| I6    | "«Dos caminos. Un objetivo…» NO me convence. Falta emoción."                                                                                  | Headline still rendered                                     | **Replaced:** "Wherever you start, we start with your goals." — new copy, 2H §4 option 3, echoing her line                                                                                                                                                                                                                                                  | CHANGE_REQUESTED → **SR-041**                        |
| I7–I8 | The "knowledge behind every decision" image at the start of the page; "el rostro se ve muy poco natural"                                      | Block moved to the start (2H); image unchanged              | **Image replaced** by `IMAGES/Sarah home_1.png` (the only portrait of Sarah she has approved; no crop, grade or retouch at source)                                                                                                                                                                                                                          | CHANGE_REQUESTED → implemented · **SR-029**          |
| I9    | "Este texto carece de sentido. Podríamos poner «Una oportunidad solo es buena si encaja con tus objetivos, no con los de quien te la vende.»" | Her line as the next-step title (2H)                        | Unchanged. English: "An opportunity is only good if it fits your goals, not the goals of the person selling it." — an editorial translation of her sentence, not new copy                                                                                                                                                                                   | APPROVED_BY_SARAH (explicit)                         |
| —     | The sentence under her line                                                                                                                   | Written in 2H                                               | Kept                                                                                                                                                                                                                                                                                                                                                        | **SR-049**                                           |
| I10   | "la home ha de ser EMOCIONAL… vídeo presentación. Qué hace Sarah por ti"                                                                      | About the Home                                              | Not on this page                                                                                                                                                                                                                                                                                                                                            | Out of scope (Home)                                  |
| I11   | Financing with "UCI y Sabadell… sin ningún compromiso"                                                                                        | Not implemented                                             | Not implemented: no record confirms the relationships, their public naming or the regulatory wording. Nothing about financing is on the page                                                                                                                                                                                                                | FACTUAL_OR_PROFESSIONAL_CHECK                        |
| I12   | A short renovations section, "que quede claro que nos podemos hacer cargo"                                                                    | Not implemented                                             | Not implemented: no record says whether the team runs works or coordinates them. The page makes no renovation claim                                                                                                                                                                                                                                         | FACTUAL_OR_PROFESSIONAL_CHECK                        |
| I13   | Images and videos with more space                                                                                                             | Hero film enlarged (2H)                                     | Unchanged                                                                                                                                                                                                                                                                                                                                                   | Partly done; the rest needs a layout brief           |
| —     | Every other block                                                                                                                             | "Todos los apartados están bien estructurados"              | 13 marks removed                                                                                                                                                                                                                                                                                                                                            | APPROVED_BY_SARAH (reviewed)                         |

#### Tax Advisory (`REVISION WEB-Tax advisory.docx`)

| #   | Sarah's instruction                                                                                                                                      | Before                                                   | After                             | Class                                                                                             |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| T1  | "El copy del principio me gusta mucho. Podemos meter el punto del dolor…"                                                                                | Hero copy unchanged; pain line in the tool band (2H)     | Unchanged                         | Hero: APPROVED_BY_SARAH (explicit) · the pain line: **SR-054** (also tax review)                  |
| T2  | "ponemos en grande la calculadora de impuestos"                                                                                                          | Navy lead band under the hero; link only when configured | Unchanged                         | APPROVED_BY_SARAH (implemented) · TECHNICAL for Production (B-01)                                 |
| T3  | "Muy buena idea!" (calendar)                                                                                                                             | —                                                        | Unchanged                         | APPROVED_BY_SARAH (explicit)                                                                      |
| T4  | "Me encanta el siguiente apartado. Tenemos que rebajar el nivel de tecnicismo"                                                                           | Report rewritten in plainer language (2H)                | Unchanged                         | The block: approved · the rewrites (11 strings): **SR-058**                                       |
| T5  | "La cambiamos por: «Todo lo que dejas en nuestras manos»"                                                                                                | "Everything you leave in our hands."                     | Unchanged                         | APPROVED_BY_SARAH (explicit) · the eyebrow and six items written under it: **SR-059** (with S-01) |
| T6  | "hay que cambiar la cara de esta foto, parece que tenga 80 años"                                                                                         | Same authority image                                     | **Replaced** by her Home portrait | CHANGE_REQUESTED → implemented · **SR-029**                                                       |
| T7  | Her cases block: title, subtitle, "ILUSTRACIÓN", three cards with titles, texts, results and "Año confidencial", bottom line, "DESCUBRE CÓMO TRABAJAMOS" | Implemented line by line (2H §10.2)                      | Unchanged                         | APPROVED_BY_SARAH (explicit), see below                                                           |
| T8  | ITP on the off-plan purchase                                                                                                                             | Result "Taxes and costs planned", no tax named           | Unchanged                         | FACTUAL_OR_PROFESSIONAL_CHECK (C-01)                                                              |
| —   | Every other block                                                                                                                                        | "Un acierto total esta web"                              | 12 marks removed                  | APPROVED_BY_SARAH (reviewed)                                                                      |

**The cases, checked line by line against her document:**

- **Matches her copy:** title, subtitle (with "in writing" and "the figures are verified" added from the governance wording), badge, the three card titles, the three texts, the three results, "Year confidential" and "Discover how we work".
- **Her copy is approved, but the evidence is not there yet:**
  - The results render as _proposed_, value withheld, with "Proposed result · evidence and tax review pending".
  - Her bottom line, "Publicado con autorización escrita del cliente y cifras verificadas", stays conditional: "Published only with written client permission and verified figures." No permission or verified figure is on record (C-01).
- **Off-plan case:** it stays tax-neutral. That follows her own correction ("Si ese caso fue una reventa sobre plano y sí llevaba ITP, puedes volver a mencionarlo"), and whether it was a new build or a resale is unconfirmed.

#### Team (`REVISION WEB. Team.docx`)

| #   | Sarah's instruction                                                                             | Before                                             | After                                                                                                                                                                                                                                             | Class                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| E1  | "revisar los colores de la web"                                                                 | —                                                  | Needs the aquamarine token (§10.4)                                                                                                                                                                                                                | Asset/token                                                                                                               |
| E2  | Hero photo "más cálida y ponerla en grande"; "EL copy me gusta bastante"                        | Bigger (2H); not warmer                            | Unchanged                                                                                                                                                                                                                                         | Copy: APPROVED_BY_SARAH (explicit) · warmth: asset (A-02). No retouch without an approved file                            |
| E3  | "Objetivos diferentes. La misma revisión antes de firmar."                                      | "Different goals. The same review before signing." | Unchanged; mark removed                                                                                                                                                                                                                           | APPROVED_BY_SARAH (explicit)                                                                                              |
| E4  | "Comprar una casa es fácil. Comprarla bien es otra cosa." + the introduction                    | Implemented                                        | Unchanged; mark removed                                                                                                                                                                                                                           | APPROVED_BY_SARAH (explicit)                                                                                              |
| E5  | "Y el texto de abajo hay que eliminarlo. Las fotografías muestran a tres personas…"             | Removed (2H)                                       | Unchanged; a test now keeps it off the page                                                                                                                                                                                                       | APPROVED_BY_SARAH (implemented)                                                                                           |
| E6  | Group photo "muy poca calidad… colores más cálidos"                                             | Unchanged                                          | Unchanged                                                                                                                                                                                                                                         | Asset (A-03)                                                                                                              |
| E7  | "Aquí pon una foto de cada uno junto al texto. Las que te pasé. Quizá me falta pasarte de Igor" | "Portrait pending" slots                           | Unchanged. **No individual photograph of Elsa, Óscar or Igor was found** anywhere: this repository, the mother repository, `Downloads/SARAH KATERINA OFFICE/` (355 images) and the other local checkouts. Nothing was assigned from a group photo | Asset (A-04) — ask Sarah for the files                                                                                    |
| E8  | "Los nombres completos son: Oscar Gonzalez y Igor Veselov"                                      | "Óscar Gonzalez", "Igor Veselov"                   | Unchanged. The accent on Óscar was restored by the owner as the legal first name (`47a377f`, `f9317a9`); the surname accent is N-01                                                                                                               | APPROVED_BY_SARAH (names) · N-01 for Juanma                                                                               |
| E9  | "Elimina este apartado" ("El comprador es el cliente", office photo)                            | Removed (2H)                                       | Unchanged                                                                                                                                                                                                                                         | APPROVED_BY_SARAH (implemented)                                                                                           |
| E10 | "Quita esta imagen" (wall sign with the gold ant)                                               | Removed (2H)                                       | Unchanged                                                                                                                                                                                                                                         | APPROVED_BY_SARAH (implemented)                                                                                           |
| E11 | "un toque más cercano, de familia, de equipo que te acompaña de principio a fin"                | Copy options in 2H §4, not on the page             | Unchanged                                                                                                                                                                                                                                         | Direction still open: it needs the photographs above. There is nothing on the page to mark                                |
| —   | Profile texts, process, aftercare, FAQ, footer, network band                                    | On the page she reviewed                           | 14 marks removed                                                                                                                                                                                                                                  | APPROVED_BY_SARAH (reviewed). The network photograph stays blocked for production (unidentified people and organisations) |

### 10.3 The register after reconciliation

**21 open decisions in 23 placements** (the first audit had 81 decisions in 85 placements).

| ID            | Page                               | What Sarah has to decide                      |
| ------------- | ---------------------------------- | --------------------------------------------- |
| SR-001–SR-011 | Home                               | Unchanged: no document reviews the Home       |
| SR-019        | Property Purchase                  | The line under the Purchase Tax band          |
| SR-022        | Property Purchase                  | "Where an opportunity usually goes wrong"     |
| SR-027        | Property Purchase                  | "What it includes"                            |
| SR-029        | Property Purchase, Investment, Tax | Her Home portrait used in the authority block |
| SR-036        | Investment                         | The new headline and lead                     |
| SR-041        | Investment                         | The new doors headline                        |
| SR-049        | Investment                         | The sentence under her next-step line         |
| SR-054        | Tax Advisory                       | The pain-point line (also tax review)         |
| SR-058        | Tax Advisory                       | The plainer report wording (also tax review)  |
| SR-059        | Tax Advisory                       | The six items under her title, and S-01       |

**Removed:**

- **Contact (6 marks):** SR-012–SR-017, approved as a page.
- **Contact and Team footer (2 marks):** SR-081.
- **Team (13 marks):** SR-068–SR-080.
- **Property Purchase (14 marks):** SR-018, SR-020, SR-021, SR-023–SR-026, SR-028, SR-030–SR-035.
- **Investment (15 marks):** SR-037, SR-038, SR-040, SR-042–SR-048, SR-050–SR-052, and SR-039 on Investment and Tax (the signature slot she saw without comment, now an asset item).
- **Tax (12 marks):** SR-053, SR-055–SR-057, SR-060–SR-067.

### 10.4 Not Sarah's to decide (no mark)

**Factual, legal or professional:**

- **C-01, the Tax cases:** written permission, verified figures and tax review of each result; for the off-plan case, whether it was a new build or a resale.
- **Investment and Property Purchase cases:** permission and outcomes.
- **Buyer voices:** the seven publication requirements.
- **S-02:** legal scope of "We handle the paperwork".
- **Every tax, legal or financial statement,** including the wording inside SR-054 and SR-058.
- **G-02:** rights and generation record for the generated footage.
- **Financing (UCI, Sabadell):** the relationship, its naming and the regulatory wording.
- **Renovations:** who delivers them.
- **Identities in the network photograph.**

**Assets:**

- **A-04:** individual portraits of Elsa, Óscar and Igor. Sarah says she sent them, but they were not found.
- **A-02 and A-03:** warmer or better team photographs.
- **Sarah's signature** for the reserved slot.
- **The Investment presentation video** (Home scope).
- **The aquamarine token.** The logo's teal is not a token; it has to be approved upstream, and only then used (H-03). Until then the pages cannot get Sarah's aquamarine or "more life".
- **Candidates for Juanma to confirm:** `Downloads/SARAH KATERINA OFFICE/EQUIPO/SARAH/EQUIPO_SARAHKATERINA4–6.png` are the same files as the mother repository's `IMAGENES NUEVAS/EQUIPO/4–6`. They show one smiling woman in warm light and sit in a folder named `SARAH`. That folder name is the only identity evidence. They are not in this repository and are not approved, so they are not used.

**Technical:**

- **Vercel Preview:** booking URL and email not configured.
- **Production Buyer System origin (B-01).**
- **Unconnected buttons:** the final-CTA buttons on Investment, Tax and Team, and the Tax report button.
- **Unbuilt destinations:** the footer links other than Contact.
- **Restricted tools** (Asking Price, Tax Exposure).
- **No ES route, no form.**
- **Sound publication**, once G-02 and reviewed captions exist.

### 10.5 The publication gate, per environment

The gate itself is unchanged (`lib/review/sarah-review-gate.ts`): a mark renders only when `NEXT_PUBLIC_SITE_MODE=preview` and the site is not indexable; otherwise the build fails.

| Environment                | Mode                     | Evidence (2026-09-30)                                                                                                                                      | Effect                                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CI (GitHub Actions)        | `preview`, not indexable | `.github/workflows/ci.yml` sets both                                                                                                                       | Marks render; the build passes                                                                                                                                                                                                                         |
| Vercel Preview (PR #33)    | preview                  | The builds of `1fe8d36` and this HEAD passed, and a production-mode build would have failed. Pages sit behind Vercel login, so they could not be loaded    | Marks render                                                                                                                                                                                                                                           |
| Vercel Production (`main`) | **`preview`**            | `https://sarahkaterina-web-nueva.vercel.app/preview/investment` (GET, 200) shows the footer chip "preview · noindex" and `X-Robots-Tag: noindex, nofollow` | A merge will **not** fail the Production build. The open SR marks **will show** on that alias, which is a review environment. If Production is ever switched to `production` or indexable, its build fails while any SR item is open. That is intended |

No Vercel variable was read through the dashboard or changed.

### 10.6 Discrepancies for Juanma

1. **The "reviewed without objection" rule.** Most approvals rest on it. Juanma should confirm that Sarah's page verdicts ("Un acierto total esta web", "El copy me gusta bastante", "Todos los apartados están bien estructurados", "El diseño… me gusta mucho") cover every block she did not comment on. If not, the affected `SARAH_APPROVALS` entries become SR items again.
2. **The `(2)` documents.** They are not on this machine; this reconciliation used the four originals.
3. **Portraits A-04.** Sarah says she sent them. Where are they?
4. **`EQUIPO_SARAHKATERINA4–6`.** Do they show Sarah? May they be used for her authority block or for the Home's "fotos mías sonriendo"?
5. **The Home repeats "Properties. Data. Better decisions."**, the Investment headline Sarah rejected (Home `discovery` state). The Home is out of scope, so it was not changed.
6. **The aquamarine token** (H-03) and **extending the gold restraint beyond Investment** (H-04).
7. **Once Vercel Production shows the SR marks after a merge,** does Juanma want that on the production alias, or a gate on the deployment environment? A deployment-environment gate would need no Vercel change: `VERCEL_ENV` is set by Vercel.

8. **"What you stop worrying about." on Property Purchase.** Sarah found that phrase "algo incompleta" on Tax Advisory, and it is replaced there. The same phrase titles a Property Purchase band on which she did not comment, so it was not changed.

### 10.7 QA (2026-09-30)

**Setup:**

- **Server:** a production build of this branch in its own worktree (`next start`, port 3310). No `next dev` shares that `.next`.
- **"Before" captures:** the previous PR head, `1fe8d36`, built in the separate `main-base` worktree (port 3311).
- **Browser:** Google Chrome through Playwright 1.63.

**Results:**

- **Routes and widths:** the four landings and Contact at 320, 390 and 1440, plus the Home at the same widths as a regression check. At every width:
  - the marks match the register exactly: 23 placements, 0 duplicates;
  - 0 rejected headlines, and 0 of the old texts Sarah asked to replace;
  - 0 horizontal overflow and one `h1`;
  - `noindex, nofollow` in metadata and in `X-Robots-Tag`;
  - 0 console errors, 0 broken images and 0 broken in-page anchors.
- **Media requests:** the only failed requests are aborted media preloads (`ERR_ABORTED` on `.webm` when the page closes), not 404s.
- **Authority image:** the authority block of Property Purchase, Investment and Tax serves `home-sarah-authority.webp`.
- **Mobile menu:** it opens with 8 links at 320 and 390; Escape closes it and returns focus to the Menu button.
- **Keyboard:** 14 stops at 1440, each with a visible outline.
- **Reduced motion:** 0 hidden text blocks and no video playing.
- **Films:**
  - The Property Purchase and Investment heroes play without scrolling (3.5 s in, muted, no `autoplay` attribute). The Investment film is 1200 px wide at 1440.
  - The Pause control works with Enter and changes to "Play the hero film".
  - The Good-idea film is muted, has no Sound control and no caption track, as expected while its soundtrack is unpublished.
- **Captures:** `docs/screenshots/sarah-reconciliation-2026-09-30/`
  - `before-after/`: 8 blocks × 2 widths × before/after;
  - `full/`: full pages at 390 and 1440;
  - `states/`: menus;
  - `recon-qa.json`.

**Not verified:**

- The Vercel Preview pages: they sit behind Vercel login, so only the deployment status was read.
- Safari/iOS, Android and screen readers.
- Sound on/off with a published soundtrack: it is not published. That path was verified in Phase 2H with temporary files.

### 10.8 Juanma's answers (2026-09-30) and what changed

| #   | Question (§10.6)                                     | Answer                                                           | Change                                                                                                                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The "reviewed without objection" rule                | "hasta que Sarah indique nuevos cambios. el resto está aprobado" | Rule confirmed. `SARAH_APPROVALS` stands until Sarah asks for changes. The open items are copy she has never seen, so they stay open                                                                                                                                                                                         |
| 2   | The `(2)` documents                                  | Word files he can upload to GitHub                               | None yet. When they are uploaded, this section will be re-checked against them                                                                                                                                                                                                                                               |
| 3   | The portraits Sarah said she sent                    | "las fotos están en el repo y son las que tenemos"               | No individual photograph of Elsa, Óscar or Igor exists, so the labelled slots stay. Nothing is assigned from a group photograph (A-04 closed as "no file")                                                                                                                                                                   |
| 4   | `EQUIPO_SARAHKATERINA4–6`                            | "sí es Sarah y sí que se puede usar"                             | The files are imported unchanged into `IMAGES/EQUIPO/SARAH/` (SHA-256 recorded; identical to the owner folder and the mother repository). Their compression-only derivatives `sarah-terrace`, `sarah-balcony` and `sarah-stairs` replace the authority image on Property Purchase, Investment and Tax. **SR-029 is removed** |
| 5   | The Home repeats the rejected headline               | "el titular sobre todo debe salir de corrido y que no se corte"  | See below                                                                                                                                                                                                                                                                                                                    |
| 6   | "What you stop worrying about." on Property Purchase | "corregir tb en Property Purchase"                               | Title replaced by Sarah's own line, "Everything you leave in our hands." (`confirmed`, from her Tax document). The six items she reviewed stay                                                                                                                                                                               |
| 7   | Aquamarine                                           | "apruebo por ahora el aguamarina"                                | See below                                                                                                                                                                                                                                                                                                                    |
| 8   | Marks visible on the Production alias after a merge  | "me vale"                                                        | No change to the gate                                                                                                                                                                                                                                                                                                        |

**Answer 5, the headlines:**

- **Home:** the Investment state of the service banner now reads "Invest in Spain with someone on your side.", in step with the Investment page. It remains within SR-003 for Sarah.
- **Property Purchase hero:** Sarah's sentence rendered its second half as a separate block ("Buy with / peace of mind: / _we coordinate / every step._"). The accent is now inline, so the sentence reads in one run, balanced across lines, with the italic kept.
- **Checked in the browser at 320, 390 and 1440** (§10.9): every banner proposition is painted whole inside the cloth, and every hero headline is whole.

**Answer 7, aquamarine:**

- **The token:** `--sk-web-aqua` = `#7EC2BD`, the dominant teal of the approved logo file, not a new colour. It measures 8.69:1 on navy and 7.25:1 on navy-soft, but only 1.93:1 on ivory, so it is never used on light surfaces.
- **Where it applies:** on the four landings (`data-palette="aqua"`), every accent on navy surfaces that used `--sk-web-gold-on-dark` now uses it. That covers eyebrows, scripts, icons, rules and outlines.
- **Where gold stays:** on light surfaces and on the filled CTA. The Home and Contact are unchanged.
- **Status:** approved "por ahora", so it can be revisited.

**Open decisions now: 20** — SR-001–SR-011 (Home), SR-019, SR-022, SR-027 (Property Purchase), SR-036, SR-041, SR-049 (Investment), SR-054, SR-058, SR-059 (Tax).

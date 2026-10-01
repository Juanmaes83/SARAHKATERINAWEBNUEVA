# Approval-marks audit — the six preview routes

**Date:** 2026-09-30
**Branch:** `main` after PR #33, squash commit `fc6fb4947043431770a2cf66f87f3471e51bcd5c` (PR head `fda792130839ae16abbd83472728a5148efaff29`)
**Routes:** `/preview/home`, `/preview/contact`, `/preview/property-purchase`, `/preview/investment`, `/preview/tax-advisory`, `/preview/team`
**Status:** reconciled with Sarah's four review documents on 2026-09-30 (§10), which supersedes §4. **21 decisions stay open** for Sarah (SR-001–SR-011 on the Home, 10 on the landings). Contact is approved as a page by Sarah (relayed by Juanma) and was included in PR #33 on Juanma's instruction. The 21 Sarah decisions remain open; none of this approves publication or production. Home copy still awaits Sarah.

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

| #   | Question (§10.6)                                     | Answer                                                                  | Change                                                                                                                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The "reviewed without objection" rule                | "hasta que Sarah indique nuevos cambios. el resto está aprobado"        | Rule confirmed. `SARAH_APPROVALS` stands until Sarah asks for changes. The open items are copy she has never seen, so they stay open                                                                                                                                                                                         |
| 2   | The `(2)` documents                                  | Juanma, 2026-09-30: they have been provided and are the source of truth | They are the source of truth from 2026-09-30. **No copy of them is in this repository, any branch on GitHub or this machine**, so they were not read here. The last correction (§10.9) follows the instructions Juanma relayed from them. If they hold anything else, it is still to be applied                              |
| 3   | The portraits Sarah said she sent                    | "las fotos están en el repo y son las que tenemos"                      | No individual photograph of Elsa, Óscar or Igor exists, so the labelled slots stay. Nothing is assigned from a group photograph (A-04 closed as "no file")                                                                                                                                                                   |
| 4   | `EQUIPO_SARAHKATERINA4–6`                            | "sí es Sarah y sí que se puede usar"                                    | The files are imported unchanged into `IMAGES/EQUIPO/SARAH/` (SHA-256 recorded; identical to the owner folder and the mother repository). Their compression-only derivatives `sarah-terrace`, `sarah-balcony` and `sarah-stairs` replace the authority image on Property Purchase, Investment and Tax. **SR-029 is removed** |
| 5   | The Home repeats the rejected headline               | "el titular sobre todo debe salir de corrido y que no se corte"         | See below                                                                                                                                                                                                                                                                                                                    |
| 6   | "What you stop worrying about." on Property Purchase | "corregir tb en Property Purchase"                                      | Title replaced by Sarah's own line, "Everything you leave in our hands." (`confirmed`, from her Tax document). The six items she reviewed stay                                                                                                                                                                               |
| 7   | Aquamarine                                           | "apruebo por ahora el aguamarina"                                       | See below                                                                                                                                                                                                                                                                                                                    |
| 8   | Marks visible on the Production alias after a merge  | "me vale"                                                               | No change to the gate                                                                                                                                                                                                                                                                                                        |

**Answer 5, the headlines:**

- **Home:** the Investment state of the service banner now reads "Invest in Spain with someone on your side.", in step with the Investment page. It remains within SR-003 for Sarah.
- **Property Purchase hero:** Sarah's sentence rendered its second half as a separate block ("Buy with / peace of mind: / _we coordinate / every step._"). The accent is now inline, so the sentence reads in one run, balanced across lines, with the italic kept.
- **Checked in the browser at 320, 390 and 1440** (§10.9): every banner proposition is painted whole inside the cloth, and every hero headline is whole.

**Answer 7, aquamarine:**

- **The token:** `--sk-web-aqua` = `#7EC2BD`, the dominant teal of the approved logo file, not a new colour. It measures 8.69:1 on navy and 7.25:1 on navy-soft, but only 1.93:1 on ivory, so it is never used on light surfaces.
- **Where it applies:** on the four landings (`data-palette="aqua"`), every accent on navy surfaces that used `--sk-web-gold-on-dark` now uses it. That covers eyebrows, scripts, icons, rules and outlines.
- **Where gold stays:** on light surfaces and on the filled CTA. The Home and Contact are unchanged.
- **Status:** approved "por ahora", so it can be revisited.

**Open decisions after §10.8: 20.** After the last correction (§10.9): **21**.

### 10.9 Last correction (2026-09-30)

Relayed by Juanma from `REVISION WEB-investment.docx` and the `(2)` documents:

| Page                                                                  | Before                                                                                                                                                                                                                                    | After                                                                                                                                                                                                                                                                                                                                                       | Class                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Investment · approach band, under "Buying on emotion"                 | "The view sells the property. The numbers decide whether it was a good decision."                                                                                                                                                         | "An opportunity is only right if it fits your goals — not the goals of the person selling it."                                                                                                                                                                                                                                                              | APPROVED_BY_SARAH (explicit): an English adaptation of her proposed sentence. The claim is `confirmed`; there was no mark to remove, because it sat inside the reviewed approach band. A test keeps the old line out of every content file and of `WebBands.tsx` |
| Property Purchase · "Everything you leave in our hands." · six points | Six worries ("Unexpected tax questions after the purchase", "Documents lost between advisers", "Unclear clauses in the contract", "Depending on the seller's agent", "Travelling to Spain for every step", "Missing important deadlines") | "Purchase tax and owner obligations looked at before you sign" · "Every document kept in one coordinated file" · "Contract terms reviewed before you sign" · "Advice from your side of the purchase, paid only by you" · "Clear communication in your language, from first viewing to keys" · "Deadlines, payments and signatures followed in one sequence" | **SR-082**: new wording she has not seen                                                                                                                                                                                                                         |

**Where each of the six points comes from.** Each restates a capability this page already describes:

| Point                                                            | Existing source on the page                                           |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| Purchase tax and owner obligations looked at before you sign     | The Tax point                                                         |
| Every document kept in one coordinated file                      | The one-file record and document control                              |
| Contract terms reviewed before you sign                          | "Terms reviewed before signature"                                     |
| Advice from your side of the purchase, paid only by you          | The confirmed remuneration model                                      |
| Clear communication in your language, from first viewing to keys | "Clear communication in your language" and follow-through to the keys |
| Deadlines, payments and signatures followed in one sequence      | The Execution point                                                   |

No result, legal advice, availability or management promise is added. The contract-terms point sits in a legal review domain: that review is a professional check, not Sarah's.

**Not marked:** Sarah's title, and the band's lead and script, which she reviewed.

**Note for Juanma:** the Investment page now carries Sarah's idea twice.

- In the approach band: "An opportunity is only **right** if it fits your goals — not the goals of the person selling it."
- As the next-step title: "An opportunity is only **good** if it fits your goals, not the goals of the person selling it."

Both come from her sentence. If one is enough, the next-step title is the one that was already approved in Phase 2H.

### 10.10 Open items after this correction

**Open for Sarah: 21 decisions.** Each is copy she has never seen.

| ID            | Page              | What she has to decide                                                                                  |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| SR-001–SR-011 | Home              | All eleven stay open: no review document covers the Home                                                |
| SR-019        | Property Purchase | The line under the Purchase Tax band, "Before anything else: what Spain charges…" (written in Phase 2H) |
| SR-022        | Property Purchase | The heading "Where an opportunity usually goes wrong" (Phase 2H)                                        |
| SR-027        | Property Purchase | The label "What it includes" (was "What the preview includes")                                          |
| SR-082        | Property Purchase | The six points rewritten in the positive                                                                |
| SR-036        | Investment        | The new headline and lead that replace the ones she rejected                                            |
| SR-041        | Investment        | The new doors headline that replaces the one she rejected                                               |
| SR-049        | Investment        | The sentence under her next-step line (Phase 2H)                                                        |
| SR-054        | Tax Advisory      | The pain-point line (also needs tax review)                                                             |
| SR-058        | Tax Advisory      | The plainer report wording (also needs tax review)                                                      |
| SR-059        | Tax Advisory      | The six items under her title, and scope question S-01                                                  |

**Evidence, tax, legal or rights (not Sarah's):**

- **C-01:** Tax cases need written permission, verified figures and tax review. For the off-plan case, whether it was a new build or a resale.
- **Cases on Investment and Property Purchase:** client permission and outcomes.
- **Buyer voices:** the publication requirements.
- **S-02:** legal scope of "We handle the paperwork".
- **Legal review of the contract-terms point**, and of every tax, legal or financial statement.
- **G-02:** rights and generation record for the footage and the voice.
- **Financing (UCI, Sabadell) and renovations:** unverified.
- **Identities in the network photograph.**

**Technical:**

- Sound publication on the Good-idea film, once G-02 and human-reviewed captions exist.
- The booking URL and email variables on the Vercel Preview.
- The Buyer System production origin (B-01).
- The unconnected final-CTA and report buttons.
- The footer destinations other than Contact.
- The restricted tools.
- No Spanish route, no form.

**Assets:**

- Individual portraits of Elsa, Óscar and Igor: none exist (Juanma).
- Warmer team photographs.
- Sarah's signature.

### 10.11 Merge record and current deployment state

PR #33 was squash-merged into `main` on 2026-09-30 as `fc6fb4947043431770a2cf66f87f3471e51bcd5c`. The PR-head Actions run `36748647728` passed lint, typecheck, tests, build and secret/environment hygiene. The Vercel check on the merge commit was pending when this record was updated. The merge did not connect the custom domain, enable indexing or approve production publication. The six routes remain under `/preview` with `noindex, nofollow`.

---

## 11. Client-ready pass (2026-10-01)

**Branch:** `fix/sarah-review-client-ready-2026-10-01`, from `main` `f0f0f77` (PR #33 merged as `fc6fb49`; PR #34, documentation only).

**Sources.**

- The brief names `REVISION WEB-*(3).docx`. **No such files exist in this repository, on GitHub or on this machine.** They were not read, so no comparison against them is claimed.
- The four documents that do exist in `Downloads` are unchanged since 2026-09-28 (same SHA-256 as in §10.1). They were re-read for this pass.

### 11.1 Sarah's instructions after this pass

#### Property Purchase

| Instruction (document)                                                    | Status                                                                                                                                       | Where                                           |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| The hero video moves without scroll                                       | implemented                                                                                                                                  | `HeroFilm` (Phase 2H); verified in §11.5        |
| "Compra con total tranquilidad: nosotros coordinamos cada paso."          | implemented ("total" dropped: no guaranteed state)                                                                                           | `hero`                                          |
| "Nosotros gestionamos el papeleo; tú eliges tu casa."                     | implemented; the legal scope check S-02 stays open (professional)                                                                            | `audience.title`                                |
| The calculator bigger, at the start                                       | implemented; it links only to the verified Buyer System origin (Preview)                                                                     | `BuyerToolBand` under the hero                  |
| "Lo que parece una gran oportunidad…" and "El sueño cabe en un instante…" | implemented                                                                                                                                  | `goodIdea`                                      |
| The Good-idea film with sound                                             | **blocked:** no rights or generation record (G-02) and no human-reviewed captions. The film stays muted, and the voiced source is not served | `approved-video.ts` (`soundtrack: unpublished`) |
| Keep the navy blocks; "un poco apagada"                                   | implemented: blocks kept, aquamarine on navy (approved for now by Juanma)                                                                    | `app/web-tokens.css`                            |

#### Investment

| Instruction (document)                                                        | Status                                                                                                                                                                  | Where                                 |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Less gold, aquamarine                                                         | implemented (gold restraint, aquamarine on navy)                                                                                                                        | `data-accent`, `data-palette`         |
| The video bigger, without scroll                                              | implemented                                                                                                                                                             | `HeroFilm`                            |
| The two headlines lack emotion                                                | implemented with new copy, open for Sarah (SR-036, SR-041)                                                                                                              | `hero`, `doors`                       |
| The authority image at the start; the face looks unnatural                    | implemented: block at the start, with Sarah's own photograph                                                                                                            | `AuthorityBand`, `sarahBalcony`       |
| "Este texto carece de sentido" → her sentence                                 | implemented **once**, as the next-step title. The repetition under "Buying on emotion" is removed and replaced by new copy (SR-083). A test keeps the rejected line out | `service-journey.ts`, `investment.ts` |
| An emotional Home, presentation video, financing (UCI, Sabadell), renovations | **not implemented** on any page: Home scope, and financing and renovations are unverified                                                                               | —                                     |

#### Tax Advisory

| Instruction (document)                           | Status                                                | Where           |
| ------------------------------------------------ | ----------------------------------------------------- | --------------- |
| The pain point; the calculator big, at the start | implemented; the pain line is open for Sarah (SR-054) | `TAX_LEAD_TOOL` |
| Lower the technical level                        | implemented with new wording, open (SR-058)           | `report`        |
| "Todo lo que dejas en nuestras manos"            | implemented; the six items are open (SR-059)          | `concerns`      |
| Change the face in the photograph                | implemented: Sarah's own photograph                   | `sarahStairs`   |
| The cases block as she wrote it                  | **partially implemented** (see below)                 | `TaxCasesBand`  |
| ITP on the off-plan case                         | implemented with her neutral wording; no tax is named | `cases`         |

On the cases block: the title, subtitle, badge, three titles and texts, "Year confidential" and the CTA are on the page. Her results and her publication line stay off it until each case has written permission, verified figures and tax review (C-01). No "pending" label is shown.

#### Team

| Instruction (document)                                                         | Status                                                                                | Where                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------- |
| A warmer, bigger hero photograph                                               | **partially implemented:** bigger; warmer needs an approved edited file (A-02)        | —                           |
| The two titles and the introduction                                            | implemented                                                                           | `pathsHeader`, `teamHeader` |
| Remove "Las fotografías muestran a tres personas…"                             | implemented: the subtitle (Phase 2H) and now the same note under the group photograph | `TeamEditorial.tsx`         |
| The group photo is low quality and should be warmer                            | **blocked:** no replacement file (A-03)                                               | —                           |
| A photograph of each person                                                    | **blocked:** none exists (Juanma). The placeholders are removed from the page         | —                           |
| The full names                                                                 | implemented ("Óscar Gonzalez", "Igor Veselov"; the surname accent is N-01)            | `profiles`                  |
| Remove the "El comprador es el cliente" section and the office-sign photograph | implemented (Phase 2H)                                                                | —                           |
| A closer, family tone                                                          | **not implemented:** it needs the photographs                                         | —                           |

### 11.2 What left the pages shown to the client

**Removed from the interface.** These were internal status. They now live here and in the claim statuses.

- **Preview banners** on Contact, Property Purchase, Investment, Tax and Team: "… PREVIEW · NOT PRODUCTION", "Review environment · noindex…".
- **Footer status lines:**
  - the "preview · noindex" chip, now off by default;
  - "Internal preview, not for publication/distribution", now just "Sarah Katerina";
  - "Apart from Contact, the destinations in this footer are not built yet";
  - "English is the active preview language…".
- **Placeholder labels:**
  - every per-answer "Not confirmed for publication yet." note in the FAQs;
  - the pending-figure dots (`aria-label="figure pending approval"`);
  - "Signature asset pending", together with its empty slot.
- **Unconnected buttons.** The note "These buttons are not connected in this preview" is gone. The final-CTA buttons on Investment, Tax and Team, and the Tax report button, now link to Contact.
- **Response times and pricing:** "Response time(s) are not confirmed…", "Pricing… not published in this preview", "Nothing is priced on this preview".
- **The Investment and Property Purchase cases bands**, including the buyer-voice banner. They held only placeholders: "Location pending", "Awaiting client permission", "Result withheld", "Preview · content pending", "The buyer's own words will appear here…".
- **On Tax:** the results, "Location withheld", "Proposed result · evidence and tax review pending" and the conditional publication line.
- **On Team:** "Portrait pending", the identity note under the group photograph, "PROVISIONAL PHOTOGRAPH — NOT FOR PRODUCTION" and the provisional event photograph, plus the identity clauses in the alt texts; the FAQ note "This editorial preview describes a proposed way of working… requires competent review before publication" (now "This page describes a way of working, not an engagement letter or professional advice."); the note on the unconnected final button (it now links to Contact).
- **On the Home:** the clause "When this Preview is configured" in the tools intro.

**Kept on the page.** These protect the visitor:

- the "Illustrative" and "sample" labels on dashboards and sample documents;
- the film disclosure;
- every service limit ("not a valuation, survey or legal representation", "no feasibility or permission is promised", "not guaranteed");
- the FAQ disclaimers, reworded without internal status;
- the Contact fallback shown when online booking is not configured.

**Kept off the page and still active.** These are the publication gates:

- `noindex, nofollow` in metadata and in the `/preview` `X-Robots-Tag`, and exclusion from the sitemap;
- C-01 (permission, figures and tax review for each case) and consent for buyer voices;
- G-02 rights and human-reviewed captions for sound;
- S-02 and every legal, tax or financial statement;
- the SR register, and the build gate on SR marks in production or indexable mode.

### 11.3 Register after this pass

**24 open Sarah decisions.** All of them are copy she has never seen; no image items remain.

| ID            | Page              | What she has to decide                                                                                                                                                   |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SR-001–SR-011 | Home              | Unchanged: no document covers the Home. The clause removed from the tools intro was configuration, not copy                                                              |
| SR-019        | Property Purchase | The line under the Purchase Tax band (Phase 2H)                                                                                                                          |
| SR-022        | Property Purchase | "Where an opportunity usually goes wrong" (Phase 2H)                                                                                                                     |
| SR-027        | Property Purchase | "What it includes", and the fees line "Scope and fees are confirmed in writing before any work starts." (her Tax sentence, new on this page, replacing the pricing note) |
| SR-082        | Property Purchase | The six points, rewritten in the positive                                                                                                                                |
| SR-085        | Property Purchase | Three FAQ answers and the closing note, rewritten without internal status                                                                                                |
| SR-036        | Investment        | The new headline and lead                                                                                                                                                |
| SR-041        | Investment        | The new doors headline                                                                                                                                                   |
| SR-049        | Investment        | The sentence under her next-step line (Phase 2H)                                                                                                                         |
| SR-083        | Investment        | The line under "Buying on emotion", which replaces the repetition                                                                                                        |
| SR-084        | Investment        | Two FAQ answers (timing, cost) and the closing note                                                                                                                      |
| SR-054        | Tax Advisory      | The pain-point line (it also needs tax review)                                                                                                                           |
| SR-058        | Tax Advisory      | The plainer report wording (it also needs tax review)                                                                                                                    |
| SR-059        | Tax Advisory      | The six items under her title, and the scope question S-01                                                                                                               |

**Not marked:**

- Tax and Team edits that only delete internal clauses: "…and no figure is confirmed for publication yet", "Nothing is priced on this preview", the "editorial preview" wording. What remains is copy she reviewed.
- "No commitment." on Tax: template copy she saw.

### 11.4 Not changed

- Routes, noindex and the sitemap.
- Vercel, the domain and indexation.
- Any testimonial: names, quotes and consent.
- The Buyer System.
- Contact's content, apart from its preview banner and the shared footer.
- Home copy, apart from the configuration clause.

### 11.7 Juanma's decision on the cases (2026-10-01)

Juanma, as owner, confirms that the client permissions exist and that the cases, names and data are real. This confirmation is the owner's source of truth for the project. It supersedes the evidence part of C-01 (§11.1, §11.2) for the Tax Advisory cases.

**Tax Advisory, restored as Sarah wrote it:**

- the title "Three real cases. Three mistakes avoided." (now `confirmed`);
- the three results: "Penalty avoided", "Position regularised", "Taxes and costs planned";
- "Year confidential";
- her publication line, in its affirmative form: "Published with the client’s written permission and verified figures."

The subtitle, the three case titles and texts, the "Illustration" badge and the CTA were already on the page.

**What does not exist, so nothing was added.** Sarah's copy carries no client names, locations or amounts, and none exist in the repository. The year stays confidential, as she wrote. The "Illustration" badge stays: it is her label for the drawings, not a statement about the cases.

**Removed from page and register:**

- "Proposed result · evidence and tax review pending";
- "Location withheld";
- the conditional "Published only with written client permission and verified figures";
- the `unverified` status of the results.

**Still open: professional tax review.** No record shows that a tax professional has reviewed the case wording. The results, and the case texts that state an outcome, therefore keep the `tax` review domain and stay `pending`. They are not marked `confirmed`. This is an internal publication gate, not a label on the page.

The off-plan case also stays tax-neutral: no record says whether it was a new build (VAT + AJD) or a resale (ITP), and Sarah's own correction asks to name the tax only if it was a resale.

**Unchanged:**

- **The Home testimonials** (Pieter van den Berg, James & Sarah Whitfield, Hans Schmidt): their names, quotes and contexts are untouched and still published with permission.
- **The Investment and Property Purchase cases bands** stay off the page. They hold illustrative analyses and buyer-voice slots, not real cases, so this decision does not restore them.
- **Every open Sarah copy decision** (24, §11.3).

**Professional gates still open after this pass:**

- tax review of every tax statement, including the case results and texts;
- legal review of every legal statement, including S-02 "We handle the paperwork" and the rewritten FAQ answers;
- financial review of financial statements;
- G-02, the rights and generation record for the footage and voice; sound also needs human-reviewed captions.

Financing (UCI, Sabadell) and renovations are not on any page and remain unverified.

### 11.5 QA (2026-10-01, local)

**Setup:**

- **Server:** a production build of this branch in its own worktree (`next start`, port 3310). No `next dev` shares that `.next`; the user's ports 3000 and 3001 were not touched.
- **Captures:**
  - *before*: `main`'s code (`f8f232b` build, port 3311);
  - *after*: this branch.
- **Browser:** Google Chrome through Playwright 1.63, on all six routes at 320, 390, 768, 1024 and 1440.

**Results at every width:**

- One `h1`, 0 horizontal overflow.
- **SR marks:** exactly the register (24 placements), 0 duplicates.
- **Retired wording:** 0 rejected or internal phrases found. The check covered preview banners, "not for production", "Portrait pending", "not connected", "withheld", "pending" labels, identity notes and "An opportunity is only right".
- **Errors:** 0 console errors, 0 broken images, 0 broken anchors, 0 404s. The only failed requests are aborted `.webm` preloads when a page closes.
- **noindex:** `noindex, nofollow` in both metadata and `X-Robots-Tag`.

**Other checks:**

- **Mobile menu:** opens with 8 links; Escape returns focus.
- **Keyboard:** 14 stops at 1440, each with a visible outline.
- **Sitemap:** has no `/preview` entry; `robots.txt` disallows all.

**Media:**

- **With reduced motion:** 0 video requests and 0 videos playing on every route. Play controls are still offered (Home, Purchase, Investment). Tax shows its poster.
- **Without reduced motion:**
  - The Purchase and Investment heroes play without scroll, muted, with no `autoplay` attribute. Pause works with Enter.
  - The Good-idea film is muted, with no sound control and no caption track.

**Destinations:**

- Buyer System links go to the verified origin only: Purchase Tax and Real Cash Needed.
- The final CTAs and the Tax report button go to `/preview/contact`.
- WhatsApp, phone, email and Maps are unchanged.

**Visible provisional wording:** 106 matches before → 22 after. All 22 are service limits, disclosures or the "Pending" step of the sample file tracker, which is labelled illustrative.

**Captures:** `docs/screenshots/client-ready-2026-10-01/`

- `full/`: six routes at 390 and 1440;
- `before-after/`: 8 blocks × 2 widths;
- `states/`: menus;
- `recon-qa.json`.

**Not verified:**

- The Vercel Preview: nothing is pushed.
- Safari/iOS, Android, screen readers.

**Tax Advisory after restoring the cases.** Playwright with Chrome on a production build, at 320, 390, 768, 1024 and 1440:

- **Cases:** each card shows its title, text, result, "Year confidential" and the publication line, and no card text is clipped.
- **Labels:** 0 "pending", "withheld" or preview labels.
- **Page checks:** one `h1`, 0 overflow, 0 console errors, 0 responses of 4xx or above, 0 broken images, `noindex, nofollow` in metadata and header.
- **Links:** they go to the preview routes, Contact and the verified Buyer System origin only.
- **Captures:** `docs/screenshots/client-ready-2026-10-01/tax-cases-restored/`.

### 11.6 Discrepancy for Juanma

The Team page's profile card for Sarah uses `public/sarah/sk-real-1.jpg`, recorded as "AUTH-SK-001, authentic identity reference". It is a black-and-white studio portrait. The photographs Juanma confirmed as Sarah on 2026-09-30 are `EQUIPO_SARAHKATERINA4–6`. Identity is not judged from appearance here, so nothing was changed.

Juanma should confirm whether `sk-real-1.jpg` shows Sarah. If it does not, replace it with one of the confirmed photographs.

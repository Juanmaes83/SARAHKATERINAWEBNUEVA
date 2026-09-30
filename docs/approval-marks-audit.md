# Approval-marks audit — the six preview routes

**Date:** 2026-09-30
**Branch:** `feat/contact-editorial-page` (PR #33, Draft), audited at `c045da4` (Contact integrated, based on `main` `8de6a76`)
**Routes:** `/preview/home`, `/preview/contact`, `/preview/property-purchase`, `/preview/investment`, `/preview/tax-advisory`, `/preview/team`
**Status:** review tooling in place. **Nothing here approves anything.** No route is declared visually approved for this version: the Contact page, the Contact links and these marks still need Juanma's visual review, and every `SR-###` item still needs Sarah.

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

## 4. What Sarah still has to decide — the SR register

**Source of truth:** `content/en/sarah-review.ts`. Each entry records its scope, the approved lines it excludes, the decision needed and the classified content it covers.

**On the page:** each item is marked `SARAH REVIEW REQUIRED · SR-###` (`components/review/SarahReviewMark.tsx`):

- a strip with the item's label, immediately before the block;
- a tag next to a single line or image.

The content itself is never hidden, struck through or dimmed.

**Totals:** 81 decisions and 85 placements. SR-029 appears on three pages; SR-039 and SR-081 appear on two pages each.

| ID     | Route(s)                  | Item                                                    | Decision                                                                               |
| ------ | ------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| SR-001 | Home                      | Hero · lead sentence                                    | Approve / edit / withdraw                                                              |
| SR-002 | Home                      | Side statement                                          | Approve / edit / withdraw                                                              |
| SR-003 | Home                      | Selector and three service chapters                     | Approve / edit / withdraw (excludes Sarah's Property Purchase line)                    |
| SR-004 | Home                      | Team chapter · title and button                         | Approve / edit / withdraw                                                              |
| SR-005 | Home                      | Process                                                 | Approve / edit / withdraw (scope line also legal)                                      |
| SR-006 | Home                      | Client voices · title and note                          | Approve / edit / withdraw (quotes authorised, excluded)                                |
| SR-007 | Home                      | Buyer tools · title and cards                           | Approve / edit / withdraw                                                              |
| SR-008 | Home                      | FAQ                                                     | Approve / edit / withdraw                                                              |
| SR-009 | Home                      | Contact band                                            | Approve / edit / withdraw (address excluded)                                           |
| SR-010 | Home                      | Final call to action                                    | Approve / edit / withdraw                                                              |
| SR-011 | Home                      | Footer                                                  | Approve / edit / withdraw                                                              |
| SR-012 | Contact                   | **Hero portrait · use on Contact** (`Sarah home_1.png`) | Approve this use or choose another photograph — her approval covers the Home only      |
| SR-013 | Contact                   | Hero · headline, lead, channel labels                   | Approve / edit / withdraw                                                              |
| SR-014 | Contact                   | Formats                                                 | Approve / edit / withdraw                                                              |
| SR-015 | Contact                   | "What happens after you book" · title and note          | Approve / edit / withdraw (shown only when booking is configured)                      |
| SR-016 | Contact                   | Office heading                                          | Approve / edit / withdraw (address excluded)                                           |
| SR-017 | Contact                   | Closing band                                            | Approve / edit / withdraw                                                              |
| SR-018 | Purchase                  | Hero except headline                                    | Approve / edit / withdraw                                                              |
| SR-019 | Purchase                  | Purchase Tax band                                       | Approve / edit / withdraw                                                              |
| SR-020 | Purchase                  | Trust strip                                             | Approve / edit / withdraw                                                              |
| SR-021 | Purchase                  | Audience · body and list                                | Approve / edit / withdraw                                                              |
| SR-022 | Purchase                  | Good idea · four points; S-03                           | Approve the points; answer S-03 ("protecting your investment")                         |
| SR-023 | Purchase                  | One file                                                | Approve / edit / withdraw                                                              |
| SR-024 | Purchase                  | File tracker and ordered steps                          | Approve / edit / withdraw                                                              |
| SR-025 | Purchase                  | "We review. We analyse. You decide with clarity."       | Approve / edit / withdraw                                                              |
| SR-026 | Purchase                  | "What you stop worrying about."                         | Approve / edit / withdraw                                                              |
| SR-027 | Purchase                  | Service levels; "What it includes"; price publication   | Approve / edit / withdraw; decide whether prices and timings are published             |
| SR-028 | Purchase                  | Sarah authority · copy                                  | Approve / edit / withdraw                                                              |
| SR-029 | Purchase, Investment, Tax | **Authority photograph** (`authorityEditorial`)         | Sarah objected to the face (I8/T6): approve a replacement or edit, or accept it (A-01) |
| SR-030 | Purchase                  | Cases band · titles and banner labels                   | Approve / edit / withdraw                                                              |
| SR-031 | Purchase                  | Resources band                                          | Approve / edit / withdraw                                                              |
| SR-032 | Purchase                  | Next step                                               | Approve / edit / withdraw                                                              |
| SR-033 | Purchase                  | FAQ                                                     | Approve / edit / withdraw                                                              |
| SR-034 | Purchase                  | Final call to action                                    | Approve / edit / withdraw                                                              |
| SR-035 | Purchase                  | Footer                                                  | Approve / edit / withdraw                                                              |
| SR-036 | Investment                | Hero and snapshot; headline H-02                        | Keep the template headline or pick an option; approve the rest                         |
| SR-037 | Investment                | Trust strip                                             | Approve / edit / withdraw                                                              |
| SR-038 | Investment                | Sarah authority · copy                                  | Approve / edit / withdraw                                                              |
| SR-039 | Investment, Tax           | **Signature slot**                                      | Supply an approved signature or remove the slot                                        |
| SR-040 | Investment                | Approach band                                           | Approve / edit / withdraw                                                              |
| SR-041 | Investment                | Two doors; headline H-02                                | Keep the template headline or pick an option; approve the rest                         |
| SR-042 | Investment                | Asset types and territory map                           | Approve / edit / withdraw                                                              |
| SR-043 | Investment                | Process                                                 | Approve / edit / withdraw                                                              |
| SR-044 | Investment                | Report preview                                          | Approve / edit / withdraw                                                              |
| SR-045 | Investment                | Scenarios and risk                                      | Approve / edit / withdraw                                                              |
| SR-046 | Investment                | Free calculations                                       | Approve / edit / withdraw                                                              |
| SR-047 | Investment                | Case studies · titles                                   | Approve / edit / withdraw                                                              |
| SR-048 | Investment                | Ecosystem band                                          | Approve / edit / withdraw                                                              |
| SR-049 | Investment                | Next step · intro and reasons (Sarah's title excluded)  | Approve / edit / withdraw                                                              |
| SR-050 | Investment                | FAQ                                                     | Approve / edit / withdraw                                                              |
| SR-051 | Investment                | Final call to action                                    | Approve / edit / withdraw                                                              |
| SR-052 | Investment                | Footer                                                  | Approve / edit / withdraw                                                              |
| SR-053 | Tax                       | Hero, snapshot, trust strip; hero lead T1               | Approve the copy; decide on the T1 lead                                                |
| SR-054 | Tax                       | Purchase Tax band · pain-point line                     | Approve / edit / withdraw                                                              |
| SR-055 | Tax                       | Context band                                            | Approve / edit / withdraw                                                              |
| SR-056 | Tax                       | Process                                                 | Approve / edit / withdraw                                                              |
| SR-057 | Tax                       | Calendar · title and intro                              | Approve / edit / withdraw                                                              |
| SR-058 | Tax                       | Report · plain-language titles (T4)                     | Approve / edit / withdraw                                                              |
| SR-059 | Tax                       | Six items under Sarah's title; S-01                     | Approve the items; answer S-01 (tax-office letters in scope?)                          |
| SR-060 | Tax                       | Services                                                | Approve / edit / withdraw                                                              |
| SR-061 | Tax                       | Sarah authority · copy                                  | Approve / edit / withdraw                                                              |
| SR-062 | Tax                       | Real cases · case texts                                 | Approve / edit / withdraw (results stay C-01)                                          |
| SR-063 | Tax                       | "Buy. File. Plan. Review."                              | Approve / edit / withdraw                                                              |
| SR-064 | Tax                       | Next step                                               | Approve / edit / withdraw                                                              |
| SR-065 | Tax                       | FAQ                                                     | Approve / edit / withdraw                                                              |
| SR-066 | Tax                       | Final call to action                                    | Approve / edit / withdraw                                                              |
| SR-067 | Tax                       | Footer                                                  | Approve / edit / withdraw                                                              |
| SR-068 | Team                      | Hero copy                                               | Approve / edit / withdraw                                                              |
| SR-069 | Team                      | **Hero photograph** (warmer edit asked, E2)             | Approve as is or supply an approved warmer edit (A-02)                                 |
| SR-070 | Team                      | Introduction                                            | Approve / edit / withdraw                                                              |
| SR-071 | Team                      | Three starting points · cards                           | Approve / edit / withdraw (Sarah's title excluded)                                     |
| SR-072 | Team                      | Sarah's profile · text and quote                        | Approve / edit / withdraw                                                              |
| SR-073 | Team                      | Team profiles · roles and texts                         | Approve / edit / withdraw                                                              |
| SR-074 | Team                      | **Group photograph** (E6)                               | Approve as is, replace, edit (A-03) or remove                                          |
| SR-075 | Team                      | **Network band** · photograph and copy                  | Keep, edit or remove the photograph; approve the copy                                  |
| SR-076 | Team                      | Process                                                 | Approve / edit / withdraw                                                              |
| SR-077 | Team                      | After the keys                                          | Approve / edit / withdraw                                                              |
| SR-078 | Team                      | Next step                                               | Approve / edit / withdraw                                                              |
| SR-079 | Team                      | FAQ                                                     | Approve / edit / withdraw                                                              |
| SR-080 | Team                      | Final call to action                                    | Approve / edit / withdraw                                                              |
| SR-081 | Team, Contact             | Footer (shared)                                         | Approve / edit / withdraw                                                              |

**Approved and therefore not marked** (Phase 2H §10.2 and later records):

- "Clarity before commitment."
- Sarah's Phase 2H lines: Investment journey title, "Everything you leave in our hands.", the Tax case framing lines, "Buy with peace of mind…", "What looks like a great opportunity…" and its body, "Different goals…", "Buying a home is easy…" and its introduction.
- The remuneration model and the 20-year credential.
- The three Home testimonials: client authorisation confirmed on 2026-09-29.
- The Home portrait of Sarah: her approval covers the Home.
- Juanma's Contact decisions: address, phone, email, video calls and meetings on request.
- The Contact booking facts, verified against the live booking page.

**Sarah decisions with nothing to mark on the page:**

- V-01, the voice-over of the Purchase film: not published, so there is nothing rendered to mark.
- The Home, which Juanma approved visually: this does not approve its copy, so the Home carries SR-001–SR-011.

**Resolving an item:**

1. Record Sarah's decision (date and channel) in this document.
2. Update the covered claims to `confirmed` with that source, or edit or remove them.
3. Delete the entry and its mark in the same change.

The test fails if the mark and the register disagree.

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
- **Merge consideration:** if the Vercel **Production** environment sets `NEXT_PUBLIC_SITE_MODE=production`, a production build of `main` fails while any SR entry is open. That is intended, and the previous production deployment stays live. The Production variables were not inspected (no Vercel CLI in this environment).

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

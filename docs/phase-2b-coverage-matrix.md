# Phase 2B coverage matrix — contract items per preview page

Status: PREVIEW · NOINDEX · NOT PRODUCTION · VISUAL REVIEW BY JUANMA REQUIRED
Recorded: 2026-10-08 · Branch `feat/phase-2b-cro-a11y-links`

This matrix reads `docs/phase-2-visual-implementation-contract.md` §3 and
AGENTS.md §13 against the six `/preview` pages as rendered on this branch. It
is an audit, not an approval. Only gaps whose content was already approved or
already on the page were filled; anything needing new copy, a new claim or a
missing destination is `REVIEW_REQUIRED` and was **not** written.

Legend: ✓ present · ◐ partial · — not applicable to this page ·
**→** changed on this branch · `RR` REVIEW_REQUIRED · `BLOCKED` waiting on evidence or a decision.

## 1. Matrix (before → after)

| Contract item | Home | Investment | Property Purchase | Tax Advisory | Team | Contact |
|---|---|---|---|---|---|---|
| Navigation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Contextual CTA (header Buyer Tools) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Editorial hero | ✓ | ◐ → ✓ hero CTAs were inert `<button>`s; now link to Contact / `#process` | ✓ | ◐ → ✓ same fix | ✓ | ✓ |
| Trust strip | ◐ (presentation) | ✓ | ✓ | ◐ (hero credentials list) | — | — |
| Problem / objections | ◐ (side statement) | ✓ | ✓ | ✓ | ✓ | — |
| Decision doors | ✓ | ◐ → ◐ "Analyse my property", "Talk to Sarah first" now link; "See opportunities" `RR` (no destination) | ✓ | ◐ → ✓ service-card CTAs link to Contact | ✓ | ✓ (formats) |
| Process / timeline | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| Dashboards / report previews (demo-labelled) | — | ✓ ("See a sample report" button `RR`) | ✓ | ✓ | — | — |
| Calculator entry points | ✓ | ✓ | ✓ | ✓ | — `RR` (would need a new "moment" line) | — |
| Sarah authority | ✓ | ◐ → ✓ "Meet Sarah" now links to the Team page | ◐ → ✓ "Meet Sarah" pointed at `#faq`; now Team | ◐ → ✓ "About Sarah" now links to Team | ✓ | ✓ |
| Permissioned cases | ✓ (authorised 2026-09-29) | `BLOCKED` (C-01) | `BLOCKED` (C-01) | ✓ (authorised 2026-10-01; "Discover how we work" now links to `#process`) | — | — |
| FAQ (accessible disclosures) | — (removed, Sarah) | ✓ → ✓ + related page link, **shown only when an answer is opened** | same | same | same (boxed variant) | — |
| Final CTA | ✓ | ✓ | ◐ → ✓ "Talk first" pointed at `#faq`; now Contact as on Investment/Tax | ✓ | ✓ | ✓ |
| Footer | ✓ | ◐ → ✓ labels naming an existing page link to it | ◐ → ✓ | ◐ → ✓ | ◐ → ✓ | ◐ → ✓ (Team footer) |
| Mobile-first (no overflow 320–1440) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Motion + reduced motion | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Accessibility | ✓ → ✓ dangling `aria-controls` removed | same | ✗ → ✓ A8 contrast (3 eyebrows), nested landmark | ◐ → ✓ nested landmark, `aria-controls` | same | same |
| SEO semantics (one h1, outline, ids) | ✓ → ✓ now tested on rendered HTML | same | same | same | same | same |
| Landmarks | one `main` ✓ tested · banner/contentinfo ✗ (A11Y-LM-01, pre-existing) | same | same | same | same | same |
| GEO / answer-oriented | ◐ entity answer block `RR` | ◐ questions in HTML; answers only after interaction (RR-2B-05) | same | same | same | ◐ (office in `<address>`) |
| Internal linking | ✓ | ◐ → ✓ in the initial HTML (CTAs, footer); FAQ related links after interaction only | same | same | same | ◐ → ✓ (Team footer) |

## 2. Evidence: what each layer proves

| Layer | Covers | Where | Runs in CI |
|---|---|---|---|
| **Links in the initial HTML** | CTAs, doors, authority links and footer links are real `<a href>` in the prerendered HTML, so a client without JavaScript, or a crawler, receives them. Every `<a href>` on the seven pages resolves to a route and, if it has a fragment, to an id rendered on **that** destination page. | `tests/internal-links.test.ts` (rendered block) | Yes, after `next build` with `REQUIRE_RENDERED_HTML=1` |
| **FAQ related links** | Inserted into the DOM only when a visitor opens an answer. **They are not in the prerendered HTML** (a test asserts this), so no claim is made that a crawler discovers them or that they have an SEO/GEO effect. | `components/web/WebFaq.tsx` | — |
| **Static destination validation** | Every registry href (`CTA_TARGETS`, `INVESTMENT_DOOR_TARGETS`, `FAQ_RELATED`, `FOOTER_LINK_TARGETS`, footer content, navigation, service routes) is checked against the rendered HTML of its own destination, whether or not the source page renders it yet. An id that only exists on another page fails. A fragment whose destination has no rendered HTML fails. Synthetic negatives prove each case. | `tests/internal-links.test.ts`, `tests/helpers/link-check.ts` | Yes |
| **Rendered semantics** | One h1, no skipped heading level, unique ids, every ARIA id reference resolving, typed buttons, links with href, images with alt, exactly one `main`, labelled repeated `nav` and every `aside`. | `tests/rendered-semantics.test.ts` | Yes |
| **FAQ interaction QA** | Keyboard open and close (Enter and Space), `aria-expanded`, `aria-controls` only while the panel exists, panel named by its trigger, related link href and label, navigation, no dangling ARIA reference. Covers the light FAQ variant (Investment, Purchase, Tax) and the boxed one (Team) at 375 and 1440 px. | `tests/interaction/faq.interaction.ts`; recorded run `docs/screenshots/phase-2b-session-11/faq-interaction-qa.json` (commit `f4837f9`, Chromium 141, 36/36) | **No.** Local only; Playwright is not a repository dependency |
| **axe / Lighthouse** (session 11, local) | axe-core 4.10 before: Property Purchase `color-contrast` ×3 (4.41:1), plus `landmark-complementary-is-top-level` on Property Purchase and Tax. After: 0 violations on `/` and the six pages. Lighthouse 12 accessibility: 100 on six pages. | `lighthouse-a11y.txt` | No |
| **Human visual review** | Presentation, focus, responsive behaviour and destinations, as people see them. | Vercel preview of the PR head | **Pending (Juanma)** |

## 2b. Findings recorded in this phase

| ID | Finding | Status |
|---|---|---|
| A11Y-LM-01 | `app/layout.tsx` wraps every page in `<main id="main">`, header and footer included. Under HTML-AAM, a `header` or `footer` inside `main` is not the page banner or contentinfo, so **no page exposes a banner or contentinfo landmark**. This is on `main` at `922c5f3`; it is **not a Phase 2B regression**. The fix moves the shared header and footer out of `main` in every page's layout, so it needs its own change and a visual review. The classifier (`landmarks()` in `tests/helpers/rendered-html.ts`) is tested on fixtures, ready to assert banner and contentinfo once fixed. | Follow-up, not built |

No new regression was found in this phase. Everything in §3 predates it.

## 3. REVIEW_REQUIRED — not built

| ID | Page | What | Why it was not built |
|---|---|---|---|
| RR-2B-01 | Home | Short answer block: who Sarah is, who she works for, where, what she is not | Needs new question headings and a combined statement; "not an estate agency" cannot be written (entity test forbids the phrase, and the wording is not approved). Source sentences that already exist: `home.ts` SUMA credential, `tax-advisory.ts` "Clarity for non-resident owners and foreign buyers", `contact.ts` "Torrevieja, Costa Blanca" / address, `team.ts` FAQ "The buyer is the client… no remuneration from sellers, developers or agencies" (the only `confirmed` one). Sarah to approve wording. |
| RR-2B-02 | Investment | "See opportunities" (door + four asset cards) | No opportunities page exists; linking it to Contact would mislabel the destination. Decide destination or wording. |
| RR-2B-03 | Investment | "See a sample report" | The sample report is the explorer in the same band; no separate destination. Decide whether to drop or retarget. |
| RR-2B-04 | Team | Buyer System entry point | Needs a "moment" sentence (new copy). |
| RR-2B-05 | All landings | FAQ answers **and their related links** only exist in the DOM when open, so they are absent from the prerendered HTML | Deliberate (WebFaq: answers still pending must not feed a future FAQPage). Changing it (for example server-rendered `hidden` answers) is a separate decision outside this phase. Until then, no SEO/GEO effect is claimed for the FAQ links. |
| RR-2B-06 | Footers | "Property analysis", "Investment opportunities", "My story", "Method", guides, legal pages | No destination exists; left as text. |
| RR-2B-07 | Investment, Property Purchase | Cases band | `BLOCKED` on C-01 (permission + verified outcome). |

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
| FAQ (accessible disclosures) | — (removed, Sarah) | ✓ → ✓ + related page links | ✓ → ✓ + related links | ✓ → ✓ + related links | ✓ → ✓ + related links | — |
| Final CTA | ✓ | ✓ | ◐ → ✓ "Talk first" pointed at `#faq`; now Contact as on Investment/Tax | ✓ | ✓ | ✓ |
| Footer | ✓ | ◐ → ✓ labels naming an existing page link to it | ◐ → ✓ | ◐ → ✓ | ◐ → ✓ | ◐ → ✓ (Team footer) |
| Mobile-first (no overflow 320–1440) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Motion + reduced motion | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Accessibility | ✓ → ✓ dangling `aria-controls` removed | same | ✗ → ✓ A8 contrast (3 eyebrows), nested landmark | ◐ → ✓ nested landmark, `aria-controls` | same | same |
| SEO semantics (one h1, outline, ids) | ✓ → ✓ now tested on rendered HTML | same | same | same | same | same |
| GEO / answer-oriented | ◐ entity answer block `RR` | ◐ FAQ Q→A | ◐ FAQ Q→A | ◐ FAQ Q→A | ◐ FAQ Q→A | ◐ (office in `<address>`) |
| Internal linking | ✓ | ◐ → ✓ | ◐ → ✓ | ◐ → ✓ | ◐ → ✓ | ◐ → ✓ |

## 2. Evidence

- axe-core 4.10 (wcag2a/aa, wcag21a/aa, best-practice) on the production build,
  1440 px, after scroll: **before** — Property Purchase `color-contrast` ×3
  (4.41:1) and `landmark-complementary-is-top-level` on Property Purchase and
  Tax; **after** — 0 violations on `/` and the six pages.
- Lighthouse 12 accessibility (local `next start`): 100 on all six pages
  (`docs/screenshots/phase-2b-session-11/lighthouse-a11y.txt`).
- `tests/internal-links.test.ts`, `tests/rendered-semantics.test.ts`,
  `tests/a8-contrast.test.ts`.

## 3. REVIEW_REQUIRED — not built

| ID | Page | What | Why it was not built |
|---|---|---|---|
| RR-2B-01 | Home | Short answer block: who Sarah is, who she works for, where, what she is not | Needs new question headings and a combined statement; "not an estate agency" cannot be written (entity test forbids the phrase, and the wording is not approved). Source sentences that already exist: `home.ts` SUMA credential, `tax-advisory.ts` "Clarity for non-resident owners and foreign buyers", `contact.ts` "Torrevieja, Costa Blanca" / address, `team.ts` FAQ "The buyer is the client… no remuneration from sellers, developers or agencies" (the only `confirmed` one). Sarah to approve wording. |
| RR-2B-02 | Investment | "See opportunities" (door + four asset cards) | No opportunities page exists; linking it to Contact would mislabel the destination. Decide destination or wording. |
| RR-2B-03 | Investment | "See a sample report" | The sample report is the explorer in the same band; no separate destination. Decide whether to drop or retarget. |
| RR-2B-04 | Team | Buyer System entry point | Needs a "moment" sentence (new copy). |
| RR-2B-05 | All landings | FAQ answers only exist in the HTML when open | Deliberate (WebFaq: answers still pending must not feed a future FAQPage). Revisit when answers are `confirmed`; then answers can be server-rendered `hidden` for GEO. |
| RR-2B-06 | Footers | "Property analysis", "Investment opportunities", "My story", "Method", guides, legal pages | No destination exists; left as text. |
| RR-2B-07 | Investment, Property Purchase | Cases band | `BLOCKED` on C-01 (permission + verified outcome). |

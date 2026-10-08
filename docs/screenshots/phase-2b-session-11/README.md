# Phase 2B — session 11 (A8, internal links, semantics)

Captured 2026-10-08 against local production builds (`next build` + `next start`),
Chromium 1194 via Playwright 1.56, `deviceScaleFactor: 1`, JPEG q62.

- `*-before.jpg` — `origin/main` at `922c5f3`.
- `*-after.jpg` — branch `feat/phase-2b-cro-a11y-links`.

Element-level captures of every region the branch touches, at 320, 360, 768,
1024 and 1440 px; `*-reduced-*` at 360 and 1440 with
`prefers-reduced-motion: reduce`. Each page is scrolled end to end first, the
sticky header made static for the capture. `*-faq-open-*` show one disclosure
opened, with its related link.

`qa-before.json` / `qa-after.json`: per page and width, horizontal overflow
(none) and elements left at opacity 0 (none under reduced motion).
`lighthouse-a11y.txt`: Lighthouse accessibility scores after the change.

Evidence only. The review surface is the Vercel preview (Juanma).


## Retention proposal (for Juanma's decision; nothing has been removed)

Counted on 2026-10-08 at the PR head: **248 evidence files** (244 JPG = 10,219,409 bytes, plus `README.md`, `qa-before.json`, `qa-after.json`, `lighthouse-a11y.txt`). This phase adds `faq-interaction-qa.json`, so the folder now has **249**. No file was deleted, moved or recompressed, and no new screenshot was taken: the closing commits change tests and documentation only, with no visual change.

**Proposed representative subset: 84 JPG (4,007,934 bytes).**
- For each of the 20 changed regions, one mobile (360 px) and one desktop (1440 px) before/after pair.
- Two reduced-motion pairs.
- Keep `README.md`, `qa-before.json`, `qa-after.json`, `lighthouse-a11y.txt` and `faq-interaction-qa.json`.

| Region | What the before/after pair shows | Files to keep |
|---|---|---|
| pp-tracker-heading | A8: the eyebrow of the tracker band ("The file, front to back") moves from `--sk-web-gold` to `--sk-web-gold-strong`. Expected visible change: colour only. | `pp-tracker-heading-360-before.jpg` `pp-tracker-heading-360-after.jpg` `pp-tracker-heading-1440-before.jpg` `pp-tracker-heading-1440-after.jpg` |
| pp-good-idea-points | A8: eyebrows of the "Good idea, bad execution" band (including "Where an opportunity usually goes wrong"), same token swap. | `pp-good-idea-points-360-before.jpg` `pp-good-idea-points-360-after.jpg` `pp-good-idea-points-1440-before.jpg` `pp-good-idea-points-1440-after.jpg` |
| pp-services | Property Purchase service cards: "Request roadmap / support / review" now link to Contact (were `#faq`). Should look identical. | `pp-services-360-before.jpg` `pp-services-360-after.jpg` `pp-services-1440-before.jpg` `pp-services-1440-after.jpg` |
| pp-authority | Property Purchase "Meet Sarah": now links to the Team page (was `#faq`). | `pp-authority-360-before.jpg` `pp-authority-360-after.jpg` `pp-authority-1440-before.jpg` `pp-authority-1440-after.jpg` |
| inv-hero | Investment hero: "Request an analysis" (Contact) and "See how it works" (`#process`) changed from inert buttons to links. | `inv-hero-360-before.jpg` `inv-hero-360-after.jpg` `inv-hero-1440-before.jpg` `inv-hero-1440-after.jpg` |
| inv-doors | Investment doors: "Analyse my property" and "Talk to Sarah first" now link; "See opportunities" stays a button (RR-2B-02). | `inv-doors-360-before.jpg` `inv-doors-360-after.jpg` `inv-doors-1440-before.jpg` `inv-doors-1440-after.jpg` |
| inv-authority | Investment "Meet Sarah": now links to Team. | `inv-authority-360-before.jpg` `inv-authority-360-after.jpg` `inv-authority-1440-before.jpg` `inv-authority-1440-after.jpg` |
| tax-hero | Tax hero: "Map my tax exposure" (Contact) and "See how it works" (`#process`) are now links. | `tax-hero-360-before.jpg` `tax-hero-360-after.jpg` `tax-hero-1440-before.jpg` `tax-hero-1440-after.jpg` |
| tax-calendar | Tax calendar aside: "Create my tax map" now links to Contact. | `tax-calendar-360-before.jpg` `tax-calendar-360-after.jpg` `tax-calendar-1440-before.jpg` `tax-calendar-1440-after.jpg` |
| tax-services | Tax service cards: the three CTAs now link to Contact. | `tax-services-360-before.jpg` `tax-services-360-after.jpg` `tax-services-1440-before.jpg` `tax-services-1440-after.jpg` |
| tax-authority | Tax "About Sarah": now links to Team. | `tax-authority-360-before.jpg` `tax-authority-360-after.jpg` `tax-authority-1440-before.jpg` `tax-authority-1440-after.jpg` |
| inv-faq-open | FAQ, light variant, one answer opened: "after" shows the related link; "before" has none. | `inv-faq-open-360-before.jpg` `inv-faq-open-360-after.jpg` `inv-faq-open-1440-before.jpg` `inv-faq-open-1440-after.jpg` |
| pp-faq-open | Same, on Property Purchase. | `pp-faq-open-360-before.jpg` `pp-faq-open-360-after.jpg` `pp-faq-open-1440-before.jpg` `pp-faq-open-1440-after.jpg` |
| tax-faq-open | Same, on Tax Advisory. | `tax-faq-open-360-before.jpg` `tax-faq-open-360-after.jpg` `tax-faq-open-1440-before.jpg` `tax-faq-open-1440-after.jpg` |
| team-faq-open | FAQ, boxed variant (Team), one answer opened, with its related link. | `team-faq-open-360-before.jpg` `team-faq-open-360-after.jpg` `team-faq-open-1440-before.jpg` `team-faq-open-1440-after.jpg` |
| inv-footer | Investment footer: labels naming an existing page are now links. | `inv-footer-360-before.jpg` `inv-footer-360-after.jpg` `inv-footer-1440-before.jpg` `inv-footer-1440-after.jpg` |
| pp-footer | Property Purchase footer, same. | `pp-footer-360-before.jpg` `pp-footer-360-after.jpg` `pp-footer-1440-before.jpg` `pp-footer-1440-after.jpg` |
| tax-footer | Tax Advisory footer, same. | `tax-footer-360-before.jpg` `tax-footer-360-after.jpg` `tax-footer-1440-before.jpg` `tax-footer-1440-after.jpg` |
| team-footer | Team footer (also used on Contact), same. | `team-footer-360-before.jpg` `team-footer-360-after.jpg` `team-footer-1440-before.jpg` `team-footer-1440-after.jpg` |
| contact-footer | Contact, which renders the Team footer: confirms the same links there. | `contact-footer-360-before.jpg` `contact-footer-360-after.jpg` `contact-footer-1440-before.jpg` `contact-footer-1440-after.jpg` |
| reduced motion | With `prefers-reduced-motion: reduce`, the changed elements are visible (no reveal left at opacity 0): one A8 band on mobile, one opened FAQ on desktop. | `pp-good-idea-points-360-reduced-before.jpg` `pp-good-idea-points-360-reduced-after.jpg` `team-faq-open-1440-reduced-before.jpg` `team-faq-open-1440-reduced-after.jpg` |

**Redundant: 160 JPG (6,211,475 bytes).**
- **The 320, 768 and 1024 px captures of every region (120 files).** The changes are an href or tag swap and one colour token. Layout does not depend on them, so the intermediate widths repeat the 360 and 1440 pairs. `qa-before.json` and `qa-after.json` already record no horizontal overflow and no hidden reveal at all five widths.
- **The other reduced-motion captures (40 files).** None of the changes involves motion, so they repeat the two kept pairs.

**If a migration is decided:**
1. Verify the destination copy file by file (names, count and bytes against the figures above).
2. Only then retire files from the repository, in a commit that references the verified destination.

No evidence has been uploaded to an external service, and no new storage was created.

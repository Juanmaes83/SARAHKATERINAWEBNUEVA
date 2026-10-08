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

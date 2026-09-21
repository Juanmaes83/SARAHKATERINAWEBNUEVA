# Tax Advisory preview — responsive screenshots

Captured from `/preview/tax-advisory` on 2026-09-22 against the production
build (`next build` + `next start`), Chrome, `deviceScaleFactor: 1`.

| File                    | Viewport | Full page height |
| ----------------------- | -------- | ---------------- |
| `tax-advisory-375.jpg`  | 375 × —  | 21,587px         |
| `tax-advisory-768.jpg`  | 768 × —  | 16,234px         |
| `tax-advisory-1024.jpg` | 1024 × — | 11,622px         |
| `tax-advisory-1440.jpg` | 1440 × — | 11,640px         |

## How they were taken, and why it matters

Chrome cannot produce a single full-page bitmap taller than about 16,384px. The
375px render of this landing is ~21,500px tall, so a plain full-page screenshot
comes back **mis-stitched** — sections repeat or vanish. An early capture in
this workstream did exactly that and briefly looked like a duplicated-content
bug in the page itself.

These were therefore captured as viewport-sized segments and stitched, with the
sticky header temporarily made static so it appears once rather than in every
segment. Before capture the page is scrolled end to end so every viewport
reveal has fired; the capture asserts that **no element is left at
`opacity: 0`** and that `scrollWidth === clientWidth` at each width.

## These are evidence, not the review surface

The Vercel preview is the surface for Juanma's visual review. These are
attached so the PR carries its own record of what was built and so a later
change can be compared against it.

They are compressed for repository weight. Judge colour and type on the live
preview, not here.

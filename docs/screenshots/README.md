# Responsive screenshots — both landings

Captured 2026-09-22 against the production build (`next build` + `next start`),
Chrome, `deviceScaleFactor: 1`, Phase 2D converged code.

**Both routes are captured deliberately.** The point of Phase 2D is that Tax
Advisory and Investment run on one system; these let a reviewer confirm that
the type scale, spacing rhythm, cards, chrome and palette are the same, and
that Investment did not regress.

| Route                   | Files                                            | Full-page height                     |
| ----------------------- | ------------------------------------------------ | ------------------------------------ |
| `/preview/tax-advisory` | `tax-advisory-375.jpg`, `-768`, `-1024`, `-1440` | 19,823 / 16,295 / 10,965 / 11,235 px |
| `/preview/investment`   | `investment-375.jpg`, `-768`, `-1024`, `-1440`   | 21,973 / 17,502 / 11,462 / 11,741 px |

## How they were taken, and why it matters

Chrome cannot produce a single full-page bitmap taller than about 16,384px.
Both landings exceed that at 375px, so a plain full-page screenshot comes back
**mis-stitched** — sections repeat or vanish. An early capture in this
workstream did exactly that and briefly looked like duplicated content in the
page itself.

These are captured as viewport-sized segments and stitched, with the sticky
header temporarily made static so it appears once rather than in every segment.
Before capture the page is scrolled end to end so every viewport reveal has
fired, and the capture asserts that **no element is left at `opacity: 0`** and
that `scrollWidth === clientWidth` at each width.

## These are evidence, not the review surface

The Vercel preview is the surface for Juanma's visual review. These are
attached so the PR carries its own record of what was built, and so a later
change can be compared against it.

They are compressed for repository weight. Judge colour and type on the live
preview, not here.

## Team editorial reference

`ed87a2a9-e307-4a2c-a58d-7a92ff0bf8ee.png` is the user-supplied composition
and density reference for `/preview/team`. It is documentation only and must
never be served as page photography or treated as a source of approved copy,
figures or testimonials. Its provenance is recorded in
`docs/team-asset-record.md`.

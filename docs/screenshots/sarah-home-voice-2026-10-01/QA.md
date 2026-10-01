# QA: Sarah's Home feedback (2026-10-01)

**Setup:**

- **Build:** production build of `feat/sarah-home-voice-and-balance-2026-10-01`, served by `next start` from its own worktree, with no `next dev` on that `.next`.
- **"Before" reference:** `main` at `e782a6d`, built in a separate worktree.
- **Browser:** Google Chrome through Playwright 1.63.
- **Captures:** every page was scrolled to the end before each capture, and its images were given up to 6 s to load.

**Results.** Six routes at 390, 768, 1024, 1440 and 1920 px:

| Check | Result |
| ----- | ------ |
| Review-mark nodes and editorial wording (text, attributes, meta) | 0 |
| "Sarah is paid…" anywhere rendered | 0. The Investment lead was reworded too (re-checked at 390 and 1440 after the change) |
| Requests for the rejected photograph (`sarah-terrace`, `EQUIPO_SARAHKATERINA4`) | 0 on every route and width |
| New photograph (`sarah-confianza`) | Home `#top` and Property Purchase `#sarah` |
| Video in the Home hero | none: the still photograph (no real office footage exists). The other heroes keep their films |
| One `h1`, horizontal overflow | yes, 0 |
| Console errors, failed requests, broken images, broken anchors | 0 |
| `noindex, nofollow` (meta + `X-Robots-Tag`); sitemap without `/preview` | yes |
| Tax results and publication line | present |
| Mobile menu (8 links, Escape returns focus); keyboard focus outline | yes; 0 missing |
| Internal links | all 200 |

**Desktop balance.** Measured per section with `balance-audit` and `column-gap-audit` (scratch scripts), at 1440 and 1920:

| Block | Before | After |
| ----- | ------ | ----- |
| Home hero at 1920 (left/right empty space) | 360 / 0 px | 360 / 360 px |
| Two-column blocks with an empty left half | 4: Contact formats 416 px, Property Purchase audience 363 px, Investment authority 209 px, Investment scenarios 306 px | 1: Contact formats 299 px. That photo is sticky and follows the list while scrolling |

**Captures:**

- `full/`: all six routes, full page, at 390 and 1440.
- `before-after/`: the ten changed blocks at 1440 and 390, `*-before.jpg` from `main` and `*-after.jpg` from this branch. The `home-services` captures show its lower chapters before their reveal ran; this is a capture artefact, not a gap.

Not visually approved: Juanma reviews first, then Sarah.

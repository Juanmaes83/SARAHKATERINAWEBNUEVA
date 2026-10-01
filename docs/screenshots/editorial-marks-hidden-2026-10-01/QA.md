# QA — editorial marks hidden (2026-10-01)

Production build of `fix/hide-editorial-marks-2026-10-01` served by `next start` from its own worktree (no `next dev` on that `.next`). Google Chrome through Playwright 1.63. Before each capture, every page was scrolled to the end and its images were left to load (6 s limit per page).

| Check | Routes and widths | Result |
| ----- | ----------------- | ------ |
| Review-mark nodes (`[data-sarah-review]`) | 6 routes × 320/390/768/1024/1440 | 0 |
| Editorial wording in visible text, `aria-label`/`title`/`alt` and meta | same | 0 |
| One `h1` | same | yes |
| Horizontal overflow | same | 0 |
| Console errors / failed requests / broken images / broken anchors | same | 0 / 0 / 0 / 0 |
| `noindex, nofollow` (meta + `X-Robots-Tag`) | same | present |
| Tax results and publication line | Tax Advisory, all widths | present |
| Mobile menu (8 links, Escape returns focus) | widths < 1024 | yes |
| Keyboard focus outline (12 stops) | 1024, 1440 | 0 missing |
| Internal links | all six routes | 200 |
| Sitemap contains `/preview` | — | no |

Full-page captures are in `full/`, at 390 and 1440 for each route. The raw data is in `clean-qa.json`.

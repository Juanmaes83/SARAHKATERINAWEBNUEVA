# Team editorial visual QA

Date: 2026-09-22

Route: `/preview/team`

Build: local production build (`next build` + `next start`)

Browser: Chromium through Playwright CLI

Evidence: full-page captures for all six widths plus focused hero and network
captures are stored in `output/playwright/team-correction/`.

## Responsive matrix

| Width | Horizontal overflow | Hidden reveal content after scroll | H1 / main | Images without `alt` | Visible targets below 44×44 px |
| ----: | ------------------: | ---------------------------------: | --------: | -------------------: | -----------------------------: |
|   320 |                0 px |                                  0 |     1 / 1 |                    0 |                              0 |
|   375 |                0 px |                                  0 |     1 / 1 |                    0 |                              0 |
|   390 |                0 px |                                  0 |     1 / 1 |                    0 |                              0 |
|   768 |                0 px |                                  0 |     1 / 1 |                    0 |                              0 |
|  1024 |                0 px |                                  0 |     1 / 1 |                    0 |                              0 |
|  1440 |                0 px |                                  0 |     1 / 1 |                    0 |                              0 |

## Interaction and accessibility checks

- Page loaded meaningful content with no framework error overlay and no
  console errors.
- Skip link was the first keyboard focus target.
- At 320 px the mobile menu opened as a labelled dialog, moved focus to its
  close button, closed with Escape and returned focus to the Menu button.
- FAQ disclosures are native buttons and remain independently operable.
- `prefers-reduced-motion: reduce` left zero content elements hidden.
- Heading outline contains one H1 followed by H2 section headings and H3 card
  or step headings; no authored heading-level skip was found.
- Every rendered image had an `alt` attribute.
- The hero image was emitted as a responsive Next.js image preload from the
  authored `priority` prop; the remaining images loaded successfully.

## Crawl and metadata checks

- HTTP response: `200`.
- Response header: `X-Robots-Tag: noindex, nofollow`.
- HTML robots metadata: `noindex, nofollow`.
- No hreflang emitted.
- `/sitemap.xml` remained an empty URL set in preview mode.
- `/robots.txt` remained `Disallow: /` in preview mode.

## Visual review notes

- The corrected hero uses the full 16:9 composition at every tested width with
  `object-fit: contain`, no scrim and no breakpoint-specific vertical frame.
  All three people remain visible on desktop and mobile without accidental
  head, shoulder or body crops.
- Desktop keeps the authentic three-person photograph alongside the editorial
  headline; mobile moves the complete photograph below the initial text and CTA.
- The new 3:4 network photograph appears after the team section and before the
  process. Its complete composition is visible and it carries an explicit
  `PROVISIONAL MEDIA — HUMAN VISUAL REVIEW ONLY` label and non-endorsement
  caption. It remains blocked for production approval.
- The Sarah portrait is the already-authentic repository portrait and is not
  inferred from the new group photographs.
- Office imagery is limited to the reviewed crop and close wall sign. Source
  office frames containing a visible registration or potentially readable
  screens are not rendered. Third-party material visible in the newly requested
  network photograph is disclosed as provisional media rather than treated as
  evidence of a relationship.
- Human review is still required for photography selection, crop, editorial
  copy and every professional-domain statement before merge or publication.

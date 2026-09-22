# Team editorial visual QA

Date: 2026-09-22

Route: `/preview/team`

Build: local production build (`next build` + `next start`)

Browser: Chromium through Playwright CLI

## Responsive matrix

| Width | Horizontal overflow | Hidden reveal content after scroll | H1 / main | Images without `alt` | Visible targets below 44×44 px |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 320 | 0 px | 0 | 1 / 1 | 0 | 0 |
| 375 | 0 px | 0 | 1 / 1 | 0 | 0 |
| 390 | 0 px | 0 | 1 / 1 | 0 | 0 |
| 768 | 0 px | 0 | 1 / 1 | 0 | 0 |
| 1024 | 0 px | 0 | 1 / 1 | 0 | 0 |
| 1440 | 0 px | 0 | 1 / 1 | 0 | 0 |

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

## Crawl and metadata checks

- HTTP response: `200`.
- Response header: `X-Robots-Tag: noindex, nofollow`.
- HTML robots metadata: `noindex, nofollow`.
- No hreflang emitted.
- `/sitemap.xml` remained an empty URL set in preview mode.
- `/robots.txt` remained `Disallow: /` in preview mode.

## Visual review notes

- Desktop hero keeps the authentic three-person photograph alongside the
  editorial headline; mobile moves the photograph below the initial text and
  CTA to preserve a readable first viewport.
- The Sarah portrait is the already-authentic repository portrait and is not
  inferred from the new group photographs.
- Office imagery is limited to the reviewed crop and close wall sign. Source
  frames containing a visible registration, potentially readable screens or
  third-party branding are not rendered.
- Human review is still required for photography selection, crop, editorial
  copy and every professional-domain statement before merge or publication.

# Home QA — REVISION WEB-HOME.pdf (2026-10-01)

Google Chrome through Playwright, local production build of `feat/home-pdf-review-2026-10-01` (`next start`), 2026-10-01T11:31:33.653Z. Raw data: `qa.json`.

| Width | H1  | Page overflow | Header overlaps | Logo  | Menu text | Console errors | Failed requests | Broken images | Broken anchors | Review marks | PDF lines missing | Replaced lines left |
| ----- | --- | ------------- | --------------- | ----- | --------- | -------------- | --------------- | ------------- | -------------- | ------------ | ----------------- | ------------------- |
| 320   | 1   | 0             | 0               | 48 px | menu      | 0              | 0               | 0             | 0              | 0            | 0                 | 0                   |
| 390   | 1   | 0             | 0               | 48 px | menu      | 0              | 0               | 0             | 0              | 0            | 0                 | 0                   |
| 768   | 1   | 0             | 0               | 48 px | menu      | 0              | 0               | 0             | 0              | 0            | 0                 | 0                   |
| 1024  | 1   | 0             | 0               | 48 px | menu      | 0              | 0               | 0             | 0              | 0            | 0                 | 0                   |
| 1280  | 1   | 0             | 0               | 64 px | 16px      | 0              | 0               | 0             | 0              | 0            | 0                 | 0                   |
| 1440  | 1   | 0             | 0               | 64 px | 20px      | 0              | 0               | 0             | 0              | 0            | 0                 | 0                   |

- **noindex:** `noindex, nofollow` in the meta tag and in `X-Robots-Tag` at every width; `/preview` is not in the sitemap.
- **Hero:** `sarah-confianza.webp` loads (object-position 50% 30%); no video.
- **Mobile menu:** at 320, 390 and 768 it opens with 8 links and closes with Escape. **Keyboard:** at 1024, 1280 and 1440 every tabbed element shows a focus outline.
- **Selector:** the third need, "I need to understand what I’ll pay, in fees and in taxes.", can be selected.
- **Reduced motion and JavaScript disabled (390, 1440):** one H1, every PDF line present, the introduction fully opaque, all 9 buttons present, no overflow.
- **Buttons** at 1440:
  - "Find your starting point" → `#services`;
  - "Book a call" ×3 (hero, introduction, contact band) → the configured booking page, new tab;
  - "Meet my team" → `/preview/team`;
  - "All contact options" → `/preview/contact`;
  - "Choose your starting point" → `#services`;
  - "Calculate your purchase costs" → `#tools`.
- **Booking page** (read-only GET, nothing booked): https://www.sarahkaterina.com/book-a-call → 200, embeds https://calendly.com/sarahkaterina-info/30min.
- **The Vercel Preview has no booking variable**, so there the booking buttons are replaced by their fallbacks (`docs/home-buyer-system-preview.md` §13.5).
- **Call link:** `Call +34 647 754 589`, one text node, `tel:+34647754589`.
- **Shared header, six routes, 320–1920:** labels on one row, none wrapped, no overlap, no overflow.
- **The other five routes at 390 and 1280:** no errors, marks, overflow, broken images or anchors; noindex present; Tax results present.

Folders:

- `full/`: whole Home at each width, plus 390 with reduced motion and with JavaScript off;
- `sections/`: changed blocks at 390 and 1440, the open menu, the selector on the third need, and the header at 320/1100/1280/1440/1920;
- `before-after/`: `main` (before) against this branch (after).

# Home hero film QA (2026-10-02)

Google Chrome 153 through Playwright, against an isolated local production build of `feat/home-video-preview-2026-10-02` (`next build`, then `next start` on its own port, with no `next dev` sharing `.next`). Raw data: `qa.json`. Record: `docs/home-buyer-system-preview.md` §14.

## `/preview/home`

| Width | H1  | Overflow | Console errors | Failed requests / 4xx | Cut attached                    | Starting poster        | Plays muted |
| ----- | --- | -------- | -------------- | --------------------- | ------------------------------- | ---------------------- | ----------- |
| 320   | 1   | 0        | 0              | 0                     | `…-silent-mobile.mp4` (960×552) | `…-mobile-start.webp`  | yes         |
| 390   | 1   | 0        | 0              | 0                     | `…-silent-mobile.mp4`           | `…-mobile-start.webp`  | yes         |
| 768   | 1   | 0        | 0              | 0                     | `…-silent.mp4` (1880×1080)      | `…-desktop-start.webp` | yes         |
| 1024  | 1   | 0        | 0              | 0                     | `…-silent.mp4`                  | `…-desktop-start.webp` | yes         |
| 1280  | 1   | 0        | 0              | 0                     | `…-silent.mp4`                  | `…-desktop-start.webp` | yes         |
| 1440  | 1   | 0        | 0              | 0                     | `…-silent.mp4`                  | `…-desktop-start.webp` | yes         |
| 1920  | 1   | 0        | 0              | 0                     | `…-silent.mp4`                  | `…-desktop-start.webp` | yes         |

- **noindex:** `noindex, nofollow` in the meta tag and in `X-Robots-Tag` at every width and mode.
- **Poster:** loaded before any video at every width; the frame has its final size in the server markup (342×197 at 390, 644×370 at 1440).
- **Playback (390 and 1440):**
  - it starts by itself, muted, while on screen;
  - scrolling it off screen pauses it; it resumes on return because it was playing;
  - after the visitor presses Pause, leaving and returning keeps it paused;
  - at the end the control reads "Replay the Home film", and Replay restarts it from 0.
- **Control:** a real `<button>`, labelled "Play / Pause / Replay the Home film", 44 px tall. Reached by keyboard (Tab), it shows a 2 px solid outline with a 2 px offset. The `<video>` is `aria-hidden` and out of the tab order.
- **Aborted requests:** 1 at 390 and 1 at 1440, both `net::ERR_ABORTED` range requests on the film during the seek and replay steps. Chrome cancels and reissues ranges when the playhead jumps, and the film still played. They are not counted as failures.
- **Reduced motion (390, 1440):** **zero** requests for either cut. The final-frame poster shows (`…-mobile-end.webp` / `…-desktop-end.webp`), and the control offers Play.
- **JavaScript disabled (390, 1440):** one H1, the final-frame poster and no control. The only blocked request is the JS chunk, which Playwright blocks itself when JavaScript is off.
- **Video failure (1440, both cuts answered 404):** the state becomes `failed`, the final poster covers the frame and the control retires. The single console error is the forced 404 itself.

## `/` (unchanged)

- 390 and 1440: status 200, one H1, noindex, no overflow, no console errors or failed requests.
- No hero film element and no reference to the film in the HTML.
- No file that `app/page.tsx` imports is changed on this branch.

## Not measured

- Lighthouse / Core Web Vitals were not run in this pass, so no LCP figure is claimed. By construction the LCP candidate is the poster: no video is requested before the window `load` event.
- No check was made on Safari, Firefox or a real phone.

## Folders

- `hero/`:
  - each width at load (`home-<w>.png`);
  - 390 and 1440 at first paint, playing and ended;
  - 390 and 1440 with reduced motion and with JavaScript off;
  - 1440 with the video failed.
- `full/`: the whole Home at 390 and 1440, and `/` at 390 and 1440.

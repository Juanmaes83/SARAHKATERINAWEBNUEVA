# Investment — visual corrections after human audit

**Status:** `READY FOR HUMAN VISUAL REVIEW`
**Date:** 2026-09-22
**Branch:** `feat/investment-visual-corrections-2026-09-22`
**Base:** `feat/phase-2e-media-implementation-2026-09-22` at `e79cd9c` — Phase 2E is **not** in `main` yet (PR #11 is still open), so that branch is the current implementation and the base for this work.
**Route:** `/preview/investment` only — Preview, noindex, nofollow, excluded from the sitemap.

Tax Advisory and Property Purchase were **not** touched.

---

## 1. Image chosen

| | |
|---|---|
| **Requested** | `sarahkaterina_home` |
| **Exact path used** | `IMAGES/sarahkaterina_home.png` |
| **Resolution** | 1344 × 752, RGB, 1,394 KB |
| **Web derivative** | `public/media/sarah-authority.webp`, 1344 × 752, 43 KB, quality 86 |
| **Registry entry** | `APPROVED_MEDIA.investmentAuthority` |

A search on the exact base name returned **one** file. `sarahkaterina_home2.png` and `sarahkaterina_home3.png` exist and were **not** used; neither was AUTH-SK-002, which this replaces in the authority section. A test asserts the source path and that it does not match `home2`/`home3`.

The original is untouched. It carries no embedded logo or copy.

### Crop decision

No crop was applied. Sarah is seated with both hands and the armchair spanning most of a 16:9 frame, so any portrait crop would have cut an arm. **The section frame moved from 1:1 / 4:5 to 3:2 instead** — the ratio every other media frame on the page already uses, so the change also improves proportional coherence. Focal point `36% 30%` keeps the face high and safe at every width from 320px.

---

## 2. Changes applied

### Hero

- **Amphora thumbnail removed.** The small coastline image that sat over the photograph is gone, along with its now-dead CSS. The dashboard card's overlap was increased from 24px to 32px so the frame still reads as one composition rather than a photograph with a hole where something used to be. The main hero image was **not** replaced and no second image was added.
- **Approved copy restored, exactly:**

| | Before | Now |
|---|---|---|
| Eyebrow | Investment with purpose | **Investment with judgement** |
| H1 | Properties. Data. Smarter decisions. | **Properties. Data. Better decisions.** |
| Lead | "Independent advice for foreign buyers…" | **"Independent property investment analysis for international buyers in the Costa Blanca. Financial modelling, due diligence and a tax overlay, brought together into one decision report — before the deposit, not after it."** |
| Primary CTA | Talk to Sarah | **Request an analysis** |
| Secondary CTA | See how it works | *(unchanged)* |

A Playwright assertion fails the QA if "purpose" or "Smarter decisions" ever return.

### Trust strip — duplication removed

The hero states **20 years**, **Buyer-side only** and **Full financial model**. The band immediately below repeated two of them.

Both duplicates were **removed from the band**, not from the hero. No credential was invented to refill it — the instruction was to shorten rather than pad — so the strip is now two entries (*International buyers*, *Fast turnaround*) plus the editorial line, on a two-column grid with 64px gaps instead of four narrow columns.

Both remaining values are `pending`: the template's "160+" and "48 h" are unconfirmed. They render with a discreet dot, never as facts.

Verified: the hero states each claim exactly once, and the strip repeats none of them.

### Case studies — premium slot system

Rebuilt as an aligned field system rather than loose text:

- asset type set over the visual, as a real case would lead;
- a numbered index per card;
- a definition list — **Location · Decision · Result · Period** — on a fixed column so all three cards align field for field;
- the result stays a **withheld rule**, never a number, with an accessible name saying it is withheld pending permission and verification;
- the permission note closes each card on a rule, as a status rather than an error.

No client, location, figure, testimonial or result was invented.

### Authority section

Only the portrait changed. Title, body, claims, bullets, quote, limits and the navy palette are untouched. Integration improvements: 3:2 frame, a balanced `0.92fr / 1.08fr` split so the landscape image has room, and the credential icons changed from hairline outlines to filled navy discs with a gold border, which the review flagged as low contrast.

### Footer

The shared footer now uses `public/brand/sarah-katerina-logo-light.png`, a transparent high-resolution variant created from the approved mark. The original `BRAND-001` remains untouched. The variant preserves the original geometry and teal accent while converting only the dark wordmark to ivory for legibility on navy.

The ivory plate has been removed. The logo now sits directly on the navy footer with the same shared component used by Investment, Tax Advisory and Property Purchase. Footer architecture and navigation are otherwise unchanged.

---

## 3. Deliberately not changed

- Tax Advisory and Property Purchase.
- Contextual navigation, mobile menu, ThreeUI, scrollspy, command palette, navigation transitions, final routes, production links — all explicitly out of scope.
- The hero's main image, the dashboard's content, and every approved claim.
- The schematics in **Land**, **Commercial** and **Case Studies**, which stay provisional and keep their visible `SCHEMATIC` badge.
- Images with embedded logo or copy: kept as approved for Preview. No CSS was used to mask embedded text.

---

## 4. Pending differences

| # | Difference | Note |
|---|---|---|
| 1 | **"20 years" appears twice inside the authority section** — once in the body sentence and once as a bullet. | Genuine redundancy, but §7 of the brief requires the authority claims to be kept, so it was not altered unilaterally. **Needs your ruling.** |
| 2 | Whitespace around the authority portrait | Stretching the frame to the copy column's height was tried and reverted: `height: 100%` on a stretched grid item fed back into the parent and produced ~50 overflowing elements at 1024px+. The frame keeps 3:2 and the space reads as editorial air. |
| 3 | Land and Commercial asset cards | Still schematic. No approved image depicts a plot or a commercial asset. |
| 4 | Decision doors | Still schematic; the Phase 2E inventory lists Services 8/9 as an alternative, not a selection. |
| 5 | Embedded "sistem" typo | Present in several approved images. Retouching is yours. |
| 6 | Navigation | Out of scope this phase, recorded as a difference. |
| 7 | Hero video | No asset exists; the slot keeps its ratio. |

---

## 5. Confirmations

- Everything is limited to **Preview**. `/preview/investment` returns `noindex, nofollow` in both the header and the metadata; the sitemap is empty and `robots.txt` disallows everything.
- **Production, domain and DNS were not touched.** No production deployment was created.
- No secrets, environment variables or analytics were added.
- Originals were not modified: `git status` on `IMAGES/` and the root PNGs is clean.
- Playwright was installed **outside the project**, in the scratchpad, and driven against the already-installed Chrome, so `package.json` and the lockfile are unchanged.
- No merge. Visual approval is **not** declared.

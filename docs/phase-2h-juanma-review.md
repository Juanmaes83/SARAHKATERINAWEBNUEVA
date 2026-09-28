# Phase 2H — Juanma's review of the four landings

**Status:** PREVIEW — implemented on `feat/phase-2h-juanma-review-four-landings`, Draft PR #30, not merged, **pending Juanma's human visual review** at mobile and desktop widths. Not approved for production. Nothing here marks a visual as approved. GitHub Actions did not start for the PR's first commit (Actions budget); the later runs passed (§9).
**Date:** 2026-09-28 (documentation reconciled again the same day, second pass)
**Base:** `main` at `edc47f0` (merge of PR #29, after PR #28)
**Scope:** `/preview/investment`, `/preview/tax-advisory`, `/preview/property-purchase`, `/preview/team`.
**Sources:** four review documents from Juanma, read in full, all 17 screenshots included: `REVISION WEB-investment.docx`, `REVISION WEB-Tax advisory.docx`, `REVISION WEB-property-purchase.docx`, `REVISION WEB. Team.docx`. They are not committed; their screenshots were used to map each comment to a component. The three crops needed to identify removals are in `docs/screenshots/phase-2h/feedback/`.

All four routes stay under `/preview`: `laboratory: true`, `noindex, nofollow`, out of the sitemap. No token, colour, claim, metric, testimonial, commercial relationship or tax figure was introduced.

---

## 0. Repository state, as checked before any change

`main` at `edc47f0` contains PR #28 (Phase 2F consolidation) and PR #29 (Phase 2G), plus four follow-up commits restoring the legal accents in the team names. Tests at that commit: 253/253 passing; build passing.

**Discrepancies between `main`, the documentation and the previews** (recorded, then resolved where this phase touches them):

| #    | Where                                                          | What it says                                                                                      | What `main` actually does                                                                                                                                                                                                | Resolution                                                                                                                             |
| ---- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| D-01 | `README.md` status line                                        | "Phase 2E media/crop pass merged · motion next"                                                   | 2E, 2F and 2G are all merged                                                                                                                                                                                             | Status line, §1, §5, routes table, roadmap and review note rewritten                                                                   |
| D-02 | `PROJECT-STATUS.md`                                            | "Last updated 2026-10-23" (a date after today); 2E "in review"; 2F "after 2E — human gate"; no 2G | 2F and 2G are merged; their human visual review is still open                                                                                                                                                            | Rewritten: phases with PR numbers and merge dates, handoff history in date order, the "2026-10-23" entry re-dated to its commit (D-10) |
| D-03 | `docs/phase-2g-connected-service-journey.md`                   | "implemented on the branch, pending review"; G-04 "names written without accents"                 | Merged (PR #29). Accents restored on `main` by the owner (`47a377f`, `f9317a9`, `35a428a`): _Elsa Quirós Pérez_, _Óscar_                                                                                                 | Header and G-04 annotated                                                                                                              |
| D-04 | `docs/phase-2f-images-and-scroll-hero-implementation.md` §3    | Investment hero = `MAPA CIUDADES OPORTUNIDADES.mp4`; Tax hero = `BIENES RACIES QUE CRECEN.mp4`    | Owner replaced both on 2026-09-24: Investment uses `TAX ADVISORY HERO REPLACEMENT.mp4` (aerial villas), Tax uses `TAX ADVISORY HERO SECTION.mp4`; the map film moved to the Asset Types band (`lib/media/hero-video.ts`) | Superseded note added at the top of that record                                                                                        |
| D-05 | `public/media/hero/`                                           | —                                                                                                 | `investment-territory-*` and `tax-ownership-costs-*` (≈ 10.6 MB) are referenced by no component or registry — leftovers of the 2F cuts replaced on 2026-09-24                                                            | **Not deleted** (outside this brief). Listed for a cleanup decision                                                                    |
| D-06 | `content/es/team.ts`                                           | _Elsa Quiros Perez_, _Oscar_                                                                      | The English file carries the owner-confirmed accents                                                                                                                                                                     | Aligned (with the new full names)                                                                                                      |
| D-07 | Preview banners                                                | Investment still reads "PHASE 2E — APPROVED MEDIA IN PREVIEW"                                     | The page carries 2F–2H work                                                                                                                                                                                              | Left as is (banner copy is governed content); flagged                                                                                  |
| D-08 | The brief for this phase                                       | Team title quoted as "Four roles, connected around the buyer"                                     | The rendered title was "Four functions, connected around the buyer."                                                                                                                                                     | Same block; replaced as asked                                                                                                          |
| D-09 | Juanma's Property Purchase note "Pongamos el video con sonido" | Placed under the beach screenshot, which has the **Replay** control                               | That screenshot is the Phase 2G film (`BUENA IDEA_MALA EJECUCIÓN`, play-once), not the Phase 2F hero                                                                                                                     | Treated as a request about the 2G film; both voiced sources audited (§5)                                                               |

Found in the second documentation pass (2026-09-28):

| #    | Where                                                                                                    | What it said                                                                                                                                      | What the repository shows                                                                                                                                         | Resolution                                                                         |
| ---- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| D-10 | `PROJECT-STATUS.md` handoff; README docs table                                                           | A handoff dated **2026-10-23** ("visual content upgrade … same Draft PR #21, not merged")                                                         | That work was committed on **2026-09-23** (`5950b30`) and merged with PR #21 the same day (`c8eb579`). "23 OCTUBRE" is the name of the brief's folder, not a date | Re-dated to 2026-09-23 and marked merged; the folder name kept as the brief's name |
| D-11 | `PROJECT-STATUS.md`                                                                                      | "The next branch … is `feat/phase-2e-premium-media-motion-2026-09-22`"; "Phase 2E remains the active workstream"; "the next workstream is motion" | 2E, 2F and 2G are merged; 2H is the open branch                                                                                                                   | Rewritten                                                                          |
| D-12 | `README.md` routes table                                                                                 | Lists three `/preview` routes; "all three routes render through one shared web layer"                                                             | Four `/preview` routes; Team uses the same header, footer, sections, buttons and FAQ                                                                              | Team added; wording now "four"                                                     |
| D-13 | `PROJECT-STATUS.md` routes                                                                               | "Juanma has approved all three preview routes as visual bases"                                                                                    | The continuation approval covers Investment, Tax Advisory and Property Purchase; no equivalent record exists for Team (merged in PR #19)                          | Wording made explicit; no approval inferred for Team                               |
| D-14 | `docs/phase-2e-premium-experience.md`, `phase-2e-visual-content-upgrade.md`, `phase-2e-motion-system.md` | "NOT MERGED"; dates 2026-10-23                                                                                                                    | Merged with PR #21 on 2026-09-23                                                                                                                                  | Merge-state note added under each header; the original records are not rewritten   |

The Vercel previews of `main` were not inspected as part of this check; this phase's own preview is linked from the pull request.

---

## 1. Point-by-point matrix

Two columns classify each point:

- **Before 2H** — the state on `main` at `edc47f0`: **1** already done in 2F/2G · **2** partly done · **3** pending · **4** needed a decision or evidence from Juanma/Sarah.
- **2H outcome** — exactly one of:
  - **IMPLEMENTED** — done on this branch; only Juanma's visual review remains.
  - **IMPLEMENTED · PROPOSAL** — done on the page, but the copy is a `proposal` awaiting Sarah's approval (and competent review where flagged).
  - **PARTLY** — the buildable part is done; the rest is listed under its own outcome.
  - **DECISION PENDING** — nothing built; needs a choice from Juanma/Sarah.
  - **BLOCKED · ASSET**, **BLOCKED · EVIDENCE**, **BLOCKED · APPROVAL** — cannot be done until the named thing exists.
  - **NO CHANGE NEEDED** — already met.

The IDs in the last column point to §6 (A-…), §8 and §4.

### Investment (`REVISION WEB-investment.docx`)

| #   | Feedback                                                                                                                    | Before 2H | 2H outcome                 | Detail                                                                                                            |
| --- | --------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| I1  | "I like the gold, but it is in excess"                                                                                      | 3         | **IMPLEMENTED**            | Gold restraint on Investment only, existing tokens (§3.B). Whether to extend or revert it is H-04                 |
| I2  | "I miss the aquamarine green"                                                                                               | 4         | **DECISION PENDING**       | Aquamarine is not in the approved scoped web palette (2026-09-21). H-03                                           |
| I3  | "The video is too small"                                                                                                    | 3         | **IMPLEMENTED**            | Full container width from 1280px; 1024–1279px keep the shared two-column hero. New composition under review, H-05 |
| I4  | "It would be better if it worked without scroll"                                                                            | 3         | **IMPLEMENTED**            | Plays once, muted, independently of scroll (§2)                                                                   |
| I5  | "Properties. Data. Better decisions." lacks emotion                                                                         | 4         | **DECISION PENDING**       | Three options in §4; the template headline stays rendered until one is chosen. H-02                               |
| I6  | "Two paths. One goal: an investment built on evidence." lacks emotion                                                       | 4         | **DECISION PENDING**       | Three options in §4; kept on the page. H-02                                                                       |
| I7  | The "knowledge behind every decision" image must be at the start of the page                                                | 3         | **IMPLEMENTED**            | `AuthorityBand` moved after the trust strip; rendered once                                                        |
| I8  | "The face looks very unnatural, too many shadows"                                                                           | 4         | **BLOCKED · ASSET**        | No retouch or replacement without an approved file. A-01                                                          |
| I9  | "This text makes no sense" → _"An opportunity is only good if it fits your goals, not the goals of the person selling it."_ | 3         | **IMPLEMENTED · PROPOSAL** | Juanma's line in the journey band, with a simpler intro. G-01                                                     |
| I10 | The Home must be emotional (pain point, protection, smiling photos, presentation video, "what Sarah does for you")          | 4         | **DECISION PENDING**       | Out of this landing's scope; recorded for the future Home (§7). Needs an approved Home route and brief            |
| I11 | Financing section with UCI and Sabadell                                                                                     | 4         | **BLOCKED · EVIDENCE**     | Commercial relationship, public naming and regulatory wording unconfirmed (§7)                                    |
| I12 | Short renovations section                                                                                                   | 4         | **BLOCKED · EVIDENCE**     | Service scope and who delivers it unconfirmed (§7)                                                                |
| I13 | Some images and videos should take more space                                                                               | 2         | **PARTLY**                 | Done for the hero film (I3). Other bands unchanged pending Juanma's review of the hero, H-05                      |

### Tax Advisory (`REVISION WEB-Tax advisory.docx`)

| #   | Feedback                                                                                     | Before 2H | 2H outcome                 | Detail                                                                                                                                                                                                                                                                                                                                   |
| --- | -------------------------------------------------------------------------------------------- | --------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T1  | Hero copy liked; add the pain point — fear, consequences of poor tax work                    | 2         | **PARTLY**                 | One pain-point line in the tool band under the hero (**IMPLEMENTED · PROPOSAL**, tax review). A new hero lead is **DECISION PENDING** (§4); the hero headline and lead are unchanged                                                                                                                                                     |
| T2  | Put the purchase tax and costs calculator big, at the start                                  | 2         | **IMPLEMENTED**            | The entry point moved from after the calendar (2G) to directly under the hero, as a navy lead band; the only Purchase Tax entry on the page. The live link is **BLOCKED · APPROVAL** (B-01): "Link pending approval" until the Buyer System URL is confirmed. Nothing is calculated                                                      |
| T3  | Tax calendar: "very good idea"                                                               | 1         | **NO CHANGE NEEDED**       | —                                                                                                                                                                                                                                                                                                                                        |
| T4  | Report preview: lower the technical level                                                    | 3         | **IMPLEMENTED · PROPOSAL** | Plain-language panel titles, notes and decisions (§3.C); tax review kept                                                                                                                                                                                                                                                                 |
| T5  | "What you stop worrying about" is incomplete → "Todo lo que dejas en nuestras manos"         | 3         | **IMPLEMENTED · PROPOSAL** | _"Everything you leave in our hands."_; six items rewritten to match. Scope question S-01                                                                                                                                                                                                                                                |
| T6  | Change the face in the authority photo ("looks 80 years old")                                | 4         | **BLOCKED · ASSET**        | Same shared image as I8. A-01                                                                                                                                                                                                                                                                                                            |
| T7  | "Three files. Three avoided mistakes." → Juanma's full section                               | 3         | **PARTLY**                 | Title, subtitle, cards, "Illustration" badge and CTA **IMPLEMENTED · PROPOSAL**. The results ("Penalty avoided"…) and Juanma's affirmative line "Published with written client permission and verified figures" are **BLOCKED · EVIDENCE** (C-01): results shown as _proposed_ with value withheld, the permission line kept conditional |
| T8  | ITP on the off-plan purchase: a new home from the developer normally pays VAT + AJD, not ITP | 3         | **PARTLY**                 | Result reworded to be tax-neutral (**IMPLEMENTED · PROPOSAL**). Which tax the case carried — new build or resale off plan — is **BLOCKED · EVIDENCE** (C-01): needs the case file and competent tax review                                                                                                                               |

### Property Purchase (`REVISION WEB-property-purchase.docx`)

| #   | Feedback                                                                                                    | Before 2H | 2H outcome                                  | Detail                                                                                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | "The video should move without scroll" (hero, Sarah at the table)                                           | 3         | **IMPLEMENTED**                             | §2. The hero stays silent (P7 concerns the 2G film)                                                                                                           |
| P2  | "The buying process, handled as one file" → "Compra con total tranquilidad: nosotros coordinamos cada paso" | 3         | **IMPLEMENTED · PROPOSAL**                  | _"Buy with peace of mind: we coordinate every step."_ — "total" dropped: no guaranteed state                                                                  |
| P3  | "Buy in Spain without chasing the paperwork" → "Nosotros gestionamos el papeleo; tú eliges tu casa"         | 3         | **IMPLEMENTED · PROPOSAL**                  | _"We handle the paperwork. You choose your home."_ Legal review flagged; scope S-02                                                                           |
| P4  | The calculator is a great idea; give it more presence, at the start                                         | 2         | **IMPLEMENTED**                             | Purchase Tax moved from after the audience band to directly under the hero. Live link **BLOCKED · APPROVAL** (B-01). Real Cash Needed stays after the process |
| P5  | "A good idea can become a bad purchase" contradicts itself → "Lo que parece una gran oportunidad…"          | 2         | **IMPLEMENTED · PROPOSAL**                  | _"What looks like a great opportunity can hide a bad purchase."_ Same block; nothing duplicated                                                               |
| P6  | Replace the text with "El sueño cabe en un instante…"                                                       | 2         | **IMPLEMENTED · PROPOSAL**                  | §3.D; each service named is in scope on the page. Wording S-03                                                                                                |
| P7  | "Let's put the video with sound" (the 2G film)                                                              | 4         | **BLOCKED · APPROVAL**                      | Voice-over audited and transcribed; draft captions prepared, not served (§5). Nothing published until Sarah approves the line. V-01                           |
| P8  | Likes the navy blocks that break the aesthetic; the site feels "a bit dull"                                 | 1 / 4     | **NO CHANGE NEEDED** / **DECISION PENDING** | Blocks kept. "Dull" is a palette question, H-03                                                                                                               |
| P9  | Likes the Sarah Katerina table image block                                                                  | 1         | **NO CHANGE NEEDED**                        | —                                                                                                                                                             |

### Team (`REVISION WEB. Team.docx`)

| #   | Feedback                                                                                         | Before 2H | 2H outcome                 | Detail                                                                                                                                         |
| --- | ------------------------------------------------------------------------------------------------ | --------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| E1  | Review the site colours                                                                          | 4         | **DECISION PENDING**       | H-03. Gold restraint is on Investment only (H-04)                                                                                              |
| E2  | Hero photo: warmer, and big                                                                      | 3 / 4     | **PARTLY**                 | Bigger **IMPLEMENTED** (full container width from 1024px; H-05). Warmer **BLOCKED · ASSET** (A-02): no retouch without an approved edited file |
| E3  | "Different plans…" → "Objetivos diferentes. La misma revisión antes de firmar."                  | 3         | **IMPLEMENTED · PROPOSAL** | _"Different goals. The same review before signing."_                                                                                           |
| E4  | "Four functions…" → "Comprar una casa es fácil. Comprarla bien es otra cosa." + new introduction | 3         | **IMPLEMENTED · PROPOSAL** | Title and introduction in English                                                                                                              |
| E5  | Remove "The photographs show three people…"                                                      | 3         | **IMPLEMENTED**            | No photograph is attached to a name, every individual slot says "Portrait pending", and the group photograph keeps its own caption             |
| E6  | Group photo: low quality, warmer colours                                                         | 4         | **BLOCKED · ASSET**        | A-03                                                                                                                                           |
| E7  | A photo of each person next to their text                                                        | 4         | **PARTLY**                 | Labelled slots **IMPLEMENTED**; the photos are **BLOCKED · ASSET** (A-04): none exists for Elsa, Óscar or Igor                                 |
| E8  | Full names: Oscar Gonzalez, Igor Veselov                                                         | 3         | **IMPLEMENTED**            | _Óscar Gonzalez_, _Igor Veselov_. Accent on the surname **DECISION PENDING** (N-01)                                                            |
| E9  | "Remove this section" (_The buyer is the client._ with the office photograph)                    | 3         | **IMPLEMENTED**            | `IndependenceBand` and its nav item removed; the confirmed independence statement still answers the FAQ                                        |
| E10 | "Remove this image" (the wall sign with the gold ant)                                            | 3         | **IMPLEMENTED**            | Office-sign photograph removed from _After the keys_; the copy stays                                                                           |
| E11 | Closer, family feeling; a team that goes with you from start to finish                           | 4         | **DECISION PENDING**       | Copy options in §4; the photographs that would carry it are A-02–A-04                                                                          |

### Summary

| 2H outcome                                   | Points                                                      |
| -------------------------------------------- | ----------------------------------------------------------- |
| IMPLEMENTED                                  | I1, I3, I4, I7, T2, P1, P4, E5, E8, E9, E10                 |
| IMPLEMENTED · PROPOSAL (copy awaiting Sarah) | I9, T4, T5, P2, P3, P5, P6, E3, E4                          |
| PARTLY (buildable part done)                 | I13, T1, T7, T8, E2, E7                                     |
| DECISION PENDING                             | I2, I5, I6, I10, P8 ("dull"), E1, E11                       |
| BLOCKED · ASSET                              | I8, T6, E6 — and the asset parts of E2 (A-02) and E7 (A-04) |
| BLOCKED · EVIDENCE                           | I11, I12 — and the evidence parts of T7, T8 (C-01)          |
| BLOCKED · APPROVAL                           | P7 (V-01) — and the live links of T2, P4 (B-01)             |
| NO CHANGE NEEDED                             | T3, P8 (blocks), P9                                         |

Every implemented point also awaits Juanma's visual review on the preview; none is approved by this document.

---

## 2. §A — Hero videos: playback without scroll

**Before (2F):** `ScrubVideo` + `ScrubStage` on Investment, Property Purchase and Tax: the video never played; scroll drove `currentTime`, with a 60vh sticky runway on desktop.

**Now:** Investment and Property Purchase use a new primitive, `components/motion/HeroFilm.tsx`. Tax Advisory keeps the 2F scrub (its review asked for nothing about the video — decision H-01 below). The registry says which is which: `HERO_VIDEO.*.playback` = `'play-once' | 'scrub'`.

`HeroFilm` keeps everything 2F guaranteed and removes the scroll mapping:

| Condition                | Behaviour (verified in Chrome, production build)                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Motion allowed, JS on    | The cut (desktop or mobile, by media query) is attached after `load`; it plays once, muted, inline, while the frame is on screen; rests on its last frame |
| Scrolled away / back     | Pauses when the frame leaves the screen, resumes when it returns (measured: 2.62 s → paused → resumes → ended at 10.04 s)                                 |
| Tab hidden               | Pauses; resumes on return                                                                                                                                 |
| Control                  | Visible Pause / Play / Replay button, labelled "Pause/Play/Replay the hero film", keyboard operable, 2px solid focus ring with 2px offset (WCAG 2.2.2)    |
| `prefers-reduced-motion` | Nothing loads or plays; the final representative poster shows; the control offers playback (only the video is fetched on request)                         |
| No JavaScript            | Final poster with alt text; no control; no request for the video                                                                                          |
| Media failure            | Final poster laid over the frame; control retired (`data-hero-film="failed"`)                                                                             |
| Phone layout             | The frame sits below the copy; it starts when it comes into view (measured: playing at +3 s in view, ended at +12 s)                                      |
| Sound                    | None. Both cuts have no audio track (tested). No `autoplay`, `loop` or `controls` attribute                                                               |

**Derivatives re-made for playback** (the 2F scrub cuts carried a keyframe every 0.25 s, which playback does not need). H.264 High, yuv420p, `+faststart`, no audio, keyframe every 2 s, from the same immutable sources; the posters are the same frames, renamed:

| Hero              | Desktop (1280×720)   | Mobile                        | Before (scrub cuts)     |
| ----------------- | -------------------- | ----------------------------- | ----------------------- |
| Investment        | 3,408,121 B (CRF 25) | 1,835,620 B, 854×480 (CRF 25) | 7,821,655 / 3,349,768 B |
| Property Purchase | 1,450,679 B (CRF 23) | 813,572 B, 960×540 (CRF 24)   | 3,369,887 / 1,921,968 B |

The scrub cuts of these two heroes were removed. The Investment desktop cut is inside the 2–4 MB target it previously exceeded.

**Composition.** Investment's hero, from 1280px, puts the copy in one row (headline left; lead and actions right; script and signals below) and the film at full container width under it, with the snapshot card below the film at half width. In two columns, every gain for the film narrowed the headline to three lines and broke the CTAs (checked in screenshots at 1440 and 1024). Between 1024 and 1279px that row is too narrow, so the shared two-column hero stays. The film starts inside the first 1440×900 viewport, so it plays with no scroll. Below 1024px the shared composition is unchanged.

**Not confused with 2G:** the Property Purchase "Good idea, bad execution" film (`PlayOnceVideo`, mid-page) is unchanged in behaviour.

---

## 3. What changed, page by page

### 3.A Shared

- `components/motion/HeroFilm.tsx` (+ CSS) — §2.
- `components/web/BuyerToolRibbon.tsx` — `prominent` variant (navy, `h2` question, dark-surface focus ring) and `BuyerToolBand`, the ribbon as a band under a hero. Still resolved only by `resolveEntryPoint`; pending state unchanged.
- `components/web/TerritoryVisual.tsx` — optional `badge` (default "Schematic").

### 3.B Investment

- Hero: `HeroFilm`, full-width film (§2).
- `AuthorityBand` moved after the trust strip (I7).
- Journey title: Juanma's line, `proposal` (I9); intro rewritten to match: _"When the analysis shows it fits, the next questions are how to buy it well and what owning it will involve."_ (`proposal`).
- **Gold restraint** (I1), on this page only (`data-accent="restrained"`), light bands only, no token changed: section eyebrows and the small caps labels repeated in cards (card eyebrows, "Analysed / Main risk / Deliverable", case facts, indices) move from gold to the approved muted ink. Gold remains on CTAs, rules, icons, step numbers, charts and the script accents. Navy bands are unchanged.

| Pairing (text)                            | Ratio  | WCAG AA |
| ----------------------------------------- | ------ | ------- |
| `--sk-web-muted` on `--sk-web-ivory`      | 7.24:1 | pass    |
| `--sk-web-muted` on `--sk-web-ivory-soft` | 6.69:1 | pass    |
| `--sk-web-muted` on `--sk-web-white`      | 7.49:1 | pass    |
| previous: `--sk-web-gold-strong` on ivory | 5.56:1 | pass    |

### 3.C Tax Advisory

- Purchase Tax lead band under the hero (T2), with a pain-point line (`proposal`, tax review): _"Tax that is not looked at before signing is usually found later, when it is harder and dearer to put right. See what the purchase itself costs in tax, for your own case, first."_ The ribbon after the calendar is removed, so there is one entry.
- Report preview, plain language (T4), all `proposal`, tax review kept:

| Before                                                                                                     | After                                                                                             |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Your tax exposure                                                                                          | What Spain may ask of you                                                                         |
| Your position in one figure, and what it is made of.                                                       | One figure for the year, and what it is made of.                                                  |
| Annual tax calendar · When each obligation falls due                                                       | Your tax year · What to file, and when                                                            |
| Double taxation treaty · Which country taxes what, and how relief applies                                  | Tax in two countries · Which country taxes what, so the same income is not taxed twice            |
| Tax breakdown · Line by line, with the basis for each                                                      | Tax, line by line · Each amount, and where it comes from                                          |
| Where relief may apply between Spain and your country of residence, so the same income is not taxed twice. | Whether Spain or your home country taxes each income, and where relief may stop you paying twice. |
| Which line drives the total, and which obligations are worth reviewing first.                              | Which amount weighs most, and what to look at first.                                              |
| Scenarios and sensitivity to the assumptions                                                               | What changes if the assumptions change                                                            |

- "Everything you leave in our hands." (T5) with items: _Your Modelo 210 dates, kept in view · Checking the same income is not taxed twice · Reading and answering tax office letters · A fresh review every year, not last year’s filing copied · Knowing what you actually owe · The tax that comes with a purchase, before you buy._ Scope question S-01 for Sarah: whether answering tax-office letters is in scope.
- Cases (T7, T8), Juanma's copy in English: eyebrow _Real cases_; title _Three real cases. Three mistakes avoided._; subtitle _This is how we work. Each client’s details stay confidential until they authorise us in writing to publish them and the figures are verified._ (his line, with "in writing" and "the figures are verified" kept from the confirmed governance wording); badge _Illustration_; cards _Non-resident owner with a holiday let_ / _Non-resident owner with Modelo 210 outstanding_ / _Off-plan purchase_ with his texts; results _Penalty avoided_ / _Position regularised_ / _Taxes and costs planned_ as `unverified`, value withheld, and a visible line on every card: _Proposed result · evidence and tax review pending_; period _Year confidential_; CTA _Discover how we work_. The bottom line stays _Published only with written client permission and verified figures._ — Juanma's affirmative version is a statement of fact that no permission or verified figure yet supports.

### 3.D Property Purchase

- Hero: `HeroFilm` (P1); headline _Buy with peace of mind: we coordinate every step._ (P2).
- Purchase Tax lead band under the hero (P4), moment: _"Before anything else: what Spain charges on the purchase itself, for your own case."_ Removed from the audience band.
- Audience title: _We handle the paperwork. You choose your home._ (P3).
- Good-idea band (P5, P6): title _What looks like a great opportunity can hide a bad purchase._; body _A dream fits into a moment: a call, a flight, a set of keys in your hand. Making it real without surprises takes more: checking every detail, negotiating well and protecting your investment. That is what we take care of._; points title _Where an opportunity usually goes wrong_. Scope check of the body against the page: checking every detail → the Review point and the purchase file; negotiating → the Negotiation point and "Renegotiate" in _Before you sign_; protecting your investment → the buyer-side checks before commitment. "Protect" describes the work, not a guarantee (S-03).
- The navy blocks Juanma likes are untouched.

### 3.E Team

- Hero photograph at full container width from 1024px (E2); copy in one row above it.
- Titles and introduction (E3, E4), `proposal`: _Different goals. The same review before signing._ / _Buying a home is easy. Buying it well is something else._ / _Sarah looks at your goals, the real cost of the purchase and the tax side, so you can make one well-informed decision. She leads the whole advisory process and, when a case calls for it, works with specialist professionals._
- Disclaimer subtitle removed (E5, justification in §1).
- Profile cards open with a labelled "Portrait pending" slot (E7); names _Óscar Gonzalez_, _Igor Veselov_ (E8).
- `IndependenceBand` and its "Independence" nav item removed (E9); office-sign photograph removed from _After the keys_ (E10). `office-workspace.webp` and `office-sign.webp` are no longer rendered; their originals and derivatives stay in the repository.

---

## 4. COPY PROPOSALS awaiting a choice (not on the page)

The approved template headlines stay rendered until Juanma or Sarah picks one. English, brief, faithful to the feedback (emotion, the buyer's side, no promise of outcome).

**Investment H1** — now _Properties. Data. Better decisions._

1. _Invest in Spain with someone on your side._
2. _The right property. For the right reasons._
3. _Buy with your head. Enjoy it with your heart._

**Investment doors** — now _Two paths. One goal: an investment built on evidence._

1. _Already have a property in mind, or still looking? Either way, you are not alone._
2. _Two ways in. The same clarity before you commit._ (echoes the approved promise _Clarity before commitment._)
3. _Wherever you start, we start with your goals._

**Tax Advisory hero lead** (T1, tax review required) — now _Clarity for non-resident owners and foreign buyers…_

- _A tax mistake in Spain rarely shows on day one. It arrives later, as a letter, a surcharge or a penalty. Twenty years inside Spain’s tax administration help you see it coming, before you buy and while you own._ ("Twenty years" is confirmed, CR-002; the rest is a proposal.)

**Team, warmer tone** (E11)

- Hero caption: _The people who will be with you from the first call to the keys._
- Process title alternative: _From the first call to the keys, you always know who is with you._

---

## 5. Audio audit (originals, not the silent derivatives)

Method: `ffprobe` + `volumedetect`, then local ASR (`faster-whisper small`, CPU). Transcripts are `unverified` until a person listens.

| Source (`VIDEOS/`)                                            | SHA-256 (prefix) | Audio                            | Speech                                                                                                                                                                                                                                     |
| ------------------------------------------------------------- | ---------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4` (PP hero) | `cc4cad5a…`      | AAC stereo 32 kHz, mean −28.2 dB | **Yes**, English, 5.81–9.85 s: _"When you buy in Spain, know who's on your side. Sarah Katerina."_ (ASR wrote "Caterina")                                                                                                                  |
| `BUENA IDEA_MALA EJECUCIÓN.mp4` (PP 2G film)                  | `24b0e14b…`      | AAC stereo 32 kHz, mean −21.6 dB | **Yes**, English, 0–9.84 s: _"Sometimes changing your life starts with one call, then the horizon changes. Alicante, with the right person beside you the dream becomes a decision, and one day winter feels very far away."_ (matches 2G) |
| `TAX ADVISORY HERO REPLACEMENT.mp4` (Investment hero)         | `4dc31d8c…`      | AAC stereo 32 kHz, mean −27.8 dB | No speech (only a low-confidence ASR artefact)                                                                                                                                                                                             |

Draft captions for review: `docs/phase-2h/captions-draft/*.draft.vtt` — **not served** (not in `public/`), not linked.

**Why sound is not on the page:** both voice lines are unapproved brand statements in generated footage. Publishing sound needs (1) Sarah's approval of each line, (2) a human-checked transcript and WebVTT captions, (3) the rights/generation record for the footage (G-02), and (4) Juanma's choice of which film gets sound. Then the implementation is: an audio-bearing derivative, a `<track kind="captions">`, and an explicit "Sound on/off" button in the film control, muted by default. None of it is built now.

---

## 6. Assets needed from Juanma

| #    | Asset                                                                                                    | For                                          | What exists                                                                                                                                                                                                                                                                                           |
| ---- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A-01 | Authority portrait with a natural face (or an approved retouch of `sarahkaterina_Services_Especial.png`) | I8, T6 — shared by Investment, Tax, Purchase | Only the current generated editorial image. Candidates upstream: `IMAGENES NUEVAS/EQUIPO/EQUIPO_SARAHKATERINA4.png`, `…5.png`, `…6.png` (warm, smiling, authentic look) — they show one woman and are **not labelled** with a name; not used until Juanma confirms who they show and approves the use |
| A-02 | Warmer edit of the team hero (`EQUIPO_SARAHKATERINA2.png`)                                               | E2                                           | Original only; no retouch was made                                                                                                                                                                                                                                                                    |
| A-03 | Higher-quality or warmer group photograph (`EQUIPO_SARAHKATERINA1.png`)                                  | E6                                           | Original only                                                                                                                                                                                                                                                                                         |
| A-04 | One named individual portrait each for **Elsa Quirós Pérez, Óscar Gonzalez and Igor Veselov**            | E7                                           | None, for any of the three (not only Igor). Each file must name the person; nothing is assigned by appearance                                                                                                                                                                                         |

## 7. For the future commercial Home (not implemented)

From the Investment review, recorded so it is not lost: an emotional Home that names the pain point and offers protection from being misled and the best opportunities at the right price; photos of Sarah and the team smiling; a presentation video (the reserved `TU INVERSIÓN MI OBJETIVO`, 2G §2.2, or a new one); "What Sarah does for you"; **financing** ("we work with several banks, such as UCI and Sabadell, and can assess your financing without commitment") — requires confirmation of the relationships, their public naming and any regulatory wording; **renovations** ("short, but clear that we can take care of it") — requires confirmation of the service scope and who delivers it. None of these may appear on the service landings until confirmed.

## 8. Decisions and checks pending

| #         | Item                                                                                                                                    | Owner                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| H-01      | Tax Advisory hero: keep the scroll scrub or switch to `HeroFilm` like the other two                                                     | Juanma                   |
| H-02      | Choose Investment H1 and doors headline (§4) or keep the template's                                                                     | Juanma / Sarah           |
| H-03      | Palette: aquamarine and "the site feels a bit dull" (I2, P8, E1) — needs a palette decision upstream; tokens untouched                  | Juanma / Sarah           |
| H-04      | Gold restraint: keep on Investment, extend to the other landings, or revert                                                             | Juanma                   |
| H-05      | Hero compositions (Investment full-width film, Team full-width photograph)                                                              | Juanma                   |
| S-01      | Is answering tax-office letters in scope ("Everything you leave in our hands")                                                          | Sarah                    |
| S-02      | "We handle the paperwork": which paperwork the service handles vs coordinates                                                           | Sarah + legal            |
| S-03      | "Protecting your investment" wording                                                                                                    | Sarah                    |
| C-01      | Tax cases: written client permission, verified figures, tax review of each result; off-plan case: new build (VAT + AJD) or resale (ITP) | Sarah + tax professional |
| N-01      | Óscar's surname: "Gonzalez" as supplied, or "González"                                                                                  | Juanma                   |
| V-01      | Voice-over publication (§5)                                                                                                             | Sarah / Juanma           |
| D-05      | Delete the ≈ 10.6 MB of unreferenced 2F hero cuts                                                                                       | Juanma                   |
| A-01–A-04 | Photographs listed in §6 (authority portrait, warmer team hero, group photo, three named individual portraits)                          | Juanma                   |
| B-01      | Buyer System production URL: until it is confirmed every calculator entry stays "Link pending approval"                                 | Sarah / Juanma           |
| G-01      | Approval of every `proposal` string introduced or carried by 2G/2H                                                                      | Sarah                    |
| G-02      | Rights and generation record of the generated footage used in the heroes and the 2G film                                                | Juanma / Sarah           |
| CI-01     | **Resolved** — the CI runs for `9ee623a` and `551e058` executed and passed; only the first commit's run was never started               | —                        |

## 9. Validation

**GitHub Actions on PR #30.** It did not start for the first commit `a07b808` (run 36446539003): both jobs were not started — _"The job was not started because an Actions budget is preventing further use."_ — an account budget limit, not a code failure. The later runs executed and passed: `9ee623a` (run 36446708091, queued at 15:51 UTC, ran at 16:10) and `551e058` (run 36449311876) — "Lint, typecheck, test and build" and "Secret and env hygiene" both `success`. The failure shown for the first commit is therefore not a test result. The same checks were run locally:

| Check               | First pass (`a07b808`) | Documentation pass (2026-09-28)                    |
| ------------------- | ---------------------- | -------------------------------------------------- |
| `npm run lint`      | pass                   | pass (exit 0, no findings)                         |
| `npm run typecheck` | pass                   | pass (exit 0)                                      |
| `npm test`          | 258/258 (253 at base)  | 14 files, 258/258                                  |
| `npm run build`     | pass                   | pass (12 static pages, the four `/preview` routes) |

The documentation pass changed Markdown only; no component, content file, test or media changed. Prettier is clean on every file this PR touches (three older Phase 2E records are unformatted on `main` too and were left alone).

- Tests changed in the first pass because they protected exactly what the review changes, each rewritten to protect the new requirement: hero playback per registry entry and `HeroFilm`'s contract (muted, no autoplay/loop/controls attribute, no scroll reading, attached after load, pauses off screen and in a hidden tab, labelled control, final-frame fallback); Purchase Tax directly under the hero on Tax and Purchase, once, and nowhere lower; Team full names, pending portraits, removed blocks, FAQ keeps the independence claim; the protected-content hashes re-recorded for the three content files this phase changed.
- Browser QA (Google Chrome through Playwright, production build, first pass): 390×844 and 1440×900 on all four routes — horizontal overflow 0, one `h1`, `noindex, nofollow`, no console errors; 320, 768, 1024 and 1280px — overflow 0, one `h1`, no errors. Hero film states in §2. Evidence: `docs/screenshots/phase-2h/{before,after}/` and `qa-report.json`. Not repeated in the documentation pass, which changed no rendered file.

**Not verified:** Safari/iOS and Android devices; screenshots at 320 and 768px (only overflow was checked there); 200 % zoom; Lighthouse/CWV not measured; the transcripts are machine output; the Vercel preview was checked for deployment status only — it is behind Vercel SSO, so no page was loaded from it; GitHub Actions did not start for the first commit (budget); the later CI runs passed.

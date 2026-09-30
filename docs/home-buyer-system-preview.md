# Home preview and Buyer System links

**Status:** MERGED via PR #32 on 2026-09-29 · VISUALLY APPROVED BY JUANMA (visual only) · NEW COPY STILL PROPOSAL UNLESS MARKED · PREVIEW/NOINDEX · NO PUBLIC-DOMAIN LAUNCH

**Date:** 2026-09-29

**Route:** `/preview/home`

This is the editorial Home implementation, not a new numbered phase and not a
fifth service landing. It exists under `/preview`; `app/page.tsx` and `/` are
unchanged. It does not change custom-domain, DNS or indexation configuration.
The four 2H landings retain their separately recorded visual approval.

## 0. Current state — service discovery pass (2026-09-29, Juanma's precedence instruction; visually approved by Juanma)

Juanma's (project owner) precedence instruction of 2026-09-29 and the attached
"Home service discovery + fabric banner + editorial scroll motion"
specification govern this pass. Where they contradict later sections of this
record, **this section wins**; the superseded parts are marked in place.

**Publication record.** The visually reviewed working tree was
`feat/preview-home-buyer-tools` at `ce8edff`. It was copied to a separate
worktree for PR #32; 99 files were SHA-256 compared. The PR includes the
documented base-branch compatibility changes and contains no change to the
rendered result. PR #32 was squash-merged into `main` on 2026-09-29 as
`cacb09e25600617cd5a0ab00ef5a5b9cca62a419`. Its final PR-head Actions run
`36592785041` passed; the Vercel check on the merge commit also passed. The
Buyer System and strategic repository were not modified.

**Visual review record.** Juanma reviewed and visually approved this Home on
2026-09-29 on the local review server (`next dev` on port 3001, serving the
`feat/preview-home-buyer-tools` working tree at base `ce8edff`) at mobile and
desktop widths. Visual approval only: it is not a copy, legal or production
approval. The same content was merged from `feat/home-service-discovery-reviewed`
through PR #32; the only differences from the reviewed tree are listed in that
pull request (none affect a rendered page). The merge does not approve a
custom-domain launch, indexing or migration.

**Final composition (top to bottom).** Hero (promise, subhead, two actions,
film — rendered at first paint, no entrance animation) → "Whose side?"
statement + three confirmed facts → **What brings you to Spain?** (three
needs + one fabric banner + CTA) → three service chapters (Property Purchase,
Investment, Tax Advisory) → method → client voices (named) → **Team** as the
authority block → Buyer Tools → FAQ → final action → footer.

| Decision                   | Resolution                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gold thread                | Kept. **Strike-through removed**: the "Sellers / Developers / Agencies" struck words are gone; the thread now runs promise → decision → services → voices → Sarah (horizontal tie into her portrait) → next step. It only orients.                                                                                                                                                                                                                 |
| Discovery placement        | Opens the `#services` section, straight after the authority statement and before the chapters. It replaces the former "Four ways into one clearer decision" intro and the hero "Start with 01–04" route index, so no two equivalent selectors are stacked.                                                                                                                                                                                         |
| Needs                      | Three only: _I want to buy a home. / I want to invest. / I need tax clarity._ Default: buy. No Property Management, no "I already own", no fourth option.                                                                                                                                                                                                                                                                                          |
| Selector vs chapters       | The selector orients (need → service → proposition → "Start with …"); the chapters give each path's visual synthesis ("Explore …"). The chapters' former need lines were removed so no copy repeats.                                                                                                                                                                                                                                               |
| Team                       | Not a need. Moved out of the chapters into `HomeTeam`, after the voices: proof → the person.                                                                                                                                                                                                                                                                                                                                                       |
| Testimonials               | **Authorised by Juanma** with names and details (§7.2). Verbatim; no visible "anonymised", "unverified" or "pending" wording; no image paired with any quote.                                                                                                                                                                                                                                                                                      |
| Client-facing wording      | Removed from the visible Home: the `HOME PREVIEW · NOT PRODUCTION` strip, the footer "preview · noindex" chip, "controlled Home preview · not for publication", "while a direct contact route remains pending" and the voices status pill. Tab title changed from "home preview". **noindex/nofollow (metadata + `X-Robots-Tag`), the `/preview` route and the sitemap exclusion are unchanged.** The four landings keep their own preview strips. |
| Editorial reveal (level 1) | Three statements only: "Sarah is paid by one side of the table: yours.", "Objective. Evidence. Next move." and "Three buyers, three decisions made before signing." Not the H1, not the discovery title (it sits beside the fabric, level 2), not card titles.                                                                                                                                                                                     |

### 0.1 Service discovery copy (proposal unless marked)

| State  | User need             | Service label     | Proposition                                                                                    | Supporting copy                                                                                  | CTA                          | Destination                  |
| ------ | --------------------- | ----------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------- | ---------------------------- |
| buy    | I want to buy a home. | Property Purchase | Buy with peace of mind: we coordinate every step. (**confirmed**, Sarah-approved landing line) | From the first viewing to the keys, one connected file for international buyers.                 | Start with Property Purchase | `/preview/property-purchase` |
| invest | I want to invest.     | Investment        | Properties. Data. Better decisions. (landing H1)                                               | Financial modelling, due diligence and a tax overlay in one decision report, before the deposit. | Start with Investment        | `/preview/investment`        |
| tax    | I need tax clarity.   | Tax Advisory      | Spanish taxes, from the inside. (landing heading)                                              | Clarity for non-resident owners and foreign buyers, so you decide with confidence.               | Start with Tax Advisory      | `/preview/tax-advisory`      |

Section copy (proposal): eyebrow "Your starting point", title "What brings you
to Spain?", intro "Choose the sentence that sounds like you. Sarah turns it
into the right kind of guidance." Every proposition is condensed from its own
landing; no guarantee, return, saving or result is introduced.

### 0.2 Banner media

| State  | Asset (registry key)                                                              | Source / provenance                                                                                                                                    | Why                                                                                                                   |
| ------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| buy    | `homeDiscoveryBuy` → `public/media/graded/home-discovery-buy.webp` (120 KB)       | `IMAGES/HOME 29 SEPTIEMBRE/ChatGPT Image 23 sept 2026, 18_49_02.png`, byte-identical copy of the owner file in Downloads (SHA-256 `3C10EDCF60A548FE…`) | An adviser and a couple over a floor plan: buying a home, accompanied. Chosen once among three near-identical scenes. |
| invest | `homeDiscoveryInvest` → `public/media/graded/home-discovery-invest.webp` (148 KB) | `IMAGES/HOME 29 SEPTIEMBRE/01.webp`, byte-identical copy (SHA-256 `FBEA1F4123E13315…`); not the unrelated Codrops demo file of the same name           | An asset/opportunity without text, no financial cliché.                                                               |
| tax    | `advisorClientOne` (existing, graded)                                             | `IMAGES/MEJORAS 23 OCTUBRE/SARAH ASESORA CLIENTE 1.png`                                                                                                | One-to-one explanation over a document: clarity. Also used on Property Purchase (a different page).                   |

All three are **generated/illustrative**: each banner prints "Editorial
illustration" / "Illustrative development" on the image, alt text never names
a client, and none sits beside a testimonial. Generation, likeness and model
release records are still missing for production. Derivatives use the
repository's `sk-editorial-v1` grade (applied to these two ids only, so no
other graded file was regenerated) and are listed in both manifests.

Owner candidates not used: `18_33_36` (near-duplicate of the chosen scene),
`18_43_20` (= `SARAH ASESORA CLIENTE 2.png`, already `advisorClientTwo` on
Investment), `Property Purchase Remote purchase completed.png`,
`Investment Apartment for letting.png`, `22_56_51` (= `Investment Refurbished
villa.png`) and `23_57_26` (= `Property Purchase Fiscal exposure
identified.png`) — all carry embedded interface text ("Net return model",
"Decision: proceed after renegotiation", "Ownership taxes in context"…) that
is illegible on a phone and reads as an outcome; `22_39_18` (territory map)
carries the logo, embedded copy and place names the repository prohibits
(Altea, Calpe). Originals stay where they are; nothing was duplicated.

**Asset gaps:** consented photography of real buyers (with release) or of
Sarah with a real client; a clean colour photograph of Sarah without baked-in
text; generation/likeness records for every generated person; identity and
rights approval for the Home film's likeness.

### 0.3 Architecture

- **Reused unchanged:** `banner/fabric.ts` (physics/WebGL) and
  `banner/paint.ts` (DOM → texture painter).
- **Extracted:** `banner/FabricStage.tsx` — the engine lifecycle, input
  (pointer, touch `pan-y`, keyboard), fallback, reduced-motion and GPU-loss
  handling moved **verbatim** out of `FabricBanner.tsx`. It takes the
  composition as children. One opt-in addition, `settleAfterMs`: the cloth
  only runs for that window after something moved it, then holds still (the
  engine otherwise keeps a faint idle "breathe"); unset, behaviour is
  identical.
- **Buyer Voices protected:** `FabricBanner.tsx` is now only its testimonial
  composition on the stage, with the same DOM, classes, `changeKey={slot.id}`
  gust, video and pause control. The one CSS change is the "composition hides
  when the cloth is live" selector, now keyed on `[data-fabric-surface]`
  instead of the testimonial class (same visual result).
- **Home:** `HomeServiceBanner.tsx` — own content model (`discovery.states`
  in `content/en/home.ts`), no testimonial types, one `FabricStage` (one WebGL
  context), tabs because one selector controls one panel.

### 0.4 Performance record (Lighthouse 13.5.0, mobile)

Configuration: `/preview/home`, production build in an isolated copy served by
`next start`, headless Chrome stable, `--form-factor=mobile`, 412×823 @1.75
(Moto G Power UA); "simulate" = Lighthouse default simulated throttling
(150 ms RTT, 1.6 Mbps, 4× CPU); "devtools" = the same values applied as real
throttling. Medians. Lab data, not field Core Web Vitals.

| Run                                              | n   | Perf | FCP    | LCP    | TBT   | CLS   |
| ------------------------------------------------ | --- | ---- | ------ | ------ | ----- | ----- |
| Before this pass (simulate)                      | 5   | 87   | 1.81 s | 3.92 s | 49 ms | 0.022 |
| Hero entrance removed (simulate)                 | 5   | 92   | 1.96 s | 3.14 s | 2 ms  | 0     |
| Experiment `inlineCss` (simulate) — **rejected** | 5   | 92   | 1.66 s | 3.21 s | 28 ms | 0     |
| **Final (simulate)**                             | 5   | 91   | 1.81 s | 3.23 s | 34 ms | 0     |
| **Final (devtools throttling)**                  | 3   | 95   | 2.35 s | 2.35 s | 47 ms | 0     |
| Reference: Investment landing (devtools)         | 3   | 91   | 2.34 s | 2.99 s | 89 ms | 0     |

What changed and why: the hero H1, lead, actions and poster no longer run the
shared entrance (rise + clip-path unveil with delays), which had held the LCP
poster's render ~330 ms after its load (now ~100 ms) and caused the 0.022 CLS.
The poster keeps `priority` (eager, high fetch priority); the video still
waits (`preload="none"`).

Why the simulated LCP stays above 2.5 s: (1) **eight separate render-blocking
CSS chunks** (per-component CSS modules; ~300 ms each in the simulation) gate
first paint; (2) the simulator's pessimistic graph includes the ~150 kB of JS
requested before the poster paints (the Home's First Load JS is 154 kB; +12 kB
for the discovery selector — the fabric engine itself stays a separate
on-demand chunk). Inlining all CSS (`experimental.inlineCss`) was tested in
the copy only: the HTML grew to 507 kB and LCP did not improve, so it was not
applied. The real-throttling run reaches LCP 2.35 s. Consolidating the
render-blocking CSS is a site-wide build decision (it also changes `/` and the
landings) and is left for approval.

## 1. Evidence reviewed

- Repository governance, Phase 2 visual/motion/media records, Buyer System
  contract, claims matrix, 2G Home proposal and the four 2H captures.
- The strategic repository was read from `origin/main` where documents absent
  from its checked-out working tree still exist. That repository was not
  changed.
- The current public site was inspected only as evidence of what is online. Its
  Group/VITA narrative, metrics, testimonials, economic outcomes and contact
  claims were not treated as approved source copy.
- Buyer System was inspected read-only. Its verified production origin and
  routes are recorded below; no calculator code or formula was copied.

## 2. Creative direction — "the advisory thread" (2026-09-29, PROPUESTA)

> **Partly superseded by §0 (Juanma, 2026-09-29):** the thread stays; the strike-through of sellers/developers/agencies was removed and the hero route index replaced by the discovery section.

**Idea.** The Home is built on one line Sarah herself approved (Team chapter
body, `REVISION WEB. Team.docx`): _Sarah holds the advisory thread together._
It becomes the page's single visual system: one gold hairline starts with a
dot beside the promise, underlines "Clarity", runs down the page margin
through all four chapters, strikes through the parties who do not pay Sarah,
ties horizontally into her portrait and ends with a dot at the next step.

**Perception shift.** From "another premium Costa Blanca property site" to
"someone sits on my side of the table and keeps everything connected". The
emotion aimed for is relief and orientation, not aspiration.

**Why it is Sarah's and not a template.** Real-estate templates sell the
property; this page draws the buyer's decision. The thread is literally her
approved role, the strike-through restates only the confirmed independence
decision (no remuneration from sellers, developers or agencies), and the only
vertical frame and only person on the page is Sarah — every other frame is a
wide, top-anchored property frame.

**Expression.**

| Layer       | Decision and reason                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typography  | Canonical Fraunces/Inter only. The H1 is stacked word by word; each chapter opens with the visitor's need set in the italic quote style, so the page "speaks" in the buyer's voice before it speaks in Sarah's.      |
| Composition | Four chapter grammars in one system: 01 panoramic frame then decision; 02 question first, frame bleeding off the right edge; 03 wide need line over copy + frame; 04 vertical portrait with the thread tied into it. |
| Imagery     | One distinct asset per chapter, no repetition; wide frames are letterboxed/scaled from the top so embedded descriptors never show.                                                                                   |
| Rhythm      | Ivory → white statement → ivory → white/navy/ivory-soft/navy-soft chapters → method → client voices → navy tools → FAQ → navy close.                                                                                 |
| Motion      | The thread draws with the reader (tip fixed at mid-viewport), strikes and tie draw as they arrive, chapter nodes appear on the line; everything else uses the shared reveal family. Details in §8.                   |

Directions explored internally and rejected: a sticky chapter index (a sticky
rail over alternating navy/ivory bands cannot keep contrast, and duplicates the
navigation); a full-bleed cinematic hero with text over the film (hurts
legibility and would turn a likeness whose rights are pending into the brand's
face); a WebGL/scroll-scrubbed "fly-through" (heavy, and the approved assets
are stills with embedded text, not a world to fly through).

### 2.1 References consulted (2026-09-29)

Awwwards' public evaluation page was consulted on 2026-09-29
(<https://www.awwwards.com/about-evaluation/>): Site of the Day weights are
**Design 40 % · Usability 30 % · Creativity 20 % · Content 10 %**, judged by a
minimum of 18 jury members with outliers removed; SOTD sites scoring above 7
from the developer jury get a Developer Award.

| Reference (Awwwards page, consulted 2026-09-29)                                      | Recognition and published jury average (D/U/C/Ct) | What it contributes, and what Sarah takes from it without copying                                                                                                        |
| ------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ERA Residence — <https://www.awwwards.com/sites/era-residence>                       | SOTD 2026-08-31 · 7.61/7.30/7.73/7.53             | Calm Mediterranean photography and one repeated CTA. Taken: restraint and a single clear action per section. Not taken: a developer's "sell the unit" narrative.         |
| AI in Design Report 2026 — <https://www.awwwards.com/sites/ai-in-design-report-2026> | SOTD 2026-08-26 · 7.66/7.21/7.14/7.38             | A report turned into an editorial experience where data and motion share one language. Taken: one motion language tied to meaning (the thread), not per-section effects. |
| Sobha Privy Collection — <https://www.awwwards.com/sites/sobha-privy-collection>     | SOTD 2026-09-23 · 7.41/7.09/7.63/7.53             | Luxury real estate with WebGL/3D. Used as a counter-reference: prestige technology is not needed to reach this band, and would cost mobile performance.                  |
| Realevate — <https://www.awwwards.com/sites/realevate>                               | SOTD 2026-09-27 · 7.41/6.88/7.28/7.34             | Investor-facing real-estate marketing, fullscreen + microinteractions. Its lower Usability score is the warning: motion must never hide the route to the next step.      |

Buyer-side competitors recorded upstream (Charfort, Costa Select — conflict
log C-06/C-09) were reused as positioning context only: they compete on
volume ("165+ customers"); this Home competes on method and side-of-the-table
independence, consistent with the 2026-08-05 decision that Sarah's proof is
the published methodology.

## 3. Editorial structure

> **Superseded by §0 (Juanma, 2026-09-29)** for the order and the Team/voices placement. Kept as the record of the previous pass.

The implemented order is:

1. shared navigation, then a mobile-first hero with `Clarity before
commitment.`, two real actions, the Home film and a direct four-route index
   ("Start with 01–04") so no visitor has to scroll to find their service;
2. **One side of the table** — the struck-through parties and the statement
   "Sarah is paid by one side of the table: yours." beside the three confirmed
   trust facts (replaces the former trust strip and the FAQ's seller question,
   which now said the same thing twice);
3. four visual editorial chapters in the approved order: Property Purchase,
   Investment, Tax Advisory and Team, each with one specific route action (the
   image is also a pointer target for the same route, kept out of the tab
   order and accessibility tree);
4. a condensed three-step decision method and professional boundary;
5. **In their words** — three client voices. In this superseded pass,
   display remained preview-gated; current owner authorization is recorded
   in §7.2.
6. the two verified Buyer System experiences as microconversions;
7. buyer-objection FAQ (thread carried through a wrapper; component unchanged);
8. contextual final action and a Home-specific footer linking the four pages,
   the two verified tools and real Home sections (now including `#voices`).

**Funnel (updated 2026-09-29, night):** the audited booking calendar, WhatsApp,
phone and email now exist, so the Home has a short Contact band (`#contact`)
linking to `/preview/contact` — see `docs/contact-page.md`. The earlier
"no contact destination" limitation is superseded.

The 2026-09-29 premium pass replaces the earlier BUY / INVEST / OWN cards,
standalone authority band and process-proof cards. Sarah now appears as the
fourth editorial chapter, so the approved portrait is not repeated and the
visitor reaches all four real destinations through the same visual grammar.

Internal review language formerly shown in the page (evidence gaps and missing
Spanish-route notes) now lives in this record. That earlier version still
showed a review banner; §0 records its removal from the Home while preserving
the technical preview/noindex boundary.

### Shared navigation decision — approved 2026-09-29

The Home and all four service/team previews now consume
`content/en/site-navigation.ts`: Home, Property Purchase, Investment, Tax
Advisory and Team. The shared header uses `Buyer Tools` as its primary action
and exposes only Purchase Tax and Real Cash Needed through the existing
adapter. Desktop uses an accessible two-tool chooser; mobile places the same
two governed links in the focus-trapped menu. No Insights or language control
is rendered. (Contact was added on 2026-09-29 once it had working destinations —
`docs/contact-page.md` §6.)

Navigation QA is recorded in
`docs/screenshots/unified-navigation-2026-09-29/qa-report.json`: the five routes
passed at 320, 390, 1024 and 1440 px (20 combinations), with one H1, no
horizontal overflow, no broken anchors, no unexpected failed requests and no
console, page, CSS or script errors. Mobile focus entry/wrap, Escape, focus
return and 44 px targets passed; the desktop chooser passed expansion, Escape
and focus return. Review captures at 390 and 1440 live beside the report.

## 4. Copy and claim status

New 2026-09-29 copy, all **proposal**: route index label "Start with", side
statement eyebrow "Whose side?" and "Sarah is paid by one side of the table:
yours." (restates the confirmed independence decision), voices title "Three
buyers, three decisions made before signing." and its disclaimer. The struck
words are exactly the three parties named in the confirmed decision.

- **Approved:** `Clarity before commitment.`
- **Confirmed fact:** paid only by the buyer/client; no remuneration from
  sellers, developers or agencies.
- **Approved with condition:** `Twenty years inside Spain's Tax
Administration, now on your side.` The exact registered wording is retained.
- **Proposal:** every new Home-specific headline, explanation, CTA, FAQ answer
  and footer description. Passing automated QA does not approve this copy.

Subhead options for Sarah/Juanma review, all **PROPUESTA**:

1. Current: “See the property, the full cost and the tax questions together —
   before you commit.”
2. “Independent buyer-side guidance for international buyers in Spain — one
   decision across the property, purchase costs and tax.”
3. “See the property, the full cost and the tax questions together — before
   you commit.”

CTA options for review, all **PROPUESTA**:

| Role      | Current                  | Alternatives                                |
| --------- | ------------------------ | ------------------------------------------- |
| Primary   | Find your starting point | Choose where to start · See the four routes |
| Secondary | Use Buyer Tools          | Use a buyer tool · Start with the numbers   |

No financing, renovation, Property Management, VITA Host, Group, client-count,
booking, contact or legal-entity claim is rendered. The only results shown are
the three client quotes, verbatim and authorised by Juanma (§7.2); none is
lifted into a headline, metric or brand statement.

## 5. Buyer System boundary

The adapter contract remains the source of truth. Both public entry points were
rechecked read-only on 2026-09-29 and returned HTTP 200:

| Evidence            | Result                                                               |
| ------------------- | -------------------------------------------------------------------- |
| Remote `main`       | `c197ed28e34aca1452a1303d78746330af149968`                           |
| Production origin   | `https://sarah-katerina-buyer-system.vercel.app`                     |
| `/`                 | HTTP 200 · Purchase Tax · linked                                     |
| `/real-cash-needed` | HTTP 200 · Real Cash Needed · linked                                 |
| `/asking-price`     | Deployed, but product status remains `NEXT — LIMITED GO`; not linked |
| Tax Exposure        | No route or experience; not rendered                                 |

Outbound links are produced by the existing adapter only when
`NEXT_PUBLIC_BUYER_SYSTEM_URL` is configured in controlled Preview. The code
contains no default origin and Production must keep the variable unset; without
it, links remain pending. Links carry no query string, buyer amount, personal
data or financial input. The typed `calculator_start` event remains attached
to the repository's no-op analytics adapter.

## 6. Home film record

`TU INVERSIÓN MI OBJETIVO.mp4` is integrated only in this controlled, noindex
preview. Its generated likeness, generation method, model/likeness permission
and full rights record remain **PENDING**; inclusion here does not approve them.

| Item              | Record                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Upstream source   | `Juanmaes83/sarahkaterina` · `VIDEOS DE MARCA/TU INVERSIÓN MI OBJETIVO.mp4` · git blob `a7cf919f149eb4d5f91c7ed50b9c413b2e22eaa6`                                |
| Local source copy | `VIDEOS/TU INVERSIÓN MI OBJETIVO.mp4` · 7,571,748 B · SHA-256 `60BC8287CC76CBB3E321F8778C2427BF5ED4B366DF270FB2DCEAFEECCF2A77C0`                                 |
| Source media      | H.264 High · 864×496 · 24 fps · 10.05 s · AAC stereo 44.1 kHz; no speech detected                                                                                |
| MP4 derivative    | `public/media/video/home-investment-objective.mp4` · 716,230 B · SHA-256 `43CE7F50877BEBAF931A69D905EAB66688E026BDCA84DC0B896F2140E18DB9FC`                      |
| WebM derivative   | `public/media/video/home-investment-objective.webm` · 909,696 B · SHA-256 `ECAC57177C068B2F30F5F10B7250A0C64BC121722237CA7E54A1F30F955E96C6`                     |
| Poster            | `public/media/video/home-investment-objective-poster.webp` · final frame · 42,044 B · SHA-256 `3A220AE43C67A1C0E85314A7A8317EC62D58FA5D2A368E7C8629BB9662705DBD` |
| Served treatment  | Full frame, 864×496, no crop, silent derivatives, poster-first, `preload="none"`                                                                                 |
| Limitation        | Illustrative only; not evidence of buildability, permission, timing, budget, return, delivery or a completed project                                             |

The shared play-once controller provides an accessible play/pause control,
pauses out of view, keeps an immediate poster and does not request video under
reduced motion. Audio is absent from both served files and remains unavailable
until rights are confirmed.

## 7. Home authority image

Sarah approved `IMAGES/Sarah home_1.png`, including its embedded typography,
for the Home as communicated by Juanma on 2026-09-29. The original belongs to
`main` commit `d7b24eda176bdd78d7ad827c5f34248594734515`; it was fetched directly
from the repository's raw `main` URL because this branch predates that commit.
No branch switch or merge was used and no duplicate original was added here.

| Item               | Record                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Canonical original | `IMAGES/Sarah home_1.png` on `main` · 1122×1402 · 1,820,672 B                                                                                 |
| Source SHA-256     | `60CC3A7AF92C22D6A0B7380B589B2E85E9D47B674A0E2693BD94DA832E6BCFF7`                                                                            |
| Active derivative  | `public/media/home-sarah-authority.webp` · 1122×1402 · 128,870 B · SHA-256 `32BEE705AFB809D5F9AA2C86125AA1DA2757D435C835419ABEE25A21128A15A9` |
| Treatment          | Compression-only WebP; full frame; no grade, retouch, crop or facial alteration                                                               |
| Slot               | Home editorial chapter 04 · Team only                                                                                                         |
| Approval boundary  | Image and embedded text approved for this Home (Sarah); Home composition visually approved by Juanma 2026-09-29; publication not approved     |

The earlier identity-reference contact sheet remains at
`docs/screenshots/home-preview/sarah-portrait-review-contact-sheet.jpg` as an
audit record only. Neither earlier portrait is rendered on the Home now.

### 7.1 Premium Home media selection — 2026-09-29

The repository-wide audit covered `IMAGES/`, `VIDEOS/`, `public/media/`, the
media registry, manifests and the four live preview implementations. The Home
uses one distinct visual per chapter:

| Chapter           | Registered asset                                                  |        Served size | Treatment and reason                                                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------- | -----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Property Purchase | `assetPlan` · source `IMAGES/sarahkaterina_Services_10.png`       | 2000×1116 · 109 KB | CSS crop from the top at 16:6 excludes the embedded descriptor and keeps the complete-home plan visible. It communicates a property understood as a whole without reusing protected case artwork.             |
| Investment        | `assetResidential` · source `IMAGES/sarahkaterina_Services 8.png` |  2000×922 · 164 KB | CSS crop from the top at 16:6 excludes the embedded descriptor and keeps the transition between finished interior and architectural drawing. It communicates analysis without reusing a protected case image. |
| Tax Advisory      | `reportInterior` · source `IMAGES/sarahkaterina_contacto_2.png`   |  2000×1116 · 76 KB | CSS crop from the top at 16:6 removes the embedded descriptor from the rendered frame and keeps the quiet review environment. The source remains unchanged.                                                   |
| Team              | `homeAuthority` · source `IMAGES/Sarah home_1.png` on `main`      | 1122×1402 · 129 KB | Full frame, compression only. Sarah-approved for this Home including embedded text; no retouch or facial alteration.                                                                                          |

Relevant candidates deliberately not selected: `processPresentation` contains
unverified metrics, contact data and held Group naming; testimonial artwork has
no permission/evidence; `taxHero`, `assetPlan`, `assetArchitecture` and several
lifestyle pieces carry embedded descriptors not approved as Home copy;
`advisorClientOne/Two`, staged opportunity/property scenes and generated case
artwork still lack complete generation/model-rights records for production.
Unregistered `SARAHKATERINA_CONFIANCE.jpeg`, `SARAHKATERINA_EXECUTIVE.jpeg` and
`SARAHKATERINA_OFFICE_EDITORIAL.jpeg` were not assigned because no provenance or
Home approval record was found. Originals and the unused Home images on `main`
remain untouched.

### 7.2 Client voices — authorised testimonials

**Decision (Juanma, 2026-09-29):** the three testimonials, with the names and
details below, are approved and authorised by the clients for use. The Home
publishes them verbatim, marked `confirmed` in `content/en/home.ts` with that
source; the earlier anonymised/preview-only treatment of the same day is
superseded and no longer rendered or recorded as the current state.

| Quote (verbatim, abridged here)                                            | Attribution                                                            |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| "The diagnostic flagged a Modelo 210 miscalculation … Best €347 …"         | Pieter van den Berg — Amsterdam, NL · Apartment, Orihuela Costa · 2024 |
| "After three years of overpaying … recovered €1,840 from Hacienda … €95 …" | James & Sarah Whitfield — Brighton, UK · Villa, Torrevieja · 2025      |
| "I was ready to sign … net yield was 2.3%, not the 7% … €280,000 mistake." | Hans Schmidt — München, DE · Considering an Alicante apartment · 2025  |

- Wording and figures are exactly as supplied; nothing is shortened in the
  page, emphasised, or lifted into a headline, statistic or brand claim.
- Visible note: "Published with each client's permission. Every purchase is
  different; these are their experiences, not a promise of results."
- No image is paired with any quote; the illustrative scenes of the
  discovery banner never sit beside a testimonial.
- The strategic repository (read-only here) still lists its own testimonial
  evidence items (conflict C-08, backlog SK-028) as open; they were not
  modified and are not claimed closed. Keeping the written consents on file
  and the AGENTS.md §11 review of the tax/return figures in the quotes are the
  remaining pre-launch steps (§10).

### 7.3 Humanisation and media decision for this pass

The repository-wide audit (registry, manifests, `IMAGES/`, `VIDEOS/`, team
records and upstream imagery governance) found **no authorised photograph of
real clients, couples or families**. Upstream rules forbid presenting
generated people as clients (`brand-system/imagery/sarah-ai-image-governance.md`,
`imagery-photography.md`). The page is therefore humanised honestly by:
Sarah's approved portrait (the only person on the page, the only vertical
frame) and the clients' own words set typographically — no faces are paired
with the quotes.

| Asset                                                                    | Decision        | Reason                                                                                                                                                                                                 |
| ------------------------------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `homeAuthority` (`Sarah home_1.png`)                                     | **Kept**, 04    | Sarah-approved for the Home; full frame; tied to the thread                                                                                                                                            |
| `assetPlan`, `assetResidential`, `reportInterior`                        | **Kept**, 01–03 | Registered; new crops are top-anchored scales (`--sk-crop-scale` 1.06/1.3/1.55) that never show more than the 16:6 window previously verified to exclude the embedded descriptor; verified in captures |
| Home film `homeInvestmentObjective`                                      | **Kept**, hero  | Poster now `priority` (LCP); video still `preload="none"`; likeness/rights **PENDING**                                                                                                                 |
| `sk-real-1.jpg` (authentic Sarah, B/W)                                   | Not used        | Authentic but its production/Home approval is not recorded                                                                                                                                             |
| `advisorClientOne/Two`, `purchaseHero`, `processModel`, lifestyle scenes | Not used        | Generated/staged, no model release; next to testimonials they would read as the clients                                                                                                                |
| `sarahkaterina_testimonios_clientes.png`                                 | Not used        | Excluded in the registry: no permissions                                                                                                                                                               |
| Team group images                                                        | Not used        | Preview-only, human approval pending; belong to the Team landing                                                                                                                                       |

**Missing assets that would raise the Home:** consented photography of real
buyers (with a model release) or of Sarah working with a real client; a clean
high-resolution colour photograph of Sarah without baked-in text; identity and
rights approval for the Home film's likeness.

## 8. Motion and interaction (2026-09-29)

> **Updated by §0:** hero entrance removed (performance), strikes removed, route-index hover removed; added the editorial reveal on three statements and the fabric banner (level 2), which runs only for 2.6 s after a gust, a grab or a key and then holds still.

Native CSS and the existing primitives only; no library, no WebGL, no
scroll-jacking. Every duration is a `--sk-web-motion-*` token.

| Moment                  | Behaviour                                                                                                                                           | Fallback (reduced motion / no support / no JS) |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Hero entrance           | Shared `Entrance` choreography: copy rises, film frame unveils, route index lands last; the "Clarity" underline draws                               | Static, fully visible                          |
| **The thread**          | One segment per section, `animation-timeline: view()`, range `cover 50vh → cover calc(100% - 50vh)`: the tip sits at mid-viewport, so segments join | Drawn in full                                  |
| Side statement          | The three strikes draw left-to-right in sequence as the words reach the reading zone                                                                | Strikes drawn                                  |
| Chapter nodes           | Numbered node (≥1360 px) or dot appears on the thread as the chapter enters                                                                         | Visible                                        |
| Sarah tie               | Horizontal segment draws from the thread into her portrait                                                                                          | Drawn                                          |
| Chapter media           | Shared `unveil`; hover/focus on the chapter scales the frame by the hover-scale token                                                               | No scale, no shadow                            |
| Route index hover/focus | Gold rule draws under the link                                                                                                                      | Instant                                        |
| Film                    | Existing play-once controller: muted, visible pause/play, pauses out of view, no audio                                                              | Poster only, zero video requests               |
| Reveals                 | Shared `RevealOnScroll` on the reading-zone line                                                                                                    | Content visible                                |

## 9. Responsive and accessibility QA

Automated browser QA covers Home and the four approved routes at 320, 390,
768, 1024, 1280 and 1440 px (30 route/viewport combinations). The latest
machine-readable record is
`docs/screenshots/home-preview/premium-2026-09-29/qa-report.json`.

- HTTP 200, one H1, zero horizontal overflow, zero broken anchors and zero
  console/page errors at every route/width;
- every CSS and script response had the correct successful response/type;
- `noindex, nofollow` present in metadata and `X-Robots-Tag`.
- all visible interactive targets meet 44×44 px in the recorded run;
- all reveal content is visible after a deliberate viewport traversal;
- at 390 px the H1, lead and both actions fit fully in the first viewport;
- JavaScript-off retains the H1, poster and all content;
- reduced motion leaves the film at its poster, uses `preload="none"` and makes
  zero requests for either video derivative;
- the normal-motion film returned a successful HTTP 206 WebM range response,
  reached `readyState: 4`, played muted, paused from its visible control and
  paused when scrolled fully out of view; re-entry resumes only a film that was
  playing when it left the viewport;
- fast full-page traversal intentionally cancels in-progress video range
  requests when the page moves on; these `ERR_ABORTED` media cancellations are
  recorded separately from failures and produced no console/page error;
- Buyer System hrefs are the exact two approved destinations, returned HTTP
  200 on 2026-09-29 and contain no query parameters.

The screenshots of this superseded pass (and of the earlier `qa-2026-09-29`
run) are not committed; only their `qa-report.json` is. The current captures
are in `docs/screenshots/home-preview/discovery-2026-09-29/` (§0). Earlier
before/after captures remain as historical evidence.

### 9.1 "Advisory thread" pass — QA and measurements (2026-09-29)

Record: `docs/screenshots/home-preview/creative-thread-2026-09-29/qa-report.json`.

- Home + four landings at 320, 390, 768, 1024 and 1440 px (25 combinations):
  one H1, zero horizontal overflow, zero console/page errors, zero broken
  anchors, zero visible targets under 44×44 px, `noindex, nofollow` on all.
- Reduced motion: zero requests for either film derivative, `preload="none"`,
  film paused on its poster, all 12 thread segments and 3 strikes drawn, no
  text left at opacity 0 after traversal.
- JavaScript off: H1, 4 chapters, the 3 quotes, both
  Buyer System links and the poster present.
- Keyboard at 1440: 37 stops in a logical order (skip link → nav → Buyer
  Tools → hero actions → film control → route index → chapter CTAs → tools →
  FAQ → final actions → footer), each with the 2 px solid focus ring; the
  pointer-only chapter image links are never focusable.
- `npm run lint` and `next build` passed in an **isolated copy** of the tree
  (scratchpad, own `.next`), so the user's running `next dev` was not touched.
  `/preview/home` First Load JS: 142 kB.
- **Lighthouse 13.5.0**, mobile, simulated throttling, production build
  (installed only in the scratchpad, not in this repository):

  | Route             | Perf | A11y | BP  | SEO\* | FCP   | LCP   | TBT   | CLS   |
  | ----------------- | ---- | ---- | --- | ----- | ----- | ----- | ----- | ----- |
  | Home (after fix)  | 86   | 100  | 100 | 69    | 1.8 s | 4.0 s | 56 ms | 0.022 |
  | Investment        | 89   | 94   | 100 | 69    | 1.4 s | 3.8 s | 20 ms | 0     |
  | Property Purchase | 90   | 97   | 100 | 69    | 1.4 s | 3.6 s | 0 ms  | 0.002 |
  | Tax Advisory      | 92   | 94   | 100 | 69    | 1.4 s | 3.4 s | 10 ms | 0     |
  | Team              | 93   | 100  | 100 | 69    | 1.8 s | 3.1 s | 0 ms  | 0     |

  \*SEO fails only `is-crawlable`: the preview is noindex by design. Home is
  the median of three runs (85/86/86). Lighthouse identified the film poster
  as the Home LCP and flagged it `loading="lazy"`; `PlayOnceVideo` gained an
  opt-in `priority` prop (default `false`, landings unchanged) and the Home
  passes it. Resource load delay fell from 289 ms to 5 ms, but the simulated
  LCP stayed ~4.0 s because the remainder is element render delay (entrance
  unveil + render-blocking CSS under simulated slow 4G). A CDP lab run with
  4× CPU and ~1.6 Mbps measured Home LCP 1.98 s (median of 3). These are lab
  numbers, not Core Web Vitals field data.

This pass's screenshots are superseded and not committed; only its
`qa-report.json` is. Current captures: §0 and
`docs/screenshots/home-preview/discovery-2026-09-29/`.

## 10. Open approval and publication gates

- Copy: visual approval does not approve new Home copy; new wording remains
  proposal unless its record explicitly says otherwise. CTA wording can be
  refined during the next micro-improvement pass.
- Rights: generated likeness and film generation/usage record; audio rights if
  audio is ever reconsidered.
- Product/legal: Asking Price, any future calculator, contact/booking,
  financing/renovation wording, fiscal case evidence and professional-boundary
  copy.
- Testimonials: authorised by Juanma on 2026-09-29 (§7.2). Before public
  launch: keep the written consents on file and complete the AGENTS.md §11
  review of the tax/return figures in the quotes.
- Performance: simulated mobile LCP 3.2 s (> 2.5 s) — site-wide CSS
  consolidation needs a decision (§0.4).
- QA record for the approved version:
  `docs/screenshots/home-preview/discovery-2026-09-29/qa-report.json`,
  `banner-qa.json` and the captures beside them (full-page captures as JPEG,
  banner states as PNG).
- Assets: consented real-client photography; clean colour photograph of Sarah.
- Creative direction and Home composition: visually reviewed by Juanma on
  2026-09-29 at mobile and desktop widths. Further copy and visual
  micro-improvements remain part of the next iteration.
- Publication: production host, domain, legal pages, translation, indexation,
  sitemap and migration.

No language switch is rendered on Home because no working Spanish Home route
exists. A merge to `main` may trigger the configured Vercel Production-target
build; that infrastructure event does not authorise custom-domain publication,
indexation or migration. The Home remains under `/preview/home`, noindex and
outside the sitemap. The 2H approval of the four existing landings is unchanged.

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

---

## 12. Sarah's feedback of 2026-10-01: Sarah first, her own voice, desktop balance

**Source:** Sarah's comments relayed by Juanma on 2026-10-01, plus the files he uploaded to `main` the same day (`e782a6d`). Branch: `feat/sarah-home-voice-and-balance-2026-10-01`. Nothing here is visually approved: Juanma reviews it first, then Sarah.

### 12.1 Copy: before, after, status

| Where                   | Before                                                                                | After                                                                                            | Status                                                                                                                                                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero, first line (H1)   | "Clarity before commitment." (approved brand promise)                                 | "Let me help you feel at home in Spain."                                                         | **Proposal, not approved: SR-086.** Drafted from Sarah's direction ("Déjame ayudarte"; close, first person, no money or transaction). She said she would send three phrases; none was in the repository, the brief or the recent documents, so three were drafted (below) and the clearest is shown |
| Hero lead               | "See the property, the full cost and the tax questions together — before you commit." | "I help you see the property, the full cost and the tax questions together — before you commit." | Proposal (SR-001): first person only, meaning unchanged                                                                                                                                                                                                                                             |
| "Whose side?" statement | "Sarah is paid by one side of the table: yours." (rejected by Sarah)                  | "I’m on your side of the table."                                                                 | Sarah's own line ("Yo estoy a tu lado de la mesa"), in English. Recorded as `confirmed` with that source. SR-002 is closed. The rejected sentence appears nowhere on the Home                                                                                                                       |
| Service selector intro  | "… Sarah turns it into the right kind of guidance."                                   | "… I’ll turn it into the right kind of guidance."                                                | Proposal (SR-003): first person only                                                                                                                                                                                                                                                                |
| Hero film caption       | "From possibility to decision" / "Illustrative concept film. It does not promise…"    | Removed with the film                                                                            | —                                                                                                                                                                                                                                                                                                   |

**The three opening lines** (drafted, not Sarah's, not approved):

1. "Let me help you feel at home in Spain." ← shown
2. "I'll walk with you, every step of the way."
3. "You don't have to do this alone. Let me help."

"Clarity before commitment." remains the approved brand promise and still closes the Team hero.

**Not changed:**

- the three trust lines under the statement (the remuneration model and the 20-year credential, both confirmed);
- the testimonials;
- every other Home text: the third-person sentences about the team stay, since Sarah is not speaking in them;
- Tax Advisory, including its results.

### 12.2 The photograph Sarah rejected and its replacement

- **Removed:** `EQUIPO_SARAHKATERINA4.png`, Sarah standing on a terrace in a black-and-white dress, registered as `sarahTerrace` and served as `public/media/sarah-terrace.webp`. It was the only use of that file, in the **Property Purchase authority block**.
  - The registry entry and the served derivative are deleted.
  - The original stays in `IMAGES/EQUIPO/SARAH/`, untouched.
  - It is not used anywhere else: no other slot, background, card, thumbnail or fallback.
- **Replacement:** `IMAGES/SARAH_KATERINA_1_SARAH_CONFIANZA.png` (1122×1402, SHA-256 `AC09225865A670A82FB1CCDA4647133BE4CE0A037B6D6CCBE6CA084A654AD3F5`), registered as `sarahConfianza`.
  - Served as `public/media/sarah-confianza.webp`: a compression-only WebP at the source size, 95 KB, with no grade, retouch, crop or facial change.
  - **Property Purchase authority block,** the slot of the rejected photograph. The frame changes from 16:9 to 4:5 so the portrait is not cut.
  - **Home hero:** see §12.3. On phones the frame is square, keeping the face and hands; from tablet up it is 4:5.
- **Also uploaded but not used, as not requested:** `SARAH_KATERINA_2_SARAH_CONFIANZA.png` and `OFICINA_EXTERIOR_SARAH_KATERINA_1/2.jpeg` (the office front). The office photographs could carry a future office band or video poster.

### 12.3 The hero video Sarah asked for

**Inventory.** Every film in `VIDEOS/` was checked:

| File                                                                             | Resolution    | What it shows              | Origin                    |
| -------------------------------------------------------------------------------- | ------------- | -------------------------- | ------------------------- |
| `TU INVERSIÓN MI OBJETIVO.mp4` (the former Home hero)                            | 864×496       | villa on a plot, tablet    | generated                 |
| `BUENA IDEA_MALA EJECUCIÓN.mp4`                                                  | 1280×720      | journey to Spain           | generated                 |
| `SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4`                              | 1280×720      | a woman at a meeting table | generated                 |
| `TAX ADVISORY HERO REPLACEMENT.mp4` / `…SECTION.mp4`                             | 1920×1080     | aerials                    | generated                 |
| `MAPA CIUDADES OPORTUNIDADES.mp4`, `BIENES RAICES…`, `CONTROLA…`, `EXPERIENCIA…` | 864–1280 wide | maps, property             | generated                 |
| `kling_20260823_*` (two)                                                         | 1916×1080     | villa with the logo        | image-to-video, generated |

The owner folder `Downloads/SARAH KATERINA OFFICE/VIDEOS` also holds only generated clips and WhatsApp property videos, not in the repository.

**There is no real, authorised footage of Sarah in an office.** No video was fabricated, and no generative animation of her face was used.

**What the hero now shows:**

- Sarah's supplied photograph, as a still: `priority` load, served through `next/image` at the size each viewport needs.
- The generated villa film is no longer the hero. It stays registered but is not placed elsewhere: its likeness and rights record (G-02) are still open.
- The low quality Sarah saw had a cause: the film's source is **864×496**, scaled up to about 1,000 px wide at 1440. It cannot be fixed in CSS; only a better source can.

**Footage to record for the video she wants:**

- **Content:** Sarah, real and recognisable, in her office (Calle Bazán 10, Torrevieja) or a similar working setting. For example: at her desk reviewing a file, then looking up to camera; or walking in and sitting down.
- **Length and resolution:**
  - 8–12 s, steady (tripod or gimbal);
  - 3840×2160 or at least 1920×1080, 25/30 fps;
  - H.264 at a high bitrate, or ProRes as the source.
- **Framing:** landscape, with the subject centred so a 4:5 or 1:1 crop works on phones. An optional vertical take helps.
- **Light and sound:**
  - natural or soft light, no heavy grade or face retouch;
  - no audio needed: the site plays muted.
- **Records:**
  - written release from Sarah and from anyone else in shot;
  - a note of who filmed it and when;
  - a still taken from the same take, to use as the poster.

**Once it exists**, the hero can use the existing play-once primitive. It plays muted, pauses off screen, offers accessible controls and a poster fallback, respects reduced motion, and loads after the poster, which keeps a good mobile LCP.

### 12.4 Desktop: the empty left side

**Measured, not guessed.** A Playwright audit of the six routes at 1440 and 1920 measured, for every section, the empty space left and right of the visible content. It also measured, for every two-column block, how far the left column ends above the right one.

**What it found:**

- The container itself is centred everywhere (120 px each side at 1440).
- The imbalance came from two patterns:
  - blocks that ran off the right edge, on the Home only;
  - left columns much shorter than their right neighbour, which leaves an empty area in the left half.

**Fixed** (CSS only; no content, card or decoration added):

| Page              | Block                     | Before                                                                                           | Change                                                                                       |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Home              | Hero                      | Copy 0.78fr, film running off the right edge (at 1920: 360 px empty on the left, 0 on the right) | Copy and portrait share the container (1.15fr / 0.85fr), centred: 360 / 360 at 1920          |
| Home              | Investment chapter        | Frame running off the right edge                                                                 | Kept inside the container                                                                    |
| Contact           | Formats                   | Photo 467 px tall beside an 882 px list (416 px empty on the left)                               | 4:5 frame, still sticky while the list scrolls: gap 299 px, and the photo follows the reader |
| Property Purchase | "We handle the paperwork" | Copy at the top of a 674 px image (363 px empty under it)                                        | Copy vertically centred                                                                      |
| Property Purchase | Authority                 | Landscape frame, copy at the top                                                                 | 4:5 portrait, both columns centred                                                           |
| Investment        | Authority                 | Photo shorter than the copy (209 px empty under it)                                              | Centred against the copy (Tax shares the rule)                                               |
| Investment        | Scenarios                 | Chart card 312 px at the top of a 643 px column                                                  | Centred                                                                                      |

Mobile keeps its single column, and every change applies from tablet or desktop widths only. Before/after captures and the QA report are in `docs/screenshots/sarah-home-voice-2026-10-01/`.

---

## 13. Sarah's annotated Home review: REVISION WEB-HOME.pdf (2026-10-01)

**Source of truth:** `REVISION WEB-HOME.pdf`, Sarah's eleven annotations on `/preview/home`, uploaded to the repository root on 2026-10-01 (`1ebe89f`; SHA-256 `69ead599e1fce5ff2b4978d02d7e39ccb4fa78d4367e0e70d22c645edaa3ee62`). Her screenshots were taken through the browser's Spanish page translation, so the English lines they show were matched to the source by meaning.

**Branch:** `feat/home-pdf-review-2026-10-01`. It is built on `feat/sarah-home-voice-and-balance-2026-10-01` (PR #37, §12, not merged) and carries its photograph replacement and desktop balance.

**Not visually approved.** Juanma reviews first, then Sarah. The English translation of her lines is also open for her (SR-087).

### 13.1 The eleven points

| #   | Sarah's note                                                                                                                                   | Applied                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Menu labels and logo too small                                                                                                                 | Shared header, every route. **Logo:** 32 → 48 px tall on phones and tablets, 48 → 64 px from 1100. **Header:** 80 px tall from 1100. **Menu labels:** 14 px up to 1279, body size (16 px) from 1280, lead size (19–20 px) from 1360, with 32 px between labels. The underline moves down with the labels so it never crosses a word. Measured on the six routes from 320 to 1920: one row, no wrapping, no overlap, no overflow. The mobile menu is unchanged |
| 2   | A video of her in an office, in the mood of the AI photo she likes                                                                             | **Blocked: no real footage exists** (§13.3). The hero keeps her supplied photograph as a still                                                                                                                                                                                                                                                                                                                                                                |
| 3   | Hero copy: a short, direct, emotional introduction in the first person, with her text                                                          | New section "Who I am" (`#about`) straight after the hero, carrying **her whole text** in English (§13.2)                                                                                                                                                                                                                                                                                                                                                     |
| 4   | No money or payment; "Mi trabajo es estar en tu lado de la mesa en todo momento"; remove "no remuneration from sellers"                        | "My job is to be on your side of the table, every step of the way." The three lines beside it are removed from the Home: "Paid only by the buyer or client.", "No remuneration from sellers, developers or agencies." and the twenty-year line, which her introduction now tells. No other remuneration wording replaces them                                                                                                                                 |
| 5   | "Necesito claridad en materia fiscal" → "necesito entender qué voy a pagar tanto en gestión como en impuestos"                                 | Third need: "I need to understand what I’ll pay, in fees and in taxes." It still opens the Tax Advisory card                                                                                                                                                                                                                                                                                                                                                  |
| 6   | Property Purchase title unclear → "Te acompañamos desde la primera duda hasta que recibes las llaves, con toda tu documentación centralizada." | "We’re with you from your first question until you get the keys, with all your paperwork in one place." The Property Purchase page itself is not touched                                                                                                                                                                                                                                                                                                      |
| 7   | Investment title → "Tu sueño merece algo más que una bonita foto: verificamos todo antes de que des el paso."                                  | "Your dream deserves more than a pretty picture: we check everything before you take the step." See the scope note in §13.4                                                                                                                                                                                                                                                                                                                                   |
| 8   | "La imagen me encanta": new Team title, text and button                                                                                        | Her title, text and "Meet my team →"; the composition and the portrait (`homeAuthority`) are kept. The photograph replaced after the most recent feedback is the terrace one; §12.2 records that swap                                                                                                                                                                                                                                                         |
| 9   | Remove the questions block                                                                                                                     | The Home FAQ ("The questions that change the next step.") is gone, with its footer anchor. The landing pages keep their FAQs                                                                                                                                                                                                                                                                                                                                  |
| 10  | New closing copy and buttons; several BOOK A CALL linked to her Calendly                                                                       | Her title, text and two buttons. **Button 1** goes to the service selector on this page (`#services`). **Button 2** goes to the Purchase Tax and Real Cash Needed entries on this page (`#tools`), which open the Buyer System with no data in any URL. Three "Book a call" buttons: hero, after her introduction and the contact band (§13.5)                                                                                                                |
| 11  | "Llamaal +34 647 754 589" typo                                                                                                                 | The English source was "Call +34 647 754 589", rendered as three text nodes. Chrome's page translation joined them into "Llamaal". The link text is now **one text node** (the WhatsApp link too). The number and the `tel:` link are unchanged. No "Llama!" or "Llamaal" string exists in the code                                                                                                                                                           |

### 13.2 English translation of her text

**Introduction (point 3).** Every sentence is kept. Only the eyebrow ("Who I am") and the heading ("I’m Sarah Katerina.") are not hers; both are open as SR-087.

| Her Spanish                                                                                                                                                                                                                                                                        | On the page                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Durante veinte años fui directiva de oficina en SUMA Gestión Tributaria, el organismo público que gestiona los tributos locales en la provincia de Alicante. Desde ese lado del sistema revisé la documentación de miles de contribuyentes, y esa experiencia me enseñó dos cosas. | For twenty years I was an office director at SUMA Gestión Tributaria, the public body that manages local taxes in the province of Alicante. From that side of the system I reviewed the paperwork of thousands of taxpayers, and that experience taught me two things.                                                                                  |
| La primera: el sistema inmobiliario y fiscal español funciona, pero solo para quien conoce sus reglas.                                                                                                                                                                             | The first: the Spanish property and tax system works, but only for those who know its rules.                                                                                                                                                                                                                                                            |
| La segunda: el comprador extranjero casi nunca las conoce, y a menudo tampoco quienes le asesoran.                                                                                                                                                                                 | The second: foreign buyers almost never know them, and often neither do the people advising them.                                                                                                                                                                                                                                                       |
| Una y otra vez vi los mismos errores, perfectamente evitables: …                                                                                                                                                                                                                   | Time and again I saw the same mistakes, all of them avoidable: deadlines missed, taxes miscalculated, decisions taken without planning, and buyers left frustrated, paying more for something nobody had explained to them.                                                                                                                             |
| Por eso decidí dar un paso más. …                                                                                                                                                                                                                                                  | That is why I decided to go one step further. It was not about carrying on working inside the system, but about creating a service truly on the foreign buyer’s side: one that stays with them from the first viewing until long after the signing, explains every step clearly and protects them from the mistakes I have seen repeated so many times. |
| Porque detrás de cada expediente hay una persona, una familia y un proyecto de vida. Y eso es lo que de verdad importa.                                                                                                                                                            | Because behind every file there is a person, a family and a life plan. And that is what really matters.                                                                                                                                                                                                                                                 |

**Her other lines:**

| Point | Spanish                                                                                                                                                                                                                         | English                                                                                                                                                                                        |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4     | Mi trabajo es estar en tu lado de la mesa en todo momento.                                                                                                                                                                      | My job is to be on your side of the table, every step of the way.                                                                                                                              |
| 5     | Necesito entender qué voy a pagar tanto en gestión como en impuestos.                                                                                                                                                           | I need to understand what I’ll pay, in fees and in taxes.                                                                                                                                      |
| 6     | Te acompañamos desde la primera duda hasta que recibes las llaves, con toda tu documentación centralizada.                                                                                                                      | We’re with you from your first question until you get the keys, with all your paperwork in one place.                                                                                          |
| 7     | Tu sueño merece algo más que una bonita foto: verificamos todo antes de que des el paso.                                                                                                                                        | Your dream deserves more than a pretty picture: we check everything before you take the step.                                                                                                  |
| 8     | Una sola persona a tu lado, de principio a fin.                                                                                                                                                                                 | One person by your side, from start to finish.                                                                                                                                                 |
| 8     | Yo dirijo tu proceso personalmente. Cuando hace falta, me apoyo en un equipo de profesionales que conozco y en los que confío, para que tengas siempre el mejor asesoramiento sin tener que tratar con diez personas distintas. | I lead your process personally. When it’s needed, I rely on a team of professionals I know and trust, so you always get the best advice without having to deal with ten different people.      |
| 8     | Conoce a mi equipo →                                                                                                                                                                                                            | Meet my team →                                                                                                                                                                                 |
| 10    | ¿Por dónde quieres empezar?                                                                                                                                                                                                     | Where would you like to start?                                                                                                                                                                 |
| 10    | Cuéntame en qué punto estás y te mostraré lo que necesitas saber. O, si prefieres empezar por los números, calcula en un minuto los impuestos de tu compra y el dinero real que vas a necesitar.                                | Tell me where you are and I’ll show you what you need to know. Or, if you’d rather start with the numbers, take a minute to work out the taxes on your purchase and the real cash you’ll need. |
| 10    | Elige tu punto de partida →                                                                                                                                                                                                     | Choose your starting point →                                                                                                                                                                   |
| 10    | Calcula los costes de tu compra                                                                                                                                                                                                 | Calculate your purchase costs                                                                                                                                                                  |

**Hero lead (SR-001, proposal).** It condenses one sentence of her introduction into her voice: "I stay with you from the first viewing until long after the signing, and I explain every step clearly." It replaces the line she disliked. The hero H1 is still the open proposal SR-086 (§12.1); the PDF does not change it.

### 13.3 Video (point 2): blocked on footage

- **No new video was uploaded.** The repository's `VIDEOS/` folder is unchanged since the §12.3 inventory, and every film there is generated. None shows the real Sarah, and none was made or animated for this.
- **The photo she likes** is `homeAuthority` (`IMAGES/Sarah home_1.png`), which she describes as made with AI. It sets the mood she wants, but it is not a recording of her. Animating it into a "video" would present a performance she never gave, so it was not done.
- **The hero keeps her supplied photograph** (`sarahConfianza`) as a still. The villa film is not on the Home.
- **What is needed:** the footage specified in §12.3. A real take of Sarah in an office with that warm, book-lined mood would do: 8–12 s, at least 1920×1080, with her written release. The hero can play it with the existing component once it exists.

### 13.4 Scope note on "we check everything" (point 7)

The sentence is Sarah's and is published as she wrote it. "Everything" is bounded on the page itself:

- the chapter body lists what is reviewed (property, downside, costs, tax context and exit thinking);
- the process scope line states that legal, technical, planning, valuation and financing matters stay with the appropriate qualified professionals.

**For Juanma and Sarah:** if legal review finds "everything" too broad for the Investment engagement, the alternative to propose is "we check the essentials before you take the step". Not applied.

### 13.5 Book a call and Calendly

- **Configuration reused:** every booking button links to `NEXT_PUBLIC_BOOKING_URL` (`lib/contact/channels.ts`: HTTPS only, no query string). Without it, no booking button is rendered:
  - the hero falls back to "Use Buyer Tools";
  - the introduction falls back to "All contact options";
  - the contact band shows only its Contact link.

  No Calendly address is written in the code.

- **Locally** (`.env.local`), the value is Sarah's live booking page. Read-only check on 2026-10-01: it returns 200 and embeds **`https://calendly.com/sarahkaterina-info/30min`**. The three buttons open it in a new tab. Nothing was booked.
- **Blocked on Vercel:** `NEXT_PUBLIC_BOOKING_URL` is **not set in any Vercel environment** (`vercel env ls`, 2026-10-01). On the Preview the booking buttons are therefore not rendered; the fallbacks above show instead. Variables were not changed.
- **Decision for Juanma:** set the variable for Preview, and for Production later, to one of:
  - the booking page, as locally;
  - the Calendly link directly, which saves a step.

  The host stays out of the code either way.

### 13.6 Removed from the Home

- the FAQ band and its footer anchor ("Frequently asked questions"); the footer now links "Sarah Katerina" to `#about` and "Meet my team" to `#sarah`;
- the three trust lines beside the side statement;
- "Sarah holds the advisory thread together." / "Meet the team".

**Kept:** "From the first viewing to the keys, one connected file for international buyers.", the Property Purchase line in the selector (Sarah's point-5 screenshot shows it without a note). It shares the phrase she found unclear in point 6. Recorded here for her next look, not changed.

### 13.7 QA (2026-10-01, Google Chrome through Playwright, local production build)

Captures and report: `docs/screenshots/sarah-home-pdf-review-2026-10-01/` (`QA.md`, `qa.json`, `full/`, `sections/`, `before-after/`).

- **Home at 320, 390, 768, 1024, 1280 and 1440:**
  - one H1; no horizontal or header overflow; no header overlap or wrapping;
  - no console errors or failed requests; no broken images or anchors;
  - no review marks or SR codes;
  - every line from the PDF present and every replaced line absent; no FAQ section;
  - noindex in both the meta tag and the header; `/preview` out of the sitemap;
  - the hero photograph loads, focused at 50% 30%; no hero video;
  - keyboard focus visible; the mobile menu opens and closes with Escape.
- **Reduced motion and JavaScript disabled:** the introduction and every button are present and visible.
- **The other five routes** (shared header) at 390 and 1280: clean on the same checks.

---

## 14. Home hero film for review (2026-10-02)

**Source:** Juanma's instruction of 2026-10-02 and the two files he placed in this worktree. Branch: `feat/home-video-preview-2026-10-02`, from `main` at `6c2035b`.

**Not visually approved.** Juanma reviews it on the Vercel Preview at mobile and desktop widths first, then Sarah.

**Provisional and silent.** The film has no sound on this Preview. Its final voice-over **has not been produced yet**. No audio file is served, and none was recovered from the original.

This answers REVISION WEB-HOME.pdf point 2 (§13.3) for review. It does **not** close the footage questions in §12.3 (see §14.3).

### 14.1 Files

**Original (not committed).** `VIDEOS/SARAHKATERINA_HERO_VIDEO_WEB_BRANDING.mp4`, local only.

- 92,657,825 B (88.4 MiB) · SHA-256 `4289c168d5b3c60f7862753b33366d0bce8cf3440f88e8689f6a9311565a0518`.
- H.264 Main 2506×1440, 30 fps, 49.13 s, AAC stereo.
- Its container tags show an editor re-encode. Who made it, and how, is not recorded.

**Desktop cut (768 px and up), served.** `public/media/video/sarah-home-hero-review-silent.mp4`.

- Supplied ready-made by Juanma and served **unchanged**.
- 11,565,473 B · SHA-256 `abe15578d32ed22f26d05db330a104f62c3aae1ac41989ab677fbb7feae35855`.
- H.264 High 1880×1080, 30 fps, **no audio track**, `+faststart`.

**Mobile cut (below 768 px), served.** `public/media/video/sarah-home-hero-review-silent-mobile.mp4`.

- Made here from the original: `scale=960:552` (lanczos), libx264 High, CRF 26, `-g 60`, `-an`, `+faststart`.
- 3,539,167 B · SHA-256 `f0dfd19366f2ed6ad2c2719f2ae21bf081945a53ec445f6663837d86b0c86b69`.

**Posters.** `public/media/video/sarah-home-hero-review-{desktop,mobile}-{start,end}.webp`, WebP quality 78.

- `start` is frame 0 of each served cut (the pen signing); `end` is its final frame (the finished villa).
- `desktop-start`: 30,260 B · SHA-256 `06a7f7c8f22a50ad35daa8718e8a3f1e99cfefe8e1d93e93c8ebcdcaa83a4b72`.
- `desktop-end`: 91,350 B · SHA-256 `e640376f8541fb849f32dc19c928d95a20cc877496b500ea5393d15693698edc`.
- `mobile-start`: 12,980 B · SHA-256 `2b73b97fdeb30e3ed5a3ef8154f3f8c51525b90930fcc42ecbf53439f88695c4`.
- `mobile-end`: 39,838 B · SHA-256 `39fc49686578730e9aa96cbd468f45e1dd74b0ff2e09db2c7d36365df61b5e1f`.

**Why the original stays out of git:**

- At 92.7 MB it is about 4× the largest file in `VIDEOS/` (22.3 MB) and above GitHub's 50 MB warning size.
- Committing it would more than double the repository's 65 MB pack.
- The site never needs it: it is not copied to `public/` and not part of the Next.js bundle.

It is recorded by path and SHA-256 in `HERO_VIDEO.home`. It is kept locally, untracked, in `C:\Users\temp123\SARAHKATERINAWEBNUEVA-home-video-review\VIDEOS\`. **Juanma should keep a copy outside the worktree.**

**What the film shows (49 s), in order:**

1. A document is signed with a fountain pen.
2. A woman in a dark blazer speaks across a meeting table, in an office with the Sarah Katerina name on the wall.
3. Folders and pages carry the same name.
4. A floor plan is furnished step by step on a screen.
5. A hillside plot becomes a building site.
6. It ends on a finished villa at dusk, with the name on its facade.

### 14.2 Implementation

**Player: the landings' existing hero primitive.** The Home hero uses `HeroFilm` (as Investment and Property Purchase do), through a new `HERO_VIDEO.home` entry in `lib/media/hero-video.ts`. No new player was written.

Why `HeroFilm` rather than `PlayOnceVideo`:

- it serves a lighter cut to phones;
- it attaches the video only after the window `load` event, so the poster stays the LCP;
- the `APPROVED_VIDEO` registry that `PlayOnceVideo` reads caps every cut at 1 MB, a budget set for mid-page films, and it requires the original to be committed.

**Behaviour** (all verified in §14.4):

- muted; no `autoplay`, `loop` or native controls;
- plays once while on screen, then rests on its final frame;
- pauses off screen and in a hidden tab, and resumes only if it was playing;
- a visible Pause / Play / Replay control;
- under reduced motion or without JavaScript, the final-frame poster shows and **no video is requested**;
- on a media error, the final poster covers the frame and the control retires.

**Layout.** Only the hero's media column changed (`components/web/HomePreview.module.css`):

- the portrait's 4:5 rules are removed;
- from 1024 px the columns are `0.85fr` copy and `1.15fr` film, so the landscape film is not squeezed into the 520 px portrait column;
- everything stays inside the container, so the 2026-10-01 balance (§12.4) holds;
- phones keep the single column, with the film below the copy.

**Content.** No copy, CTA, navigation or data changed. Sarah's photograph (`sarahConfianza`) leaves the Home hero. It stays registered and in use in the Property Purchase authority block.

**Untouched:** `/`, the four landings, Contact, the Buyer System links, navigation, data and production configuration.

**WebM: measured, not shipped.**

- A VP9 WebM of the same frame (CRF 38, two-pass) weighed 6,875,149 B, against 11,565,473 B for the MP4: 41% lighter.
- Its quality was almost the same: SSIM against the original was 0.983 for the WebM and 0.989 for the MP4. A 1:1 crop comparison showed no visible difference.
- It was not added. `HeroFilm` attaches one H.264 MP4 per breakpoint, and the hero tests require H.264. Supporting WebM would mean changing a primitive shared with two approved landings, which is outside this change.
- **Open for Juanma:** adding WebM support to `HeroFilm` would save about 4.7 MB on desktop.

### 14.3 Open gates (PENDING_APPROVAL)

- **Voice-over: not produced.** When it exists, sound needs:
  - the `Soundtrack` model used for `purchaseGoodIdea`: rights, human-reviewed captions and Sarah's approval of the spoken line;
  - support in `HeroFilm`, which has no sound by design today.
- **The woman in the film.** Her identity, her written release and whether the footage is recorded or generated are **not in the repository**.
  - Nothing here presents her as Sarah: the poster alt text describes the villa frame, and the video is decorative (`aria-hidden`).
  - §12.3's request for real footage of Sarah, with her release, still stands.
- **Wordmark.** The Sarah Katerina name appears inside the film (wall sign, folders, villa facade). It is part of the supplied footage, not the approved logo file (`BRAND-SK-001`), and needs brand review.
- **Illustrative scenes.** The plot, the works and the villa are evidence of no project, planning permission, timing, budget or return.
- **Source framing.** The film carries thin dark bars at the top and bottom (about 16 px at 1440 px tall). They are kept as supplied.
- **Weight.** The desktop cut is 11.6 MB. It loads after the page and only when motion is allowed, but it is heavy for a hero. The WebM above, or a shorter cut, would reduce it.

### 14.4 QA (2026-10-02, Google Chrome 153 through Playwright, isolated local production build)

Report and captures: `docs/screenshots/home-hero-video-2026-10-02/` (`QA.md`, `qa.json`, `hero/`, `full/`).

**`/preview/home` at 320, 390, 768, 1024, 1280, 1440 and 1920:**

- one H1; noindex in both the meta tag and `X-Robots-Tag`; no horizontal overflow;
- no console errors, failed requests or 4xx responses;
- the poster loads first;
- the phone cut is attached below 768 px and the desktop cut from 768 px;
- the film plays muted.

**Playback and control, at 390 and 1440:**

- off screen it pauses; it resumes on return when it was playing;
- after the visitor pauses it, it stays paused on return;
- at the end, Replay restarts it;
- the 44 px control is reachable by keyboard and shows a 2 px solid focus outline at a 2 px offset.

**Fallbacks:**

- reduced motion: zero video requests, and the final poster shows;
- JavaScript off: one H1, and the final poster shows;
- forced video 404: the final poster shows, and the control retires.

**`/`:** unchanged. No film, and no reference to it.

**Not measured:** Lighthouse / Core Web Vitals, Safari, Firefox and real phones.

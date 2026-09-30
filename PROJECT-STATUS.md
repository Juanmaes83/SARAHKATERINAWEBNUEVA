# Project Status — SARAHKATERINAWEBNUEVA

**Last updated:** 2026-09-29 (after PR #32 merge)
**Repository status:** CONTROLLED PREVIEW · NOINDEX · NOT PRODUCTION  
**Visual state:** four landing routes approved 2026-09-28 and Home approved 2026-09-29 — visual approval only, **not** production approval

This file tracks the state of the website product. Strategic status lives
upstream in [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina)
`PROJECT-STATUS.md`, which this repository does not duplicate or override.

> **Date correction (2026-09-28).** An earlier version of this file carried a
> "Last updated 2026-10-23" header and a handoff dated 2026-10-23. Git shows that
> work was committed on 2026-09-23 (`5950b30`) and merged with PR #21 the same
> day; "23 OCTUBRE" is the name of the brief's folder (`IMAGES/MEJORAS 23
OCTUBRE/`), not a date. The entry below is re-dated accordingly.

## Phases

| Phase                                            | Scope                                                                                                                                                                     | State                                                                                                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 — Technical foundation                         | Tokens, components, chrome, SEO scaffolding, analytics contract, CI                                                                                                       | **MERGED** (PR #1)                                                                                                                                                                   |
| 2A — Structural prototype                        | Investment landing grammar, claims classification, Buyer System boundary                                                                                                  | **MERGED**                                                                                                                                                                           |
| 2 — Visual governance                            | Decision gate, implementation contract, asset manifest                                                                                                                    | **MERGED**                                                                                                                                                                           |
| 2B/2C — Investment visual implementation         | Template-led composition, approved palette, governed assets, shared web layer and visual review                                                                           | **MERGED — CANONICAL VISUAL BASE**                                                                                                                                                   |
| 2D — Tax Advisory convergence                    | Tax Advisory adapted to Investment's canonical visual layer                                                                                                               | **MERGED — VISUAL BASE READY**                                                                                                                                                       |
| 2D — Property Purchase convergence               | Property Purchase adapted to Investment's canonical visual layer                                                                                                          | **MERGED — VISUAL BASE READY** (PR #8)                                                                                                                                               |
| Team editorial preview                           | `/preview/team`: buyer-side roles, process and owner stage                                                                                                                | **MERGED** (PR #19, 2026-09-22)                                                                                                                                                      |
| 2E — Premium media, motion and visual refinement | Media/crop pass; premium experience (motion system, art-direction crops, header orientation, signature moments); visual content upgrade                                   | **MERGED** (PR #16 and #17, 2026-09-22; PR #21, 2026-09-23)                                                                                                                          |
| 2F — Approved imagery and hero videos            | Case imagery, scroll-scrubbed hero videos, territory map film, fabric banner, consolidated review                                                                         | **MERGED** (PR #23–#28, 2026-09-24) — visual state approved 2026-09-28                                                                                                               |
| 2G — Connected service journey                   | Shared journey band, Good-idea film (play-once), Buyer System placements                                                                                                  | **MERGED** (PR #29, 2026-09-24) — visual state approved 2026-09-28                                                                                                                   |
| 2H — Sarah's review of the four landings         | Hero films without scroll (Investment, Purchase), calculator first (Tax, Purchase), review copy as proposals, Team simplification                                         | **CLOSED** (PR #30) — visual state approved 2026-09-28                                                                                                                               |
| Home preview + Buyer System links                | `/preview/home`: "What brings you to Spain?" discovery, three service chapters, named testimonials and Team authority block                                               | **VISUALLY APPROVED BY JUANMA 2026-09-29** — PR #32; testimonials authorised by Juanma; new copy remains proposal unless approved; Preview/noindex; Buyer System origin Preview-only |
| Unified preview navigation                       | Home + four landings share direct routes, route state, mobile menu and governed `Buyer Tools` chooser; preview strips remain page-specific                                | **APPROVED 2026-09-29** — shipped in the same PR as the Home                                                                                                                         |
| Contact page + Contact in navigation             | `/preview/contact` editorial page (booking, direct channels, formats as requests, office and on-request Google map); Contact in header/menu, every footer and a Home band | **IN PR (`feat/contact-editorial-page`)** — awaiting Juanma's visual review; not merged; no form                                                                                     |
| 3 — Buyer System integration                     | Preview-only links, restricted-tool approvals, events, consent and lead-capture decision                                                                                  | **PARTLY CONNECTED** — Purchase Tax and Real Cash Needed only in configured Preview; Production origin unset; Asking Price, Tax Exposure and capture remain gated                    |
| 4 — Production gate                              | SEO, accessibility, performance, legal, content approval and migration                                                                                                    | Later                                                                                                                                                                                |

**Visual approval (2026-09-28).** Juanma visually approved the present state of the four `/preview` landings — Investment, Tax Advisory, Property Purchase and Team — on **2026-09-28**. That approval is visual only: it is not approval for production, the domain, DNS, migration, indexation or publication, and it resolves none of the open asset, evidence, permission, tax/legal review, rights or decision items (`docs/phase-2h-juanma-review.md` §10.4).

## CI status

- PR #30 (Phase 2H): final content HEAD `6b584e6`, Actions run `36456057344` — success.
- PR #32 (Home and Buyer System Preview integration): final PR HEAD `84c2c74facc4365e15b1522bd081a47bf15d5eb6`, Actions run `36592785041` — success (lint, typecheck, tests, build and secret/env hygiene).
- Merge commit on `main`: `cacb09e25600617cd5a0ab00ef5a5b9cca62a419`; Vercel status — success. The Vercel deployment does not authorise a custom-domain launch or indexing.

## Routes

| Route                        | Purpose                                              | Indexable                         |
| ---------------------------- | ---------------------------------------------------- | --------------------------------- |
| `/`                          | Repository overview, canonical brand chrome          | No                                |
| `/foundation`                | Component laboratory, canonical tokens               | No — ever                         |
| `/preview/investment`        | Canonical Investment visual base                     | No — ever, while under `/preview` |
| `/preview/tax-advisory`      | Tax Advisory visual base adapted to Investment       | No — ever, while under `/preview` |
| `/preview/property-purchase` | Property Purchase visual base adapted to Investment  | No — ever, while under `/preview` |
| `/preview/team`              | Editorial team page for buyer-side roles and process | No — ever, while under `/preview` |
| `/preview/home`              | Home composition and Buyer System hub preview        | No — ever, while under `/preview` |
| `/preview/contact`           | Contact: discovery call, channels, office and map    | No — ever, while under `/preview` |

Juanma approved **Investment, Tax Advisory and Property Purchase** as visual
bases for continued implementation (2026-09-21), and on 2026-09-28 approved the
present visual state of all four `/preview` routes, Team included. Neither is a
production or publication approval.
Nothing may be promoted out of `/preview` until the production landing priority
is decided (`docs/phase-2-decision-gate.md`, D2-01).

## Design systems in use

One shared website layer serves all four `/preview` routes:

- **Canonical** (`app/tokens.css`, byte-identical to upstream) — used by `/`
  and `/foundation`. Never edited here.
- **Scoped website palette** (`app/web-tokens.css`, `--sk-web-*`) — ivory,
  navy and gold, approved for this repository only (2026-09-21). No palette
  change has been approved since; Juanma's aquamarine request is a pending
  decision (2H, H-03).
- **Shared web primitives** — `components/web/*` (chrome, sections, buttons,
  icons, charts, FAQ, journey band, Buyer System ribbon) and
  `components/motion/*` (`RevealOnScroll`, `ScrubVideo`, `PlayOnceVideo`,
  `HeroFilm` on the 2H branch). Landing-specific sections may extend the layer
  but may not duplicate its token, header, footer or button systems.

## Open decisions

Production decisions remain open in `docs/phase-2-decision-gate.md` and the
landing-specific visual decision documents. The decisions raised by Juanma's
review (hero playback on Tax, headlines, palette, gold, compositions, scope
wording, case evidence, voice-over, photographs and restricted Buyer System tools) are listed
with owners in `docs/phase-2h-juanma-review.md` §8.

The four previously reviewed visual bases and the Home (2026-09-29) are visually
approved for continuation. The following still require review before they are
treated as final:

- selected photographs and videos, their provenance, slot assignment, crop and
  retouch — including the authority portrait and the team photographs (2H,
  A-01–A-04);
- final logo treatment on light and dark surfaces;
- replacement of schematic or illustrative placeholders where an authentic
  asset is available;
- final CTA destinations and any functional capture;
- Asking Price public linking; the verified Buyer System origin now enables
  Purchase Tax and Real Cash Needed only;
- legal entity, contact details, cases, prices, timelines and other claims
  (the three Home testimonials are authorised by Juanma; their tax/return
  figures still need the AGENTS.md §11 review before launch);
- production host, indexation, accessibility/performance and migration gates.

## Current handoff

Most recent first.

**2026-09-30 — Juanma's answers applied (`docs/approval-marks-audit.md` §10.8).**

- **Approvals confirmed:** the "reviewed without objection" rule stands until Sarah asks for changes.
- **Authority photographs:** Sarah's own photographs (EQUIPO_SARAHKATERINA4–6, confirmed and approved by Juanma) replace the authority image on the three service landings. SR-029 is closed.
- **Headlines:** the Home shows the new Investment headline. The Property Purchase headline reads in one run, uncut.
- **Property Purchase:** "What you stop worrying about." becomes Sarah's "Everything you leave in our hands."
- **Aquamarine:** the logo teal becomes `--sk-web-aqua`, approved for now, and replaces the on-dark gold on the four landings.
- **Open for Sarah:** 20 decisions.

**2026-09-30 — Reconciliation with Sarah's four review documents (`docs/approval-marks-audit.md` §10).**
The first audit read `status: 'proposal'` as "not approved"; Sarah had in fact
reviewed the four landings. Reconciled line by line against
`REVISION WEB-*.docx` (2026-09-28). Approvals are now recorded with the quoted
line (`SARAH_APPROVALS`), and only 21 decisions stay open: SR-001–SR-011 on
the Home (no document covers it) and 10 on the landings, all of them copy
written after her review plus her Home portrait's new use.

- **Implemented now:** the two Investment headlines she rejected are replaced,
  with a more human lead (new copy, SR-036/SR-041). The authority image whose
  face she rejected is replaced by her approved portrait on Investment, Tax
  and Property Purchase (SR-029).
- **Contact:** approved by Sarah as a page (relayed by Juanma, 2026-09-30); no
  marks remain.
- **Pending, grouped:**
  - **Sarah:** the 21 SR items.
  - **Evidence and professional:** C-01 cases, S-02, tax/legal wording,
    G-02 rights, UCI/Sabadell financing, the renovations scope.
  - **Assets:** individual portraits of Elsa, Óscar and Igor (not found),
    warmer team photos, the signature, the aquamarine token.
  - **Technical:** sound publication (needs G-02 and reviewed captions),
    booking and email variables on Preview, B-01, unconnected buttons.
- **Vercel Production (`main`) runs in `preview` mode:** a merge would show the
  open marks there without failing the build.

**2026-09-30 — Approval-marks audit on the same PR (`docs/approval-marks-audit.md`).**
Stale review marks removed or restated where the record shows the approval or
the fact changed (Purchase hero film label, Team/Contact "Review status"
footer column, Tax internal substitution note, preview banners, footer and
button notes). Every item Sarah still has to decide is marked on the page as
`SARAH REVIEW REQUIRED · SR-###` (81 items, register `content/en/sarah-review.ts`);
professional and technical items are listed apart. A production or indexable
build refuses to render a mark (verified). Nothing approved by this audit;
Juanma's visual review of this version and Sarah's decisions are pending.

**2026-09-30 — Contact published for review on `feat/contact-editorial-page` (from `main` `8de6a76`).**
The Contact delta was isolated from the local working tree and applied onto
`main` (PR #32 already merged): the page, the on-request map, Contact in the
shared navigation, every footer and the Home band, tests and docs. No new image
file: both photographs and their originals are already on `main`. Not merged.

**2026-09-29 (late night) — Contact editorial redesign (local).**
`/preview/contact` rebuilt as five editorial moments: Sarah in her office as the
hero (registered `homeAuthority`; original `IMAGES/Sarah home_1.png` on `main`),
the Tax Advisory lifestyle photograph (`IMAGES/sarahkaterina_LifeStyle_6.png`)
beside video / phone / Torrevieja requests, four verified booking steps on a
gold line, the office with a real Google map loaded on request from a legible
navy module, and a navy closing. Hero never animates; shared reveals, the gold
thread and the step line carry the motion. 305 tests, 30/30 browser cases;
awaiting Juanma's visual review. Record: `docs/contact-page.md` §0.

**2026-09-29 (night) — Contact page, first version (superseded by the redesign).**
`/preview/contact` (noindex): book the audited 30-minute discovery call, WhatsApp /
phone / email always visible, video call / phone call / meeting in Torrevieja as
requests, office at Calle Bazán 10 (Juanma) with Google Maps link, directions and
a map loaded only on request. No form: the reference `/api/lead-notify` cannot be
reused safely yet (`docs/contact-page.md` §5). Contact added to the shared
navigation, every footer and a short Home band — these Home/nav changes come
after Juanma's Home approval and need review. 301 tests, 30/30 browser cases.

**2026-09-29 (evening) — Home service discovery pass, Juanma's precedence
instruction; visually approved by Juanma the same day.** "What brings you to Spain?"
(three needs, one fabric banner on the new shared `FabricStage`, Buyer Voices
unchanged); Team moved to an authority block after the voices; strike-through
removed from the gold thread; editorial reveal on three statements; hero
entrance removed for LCP. Testimonials published with names — **Juanma
confirmed client authorisation 2026-09-29** (strategic repo's C-08/SK-028 not
modified). Visible preview/review wording removed from the Home only; noindex,
`/preview` route and sitemap exclusion unchanged. Lighthouse mobile
(simulate, ×5): perf 87 → 91, LCP 3.92 → 3.23 s, CLS 0.022 → 0; devtools
throttling ×3: LCP 2.35 s. Record: `docs/home-buyer-system-preview.md` §0.
Merged from `feat/home-service-discovery-reviewed` via PR #32 into `main`
on 2026-09-29 (`cacb09e`). PR-head CI passed (Actions run `36592785041`);
Vercel status on the merge commit passed. It remains a noindex Preview route;
this merge is not approval for a public-domain launch.

**2026-09-29 (later) — "Advisory thread" creative pass on the Home,
uncommitted on `feat/preview-home-buyer-tools`.** One gold thread runs from the
promise to the next step (native scroll-driven CSS, full fallbacks); new "one
side of the table" statement restating the confirmed independence decision;
four differentiated chapter compositions; hero route index; client voices
rendered verbatim (their anonymised preview-only treatment was superseded the
same evening by Juanma's authorisation — see the entry above). 25/25 route×width cases clean; Lighthouse
mobile Home 86/100/100 (SEO 69 by noindex). Record:
`docs/home-buyer-system-preview.md` §§2, 3, 8–9.1. Superseded by the entry
above.

**2026-09-29 — Premium editorial Home pass implemented locally on
`feat/preview-home-buyer-tools`.** The earlier card/band sequence is replaced
by four distinct visual chapters in the approved order: Property Purchase,
Investment, Tax Advisory and Team. The hero film, unified navigation and two
verified Buyer System entry points remain governed as before. Isolated under
`/preview/home` (superseded by the evening entry above).

**2026-09-28 — Home preview and verified Buyer System links implemented on
`feat/preview-home-buyer-tools`.** `/preview/home` does not replace `/`
(first version; the visually approved one is the evening entry above). Purchase Tax and Real Cash Needed link
to the verified upstream production origin; Asking Price and Tax Exposure stay
gated. Record: [`docs/home-buyer-system-preview.md`](docs/home-buyer-system-preview.md).

**2026-09-28 — Phase 2H closed (PR #30): Sarah's review of the four landings,
relayed by Juanma.** Juanma approved the present visual state of the four
routes the same day. Record, copy adaptations, sound status and everything
still open: [`docs/phase-2h-juanma-review.md`](docs/phase-2h-juanma-review.md).

**2026-09-24 — Phase 2G connected service journey merged (PR #29).** Record:
[`docs/phase-2g-connected-service-journey.md`](docs/phase-2g-connected-service-journey.md).
Visual state approved on 2026-09-28 (with 2H).

**2026-09-24 — Phase 2F merged (PR #23–#28).** Case imagery, hero videos, map
film and fabric banner; the owner then replaced the Investment and Tax hero
sources (see the top note of
[`docs/phase-2f-images-and-scroll-hero-implementation.md`](docs/phase-2f-images-and-scroll-hero-implementation.md)).
Visual state approved on 2026-09-28 (with 2H).

**2026-09-23 — Phase 2E premium experience and visual content upgrade merged
(PR #21).** Visual content upgrade against the brief `IMAGES/MEJORAS 23
OCTUBRE/` (shared `ReportExplorer`, common image grade `sk-editorial-v1`):
[`docs/phase-2e-visual-content-upgrade.md`](docs/phase-2e-visual-content-upgrade.md).
Premium pass and motion rulebook:
[`docs/phase-2e-premium-experience.md`](docs/phase-2e-premium-experience.md),
[`docs/phase-2e-motion-system.md`](docs/phase-2e-motion-system.md). The open
decisions recorded there (motion tokens, compact crops, the
`process-presentation` image, the preview banner, two Property copy mismatches)
were not resolved by later phases unless their records say so.

Every visual change must be previewed at mobile and desktop widths and visually
reviewed by Juanma before merge.

## Merge record

- **PR #16** — approved media across Investment, Tax Advisory and Property Purchase. Merge commit `b24ca2b` (2026-09-22).
- **PR #17** — Tax Advisory single-image hero and widened Property Purchase authority composition. Merge commit `bf040eb` (2026-09-22).
- **PR #19** — Team editorial preview (2026-09-22).
- **PR #21** — Phase 2E premium experience, motion and visual content upgrade. Merge commit `c8eb579` (2026-09-23).
- **PR #23–#27** — October media (#23), map film and fabric banner (#24), case imagery and scroll hero videos (#25); #26 and #27 brought #23 and #24 into `integration/phase-2f-complete-review`. Their commits reach `main` through PR #28 (2026-09-24).
- **PR #28** — Phase 2F consolidated visual review. Merge commit `2a200ed` (2026-09-24).
- **PR #29** — Phase 2G connected service journey. Merge commit `edc47f0` (2026-09-24).
- **PR #30** — Phase 2H, Sarah's review of the four landings; closed 2026-09-28 (merge commit in the git history of `main`).
- **PR #32** — Home service discovery, named testimonials, unified navigation and Preview-only Buyer System links; squash-merged 2026-09-29 as `cacb09e`.

All of it remains preview-only: no production publication, custom domain, DNS
or indexation was enabled. On this branch, outbound links to two verified Buyer
System experiences are enabled; no calculator code, inputs or results were
integrated into this repository.

## Analytics status (2026-09-23)

Documentation only. Source of the facts and the full reconciliation:
`Juanmaes83/sarahkaterina` → `analytics/ga4-social-ads-reconciliation-2026-09-23.md`.

- **The currently published website** (not this repository) has a Google
  Analytics property with real historical data, confirmed by the project owner.
  Its reports, configuration, instrumentation and data quality have not been inspected or technically verified.
- **This repository contains no active connection to that property or to any
  other analytics destination.** Its analytics adapter is `noop`
  (`lib/analytics/track.ts`) and sends no events. No externally injected
  runtime analytics configuration has been verified. Metrics of the published
  site must not be attributed to this site.
- The typed contract in `lib/analytics/events.ts` follows the Buyer System brief
  (`calculator_start`, `lead_capture_submit`, `booking_start`, `booking_complete`…).
  It differs from the strategic measurement plan (`lead_form_submitted`,
  `appointment_completed`, `calculator_started`…) and from the Phase 0 spec
  (`form_submit`, `booking_completed`…). **Defining an event here does not send it
  to GA4.** The final taxonomy is a human decision and must be reconciled with
  the master plan before any implementation.
- No credential, Measurement ID, GTM container, pixel or token may be copied into
  this repository. A `G-…` Measurement ID identifies the data stream to which an
  implementation may send events. It is a public identifier and does not grant
  read access to GA4 reports; that access is managed outside the repository.
- No PII, and no tax, cadastral, health, disability or family data, may ever
  become an analytics or advertising parameter.
- Social Ads has no historical data for Sarah Katerina; any future campaign is a
  learning experiment from a historical baseline of its own.
- Connecting analytics, publishing this site, indexing it or connecting the
  domain each require explicit human approval.

## Deployment and publication boundary

GitHub integration may create Vercel deployments with a `production` target after merges or direct pushes to `main`. That infrastructure event is not publication approval. There is no approved custom domain, DNS change or indexation, and the site remains controlled preview/noindex until the production gates are explicitly closed.

## Absolute rules

- No secrets, ever.
- The mother repository and the Buyer System are read-only.
- No production publication, custom domain, DNS change or indexation.
- Every visual change requires Juanma's human review before merge

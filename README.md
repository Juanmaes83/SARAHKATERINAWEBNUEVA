> **Continuidad — 10 octubre 2026:** PR60 fusionado y guía/WhatsApp aprobados; PR59 sustituido. Consultar [handoff a Claude Code](docs/HANDOFF-CLAUDE-CODE-2026-10-10.md) y la actualización del 10 en [roadmap](docs/ROADMAP-LAUNCH-2026-10-08.md). Incluye conocimiento/fuentes, invitación contextual nueva, IA/integraciones y los pendientes Studio/legal/lanzamiento. Los estados anteriores se conservan como histórico.

# Sarah Katerina — New Website

> **Estado reconciliado — 9 octubre 2026:** consulta [Project State](docs/PROJECT-STATE-2026-10-09.md) y [QA aislada del Studio](docs/STUDIO-ISOLATED-QA-2026-10-09.md). Los registros anteriores conservan su valor histórico; no describen por sí solos el estado actual. Este frente pertenece exclusivamente a SARAHKATERINAWEBNUEVA.

> **Status (2026-09-30): SIX PREVIEW ROUTES (FOUR LANDINGS, HOME, CONTACT) · CONTROLLED PREVIEW · NOINDEX · NO CUSTOM-DOMAIN LAUNCH**
>
> Juanma visually approved the four `/preview` landings on 2026-09-28 and the Home on 2026-09-29. Contact's page/content approval was relayed by Juanma on 2026-09-30 and PR #33 is merged. These approvals do not close production, legal, domain, DNS, migration, indexation or public-launch gates. Open Sarah copy decisions, evidence, asset, rights and professional-review gates remain in `PROJECT-STATUS.md` and the phase records. The application remains **not indexable by default**.
>
> **Home delivery:** PR #32 merged into `main` on 2026-09-29 as `cacb09e`. PR-head GitHub Actions run **36592785041 — success** (lint, typecheck, tests, build and secret/env hygiene); Vercel check on the merge commit — **success**. The Home remains `/preview/home`; `/` is unchanged. A Vercel deployment is an infrastructure result, not approval to publish on `sarahkaterina.com` or enable indexing.
>
> **Contact delivery:** PR #33 was squash-merged into `main` on 2026-09-30 as `fc6fb4947043431770a2cf66f87f3471e51bcd5c`. PR-head Actions run **36748647728 — success** (lint, typecheck, tests, build and secret/env hygiene). The Vercel check on the merge commit was **pending when this record was updated**. Contact remains `/preview/contact`, `noindex`, outside the sitemap; no custom domain, indexing or production publication was enabled.

---

## 1. What this repository is

The web product for Sarah Katerina: the Next.js application, its design
system implementation, its components and its technical SEO scaffolding.

Phase 1 delivers the technical and visual foundation — tokens, reusable
components, header and footer, responsive and accessibility baselines, SEO/GEO
scaffolding, a typed analytics contract and CI.

Phase 2 is the visual implementation workstream. It must transform that
foundation into real, editorial landing experiences based on the visual
proposal in website/nueva web/, especially the Investment composition. The
proposal is not a production approval, but its architecture, rhythm, hierarchy
and composition are the explicit implementation reference for Phase 2.

The merged base contains four preview landings — Investment, Tax Advisory,
Property Purchase and Team — plus Home and Contact on one shared web layer. The Home lives at
`/preview/home` (noindex, outside the sitemap; `/` is not replaced). Its
2026-09-29 version — the "What brings you to Spain?" service discovery on a
fabric banner, three service chapters, named client testimonials authorised by
Juanma, a Team authority block and the two verified Buyer System tools — was
**visually approved by Juanma on 2026-09-29** (visual only; not production).
New Home copy remains proposal unless its record says otherwise; see
`docs/home-buyer-system-preview.md`. Investment is the
canonical visual base; the others adapt their own content and structures to it.
Phases 2E (premium media and motion), 2F (approved imagery and hero videos), 2G
(connected service journey) and 2H (Sarah's review of the four landings,
PR #30) are closed. Their visual state was approved by Juanma on 2026-09-28.

## 2. What this repository is not

- Not the strategic source of truth. That is [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina).
- Not a brand repository. Brand decisions are made and recorded upstream.
- Not the Buyer System. That is [`Juanmaes83/Sarah-Katerina-Buyer-System`](https://github.com/Juanmaes83/Sarah-Katerina-Buyer-System).
- Not the approved public website launch: no `sarahkaterina.com` custom-domain connection, DNS migration or indexation is authorised. Merges to `main` can trigger Vercel deployments; see the deployment boundary below.
- Not an approved production website. Phase 2 is the active visual
  implementation workstream; it is not a separate interpretation-free later
  phase. Production approval, legal review and human visual validation remain
  separate gates.

## 3. Relationship with the other repositories

| Repository                                                                                            | Role                                | This repo's relationship                                                                        |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina)                             | Strategic and brand source of truth | **Read-only.** Decisions, tokens and governance are consumed from it. Never modified from here. |
| [`Juanmaes83/Sarah-Katerina-Buyer-System`](https://github.com/Juanmaes83/Sarah-Katerina-Buyer-System) | Calculators and buyer tools         | **Read-only.** Interfaces may be prepared here. The system is never rebuilt or vendored here.   |

## 4. Source of truth

`Juanmaes83/sarahkaterina` governs. Its authority hierarchy
(`brand-system/SOURCE-HIERARCHY.md`) and status model
(`brand-system/governance/decision-status-model.md`) apply to work done here.

Documents consulted for this phase:

| Document                                                                                                                                                 | Status as declared upstream                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `README.md`                                                                                                                                              | Repository map                                                                                           |
| `PROJECT-STATUS.md`                                                                                                                                      | Operational status (L5)                                                                                  |
| `strategy/master/decisions-log.md`                                                                                                                       | **Decision authority (L1)**                                                                              |
| `brand-system/SOURCE-HIERARCHY.md`                                                                                                                       | Conflict-resolution authority                                                                            |
| `brand-system/governance/decision-status-model.md`                                                                                                       | Status vocabulary                                                                                        |
| `brand-system/README.md`                                                                                                                                 | Brand OS overview                                                                                        |
| `brand-system/tokens/` (`README.md`, `tokens.json`, `tokens.css`)                                                                                        | **Canonical token layer (L2)**                                                                           |
| `brand-system/foundations/` (colour, typography, layout-grid, spacing, surfaces, accessibility, interaction, visual principles, iconography, signatures) | Canonical foundations (L2)                                                                               |
| `brand-system/qa/contrast-matrix.md`                                                                                                                     | Verified WCAG ratios                                                                                     |
| `brand-system/COMPONENT-REGISTRY.md`, `DECISION-SUPERSESSION-REGISTER.md`                                                                                | Component and supersession registers                                                                     |
| `website/README.md`                                                                                                                                      | Website knowledge index (CANONICAL)                                                                      |
| `website/01-audits/00-website-audit-master-2026-09.md`                                                                                                   | CANONICAL CONSOLIDATED BASELINE                                                                          |
| `website/01-audits/seo-final-audit-2026-09.md`                                                                                                           | CANONICAL FINAL BASELINE — VERIFICATION GATE REQUIRED                                                    |
| `website/02-activation/buyer-system-lead-magnet-strategy-2026-09.md`                                                                                     | ACTIVE OPERATIONAL BRIEF                                                                                 |
| website/02-activation/new-website-landings-proposal-2026-09.md                                                                                           | **VISUAL PROPOSAL / IMPLEMENTATION REFERENCE FOR PHASE 2 — NOT CANONICAL — NOT APPROVED FOR PRODUCTION** |

### Design token provenance

`app/tokens.css` and `lib/tokens/tokens.json` are **byte-for-byte copies** of
the canonical token layer. They must never be edited here.

| Field                      | Value                                                               |
| -------------------------- | ------------------------------------------------------------------- |
| Source repository          | `Juanmaes83/sarahkaterina`                                          |
| Source paths               | `brand-system/tokens/tokens.json`, `brand-system/tokens/tokens.css` |
| Token version              | `0.1.0` (`D3 canonical token layer`)                                |
| Source commit              | `5a88f91062c2597b39b81c0bfba22dfc7afa8c67`                          |
| `tokens.json` git blob SHA | `6370626ca0a53c05d92bd80f749c67172bed171c`                          |
| `tokens.css` git blob SHA  | `623716c1722f5abea97c4aadd448baa0401e79ac`                          |

`tests/tokens-parity.test.ts` recomputes the blob hash and re-derives every CSS
variable from the JSON, so any drift from the source of truth fails CI.

Application-only additions live in app/tokens.app.css, namespaced --sk-app-
and individually justified. Phase 1 additions introduce no new colour value.
For Phase 2, the scoped website palette approved by Juanma is implemented in a
separate, namespaced web layer such as --sk-web-*; it must not mutate the
canonical global token files and must carry its own contrast tests. See the
Phase 2 visual implementation contract.

## 5. Current status

```
PHASE 1 MERGED
PHASE 2A VISUAL SYSTEM / STRUCTURAL PROTOTYPE MERGED
PHASE 2B/2C INVESTMENT VISUAL IMPLEMENTATION MERGED — CANONICAL VISUAL BASE
PHASE 2D TAX ADVISORY CONVERGED ONTO THAT BASE — VISUAL BASE READY
PHASE 2D PROPERTY PURCHASE CONVERGED ONTO THAT BASE — VISUAL BASE READY
TEAM EDITORIAL PREVIEW MERGED (PR #19)
PHASE 2E PREMIUM MEDIA, MOTION AND VISUAL CONTENT UPGRADE MERGED (PR #16, #17, #21)
PHASE 2F CASE IMAGERY, HERO VIDEOS, MAP FILM AND FABRIC BANNER MERGED (PR #23–#28)
PHASE 2G CONNECTED SERVICE JOURNEY MERGED (PR #29)
PHASE 2H SARAH'S REVIEW OF THE FOUR LANDINGS — CLOSED (PR #30)
HOME SERVICE DISCOVERY + BUYER SYSTEM PREVIEW MERGED (PR #32; 2026-09-29)
UNIFIED PREVIEW NAVIGATION — MERGED WITH PR #32
VISUAL STATE OF THE FOUR PREVIEW ROUTES APPROVED BY JUANMA — 2026-09-28
HOME VISUALLY APPROVED BY JUANMA — 2026-09-29 (VISUAL ONLY)
CONTACT PAGE + CONTACT IN NAVIGATION, FOOTERS AND HOME — MERGED PR #33 (2026-09-30); PREVIEW/NOINDEX
SARAH'S HOME PDF REVIEW (2026-10-01, BRANCH): HER INTRODUCTION, HER LINES, BOOK A CALL, LARGER HEADER · VIDEO AND VERCEL BOOKING URL BLOCKED · SARAH'S HOME FEEDBACK (2026-10-01, BRANCH): SARAH FIRST, FIRST-PERSON VOICE, DESKTOP BALANCE · EDITORIAL MARKS HIDDEN (2026-10-01): SITE PRESENTED AS FINISHED FOR SARAH'S FINAL REVIEW · 24 SR ITEMS TRACKED INTERNALLY · TAX CASES REAL AND AUTHORISED (TAX REVIEW OPEN) · NOINDEX
OPEN: ASSETS, CASE EVIDENCE, SOUND RIGHTS/CAPTIONS, RESTRICTED BUYER TOOLS, PRODUCTION GATES
NOT PRODUCTION · NOT APPROVED FOR MIGRATION
```

**Investment is the canonical visual base of the website layer.** Investment,
Tax Advisory and Property Purchase are registered as the three approved visual
implementation bases, and on 2026-09-28 Juanma approved the present visual state
of all four `/preview` routes, Team included. Neither approval means that any
route is approved for production, publication or migration.

All six `/preview` routes render through one shared web layer and one token file:

| Concern                                                            | Single source                                                                                        |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Website palette                                                    | `app/web-tokens.css`                                                                                 |
| Sections, hero, buttons, cards, icons, charts, header, footer, FAQ | `components/web/*`                                                                                   |
| Shared preview navigation and primary CTA                          | `content/en/site-navigation.ts` + `components/web/WebHeader.tsx`                                     |
| Motion foundation                                                  | `components/motion/*` (`RevealOnScroll`, `ScrubVideo`, `PlayOnceVideo`; `HeroFilm` on the 2H branch) |
| Landing-specific composition                                       | Each route's content and section module, without duplicate chrome or tokens                          |

A second visual architecture is not permitted. `tests/tax-advisory.test.ts`
and the converged web-layer tests fail if a second `--sk-web-*` declaration, a
second header, footer or button, or a re-declared navy or gold ever reappears.
Phase 2H was delivered on `feat/phase-2h-juanma-review-four-landings` (PR #30);
see `docs/phase-2h-juanma-review.md`.

| Document                                                 | What it records                                                                                                                                          |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/shared-web-layer-convergence.md`                   | What is canonical, what was removed, what each landing still owns, how Investment is verified, how the next landing is added                             |
| `docs/tax-advisory-fidelity-matrix.md`                   | Section-by-section comparison against the Tax Advisory template                                                                                          |
| `docs/tax-advisory-visual-decisions.md`                  | Every judgement call, and what needs Juanma's decision                                                                                                   |
| `docs/tax-advisory-asset-record.md`                      | Asset provenance, hashes, crops, and the assets still missing                                                                                            |
| `docs/property-purchase-fidelity-matrix.md`              | Section-by-section comparison against the Property Purchase template                                                                                     |
| `docs/property-purchase-asset-map.md`                    | Property Purchase asset provenance and placement map                                                                                                     |
| `docs/property-purchase-visual-decisions.md`             | Property Purchase visual decisions and remaining production gates                                                                                        |
| `docs/phase-2e-navigation-architecture.md`               | ThreeUI-informed navigation reference; the active section, sticky header and menu-closes-on-selection parts are implemented in the Phase 2E premium pass |
| `docs/visual-media-inventory-phase-2e-2026-09.md`        | Approved provisional media selection, provenance, slots and exclusions for Phase 2E                                                                      |
| `docs/phase-2e-media-corrections-merged-2026-09-22.md`   | Merged media/crop pass, visual verification and handoff to motion                                                                                        |
| `docs/phase-2e-premium-experience.md`                    | Phase 2E premium pass: creative direction, audit, WOW map, per-landing decisions, QA evidence, human decisions pending                                   |
| `docs/phase-2e-motion-system.md`                         | Motion tokens, intensity levels, shared primitives, reduced-motion/no-JS behaviour and rejection criteria                                                |
| `docs/phase-2e-visual-content-upgrade.md`                | Brief `IMAGES/MEJORAS 23 OCTUBRE/` (work of 2026-09-23, merged in PR #21): reference-to-section mapping, report explorer, common image grade, QA         |
| `docs/phase-2f-images-and-scroll-hero-implementation.md` | Phase 2F case imagery and hero videos (hero sources later replaced by the owner; see its top note)                                                       |
| `docs/phase-2g-connected-service-journey.md`             | Phase 2G connected journey, Good-idea film, Buyer System placements                                                                                      |
| `docs/phase-2h-juanma-review.md`                         | Phase 2H: Sarah's review of the four landings — matrix, copy adaptations, audio audit, closing record, open assets and decisions                         |
| `docs/home-buyer-system-preview.md`                      | `/preview/home`, verified Buyer System routes, deliberate blocks and review boundary                                                                     |
| `docs/contact-page.md`                                   | `/preview/contact`: editorial composition, originals used, booking audit, formats as requests, office and Google map, form blockers                      |
| `docs/approval-marks-audit.md`                           | Approval-marks audit: stale marks removed, the SR-### register of Sarah's decisions, professional and technical items, publication gate                  |

## 6. Stack

| Choice                                          | Why                                                                                                                                                                               |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js 15 (App Router)                         | Required framework; static generation for every current route.                                                                                                                    |
| TypeScript (strict, `noUncheckedIndexedAccess`) | Type errors fail the build and CI.                                                                                                                                                |
| React 19                                        | Next.js 15 default.                                                                                                                                                               |
| **CSS Modules over token custom properties**    | The canonical consumption contract forbids raw hex, arbitrary spacing, new radii and local focus rules. CSS Modules reading `--sk-*` enforce that directly and add no dependency. |
| Zod                                             | Environment validation only — the one real data boundary in this phase.                                                                                                           |
| Vitest                                          | Token parity and governance tests.                                                                                                                                                |
| ESLint + Prettier                               | Lint and format gates.                                                                                                                                                            |
| `next/font`                                     | Self-hosts Fraunces and Inter; no third-party font request.                                                                                                                       |

Phase 1 deliberately avoided GSAP and third-party motion dependencies. Phase 2
must implement the approved motion direction with GSAP or a native equivalent
when it adds value, always with prefers-reduced-motion, no scroll-jacking and
no motion that fabricates data. The current RevealOnScroll primitive is a
foundation, not the finished Phase 2 motion system.

## 7. Running locally

```bash
npm ci
cp .env.example .env.local   # optional; safe defaults apply without it
npm run dev                  # http://localhost:3000
```

Routes:

| Route                        | What it is                                                |
| ---------------------------- | --------------------------------------------------------- |
| `/`                          | Overview                                                  |
| `/foundation`                | Internal component laboratory. Never indexable.           |
| `/preview/investment`        | Canonical Investment visual base                          |
| `/preview/tax-advisory`      | Tax Advisory visual base adapted to Investment            |
| `/preview/property-purchase` | Property Purchase visual base adapted to Investment       |
| `/preview/team`              | Editorial team page; buyer-side roles and process preview |
| `/preview/home`              | Home composition and Buyer System hub preview             |
| `/preview/contact`           | Contact: discovery call, direct channels, office and map  |

Everything under `/preview` is `noindex, nofollow` at three independent
layers: per-page metadata, an `X-Robots-Tag` response header, and `robots.txt`.

## 8. Lint, typecheck, test and build

```bash
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npm run test       # vitest run
npm run build      # next build
npm run format     # prettier --write .
```

CI runs `lint`, `typecheck`, `test` and `build` on every pull request.

## 9. Deploying a preview

A private Vercel project exists for visual review. The application remains
noindex and no custom domain is connected. Every visual change must be reviewed
by Juanma before it is treated as accepted.

Use a branch preview for normal review. A merge to main may also create a
default Vercel deployment because of the repository integration; that does not
authorise publication or migration.

Required preview environment variables (all public, none secret):

NEXT_PUBLIC_SITE_MODE=preview
NEXT_PUBLIC_SITE_INDEXABLE=false
NEXT_PUBLIC_SITE_URL=<the vercel preview url>

Never connect sarahkaterina.com, enable indexing or treat a Vercel deployment
as production approval.

The Buyer System origin was verified on 2026-09-28. Purchase Tax and Real Cash
Needed resolve through the shared adapter only when
`NEXT_PUBLIC_BUYER_SYSTEM_URL` is configured in controlled Preview. The
variable remains unset in Production; without it, tool entries stay pending.
Asking Price and Tax Exposure remain gated under their existing product rules.

---

## 10. Branches

- `main` is protected by convention: no direct commits.
- Work happens on a descriptive branch, e.g.
  `foundation/technical-foundation-2026-09-21`.
- Branch from an up-to-date `main`.

## 11. Opening a pull request

1. Run the full QA set in §8 locally.
2. Commit with a descriptive message.
3. Push the branch.
4. Open a **Draft** pull request against `main`.
5. State what was verified and what was not.
6. Merge only on explicit human approval.

## 12. What needs human approval

| Item                                   | State                                                                              | Why it is blocked                                                                                                                                                                                                                                                                                                          |
| -------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canonical production host              | **OPEN CONFLICT**                                                                  | `decisions-log.md` (2026-08-05) approved non-www; the 2026-09-16 verification found production redirecting to www and left it "Abierta" as a P0.                                                                                                                                                                           |
| Logo / wordmark asset                  | AVAILABLE REFERENCE — BASE IMPORTED                                                | The governed authentic mark is already imported for the three visual bases. Final light/dark treatment, lockup selection and any retouch remain subject to Juanma's visual approval. Ask rather than recolouring or redrawing the mark.                                                                                    |
| Institutional descriptor               | `NEEDS_DECISION`                                                                   | Must not be chosen silently.                                                                                                                                                                                                                                                                                               |
| `Property Decision Advisor`            | `TEST` + `INTERNAL_TEST_ONLY`                                                      | Not usable in public output.                                                                                                                                                                                                                                                                                               |
| Legal entity, address, company number  | NOT CONFIRMED                                                                      | Rendered as `PENDING_APPROVAL` slots.                                                                                                                                                                                                                                                                                      |
| Email, telephone, social profiles      | NOT CONFIRMED                                                                      | Rendered as `PENDING_APPROVAL` slots.                                                                                                                                                                                                                                                                                      |
| `--sk-app-text-muted`                  | `PENDING_APPROVAL`                                                                 | No approved value; a guard test forbids its use.                                                                                                                                                                                                                                                                           |
| Primary breakpoint (768px)             | `PENDING_APPROVAL`                                                                 | Upstream leaves 768 vs 900 `DEFERRED-NONBLOCKING`. Implementation decision, reversible in one place.                                                                                                                                                                                                                       |
| Preview navigation / IA                | APPROVED 2026-09-29                                                                | Home plus the four real preview landings share one header registry. `BUY / INVEST / OWN` remains Home content architecture, not navbar copy.                                                                                                                                                                               |
| Header primary CTA                     | APPROVED 2026-09-29                                                                | `Buyer Tools`; exposes only Purchase Tax and Real Cash Needed through the governed adapter until contact/booking exists. Other commercial CTA copy remains unapproved.                                                                                                                                                     |
| Property Management / VITA Host        | `HOLD`                                                                             | D-06 unexecuted; excluded entirely.                                                                                                                                                                                                                                                                                        |
| AI crawler policy                      | `Propuesta`                                                                        | Awaiting legal input; no directive invented.                                                                                                                                                                                                                                                                               |
| Photography and video of Sarah         | ASSETS AVAILABLE · SOME SLOTS BLOCKED                                              | Authentic references exist upstream. Each image or video must be assigned to a landing slot, carry provenance, receive the correct crop/treatment and be reviewed by Juanma. Missing: a natural authority portrait, warmer team photos and named individual portraits (2H, A-01–A-04). Voice-overs unpublished (2H, V-01). |
| Any metric, claim, case or testimonial | NOT APPROVED — except the three Home testimonials, authorised by Juanma 2026-09-29 | Requires source, date, permission, scope and legal review. Visual proof may be shown as a clearly labelled demo/preview; it must not imply a verified result.                                                                                                                                                              |

## 13. What must not be published

- Any page of this repository, until indexing is explicitly approved.
- `/foundation` — ever. It is an internal laboratory, forced to
  `noindex, nofollow` and excluded from the sitemap.
- Any invented logo, contact detail, legal identity, metric, testimonial,
  case study or photograph.
- Any tax, legal, financial or return claim without competent human review.
- Any uniqueness or "no competition" claim — prohibited outright upstream.

## 14. Roadmap

| Phase                                                     | Scope                                                                                                                                    | State                                                         |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1 — Technical foundation                                  | Tokens, components, header/footer, SEO/GEO base, analytics contract, CI and foundation laboratory                                        | MERGED                                                        |
| 2A — Landing Experience System                            | Section grammar, claims governance, Buyer System boundary, responsive primitives and structural Investment prototype                     | MERGED                                                        |
| 2B/2C — Investment visual implementation and human review | Template-led composition, approved palette, governed assets, dashboards, editorial copy and shared visual layer                          | MERGED — CANONICAL VISUAL BASE                                |
| 2D — Tax Advisory and Property Purchase convergence       | Adapt both template compositions to the Investment layer without duplicate tokens, chrome or primitives                                  | MERGED — THREE VISUAL BASES READY                             |
| 2E — Premium media, motion and visual refinement          | Approved media imported, shared crops corrected and three landing bases updated; motion, transitions, effects, responsive rhythm and CRO | MERGED                                                        |
| 2F — Approved imagery, hero videos, cross-landing QA      | Case imagery, hero videos, territory map film, fabric banner; consolidated visual review                                                 | MERGED — VISUAL STATE APPROVED 2026-09-28                     |
| 2G — Connected service journey                            | One advisory route across the four landings; Good-idea film; Buyer System placements                                                     | MERGED — VISUAL STATE APPROVED 2026-09-28                     |
| 2H — Sarah's review of the four landings                  | Hero films without scroll, calculator first, review copy as proposals, Team simplification                                               | CLOSED (PR #30) — VISUAL STATE APPROVED 2026-09-28            |
| Home + Contact                                            | Home discovery and Contact page, booking channels, office map, Contact in navigation/footers/Home                                        | HOME MERGED (PR #32) · CONTACT MERGED (PR #33, 2026-09-30); PREVIEW/NOINDEX |
| 2I — Sarah copy decisions                                 | Review the 21 visible `SR-###` decisions (11 Home, 10 landing-page decisions)                                                             | OPEN — Sarah's review required                                |
| 3 — Functional integration                                | Contact booking/email Preview variables and owner test booking; form privacy/test path; restricted Buyer Tool approvals, events and consent | PARTLY CONNECTED · DECISIONS AND INTEGRATIONS OPEN             |
| 4 — Production hardening                                  | Mobile performance, accessibility, legal/tax evidence, rights, SEO, crawl validation and migration                                      | AFTER COPY, EVIDENCE, FUNCTIONAL AND PUBLICATION GATES         |
| 5 — Migration                                             | Domain, redirects, indexation and production cutover                                                                                     | LAST GATE                                                     |

None of the Phase 2 blocks is a production release. The visual state of the
four preview routes was approved by Juanma on 2026-09-28. Production still
requires the gates in phase 4, and the open decisions and missing assets from
Sarah's review are in `docs/phase-2h-juanma-review.md` §6, §8 and §10.4.

The full Phase 2 implementation contract is in
docs/phase-2-visual-implementation-contract.md.

---

## 15. Permitted environment variables

Only these six. All are public; none is a secret.

| Variable                       | Default                      | Purpose                                                           |
| ------------------------------ | ---------------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_MODE`        | `preview`                    | `preview` or `production`.                                        |
| `NEXT_PUBLIC_SITE_INDEXABLE`   | `false`                      | Master indexing switch. Indexing also requires `production` mode. |
| `NEXT_PUBLIC_SITE_URL`         | `http://localhost:3000`      | Origin for canonical, OG and sitemap URLs.                        |
| `NEXT_PUBLIC_BUYER_SYSTEM_URL` | verified Buyer System origin | Optional override for outbound Buyer System links.                |
| `NEXT_PUBLIC_BOOKING_URL`      | unset                        | Booking calendar linked from Contact and the Home band.           |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | unset                        | Contact email shown on Contact; unset hides the email channel.    |

Every default is the safe one, so a missing or malformed variable can never
accidentally publish the site. See `.env.example`.

## 16. Absolute rule

**Never commit a secret to this repository.**

No API key, token, CRM credential, analytics ID, tag manager container, pixel
ID, webhook URL or personal data. `.env*` files are gitignored except
`.env.example`. CI scans for committed credentials and fails the build if one
appears.

---

---

## Routes and design systems

| Route                        | Purpose                          | Chrome                    | Palette                    | Indexable                         |
| ---------------------------- | -------------------------------- | ------------------------- | -------------------------- | --------------------------------- |
| `/`                          | Repository overview              | `AppChrome`               | Canonical                  | No                                |
| `/foundation`                | Component laboratory             | `AppChrome`               | Canonical                  | No — ever                         |
| `/preview/investment`        | Investment canonical visual base | `WebHeader` / `WebFooter` | Scoped `--sk-web-*`        | No — ever, while under `/preview` |
| `/preview/tax-advisory`      | Tax Advisory visual base         | `WebHeader` / `WebFooter` | Shared scoped `--sk-web-*` | No — ever, while under `/preview` |
| `/preview/property-purchase` | Property Purchase visual base    | `WebHeader` / `WebFooter` | Shared scoped `--sk-web-*` | No — ever, while under `/preview` |
| `/preview/team`              | Team editorial preview           | `WebHeader` / `WebFooter` | Shared scoped `--sk-web-*` | No — ever, while under `/preview` |
| `/preview/home`              | Home implementation preview      | `WebHeader` / `WebFooter` | Shared scoped `--sk-web-*` | No — ever, while under `/preview` |
| `/preview/contact`           | Contact preview                  | `WebHeader` / `WebFooter` | Shared scoped `--sk-web-*` | No — ever, while under `/preview` |

Two token layers coexist deliberately:

- **Canonical** — `app/tokens.css` and `lib/tokens/tokens.json`, byte-identical
  copies of the upstream brand system, verified by `tests/tokens-parity.test.ts`.
  **Never edited here.**
- **Scoped website palette** — `app/web-tokens.css`, namespaced `--sk-web-*`
  (ivory, navy, gold). Approved by Juanma on 2026-09-21 for this repository
  only; it does not replace the global brand system. Every value was sampled
  from the approved Investment template and verified against WCAG AA. See
  `docs/phase-2b-visual-implementation.md` §1.

Page chrome lives with each page rather than in the root layout, which is what
lets the two systems coexist without one bleeding into the other.

## Human visual review

Every visual change requires Juanma's review on the Vercel preview, at mobile
and desktop widths, **before** it is considered accepted or merged. The three
landing bases are accepted for continuation, but every later media, motion,
copy or composition change (Phases 2E–2H, and Team) still requires the same
human gate. A merge, a green test run or a Vercel deployment is not that
review.

**Recorded:** 2026-09-29 — Juanma approved the visual state of the Home at
`/preview/home` (service discovery version), reviewed on the local review
server at mobile and desktop widths. Visual only; not production. The PR's
Vercel preview is available for the same check.

**Recorded:** 2026-09-28 — Juanma approved the present visual state of
`/preview/investment`, `/preview/tax-advisory`, `/preview/property-purchase` and
`/preview/team`. Visual only; not production. Review instructions are
recorded in the relevant landing fidelity/visual-decision documents and the
Phase 2 implementation contract.

## Governance

`AGENTS.md` holds the operating rules for anyone — human or agent — working in
this repository. Read it before making changes.

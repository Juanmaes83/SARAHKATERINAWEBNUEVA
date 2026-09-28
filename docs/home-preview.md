# Preview Home and Buyer System entry points

**Status:** PREVIEW — implemented on `feat/preview-home-calculators`, in its own pull request. Not approved visually, and not approved for production. `noindex, nofollow`, out of the sitemap.
**Date:** 2026-09-28
**Base:** `main` at `ce8edff` (merge of PR #30, Phase 2H closed)
**Route:** `/preview/home`. `/` is unchanged and remains the project index.

This is the commercial Home that `docs/phase-2g-connected-service-journey.md` §10 and `docs/phase-2h-juanma-review.md` §7 recorded as future work. It is not a new phase. It sits inside the preview workstream (Phase 2), and it carries the Buyer System links of Phase 3 as far as they are authorised (§5).

---

## 1. Source: Sarah's direction for the Home

From `REVISION WEB-investment.docx` (Sarah's review, relayed by Juanma):

> …la home ha de ser EMOCIONAL. Tocar el punto de dolor, ofrecer protección para que [no] les engañen y buscar las mejores oportunidades al mejor precio. Hacerles sentir en casa, que están acompañados con un servicio integral. Imágenes mías y del equipo sonriendo, cercanos, amables. Vídeo presentación. Qué hace Sarah por ti. También podemos incluir un apartado de financiación, indicando que trabajamos con varias entidades financieras, como UCI y Sabadell, y que podemos valorar su financiación sin ningún compromiso. También hay que añadir un apartado de reformas, corto, pero que quede claro que nos podemos hacer cargo.

Sarah gave direction, not text. Every Home sentence is therefore English drafted here, marked `proposal` for her (`content/en/home.ts`). Facts reused from other pages keep their confirmed sources: _20 years inside Spain's tax administration_ (CR-002); _Independent — no seller, developer or agency pays for the advice_ (decisions-log 2026-07-27); _Clarity before commitment._ (approved promise).

## 2. What the page does with each point

| Sarah's point                                       | On the page                                                                                                                                                                                                                           | Held back, and why                                                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Emotional; make them feel at home and accompanied   | Hero _"Buy in Spain with someone on your side."_ and a lead about staying _"from the first call to the keys, and after"_                                                                                                              | —                                                                                                                                                       |
| Touch the pain point                                | _"A dream home, far from home, is easy to get wrong."_ plus four worries (listings written to sell, hidden costs, unchecked contracts, unfamiliar paperwork)                                                                          | —                                                                                                                                                       |
| Protection so they are not misled                   | Framed through the confirmed independence model: _"someone in the room whose only job is your interests"_                                                                                                                             | No promise that nobody can mislead them                                                                                                                 |
| The best opportunities at the best price            | _"look for the homes that fit your plans"_                                                                                                                                                                                            | "Best price" is an outcome promise; not used                                                                                                            |
| Integral service                                    | "What Sarah does for you": six steps, from listening first to after the keys; then the three service doors (the Team variant of `ServiceJourney`)                                                                                     | Tax and legal steps carry their review flags                                                                                                            |
| Photos of Sarah and the team, smiling               | The authentic team photograph already approved for Preview (`team-hero.webp`, from `EQUIPO_SARAHKATERINA2.png`), whole, captioned without names                                                                                       | No individual photograph of Sarah: the candidates upstream (`EQUIPO_SARAHKATERINA4–6`) are unlabelled (2H, A-01/A-04). Nothing generated                |
| Presentation video                                  | Not shown, and nothing in its place                                                                                                                                                                                                   | `TU INVERSIÓN MI OBJETIVO` needs an approved Home headline, confirmation that its generated likeness may represent Sarah, and a rights record (2G §2.2) |
| Financing (UCI, Sabadell, no-commitment assessment) | _"Need a mortgage in Spain? … We can look at your financing with you, with no commitment … Any offer, rate and condition comes from the bank itself."_ and a visible line: _"Names of the banks we work with: pending confirmation."_ | Bank names, any working relationship, intermediation, conditions and savings are not stated (§4)                                                        |
| Renovation ("we can take care of it")               | _"Planning to renovate? … we can coordinate it for you afterwards with qualified professionals."_                                                                                                                                     | Direct execution of works is not claimed (§4)                                                                                                           |

## 3. Structure and reuse

In order:

1. Header.
2. Hero: copy, plus the team photo at 16:9 with `object-fit: contain`.
3. Trust strip.
4. **Buyer System hub entry** — Purchase Tax and Real Cash Needed, "after the trust strip" as `docs/buyer-system-integration.md` places it.
5. Worries.
6. What Sarah does (navy).
7. Where to start (the shared `ServiceJourney`, team variant: Investment · Property Purchase · Tax Advisory).
8. Financing and renovation.
9. The team (names and areas from `content/en/team.ts`, linking to `/preview/team`).
10. Final CTA.
11. Footer.

Everything comes from the shared layer (`WebHeader`, `WebFooter`, `WebSection`, `WebHero.module.css`, `WebBands.module.css`, `BuyerToolRibbon`, `ServiceJourney`). `components/web/HomeBands.module.css` holds only the structures with no shared equivalent, and uses tokens only. The final CTA button has no action, like the other landings, because no contact channel is confirmed.

## 4. Reviews needed before production

| #    | Item                                                                                                                                                                                                                                                                                                                         | Who                        |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| H-F1 | **Naming lenders.** UCI and Sabadell may be named only with evidence of the relationship and the lenders' permission to be named publicly.                                                                                                                                                                                   | Sarah                      |
| H-F2 | **Regulatory position of the financing help.** A lawyer must check whether "looking at your financing" and introducing buyers to lenders is credit intermediation, which Spanish law regulates (real-estate credit legislation), and what disclosure or registration it would need. Until then the page describes help only. | Sarah + legal professional |
| H-F3 | "With no commitment": confirm there is no fee and no obligation.                                                                                                                                                                                                                                                             | Sarah                      |
| H-R1 | **Renovation scope.** Confirm whether the service coordinates works, who contracts and pays the professionals, the licence questions, and the liability. "Take care of it" is not published as direct execution.                                                                                                             | Sarah + legal              |
| H-C1 | All Home copy is `proposal`: Sarah's approval of the headline, lead, worries and six steps.                                                                                                                                                                                                                                  | Sarah                      |
| H-V1 | Juanma's visual review of `/preview/home` at mobile and desktop widths.                                                                                                                                                                                                                                                      | Juanma                     |
| H-M1 | Home media: a photograph of Sarah (named, approved) and a presentation video, if wanted.                                                                                                                                                                                                                                     | Juanma / Sarah             |

## 5. Buyer System on this PR

- **Paths confirmed** against the Buyer System code at `main` `c197ed2`: `/` (Purchase Tax), `/real-cash-needed`, `/asking-price` (limited-go, not linked).
- **Origin:** `https://sarah-katerina-buyer-system.vercel.app`, authorised by Juanma on 2026-09-28. It is set as `NEXT_PUBLIC_BUYER_SYSTEM_URL` only in the Vercel Preview environment of `feat/preview-home-calculators`; the checks and scope are in `docs/buyer-system-integration.md` §6. The adapter has no default origin in code. Production is not configured.
- **Reuse only:** `lib/buyer-system/links.ts` (unchanged), `BuyerToolRibbon`, `BuyerToolLink`. No calculator, engine, formula, rate or result is reproduced here. There is no lead capture, no CRM, no external analytics, no query parameter and no cross-origin handoff.
- **Functional status:** the links resolve to the real routes on this PR's Preview (verified by the local build with the same value, §6). Everywhere else, including Production, the entry points stay pending.

## 6. Validation

Local production builds, Chrome through Playwright, 2026-09-28:

| Build                                                            | Routes checked (390 and 1440 px)                        | Result                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| With `NEXT_PUBLIC_BUYER_SYSTEM_URL` set to the authorised origin | home, tax-advisory, property-purchase, investment, team | Links resolve to `https://sarah-katerina-buyer-system.vercel.app/` and `…/real-cash-needed` (both HTTP 200); no link to `/asking-price`; overflow 0; one `h1`; `noindex, nofollow`; no console errors; no visible control under 44px; keyboard focus on a tool link 2px solid, 2px offset |
| Without the variable                                             | the same                                                | No Buyer System link anywhere; every ribbon shows "Link pending approval"; the same layout, heading, noindex and console results                                                                                                                                                          |

Screenshots (without the variable, after the layout fixes): `docs/screenshots/home-preview/`. The GitHub Actions run and the Vercel preview of the exact HEAD are recorded on the pull request.

**Not verified:** Safari/iOS, Android, 200 % zoom, Lighthouse/CWV.

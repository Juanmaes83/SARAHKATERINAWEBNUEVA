# Shared web layer — convergence record

Status: IMPLEMENTED · PREVIEW ONLY · NOT PRODUCTION
Date: 2026-09-22
Phase: 2D
Routes affected: `/preview/investment`, `/preview/tax-advisory`, `/preview/property-purchase`

---

## 1. The decision this implements

> Investment is the canonical visual base of the new Sarah Katerina site. Tax
> Advisory adapts to that base. A second parallel visual architecture is not
> permitted.

Phase 2B built Tax Advisory on its own layer while Investment was being merged
to `main` on a different one. Both defined `--sk-web-*` tokens, both supplied a
header, a footer, a button, a card grammar and a chrome switcher. The token
names collided with **different values**, so whichever stylesheet imported last
would have silently restyled the other landing. This document records how that
was resolved.

---

## 2. What is canonical

| Concern                                      | Canonical source                                     |
| -------------------------------------------- | ---------------------------------------------------- |
| Palette and web tokens                       | `app/web-tokens.css`                                 |
| Section grammar, headers                     | `components/web/WebSection.tsx`                      |
| Hero composition                             | `components/web/WebHero.module.css`                  |
| Buttons                                      | `components/web/WebButton.tsx`                       |
| Cards, grids, timeline, chain, report panels | `components/web/WebBands.module.css`                 |
| Icons                                        | `components/web/icons/Icon.tsx`                      |
| Missing-photography stand-in                 | `components/web/TerritoryVisual.tsx`                 |
| Illustrative charts                          | `components/web/SampleChart.tsx`                     |
| Dashboard card                               | `components/web/DashboardCard.module.css`            |
| Site header                                  | `components/web/WebHeader.tsx`                       |
| Site footer                                  | `components/web/WebFooter.tsx`                       |
| FAQ disclosures                              | `components/web/WebFaq.tsx`                          |
| Motion                                       | `components/motion/RevealOnScroll.tsx`               |
| Page chrome placement                        | `app/layout.tsx` + `components/layout/AppChrome.tsx` |

---

## 3. What was removed

Every one of these was a Phase 2B duplicate of something above.

| Removed                                                                                                                                                             | Replaced by                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `app/tokens.web.css` (a second `--sk-web-*` layer with different navy, gold, ink and ivory values)                                                                  | `app/web-tokens.css`                                                       |
| `components/navigation/SiteChrome.tsx` (a second chrome switcher)                                                                                                   | `app/layout.tsx` + `AppChrome`                                             |
| `lib/seo/config.ts` → `SELF_CHROMED_ROUTES` / `isSelfChromed`                                                                                                       | not needed under main's model                                              |
| `components/tax-advisory/TaxHeader.tsx` + module                                                                                                                    | `WebHeader`                                                                |
| `components/tax-advisory/TaxFooter.tsx` + module                                                                                                                    | `WebFooter`                                                                |
| `components/tax-advisory/TaxCta.tsx` + module                                                                                                                       | `WebButton`                                                                |
| `components/tax-advisory/Primitives.tsx` + module (Band, SectionHead, StatusMark, ScriptNote, EditorialMedia, Numeral)                                              | `WebSection`, `WebSectionHeader`, `TerritoryVisual`, `WebBands.module.css` |
| `components/tax-advisory/EditorialIcon.tsx` (a second icon set)                                                                                                     | `components/web/icons/Icon.tsx`                                            |
| `components/tax-advisory/PreviewNotice.tsx` + module                                                                                                                | `components/sections/PrototypeBanner.tsx`                                  |
| `components/tax-advisory/sections/*` (15 files, own stylesheets)                                                                                                    | `components/web/TaxBands.tsx` on the shared stylesheets                    |
| `docs/web-palette-contrast.md` (documented the removed palette)                                                                                                     | this document, §6                                                          |
| `public/brand/SK_LOGO_CLEAN.png`, `public/brand/sk-wordmark.png`, `public/sarah/AUTH-SK-001-editorial-portrait.jpg`, `public/sarah/AUTH-SK-002-portrait-square.jpg` | the canonical paths in §5 — **each pair was byte-identical**               |

---

## 4. What Tax Advisory still owns, and why

Four structures, all in `components/web/TaxBands.module.css`, all justified in
that file next to the code:

| Structure                               | Why the shared layer cannot express it                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Annual tax calendar**                 | Investment has no twelve-month obligation chart, and no `SampleChart` variant expresses a horizontal span across a fixed year. The one genuinely new layout. |
| **Hero document spines + video marker** | The Tax Advisory template layers labelled tax-document spines over its hero and offers an intro video. The Investment hero has neither.                      |
| **Audience profile list**               | The template marks profiles with a gold arrow in a three-column list, not with the check used inside Investment's cards.                                     |
| **Service sub-item line**               | The three service blocks absorb detail that would otherwise need extra cards, so each needs one secondary line Investment's cards do not have.               |

Plus one modifier: `.timelineSix`, because the shared `.timeline` is a
five-column grid and the Tax Advisory process has six steps. The shared rule is
untouched; the modifier applies only on this landing.

**Rule for the next landing:** if Property Purchase needs one of these, promote
it into the shared layer rather than copying it.

---

## 5. Tokens consolidated

One file declares the website palette: `app/web-tokens.css`. A test asserts
that no other stylesheet declares a `--sk-web-*` value, and that
`--sk-web-navy`, `--sk-web-gold`, `--sk-web-ink` and `--sk-web-ivory` are each
declared exactly once in the repository.

The Investment values were kept unchanged. The Tax Advisory template's gold is
slightly lighter than Investment's; per the decision, the visual intent is kept
and the canonical value is used.

**One token was added**, and it is not a colour:

```css
--sk-web-calendar-label: 190px;
```

The label column of the tax calendar. It lives in the canonical file rather
than a landing stylesheet so there stays exactly one token file.

### Assets

| Canonical path                         | md5                                | Source                                               |
| -------------------------------------- | ---------------------------------- | ---------------------------------------------------- |
| `public/brand/BRAND-001-original.png`  | `bb6c3d7569f7ca30469b50b5c9764a2a` | mother repo, byte-identical                          |
| `public/brand/sarah-katerina-logo.png` | `9dc389ebf487900ed26c60002fd0125e` | the same mark, cropped to its own alpha bounding box |
| `public/sarah/sk-real-1.jpg`           | `030afe42af7a62e28cb290e1e2d7b329` | `AUTH-SK-001`, byte-identical                        |
| `public/sarah/sk-real-2.jpg`           | `474f32ce619be759a1718e1124b3f054` | `AUTH-SK-002`, byte-identical                        |

The Phase 2B imports were independently made from the same upstream originals
and produced **identical bytes**, including the alpha-bbox crop. The duplicates
were deleted; the canonical names remain. Hashes are asserted by test.

---

## 6. How we verify Investment does not break

Automated, on every run:

- `tests/tax-advisory.test.ts` → `investment is unaffected`: asserts the
  Investment page still renders all sixteen of its bands, and that `WebFooter`
  and `WebFaq` — which became configurable in this phase — still default to the
  Investment content when no prop is passed.
- `tests/landing-structure.test.ts` (unchanged, from `main`) continues to
  govern the Investment composition.
- `tests/tokens-parity.test.ts` still hashes the canonical brand tokens.
- The `converged web layer` suite fails if a second `--sk-web-*` declaration,
  a second header/footer/button, or a re-declared navy or gold ever reappears.

Manual, this run — **all three routes measured with the same script, at 320 / 375 /
390 / 768 / 1024 / 1440**:

| Check | `/preview/investment` | `/preview/tax-advisory` | `/preview/property-purchase` |
|---|---:|---:|---:|
| Horizontal overflow | none | none | none |
| Elements left hidden after scroll | 0 | 0 | 0 |
| One H1 / header / main / footer | yes | yes | yes |
| Heading-level skips | 0 | 0 | 0 |
| Images without `alt` | 0 | 0 | 0 |
| Interactive targets below 44×44 px | 0 | 0 | 0 |
| Keyboard/focus and mobile-menu checks | pass | pass | pass |
| FAQ independent disclosures | pass | pass | pass |
| `prefers-reduced-motion`: hidden / animating | 0 / 0 | 0 / 0 | 0 / 0 |

The three landing implementations now share the same web layer and are
registered as the visual bases for the next enrichment phase. This does not
approve their media, copy claims or production destinations for publication.

### The three canonical contrast near-misses are resolved

Before this resolution, both integrated routes failed the **same three
pairings**, from the **same shared classes**:

| Class                | Foreground                                      | Background                        | Measured | Needs |
| -------------------- | ----------------------------------------------- | --------------------------------- | -------- | ----- |
| `WebBands_script`    | `#8a6a2f` (`--sk-web-gold`)                     | `#f4f0e7` (`--sk-web-ivory-soft`) | **4.41** | 4.5   |
| `WebSection_eyebrow` | `#8a6a2f`                                       | `#f4f0e7`                         | **4.41** | 4.5   |
| `WebBands_limit`     | `#7c8e9c` (composited `--sk-web-muted-on-dark`) | `#142837` (`--sk-web-navy-soft`)  | **4.47** | 4.5   |

Root cause: `app/web-tokens.css` validates `--sk-web-gold` against
`--sk-web-ivory` (4.77:1 — correct) but never against `--sk-web-ivory-soft`,
and both landings put gold text on soft bands.

| Gold on                         | Ratio      |
| ------------------------------- | ---------- |
| `--sk-web-ivory` `#fbf9f5`      | 4.77 ✓     |
| `--sk-web-ivory-soft` `#f4f0e7` | **4.41 ✗** |
| `--sk-web-white` `#fefdfb`      | 4.94 ✓     |

The PR #8 integration applies the scoped remedies requested for all three
landings. `WebBands_script` and light-surface `WebSection_eyebrow` now use the
existing `--sk-web-gold-strong` token (5.14:1 on ivory-soft). Dark-surface
eyebrows keep `--sk-web-gold-on-dark`. `WebBands_limit` keeps
`--sk-web-muted-on-dark` at full opacity (6.78:1 on navy-soft). No palette token
value changed, so Investment's approved global colours remain intact.

Tax Advisory had already fixed its calendar aside by using `--sk-web-ivory`
(4.77) instead of soft ivory behind a gold eyebrow. The shared corrections
above complete the same contrast work without changing the approved palette.

---

## 7. Property Purchase integration outcome

Property Purchase now follows the established pattern:

1. `content/en/property-purchase.ts` supplies the shapes the shared
   components expect: `nav`, `headerCta`, `seo`, `PROTOTYPE_NOTICE`, `hero`,
   `faq`, `footer`, plus the landing's own sections. It follows the Investment
   conventions: illustrative values as **plain strings** outside the claim
   graph, unconfirmed headline figures as a `pending` claim so the shared
   components render the small pending dot.
2. Its landing-specific compositions live in `PropertyPurchase.tsx` and
   `PropertyPurchase.module.css`; they reuse canonical tokens and primitives and
   do not declare a second visual system.
3. Reuse `WebHeader`, `WebFooter content={…}`, `WebFaq content={…}`,
   `WebButton`, `Icon`, `TerritoryVisual`, `SampleChart`, `WebSection`.
4. The route remains `/preview/property-purchase`, `laboratory: true`.
5. The `converged web layer` suite covers the new landing with the
   same one-system assertions.
6. QA is run against all three routes at the same six required widths.

**Do not** add a second token file, a second header, a second footer, a second
button or a second icon set. The tests will fail, and so will the review.

---

## 8. What is still open

- The Tax Advisory template's gold is lighter than the canonical gold. Visual
  intent preserved, exact hue not. Worth confirming at the visual gate.
- Property Purchase has passed Juanma's human visual review as a visual base for
  continuation. It still needs approved photography/video, governed case
  evidence, live CTA/Buyer System destinations and production approval.

## 9. PR #8 conflict resolution

The branch was integrated over `origin/main` containing Tax Advisory merge
`0967fe2281845559b6e5b1c2acd0531ed5a2e085` with a normal merge. Only
`WebFaq.tsx` and `WebFooter.tsx` conflicted. The resolution keeps main's
`WebFaqContent` and `WebFooterContent` contracts, Investment defaults, Tax
Advisory content props, accessible independent FAQ disclosures, canonical logo
plate, shared navigation groups and single preview/noindex note. Property
Purchase passes its own content through those contracts. There is one header,
one footer, one FAQ implementation and one `app/web-tokens.css`; no parallel
architecture was restored.

### Post-merge QA

All three routes were checked at 320, 375, 390, 768, 1024 and 1440 px. Each
has one H1, header, main and footer; zero horizontal overflow; no visible target
below 44 by 44 px; no heading-level skip; independent labelled FAQ regions; a
focus-trapped mobile dialog that closes with Escape and returns focus; and zero
hidden reveal content or long animation with reduced motion. Tax Advisory keeps
its annual calendar and three service blocks. Property Purchase keeps seven
file stages and six process steps. `robots.txt` disallows `/`, `sitemap.xml`
contains an empty urlset, and all preview responses emit
`X-Robots-Tag: noindex, nofollow`.

The deployed Preview additionally verifies canonical and Open Graph URLs
against its generated `VERCEL_URL` when `NEXT_PUBLIC_SITE_URL` is absent. This
is deployment-scoped metadata only: no production domain or DNS setting is
created or changed.


## 10. Baseline acceptance and next workstream

On 2026-09-22 Juanma accepted the three coordinated routes as visual
implementation bases:

- `/preview/investment` — canonical visual base;
- `/preview/tax-advisory` — adapted to the canonical base;
- `/preview/property-purchase` — adapted to the canonical base.

This acceptance closes the current structural convergence gate. It is not
approval for production, publication, indexation, legal claims or migration.
The next workstream is **Phase 2E — Premium Media, Motion & Visual Refinement**.

Phase 2E will import selected media from the mother repository only after each
asset has documented provenance, route/slot assignment, crop and treatment.
It will extend the shared motion foundation with purposeful transitions and
effects, preserve `prefers-reduced-motion`, and keep all three routes on the
same tokens, chrome and component layer. Juanma's visual review remains
mandatory before each merge.

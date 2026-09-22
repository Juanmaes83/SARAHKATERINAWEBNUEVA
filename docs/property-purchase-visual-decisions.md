# Property Purchase visual decisions

**Status:** implemented for Draft PR and human visual review
**Date:** 2026-09-22
**Route:** `/preview/property-purchase`
**Production approval:** not granted

## Decisions taken

| Area               | Decision                                                                                                         | Basis                                                                            | State                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------- |
| Visual source      | Follow the exact Property Purchase template section order and composition, not Investment's content architecture | Phase 2 contract and template                                                    | Implemented                                     |
| Palette            | Use the approved scoped ivory, navy and gold web tokens                                                          | Phase 2 decision, 2026-09-21                                                     | Implemented                                     |
| Logo               | Use BRAND-001 unchanged, including its teal                                                                      | Authentic reference register                                                     | Implemented; visual review pending              |
| Copy               | Use a faithful English editorial adaptation of the template                                                      | Template approved as Phase 2 copy source                                         | Implemented as classified proposals             |
| Hero media         | Preserve a wide media slot with a labelled territory schematic                                                   | Required image missing; no stock or synthetic documentary image allowed          | Provisional                                     |
| File still life    | Build a detailed semantic document composition                                                                   | Template object is important to the concept; no approved still-life asset exists | Implemented, labelled illustrative              |
| File tracker       | Reproduce seven visible stages, progress line and document-control panel                                         | Direct template structure                                                        | Implemented, labelled illustrative              |
| Process            | Reproduce six process cards without promising template timings                                                   | Timings are unverified operational/legal claims                                  | Implemented with timing gap documented          |
| Pre-sign dashboard | Reproduce report, checks and three-way recommendation as an illustrative interface                               | Phase 2 permits clearly labelled samples                                         | Implemented                                     |
| Calculators        | Purchase Tax after the opening argument; Real Cash Needed after process                                          | Buyer System integration contract                                                | Controlled state until approved base URL exists |
| Service cards      | Preserve three-card proportions and scope comparison; withhold pricing                                           | Pricing and delivery promises unapproved                                         | Implemented                                     |
| Authority          | Use AUTH-SK-002 and confirmed independence/experience signals                                                    | Authentic asset and credential register                                          | Implemented; crop review pending                |
| Cases              | Preserve three media-led case slots while withholding evidence                                                   | No permissions, real images or verified outcomes                                 | Implemented as blocked slots                    |
| Motion             | Reuse native reveal, hover and line transitions                                                                  | Investment Phase 2C pattern                                                      | Implemented with full reduced-motion fallback   |
| SEO                | One H1, preview canonical from environment, OG metadata, noindex and empty sitemap                               | Repository SEO contract                                                          | Implemented                                     |

## Decisions pending Juanma

1. Supply or select the real hero photograph, or authorise a specific video and
   poster. The current visual is intentionally provisional.
2. Supply approved property/Costa Blanca photography for the audience, service,
   cases and final CTA slots.
3. Approve or reject the AUTH-SK-002 authority crop.
4. Decide whether to commission a governed Property Purchase lockup and a real
   signature asset.
5. Approve CTA wording and the destination/contact route. Current CTAs navigate
   within the preview and do not capture leads.
6. Confirm the Buyer System public origin before calculator links become live.
7. Obtain legal, tax and financial review for all marked claims, service scope,
   pricing and timings.
8. Decide whether case evidence and client permissions will be supplied or the
   whole case band should be removed before production.

## Assets used

- `public/brand/sarah-katerina-logo.png` - BRAND-001, unchanged.
- `public/sarah/sk-real-2.jpg` - AUTH-SK-002, authority portrait.
- `TerritoryVisual` - conceptual, visibly labelled schematic placeholders.
- Native HTML/CSS document, tracker and dashboard objects - illustrative, not
  client evidence.

## Assets missing

Hero buyer/property image; optional hero video and poster; real property and
Costa Blanca photography; document still-life photography; case-study images
and permissions; panorama; signature; approved dark-surface service lockup;
Open Graph image; favicon.

## Differences from the template

- Real photography is replaced with labelled schematics in every unresolved
  media slot.
- Unsupported figures, prices, timings, case outcomes and testimonials are
  withheld.
- The template's Property Management handoff is omitted because that subject is
  held upstream.
- The script type treatment uses the governed display serif italic; no script
  font is approved.
- The canonical logo replaces the ungoverned service lockup.
- Calculator entry points are integrated into the editorial flow even though
  they are not explicit large bands in the template; this follows the Property
  Purchase activation brief.
- Web sections are taller than the 941 px-wide composite screenshot so text,
  controls and touch targets remain readable on an actual responsive page.

## Risks

**Visual:** the hero and repeated property slots cannot reach full template
fidelity without approved photography. The authority portrait is low resolution
and visibly soft at large desktop sizes.

**Claims:** legal and tax scope, service inclusions, pricing, response times and
case outcomes all require human/domain review. The preview labels illustrative
interfaces and withholds evidence rather than presenting it as fact.

**Functional:** contact CTAs currently navigate within the preview. Buyer System
links fail closed while `NEXT_PUBLIC_BUYER_SYSTEM_URL` is unset. No forms,
capture, CRM, analytics destination or cross-origin context handoff were added.

## Section status

Navigation, hero, trust, audience, one-file dossier, file tracker, ordered
process, pre-sign dashboard, objections, services, authority, cases, journey,
FAQ, final CTA and footer are implemented. No structural template section is
missing. Photography, approved evidence and live destinations remain pending.

## QA evidence

Verified locally on 2026-09-22 against the implemented route:

- `lint`, isolated `typecheck`, 71 automated tests and production build.
- Browser screenshots at 320, 375, 390, 768, 1024 and 1440 px in
  `output/playwright/` (local QA artifacts, not production assets).
- No horizontal overflow at any required width.
- One H1; section/item headings remain H2/H3 and no H4-H6 are rendered.
- Every visible link/button measures at least 44 x 44 CSS px.
- Keyboard focus is a 2 px solid outline with 2 px offset.
- Mobile menu opens as a dialog, moves focus inside and closes with Escape.
- FAQ buttons update `aria-expanded` and expose a labelled region.
- Under `prefers-reduced-motion: reduce`: zero hidden reveal elements, zero CSS
  animations and zero transitions longer than 50 ms.
- Page meta and HTTP header both emit `noindex, nofollow`; preview canonical and
  Open Graph URL derive from `NEXT_PUBLIC_SITE_URL`.
- Sitemap is an empty `<urlset>` and `robots.txt` disallows `/` in preview.
- No browser console errors were present after the final reload.

Not executed: Lighthouse, PageSpeed Insights, axe, Core Web Vitals collection or
physical-device testing.

## Consolidation phase

After Investment, Tax Advisory and Property Purchase have each passed human
visual review, consolidation should reconcile shared header/footer copy,
approved navigation routes, CTA destinations, photography art direction,
language routing, OG assets, legal schema decisions and the live Buyer System
origin. No consolidation or merge is authorised by this document.

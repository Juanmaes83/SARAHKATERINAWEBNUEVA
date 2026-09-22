# Property Purchase asset map

**Status:** active implementation record, pending Juanma asset decisions
**Date:** 2026-09-22

**Post-merge asset check:** integration over Tax Advisory main
`0967fe2281845559b6e5b1c2acd0531ed5a2e085` added no Property Purchase asset,
changed no source file or crop, and created no duplicate logo. Header and
footer still render the canonical BRAND-001 asset from the shared web layer.

The mother repository is read-only. No template screenshot is used as a
production asset. No stock or generated scene is presented as a real property,
buyer, client or Costa Blanca location.

| Asset / slot                 | Source                                                                                                                                    | Section            | Ratio and crop                                                               | Desktop / mobile                                             | Alt text                                                  | Classification                              | Approval                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------- |
| Canonical logo               | `sarahkaterina/IMAGENES NUEVAS/IMAGENES CON PROMPTS/IMAGENES NUEVASLOGO SARAH KATERINA.png.png` -> `public/brand/sarah-katerina-logo.png` | Header, footer     | Intrinsic; no crop or recolour                                               | Same file, CSS-constrained width                             | `Sarah Katerina`                                          | `BRAND-001`, governed mark                  | Correct asset confirmed; placement pending visual review                     |
| Sarah portrait               | `sarahkaterina/IMAGENES NUEVAS/SK_REAL_2.jpg` -> `public/sarah/sk-real-2.jpg`                                                             | Authority          | 1:1; `object-fit: cover`; centred face                                       | Same file; full-width mobile, fixed authority column desktop | `Portrait of Sarah Katerina.`                             | `AUTH-SK-002`, authentic identity reference | Authenticity confirmed; placement pending visual review                      |
| Hero buyer meeting           | Not available                                                                                                                             | Hero               | Template approx. 16:9; text-safe crop to right on desktop, centred on mobile | Separate crop decision required if supplied                  | To describe the real scene supplied                       | Missing real asset                          | **Decision required:** image, video, supplied asset or temporary placeholder |
| Hero video                   | Not available                                                                                                                             | Hero               | 16:9, poster required                                                        | No autoplay dependency; reduced-motion poster                | Transcript/title required if supplied                     | Missing                                     | Requires explicit authorisation                                              |
| Audience property / viewing  | Not available                                                                                                                             | Audience           | Approx. 2:1 landscape                                                        | 16:10 mobile crop                                            | To name the real location/property when known             | Missing real asset                          | Pending Juanma                                                               |
| File still life              | CSS composition built from semantic document cards                                                                                        | One file           | 4:3                                                                          | Same composition reflowed                                    | `Illustrative purchase file with ordered document cards.` | Clearly illustrative interface object       | Pending visual review; replace if approved real still exists                 |
| File tracker                 | Native HTML/CSS                                                                                                                           | File front to back | 7-column desktop / vertical mobile                                           | Reflows without horizontal overflow                          | Stage labels remain text                                  | Interface, not a photograph                 | No asset approval required                                                   |
| Pre-sign report              | Native HTML/CSS                                                                                                                           | Before you sign    | Wide dashboard                                                               | Stacked panels on mobile                                     | Accessible headings and illustrative note                 | Illustrative sample interface               | Permitted by Phase 2 contract when clearly labelled                          |
| Service-card property images | Not available                                                                                                                             | Service options    | 4:3                                                                          | 16:10 mobile                                                 | To describe each actual approved image                    | Missing real assets                         | Pending Juanma; labelled schematic slots used                                |
| Case-study images            | Not available                                                                                                                             | Cases              | 16:10                                                                        | Same ratio all widths                                        | Withheld until evidence and permission exist              | Blocked                                     | Client permission and verified assets required                               |
| Final CTA panorama           | Not available                                                                                                                             | Final CTA          | Approx. 3:1 desktop / 16:9 mobile                                            | Art direction required                                       | To name the actual Costa Blanca view                      | Missing real asset                          | Pending Juanma                                                               |
| Template screenshot          | `sarahkaterina/website/nueva web/Sarah Katerina Property Purchase.png`                                                                    | Review only        | 941 x 1672                                                                   | Side-by-side QA only                                         | Not rendered                                              | Visual proposal reference                   | Never a production asset                                                     |

## Provisional visual policy

Missing photography is represented by the existing `TerritoryVisual`
schematic system or by detailed HTML/CSS document and dashboard objects. Every
schematic names itself as conceptual and not a real property photograph. The
slots retain the template's proportions so approved photography can replace
them without restructuring the page.

## Decisions required from Juanma

1. Select or supply the hero photograph, or authorise a specific video and its
   poster.
2. Select real property/Costa Blanca images for the audience, service, case and
   final CTA slots, with public-use permission.
3. Confirm whether the current AUTH-SK-002 crop is acceptable for the authority
   section.
4. Decide whether a governed Property Purchase lockup and Sarah signature asset
   will be commissioned. Until then, BRAND-001 remains unchanged and no
   signature is drawn.

These missing assets remain the only media blockers after conflict resolution;
no Tax Advisory, Investment, mother-repository or Buyer System asset was copied,
modified or replaced during the merge.

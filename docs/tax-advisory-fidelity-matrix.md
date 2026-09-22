# Tax Advisory — fidelity matrix

Status: FOR JUANMA'S VISUAL REVIEW · NOT APPROVED · NOT PRODUCTION
Date: 2026-09-22
Route: `/preview/tax-advisory`
Reference: `website/nueva web/Sarah Katerina Tax Advisory.png`

Section-by-section comparison against the template. `Matches` means the
composition, order and hierarchy follow the reference. `Deviates` means
something differs, and the reason is stated.

---

## 1. Section-by-section

| #   | Template band                    | Implemented                          | Composition            | Notes                                                                                                                                                                                |
| --- | -------------------------------- | ------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Header                           | `WebHeader` (shared)                 | Matches                | Real logo, nav, EN/ES, gold CTA, sticky, mobile dialog. Nav targets are in-page anchors: the template's six public routes do not exist.                                              |
| 2   | Hero                             | `TaxHero`                            | Matches                | Split composition, portrait right, navy data card over the image, trust signals under the CTAs, script marginalia. Document spines kept as typography.                               |
| 3   | Trust strip                      | `TaxTrustBand`                       | Matches                | Four positions with icons + script closing right.                                                                                                                                    |
| 4+5 | Problem/context **and** audience | `TaxContextBand` — **one band**      | Matches the template   | The template composes these as a single band: headline left, arrow-marked profiles, image right with script over it. Phase 2B split them in two, which changed the rhythm. Restored. |
| 6   | Annual tax calendar              | `TaxCalendarBand`                    | Matches                | Twelve-month gantt, six obligations, aside with its own CTA. Labelled `Illustrative`.                                                                                                |
| 7   | Process                          | `TaxProcessBand`                     | Deviates — layout only | Six numbered stages with deliverables, as the template. Laid out 3 × 2 rather than 6 in a row: the shared timeline is a five-column grid and 6 would orphan one card.                |
| 8   | Report preview (navy)            | `TaxReportBand`                      | Matches                | Four panels — exposure summary, calendar, treaty, breakdown — plus the four-item deliverables list and CTA. Every panel tagged `Illustrative`.                                       |
| 9   | Concerns                         | `TaxConcernsBand`                    | Matches                | Headline left, numbered objections, image right with script.                                                                                                                         |
| 10  | Services                         | `TaxServicesBand` — **three blocks** | Matches the template   | The template shows three. Phase 2B expanded to six, turning a composition into a catalogue. Restored to three; nothing dropped — see §3.                                             |
| 11  | Authority (navy)                 | `TaxAuthorityBand`                   | Matches                | Portrait left, headline, body, CTA, four points right, pull quote, signature slot, stated limits.                                                                                    |
| 12  | Cases                            | `TaxCasesBand`                       | Matches structurally   | Three cards that read as real files; client, town, year and result withheld.                                                                                                         |
| 13  | Continuity                       | `TaxJourneyBand`                     | Deviates — one step    | Four-step chain. The template's fourth step is a property-management brand, which is held publicly; replaced by an annual review, stated on the page.                                |
| 14  | FAQ                              | `WebFaq` (shared)                    | Matches                | Twelve disclosures, two columns at desktop, independent open/close.                                                                                                                  |
| 15  | Final CTA (navy)                 | `TaxFinalCtaBand`                    | Matches                | Headline, body, two CTAs, reassurance note, schematic right with script.                                                                                                             |
| 16  | Footer                           | `WebFooter` (shared)                 | Matches                | Logo on ivory plate, four link columns, language, preview status. One quiet routes note rather than a marker per link.                                                               |

---

## 2. Fidelity dimensions

| Dimension        | Status                            | Note                                                                                                                       |
| ---------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Order            | Matches                           | All sixteen template bands, in template order. A test asserts it.                                                          |
| Proportions      | Matches                           | Hero, cards, report panels and bands inherit the Investment geometry, which was built against the shared template grammar. |
| Spacing          | Matches the canonical base        | `WebSection` rhythm, not a second scale.                                                                                   |
| Hierarchy        | Matches                           | One `h1`, `h2` per section, `h3` per item, no level skipped. Verified at six widths.                                       |
| Columns          | Matches, two exceptions           | Process 3 × 2 (see §1 #7); profiles run three-up under the headline.                                                       |
| Backgrounds      | Matches                           | Ivory / soft / white / navy / navy-soft alternation from `WebSection`. Three navy bands, as the template.                  |
| Dividers         | Matches                           | Shared `rule` under section headers.                                                                                       |
| Icons            | Matches                           | The shared 24 × 24 single-stroke set. No second icon system.                                                               |
| Cards            | Matches                           | Shared `mediaCard` for services and cases.                                                                                 |
| Images           | Deviates                          | See §4.                                                                                                                    |
| Dashboards       | Matches                           | Shared `DashboardCard` geometry and `SampleChart` shapes.                                                                  |
| CTAs             | Matches                           | Shared `WebButton`, gold primary, outline secondary, arrow on hover.                                                       |
| Editorial rhythm | Matches                           | Script marginalia in five places, as the template.                                                                         |
| Mobile           | Matches, with its own composition | Calendar rows restack label-above-track; hero stacks; cards single-column; nothing is merely a squeezed desktop.           |

---

## 3. Services — what happened to the other three cards

Phase 2B rendered six cards. The template has three. Nothing was dropped:

| Phase 2B card          | Now lives in                                                           |
| ---------------------- | ---------------------------------------------------------------------- |
| Tax diagnostic         | Block 1 — unchanged                                                    |
| Personal tax review    | Block 1, `also` line                                                   |
| Annual compliance      | Block 2 — unchanged                                                    |
| Modelo 210             | Block 2, first bullet; also a process stage and a trust-strip position |
| Purchase + tax overlay | Block 3 — unchanged                                                    |
| Wealth and assets      | Block 3, `also` line; also a process stage                             |

---

## 4. Images — what differs and what is needed

| Slot                 | Template                                                                 | Implemented                                                                                        | Needed from Juanma                                                                         |
| -------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Hero media           | Generated scene: Sarah at a desk with tax documents, Costa Blanca behind | `AUTH-SK-001`, the authentic portrait, used directly; place signal carried by a declared schematic | A licensed location photograph, or approval of the schematic. Ratio 4 : 5.                 |
| Hero documents       | Photographed document spines                                             | Typographic chips                                                                                  | Nothing — fabricating paperwork is not acceptable                                          |
| Hero video           | "VER VÍDEO (1 MIN)"                                                      | `Intro video in production` marker                                                                 | The video, or a decision to drop the affordance                                            |
| Context band image   | Coastline and villas                                                     | `TerritoryVisual variant="coast"`                                                                  | Location photography, 3 : 2                                                                |
| Concerns band image  | Villa with pool                                                          | `TerritoryVisual variant="district"`                                                               | Lifestyle photography, 3 : 2                                                               |
| Service cards ×3     | Documents, laptop, villa                                                 | `TerritoryVisual` per block                                                                        | Service photography, 16 : 9                                                                |
| Case cards ×3        | Property photographs                                                     | `TerritoryVisual` per case                                                                         | Permissioned case photography, 16 : 9                                                      |
| Final CTA image      | Coastal panorama                                                         | `TerritoryVisual variant="coast"`                                                                  | Location photography, 3 : 2                                                                |
| Authority portrait   | Seated portrait                                                          | `AUTH-SK-002`, authentic                                                                           | A higher-resolution colour frontal — the register calls this one "recompressed, sub-grade" |
| Footer logo on navy  | Reversed white logo                                                      | Real mark on an ivory plate                                                                        | A dark-ground variant, or approval of the plate                                            |
| Pull-quote signature | Handwritten signature                                                    | Reserved slot, marked pending                                                                      | The signature asset, or a decision to drop it                                              |

No stock was used, nothing was generated, no template screenshot was used as
an asset, and the mark was not redrawn or recoloured.

---

## 5. Figures the template carries that this page does not publish

Handled the way Investment handles them: the position and design are kept, the
value is either an explicitly labelled illustrative sample or a quiet pending
mark. No red badges repeated down the page.

| Template                                                                    | Here                                                                                                                                           |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| "€ 24.500 / total estimado anual / ↓ -18%"                                  | Illustrative sample values in the hero card and report panels, each tagged `Illustrative`, with a footnote saying they are not a client result |
| "Desde € 350 / € 950 al año / € 1.500"                                      | No price. One quiet line: scope and fees are confirmed in writing before work starts                                                           |
| "160+ compradores extranjeros"                                              | Position kept, figure replaced by "International owners" with a small pending dot                                                              |
| "20 años dentro de la administración fiscal"                                | Published, `confirmed`, citing `credential-register.csv` CR-002 — the same treatment Investment gives it                                       |
| "Entrega en 5 días", "Respuesta en 1 día laborable"                         | Omitted entirely; no turnaround is confirmed                                                                                                   |
| "Altea · 2023 · Propietario británico · € 12.400" and two more              | Cards read as real files; town, year, nationality and amount withheld, reason stated once                                                      |
| "…dentro de SUMA y la administración tributaria en la Comunidad Valenciana" | Neither the body nor the region is repeated                                                                                                    |
| Calendar bar dates                                                          | Layout reproduced, tagged `Illustrative`, with a line saying no filing period is stated                                                        |
| "VITA HOST" continuity step                                                 | Replaced by an annual review; the substitution is stated on the page                                                                           |

---

## 6. Remaining differences — the list for the visual gate

1. Process runs 3 × 2, not 6 across.
2. Eight photographic slots are schematics (§4).
3. Hero media is an authentic monochrome portrait, not the template's generated desk scene.
4. The continuity chain's fourth step is substituted.
5. Script marginalia are set in Fraunces italic; no handwriting face is approved.
6. Footer logo sits on an ivory plate; no reversed variant exists.
7. Gold is the canonical Investment gold, slightly darker than the Tax Advisory template's.
8. No price, no turnaround, no client-count figure anywhere.
9. Case results are withheld.
10. Header navigation is in-page; the template's six public routes do not exist.

---

## 7. Not claimed

No Lighthouse score, PageSpeed result, Core Web Vitals measurement, axe run or
real-device test was performed. What was measured is in
`docs/shared-web-layer-convergence.md` §6.

# Phase 2E — Visual content upgrade (Investment · Property Purchase · Tax Advisory)

Status: **DELIVERED FOR HUMAN VISUAL REVIEW — NOT APPROVED, NOT MERGED, NOT PRODUCTION**
Date: 2026-10-23
Branch: `feat/phase-2e-premium-media-motion-2026-09-22` (Draft PR #21)
Starting point: `4f196e5` (PR #21 head) + `origin/main` `da9b4fb` merged as `ad3d676`
Brief: `IMAGES/MEJORAS 23 OCTUBRE/PHASE-2E-VISUAL-CONTENT-UPGRADE-BRIEF.md`
Scope: `/preview/investment`, `/preview/property-purchase`, `/preview/tax-advisory`.
Team is out of scope and unchanged.

> **Merge state (checked 2026-09-28):** merged to `main` with PR #21 (`c8eb579`, 2026-09-23). The human visual review is still pending; nothing here is approved. The "2026-10-23" dates in this record are not calendar dates of the work: git shows it was committed on 2026-09-23; "23 OCTUBRE" is the name of the brief's folder.

Nothing here touches production, domain, DNS, indexation, forms or CTA
destinations. No figure, price, result, testimonial, town or timing visible in
the references was copied; `tests/visual-content-upgrade.test.ts` enforces it.

---

## 1. Materials inventoried (`IMAGES/MEJORAS 23 OCTUBRE/`, on `main`)

| File                                                                                          | Size    | Used as                                                |
| --------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------ |
| `PHASE-2E-VISUAL-CONTENT-UPGRADE-BRIEF.md`                                                    | —       | Governing brief, read in full                          |
| `MEJORAR Y COMPARAR CONTENIDO INVESTMENT 1 Y ADAPTAR ESTILO.png`                              | 937×520 | Reference: Approach, Doors, Asset types, Process       |
| `MEJORAR Y COMPARAR CONTENIDO INVESTMENT 3 Y ADAPTAR ESTILO.png`                              | 936×295 | Reference: Cases, Journey, FAQ                         |
| `MEJORAR Y COMPARAR CONTENIDO INVESTMENT. PREVIEW DEL INFORME COMPLETO  Y ADAPTAR ESTILO.png` | 937×295 | Reference: Report band                                 |
| `MEJORAR Y COMPARAR CONTENIDO PROPERTY PURCHASE Y ADAPTAR ESTILO.png`                         | 982×600 | Reference: One file, tracker, process, Before you sign |
| `MEJORAR Y COMPARAR CONTENIDO TAX ADVISORY Y ADAPTAR ESTILO.png`                              | 955×294 | Reference: Tax process and report                      |
| `KEEP IMAGES`                                                                                 | —       | Folder placeholder                                     |

None of the references is served by the site. Every block was rebuilt in
semantic HTML/CSS on the shared web layer.

---

## 2. How each reference became a real section

### Investment — reference 1

| Reference block             | Component        | Rebuilt as                                                                                                                                                                                                                                                               |
| --------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Por qué existimos" strip   | `ApproachBand`   | One editorial row: promise (h2, full first column) · hairline · explanation · territory image (unveil) with script. Objections follow as what the method resolves.                                                                                                       |
| "Elige tu punto de partida" | `DoorsBand`      | **Two primary doors** side by side, image beside the decision from 1280px (stacked below): eyebrow, decision title, body, three criteria, one gold CTA whose label never breaks. The CRO-added third path stays as a **quiet, dashed secondary row** with a text action. |
| "Tipos de activos"          | `AssetTypesBand` | Shorter 16:9 media, category + one-line description first, then a compact `Analysed / Main risk / Deliverable` definition list on an ivory panel, quiet CTA. Land and Commercial keep the schematic (no misleading photo).                                               |
| "Cómo analizamos"           | `ProcessBand`    | Numbers on the approved gold thread; icon + title on one line; explicit **"Deliverable"** label. Below 1024px a **vertical sequence** with its own thread — never a false line between rows.                                                                             |

### Investment — reference 2

| Reference block                       | Component     | Rebuilt as                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Tres operaciones"                    | `CasesBand`   | A **case file**: each case is a row — schematic visual with index · operation type (h3), location (pending), the decision as the editorial line · result panel with the metric name, a withheld bar, period pending and "Awaiting client permission". The reference's quotes, towns, countries and `+42% / 6,1% / 2,8x` are **not** used. "View case studies" sits with the header. |
| "Acompañamiento en toda la operación" | `JourneyBand` | **One chain** on the gold thread (horizontal from 1024px, vertical below), icons landing in sequence; arrows removed. Script aligned right.                                                                                                                                                                                                                                         |
| "Preguntas frecuentes"                | `WebFaq`      | New opt-in `appearance="light"`: hairline rows instead of boxed cards, two columns on desktop, same independent disclosures. Team keeps the boxed FAQ.                                                                                                                                                                                                                              |

### Investment — reference 3 (report)

`ReportBand` → new shared **`ReportExplorer`** (`components/web/ReportExplorer.tsx`):

- Tab list · active panel · aside with CTA and deliverables (desktop); tab
  strip · panel · aside stacked (mobile, the strip scrolls sideways inside
  itself, never the page).
- Five panels in the existing order: Investment summary, Annual cash flows,
  Distribution of outcomes, Income seasonality, Risk assessment.
- Each panel states what it shows and **which decision it helps take** ("Helps
  you decide"), carries "Illustrative", and a counter `02 / 05`.
- The gold thread is the report's own navigation: it fills down the tab list
  to the active panel.
- Keyboard: WAI-ARIA tabs, one tab stop, Arrow keys (both axes), Home, End;
  Tab moves into the panel.
- No JavaScript: every panel renders stacked and visible (verified: 5 panels,
  0 hidden, no tab list).
- Charts draw when a panel is shown; no number is ever animated.

### Property Purchase — reference 4

| Reference block              | Component         | Rebuilt as                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One file / one team          | `OneFileBand`     | The capabilities list is joined by a vertical gold thread — parts of one file.                                                                                                                                                                                                                                                                           |
| The file, front to back      | `FileTrackerBand` | **One rail**: dots on the line (filled = done, ink = in review, ring = pending, with a check for done), a card per stage with code, title, body and status (**mark + word**, never colour alone). Document control moved to a full-width strip below, so the seven stages have room (it used to break "Registration" mid-word). Vertical rail on phones. |
| End-to-end, in ordered steps | `ProcessBand`     | New eyebrow **"From first call to signature"** (the duplicate is gone); explicit "Deliverable" per step; gold connectors cross each gap between cards in a row of three (never row to row); one vertical sequence below 1024px. **No durations or owners** from the reference are published.                                                             |
| Before you sign              | `BeforeSignBand`  | Checklist as ruled rows; the decision leads: three outcomes as a list with a marker, the illustrative pick stated in words ("Illustrative pick").                                                                                                                                                                                                        |

Mandatory corrections: duplicated eyebrow removed (`process.stepsEyebrow`);
hero caption now reads **"Sarah hands over the keys to an international buyer
in a Costa Blanca apartment."** Latent bug fixed on the way: the shared grids
had no explicit column, so on phones the Before-you-sign cards ran ~30px past
the edge, hidden by the section's `overflow`.

### Tax Advisory — reference 5

| Reference block                 | Component        | Rebuilt as                                                                                                                                                                                                                                       |
| ------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Every tax, in the right order" | `TaxProcessBand` | Six areas in the brief's order as **cards hanging from the approved thread** (new shared `stepBox`): icon + name, what is reviewed, "Deliverable". 3×2 on desktop with the thread cut per row; one vertical column on phones. No depth or drift. |
| Order                           | page             | **Context → Process → Calendar → Report → Concerns** (process = what, calendar = when). No trust band added.                                                                                                                                     |
| "Preview del informe fiscal"    | `TaxReportBand`  | The same `ReportExplorer`, four decisions: exposure, calendar, treaty, breakdown. Values are the previously approved illustrative samples (€8,400 …); the reference's `€24.500`, `-18%`, `€8.200` are **not** used.                              |

---

## 3. Common grade — `sk-editorial-v1`

A system of derivatives, not a CSS filter (a test asserts no `filter:` in any
component stylesheet). `scripts/grade-media.mjs` (sharp, already in the
dependency tree) reads each **existing web derivative** — never the originals —
and writes `public/media/graded/<id>.webp` plus `manifest.json`:

1. temperature: each image moved **half-way** toward one shared warm target
   (R/B 1.10), correction capped at ±6%;
2. contrast +4% around mid-grey;
3. blacks floored at 4/255 (deep, with detail), whites mapped to the interface
   ivory `#FBF9F5`;
4. saturation −3% (natural skin, no orange cast).

The registry serves the graded file (`src`) and keeps the ungraded one
(`ungradedSrc`). Warmth spread across the 14 images narrowed from 1.02–1.59 to
1.09–1.44. Baked-in text is untouched. Side effect: the three Preview-only PNGs
(1.5–6.8 MB) are now served as 51–156 KB WebP.

| id                     | slot(s)                                                           | ratio / frame          | crop                  | focal   | R/B before → after | KB  | state                                    |
| ---------------------- | ----------------------------------------------------------------- | ---------------------- | --------------------- | ------- | ------------------ | --- | ---------------------------------------- |
| investment-hero        | Investment hero                                                   | 3:4 (desktop) · 4:5    | cover                 | 30% 46% | 1.581 → 1.437      | 85  | graded; embedded copy kept               |
| tax-hero               | Tax hero                                                          | 3:2                    | cover                 | 50% 50% | 1.473 → 1.336      | 135 | graded; embedded copy kept               |
| purchase-hero          | Property hero                                                     | native 1376:768        | none                  | 38% 45% | 1.248 → 1.196      | 54  | graded; shown whole                      |
| authority-editorial    | Authority ×3                                                      | 1376:768 / clamp frame | cover                 | 50% 50% | 1.264 → 1.213      | 51  | graded                                   |
| asset-residential      | Residential card, Property audience                               | 16:9 card · 16:10      | compact 1.3 @ 50% 0%  | 50% 45% | 1.136 → 1.140      | 160 | graded; masthead crop kept               |
| asset-architecture     | Redevelopment card, Property service                              | 16:9 · 16:10           | compact 1.3 @ 50% 0%  | 50% 45% | 1.358 → 1.253      | 220 | graded                                   |
| asset-plan             | Door "property in mind", report summary, Property worries/service | door fill · 3:2        | compact 1.55 @ 80% 0% | 55% 45% | 1.030 → 1.089      | 107 | graded                                   |
| report-interior        | Door "opportunities", Tax report summary                          | door fill · 3:2        | compact 1.4 @ 50% 0%  | 50% 45% | 1.024 → 1.087      | 74  | graded                                   |
| process-analysis       | Investment approach, Tax concerns                                 | 3:2                    | cover                 | 55% 50% | 1.171 → 1.162      | 49  | graded                                   |
| process-presentation   | Tax context, Property service                                     | 3:2                    | cover                 | 45% 45% | 1.585 → 1.433      | 95  | graded; **production blocker unchanged** |
| process-model          | Tax service, Property service                                     | 3:2 · 16:10            | cover                 | 45% 50% | 1.353 → 1.246      | 100 | graded                                   |
| territory-contact      | Investment + Tax final CTA                                        | 3:2                    | cover                 | 50% 50% | 1.185 → 1.164      | 76  | graded                                   |
| purchase-final-contact | Property final CTA                                                | 16:10                  | cover                 | 50% 50% | 1.277 → 1.225      | 156 | graded                                   |
| territory-coast        | (unused on the three landings)                                    | —                      | —                     | 50% 30% | 1.045 → 1.098      | 164 | graded for consistency                   |

---

## 4. Claims and copy

Unchanged: every existing figure stays labelled _Illustrative_ / _Sample_;
results stay withheld; locations pending.

New proposed copy (all `status: 'proposal'`, noted "Phase 2E proposed copy —
pending Juanma"): the five Investment and four Tax "Helps you decide" lines,
the two panel notes, the tab-list labels, the Property process eyebrow and the
corrected hero caption. Tax lines carry `review: 'tax'`, Investment finance
lines `review: 'financial'`.

---

## 5. Validation (local production build, Chromium via Playwright)

| Check                                                          | Investment           | Property | Tax     | Team (regression) |
| -------------------------------------------------------------- | -------------------- | -------- | ------- | ----------------- |
| Page overflow 320/390/768/1024 (+375/1440 captures)            | 0                    | 0        | 0       | 0                 |
| Content clipped past the viewport inside sections              | 0¹                   | 0        | 0       | 0                 |
| Hidden after scroll, all widths                                | 0                    | 0        | 0       | 0                 |
| JS disabled — hidden                                           | 0                    | 0        | 0       | 0                 |
| JS disabled — report panels                                    | 5 visible / 0 hidden | —        | 4 / 0   | —                 |
| Reduced motion — hidden at load / after scroll; hero animation | 0 / 0; none          | same     | same    | same              |
| Fast scroll (End, Home, jump) — pending above fold             | 0                    | 0        | 0       | 0                 |
| Report keyboard: ↓ → End Home ↑, Tab into panel; tab stops     | pass; 1              | —        | pass; 1 | —                 |
| FAQ independent, Enter/Space                                   | yes                  | yes      | yes     | yes               |
| Mobile menu: modal, trap, Escape, focus back, link closes      | yes                  | yes      | yes     | yes               |
| Targets < 44px · console errors                                | 0 · 0                | 0 · 0    | 0 · 0   | 0 · 0             |
| Slow network: h1 visible at 1s, nothing hidden in viewport     | yes                  | yes      | yes     | yes               |

¹ At 768px the check reports lines _inside_ schematic SVGs that use
`preserveAspectRatio="xMidYMid slice"`; they are clipped by their frame by
design. The SVG and its frame are inside the viewport.

Commands: `lint` ✅ · `typecheck` ✅ · `test` ✅ **163/163** (+12 in
`tests/visual-content-upgrade.test.ts`, +1 grade test; four stale assertions
updated — Tax order per brief §8, FAQ `appearance` prop, report tags now in
the explorer, registry `ungradedSrc`) · `build` ✅.

Not run: Lighthouse, axe, Core Web Vitals, real devices, Safari/Firefox,
screen readers.

Captures: `docs/screenshots/phase-2e-content/<route>-<375|1440>-<before|after>.jpg`
— before = `4f196e5`, after = this delivery; live-scrolled and stitched.

---

## 6. For Juanma's decision

1. Visual approval of the three landings on the protected Preview.
2. The proposed "Helps you decide" copy (9 lines) and the Property process
   eyebrow.
3. The door images: "property in mind" → floor-plan cutaway, "opportunities" →
   interior (both approved assets, compact crop). A dedicated image per door
   would be stronger.
4. The grade `sk-editorial-v1` — approve, or adjust target warmth / strength.
5. Still open from PR #21: `process-presentation.webp` production blocker;
   preview banner no longer sticky.

## 7. Known limits

- Case visuals remain schematic: case imagery is blocked until permissions.
- Land and Commercial have no approved photograph.
- The grade is a global, mild correction; hero-level retouching (skin, sky,
  embedded-text cleanup) still needs a human retoucher.
- Door photographs are reused assets, not commissioned for the slot.

---

## 8. Follow-up 2026-10-23 — reveal timing

Arrivals on the three service landings fired at the viewport edge (median
≈ 99 % of its height) because the scroll fallback and the observer used
different triggers. One central rule now decides (`components/motion/revealLine.ts`):
arrivals start when a block reaches **78 %** of the viewport on phones and
**72 %** from 768 px, so they are still finishing as the reader arrives. Team
is not opted in and keeps its timing. Measurements, method and filmstrips:
[`phase-2e-motion-system.md` §4.1](phase-2e-motion-system.md).

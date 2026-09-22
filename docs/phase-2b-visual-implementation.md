# Phase 2B — Investment visual implementation

**Status:** `PHASE 2B — VISUAL IMPLEMENTATION READY FOR HUMAN REVIEW`
**Date:** 2026-09-21
**Route:** `/preview/investment` — noindex, nofollow, excluded from the sitemap

Not final. Not approved. Not production. Juanma's visual review on the Vercel
preview is mandatory before any merge.

---

## 1. Scoped palette — `--sk-web-*`

Approved by Juanma on 2026-09-21 (`docs/phase-2-visual-implementation-contract.md` §2).
Namespaced and additive: `app/tokens.css` and `lib/tokens/tokens.json` remain
byte-identical to the canonical layer and are still verified by
`tests/tokens-parity.test.ts`.

Colours were **sampled from the template pixels**, then adjusted to the nearest
tone that passes WCAG AA for its actual use. Every value is measured, not
guessed.

| Token | Value | Sampled from | Contrast |
|---|---|---|---|
| `--sk-web-ivory` | `#FBF9F5` | page background | — |
| `--sk-web-ivory-soft` | `#F4F0E7` | alternating band | — |
| `--sk-web-white` | `#FEFDFB` | card fill | — |
| `--sk-web-navy` | `#0B1A26` | report band, footer | ivory on navy **16.78:1** |
| `--sk-web-navy-soft` | `#142837` | authority band | ivory on navy-soft **14.38:1** |
| `--sk-web-navy-line` | `#2A3F4F` | rule on navy | decorative |
| `--sk-web-gold` | `#8A6A2F` | CTA fill | on ivory **4.77:1**; white on it **5.02:1** |
| `--sk-web-gold-strong` | `#7E6029` | hover/active | on ivory **5.56:1** |
| `--sk-web-gold-on-dark` | `#C9A55C` | accents on navy | on navy **7.58:1** |
| `--sk-web-gold-wash` | `#F0E8D6` | icon chips | decorative |
| `--sk-web-ink` | `#12283A` | headings, primary text | on ivory **14.36:1** |
| `--sk-web-muted` | `#4A5560` | secondary text | on ivory **7.24:1** |
| `--sk-web-on-dark` | `#FBF9F5` | text on navy | **16.78:1** |
| `--sk-web-muted-on-dark` | `#9FB0BD` | secondary on navy | **7.92:1** |
| `--sk-web-border` | `#DED6C6` | card borders | decorative only |
| `--sk-web-border-strong` | `#8A6A2F` | interactive outlines | **4.77:1**, above the 3:1 required by SC 1.4.11 |

Every text and interactive pairing passes **AA**. Decorative borders are not
required to, and any border that carries meaning on a control uses navy or gold.

---

## 2. Template mapping

| Template band | Implementation | Deviation |
|---|---|---|
| Header, SK lockup + 7 nav + ES/EN + gold CTA | `WebHeader` | Uses the **governed** `BRAND-001` logo, not the template's "SK · SARAH KATERINA INVESTMENT" lockup, which is not a governed asset. Nav reduced to the six anchors that exist |
| Hero, copy + villa render + navy dashboard | `WebHero` + `DashboardCard` | **No villa/Costa Blanca photograph exists.** Juanma selected the authentic B&W portrait. Dashboard figures replaced with labelled illustrative values |
| Trust strip, 4 figures | `TrustBand` | Only approved-source items shown; the template's "160+ compradores" and "48h" are not reproduced |
| "Por qué existimos" + objections | `ApproachBand` | Expanded into a six-item objection grid, as the brief asks for a visual section rather than a paragraph |
| Decision doors, 2 cards with photos | `DoorsBand` | **Three** doors per the brief. Photographs replaced — no licensed property imagery exists |
| Asset types, 4 cards with photos | `AssetTypesBand` | Typographic chips instead of stock photography |
| 5-step process + deliverables | `ProcessBand` | Implemented as specified, with the brief's English step names |
| Navy report preview, 5 cards | `ReportBand` | 4 cards + risk list. All charts illustrative and tagged |
| Scenarios / risk / return | `ScenariosBand` | Implemented; figures replaced with "Sample" |
| Navy authority band | `AuthorityBand` | Uses `AUTH-SK-002`. Biography is pending; signature and handwritten quote not reproduced |
| 3 case cards with quotes and returns | `CasesBand` | **Structure only.** No quote, country, figure or result reproduced |
| 4-step "acompañamiento" chain | `JourneyBand` | Implemented |
| FAQ, 3-column disclosures | `WebFaq` | 2 columns for a comfortable measure; accessible disclosures |
| Final CTA over a photo | `FinalCtaBand` | Navy band without the photo — no approved location image exists |
| Navy footer | `WebFooter` | Links render as pending text, not dead links. No contact, entity or social data |

### Deliberate departures from the template

1. **Language is English.** The template is Spanish; English is the approved
   primary acquisition language. An EN/ES switch is present but does not route.
2. **No handwritten script accents.** They are a typeface decision with no
   governed asset behind them.
3. **No "Sarah Katerina Investment" as an entity name.** The institutional
   descriptor is `NEEDS_DECISION`. "Investment" is used as a service label only.
4. **More air.** Section rhythm opens to 80px on desktop, per the contract's
   instruction to add space where the screenshots are condensed.

---

## 3. Assets imported

| Asset | Origin | Register ID | Use | State | Approval |
|---|---|---|---|---|---|
| Logo | `sarahkaterina/IMAGENES NUEVAS/IMAGENES CON PROMPTS/IMAGENES NUEVASLOGO SARAH KATERINA.png.png` | `BRAND-001` | Header, footer, mobile menu | Imported, transparent padding trimmed losslessly (verified pixel-identical) | **Pending visual review** |
| Logo (untouched) | same | `BRAND-001` | Provenance copy, not referenced by the app | Imported verbatim | — |
| Portrait, B&W full body | `sarahkaterina/IMAGENES NUEVAS/SK_REAL_1.jpg` | `AUTH-SK-001` | Hero visual | Imported, unmodified | **Pending visual review** |
| Portrait, colour headshot | `sarahkaterina/IMAGENES NUEVAS/SK_REAL_2.jpg` | `AUTH-SK-002` | Authority band | Imported, unmodified | **Pending visual review** |
| Contact sheet | `sarahkaterina/IMAGENES NUEVAS/SK_REAL_3.png` | `AUTH-SK-003` | — | **Not imported** | 4-view turnaround; unusable as a single web image |
| Composite key visual | `sarahkaterina/IMAGENES NUEVAS/SK_SARAH_LOGO.jpg` | `AUTH-SK-004` | — | **Not imported** | Register: composite, `NOT_SUITABLE` for identity/body use, and its embedded wording is not canonical claim copy |
| Dashboards / charts | Built in `SampleChart.tsx` | — | Report, hero, scenarios | Illustrative sample | **No claim** |
| Video | — | — | Hero (optional) | **Not implemented** | Requires a decision and an asset |

### Two findings that changed the plan

1. **`SK_SARAH_LOGO.jpg` is not a logo.** The authentic reference register
   reclassifies it as a *composite key visual* — a photograph with a wordmark
   and caption baked into the raster — explicitly "not the insertable brand
   mark". The register names `BRAND-001` as the correct logo. That is what is
   used.
2. **The logo's accent is teal (`≈#79BFBD`), not gold.** The register records
   this discrepancy and states the mark must never be redrawn, retyped,
   recoloured or approximated, and that "palette reconciliation cannot be used
   as permission to alter the mark". Juanma decided on 2026-09-21 to use it
   exactly as supplied. **The teal therefore sits alongside the gold interface
   and is an open visual question for review.**

On navy, the logo is placed on an ivory plate rather than recoloured, because
its near-black "Katerina" would otherwise disappear.

---

## 4. Motion

No animation library was installed. The contract permits "GSAP **or a native
equivalent**", and everything required is achievable with CSS transitions, CSS
keyframes and one `IntersectionObserver` — so no dependency was added for a
behaviour the platform already performs.

| Where | What | Duration |
|---|---|---|
| Hero entry | Copy, then visual, staged | 400ms, 60ms stagger |
| Section reveals | Fade and rise on scroll, capped at 4 stagger steps | 400ms |
| Chart entry | Bars grow, lines draw | 400–900ms |
| Buttons, cards, tabs, nav | Colour, border, shadow, arrow nudge | 150ms |
| FAQ marker | Rotate | 150ms |
| Header | Shadow on scroll | 150ms |

**Verified by emulating `prefers-reduced-motion: reduce`:** 0 animated
elements, 0 transitions over 50ms, 0 elements left at opacity 0. Without the
preference: 32 animated elements and 85 transitions.

`RevealOnScroll` is visible-by-default in the markup and only hides content
once JavaScript confirms it can also reveal it, so a failed hydration, a
blocked script or a crawler never sees blank space. It also reveals on
`beforeprint`. No scroll-jacking, no parallax, no animated financial values.

---

## 5. SEO and GEO

- `noindex, nofollow` in the metadata **and** as an `X-Robots-Tag` header.
- Sitemap empty; `/preview` excluded by construction.
- **No JSON-LD emitted.** FAQ schema needs approved visible answers; Organization
  schema needs a confirmed legal entity. Neither exists.
- **No hreflang** — no Spanish route exists.
- Canonical derives from `NEXT_PUBLIC_SITE_URL`; no production host anywhere.
- One `h1`, 16 `h2`, 33 `h3`, **no skipped levels**, nothing deeper than `h3`.
- GEO vocabulary present and enforced by test: *property investment analysis,
  Costa Blanca, financial modelling, due diligence, tax overlay, decision report*.

**Not measured, not claimed:** Core Web Vitals, Lighthouse, indexation.

---

## 6. CRO

One dominant CTA per intent, a lower-commitment secondary, three decision doors
with distinct CTAs, Buyer System entry points as micro-conversions, objection
handling, and a visible preview of the deliverable.

**No form, no lead capture and no CRM was built.** Event names are defined in
`lib/analytics/events.ts` and fire through the existing no-op adapter. The
Buyer System integration fails closed: with `NEXT_PUBLIC_BUYER_SYSTEM_URL`
unset, every entry point renders as a controlled pending state rather than a
broken link — verified, the rendered page contains zero external links.

---

## 7. Human review instructions

Open the Vercel preview at `/preview/investment`, logged into Vercel.

Check, in this order:

1. **Logo** — is `BRAND-001` with its teal accent acceptable beside the gold
   interface, in the header and on the footer's ivory plate? This is the single
   biggest open visual question.
2. **Hero** — does the B&W portrait carry the hero, given no Costa Blanca
   photograph exists? Should a property/location photograph be commissioned?
3. **Palette** — do the sampled navy and gold match your intent for the
   template?
4. **Rhythm** — is there enough air, or too much? Compare against the template.
5. **Illustrative figures** — is the labelling prominent enough that no one
   could mistake the dashboards for real results?
6. **Mobile at 375px** — is the hierarchy right, or is it a squeezed desktop?
7. **Copy** — read `docs/copy-and-claims-matrix.md` and mark each line approve,
   rewrite or reject.

Then record decisions in `docs/phase-2-decision-gate.md` §5.

---

## 8. Still blocked

Production landing priority (Investment vs Pre-Arras) · institutional
descriptor · legal and contact data · CTA copy and pricing publication ·
Buyer System production URL · lead-capture location · public Asking Price
approval · Spanish routes and hreflang · video selection · property and
location photography · a logo treatment for dark surfaces · biography and
credential dossier · case-study permissions.

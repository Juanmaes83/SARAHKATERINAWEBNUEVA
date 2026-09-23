# Tax Advisory — visual implementation decisions

Status: FOR JUANMA'S VISUAL REVIEW · NOT APPROVED · NOT PRODUCTION
Date: 2026-09-22
Phase: 2D — converged onto the Investment base
Route: `/preview/tax-advisory`
Reference: `website/nueva web/Sarah Katerina Tax Advisory.png`

Every judgement call made while implementing this landing, and the reason for
each, so they can be reviewed individually rather than as one page.

The section-by-section comparison against the template is in
`docs/tax-advisory-fidelity-matrix.md`. The one-system record is in
`docs/shared-web-layer-convergence.md`.

---

## 1. The governing decision

Investment is the canonical visual base. Tax Advisory adapts to it. No second
visual architecture exists.

Concretely: this landing renders through `WebHeader`, `WebFooter`, `WebFaq`,
`WebSection`, `WebSectionHeader`, `WebButton`, `Icon`, `TerritoryVisual`,
`SampleChart`, `DashboardCard`'s stylesheet and `WebBands.module.css` — the
same components and the same `app/web-tokens.css` as `/preview/investment`.

Four Tax-Advisory-specific structures remain, each justified in
`components/web/TaxBands.module.css` and listed in the convergence record §4.

Everything Phase 2B built in parallel — a second token layer, a second header,
footer, button, icon set and chrome switcher — was deleted, not left dormant.

---

## 2. Corrections to Phase 2B

### Problem and audience are one band again

The template composes them as a single band: headline column, arrow-marked
profiles, image with script marginalia. Phase 2B split them into two sections,
which changed the template's rhythm and hierarchy.

Now one band, `TaxContextBand`. Nothing was lost: the tension framing reads as
the headline's support instead of as a section of its own.

### Services are three blocks again

The template shows three service cards. Phase 2B expanded them to six, which
turned an editorial composition into a catalogue.

Now three. Nothing was dropped — the personal tax review, outstanding-filing
corrections and wealth planning live inside the block they belong to, on each
block's sub-item line. The mapping is in the fidelity matrix §3.

### Governance markers stopped shouting

Phase 2B put red `PENDING_APPROVAL` badges throughout, which destroyed the
composition this page exists to let someone judge.

The governance is unchanged. It is now expressed the way Investment expresses
it, which is quieter and equally honest:

- an unconfirmed headline figure keeps its position and carries a small
  pending dot;
- illustrative dashboard values are shown with an `Illustrative` tag on the
  surface and a footnote saying they are not a client result;
- withheld case evidence is stated once per band, not per field;
- the footer states its routes note once, not once per link.

---

## 3. Typography

Two families only — Fraunces and Inter (BSD-006). A third would be a Brand
System decision, not one this repository may take.

| Reference                                    | Implementation                   | Note                                                                                                               |
| -------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Serif headlines                              | Fraunces, via `WebSectionHeader` | Faithful                                                                                                           |
| Sans body                                    | Inter                            | Faithful                                                                                                           |
| **Handwriting script marginalia** (5 places) | **Fraunces italic, light**       | **DIVERGENCE.** The closest the approved system reaches to the reference's informal register. Needs your decision. |
| Small-caps eyebrows                          | Shared `WebSection` eyebrow      | Faithful                                                                                                           |

---

## 4. Media

The template's hero is a generated scene — Sarah at a desk with tax documents,
Costa Blanca behind. AGENTS.md §2 forbids fabricating a photograph of Sarah,
and the asset manifest forbids generic stock, a generated scene passed off as
documentary, and using the template screenshot itself.

So the hero carries the signals honestly: the authentic portrait
(`AUTH-SK-001`), a declared coastline schematic for place, the illustrative
snapshot card for the deliverable, and the credential row for proof.

The document spines survive as typographic chips rather than a fabricated
photograph of paperwork. The intro video is a marked pending affordance, not a
play button over nothing.

Eight photographic slots render `TerritoryVisual` schematics. Each is
`role="img"` with an accessible name that says it is a schematic, so it cannot
be mistaken for a photograph. The full list of what is missing, with the ratio
and function each slot needs, is in the fidelity matrix §4.

---

## 4A. Hero information hierarchy correction — 2026-09-22

This pass is approved for the protected Preview only. It does not authorise
production, publication or indexation.

The visual review found four competing information layers in the Tax Advisory
hero: copy embedded in the approved Services_14 artwork, duplicate HTML
document labels, two HTML indicators placed over the artwork, and the
illustrative snapshot card floating over the image. That hierarchy made the
hero noisy and placed metadata over Sarah's face.

The correction is:

1. **One artwork layer.** The approved Services_14 image remains the single Tax
   Advisory hero image. Its embedded tax-agency copy is retained. The duplicate
   HTML labels `Agencia Tributaria`, `Modelo 210` and
   `Non-resident taxation` are removed.
2. **Metadata moved outside the image.** The `Costa Blanca` and
   `Intro video in production` indicators remain available as normal-flow
   metadata chips above the image. They are not absolutely positioned and
   cannot cover the subject.
3. **Snapshot separated.** The illustrative Tax Exposure Snapshot is rendered
   below the image in normal document flow. It no longer overlaps, obscures or
   visually competes with the artwork.
4. **One trust strip.** The repeated `TaxTrustBand` below the hero is removed.
   The three hero signals remain as the single trust/credential strip for this
   landing.
5. **No forced crop change.** The surviving image keeps the approved native
   3:2 treatment, preserving both Sarah and the tax-agency composition.

This is a hierarchy and layout correction only. No copy, navigation, motion
system, CTA destination, other landing or production asset was changed.

## 5. Motion

The shared system, unchanged: viewport reveals with a capped stagger, a
condensing header, card hover, disclosure opening, chart entry.

GSAP was not added. The contract allows "GSAP **or a native equivalent**", and
nothing here needs timeline sequencing or scroll-linked animation.

**One defect in the shared primitive was fixed.** `RevealOnScroll` relied on an
IntersectionObserver alone. During a fast scroll an element can cross the
viewport between two observation frames, cross no threshold, and stay at
`opacity: 0` — a blank gap mid-section. It was reproducible. A rAF-throttled
scroll fallback now reveals anything the viewport has reached, and removes
itself once it fires.

Because it is the shared primitive, both routes were re-verified:

|                                              | `/preview/tax-advisory` | `/preview/investment` |
| -------------------------------------------- | ----------------------- | --------------------- |
| Elements left hidden after a fast scroll     | 0                       | 0                     |
| `prefers-reduced-motion`: hidden / animating | 0 / 0                   | 0 / 0                 |

The initial state is safe: content is visible in the markup and the hidden
state is applied only after JavaScript confirms it can also remove it. A failed
hydration, a blocked script, a crawler, a print or a screenshot never sees
blank space.

---

## 6. Content and claims

Copy comes from the template, which is the approved editorial base for this
landing. It was not replaced with generic technical wording.

The 20-year Tax Administration credential is published here as `confirmed`,
citing `verbal/credential-register.csv` CR-002 — **matching Investment**. Phase
2B withheld it on this landing pending a claims dossier. Two landings cannot
state the same credential differently, and Investment's treatment is the
canonical one.

Everything else the template asserts and this repository cannot evidence is
listed in the fidelity matrix §5.

---

## 7. What needs your decision

1. **Script marginalia** set in Fraunces italic — accept, or approve a third family.
2. **Eight photographic slots** render schematics — commission, licence, or accept them. Ratios in the fidelity matrix §4.
3. **Hero video** — supply it, or drop the affordance.
4. **Footer logo on navy** sits on an ivory plate; no reversed variant exists.
5. **Pull-quote signature** — supply the asset, confirm the wording is Sarah's, or drop it.
6. **Authority portrait** is `AUTH-SK-002`, which the register itself calls "recompressed, sub-grade". A better colour frontal would help.
7. **Process runs 3 × 2**, not six across as the template shows.
8. **Three WCAG AA contrast near-misses in the canonical palette**, affecting Investment identically — see the convergence record §6. Not changed here, because the palette is your approved decision.

---

## 8. Not claimed

No Lighthouse score, PageSpeed result, Core Web Vitals measurement, axe run or
real-device test was performed, and none is asserted. What was measured, and
how, is in `docs/shared-web-layer-convergence.md` §6.

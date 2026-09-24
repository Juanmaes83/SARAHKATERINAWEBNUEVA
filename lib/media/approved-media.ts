/**
 * Approved media registry — Phase 2E.
 *
 * Single source of truth for every photograph placed on the preview landings.
 * Nothing renders a media file directly; components take an entry from here,
 * so provenance, alt text and focal point live in one auditable place.
 *
 * GOVERNANCE
 *
 * `docs/visual-media-inventory-phase-2e-2026-09.md` §11 records Juanma's
 * approval, dated 2026-09-22, of items 1–8 **for Preview only**. That approval
 * does not authorise publication, indexation, production, or use of any image
 * as evidence of a client, property, result or testimonial.
 *
 * Excluded by that same approval, and absent from this registry:
 *   - `sarahkaterina_testimonios_clientes.png` (item 7, no permissions);
 *   - every other case or testimonial image;
 *   - video of any kind (item 8 — slots are prepared, nothing is embedded).
 *
 * Originals are never modified. They stay where they are, in `IMAGES/` and the
 * repository root. Web derivatives live in `public/media/` and are listed in
 * `public/media/manifest.json` with their source, dimensions and weight.
 */

export interface ApprovedMedia {
  /** Stable id, matching the file name in `public/media/`. */
  readonly id: string;
  /** Served path. */
  readonly src: string;
  /** Intrinsic width of the web derivative. */
  readonly width: number;
  /** Intrinsic height of the web derivative. */
  readonly height: number;
  /**
   * Descriptive, non-promotional alt text.
   *
   * These are staged, art-directed brand images, not documentary photographs
   * of a real client, property or transaction. The alt text therefore
   * describes what is visible and never asserts an outcome.
   */
  readonly alt: string;
  /** `object-position`, keeping the subject safe across every crop. */
  readonly focal: string;
  /** Canonical source path in this repository. Originals are untouched. */
  readonly source: string;
  /** Text baked into the image, if any. Provisionally permitted. */
  readonly embeddedText?: string;
  /** Anything a reviewer needs to know before this ships anywhere. */
  readonly note?: string;
  /**
   * PHASE 2E ART DIRECTION — the frame used in compact slots (cards, report
   * thumbnails, split-section media).
   *
   * Several images carry a baked-in lockup along their lower edge. At card
   * size it was cut in half by the slot ("arah", "Katerin…") or sat under the
   * card's icon chip, which reads as a cropping error and repeats the brand
   * the header already carries. A compact crop enlarges the image from a
   * fixed origin just enough that the lockup leaves the frame entirely. The
   * rule is binary: a lockup is either shown whole or not at all.
   *
   * `scale` is applied as a CSS transform; `origin` is its transform-origin.
   * Originals are untouched; this is presentation only.
   */
  readonly compactCrop?: { readonly scale: number; readonly origin: string };
  /**
   * PHASE 2E COMMON GRADE (brief 2026-10-23, §9). `src` now serves the graded
   * derivative produced by `scripts/grade-media.mjs`; this is the ungraded web
   * derivative it was made from, kept in place and untouched.
   */
  readonly ungradedSrc?: string;
  /** Name of the grade applied to `src`, e.g. `sk-editorial-v1`. */
  readonly grade?: string;
  /**
   * PHASE 2F — the image is an illustrative analysis composition (a staged
   * scene with an editorial overlay), never evidence of a client, property,
   * document or outcome. Slots that show one must keep an "illustrative"
   * statement in their own HTML.
   */
  readonly illustrative?: true;
}

function media(entry: ApprovedMedia): ApprovedMedia {
  return entry;
}

/**
 * Wording that appears baked into several of these images. It contains a
 * spelling error — "sistem" for "system" — which is recorded here so it is
 * tracked rather than discovered later. Retouching is Juanma's step.
 */
const EMBEDDED_LOCKUP = 'Sarah Katerina — "The Spanish property sistem, decoded for you" (sic)';
const EMBEDDED_PROMISE =
  '"Independent Property & Tax Advisory for Foreign Buyers in Spain." / "Clarity before commitment."';

export const APPROVED_MEDIA = {
  /* --- heroes ----------------------------------------------------------- */

  investmentHero: media({
    id: 'investment-hero',
    src: '/media/graded/investment-hero.webp',
    ungradedSrc: '/media/investment-hero.webp',
    grade: 'sk-editorial-v1',
    width: 1536,
    height: 1024,
    alt: 'Sarah Katerina standing in a dark panelled interior beside a large screen showing an interior visualisation.',
    // Sarah stands on the left of the frame. A centred focal point cropped her
    // out of the portrait-shaped hero slot, leaving only the screen.
    focal: '30% 46%',
    source: 'IMAGES/sarahkaterina_Services_12.png',
    embeddedText: EMBEDDED_PROMISE,
    note: 'The screen carries the approved brand promise plus a descriptor that is still NEEDS_DECISION upstream. Provisionally permitted for composition.',
  }),

  taxHero: media({
    id: 'tax-hero',
    src: '/media/graded/tax-hero.webp',
    ungradedSrc: '/media/tax-services-14.png',
    grade: 'sk-editorial-v1',
    width: 1536,
    height: 1024,
    alt: 'A warm editorial scene featuring Sarah Katerina in a dark interior, framed with brand and service imagery.',
    focal: '50% 50%',
    source: 'IMAGES/sarahkaterina_Services_14.png',
    embeddedText: 'Brand and service copy embedded in the source image.',
    note: 'Preview-only source-sized image selected by the owner for both Tax Advisory hero media slots; create a clean optimised derivative before production.',
  }),

  purchaseHero: media({
    id: 'purchase-hero',
    src: '/media/graded/purchase-hero.webp',
    ungradedSrc: '/media/purchase-hero.webp',
    grade: 'sk-editorial-v1',
    width: 1376,
    height: 768,
    alt: 'Sarah Katerina handing a set of keys to another person in a bright apartment overlooking the sea.',
    focal: '38% 45%',
    source: 'IMAGES/sarahkaterina_home2.png',
    embeddedText: EMBEDDED_PROMISE,
    note: 'Embedded copy sits on the right, so the HTML headline is placed left of it.',
  }),

  /**
   * Shared authority editorial image — 2026-09-22 visual pass.
   *
   * Owner-selected for the protected Preview and intentionally shared by
   * Investment, Tax Advisory and Property Purchase so the Sarah section has
   * one coherent visual language across all three landings.
   */
  authorityEditorial: media({
    id: 'authority-editorial',
    src: '/media/graded/authority-editorial.webp',
    ungradedSrc: '/media/authority-editorial.png',
    grade: 'sk-editorial-v1',
    width: 1677,
    height: 938,
    alt: 'Sarah Katerina in a warm editorial interior, framed by a dark room and soft practical lighting.',
    focal: '50% 50%',
    source: 'IMAGES/sarahkaterina_Services_Especial.png',
    embeddedText: 'Brand and service copy embedded in the source image.',
    note: 'Preview-only source-sized image selected by the owner as the shared authority visual for Investment, Tax Advisory and Property Purchase; create a clean optimised derivative before production.',
  }),

  /* --- asset types / property ------------------------------------------- */

  assetResidential: media({
    id: 'asset-residential',
    src: '/media/graded/asset-residential.webp',
    ungradedSrc: '/media/asset-residential.webp',
    grade: 'sk-editorial-v1',
    width: 2000,
    height: 922,
    alt: 'A bright kitchen and living space, half rendered and half drawn as architectural plans.',
    focal: '50% 45%',
    source: 'IMAGES/sarahkaterina_Services 8.png',
    embeddedText: EMBEDDED_LOCKUP,
    note: 'CROPPED. The original carries an "ARCHITECTURAL DIGEST" masthead across the top. That is a real publication, and showing it would imply a feature that does not exist, so the top 17.5% is removed. See docs/phase-2e-media-implementation.md §3.',
    compactCrop: { scale: 1.3, origin: '50% 0%' },
  }),

  assetArchitecture: media({
    id: 'asset-architecture',
    src: '/media/graded/asset-architecture.webp',
    ungradedSrc: '/media/asset-architecture.webp',
    grade: 'sk-editorial-v1',
    width: 2000,
    height: 1116,
    alt: 'Hands adjusting a detailed architectural model of a house on a studio table.',
    focal: '50% 45%',
    source: 'IMAGES/sarahkaterina_Services_9.png',
    embeddedText: EMBEDDED_LOCKUP,
    compactCrop: { scale: 1.3, origin: '50% 0%' },
  }),

  assetPlan: media({
    id: 'asset-plan',
    src: '/media/graded/asset-plan.webp',
    ungradedSrc: '/media/asset-plan.webp',
    grade: 'sk-editorial-v1',
    width: 2000,
    height: 1116,
    alt: 'A three-dimensional cutaway floor plan of an apartment, seen from above.',
    focal: '55% 45%',
    source: 'IMAGES/sarahkaterina_Services_10.png',
    embeddedText: EMBEDDED_LOCKUP,
    compactCrop: { scale: 1.55, origin: '80% 0%' },
  }),

  /* --- territory / CTA --------------------------------------------------- */

  territoryCoast: media({
    id: 'territory-coast',
    src: '/media/graded/territory-coast.webp',
    ungradedSrc: '/media/territory-coast.webp',
    grade: 'sk-editorial-v1',
    width: 2000,
    height: 1116,
    alt: 'A ceramic jar resting on white pebbles on a Mediterranean shoreline.',
    // The baked-in lockup runs along the bottom edge; bias upward so small
    // crops show shoreline rather than half a wordmark.
    focal: '50% 30%',
    source: 'sarahkaterina_LifeStyle_1.png',
    embeddedText: EMBEDDED_LOCKUP,
  }),

  territoryContact: media({
    id: 'territory-contact',
    src: '/media/graded/territory-contact.webp',
    ungradedSrc: '/media/territory-contact.webp',
    grade: 'sk-editorial-v1',
    width: 1376,
    height: 768,
    alt: 'A marble table with a phone, sunglasses, a key and a cup of coffee in dappled light.',
    focal: '50% 50%',
    source: 'IMAGES/sarahkaterina_LifeStyle_6.png',
    note: 'The phone screen shows a mock-up of this site. Self-referential, not a third-party brand.',
  }),

  purchaseFinalContact: media({
    id: 'purchase-final-contact',
    src: '/media/graded/purchase-final-contact.webp',
    ungradedSrc: '/media/purchase-final-contact.png',
    grade: 'sk-editorial-v1',
    width: 2000,
    height: 1116,
    alt: 'A warm editorial tabletop scene with a branded contact presentation, viewed from above.',
    focal: '50% 50%',
    source: 'sarahkaterina_Contacto.png',
    embeddedText: 'Sarah Katerina — brand and service copy embedded in the source image.',
    note: 'Preview-only owner-selected visual for the Property Purchase final CTA. The original is retained unchanged; create a clean derivative before production.',
  }),

  /* --- process / report -------------------------------------------------- */

  processAnalysis: media({
    id: 'process-analysis',
    src: '/media/graded/process-analysis.webp',
    ungradedSrc: '/media/process-analysis.webp',
    grade: 'sk-editorial-v1',
    width: 1376,
    height: 768,
    alt: 'A dark meeting room at dusk with a floating screen and documents laid out on the table.',
    focal: '55% 50%',
    source: 'IMAGES/sarahkaterina_services_1.png',
    embeddedText: 'On-screen: "The Spanish property system, decoded for you"',
  }),

  processPresentation: media({
    id: 'process-presentation',
    src: '/media/graded/process-presentation.webp',
    ungradedSrc: '/media/process-presentation.webp',
    grade: 'sk-editorial-v1',
    width: 1681,
    height: 936,
    alt: 'A warm living room with a wall-mounted screen showing a website layout, looking out to the sea.',
    focal: '45% 45%',
    source: 'IMAGES/sarahkaterina_services_2.png',
    embeddedText:
      'On-screen mock website: the brand name followed by a "Group" suffix, a phone number, a twenty-years-in-the-tax-administration line and "160+ foreign buyers trusted us since 2024". Book spines read KINFOLK and CHANEL; a shelf label reads VUITTON.',
    note: 'PHASE 2E AUDIT — BLOCKER BEFORE PRODUCTION. The baked-in screen asserts an unverified client metric, an unconfirmed phone number and the "Group" naming held by D-06, and the room shows third-party brand names. Illegible at the sizes used in Preview, but still published pixels. Needs a retouched derivative or a replacement; owner decision.',
  }),

  reportInterior: media({
    id: 'report-interior',
    src: '/media/graded/report-interior.webp',
    ungradedSrc: '/media/report-interior.webp',
    grade: 'sk-editorial-v1',
    width: 2000,
    height: 1116,
    alt: 'A quiet grey interior with a sofa and tall windows, and a glass panel resting on the floor.',
    focal: '50% 45%',
    source: 'IMAGES/sarahkaterina_contacto_2.png',
    embeddedText: EMBEDDED_LOCKUP,
    compactCrop: { scale: 1.4, origin: '50% 0%' },
  }),

  processModel: media({
    id: 'process-model',
    src: '/media/graded/process-model.webp',
    ungradedSrc: '/media/process-model.webp',
    grade: 'sk-editorial-v1',
    width: 2000,
    height: 1116,
    alt: 'Two people examining a small building model and a set of plans on a counter in a bright apartment.',
    focal: '45% 50%',
    source: 'sarahkaterina_services_6.png',
    embeddedText: EMBEDDED_LOCKUP,
  }),

  /* --- Phase 2F: approved case and One File imagery ----------------------
   * Seven owner-approved images, mapped slot by slot in the Phase 2F brief
   * §4. Each is an illustrative composition: a staged scene with an analysis
   * overlay baked in. Shown whole, never cropped, never as a client case.
   */

  caseRefurbishedVilla: media({
    id: 'case-refurbished-villa',
    src: '/media/graded/case-refurbished-villa.webp',
    ungradedSrc: '/media/case-refurbished-villa.webp',
    grade: 'sk-editorial-v1',
    width: 1600,
    height: 900,
    alt: 'Illustrative analysis of a refurbished villa with a pool: callouts mark acquisition, renovation scope, contingency and exit scenarios beside a decision-model panel.',
    // Shown whole at its own ratio: the overlay is the content. No crop.
    focal: '50% 50%',
    source: 'IMAGES/MEJORAS 23 OCTUBRE/Investment Refurbished villa.png',
    embeddedText: 'Callouts and a "Decision model" panel; footer "Illustrative analysis".',
    illustrative: true,
    note: 'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated editorial artwork; generation method and rights record not in the repository — confirm before production. Source sha256 cb109107f2b869be…. Slot: Investment · Case studies · 01 Refurbished villa.',
  }),

  caseApartmentLetting: media({
    id: 'case-apartment-letting',
    src: '/media/graded/case-apartment-letting.webp',
    ungradedSrc: '/media/case-apartment-letting.webp',
    grade: 'sk-editorial-v1',
    width: 1600,
    height: 900,
    alt: 'Illustrative rental analysis of a sea-view apartment living room: callouts mark seasonality, community, management and operating costs beside a rental-analysis panel.',
    // Shown whole at its own ratio: the overlay is the content. No crop.
    focal: '50% 50%',
    source: 'IMAGES/MEJORAS 23 OCTUBRE/Investment Apartment for letting.png',
    embeddedText: 'Callouts and a "Rental analysis" panel; footer "Illustrative analysis".',
    illustrative: true,
    note: 'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated editorial artwork; generation method and rights record not in the repository — confirm before production. Source sha256 a420f8a056b04806…. Slot: Investment · Case studies · 02 Apartment for letting.',
  }),

  caseLandDevelopment: media({
    id: 'case-land-development',
    src: '/media/graded/case-land-development.webp',
    ungradedSrc: '/media/case-land-development.webp',
    grade: 'sk-editorial-v1',
    width: 1200,
    height: 679,
    alt: 'Illustrative feasibility review of a coastal hillside plot: an outlined boundary, road access and utilities over an aerial view, beside a feasibility panel.',
    // Shown whole at its own ratio: the overlay is the content. No crop.
    focal: '50% 50%',
    source: 'IMAGES/MEJORAS 23 OCTUBRE/Investment Land with development.png',
    embeddedText:
      '"Know before you buy" headline and a "Feasibility review" panel with indicative areas, percentages and permit timings; footer "All data indicative. Subject to official verification."',
    illustrative: true,
    note: 'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated editorial artwork; generation method and rights record not in the repository — confirm before production. Source sha256 9e79c9aced7bd0db…. Slot: Investment · Case studies · 03 Land with development. The baked-in figures are indicative artwork, not a claim: none is reproduced in HTML. 1200px wide to meet the 250 KB budget; smallest text checked legible.',
  }),

  purchaseFiscalExposure: media({
    id: 'purchase-fiscal-exposure',
    src: '/media/graded/purchase-fiscal-exposure.webp',
    ungradedSrc: '/media/purchase-fiscal-exposure.webp',
    grade: 'sk-editorial-v1',
    width: 1200,
    height: 900,
    alt: 'Illustrative ownership-tax overview of a modern villa with a pool: callouts mark purchase taxation, annual obligations, ownership structure and potential exposure.',
    // Shown whole at its own ratio: the overlay is the content. No crop.
    focal: '50% 50%',
    source: 'IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Fiscal exposure identified.png',
    embeddedText:
      '"Ownership taxes in context" headline, callouts and an "Estimated ownership picture" panel; footer "Illustrative analysis".',
    illustrative: true,
    note: 'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated editorial artwork; generation method and rights record not in the repository — confirm before production. Source sha256 5dbac0b376178489…. Slot: Property Purchase · Three avoided mistakes · Fiscal exposure identified. 1200px wide (native 1448) to meet the 250 KB budget.',
  }),

  purchaseClauseRenegotiated: media({
    id: 'purchase-clause-renegotiated',
    src: '/media/graded/purchase-clause-renegotiated.webp',
    ungradedSrc: '/media/purchase-clause-renegotiated.webp',
    grade: 'sk-editorial-v1',
    width: 1600,
    height: 905,
    alt: 'Illustrative still life of purchase paperwork on a desk: a document folder, floor plan, sale contract, tax sheet, translation, checklist, notary diary and keys.',
    // Shown whole at its own ratio: the overlay is the content. No crop.
    focal: '50% 50%',
    source: 'IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Problematic clause renegotiated.png',
    embeddedText:
      'Generated sample documents in Spanish (contract, fiscal sheet, translation, checklist); the fiscal sheet shows sample amounts.',
    illustrative: true,
    note: 'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated editorial artwork; generation method and rights record not in the repository — confirm before production. Source sha256 7c7f01baccf3b470…. Slot: Property Purchase · Three avoided mistakes · Problematic clause renegotiated. The documents are generated props, not genuine legal or fiscal documents.',
  }),

  purchaseRemoteCompleted: media({
    id: 'purchase-remote-completed',
    src: '/media/graded/purchase-remote-completed.webp',
    ungradedSrc: '/media/purchase-remote-completed.webp',
    grade: 'sk-editorial-v1',
    width: 1600,
    height: 905,
    alt: 'Illustrative coordination scene: a woman at a laptop on a terrace table beside a six-step property journey and a participants timeline.',
    // Shown whole at its own ratio: the overlay is the content. No crop.
    focal: '50% 50%',
    source: 'IMAGES/MEJORAS 23 OCTUBRE/Property Purchase Remote purchase completed.png',
    embeddedText:
      '"Your Property Journey" timeline, participants list and branded props ("Sarah Katerina property coordination").',
    illustrative: true,
    note: 'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated editorial artwork; generation method and rights record not in the repository — confirm before production. Source sha256 544b3d23a1f1e4fb…. Slot: Property Purchase · Three avoided mistakes · Remote purchase completed. The person is not identified in text.',
  }),

  purchaseOneFile: media({
    id: 'purchase-one-file',
    src: '/media/graded/purchase-one-file.webp',
    ungradedSrc: '/media/purchase-one-file.webp',
    grade: 'sk-editorial-v1',
    width: 1600,
    height: 905,
    alt: 'Illustrative purchase file laid out on a desk: a folder, floor plan, sale contract, fiscal sheet, certified translation, checklist, notary diary and keys.',
    // Shown whole at its own ratio: the overlay is the content. No crop.
    focal: '50% 50%',
    source: 'IMAGES/MEJORAS 23 OCTUBRE/One file. From viewing to keys.png',
    embeddedText:
      'Generated sample documents in Spanish (contract, fiscal sheet, translation, checklist).',
    illustrative: true,
    note: 'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated editorial artwork; generation method and rights record not in the repository — confirm before production. Source sha256 d5e0dbc2d1d24c90…. Slot: Property Purchase · One file. From viewing to keys (replaces the illustrative still life). The documents are generated props, not genuine legal or fiscal documents.',
  }),
} as const satisfies Record<string, ApprovedMedia>;

export type ApprovedMediaKey = keyof typeof APPROVED_MEDIA;

/**
 * Slots that are deliberately still schematic, and why.
 *
 * Every entry here is a place where `TerritoryVisual` continues to draw rather
 * than show a photograph. They are listed so the gap is tracked, not silently
 * carried forward.
 */
export const PENDING_MEDIA_SLOTS = [
  {
    slot: 'Investment · decision doors',
    reason:
      'No approved image per door; the inventory lists Services 8/9 as an alternative, not a selection.',
  },
  {
    slot: 'Tax Advisory · problem/context',
    reason: 'LifeStyle_5 is Group B, not in the approved 1–8 block.',
  },
  {
    slot: 'Team · hero video',
    reason:
      'Deliberate exception (Phase 2F brief §6.5): the authentic team photograph stays; no approved video represents the team. A future candidate needs its own visual, provenance and rights review.',
  },
  { slot: 'All landings · Open Graph image', reason: 'Requires an approved composition.' },
] as const;

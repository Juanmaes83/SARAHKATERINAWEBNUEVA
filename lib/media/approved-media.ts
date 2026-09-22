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
    src: '/media/investment-hero.webp',
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
    src: '/media/tax-hero.webp',
    width: 1344,
    height: 752,
    alt: 'Sarah Katerina seated in an armchair in a warm, low-lit interior.',
    focal: '35% 38%',
    source: 'IMAGES/sarahkaterina_home.png',
    note: 'No embedded text. The cleanest of the three hero candidates.',
  }),

  purchaseHero: media({
    id: 'purchase-hero',
    src: '/media/purchase-hero.webp',
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
    src: '/media/authority-editorial.png',
    width: 1376,
    height: 768,
    alt: 'Sarah Katerina in a warmly lit editorial interior, seated in an armchair and looking towards the camera.',
    focal: '50% 42%',
    source: 'IMAGES/sarahkaterina_Services_11.png',
    note: 'Preview-only source-sized image. The shared authority block uses a larger full-bleed editorial treatment; produce an optimised derivative before any production release.',
  }),

  /* --- asset types / property ------------------------------------------- */

  assetResidential: media({
    id: 'asset-residential',
    src: '/media/asset-residential.webp',
    width: 2000,
    height: 922,
    alt: 'A bright kitchen and living space, half rendered and half drawn as architectural plans.',
    focal: '50% 45%',
    source: 'IMAGES/sarahkaterina_Services 8.png',
    embeddedText: EMBEDDED_LOCKUP,
    note: 'CROPPED. The original carries an "ARCHITECTURAL DIGEST" masthead across the top. That is a real publication, and showing it would imply a feature that does not exist, so the top 17.5% is removed. See docs/phase-2e-media-implementation.md §3.',
  }),

  assetArchitecture: media({
    id: 'asset-architecture',
    src: '/media/asset-architecture.webp',
    width: 2000,
    height: 1116,
    alt: 'Hands adjusting a detailed architectural model of a house on a studio table.',
    focal: '50% 45%',
    source: 'IMAGES/sarahkaterina_Services_9.png',
    embeddedText: EMBEDDED_LOCKUP,
  }),

  assetPlan: media({
    id: 'asset-plan',
    src: '/media/asset-plan.webp',
    width: 2000,
    height: 1116,
    alt: 'A three-dimensional cutaway floor plan of an apartment, seen from above.',
    focal: '55% 45%',
    source: 'IMAGES/sarahkaterina_Services_10.png',
    embeddedText: EMBEDDED_LOCKUP,
  }),

  /* --- territory / CTA --------------------------------------------------- */

  territoryCoast: media({
    id: 'territory-coast',
    src: '/media/territory-coast.webp',
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
    src: '/media/territory-contact.webp',
    width: 1376,
    height: 768,
    alt: 'A marble table with a phone, sunglasses, a key and a cup of coffee in dappled light.',
    focal: '50% 50%',
    source: 'IMAGES/sarahkaterina_LifeStyle_6.png',
    note: 'The phone screen shows a mock-up of this site. Self-referential, not a third-party brand.',
  }),

  purchaseFinalContact: media({
    id: 'purchase-final-contact',
    src: '/media/purchase-final-contact.png',
    width: 1376,
    height: 768,
    alt: 'A warm editorial tabletop scene with a branded contact presentation, viewed from above.',
    focal: '50% 50%',
    source: 'sarahkaterina_Contacto.png',
    embeddedText: 'Sarah Katerina — brand and service copy embedded in the source image.',
    note: 'Preview-only owner-selected visual for the Property Purchase final CTA. The original is retained unchanged; create a clean derivative before production.',
  }),

  /* --- process / report -------------------------------------------------- */

  processAnalysis: media({
    id: 'process-analysis',
    src: '/media/process-analysis.webp',
    width: 1376,
    height: 768,
    alt: 'A dark meeting room at dusk with a floating screen and documents laid out on the table.',
    focal: '55% 50%',
    source: 'IMAGES/sarahkaterina_services_1.png',
    embeddedText: 'On-screen: "The Spanish property system, decoded for you"',
  }),

  processPresentation: media({
    id: 'process-presentation',
    src: '/media/process-presentation.webp',
    width: 1681,
    height: 936,
    alt: 'A warm living room with a wall-mounted screen showing a website layout, looking out to the sea.',
    focal: '45% 45%',
    source: 'IMAGES/sarahkaterina_services_2.png',
  }),

  reportInterior: media({
    id: 'report-interior',
    src: '/media/report-interior.webp',
    width: 2000,
    height: 1116,
    alt: 'A quiet grey interior with a sofa and tall windows, and a glass panel resting on the floor.',
    focal: '50% 45%',
    source: 'IMAGES/sarahkaterina_contacto_2.png',
    embeddedText: EMBEDDED_LOCKUP,
  }),

  processModel: media({
    id: 'process-model',
    src: '/media/process-model.webp',
    width: 2000,
    height: 1116,
    alt: 'Two people examining a small building model and a set of plans on a counter in a bright apartment.',
    focal: '45% 50%',
    source: 'sarahkaterina_services_6.png',
    embeddedText: EMBEDDED_LOCKUP,
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
  { slot: 'Investment · decision doors', reason: 'No approved image per door; the inventory lists Services 8/9 as an alternative, not a selection.' },
  { slot: 'Investment · cases', reason: 'Case imagery is blocked until permissions and evidence exist.' },
  { slot: 'Tax Advisory · problem/context', reason: 'LifeStyle_5 is Group B, not in the approved 1–8 block.' },
  { slot: 'Property Purchase · cases', reason: 'Same permission block as Investment.' },
  { slot: 'All landings · hero video', reason: 'No video exists in the repository. Slots keep the same aspect ratio so a video can drop in later without structural change.' },
  { slot: 'All landings · Open Graph image', reason: 'Requires an approved composition.' },
] as const;

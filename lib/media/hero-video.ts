/**
 * Hero scroll videos — Phase 2F (docs/phase-2f-approved-images-and-scroll-hero-video.md).
 *
 * One entry per service landing hero. The page's own H1, lead and CTAs stay
 * HTML; the video is supporting media, scrubbed by scroll (never played),
 * decorative for assistive technology, with a poster before it is ready and
 * in place of it under reduced motion, without JavaScript or on failure.
 *
 * DERIVATIVES — H.264 High, yuv420p, `+faststart`, **no audio track**, a
 * keyframe every 6 frames (0.25 s at 24 fps) and no B-frames, so a seek to any
 * `currentTime` decodes at most five frames: scrubbing stays responsive.
 *
 * POSTERS — each cut has two, both the clip's own frames:
 *   - `start`: frame 0, the frame the scrub rests on at the top of the page.
 *     Shown only when the scrub will run, so poster → video never jumps.
 *   - `end`: the final frame, the representative still. Shown under reduced
 *     motion, without scripting, and if the video fails.
 *
 * Team deliberately has no entry (brief §6.5): its hero stays the authentic
 * team photograph.
 */

export interface HeroVideoCut {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Bytes, as committed. */
  readonly bytes: number;
  readonly posterStart: string;
  readonly posterEnd: string;
}

export interface HeroVideo {
  readonly id: string;
  readonly route: '/preview/investment' | '/preview/property-purchase' | '/preview/tax-advisory';
  /** 768px and up. */
  readonly desktop: HeroVideoCut;
  /** Below 768px. */
  readonly mobile: HeroVideoCut;
  /** Seconds. */
  readonly duration: number;
  /** Alt text of the representative poster (the video itself is aria-hidden). */
  readonly posterAlt: string;
  /** Immutable source, relative to the repository root. */
  readonly source: string;
  readonly sourceSha256: string;
  readonly note: string;
}

const PROVENANCE =
  'Owner-approved for Preview in docs/phase-2f-approved-images-and-scroll-hero-video.md (2026-09-23). Generated footage; generation method and rights record are not in the repository — confirm before production.';

function heroVideo(entry: HeroVideo): HeroVideo {
  return entry;
}

export const HERO_VIDEO = {
  investment: heroVideo({
    id: 'investment-hillside-development',
    route: '/preview/investment',
    desktop: {
      src: '/media/hero/tax-ownership-replacement-desktop.mp4',
      width: 1280,
      height: 720,
      bytes: 7821655,
      posterStart: '/media/hero/tax-ownership-replacement-desktop-start.webp',
      posterEnd: '/media/hero/tax-ownership-replacement-desktop-end.webp',
    },
    mobile: {
      src: '/media/hero/tax-ownership-replacement-mobile.mp4',
      width: 854,
      height: 480,
      bytes: 3349768,
      posterStart: '/media/hero/tax-ownership-replacement-mobile-start.webp',
      posterEnd: '/media/hero/tax-ownership-replacement-mobile-end.webp',
    },
    duration: 10.08,
    posterAlt:
      'An aerial view of contemporary white hillside villas, landscaped terraces and swimming pools in warm evening light.',
    source: 'VIDEOS/TAX ADVISORY HERO REPLACEMENT.mp4',
    sourceSha256: '4dc31d8c10d424c4ced1d2954df41c9b1aa742501b55e5db1c5fcd1dee150ed1',
    note: `${PROVENANCE} Owner selected this film on 2026-09-24 to replace the repeated map in the Investment hero. Full 16:9 frame for both cuts. The territorial map remains in the Asset Types band, where it explains location and investment routes without repeating the hero.`,
  }),

  purchase: heroVideo({
    id: 'purchase-buyer-side',
    route: '/preview/property-purchase',
    desktop: {
      src: '/media/hero/purchase-buyer-side-desktop.mp4',
      width: 1280,
      height: 720,
      bytes: 3369887,
      posterStart: '/media/hero/purchase-buyer-side-desktop-start.webp',
      posterEnd: '/media/hero/purchase-buyer-side-desktop-end.webp',
    },
    mobile: {
      src: '/media/hero/purchase-buyer-side-mobile.mp4',
      width: 960,
      height: 540,
      bytes: 1921968,
      posterStart: '/media/hero/purchase-buyer-side-mobile-start.webp',
      posterEnd: '/media/hero/purchase-buyer-side-mobile-end.webp',
    },
    duration: 10.04,
    posterAlt:
      'Sarah Katerina at the head of a long meeting table in a bright villa interior, with several people seated around it.',
    source: 'VIDEOS/SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4',
    sourceSha256: 'cc4cad5a6136857b8cf59158adaa14a68bcb86b26d33ec2a63887815bd35529c',
    note: `${PROVENANCE} Full frame, no crop, on every width: the people are spread across the table. The other people are editorial participants — not clients, team members, sellers or regulated professionals.`,
  }),

  tax: heroVideo({
    id: 'tax-ownership-costs',
    route: '/preview/tax-advisory',
    desktop: {
      src: '/media/hero/tax-ownership-costs-desktop.mp4',
      width: 1280,
      height: 720,
      bytes: 3908866,
      posterStart: '/media/hero/tax-ownership-costs-desktop-start.webp',
      posterEnd: '/media/hero/tax-ownership-costs-desktop-end.webp',
    },
    mobile: {
      src: '/media/hero/tax-ownership-costs-mobile.mp4',
      width: 854,
      height: 480,
      bytes: 1895065,
      posterStart: '/media/hero/tax-ownership-costs-mobile-start.webp',
      posterEnd: '/media/hero/tax-ownership-costs-mobile-end.webp',
    },
    duration: 10.04,
    posterAlt:
      'A hillside villa with an infinity pool at sunset, drawn over with a wireframe and labels for purchase taxes, ongoing property costs and legal ownership risk, with Sarah Katerina standing beside it.',
    source: 'VIDEOS/BIENES RACIES QUE CRECEN.mp4',
    sourceSha256: '9729ed6043af3f52dc73fca86d41371b90d3491de27935fd4a39db940a62cd49',
    note: `${PROVENANCE} Full frame, no crop: the labels sit across the whole picture. Encoded at CRF 26 (desktop) and 854×480 CRF 27 (mobile) to stay near the weight target; labels checked legible. The footage's own labels contain generation typos ("Ondoing", "Prlimperty") that cannot be corrected in code. No label is duplicated over it.`,
  }),
} as const satisfies Record<string, HeroVideo>;

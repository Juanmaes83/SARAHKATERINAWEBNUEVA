/**
 * Hero videos — Phase 2F (docs/phase-2f-approved-images-and-scroll-hero-video.md),
 * playback revised in Phase 2H (docs/phase-2h-juanma-review.md §A).
 *
 * One entry per service landing hero. The page's own H1, lead and CTAs stay
 * HTML; the video is supporting media, decorative for assistive technology,
 * with a poster before it is ready and in place of it under reduced motion,
 * without JavaScript or on failure.
 *
 * PLAYBACK — each entry says how its hero moves:
 *   - `play-once` (Investment, Property Purchase — Sarah's review, 2026-09):
 *     `HeroFilm` plays the clip once, muted, independently of scroll, and
 *     rests on its final frame, with a visible Pause / Play / Replay control.
 *   - `scrub` (Tax Advisory, unchanged from Phase 2F): `ScrubVideo` maps the
 *     page scroll to `currentTime`.
 *
 * DERIVATIVES — H.264 High, yuv420p, `+faststart`, **no audio track**.
 *   - `scrub` cuts: a keyframe every 6 frames (0.25 s at 24 fps) and no
 *     B-frames, so a seek to any `currentTime` decodes at most five frames.
 *   - `play-once` cuts: a keyframe every 2 s (`-g 48`) — playback needs no
 *     dense keyframes, which roughly halves the weight of the same frame.
 *
 * POSTERS — each cut has two, both the clip's own frames:
 *   - `start`: frame 0. Shown only when the video will move (scrub or
 *     playback), so poster → video never jumps.
 *   - `end`: the final frame, the representative still. Shown under reduced
 *     motion, without scripting, and if the video fails.
 *
 * Team deliberately has no entry (brief §6.5): its hero stays the authentic
 * team photograph.
 *
 * 2026-10-02: the Home hero (`home`) joins as a play-once entry, PROVISIONAL
 * and SILENT (docs/home-buyer-system-preview.md §14). Its original is not
 * committed (92.7 MB); `source` and `sourceSha256` identify the local file.
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

export type HeroPlayback = 'play-once' | 'scrub';

export interface HeroVideo {
  readonly id: string;
  /** How the hero moves: played once (`HeroFilm`) or scrubbed by scroll (`ScrubVideo`). */
  readonly playback: HeroPlayback;
  readonly route:
    | '/preview/home'
    | '/preview/investment'
    | '/preview/property-purchase'
    | '/preview/tax-advisory';
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
  home: heroVideo({
    id: 'sarah-home-hero-review',
    playback: 'play-once',
    route: '/preview/home',
    desktop: {
      // Supplied ready-made by Juanma (2026-10-02); served unchanged.
      src: '/media/video/sarah-home-hero-review-silent.mp4',
      width: 1880,
      height: 1080,
      bytes: 11565473,
      posterStart: '/media/video/sarah-home-hero-review-desktop-start.webp',
      posterEnd: '/media/video/sarah-home-hero-review-desktop-end.webp',
    },
    mobile: {
      src: '/media/video/sarah-home-hero-review-silent-mobile.mp4',
      width: 960,
      height: 552,
      bytes: 3539167,
      posterStart: '/media/video/sarah-home-hero-review-mobile-start.webp',
      posterEnd: '/media/video/sarah-home-hero-review-mobile-end.webp',
    },
    duration: 49.13,
    posterAlt:
      'A finished contemporary villa with a pool and lit terraces on a hillside at dusk, the name Sarah Katerina on its facade.',
    source: 'VIDEOS/SARAHKATERINA_HERO_VIDEO_WEB_BRANDING.mp4',
    sourceSha256: '4289c168d5b3c60f7862753b33366d0bce8cf3440f88e8689f6a9311565a0518',
    note: 'Owner-supplied by Juanma on 2026-10-02 for the Home Preview; PROVISIONAL and SILENT. Original NOT committed (92,657,825 B, about 4× the largest file in VIDEOS/): kept locally at VIDEOS/SARAHKATERINA_HERO_VIDEO_WEB_BRANDING.mp4 in the review worktree; H.264 Main 2506×1440, 30 fps, 49.13 s, AAC stereo (never served). Who made it, and how, is not recorded. Desktop cut: the MP4 supplied ready-made by Juanma, unchanged (H.264 High 1880×1080, 30 fps, no audio track, +faststart, SHA-256 abe15578d32ed22f26d05db330a104f62c3aae1ac41989ab677fbb7feae35855). Mobile cut: made from the original (H.264 High 960×552, CRF 26, keyframe every 2 s, no audio, +faststart, SHA-256 f0dfd19366f2ed6ad2c2719f2ae21bf081945a53ec445f6663837d86b0c86b69). Posters: frames 0 and final of each served cut, WebP quality 78. Shows a document being signed, a woman in a dark blazer speaking across a meeting table in an office with the Sarah Katerina name on the wall, a floor plan furnished on a screen, a hillside plot becoming a building site, and a finished villa. PENDING: the final voice-over (not produced; no audio exists or is served); the identity of the woman shown, her release and whether the footage is recorded or generated (not in the repository); the Sarah Katerina wordmark rendered inside the film is part of the supplied footage, not the approved logo file; the plot, works and villa are illustrative and evidence no project, permission, timing, budget or return. The source carries thin dark bars top and bottom (about 16 px at 1440), kept as supplied.',
  }),

  investment: heroVideo({
    id: 'investment-hillside-development',
    playback: 'play-once',
    route: '/preview/investment',
    desktop: {
      src: '/media/hero/investment-film-desktop.mp4',
      width: 1280,
      height: 720,
      bytes: 3408121,
      posterStart: '/media/hero/investment-film-desktop-start.webp',
      posterEnd: '/media/hero/investment-film-desktop-end.webp',
    },
    mobile: {
      src: '/media/hero/investment-film-mobile.mp4',
      width: 854,
      height: 480,
      bytes: 1835620,
      posterStart: '/media/hero/investment-film-mobile-start.webp',
      posterEnd: '/media/hero/investment-film-mobile-end.webp',
    },
    duration: 10.08,
    posterAlt:
      'An aerial view of contemporary white hillside villas, landscaped terraces and swimming pools in warm evening light.',
    source: 'VIDEOS/TAX ADVISORY HERO REPLACEMENT.mp4',
    sourceSha256: '4dc31d8c10d424c4ced1d2954df41c9b1aa742501b55e5db1c5fcd1dee150ed1',
    note: `${PROVENANCE} Owner selected this film on 2026-09-24 to replace the repeated map in the Investment hero. Full 16:9 frame for both cuts. Phase 2H: re-derived for playback (CRF 25 desktop / 25 mobile, keyframe every 2 s) from the same source; the scrub cuts (7.8 MB / 3.3 MB) were removed. Its audio track is ambient only (no speech detected). The territorial map remains in the Asset Types band, where it explains location and investment routes without repeating the hero.`,
  }),

  purchase: heroVideo({
    id: 'purchase-buyer-side',
    playback: 'play-once',
    route: '/preview/property-purchase',
    desktop: {
      src: '/media/hero/purchase-film-desktop.mp4',
      width: 1280,
      height: 720,
      bytes: 1450679,
      posterStart: '/media/hero/purchase-film-desktop-start.webp',
      posterEnd: '/media/hero/purchase-film-desktop-end.webp',
    },
    mobile: {
      src: '/media/hero/purchase-film-mobile.mp4',
      width: 960,
      height: 540,
      bytes: 813572,
      posterStart: '/media/hero/purchase-film-mobile-start.webp',
      posterEnd: '/media/hero/purchase-film-mobile-end.webp',
    },
    duration: 10.04,
    posterAlt:
      'Sarah Katerina at the head of a long meeting table in a bright villa interior, with several people seated around it.',
    source: 'VIDEOS/SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4',
    sourceSha256: 'cc4cad5a6136857b8cf59158adaa14a68bcb86b26d33ec2a63887815bd35529c',
    note: `${PROVENANCE} Full frame, no crop, on every width: the people are spread across the table. The other people are editorial participants — not clients, team members, sellers or regulated professionals. Phase 2H: re-derived for playback (CRF 23 desktop / 24 mobile, keyframe every 2 s). The source carries an English voice-over ("When you buy in Spain, know who's on your side. Sarah Katerina." — machine transcript, unverified); it is not published: both cuts are silent until Sarah approves the line and captions exist.`,
  }),

  tax: heroVideo({
    id: 'tax-advisory-costs',
    playback: 'scrub',
    route: '/preview/tax-advisory',
    desktop: {
      src: '/media/hero/tax-advisory-costs-desktop.mp4',
      width: 1280,
      height: 720,
      bytes: 5755094,
      posterStart: '/media/hero/tax-advisory-costs-desktop-start.webp',
      posterEnd: '/media/hero/tax-advisory-costs-desktop-end.webp',
    },
    mobile: {
      src: '/media/hero/tax-advisory-costs-mobile.mp4',
      width: 854,
      height: 480,
      bytes: 2653547,
      posterStart: '/media/hero/tax-advisory-costs-mobile-start.webp',
      posterEnd: '/media/hero/tax-advisory-costs-mobile-end.webp',
    },
    duration: 10.08,
    posterAlt:
      'A Mediterranean villa beside the sea, overlaid with an architectural wireframe and labels for purchase tax, legal checks, ownership risk, buying costs and ongoing obligations.',
    source: 'VIDEOS/TAX ADVISORY HERO SECTION.mp4',
    sourceSha256: '2b180b1dab81f05e541207377c86d1ae6555cf751bc8539b8a271120094fd720',
    note: `${PROVENANCE} Owner selected this film on 2026-09-24 for the Tax Advisory hero. The source is cropped minimally to 16:9 for both cuts. Its embedded labels describe purchase tax, legal checks, ownership/title risk, hidden buying cost, annual costs and ongoing obligations; no duplicate HTML labels are placed over it.`,
  }),
} as const satisfies Record<string, HeroVideo>;

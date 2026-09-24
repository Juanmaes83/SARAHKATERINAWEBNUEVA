/**
 * Approved video — Phase 2F (brief 2026-09-23, territory map and banners).
 *
 * The companion of `approved-media.ts` for moving images. Every entry records
 * the untouched original it was cut from, what was changed and where it plays.
 * Nothing here is approved for production; it is placed in Preview only.
 * Phase 2G adds one brand film to Property Purchase (`purchaseGoodIdea`).
 *
 * All derivatives are silent: the original carries a quiet music bed that
 * adds nothing to a muted, inline, autoplaying clip, and a muted clip is the
 * only kind a browser lets start without a gesture.
 */

export interface VideoSource {
  readonly src: string;
  readonly type: 'video/webm' | 'video/mp4';
}

export interface ApprovedVideo {
  readonly id: string;
  /** Preferred first: WebM (smaller), then MP4 for every other browser. */
  readonly sources: readonly VideoSource[];
  /** The clip's final frame — shown before play, without JS and under reduced motion. */
  readonly poster: string;
  readonly width: number;
  readonly height: number;
  /** Seconds. */
  readonly duration: number;
  /** What the clip shows, for its accessible description. */
  readonly description: string;
  /** Untouched original, relative to the repository root. */
  readonly source: string;
  readonly note: string;
}

const ORIGINAL = 'VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4';
const PROVENANCE =
  'Owner-supplied on 2026-09-23 for Preview. Generated relief map, not official cartography; generation method not recorded — confirm before production.';

function video(entry: ApprovedVideo): ApprovedVideo {
  return entry;
}

export const APPROVED_VIDEO = {
  /**
   * Desktop and tablet cut. The original's left 72px are trimmed: a second,
   * duplicated compass rose sits there for the whole clip.
   */
  territoryMapWide: video({
    id: 'territory-map-wide',
    sources: [
      { src: '/media/video/territory-map-wide.webm', type: 'video/webm' },
      { src: '/media/video/territory-map-wide.mp4', type: 'video/mp4' },
    ],
    poster: '/media/video/territory-map-wide-poster.webp',
    width: 1208,
    height: 720,
    duration: 5.05,
    description:
      'A relief map of the Costa Blanca from Altea and Calpe in the north to Torrevieja and Orihuela Costa in the south. A panel fades in listing four asset types: residential, land, commercial and redevelopment.',
    source: ORIGINAL,
    note: `${PROVENANCE} Cut: crop 1208×720 from x=72. Slot: Investment · Asset types, lead figure.`,
  }),

  /**
   * Phone cut. A portrait window on the coast that keeps all six town labels
   * and the asset panel legible at 320–767px, where the wide cut's panel text
   * would shrink to a few pixels.
   */
  territoryMapTall: video({
    id: 'territory-map-tall',
    sources: [
      { src: '/media/video/territory-map-tall.webm', type: 'video/webm' },
      { src: '/media/video/territory-map-tall.mp4', type: 'video/mp4' },
    ],
    poster: '/media/video/territory-map-tall-poster.webp',
    width: 560,
    height: 720,
    duration: 5.05,
    description:
      'A relief map of the Costa Blanca coast with six towns marked, from Altea to Orihuela Costa, and a panel listing four asset types: residential, land, commercial and redevelopment.',
    source: ORIGINAL,
    note: `${PROVENANCE} Cut: crop 560×720 from x=440. Slot: Investment · Asset types, lead figure below 768px.`,
  }),

  /**
   * Seamless ten-second loop (forward, then reversed) of the southern coast,
   * clear of the asset panel. It fills the video window of the testimonial
   * banner until a buyer's own recorded testimony is approved.
   */
  territoryLoop: video({
    id: 'territory-loop',
    sources: [
      { src: '/media/video/territory-loop.webm', type: 'video/webm' },
      { src: '/media/video/territory-loop.mp4', type: 'video/mp4' },
    ],
    poster: '/media/video/territory-loop-poster.webp',
    width: 480,
    height: 270,
    duration: 10.08,
    description: 'A slow relief-map view of the southern Costa Blanca around Torrevieja.',
    source: ORIGINAL,
    note: `${PROVENANCE} Cut: crop 480×270 from x=196, y=444, played forward then reversed. Slot: Property Purchase · buyer voices banner, video window placeholder.`,
  }),

  /**
   * Phase 2G (docs/phase-2g-connected-service-journey.md). The brand film
   * "BUENA IDEA_MALA EJECUCIÓN": a buyer leaves a grey, wintry home, makes a
   * call, flies over the coast, arrives in Alicante, is handed keys and walks
   * into the sea. The film shows the idea, not a failure; the band around it
   * names what decides whether the idea becomes a good purchase.
   *
   * Full 16:9 frame, no crop, no text in the footage. The original's English
   * voice-over is not carried (silent derivative, like every clip here).
   */
  purchaseGoodIdea: video({
    id: 'purchase-good-idea',
    sources: [
      { src: '/media/video/purchase-good-idea.webm', type: 'video/webm' },
      { src: '/media/video/purchase-good-idea.mp4', type: 'video/mp4' },
    ],
    poster: '/media/video/purchase-good-idea-poster.webp',
    width: 1280,
    height: 720,
    duration: 10.04,
    description:
      'A short film: someone leaves a grey, rainy home and makes a phone call, a plane crosses the coast at sunset, Alicante appears from the air, keys are handed over in a bright room above the sea, and bare feet walk into the shallow water.',
    source: 'VIDEOS/BUENA IDEA_MALA EJECUCIÓN.mp4',
    note: 'Owner-supplied brand film, copied unchanged from Juanmaes83/sarahkaterina `VIDEOS DE MARCA/BUENA IDEA_MALA EJECUCIÓN.mp4` (git blob 31312fba73e924ac8a27891f676c0527b9e4d9de, SHA-256 24b0e14b8ae9b19cbb6f02c7c39fd74faed7b7d4d4e5fd4f6fa334a0732a273e) on 2026-09-24 for Preview. Generated footage; generation method and rights record are not in the repository — confirm before production. The people are editorial participants, not clients, team members or sellers. Cut: full frame 1280×720, audio removed, VP9 and H.264 at about 0.7 Mbit/s. Slot: Property Purchase · "Good idea, bad execution" band, between the audience band and the one-file band.',
  }),
} as const satisfies Record<string, ApprovedVideo>;

import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import type { ApprovedMedia } from '@/lib/media/approved-media';
import styles from './TerritoryVisual.module.css';

/**
 * Conceptual territory / asset module.
 *
 * WHY THIS EXISTS
 *
 * The Investment template carries photography of villas, coastline and plots.
 * No licensed property or Costa Blanca photograph exists in the mother
 * repository, and the governance forbids three of the four obvious
 * substitutes: generic stock, a generated image presented as real, and using
 * the template screenshot itself as a production asset.
 *
 * The fourth option is what this is: an explicitly schematic drawing —
 * contour lines, a coastline, a plot boundary, a built footprint — that
 * occupies the visual slot honestly. It reads as a map or a site plan, which
 * is what an analyst would actually look at, and it cannot be mistaken for a
 * photograph of a real place.
 *
 * Every instance is `role="img"` with an accessible name that says it is a
 * schematic. Replace with real photography when Juanma supplies it; the slot,
 * aspect ratio and crop behaviour are already correct.
 */

export type TerritoryVariant = 'coast' | 'plot' | 'built' | 'works' | 'district';

export interface TerritoryVisualProps {
  variant?: TerritoryVariant;
  className?: string;
  /** Rendered over the drawing, bottom-left, like a map label. */
  label?: string;
  /** Deepens the ground for use on light bands. */
  tone?: 'navy' | 'sand';
  /**
   * PHASE 2E — an approved photograph for this slot.
   *
   * When supplied, the photograph replaces the schematic. When it is absent
   * the schematic still draws, so every slot that has no approved image keeps
   * working exactly as before and the gap stays visible rather than becoming a
   * blank box. See `lib/media/approved-media.ts`.
   */
  media?: ApprovedMedia;
  /** Priority-load this image. Set on the single hero image of a page. */
  priority?: boolean;
  /** Responsive `sizes` hint. Defaults to a full-width-then-half assumption. */
  sizes?: string;
  /** Aspect ratio override, e.g. '16 / 9'. Defaults to the 3:2 slot. */
  ratio?: string;
  /**
   * `compact` (default) applies the image's `compactCrop` when it has one, so
   * a baked-in lockup leaves the frame instead of being cut in half. `full`
   * shows the whole composition, for slots large enough to carry the lockup.
   */
  crop?: 'compact' | 'full';
  /**
   * Large editorial media only: the frame opens from its lower edge when the
   * nearest RevealOnScroll ancestor arrives. Cards never set this — their
   * photograph only settles, so a grid of cards does not become a grid of
   * competing effects.
   */
  unveil?: boolean;
}

const LABELS: Record<TerritoryVariant, string> = {
  coast: 'Schematic drawing of a coastline and terraced terrain',
  plot: 'Schematic drawing of a land parcel with its boundary and access',
  built: 'Schematic drawing of a built residential footprint on a plot',
  works: 'Schematic drawing of a structure undergoing redevelopment',
  district: 'Schematic drawing of a commercial district block plan',
};

function Contours() {
  return (
    <g className={styles.contour}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0 ${132 - i * 15} C 40 ${120 - i * 15}, 70 ${142 - i * 14}, 110 ${128 - i * 15}
              S 190 ${112 - i * 14}, 240 ${124 - i * 15}`}
        />
      ))}
    </g>
  );
}

function Grid() {
  return (
    <g className={styles.grid}>
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="160" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 32} x2="240" y2={i * 32} />
      ))}
    </g>
  );
}

function Shape({ variant }: { variant: TerritoryVariant }) {
  switch (variant) {
    case 'coast':
      return (
        <>
          {/* Sea */}
          <path
            className={styles.water}
            d="M0 96 C 50 88, 96 108, 146 100 S 208 84, 240 92 V160 H0 Z"
          />
          <path className={styles.waterLine} d="M0 96 C 50 88, 96 108, 146 100 S 208 84, 240 92" />
          {[110, 124, 138].map((y) => (
            <path
              key={y}
              className={styles.swell}
              d={`M${y - 80} ${y} h30 M${y - 30} ${y + 6} h44`}
            />
          ))}
          <path className={styles.accent} d="M168 66 l10 -18 10 18z" />
          <circle className={styles.marker} cx="178" cy="72" r="3" />
        </>
      );
    case 'plot':
      return (
        <>
          <path className={styles.parcel} d="M46 44 L196 56 L182 126 L38 116 Z" />
          <path className={styles.dash} d="M46 44 L38 116M196 56 L182 126" />
          <path className={styles.access} d="M0 138 C 60 130, 120 136, 240 128" />
          <circle className={styles.marker} cx="46" cy="44" r="3" />
          <circle className={styles.marker} cx="196" cy="56" r="3" />
          <circle className={styles.marker} cx="182" cy="126" r="3" />
          <circle className={styles.marker} cx="38" cy="116" r="3" />
        </>
      );
    case 'built':
      return (
        <>
          <path className={styles.parcel} d="M34 48 H206 V128 H34 Z" />
          <path className={styles.footprint} d="M66 68 H150 V112 H66 Z" />
          <path className={styles.footprint} d="M150 84 H178 V112 H150 Z" />
          {/* Pool, the one unmistakably residential signal */}
          <path className={styles.water} d="M66 118 H124 V128 H66 Z" />
          <path className={styles.dash} d="M34 48 H206M34 128 H206" />
          <circle className={styles.marker} cx="108" cy="90" r="3" />
        </>
      );
    case 'works':
      return (
        <>
          <path className={styles.parcel} d="M40 50 H200 V130 H40 Z" />
          <path className={styles.footprint} d="M70 76 H160 V126 H70 Z" />
          <path className={styles.dash} d="M70 90 H160M70 104 H160M100 76 V126M130 76 V126" />
          {/* Crane */}
          <path className={styles.accent} d="M176 34 V116M176 40 H124M176 40 l16 8" />
          <path className={styles.dash} d="M136 40 V58" />
        </>
      );
    case 'district':
    default:
      return (
        <>
          <path className={styles.parcel} d="M28 44 H108 V124 H28 Z" />
          <path className={styles.parcel} d="M120 60 H180 V124 H120 Z" />
          <path className={styles.footprint} d="M44 60 H92 V108 H44 Z" />
          <path className={styles.footprint} d="M132 76 H168 V112 H132 Z" />
          <path className={styles.access} d="M0 134 H240M112 44 V134" />
          <path className={styles.accent} d="M192 52 H216 V124 H192 Z" />
        </>
      );
  }
}

export function TerritoryVisual({
  variant = 'coast',
  className,
  label,
  tone = 'navy',
  media,
  priority = false,
  sizes = '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
  ratio,
  crop = 'compact',
  unveil = false,
}: TerritoryVisualProps) {
  const style = ratio ? { aspectRatio: ratio } : undefined;

  // An approved photograph replaces the drawing. Everything else about the
  // slot — the frame, the ratio, the label — is unchanged, so swapping a
  // retouched file in later needs no layout work.
  if (media) {
    const compact = crop === 'compact' ? media.compactCrop : undefined;
    return (
      <div
        className={cn(styles.frame, styles[tone], unveil && styles.unveil, className)}
        style={style}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.photo}
          // Hook for card-level hover and reveal choreography.
          data-media-photo=""
          style={{
            objectPosition: media.focal,
            ...(compact
              ? {
                  transformOrigin: compact.origin,
                  ['--sk-crop-scale' as string]: compact.scale,
                }
              : {}),
          }}
        />
        {label ? (
          <>
            <span className={styles.labelScrim} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn(styles.frame, styles[tone], className)} style={style}>
      <svg
        viewBox="0 0 240 160"
        preserveAspectRatio="xMidYMid slice"
        className={styles.svg}
        role="img"
        aria-label={`${LABELS[variant]}. Conceptual illustration, not a photograph of a real property.`}
      >
        <Grid />
        <Contours />
        <Shape variant={variant} />
      </svg>

      {label ? (
        <>
          <span className={styles.labelScrim} aria-hidden="true" />
          <span className={styles.label}>{label}</span>
        </>
      ) : null}
      <span className={styles.badge}>Schematic</span>
    </div>
  );
}

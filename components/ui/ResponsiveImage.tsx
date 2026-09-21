import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Placeholder.module.css';

export type MediaRatio = '3x2' | '16x9' | '1x1';

const ratioClass: Record<MediaRatio, string> = {
  '3x2': styles.ratio3x2!,
  '16x9': styles.ratio16x9!,
  '1x1': styles.ratio1x1!,
};

export interface ResponsiveImageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Path to an APPROVED asset under /public. When omitted the component
   * renders a clearly marked technical placeholder instead of an image.
   */
  src?: string;
  /** Required whenever `src` is set. Contextual, never the file name. */
  alt?: string;
  width?: number;
  height?: number;
  ratio?: MediaRatio;
  /** Set on the single largest above-the-fold image only. */
  priority?: boolean;
  /** Describes the asset that is still missing. Shown in the placeholder. */
  pendingAsset?: string;
}

/**
 * Renders an approved image, or an explicit placeholder when none exists.
 *
 * GOVERNANCE: no photograph of Sarah, of a team, of an office or of a property
 * is approved for use in this repository. Authentic Sarah photography is the
 * canonical identity source and AI imagery may not fabricate documentary
 * reality (brand-system/README.md, Phase C). Do not add an asset here without
 * a recorded authorisation.
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  ratio = '3x2',
  priority = false,
  pendingAsset,
  className,
  ...rest
}: ResponsiveImageProps) {
  if (!src) {
    return (
      <div
        className={cn(styles.frame, ratioClass[ratio], className)}
        role="img"
        aria-label={`Image placeholder: ${pendingAsset ?? 'approved asset pending'}`}
        {...rest}
      >
        <span className={styles.label}>Image placeholder</span>
        <span className={styles.note}>
          {pendingAsset ?? 'No approved asset. Requires authorisation before use.'}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(ratioClass[ratio], className)} {...rest}>
      <Image
        src={src}
        alt={alt ?? ''}
        width={width ?? 1200}
        height={height ?? 800}
        priority={priority}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 600px"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

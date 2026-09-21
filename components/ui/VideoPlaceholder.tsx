import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Placeholder.module.css';

export interface VideoPlaceholderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** What the future video must demonstrate. Shown inside the placeholder. */
  intent?: string;
}

/**
 * Reserves the layout slot for a future video without shipping a player.
 *
 * The activation proposal specifies 30–60s, subtitled, visible poster and
 * deferred loading, and requires the video to demonstrate process or
 * authority. No such asset is approved, so nothing is embedded here: adding a
 * third-party player would also add an unreviewed network dependency.
 */
export function VideoPlaceholder({ intent, className, ...rest }: VideoPlaceholderProps) {
  return (
    <div
      className={cn(styles.frame, styles.ratio16x9, className)}
      role="img"
      aria-label={`Video placeholder: ${intent ?? 'approved asset pending'}`}
      {...rest}
    >
      <span className={styles.label}>Video placeholder</span>
      <span className={styles.note}>
        {intent ?? 'No approved video asset.'} Requires subtitles, a visible poster and deferred
        loading before use.
      </span>
    </div>
  );
}

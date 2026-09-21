import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Placeholder.module.css';

export interface IconPlaceholderProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** One or two characters standing in for the future icon glyph. */
  glyph?: string;
  onDark?: boolean;
  /**
   * Accessible name. Omit it when the icon is purely decorative and the
   * adjacent text already carries the meaning — the default.
   */
  label?: string;
}

/**
 * Stands in for an icon from the future icon set.
 *
 * brand-system/foundations/iconography.md governs the icon system; no icon
 * assets are vendored in this repository, and no icon library is installed for
 * a foundation phase that does not yet need one.
 */
export function IconPlaceholder({
  glyph = '□',
  onDark = false,
  label,
  className,
  ...rest
}: IconPlaceholderProps) {
  return (
    <span
      className={cn(styles.icon, onDark && styles.iconOnDark, className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {glyph}
    </span>
  );
}

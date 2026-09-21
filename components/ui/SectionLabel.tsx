import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './SectionLabel.module.css';

export interface SectionLabelProps extends HTMLAttributes<HTMLDivElement> {
  /** Short structural code, e.g. "01". Rendered before the label text. */
  code?: string;
}

/**
 * Structural label for a documented section, following the vertical section
 * pattern in brand-system/foundations/layout-grid.md.
 */
export function SectionLabel({ code, className, children, ...rest }: SectionLabelProps) {
  return (
    <div className={cn(styles.label, className)} {...rest}>
      {code ? <span className={styles.code}>{code}</span> : null}
      <span>{children}</span>
    </div>
  );
}

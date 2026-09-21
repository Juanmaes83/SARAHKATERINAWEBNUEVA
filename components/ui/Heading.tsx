import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVisual = 'display' | 'h1' | 'h2' | 'h3';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic level. Kept independent of the visual scale so a page can keep a
   * correct document outline (exactly one h1) without being forced into a
   * particular type size.
   */
  level: HeadingLevel;
  visual?: HeadingVisual;
  /** Constrain to the canonical 62ch reading measure. */
  measure?: boolean;
}

export function Heading({
  level,
  visual,
  measure = false,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const scale: HeadingVisual = visual ?? (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3');

  return (
    <Tag
      className={cn(styles.heading, styles[scale], measure && styles.measure, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

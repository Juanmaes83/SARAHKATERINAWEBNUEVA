import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Eyebrow.module.css';

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  onDark?: boolean;
  as?: ElementType;
}

/**
 * Small caps kicker. Forest or Ink only — Terracotta is prohibited at eyebrow
 * size on every approved surface (brand-system/qa/contrast-matrix.md).
 */
export function Eyebrow({ onDark = false, as: Tag = 'span', className, children, ...rest }: EyebrowProps) {
  return (
    <Tag className={cn(styles.eyebrow, onDark && styles.onDark, className)} {...rest}>
      {children}
    </Tag>
  );
}

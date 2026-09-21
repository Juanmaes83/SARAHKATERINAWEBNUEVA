import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Badge.module.css';

/**
 * `pending` is the governance state marker used throughout the foundation
 * laboratory to label anything that is not approved. It is a status
 * indicator, not a decorative accent.
 */
export type BadgeTone = 'neutral' | 'strong' | 'outline' | 'pending' | 'onDark';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = 'neutral', className, children, ...rest }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone], className)} {...rest}>
      {children}
    </span>
  );
}

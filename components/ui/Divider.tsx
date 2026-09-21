import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** 3px Terracotta editorial rule. Decorative use only, never interactive. */
  accent?: boolean;
  onDark?: boolean;
}

export function Divider({ accent = false, onDark = false, className, ...rest }: DividerProps) {
  return (
    <hr
      className={cn(styles.divider, accent && styles.accent, onDark && styles.onDark, className)}
      {...rest}
    />
  );
}

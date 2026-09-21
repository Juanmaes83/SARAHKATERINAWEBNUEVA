import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Stack.module.css';

/** Canonical 8-point spacing primitives. 4px is micro-only (BSD-014). */
export type StackGap = 4 | 8 | 16 | 24 | 32 | 48;

export interface StackProps extends HTMLAttributes<HTMLElement> {
  gap?: StackGap;
  direction?: 'column' | 'row';
  as?: ElementType;
}

const gapClass: Record<StackGap, string> = {
  4: styles.gap4!,
  8: styles.gap8!,
  16: styles.gap16!,
  24: styles.gap24!,
  32: styles.gap32!,
  48: styles.gap48!,
};

export function Stack({
  gap = 16,
  direction = 'column',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: StackProps) {
  return (
    <Tag
      className={cn(styles.stack, direction === 'row' && styles.row, gapClass[gap], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

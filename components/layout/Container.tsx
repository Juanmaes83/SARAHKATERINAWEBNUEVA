import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Container.module.css';

/**
 * Canonical widths (brand-system/foundations/layout-grid.md):
 *   landing  1200px — marketing/editorial content
 *   focused   760px — single-task panels
 *   reading    62ch — sustained reading measure
 *
 * The gutter is added on top of the max-width so the *content* column matches
 * the canonical value rather than being narrowed by padding.
 */
export type ContainerWidth = 'landing' | 'focused' | 'reading';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  width?: ContainerWidth;
  as?: ElementType;
}

export function Container({
  width = 'landing',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn(styles.container, styles[width], className)} {...rest}>
      {children}
    </Tag>
  );
}

import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Section.module.css';

export type SectionSpacing = 'min' | 'comfortable' | 'generous';

/**
 * Surface roles (brand-system/foundations/surfaces-borders-radius.md):
 *   page  Ivory ground
 *   soft  Sage attention block
 *   warm  Sand warm neutral
 *   dark  Forest — reserved by default for the final CTA panel. BSD-026
 *         requires explicit design justification for additional dark sections.
 */
export type SectionSurface = 'page' | 'soft' | 'warm' | 'dark';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  surface?: SectionSurface;
  as?: ElementType;
}

export function Section({
  spacing = 'comfortable',
  surface = 'page',
  as: Tag = 'section',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(styles.section, styles[spacing], styles[surface], className)}
      // Drives the surface-aware focus ring declared in globals.css.
      data-surface={surface === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      {children}
    </Tag>
  );
}

import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { cn } from '@/lib/utils/cn';
import styles from './WebSection.module.css';

export type WebSurface = 'ivory' | 'soft' | 'white' | 'navy' | 'navySoft';

export interface WebSectionProps {
  surface?: WebSurface;
  tight?: boolean;
  id?: string;
  className?: string;
  /** Applies the reading container instead of the full landing width. */
  narrow?: boolean;
  children: ReactNode;
}

export function WebSection({
  surface = 'ivory',
  tight = false,
  id,
  className,
  narrow = false,
  children,
}: WebSectionProps) {
  const dark = surface === 'navy' || surface === 'navySoft';

  return (
    <section
      id={id}
      className={cn(styles.section, tight && styles.tight, styles[surface], className)}
      // Drives the surface-aware focus ring declared in globals.css.
      data-surface={dark ? 'dark' : 'light'}
    >
      <Container width={narrow ? 'focused' : 'landing'}>{children}</Container>
    </section>
  );
}

export interface WebSectionHeaderProps {
  eyebrow?: string;
  /** Every section header is an h2. The page has exactly one h1, in the hero. */
  title: string;
  subtitle?: string;
  centered?: boolean;
  rule?: boolean;
  /** Layout hook for composed section heads (e.g. a header beside body copy). */
  className?: string;
}

export function WebSectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  rule = false,
  className,
}: WebSectionHeaderProps) {
  return (
    <RevealOnScroll className={cn(styles.header, centered && styles.centered, className)}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      {rule ? <hr className={styles.rule} /> : null}
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </RevealOnScroll>
  );
}

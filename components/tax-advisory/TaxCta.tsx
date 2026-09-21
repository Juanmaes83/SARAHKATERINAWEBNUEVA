'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics/track';
import { EditorialIcon } from './EditorialIcon';
import styles from './TaxCta.module.css';

export type TaxCtaVariant = 'primary' | 'secondary' | 'quiet';

export interface TaxCtaProps {
  children: ReactNode;
  variant?: TaxCtaVariant;
  onDark?: boolean;
  /**
   * In-page anchor. Provided ONLY for destinations that exist on this page.
   *
   * No CTA on this landing points anywhere else. Contact channels are
   * unconfirmed (README.md §12), the tax-exposure tool is NOT BUILT in the
   * Buyer System, and the service routes the template implies do not exist.
   * A CTA without an anchor renders as a button that records the intent and
   * goes nowhere, and the section it sits in says so in words.
   */
  href?: string;
  /** Analytics section identifier — stable id, never the visible label. */
  section: string;
  /** Analytics target identifier. */
  target: string;
  /** Hides the trailing arrow used on the template's filled CTAs. */
  noArrow?: boolean;
  className?: string;
}

export function TaxCta({
  children,
  variant = 'primary',
  onDark = false,
  href,
  section,
  target,
  noArrow = false,
  className,
}: TaxCtaProps) {
  const classes = cn(
    styles.cta,
    styles[variant],
    onDark && styles.onDark,
    !href && styles.inert,
    className,
  );

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {noArrow ? null : <EditorialIcon name="arrow" size="sm" className={styles.arrow} />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={() => track('primary_cta_click', { section, target })}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={() => track('primary_cta_click', { section, target })}
      // Announced to assistive technology, not only implied by the styling.
      aria-describedby="tax-advisory-cta-note"
    >
      {content}
    </button>
  );
}

/**
 * The single, page-wide explanation of why the CTAs do not navigate.
 *
 * Rendered once near the end of the document and referenced by every inert CTA
 * through aria-describedby, so the statement is not repeated visually but is
 * still announced wherever it applies.
 */
export function TaxCtaNote({
  children,
  onDark = false,
}: {
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <p id="tax-advisory-cta-note" className={cn(styles.note, onDark && styles.noteOnDark)}>
      {children}
    </p>
  );
}

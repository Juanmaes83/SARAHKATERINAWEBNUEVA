import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import type { Claim, ReviewDomain } from '@/lib/content/claims';
import styles from './Primitives.module.css';

/* ===========================================================================
 * BAND — the vertical rhythm of the reference composition
 *
 * The template alternates ivory, ivory-deep and two navies, and separates them
 * with a hairline rather than a heavy edge. Vertical padding is deliberately
 * larger than the canonical section scale at desktop: the phase contract says
 * the implementation "must preserve the proposal's editorial character while
 * adding more air, spacing and rhythm where the screenshots are too
 * condensed" (docs/phase-2-visual-implementation-contract.md §3).
 * ======================================================================== */

export type BandTone = 'ivory' | 'ivoryDeep' | 'navy' | 'navySoft';
export type BandSpace = 'tight' | 'regular' | 'open';

export interface BandProps extends HTMLAttributes<HTMLElement> {
  tone?: BandTone;
  space?: BandSpace;
  /** Draws the template's hairline rule along the top edge. */
  rule?: boolean;
  as?: ElementType;
}

export function Band({
  tone = 'ivory',
  space = 'regular',
  rule = false,
  as: Tag = 'section',
  className,
  children,
  ...rest
}: BandProps) {
  const dark = tone === 'navy' || tone === 'navySoft';

  return (
    <Tag
      className={cn(styles.band, styles[tone], styles[space], rule && styles.banded, className)}
      // Drives the surface-aware focus ring declared in globals.css.
      data-surface={dark ? 'dark' : 'light'}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ===========================================================================
 * SECTION HEAD
 * ======================================================================== */

export interface SectionHeadProps {
  eyebrow?: ReactNode;
  /** Roman first line, as in the template's two-weight headlines. */
  heading: ReactNode;
  /** Optional italic gold continuation, set on its own line. */
  headingAccent?: ReactNode;
  standfirst?: ReactNode;
  /** Semantic level. The page owns exactly one h1, in the hero. */
  level?: 2 | 3;
  align?: 'start' | 'center';
  onDark?: boolean;
  /** Marks the whole section as containing copy in a review domain. */
  review?: ReviewDomain;
  className?: string;
  id?: string;
}

export function SectionHead({
  eyebrow,
  heading,
  headingAccent,
  standfirst,
  level = 2,
  align = 'start',
  onDark = false,
  review,
  className,
  id,
}: SectionHeadProps) {
  const Tag = `h${level}` as const;

  return (
    <div className={cn(styles.head, align === 'center' && styles.headCentre, className)}>
      {eyebrow ? (
        <p className={cn(styles.eyebrow, onDark && styles.eyebrowOnDark)}>{eyebrow}</p>
      ) : null}

      <Tag id={id} className={cn(styles.heading, onDark && styles.headingOnDark)}>
        {heading}
        {headingAccent ? (
          <>
            {' '}
            <em className={styles.headingAccent}>{headingAccent}</em>
          </>
        ) : null}
      </Tag>

      {standfirst ? (
        <p className={cn(styles.standfirst, onDark && styles.standfirstOnDark)}>{standfirst}</p>
      ) : null}

      {review && review !== 'none' ? <ReviewMark domain={review} onDark={onDark} /> : null}
    </div>
  );
}

/* ===========================================================================
 * GOVERNANCE MARKERS
 *
 * Two different risks need two different treatments.
 *
 * A provisional SENTENCE is covered by the page-level preview banner and by a
 * single section-level ReviewMark. Repeating a badge after every line would
 * make the composition unreviewable as a design, which is the one thing this
 * page exists to let a human judge.
 *
 * A provisional VALUE — a figure, a credential, a date, a contact detail — is
 * the thing a reviewer can mistake for real data, so it is always marked
 * inline and never rendered as a plausible number.
 * ======================================================================== */

export function ReviewMark({ domain, onDark = false }: { domain: ReviewDomain; onDark?: boolean }) {
  if (domain === 'none') return null;

  return (
    <p className={cn(styles.reviewMark, onDark && styles.reviewMarkOnDark)}>
      <span className={styles.reviewDot} aria-hidden="true" />
      {domain} — review required before publication
    </p>
  );
}

export interface StatusMarkProps {
  claim: Claim;
  onDark?: boolean;
  /** `value` is the large treatment used where the template shows a figure. */
  variant?: 'inline' | 'value';
  className?: string;
}

/**
 * Renders the governance state of a claim whose value cannot be shown.
 *
 * `pending` and `blocked` claims render their marker text — PENDING_APPROVAL,
 * CASE PENDING_APPROVAL, ILLUSTRATIVE — with the claim's note as the
 * accessible description, so a screen-reader user gets the same warning a
 * sighted reviewer gets from the styling.
 */
export function StatusMark({
  claim,
  onDark = false,
  variant = 'inline',
  className,
}: StatusMarkProps) {
  if (claim.status !== 'pending' && claim.status !== 'blocked') return null;

  return (
    <span
      className={cn(
        styles.statusMark,
        variant === 'value' && styles.statusMarkValue,
        onDark && styles.statusMarkOnDark,
        className,
      )}
      title={claim.note ?? claim.source}
    >
      {claim.text}
    </span>
  );
}

/* ===========================================================================
 * SCRIPT MARGINALIA
 *
 * The template sets four short asides in a handwriting face. No script family
 * is approved: the canonical type system is exactly two families, Fraunces and
 * Inter (BSD-006), and adding a third would be a brand decision.
 *
 * These are set in Fraunces italic at a light weight instead — the closest the
 * approved system gets to the reference's informal register. Recorded as a
 * deliberate divergence in docs/tax-advisory-visual-decisions.md.
 * ======================================================================== */

export function ScriptNote({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return <p className={cn(styles.script, onDark && styles.scriptOnDark, className)}>{children}</p>;
}

/* ===========================================================================
 * GOLD RULE — the template's thin accent line
 * ======================================================================== */

export function GoldRule({ className }: { className?: string }) {
  return <span className={cn(styles.goldRule, className)} aria-hidden="true" />;
}

/* ===========================================================================
 * EDITORIAL MEDIA — the stand-in for photography that does not exist
 *
 * AGENTS.md §2 forbids inventing a photograph, and the visual asset manifest
 * forbids choosing generic stock silently or generating a scene that would
 * read as documentary. No authentic Costa Blanca or interior photography is
 * registered in AUTHENTIC-REFERENCE-REGISTER.md.
 *
 * Rather than a dashed grey box — which would hollow out the composition this
 * page exists to show — the slot renders a neutral, obviously non-photographic
 * editorial panel built from the approved palette, and states in words which
 * asset is missing. It cannot be mistaken for a photograph.
 * ======================================================================== */

export interface EditorialMediaProps {
  /** What the slot is for, shown on the panel. */
  label: string;
  /** The pending-asset claim, rendered as the panel's status line. */
  pending: Claim;
  ratio?: 'portrait' | 'landscape' | 'wide' | 'square';
  tone?: 'ivory' | 'navy';
  className?: string;
}

export function EditorialMedia({
  label,
  pending,
  ratio = 'landscape',
  tone = 'ivory',
  className,
}: EditorialMediaProps) {
  return (
    <figure
      className={cn(styles.media, styles[`media_${ratio}`], styles[`media_${tone}`], className)}
    >
      <span className={styles.mediaGrain} aria-hidden="true" />
      <figcaption className={styles.mediaCaption}>
        <span className={styles.mediaLabel}>{label}</span>
        <span className={styles.mediaStatus}>{pending.text}</span>
      </figcaption>
    </figure>
  );
}

/* ===========================================================================
 * NUMERAL — the template's gold-ringed step number
 * ======================================================================== */

export function Numeral({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span className={cn(styles.numeral, onDark && styles.numeralOnDark)} aria-hidden="true">
      {children}
    </span>
  );
}

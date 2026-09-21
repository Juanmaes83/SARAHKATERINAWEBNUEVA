import Link from 'next/link';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Card.module.css';

export type CardVariant = 'base' | 'feature' | 'metric' | 'decision' | 'dark';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  /** 3px Terracotta top rule. Editorial emphasis only, never interactive. */
  accent?: boolean;
  /** The single approved elevated-panel shadow. Standard cards use none. */
  elevated?: boolean;
  as?: ElementType;
}

export function Card({
  variant = 'base',
  accent = false,
  elevated = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        styles.card,
        styles[variant],
        accent && styles.accent,
        elevated && styles.elevated,
        className,
      )}
      data-surface={variant === 'dark' ? 'dark' : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export interface LinkCardProps extends Omit<CardProps, 'as'> {
  href: string;
}

/**
 * Interactive card. Hover and focus states exist only here — a static Card
 * never advertises interactivity it does not have.
 */
export function LinkCard({
  href,
  variant = 'base',
  accent = false,
  elevated = false,
  className,
  children,
  ...rest
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        styles.card,
        styles[variant],
        styles.interactive,
        accent && styles.accent,
        elevated && styles.elevated,
        className,
      )}
      data-surface={variant === 'dark' ? 'dark' : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}

export interface MetricProps extends HTMLAttributes<HTMLDivElement> {
  /** The figure itself. Never invent one: pass only verified values. */
  value: ReactNode;
  label: ReactNode;
  onDark?: boolean;
}

/**
 * A single figure with its label.
 *
 * GOVERNANCE: every published metric requires a source, a date, a permission
 * and a scope (website/01-audits/00-website-audit-master-2026-09.md P0
 * "Validar claims"). This component renders what it is given; it is the
 * caller's responsibility to pass only approved, evidenced values.
 */
export function Metric({ value, label, onDark = false, className, ...rest }: MetricProps) {
  return (
    <div className={cn(onDark && styles.metricOnDark, className)} {...rest}>
      <div className={styles.metricValue}>{value}</div>
      <div className={styles.metricLabel}>{label}</div>
    </div>
  );
}

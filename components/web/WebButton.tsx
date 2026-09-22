import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './WebButton.module.css';

export type WebButtonVariant = 'primary' | 'secondary' | 'quiet';

interface CommonProps {
  variant?: WebButtonVariant;
  onDark?: boolean;
  /** Renders a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export type WebButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

function classes(variant: WebButtonVariant, onDark: boolean, className?: string) {
  return cn(styles.button, styles[variant], onDark && styles.onDark, className);
}

/**
 * Website CTA.
 *
 * Labels are provisional throughout Phase 2B: per-intent CTA wording is still
 * an open decision (master audit P0). Nothing here is approved copy.
 */
export function WebButton({
  variant = 'primary',
  onDark = false,
  arrow = false,
  type = 'button',
  className,
  children,
  ...rest
}: WebButtonProps) {
  return (
    <button type={type} className={classes(variant, onDark, className)} {...rest}>
      {children}
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      ) : null}
    </button>
  );
}

export interface WebLinkButtonProps extends CommonProps {
  href: string;
  /** Set for links that leave this origin. */
  external?: boolean;
  onClick?: () => void;
}

export function WebLinkButton({
  href,
  variant = 'primary',
  onDark = false,
  arrow = false,
  external = false,
  className,
  children,
  onClick,
}: WebLinkButtonProps) {
  const content = (
    <>
      {children}
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes(variant, onDark, className)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {content}
        <span className="sk-visually-hidden">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes(variant, onDark, className)} onClick={onClick}>
      {content}
    </Link>
  );
}

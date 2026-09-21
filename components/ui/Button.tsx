import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Switches to the inverted CTA model for Forest/dark surfaces (BSD-029). */
  onDark?: boolean;
  loading?: boolean;
  /** Optional leading icon. Decorative only — the label carries the meaning. */
  icon?: ReactNode;
}

/**
 * Labels must describe the action. Never "Click here", and never a commercial
 * CTA: no landing copy is approved in this phase, so the laboratory uses
 * system labels such as "Primary action" or "Explore section".
 */
export function Button({
  variant = 'primary',
  onDark = false,
  loading = false,
  icon,
  type = 'button',
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled === true || loading;

  return (
    <button
      type={type}
      className={cn(styles.button, styles[variant], onDark && styles.onDark, className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className={styles.loadingLabel}>
          <span className={styles.spinner} aria-hidden="true" />
          {children}
        </span>
      ) : (
        <>
          {icon ? (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          ) : null}
          {children}
        </>
      )}
    </button>
  );
}

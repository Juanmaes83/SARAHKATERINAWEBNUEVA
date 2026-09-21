import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Button.module.css';
import type { ButtonVariant } from './Button';

export interface LinkButtonProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'className'> {
  variant?: ButtonVariant;
  onDark?: boolean;
  icon?: ReactNode;
  className?: string;
}

/**
 * A navigation control that looks like a button.
 *
 * Renders an anchor, so it is reachable and activated by keyboard as a link
 * and announced as a link. Shares the Button styles so states stay identical.
 */
export function LinkButton({
  variant = 'primary',
  onDark = false,
  icon,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={cn(styles.button, styles[variant], onDark && styles.onDark, className)}
      {...rest}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </Link>
  );
}

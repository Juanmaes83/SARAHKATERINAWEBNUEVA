import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Text.module.css';

export type TextVariant = 'lead' | 'body' | 'bodySmall' | 'caption' | 'legal';

/**
 * Colour roles.
 *
 * `muted` is deliberately ABSENT. --sk-app-text-muted is PENDING_APPROVAL and
 * must not be used by public-facing components until a value is formally
 * approved; exposing it here would be the easiest way for it to leak into a
 * page. Use `secondary` (canonical Forest, 10.83:1 on Ivory) instead.
 */
export type TextTone = 'primary' | 'secondary' | 'onDark';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  tone?: TextTone;
  /** Opt out of the 62ch reading measure (labels, table cells, inline text). */
  full?: boolean;
  as?: ElementType;
}

export function Text({
  variant = 'body',
  tone = 'primary',
  full = false,
  as: Tag = 'p',
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      className={cn(styles.text, styles[variant], styles[tone], full && styles.full, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

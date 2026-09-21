'use client';

import { cn } from '@/lib/utils/cn';
import { siteConfig, type Locale } from '@/lib/seo/config';
import styles from './LanguageSwitch.module.css';

export interface LanguageSwitchProps {
  locale: Locale;
  onChange?: (locale: Locale) => void;
  className?: string;
}

/**
 * EN/ES switch.
 *
 * Routed localisation is NOT implemented in this phase: an i18n routing
 * strategy changes the URL shape, which is entangled with the unresolved
 * canonical-host decision and with the hreflang work gated in
 * seo-final-audit-2026-09.md. This control exposes the interface and its
 * states so it can be reviewed; it does not navigate.
 */
export function LanguageSwitch({ locale, onChange, className }: LanguageSwitchProps) {
  return (
    <div
      className={cn(styles.group, className)}
      role="group"
      aria-label="Language — preview only, routing not implemented"
    >
      {siteConfig.locales.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.option}
          aria-pressed={option === locale}
          onClick={() => onChange?.(option)}
        >
          <span aria-hidden="true">{option}</span>
          <span className="sk-visually-hidden">
            {option === 'en' ? 'English' : 'Español'}
          </span>
        </button>
      ))}
    </div>
  );
}

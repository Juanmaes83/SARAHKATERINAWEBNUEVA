'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { LanguageSwitch } from './LanguageSwitch';
import { headerActionLabel, primaryNav } from '@/content/en/navigation';
import { track } from '@/lib/analytics/track';
import type { Locale } from '@/lib/seo/config';
import styles from './Header.module.css';

/**
 * Selectors for every element that can hold focus inside the mobile panel.
 */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>('en');
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close the panel on route change so navigating never leaves it stranded.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Modal behaviour: Escape closes, focus is trapped, focus returns to the
  // trigger, and the page behind the panel does not scroll.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Captured now: the ref may point elsewhere by the time cleanup runs.
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        {/*
          BRAND ASSET GAP — technical placeholder.

          No vector logo exists in the source of truth: it is listed under
          "Deliberately deferred" in brand-system/tokens/README.md, and no logo
          file is present anywhere in brand-system/.

          MISSING ASSET: an authorised Sarah Katerina wordmark/logotype (SVG,
          light and dark variants, with clear-space and minimum-size rules).

          Until that asset is supplied this renders a text wordmark set in the
          canonical display family, explicitly marked as a placeholder. Do not
          substitute an invented mark, a traced mark or an AI-generated mark.
        */}
        <Link href="/" className={styles.wordmark}>
          <span className={styles.wordmarkName}>Sarah Katerina</span>
          <span className={styles.wordmarkNote}>Wordmark placeholder</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.desktopActions}>
          <LanguageSwitch locale={locale} onChange={setLocale} />
          <Button
            variant="secondary"
            onClick={() => track('nav_cta_click', { location: 'header', target: 'primary_action' })}
          >
            {headerActionLabel}
          </Button>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className={styles.menuTrigger}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </Container>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Menu</span>
            <button type="button" className={styles.menuTrigger} onClick={close}>
              Close
            </button>
          </div>

          <nav aria-label="Primary mobile">
            <ul className={styles.panelList}>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.panelLink}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.panelFooter}>
            <LanguageSwitch locale={locale} onChange={setLocale} />
            <Button
              variant="primary"
              onClick={() =>
                track('nav_cta_click', { location: 'mobile_menu', target: 'primary_action' })
              }
            >
              {headerActionLabel}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

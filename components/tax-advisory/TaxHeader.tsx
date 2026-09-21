'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics/track';
import { siteConfig, type Locale } from '@/lib/seo/config';
import { header, pageNav } from '@/content/en/tax-advisory';
import { TaxCta } from './TaxCta';
import styles from './TaxHeader.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Tax Advisory header.
 *
 * The brand mark is real: BRAND-SK-001, the official clean logo, imported from
 * the mother repository and rendered unmodified apart from a recorded crop to
 * its own alpha bounding box (docs/tax-advisory-asset-record.md). It is not
 * recoloured, traced or redrawn.
 *
 * Navigation is in-page. The template's public IA is PENDING_APPROVAL and none
 * of the routes it implies exists.
 */
export function TaxHeader() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [locale, setLocale] = useState<Locale>('en');
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /**
   * Condenses the header after the hero.
   *
   * A scroll listener would run on every frame; a sentinel observed once is
   * cheaper and needs no throttling. There is no scroll-jacking: the page
   * scrolls normally and only the header's own padding and shadow change.
   */
  useEffect(() => {
    const sentinel = document.getElementById('tax-advisory-scroll-sentinel');
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => setCondensed(!entry?.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Modal behaviour for the mobile panel: Escape closes, focus is trapped,
  // focus returns to the trigger, and the page behind does not scroll.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
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

  const wordmark = (
    <span className={styles.wordmark}>
      <Image
        src="/brand/sk-wordmark.png"
        alt={header.logoAlt}
        width={3006}
        height={1392}
        priority
        className={styles.logo}
      />
      <span className={styles.serviceLine}>{header.serviceLine.text}</span>
    </span>
  );

  return (
    <header className={cn(styles.header, condensed && styles.condensed)}>
      <div className={styles.inner}>
        <a href="#main" className={styles.brand}>
          {wordmark}
        </a>

        <nav className={styles.desktopNav} aria-label="Sections of this page">
          <ul className={styles.navList}>
            {pageNav.map((item) => (
              <li key={item.id}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div
            className={styles.locales}
            role="group"
            aria-label="Language — preview only, routing not implemented"
          >
            {siteConfig.locales.map((option) => (
              <button
                key={option}
                type="button"
                className={styles.locale}
                aria-pressed={option === locale}
                onClick={() => setLocale(option)}
              >
                <span aria-hidden="true">{option.toUpperCase()}</span>
                <span className="sk-visually-hidden">
                  {option === 'en' ? 'English' : 'Español'}
                </span>
              </button>
            ))}
          </div>

          <TaxCta
            variant="primary"
            section="header"
            target="talk_to_sarah"
            noArrow
            className={styles.headerCta}
          >
            {header.cta.text}
          </TaxCta>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className={styles.menuTrigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen(true);
            track('nav_cta_click', { location: 'header', target: 'open_menu' });
          }}
        >
          <span className={styles.menuBars} aria-hidden="true" />
          Menu
        </button>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className={styles.panelHeader}>
            {wordmark}
            <button type="button" className={styles.menuTrigger} onClick={close}>
              Close
            </button>
          </div>

          <nav aria-label="Sections of this page, mobile">
            <ul className={styles.panelList}>
              {pageNav.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className={styles.panelLink} onClick={close}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.panelFooter}>
            <div
              className={styles.locales}
              role="group"
              aria-label="Language — preview only, routing not implemented"
            >
              {siteConfig.locales.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={styles.locale}
                  aria-pressed={option === locale}
                  onClick={() => setLocale(option)}
                >
                  <span aria-hidden="true">{option.toUpperCase()}</span>
                  <span className="sk-visually-hidden">
                    {option === 'en' ? 'English' : 'Español'}
                  </span>
                </button>
              ))}
            </div>

            <TaxCta variant="primary" section="mobile_menu" target="talk_to_sarah" noArrow>
              {header.cta.text}
            </TaxCta>

            <p className={styles.panelNote}>{header.navNote.text}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { WebButton, WebLinkButton } from './WebButton';
import { track } from '@/lib/analytics/track';
import { cn } from '@/lib/utils/cn';
import logo from '@/public/brand/sarah-katerina-logo.png';
import styles from './WebHeader.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface WebNavItem {
  readonly href: string;
  readonly label: string;
}

export interface WebHeaderProps {
  nav: readonly WebNavItem[];
  ctaLabel: string;
  brandHref?: string;
  ctaHref?: string;
}

/**
 * Website header.
 *
 * LOGO — BRAND-001, used exactly as supplied.
 *
 * `brand-system/imagery/AUTHENTIC-REFERENCE-REGISTER.md` designates
 * `IMAGENES NUEVAS/IMAGENES CON PROMPTS/IMAGENES NUEVASLOGO SARAH KATERINA.png.png`
 * as the official logo and states: "never redraw/retype/recolour/approximate"
 * and "Palette reconciliation cannot be used as permission to alter the mark".
 *
 * The only processing applied was a lossless trim of fully transparent padding,
 * verified pixel-identical. The mark's teal accent is therefore preserved even
 * though the approved website palette is navy and gold. That discrepancy is
 * recorded upstream and in docs/visual-asset-manifest.md; it is Juanma's to
 * resolve, not an agent's.
 *
 * NOTE: the Investment template shows a different lockup ("SK · SARAH KATERINA
 * INVESTMENT"). That lockup is not a governed asset, so it is not reproduced.
 */
export function WebHeader({
  nav,
  ctaLabel,
  brandHref = '/preview/investment',
  ctaHref,
}: WebHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Depth cue only. Passive listener, and the header never changes height, so
  // there is no layout shift.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Modal behaviour for the mobile panel: Escape closes, Tab is trapped, focus
  // returns to the trigger, and the page behind does not scroll.
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

  const languages = (
    <div
      className={styles.langGroup}
      role="group"
      aria-label="Language — preview only, routing not implemented"
    >
      {(['en', 'es'] as const).map((option) => (
        <button
          key={option}
          type="button"
          className={styles.lang}
          aria-pressed={option === locale}
          onClick={() => setLocale(option)}
        >
          <span aria-hidden="true">{option}</span>
          <span className="sk-visually-hidden">{option === 'en' ? 'English' : 'Español'}</span>
        </button>
      ))}
    </div>
  );

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <Container className={styles.inner}>
        <Link href={brandHref} className={styles.brand}>
          <Image
            src={logo}
            alt="Sarah Katerina"
            className={styles.logo}
            priority
            sizes="(max-width: 767px) 140px, 220px"
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {languages}
          <span className={styles.divider} aria-hidden="true" />
          {ctaHref ? (
            <WebLinkButton
              href={ctaHref}
              variant="primary"
              arrow
              onClick={() =>
                track('nav_cta_click', { location: 'header', target: 'primary_action' })
              }
            >
              {ctaLabel}
            </WebLinkButton>
          ) : (
            <WebButton
              variant="primary"
              arrow
              onClick={() =>
                track('nav_cta_click', { location: 'header', target: 'primary_action' })
              }
            >
              {ctaLabel}
            </WebButton>
          )}
        </div>

        <button
          ref={triggerRef}
          type="button"
          className={styles.menuTrigger}
          aria-expanded={open}
          aria-controls={panelId}
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
          <div className={styles.panelHead}>
            <Image src={logo} alt="Sarah Katerina" className={styles.logo} sizes="140px" />
            <button type="button" className={styles.menuTrigger} onClick={close}>
              Close
            </button>
          </div>

          <nav aria-label="Primary mobile">
            <ul className={styles.panelList}>
              {nav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.panelLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.panelFoot}>
            {languages}
            {ctaHref ? (
              <WebLinkButton
                href={ctaHref}
                variant="primary"
                arrow
                onClick={() => {
                  track('nav_cta_click', {
                    location: 'mobile_menu',
                    target: 'primary_action',
                  });
                  close();
                }}
              >
                {ctaLabel}
              </WebLinkButton>
            ) : (
              <WebButton
                variant="primary"
                arrow
                onClick={() =>
                  track('nav_cta_click', {
                    location: 'mobile_menu',
                    target: 'primary_action',
                  })
                }
              >
                {ctaLabel}
              </WebButton>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

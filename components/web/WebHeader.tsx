'use client';
import { webPath } from '@/lib/seo/public-path';

import Image from 'next/image';
import Link from '@/components/web/SiteLink';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { WebButton, WebLinkButton } from './WebButton';
import { track } from '@/lib/analytics/track';
import { resolveEntryPoint } from '@/lib/buyer-system/links';
import { cn } from '@/lib/utils/cn';
import { BuyerToolLink } from './BuyerToolLink';
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
  /** Hide the preview-only locale control when no translated route exists. */
  showLanguageSwitcher?: boolean;
  /**
   * When set, the primary CTA becomes the governed two-tool chooser. The
   * value is used only by the no-op outbound-click event.
   */
  buyerToolsSourcePage?: string;
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
  brandHref = webPath('/preview/investment'),
  ctaHref,
  showLanguageSwitcher = true,
  buyerToolsSourcePage,
}: WebHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [current, setCurrent] = useState<string | null>(null);
  const panelId = useId();
  const toolsPanelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const buyerTools = (['purchaseTax', 'realCashNeeded'] as const)
    .map((key) => resolveEntryPoint(key))
    .filter(
      (entry): entry is typeof entry & { href: string } =>
        !entry.pending && typeof entry.href === 'string',
    );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!toolsOpen) return;

    const closeTools = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent && event.key === 'Escape') {
        event.preventDefault();
        setToolsOpen(false);
        toolsRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
        return;
      }
      if (event instanceof PointerEvent && !toolsRef.current?.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };

    document.addEventListener('keydown', closeTools);
    document.addEventListener('pointerdown', closeTools);
    return () => {
      document.removeEventListener('keydown', closeTools);
      document.removeEventListener('pointerdown', closeTools);
    };
  }, [toolsOpen]);

  // Depth cue only. Passive listener, and the header never changes height, so
  // there is no layout shift.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // PHASE 2E — orientation. The in-page link whose section the reader is in
  // carries aria-current="location" and the gold underline, so the header
  // always says where you are. The section counts as current once its top has
  // passed the upper third of the viewport. rAF-throttled and passive; it only
  // reads positions, never moves the page.
  useEffect(() => {
    const ids = nav
      .map((item) => (item.href.startsWith('#') ? item.href.slice(1) : null))
      .filter((id): id is string => Boolean(id));
    if (ids.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let active: string | null = null;
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) active = id;
      }
      setCurrent(active);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [nav]);

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
    <div className={styles.langGroup} role="group" aria-label="Language">
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
        <Link
          href={brandHref}
          className={styles.brand}
          aria-current={pathname === webPath(brandHref) ? 'page' : undefined}
        >
          <Image
            src={logo}
            alt="Sarah Katerina"
            className={styles.logo}
            priority
            sizes="(max-width: 1099px) 220px, 280px"
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={
                    pathname === webPath(item.href) || pathname?.startsWith(`${webPath(item.href)}/`)
                      ? 'page'
                      : current && item.href === `#${current}`
                        ? 'location'
                        : undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {showLanguageSwitcher ? languages : null}
          {showLanguageSwitcher ? <span className={styles.divider} aria-hidden="true" /> : null}
          {buyerToolsSourcePage ? (
            <div ref={toolsRef} className={styles.toolsMenu}>
              <WebButton
                variant="primary"
                arrow
                aria-expanded={toolsOpen}
                aria-controls={toolsOpen ? toolsPanelId : undefined}
                aria-haspopup="true"
                onClick={() => setToolsOpen((value) => !value)}
              >
                {ctaLabel}
              </WebButton>
              {toolsOpen ? (
                <div
                  id={toolsPanelId}
                  className={styles.toolsPopover}
                  role="group"
                  aria-label="Verified Buyer System tools"
                >
                  <p className={styles.toolsTitle}>Choose a free tool</p>
                  {buyerTools.map((entry) => (
                    <BuyerToolLink
                      key={entry.experience.id}
                      href={entry.href}
                      calculator={entry.experience.id}
                      sourcePage={buyerToolsSourcePage}
                      className={styles.toolLink}
                    >
                      <span>{entry.experience.label}</span>
                      <small>{entry.experience.question}</small>
                    </BuyerToolLink>
                  ))}
                </div>
              ) : null}
            </div>
          ) : ctaHref ? (
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
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </Container>

      {/* Reading progress — the gold thread along the header's lower edge.
          Pure CSS, bound to the document's scroll; decorative, so hidden from
          assistive technology. */}
      <span className={styles.progress} aria-hidden="true" />

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
            <Image src={logo} alt="Sarah Katerina" className={styles.logo} sizes="220px" />
            <button type="button" className={styles.menuTrigger} onClick={close}>
              Close
            </button>
          </div>

          <nav aria-label="Primary mobile">
            <ul className={styles.panelList}>
              {nav.map((item) => (
                <li key={item.label}>
                  {/* Following an in-page link closes the dialog, so the
                      reader lands on the section instead of behind the panel. */}
                  <Link
                    href={item.href}
                    className={styles.panelLink}
                    aria-current={
                      pathname === webPath(item.href) || pathname?.startsWith(`${webPath(item.href)}/`)
                        ? 'page'
                        : current && item.href === `#${current}`
                          ? 'location'
                          : undefined
                    }
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.panelFoot}>
            {showLanguageSwitcher ? languages : null}
            {buyerToolsSourcePage ? (
              <div className={styles.mobileTools} aria-label="Verified Buyer System tools">
                <p className={styles.toolsTitle}>{ctaLabel}</p>
                {buyerTools.map((entry) => (
                  <BuyerToolLink
                    key={entry.experience.id}
                    href={entry.href}
                    calculator={entry.experience.id}
                    sourcePage={buyerToolsSourcePage}
                    className={styles.mobileToolLink}
                  >
                    <span>{entry.experience.label}</span>
                    <small>{entry.experience.question}</small>
                  </BuyerToolLink>
                ))}
              </div>
            ) : ctaHref ? (
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

import Image from 'next/image';
import Link from '@/components/web/SiteLink';
import { Container } from '@/components/layout/Container';
import { Icon } from './icons/Icon';
import { footer as investmentFooter } from '@/content/en/investment';
import type { Claim } from '@/lib/content/claims';
import { siteConfig } from '@/lib/seo/config';
import { FOOTER_LINK_TARGETS } from '@/content/en/internal-links';
import logo from '@/public/brand/sarah-katerina-logo-light.png';
import styles from './WebFooter.module.css';

/**
 * Website footer.
 *
 * Phase 2B tagged every single link "pending", which made the footer read as a
 * defect list. The governance has not changed — none of these routes exists
 * yet, and no contact detail, legal entity or social profile is confirmed —
 * but it is now stated once, quietly, instead of eighteen times.
 *
 * Links are rendered as text rather than anchors, so nothing 404s.
 *
 * SHARED ACROSS LANDINGS. The content is a prop so Tax Advisory can supply its
 * own column titles, links and descriptor without a second footer component
 * existing. It defaults to the Investment content, so `/preview/investment`
 * behaves exactly as before.
 */
export interface WebFooterContent {
  readonly description: Claim;
  readonly groups: readonly {
    readonly title: string;
    readonly links: readonly (Claim | { readonly label: Claim; readonly href: string })[];
  }[];
  readonly copyright: Claim;
  readonly routesNote: Claim;
}

export function WebFooter({
  content = investmentFooter,
  showLanguageStatus = true,
  showStatus = false,
}: {
  content?: WebFooterContent;
  showLanguageStatus?: boolean;
  /**
   * The visible "mode · noindex" chip. Off by default since 2026-10-01: the
   * pages shown to the client carry no internal review status. The noindex
   * protection lives in metadata and headers and is unaffected.
   */
  showStatus?: boolean;
} = {}) {
  const footer = content;
  // Shared legal access lives exclusively in the footer. Draft destinations
  // remain in /preview until controller identity and texts are approved.
  const groups = footer.groups.filter((group) => group.title !== 'Legal');

  return (
    <footer className={styles.footer} data-surface="dark">
      <Container>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            {/*
              Approved light footer mark. The original logo remains untouched;
              this transparent variant preserves the teal accent and uses ivory
              for the wordmark so it is legible directly on the shared navy footer.
            */}
            <Image src={logo} alt="Sarah Katerina" className={styles.logo} sizes="200px" />
            <p className={styles.description}>{footer.description.text}</p>
          </div>

          <div className={styles.groups}>
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <ul className={styles.list}>
                  {group.links.map((link) => (
                    <li key={'label' in link ? link.label.text : link.text} className={styles.item}>
                      {'label' in link ? (
                        <Link href={link.href} className={styles.footerLink}>
                          {link.label.text}
                        </Link>
                      ) : FOOTER_LINK_TARGETS[link.text] ? (
                        // Phase 2B: a label that already names an existing
                        // page or section links to it; the others stay text.
                        <Link
                          href={FOOTER_LINK_TARGETS[link.text] ?? ''}
                          className={styles.footerLink}
                        >
                          {link.text}
                        </Link>
                      ) : (
                        link.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="Legal information" className={styles.legalLinks}>
          <Link href="/preview/legal-notice" className={styles.footerLink}>Legal notice</Link>
          <Link href="/preview/privacy" className={styles.footerLink}>Privacy policy</Link>
          <Link href="/preview/cookies" className={styles.footerLink}>Cookie policy</Link>
          <Link href="/preview/cookies#preferences" className={styles.footerLink}>Cookie preferences</Link>
        </nav>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>{footer.copyright.text}</p>
            {/* Stated once for the whole footer. */}
            {footer.routesNote.text ? (
              <p className={styles.routesNote}>{footer.routesNote.text}</p>
            ) : null}
          </div>

          <div className={styles.bottomRight}>
            {showLanguageStatus ? (
              <span className={styles.langGroup}>
                <span className={styles.langActive}>EN</span>
                <span className={styles.langDivider} aria-hidden="true" />
                <span>ES</span>
              </span>
            ) : null}
            {showStatus ? (
              <span className={styles.status}>
                <Icon name="check" size="sm" />
                {siteConfig.mode} · noindex
              </span>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}

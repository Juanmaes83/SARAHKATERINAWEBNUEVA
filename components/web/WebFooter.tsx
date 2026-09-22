import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Icon } from './icons/Icon';
import { footer } from '@/content/en/investment';
import type { Claim } from '@/lib/content/claims';
import { siteConfig } from '@/lib/seo/config';
import logo from '@/public/brand/sarah-katerina-logo.png';
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
 */
interface FooterContent {
  readonly description: Claim;
  readonly groups: readonly {
    readonly title: string;
    readonly links: readonly Claim[];
  }[];
  readonly copyright: Claim;
  readonly routesNote: Claim;
}

export function WebFooter({ content = footer }: { content?: FooterContent }) {
  return (
    <footer className={styles.footer} data-surface="dark">
      <Container>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            {/*
              BRAND-001 on an ivory plate. The mark may not be recoloured, and
              its near-black "Katerina" would disappear on navy, so the plate
              preserves the asset exactly while keeping it legible.
            */}
            <span className={styles.logoPlate}>
              <Image src={logo} alt="Sarah Katerina" className={styles.logo} sizes="200px" />
            </span>
            <p className={styles.description}>{content.description.text}</p>
          </div>

          <div className={styles.groups}>
            {content.groups.map((group) => (
              <div key={group.title}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <ul className={styles.list}>
                  {group.links.map((link) => (
                    <li key={link.text} className={styles.item}>
                      {link.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>{content.copyright.text}</p>
            {/* Stated once for the whole footer. */}
            <p className={styles.routesNote}>{content.routesNote.text}</p>
          </div>

          <div className={styles.bottomRight}>
            <span className={styles.langGroup}>
              <span className={styles.langActive}>EN</span>
              <span className={styles.langDivider} aria-hidden="true" />
              <span>ES</span>
            </span>
            <span className={styles.status}>
              <Icon name="check" size="sm" />
              {siteConfig.mode} · noindex
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

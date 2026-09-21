import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { footer } from '@/content/en/investment';
import { siteConfig } from '@/lib/seo/config';
import logo from '@/public/brand/sarah-katerina-logo.png';
import styles from './WebFooter.module.css';

/**
 * Website footer.
 *
 * Every link here points nowhere yet: the information architecture is not
 * approved and none of these routes exists. They are therefore rendered as
 * text with a pending marker rather than as links that would 404.
 *
 * No contact detail, legal entity, address or social profile is shown. None is
 * confirmed in any governed document.
 */
export function WebFooter() {
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
              <Image src={logo} alt="Sarah Katerina" className={styles.logo} sizes="180px" />
            </span>
            <p className={styles.description}>{footer.description.text}</p>
          </div>

          <div className={styles.groups}>
            {footer.groups.map((group) => (
              <div key={group.title}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <ul className={styles.list}>
                  {group.links.map((link) => (
                    <li key={link.text} className={`${styles.item} ${styles.pending}`}>
                      <span>{link.text}</span>
                      <span className={styles.pendingTag} aria-label="pending approval">
                        pending
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className={styles.groupTitle}>Legal</h2>
              <ul className={styles.list}>
                {footer.legal.map((link) => (
                  <li key={link.text} className={`${styles.item} ${styles.pending}`}>
                    <span>{link.text}</span>
                    <span className={styles.pendingTag} aria-label="pending approval">
                      pending
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{footer.copyright.text}</p>
          <span className={styles.status}>
            {siteConfig.mode} · noindex
          </span>
        </div>
      </Container>
    </footer>
  );
}

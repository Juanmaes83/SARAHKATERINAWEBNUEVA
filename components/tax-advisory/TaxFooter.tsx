import Image from 'next/image';
import { siteConfig } from '@/lib/seo/config';
import { footer, header } from '@/content/en/tax-advisory';
import styles from './TaxFooter.module.css';

/**
 * TAX ADVISORY FOOTER.
 *
 * LOGO ON A DARK GROUND — A REAL ASSET GAP, HANDLED WITHOUT INVENTING ONE.
 *
 * BRAND-SK-001 is a two-colour mark whose "Katerina" is near-black. On the
 * navy footer it would be illegible. Recolouring or inverting it would be
 * creating a brand mark, which AGENTS.md §2 forbids, and no dark-ground
 * variant is registered in AUTHENTIC-REFERENCE-REGISTER.md.
 *
 * The mark is therefore placed on an ivory plate — standard clear-space
 * treatment, the file untouched — and the missing variant is named in the
 * footer's own pending notes. Juanma decides whether the plate is acceptable
 * or a dark-ground variant should be produced.
 *
 * Every link column is a non-navigating slot. The template's public IA is
 * PENDING_APPROVAL and none of its routes exists; shipping a footer of dead
 * links in a review preview would be worse than showing the structure and
 * saying so.
 */
export function TaxFooter() {
  return (
    <footer className={styles.footer} data-surface="dark">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logoPlate}>
              <Image
                src="/brand/sk-wordmark.png"
                alt={header.logoAlt}
                width={3006}
                height={1392}
                className={styles.logo}
              />
            </span>
            <p className={styles.description}>{footer.description.text}</p>
            <p className={styles.assetNote}>
              ASSET PENDING — no dark-ground logo variant exists. The mark is shown on an ivory
              plate rather than recoloured.
            </p>
          </div>

          <div className={styles.groups}>
            {footer.groups.map((group) => (
              <div key={group.id}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <ul className={styles.linkList}>
                  {group.items.map((item) => (
                    <li key={item.label} className={styles.linkItem}>
                      <span className={styles.linkLabel}>{item.label}</span>
                    </li>
                  ))}
                </ul>
                {/* One marker per column rather than one per entry. Repeating
                    it twenty times makes the footer unreadable without making
                    it any more honest. */}
                {group.items.every((item) => item.pending) ? (
                  <p className={styles.linkPending}>All PENDING_APPROVAL</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className={styles.meta}>
            <p className={styles.metaTitle}>Languages</p>
            <p className={styles.metaValue}>EN · ES — routing not implemented in this phase</p>

            <p className={styles.metaTitle}>Social</p>
            <p className={styles.linkPending}>PENDING_APPROVAL</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>{footer.legalNote.text}</p>
          <p className={styles.status}>
            {siteConfig.mode.toUpperCase()} · NOINDEX · NOT FOR DISTRIBUTION
          </p>
        </div>
      </div>
    </footer>
  );
}

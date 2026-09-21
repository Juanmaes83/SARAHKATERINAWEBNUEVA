import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { primaryNav } from '@/content/en/navigation';
import { siteConfig } from '@/lib/seo/config';
import styles from './Footer.module.css';

/**
 * A footer field whose value is NOT confirmed anywhere in the source of truth.
 *
 * Rendering the label plus a PENDING_APPROVAL marker — rather than a plausible
 * value — is deliberate. An invented address, company number, telephone or
 * email in a shared preview is indistinguishable from real data to a reviewer.
 */
function PendingSlot({ label }: { label: string }) {
  return (
    <li>
      <span className={styles.pendingSlot}>
        <span>{label}</span>
        <Badge tone="onDark">PENDING_APPROVAL</Badge>
      </span>
    </li>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer} data-surface="dark">
      <Container>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            {/* Same missing-asset gap as the header: no approved vector logo. */}
            <span className={styles.brandName}>Sarah Katerina</span>
            <span className={styles.brandNote}>Wordmark placeholder</span>
            <p className={styles.description}>
              Internal technical preview of the new website. This build exists to validate the
              design system, layout and accessibility foundations. It is not a public site, it
              carries no approved marketing copy and it makes no commercial claim.
            </p>
          </div>

          <div className={styles.groups}>
            <div>
              <h2 className={styles.groupTitle}>This preview</h2>
              <ul className={styles.linkList}>
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.groupTitle}>Legal</h2>
              <ul className={styles.linkList}>
                {/*
                  No legal page exists and none may be drafted here: legal,
                  tax and financial wording requires human review
                  (README.md "Flujo de trabajo" §5).
                */}
                <PendingSlot label="Legal notice" />
                <PendingSlot label="Privacy policy" />
                <PendingSlot label="Cookie policy" />
              </ul>
            </div>

            <div>
              <h2 className={styles.groupTitle}>Entity</h2>
              <ul className={styles.linkList}>
                {/*
                  NOT CONFIRMED in the source of truth: registered legal name,
                  company number, registered address, telephone, email and
                  social profiles. The master audit additionally requires the
                  public entity relationship to be resolved before publication
                  (P0 "Resolver entidad pública", D-06).
                */}
                <PendingSlot label="Registered name" />
                <PendingSlot label="Company number" />
                <PendingSlot label="Registered address" />
              </ul>
            </div>

            <div>
              <h2 className={styles.groupTitle}>Contact</h2>
              <ul className={styles.linkList}>
                {/* No confirmed email, telephone or messaging channel. */}
                <PendingSlot label="Email" />
                <PendingSlot label="Telephone" />
                <PendingSlot label="Social profiles" />
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            {/*
              No independence claim, no "buyer-only" statement and no VITA
              Host / Group reference. The independence wording is governed
              copy and the entity conflict is an open P0.
            */}
            Copyright placeholder — legal entity PENDING_APPROVAL. Internal preview, not for
            distribution.
          </p>
          <Badge tone="onDark">
            {siteConfig.mode.toUpperCase()} · NOT INDEXABLE
          </Badge>
        </div>
      </Container>
    </footer>
  );
}

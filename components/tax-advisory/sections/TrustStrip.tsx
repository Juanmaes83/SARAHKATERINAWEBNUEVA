import { EditorialIcon, type IconName } from '../EditorialIcon';
import { ScriptNote, StatusMark } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { trustStrip } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

const ICONS: Record<string, IconName> = {
  administration: 'institution',
  buyers: 'people',
  modelo210: 'document',
  team: 'person',
};

/**
 * TRUST STRIP.
 *
 * The template shows four figures. Two of them cannot be published:
 *
 *   "20 años"  confirmed upstream, but withheld until a claims dossier with
 *              source, date, permission and scope exists. Rendered, because a
 *              reviewer needs to see the slot, with a visible review marker
 *              attached — never as bare fact.
 *
 *   "160+"     not confirmed anywhere, and volume was deprioritised upstream
 *              as differential proof. The figure is replaced by an explicit
 *              PENDING_APPROVAL marker in the same position and weight.
 */
export function TrustStrip() {
  return (
    <div className={styles.trust}>
      <ul className={styles.trustList}>
        {trustStrip.items.map((item, index) => (
          <RevealOnScroll as="li" key={item.id} order={index} className={styles.trustItem}>
            <EditorialIcon name={ICONS[item.id] ?? 'shield'} className={styles.trustIcon} />
            <div className={styles.trustText}>
              {item.value.status === 'pending' || item.value.status === 'blocked' ? (
                <StatusMark claim={item.value} variant="value" />
              ) : (
                <span className={styles.trustValue}>{item.value.text}</span>
              )}
              <span className={styles.trustLabel}>{item.label.text}</span>
              {/* What is being held back, and why, in one line. Without this
                  "20 years" would read as published fact and "PENDING" would
                  read as a rendering bug. */}
              {item.value.status === 'proposal' && item.value.note ? (
                <span className={styles.trustWithheld}>Claims dossier required</span>
              ) : null}
              {item.value.status === 'pending' ? (
                <span className={styles.trustWithheld}>Figure not approved</span>
              ) : null}
            </div>
          </RevealOnScroll>
        ))}
      </ul>

      <ScriptNote className={styles.trustScript}>{trustStrip.marginNote.text}</ScriptNote>
    </div>
  );
}

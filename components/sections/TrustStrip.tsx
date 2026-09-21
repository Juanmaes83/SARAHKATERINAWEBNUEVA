import type { Claim } from '@/lib/content/claims';
import { isPublishable } from '@/lib/content/claims';
import styles from './TrustStrip.module.css';

export interface TrustStripProps {
  items: readonly { label: string; value: Claim }[];
}

/**
 * Trust strip.
 *
 * Renders a confirmed value as a value, and anything else as an explicit
 * pending marker. It never renders an unconfirmed figure in the visual style
 * of a confirmed one — that is the whole point of the component.
 *
 * Most entries are pending by design: the master audit requires a claims
 * dossier (source, date, permission, scope) before any credential or metric
 * is published, and that dossier does not exist yet.
 */
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <dl className={styles.strip}>
      {items.map((item) => {
        const publishable = isPublishable(item.value);
        return (
          <div key={item.label} className={styles.item}>
            <dt className={styles.label}>{item.label}</dt>
            <dd className={publishable ? styles.value : styles.pending} style={{ margin: 0 }}>
              {item.value.text}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

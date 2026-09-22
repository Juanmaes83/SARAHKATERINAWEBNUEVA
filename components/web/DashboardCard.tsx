import { SampleBars, SampleLine } from './SampleChart';
import { Icon } from './icons/Icon';
import { heroDashboard } from '@/content/en/investment';
import styles from './DashboardCard.module.css';

/**
 * The navy financial card overlaid on the hero image.
 *
 * The Investment template shows real-looking figures here ("6,8% rentabilidad
 * neta", "€24.500 flujo de caja anual"). Those are NOT approved claims: no
 * return, yield or cash figure has a source, a date, a permission or a scope
 * in any governed document.
 *
 * The Phase 2B/2C brief resolves this explicitly: sample data is permitted on
 * dashboard surfaces provided it is labelled "sample", "illustrative" or
 * "preview". This card shows the shape of the deliverable with clearly marked
 * illustrative values, a visible tag and a footnote.
 *
 * The figures are fixed samples. They are not Sarah's, not a client's, and not
 * a market benchmark.
 */
export function DashboardCard() {
  return (
    <div className={styles.card} data-surface="dark">
      <div className={styles.head}>
        <div>
          <p className={styles.title}>{heroDashboard.title.text}</p>
          <p className={styles.property}>
            <Icon name="property" size="sm" />
            <span>{heroDashboard.property.text}</span>
          </p>
        </div>
        <span className={styles.sampleTag}>Illustrative</span>
      </div>

      <dl className={styles.rows}>
        {heroDashboard.rows.map((row, index) => (
          <div key={row.label.text} className={styles.row}>
            <dt className={styles.rowLabel}>{row.label.text}</dt>
            <dd className={styles.rowValueLine}>
              <span className={styles.rowValue}>{row.value}</span>
              <span className={styles.spark}>
                {index === 0 ? (
                  <SampleBars onDark label={row.label.text} />
                ) : (
                  <SampleLine onDark label={row.label.text} />
                )}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className={styles.horizon}>
        <span className={styles.rowLabel}>{heroDashboard.horizon.label.text}</span>
        <span className={styles.horizonValue}>{heroDashboard.horizon.value}</span>
      </div>

      <p className={styles.foot}>{heroDashboard.foot.text}</p>
    </div>
  );
}

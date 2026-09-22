import { SampleBars, SampleLine } from './SampleChart';
import { Icon } from './icons/Icon';
import { heroSnapshot } from '@/content/en/tax-advisory';
import styles from './DashboardCard.module.css';

/**
 * The navy card over the Tax Advisory hero image.
 *
 * CONVERGENCE: this is `DashboardCard` with tax content. It imports the same
 * stylesheet, so the card's geometry, elevation, type scale and the
 * "Illustrative" tag are identical to the Investment hero card. Only the rows
 * differ.
 *
 * The template shows "€ 24.500 / Total estimado anual / ↓ -18% vs. escenario
 * actual". Those are not approved claims — no tax figure has a source, a date,
 * a permission or a scope in any governed document. The Phase 2B/2C brief
 * resolves this the same way for both landings: sample data is permitted on
 * dashboard surfaces provided it is labelled. The figures below are fixed
 * samples with a visible tag and a footnote. They are not Sarah's, not a
 * client's, and not tax advice.
 */
export function TaxSnapshotCard() {
  return (
    <div className={styles.card} data-surface="dark">
      <div className={styles.head}>
        <div>
          <p className={styles.title}>{heroSnapshot.title.text}</p>
          <p className={styles.property}>
            <Icon name="tax" size="sm" />
            <span>{heroSnapshot.property.text}</span>
          </p>
        </div>
        <span className={styles.sampleTag}>Illustrative</span>
      </div>

      <dl className={styles.rows}>
        {heroSnapshot.rows.map((row, index) => (
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
        <span className={styles.rowLabel}>{heroSnapshot.horizon.label.text}</span>
        <span className={styles.horizonValue}>{heroSnapshot.horizon.value}</span>
      </div>

      <p className={styles.foot}>{heroSnapshot.foot.text}</p>
    </div>
  );
}

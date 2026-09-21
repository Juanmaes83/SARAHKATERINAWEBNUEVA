import { SampleBars, SampleLine } from './SampleChart';
import styles from './DashboardCard.module.css';

/**
 * The navy financial card overlaid on the hero image.
 *
 * The Investment template shows real-looking figures here ("6,8% rentabilidad
 * neta", "€24.500 flujo de caja anual"). Those are NOT approved claims: no
 * return, yield or cash figure has a source, a date, a permission or a scope
 * in any governed document, and publishing one would be a financial claim.
 *
 * The Phase 2B brief resolves this explicitly: sample data is permitted on
 * dashboard surfaces provided it is labelled "sample", "illustrative" or
 * "preview". This card therefore shows the *shape* of the deliverable with
 * clearly marked illustrative values, a visible tag, and a footnote.
 *
 * The figures below are fixed sample values. They are not Sarah's, not a
 * client's, and not a market benchmark.
 */
export function DashboardCard() {
  return (
    <div className={styles.card} data-surface="dark">
      <div className={styles.head}>
        <p className={styles.rowLabel}>Investment snapshot</p>
        <span className={styles.sampleTag}>Illustrative</span>
      </div>

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt className={styles.rowLabel}>Net yield</dt>
          <dd className={styles.rowValueLine}>
            <span className={styles.rowValue}>6.0%</span>
            <span className={styles.spark}>
              <SampleBars onDark label="Net yield trend" />
            </span>
          </dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.rowLabel}>Annual cash flow</dt>
          <dd className={styles.rowValueLine}>
            <span className={styles.rowValue}>€24,000</span>
            <span className={styles.spark}>
              <SampleLine onDark label="Cash flow trend" />
            </span>
          </dd>
        </div>
      </dl>

      <p className={styles.foot}>
        Sample figures shown to illustrate the report format. Not a client result, a projection or
        a market benchmark.
      </p>
    </div>
  );
}

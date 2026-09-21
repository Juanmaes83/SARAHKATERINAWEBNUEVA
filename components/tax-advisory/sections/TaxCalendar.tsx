import { EditorialIcon } from '../EditorialIcon';
import { EditorialMedia, SectionHead, StatusMark } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { TaxCta } from '../TaxCta';
import { calendar } from '@/content/en/tax-advisory';
import styles from './TaxCalendar.module.css';

/**
 * ANNUAL TAX CALENDAR.
 *
 * The bars reproduce the REFERENCE COMPOSITION'S LAYOUT. They are not a
 * statement about when any Spanish filing period opens or closes: every real
 * deadline is a tax claim requiring competent review (AGENTS.md §11), and none
 * has been reviewed. The surface is labelled ILLUSTRATIVE, the months carry no
 * boundary marks, and each row's screen-reader text repeats the warning rather
 * than reading the span out as if it were a fact.
 *
 * RESPONSIVE
 * Below 768px the label moves above its track, so a twelve-cell year still
 * fits a 320px viewport without the page scrolling sideways.
 */
export function TaxCalendar() {
  return (
    <div className={styles.wrap}>
      <SectionHead
        eyebrow={calendar.eyebrow.text}
        heading={calendar.heading.text}
        align="center"
        review="tax"
        id="calendar"
        className={styles.head}
      />

      <div className={styles.layout}>
        <RevealOnScroll className={styles.chart}>
          <div className={styles.months} aria-hidden="true">
            <span className={styles.monthsSpacer} />
            {calendar.months.map((month) => (
              <span key={month} className={styles.month}>
                {month.slice(0, 1)}
                <span className={styles.monthFull}>{month.slice(1)}</span>
              </span>
            ))}
          </div>

          <ul className={styles.rows}>
            {calendar.rows.map((row) => (
              <li key={row.id} className={styles.row}>
                <span className={styles.rowLabel}>{row.label.text}</span>
                <span className={styles.track}>
                  <span
                    className={`${styles.bar} ${styles[`tone_${row.tone}`]}`}
                    style={{ gridColumn: `${row.from} / ${row.to + 1}` }}
                    aria-hidden="true"
                  />
                </span>
                <span className="sk-visually-hidden">
                  Illustrative position only. No filing period is stated.
                </span>
              </li>
            ))}
          </ul>

          <p className={styles.illustrative}>
            <StatusMark claim={calendar.illustrativeMarker} />
            <span className={styles.illustrativeBody}>{calendar.illustrativeNote.text}</span>
          </p>
        </RevealOnScroll>

        <RevealOnScroll className={styles.aside} order={1}>
          <EditorialIcon name="calendar" className={styles.asideIcon} />
          <p className={styles.asideEyebrow}>{calendar.aside.eyebrow.text}</p>
          <p className={styles.asideBody}>{calendar.aside.body.text}</p>
          <TaxCta variant="primary" section="calendar" target="create_tax_map">
            {calendar.aside.cta.text}
          </TaxCta>
          <EditorialMedia
            label="Costa Blanca · aside"
            pending={calendar.asideMediaIntent}
            ratio="square"
            className={styles.asideMedia}
          />
        </RevealOnScroll>
      </div>
    </div>
  );
}

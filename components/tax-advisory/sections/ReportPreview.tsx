import { EditorialIcon, type IconName } from '../EditorialIcon';
import { SectionHead, StatusMark } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { TaxCta } from '../TaxCta';
import { reportPreview } from '@/content/en/tax-advisory';
import styles from './ReportPreview.module.css';

const CONTENT_ICONS: readonly IconName[] = ['document', 'play', 'chart', 'map'];

/**
 * REPORT PREVIEW — navy dashboard band.
 *
 * EVERY FIGURE IN THE REFERENCE IS SUPPRESSED.
 *
 * The template shows a headline total, a percentage delta against a "current
 * scenario", a twelve-bar chart and a five-line breakdown with amounts.
 * Publishing any of them would fabricate a financial result, which AGENTS.md
 * §2 forbids outright and which no amount of small print would fix.
 *
 * What is kept is the report's information architecture — what a reader would
 * actually receive — with each value replaced by its governance marker in the
 * same position and weight, so the composition can still be judged.
 *
 * The chart renders a fixed, deliberately abstract silhouette with no axis,
 * no scale and no labelled bar. It is decoration standing in for a chart, and
 * it is marked as such.
 */
export function ReportPreview() {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <SectionHead
          eyebrow={reportPreview.eyebrow.text}
          heading={reportPreview.heading.text}
          standfirst={reportPreview.intro.text}
          onDark
          review="financial"
        />
        <TaxCta variant="primary" onDark section="report_preview" target="request_tax_review">
          {reportPreview.cta.text}
        </TaxCta>
      </div>

      <div className={styles.layout}>
        <ul className={styles.panels}>
          {reportPreview.panels.map((panel, index) => (
            <RevealOnScroll as="li" key={panel.id} order={index} className={styles.panel}>
              <h3 className={styles.panelTitle}>{panel.title.text}</h3>

              {panel.id === 'calendar' ? (
                <span className={styles.sparkline} aria-hidden="true">
                  {[28, 34, 30, 46, 40, 55, 48, 62, 58, 72, 66, 84].map((height, barIndex) => (
                    <span
                      key={barIndex}
                      className={styles.sparkbar}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </span>
              ) : (
                <span className={styles.panelValue}>
                  <StatusMark
                    claim={{ text: panel.valueMarker, status: 'pending' }}
                    onDark
                    variant="value"
                  />
                  {panel.deltaMarker ? (
                    <StatusMark claim={{ text: panel.deltaMarker, status: 'pending' }} onDark />
                  ) : null}
                </span>
              )}

              <p className={styles.panelCaption}>{panel.caption.text}</p>
            </RevealOnScroll>
          ))}
        </ul>

        <ul className={styles.contents}>
          {reportPreview.contents.map((item, index) => (
            <li key={item.text} className={styles.contentItem}>
              <EditorialIcon
                name={CONTENT_ICONS[index] ?? 'document'}
                size="sm"
                className={styles.contentIcon}
              />
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.governance}>{reportPreview.governanceNote.text}</p>
    </div>
  );
}

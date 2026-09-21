import { EditorialIcon } from '../EditorialIcon';
import { Numeral, SectionHead } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { process } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

/**
 * PROCESS — "Every tax, in the right order."
 *
 * The reference sets six cards in a single row, which is why its type is so
 * small. Three columns at desktop and two at tablet give the same sequence the
 * air the phase contract asks for, and the numerals keep the order explicit
 * once the row wraps.
 *
 * No turnaround time is shown. The template states delivery days per stage;
 * no such figure is confirmed.
 */
export function Process() {
  return (
    <div className={styles.process}>
      <SectionHead
        heading={process.heading.text}
        standfirst={process.intro.text}
        review="tax"
        id="process"
      />

      <ol className={styles.processList}>
        {process.stages.map((stage, index) => (
          <RevealOnScroll as="li" key={stage.id} order={index} className={styles.processCard}>
            <div className={styles.processTop}>
              <Numeral>{stage.number}</Numeral>
              <h3 className={styles.processTitle}>{stage.title.text}</h3>
            </div>

            <EditorialIcon name={stage.symbol} className={styles.processIcon} />

            <p className={styles.processBody}>{stage.body.text}</p>

            <p className={styles.processDeliverable}>
              <EditorialIcon name="document" size="sm" className={styles.processDeliverableIcon} />
              {stage.deliverable.text}
            </p>
          </RevealOnScroll>
        ))}
      </ol>

      <p className={styles.processNote}>{process.timingNote.text}</p>
    </div>
  );
}

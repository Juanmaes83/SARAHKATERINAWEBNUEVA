import { EditorialIcon } from '../EditorialIcon';
import { ScriptNote, SectionHead } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { continuity } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

/**
 * CONTINUITY — the ownership journey.
 *
 * The reference's fourth step is a property-management brand. AGENTS.md §9
 * holds that service publicly and forbids mentioning it while D-06 is
 * unexecuted, and a governance test enforces the prohibition. The step is
 * replaced by an annual tax review — in scope for this landing — and the
 * substitution is stated on the page rather than left for a reviewer to
 * notice as a silent omission.
 */
export function Continuity() {
  return (
    <div className={styles.continuity}>
      <SectionHead
        eyebrow={continuity.eyebrow.text}
        heading={continuity.heading.text}
        standfirst={continuity.intro.text}
        align="center"
      />

      <ol className={styles.journey}>
        {continuity.steps.map((step, index) => (
          <RevealOnScroll as="li" key={step.id} order={index} className={styles.journeyStep}>
            <span className={styles.journeyIcon}>
              <EditorialIcon name={step.symbol} />
            </span>
            <span className={styles.journeyTitle}>{step.title.text}</span>
            <span className={styles.journeyBody}>{step.body.text}</span>
            {index < continuity.steps.length - 1 ? (
              <EditorialIcon name="arrow" size="sm" className={styles.journeyArrow} />
            ) : null}
          </RevealOnScroll>
        ))}
      </ol>

      <div className={styles.continuityFoot}>
        <p className={styles.continuitySubstitution}>{continuity.substitutionNote.text}</p>
        <ScriptNote className={styles.continuityScript}>{continuity.marginNote.text}</ScriptNote>
      </div>
    </div>
  );
}

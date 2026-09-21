import { SectionHead, StatusMark } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { cases } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

/**
 * CASES — structure only.
 *
 * The reference fills this band with three cases: a location, a year, a
 * nationality, an exposure figure and a quoted testimonial in each. All of it
 * is invented. AGENTS.md §2 forbids fabricating a testimonial or a case study
 * and §11 requires legal review for any of it.
 *
 * The three slots keep the composition's shape and say plainly what a
 * published case would need. Nothing is filled with a plausible-looking
 * substitute, because a plausible substitute in a shared preview is
 * indistinguishable from real evidence.
 */
export function Cases() {
  return (
    <div className={styles.cases}>
      <SectionHead heading={cases.heading.text} standfirst={cases.intro.text} />

      <ul className={styles.casesList}>
        {cases.placeholders.map((placeholder, index) => (
          <RevealOnScroll as="li" key={placeholder.id} order={index} className={styles.caseCard}>
            <p className={styles.caseRole}>{placeholder.role.text}</p>
            <StatusMark claim={placeholder.slot} variant="value" />
            <p className={styles.caseNote}>{placeholder.slot.note}</p>

            <dl className={styles.caseFields}>
              {['Situation', 'Decision', 'Outcome', 'Stated limits'].map((field) => (
                <div key={field} className={styles.caseField}>
                  <dt className={styles.caseFieldLabel}>{field}</dt>
                  <dd className={styles.caseFieldValue}>—</dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        ))}
      </ul>

      <p className={styles.casesRequirement}>{cases.requirement.text}</p>
    </div>
  );
}

import { GoldRule, SectionHead } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { problem } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

/**
 * PROBLEM / CONTEXT.
 *
 * The reference composition folds the problem into the audience block. The
 * phase brief asks for the two as separate sections with more air between
 * them, so the tension is given its own editorial space above the audience
 * list rather than being compressed into a bullet.
 */
export function Problem() {
  return (
    <div className={styles.problem}>
      <SectionHead
        eyebrow={problem.eyebrow.text}
        heading={problem.heading.text}
        standfirst={problem.intro.text}
        review="tax"
        className={styles.problemHead}
      />

      <ol className={styles.problemList}>
        {problem.tensions.map((tension, index) => {
          const [lead, ...rest] = tension.text.split('. ');
          return (
            <RevealOnScroll as="li" key={tension.text} order={index} className={styles.problemItem}>
              <GoldRule className={styles.problemRule} />
              <p className={styles.problemLead}>{lead}.</p>
              <p className={styles.problemBody}>{rest.join('. ')}</p>
            </RevealOnScroll>
          );
        })}
      </ol>

      <p className={styles.problemLimit}>{problem.limit.text}</p>
    </div>
  );
}

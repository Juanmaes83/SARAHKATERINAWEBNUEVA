import { EditorialIcon, type IconName } from '../EditorialIcon';
import { EditorialMedia, ScriptNote, SectionHead } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { concerns } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

const ICONS: readonly IconName[] = [
  'clock',
  'calendar',
  'document',
  'coins',
  'home',
  'chart',
  'cycle',
];

/**
 * CONCERNS — "What you stop worrying about."
 *
 * The reference's three-column composition: headline left, objection list
 * centre, photograph right with script marginalia over it. The photograph slot
 * renders the neutral editorial panel; no authentic lifestyle asset exists.
 */
export function Concerns() {
  return (
    <div className={styles.concerns}>
      <SectionHead
        eyebrow={concerns.eyebrow.text}
        heading={concerns.heading.text}
        standfirst={concerns.body.text}
        review="tax"
        className={styles.concernsHead}
      />

      <ul className={styles.concernsList}>
        {concerns.items.map((item, index) => (
          <RevealOnScroll as="li" key={item.text} order={index} className={styles.concernsItem}>
            <EditorialIcon
              name={ICONS[index] ?? 'shield'}
              size="sm"
              className={styles.concernsIcon}
            />
            <span>{item.text}</span>
          </RevealOnScroll>
        ))}
      </ul>

      <div className={styles.concernsMedia}>
        <EditorialMedia
          label="Costa Blanca · lifestyle"
          pending={concerns.mediaIntent}
          ratio="landscape"
        />
        <ScriptNote className={styles.concernsScript}>{concerns.marginNote.text}</ScriptNote>
      </div>
    </div>
  );
}

import { EditorialIcon } from '../EditorialIcon';
import { EditorialMedia, ScriptNote, SectionHead } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { audience } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

/**
 * AUDIENCE — "Know what Spain will actually cost you."
 *
 * Reference layout: headline column on the left, an arrow-marked list in the
 * centre, a wide Costa Blanca photograph on the right with script marginalia
 * over it. The photograph does not exist as an authentic asset, so the right
 * column renders the neutral editorial panel and names the missing file.
 */
export function Audience() {
  return (
    <div className={styles.audience}>
      <SectionHead
        eyebrow={audience.eyebrow.text}
        heading={audience.heading.text}
        standfirst={audience.body.text}
        review="tax"
        id="who"
        className={styles.audienceHead}
      />

      <ul className={styles.audienceList}>
        {audience.profiles.map((profile, index) => (
          <RevealOnScroll as="li" key={profile.text} order={index} className={styles.audienceItem}>
            <EditorialIcon name="arrow" size="sm" className={styles.audienceArrow} />
            <span>{profile.text}</span>
          </RevealOnScroll>
        ))}
      </ul>

      <div className={styles.audienceMedia}>
        <EditorialMedia
          label="Costa Blanca · location"
          pending={audience.mediaIntent}
          ratio="landscape"
        />
        <ScriptNote className={styles.audienceScript}>{audience.marginNote.text}</ScriptNote>
      </div>
    </div>
  );
}

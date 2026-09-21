import Image from 'next/image';
import { EditorialIcon, type IconName } from '../EditorialIcon';
import { SectionHead, StatusMark } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { TaxCta } from '../TaxCta';
import { authority } from '@/content/en/tax-advisory';
import styles from './Authority.module.css';

const ICONS: readonly IconName[] = ['shield', 'institution', 'globe', 'people'];

/**
 * AUTHORITY — navy band.
 *
 * The portrait is AUTH-SK-002, an authentic owner-supplied frame, used
 * directly. It is 400×400, which is why it is rendered small and squared
 * rather than as a large bleed: upscaling it would visibly degrade, and
 * generating a higher-resolution version would fabricate a photograph.
 *
 * TWO DIVERGENCES FROM THE REFERENCE, BOTH DELIBERATE
 *
 *  1. The template's body copy names a duration, a specific administration
 *     and a region. The duration is confirmed upstream but withheld pending
 *     its claims dossier; the named body and region are not repeated, because
 *     content/authority-content-and-video-opportunity-map.md warns against
 *     publishing specifics of that period. The credential appears as a marked
 *     slot so the reviewer can see exactly what is being held back.
 *
 *  2. The template signs the pull quote with a handwritten signature. No
 *     signature asset is approved and the wording is not confirmed as Sarah's,
 *     so the attribution is a marked slot rather than a signature.
 */
export function Authority() {
  return (
    <div className={styles.wrap}>
      <RevealOnScroll className={styles.portraitColumn}>
        <Image
          src="/sarah/AUTH-SK-002-portrait-square.jpg"
          alt={authority.portraitAlt}
          width={400}
          height={400}
          sizes="(max-width: 767px) 60vw, 280px"
          className={styles.portrait}
        />
      </RevealOnScroll>

      <div className={styles.copy}>
        <SectionHead
          eyebrow={authority.eyebrow.text}
          heading={authority.heading.text}
          onDark
          review="tax"
          id="sarah"
        />

        <p className={styles.body}>{authority.body.text}</p>

        <StatusMark claim={authority.credentialSlot} onDark />

        <TaxCta variant="secondary" onDark section="authority" target="about_sarah">
          {authority.cta.text}
        </TaxCta>
      </div>

      <ul className={styles.points}>
        {authority.points.map((point, index) => (
          <RevealOnScroll as="li" key={point.text} order={index} className={styles.point}>
            <EditorialIcon name={ICONS[index] ?? 'shield'} className={styles.pointIcon} />
            {point.text}
          </RevealOnScroll>
        ))}
      </ul>

      <figure className={styles.quoteBlock}>
        <blockquote className={styles.quote}>
          <p>“{authority.quote.text}”</p>
        </blockquote>
        <figcaption className={styles.quoteAttribution}>
          <StatusMark claim={authority.quoteAttribution} onDark />
        </figcaption>
      </figure>
    </div>
  );
}

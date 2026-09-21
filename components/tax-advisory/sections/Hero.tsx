import Image from 'next/image';
import { EditorialIcon } from '../EditorialIcon';
import { ScriptNote, StatusMark } from '../Primitives';
import { TaxCta } from '../TaxCta';
import { authority, hero } from '@/content/en/tax-advisory';
import styles from './Sections.module.css';

/**
 * HERO — split composition, as in the reference.
 *
 * MEDIA DECISION
 * The template's hero is a synthetic scene: a generated Sarah at a desk with
 * tax documents, against a generated Costa Blanca. AGENTS.md §2 forbids
 * fabricating a photograph of Sarah, and the visual asset manifest forbids
 * generating a scene that would read as documentary.
 *
 * The slot is filled with AUTH-SK-001 instead — an authentic, owner-supplied
 * studio portrait, used directly rather than as a generation anchor, which
 * AUTHENTIC-REFERENCE-REGISTER.md explicitly permits. It is monochrome, which
 * suits the editorial register and is stated in the alt text.
 *
 * The document spines and the Costa Blanca backdrop are NOT recreated as
 * imagery. The document labels survive as typographic chips, which carry the
 * same information without fabricating a photograph of paperwork.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="tax-advisory-title">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>{hero.eyebrow.text}</p>

          <h1 id="tax-advisory-title" className={styles.heroHeading}>
            {hero.headingLead.text}
            <br />
            <em className={styles.heroHeadingAccent}>{hero.headingAccent.text}</em>
          </h1>

          <p className={styles.heroBody}>{hero.body.text}</p>

          <div className={styles.heroActions}>
            <TaxCta variant="primary" section="hero" target="map_tax_exposure">
              {hero.primaryCta.text}
            </TaxCta>
            <TaxCta
              variant="secondary"
              section="hero"
              target="see_how_it_works"
              href="#process"
              noArrow
            >
              {hero.secondaryCta.text}
            </TaxCta>
          </div>

          <ul className={styles.heroMarkers}>
            {hero.markers.map((marker, index) => (
              <li key={marker.text} className={styles.heroMarker}>
                <EditorialIcon
                  name={(['person', 'globe', 'shield', 'clock'] as const)[index] ?? 'shield'}
                  size="sm"
                  className={styles.heroMarkerIcon}
                />
                {marker.text}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.heroMedia}>
          <figure className={styles.heroFigure}>
            {/* The overlays are anchored to the image frame, so the caption
                below can never be sat on by a chip. */}
            <span className={styles.heroFrame}>
              <Image
                src="/sarah/AUTH-SK-001-editorial-portrait.jpg"
                alt={authority.portraitAlt}
                width={768}
                height={1344}
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 60vw, 560px"
                className={styles.heroImage}
              />

              {/* Document labels, kept as typography rather than as a
                  fabricated photograph of paperwork. */}
              <ul className={styles.heroChips}>
                {hero.mediaChips.map((chip) => (
                  <li key={chip.text} className={styles.heroChip}>
                    {chip.text}
                  </li>
                ))}
              </ul>

              <span className={styles.heroVideoSlot}>
                <EditorialIcon name="play" size="sm" className={styles.heroVideoIcon} />
                <StatusMark claim={hero.videoIntent} onDark />
              </span>
            </span>

            {/* The full explanation sits under the image, not over it: a
                warning is useless if it is unreadable against a photograph. */}
            <figcaption className={styles.heroVideoNote}>{hero.videoNote.text}</figcaption>
          </figure>

          <ScriptNote className={styles.heroScript}>{hero.marginNote.text}</ScriptNote>
        </div>
      </div>

      {/* Observed by the header to switch to its condensed state. */}
      <span id="tax-advisory-scroll-sentinel" className={styles.sentinel} aria-hidden="true" />
    </section>
  );
}

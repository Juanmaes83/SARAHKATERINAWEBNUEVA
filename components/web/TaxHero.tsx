import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { WebButton } from './WebButton';
import { TaxSnapshotCard } from './TaxSnapshotCard';
import { Icon, type IconName } from './icons/Icon';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { hero } from '@/content/en/tax-advisory';
import { isPublishable } from '@/lib/content/claims';
import shared from './WebHero.module.css';
import styles from './TaxBands.module.css';

/**
 * Tax Advisory hero.
 *
 * The hero keeps the shared Investment composition: editorial copy on the left
 * and one visual column on the right. Tax-specific metadata sits in normal
 * document flow above the image, while the illustrative snapshot is rendered
 * below it. Nothing is positioned over Sarah's face and no HTML labels repeat
 * text already embedded in the approved image.
 *
 * MEDIA: the owner-selected Services_14 editorial image is used in the
 * protected Preview. The asset remains subject to the later production
 * derivative and retouching pass.
 */
export function TaxHero() {
  const heroMedia = APPROVED_MEDIA.taxHero;

  return (
    <section className={shared.hero} id="top">
      <Container className={shared.grid}>
        <RevealOnScroll className={shared.copy}>
          <p className={shared.eyebrow}>{hero.eyebrow.text}</p>

          {/* The single h1 of the page. */}
          <h1 className={shared.heading}>{hero.heading.text}</h1>

          <p className={shared.lead}>{hero.lead.text}</p>

          <div className={shared.ctas}>
            <WebButton variant="primary" arrow>
              {hero.primaryCta.text}
            </WebButton>
            <WebButton variant="secondary">{hero.secondaryCta.text}</WebButton>
          </div>

          <dl className={shared.signals}>
            {hero.signals.map((signal) => (
              <div key={signal.value.text} className={shared.signal}>
                <Icon name={signal.icon as IconName} className={shared.signalIcon} />
                <div>
                  <dt className={shared.signalValue}>
                    {signal.value.text}
                    {!isPublishable(signal.value) ? (
                      <span
                        className={shared.pendingDot}
                        role="img"
                        aria-label="figure pending approval"
                      />
                    ) : null}
                  </dt>
                  <dd className={shared.signalNote}>{signal.note.text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className={shared.script}>{hero.script.text}</p>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={shared.visual}>
          <figure className={shared.figure}>
            <div className={styles.heroMedia}>
              <div className={styles.mediaMeta} aria-label="Hero media details">
                <span className={styles.mediaMetaItem}>
                  <Icon name="pin" size="sm" />
                  {hero.locationLabel.text}
                </span>
                <span className={`${styles.mediaMetaItem} ${styles.mediaMetaPending}`}>
                  <Icon name="play" size="sm" />
                  {hero.videoPending.text}
                </span>
              </div>

              <div className={`${shared.frame} ${styles.singleHeroFrame}`}>
                {/*
                  The approved image already contains its own tax-agency copy
                  and visual labels. Keep one information layer: do not overlay
                  duplicate document chips on top of the artwork.
                */}
                <Image
                  src={heroMedia.src}
                  alt={heroMedia.alt}
                  className={shared.image}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 46vw"
                  style={{ objectPosition: heroMedia.focal }}
                />
                <span className={shared.scrim} aria-hidden="true" />
              </div>
            </div>

            <div className={`${shared.dashboard} ${styles.detachedDashboard}`}>
              <TaxSnapshotCard />
            </div>
          </figure>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { WebButton } from './WebButton';
import { DashboardCard } from './DashboardCard';
import { Icon, type IconName } from './icons/Icon';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { hero } from '@/content/en/investment';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { isPublishable } from '@/lib/content/claims';
import entrance from '@/components/motion/Entrance.module.css';
import { cn } from '@/lib/utils/cn';
import styles from './WebHero.module.css';

/**
 * Editorial hero — two zones, following the Investment template.
 *
 * VISUAL COMPOSITION
 *
 * The template's right zone is a villa-and-sea photograph with a financial
 * card over it. No property or Costa Blanca photograph exists in the mother
 * repository, and three of the four obvious substitutes are forbidden: stock,
 * a generated image passed off as real, and the template screenshot itself.
 *
 * So the zone carries all four signals the brief asks for, honestly:
 *   1. Sarah — the approved hero photograph;
 *   2. place — the location pin and the copy, not a second image;
 *   3. the dashboard — illustrative sample figures, labelled;
 *   4. decision signals — the credential row under the CTAs.
 *
 * The small coastline thumbnail that used to sit over the photograph was
 * removed on 2026-09-22 after visual review: it fought the portrait for
 * attention and its baked-in wordmark was clipped. The frame now reads as one
 * composition, so nothing was left behind in its place.
 *
 * PHASE 2E MOTION — the hero is the page's one composed arrival (CSS only,
 * `components/motion/Entrance.module.css`): the copy rises line by line, the
 * portrait's frame opens, and the snapshot card lands last over the photograph.
 * On scroll-out the card drifts slightly ahead of the photograph for depth.
 */
export function WebHero() {
  const heroMedia = APPROVED_MEDIA.investmentHero;

  return (
    <section className={styles.hero} id="top">
      <Container className={styles.grid}>
        <RevealOnScroll className={cn(styles.copy, entrance.copy)}>
          <p className={styles.eyebrow}>{hero.eyebrow.text}</p>

          {/* The single h1 of the page. */}
          <h1 className={styles.heading}>{hero.heading.text}</h1>

          <p className={styles.lead}>{hero.lead.text}</p>

          <div className={styles.ctas}>
            <WebButton variant="primary" arrow>
              {hero.primaryCta.text}
            </WebButton>
            <WebButton variant="secondary">{hero.secondaryCta.text}</WebButton>
          </div>

          <dl className={styles.signals}>
            {hero.signals.map((signal) => (
              <div key={signal.value.text} className={styles.signal}>
                <Icon name={signal.icon as IconName} className={styles.signalIcon} />
                <div>
                  <dt className={styles.signalValue}>
                    {signal.value.text}
                    {!isPublishable(signal.value) ? (
                      <span
                        className={styles.pendingDot}
                        role="img"
                        aria-label="figure pending approval"
                      />
                    ) : null}
                  </dt>
                  <dd className={styles.signalNote}>{signal.note.text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className={styles.script}>{hero.script.text}</p>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={styles.visual}>
          <figure className={styles.figure}>
            <div className={cn(styles.frame, entrance.media)}>
              {/*
                PHASE 2E — approved hero image (inventory §11, item 1).
                `sk-real-1` moves out of the hero; the authentic portrait
                remains the authority image further down the page, which is
                what the approval requires.
              */}
              <Image
                src={heroMedia.src}
                alt={heroMedia.alt}
                className={styles.image}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 46vw"
                style={{ objectPosition: heroMedia.focal }}
              />
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.locationPin}>
                <Icon name="pin" size="sm" />
                {hero.locationLabel.text}
              </span>
            </div>

            <div className={cn(styles.dashboard, entrance.float)}>
              <div className={entrance.depthFront}>
                <DashboardCard />
              </div>
            </div>
          </figure>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

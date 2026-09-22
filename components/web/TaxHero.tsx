import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { WebButton } from './WebButton';
import { TaxSnapshotCard } from './TaxSnapshotCard';
import { Icon, type IconName } from './icons/Icon';
import { TerritoryVisual } from './TerritoryVisual';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { hero } from '@/content/en/tax-advisory';
import { isPublishable } from '@/lib/content/claims';
import shared from './WebHero.module.css';
import styles from './TaxBands.module.css';

/**
 * Tax Advisory hero.
 *
 * CONVERGENCE: this deliberately imports `WebHero.module.css`, the Investment
 * hero's stylesheet, rather than defining its own. The two templates share the
 * same hero composition — copy left, portrait right, a navy data card over the
 * image — so reusing the stylesheet is what guarantees the brief's
 * requirement that the hero keep the same ratio, scale, crop, position,
 * balance with the copy, visual weight and mobile behaviour as the canonical
 * base. Nothing about the hero geometry is re-specified here.
 *
 * Only two things are additive and Tax-Advisory-specific, both from its own
 * template: the stack of labelled document spines, and the pending intro-video
 * marker. Those live in `TaxBands.module.css`.
 *
 * MEDIA: AUTH-SK-001, the authentic portrait, used directly. The template's
 * hero is a generated desk-and-coastline scene; AGENTS.md §2 forbids
 * fabricating a photograph of Sarah, so the place signal is carried by a
 * declared schematic instead.
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
            <div className={shared.frame}>
              {/*
                PHASE 2E — approved Tax Advisory hero (inventory §11, item 1).
                The authentic portrait remains the authority image further down
                the page, as the approval requires.
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
              <span className={shared.locationPin}>
                <Icon name="pin" size="sm" />
                {hero.locationLabel.text}
              </span>

              {/*
                The template layers labelled document spines across the hero.
                Kept as typography: a photograph of paperwork would be
                fabricated, the labels carry the same information.
              */}
              <ul className={styles.documents}>
                {hero.documents.map((document) => (
                  <li key={document.text} className={styles.document}>
                    {document.text}
                  </li>
                ))}
              </ul>

              {/*
                The template offers a one-minute intro video. No approved video
                asset exists and one may not be substituted, so the affordance
                is present and marked rather than faked.
              */}
              <span className={styles.videoSlot}>
                <Icon name="play" size="sm" />
                {hero.videoPending.text}
              </span>
            </div>

            <div className={shared.territory}>
              <TerritoryVisual
                variant="coast"
                tone="navy"
                label={hero.locationLabel.text}
                media={APPROVED_MEDIA.territoryCoast}
                sizes="(max-width: 1023px) 60vw, 22vw"
              />
            </div>

            <div className={shared.dashboard}>
              <TaxSnapshotCard />
            </div>
          </figure>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

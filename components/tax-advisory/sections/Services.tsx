import { EditorialIcon } from '../EditorialIcon';
import { EditorialMedia, SectionHead } from '../Primitives';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { TaxCta } from '../TaxCta';
import { services, type ServiceCard } from '@/content/en/tax-advisory';
import styles from './Services.module.css';

/**
 * Governance state shown on each card.
 *
 * service-taxonomy.md classifies these offers differently, and the difference
 * matters to a reviewer: one is a recorded service line, two need their live
 * packaging verified, and three are proposals. Flattening them into six
 * identical cards would hide exactly the information the review needs.
 */
const STATE_LABEL: Record<ServiceCard['state'], string> = {
  'confirmed-service': 'Recorded service line',
  'pending-packaging': 'Packaging PENDING_APPROVAL',
  'proposed-offer': 'Proposed offer — not confirmed live',
};

/**
 * SERVICES.
 *
 * The reference shows three cards, each with a photograph and a price. The
 * phase brief asks for six. NO PRICE IS SHOWN on any of them: a price exists
 * upstream for the tax diagnostic but publication is not approved, and the
 * taxonomy requires live re-verification before any figure is used.
 *
 * The card photographs do not exist as authentic assets, so the two cards that
 * carry the reference's visual weight use the neutral editorial panel and the
 * rest lead with their editorial symbol.
 */
export function Services() {
  return (
    <div className={styles.wrap}>
      <SectionHead
        eyebrow={services.eyebrow.text}
        heading={services.heading.text}
        align="center"
        id="services"
      />

      <ul className={styles.grid}>
        {services.cards.map((card, index) => (
          <RevealOnScroll as="li" key={card.id} order={index} className={styles.card}>
            {index < 2 ? (
              <EditorialMedia
                label={card.title.text}
                pending={{
                  text: 'ASSET PENDING — service imagery',
                  status: 'pending',
                }}
                ratio="wide"
                className={styles.cardMedia}
              />
            ) : (
              <EditorialIcon name={card.symbol} className={styles.cardIcon} />
            )}

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{card.title.text}</h3>

              <ul className={styles.cardPoints}>
                {card.points.map((point) => (
                  <li key={point.text} className={styles.cardPoint}>
                    <span className={styles.cardBullet} aria-hidden="true" />
                    {point.text}
                  </li>
                ))}
              </ul>

              <p className={styles.cardDeliverable}>{card.deliverable.text}</p>

              <p className={styles.cardState} data-state={card.state}>
                {STATE_LABEL[card.state]}
              </p>

              <TaxCta
                variant="quiet"
                section="services"
                target={card.id}
                className={styles.cardCta}
              >
                {card.cta.text}
              </TaxCta>
            </div>
          </RevealOnScroll>
        ))}
      </ul>

      <p className={styles.priceNote}>{services.priceNote.text}</p>
    </div>
  );
}

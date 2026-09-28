import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import entrance from '@/components/motion/Entrance.module.css';
import { BuyerToolRibbon } from './BuyerToolRibbon';
import { ServiceJourney } from './ServiceJourney';
import { WebButton, WebLinkButton } from './WebButton';
import { WebSection, WebSectionHeader } from './WebSection';
import { Icon } from './icons/Icon';
import { isPublishable } from '@/lib/content/claims';
import {
  financing,
  finalCta,
  hero,
  renovation,
  team,
  tools,
  trust,
  whatSarahDoes,
  worries,
} from '@/content/en/home';
import { profiles } from '@/content/en/team';
import { SERVICE_ROUTES } from '@/content/en/service-journey';
import teamHero from '@/public/team/optimized/team-hero.webp';
import { cn } from '@/lib/utils/cn';
import heroStyles from './WebHero.module.css';
import shared from './WebBands.module.css';
import styles from './HomeBands.module.css';

/**
 * PREVIEW HOME (docs/home-preview.md) — built from the shared web layer only.
 *
 * Media: the one authentic team photograph already approved for Preview
 * (`team-hero.webp`, EQUIPO_SARAHKATERINA2.png — see docs/team-asset-record.md),
 * never assigned to names. No portrait of Sarah is used: the only individual
 * candidates are unlabelled (Phase 2H, A-01/A-04). No presentation video is
 * shown and no placeholder stands in for one.
 *
 * Buyer System: the hub entry sits after the trust strip, as
 * docs/buyer-system-integration.md places it. Only Purchase Tax and Real Cash
 * Needed appear, through the shared ribbon and `resolveEntryPoint`. Asking
 * Price (limited-go) and Tax Exposure (not built) are not shown.
 */

export function HomeHero() {
  return (
    <section className={heroStyles.hero} id="top">
      <Container className={cn(heroStyles.grid, styles.heroGrid)}>
        <RevealOnScroll className={cn(heroStyles.copy, entrance.copy)}>
          <p className={heroStyles.eyebrow}>{hero.eyebrow.text}</p>
          {/* The single h1 of the page. */}
          <h1 className={heroStyles.heading}>{hero.title.text}</h1>
          <p className={heroStyles.lead}>{hero.lead.text}</p>
          <div className={heroStyles.ctas}>
            <WebLinkButton href="#contact" arrow>
              {hero.primaryCta.text}
            </WebLinkButton>
            <WebLinkButton href="#what-sarah-does" variant="secondary">
              {hero.secondaryCta.text}
            </WebLinkButton>
          </div>
          <p className={heroStyles.script}>{whatSarahDoes.promise.text}</p>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={heroStyles.visual}>
          <figure className={styles.heroFigure}>
            {/* The whole team photograph, never cropped: object-fit contain at 16:9. */}
            <div className={cn(styles.heroFrame, entrance.media)}>
              <Image
                src={teamHero}
                alt={hero.imageAlt}
                priority
                placeholder="blur"
                sizes="(max-width: 1023px) 100vw, 50vw"
                className={styles.heroImage}
              />
            </div>
            <figcaption className={styles.caption}>{hero.caption.text}</figcaption>
          </figure>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export function HomeTrustBand() {
  return (
    <WebSection surface="soft" tight>
      <div className={cn(shared.trustGrid, styles.trustGrid)}>
        {trust.map((item, index) => (
          <RevealOnScroll key={item.value.text} order={index} className={shared.trustItem}>
            <Icon name={item.icon} size="lg" className={shared.trustIcon} />
            <div>
              <p className={shared.trustValue}>
                {item.value.text}
                {!isPublishable(item.value) ? (
                  <span
                    className={shared.pendingDot}
                    role="img"
                    aria-label="statement pending approval"
                  />
                ) : null}
              </p>
              <p className={shared.trustNote}>{item.note.text}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

export function HomeToolsBand() {
  return (
    <WebSection surface="ivory" id="tools">
      <WebSectionHeader
        eyebrow={tools.eyebrow.text}
        title={tools.title.text}
        subtitle={tools.subtitle.text}
        centered
        rule
      />
      <div className={styles.tools}>
        <BuyerToolRibbon
          toolKey="purchaseTax"
          sourcePage="/preview/home"
          moment={tools.purchaseTaxMoment.text}
          className={styles.toolRibbon}
        />
        <BuyerToolRibbon
          toolKey="realCashNeeded"
          sourcePage="/preview/home"
          moment={tools.realCashMoment.text}
          className={styles.toolRibbon}
        />
      </div>
    </WebSection>
  );
}

export function HomeWorriesBand() {
  return (
    <WebSection surface="white" id="worries">
      <div className={shared.splitWide}>
        <WebSectionHeader eyebrow={worries.eyebrow.text} title={worries.title.text} rule />
        <RevealOnScroll order={1}>
          <p className={shared.bodyText}>{worries.body.text}</p>
        </RevealOnScroll>
      </div>
      <ul className={cn(shared.objections, styles.worries)}>
        {worries.items.map((item, index) => (
          <RevealOnScroll
            key={item.text.text}
            as="li"
            order={index % 3}
            className={shared.objection}
          >
            <Icon name={item.icon} className={shared.objectionIcon} />
            <div>
              <span className={shared.objectionIndex}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={shared.objectionTitle}>{item.text.text}</h3>
            </div>
          </RevealOnScroll>
        ))}
      </ul>
    </WebSection>
  );
}

export function WhatSarahDoesBand() {
  return (
    <WebSection surface="navy" id="what-sarah-does">
      <WebSectionHeader
        eyebrow={whatSarahDoes.eyebrow.text}
        title={whatSarahDoes.title.text}
        centered
        rule
      />
      <ol className={styles.steps}>
        {whatSarahDoes.steps.map((step, index) => (
          <RevealOnScroll as="li" key={step.title.text} order={index % 3} className={styles.step}>
            <span className={styles.stepIcon}>
              <Icon name={step.icon} />
            </span>
            <h3>{step.title.text}</h3>
            <p>{step.body.text}</p>
          </RevealOnScroll>
        ))}
      </ol>
    </WebSection>
  );
}

export function FinancingBand() {
  return (
    <WebSection surface="soft" id="financing">
      <div className={shared.grid2}>
        <RevealOnScroll className={styles.card}>
          <span className={shared.toolIcon}>
            <Icon name="financialModel" />
          </span>
          <p className={shared.cardEyebrow}>{financing.eyebrow.text}</p>
          <h2 className={styles.cardTitle}>{financing.title.text}</h2>
          <p className={shared.cardText}>{financing.body.text}</p>
          <p className={styles.pendingNote}>
            <span className={styles.pendingMark} aria-hidden="true" />
            {financing.pending.text}
          </p>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.card}>
          <span className={shared.toolIcon}>
            <Icon name="redevelopment" />
          </span>
          <p className={shared.cardEyebrow}>{renovation.eyebrow.text}</p>
          <h2 className={styles.cardTitle}>{renovation.title.text}</h2>
          <p className={shared.cardText}>{renovation.body.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

export function HomeTeamBand() {
  return (
    <WebSection surface="ivory" id="team">
      <div className={shared.splitWide}>
        <div>
          <WebSectionHeader eyebrow={team.eyebrow.text} title={team.title.text} rule />
          <RevealOnScroll order={1} className={shared.stack16}>
            <p className={shared.bodyText}>{team.body.text}</p>
            <div>
              <WebLinkButton href={SERVICE_ROUTES.team} variant="secondary" arrow>
                {team.cta}
              </WebLinkButton>
            </div>
          </RevealOnScroll>
        </div>
        {/* Names and areas come from content/en/team.ts; no photograph is attached to a name. */}
        <ul className={styles.people}>
          {profiles.map((person, index) => (
            <RevealOnScroll as="li" key={person.name} order={index % 3} className={styles.person}>
              <p className={styles.personName}>{person.name}</p>
              <p className={styles.personArea}>{person.area}</p>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </WebSection>
  );
}

export function HomeFinalCtaBand() {
  return (
    <WebSection surface="navySoft" id="contact">
      <div className={shared.ctaGrid}>
        <RevealOnScroll>
          <p className={styles.darkEyebrow}>{finalCta.eyebrow.text}</p>
          <h2 className={styles.darkTitle}>{finalCta.title.text}</h2>
          <p className={cn(shared.bodyText, shared.bodyOnDark)}>{finalCta.body.text}</p>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={cn(shared.ctaActions, styles.ctaActions)}>
          <WebButton variant="primary" onDark arrow>
            {finalCta.primaryCta}
          </WebButton>
          <p className={shared.ctaNote}>{finalCta.note.text}</p>
          <Link href={SERVICE_ROUTES.team} className={styles.darkLink}>
            Who you will work with
          </Link>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

export function HomeContent() {
  return (
    <>
      <HomeHero />
      <HomeTrustBand />
      {/* Buyer System hub entry: after the trust strip (docs/buyer-system-integration.md). */}
      <HomeToolsBand />
      <HomeWorriesBand />
      <WhatSarahDoesBand />
      {/* Where to start: the Team variant of the shared journey — three doors, no current stage. */}
      <ServiceJourney page="team" />
      <FinancingBand />
      <HomeTeamBand />
      <HomeFinalCtaBand />
    </>
  );
}

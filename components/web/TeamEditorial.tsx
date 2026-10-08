import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { WebLinkButton } from './WebButton';
import { CONTACT_PREVIEW_ROUTE } from '@/content/en/site-navigation';
import { WebFaq } from './WebFaq';
import { FAQ_RELATED } from '@/content/en/internal-links';
import { ServiceJourney } from './ServiceJourney';
import { WebSection, WebSectionHeader } from './WebSection';
import { Icon } from './icons/Icon';
import {
  aftercare,
  faq,
  finalCta,
  hero,
  introduction,
  network,
  paths,
  pathsHeader,
  process,
  profiles,
  teamHeader,
} from '@/content/en/team';
import teamHero from '@/public/team/optimized/team-hero.webp';
import teamGroup from '@/public/team/optimized/team-group.webp';
import sarahPortrait from '@/public/sarah/sk-real-1.jpg';
import entrance from '@/components/motion/Entrance.module.css';
import { cn } from '@/lib/utils/cn';
import styles from './TeamEditorial.module.css';

function TeamHero() {
  return (
    <section id="top" className={styles.hero} data-surface="light">
      <Container>
        <div className={styles.heroGrid}>
          <RevealOnScroll className={cn(styles.heroCopy, entrance.copy)}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <p className={styles.heroLead}>{hero.lead}</p>
            <div className={styles.actions}>
              <WebLinkButton href="#contact" arrow>
                {hero.cta}
              </WebLinkButton>
              <WebLinkButton href="#team" variant="secondary">
                {hero.secondaryCta}
              </WebLinkButton>
            </div>
            <p className={styles.promise}>Clarity before commitment.</p>
          </RevealOnScroll>

          <RevealOnScroll order={1} className={styles.heroVisual}>
            <figure className={styles.heroFigure}>
              {/* The frame opens on arrival; the photograph is never cropped —
                  all three people stay whole (object-fit: contain, 16:9). */}
              <div className={cn(styles.heroFrame, entrance.media)}>
                <Image
                  src={teamHero}
                  alt={hero.imageAlt}
                  priority
                  placeholder="blur"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 92vw, 50vw"
                  className={styles.heroImage}
                />
              </div>
              <figcaption className={styles.heroCaption}>{hero.caption}</figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

function NetworkBand() {
  return (
    <WebSection surface="navySoft" id="network">
      {/*
        2026-10-01: the provisional event photograph (EQUIPO_SARAHKATERINA3,
        people and organisations unidentified) and its "provisional" label are
        removed from the page; the band keeps the copy Sarah reviewed. The
        decision is recorded in docs/team-asset-record.md.
      */}
      <div className={styles.networkGrid}>
        <RevealOnScroll className={`${styles.networkCopy} ${styles.networkSolo}`}>
          <p className={styles.darkEyebrow}>{network.eyebrow}</p>
          <h2>{network.title}</h2>
          {network.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

function IntroductionBand() {
  return (
    <WebSection surface="white" id="approach">
      <div className={styles.introGrid}>
        <WebSectionHeader eyebrow={introduction.eyebrow} title={introduction.title} rule />
        <RevealOnScroll order={1} className={styles.introBody}>
          {introduction.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className={styles.checkList}>
            {introduction.points.map((point) => (
              <li key={point}>
                <Icon name="check" size="sm" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

function PathsBand() {
  return (
    <WebSection surface="soft" id="paths">
      <WebSectionHeader
        eyebrow={pathsHeader.eyebrow}
        title={pathsHeader.title.text}
        subtitle={pathsHeader.subtitle}
        centered
        rule
      />
      <div className={styles.pathGrid}>
        {paths.map((path, index) => (
          <RevealOnScroll key={path.title} order={index} className={styles.pathCard}>
            <span className={styles.iconCircle} aria-hidden="true">
              <Icon name={path.icon} />
            </span>
            <h3>{path.title}</h3>
            <p>{path.intro}</p>
            <ul>
              {path.analysis.map((item) => (
                <li key={item}>
                  <Icon name="check" size="sm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={styles.limit}>{path.limit}</p>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

function TeamBand() {
  const [sarah, ...team] = profiles;
  if (!sarah) return null;

  return (
    <WebSection surface="ivory" id="team">
      <WebSectionHeader
        eyebrow={teamHeader.eyebrow}
        title={teamHeader.title.text}
        subtitle={teamHeader.intro.text}
        rule
      />

      <div className={styles.sarahGrid}>
        <RevealOnScroll variant="unveil" className={styles.sarahPortrait}>
          <Image
            src={sarahPortrait}
            alt="Sarah Katerina in an authentic studio portrait."
            fill
            placeholder="blur"
            sizes="(max-width: 767px) 100vw, 42vw"
            className={styles.coverImage}
          />
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.sarahCopy}>
          <p className={styles.profileArea}>{sarah.area}</p>
          <h3>{sarah.name}</h3>
          <p>{sarah.body}</p>
          <blockquote>“The property is only one part of the decision.”</blockquote>
        </RevealOnScroll>
      </div>

      <div className={styles.profileGrid}>
        {team.map((profile, index) => (
          <RevealOnScroll key={profile.name} order={index} className={styles.profileCard}>
            {/* 2026-10-01: Sarah asked for one photograph per profile. No named,
                approved individual photograph exists (Juanma: the repository
                holds all there are), so the card shows its text only; a face is
                never assigned from a group photograph. */}
            <p className={styles.profileArea}>{profile.area}</p>
            <h3>{profile.name}</h3>
            <p>{profile.body}</p>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll variant="unveil" className={styles.groupFigure}>
        <figure>
          <div className={styles.groupFrame}>
            <Image
              src={teamGroup}
              alt="Three members of the Sarah Katerina team seated together on a sunny terrace."
              fill
              placeholder="blur"
              sizes="(max-width: 767px) 100vw, 1200px"
              className={styles.coverImage}
            />
          </div>
        </figure>
      </RevealOnScroll>
    </WebSection>
  );
}

function ProcessBand() {
  return (
    <WebSection surface="white" id="process">
      <WebSectionHeader
        eyebrow="From first idea to ownership"
        title="One journey, with the right person visible at each stage."
        subtitle="The advisory team connects the file. Regulated or specialist matters stay with the professionals qualified to verify them."
        rule
      />
      <ol className={styles.timeline}>
        {process.map((step, index) => (
          <RevealOnScroll
            as="li"
            key={step.number}
            order={index}
            className={styles.timelineItem}
            style={{ ['--sk-stage-index' as string]: index }}
          >
            <span className={styles.stepNumber}>{step.number}</span>
            <div className={styles.stepCard}>
              <p className={styles.stepPeople}>{step.people}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <p className={styles.verification}>
                <Icon name="document" size="sm" />
                <span>{step.verification}</span>
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </ol>
    </WebSection>
  );
}

/**
 * Phase 2H: the office-sign photograph is removed at Sarah's request
 * ("Quita esta imagen"); the band keeps its copy, now on its own.
 */
function AftercareBand() {
  return (
    <WebSection surface="soft" id="ownership">
      <RevealOnScroll className={cn(styles.aftercareCopy, styles.aftercareSolo)}>
        <p className={styles.eyebrow}>{aftercare.eyebrow}</p>
        <h2>{aftercare.title}</h2>
        <p>{aftercare.body}</p>
        <div className={styles.aftercareItems}>
          <span>Tax questions</span>
          <span>Administrative tasks</span>
          <span>Accounts</span>
          <span>Bills and charges</span>
        </div>
        <p className={styles.limit}>
          Support depends on the owner’s circumstances, professional review and the agreed scope.
        </p>
      </RevealOnScroll>
    </WebSection>
  );
}

function FinalCtaBand() {
  return (
    <WebSection surface="navySoft" id="contact">
      <div className={styles.ctaGrid}>
        <RevealOnScroll>
          <p className={styles.darkEyebrow}>{finalCta.eyebrow}</p>
          <h2>{finalCta.title}</h2>
          <p className={styles.darkLead}>{finalCta.body}</p>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.ctaActions}>
          {/* 2026-10-01: the primary action leads to the Contact page. */}
          <WebLinkButton href={CONTACT_PREVIEW_ROUTE} variant="primary" onDark arrow>
            {finalCta.primaryCta}
          </WebLinkButton>
          <WebLinkButton href="#paths" variant="secondary" onDark>
            {finalCta.secondaryCta}
          </WebLinkButton>
          {finalCta.note ? <p>{finalCta.note}</p> : null}
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

export function TeamEditorial() {
  return (
    <div>
      <TeamHero />
      <IntroductionBand />
      <PathsBand />
      <TeamBand />
      <NetworkBand />
      <ProcessBand />
      <AftercareBand />
      {/* Phase 2G: back to the service that matches the reader's need. */}
      <ServiceJourney page="team" />
      <WebFaq content={faq} related={FAQ_RELATED.team} />
      <FinalCtaBand />
    </div>
  );
}

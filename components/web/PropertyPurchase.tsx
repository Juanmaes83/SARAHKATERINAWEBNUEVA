import Image from 'next/image';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { WebLinkButton } from './WebButton';
import { WebSection, WebSectionHeader } from './WebSection';
import { Icon, type IconName } from './icons/Icon';
import { TerritoryVisual } from './TerritoryVisual';
import { APPROVED_MEDIA, type ApprovedMedia } from '@/lib/media/approved-media';
import { APPROVED_VIDEO } from '@/lib/media/approved-video';
import { PURCHASE_VOICES } from '@/content/en/buyer-voices';
import { BuyerVoices } from './BuyerVoices';
import { HERO_VIDEO } from '@/lib/media/hero-video';
import { HeroFilm } from '@/components/motion/HeroFilm';
import { ArtworkFigure } from './ArtworkFigure';
import { BuyerToolRibbon } from './BuyerToolRibbon';
import { PlayOnceVideo } from '@/components/motion/PlayOnceVideo';
import { SERVICE_ROUTES } from '@/content/en/service-journey';
import {
  audience,
  authority,
  beforeSign,
  cases,
  fileStages,
  finalCta,
  goodIdea,
  hero,
  journey,
  oneFile,
  process,
  services,
  trust,
  worries,
} from '@/content/en/property-purchase';
import entrance from '@/components/motion/Entrance.module.css';
import { cn } from '@/lib/utils/cn';
import styles from './PropertyPurchase.module.css';

function PlaceholderMedia({
  label,
  variant = 'built',
  media,
  priority = false,
  sizes,
  className,
  unveil = false,
}: {
  label: string;
  /** Large editorial slots only — see TerritoryVisual. */
  unveil?: boolean;
  /** Slot modifier, e.g. the hero's native-ratio frame. */
  className?: string;
  variant?: 'built' | 'coast' | 'district' | 'plot';
  /**
   * PHASE 2E — an approved photograph for this slot. When absent the
   * schematic still draws and the "pending" label stays, so an unfilled slot
   * remains visibly unfilled.
   */
  media?: ApprovedMedia;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn(styles.placeholderMedia, className)}>
      <TerritoryVisual
        variant={variant}
        tone="navy"
        media={media}
        priority={priority}
        unveil={unveil}
        {...(sizes ? { sizes } : {})}
      />
      {/* The label only reports a gap; once an image lands it is redundant. */}
      {media ? null : <span className={styles.placeholderLabel}>{label}</span>}
    </div>
  );
}

/**
 * PHASE 2E — approved imagery for the three service cards.
 * Cases deliberately get nothing: client imagery stays blocked.
 */
const SERVICE_MEDIA: readonly ApprovedMedia[] = [
  APPROVED_MEDIA.assetArchitecture,
  APPROVED_MEDIA.processPresentation,
  APPROVED_MEDIA.processModel,
];

export function PurchaseHero() {
  return (
    <section id="top" className={styles.hero} data-surface="light">
      <div className={styles.heroGrid}>
        <RevealOnScroll className={cn(styles.heroCopy, entrance.copy)}>
          <p className={styles.eyebrow}>{hero.eyebrow.text}</p>
          <h1 className={styles.heroTitle}>
            {hero.title.text} <em>{hero.accent.text}</em>
          </h1>
          <p className={styles.heroBody}>{hero.body.text}</p>
          <div className={styles.buttonRow}>
            <WebLinkButton href="#services" variant="primary" arrow>
              {hero.primaryCta.text}
            </WebLinkButton>
            <WebLinkButton href="#process" variant="secondary" arrow>
              {hero.secondaryCta.text}
            </WebLinkButton>
          </div>
          <ul className={styles.heroProofs}>
            {hero.proofs.map((item) => (
              <li key={item.text}>
                <Icon name="check" size="sm" />
                {item.text}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={styles.heroVisual}>
          {/*
            PHASE 2F — the owner-approved hero video (`HERO_VIDEO.purchase`):
            Sarah in the buyer's advisory position at a meeting table. Shown
            whole at its 16:9 ratio; nothing is layered over the footage. The
            navy note closes the frame from below, as before, so video and
            caption read as one file card. The other people are editorial
            participants and are never identified.
            PHASE 2H — it plays once, muted, without depending on scroll
            (`HeroFilm`). The source's voice-over is not published.
          */}
          <figure className={styles.heroFigure}>
            <HeroFilm
              video={HERO_VIDEO.purchase}
              name="the hero film"
              className={cn(styles.heroVideo, entrance.media)}
            />
            <figcaption className={cn(styles.heroVisualCopy, entrance.float)}>
              <p>{hero.visualBody.text}</p>
              <span>
                <Icon name="play" /> Video requires approval
              </span>
            </figcaption>
          </figure>
          <p className={styles.heroScript}>{hero.script.text}</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function PurchaseTrustBand() {
  return (
    <section className={styles.trust} aria-label="Service principles">
      <div className={styles.wideInner}>
        {trust.map((item, index) => (
          <RevealOnScroll key={item.value.text} order={index} className={styles.trustItem}>
            <Icon name={item.icon} size="lg" />
            <div>
              <strong>{item.value.text}</strong>
              <span>{item.note.text}</span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

export function AudienceBand() {
  return (
    <WebSection surface="ivory" id="services">
      <div className={styles.audienceGrid}>
        <RevealOnScroll>
          <p className={styles.eyebrow}>{audience.eyebrow.text}</p>
          <h2 className={styles.sectionTitle}>{audience.title.text}</h2>
          <p className={styles.lead}>{audience.body.text}</p>
        </RevealOnScroll>
        <RevealOnScroll order={1}>
          <ul className={styles.arrowList}>
            {audience.items.map((item) => (
              <li key={item.text}>
                <Icon name="arrow" size="sm" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <div className={styles.audienceMedia}>
            <PlaceholderMedia
              label={audience.mediaLabel.text}
              variant="built"
              media={APPROVED_MEDIA.advisorClientOne}
              sizes="(max-width: 1023px) 100vw, 40vw"
              unveil
            />
            <p className={styles.script}>{audience.script.text}</p>
          </div>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/**
 * PHASE 2G — "Good idea, bad execution". The owner's brand film sits between
 * who the service is for and how the one file works: the idea first, then the
 * four points where it can fail, then (next band) the file that holds them.
 *
 * The film plays once, silent, when it reaches the reading line and rests on
 * its last frame; it is not a second hero and has no copy over it. Its footage
 * carries no text, so none is repeated here; the HTML carries the argument.
 */
export function GoodIdeaBand() {
  return (
    <WebSection surface="soft" id="good-idea">
      <div className={styles.goodIdeaGrid}>
        <RevealOnScroll className={styles.goodIdeaCopy}>
          <p className={styles.eyebrow}>{goodIdea.eyebrow.text}</p>
          <h2 className={styles.sectionTitle}>{goodIdea.title.text}</h2>
          <p className={styles.lead}>{goodIdea.body.text}</p>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.goodIdeaFilm}>
          <figure>
            <PlayOnceVideo
              video={APPROVED_VIDEO.purchaseGoodIdea}
              name="the film"
              sizes="(max-width: 1023px) 100vw, 58vw"
            />
            <figcaption className={styles.goodIdeaNote}>{goodIdea.note.text}</figcaption>
          </figure>
        </RevealOnScroll>
      </div>

      <div className={styles.goodIdeaPoints}>
        <p className={styles.goodIdeaKicker}>{goodIdea.pointsTitle.text}</p>
        <ol className={styles.goodIdeaList}>
          {goodIdea.points.map((point, index) => (
            <RevealOnScroll
              as="li"
              key={point.id}
              order={index}
              className={styles.goodIdeaPoint}
              style={{ ['--sk-stage-index' as string]: index }}
            >
              <span className={styles.goodIdeaIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{point.title.text}</h3>
              <p>{point.body.text}</p>
              {'link' in point ? (
                <WebLinkButton href={SERVICE_ROUTES.tax} variant="quiet" arrow>
                  {point.link}
                </WebLinkButton>
              ) : null}
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </WebSection>
  );
}

export function OneFileBand() {
  return (
    <WebSection surface="white">
      <div className={styles.oneFileGrid}>
        <RevealOnScroll>
          {/*
            PHASE 2F — the approved "One file" artwork (brief §4.3) replaces the
            drawn folder-and-notes still life: one coordinated record, laid out
            as a real desk would be. Its labels are in the picture, so none is
            repeated in HTML; the copy beside it carries the meaning.
          */}
          <ArtworkFigure
            media={APPROVED_MEDIA.purchaseOneFile}
            title={`${oneFile.title.text} — illustrative`}
            note="Illustrative · sample documents, not genuine ones"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.oneFileCopy}>
          <p className={styles.eyebrow}>{oneFile.eyebrow.text}</p>
          <h2 className={styles.sectionTitle}>{oneFile.title.text}</h2>
          <p className={styles.lead}>{oneFile.body.text}</p>
          <ul className={styles.checkList}>
            {oneFile.points.map((point) => (
              <li key={point.text}>
                <Icon name="check" size="sm" />
                {point.text}
              </li>
            ))}
          </ul>
          <WebLinkButton href="#process" variant="primary" arrow>
            {oneFile.cta.text}
          </WebLinkButton>
          <p className={styles.script}>{oneFile.script.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/**
 * Illustrative file state, read from the stage's own label. Shown as a mark
 * plus the word, never by colour alone.
 */
function stageState(status: string): 'done' | 'active' | 'pending' {
  if (/prepared|complete|done/i.test(status)) return 'done';
  if (/review|progress/i.test(status)) return 'active';
  return 'pending';
}

export function FileTrackerBand() {
  return (
    <WebSection surface="soft" tight>
      <div className={styles.trackerHeading}>
        <p className={styles.eyebrow}>{process.eyebrow.text}</p>
        <span>Documents, keys and decisions kept in sequence.</span>
      </div>
      <div className={styles.trackerLayout}>
        {/*
          PHASE 2E — the page's signature moment. On desktop the seven stages
          are joined by one gold connector that draws stage to stage as the
          file comes into view: the "one file" promise shown as a sequence
          rather than stated. `stageIndex` feeds the per-stage delay; the
          content itself is never hidden longer than the canonical reveal.
        */}
        <ol className={styles.fileTracker}>
          {fileStages.map((stage, index) => (
            <RevealOnScroll
              as="li"
              order={index}
              key={stage.id}
              className={styles.fileStage}
              style={{ ['--sk-stage-index' as string]: index }}
            >
              <span className={styles.stageDot} aria-hidden="true">
                {stageState(stage.status) === 'done' ? <Icon name="check" size="sm" /> : stage.code}
              </span>
              <div className={styles.stageCard}>
                <h3>
                  <span className={styles.stageCode}>{stage.code}</span> {stage.title}
                </h3>
                <p>{stage.body}</p>
                <span className={styles.stageStatus} data-state={stageState(stage.status)}>
                  <span className={styles.stageStatusMark} aria-hidden="true" />
                  {stage.status}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </ol>
        <RevealOnScroll className={styles.documentControl}>
          <h3>{process.controlTitle.text}</h3>
          <ul>
            {process.controls.map((item) => (
              <li key={item.text}>
                <Icon name="document" size="sm" />
                {item.text}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
      <p className={styles.sampleNote}>Illustrative file status, not a client record.</p>
    </WebSection>
  );
}

export function ProcessBand() {
  return (
    <WebSection surface="white" id="process">
      {/*
        PHASE 2E (brief §7): own eyebrow — "The file, front to back" now
        appears once, on the tracker above. The six phases are joined card to
        card by the approved thread; each states what it produces.
      */}
      <WebSectionHeader
        eyebrow={process.stepsEyebrow.text}
        title={process.title.text}
        subtitle={process.subtitle.text}
        rule
      />
      <ol className={styles.processGrid}>
        {process.steps.map((step, index) => (
          <RevealOnScroll
            as="li"
            order={index % 3}
            key={step.title}
            className={styles.processCard}
            style={{ ['--sk-stage-index' as string]: index % 3 }}
          >
            <span className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</span>
            <Icon name={step.icon} size="lg" />
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <p className={styles.processDeliverable}>
                <span className={styles.processDeliverableLabel}>Deliverable</span>{' '}
                {step.deliverable}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </ol>
      <BuyerToolRibbon
        toolKey="realCashNeeded"
        sourcePage={SERVICE_ROUTES.purchase}
        moment="With the process in view: the cash the purchase needs, beyond the headline price."
      />
    </WebSection>
  );
}

export function BeforeSignBand() {
  return (
    <WebSection surface="navy" className={styles.beforeSignSection}>
      <div className={styles.beforeSignGrid}>
        <RevealOnScroll className={styles.reportMock}>
          <div className={styles.reportCover}>
            <Icon name="report" size="lg" />
            <span>Property report</span>
            <strong>Costa Blanca</strong>
          </div>
          <ul>
            {beforeSign.checks.map((item, index) => (
              <li key={item}>
                <Icon name={index === 5 ? 'risk' : 'check'} size="sm" />
                {item}
              </li>
            ))}
          </ul>
          <span className={styles.illustrative}>Illustrative</span>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.decisionPanel}>
          <p className={styles.eyebrow}>{beforeSign.eyebrow.text}</p>
          <h2>{beforeSign.title.text}</h2>
          {/* PHASE 2E (brief §7): the decision leads — three outcomes, one
              marked as the illustrative recommendation, stated in words. */}
          <p className={styles.decisionLabel}>{beforeSign.recommendation.text}</p>
          <ul className={styles.decisionOptions}>
            {beforeSign.actions.map((action, index) => (
              <li key={action} data-selected={index === 1 ? 'true' : undefined}>
                <span className={styles.decisionMark} aria-hidden="true" />
                <span>{action}</span>
                {index === 1 ? <span className={styles.decisionTag}>Illustrative pick</span> : null}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
        <RevealOnScroll order={2} className={styles.beforeSignCta}>
          <ul>
            {beforeSign.deliverables.map((item) => (
              <li key={item.text}>
                <Icon name="check" size="sm" />
                {item.text}
              </li>
            ))}
          </ul>
          <WebLinkButton href="#services-options" variant="primary" onDark arrow>
            {beforeSign.cta.text}
          </WebLinkButton>
          <p className={styles.scriptOnDark}>{beforeSign.script.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

export function WorriesBand() {
  return (
    <WebSection surface="ivory" tight>
      <div className={styles.worriesGrid}>
        <RevealOnScroll>
          <h2 className={styles.sectionTitle}>{worries.title.text}</h2>
          <p className={styles.lead}>{worries.body.text}</p>
        </RevealOnScroll>
        <ul className={styles.worryList}>
          {worries.items.map(([icon, text], index) => (
            <RevealOnScroll as="li" order={index % 2} key={text}>
              <Icon name={icon as IconName} />
              <span>{text}</span>
            </RevealOnScroll>
          ))}
        </ul>
        <RevealOnScroll>
          <PlaceholderMedia
            label="Property image pending"
            variant="built"
            media={APPROVED_MEDIA.assetPlan}
            sizes="(max-width: 1023px) 100vw, 40vw"
          />
          <p className={styles.script}>{worries.script.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

export function ServicesBand() {
  return (
    <WebSection surface="white" id="services-options">
      <WebSectionHeader eyebrow={services.eyebrow.text} title={services.title.text} centered rule />
      <div className={styles.servicesLayout}>
        <div className={styles.serviceGrid}>
          {services.items.map((service, index) => (
            <RevealOnScroll order={index} key={service.title} className={styles.serviceCard}>
              <PlaceholderMedia
                label="Property image pending"
                variant={index === 1 ? 'built' : index === 2 ? 'coast' : 'district'}
                media={SERVICE_MEDIA[index]}
                sizes="(max-width: 767px) 100vw, 32vw"
              />
              {service.popular ? <span className={styles.popular}>Most requested</span> : null}
              <div className={styles.serviceBody}>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size="sm" />
                      {point}
                    </li>
                  ))}
                </ul>
                {/* Card-level actions are quiet across the system; the gold
                    fill is reserved for section-level decisions. */}
                <div className={styles.serviceCta}>
                  <WebLinkButton href="#faq" variant="quiet" arrow>
                    {service.cta}
                  </WebLinkButton>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll className={styles.scopePanel}>
          <h3>{services.scopeTitle.text}</h3>
          <ul>
            {services.scope.map(([item, included]) => (
              <li key={item} className={included ? styles.included : styles.excluded}>
                <Icon name={included ? 'check' : 'risk'} size="sm" />
                {item}
              </li>
            ))}
          </ul>
          <p>{services.pricingNote.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

export function AuthorityBand() {
  const authorityMedia = APPROVED_MEDIA.authorityEditorial;

  return (
    <WebSection surface="navySoft" id="sarah">
      <div className={styles.authorityGrid}>
        <RevealOnScroll variant="unveil" className={styles.portraitFrame}>
          <Image
            src={authorityMedia.src}
            alt={authorityMedia.alt}
            className={styles.portrait}
            fill
            sizes="(max-width: 767px) 100vw, 46vw"
            style={{ objectPosition: authorityMedia.focal }}
          />
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.authorityCopy}>
          <p className={styles.eyebrow}>{authority.eyebrow.text}</p>
          <h2>{authority.title.text}</h2>
          <p>{authority.body.text}</p>
          <WebLinkButton href="#faq" variant="primary" onDark arrow>
            {authority.cta.text}
          </WebLinkButton>
        </RevealOnScroll>
        <RevealOnScroll order={2} className={styles.authorityPoints}>
          <ul>
            {authority.points.map((point) => (
              <li key={point.text}>
                <Icon name="independence" />
                {point.text}
              </li>
            ))}
          </ul>
          <blockquote>{authority.quote.text}</blockquote>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/**
 * PHASE 2F — the owner-approved artwork per avoided mistake (brief §4.2),
 * keyed by the card's own title so the mapping cannot drift. Each is an
 * illustrative composition; the card's copy and withheld result below remain
 * authoritative, and no person, document or outcome is presented as real.
 */
const VOICE_IMAGES: readonly ApprovedMedia[] = [
  APPROVED_MEDIA.processAnalysis,
  APPROVED_MEDIA.investmentHero,
  APPROVED_MEDIA.territoryContact,
];

/**
 * Interactive testimonial preview. The approved case artwork remains above;
 * this separate banner demonstrates the future buyer-voice experience without
 * inventing a quote, identity or outcome.
 */
const CASE_ARTWORK: Record<(typeof cases.items)[number]['title'], ApprovedMedia> = {
  'Fiscal exposure identified': APPROVED_MEDIA.purchaseFiscalExposure,
  'Problematic clause renegotiated': APPROVED_MEDIA.purchaseClauseRenegotiated,
  'Remote purchase completed': APPROVED_MEDIA.purchaseRemoteCompleted,
};

export function CasesBand() {
  return (
    <WebSection surface="ivory">
      <WebSectionHeader eyebrow={cases.eyebrow.text} title={cases.title.text} centered rule />
      <div className={styles.caseGrid}>
        {cases.items.map((item, index) => (
          <RevealOnScroll key={item.title} order={index} className={styles.caseCard}>
            <ArtworkFigure
              media={CASE_ARTWORK[item.title]}
              title={`${item.title} — illustrative`}
              note="Illustrative · not a client case"
              sizes="(max-width: 1023px) 100vw, 58vw"
            />
            <div>
              <span>Case slot - permission required</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <strong>Result withheld</strong>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <div className={styles.voicesSection}>
        <BuyerVoices
          slots={PURCHASE_VOICES}
          images={VOICE_IMAGES}
          video={APPROVED_VIDEO.territoryLoop}
          notes={cases.items.map((item) => item.body)}
        />
      </div>
      <div className={styles.centerAction}>
        <WebLinkButton href="#faq" variant="primary" arrow>
          {cases.cta.text}
        </WebLinkButton>
      </div>
    </WebSection>
  );
}

export function JourneyBand() {
  return (
    <WebSection surface="white" tight id="resources">
      <WebSectionHeader eyebrow={journey.eyebrow.text} title={journey.title.text} centered rule />
      <ol className={styles.journey}>
        {journey.steps.map((step, index) => (
          <RevealOnScroll as="li" key={step.title} order={index}>
            <span>
              <Icon name={step.icon} />
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
            {index < journey.steps.length - 1 ? (
              <Icon name="arrow" className={styles.journeyArrow} />
            ) : null}
          </RevealOnScroll>
        ))}
      </ol>
      <p className={styles.journeyScript}>{journey.script.text}</p>
    </WebSection>
  );
}

export function FinalCtaBand() {
  return (
    <section className={styles.finalCta} data-surface="dark">
      <div className={styles.finalCtaInner}>
        <RevealOnScroll className={styles.finalCopy}>
          <p className={styles.eyebrow}>{finalCta.eyebrow.text}</p>
          <h2>{finalCta.title.text}</h2>
          <div className={styles.buttonRow}>
            <WebLinkButton href="#services-options" variant="primary" onDark arrow>
              {finalCta.primaryCta.text}
            </WebLinkButton>
            <WebLinkButton href="#faq" variant="secondary" onDark arrow>
              {finalCta.secondaryCta.text}
            </WebLinkButton>
          </div>
          <p className={styles.finalNote}>{finalCta.note.text}</p>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.finalVisual}>
          <PlaceholderMedia
            label="Costa Blanca panorama pending"
            variant="coast"
            media={APPROVED_MEDIA.purchaseFinalContact}
            sizes="(max-width: 1023px) 100vw, 45vw"
            unveil
          />
          <p>{finalCta.script.text}</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

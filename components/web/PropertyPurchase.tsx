import Image from 'next/image';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { resolveEntryPoint, type BuyerSystemExperienceKey } from '@/lib/buyer-system/links';
import portrait from '@/public/sarah/sk-real-2.jpg';
import { WebLinkButton } from './WebButton';
import { WebSection, WebSectionHeader } from './WebSection';
import { Icon, type IconName } from './icons/Icon';
import { TerritoryVisual } from './TerritoryVisual';
import {
  audience,
  authority,
  beforeSign,
  cases,
  fileStages,
  finalCta,
  hero,
  journey,
  oneFile,
  process,
  services,
  trust,
  worries,
} from '@/content/en/property-purchase';
import styles from './PropertyPurchase.module.css';

function PlaceholderMedia({
  label,
  variant = 'built',
}: {
  label: string;
  variant?: 'built' | 'coast' | 'district' | 'plot';
}) {
  return (
    <div className={styles.placeholderMedia}>
      <TerritoryVisual variant={variant} tone="navy" />
      <span className={styles.placeholderLabel}>{label}</span>
    </div>
  );
}

export function PurchaseHero() {
  return (
    <section id="top" className={styles.hero} data-surface="light">
      <div className={styles.heroGrid}>
        <RevealOnScroll className={styles.heroCopy}>
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
          <PlaceholderMedia label={hero.visualTitle.text} variant="coast" />
          <div className={styles.heroVisualCopy}>
            <p>{hero.visualBody.text}</p>
            <span>
              <Icon name="play" /> Video requires approval
            </span>
          </div>
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

function CalculatorRibbon({
  toolKey,
  location,
}: {
  toolKey: BuyerSystemExperienceKey;
  location: string;
}) {
  const entry = resolveEntryPoint(toolKey);
  return (
    <aside className={styles.calculatorRibbon} aria-label={`${entry.experience.label} calculator`}>
      <span className={styles.calculatorIcon}>
        <Icon name="financialModel" />
      </span>
      <div>
        <p className={styles.calculatorKicker}>Buyer System entry point</p>
        <h3>{entry.experience.question}</h3>
        <p>{entry.experience.scope}</p>
      </div>
      {entry.href ? (
        <a
          className={styles.calculatorLink}
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open calculator <Icon name="arrow" size="sm" />
          <span className="sk-visually-hidden"> (opens in a new tab)</span>
        </a>
      ) : (
        <span className={styles.calculatorPending}>Controlled preview state</span>
      )}
      <span className="sk-visually-hidden">Placement: {location}</span>
    </aside>
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
            <PlaceholderMedia label={audience.mediaLabel.text} variant="built" />
            <p className={styles.script}>{audience.script.text}</p>
          </div>
        </RevealOnScroll>
      </div>
      <CalculatorRibbon toolKey="purchaseTax" location="after trust and audience" />
    </WebSection>
  );
}

function FileStillLife() {
  const notes = ['NIE prepared', 'Title checked', 'Tax route', 'Notary ready', 'Contract reviewed'];
  return (
    <div
      className={styles.fileStill}
      role="img"
      aria-label="Illustrative purchase file with ordered document cards."
    >
      <div className={styles.folder}>
        <span>SK</span>
        <strong>Property purchase</strong>
        <small>Your file</small>
      </div>
      {notes.map((note, index) => (
        <span key={note} className={styles.fileNote} data-note={index}>
          {note}
        </span>
      ))}
      <span className={styles.illustrative}>Illustrative</span>
    </div>
  );
}

export function OneFileBand() {
  return (
    <WebSection surface="white">
      <div className={styles.oneFileGrid}>
        <RevealOnScroll>
          <FileStillLife />
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

export function FileTrackerBand() {
  return (
    <WebSection surface="soft" tight>
      <div className={styles.trackerHeading}>
        <p className={styles.eyebrow}>{process.eyebrow.text}</p>
        <span>Documents, keys and decisions kept in sequence.</span>
      </div>
      <div className={styles.trackerLayout}>
        <ol className={styles.fileTracker}>
          {fileStages.map((stage, index) => (
            <RevealOnScroll as="li" order={index} key={stage.id} className={styles.fileStage}>
              <span className={styles.stageDot}>{stage.code}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <span className={styles.stageStatus}>{stage.status}</span>
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
      <WebSectionHeader
        eyebrow={process.eyebrow.text}
        title={process.title.text}
        subtitle={process.subtitle.text}
        rule
      />
      <ol className={styles.processGrid}>
        {process.steps.map((step, index) => (
          <RevealOnScroll as="li" order={index % 3} key={step.title} className={styles.processCard}>
            <span className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</span>
            <Icon name={step.icon} size="lg" />
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <strong>{step.deliverable}</strong>
            </div>
          </RevealOnScroll>
        ))}
      </ol>
      <CalculatorRibbon toolKey="realCashNeeded" location="after purchase process" />
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
          <p className={styles.decisionLabel}>{beforeSign.recommendation.text}</p>
          <div className={styles.decisionOptions}>
            {beforeSign.actions.map((action) => (
              <span key={action}>{action}</span>
            ))}
          </div>
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
          <PlaceholderMedia label="Property image pending" variant="built" />
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
                <WebLinkButton href="#faq" variant="primary" arrow>
                  {service.cta}
                </WebLinkButton>
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
  return (
    <WebSection surface="navySoft" id="sarah">
      <div className={styles.authorityGrid}>
        <RevealOnScroll className={styles.portraitFrame}>
          <Image
            src={portrait}
            alt={authority.imageAlt.text}
            className={styles.portrait}
            sizes="(max-width: 767px) 100vw, 28vw"
            placeholder="blur"
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

export function CasesBand() {
  return (
    <WebSection surface="ivory">
      <WebSectionHeader eyebrow={cases.eyebrow.text} title={cases.title.text} centered rule />
      <div className={styles.caseGrid}>
        {cases.items.map((item, index) => (
          <RevealOnScroll key={item.title} order={index} className={styles.caseCard}>
            <PlaceholderMedia
              label="Client image withheld"
              variant={index === 0 ? 'built' : index === 1 ? 'coast' : 'district'}
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
          <PlaceholderMedia label="Costa Blanca panorama pending" variant="coast" />
          <p>{finalCta.script.text}</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

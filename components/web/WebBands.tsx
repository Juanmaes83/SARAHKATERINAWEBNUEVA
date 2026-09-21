import Image from 'next/image';
import { WebSection, WebSectionHeader } from './WebSection';
import { WebButton } from './WebButton';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import {
  SampleColumnChart,
  SampleDistribution,
  SampleScenarios,
  SampleSeasonality,
} from './SampleChart';
import portrait from '@/public/sarah/sk-real-2.jpg';
import {
  approach,
  assetTypes,
  authority,
  cases,
  doors,
  finalCta,
  journey,
  process,
  report,
  scenarios,
  trustStrip,
} from '@/content/en/investment';
import { isPublishable } from '@/lib/content/claims';
import styles from './WebBands.module.css';

/* --- 3. TRUST STRIP ------------------------------------------------------- */

export function TrustBand() {
  return (
    <WebSection surface="soft" tight>
      <div className={styles.trustGrid}>
        {trustStrip.map((item, index) => (
          <RevealOnScroll key={item.value.text} order={index} className={styles.trustItem}>
            {/* An unconfirmed value is never rendered in the visual style of a
                confirmed one. That distinction is the point of this band. */}
            <p className={isPublishable(item.value) ? styles.trustValue : styles.trustPending}>
              {item.value.text}
            </p>
            <p className={styles.trustNote}>{item.note.text}</p>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

/* --- 4. PROBLEM AND OBJECTIONS -------------------------------------------- */

export function ApproachBand() {
  return (
    <WebSection surface="ivory" id="approach">
      <div className={styles.split}>
        <WebSectionHeader eyebrow={approach.eyebrow.text} title={approach.title.text} rule />
        <RevealOnScroll order={1} className={styles.splitBody}>
          {approach.body.map((paragraph) => (
            <p key={paragraph.text} className={styles.bodyText}>
              {paragraph.text}
            </p>
          ))}
        </RevealOnScroll>
      </div>

      <ul className={styles.objections} style={{ marginBlockStart: 'var(--sk-space-48)' }}>
        {approach.objections.map((objection, index) => (
          <RevealOnScroll
            key={objection.title.text}
            as="li"
            order={index % 3}
            className={styles.objection}
          >
            <span className={styles.objectionIndex} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={styles.objectionBody}>
              <h3 className={styles.objectionTitle}>{objection.title.text}</h3>
              <p className={styles.cardText}>{objection.body.text}</p>
            </div>
          </RevealOnScroll>
        ))}
      </ul>
    </WebSection>
  );
}

/* --- 5. DECISION DOORS ---------------------------------------------------- */

export function DoorsBand() {
  return (
    <WebSection surface="white">
      <WebSectionHeader
        eyebrow={doors.eyebrow.text}
        title={doors.title.text}
        centered
        rule
      />
      <div className={styles.cardGrid3}>
        {doors.items.map((door, index) => (
          <RevealOnScroll
            key={door.id}
            order={index}
            className={`${styles.card} ${styles.cardInteractive}`}
          >
            <p className={styles.cardMeta}>{door.meta.text}</p>
            <h3 className={styles.cardTitle}>{door.title.text}</h3>
            <p className={styles.cardText}>{door.body.text}</p>
            <ul className={styles.checks}>
              {door.points.map((point) => (
                <li key={point.text} className={styles.check}>
                  <span className={styles.checkMark} aria-hidden="true">
                    ✓
                  </span>
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
            <div className={styles.cardFoot}>
              <WebButton variant="primary" arrow>
                {door.cta.text}
              </WebButton>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

/* --- 6. ASSET TYPES ------------------------------------------------------- */

export function AssetTypesBand() {
  return (
    <WebSection surface="ivory" id="assets">
      <WebSectionHeader
        eyebrow={assetTypes.eyebrow.text}
        title={assetTypes.title.text}
        centered
        rule
      />
      <div className={styles.cardGrid4}>
        {assetTypes.items.map((item, index) => (
          <RevealOnScroll
            key={item.id}
            order={index}
            className={`${styles.card} ${styles.cardInteractive}`}
          >
            {/*
              The template places a photograph on each asset card. No licensed
              property photography exists in the mother repository, so the slot
              is held by a typographic chip rather than generic stock, which
              AGENTS.md forbids.
            */}
            <span className={styles.chip} aria-hidden="true">
              {item.title.text.charAt(0)}
            </span>
            <h3 className={styles.cardTitle}>{item.title.text}</h3>
            <p className={styles.cardText}>{item.forWhom.text}</p>
            <ul className={styles.checks}>
              <li className={styles.check}>
                <span className={styles.checkMark} aria-hidden="true">
                  ·
                </span>
                <span>{item.analysed.text}</span>
              </li>
              <li className={styles.check}>
                <span className={styles.checkMark} aria-hidden="true">
                  ·
                </span>
                <span>{item.risk.text}</span>
              </li>
            </ul>
            <p className={styles.stepDeliverable}>
              <span aria-hidden="true">▤</span>
              <span>Deliverable: {item.deliverable.text}</span>
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

/* --- 7. PROCESS ----------------------------------------------------------- */

export function ProcessBand() {
  return (
    <WebSection surface="soft" id="process">
      <WebSectionHeader
        eyebrow={process.eyebrow.text}
        title={process.title.text}
        centered
        rule
      />
      {/* Ordered list: the sequence is meaning, so it survives without CSS. */}
      <ol className={styles.timeline}>
        {process.steps.map((step, index) => (
          <RevealOnScroll key={step.id} as="li" order={index} className={styles.step}>
            <span className={styles.stepNumber} aria-hidden="true">
              {index + 1}
            </span>
            <h3 className={styles.stepTitle}>{step.title.text}</h3>
            <p className={styles.cardText}>{step.body.text}</p>
            <p className={styles.stepDeliverable}>
              <span aria-hidden="true">▤</span>
              <span>Deliverable: {step.deliverable.text}</span>
            </p>
          </RevealOnScroll>
        ))}
      </ol>
    </WebSection>
  );
}

/* --- 8. REPORT PREVIEW (navy) --------------------------------------------- */

const REPORT_CHARTS = {
  'cash-flow': <SampleColumnChart label="Annual cash flows" />,
  distribution: <SampleDistribution label="Distribution of outcomes" />,
  seasonality: <SampleSeasonality label="Income seasonality" />,
} as const;

export function ReportBand() {
  return (
    <WebSection surface="navy" id="report">
      <WebSectionHeader
        eyebrow={report.eyebrow.text}
        title={report.title.text}
        subtitle={report.subtitle.text}
        centered
        rule
      />

      <div className={styles.reportGrid}>
        {report.cards.map((card, index) => (
          <RevealOnScroll key={card.id} order={index} className={styles.reportCard}>
            <div>
              <h3 className={styles.reportCardTitle}>{card.title.text}</h3>
              <p className={styles.reportCardNote}>{card.note.text}</p>
            </div>

            {card.id === 'risk' ? (
              <ul className={styles.riskList}>
                {report.risks.map((risk) => (
                  <li key={risk.label.text} className={styles.riskRow}>
                    <span>{risk.label.text}</span>
                    <span className={styles.riskValue}>{risk.value.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              REPORT_CHARTS[card.id as keyof typeof REPORT_CHARTS]
            )}

            <span className={styles.pendingTag}>Illustrative</span>
          </RevealOnScroll>
        ))}
      </div>

      <div className={styles.reportAside}>
        <ul className={styles.deliverables}>
          {report.deliverables.map((deliverable) => (
            <li key={deliverable.text} className={styles.deliverable}>
              <span aria-hidden="true" style={{ color: 'var(--sk-web-gold-on-dark)' }}>
                ▤
              </span>
              <span>{deliverable.text}</span>
            </li>
          ))}
        </ul>
        <WebButton variant="primary" onDark arrow>
          {report.cta.text}
        </WebButton>
      </div>
    </WebSection>
  );
}

/* --- 9. SCENARIOS --------------------------------------------------------- */

export function ScenariosBand() {
  return (
    <WebSection surface="ivory">
      <div className={styles.split}>
        <RevealOnScroll>
          <div className={styles.card}>
            <h3 className={styles.reportCardTitle}>Projected net position by scenario</h3>
            <SampleScenarios label="Optimistic, base and pessimistic scenarios" />
            <ul className={styles.riskList}>
              <li className={styles.riskRow}>
                <span>Optimistic</span>
                <span className={styles.riskValue}>Sample</span>
              </li>
              <li className={styles.riskRow}>
                <span>Base</span>
                <span className={styles.riskValue}>Sample</span>
              </li>
              <li className={styles.riskRow}>
                <span>Pessimistic</span>
                <span className={styles.riskValue}>Sample</span>
              </li>
            </ul>
            <span className={styles.pendingTag}>Illustrative</span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll order={1}>
          <WebSectionHeader
            eyebrow={scenarios.eyebrow.text}
            title={scenarios.title.text}
            rule
          />
          <p className={styles.bodyText}>{scenarios.body.text}</p>
          <ul
            className={styles.authorityList}
            style={{ marginBlockStart: 'var(--sk-space-24)' }}
          >
            {scenarios.items.map((item) => (
              <li key={item.title.text} className={styles.check}>
                <span className={styles.checkMark} aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong>{item.title.text}.</strong> {item.body.text}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- 10. AUTHORITY (navy) ------------------------------------------------- */

export function AuthorityBand() {
  return (
    <WebSection surface="navySoft" id="sarah">
      <div className={styles.authorityGrid}>
        <RevealOnScroll>
          <div className={styles.portraitFrame}>
            {/*
              AUTH-SK-002 — authentic identity reference, colour frontal.
              The register marks it `PRIMARY` for identity use. At 400×400 it
              is only large enough for this contained frame, never for a hero.
            */}
            <Image
              src={portrait}
              alt={authority.imageAlt.text}
              className={styles.portraitImage}
              sizes="(max-width: 767px) 100vw, 30vw"
              placeholder="blur"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll order={1}>
          <WebSectionHeader
            eyebrow={authority.eyebrow.text}
            title={authority.title.text}
            rule
          />
          <p className={styles.bodyText} style={{ color: 'var(--sk-web-muted-on-dark)' }}>
            {authority.body.text}
          </p>

          <ul className={styles.authorityList} style={{ marginBlockStart: 'var(--sk-space-24)' }}>
            {authority.points.map((point) => (
              <li key={point.text} className={styles.authorityItem}>
                <span aria-hidden="true" style={{ color: 'var(--sk-web-gold-on-dark)' }}>
                  ✓
                </span>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>

          <ul className={styles.limits} style={{ marginBlockStart: 'var(--sk-space-24)' }}>
            {authority.limits.map((limit) => (
              <li key={limit.text} className={styles.limit}>
                {limit.text}
              </li>
            ))}
            <li className={styles.limit}>{authority.bioPending.text}</li>
          </ul>

          <div style={{ marginBlockStart: 'var(--sk-space-24)' }}>
            <WebButton variant="secondary" onDark arrow>
              {authority.cta.text}
            </WebButton>
          </div>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- 11. CASES ------------------------------------------------------------ */

export function CasesBand() {
  return (
    <WebSection surface="ivory">
      <WebSectionHeader
        eyebrow={cases.eyebrow.text}
        title={cases.title.text}
        subtitle={cases.subtitle.text}
        centered
        rule
      />
      <div className={styles.cardGrid3}>
        {cases.items.map((item, index) => (
          <RevealOnScroll
            key={item.id}
            order={index}
            className={`${styles.card} ${styles.casePlaceholder}`}
          >
            <p className={styles.cardMeta}>{item.assetType.text}</p>
            <span className={styles.pendingTag}>{item.title.text}</span>
            <p className={styles.cardText}>{item.body.text}</p>
            <div className={styles.caseFigure}>
              <span className={styles.cardText}>Result</span>
              <span
                className={styles.caseWithheld}
                role="img"
                aria-label="Figure withheld: no case result is approved for publication"
              />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

/* --- 12. JOURNEY CHAIN ---------------------------------------------------- */

export function JourneyBand() {
  return (
    <WebSection surface="soft" tight>
      <WebSectionHeader eyebrow={journey.eyebrow.text} title={journey.title.text} centered />
      <ol className={styles.chain}>
        {journey.steps.map((step, index) => (
          <RevealOnScroll key={step.title.text} as="li" order={index} className={styles.chainItem}>
            <span className={styles.chip} aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <p className={styles.chainLabel}>{step.title.text}</p>
              <p className={styles.cardText}>{step.body.text}</p>
            </div>
          </RevealOnScroll>
        ))}
      </ol>
    </WebSection>
  );
}

/* --- 14. FINAL CTA (navy) ------------------------------------------------- */

export function FinalCtaBand() {
  return (
    <WebSection surface="navy">
      <RevealOnScroll className={styles.ctaInner}>
        <WebSectionHeader
          eyebrow={finalCta.eyebrow.text}
          title={finalCta.title.text}
          subtitle={finalCta.body.text}
          centered
          rule
        />
        <div className={styles.ctaActions}>
          <WebButton variant="primary" onDark arrow>
            {finalCta.primaryCta.text}
          </WebButton>
          <WebButton variant="secondary" onDark>
            {finalCta.secondaryCta.text}
          </WebButton>
        </div>
        <p className={styles.ctaNote}>{finalCta.note.text}</p>
      </RevealOnScroll>
    </WebSection>
  );
}

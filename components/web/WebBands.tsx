import Image from 'next/image';
import { Fragment } from 'react';
import { WebSection, WebSectionHeader } from './WebSection';
import { WebButton } from './WebButton';
import { Icon, type IconName } from './icons/Icon';
import { TerritoryVisual } from './TerritoryVisual';
import { APPROVED_MEDIA, type ApprovedMedia } from '@/lib/media/approved-media';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import {
  SampleColumnChart,
  SampleDistribution,
  SampleScenarios,
  SampleSeasonality,
} from './SampleChart';
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
  trustScript,
  trustStrip,
} from '@/content/en/investment';
import { isPublishable } from '@/lib/content/claims';
import styles from './WebBands.module.css';

/**
 * PHASE 2E — approved imagery per asset card.
 *
 * `land` and `commercial` are absent on purpose: no image in the approved 1–8
 * block depicts a plot or a commercial asset, and borrowing a residential
 * photograph for them would misrepresent the category. Those cards keep the
 * schematic and are listed in `PENDING_MEDIA_SLOTS`.
 */
const ASSET_MEDIA: Partial<Record<string, ApprovedMedia>> = {
  residential: APPROVED_MEDIA.assetResidential,
  redevelopment: APPROVED_MEDIA.assetArchitecture,
};

/* --- TRUST STRIP ---------------------------------------------------------- */

export function TrustBand() {
  return (
    <WebSection surface="soft" tight>
      <div className={styles.trustBand}>
        <div className={styles.trustGrid}>
          {trustStrip.map((item, index) => (
            <RevealOnScroll key={item.value.text} order={index} className={styles.trustItem}>
              <Icon name={item.icon as IconName} size="lg" className={styles.trustIcon} />
              <div>
                <p className={styles.trustValue}>
                  {item.value.text}
                  {/* A pending figure carries a small mark, not a loud badge. */}
                  {!isPublishable(item.value) ? (
                    <span
                      className={styles.pendingDot}
                      role="img"
                      aria-label="figure pending approval"
                    />
                  ) : null}
                </p>
                <p className={styles.trustNote}>{item.note.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll order={2}>
          <p className={styles.script}>{trustScript.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- WHY WE EXIST + OBJECTIONS -------------------------------------------- */

export function ApproachBand() {
  return (
    <WebSection surface="ivory" id="services">
      <div className={styles.splitWide}>
        <div>
          <WebSectionHeader eyebrow={approach.eyebrow.text} title={approach.title.text} rule />
          <RevealOnScroll order={1} className={styles.stack16}>
            {approach.body.map((paragraph) => (
              <p key={paragraph.text} className={styles.bodyText}>
                {paragraph.text}
              </p>
            ))}
          </RevealOnScroll>
        </div>

        <RevealOnScroll order={1}>
          <TerritoryVisual
            variant="coast"
            label={approach.territoryLabel.text}
            tone="navy"
            media={APPROVED_MEDIA.processAnalysis}
            sizes="(max-width: 1023px) 100vw, 40vw"
            unveil
          />
          <p className={styles.script} style={{ marginBlockStart: 'var(--sk-space-16)' }}>
            {approach.territoryScript.text}
          </p>
        </RevealOnScroll>
      </div>

      <ul className={styles.objections}>
        {approach.objections.map((objection, index) => (
          <RevealOnScroll
            key={objection.title.text}
            as="li"
            order={index % 3}
            className={styles.objection}
          >
            <Icon name={objection.icon as IconName} className={styles.objectionIcon} />
            <div>
              <span className={styles.objectionIndex}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.objectionTitle}>{objection.title.text}</h3>
              <p className={styles.cardText}>{objection.body.text}</p>
            </div>
          </RevealOnScroll>
        ))}
      </ul>
    </WebSection>
  );
}

/* --- DECISION DOORS -------------------------------------------------------- */

export function DoorsBand() {
  return (
    <WebSection surface="white">
      <WebSectionHeader eyebrow={doors.eyebrow.text} title={doors.title.text} centered rule />
      <div className={styles.grid3}>
        {doors.items.map((door, index) => (
          <RevealOnScroll key={door.id} order={index} className={styles.mediaCard}>
            <div className={styles.mediaCardMedia}>
              <TerritoryVisual variant={door.visual} tone="navy" />
            </div>
            <div className={styles.mediaCardBody}>
              <p className={styles.cardEyebrow}>{door.eyebrow.text}</p>
              <h3 className={styles.cardTitle}>{door.title.text}</h3>
              <p className={styles.cardText}>{door.body.text}</p>
              <ul className={styles.checks}>
                {door.points.map((point) => (
                  <li key={point.text} className={styles.check}>
                    <Icon name="check" size="sm" className={styles.checkIcon} />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.cardFoot}>
                <WebButton variant="primary" arrow>
                  {door.cta.text}
                </WebButton>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <RevealOnScroll order={3} style={{ marginBlockStart: 'var(--sk-space-32)' }}>
        <p className={styles.script}>{doors.script.text}</p>
      </RevealOnScroll>
    </WebSection>
  );
}

/* --- ASSET TYPES ----------------------------------------------------------- */

export function AssetTypesBand() {
  return (
    <WebSection surface="ivory" id="assets">
      <WebSectionHeader
        eyebrow={assetTypes.eyebrow.text}
        title={assetTypes.title.text}
        centered
        rule
      />
      <div className={styles.grid4}>
        {assetTypes.items.map((item, index) => (
          <RevealOnScroll key={item.id} order={index} className={styles.mediaCard}>
            <div className={styles.mediaCardMedia}>
              {/*
                PHASE 2E — approved property imagery (inventory §11, item 2).
                Only Residential and Redevelopment are filled: no approved
                image depicts land or a commercial asset, so those two cards
                keep the schematic rather than borrow a misleading photograph.
              */}
              <TerritoryVisual
                variant={item.visual}
                tone="navy"
                media={ASSET_MEDIA[item.id]}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
              />
              <span className={styles.cardIcon}>
                <Icon name={item.icon} />
              </span>
            </div>
            <div className={styles.mediaCardBody}>
              <h3 className={styles.cardTitle}>{item.title.text}</h3>
              <p className={styles.cardText}>{item.body.text}</p>

              <div className={styles.factRow}>
                <p className={styles.factLabel}>Analysed</p>
                <p className={styles.factValue}>{item.analysed.text}</p>
              </div>
              <div className={styles.factRow}>
                <p className={styles.factLabel}>Main risk</p>
                <p className={styles.factValue}>{item.risk.text}</p>
              </div>
              <div className={styles.factRow}>
                <p className={styles.factLabel}>Deliverable</p>
                <p className={styles.factValue}>{item.deliverable.text}</p>
              </div>

              <div className={styles.cardFoot}>
                <WebButton variant="quiet" arrow>
                  {item.cta.text}
                </WebButton>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

/* --- PROCESS ---------------------------------------------------------------- */

export function ProcessBand() {
  return (
    <WebSection surface="soft" id="process">
      <WebSectionHeader eyebrow={process.eyebrow.text} title={process.title.text} centered rule />
      <ol className={styles.timeline}>
        {process.steps.map((step, index) => (
          <RevealOnScroll
            key={step.id}
            as="li"
            order={index}
            className={styles.step}
            style={{ ['--sk-stage-index' as string]: index }}
          >
            <span className={styles.stepNumber} aria-hidden="true">
              {index + 1}
            </span>
            <span className={styles.stepIcon}>
              <Icon name={step.icon} />
            </span>
            <h3 className={styles.stepTitle}>{step.title.text}</h3>
            <p className={styles.cardText}>{step.body.text}</p>
            <p className={styles.stepDeliverable}>
              <Icon name="document" size="sm" className={styles.stepDeliverableIcon} />
              <span>{step.deliverable.text}</span>
            </p>
          </RevealOnScroll>
        ))}
      </ol>
      <RevealOnScroll order={2} style={{ marginBlockStart: 'var(--sk-space-32)' }}>
        <p className={styles.script}>{process.script.text}</p>
      </RevealOnScroll>
    </WebSection>
  );
}

/* --- REPORT PREVIEW (navy) --------------------------------------------------- */

const REPORT_CHARTS: Record<string, React.ReactNode> = {
  'cash-flow': <SampleColumnChart label="Annual cash flows" />,
  distribution: <SampleDistribution label="Distribution of outcomes" />,
  seasonality: <SampleSeasonality label="Income seasonality" />,
};

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

      <div className={styles.reportLayout}>
        {/* Panel 1 — the investment summary the template leads with. */}
        <RevealOnScroll className={styles.reportCard}>
          <div className={styles.reportCardHead}>
            <h3 className={styles.reportCardTitle}>{report.summary.title.text}</h3>
            <p className={styles.reportCardNote}>{report.summary.property.text}</p>
          </div>

          <div className={styles.summaryVisual}>
            <TerritoryVisual
              variant="built"
              tone="sand"
              media={APPROVED_MEDIA.assetPlan}
              sizes="(max-width: 767px) 100vw, 20vw"
            />
          </div>

          <dl className={styles.summaryRows}>
            {report.summary.rows.map((row) => (
              <div key={row.label.text} className={styles.summaryRow}>
                <dt className={styles.summaryLabel}>{row.label.text}</dt>
                <dd className={styles.summaryValue}>{row.value}</dd>
              </div>
            ))}
            <div className={styles.summaryRow}>
              <dt className={styles.summaryLabel}>{report.summary.status.text}</dt>
              <dd className={styles.summaryValue}>{report.summary.statusValue.text}</dd>
            </div>
          </dl>

          <span className={styles.illustrativeTag}>Illustrative</span>
        </RevealOnScroll>

        {/* Panels 2–5 */}
        {report.cards.map((card, index) => (
          <RevealOnScroll key={card.id} order={index + 1} className={styles.reportCard}>
            <div className={styles.reportCardHead}>
              <h3 className={styles.reportCardTitle}>{card.title.text}</h3>
              <p className={styles.reportCardNote}>{card.note.text}</p>
            </div>

            {card.id === 'risk' ? (
              <ul className={styles.riskList}>
                {report.risks.map((risk) => (
                  <li key={risk.label.text} className={styles.riskRow}>
                    <span>{risk.label.text}</span>
                    <span className={styles.riskValue}>{risk.value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              REPORT_CHARTS[card.id]
            )}

            <span className={styles.illustrativeTag}>Illustrative</span>
          </RevealOnScroll>
        ))}
      </div>

      <div className={styles.reportAside}>
        <ul className={styles.deliverables}>
          {report.deliverables.map((deliverable) => (
            <li key={deliverable.text.text} className={styles.deliverable}>
              <Icon name={deliverable.icon} size="sm" className={styles.deliverableIcon} />
              <span>{deliverable.text.text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.reportCtaBlock}>
          <WebButton variant="primary" onDark arrow>
            {report.cta.text}
          </WebButton>
          <p className={styles.ctaNote}>{report.ctaNote.text}</p>
        </div>
      </div>
    </WebSection>
  );
}

/* --- SCENARIOS ---------------------------------------------------------------- */

export function ScenariosBand() {
  return (
    <WebSection surface="ivory">
      <div className={styles.split}>
        <RevealOnScroll className={styles.chartCard}>
          <h3 className={styles.reportCardTitle}>{scenarios.chartTitle.text}</h3>
          <SampleScenarios label="Optimistic, base and pessimistic scenarios" />
          <ul className={styles.legend}>
            {scenarios.legend.map((entry) => (
              <li key={entry.key} className={styles.legendItem}>
                <span
                  className={`${styles.legendSwatch} ${
                    entry.key === 'optimistic'
                      ? styles.legendOptimistic
                      : entry.key === 'base'
                        ? styles.legendBase
                        : styles.legendPessimistic
                  }`}
                  aria-hidden="true"
                />
                <span>{entry.label.text}</span>
              </li>
            ))}
          </ul>
          <span className={styles.illustrativeTag}>Illustrative</span>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={styles.stack24}>
          <WebSectionHeader eyebrow={scenarios.eyebrow.text} title={scenarios.title.text} rule />
          <p className={styles.bodyText}>{scenarios.body.text}</p>

          <ul className={styles.scenarioList}>
            {scenarios.items.map((item) => (
              <li key={item.title.text} className={styles.scenarioItem}>
                <Icon name={item.icon} className={styles.scenarioIcon} />
                <div>
                  <p className={styles.scenarioTitle}>{item.title.text}</p>
                  <p className={styles.cardText}>{item.body.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.script}>{scenarios.script.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- AUTHORITY (navy) ---------------------------------------------------------- */

export function AuthorityBand() {
  const authorityMedia = APPROVED_MEDIA.authorityEditorial;

  return (
    <WebSection surface="navySoft" id="sarah">
      <div className={styles.authorityGrid}>
        <RevealOnScroll variant="unveil">
          <div className={styles.portraitFrame}>
            {/*
              Approved 2026-09-22: `IMAGES/sarahkaterina_home.png`, the only
              asset with that exact base name. It replaces AUTH-SK-002 here.
              No crop is applied — Sarah is seated with both hands in frame, so
              the frame is 3:2 rather than portrait, matching every other media
              frame on this page.
            */}
            <Image
              src={authorityMedia.src}
              alt={authorityMedia.alt}
              className={styles.portraitImage}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              style={{ objectPosition: authorityMedia.focal }}
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll order={1}>
          <WebSectionHeader eyebrow={authority.eyebrow.text} title={authority.title.text} rule />

          <div className={styles.authorityBody}>
            <div className={styles.stack24}>
              <p className={`${styles.bodyText} ${styles.bodyOnDark}`}>{authority.body.text}</p>
              <div>
                <WebButton variant="primary" onDark arrow>
                  {authority.cta.text}
                </WebButton>
              </div>
            </div>

            <div className={styles.stack24}>
              <ul className={styles.authorityList}>
                {authority.points.map((point) => (
                  <li key={point.text.text} className={styles.authorityItem}>
                    <span className={styles.authorityItemIcon}>
                      <Icon name={point.icon} />
                    </span>
                    <span>{point.text.text}</span>
                  </li>
                ))}
              </ul>

              <p className={`${styles.script} ${styles.scriptOnDark}`}>{authority.quote.text}</p>

              {/*
                Reserved slot. The template shows a handwritten signature; no
                signature asset exists and one may not be drawn or typeset.
              */}
              <div className={styles.signatureSlot}>
                <p className={styles.signatureNote}>{authority.signaturePending.text}</p>
              </div>
            </div>
          </div>

          <ul className={styles.limits}>
            {authority.limits.map((limit) => (
              <li key={limit.text} className={styles.limit}>
                {limit.text}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- CASES ---------------------------------------------------------------------- */

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
      <div className={styles.grid3}>
        {cases.items.map((item, index) => (
          <RevealOnScroll
            key={item.id}
            order={index}
            className={`${styles.mediaCard} ${styles.caseCard}`}
          >
            <div className={styles.mediaCardMedia}>
              <TerritoryVisual variant={item.visual} tone="navy" />
              {/* The asset type is the card's strongest available fact, so it
                  leads, over the visual, the way a real case would. */}
              <span className={styles.caseType}>{item.assetType.text}</span>
            </div>

            <div className={styles.mediaCardBody}>
              <div className={styles.caseHeadRow}>
                <h3 className={styles.cardTitle}>{item.metric.text}</h3>
                <span className={styles.caseIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <dl className={styles.caseFacts}>
                <div className={styles.caseFact}>
                  <dt>
                    <Icon name="pin" size="sm" />
                    Location
                  </dt>
                  <dd>{cases.locationPending.text}</dd>
                </div>
                <div className={styles.caseFact}>
                  <dt>
                    <Icon name="analysis" size="sm" />
                    Decision
                  </dt>
                  <dd>{item.decision.text}</dd>
                </div>
                <div className={styles.caseFact}>
                  <dt>
                    <Icon name="report" size="sm" />
                    Result
                  </dt>
                  <dd>
                    {/* A withheld rule, never a fabricated number. */}
                    <span
                      className={styles.caseWithheld}
                      role="img"
                      aria-label="Result withheld pending client permission and verification"
                    />
                  </dd>
                </div>
                <div className={styles.caseFact}>
                  <dt>
                    <Icon name="clock" size="sm" />
                    Period
                  </dt>
                  <dd>{item.period.text}</dd>
                </div>
              </dl>

              <p className={styles.casePermission}>
                <Icon name="check" size="sm" />
                <span>{cases.permissionPending.text}</span>
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <div style={{ marginBlockStart: 'var(--sk-space-32)', textAlign: 'center' }}>
        <WebButton variant="secondary" arrow>
          {cases.cta.text}
        </WebButton>
      </div>
    </WebSection>
  );
}

/* --- JOURNEY CHAIN --------------------------------------------------------------- */

export function JourneyBand() {
  return (
    <WebSection surface="soft" tight>
      <WebSectionHeader eyebrow={journey.eyebrow.text} title={journey.title.text} centered />
      <ol className={styles.chain}>
        {journey.steps.map((step, index) => (
          <Fragment key={step.title.text}>
            <RevealOnScroll as="li" order={index} className={styles.chainItem}>
              <span className={styles.chainIcon}>
                <Icon name={step.icon} />
              </span>
              <div>
                <p className={styles.chainLabel}>{step.title.text}</p>
                <p className={styles.cardText}>{step.body.text}</p>
              </div>
            </RevealOnScroll>
            {index < journey.steps.length - 1 ? (
              <li key={`${step.title.text}-arrow`} className={styles.chainArrow} aria-hidden="true">
                <Icon name="arrow" size="sm" />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
      <RevealOnScroll order={2} style={{ marginBlockStart: 'var(--sk-space-24)' }}>
        <p className={styles.script}>{journey.script.text}</p>
      </RevealOnScroll>
    </WebSection>
  );
}

/* --- FINAL CTA (navy) -------------------------------------------------------------- */

export function FinalCtaBand() {
  return (
    <WebSection surface="navy" id="contact">
      <div className={styles.ctaGrid}>
        <RevealOnScroll className={styles.stack24}>
          <WebSectionHeader
            eyebrow={finalCta.eyebrow.text}
            title={finalCta.title.text}
            subtitle={finalCta.body.text}
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

        <RevealOnScroll order={1}>
          <TerritoryVisual
            variant="coast"
            label="Costa Blanca"
            tone="navy"
            media={APPROVED_MEDIA.territoryContact}
            sizes="(max-width: 1023px) 100vw, 40vw"
            unveil
          />
          <p
            className={`${styles.script} ${styles.scriptOnDark}`}
            style={{ marginBlockStart: 'var(--sk-space-16)' }}
          >
            {finalCta.script.text}
          </p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

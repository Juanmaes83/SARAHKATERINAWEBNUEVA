import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import {
  JOURNEY,
  SERVICE_ROUTES,
  SERVICE_STAGES,
  STAGE_ORDER,
  TEAM_LAYER,
  type ServiceKey,
} from '@/content/en/service-journey';
import { profiles } from '@/content/en/team';
import { WebLinkButton } from './WebButton';
import { WebSection, WebSectionHeader } from './WebSection';
import styles from './ServiceJourney.module.css';

export interface ServiceJourneyProps {
  /** The landing that renders the band. Selects its entry in `JOURNEY`. */
  readonly page: ServiceKey;
}

/**
 * CONNECTED SERVICE JOURNEY — Phase 2G.
 *
 * One band, rendered by all four preview landings from their own entry in
 * `content/en/service-journey.ts`. It is not an "other services" grid: the
 * three advisory services always appear in the order a buyer meets them
 * (opportunity → purchase → tax and ownership), the page's own stage is
 * marked as the reader's position, and each other stage says why it is the
 * next step *from here* before offering its link.
 *
 * On the three service pages a team layer follows: the four named
 * responsibilities, read from `content/en/team.ts` (never restated), and one
 * link to the team page. The team page renders the band without it and
 * without a current stage — there it is the place to choose where to start.
 *
 * Server-rendered, plain links to real routes: works without JavaScript, and
 * nothing is tracked (only Buyer System exits are).
 */
export function ServiceJourney({ page }: ServiceJourneyProps) {
  const bridge = JOURNEY[page];
  const steps = new Map(bridge.steps.map((step) => [step.to, step]));

  return (
    <WebSection surface="ivory" id="next-step" className={styles.section}>
      <WebSectionHeader
        eyebrow={bridge.eyebrow}
        title={bridge.title.text}
        subtitle={bridge.intro.text}
        rule
      />

      <ol className={styles.route} data-choice={bridge.current === null ? 'true' : undefined}>
        {STAGE_ORDER.map((key, index) => {
          const stage = SERVICE_STAGES[key];
          const step = steps.get(key);
          const current = bridge.current === key;

          return (
            <RevealOnScroll
              as="li"
              key={key}
              order={index}
              className={styles.station}
              data-current={current ? 'true' : undefined}
              aria-current={current ? 'step' : undefined}
              style={{ ['--sk-stage-index' as string]: index }}
            >
              <span className={styles.marker} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className={styles.stage}>{stage.stage}</p>
              <h3 className={styles.name}>{stage.name}</h3>
              {current ? (
                <>
                  <p className={styles.question}>{stage.question.text}</p>
                  <p className={styles.here}>
                    <span className={styles.hereMark} aria-hidden="true" />
                    You are here
                  </p>
                </>
              ) : step ? (
                <>
                  <p className={styles.reason}>{step.reason.text}</p>
                  <WebLinkButton
                    href={SERVICE_ROUTES[key]}
                    variant="quiet"
                    arrow
                    className={styles.link}
                  >
                    {step.cta}
                  </WebLinkButton>
                </>
              ) : null}
            </RevealOnScroll>
          );
        })}
      </ol>

      {bridge.showTeam ? (
        <RevealOnScroll className={styles.team}>
          <div className={styles.teamHead}>
            <h3 className={styles.teamTitle}>{TEAM_LAYER.title}</h3>
            <p className={styles.teamBody}>{TEAM_LAYER.body.text}</p>
            <WebLinkButton href={TEAM_LAYER.href} variant="secondary" arrow>
              {TEAM_LAYER.cta}
            </WebLinkButton>
          </div>
          <ul className={styles.people}>
            {profiles.map((person) => (
              <li key={person.name} className={styles.person}>
                <span className={styles.personName}>{person.name}</span>
                <span className={styles.personArea}>{person.area}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      ) : null}
    </WebSection>
  );
}

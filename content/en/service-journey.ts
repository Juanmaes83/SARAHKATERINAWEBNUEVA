import { claim, type Claim } from '@/lib/content/claims';
import type { BuyerSystemExperienceKey } from '@/lib/buyer-system/links';

/**
 * CONNECTED SERVICE JOURNEY — Phase 2G (docs/phase-2g-connected-service-journey.md).
 *
 * One source for how the four preview landings lead into one another. Every
 * landing renders the same `ServiceJourney` band from its own entry below, so
 * the routes, the order of the stages and the team layer cannot drift apart
 * between pages.
 *
 * Routes are the real App Router paths under `/preview`. Nothing here links to
 * `app/page.tsx` (the Foundation page, not a commercial Home) and nothing names
 * a held service.
 *
 * Every sentence is new connective copy: `proposal`, pending Sarah's review.
 * None states a figure, a period, a rate or an outcome.
 */

const SOURCE = 'Phase 2G connected journey proposal, 2026-09-24';

export const SERVICE_ROUTES = {
  investment: '/preview/investment',
  purchase: '/preview/property-purchase',
  tax: '/preview/tax-advisory',
  team: '/preview/team',
} as const;

export type ServiceKey = keyof typeof SERVICE_ROUTES;
/** The three advisory services, in the order a buyer meets them. */
export type AdvisoryServiceKey = Exclude<ServiceKey, 'team'>;

export const STAGE_ORDER: readonly AdvisoryServiceKey[] = ['investment', 'purchase', 'tax'];

export interface ServiceStage {
  /** Where the buyer is in the decision. */
  readonly stage: string;
  /** The landing's own service name. */
  readonly name: string;
  /** The buyer's question this service answers. */
  readonly question: Claim;
}

export const SERVICE_STAGES: Record<AdvisoryServiceKey, ServiceStage> = {
  investment: {
    stage: 'The opportunity',
    name: 'Investment',
    question: claim({ text: 'Is it worth buying?', status: 'proposal', source: SOURCE }),
  },
  purchase: {
    stage: 'The purchase',
    name: 'Property Purchase',
    question: claim({ text: 'How do I buy it well?', status: 'proposal', source: SOURCE }),
  },
  tax: {
    stage: 'Tax and ownership',
    name: 'Tax Advisory',
    question: claim({
      text: 'What does it mean to buy and own it in Spain?',
      status: 'proposal',
      source: SOURCE,
    }),
  },
};

export interface JourneyStep {
  readonly to: AdvisoryServiceKey;
  /** Why this is the next step from the page the reader is on. */
  readonly reason: Claim;
  readonly cta: string;
}

export interface JourneyBridge {
  readonly eyebrow: string;
  readonly title: Claim;
  readonly intro: Claim;
  /** The page's own stage; `null` on Team, which belongs to every stage. */
  readonly current: AdvisoryServiceKey | null;
  readonly steps: readonly JourneyStep[];
  /** Team layer: shown on the service pages, omitted on Team itself. */
  readonly showTeam: boolean;
}

export const JOURNEY: Record<ServiceKey, JourneyBridge> = {
  investment: {
    eyebrow: 'Your next step',
    title: claim({
      text: 'An opportunity is only as good as the purchase that follows it.',
      status: 'proposal',
      source: SOURCE,
    }),
    intro: claim({
      text: 'Once the analysis holds, the decision moves on: first to how the property is bought, then to what it means to own it.',
      status: 'proposal',
      source: SOURCE,
    }),
    current: 'investment',
    steps: [
      {
        to: 'purchase',
        reason: claim({
          text: 'When the numbers hold, the risk moves into the file: checks, negotiation and every step up to the keys.',
          status: 'proposal',
          source: SOURCE,
        }),
        cta: 'Continue to Property Purchase',
      },
      {
        to: 'tax',
        reason: claim({
          text: 'Purchase tax and the obligations of owning belong inside the analysis, before you commit rather than after.',
          status: 'proposal',
          source: SOURCE,
          review: 'tax',
        }),
        cta: 'Continue to Tax Advisory',
      },
    ],
    showTeam: true,
  },
  purchase: {
    eyebrow: 'Your next step',
    title: claim({
      text: 'Buying well is one half of the decision. Owning well is the other.',
      status: 'proposal',
      source: SOURCE,
    }),
    intro: claim({
      text: 'The purchase file connects to what came before it and to what follows the keys.',
      status: 'proposal',
      source: SOURCE,
    }),
    current: 'purchase',
    steps: [
      {
        to: 'investment',
        reason: claim({
          text: 'If the property must also work as an investment, test the scenario before you negotiate, not after.',
          status: 'proposal',
          source: SOURCE,
        }),
        cta: 'Review it as an investment',
      },
      {
        to: 'tax',
        reason: claim({
          text: 'What you pay to buy and what you will file as an owner are both shaped by decisions taken before signing.',
          status: 'proposal',
          source: SOURCE,
          review: 'tax',
        }),
        cta: 'Continue to Tax Advisory',
      },
    ],
    showTeam: true,
  },
  tax: {
    eyebrow: 'Your next step',
    title: claim({
      text: 'Tax questions start before the purchase and continue after it.',
      status: 'proposal',
      source: SOURCE,
      review: 'tax',
    }),
    intro: claim({
      text: 'Where you start depends on where you are: still weighing a property, about to buy one, or already an owner.',
      status: 'proposal',
      source: SOURCE,
    }),
    current: 'tax',
    steps: [
      {
        to: 'investment',
        reason: claim({
          text: 'If the property is meant to earn or to grow, the tax picture belongs inside the investment analysis.',
          status: 'proposal',
          source: SOURCE,
        }),
        cta: 'Go to Investment',
      },
      {
        to: 'purchase',
        reason: claim({
          text: 'If you have not bought yet, the purchase file is where tax exposure is prevented rather than discovered.',
          status: 'proposal',
          source: SOURCE,
          review: 'tax',
        }),
        cta: 'Go to Property Purchase',
      },
    ],
    showTeam: true,
  },
  team: {
    eyebrow: 'Where to start',
    title: claim({
      text: 'Choose where your decision starts.',
      status: 'proposal',
      source: SOURCE,
    }),
    intro: claim({
      text: 'The same team carries all three. Start with the question that is on your mind today.',
      status: 'proposal',
      source: SOURCE,
    }),
    current: null,
    steps: [
      {
        to: 'investment',
        reason: claim({
          text: 'You are weighing an opportunity and want it analysed before you commit to it.',
          status: 'proposal',
          source: SOURCE,
        }),
        cta: 'Start with Investment',
      },
      {
        to: 'purchase',
        reason: claim({
          text: 'You have found, or are close to, the property and want the purchase handled from your side.',
          status: 'proposal',
          source: SOURCE,
        }),
        cta: 'Start with Property Purchase',
      },
      {
        to: 'tax',
        reason: claim({
          text: 'You are buying or already own, and want purchase tax and owner obligations put in order.',
          status: 'proposal',
          source: SOURCE,
          review: 'tax',
        }),
        cta: 'Start with Tax Advisory',
      },
    ],
    showTeam: false,
  },
};

/** Team layer heading on the service pages. The people come from content/en/team.ts. */
export const TEAM_LAYER = {
  title: 'Who carries each part',
  body: claim({
    text: 'Named responsibilities, one file. The full roles, and where outside professionals verify, are on the team page.',
    status: 'proposal',
    source: SOURCE,
  }),
  cta: 'Meet the team',
  href: `${SERVICE_ROUTES.team}#team`,
} as const;

/**
 * Buyer System moments beyond the Investment tools band and the two purchase
 * ribbons. One entry: Tax Advisory, directly after the tax calendar
 * (docs/buyer-system-integration.md, placement table).
 */
export interface ToolMoment {
  readonly key: BuyerSystemExperienceKey;
  /** Why the tool belongs at this point of the page. */
  readonly moment: Claim;
}

export const TAX_CALENDAR_TOOL: ToolMoment = {
  key: 'purchaseTax',
  moment: claim({
    text: 'One line of that calendar is paid once, on purchase. If you are still buying, look at it for your own case before you sign.',
    status: 'proposal',
    source: SOURCE,
    review: 'tax',
  }),
};

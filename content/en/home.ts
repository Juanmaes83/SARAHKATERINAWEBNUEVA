import { resolveEntryPoint } from '@/lib/buyer-system/links';
import { APPROVED_PROMISE, claim, type Claim } from '@/lib/content/claims';

const HOME_BRIEF = 'Home editorial proposal, session brief 2026-09-29';
const SARAH_REVIEW = "Sarah's review (REVISION WEB. Team.docx), accepted by Juanma 2026-09-28";
const INDEPENDENCE_SOURCE = 'strategy/master/decisions-log.md, 2026-07-27';
const CLAIM_REGISTER = 'brand-system/verbal/claim-register.csv, CL-004';

export const seo = {
  title: 'Independent buyer-side guidance in Spain',
  description:
    'Buy a home, invest or get tax clarity in Spain with independent buyer-side guidance from Sarah Katerina.',
} as const;

export const hero = {
  eyebrow: 'Independent buyer-side advisory · Spain',
  title: APPROVED_PROMISE,
  lead: claim({
    text: 'See the property, the full cost and the tax questions together — before you commit.',
    status: 'proposal',
    source: HOME_BRIEF,
    note: 'Home-specific subhead for Sarah and Juanma to review.',
  }),
  primaryCta: 'Find your starting point',
  secondaryCta: 'Use Buyer Tools',
  filmLabel: 'From possibility to decision',
  filmCaption: claim({
    text: 'Illustrative concept film. It does not promise buildability, permission, timing, budget, return or delivery.',
    status: 'confirmed',
    source: 'docs/phase-2g-connected-service-journey.md §2.2 and current Home brief',
  }),
} as const;

/**
 * "On your side" — the Home's opening statement. It restates the confirmed
 * independence decision in positive terms: who Sarah works for, never a
 * gesture against anyone else at the table (owner direction, 2026-09-29).
 */
export const side = {
  eyebrow: 'Whose side?',
  statement: claim({
    text: 'Sarah is paid by one side of the table: yours.',
    status: 'proposal',
    source: `${HOME_BRIEF}; restates ${INDEPENDENCE_SOURCE}`,
  }),
} as const;

/**
 * WHAT BRINGS YOU TO SPAIN? — service discovery (spec 2026-09-29).
 *
 * The visitor names their intention in their own words; the banner answers
 * with the service, its proposition and the next step. Three needs only:
 * Team is authority, not a need, and Property Management is on HOLD.
 *
 * Every proposition is taken from its own landing, shortened, never invented:
 *  - buy     → property-purchase hero title + accent, Sarah-approved (2H);
 *  - invest  → investment hero title and lead;
 *  - tax     → tax-advisory hero heading and lead.
 */
const LANDING = (page: string) => `content/en/${page}.ts hero, condensed for the Home 2026-09-29`;

export interface DiscoveryState {
  readonly id: 'buy' | 'invest' | 'tax';
  readonly number: string;
  readonly userNeed: string;
  readonly serviceLabel: string;
  readonly proposition: Claim;
  readonly supportingCopy: Claim;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly media: 'homeDiscoveryBuy' | 'homeDiscoveryInvest' | 'advisorClientOne';
  /** Visible, client-facing disclosure printed on the banner under the image. */
  readonly mediaNote: string;
}

export const discovery = {
  eyebrow: 'Your starting point',
  title: claim({ text: 'What brings you to Spain?', status: 'proposal', source: HOME_BRIEF }),
  intro: claim({
    text: 'Choose the sentence that sounds like you. Sarah turns it into the right kind of guidance.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  selectorLabel: 'What brings you to Spain?',
  defaultState: 'buy' as const,
  states: [
    {
      id: 'buy',
      number: '01',
      userNeed: 'I want to buy a home.',
      serviceLabel: 'Property Purchase',
      proposition: claim({
        text: 'Buy with peace of mind: we coordinate every step.',
        status: 'confirmed',
        source: 'content/en/property-purchase.ts hero title + accent, Sarah-approved (Phase 2H)',
      }),
      supportingCopy: claim({
        text: 'From the first viewing to the keys, one connected file for international buyers.',
        status: 'proposal',
        source: LANDING('property-purchase'),
      }),
      ctaLabel: 'Start with Property Purchase',
      ctaHref: '/preview/property-purchase',
      media: 'homeDiscoveryBuy',
      mediaNote: 'Editorial illustration',
    },
    {
      id: 'invest',
      number: '02',
      userNeed: 'I want to invest.',
      serviceLabel: 'Investment',
      proposition: claim({
        text: 'Properties. Data. Better decisions.',
        status: 'proposal',
        source: LANDING('investment'),
      }),
      supportingCopy: claim({
        text: 'Financial modelling, due diligence and a tax overlay in one decision report, before the deposit.',
        status: 'proposal',
        source: LANDING('investment'),
      }),
      ctaLabel: 'Start with Investment',
      ctaHref: '/preview/investment',
      media: 'homeDiscoveryInvest',
      mediaNote: 'Illustrative development',
    },
    {
      id: 'tax',
      number: '03',
      userNeed: 'I need tax clarity.',
      serviceLabel: 'Tax Advisory',
      proposition: claim({
        text: 'Spanish taxes, from the inside.',
        status: 'proposal',
        source: LANDING('tax-advisory'),
      }),
      supportingCopy: claim({
        text: 'Clarity for non-resident owners and foreign buyers, so you decide with confidence.',
        status: 'proposal',
        source: LANDING('tax-advisory'),
      }),
      ctaLabel: 'Start with Tax Advisory',
      ctaHref: '/preview/tax-advisory',
      media: 'advisorClientOne',
      mediaNote: 'Editorial illustration',
    },
  ] satisfies readonly DiscoveryState[],
  motionHint: 'The banner is fabric: drag it, or use the arrow keys when it is focused.',
} as const;

export const trust = [
  {
    label: 'Buyer-side',
    value: claim({
      text: 'Paid only by the buyer or client.',
      status: 'confirmed',
      source: INDEPENDENCE_SOURCE,
    }),
  },
  {
    label: 'Independent',
    value: claim({
      text: 'No remuneration from sellers, developers or agencies.',
      status: 'confirmed',
      source: INDEPENDENCE_SOURCE,
    }),
  },
  {
    label: 'Experience',
    value: claim({
      text: "Twenty years inside Spain's Tax Administration, now on your side.",
      status: 'confirmed',
      source: CLAIM_REGISTER,
      note: 'APPROVED_WITH_CONDITION: preserve the factual meaning and normal copy/placement review.',
    }),
  },
] as const;

/**
 * The approved four editorial blocks. The first three are the service
 * chapters that follow the discovery banner (the banner orients; a chapter
 * gives the visual synthesis and leads to its landing). The fourth, Team, is
 * rendered separately as the authority block after the client voices.
 * The former per-chapter "need" lines now live in `discovery.states`.
 */
export const services = {
  items: [
    {
      id: 'property-purchase',
      number: '01',
      label: 'Property Purchase',
      title: 'From first questions to keys, one connected file.',
      body: 'Bring the property checks, purchase costs, paperwork and specialist input into the same decision.',
      href: '/preview/property-purchase',
      cta: 'Explore Property Purchase',
      media: 'assetPlan' as const,
    },
    {
      id: 'investment',
      number: '02',
      label: 'Investment',
      title: 'Test the assumptions before the brochure becomes the plan.',
      body: 'Review the property, downside, costs, tax context and exit thinking as one investment decision.',
      href: '/preview/investment',
      cta: 'Explore Investment',
      media: 'assetResidential' as const,
    },
    {
      id: 'tax-advisory',
      number: '03',
      label: 'Tax Advisory',
      title: 'Understand the ownership picture, not just the day of signing.',
      body: 'Connect purchase tax and owner-stage obligations to the property decision they affect.',
      href: '/preview/tax-advisory',
      cta: 'Explore Tax Advisory',
      media: 'reportInterior' as const,
    },
    {
      id: 'sarah',
      number: '04',
      label: 'Team',
      title: 'Sarah holds the advisory thread together.',
      body: 'She leads the process and works with the appropriate specialist professionals when a case calls for them.',
      href: '/preview/team',
      cta: 'Meet the team',
      media: 'homeAuthority' as const,
    },
  ].map((item) => ({
    ...item,
    title: claim({ text: item.title, status: 'proposal', source: HOME_BRIEF }),
    body:
      item.id === 'sarah'
        ? claim({ text: item.body, status: 'confirmed', source: SARAH_REVIEW })
        : claim({ text: item.body, status: 'proposal', source: HOME_BRIEF }),
    cta: claim({ text: item.cta, status: 'proposal', source: HOME_BRIEF }),
  })),
} as const;

export const process = {
  eyebrow: 'How decisions move',
  title: claim({
    text: 'Objective. Evidence. Next move.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  steps: [
    {
      number: '01',
      title: 'Define what the property must do',
      body: 'Start with the buyer’s objective and the questions that must be answered.',
    },
    {
      number: '02',
      title: 'Make the whole picture visible',
      body: 'Connect evidence, costs, tax context, assumptions and specialist checks.',
    },
    {
      number: '03',
      title: 'Choose the next responsible move',
      body: 'Proceed, ask for more evidence, renegotiate or walk away — never a guaranteed outcome.',
    },
  ].map((step) => ({
    ...step,
    title: claim({ text: step.title, status: 'proposal', source: HOME_BRIEF }),
    body: claim({ text: step.body, status: 'proposal', source: HOME_BRIEF }),
  })),
  boundary: claim({
    text: 'Sarah advises, reviews and coordinates within the agreed scope. Legal, technical, planning, valuation and financing matters stay with the appropriate qualified professionals.',
    status: 'proposal',
    source: 'Service taxonomy and journey master map; Home scope synthesis 2026-09-29',
    review: 'legal',
  }),
} as const;

/**
 * CLIENT VOICES — authorised testimonials.
 *
 * DECISION (Juanma, project owner), 2026-09-29: Juanma confirmed that the quotes,
 * names and details below are approved and authorised by the clients for
 * use. That instruction is the current decision for this repository and
 * supersedes the earlier preview-only treatment (the strategic repository,
 * which is read-only here, still records C-08 / SK-028 as open; it was not
 * modified).
 *
 * Wording and figures: verbatim from the testimonial material supplied in
 * the 2026-09-29 Home brief (the same testimonials verified on the live Home
 * on 2026-08-05). Nothing is reworded, shortened, emphasised or lifted into a
 * headline, statistic or brand claim. No photograph is paired with a quote.
 */
const OWNER_AUTHORISATION =
  'Owner instruction 2026-09-29 (Juanma): client approval and authorisation confirmed';

export const voices = {
  eyebrow: 'In their words',
  title: claim({
    text: 'Three buyers, three decisions made before signing.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  note: claim({
    text: 'Published with each client’s permission. Every purchase is different; these are their experiences, not a promise of results.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  items: [
    {
      id: 'modelo-210-structure',
      quote:
        'The diagnostic flagged a Modelo 210 miscalculation that would have cost me €12,400 over three years. We renegotiated the purchase structure before signing the arras. Best €347 I have spent on this whole purchase.',
      name: 'Pieter van den Berg',
      context: 'Amsterdam, NL · Apartment, Orihuela Costa · 2024',
    },
    {
      id: 'back-year-correction',
      quote:
        'After three years of overpaying because our gestoría copy-pasted the previous filing, Sarah filed a back-year correction and recovered €1,840 from Hacienda. Now she handles Modelo 210 every quarter — €95, plain English, no calls to chase.',
      name: 'James & Sarah Whitfield',
      context: 'Brighton, UK · Villa, Torrevieja · 2025',
    },
    {
      id: 'walked-away',
      quote:
        'I was ready to sign on what looked like a great buy-to-let. The 48-hour analysis showed the net yield was 2.3%, not the 7% the agent had promised. I walked away. Saved a €280,000 mistake.',
      name: 'Hans Schmidt',
      context: 'München, DE · Considering an Alicante apartment · 2025',
    },
  ].map((item) => ({
    id: item.id,
    quote: claim({ text: item.quote, status: 'confirmed', source: OWNER_AUTHORISATION }),
    name: claim({ text: item.name, status: 'confirmed', source: OWNER_AUTHORISATION }),
    context: claim({ text: item.context, status: 'confirmed', source: OWNER_AUTHORISATION }),
  })),
} as const;

export const tools = {
  eyebrow: 'Buyer System',
  title: claim({
    text: 'Start with the numbers you can test now.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  intro: claim({
    text: 'Two verified experiences open in the separate Buyer System. This page sends no personal or financial inputs in the link.',
    status: 'confirmed',
    source: 'docs/buyer-system-integration.md, verified 2026-09-29',
  }),
  purchaseTaxMoment: 'See the tax charged on the purchase itself.',
  realCashMoment: 'See the cash needed beyond the headline price.',
} as const;

export const faq = {
  eyebrow: claim({ text: 'Before you choose', status: 'proposal', source: HOME_BRIEF }),
  title: claim({
    text: 'The questions that change the next step.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  items: [
    {
      id: 'start',
      question: 'Which service should I start with?',
      answer:
        'Start with the decision in front of you: buying the property, testing it as an investment, understanding tax and ownership, or meeting the people who coordinate the work.',
      status: 'proposal' as const,
      source: HOME_BRIEF,
    },
    {
      id: 'tools',
      question: 'Can I use the tools before choosing a service?',
      answer:
        'Yes. Purchase Tax and Real Cash Needed open in the separate Buyer System. No buyer amount or personal detail is passed from this page in the URL.',
      status: 'confirmed' as const,
      source: 'docs/buyer-system-integration.md, verified 2026-09-29',
    },
    {
      id: 'professionals',
      question: 'Does Sarah replace my lawyer or other specialists?',
      answer:
        'No. Sarah leads the advisory thread and helps coordinate the decision. Matters requiring regulated or specialist advice stay with the appropriate professional for your case.',
      status: 'proposal' as const,
      source: HOME_BRIEF,
      review: 'legal' as const,
    },
  ].map((item) => ({
    id: item.id,
    question: claim({ text: item.question, status: 'proposal', source: HOME_BRIEF }),
    answer: claim({
      text: item.answer,
      status: item.status,
      source: item.source,
      review: 'review' in item ? item.review : 'none',
    }),
  })),
  legalNote: claim({
    text: 'General information only. Scope, professional responsibilities and advice are confirmed for each engagement and circumstance.',
    status: 'proposal',
    source: HOME_BRIEF,
    review: 'legal',
  }),
} as const;

export const finalCta = {
  eyebrow: 'Your next useful step',
  title: claim({
    text: 'Choose the page that matches the decision in front of you.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  body: claim({
    text: 'Or start with the numbers: Purchase Tax and Real Cash Needed open in the Buyer System.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  primaryCta: 'Choose your starting point',
  secondaryCta: 'Use Buyer Tools',
} as const;

export const footer = {
  description: claim({
    text: 'Buyer-side property, purchase-cost and owner-stage guidance for international buyers in Spain.',
    status: 'proposal',
    source: HOME_BRIEF,
  }),
  groups: [
    {
      title: 'Services',
      links: [
        { text: 'Property Purchase', href: '/preview/property-purchase' },
        { text: 'Investment', href: '/preview/investment' },
        { text: 'Tax Advisory', href: '/preview/tax-advisory' },
        { text: 'Meet the team', href: '/preview/team' },
      ].map((item) => ({
        label: claim({ text: item.text, status: 'confirmed', source: 'Existing preview route' }),
        href: item.href,
      })),
    },
    {
      title: 'Home',
      links: [
        { text: 'Choose where to start', href: '#services' },
        { text: 'How decisions move', href: '#process' },
        { text: 'In their words', href: '#voices' },
        { text: 'Sarah Katerina', href: '#sarah' },
        { text: 'Frequently asked questions', href: '#faq' },
      ].map((item) => ({
        label: claim({ text: item.text, status: 'proposal', source: HOME_BRIEF }),
        href: item.href,
      })),
    },
    {
      title: 'Buyer tools',
      links: (
        [
          {
            label: claim({
              text: 'Purchase Tax',
              status: 'confirmed',
              source: 'docs/buyer-system-integration.md',
            }),
            href: resolveEntryPoint('purchaseTax').href,
          },
          {
            label: claim({
              text: 'Real Cash Needed',
              status: 'confirmed',
              source: 'docs/buyer-system-integration.md',
            }),
            href: resolveEntryPoint('realCashNeeded').href,
          },
        ] as const
      ).filter((link): link is { label: (typeof link)['label']; href: string } =>
        Boolean(link.href),
      ),
    },
  ],
  copyright: claim({
    text: 'Sarah Katerina · Independent buyer-side advisory in Spain.',
    status: 'proposal',
    source: 'Owner instruction 2026-09-29: no review wording in visible Home content',
  }),
  routesNote: claim({
    text: '',
    status: 'confirmed',
    source: 'No public legal/contact line is authorised for this preview.',
  }),
} as const;

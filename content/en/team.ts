import { claim, type Claim } from '@/lib/content/claims';
import type { IconName } from '@/components/web/icons/Icon';

const USER_BRIEF = 'Project owner brief, 2026-09-22';
/**
 * Phase 2H — Sarah's review (REVISION WEB. Team.docx, 2026-09): headlines,
 * the team introduction and the full names of Óscar and Igor. Her headlines and
 * introduction are `confirmed` (accepted by Juanma, 2026-09-28); English
 * adaptations in docs/phase-2h-juanma-review.md §10.2.
 */
const SARAH_APPROVED = "Sarah's review (REVISION WEB. Team.docx), accepted by Juanma 2026-09-28";
const STRATEGIC_SOURCE =
  'Juanmaes83/sarahkaterina README.md and PROJECT-STATUS.md, independence model confirmed 2026-08-13';

export const PROTOTYPE_NOTICE = {
  label: 'TEAM EDITORIAL PREVIEW — NOT PRODUCTION',
  body: claim({
    text: 'English editorial draft for human review. New commercial language is proposed, and any tax, legal, planning or financial statement requires competent review before publication.',
    status: 'confirmed',
    source: 'AGENTS.md §§10–11 and project owner brief, 2026-09-22',
  }),
} as const;

export const seo = {
  title: 'Meet the buyer advisory team in Spain | Sarah Katerina',
  description:
    'Meet the team supporting international buyers in Spain, from a Costa Blanca property search and purchase-cost review to non-resident owner tax and administration after completion.',
} as const;

export const hero = {
  eyebrow: 'Buyer-side guidance in Spain',
  title: 'Your place in Spain starts with people on your side.',
  lead: 'A coordinated team helps you move from the first search to ownership with clearer decisions, named responsibilities and advice shaped around your interests as the buyer.',
  cta: 'Tell us about your plans',
  secondaryCta: 'Meet the team',
  imageAlt:
    'Three members of the Sarah Katerina team together in a bright office setting; individual identities are not assigned in this preview.',
  caption: 'A real team, working from one shared understanding of your plans.',
} as const;

export const introduction = {
  eyebrow: 'What changes',
  title: 'The search becomes one connected decision, not a chain of hand-offs.',
  body: [
    'International buyers rarely need one isolated answer. The property, purchase costs, tax position, documents and practical life after completion affect one another.',
    'The team keeps those questions connected. Each person contributes a defined function, while specialist legal, technical, planning, tax or financial verification is brought in wherever the decision requires it.',
  ],
  points: [
    'Your objectives shape the search criteria.',
    'Questions and assumptions are surfaced before commitment.',
    'Ownership is considered as part of the purchase, not as an afterthought.',
  ],
} as const;

/**
 * "Different plans. The same discipline before commitment." Sarah: "Objetivos
 * diferentes. La misma revisión antes de firmar."
 */
export const pathsHeader = {
  eyebrow: 'Three starting points',
  title: claim({
    text: 'Different goals. The same review before signing.',
    status: 'confirmed',
    source: SARAH_APPROVED,
  }),
  subtitle:
    'The work begins with the life or use you are planning—not with a property someone wants to sell.',
} as const;

/**
 * "Four functions, connected around the buyer." Sarah did not understand it
 * and replaced title and introduction. The former subtitle ("The photographs
 * show three people…") is removed at his request: no photograph is attached to
 * a name, each portrait slot below is labelled pending, and the group photograph
 * keeps its own caption saying no identity is inferred from it.
 */
export const teamHeader = {
  eyebrow: 'The people around your decision',
  title: claim({
    text: 'Buying a home is easy. Buying it well is something else.',
    status: 'confirmed',
    source: SARAH_APPROVED,
  }),
  intro: claim({
    text: 'Sarah looks at your goals, the real cost of the purchase and the tax side, so you can make one well-informed decision. She leads the whole advisory process and, when a case calls for it, works with specialist professionals.',
    status: 'confirmed',
    source: SARAH_APPROVED,
    note: 'Consistent with Sarah’s confirmed area below (tax, purchase costs and buyer advisory) and with the page’s rule that specialist matters go to qualified professionals.',
  }),
} as const;

export interface TeamPath {
  readonly icon: IconName;
  readonly title: string;
  readonly intro: string;
  readonly analysis: readonly string[];
  readonly limit: string;
}

export const paths: readonly TeamPath[] = [
  {
    icon: 'property',
    title: 'Buy a home to live in',
    intro:
      'Start with how you want to live, then test each property against the practical purchase.',
    analysis: [
      'Location, property fit and the realities behind the shortlist',
      'Purchase costs and the questions that need tax or legal review',
      'The documents and practical steps that follow completion',
    ],
    limit: 'A shortlist is not a survey, valuation or legal approval.',
  },
  {
    icon: 'land',
    title: 'Explore land and a building project',
    intro:
      'Separate the appeal of a plot from the evidence needed to understand a possible project.',
    analysis: [
      'The brief, location and intended use',
      'Available planning information, access and service questions',
      'Which architects, lawyers or other professionals must verify feasibility',
    ],
    limit: 'No buildability, permission, timing or budget is promised.',
  },
  {
    icon: 'financialModel',
    title: 'Buy or use a second home with income in mind',
    intro:
      'Look at personal use and income intentions together, without treating either as a guaranteed outcome.',
    analysis: [
      'Use pattern, running costs and scenario assumptions',
      'Licence, community and local-rule questions for professional checking',
      'Tax and financial inputs relevant to your circumstances',
    ],
    limit: 'No rental viability, occupancy or return is promised.',
  },
] as const;

export interface TeamProfile {
  readonly name: string;
  readonly area: string;
  readonly body: string;
  readonly featured?: boolean;
  /**
   * Individual portrait. Phase 2H: Sarah asked for one photograph beside each
   * profile. None is in either repository for Elsa, Óscar or Igor (the only
   * individual photographs found, EQUIPO_SARAHKATERINA4–6 upstream, show one
   * person and are not labelled with a name), so the slot stays `pending`
   * until Juanma supplies a named, approved file. A face is never assigned by
   * appearance.
   */
  readonly portrait: 'pending';
}

export const profiles: readonly TeamProfile[] = [
  {
    name: 'Sarah Katerina',
    area: 'Tax, purchase costs and buyer advisory',
    body: 'Sarah brings the buyer’s objectives, the purchase-cost picture and the tax questions into the same decision. She leads the advisory view and identifies where a matter needs additional professional verification.',
    featured: true,
    portrait: 'pending',
  },
  {
    name: 'Elsa Quirós Pérez',
    area: 'Administration and administrative tasks',
    body: 'Elsa supports the documents, coordination and administrative tasks that keep the file moving, including relevant owner-stage matters within the agreed scope.',
    portrait: 'pending',
  },
  {
    // Full name from Sarah's review (2026-09): "Oscar Gonzalez". The first-name accent
    // is the owner-confirmed legal spelling already in this file; the surname
    // is written exactly as supplied (whether it takes an accent is pending).
    name: 'Óscar Gonzalez',
    area: 'Commercial accompaniment and property selection',
    body: 'Óscar accompanies the commercial side of the search and helps select properties against the buyer’s brief, without turning the shortlist into a seller-led recommendation.',
    portrait: 'pending',
  },
  {
    // Full name from Sarah's review (2026-09), as supplied.
    name: 'Igor Veselov',
    area: 'Business development and new opportunities',
    body: 'Igor works on business development and new opportunities, helping the practice keep sight of relevant ways to support international buyers.',
    portrait: 'pending',
  },
] as const;

export const network = {
  eyebrow: 'A wider professional context',
  title: 'Good decisions are rarely made in isolation.',
  body: [
    'A buyer-side team also needs to recognise where its own role stops and another professional perspective is needed.',
    'The buyer’s brief remains the centre of the conversation. Any specialist role, relationship and scope must be confirmed for the individual file before it is relied upon.',
  ],
  imageAlt:
    'Two women in a professional event setting beside display materials; their identities and the visible organisations are not assigned in this preview.',
  reviewLabel: 'PROVISIONAL MEDIA — HUMAN VISUAL REVIEW ONLY',
  caption:
    'This photograph is included only to evaluate editorial composition. Visible people, organisations and messages are not identified, endorsed or presented as partners or clients.',
} as const;

export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly people: string;
  readonly body: string;
  readonly verification: string;
}

export const process: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Your idea and first conversation',
    people: 'Sarah · Óscar',
    body: 'The team clarifies how you want to use the property, where you are in the decision and what must be understood before a search starts.',
    verification:
      'Personal tax, legal or financing questions are identified for specialist review.',
  },
  {
    number: '02',
    title: 'Search criteria and selection',
    people: 'Óscar · Sarah',
    body: 'Óscar shapes the property search around the brief. Sarah keeps purchase costs, tax questions and the buyer-side criteria visible as options are compared.',
    verification: 'Listings and seller material are treated as inputs, not proof.',
  },
  {
    number: '03',
    title: 'Evidence before commitment',
    people: 'Sarah · Óscar · external professionals as needed',
    body: 'The promising option is tested against the decision: property fit, costs, ownership intentions and the risks already visible from the available information.',
    verification:
      'Lawyers, surveyors, architects, valuers, tax or finance professionals verify matters within their competence.',
  },
  {
    number: '04',
    title: 'Purchase coordination',
    people: 'Sarah · Óscar · Elsa',
    body: 'The commercial, cost and administrative threads stay connected as the transaction advances, with responsibilities made explicit rather than assumed.',
    verification:
      'Contracts, title, planning, finance and technical condition require the appropriate independent checks.',
  },
  {
    number: '05',
    title: 'Your stage as an owner',
    people: 'Sarah · Elsa',
    body: 'After completion, relevant tax and administrative questions, accounts, bills and charges can be addressed according to your circumstances and the agreed service scope.',
    verification:
      'Ongoing obligations and advice remain situation-specific and subject to competent review.',
  },
] as const;

/**
 * Phase 2H: the "The buyer is the client." band is removed at Sarah's request (relayed by Juanma).
 * The confirmed independence statement stays in this object and is still
 * rendered by the FAQ answer ("Are you working for me or for the seller?").
 */
export const independence = {
  eyebrow: 'Who the advice serves',
  title: 'The buyer is the client.',
  body: 'The analysis and property selection respond to the buyer’s interests. The service is paid exclusively by the buyer or client and receives no remuneration from sellers, developers or agencies.',
  points: [
    'Opportunities can be selected freely according to the buyer’s interests.',
    'There are no exclusivity agreements with a seller, developer or agency.',
    'There is no seller-side mandate conditioning the recommendations.',
  ],
  source: STRATEGIC_SOURCE,
} as const;

export const aftercare = {
  eyebrow: 'After the keys',
  title: 'Ownership creates a new set of practical questions.',
  body: 'Depending on your situation and the agreed scope, the team can support relevant tax and administrative questions, accounts, bills and charges. The aim is continuity and clarity, not an unqualified promise to manage every aspect of the property.',
  imageAlt: 'The Sarah Katerina name displayed on the wall of the team’s office.',
  officeAlt:
    'A working area inside the Sarah Katerina office, with desks and the wall sign visible.',
} as const;

export const faq = {
  eyebrow: claim({ text: 'Practical questions', status: 'proposal', source: USER_BRIEF }),
  title: claim({
    text: 'What buyers usually want to know first.',
    status: 'proposal',
    source: USER_BRIEF,
  }),
  items: [
    {
      id: 'seller',
      question: claim({
        text: 'Are you working for me or for the seller?',
        status: 'proposal',
        source: USER_BRIEF,
      }),
      answer: claim({
        text: 'The buyer is the client. The service is paid exclusively by the buyer or client and receives no remuneration from sellers, developers or agencies.',
        status: 'confirmed',
        source: STRATEGIC_SOURCE,
      }),
    },
    {
      id: 'contact',
      question: claim({
        text: 'Will I be passed from person to person?',
        status: 'proposal',
        source: USER_BRIEF,
      }),
      answer: claim({
        text: 'The page proposes a coordinated file with named responsibilities. Who acts as your day-to-day contact, and the exact contractual scope, must be confirmed in writing for your engagement.',
        status: 'proposal',
        source: USER_BRIEF,
      }),
    },
    {
      id: 'lawyer',
      question: claim({
        text: 'Does the team replace my lawyer, surveyor or architect?',
        status: 'proposal',
        source: USER_BRIEF,
      }),
      answer: claim({
        text: 'No. The team helps frame and coordinate the decision, while legal, technical, planning, valuation, tax and financial matters require the appropriate professional verification.',
        status: 'proposal',
        source: USER_BRIEF,
        review: 'legal',
      }),
    },
    {
      id: 'remote',
      question: claim({
        text: 'Can you help if I am not in Spain yet?',
        status: 'proposal',
        source: USER_BRIEF,
      }),
      answer: claim({
        text: 'The first brief, search criteria and many comparisons can begin remotely. What can be completed remotely in your case depends on the transaction and professional advice.',
        status: 'proposal',
        source: USER_BRIEF,
        review: 'legal',
      }),
    },
    {
      id: 'land',
      question: claim({
        text: 'Can you confirm that I will be allowed to build on a plot?',
        status: 'proposal',
        source: USER_BRIEF,
      }),
      answer: claim({
        text: 'No feasibility or permission is promised. Planning information can help frame the question, but the relevant authorities and qualified professionals must verify it.',
        status: 'proposal',
        source: USER_BRIEF,
        review: 'legal',
      }),
    },
    {
      id: 'income',
      question: claim({
        text: 'Can you guarantee rental income or a return?',
        status: 'proposal',
        source: USER_BRIEF,
      }),
      answer: claim({
        text: 'No. Income, occupancy, costs and returns are not guaranteed. Any scenario depends on evidence, assumptions, local rules, tax treatment and your circumstances.',
        status: 'proposal',
        source: USER_BRIEF,
        review: 'returns',
      }),
    },
    {
      id: 'after',
      question: claim({
        text: 'What happens after I complete the purchase?',
        status: 'proposal',
        source: USER_BRIEF,
      }),
      answer: claim({
        text: 'Relevant tax and administrative questions, accounts, bills and charges can be supported according to your situation and the agreed scope. This preview does not promise comprehensive rental or property management.',
        status: 'proposal',
        source: USER_BRIEF,
        review: 'tax',
      }),
    },
  ],
  legalNote: claim({
    text: 'This editorial preview describes a proposed way of working, not an engagement letter or professional advice. Tax, legal, planning and financial wording requires competent review before publication.',
    status: 'confirmed',
    source: 'AGENTS.md §§10–11; project owner brief, 2026-09-22',
  }),
} as const;

export const finalCta = {
  eyebrow: 'Your plan is the starting point',
  title: 'Tell us what you want life in Spain to look like.',
  body: 'A home to live in, land for a possible project, or a second home with an income intention: start with the real objective and the questions already on your mind.',
  primaryCta: 'Tell us about your plans',
  secondaryCta: 'Review the three starting points',
  note: 'Contact channels are not connected in this preview. No free-call claim is made.',
} as const;

export const footer = {
  description: claim({
    text: 'Buyer-side property, purchase-cost and owner-stage guidance for international clients in Spain.',
    status: 'proposal',
    source: USER_BRIEF,
  }),
  groups: [
    {
      title: 'Starting points',
      links: [
        'A home to live in',
        'Land and a possible project',
        'A second home with income in mind',
      ].map((text) => claim({ text, status: 'proposal', source: USER_BRIEF })),
    },
    {
      title: 'How we work',
      links: [
        ...['Buyer-side criteria', 'Named responsibilities', 'Professional verification'].map(
          (text) => claim({ text, status: 'proposal', source: USER_BRIEF }),
        ),
        {
          label: claim({
            text: 'Contact',
            status: 'confirmed',
            source: 'Existing preview route, 2026-09-29',
          }),
          href: '/preview/contact',
        },
      ],
    },
    {
      title: 'Owner stage',
      links: ['Tax questions', 'Administrative tasks', 'Accounts, bills and charges'].map((text) =>
        claim({ text, status: 'proposal', source: USER_BRIEF }),
      ),
    },
    {
      title: 'Review status',
      links: ['Editorial proposal', 'Professional review required', 'Preview only'].map((text) =>
        claim({
          text,
          status: 'confirmed',
          source: 'AGENTS.md and project owner brief, 2026-09-22',
        }),
      ),
    },
  ],
  copyright: claim({
    text: 'Sarah Katerina. Internal preview, not for publication.',
    status: 'pending',
    note: 'The legal entity and publication line remain unconfirmed.',
  }),
  routesNote: claim({
    text: 'English is the active preview language. Spanish content is structured but has no route yet.',
    status: 'confirmed',
    source: 'Project owner brief, 2026-09-22',
  }),
} as const;

export type TeamFaqContent = {
  readonly eyebrow: Claim;
  readonly title: Claim;
  readonly items: readonly {
    readonly id: string;
    readonly question: Claim;
    readonly answer: Claim;
  }[];
  readonly legalNote: Claim;
};

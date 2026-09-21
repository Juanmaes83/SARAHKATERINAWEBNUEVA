import { claim, type Claim } from '@/lib/content/claims';

/**
 * Investment landing — Phase 2B visual implementation.
 *
 * Copy is PROVISIONAL and not approved. See docs/copy-and-claims-matrix.md.
 *
 * Language: English. It is the approved primary acquisition language
 * (decisions-log.md 2026-07-27). The reference template is in Spanish; ES copy
 * is not authored here because no Spanish route exists yet.
 *
 * Constraints held throughout:
 *   - no price, client result, testimonial or named client;
 *   - no return, yield or percentage presented as real — the dashboard
 *     surfaces carry fixed, visibly labelled illustrative values only;
 *   - no uniqueness or "no competition" claim (PROHIBITED upstream);
 *   - no institutional descriptor (NEEDS_DECISION upstream);
 *   - no VITA Host / Group reference (D-06 unexecuted);
 *   - tax, legal, financial and returns statements are marked for review.
 */

export const PROTOTYPE_NOTICE = {
  label: 'PHASE 2B — VISUAL IMPLEMENTATION READY FOR HUMAN REVIEW',
  body: claim({
    text: 'Visual implementation of the approved Investment template. Copy is provisional, figures on the dashboards are illustrative, and nothing on this page is approved for production.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §9',
  }),
} as const;

export const nav = [
  { href: '#approach', label: 'Approach' },
  { href: '#assets', label: 'Asset types' },
  { href: '#process', label: 'Process' },
  { href: '#report', label: 'The report' },
  { href: '#sarah', label: 'About Sarah' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const headerCta = claim({
  text: 'Talk to Sarah',
  status: 'proposal',
  note: 'Provisional. Per-intent CTA wording is an open P0 in the master audit.',
});

export const hero = {
  eyebrow: claim({ text: 'Investment with judgement', status: 'proposal' }),
  heading: claim({
    text: 'Properties. Data. Better decisions.',
    status: 'proposal',
    source: 'Adapted from the Investment template headline',
  }),
  lead: claim({
    text: 'Independent property investment analysis for international buyers in the Costa Blanca. Financial modelling, due diligence and a tax overlay, brought together into one decision report — before the deposit, not after it.',
    status: 'proposal',
    review: 'financial',
  }),
  primaryCta: claim({ text: 'Request an analysis', status: 'proposal' }),
  secondaryCta: claim({ text: 'See how it works', status: 'proposal' }),
  locationLabel: claim({
    text: 'Costa Blanca, Spain',
    status: 'confirmed',
    source: 'seo-final-audit-2026-09.md §6 — "Independent property investment analysis in Costa Blanca"',
  }),
  imageAlt: claim({
    text: 'Sarah Katerina, photographed standing in a dark tailored suit against a plain studio background.',
    status: 'confirmed',
    source: 'AUTH-SK-001 — authentic identity reference',
  }),
  caption: claim({
    text: 'The figures shown are illustrative and demonstrate the report format only.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §5',
  }),
  /** Only approved-source credentials appear here. */
  credentials: [
    {
      value: claim({
        text: '20 years inside Spain’s Tax Administration',
        status: 'confirmed',
        source:
          'brand-system/verbal/credential-register.csv CR-002; confirmed by the project owner 2026-08-12',
      }),
      note: claim({
        text: 'The 15-year wording is superseded and must not return.',
        status: 'confirmed',
        source: 'PROJECT-STATUS.md — naming/verbal',
      }),
    },
    {
      value: claim({
        text: 'Paid only by you',
        status: 'confirmed',
        source: 'strategy/master/decisions-log.md 2026-07-27',
      }),
      note: claim({
        text: 'No commission from sellers, developers or agencies.',
        status: 'confirmed',
        source: 'strategy/master/decisions-log.md 2026-07-27',
      }),
    },
  ],
} as const;

export const trustStrip: readonly { value: Claim; note: Claim }[] = [
  {
    value: claim({
      text: '20 years',
      status: 'confirmed',
      source: 'credential-register.csv CR-002, confirmed 2026-08-12',
    }),
    note: claim({
      text: 'inside Spain’s Tax Administration',
      status: 'confirmed',
      source: 'credential-register.csv CR-002',
    }),
  },
  {
    value: claim({
      text: 'Buyer-side only',
      status: 'confirmed',
      source: 'decisions-log.md 2026-07-27; independence model confirmed 2026-08-13',
    }),
    note: claim({
      text: 'no seller, developer or agency pays for the advice',
      status: 'confirmed',
      source: 'decisions-log.md 2026-07-27',
    }),
  },
  {
    value: claim({
      text: 'Costa Blanca',
      status: 'confirmed',
      source: 'seo-final-audit-2026-09.md §6; master audit §5 service territory',
    }),
    note: claim({
      text: 'the market the analysis actually covers',
      status: 'proposal',
    }),
  },
  {
    value: claim({
      text: 'PENDING_APPROVAL',
      status: 'pending',
      note: 'Turnaround time. The template shows "48h"; no such figure is confirmed.',
    }),
    note: claim({
      text: 'turnaround from the first information',
      status: 'pending',
    }),
  },
] as const;

export const approach = {
  eyebrow: claim({ text: 'Why this exists', status: 'proposal' }),
  title: claim({
    text: 'A bridge between opportunity and peace of mind.',
    status: 'proposal',
    source: 'Adapted from the Investment template',
  }),
  body: [
    claim({
      text: 'International buyers make one of the largest decisions of their lives in a market whose rules, costs and paperwork were not written for them, advised almost entirely by people who are paid when the purchase completes.',
      status: 'proposal',
    }),
    claim({
      text: 'The work is the same either way: read the documents, model the numbers, apply the tax treatment, and say plainly whether the price holds. What changes is who pays for the answer.',
      status: 'proposal',
      review: 'financial',
    }),
  ],
  objections: [
    {
      title: claim({ text: 'Buying on feeling', status: 'proposal' }),
      body: claim({
        text: 'The view sells the property. The spreadsheet decides whether it was a good idea. Both deserve an honest hearing, in that order.',
        status: 'proposal',
      }),
    },
    {
      title: claim({ text: 'Trusting the brochure', status: 'proposal' }),
      body: claim({
        text: 'Marketing material states a headline price and an optimistic occupancy. Neither is a forecast, and neither is anybody’s commitment.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      title: claim({ text: 'Overstating the return', status: 'proposal' }),
      body: claim({
        text: 'Gross yield ignores the costs that actually land on you. Net is the number worth comparing, and it is rarely the one advertised.',
        status: 'proposal',
        review: 'returns',
      }),
    },
    {
      title: claim({ text: 'Underestimating the tax', status: 'proposal' }),
      body: claim({
        text: 'Spain can tax the higher of the agreed price, the declared value and the cadastral reference value — so the figure that sets your bill is not always the one you negotiated.',
        status: 'proposal',
        review: 'tax',
        source: 'Buyer System FISCAL_SOURCE_REGISTER.md — RDL 1/1993 art. 10.2',
      }),
    },
    {
      title: claim({ text: 'Never testing the downside', status: 'proposal' }),
      body: claim({
        text: 'One set of assumptions is a hope. Several sets, including the uncomfortable ones, is an analysis.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      title: claim({ text: 'Finding the risk too late', status: 'proposal' }),
      body: claim({
        text: 'The deposit turns a maybe into a commitment with a penalty attached. Most of what you would want to know is knowable before that point.',
        status: 'proposal',
        review: 'legal',
      }),
    },
  ],
} as const;

export const doors = {
  eyebrow: claim({ text: 'Choose your starting point', status: 'proposal' }),
  title: claim({ text: 'Two ways in. One standard of analysis.', status: 'proposal' }),
  items: [
    {
      id: 'have-property',
      meta: claim({ text: 'You have a property in mind', status: 'proposal' }),
      title: claim({ text: 'Analyse this one', status: 'proposal' }),
      body: claim({
        text: 'You have found something and want to know whether the numbers hold before you commit to it.',
        status: 'proposal',
      }),
      points: [
        claim({ text: 'Full cost build-up, including tax', status: 'proposal', review: 'tax' }),
        claim({ text: 'Scenarios and sensitivity, not one hopeful case', status: 'proposal', review: 'financial' }),
        claim({ text: 'A written proceed, renegotiate or walk recommendation', status: 'proposal' }),
      ],
      cta: claim({ text: 'Analyse my property', status: 'proposal' }),
    },
    {
      id: 'explore',
      meta: claim({ text: 'You are still comparing', status: 'proposal' }),
      title: claim({ text: 'Compare on the same basis', status: 'proposal' }),
      body: claim({
        text: 'You want several options put through one method, so the comparison actually means something.',
        status: 'proposal',
      }),
      points: [
        claim({ text: 'The same model applied to each property', status: 'proposal', review: 'financial' }),
        claim({ text: 'Risks named per option, not averaged away', status: 'proposal' }),
        claim({ text: 'A shortlist you can defend to yourself', status: 'proposal' }),
      ],
      cta: claim({ text: 'Compare options', status: 'proposal' }),
    },
    {
      id: 'talk',
      meta: claim({ text: 'You want to talk first', status: 'proposal' }),
      title: claim({ text: 'Ask before you decide', status: 'proposal' }),
      body: claim({
        text: 'You are earlier than that, and you want to understand how the process works before paying for anything.',
        status: 'proposal',
      }),
      points: [
        claim({ text: 'No obligation and no analysis fee to have the conversation', status: 'proposal' }),
        claim({ text: 'Plain answers about scope and limits', status: 'proposal' }),
        claim({ text: 'Free calculators you can use first', status: 'proposal' }),
      ],
      cta: claim({ text: 'Talk to Sarah first', status: 'proposal' }),
    },
  ],
} as const;

export const assetTypes = {
  eyebrow: claim({ text: 'Asset types', status: 'proposal' }),
  title: claim({ text: 'Different strategies. One standard of rigour.', status: 'proposal' }),
  items: [
    {
      id: 'residential',
      title: claim({ text: 'Residential', status: 'proposal' }),
      forWhom: claim({ text: 'Own use, or letting to others.', status: 'proposal' }),
      analysed: claim({
        text: 'Purchase costs, running costs, occupancy assumptions and net position after tax.',
        status: 'proposal',
        review: 'financial',
      }),
      risk: claim({ text: 'Licence, community and habitability constraints.', status: 'proposal', review: 'legal' }),
      deliverable: claim({ text: 'Cost build-up and net-yield model.', status: 'proposal' }),
    },
    {
      id: 'land',
      title: claim({ text: 'Land', status: 'proposal' }),
      forWhom: claim({ text: 'Buyers with a development horizon.', status: 'proposal' }),
      analysed: claim({
        text: 'Planning status, buildable area, timelines and cost to permit.',
        status: 'proposal',
        review: 'legal',
      }),
      risk: claim({ text: 'Classification, access and services.', status: 'proposal', review: 'legal' }),
      deliverable: claim({ text: 'Feasibility note and risk register.', status: 'proposal' }),
    },
    {
      id: 'commercial',
      title: claim({ text: 'Commercial', status: 'proposal' }),
      forWhom: claim({ text: 'Buyers seeking a let asset.', status: 'proposal' }),
      analysed: claim({
        text: 'Lease terms, tenant quality, indexation and void assumptions.',
        status: 'proposal',
        review: 'financial',
      }),
      risk: claim({ text: 'Covenant strength and reinstatement obligations.', status: 'proposal', review: 'legal' }),
      deliverable: claim({ text: 'Income model and lease summary.', status: 'proposal' }),
    },
    {
      id: 'redevelopment',
      title: claim({ text: 'Redevelopment', status: 'proposal' }),
      forWhom: claim({ text: 'Buyers adding value through works.', status: 'proposal' }),
      analysed: claim({
        text: 'Works budget, contingency, programme and exit assumptions.',
        status: 'proposal',
        review: 'financial',
      }),
      risk: claim({ text: 'Cost overrun and permitting delay.', status: 'proposal' }),
      deliverable: claim({ text: 'Budget model with downside cases.', status: 'proposal' }),
    },
  ],
} as const;

export const process = {
  eyebrow: claim({ text: 'How we analyse', status: 'proposal' }),
  title: claim({ text: 'A clear process. Decisions with a basis.', status: 'proposal' }),
  steps: [
    {
      id: 'market-screen',
      title: claim({ text: 'Market screen', status: 'proposal' }),
      body: claim({ text: 'Market context and comparables for the specific location.', status: 'proposal' }),
      deliverable: claim({ text: 'Market note', status: 'proposal' }),
    },
    {
      id: 'due-diligence',
      title: claim({ text: 'Due diligence', status: 'proposal' }),
      body: claim({ text: 'Legal, technical and planning review of the documentation.', status: 'proposal', review: 'legal' }),
      deliverable: claim({ text: 'Risk checklist', status: 'proposal' }),
    },
    {
      id: 'financial-modelling',
      title: claim({ text: 'Financial modelling', status: 'proposal' }),
      body: claim({ text: 'Scenarios, sensitivity and net position on your assumptions.', status: 'proposal', review: 'financial' }),
      deliverable: claim({ text: 'Working model', status: 'proposal' }),
    },
    {
      id: 'tax-overlay',
      title: claim({ text: 'Tax overlay', status: 'proposal' }),
      body: claim({ text: 'How the purchase and the holding are treated for a non-resident.', status: 'proposal', review: 'tax' }),
      deliverable: claim({ text: 'Tax note', status: 'proposal' }),
    },
    {
      id: 'decision-report',
      title: claim({ text: 'Decision report', status: 'proposal' }),
      body: claim({ text: 'Conclusions, limits and a recommendation you can act on.', status: 'proposal' }),
      deliverable: claim({ text: 'Final report', status: 'proposal' }),
    },
  ],
} as const;

export const report = {
  eyebrow: claim({ text: 'Preview of the full report', status: 'proposal' }),
  title: claim({ text: 'What the analysis actually produces.', status: 'proposal' }),
  subtitle: claim({
    text: 'Every chart below shows the format of the deliverable using illustrative sample values. None of it is a client result, a projection or a benchmark.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §5',
  }),
  cards: [
    {
      id: 'cash-flow',
      title: claim({ text: 'Annual cash flows', status: 'proposal' }),
      note: claim({ text: 'Income against costs, year by year.', status: 'proposal', review: 'financial' }),
    },
    {
      id: 'distribution',
      title: claim({ text: 'Distribution of outcomes', status: 'proposal' }),
      note: claim({ text: 'Where the result lands across many runs.', status: 'proposal', review: 'financial' }),
    },
    {
      id: 'seasonality',
      title: claim({ text: 'Income seasonality', status: 'proposal' }),
      note: claim({ text: 'How letting income moves across the year.', status: 'proposal', review: 'financial' }),
    },
    {
      id: 'risk',
      title: claim({ text: 'Risk assessment', status: 'proposal' }),
      note: claim({ text: 'Named risks, rated and explained.', status: 'proposal' }),
    },
  ],
  risks: [
    { label: claim({ text: 'Market', status: 'proposal' }), value: claim({ text: 'Sample', status: 'proposal' }) },
    { label: claim({ text: 'Regulatory', status: 'proposal' }), value: claim({ text: 'Sample', status: 'proposal' }) },
    { label: claim({ text: 'Liquidity', status: 'proposal' }), value: claim({ text: 'Sample', status: 'proposal' }) },
    { label: claim({ text: 'Tax', status: 'proposal' }), value: claim({ text: 'Sample', status: 'proposal' }) },
  ],
  deliverables: [
    claim({ text: 'Written report', status: 'proposal' }),
    claim({ text: 'Working model', status: 'proposal' }),
    claim({ text: 'Scenarios and sensitivity', status: 'proposal' }),
  ],
  cta: claim({ text: 'See a sample report', status: 'proposal', note: 'No sample report asset exists yet.' }),
} as const;

export const scenarios = {
  eyebrow: claim({ text: 'Scenarios, risk and return', status: 'proposal' }),
  title: claim({
    text: 'Assumptions and downside matter more than brochure promises.',
    status: 'proposal',
    review: 'financial',
  }),
  body: claim({
    text: 'We run several scenarios, stress the market assumptions and test sensitivity to the variables that actually move the answer: price, occupancy, costs and tax treatment. The goal is not a better number. It is fewer surprises.',
    status: 'proposal',
    review: 'financial',
  }),
  items: [
    { title: claim({ text: 'Scenarios', status: 'proposal' }), body: claim({ text: 'Optimistic, base and pessimistic.', status: 'proposal', review: 'financial' }) },
    { title: claim({ text: 'Risk', status: 'proposal' }), body: claim({ text: 'Sensitivity to each key assumption.', status: 'proposal', review: 'financial' }) },
    { title: claim({ text: 'Net position', status: 'proposal' }), body: claim({ text: 'After every cost, not before.', status: 'proposal', review: 'returns' }) },
    { title: claim({ text: 'Exit', status: 'proposal' }), body: claim({ text: 'Strategy and horizon, costed.', status: 'proposal', review: 'financial' }) },
  ],
} as const;

export const authority = {
  eyebrow: claim({ text: 'The judgement behind each decision', status: 'proposal' }),
  title: claim({ text: 'Experience, independence and a personal approach.', status: 'proposal' }),
  body: claim({
    text: 'Twenty years inside Spain’s Tax Administration, applied to the question international buyers actually face: not whether a property is beautiful, but whether it holds up once the tax, the costs and the assumptions are on the table.',
    status: 'proposal',
    review: 'tax',
    source: 'Credential confirmed in credential-register.csv CR-002; wording provisional',
  }),
  imageAlt: claim({
    text: 'Portrait of Sarah Katerina.',
    status: 'confirmed',
    source: 'AUTH-SK-002 — authentic identity reference',
  }),
  points: [
    claim({
      text: '20 years inside Spain’s Tax Administration',
      status: 'confirmed',
      source: 'credential-register.csv CR-002, confirmed 2026-08-12',
    }),
    claim({
      text: 'Independent, buyer-side only',
      status: 'confirmed',
      source: 'decisions-log.md 2026-07-27',
    }),
    claim({ text: 'Financial and tax read in one place', status: 'proposal', review: 'tax' }),
    claim({ text: 'One point of contact through the process', status: 'proposal' }),
  ],
  limits: [
    claim({
      text: 'An analysis is not a valuation, a building survey or legal representation.',
      status: 'proposal',
      review: 'legal',
    }),
    claim({
      text: 'Tax treatment depends on your residence, the region and your circumstances, and changes over time.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'No modelled figure is a promise. Models describe assumptions, not outcomes.',
      status: 'proposal',
      review: 'returns',
    }),
  ],
  cta: claim({ text: 'More about Sarah', status: 'proposal' }),
  bioPending: claim({
    text: 'PENDING_APPROVAL — full biography, qualifications and career detail require a claims dossier with source, date, permission and scope.',
    status: 'pending',
    source: 'website/01-audits/00-website-audit-master-2026-09.md §3 P0',
  }),
} as const;

export const cases = {
  eyebrow: claim({ text: 'Three operations. Three decisions.', status: 'proposal' }),
  title: claim({ text: 'Case studies', status: 'proposal' }),
  subtitle: claim({
    text: 'Each case would state the asset, the location, the decision taken and the limits of what it proves. None is published until the client has given written permission and the figures have been verified.',
    status: 'proposal',
  }),
  items: [
    {
      id: 'case-1',
      assetType: claim({ text: 'Residential', status: 'proposal' }),
      title: claim({ text: 'CASE STUDY PLACEHOLDER', status: 'blocked' }),
      body: claim({
        text: 'Situation, decision and outcome appear here once permission and verified figures exist.',
        status: 'blocked',
      }),
    },
    {
      id: 'case-2',
      assetType: claim({ text: 'Letting', status: 'proposal' }),
      title: claim({ text: 'CASE STUDY PLACEHOLDER', status: 'blocked' }),
      body: claim({
        text: 'No client, country, figure or result is shown. Nothing here is invented.',
        status: 'blocked',
      }),
    },
    {
      id: 'case-3',
      assetType: claim({ text: 'Land', status: 'proposal' }),
      title: claim({ text: 'CASE STUDY PLACEHOLDER', status: 'blocked' }),
      body: claim({
        text: 'The template shows quotes and returns at this position. They are not reproduced.',
        status: 'blocked',
      }),
    },
  ],
} as const;

export const journey = {
  eyebrow: claim({ text: 'Support across the whole operation', status: 'proposal' }),
  title: claim({ text: 'One thread, from analysis to ownership.', status: 'proposal' }),
  steps: [
    { title: claim({ text: 'Analyse', status: 'proposal' }), body: claim({ text: 'Study and feasibility.', status: 'proposal' }) },
    { title: claim({ text: 'Buy', status: 'proposal' }), body: claim({ text: 'Support through the negotiation.', status: 'proposal' }) },
    { title: claim({ text: 'Declare', status: 'proposal' }), body: claim({ text: 'Tax and legal handling.', status: 'proposal', review: 'tax' }) },
    { title: claim({ text: 'Own', status: 'proposal' }), body: claim({ text: 'Support once it is yours.', status: 'proposal' }) },
  ],
} as const;

export const faq = {
  eyebrow: claim({ text: 'Before you ask', status: 'proposal' }),
  title: claim({ text: 'Frequently asked questions', status: 'proposal' }),
  items: [
    {
      id: 'analysed',
      question: claim({ text: 'What exactly is analysed?', status: 'proposal' }),
      answer: claim({
        text: 'Market context and comparables, the legal and technical documentation, a financial model with scenarios and sensitivity, the tax treatment for a non-resident, and a written recommendation with its limits stated.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'already-have',
      question: claim({ text: 'What if I already have a property in mind?', status: 'proposal' }),
      answer: claim({
        text: 'That is the most common starting point. Send the listing, whatever documentation the seller has provided, and your own assumptions about horizon and use.',
        status: 'proposal',
      }),
    },
    {
      id: 'still-looking',
      question: claim({ text: 'What if I am still looking?', status: 'proposal' }),
      answer: claim({
        text: 'The same method can be applied to several options so they are comparable. You can also start with the free calculators and decide afterwards whether a full analysis is worth it.',
        status: 'proposal',
      }),
    },
    {
      id: 'information',
      question: claim({ text: 'What information do you need from me?', status: 'proposal' }),
      answer: claim({
        text: 'The listing, the seller’s documentation, your intended use and horizon, and how you expect to fund the purchase.',
        status: 'proposal',
      }),
    },
    {
      id: 'time',
      question: claim({ text: 'How long does the analysis take?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL — the template shows a 48-hour turnaround. No turnaround is confirmed for publication.',
        status: 'pending',
      }),
    },
    {
      id: 'includes',
      question: claim({ text: 'What does the report include?', status: 'proposal' }),
      answer: claim({
        text: 'A written report, the working model with its assumptions visible and editable, the scenarios and sensitivity, the named risks, and a proceed, renegotiate or walk recommendation.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'tax',
      question: claim({ text: 'How does this work with tax?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL — any published statement about tax treatment requires competent review, a jurisdiction note, an effective date and a disclaimer.',
        status: 'pending',
        review: 'tax',
      }),
    },
    {
      id: 'cost',
      question: claim({ text: 'What does it cost?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL — a price exists in the upstream documentation but is not approved for publication here.',
        status: 'pending',
        review: 'financial',
      }),
    },
    {
      id: 'independence',
      question: claim({ text: 'How do I know the advice is independent?', status: 'proposal' }),
      answer: claim({
        text: 'Payment comes only from you. No commission, fee or incentive is accepted from sellers, developers or agencies, and no exclusivity agreement exists with any of them.',
        status: 'confirmed',
        source:
          'strategy/master/decisions-log.md 2026-07-27; independence model confirmed by the project owner 2026-08-13',
        note: 'Covers remuneration. The formal client mandate and contractual scope remain pending and are deliberately not described.',
      }),
    },
    {
      id: 'not-do',
      question: claim({ text: 'What does this service not do?', status: 'proposal' }),
      answer: claim({
        text: 'It does not value the property, survey the building, act as your legal representative, or sell you anything. Where a question needs a specialist, it is named rather than absorbed.',
        status: 'proposal',
        review: 'legal',
      }),
    },
  ],
} as const;

export const buyerSystem = {
  eyebrow: claim({ text: 'Before you pay for anything', status: 'proposal' }),
  title: claim({ text: 'Start with the free calculations.', status: 'proposal' }),
  subtitle: claim({
    text: 'The Buyer System is a separate product with its own governance. It shows the result without asking for anything first, and routes what it cannot answer honestly to review.',
    status: 'proposal',
  }),
} as const;

export const finalCta = {
  eyebrow: claim({ text: 'Your investment deserves a proper analysis', status: 'proposal' }),
  title: claim({ text: 'Let’s talk about your next investment.', status: 'proposal' }),
  body: claim({
    text: 'Start with the free calculations, or send the property and have it analysed properly. Neither commits you to anything.',
    status: 'proposal',
  }),
  primaryCta: claim({ text: 'Request an analysis', status: 'proposal' }),
  secondaryCta: claim({ text: 'Talk first', status: 'proposal' }),
  note: claim({
    text: 'PENDING_APPROVAL — response time, email and messaging contact channels are not confirmed.',
    status: 'pending',
  }),
} as const;

export const footer = {
  description: claim({
    text: 'Independent property investment analysis for international buyers. Costa Blanca, Spain.',
    status: 'proposal',
    note: 'Descriptor wording is provisional. The formal institutional descriptor is NEEDS_DECISION upstream.',
  }),
  groups: [
    {
      title: 'Services',
      links: [
        claim({ text: 'Property analysis', status: 'proposal' }),
        claim({ text: 'Investment opportunities', status: 'proposal' }),
        claim({ text: 'Tax advisory', status: 'proposal' }),
        claim({ text: 'Purchase support', status: 'proposal' }),
      ],
    },
    {
      title: 'Insights',
      links: [
        claim({ text: 'Guides and resources', status: 'proposal' }),
        claim({ text: 'Market analysis', status: 'proposal' }),
        claim({ text: 'Tax updates', status: 'proposal' }),
      ],
    },
    {
      title: 'About',
      links: [
        claim({ text: 'Sarah’s story', status: 'proposal' }),
        claim({ text: 'Method', status: 'proposal' }),
        claim({ text: 'Contact', status: 'pending' }),
      ],
    },
  ],
  legal: [
    claim({ text: 'Legal notice', status: 'pending' }),
    claim({ text: 'Privacy policy', status: 'pending' }),
    claim({ text: 'Cookie policy', status: 'pending' }),
    claim({ text: 'Terms of use', status: 'pending' }),
  ],
  copyright: claim({
    text: 'Copyright placeholder — legal entity PENDING_APPROVAL. Internal preview, not for distribution.',
    status: 'pending',
  }),
} as const;

export const seo = {
  title: 'Property investment analysis in the Costa Blanca',
  description:
    'Independent property investment analysis for international buyers in the Costa Blanca: financial modelling, due diligence and a tax overlay in one decision report. Internal visual preview, not approved for production.',
} as const;

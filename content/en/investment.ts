import { claim, type Claim } from '@/lib/content/claims';

/**
 * Investment landing — PROVISIONAL CONTENT FOR A VISUAL PROTOTYPE.
 *
 * None of this copy is approved. See docs/copy-and-claims-matrix.md for the
 * per-string classification and docs/phase-2-decision-gate.md for why this
 * landing exists as a prototype at all.
 *
 * Constraints applied throughout:
 *   - no price, metric, percentage, return, yield or client result;
 *   - no testimonial, case outcome or named client;
 *   - no uniqueness or "no competition" claim (PROHIBITED upstream);
 *   - no tax, legal or financial assertion presented as fact;
 *   - no institutional descriptor (NEEDS_DECISION upstream);
 *   - no VITA Host / Group reference (D-06 unexecuted).
 */

export const PROTOTYPE_NOTICE = {
  label: 'VISUAL PROTOTYPE — NOT PRODUCTION',
  body: claim({
    text: 'This page exists to validate the design system against a real intended composition. It is not an approved landing, the copy is provisional, and it does not represent a decision about commercial priority.',
    status: 'confirmed',
    source: 'docs/phase-2-decision-gate.md §3',
  }),
} as const;

export const hero = {
  eyebrow: claim({
    text: 'Investment advisory',
    status: 'proposal',
    note: 'Service label is provisional. The formal institutional descriptor is NEEDS_DECISION upstream.',
  }),
  heading: claim({
    text: 'Decide on the numbers, not on the brochure.',
    status: 'proposal',
    source: 'Adapted from website/02-activation/new-website-landings-proposal-2026-09.md §6 ("Buy on numbers, not on the brochure")',
    note: 'Proposal wording. Not approved copy.',
  }),
  subheading: claim({
    text: 'For foreign buyers weighing a property in Spain as an investment: an independent financial review of the purchase, before the money and the deadlines start moving.',
    status: 'proposal',
    review: 'financial',
    note: 'Describes the service. "Independent" is an approved positioning principle, but the contractual scope behind it is still pending Sarah’s confirmation.',
  }),
  primaryCta: claim({
    text: 'Review the investment',
    status: 'proposal',
    source: 'Provisional CTA listed in the Phase 2 brief',
    note: 'Per-intent CTA wording is an open P0 in the master audit.',
  }),
  secondaryCta: claim({
    text: 'Talk to Sarah first',
    status: 'proposal',
    note: 'Provisional. Deliberately not "Book a discovery call", which the master audit flags as an over-used universal CTA.',
  }),
  visualIntent: claim({
    text: 'Scenario panel showing how one purchase behaves under different assumptions.',
    status: 'pending',
    note: 'Requires an authorised screenshot of the real model, or an approved abstraction of it.',
  }),
} as const;

/**
 * Trust strip.
 *
 * Every entry is deliberately a placeholder. The only quantitative credential
 * confirmed upstream is "20 years inside Spain's Tax Administration", and the
 * master audit requires a claims dossier with source, date, permission and
 * scope before any credential is published. That dossier does not exist.
 */
export const trustStrip: readonly { label: string; value: Claim }[] = [
  {
    label: 'Experience',
    value: claim({
      text: 'PENDING_APPROVAL',
      status: 'pending',
      note: 'The 20-year Tax Administration credential is confirmed upstream but has no published claims dossier.',
    }),
  },
  {
    label: 'Coverage',
    value: claim({
      text: 'PENDING_APPROVAL',
      status: 'pending',
      note: 'Costa Blanca is described as the service territory upstream; the exact published wording is not approved.',
    }),
  },
  {
    label: 'Languages',
    value: claim({
      text: 'PENDING_APPROVAL',
      status: 'pending',
      note: 'English is the primary acquisition language; the full published language list is not confirmed.',
    }),
  },
  {
    label: 'Response time',
    value: claim({ text: 'PENDING_APPROVAL', status: 'pending', note: 'No measured figure exists.' }),
  },
  {
    label: 'Buyers advised',
    value: claim({
      text: 'PENDING_APPROVAL',
      status: 'pending',
      note: 'A volume claim was explicitly deprioritised upstream: the differential proof is the published method, not client volume.',
    }),
  },
  {
    label: 'Paid by',
    value: claim({
      text: 'The buyer only',
      status: 'confirmed',
      source: 'strategy/master/decisions-log.md 2026-07-27; PROJECT-STATUS.md independence model confirmed 2026-08-13',
      note: 'The remuneration model is confirmed. The formal contractual scope remains pending.',
    }),
  },
] as const;

export const problem = {
  eyebrow: claim({ text: 'The decision', status: 'proposal' }),
  heading: claim({
    text: 'The brochure answers a different question than the one you are actually asking.',
    status: 'proposal',
  }),
  intro: claim({
    text: 'A listing tells you what a property costs. It does not tell you what it costs you, what it returns, or what happens if your assumptions are wrong.',
    status: 'proposal',
    review: 'financial',
  }),
  tensions: [
    claim({
      text: 'You are comparing properties across regions whose purchase taxes are not the same, using a headline price that excludes most of what you will actually pay.',
      status: 'proposal',
      review: 'tax',
      note: 'Directionally supported by the Buyer System scope, but any specific tax statement needs review.',
    }),
    claim({
      text: 'The figure that decides your tax is not always the price you agreed. Spain can tax the higher of the agreed price, the declared value and the cadastral reference value.',
      status: 'proposal',
      review: 'tax',
      source: 'Buyer System docs/FISCAL_SOURCE_REGISTER.md — RDL 1/1993 art. 10.2',
      note: 'Sourced upstream, but a published tax statement requires competent review and a jurisdiction note.',
    }),
    claim({
      text: 'Everyone advising you on the purchase is paid when the purchase happens. You are the one left holding the outcome.',
      status: 'proposal',
      note: 'Consistent with the approved independence position. Wording not approved.',
    }),
    claim({
      text: 'The arras deposit turns a maybe into a commitment with a penalty attached, and it is usually signed before anyone has modelled the numbers.',
      status: 'proposal',
      review: 'legal',
    }),
    claim({
      text: 'Waiting is not neutral: deposits, exchange rates and mortgage offers all have dates on them.',
      status: 'proposal',
      review: 'financial',
      note: 'Must not become an urgency device. The brand principle is Calm Evidence.',
    }),
  ],
} as const;

export const decisionDoors = {
  eyebrow: claim({ text: 'Where you are', status: 'proposal' }),
  heading: claim({ text: 'Start from the decision you are actually facing.', status: 'proposal' }),
  doors: [
    {
      id: 'specific-property',
      title: claim({ text: 'I have a specific property in mind', status: 'proposal' }),
      body: claim({
        text: 'You want to know whether the numbers hold before you commit to it.',
        status: 'proposal',
      }),
      action: claim({ text: 'Review the investment', status: 'proposal' }),
    },
    {
      id: 'comparing',
      title: claim({ text: 'I am comparing several opportunities', status: 'proposal' }),
      body: claim({
        text: 'You want the same method applied to each one, so the comparison means something.',
        status: 'proposal',
      }),
      action: claim({ text: 'See how the review works', status: 'proposal' }),
    },
    {
      id: 'costs',
      title: claim({ text: 'I need to understand my real costs first', status: 'proposal' }),
      body: claim({
        text: 'You want the cash and tax picture before you talk to anyone.',
        status: 'proposal',
      }),
      action: claim({ text: 'Calculate what you would actually need', status: 'proposal' }),
    },
  ],
} as const;

export const visualProof = {
  eyebrow: claim({ text: 'The mechanism', status: 'proposal' }),
  heading: claim({ text: 'What the review actually produces.', status: 'proposal' }),
  intro: claim({
    text: 'Not an opinion about the property. A model you can interrogate, with the assumptions written down and the limits stated.',
    status: 'proposal',
  }),
  /**
   * Scenario names only. No figures: every number here would be an invented
   * financial result. The panels render as structured placeholders.
   */
  scenarios: [
    {
      id: 'base',
      label: claim({ text: 'Base case', status: 'proposal' }),
      description: claim({
        text: 'Your stated assumptions, costed end to end.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'stress',
      label: claim({ text: 'Under stress', status: 'proposal' }),
      description: claim({
        text: 'What changes when occupancy, costs or rates move against you.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'exit',
      label: claim({ text: 'On exit', status: 'proposal' }),
      description: claim({
        text: 'What you keep after the costs of selling, on your stated horizon.',
        status: 'proposal',
        review: 'financial',
      }),
    },
  ],
  artefacts: [
    claim({ text: 'Full cost build-up from the agreed price to money actually leaving your account', status: 'proposal', review: 'financial' }),
    claim({ text: 'Sensitivity to the assumptions that move the outcome most', status: 'proposal', review: 'financial' }),
    claim({ text: 'The risks found, and which are material to this decision', status: 'proposal' }),
    claim({ text: 'A written recommendation you can act on or ignore', status: 'proposal' }),
  ],
} as const;

export const process = {
  eyebrow: claim({ text: 'How it runs', status: 'proposal' }),
  heading: claim({ text: 'Five stages, and what you hold at the end of each.', status: 'proposal' }),
  stages: [
    {
      id: 'intake',
      title: claim({ text: 'Intake', status: 'proposal' }),
      what: claim({ text: 'You send the listing, your assumptions and your horizon.', status: 'proposal' }),
      deliverable: claim({ text: 'A written scope of what will and will not be assessed.', status: 'proposal' }),
      decision: claim({ text: 'Whether this property is worth the full review.', status: 'proposal' }),
      duration: claim({ text: 'PENDING_APPROVAL', status: 'pending', note: 'No confirmed turnaround.' }),
    },
    {
      id: 'review',
      title: claim({ text: 'Document review', status: 'proposal' }),
      what: claim({ text: 'The paperwork behind the listing is read, not skimmed.', status: 'proposal', review: 'legal' }),
      deliverable: claim({ text: 'The list of what is missing or inconsistent.', status: 'proposal' }),
      decision: claim({ text: 'What to ask the seller before going further.', status: 'proposal' }),
      duration: claim({ text: 'PENDING_APPROVAL', status: 'pending' }),
    },
    {
      id: 'model',
      title: claim({ text: 'Financial model', status: 'proposal' }),
      what: claim({ text: 'Costs, taxes, financing and scenarios are modelled from your figures.', status: 'proposal', review: 'financial' }),
      deliverable: claim({ text: 'The model, with every assumption visible and editable.', status: 'proposal' }),
      decision: claim({ text: 'Whether the numbers support the price being asked.', status: 'proposal' }),
      duration: claim({ text: 'PENDING_APPROVAL', status: 'pending' }),
    },
    {
      id: 'recommendation',
      title: claim({ text: 'Recommendation', status: 'proposal' }),
      what: claim({ text: 'A clear position: proceed, renegotiate, or walk away.', status: 'proposal' }),
      deliverable: claim({ text: 'A written recommendation with its reasoning and its limits.', status: 'proposal' }),
      decision: claim({ text: 'The actual decision.', status: 'proposal' }),
      duration: claim({ text: 'PENDING_APPROVAL', status: 'pending' }),
    },
    {
      id: 'next',
      title: claim({ text: 'Next step', status: 'proposal' }),
      what: claim({ text: 'If you proceed, the purchase is handled as one file rather than five conversations.', status: 'proposal' }),
      deliverable: claim({ text: 'A handover into the purchase process.', status: 'proposal' }),
      decision: claim({ text: 'How the transaction is run.', status: 'proposal' }),
      duration: claim({ text: 'PENDING_APPROVAL', status: 'pending' }),
    },
  ],
} as const;

export const benefits = {
  eyebrow: claim({ text: 'Why it is built this way', status: 'proposal' }),
  heading: claim({ text: 'Each choice exists to remove a specific risk.', status: 'proposal' }),
  items: [
    {
      feature: claim({ text: 'Paid only by you', status: 'confirmed', source: 'decisions-log.md 2026-07-27' }),
      benefit: claim({ text: 'No one pays for a particular answer.', status: 'proposal' }),
      outcome: claim({ text: 'A recommendation to walk away costs the same as one to proceed.', status: 'proposal' }),
      risk: claim({ text: 'Removes the incentive to close the transaction regardless of merit.', status: 'proposal' }),
    },
    {
      feature: claim({ text: 'Assumptions written down', status: 'proposal' }),
      benefit: claim({ text: 'You can challenge the model instead of trusting it.', status: 'proposal' }),
      outcome: claim({ text: 'You can re-run the decision when a figure changes.', status: 'proposal' }),
      risk: claim({ text: 'Removes the risk of a confident number with a hidden assumption behind it.', status: 'proposal' }),
    },
    {
      feature: claim({ text: 'Stated limits', status: 'proposal' }),
      benefit: claim({ text: 'What the review does not cover is named explicitly.', status: 'proposal' }),
      outcome: claim({ text: 'You know which questions still need a specialist.', status: 'proposal' }),
      risk: claim({ text: 'Removes false completeness.', status: 'proposal' }),
    },
    {
      feature: claim({ text: 'Tax read before the commitment', status: 'proposal', review: 'tax' }),
      benefit: claim({ text: 'The cost of buying is understood before the deposit.', status: 'proposal', review: 'tax' }),
      outcome: claim({ text: 'Fewer figures change after the point where changing your mind is expensive.', status: 'proposal' }),
      risk: claim({ text: 'Removes the most common source of post-arras surprise.', status: 'proposal', review: 'tax' }),
    },
  ],
} as const;

export const authority = {
  eyebrow: claim({ text: 'Who reviews it', status: 'proposal' }),
  heading: claim({ text: 'Sarah Katerina', status: 'confirmed', source: 'Brand name' }),
  body: claim({
    text: 'PENDING_APPROVAL — biography, credentials and experience require a claims dossier with source, date, permission and scope before publication.',
    status: 'pending',
    source: 'website/01-audits/00-website-audit-master-2026-09.md §3 P0 "Validar claims"',
  }),
  methodNote: claim({
    text: 'The differential proof is the published method, not the number of clients.',
    status: 'confirmed',
    source: 'strategy/master/decisions-log.md 2026-08-05',
  }),
  limits: [
    claim({
      text: 'A review is not a valuation, a survey, or a substitute for your own legal representation.',
      status: 'proposal',
      review: 'legal',
    }),
    claim({
      text: 'Tax treatment depends on your residence, the region and your circumstances, and changes over time.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'No projected return is a promise. Models describe assumptions, not outcomes.',
      status: 'proposal',
      review: 'returns',
    }),
  ],
  portraitIntent: claim({
    text: 'Authorised photograph of Sarah.',
    status: 'blocked',
    note: 'No authorised photograph exists in this repository. Synthetic imagery may not be used as documentary evidence.',
  }),
} as const;

export const cases = {
  eyebrow: claim({ text: 'Evidence', status: 'proposal' }),
  heading: claim({ text: 'Cases', status: 'proposal' }),
  intro: claim({
    text: 'Each case would state the situation, the decision, the outcome and the limits of what it proves. None is published until the client has given written permission and the figures have been verified.',
    status: 'proposal',
  }),
  /** Three structural slots. No invented outcomes. */
  placeholders: [
    claim({ text: 'CASE STUDY PLACEHOLDER — PENDING_APPROVAL', status: 'blocked', note: 'Requires written client permission, verified figures and a date.' }),
    claim({ text: 'CASE STUDY PLACEHOLDER — PENDING_APPROVAL', status: 'blocked' }),
    claim({ text: 'CASE STUDY PLACEHOLDER — PENDING_APPROVAL', status: 'blocked' }),
  ],
} as const;

export const faq = {
  eyebrow: claim({ text: 'Before you ask', status: 'proposal' }),
  heading: claim({ text: 'The questions that actually come up.', status: 'proposal' }),
  items: [
    {
      id: 'price',
      question: claim({ text: 'What does the review cost?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL — a price exists in the upstream documentation but has not been approved for publication here.',
        status: 'pending',
        review: 'financial',
        note: 'See docs/phase-2-decision-gate.md D2-04.',
      }),
    },
    {
      id: 'time',
      question: claim({ text: 'How long does it take?', status: 'proposal' }),
      answer: claim({ text: 'PENDING_APPROVAL — no turnaround is confirmed for publication.', status: 'pending' }),
    },
    {
      id: 'language',
      question: claim({ text: 'Which languages can I work in?', status: 'proposal' }),
      answer: claim({
        text: 'English is the primary working language. The full published list is PENDING_APPROVAL.',
        status: 'pending',
        source: 'decisions-log.md 2026-07-27 (English as primary acquisition language)',
      }),
    },
    {
      id: 'remote',
      question: claim({ text: 'Can this be done without me being in Spain?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL — remote scope, powers of attorney and identification requirements need legal review before being described.',
        status: 'pending',
        review: 'legal',
      }),
    },
    {
      id: 'scope',
      question: claim({ text: 'What is not included?', status: 'proposal' }),
      answer: claim({
        text: 'A review is not a valuation, a building survey or legal representation. Where a question needs a specialist, it is named rather than absorbed.',
        status: 'proposal',
        review: 'legal',
      }),
    },
    {
      id: 'independence',
      question: claim({ text: 'How do I know the advice is independent?', status: 'proposal' }),
      answer: claim({
        text: 'Payment comes only from you. No commission, fee or incentive is accepted from sellers, developers or agencies, and no exclusivity agreement exists with any of them.',
        status: 'confirmed',
        source: 'strategy/master/decisions-log.md 2026-07-27; PROJECT-STATUS.md, independence model confirmed by the project owner 2026-08-13',
        note: 'The remuneration model is confirmed. The formal client mandate and contractual scope remain pending Sarah’s confirmation and are deliberately not described.',
      }),
    },
    {
      id: 'tax',
      question: claim({ text: 'Will you tell me what tax I will pay?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL — any published statement about tax treatment requires competent review, a jurisdiction note, an effective date and a disclaimer.',
        status: 'pending',
        review: 'tax',
      }),
    },
    {
      id: 'documents',
      question: claim({ text: 'What do you need from me?', status: 'proposal' }),
      answer: claim({
        text: 'The listing, your own assumptions, your horizon, and whatever documentation the seller has provided so far.',
        status: 'proposal',
      }),
    },
    {
      id: 'risk',
      question: claim({ text: 'What if the answer is that I should not buy it?', status: 'proposal' }),
      answer: claim({
        text: 'That is a valid result of the review and costs the same as any other. Nothing about how the work is paid for depends on the transaction happening.',
        status: 'proposal',
        note: 'Rests on the confirmed independence model; wording not approved.',
      }),
    },
    {
      id: 'next',
      question: claim({ text: 'What happens after the review?', status: 'proposal' }),
      answer: claim({
        text: 'You decide. If you proceed, the purchase can be handled as a single file rather than a set of disconnected conversations.',
        status: 'proposal',
      }),
    },
  ],
} as const;

export const finalCta = {
  eyebrow: claim({ text: 'Next step', status: 'proposal' }),
  heading: claim({ text: 'Start with the numbers.', status: 'proposal' }),
  body: claim({
    text: 'You can begin with the free calculations and decide afterwards whether a full review is worth it. Nothing commits you to anything.',
    status: 'proposal',
  }),
  primaryCta: claim({ text: 'Calculate your real cash needed', status: 'proposal' }),
  secondaryCta: claim({ text: 'Talk to Sarah first', status: 'proposal' }),
  alternativeNote: claim({
    text: 'PENDING_APPROVAL — email and messaging contact channels are not confirmed.',
    status: 'pending',
  }),
} as const;

export const seo = {
  title: 'Investment review — visual prototype',
  description:
    'Internal visual prototype of an investment advisory landing for Sarah Katerina. Provisional copy, not approved for production.',
} as const;

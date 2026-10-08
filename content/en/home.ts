import { resolveEntryPoint } from '@/lib/buyer-system/links';
import { claim, type Claim } from '@/lib/content/claims';

const HOME_BRIEF = 'Home editorial proposal, session brief 2026-09-29';
/** Sarah's annotated Home review, in the repository root since 2026-10-01 (1ebe89f). */
const HOME_PDF = 'REVISION WEB-HOME.pdf (Sarah, 2026-10-01)';
/** Her Spanish text, translated for this page; the translation awaits her look (SR-087). */
const sarahLine = (point: number) => `${HOME_PDF}, point ${point} (English translation)`;

export const seo = {
  title: 'Independent buyer-side guidance in Spain',
  description:
    'Independent buyer-side guidance from Torrevieja, Costa Blanca, for international buyers and non-resident owners: buy, invest or own property in Spain with tax and cost clarity.',
} as const;

export const hero = {
  eyebrow: 'Independent buyer-side advisory · Spain',
  /**
   * 2026-10-01 — Sarah (relayed by Juanma): "Clarity before commitment." does
   * not convince her as the first thing a visitor reads; she wants Sarah's own
   * voice, close and trusting, in the line of "Déjame ayudarte", with no money
   * or transaction in the opening. She said she would send three phrases; none
   * is in the repository or the brief, so three were drafted here (proposals,
   * not hers, not approved) and the clearest is shown:
   *   1. "Let me help you feel at home in Spain."   ← shown
   *   2. "I'll walk with you, every step of the way."
   *   3. "You don't have to do this alone. Let me help."
   * Open for Sarah: SR-086. "Clarity before commitment." stays the approved
   * brand promise (it still closes the Team hero).
   */
  title: claim({
    text: 'Let me help you feel at home in Spain.',
    status: 'proposal',
    note: 'Drafted 2026-10-01 from Sarah’s direction ("Déjame ayudarte"); option 1 of 3; SR-086.',
  }),
  /**
   * 2026-10-01 (PDF point 3): Sarah did not like the hero copy and asked for a
   * short, first-person introduction. Her full text follows the hero
   * (`presentation`); this lead condenses one of its sentences ("que le
   * acompañe desde la primera visita hasta mucho después de la firma, que le
   * explique cada paso con claridad") into her own voice (SR-001).
   */
  lead: claim({
    text: 'I stay with you from the first viewing until long after the signing, and I explain every step clearly.',
    status: 'proposal',
    source: `${HOME_PDF}, point 3, condensed`,
    note: 'Was "I help you see the property, the full cost and the tax questions together — before you commit."',
  }),
  primaryCta: 'Find your starting point',
  /** Fallback when no booking page is configured: the hero keeps its tools link. */
  secondaryCta: 'Use Buyer Tools',
} as const;

/**
 * One label for every booking button on the Home (PDF, page 5: "En la home
 * tenemos que poner varios BOOK A CALL"). Each button links to the configured
 * booking page (NEXT_PUBLIC_BOOKING_URL) and is not rendered without it.
 */
export const bookCall = {
  label: 'Book a call',
} as const;

/**
 * PRESENTATION — Sarah's own introduction (PDF point 3), every sentence kept.
 * English translation, faithful to her Spanish: no idea dropped, merged or
 * added. Split into short beats for reading on a phone. The eyebrow and the
 * heading are the only words that are not hers (SR-087).
 */
export const presentation = {
  eyebrow: 'Who I am',
  title: claim({
    text: 'I’m Sarah Katerina.',
    status: 'proposal',
    source: `${HOME_PDF}, point 3 (heading for her introduction)`,
  }),
  opening: claim({
    text: 'For twenty years I was an office director at SUMA Gestión Tributaria, the public body that manages local taxes in the province of Alicante. From that side of the system I reviewed the paperwork of thousands of taxpayers, and that experience taught me two things.',
    status: 'confirmed',
    source: sarahLine(3),
  }),
  lessons: [
    {
      label: 'The first:',
      text: 'the Spanish property and tax system works, but only for those who know its rules.',
    },
    {
      label: 'The second:',
      text: 'foreign buyers almost never know them, and often neither do the people advising them.',
    },
  ].map((lesson) => ({
    label: lesson.label,
    text: claim({ text: lesson.text, status: 'confirmed', source: sarahLine(3) }),
  })),
  body: [
    'Time and again I saw the same mistakes, all of them avoidable: deadlines missed, taxes miscalculated, decisions taken without planning, and buyers left frustrated, paying more for something nobody had explained to them.',
    'That is why I decided to go one step further. It was not about carrying on working inside the system, but about creating a service truly on the foreign buyer’s side: one that stays with them from the first viewing until long after the signing, explains every step clearly and protects them from the mistakes I have seen repeated so many times.',
  ].map((text) => claim({ text, status: 'confirmed', source: sarahLine(3) })),
  closing: claim({
    text: 'Because behind every file there is a person, a family and a life plan. And that is what really matters.',
    status: 'confirmed',
    source: sarahLine(3),
  }),
  /** Fallback when no booking page is configured. */
  contactCta: 'All contact options',
} as const;

/**
 * "On your side" — one statement, in Sarah's voice.
 *
 * 2026-10-01 (PDF point 4): "NO hablamos de dinero ni de pagar" — no money,
 * no payment, first person: "Mi trabajo es estar en tu lado de la mesa en todo
 * momento." The three lines that sat beside it (paid only by the buyer, no
 * remuneration from sellers, twenty years inside the Tax Administration) are
 * gone from the Home: the first two explained who pays Sarah, which she asked
 * to remove; her twenty years are now told in her own introduction.
 */
export const side = {
  eyebrow: 'On your side',
  statement: claim({
    text: 'My job is to be on your side of the table, every step of the way.',
    status: 'confirmed',
    source: sarahLine(4),
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
  readonly media: 'homeDiscoveryBuy' | 'homeDiscoveryInvest' | 'sarahHomeDesk';
  /** Visible, client-facing disclosure printed on the banner under the image. */
  readonly mediaNote: string;
}

export const discovery = {
  eyebrow: 'Your starting point',
  title: claim({ text: 'What brings you to Spain?', status: 'proposal', source: HOME_BRIEF }),
  intro: claim({
    text: 'Choose the sentence that sounds like you. I’ll turn it into the right kind of guidance.',
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
      /**
       * 2026-09-30: was "Properties. Data. Better decisions.", the Investment
       * headline Sarah rejected (REVISION WEB-investment.docx). It follows the
       * Investment headline now; Juanma: it must read in one run, uncut.
       * Still open for Sarah with the rest of this block (SR-003).
       */
      proposition: claim({
        text: 'Invest in Spain with someone on your side.',
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
      /** PDF point 5: the handling fees and the taxes, both. Was "I need tax clarity." */
      userNeed: 'I need to understand what I’ll pay, in fees and in taxes.',
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
      // 2026-10-07: was `advisorClientOne`, which now carries the Property
      // Purchase chapter; Juanma chose this replacement so no image repeats.
      media: 'sarahHomeDesk',
      mediaNote: 'Editorial illustration',
    },
  ] satisfies readonly DiscoveryState[],
  motionHint: 'The banner is fabric: drag it, or use the arrow keys when it is focused.',
} as const;

/** Chapters whose copy Sarah wrote in the PDF (point number). */
const SARAH_PDF_POINT: Record<string, number | undefined> = {
  'property-purchase': 6,
  investment: 7,
  sarah: 8,
};

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
      // PDF point 6. Was "From first questions to keys, one connected file."
      title:
        'We’re with you from your first question until you get the keys, with all your paperwork in one place.',
      body: 'Bring the property checks, purchase costs, paperwork and specialist input into the same decision.',
      href: '/preview/property-purchase',
      cta: 'Explore Property Purchase',
      // 2026-10-07: was `assetPlan` (the cutaway plan). Sarah reviewing the
      // paperwork with a client says "with you until the keys" more plainly.
      media: 'advisorClientOne' as const,
    },
    {
      id: 'investment',
      number: '02',
      label: 'Investment',
      // PDF point 7. Was "Test the assumptions before the brochure becomes the plan."
      // "We check everything" is Sarah's wording; its limits are the body below
      // and the process scope line (docs/home-buyer-system-preview.md §13).
      title:
        'Your dream deserves more than a pretty picture: we check everything before you take the step.',
      body: 'Review the property, downside, costs, tax context and exit thinking as one investment decision.',
      href: '/preview/investment',
      cta: 'Explore Investment',
      media: 'homeInvestmentCoastHuman' as const,
    },
    {
      id: 'tax-advisory',
      number: '03',
      label: 'Tax Advisory',
      title: 'Understand the ownership picture, not just the day of signing.',
      body: 'Connect purchase tax and owner-stage obligations to the property decision they affect.',
      href: '/preview/tax-advisory',
      cta: 'Explore Tax Advisory',
      media: 'homeTaxAdvisoryHuman' as const,
    },
    {
      id: 'sarah',
      number: '04',
      label: 'Team',
      // PDF point 8: Sarah's title, text and button. Was "Sarah holds the
      // advisory thread together." / "She leads the process…" / "Meet the team".
      title: 'One person by your side, from start to finish.',
      body: 'I lead your process personally. When it’s needed, I rely on a team of professionals I know and trust, so you always get the best advice without having to deal with ten different people.',
      href: '/preview/team',
      cta: 'Meet my team',
      // 2026-10-07: was `homeAuthority` (Sarah home_1.png, generated, with
      // embedded text), already retired from the three landings. The same
      // pose, supplied on 2026-10-01 as the replacement Sarah asked for.
      media: 'sarahConfianza' as const,
    },
  ].map((item) => {
    const point = SARAH_PDF_POINT[item.id];
    const team = item.id === 'sarah';
    return {
      ...item,
      title: point
        ? claim({ text: item.title, status: 'confirmed', source: sarahLine(point) })
        : claim({ text: item.title, status: 'proposal', source: HOME_BRIEF }),
      body: team
        ? claim({ text: item.body, status: 'confirmed', source: sarahLine(8) })
        : claim({ text: item.body, status: 'proposal', source: HOME_BRIEF }),
      cta: team
        ? claim({ text: item.cta, status: 'confirmed', source: sarahLine(8) })
        : claim({ text: item.cta, status: 'proposal', source: HOME_BRIEF }),
    };
  }),
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
    text: 'Purchase Tax and Real Cash Needed open in the separate Buyer System. This page sends no personal or financial inputs in the link.',
    status: 'confirmed',
    source: 'docs/buyer-system-integration.md, verified 2026-09-29',
  }),
  purchaseTaxMoment: 'See the tax charged on the purchase itself.',
  realCashMoment: 'See the cash needed beyond the headline price.',
} as const;

/**
 * Closing band — Sarah's copy (PDF point 10). Button 1 goes to the service
 * selector on this page; button 2 to the Purchase Tax and Real Cash Needed
 * entries on this page, which open the Buyer System with no data in the URL.
 */
export const finalCta = {
  eyebrow: 'Your next step',
  title: claim({
    text: 'Where would you like to start?',
    status: 'confirmed',
    source: sarahLine(10),
  }),
  body: claim({
    text: 'Tell me where you are and I’ll show you what you need to know. Or, if you’d rather start with the numbers, take a minute to work out the taxes on your purchase and the real cash you’ll need.',
    status: 'confirmed',
    source: sarahLine(10),
  }),
  primaryCta: claim({
    text: 'Choose your starting point',
    status: 'confirmed',
    source: sarahLine(10),
  }),
  secondaryCta: claim({
    text: 'Calculate your purchase costs',
    status: 'confirmed',
    source: sarahLine(10),
  }),
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
        { text: 'Contact', href: '/preview/contact' },
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
        { text: 'Sarah Katerina', href: '#about' },
        { text: 'Meet my team', href: '#sarah' },
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

/**
 * Contact band — a short way into /preview/contact (Juanma, 2026-09-29).
 * It presents how to start talking and links to the full page; it does not
 * repeat it. Only facts verified on the booking system are stated.
 */
export const contactBand = {
  eyebrow: 'Talk it through',
  title: claim({
    text: 'Start with a 30‑minute call, or simply write.',
    status: 'proposal',
    source: `${HOME_BRIEF}; booking system audit (30-minute slots)`,
  }),
  body: claim({
    text: 'Book a call in Spanish local time, or ask for a video call, a phone call or a meeting in Torrevieja.',
    status: 'proposal',
    source: 'docs/contact-page.md; Juanma 2026-09-29',
  }),
  bookCta: bookCall.label,
  contactCta: 'All contact options',
  whatsappLabel: 'WhatsApp',
  /**
   * Rendered in one text node with the number ("Call +34 …"). As separate
   * nodes, the browser's page translation joined them into "Llamaal +34 …"
   * (PDF point 11). The number and the tel: link are unchanged.
   */
  phoneLabel: 'Call',
  whatsappOpener: "Hi Sarah, I'd like to talk about buying property in Spain.",
  office: claim({
    text: 'Office: Calle Bazán 10, 03181 Torrevieja · meetings by prior request',
    status: 'confirmed',
    source: 'Juanma 2026-09-29 (address and meetings by request)',
  }),
} as const;

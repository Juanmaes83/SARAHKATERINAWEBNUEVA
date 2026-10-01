import { claim } from '@/lib/content/claims';

/**
 * Contact page content — /preview/contact (2026-09-29).
 *
 * Every factual line is either verified against the live booking system
 * (read-only audit, docs/contact-page.md) or new proposal copy. Deliberately
 * NOT stated, because none is verified: cost, a guaranteed video link, Sarah
 * personally taking the call, a response time, what the call covers, walk-in
 * visits. Video calls, phone calls and meetings are offered as requests.
 */
const BRIEF = 'Contact experience brief, 2026-09-29';
const LIVE_BOOKING = 'Live booking system, audited read-only 2026-09-29 (docs/contact-page.md §2)';


export const seo = {
  title: 'Contact and book a call',
  description:
    'Book a 30-minute discovery call in Spanish local time, or reach Sarah Katerina by WhatsApp, phone or email.',
} as const;

export const hero = {
  eyebrow: 'Contact',
  title: claim({
    text: 'Your next step starts with a conversation.',
    status: 'proposal',
    source: `${BRIEF}; editorial redesign, Juanma 2026-09-29`,
  }),
  lead: claim({
    text: 'Book a 30‑minute discovery call in Spanish local time, or write whenever it suits you from abroad.',
    status: 'proposal',
    source: `${BRIEF}; duration verified in the live booking system`,
  }),
  alternativesLabel: 'Or reach us directly',
  /**
   * The human focus of the page: `homeAuthority`, the registered derivative of
   * `IMAGES/Sarah home_1.png` (Sarah-approved for the Home; its use on Contact
   * requested by Juanma, 2026-09-29). Same picture as the unregistered
   * `IMAGES/SARAHKATERINA_OFFICE_EDITORIAL.jpeg` in this checkout.
   */
  portrait: { media: 'homeAuthority' as const },
} as const;

export const booking = {
  eyebrow: 'Discovery call',
  title: claim({ text: 'Book a discovery call', status: 'proposal', source: BRIEF }),
  facts: [
    claim({
      text: '30 minutes',
      status: 'confirmed',
      source: `${LIVE_BOOKING}: slotDurationMinutes = 30`,
    }),
    claim({
      text: 'Weekdays, 09:30–18:00 Spanish local time',
      status: 'confirmed',
      source: `${LIVE_BOOKING}: timeZone Europe/Madrid; Mon–Fri slots 09:30–18:00 local`,
      note: 'Expressed as Spanish local time, not CET, so it stays right in summer (CEST).',
    }),
    claim({
      text: 'Your own time zone is shown beside every time',
      status: 'confirmed',
      source: `${LIVE_BOOKING}: "All times shown in Europe/Madrid (your local: …)"`,
    }),
  ],
  timelineTitle: claim({ text: 'What happens after you book', status: 'proposal', source: BRIEF }),
  timeline: [
    {
      title: 'Choose a time',
      body: claim({
        text: '30 minutes, weekdays 09:30–18:00 Spanish local time. Your own time zone is shown beside every slot.',
        status: 'confirmed',
        source: LIVE_BOOKING,
      }),
    },
    {
      title: 'Leave your name and email',
      body: claim({
        text: 'Phone and topic are optional. You can mention a preferred format in the topic.',
        status: 'confirmed',
        source: `${LIVE_BOOKING}: booking form fields`,
      }),
    },
    {
      title: 'Receive the invitation',
      body: claim({
        text: 'A Google Calendar invitation confirms the call.',
        status: 'confirmed',
        source: `${LIVE_BOOKING}: success message`,
      }),
    },
    {
      title: 'Need to change it?',
      body: claim({
        text: 'Reply to the invitation.',
        status: 'confirmed',
        source: `${LIVE_BOOKING}: success message`,
      }),
    },
  ],
  stepsTitle: 'What happens next',
  steps: [
    claim({ text: 'Pick a date and a time.', status: 'confirmed', source: LIVE_BOOKING }),
    claim({
      text: 'Leave your name and email. Phone and topic are optional.',
      status: 'confirmed',
      source: `${LIVE_BOOKING}: booking form fields`,
    }),
    claim({
      text: 'A Google Calendar invitation confirms it. Reply to the invitation if anything changes.',
      status: 'confirmed',
      source: `${LIVE_BOOKING}: success message`,
    }),
  ],
  formatNote: claim({
    text: 'Prefer video, a phone call or a meeting in Torrevieja? Mention it in the optional topic field, or use the options below. It is a request, confirmed in reply.',
    status: 'proposal',
    source:
      'Booking form has an optional topic field (audit 2026-09-29); Juanma 2026-09-29: video calls and meetings',
  }),
  cta: 'Book a discovery call',
  ctaNote: 'Opens the booking calendar.',
  fallback: claim({
    text: 'If the calendar shows no times or does not load, use WhatsApp, phone or email instead.',
    status: 'proposal',
    source: `${BRIEF}; the live calendar itself sends people to email when it has no times`,
  }),
  unconfigured: claim({
    text: 'Online booking is not available here yet. WhatsApp, phone and email below work now.',
    status: 'confirmed',
    source: 'Shown only while NEXT_PUBLIC_BOOKING_URL is unset',
  }),
} as const;

export const direct = {
  eyebrow: 'Or reach us directly',
  title: claim({ text: 'WhatsApp, phone or email', status: 'proposal', source: BRIEF }),
  whatsapp: {
    label: 'WhatsApp',
    action: 'Send a message',
    opener: "Hi Sarah, I'd like to talk about buying property in Spain.",
  },
  phone: { label: 'Phone', action: 'Call' },
  email: { label: 'Email', action: 'Write an email', subject: 'Discovery call' },
  channelsSource: claim({
    text: 'Phone, WhatsApp and email as published on the live site',
    status: 'confirmed',
    source: 'Owner instruction 2026-09-29; live /contact and /book-a-call read 2026-09-29',
  }),
} as const;

export const firstContact = {
  title: claim({ text: 'For a first message', status: 'proposal', source: BRIEF }),
  body: claim({
    text: 'Your name, a way to reach you and a line about your plans are enough. Please do not send passports, tax documents or financial details at this stage.',
    status: 'proposal',
    source: `${BRIEF}: no passport, tax or financial data on first contact`,
  }),
} as const;

/**
 * Office, directions and map — CONFIRMED BY JUANMA, 2026-09-29.
 *
 * Address exactly as Juanma confirmed and as published on the reference site.
 * Google Maps (checked 2026-09-29) resolves it to "C. Bazan, 10, 03181
 * Torrevieja" at 37.97859, -0.68235 — the same point open map data gives
 * (where the street is named "Calle Hermanos Bazán"). The text is not changed
 * for either variant. Visits are NOT stated as open: a meeting is a request.
 */
const JUANMA_CONTACT = 'Juanma, 2026-09-29: address, phone, email, video calls and meetings';

export const office = {
  status: 'confirmed' as 'pending' | 'confirmed',
  eyebrow: 'Office',
  title: claim({ text: 'Torrevieja, Costa Blanca', status: 'proposal', source: BRIEF }),
  addressLines: ['Calle Bazán 10', '03181 Torrevieja · Alicante'],
  addressSource: claim({
    text: 'Calle Bazán 10, 03181 Torrevieja · Alicante',
    status: 'confirmed',
    source: `${JUANMA_CONTACT}; reference site /contact`,
  }),
  visiting: claim({
    text: 'Meetings at the office are by prior request only.',
    status: 'confirmed',
    source: `${JUANMA_CONTACT}; no walk-in visits are confirmed`,
  }),
  mapsQuery: 'Calle Bazán 10, 03181 Torrevieja, Alicante',
  openInMaps: 'Open in Google Maps',
  directions: 'Get directions',
  map: {
    title: 'Map of Calle Bazán 10, Torrevieja',
    show: 'Show the Google map',
    privacy: 'The map loads from Google only when you ask for it.',
  },
} as const;

/**
 * How would you like to talk? — video, phone or in person.
 *
 * The booking system confirms one format only: a 30-minute call with a Google
 * Calendar invitation. A video call, a phone call at a set time or a meeting
 * in Torrevieja cannot be booked directly, so each is a REQUEST sent through a
 * real channel (WhatsApp or email) and confirmed in reply. Nothing here says
 * Google Meet is guaranteed or that a meeting is available.
 */
export const modalities = {
  eyebrow: 'How would you like to talk?',
  title: claim({
    text: 'Video, phone or face to face.',
    status: 'proposal',
    source: `${BRIEF}; ${JUANMA_CONTACT}`,
  }),
  intro: claim({
    text: 'Tell us your preference and we will confirm the format and the time in reply. Each option below sends a request; nothing is booked until it is confirmed.',
    status: 'proposal',
    source: BRIEF,
  }),
  items: [
    {
      id: 'video',
      title: 'Video call',
      body: 'For buyers abroad who prefer to see each other and share documents on screen.',
      whatsapp: "Hi Sarah, I'd like to request a video call about buying property in Spain.",
      emailSubject: 'Video call request',
    },
    {
      id: 'phone',
      title: 'Phone call',
      body: 'A call at a time that suits you, or call the office now.',
      whatsapp: "Hi Sarah, I'd like to request a phone call about buying property in Spain.",
      emailSubject: 'Phone call request',
    },
    {
      id: 'meeting',
      title: 'Meeting in Torrevieja',
      body: 'At the office on Calle Bazán, by prior request only.',
      whatsapp: "Hi Sarah, I'd like to request a meeting at your office in Torrevieja.",
      emailSubject: 'Meeting request, Torrevieja',
    },
  ],
  /**
   * Secondary image: `territoryContact`, the Tax Advisory lifestyle photograph
   * (original `IMAGES/sarahkaterina_LifeStyle_6.png`): a phone, sunglasses and
   * coffee on a table — a conversation from wherever the buyer is.
   */
  image: { media: 'territoryContact' as const },
  requestByWhatsApp: 'Request by WhatsApp',
  requestByEmail: 'Request by email',
  callNow: 'Call now',
} as const;

/** Closing — one clear action and the direct channels, without repeating the page. */
export const closing = {
  eyebrow: 'Whenever you are ready',
  title: claim({ text: 'Choose the way that suits you.', status: 'proposal', source: BRIEF }),
  body: claim({
    text: 'If the calendar shows no times or does not load, WhatsApp, phone and email work just the same.',
    status: 'proposal',
    source: `${BRIEF}; the live calendar itself points to email when it has no times`,
  }),
} as const;

import { claim } from '@/lib/content/claims';

/**
 * Buyer voices — Phase 2F (brief 2026-09-23).
 *
 * The testimonial banner is built, but there is NO approved testimonial in the
 * repository or the source of truth: no quote, name, country, date, image,
 * video or outcome from a real buyer has been cleared for publication. Every
 * slot below is therefore `pending` and renders as an unmistakable preview
 * placeholder. Nothing here may be replaced with a plausible example.
 *
 * A slot becomes publishable only when every item in `PUBLICATION_REQUIREMENTS`
 * is met and recorded, and its `status` is changed by a human reviewer.
 */

const PHASE_2F = 'Phase 2F proposed copy (brief 2026-09-23) — pending Juanma';

export type VoiceService = 'property-purchase' | 'investment' | 'tax-advisory';

export interface VoiceSlot {
  readonly id: string;
  readonly service: VoiceService;
  /** Topic of the slot — the case it would evidence, as already published in the case band. */
  readonly topic: string;
  /** The buyer's approved words. `null` until cleared. */
  readonly quote: string | null;
  /** Name form the buyer agreed to (full name, first name or initials). `null` until cleared. */
  readonly attribution: string | null;
  /** Country or context the buyer agreed to disclose. `null` until cleared. */
  readonly context: string | null;
  readonly status: 'pending' | 'approved';
}

export const SERVICE_LABEL: Record<VoiceService, string> = {
  'property-purchase': 'Property purchase',
  investment: 'Investment analysis',
  'tax-advisory': 'Tax advisory',
};

/**
 * Property Purchase slots. Topics mirror `cases.items` in
 * `content/en/property-purchase.ts`, so a voice and its case arrive together.
 */
export const PURCHASE_VOICES: readonly VoiceSlot[] = [
  {
    id: 'purchase-voice-1',
    service: 'property-purchase',
    topic: 'Fiscal exposure identified',
    quote: null,
    attribution: null,
    context: null,
    status: 'pending',
  },
  {
    id: 'purchase-voice-2',
    service: 'property-purchase',
    topic: 'Problematic clause renegotiated',
    quote: null,
    attribution: null,
    context: null,
    status: 'pending',
  },
  {
    id: 'purchase-voice-3',
    service: 'property-purchase',
    topic: 'Remote purchase completed',
    quote: null,
    attribution: null,
    context: null,
    status: 'pending',
  },
];

/** What a slot shows while it is pending. Placeholder language, never a quote. */
export const PENDING_COPY = {
  quote: claim({
    text: "The buyer's own words will appear here, once they have approved them for publication.",
    status: 'pending',
    source: PHASE_2F,
  }),
  attribution: claim({ text: 'Name, country and date withheld', status: 'pending' }),
  stamp: claim({ text: 'Preview · content pending', status: 'pending' }),
  videoNote: claim({
    text: "Video slot · territory loop until the buyer's recording is cleared",
    status: 'pending',
  }),
  imageNote: claim({ text: 'Editorial image · not the buyer', status: 'pending' }),
} as const;

export const VOICES_BAND = {
  label: claim({ text: 'Buyer voices', status: 'proposal', source: PHASE_2F }),
  hint: claim({
    text: 'The banner is fabric: drag it, stretch it, let it go.',
    status: 'proposal',
    source: PHASE_2F,
  }),
  keyboardHint: claim({
    text: 'Arrow keys tug the banner; R lets it settle.',
    status: 'proposal',
    source: PHASE_2F,
  }),
  requirementsTitle: claim({
    text: 'Before a voice is published',
    status: 'proposal',
    source: PHASE_2F,
  }),
} as const;

/**
 * What must exist, for each testimonial, before it can leave Preview.
 * Mirrors AGENTS.md §2 and §11 and the claims matrix (§9, "Three real
 * cases/testimonials").
 */
export const PUBLICATION_REQUIREMENTS = [
  claim({
    text: "The buyer's written consent to publish their words, and in which name form.",
    status: 'blocked',
  }),
  claim({
    text: 'The final quote, approved by the buyer in its exact wording and language.',
    status: 'blocked',
  }),
  claim({
    text: 'An image or video release for any recording or photograph of the buyer.',
    status: 'blocked',
  }),
  claim({ text: 'The country or context the buyer agrees to disclose.', status: 'blocked' }),
  claim({
    text: 'The service and date, checked against the engagement record.',
    status: 'blocked',
  }),
  claim({
    text: 'Legal, tax and financial review of anything the quote states as an outcome.',
    status: 'blocked',
    review: 'legal',
  }),
  claim({
    text: 'A recorded withdrawal route and retention period for the consent.',
    status: 'blocked',
    review: 'legal',
  }),
] as const;

import { z } from 'zod';

/**
 * Sarah Katerina Studio — editorial content contract.
 *
 * One schema describes what an editor may save, what a revision stores and
 * what a public page renders. It is the data boundary: everything that enters
 * the database through the Studio API is parsed here first, and everything a
 * public page renders was parsed here on the way in AND is parsed again on the
 * way out (a row edited by hand in the database cannot inject markup).
 *
 * SANITISATION MODEL — the editor never stores HTML. Text is plain text with a
 * deliberately tiny inline syntax (`**bold**` and `[label](/path)`), rendered
 * by React as text nodes. Links are allow-listed (site-relative paths, https,
 * mailto, tel). Control characters are stripped and every field has a length
 * cap. There is therefore no HTML/script path from the Studio to a page.
 */

export const SCHEMA_VERSION = 1 as const;

// --- primitives ------------------------------------------------------------

/** Strips C0/C1 control characters except tab/newline, trims, collapses runs of spaces. */
const CONTROL_CHARS = new RegExp(
  '[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B\u2028\u2029]',
  'g',
);

export function cleanText(value: string): string {
  return value
    .replace(CONTROL_CHARS, '')
    .replace(/[ 	]+/g, ' ')
    .trim();
}

const text = (max: number) => z.string().max(max * 2).transform(cleanText).pipe(z.string().max(max));
const requiredText = (max: number) => text(max).pipe(z.string().min(1, 'Required'));

const SAFE_HREF = /^(\/(?!\/)[A-Za-z0-9\-._~/%#?=&]*|https:\/\/[^\s"'<>]+|mailto:[^\s"'<>]+|tel:\+?[0-9 ]+)$/;

/** Allow-listed link target. Rejects javascript:, data:, protocol-relative and http. */
export function isSafeHref(href: string): boolean {
  const value = href.trim();
  return SAFE_HREF.test(value) && value !== '#' && !value.startsWith('/#');
}

export const hrefSchema = z
  .string()
  .max(600)
  .transform((v) => v.trim())
  .refine((v) => SAFE_HREF.test(v), 'Use a site path (/…), an https:// link, mailto: or tel:')
  .refine((v) => v !== '#' && !v.startsWith('/#'), 'Empty anchors are not allowed');

export const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
  .refine((v) => !Number.isNaN(Date.parse(`${v}T00:00:00Z`)), 'Invalid date');

const uuid = z.string().uuid();

// --- blocks ----------------------------------------------------------------

export const paragraphBlock = z.object({
  type: z.literal('paragraph'),
  text: requiredText(4000),
});

export const headingBlock = z.object({
  type: z.literal('heading'),
  /** H1 is the document title; blocks may only use H2/H3. */
  level: z.union([z.literal(2), z.literal(3)]),
  text: requiredText(200),
  /** Stable anchor for the table of contents. Derived when empty. */
  anchor: z
    .string()
    .max(80)
    .regex(/^[a-z0-9-]*$/)
    .optional(),
});

export const imageBlock = z.object({
  type: z.literal('image'),
  mediaId: uuid,
  /** Alt text for THIS use of the image (the library alt is the default). */
  alt: text(300),
  caption: text(300).optional(),
  /** Decorative images get an empty alt deliberately. */
  decorative: z.boolean().optional(),
});

export const listBlock = z.object({
  type: z.literal('list'),
  ordered: z.boolean(),
  items: z.array(requiredText(1200)).min(1).max(30),
});

export const tableBlock = z.object({
  type: z.literal('table'),
  caption: text(300).optional(),
  /** First row is the header row. */
  rows: z
    .array(z.array(text(300)).min(1).max(8))
    .min(2)
    .max(40)
    .refine((rows) => rows.every((row) => row.length === rows[0]!.length), 'Every row needs the same number of cells'),
  /** Visible note under the table, e.g. the basis of an estimate. */
  note: text(500).optional(),
});

export const quoteBlock = z.object({
  type: z.literal('quote'),
  text: requiredText(1200),
  cite: text(200).optional(),
});

/** Inline reference to an entry of the document's `sources` list. */
export const sourceBlock = z.object({
  type: z.literal('source'),
  sourceId: z.string().min(1).max(40),
  text: text(400).optional(),
});

export const CTA_TARGETS = ['contact', 'booking', 'investment', 'purchase', 'tax', 'team'] as const;
export type CtaTarget = (typeof CTA_TARGETS)[number];

export const ctaBlock = z.object({
  type: z.literal('cta'),
  label: requiredText(80),
  /** Only real destinations. "booking" falls back to Contact when the calendar is not configured. */
  target: z.enum(CTA_TARGETS),
  text: text(300).optional(),
});

export const blockSchema = z.discriminatedUnion('type', [
  paragraphBlock,
  headingBlock,
  imageBlock,
  listBlock,
  tableBlock,
  quoteBlock,
  sourceBlock,
  ctaBlock,
]);

export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block['type'];

export const BLOCK_TYPES: readonly BlockType[] = [
  'paragraph',
  'heading',
  'image',
  'list',
  'table',
  'quote',
  'source',
  'cta',
];

// --- shared editorial fields ---------------------------------------------

export const sourceSchema = z.object({
  id: z.string().min(1).max(40).regex(/^[a-z0-9-]+$/),
  label: requiredText(240),
  publisher: requiredText(120),
  url: z.string().url().max(600).refine((v) => v.startsWith('https://'), 'https only'),
  /** Date the link and the cited statement were last checked. */
  checkedOn: isoDate,
  note: text(400).optional(),
});

export type Source = z.infer<typeof sourceSchema>;

export const personSchema = z.object({
  name: requiredText(120),
  role: text(160).optional(),
});

export const seoSchema = z.object({
  /** AUTO derives title/description from the document; CUSTOM uses the fields below. */
  mode: z.enum(['auto', 'custom']).default('auto'),
  title: text(70).optional(),
  description: text(170).optional(),
  ogImageMediaId: uuid.optional(),
});

export const SERVICE_KEYS = ['investment', 'purchase', 'tax'] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const relatedSchema = z.object({
  /** Real document ids, picked in the Studio from existing records. */
  documents: z.array(uuid).max(6).default([]),
  services: z.array(z.enum(SERVICE_KEYS)).max(3).default([]),
});

export const heroSchema = z.object({
  mediaId: uuid,
  alt: text(300),
  caption: text(300).optional(),
});

const datesSchema = z.object({
  published: isoDate.optional(),
  updated: isoDate.optional(),
  /** Date the content (figures, rules) was last reviewed by a professional. */
  reviewed: isoDate.optional(),
});

const baseContent = {
  schemaVersion: z.literal(SCHEMA_VERSION).default(SCHEMA_VERSION),
  /** Standfirst under the title. */
  dek: text(400).default(''),
  category: text(60).default(''),
  tags: z.array(text(40)).max(12).default([]),
  byline: personSchema.optional(),
  reviewer: personSchema.optional(),
  /** Visible scope: "Spain — non-resident taxation", "Valencian Community". */
  jurisdiction: text(160).optional(),
  dates: datesSchema.default({}),
  hero: heroSchema.optional(),
  blocks: z.array(blockSchema).max(200).default([]),
  sources: z.array(sourceSchema).max(30).default([]),
  seo: seoSchema.default({ mode: 'auto' }),
  related: relatedSchema.default({ documents: [], services: [] }),
};

export const articleContent = z.object({
  kind: z.literal('article'),
  ...baseContent,
  /** The short answer shown first ("respuesta inicial"). */
  answer: text(700).optional(),
  /** Assumptions the figures rely on, shown next to them. */
  assumptions: z.array(text(300)).max(10).default([]),
});

export const RESULT_TYPES = ['observed', 'projected', 'estimated'] as const;

export const caseResult = z.object({
  label: requiredText(160),
  value: requiredText(60),
  /** "Year 1", "8-year hold", "2021–2023". */
  period: text(80).optional(),
  type: z.enum(RESULT_TYPES),
  note: text(300).optional(),
});

export const caseContent = z.object({
  kind: z.literal('case'),
  ...baseContent,
  facts: z
    .array(z.object({ label: requiredText(40), value: requiredText(200) }))
    .max(8)
    .default([]),
  context: text(1200).default(''),
  challenge: text(1200).default(''),
  intervention: text(1200).default(''),
  outcome: text(1200).default(''),
  results: z.array(caseResult).max(12).default([]),
});

/** Allowed fields of an editable page. Empty = keep the approved default. */
export const PAGE_FIELDS = {
  home: ['heroEyebrow', 'heroTitle', 'heroLead', 'heroPrimaryCta'] as const,
  investment: ['heroEyebrow', 'heroTitle', 'heroLead', 'heroPrimaryCta', 'heroSecondaryCta'] as const,
} as const;

export type EditablePage = keyof typeof PAGE_FIELDS;
export const EDITABLE_PAGES = Object.keys(PAGE_FIELDS) as EditablePage[];

export const pageContent = z.object({
  kind: z.literal('page'),
  schemaVersion: z.literal(SCHEMA_VERSION).default(SCHEMA_VERSION),
  fields: z.record(z.string().max(40), text(400)).default({}),
});

export const contentSchema = z.discriminatedUnion('kind', [articleContent, caseContent, pageContent]);

export type ArticleContent = z.infer<typeof articleContent>;
export type CaseContent = z.infer<typeof caseContent>;
export type PageContent = z.infer<typeof pageContent>;
export type DocumentContent = z.infer<typeof contentSchema>;
export type DocumentKind = DocumentContent['kind'];

export const slugSchema = z
  .string()
  .max(96)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Lowercase letters, numbers and single hyphens');

export const titleSchema = requiredText(200);

/** Fields whose values become part of a page (used by tests and the editor). */
export function pageFieldsFor(slug: string): readonly string[] {
  return (PAGE_FIELDS as Record<string, readonly string[]>)[slug] ?? [];
}

/**
 * Validates page overrides against the page's allow-list: unknown keys are
 * dropped so a hand-edited row can never add a field the template does not
 * expect.
 */
export function pickPageFields(slug: string, fields: Record<string, string>): Record<string, string> {
  const allowed = new Set(pageFieldsFor(slug));
  return Object.fromEntries(
    Object.entries(fields).filter(([key, value]) => allowed.has(key) && value.trim() !== ''),
  );
}

export function anchorFor(textValue: string): string {
  return textValue
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function slugify(value: string): string {
  return anchorFor(value).slice(0, 96).replace(/-+$/g, '');
}

/** Lenient parse for rendering: returns null instead of throwing. */
export function parseContent(value: unknown): DocumentContent | null {
  const result = contentSchema.safeParse(value);
  return result.success ? result.data : null;
}

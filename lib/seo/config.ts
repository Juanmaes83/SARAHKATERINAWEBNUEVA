import { z } from 'zod';

/**
 * Environment is validated at the data boundary only (Zod is deliberately not
 * used anywhere else in this phase).
 *
 * Every default is the SAFE one: preview mode, not indexable, localhost origin.
 * A malformed or missing variable can therefore never accidentally publish.
 */
const siteEnvSchema = z.object({
  NEXT_PUBLIC_SITE_MODE: z.enum(['preview', 'production']).catch('preview'),
  NEXT_PUBLIC_SITE_INDEXABLE: z
    .enum(['true', 'false'])
    .catch('false')
    .transform((value) => value === 'true'),
  NEXT_PUBLIC_SITE_URL: z.string().url().catch('http://localhost:3000'),
});

const parsed = siteEnvSchema.parse({
  // Next.js inlines NEXT_PUBLIC_* only when referenced statically.
  NEXT_PUBLIC_SITE_MODE: process.env.NEXT_PUBLIC_SITE_MODE,
  NEXT_PUBLIC_SITE_INDEXABLE: process.env.NEXT_PUBLIC_SITE_INDEXABLE,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

export type SiteMode = 'preview' | 'production';

export const siteConfig = {
  mode: parsed.NEXT_PUBLIC_SITE_MODE as SiteMode,

  /**
   * Master indexing switch.
   *
   * Indexing additionally requires production mode, so a preview deployment
   * that is handed an indexable flag by mistake still stays out of the index.
   */
  indexable: parsed.NEXT_PUBLIC_SITE_INDEXABLE && parsed.NEXT_PUBLIC_SITE_MODE === 'production',

  /**
   * Origin used for canonical URLs, Open Graph URLs and sitemap entries.
   *
   * PENDING_APPROVAL — the production host is an OPEN decision in the source of
   * truth. decisions-log.md (2026-08-05) approved https://sarahkaterina.com
   * (non-www); the 2026-09-16 entry records production redirecting non-www to
   * www and leaves the conflict "Abierta" as a P0. No production host is
   * hardcoded anywhere in this repository.
   */
  url: parsed.NEXT_PUBLIC_SITE_URL,

  /**
   * English is the primary acquisition language (decisions-log.md 2026-07-27).
   * No language beyond EN/ES may be added before EN is consolidated and ES is
   * complete (decisions-log.md 2026-08-05).
   */
  defaultLocale: 'en',
  locales: ['en', 'es'],
} as const;

export type Locale = (typeof siteConfig.locales)[number];

/**
 * Routes that must never appear in the sitemap or be indexed.
 *
 * `/preview` is a prefix: everything under it is a prototype. Nothing may be
 * promoted out of that namespace until the Phase 2 decision gate is answered
 * (see docs/phase-2-decision-gate.md, D2-01).
 */
export const LABORATORY_ROUTES = ['/foundation', '/preview'] as const;

export function isLaboratoryRoute(path: string): boolean {
  return LABORATORY_ROUTES.some((route) => path === route || path.startsWith(`${route}/`));
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Routes that render their own header, main landmark and footer instead of the
 * shared application chrome.
 *
 * A landing is a whole composition, not a body slotted between the internal
 * preview chrome: the Tax Advisory preview has its own brand lockup, its own
 * navigation model and its own footer. Declaring the route here — rather than
 * nesting a second <header> and <footer> inside <main> — keeps exactly one
 * banner, one main and one contentinfo landmark in the document.
 */
export const SELF_CHROMED_ROUTES = ['/preview/tax-advisory'] as const;

export function isSelfChromed(path: string): boolean {
  return SELF_CHROMED_ROUTES.some((route) => path === route || path.startsWith(`${route}/`));
}

import { z } from 'zod';

/**
 * Environment is validated at the data boundary only (Zod is deliberately not
 * used anywhere else in this phase).
 *
 * Every default is the SAFE one: preview mode, not indexable, and either the
 * deployment preview origin or localhost. A malformed or missing variable can
 * therefore never accidentally publish.
 */
const siteEnvSchema = z.object({
  NEXT_PUBLIC_SITE_MODE: z.enum(['preview', 'production']).catch('preview'),
  NEXT_PUBLIC_SITE_INDEXABLE: z
    .enum(['true', 'false'])
    .catch('false')
    .transform((value) => value === 'true'),
  NEXT_PUBLIC_SITE_URL: z.string().url().catch('http://localhost:3000'),
});

/**
 * Origin fallback when NEXT_PUBLIC_SITE_URL is not configured.
 *
 * Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is the project's stable domain, so
 * every deployment of the same project shares one origin. `VERCEL_URL` names a
 * single deployment (`<project>-<hash>-<team>.vercel.app`) and is used only
 * when the stable domain is unavailable. Neither is a hardcoded host.
 */
export function resolveSiteUrl(env: {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
}): string | undefined {
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL;
  const host = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  return host ? `https://${host}` : undefined;
}

const parsed = siteEnvSchema.parse({
  // Next.js inlines NEXT_PUBLIC_* only when referenced statically.
  NEXT_PUBLIC_SITE_MODE: process.env.NEXT_PUBLIC_SITE_MODE,
  NEXT_PUBLIC_SITE_INDEXABLE: process.env.NEXT_PUBLIC_SITE_INDEXABLE,
  NEXT_PUBLIC_SITE_URL: resolveSiteUrl({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  }),
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
   * Canonical production host: `www` — APPROVED by the project owner
   * (mother repository, strategy/technical/ENTITY-SEO-GEO-ALIGNMENT.md and
   * SARAH-TECHNICAL-CONTROL-BOARD.md, recorded 2026-10-07; this supersedes the
   * "Abierta" entry of decisions-log.md 2026-09-16). It is still NOT hardcoded:
   * production sets `NEXT_PUBLIC_SITE_URL` to the www origin, and
   * tests/governance.test.ts keeps every host literal out of the source. When
   * no explicit site URL is configured, Vercel deployments use the project's
   * stable domain (`VERCEL_PROJECT_PRODUCTION_URL`) and only then the
   * per-deployment `VERCEL_URL`, so canonical and Open Graph URLs never point to
   * localhost or to one transient deployment on a remote review build.
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
export const LABORATORY_ROUTES = ['/foundation', '/preview', '/studio', '/api/studio'] as const;

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

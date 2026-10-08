/**
 * SEO route manifest — the ONE governed source for which routes exist, which
 * may ever be indexed, which enter the sitemap, which carry structured data
 * and which language alternates they have.
 *
 * Sitemap, robots, canonical alternates and the redirect registry
 * (`lib/seo/redirects.ts`) all read from here, so a route cannot become
 * indexable, crawlable or a redirect target in one place and not another.
 *
 * GOVERNANCE
 *
 * - Every `/preview/*` page is a laboratory prototype (AGENTS.md §7,
 *   docs/phase-2-decision-gate.md). Its production path is UNRESOLVED until
 *   the Phase 2 gate assigns one (D2-01). An unresolved route never enters the
 *   sitemap, never receives a redirect and never emits structured data.
 * - No production path is invented here. `productionPath: null` plus a
 *   `blockedReason` is the honest state.
 * - Paths only — never a host. Every absolute URL derives from
 *   `NEXT_PUBLIC_SITE_URL` (lib/seo/config.ts).
 * - Spanish alternates are declared only when the Spanish route exists
 *   (AGENTS.md §7.5). None exists today, so no route declares one.
 */

export type RouteStatus =
  /** Internal component laboratory or prototype. Never public. */
  | 'laboratory'
  /** Intended for production, but its public path or content gate is undecided. */
  | 'unresolved'
  /** Production path decided and approved for publication. */
  | 'approved';

export type StructuredDataKind = 'none' | 'entity';

export interface SeoRoute {
  /** Stable identifier used by redirects and tests. */
  readonly id: string;
  /** Path rendered by this repository today. */
  readonly previewPath: string;
  /** Public production path, or `null` while UNRESOLVED. */
  readonly productionPath: string | null;
  readonly status: RouteStatus;
  readonly locale: 'en';
  /** May this route ever be indexed once the site-wide switch is on? */
  readonly indexEligible: boolean;
  /** May this route ever enter the sitemap once the site-wide switch is on? */
  readonly sitemapEligible: boolean;
  readonly changeFrequency?: 'weekly' | 'monthly' | 'yearly';
  readonly priority?: number;
  /** Which structured data the route may emit once every gate is satisfied. */
  readonly structuredData: StructuredDataKind;
  /** Where the page's title and description come from. */
  readonly metadataSource: string;
  /**
   * Language alternates by locale → path. Declared ONLY for routes that exist.
   * Empty today: Spanish route architecture is an open decision.
   */
  readonly alternates: Readonly<Partial<Record<'es', string>>>;
  /** Why the route is not yet publishable, when it is not. */
  readonly blockedReason?: string;
}

const PHASE_2_GATE =
  'Public path not assigned: Phase 2 decision gate D2-01 (docs/phase-2-decision-gate.md) and the production SEO/legal/migration gate are still open.';

export const SEO_ROUTES: readonly SeoRoute[] = [
  {
    id: 'overview',
    previewPath: '/',
    productionPath: null,
    status: 'unresolved',
    locale: 'en',
    indexEligible: false,
    sitemapEligible: false,
    structuredData: 'none',
    metadataSource: 'app/page.tsx',
    alternates: {},
    blockedReason:
      'The root currently renders the internal foundation overview, not a public home page. Which page becomes the public home is undecided (D2-01).',
  },
  {
    id: 'foundation',
    previewPath: '/foundation',
    productionPath: null,
    status: 'laboratory',
    locale: 'en',
    indexEligible: false,
    sitemapEligible: false,
    structuredData: 'none',
    metadataSource: 'app/foundation/page.tsx',
    alternates: {},
    blockedReason: 'Internal component laboratory (AGENTS.md §7.2). Never public.',
  },
  ...(
    [
      ['home', '/preview/home', 'content/en/home.ts (seo)'],
      ['investment', '/preview/investment', 'content/en/investment.ts (seo)'],
      ['property-purchase', '/preview/property-purchase', 'content/en/property-purchase.ts (seo)'],
      ['tax-advisory', '/preview/tax-advisory', 'content/en/tax-advisory.ts (seo)'],
      ['team', '/preview/team', 'content/en/team.ts (seo)'],
      ['contact', '/preview/contact', 'content/en/contact.ts (seo)'],
    ] as const
  ).map(
    ([id, previewPath, metadataSource]): SeoRoute => ({
      id,
      previewPath,
      productionPath: null,
      status: 'unresolved',
      locale: 'en',
      // Intended for production, so eligible in principle; nothing is emitted
      // while the route is unresolved and the site-wide switch is off.
      indexEligible: true,
      sitemapEligible: true,
      changeFrequency: 'monthly',
      priority: id === 'home' ? 1 : 0.7,
      structuredData: id === 'home' || id === 'contact' ? 'entity' : 'none',
      metadataSource,
      alternates: {},
      blockedReason: PHASE_2_GATE,
    }),
  ),
];

export function routeById(id: string, routes: readonly SeoRoute[] = SEO_ROUTES): SeoRoute | undefined {
  return routes.find((route) => route.id === id);
}

/** Finds the route that renders a given path, by preview or production path. */
export function routeForPath(path: string, routes: readonly SeoRoute[] = SEO_ROUTES): SeoRoute | undefined {
  return routes.find((route) => route.previewPath === path || route.productionPath === path);
}

/**
 * A route is publishable only when its production path is decided, its status
 * is `approved` and it is not a laboratory route.
 */
export function isPublishable(route: SeoRoute): route is SeoRoute & { productionPath: string } {
  return (
    route.status === 'approved' &&
    route.productionPath !== null &&
    !route.productionPath.startsWith('/preview') &&
    route.productionPath !== '/foundation'
  );
}

/**
 * Routes that may appear in the sitemap when the site-wide indexing switch is
 * on. With every public path still unresolved this list is empty — by design.
 */
export function sitemapRoutes(
  siteIndexable: boolean,
  routes: readonly SeoRoute[] = SEO_ROUTES,
): Array<SeoRoute & { productionPath: string }> {
  if (!siteIndexable) return [];
  return routes.filter(
    (route): route is SeoRoute & { productionPath: string } =>
      isPublishable(route) && route.indexEligible && route.sitemapEligible,
  );
}

/**
 * hreflang alternates for a path: only locales the manifest declares for a
 * publishable route, plus the route's own locale. Never a guessed `/es` URL.
 */
export function languageAlternates(
  path: string,
  routes: readonly SeoRoute[] = SEO_ROUTES,
): Record<string, string> | undefined {
  const route = routeForPath(path, routes);
  if (!route || !isPublishable(route)) return undefined;
  const declared = Object.entries(route.alternates).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string',
  );
  if (declared.length === 0) return undefined;
  return { [route.locale]: route.productionPath, ...Object.fromEntries(declared) };
}

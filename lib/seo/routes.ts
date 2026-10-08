import { isLaboratoryRoute } from './config';

/**
 * SEO route manifest — the ROUTE-LEVEL source of truth: which routes exist,
 * which are publishable, their public path, which may be indexed, which enter
 * the sitemap, which carry structured data and which language alternates they
 * have.
 *
 * TWO GATES, TWO RESPONSIBILITIES
 *
 * - SITE LEVEL (`siteConfig.indexable`, lib/seo/config.ts): production mode AND
 *   an explicit `NEXT_PUBLIC_SITE_INDEXABLE=true`. Default, preview and invalid
 *   configuration stay closed. `app/robots.ts` and the global `X-Robots-Tag`
 *   header in next.config.ts read ONLY this gate (plus the fixed laboratory
 *   exclusions); they are deliberately not route-aware.
 * - ROUTE LEVEL (this file): `resolveRouteIndexing()` is the one decision that
 *   metadata robots, canonical/Open Graph and hreflang (lib/seo/metadata.ts),
 *   the sitemap (app/sitemap.ts), redirect targets (lib/seo/redirects.ts) and
 *   the entity-graph gate (lib/seo/entity-graph.ts) share, so they cannot
 *   disagree about a route.
 *
 * A page is indexable only when BOTH gates are open. Approving a route does not
 * make its `/preview/*` URL indexable: only the public `productionPath` can be.
 *
 * Declaring a `productionPath` here does NOT create an App Router page and does
 * not guarantee an HTTP 200 at that path. Building the public page and
 * checking that it answers 200 is a separate launch requirement
 * (docs/seo-route-migration.md).
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
  /** Language of the page. Only `en` routes exist today. */
  readonly locale: 'en' | 'es';
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
   * Language alternates by locale → public path. Declared ONLY for routes that
   * exist. A declaration alone emits nothing: `languageAlternates()` requires
   * the target to be another publishable, index-eligible manifest route in that
   * locale that declares this route back. Empty today: Spanish route
   * architecture is an open decision.
   */
  readonly alternates: Readonly<Partial<Record<'en' | 'es', string>>>;
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
  ...[
    '/preview/insights', '/preview/insights/[slug]',
    '/preview/case-studies', '/preview/case-studies/[slug]',
    '/studio', '/studio/[section]', '/studio/documents/[id]',
    '/studio/media', '/studio/recover/complete', '/studio/recover',
    '/studio/login', '/studio/accept-invite', '/studio/links',
    '/studio/new', '/studio/team',
  ].map((previewPath): SeoRoute => ({
    id: previewPath.slice(1).replaceAll('/', '-'),
    previewPath, productionPath: null, status: 'laboratory', locale: 'en',
    indexEligible: false, sitemapEligible: false, structuredData: 'none',
    metadataSource: 'Studio editorial metadata / authenticated layout',
    alternates: {},
    blockedReason: previewPath.startsWith('/studio')
      ? 'Private team workspace. Never indexable or in the sitemap.'
      : 'Editorial review preview. Publication does not approve search indexation.',
  })),
];

export function routeById(id: string, routes: readonly SeoRoute[] = SEO_ROUTES): SeoRoute | undefined {
  return routes.find((route) => route.id === id);
}

/** Finds the route that renders a given path, by preview or production path. */
export function routeForPath(path: string, routes: readonly SeoRoute[] = SEO_ROUTES): SeoRoute | undefined {
  return routes.find((route) => route.previewPath === path || route.productionPath === path);
}

/**
 * A well-formed public path: absolute, normalised (no `//`, `.`/`..` segments,
 * trailing slash, query, fragment, whitespace or scheme) and outside the
 * laboratory namespaces (`/preview`, `/foundation`).
 */
export function isValidPublicPath(path: string | null): path is string {
  if (typeof path !== 'string' || !path.startsWith('/')) return false;
  if (path !== '/' && path.endsWith('/')) return false;
  if (/[\s?#\\]|\/\/|:/.test(path)) return false;
  if (path.split('/').some((segment) => segment === '.' || segment === '..')) return false;
  return !isLaboratoryRoute(path);
}

/**
 * A route is publishable only when its status is `approved` and its production
 * path is a valid public path (never a laboratory path).
 */
export function isPublishable(route: SeoRoute): route is SeoRoute & { productionPath: string } {
  return route.status === 'approved' && isValidPublicPath(route.productionPath);
}

export interface RouteIndexing {
  /** The manifest route the path belongs to, if any. */
  readonly route?: SeoRoute;
  /** The approved public path of that route, when it is publishable. */
  readonly publicPath?: string;
  /** May THIS path be indexed right now? Requires both gates. */
  readonly indexable: boolean;
}

/**
 * The shared route-level decision. `indexable` is true only when ALL hold:
 * the site-level gate is open; the path belongs to a known route; the route is
 * approved with a valid, non-laboratory production path; it is index-eligible;
 * the path being served IS that production path (not its preview); and the
 * caller has not marked the page as laboratory. Anything else fails closed.
 */
export function resolveRouteIndexing(
  path: string | undefined,
  options: { siteIndexable: boolean; laboratory?: boolean },
  routes: readonly SeoRoute[] = SEO_ROUTES,
): RouteIndexing {
  const route = path === undefined ? undefined : routeForPath(path, routes);
  if (!route || !isPublishable(route)) return { route, indexable: false };
  const indexable =
    options.siteIndexable &&
    !options.laboratory &&
    route.indexEligible &&
    path === route.productionPath &&
    !isLaboratoryRoute(path);
  return { route, publicPath: route.productionPath, indexable };
}

/**
 * Routes that may appear in the sitemap when the site-wide indexing switch is
 * on. With every public path still unresolved this list is empty — by design.
 */
export function sitemapRoutes(
  siteIndexable: boolean,
  routes: readonly SeoRoute[] = SEO_ROUTES,
): Array<SeoRoute & { productionPath: string }> {
  return routes.filter(
    (route): route is SeoRoute & { productionPath: string } =>
      route.sitemapEligible &&
      route.productionPath !== null &&
      resolveRouteIndexing(route.productionPath, { siteIndexable }, routes).indexable,
  );
}

/**
 * hreflang alternates for a path. Emitted only when the path itself is an
 * indexable public URL, and only for declared alternates whose target is
 * another manifest route in that locale, indexable at that exact path, that
 * declares this route back (reciprocity). A declared string alone proves
 * nothing and is dropped. Never a guessed `/es` URL.
 */
export function languageAlternates(
  path: string,
  siteIndexable: boolean,
  routes: readonly SeoRoute[] = SEO_ROUTES,
): Record<string, string> | undefined {
  const self = resolveRouteIndexing(path, { siteIndexable }, routes);
  if (!self.indexable || !self.route || !self.publicPath) return undefined;
  const source = self.route;
  const valid = Object.entries(source.alternates).filter((entry): entry is [string, string] => {
    const [locale, target] = entry;
    if (typeof target !== 'string' || locale === source.locale) return false;
    const resolved = resolveRouteIndexing(target, { siteIndexable }, routes);
    return (
      resolved.indexable &&
      resolved.route !== undefined &&
      resolved.route.id !== source.id &&
      resolved.route.locale === locale &&
      resolved.route.alternates[source.locale] === self.publicPath
    );
  });
  if (valid.length === 0) return undefined;
  return { [source.locale]: self.publicPath, ...Object.fromEntries(valid) };
}

/**
 * Structural problems in a manifest: duplicate ids, duplicate public paths,
 * an approved route without a valid public path, or a public path that
 * collides with another route's preview path. Empty for a sound manifest.
 */
export function manifestErrors(routes: readonly SeoRoute[] = SEO_ROUTES): string[] {
  const errors: string[] = [];
  const seen = (values: string[], label: string) => {
    const counts = new Map<string, number>();
    for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
    for (const [value, count] of counts) if (count > 1) errors.push(`duplicate ${label}: ${value}`);
  };
  seen(routes.map((route) => route.id), 'route id');
  seen(
    routes.flatMap((route) => (route.productionPath === null ? [] : [route.productionPath])),
    'production path',
  );
  for (const route of routes) {
    if (route.productionPath !== null && !isValidPublicPath(route.productionPath)) {
      errors.push(`${route.id}: invalid or laboratory production path ${route.productionPath}`);
    }
    if (route.status === 'approved' && !isPublishable(route)) {
      errors.push(`${route.id}: approved without a valid production path`);
    }
    if (route.status === 'laboratory' && (route.productionPath !== null || route.indexEligible || route.sitemapEligible)) {
      errors.push(`${route.id}: a laboratory route can never be public, indexable or in the sitemap`);
    }
    const clash = routes.find((other) => other !== route && other.previewPath === route.productionPath);
    if (clash) errors.push(`${route.id}: production path collides with the preview path of ${clash.id}`);
  }
  return errors;
}

import { readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PHONE_E164 } from '@/lib/contact/channels';
import { office } from '@/content/en/contact';
import { buildEntityGraph, ENTITY_FACTS, entityGraphEmissionAllowed, validateEntityGraph } from '@/lib/seo/entity-graph';
import { MIGRATION_REGISTRY, activeRedirects, type MigrationEntry } from '@/lib/seo/redirects';
import {
  SEO_ROUTES,
  isPublishable,
  isValidPublicPath,
  languageAlternates,
  manifestErrors,
  resolveRouteIndexing,
  routeById,
  sitemapRoutes,
  type SeoRoute,
} from '@/lib/seo/routes';

const root = resolve(__dirname, '..');
const SITE = 'https://example.test';

/** Every `app/**​/page.tsx` as a URL path. */
function appRoutes(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry === 'page.tsx') {
        const rel = relative(resolve(root, 'app'), dir).split(sep).join('/');
        out.push(rel ? `/${rel}` : '/');
      }
    }
  };
  walk(resolve(root, 'app'));
  return out.sort();
}

/** A synthetic, fully approved route — used only to prove the gates open. */
const APPROVED: SeoRoute = {
  id: 'approved-fixture',
  previewPath: '/preview/fixture',
  productionPath: '/fixture',
  status: 'approved',
  locale: 'en',
  indexEligible: true,
  sitemapEligible: true,
  structuredData: 'entity',
  metadataSource: 'test fixture',
  alternates: {},
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

/** Spanish twin of APPROVED; the pair declares each other (reciprocal). */
const APPROVED_ES: SeoRoute = {
  ...APPROVED,
  id: 'approved-fixture-es',
  previewPath: '/preview/fixture-es',
  productionPath: '/es/fixture',
  locale: 'es',
  alternates: { en: '/fixture' },
};
const APPROVED_EN_WITH_ES: SeoRoute = { ...APPROVED, alternates: { es: '/es/fixture' } };

const SITE_ENV_KEYS = ['NEXT_PUBLIC_SITE_MODE', 'NEXT_PUBLIC_SITE_INDEXABLE', 'NEXT_PUBLIC_SITE_URL'] as const;

async function loadWithEnv(env: Record<string, string>) {
  vi.resetModules();
  // Start from a clean slate so an ambient variable cannot open a gate.
  for (const key of SITE_ENV_KEYS) vi.stubEnv(key, undefined);
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  return {
    sitemap: (await import('@/app/sitemap')).default,
    robots: (await import('@/app/robots')).default,
    metadata: await import('@/lib/seo/metadata'),
    nextConfig: (await import('@/next.config')).default,
  };
}

/** The global X-Robots-Tag rule next.config.ts applies to every path. */
async function globalRobotsHeader(nextConfig: { headers?: () => Promise<unknown> }) {
  const rules = (await nextConfig.headers!()) as Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
  const global = rules.find((rule) => rule.source === '/:path*');
  return global?.headers.find((header) => header.key === 'X-Robots-Tag')?.value;
}

const NOINDEX = { index: false, follow: false, googleBot: { index: false, follow: false } };
const INDEX = { index: true, follow: true, googleBot: { index: true, follow: true } };

const PRODUCTION_INDEXABLE = {
  NEXT_PUBLIC_SITE_MODE: 'production',
  NEXT_PUBLIC_SITE_INDEXABLE: 'true',
  NEXT_PUBLIC_SITE_URL: SITE,
};

describe('route manifest', () => {
  it('declares every page the app renders, exactly once', () => {
    const declared = SEO_ROUTES.map((route) => route.previewPath).sort();
    expect(declared).toEqual(appRoutes());
    expect(new Set(SEO_ROUTES.map((route) => route.id)).size).toBe(SEO_ROUTES.length);
  });

  it('is structurally sound: unique ids and public paths, no malformed or laboratory public path', () => {
    expect(manifestErrors()).toEqual([]);
    const nonNull = SEO_ROUTES.flatMap((route) => (route.productionPath ? [route.productionPath] : []));
    expect(new Set(nonNull).size).toBe(nonNull.length);
  });

  it('reports duplicate ids, duplicate public paths and malformed or laboratory public paths', () => {
    const errors = manifestErrors([
      APPROVED,
      { ...APPROVED, previewPath: '/preview/other' },
      { ...APPROVED, id: 'dup-path', previewPath: '/preview/dup' },
      { ...APPROVED, id: 'lab-path', previewPath: '/preview/lab', productionPath: '/preview/x' },
      { ...APPROVED, id: 'bad-path', previewPath: '/preview/bad', productionPath: 'fixture/' },
    ]).join('\n');
    expect(errors).toMatch(/duplicate route id: approved-fixture/);
    expect(errors).toMatch(/duplicate production path: \/fixture/);
    expect(errors).toMatch(/lab-path: invalid or laboratory production path/);
    expect(errors).toMatch(/bad-path: approved without a valid production path/);
  });

  it('accepts only well-formed public paths outside the laboratory', () => {
    for (const good of ['/', '/fixture', '/es/fixture', '/services/tax-advisory']) {
      expect(isValidPublicPath(good), good).toBe(true);
    }
    for (const bad of [
      null,
      '',
      'fixture',
      '/fixture/',
      '//evil.test/x',
      'https://example.test/x',
      '/a/../b',
      '/a?b=1',
      '/a#b',
      '/a b',
      '/preview',
      '/preview/home',
      '/foundation',
    ]) {
      expect(isValidPublicPath(bad), String(bad)).toBe(false);
    }
  });

  it('never invents a public path: every route is laboratory or unresolved today', () => {
    for (const route of SEO_ROUTES) {
      expect(route.status).not.toBe('approved');
      expect(route.productionPath).toBeNull();
      expect(route.blockedReason, route.id).toBeTruthy();
      expect(isPublishable(route)).toBe(false);
    }
  });

  it('declares no language alternate (no Spanish route exists)', () => {
    for (const route of SEO_ROUTES) expect(route.alternates).toEqual({});
  });

  it('keeps laboratory routes out of indexing and the sitemap', () => {
    for (const route of SEO_ROUTES.filter((r) => r.status === 'laboratory')) {
      expect(route.indexEligible).toBe(false);
      expect(route.sitemapEligible).toBe(false);
      expect(route.structuredData).toBe('none');
    }
  });

  it('treats a path under /preview or /foundation, or a malformed path, as never publishable', () => {
    expect(isPublishable({ ...APPROVED, productionPath: '/preview/home' })).toBe(false);
    expect(isPublishable({ ...APPROVED, productionPath: '/foundation' })).toBe(false);
    expect(isPublishable({ ...APPROVED, productionPath: '//evil.test' })).toBe(false);
    expect(isPublishable(APPROVED)).toBe(true);
  });
});

describe('sitemap', () => {
  it('is empty in preview mode', async () => {
    const { sitemap } = await loadWithEnv({ NEXT_PUBLIC_SITE_MODE: 'preview', NEXT_PUBLIC_SITE_URL: SITE });
    expect(sitemap()).toEqual([]);
  });

  it('is empty when the env is missing (safe defaults)', async () => {
    const { sitemap } = await loadWithEnv({});
    expect(sitemap()).toEqual([]);
  });

  it('is empty in production without the explicit indexable flag', async () => {
    const { sitemap } = await loadWithEnv({ NEXT_PUBLIC_SITE_MODE: 'production', NEXT_PUBLIC_SITE_URL: SITE });
    expect(sitemap()).toEqual([]);
  });

  it('stays empty in production + indexable while every public path is unresolved', async () => {
    const { sitemap } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(sitemap()).toEqual([]);
  });

  it('would list only approved, publishable, index-eligible routes', () => {
    const laboratory: SeoRoute = { ...APPROVED, id: 'lab', status: 'laboratory', productionPath: '/foundation' };
    const unresolved: SeoRoute = { ...APPROVED, id: 'open', status: 'unresolved', productionPath: null };
    const notIndexable: SeoRoute = { ...APPROVED, id: 'noidx', previewPath: '/preview/n', productionPath: '/n', indexEligible: false };
    const notInSitemap: SeoRoute = { ...APPROVED, id: 'nosm', previewPath: '/preview/s', productionPath: '/s', sitemapEligible: false };
    const routes = sitemapRoutes(true, [APPROVED, laboratory, unresolved, notIndexable, notInSitemap]);
    expect(routes.map((route) => route.id)).toEqual(['approved-fixture']);
    expect(sitemapRoutes(false, [APPROVED])).toEqual([]);
  });
});

describe('robots', () => {
  it('disallows everything in preview, even with the indexable flag', async () => {
    const { robots } = await loadWithEnv({
      NEXT_PUBLIC_SITE_MODE: 'preview',
      NEXT_PUBLIC_SITE_INDEXABLE: 'true',
      NEXT_PUBLIC_SITE_URL: SITE,
    });
    expect(robots()).toEqual({ rules: [{ userAgent: '*', disallow: '/' }] });
  });

  it('disallows everything in production without the explicit flag', async () => {
    const { robots } = await loadWithEnv({ NEXT_PUBLIC_SITE_MODE: 'production', NEXT_PUBLIC_SITE_URL: SITE });
    expect(robots()).toEqual({ rules: [{ userAgent: '*', disallow: '/' }] });
  });

  it('disallows everything when the env is missing or malformed', async () => {
    const { robots } = await loadWithEnv({ NEXT_PUBLIC_SITE_MODE: 'live', NEXT_PUBLIC_SITE_INDEXABLE: 'yes' });
    expect(robots()).toEqual({ rules: [{ userAgent: '*', disallow: '/' }] });
  });

  it('allows crawling only in production + indexable, still excluding laboratory routes', async () => {
    const { robots } = await loadWithEnv(PRODUCTION_INDEXABLE);
    const result = robots();
    expect(result.rules).toEqual([{ userAgent: '*', allow: '/', disallow: ['/foundation', '/preview'] }]);
    expect(result.sitemap).toBe(`${SITE}/sitemap.xml`);
  });
});

describe('hreflang', () => {
  it('emits no language alternates even when indexable (no fake /es URL)', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    for (const path of ['/', '/preview/home', '/preview/tax-advisory']) {
      const meta = metadata.buildMetadata({ title: 't', description: 'd', path });
      expect(meta.alternates?.languages).toBeUndefined();
    }
  });

  it('keeps the canonical on the configured origin', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    const meta = metadata.buildMetadata({ title: 't', description: 'd', path: '/preview/home' });
    expect(meta.alternates?.canonical).toBe(`${SITE}/preview/home`);
    expect(meta.openGraph?.url).toBe(`${SITE}/preview/home`);
  });
});

describe('migration registry and redirects', () => {
  it('produces no redirect today: nothing is approved and every target is unresolved', () => {
    expect(activeRedirects()).toEqual([]);
    expect(MIGRATION_REGISTRY.some((entry) => entry.status === 'approved')).toBe(false);
  });

  it('points every mapping at a route that exists in the manifest', () => {
    for (const entry of MIGRATION_REGISTRY) {
      if (entry.targetRouteId) expect(routeById(entry.targetRouteId), entry.oldPath).toBeDefined();
    }
  });

  it('lists each old URL once per origin, as a path (never a host)', () => {
    const keys = MIGRATION_REGISTRY.map((entry) => `${entry.origin}:${entry.oldPath}`);
    expect(new Set(keys).size).toBe(keys.length);
    for (const entry of MIGRATION_REGISTRY) {
      expect(entry.oldPath.startsWith('/'), entry.oldPath).toBe(true);
      expect(entry.oldPath).not.toMatch(/:\/\//);
      expect(entry.decision.length).toBeGreaterThan(10);
    }
  });

  it('never carries D-06 / HOLD pages over to a service', () => {
    const held = MIGRATION_REGISTRY.filter((entry) =>
      /the-group|el-grupo|property-management|gestion-propiedad/.test(entry.oldPath),
    );
    expect(held.length).toBeGreaterThanOrEqual(4);
    for (const entry of held) {
      expect(entry.targetRouteId).toBeNull();
      expect(entry.status).not.toBe('approved');
    }
  });

  it('redirects an approved mapping only once its target is publishable, and never cross-domain', () => {
    const approved: MigrationEntry = {
      origin: 'CURRENT_PRODUCTION',
      oldPath: '/old',
      locale: 'en',
      targetRouteId: APPROVED.id,
      status: 'approved',
      decision: 'test fixture: approved mapping',
    };
    expect(activeRedirects([approved], [APPROVED])).toEqual([
      { source: '/old', destination: '/fixture', permanent: true },
    ]);
    expect(activeRedirects([approved], [{ ...APPROVED, status: 'unresolved', productionPath: null }])).toEqual([]);
    expect(activeRedirects([approved], [{ ...APPROVED, status: 'unresolved' }])).toEqual([]);
    expect(activeRedirects([approved], [{ ...APPROVED, productionPath: '/preview/fixture' }])).toEqual([]);
    expect(activeRedirects([{ ...approved, origin: 'LEGACY_ES_DOMAIN' }], [APPROVED])).toEqual([]);
    expect(activeRedirects([{ ...approved, status: 'decision_required' }], [APPROVED])).toEqual([]);
  });
});

describe('entity graph (built and validated, not emitted)', () => {
  const graph = buildEntityGraph({ siteUrl: SITE, telephone: PHONE_E164, email: 'hello@example.test' });

  it('is a valid ProfessionalService + Person + WebSite graph', () => {
    expect(validateEntityGraph(graph, SITE)).toEqual({ valid: true, errors: [] });
    const types = (graph['@graph'] as Array<Record<string, unknown>>).map((node) => node['@type']);
    expect(types).toEqual(['ProfessionalService', 'Person', 'WebSite']);
  });

  it('uses only confirmed facts from their governed sources', () => {
    const business = (graph['@graph'] as Array<Record<string, unknown>>)[0]!;
    expect(business.telephone).toBe(PHONE_E164);
    const address = business.address as Record<string, string>;
    expect(office.addressSource.status).toBe('confirmed');
    expect(office.addressSource.text).toContain(address.streetAddress);
    expect(office.addressSource.text).toContain(address.postalCode);
    expect(office.addressSource.text).toContain(address.addressLocality);
    expect(ENTITY_FACTS.credential).toContain('SUMA Gestión Tributaria');
  });

  it('derives every URL from the configured origin and omits an unconfigured email', () => {
    const noEmail = buildEntityGraph({ siteUrl: SITE, telephone: PHONE_E164, email: null });
    expect(JSON.stringify(noEmail)).not.toContain('"email"');
    expect(JSON.stringify(graph)).not.toMatch(/sarahkaterina\.(com|es)/i);
    expect(validateEntityGraph(noEmail, SITE).valid).toBe(true);
  });

  it('rejects forbidden keys, types and wording', () => {
    const tampered = JSON.parse(JSON.stringify(graph));
    tampered['@graph'][0].aggregateRating = { ratingValue: 5 };
    tampered['@graph'][0].sameAs = ['https://example.test/profile'];
    tampered['@graph'][1].jobTitle = 'Property Decision Advisor';
    tampered['@graph'][0].description = 'Part of Sarah Katerina Group with VITA Host';
    tampered['@graph'].push({ '@type': 'RealEstateAgent', '@id': `${SITE}/#agent` });
    const result = validateEntityGraph(tampered, SITE);
    expect(result.valid).toBe(false);
    expect(result.errors.join('\n')).toMatch(/aggregateRating/);
    expect(result.errors.join('\n')).toMatch(/sameAs/);
    expect(result.errors.join('\n')).toMatch(/jobTitle/);
    expect(result.errors.join('\n')).toMatch(/VITA/);
    expect(result.errors.join('\n')).toMatch(/RealEstateAgent/);
  });

  it('rejects duplicate @id values and forbidden @type values nested at any depth', () => {
    const tampered = JSON.parse(JSON.stringify(graph));
    tampered['@graph'][2]['@id'] = tampered['@graph'][0]['@id'];
    tampered['@graph'][0].provider = { '@type': 'Organization', name: 'x' };
    tampered['@graph'][1]['@type'] = ['Person', 'RealEstateAgent'];
    const errors = validateEntityGraph(tampered, SITE).errors.join('\n');
    expect(errors).toMatch(/duplicate @id/);
    expect(errors).toMatch(/forbidden @type Organization at \$\.@graph\[0\]\.provider\.@type/);
    expect(errors).toMatch(/forbidden @type RealEstateAgent/);
  });

  it('rejects URLs off the configured origin and dangling references', () => {
    const tampered = JSON.parse(JSON.stringify(graph));
    tampered['@graph'][2].url = 'https://elsewhere.test/';
    tampered['@graph'][1].worksFor = { '@id': `${SITE}/#missing` };
    const result = validateEntityGraph(tampered, SITE);
    expect(result.errors.join('\n')).toMatch(/not on the site origin/);
    expect(result.errors.join('\n')).toMatch(/dangling reference/);
  });

  it('is not emitted on any route today', () => {
    for (const route of SEO_ROUTES) {
      expect(entityGraphEmissionAllowed(route.id, { siteIndexable: true, entityJsonLdApproved: true })).toBe(false);
    }
  });

  it('would be emitted only when indexing, publication and owner approval all hold', () => {
    const open = { siteIndexable: true, entityJsonLdApproved: true };
    expect(entityGraphEmissionAllowed(APPROVED.id, open, [APPROVED])).toBe(true);
    expect(entityGraphEmissionAllowed(APPROVED.id, { ...open, siteIndexable: false }, [APPROVED])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, { ...open, entityJsonLdApproved: false }, [APPROVED])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, open, [{ ...APPROVED, structuredData: 'none' }])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, open, [{ ...APPROVED, indexEligible: false }])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, open, [{ ...APPROVED, status: 'unresolved' }])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, open, [{ ...APPROVED, productionPath: null }])).toBe(false);
  });
});

/**
 * Publication guarantees (independent audit, PR #46). SITE LEVEL: mode +
 * explicit flag. ROUTE LEVEL: the manifest. A page is indexable only when both
 * are open. All approved routes below are synthetic fixtures.
 */
describe('publication guarantees: site gate × route gate', () => {
  const PREVIEW_WITH_FLAG = { NEXT_PUBLIC_SITE_MODE: 'preview', NEXT_PUBLIC_SITE_INDEXABLE: 'true', NEXT_PUBLIC_SITE_URL: SITE };
  const INVALID = { NEXT_PUBLIC_SITE_MODE: 'live', NEXT_PUBLIC_SITE_INDEXABLE: 'yes', NEXT_PUBLIC_SITE_URL: 'not a url' };
  const meta = (m: typeof import('@/lib/seo/metadata'), path: string, routes: readonly SeoRoute[] = [APPROVED], laboratory = false) =>
    m.buildMetadata({ title: 't', description: 'd', path, laboratory, routes });

  it('1. default, preview and invalid env → noindex everywhere, empty sitemap, global header on', async () => {
    const envs: Array<Record<string, string>> = [{}, { NEXT_PUBLIC_SITE_MODE: 'preview', NEXT_PUBLIC_SITE_URL: SITE }, INVALID];
    for (const env of envs) {
      const { metadata, sitemap, nextConfig } = await loadWithEnv(env);
      expect(meta(metadata, '/fixture').robots).toEqual(NOINDEX);
      expect(metadata.robotsFor({ path: '/fixture', routes: [APPROVED] })).toEqual(NOINDEX);
      expect(sitemap()).toEqual([]);
      expect(sitemapRoutes(false, [APPROVED])).toEqual([]);
      expect(await globalRobotsHeader(nextConfig)).toBe('noindex, nofollow');
    }
  });

  it('2. preview + flag true → metadata and the global header stay noindex', async () => {
    const { metadata, nextConfig, sitemap } = await loadWithEnv(PREVIEW_WITH_FLAG);
    expect(meta(metadata, '/fixture').robots).toEqual(NOINDEX);
    expect(sitemap()).toEqual([]);
    expect(await globalRobotsHeader(nextConfig)).toBe('noindex, nofollow');
  });

  it('2b. production without the flag keeps the global header; production + flag lifts only the global one', async () => {
    const closed = await loadWithEnv({ NEXT_PUBLIC_SITE_MODE: 'production', NEXT_PUBLIC_SITE_URL: SITE });
    expect(await globalRobotsHeader(closed.nextConfig)).toBe('noindex, nofollow');
    const open = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(await globalRobotsHeader(open.nextConfig)).toBeUndefined();
    const rules = (await open.nextConfig.headers!()) as Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
    for (const source of ['/foundation', '/preview/:path*']) {
      expect(rules.find((rule) => rule.source === source)?.headers).toEqual([{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]);
    }
  });

  it('3. production + flag + every real route (all unresolved or laboratory) → noindex', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    for (const route of SEO_ROUTES) {
      expect(metadata.buildMetadata({ title: 't', description: 'd', path: route.previewPath }).robots, route.id).toEqual(NOINDEX);
    }
    expect(meta(metadata, '/fixture', [{ ...APPROVED, status: 'unresolved' }]).robots).toEqual(NOINDEX);
  });

  it('4. unknown route, or a call without a route → noindex (fails closed)', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(meta(metadata, '/not-in-manifest').robots).toEqual(NOINDEX);
    expect(metadata.robotsFor()).toEqual(NOINDEX);
    expect(metadata.robotsFor({ routes: [APPROVED] })).toEqual(NOINDEX);
    expect(metadata.baseMetadata.robots).toEqual(NOINDEX);
  });

  it('5. approved without productionPath, or indexEligible=false → noindex', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(meta(metadata, '/preview/fixture', [{ ...APPROVED, productionPath: null }]).robots).toEqual(NOINDEX);
    expect(meta(metadata, '/fixture', [{ ...APPROVED, indexEligible: false }]).robots).toEqual(NOINDEX);
  });

  it('6. approved, eligible public route + site gate open → indexable', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(meta(metadata, '/fixture').robots).toEqual(INDEX);
    expect(resolveRouteIndexing('/fixture', { siteIndexable: true }, [APPROVED]).indexable).toBe(true);
    // Same route, site gate closed → noindex.
    expect(resolveRouteIndexing('/fixture', { siteIndexable: false }, [APPROVED]).indexable).toBe(false);
  });

  it('6b. an explicit laboratory flag blocks even an approved public route', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(meta(metadata, '/fixture', [APPROVED], true).robots).toEqual(NOINDEX);
  });

  it('7. the same logical route served at its /preview URL → noindex', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(meta(metadata, '/preview/fixture').robots).toEqual(NOINDEX);
    expect(meta(metadata, '/preview/fixture', [APPROVED], true).robots).toEqual(NOINDEX);
  });

  it('8. canonical and og use the approved productionPath (also from the preview URL), aligned', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    for (const path of ['/fixture', '/preview/fixture']) {
      const m = meta(metadata, path);
      expect(m.alternates?.canonical).toBe(`${SITE}/fixture`);
      expect(m.openGraph?.url).toBe(m.alternates?.canonical);
    }
    // No approved public path → the served path; no production URL invented.
    const unresolved = meta(metadata, '/preview/fixture', [{ ...APPROVED, status: 'unresolved' }]);
    expect(unresolved.alternates?.canonical).toBe(`${SITE}/preview/fixture`);
    expect(unresolved.openGraph?.url).toBe(`${SITE}/preview/fixture`);
    // Real routes today: canonical stays on the served preview path.
    const real = metadata.buildMetadata({ title: 't', description: 'd', path: '/preview/home', laboratory: true });
    expect(real.alternates?.canonical).toBe(`${SITE}/preview/home`);
  });

  it('9. a laboratory route is never publishable or indexable, whatever it declares', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    const lab: SeoRoute = { ...APPROVED, id: 'lab', previewPath: '/foundation', productionPath: '/foundation' };
    expect(isPublishable(lab)).toBe(false);
    expect(meta(metadata, '/foundation', [lab]).robots).toEqual(NOINDEX);
    expect(sitemapRoutes(true, [lab])).toEqual([]);
    for (const route of SEO_ROUTES.filter((r) => r.status === 'laboratory')) {
      expect(resolveRouteIndexing(route.previewPath, { siteIndexable: true }).indexable).toBe(false);
    }
  });

  it('10. no ES alternate declared → no hreflang', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(meta(metadata, '/fixture').alternates?.languages).toBeUndefined();
    expect(languageAlternates('/fixture', true, [APPROVED])).toBeUndefined();
  });

  it('11. a declared alternate whose target does not exist, is not approved or not indexable → not emitted', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    // Target missing from the manifest.
    expect(languageAlternates('/fixture', true, [APPROVED_EN_WITH_ES])).toBeUndefined();
    expect(meta(metadata, '/fixture', [APPROVED_EN_WITH_ES]).alternates?.languages).toBeUndefined();
    // Target present but unresolved, not index-eligible, wrong locale or not reciprocal.
    for (const target of [
      { ...APPROVED_ES, status: 'unresolved' as const },
      { ...APPROVED_ES, indexEligible: false },
      { ...APPROVED_ES, locale: 'en' as const },
      { ...APPROVED_ES, alternates: {} },
    ]) {
      expect(languageAlternates('/fixture', true, [APPROVED_EN_WITH_ES, target])).toBeUndefined();
    }
    // Site gate closed, or served from the preview URL → nothing.
    expect(languageAlternates('/fixture', false, [APPROVED_EN_WITH_ES, APPROVED_ES])).toBeUndefined();
    expect(languageAlternates('/preview/fixture', true, [APPROVED_EN_WITH_ES, APPROVED_ES])).toBeUndefined();
  });

  it('12. a valid, existing, reciprocal alternate → emitted, only the valid equivalents', async () => {
    const { metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    const routes = [APPROVED_EN_WITH_ES, APPROVED_ES];
    expect(languageAlternates('/fixture', true, routes)).toEqual({ en: '/fixture', es: '/es/fixture' });
    expect(languageAlternates('/es/fixture', true, routes)).toEqual({ es: '/es/fixture', en: '/fixture' });
    expect(meta(metadata, '/fixture', routes).alternates?.languages).toEqual({
      en: `${SITE}/fixture`,
      es: `${SITE}/es/fixture`,
    });
    expect(meta(metadata, '/es/fixture', routes).openGraph).toMatchObject({ locale: 'es', url: `${SITE}/es/fixture` });
  });

  it('13. an approved redirect whose target is unresolved stays inactive (independent of indexing)', () => {
    const entry: MigrationEntry = {
      origin: 'CURRENT_PRODUCTION',
      oldPath: '/old',
      locale: 'en',
      targetRouteId: APPROVED.id,
      status: 'approved',
      decision: 'test fixture: approved mapping',
    };
    expect(activeRedirects([entry], [{ ...APPROVED, status: 'unresolved' }])).toEqual([]);
    expect(activeRedirects([entry], [{ ...APPROVED, productionPath: null }])).toEqual([]);
    // Not tied to the indexing switch: an approved mapping to a publishable
    // target is served as a Next.js permanent redirect (HTTP 308).
    expect(activeRedirects([entry], [APPROVED])).toEqual([{ source: '/old', destination: '/fixture', permanent: true }]);
  });

  it('14. structured data is blocked without the site gate, a publishable route and specific approval', () => {
    const open = { siteIndexable: true, entityJsonLdApproved: true };
    expect(entityGraphEmissionAllowed(APPROVED.id, { ...open, siteIndexable: false }, [APPROVED])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, open, [{ ...APPROVED, status: 'unresolved' }])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, { ...open, entityJsonLdApproved: false }, [APPROVED])).toBe(false);
    expect(entityGraphEmissionAllowed(APPROVED.id, open, [APPROVED])).toBe(true);
  });

  it('15. the real manifest today: empty sitemap, no active redirect, no entity graph, no indexable page', async () => {
    const { sitemap, metadata } = await loadWithEnv(PRODUCTION_INDEXABLE);
    expect(sitemap()).toEqual([]);
    expect(sitemapRoutes(true)).toEqual([]);
    expect(activeRedirects()).toEqual([]);
    for (const route of SEO_ROUTES) {
      expect(entityGraphEmissionAllowed(route.id, { siteIndexable: true, entityJsonLdApproved: true })).toBe(false);
      expect(resolveRouteIndexing(route.previewPath, { siteIndexable: true }).indexable).toBe(false);
      expect(metadata.robotsFor({ path: route.previewPath })).toEqual(NOINDEX);
    }
  });
});

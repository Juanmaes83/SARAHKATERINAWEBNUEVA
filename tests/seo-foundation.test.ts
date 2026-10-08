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
  languageAlternates,
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

async function loadWithEnv(env: Record<string, string>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  return {
    sitemap: (await import('@/app/sitemap')).default,
    robots: (await import('@/app/robots')).default,
    metadata: await import('@/lib/seo/metadata'),
  };
}

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

  it('treats a path under /preview or /foundation as never publishable', () => {
    expect(isPublishable({ ...APPROVED, productionPath: '/preview/home' })).toBe(false);
    expect(isPublishable({ ...APPROVED, productionPath: '/foundation' })).toBe(false);
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

  it('would list only approved, publishable routes on the configured origin', () => {
    const laboratory: SeoRoute = { ...APPROVED, id: 'lab', status: 'laboratory', productionPath: '/foundation' };
    const unresolved: SeoRoute = { ...APPROVED, id: 'open', status: 'unresolved', productionPath: null };
    const routes = sitemapRoutes(true, [APPROVED, laboratory, unresolved]);
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

  it('would emit only declared alternates of a publishable route', () => {
    const withEs: SeoRoute = { ...APPROVED, alternates: { es: '/es/fixture' } };
    expect(languageAlternates('/fixture', [withEs])).toEqual({ en: '/fixture', es: '/es/fixture' });
    expect(languageAlternates('/fixture', [APPROVED])).toBeUndefined();
    expect(languageAlternates('/fixture', [{ ...withEs, status: 'unresolved' }])).toBeUndefined();
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
  });
});

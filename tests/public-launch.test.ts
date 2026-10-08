import { afterEach, describe, expect, it, vi } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
vi.mock('server-only', () => ({}));
vi.mock('@/lib/studio/content', () => ({listPublished: async (kind: string, drafts: boolean) => {
  if (drafts !== false) throw new Error('Sitemap must never include drafts');
  return [{href: kind === 'article' ? '/insights/published-article' : '/case-studies/published-case'}];
}}));
afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });
async function production(indexable='true') {
  vi.stubEnv('NEXT_PUBLIC_SITE_MODE','production'); vi.stubEnv('NEXT_PUBLIC_SITE_INDEXABLE',indexable); vi.stubEnv('NEXT_PUBLIC_SITE_URL','https://example.test'); vi.resetModules();
  return {routes: await import('@/lib/seo/routes'), metadata: await import('@/lib/seo/metadata'), paths: await import('@/lib/seo/public-path')};
}
describe('owner-approved launch boundaries', () => {
  it('keeps existing service and editorial URLs and maps every public landing to a real page', async () => {
    const {routes, paths}=await production();
    for(const route of routes.SEO_ROUTES.filter(routes.isPublishable)) expect(existsSync(resolve('app', route.productionPath.slice(1), 'page.tsx')),route.id).toBe(true);
    expect(paths.webPath('/preview/property-purchase#process')).toBe('/services/property-purchase#process');
    expect(paths.webPath('/preview/home#services')).toBe('/#services');
    expect(paths.webPath('https://external.test/path')).toBe('https://external.test/path');
  });
  it('indexes concrete published-detail URLs, but not preview twins, unknown routes or malformed slugs', async () => {
    const {metadata}=await production();
    expect(metadata.robotsFor({path:'/insights/published-article'})).toMatchObject({index:true,follow:true});
    expect(metadata.buildMetadata({title:'Article',description:'Verified summary',path:'/insights/published-article'}).alternates?.canonical).toBe('https://example.test/insights/published-article');
    for(const path of ['/preview/insights/published-article','/studio','/foundation','/not-real','/insights/a/b','/insights/../studio','/insights/a?draft=true']) expect(metadata.robotsFor({path}),path).toMatchObject({index:false});
  });
  it('leaves all public URLs noindex until the production switch is explicitly activated', async () => {
    const {metadata}=await production('false');
    for(const path of ['/','/insights','/insights/published-article','/case-studies/published-case']) expect(metadata.robotsFor({path})).toMatchObject({index:false});
  });
  it('sitemap includes only public landing and published editorial URLs', async () => {
    await production(); const sitemap=(await import('@/app/sitemap')).default; const entries=await sitemap();
    expect(entries).toHaveLength(10);
    expect(entries.map(e=>e.url)).toContain('https://example.test/insights/published-article');
    expect(entries.map(e=>e.url)).toContain('https://example.test/case-studies/published-case');
    expect(entries.every(e=>!e.url.includes('/preview')&&!e.url.includes('/studio')&&!e.url.includes('[slug]'))).toBe(true);
  });
});

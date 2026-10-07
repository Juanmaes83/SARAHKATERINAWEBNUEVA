import { describe, expect, it } from 'vitest';

import { resolveSiteUrl } from '@/lib/seo/config';

// Audit finding A3 (sarahkaterina, 08-AUDITORIA-PREVIEW-NUEVA-WEB.md):
// og:url pointed to one deployment host instead of a stable origin.
describe('resolveSiteUrl', () => {
  it('prefers the explicit NEXT_PUBLIC_SITE_URL', () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: 'https://example.test',
        VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app',
        VERCEL_URL: 'project-abc123-team.vercel.app',
      }),
    ).toBe('https://example.test');
  });

  it('falls back to the stable project domain before the deployment host', () => {
    expect(
      resolveSiteUrl({
        VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app',
        VERCEL_URL: 'project-abc123-team.vercel.app',
      }),
    ).toBe('https://project.vercel.app');
  });

  it('uses the deployment host only when nothing stable is available', () => {
    expect(resolveSiteUrl({ VERCEL_URL: 'project-abc123-team.vercel.app' })).toBe(
      'https://project-abc123-team.vercel.app',
    );
  });

  it('returns undefined so the schema keeps its localhost default', () => {
    expect(resolveSiteUrl({})).toBeUndefined();
  });
});

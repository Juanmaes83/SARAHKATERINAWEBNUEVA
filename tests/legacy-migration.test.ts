import { describe, expect, it } from 'vitest';
import snapshot from '@/scripts/studio/import/live-snapshot-2026-10-07.json';
import { MIGRATION_REGISTRY, activeRedirects } from '@/lib/seo/redirects';
import { routeForPath, isPublishable } from '@/lib/seo/routes';

describe('legacy migration compatibility', () => {
  it('preserves every captured legacy editorial URL at its original path', () => {
    for (const key of Object.keys(snapshot)) {
      const path = '/' + key.replace('_', '/');
      const entry = MIGRATION_REGISTRY.find(e => e.origin === 'CURRENT_PRODUCTION' && e.oldPath === path);
      expect(entry?.status, path).toBe('keep');
      const route = routeForPath(path);
      expect(route && isPublishable(route), path).toBe(true);
      expect(activeRedirects().some(r => r.source === path), path).toBe(false);
    }
  });

  it('routes resource and service aliases to concrete public equivalents in one hop', () => {
    const mappings = new Map(activeRedirects().map(r => [r.source, r.destination]));
    expect(mappings.get('/guides')).toBe('/insights');
    for (const path of ['/modelo-210-help', '/english-tax-advisor-costa-blanca', '/foreign-buyer-tax-guide'])
      expect(mappings.get(path), path).toBe('/services/tax-advisory');
    for (const [source, destination] of mappings) {
      expect(source).not.toBe(destination);
      expect(mappings.has(destination), source).toBe(false);
      const route = routeForPath(destination);
      expect(route && isPublishable(route), destination).toBe(true);
      expect(destination).not.toMatch(/^\/(preview|studio|foundation)(\/|$)/);
    }
  });

  it('keeps legal, paid tools, held services, Spanish and external-domain decisions separate', () => {
    const redirects = activeRedirects();
    for (const entry of MIGRATION_REGISTRY.filter(e =>
      e.locale === 'es' || ['/privacy', '/tax-diagnostic', '/about/the-group', '/services/property-management', '/investment/opportunities'].includes(e.oldPath))) {
      expect(entry.status, entry.oldPath).not.toBe('approved');
      expect(redirects.some(r => r.source === entry.oldPath && entry.origin === 'CURRENT_PRODUCTION'), entry.oldPath).toBe(false);
    }
  });
});

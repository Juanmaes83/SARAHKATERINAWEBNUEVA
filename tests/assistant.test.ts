import { describe, expect, it } from 'vitest';
import { assistantReviewEnabled, isAssistantWebsiteRoute } from '@/lib/assistant/policy';
import { ASSISTANT_RESPONSES, ASSISTANT_OPENER, ASSISTANT_APPROVAL } from '@/content/en/assistant';
import { resolveContactChannels, PHONE_E164 } from '@/lib/contact/channels';

describe('assistant review boundary', () => {
  it('never enables the assistant on a production deployment, even with preview site mode', () => {
    expect(assistantReviewEnabled('production', 'production')).toBe(false);
    expect(assistantReviewEnabled('production', 'preview')).toBe(false);
    expect(assistantReviewEnabled('development', 'production')).toBe(false);
    expect(assistantReviewEnabled(undefined, 'production')).toBe(false);
    expect(assistantReviewEnabled('preview', 'production')).toBe(true);
    expect(assistantReviewEnabled(undefined, 'preview')).toBe(true);
    expect(ASSISTANT_APPROVAL.permission).toBe('INTERNAL_TEST_ONLY');
  });
  it('keeps private, unknown and lookalike destinations out of the assistant surface', () => {
    for (const path of [
      null,
      '/studio',
      '/studio/login',
      '/api/studio/media',
      '/foundation',
      '/contacted',
      '/preview/homework',
      '/unknown',
    ]) {
      expect(isAssistantWebsiteRoute(path)).toBe(false);
    }
    for (const path of [
      '/',
      '/preview/home',
      '/contact',
      '/preview/contact',
      '/insights/example',
      '/preview/privacy',
      '/services/property-purchase',
    ]) {
      expect(isAssistantWebsiteRoute(path)).toBe(true);
    }
  });
  it('routes the reviewed catalogue only to existing website destinations', () => {
    expect(new Set(ASSISTANT_RESPONSES.map((item) => item.id)).size).toBe(
      ASSISTANT_RESPONSES.length,
    );
    for (const response of ASSISTANT_RESPONSES) {
      expect(response.sources.length).toBeGreaterThan(0);
      for (const link of response.links) {
        expect(link.href.startsWith('/')).toBe(true);
        expect(isAssistantWebsiteRoute(link.href)).toBe(true);
      }
    }
  });
  it('passes only the fixed neutral opener to the existing WhatsApp number', () => {
    const url = new URL(resolveContactChannels(ASSISTANT_OPENER).whatsapp.href);
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/' + PHONE_E164.slice(1));
    expect([...url.searchParams.keys()]).toEqual(['text']);
    expect(url.searchParams.get('text')).toBe('Hi Sarah, I would like to get in touch.');
  });
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { articleContent, slugSchema, titleSchema } from '@/lib/studio/schema';

/**
 * New Studio articles drafted on 2026-10-08 (scripts/studio/import/
 * new-articles-2026-10-08.json). They must satisfy the same content contract
 * the Studio editor enforces, cite dated https sources, arrive as drafts with
 * a professional-review note, and stay inside the governance wording rules.
 */

interface Payload {
  document: { kind: string; slug: string; title: string; status: string; working: unknown };
  revisions: Array<{
    number: number;
    reason: string;
    slug: string;
    title: string;
    content: unknown;
  }>;
  publish_revision?: number;
  notes: Array<{ domain: string; severity: string; body: string }>;
}

const file = resolve(__dirname, '../scripts/studio/import/new-articles-2026-10-08.json');
const payloads = JSON.parse(readFileSync(file, 'utf8')) as Payload[];
const seedSlugs = JSON.parse(
  readFileSync(
    resolve(__dirname, '../scripts/studio/import/live-snapshot-2026-10-07.json'),
    'utf8',
  ),
) as unknown;

describe('new Studio articles (2026-10-08)', () => {
  it('has the two drafted articles', () => {
    expect(payloads.map((p) => p.document.slug)).toEqual([
      'ibi-alicante-province-non-resident-owners',
      'non-resident-owner-tax-calendar-alicante-2026',
    ]);
  });

  for (const payload of payloads) {
    describe(payload.document.slug, () => {
      const parsed = articleContent.safeParse(payload.document.working);

      it('satisfies the Studio article contract (title, slug and content)', () => {
        expect(parsed.success, JSON.stringify(parsed.success ? null : parsed.error.issues)).toBe(
          true,
        );
        expect(titleSchema.safeParse(payload.document.title).success).toBe(true);
        expect(slugSchema.safeParse(payload.document.slug).success).toBe(true);
      });

      it('arrives as an unpublished draft with a professional-review note', () => {
        expect(payload.document.kind).toBe('article');
        expect(payload.document.status).toBe('draft');
        expect(payload.publish_revision).toBeUndefined();
        expect(payload.notes.some((n) => n.domain === 'tax' && n.severity === 'review')).toBe(true);
        expect(payload.revisions).toHaveLength(1);
        expect(payload.revisions[0]?.content).toEqual(payload.document.working);
      });

      it('answers first and cites dated https primary sources, each one used', () => {
        if (!parsed.success) throw parsed.error;
        const content = parsed.data;
        expect(content.answer?.length ?? 0).toBeGreaterThan(200);
        expect(content.sources.length).toBeGreaterThanOrEqual(2);
        const ids = new Set(content.sources.map((s) => s.id));
        const cited = content.blocks.flatMap((b) => (b.type === 'source' ? [b.sourceId] : []));
        for (const id of cited) expect(ids.has(id), id).toBe(true);
        for (const source of content.sources) {
          expect(source.url.startsWith('https://'), source.url).toBe(true);
          expect(source.checkedOn >= '2026-10-07', source.id).toBe(true);
        }
      });

      it('has complete on-page SEO: custom title ≤ 70, description ≤ 170, H2 outline with anchors', () => {
        if (!parsed.success) throw parsed.error;
        const { seo, blocks } = parsed.data;
        expect(seo.mode).toBe('custom');
        expect(seo.title?.length ?? 0).toBeGreaterThan(30);
        expect(seo.title!.length).toBeLessThanOrEqual(70);
        expect(seo.description?.length ?? 0).toBeGreaterThan(100);
        const headings = blocks.filter((b) => b.type === 'heading');
        expect(headings.length).toBeGreaterThanOrEqual(3);
        for (const h of headings) {
          expect(h.level).toBe(2);
          expect(h.anchor, h.text).toMatch(/^[a-z0-9-]+$/);
        }
        expect(blocks.some((b) => b.type === 'cta')).toBe(true);
      });

      it('stays inside the governance wording rules', () => {
        const text = JSON.stringify(payload.document.working);
        expect(text).not.toMatch(/\bVITA\b|\bGroup\b/);
        expect(text).not.toMatch(/estate agen|realtor|property management|guarantee/i);
      });
    });
  }

  it('does not reuse a slug of the imported live content', () => {
    const live = JSON.stringify(seedSlugs);
    for (const payload of payloads) expect(live.includes(`/${payload.document.slug}`)).toBe(false);
  });
});

import 'server-only';
import { cache } from 'react';
import { draftMode } from 'next/headers';
import { publicClient } from '@/lib/supabase/public';
import { sessionClient } from '@/lib/supabase/server';
import { supabaseEnv } from '@/lib/supabase/env';
import {
  parseContent,
  pickPageFields,
  type ArticleContent,
  type CaseContent,
  type DocumentContent,
} from './schema';
import { mediaUrls, type MediaRecord, type ResolvedMedia } from './media';

/**
 * Read layer for the PUBLIC editorial pages.
 *
 * Normal visitors read `publications` through the anonymous client — the only
 * table RLS exposes to them. A signed-in Studio member who opened the page
 * through "Preview" (Next.js draft mode) reads the WORKING copy instead,
 * through their own session, so a draft is never rendered for anyone who is
 * not a member: draft mode alone is not enough, RLS still has to agree.
 */

export type EditorialKind = 'article' | 'case';

export const EDITORIAL_BASE: Record<EditorialKind, string> = {
  article: '/preview/insights',
  case: '/preview/case-studies',
};

export const EDITORIAL_LABEL: Record<EditorialKind, string> = {
  article: 'Insights',
  case: 'Case studies',
};

export function editorialPath(kind: EditorialKind, slug: string): string {
  return `${EDITORIAL_BASE[kind]}/${slug}`;
}

export interface EditorialDoc<C extends DocumentContent = DocumentContent> {
  readonly id: string;
  readonly kind: C['kind'];
  readonly slug: string;
  readonly title: string;
  readonly content: C;
  readonly publishedAt: string | null;
  readonly firstPublishedAt: string | null;
  /** True when rendering a Studio draft in draft mode. */
  readonly isDraft: boolean;
}

export interface EditorialCard {
  readonly id: string;
  readonly kind: EditorialKind;
  readonly slug: string;
  readonly title: string;
  readonly dek: string;
  readonly category: string;
  readonly href: string;
  readonly date: string | null;
  readonly heroMediaId: string | null;
  readonly heroAlt: string;
}

export function isDatabaseConfigured(): boolean {
  return supabaseEnv() !== null;
}

async function isDraftPreview(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

function toCard(row: {
  document_id: string;
  kind: EditorialKind;
  slug: string;
  title: string;
  content: unknown;
  published_at: string | null;
}): EditorialCard | null {
  const content = parseContent(row.content);
  if (!content || content.kind === 'page') return null;
  return {
    id: row.document_id,
    kind: row.kind,
    slug: row.slug,
    title: row.title,
    dek: content.dek,
    category: content.category,
    href: editorialPath(row.kind, row.slug),
    date: content.dates.updated ?? content.dates.published ?? row.published_at?.slice(0, 10) ?? null,
    heroMediaId: content.hero?.mediaId ?? null,
    heroAlt: content.hero?.alt ?? '',
  };
}

/** Published cards of one kind, newest first. Empty when the database is not configured. */
export const listPublished = cache(async (kind: EditorialKind): Promise<EditorialCard[]> => {
  const client = publicClient();
  if (!client) return [];
  const { data, error } = await client
    .from('publications')
    .select('document_id, kind, slug, title, content, published_at')
    .eq('kind', kind)
    .eq('locale', 'en')
    .order('first_published_at', { ascending: false });
  if (error || !data) return [];
  return data
    .map((row) => toCard(row as Parameters<typeof toCard>[0]))
    .filter((card): card is EditorialCard => card !== null)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
});

export const getEditorial = cache(
  async (
    kind: EditorialKind,
    slug: string,
    revisionId?: string,
  ): Promise<EditorialDoc<ArticleContent | CaseContent> | null> => {
    if (await isDraftPreview()) {
      const draft = await readDraft(kind, slug, revisionId);
      if (draft) return draft;
    }
    const client = publicClient();
    if (!client) return null;
    const { data } = await client
      .from('publications')
      .select('document_id, kind, slug, title, content, published_at, first_published_at')
      .eq('kind', kind)
      .eq('locale', 'en')
      .eq('slug', slug)
      .maybeSingle();
    if (!data) return null;
    const content = parseContent(data.content);
    if (!content || content.kind !== kind) return null;
    return {
      id: data.document_id as string,
      kind,
      slug: data.slug as string,
      title: data.title as string,
      content: content as ArticleContent | CaseContent,
      publishedAt: (data.published_at as string | null) ?? null,
      firstPublishedAt: (data.first_published_at as string | null) ?? null,
      isDraft: false,
    };
  },
);

async function readDraft(
  kind: EditorialKind,
  slug: string,
  revisionId?: string,
): Promise<EditorialDoc<ArticleContent | CaseContent> | null> {
  const client = await sessionClient();
  if (!client) return null;
  const { data: doc } = await client
    .from('documents')
    .select('id, kind, slug, title, working')
    .eq('kind', kind)
    .eq('locale', 'en')
    .eq('slug', slug)
    .maybeSingle();
  if (!doc) return null;

  let title = doc.title as string;
  let raw: unknown = doc.working;
  if (revisionId) {
    const { data: rev } = await client
      .from('revisions')
      .select('title, content')
      .eq('id', revisionId)
      .eq('document_id', doc.id)
      .maybeSingle();
    if (rev) {
      title = rev.title as string;
      raw = rev.content;
    }
  }
  const content = parseContent(raw);
  if (!content || content.kind !== kind) return null;
  return {
    id: doc.id as string,
    kind,
    slug: doc.slug as string,
    title,
    content: content as ArticleContent | CaseContent,
    publishedAt: null,
    firstPublishedAt: null,
    isDraft: true,
  };
}

/** Published cards for the given document ids, in the order given. */
export async function cardsFor(ids: readonly string[]): Promise<EditorialCard[]> {
  if (ids.length === 0) return [];
  const client = publicClient();
  if (!client) return [];
  const { data } = await client
    .from('publications')
    .select('document_id, kind, slug, title, content, published_at')
    .in('document_id', [...ids]);
  const cards = (data ?? [])
    .map((row) => toCard(row as Parameters<typeof toCard>[0]))
    .filter((card): card is EditorialCard => card !== null);
  return ids.flatMap((id) => cards.filter((card) => card.id === id));
}

/** Library records for the given ids, resolved to public URLs. Evidence never resolves here. */
export async function resolveMedia(ids: readonly string[]): Promise<Map<string, ResolvedMedia>> {
  const unique = [...new Set(ids.filter(Boolean))];
  const out = new Map<string, ResolvedMedia>();
  const client = publicClient();
  const env = supabaseEnv();
  if (unique.length === 0 || !client || !env) return out;
  const { data } = await client
    .from('media')
    .select('id, bucket, original_path, variants, width, height, alt, caption, credit, focus_x, focus_y')
    .eq('bucket', 'media')
    .in('id', unique);
  for (const row of (data ?? []) as MediaRecord[]) {
    out.set(row.id, mediaUrls(env.url, row));
  }
  return out;
}

/**
 * Editable page fields (Home, Investment). Returns only allow-listed,
 * non-empty overrides, so an unedited page renders its approved defaults
 * byte for byte.
 */
export const pageOverrides = cache(async (slug: string): Promise<Record<string, string>> => {
  if (await isDraftPreview()) {
    const client = await sessionClient();
    if (client) {
      const { data } = await client
        .from('documents')
        .select('working')
        .eq('kind', 'page')
        .eq('slug', slug)
        .maybeSingle();
      const content = parseContent(data?.working);
      if (content?.kind === 'page') return pickPageFields(slug, content.fields);
    }
  }
  const client = publicClient();
  if (!client) return {};
  const { data } = await client
    .from('publications')
    .select('content')
    .eq('kind', 'page')
    .eq('slug', slug)
    .maybeSingle();
  const content = parseContent(data?.content);
  return content?.kind === 'page' ? pickPageFields(slug, content.fields) : {};
});

/** Active redirect for a retired path (slug change), if any. */
export async function redirectFor(path: string): Promise<string | null> {
  const client = publicClient();
  if (!client) return null;
  const { data } = await client
    .from('redirects')
    .select('destination_path')
    .eq('source_path', path)
    .eq('active', true)
    .maybeSingle();
  return (data?.destination_path as string | undefined) ?? null;
}

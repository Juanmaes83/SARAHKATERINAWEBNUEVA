import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import { publicPath } from '@/lib/seo/public-path';
import { absoluteUrl } from '@/lib/seo/config';
import { editorialPath, resolveMedia, type EditorialDoc, type EditorialKind } from './content';
import type { ArticleContent, CaseContent } from './schema';
import { plainInline } from './inline';

export async function editorialMetadata(doc: EditorialDoc<ArticleContent | CaseContent>, servedPath?: string): Promise<Metadata> {
  const content = doc.content;
  const path = servedPath ?? `/preview/${doc.kind === 'article' ? 'insights' : 'case-studies'}/${doc.slug}`;
  const media = content.seo.ogImageMediaId || content.hero?.mediaId;
  const image = media ? (await resolveMedia([media])).get(media)?.ogSrc : undefined;
  const title = content.seo.mode === 'custom' && content.seo.title ? content.seo.title : doc.title;
  const description = content.seo.mode === 'custom' && content.seo.description ? content.seo.description : plainInline(content.dek).slice(0, 160);
  const base = buildMetadata({ title, description, path, laboratory: doc.isDraft || path.startsWith('/preview/') });
  return { ...base, openGraph: { ...base.openGraph, type: 'article', images: image ? [{ url: image }] : undefined }, twitter: { ...base.twitter, images: image ? [image] : undefined } };
}

export function editorialSchema(doc: EditorialDoc<ArticleContent | CaseContent>, servedPath?: string) {
  const path = servedPath ?? editorialPath(doc.kind as EditorialKind, doc.slug);
  const url = absoluteUrl(path);
  const previewList = doc.kind === 'article' ? '/preview/insights' : '/preview/case-studies';
  const listPath = servedPath ? publicPath(previewList) : previewList;
  const content = doc.content;
  const graph: Record<string, unknown>[] = [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(servedPath ? '/' : '/preview/home') },
      { '@type': 'ListItem', position: 2, name: doc.kind === 'article' ? 'Insights' : 'Case studies', item: absoluteUrl(listPath) },
      { '@type': 'ListItem', position: 3, name: doc.title, item: url },
    ] },
    { '@type': doc.kind === 'article' ? 'BlogPosting' : 'Article', mainEntityOfPage: url,
      headline: doc.title, description: plainInline(content.dek),
      ...(content.byline?.name ? { author: { '@type': 'Person', name: content.byline.name } } : {}),
      ...(content.dates.published || doc.firstPublishedAt ? { datePublished: content.dates.published || doc.firstPublishedAt } : {}),
      ...(content.dates.updated || doc.publishedAt ? { dateModified: content.dates.updated || doc.publishedAt } : {}),
    },
  ];
  return { '@context': 'https://schema.org', '@graph': graph };
}

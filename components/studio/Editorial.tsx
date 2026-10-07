import Link from 'next/link';
import { WebHeader } from '@/components/web/WebHeader';
import { WebFooter } from '@/components/web/WebFooter';
import { HOME_PREVIEW_ROUTE, UNIFIED_WEB_NAV, BUYER_TOOLS_LABEL } from '@/content/en/site-navigation';
import { parseInline } from '@/lib/studio/inline';
import { anchorFor, type ArticleContent, type Block, type CaseContent } from '@/lib/studio/schema';
import { cardsFor, editorialPath, resolveMedia, type EditorialCard, type EditorialDoc, type EditorialKind } from '@/lib/studio/content';
import { APPROVED_MEDIA, type ApprovedMedia } from '@/lib/media/approved-media';
import styles from './Editorial.module.css';

const illustrationBySlug: Record<string, ApprovedMedia> = {
  'modelo-210-explained': APPROVED_MEDIA.purchaseFiscalExposure,
  'five-documents-before-arras': APPROVED_MEDIA.purchaseOneFile,
  'gross-vs-net-yield-costa-blanca': APPROVED_MEDIA.caseApartmentLetting,
  'dutch-investor-orihuela': APPROVED_MEDIA.territoryContact,
  'german-retiree-guardamar': APPROVED_MEDIA.territoryCoast,
};

function renderInline(value: string) {
  return parseInline(value).map((part, index) => part.kind === 'strong'
    ? <strong key={index}>{part.value}</strong>
    : part.kind === 'link' ? <a key={index} href={part.href}>{part.value}</a>
      : <span key={index}>{part.value}</span>);
}

export function EditorialShell({ children }: { children: React.ReactNode }) {
  const nav=[...UNIFIED_WEB_NAV,{href:'/preview/insights',label:'Insights'},{href:'/preview/case-studies',label:'Case studies'}];
  return <><WebHeader nav={nav} ctaLabel={BUYER_TOOLS_LABEL} brandHref={HOME_PREVIEW_ROUTE} showLanguageSwitcher={false} /><main className={styles.main}>{children}</main><WebFooter /></>;
}

export async function EditorialListing({ kind, cards, draft }: { kind: EditorialKind; cards: EditorialCard[]; draft: boolean }) {
  const media = await resolveMedia(cards.flatMap(card => card.heroMediaId ? [card.heroMediaId] : []));
  return <EditorialShell><div className={styles.wrap}>
    <p className={styles.eyebrow}>Sarah Katerina · {draft ? 'Studio preview' : 'Editorial'}</p>
    <h1>{kind === 'article' ? 'Insights' : 'Case studies'}</h1>
    <p className={styles.intro}>{kind === 'article' ? 'Clear answers for decisions about buying, investing and tax in Spain.' : 'Real client situations, the decisions made and the results recorded.'}</p>
    {cards.length ? <div className={styles.grid}>{cards.map(card => <Link className={styles.card} href={card.href} key={card.id}>
      {card.heroMediaId && media.get(card.heroMediaId) ? <img src={media.get(card.heroMediaId)!.src} alt={card.heroAlt} /> : illustrationBySlug[card.slug] ? <img src={illustrationBySlug[card.slug]!.src} alt={illustrationBySlug[card.slug]!.alt} /> : null}
      <div className={styles.cardBody}><span className={styles.eyebrow}>{card.category}</span><h2>{card.title}</h2><p>{card.dek}</p><span className={styles.read}>Read {kind === 'article' ? 'insight' : 'case'} →</span></div>
    </Link>)}</div> : <p>No {kind === 'article' ? 'insights' : 'cases'} have been published in this preview yet.</p>}
  </div></EditorialShell>;
}

function BlockView({ block, sources, media }: { block: Block; sources: ArticleContent['sources']; media: Awaited<ReturnType<typeof resolveMedia>> }) {
  switch (block.type) {
    case 'paragraph': return <p>{renderInline(block.text)}</p>;
    case 'heading': { const id = block.anchor || anchorFor(block.text); return block.level === 2 ? <h2 id={id}>{block.text}</h2> : <h3 id={id}>{block.text}</h3>; }
    case 'list': { const Tag = block.ordered ? 'ol' : 'ul'; return <Tag>{block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</Tag>; }
    case 'table': return <div className={styles.tableScroll}><table><caption>{block.caption}</caption><thead><tr>{block.rows[0]?.map((cell, i) => <th key={i} scope="col">{cell}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table>{block.note ? <p>{block.note}</p> : null}</div>;
    case 'quote': return <blockquote><p>{renderInline(block.text)}</p>{block.cite ? <cite>{block.cite}</cite> : null}</blockquote>;
    case 'image': { const item = media.get(block.mediaId); return item ? <figure><img src={item.src} srcSet={item.srcSet || undefined} alt={block.decorative ? '' : block.alt || item.alt} style={{objectPosition:item.objectPosition}} />{block.caption ? <figcaption>{block.caption}</figcaption> : null}</figure> : null; }
    case 'source': { const source = sources.find(s => s.id === block.sourceId); return source ? <p><a href={source.url} rel="noopener noreferrer">{block.text || source.label}</a></p> : null; }
    case 'cta': { const href = { contact:'/preview/contact', booking:'/preview/contact', investment:'/preview/investment', purchase:'/preview/property-purchase', tax:'/preview/tax-advisory', team:'/preview/team' }[block.target]; return <aside className={styles.cta}><p>{block.text}</p><Link href={href}>{block.label} →</Link></aside>; }
  }
}

export async function EditorialDetail({ doc }: { doc: EditorialDoc<ArticleContent | CaseContent> }) {
  const { content } = doc;
  const media = await resolveMedia([...content.blocks.filter(b => b.type === 'image').map(b => b.mediaId), ...(content.hero ? [content.hero.mediaId] : [])]);
  const hero = content.hero ? media.get(content.hero.mediaId) : null;
  const illustration = hero ? null : illustrationBySlug[doc.slug];
  const related = await cardsFor(content.related.documents);
  const toc = content.blocks.filter(b => b.type === 'heading' && b.level === 2);
  const base = doc.kind === 'article' ? '/preview/insights' : '/preview/case-studies';
  return <EditorialShell><article className={styles.wrap}>
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/preview/home">Home</Link> / <Link href={base}>{doc.kind === 'article' ? 'Insights' : 'Case studies'}</Link> / <span aria-current="page">{doc.title}</span></nav>
    {doc.isDraft ? <p className={styles.draft}>Studio working preview · Private</p> : null}
    <header className={styles.articleHeader}><p className={styles.eyebrow}>{content.category}{content.jurisdiction ? ` · ${content.jurisdiction}` : ''}</p><h1>{doc.title}</h1><p className={styles.intro}>{content.dek}</p>{content.byline ? <p>By {content.byline.name}{content.dates.updated ? ` · Updated ${content.dates.updated}` : ''}</p> : null}</header>
    {hero ? <figure className={styles.hero}><img src={hero.src} srcSet={hero.srcSet || undefined} alt={content.hero?.alt || hero.alt} style={{objectPosition:hero.objectPosition}} />{content.hero?.caption ? <figcaption>{content.hero.caption}</figcaption> : null}</figure> : illustration ? <figure className={styles.hero}><img src={illustration.src} alt={illustration.alt} /><figcaption>Illustrative image. It does not depict the client, property or outcome in this story.</figcaption></figure> : null}
    <div className={styles.reading}>
      {doc.kind === 'article' && content.kind === 'article' ? <>{content.answer ? <section className={styles.answer}><h2>At a glance</h2><p>{renderInline(content.answer)}</p></section> : null}{toc.length ? <nav aria-label="On this page" className={styles.toc}><strong>On this page</strong><ol>{toc.map((b, i) => b.type === 'heading' ? <li key={i}><a href={`#${b.anchor || anchorFor(b.text)}`}>{b.text}</a></li> : null)}</ol></nav> : null}</> : null}
      {doc.kind === 'case' && content.kind === 'case' ? <><section className={styles.caseFacts}><h2>At a glance</h2><dl>{content.facts.map((fact, i) => <div key={i}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></section>{([['Context', content.context], ['Challenge', content.challenge], ['What we did', content.intervention], ['Outcome', content.outcome]] as const).map(([label, value]) => value ? <section key={label}><h2>{label}</h2><p>{renderInline(value)}</p></section> : null)}{content.results.length ? <section><h2>Results and period</h2><dl className={styles.results}>{content.results.map((result, i) => <div key={i}><dt>{result.label}</dt><dd><strong>{result.value}</strong> · {result.type}{result.period ? ` · ${result.period}` : ''}{result.note ? <small>{result.note}</small> : null}</dd></div>)}</dl></section> : null}</> : null}
      {content.blocks.map((block, i) => <BlockView key={i} block={block} sources={content.sources} media={media} />)}
      {content.sources.length ? <section className={styles.sources}><h2>Sources</h2><ol>{content.sources.map(source => <li key={source.id}><a href={source.url} rel="noopener noreferrer">{source.label}</a> · {source.publisher} · checked {source.checkedOn}</li>)}</ol></section> : null}
      {related.length ? <section><h2>Related reading</h2><ul>{related.map(card => <li key={card.id}><Link href={editorialPath(card.kind, card.slug)}>{card.title}</Link></li>)}</ul></section> : null}
      <aside className={styles.cta}><h2>Discuss your situation</h2><p>Start with the facts that matter to your decision.</p><Link href="/preview/contact">Contact Sarah →</Link></aside>
    </div>
  </article></EditorialShell>;
}

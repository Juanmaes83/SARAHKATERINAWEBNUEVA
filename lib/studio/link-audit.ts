import 'server-only';
import { editorialPath } from './content';
import { parseContent } from './schema';
import { inlineLinks } from './inline';
import core from '@rubik/seo-geo-core/content';
import adapters from '@rubik/seo-geo-core/adapters';

type Row={id:string;kind:string;slug:string;title:string;working:unknown};
type Issue={documentId:string;title:string;href:string;reason:string};
// The Core owns path safety and vertical adapter selection. The Next host owns
// the public route graph and renders metadata once through Next, not Publisher.
export const ADAPTER_ID = adapters.describe({seo:{adapterId:'professional-service'}}).id;
const STATIC_ROUTES=new Set(['/preview/home','/preview/investment','/preview/tax-advisory','/preview/property-purchase','/preview/team','/preview/contact','/preview/insights','/preview/case-studies']);

export function auditEditorialLinks(rows:Row[],publishedIds:Set<string>):Issue[]{
  const routes=new Set(STATIC_ROUTES);
  for(const row of rows)if(publishedIds.has(row.id)&&row.kind!=='page')routes.add(editorialPath(row.kind as 'article'|'case',row.slug));
  const issues:Issue[]=[];
  for(const row of rows){const content=parseContent(row.working);if(!content||content.kind==='page')continue;
    const links=[...content.blocks.flatMap(block=>block.type==='paragraph'||block.type==='quote'?inlineLinks(block.text):block.type==='cta'?[]:[]),...content.related.documents.map(id=>`document:${id}`)];
    for(const href of links){if(href.startsWith('document:')){if(!publishedIds.has(href.slice(9)))issues.push({documentId:row.id,title:row.title,href,reason:'Related document is not published'});continue;}
      if(!href.startsWith('/'))continue;const path=href.split(/[?#]/,1)[0]||'/';
      const unsafe=core.unsafePathReason(path);if(unsafe)issues.push({documentId:row.id,title:row.title,href,reason:`Unsafe path: ${unsafe}`});
      else if(!routes.has(path))issues.push({documentId:row.id,title:row.title,href,reason:'Destination is not published or does not exist'});
    }
  }
  return issues;
}

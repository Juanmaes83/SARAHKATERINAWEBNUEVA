import { notFound } from 'next/navigation';
import { EditorialDetail } from '@/components/studio/Editorial';
import { getEditorial } from '@/lib/studio/content';
import { editorialMetadata, editorialSchema } from '@/lib/studio/editorial-seo';
export const dynamic = 'force-dynamic';
type Props = { params: Promise<{slug: string}> };
export async function generateMetadata({params}: Props) { const slug=(await params).slug; const doc=await getEditorial('article',slug,undefined,false); return doc ? editorialMetadata(doc,'/insights/'+slug) : {robots:{index:false}}; }
export default async function Page({params}: Props) { const slug=(await params).slug; const doc=await getEditorial('article',slug,undefined,false); if(!doc) notFound(); return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(editorialSchema(doc,'/insights/'+slug)).replace(/</g,'\\u003c')}}/><EditorialDetail doc={doc}/></>; }

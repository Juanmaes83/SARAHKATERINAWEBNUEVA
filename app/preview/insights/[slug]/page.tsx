import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { EditorialDetail } from '@/components/studio/Editorial';
import { getEditorial } from '@/lib/studio/content';
import { editorialMetadata, editorialSchema } from '@/lib/studio/editorial-seo';
export const dynamic = 'force-dynamic';
type Props = {params: Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const doc=await getEditorial('article',(await params).slug);return doc?editorialMetadata(doc):{robots:{index:false}};}
export default async function Page({params}:Props){const doc=await getEditorial('article',(await params).slug);if(!doc)notFound();return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(editorialSchema(doc)).replace(/</g,'\\u003c')}}/><EditorialDetail doc={doc}/></>;}

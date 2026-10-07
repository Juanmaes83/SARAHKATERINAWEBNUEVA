import { notFound,redirect } from 'next/navigation';
import { studioSession } from '@/lib/supabase/server';
import { parseContent } from '@/lib/studio/schema';
import { DocumentEditor } from '@/components/studio/DocumentEditor';
import styles from '@/components/studio/Studio.module.css';
export default async function Page({params}:{params:Promise<{id:string}>}){
  const session=await studioSession();if(!session)redirect('/studio/login');
  const {data:doc}=await session.client.from('documents').select('id,title,slug,kind,working,status,lock_version,has_unpublished_changes').eq('id',(await params).id).maybeSingle();
  if(!doc)notFound();const content=parseContent(doc.working);if(!content)notFound();
  const {data:revisions}=await session.client.from('revisions').select('id,number,reason,created_at').eq('document_id',doc.id).order('number',{ascending:false});
  const {data:notes}=await session.client.from('review_notes').select('id,code,domain,severity,body,resolved').eq('document_id',doc.id).order('created_at',{ascending:true});
  const [{data:related},{data:media}]=await Promise.all([
    session.client.from('documents').select('id,title,kind').in('kind',['article','case']).neq('id',doc.id).order('title'),
    session.client.from('media').select('id,alt').eq('bucket','media').order('created_at',{ascending:false}),
  ]);
  return <main className={styles.content}><DocumentEditor doc={{id:doc.id,title:doc.title,slug:doc.slug,kind:doc.kind,status:doc.status,version:doc.lock_version,content}} revisions={revisions??[]} notes={notes??[]} role={session.role} relatedOptions={related??[]} mediaOptions={media??[]}/></main>;
}

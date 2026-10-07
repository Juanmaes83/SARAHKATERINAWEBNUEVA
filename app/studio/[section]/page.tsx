import Link from 'next/link';
import { notFound,redirect } from 'next/navigation';
import { studioSession } from '@/lib/supabase/server';
import styles from '@/components/studio/Studio.module.css';
const SECTIONS={pages:{kind:'page',title:'Páginas'},articles:{kind:'article',title:'Artículos'},cases:{kind:'case',title:'Casos'}} as const;
export default async function Page({params}:{params:Promise<{section:string}>}){
  const session=await studioSession();if(!session)redirect('/studio/login');const section=(await params).section;
  if(!(section in SECTIONS))notFound();const item=SECTIONS[section as keyof typeof SECTIONS];
  const {data:docs,error}=await session.client.from('documents').select('id,title,slug,status,updated_at,has_unpublished_changes').eq('kind',item.kind).order('updated_at',{ascending:false});
  return <main className={styles.content}><p className={styles.eyebrow}>Editorial</p><h1>{item.title}</h1>{error?<p role="alert">Unable to load documents.</p>:<div className={styles.list}>{docs?.map(doc=><Link href={`/studio/documents/${doc.id}`} key={doc.id}><strong>{doc.title}</strong><span>{doc.status.replace('_',' ')} · {doc.slug}</span></Link>)}</div>}{!docs?.length&&!error?<p>No documents yet.</p>:null}{item.kind!=='page'?<Link className={styles.button} href={`/studio/new?kind=${item.kind}`}>Create {item.kind==='article'?'article':'case'}</Link>:null}</main>;
}

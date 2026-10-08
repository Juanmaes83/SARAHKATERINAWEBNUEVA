import Link from 'next/link';
import { notFound,redirect } from 'next/navigation';
import { studioSession } from '@/lib/supabase/server';
import styles from '@/components/studio/Studio.module.css';
const SECTIONS={pages:{kind:'page',title:'Páginas editables'},articles:{kind:'article',title:'Artículos'},cases:{kind:'case',title:'Casos'}} as const;
export default async function Page({params}:{params:Promise<{section:string}>}){
  const session=await studioSession();if(!session)redirect('/studio/login');const section=(await params).section;
  if(!(section in SECTIONS))notFound();const item=SECTIONS[section as keyof typeof SECTIONS];
  const {data:docs,error}=await session.client.from('documents').select('id,title,slug,status,updated_at,has_unpublished_changes').eq('kind',item.kind).order('updated_at',{ascending:false});
  return <main id="main" tabIndex={-1} className={styles.content}><p className={styles.eyebrow}>Editorial</p><h1>{item.title}</h1><p>{item.kind==='page'?'Aquí se gestionan los campos conectados de Home e Investment. Esta lista no es el inventario completo de la web ni un informe de indexación en Google.':'Edita textos, imágenes y metadatos. Guardar un borrador no lo publica ni lo hace indexable.'}</p>{error?<p role="alert">Unable to load documents.</p>:<div className={styles.list}>{docs?.map(doc=><Link href={`/studio/documents/${doc.id}`} key={doc.id}><strong>{doc.title}</strong><span>{doc.status.replace('_',' ')} · {doc.slug}</span></Link>)}</div>}{!docs?.length&&!error?<p>No documents yet.</p>:null}{item.kind!=='page'?<Link className={styles.button} href={`/studio/new?kind=${item.kind}`}>Crear {item.kind==='article'?'artículo':'caso'}</Link>:null}</main>;
}

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { studioSession } from '@/lib/supabase/server';
import styles from '@/components/studio/Studio.module.css';
export default async function Page(){
  const session=await studioSession();if(!session)redirect('/studio/login');
  const {data:docs}=await session.client.from('documents').select('id,kind,status,next_review_on');
  const counts={draft:0,in_review:0,approved:0,published:0,blocked:0};docs?.forEach(d=>{counts[d.status as keyof typeof counts]++});
  const {data:notes}=await session.client.from('review_notes').select('id,severity,domain').eq('resolved',false);
  const upcoming=docs?.filter(d=>d.next_review_on).sort((a,b)=>String(a.next_review_on).localeCompare(String(b.next_review_on))).slice(0,5)??[];
  return <main className={styles.content}><p className={styles.eyebrow}>Team workspace</p><h1>Resumen</h1><p>Content, review and publication for this preview.</p><div className={styles.metrics}>{Object.entries(counts).map(([label,count])=><div key={label}><strong>{count}</strong><span>{label.replace('_',' ')}</span></div>)}</div><section><h2>Review queue</h2><p>{notes?.length??0} open editorial notes, including {notes?.filter(n=>n.severity==='blocking').length??0} blocking issues.</p><Link href="/studio/articles">Review articles →</Link> · <Link href="/studio/cases">Review cases →</Link></section><section><h2>Upcoming reviews</h2>{upcoming.length?<ul>{upcoming.map(d=><li key={d.id}><Link href={`/studio/documents/${d.id}`}>{d.next_review_on} · Open document</Link></li>)}</ul>:<p>No review dates scheduled.</p>}</section></main>;
}

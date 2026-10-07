import Link from 'next/link';
import { studioSession } from '@/lib/supabase/server';
import { SignOut } from '@/components/studio/SignOut';
import styles from '@/components/studio/Studio.module.css';
export const metadata={robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function Layout({children}:{children:React.ReactNode}){
  const session=await studioSession();
  if(!session)return children;
  return <div className={styles.app}><aside className={styles.sidebar}><Link className={styles.brand} href="/studio">Sarah Katerina <strong>Studio</strong></Link><nav aria-label="Studio"><Link href="/studio">Resumen</Link><Link href="/studio/pages">Páginas</Link><Link href="/studio/articles">Artículos</Link><Link href="/studio/cases">Casos</Link><Link href="/studio/media">Biblioteca</Link><Link href="/studio/links">SEO y enlaces</Link><Link href="/studio/team">Equipo</Link></nav><div className={styles.account}><small>{session.email} · {session.role}</small><SignOut/></div></aside><div className={styles.workspace}>{children}</div></div>;
}

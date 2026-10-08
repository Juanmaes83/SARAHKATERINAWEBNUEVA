import { redirect } from 'next/navigation';
import { studioSession } from '@/lib/supabase/server';
import { NewDocument } from '@/components/studio/NewDocument';
import styles from '@/components/studio/Studio.module.css';
export default async function Page({searchParams}:{searchParams:Promise<{kind?:string}>}){if(!await studioSession())redirect('/studio/login');const kind=(await searchParams).kind==='case'?'case':'article';return <main id="main" tabIndex={-1} className={styles.content}><NewDocument kind={kind}/></main>;}

import { redirect } from 'next/navigation';
import { studioSession } from '@/lib/supabase/server';
import { Team } from '@/components/studio/Team';
import styles from '@/components/studio/Studio.module.css';
export default async function Page(){const session=await studioSession();if(!session)redirect('/studio/login');const {data}=await session.client.from('studio_members').select('email,role,display_name,active,joined_at').order('email');return <main className={styles.content}><p className={styles.eyebrow}>Access</p><h1>Equipo</h1><Team members={data??[]} admin={session.role==='admin'}/></main>;}

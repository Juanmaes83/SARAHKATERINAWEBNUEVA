import { redirect } from 'next/navigation';
import { studioSession } from '@/lib/supabase/server';
import { MediaLibrary } from '@/components/studio/MediaLibrary';
import styles from '@/components/studio/Studio.module.css';
export default async function Page(){const session=await studioSession();if(!session)redirect('/studio/login');const {data}=await session.client.from('media').select('id,alt,caption,credit,rights,focus_x,focus_y,original_path,bucket').eq('bucket','media').order('created_at',{ascending:false});return <main id="main" tabIndex={-1} className={styles.content}><p className={styles.eyebrow}>Assets</p><h1>Biblioteca</h1><MediaLibrary initial={data??[]}/></main>;}

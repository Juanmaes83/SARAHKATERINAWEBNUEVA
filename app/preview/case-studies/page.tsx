import { EditorialListing } from '@/components/studio/Editorial';
import { listPublished } from '@/lib/studio/content';
import { buildMetadata } from '@/lib/seo/metadata';
import { draftMode } from 'next/headers';
export const metadata = buildMetadata({title:'Case studies',description:'Explore real client cases in the Costa Blanca: the circumstances, decisions and recorded outcomes of property purchases and investment projects.',path:'/preview/case-studies',laboratory:true});
export const dynamic = 'force-dynamic';
export default async function Page(){return <EditorialListing kind="case" cards={await listPublished('case')} draft={(await draftMode()).isEnabled}/>;}

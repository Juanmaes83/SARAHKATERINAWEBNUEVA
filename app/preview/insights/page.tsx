import { EditorialListing } from '@/components/studio/Editorial';
import { listPublished } from '@/lib/studio/content';
import { buildMetadata } from '@/lib/seo/metadata';
import { draftMode } from 'next/headers';
export const metadata = buildMetadata({title:'Insights',description:'Practical guides for international buyers and non-resident owners in Spain, covering property purchases, investment decisions and tax obligations.',path:'/preview/insights',laboratory:true});
export const dynamic = 'force-dynamic';
export default async function Page(){return <EditorialListing kind="article" cards={await listPublished('article')} draft={(await draftMode()).isEnabled}/>;}

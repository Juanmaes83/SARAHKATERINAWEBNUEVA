import { EditorialListing } from '@/components/studio/Editorial';
import { listPublished } from '@/lib/studio/content';
import { buildMetadata } from '@/lib/seo/metadata';
import { draftMode } from 'next/headers';
export const metadata = buildMetadata({title:'Insights',description:'Guides to tax, property and investment decisions in Spain.',path:'/preview/insights',laboratory:true});
export const dynamic = 'force-dynamic';
export default async function Page(){return <EditorialListing kind="article" cards={await listPublished('article')} draft={(await draftMode()).isEnabled}/>;}

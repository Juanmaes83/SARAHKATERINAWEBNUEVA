import { EditorialListing } from '@/components/studio/Editorial';
import { listPublished } from '@/lib/studio/content';
import { metadata as previewMetadata } from '@/app/preview/insights/page';
import { buildMetadata } from '@/lib/seo/metadata';
export const dynamic = 'force-dynamic';
export const metadata = buildMetadata({ title: 'Insights', description: previewMetadata.description ?? '', path: '/insights' });
export default async function Page() { return <EditorialListing kind="article" cards={await listPublished('article', false)} draft={false} />; }

import { EditorialListing } from '@/components/studio/Editorial';
import { listPublished } from '@/lib/studio/content';
import { metadata as previewMetadata } from '@/app/preview/case-studies/page';
import { buildMetadata } from '@/lib/seo/metadata';
export const dynamic = 'force-dynamic';
export const metadata = buildMetadata({ title: 'Case studies', description: previewMetadata.description ?? '', path: '/case-studies' });
export default async function Page() { return <EditorialListing kind="case" cards={await listPublished('case', false)} draft={false} />; }

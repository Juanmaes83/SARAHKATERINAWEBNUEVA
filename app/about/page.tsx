import Page from '@/app/preview/team/page';
import { seo } from '@/content/en/team';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({ title: seo.title, description: seo.description, path: '/about' });
export const dynamic = 'force-dynamic';
export default Page;

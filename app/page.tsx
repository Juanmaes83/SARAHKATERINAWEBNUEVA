import Page from '@/app/preview/home/page';
import { seo } from '@/content/en/home';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({ title: seo.title, description: seo.description, path: '/' });
export const dynamic = 'force-dynamic';
export default Page;

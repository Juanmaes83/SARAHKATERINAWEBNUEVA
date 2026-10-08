import Page from '@/app/preview/investment/page';
import { seo } from '@/content/en/investment';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({ title: seo.title, description: seo.description, path: '/investment' });
export const dynamic = 'force-dynamic';
export default Page;

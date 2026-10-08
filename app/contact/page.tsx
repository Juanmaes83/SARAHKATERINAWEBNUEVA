import Page from '@/app/preview/contact/page';
import { seo } from '@/content/en/contact';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({ title: seo.title, description: seo.description, path: '/contact' });
export const dynamic = 'force-dynamic';
export default Page;

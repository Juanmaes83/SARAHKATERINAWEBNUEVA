import Page from '@/app/preview/tax-advisory/page';
import { seo } from '@/content/en/tax-advisory';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({ title: seo.title, description: seo.description, path: '/services/tax-advisory' });
export const dynamic = 'force-dynamic';
export default Page;

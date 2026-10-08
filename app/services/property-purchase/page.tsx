import Page from '@/app/preview/property-purchase/page';
import { seo } from '@/content/en/property-purchase';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({ title: seo.title, description: seo.description, path: '/services/property-purchase' });
export const dynamic = 'force-dynamic';
export default Page;

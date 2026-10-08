import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { webPath } from '@/lib/seo/public-path';

/** Share approved preview compositions with public destinations in production. */
export default function SiteLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} href={typeof href === 'string' ? webPath(href) : href} />;
}

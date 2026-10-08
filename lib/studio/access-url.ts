/** The branch alias remains stable across Preview deployments. */
export function studioReturnUrl(path: '/studio/recover/complete', currentOrigin: string): string {
  const configured = process.env.NEXT_PUBLIC_STUDIO_ORIGIN?.trim().replace(/\/$/, '');
  const origin = configured && /^https:\/\/[^/?#]+$/.test(configured) ? configured : currentOrigin;
  return `${origin}${path}`;
}

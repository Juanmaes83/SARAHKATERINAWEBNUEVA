import { siteConfig } from './config';

/** Owner approved public launch on 2026-10-08. Preserve the approved compositions. */
export const PUBLIC_PATHS: Readonly<Record<string, string>> = {"/preview/home": "/", "/preview/investment": "/investment", "/preview/property-purchase": "/services/property-purchase", "/preview/tax-advisory": "/services/tax-advisory", "/preview/team": "/about", "/preview/contact": "/contact", "/preview/insights": "/insights", "/preview/case-studies": "/case-studies"};

export function publicPath(path: string): string {
  const match = Object.keys(PUBLIC_PATHS).find(base => path === base || path.startsWith(base + '/') || path.startsWith(base + '#') || path.startsWith(base + '?'));
  if (!match) return path;
  const suffix = path.slice(match.length);
  return PUBLIC_PATHS[match] === '/' && suffix.startsWith('#') ? '/' + suffix : PUBLIC_PATHS[match] + suffix;
}

export function webPath(path: string): string {
  return siteConfig.mode === 'production' ? publicPath(path) : path;
}

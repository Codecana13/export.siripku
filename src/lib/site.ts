const DEFAULT_SITE_URL = 'https://export.siripku.id';

/** Canonical public site origin (no trailing slash). */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL;
  return url.replace(/\/+$/, '');
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

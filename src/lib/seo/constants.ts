export const SPECIES_SLUGS = [
  'guppy-exporter',
  'discus-exporter',
  'betta-exporter',
  'corydoras-exporter',
  'pleco-exporter',
  'tetra-exporter',
] as const;

export const BLOG_CATEGORY_SLUGS = ['export-guides', 'species', 'industry', 'care'] as const;

/** Public static routes (path only, no admin/api). */
export const STATIC_PUBLIC_PATHS = [
  '/',
  '/blog',
  '/cites-compliance',
  '/export-regulations',
  '/privacy-policy',
  '/terms-of-service',
] as const;

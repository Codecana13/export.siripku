import { revalidatePath } from 'next/cache';

/** Invalidate sitemap, robots, and blog caches after article changes. */
export function revalidateAfterArticleChange(options?: {
  slug?: string | null;
  previousSlug?: string | null;
}) {
  revalidatePath('/sitemap.xml');
  revalidatePath('/robots.txt');
  revalidatePath('/blog');

  const slugs = new Set<string>();
  if (options?.slug) slugs.add(options.slug);
  if (options?.previousSlug) slugs.add(options.previousSlug);

  for (const slug of slugs) {
    revalidatePath(`/blog/${slug}`);
  }
}

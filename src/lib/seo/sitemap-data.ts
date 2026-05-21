import type { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { absoluteUrl } from '@/lib/site';
import {
  BLOG_CATEGORY_SLUGS,
  SPECIES_SLUGS,
  STATIC_PUBLIC_PATHS,
} from '@/lib/seo/constants';

function staticEntry(
  path: string,
  options: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

export async function buildSitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = STATIC_PUBLIC_PATHS.map((path) =>
    staticEntry(path, {
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : path === '/blog' ? 0.9 : 0.5,
    })
  );

  const speciesPages: MetadataRoute.Sitemap = SPECIES_SLUGS.map((slug) =>
    staticEntry(`/species/${slug}`, { changeFrequency: 'weekly', priority: 0.8 })
  );

  const categoryPages: MetadataRoute.Sitemap = BLOG_CATEGORY_SLUGS.map((slug) =>
    staticEntry(`/category/${slug}`, { changeFrequency: 'weekly', priority: 0.6 })
  );

  const supabase = await createServerSupabaseClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at, created_at')
    .eq('status', 'published')
    .order('updated_at', { ascending: false });

  const articlePages: MetadataRoute.Sitemap = (articles ?? [])
    .filter((article) => article.slug)
    .map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: new Date(article.updated_at || article.created_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...speciesPages, ...categoryPages, ...articlePages];
}

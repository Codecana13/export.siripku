import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Calendar, User, Tag, Clock, MessageCircle, ChevronRight } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.seo_title || article.title || 'Article',
    description: article.meta_description || '',
    alternates: { canonical: `https://export.siripku.id/blog/${slug}` },
    openGraph: {
      title: article.seo_title || article.title || 'Article',
      description: article.meta_description || '',
      type: 'article',
      publishedTime: article.created_at || new Date().toISOString(),
      authors: ['Siripku Export'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const supabase = await createServerSupabaseClient();
  
  // Fetch main article
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!article) {
    notFound();
  }

  // Fetch recent articles (left sidebar)
  const { data: recentArticles } = await supabase
    .from('articles')
    .select('title, slug, created_at, og_image')
    .eq('status', 'published')
    .neq('id', article.id)
    .order('created_at', { ascending: false })
    .limit(4);

  // Fetch related articles (right sidebar)
  let { data: relatedArticles } = await supabase
    .from('articles')
    .select('title, slug, created_at, og_image')
    .eq('status', 'published')
    .eq('category', article.category || '')
    .neq('id', article.id)
    .limit(4);

  // If no related articles in same category, just fetch popular/other articles
  if (!relatedArticles || relatedArticles.length === 0) {
    const { data: otherArticles } = await supabase
      .from('articles')
      .select('title, slug, created_at, og_image')
      .eq('status', 'published')
      .neq('id', article.id)
      .limit(4);
    relatedArticles = otherArticles;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title || 'Article',
    description: article.meta_description || '',
    author: { '@type': 'Organization', name: 'Siripku Export' },
    publisher: { '@type': 'Organization', name: 'Siripku Export', logo: { '@type': 'ImageObject', url: 'https://export.siripku.id/images/logo.png' } },
    datePublished: article.created_at || new Date().toISOString(),
    url: `https://export.siripku.id/blog/${slug}`,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://export.siripku.id' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://export.siripku.id/blog' },
      { '@type': 'ListItem', position: 3, name: article.title || 'Article', item: `https://export.siripku.id/blog/${slug}` },
    ],
  };

  const formatDate = (dateStr: string) => {
    try {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const htmlContent = article.content_html || article.content_text || '<p>No content available.</p>';

  const SidebarArticleCard = ({ item }: { item: any }) => (
    <Link href={`/blog/${item.slug}`} className="block group mb-6 last:mb-0">
      {item.og_image && (
        <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
          <img src={item.og_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">{item.title}</h4>
      <div className="flex items-center text-[11px] text-slate-500">
        <Calendar className="w-3 h-3 mr-1" />
        {formatDate(item.created_at)}
      </div>
    </Link>
  );

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {article.schema_markup && (
        <div dangerouslySetInnerHTML={{ __html: article.schema_markup }} />
      )}

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Sidebar: Recent Articles */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <h3 className="text-lg font-bold text-slate-100">Recent Articles</h3>
              </div>
              <div className="flex flex-col">
                {recentArticles && recentArticles.map(item => (
                  <SidebarArticleCard key={item.slug} item={item} />
                ))}
                {(!recentArticles || recentArticles.length === 0) && (
                  <p className="text-sm text-slate-500 italic">No recent articles found.</p>
                )}
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="lg:col-span-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-slate-400 truncate max-w-xs">{article.title || 'Article'}</span>
            </nav>

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">{article.category || 'Guide'}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{article.title || 'Article'}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><User className="w-4 h-4" />Siripku Export</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(article.created_at)}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />5 min read</span>
              </div>
            </header>

            {/* Featured Image */}
            {article.og_image && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-lg shadow-cyan-900/20">
                <img 
                  src={article.og_image} 
                  alt={article.title || 'Article Image'} 
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-cyan max-w-none prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-blockquote:border-cyan-500 prose-blockquote:text-slate-300 prose-a:text-cyan-400"
              dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* CTA */}
            <div className="mt-16 glass-card rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to Import Premium Fish?</h3>
              <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                Contact Siripku Export today for wholesale pricing and availability of premium ornamental fish.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/6289652456206" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
                </a>
                <Link href="/#inquiry" className="btn-secondary">
                  Contact Export Team
                </Link>
              </div>
            </div>
          </article>

          {/* Right Sidebar: Related Articles */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <h3 className="text-lg font-bold text-slate-100">Related Articles</h3>
              </div>
              <div className="flex flex-col">
                {relatedArticles && relatedArticles.map(item => (
                  <SidebarArticleCard key={item.slug} item={item} />
                ))}
                {(!relatedArticles || relatedArticles.length === 0) && (
                  <p className="text-sm text-slate-500 italic">No related articles found.</p>
                )}
              </div>
            </div>
          </aside>

        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

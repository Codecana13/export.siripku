import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Blog — Ornamental Fish Export Guides & Industry Insights',
  description: 'Expert guides on ornamental fish export from Indonesia. Learn about guppies, discus, bettas, shipping standards, and international trade tips from Siripku Export.',
  alternates: { canonical: 'https://export.siripku.id/blog' },
};

export default async function BlogPage() {
  const supabase = await createServerSupabaseClient();
  const { data: dbArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  const articles = dbArticles || [];
  const featured = articles.find(a => a.is_featured);
  const rest = articles.filter(a => a.id !== featured?.id);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              Export Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Blog & Export Guides
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Expert insights on ornamental fish export, species guides, and international trade tips from Indonesia&apos;s trusted exporter.
            </p>
          </div>

          {/* Featured Article */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
              <div className="glass-card rounded-2xl p-8 md:p-12 hover:border-cyan-500/30 transition-all">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">Featured</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{featured.title}</h2>
                <p className="text-slate-400 mb-4 max-w-3xl">{featured.meta_description || featured.content_text?.substring(0, 150) + '...'}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" />Siripku Export</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(featured.created_at)}</span>
                  <span>5 min read</span>
                </div>
              </div>
            </Link>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(article => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                <article className="glass-card rounded-2xl p-6 h-full hover:border-cyan-500/30 transition-all flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs text-cyan-400 font-medium">{article.category || 'Guide'}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-1 line-clamp-3">{article.meta_description || article.content_text?.substring(0, 100) + '...'}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{formatDate(article.created_at)}</span>
                    <span className="flex items-center gap-1 text-cyan-400 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

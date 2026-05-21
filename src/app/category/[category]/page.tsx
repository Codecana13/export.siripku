import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ArrowRight, Tag, Calendar } from 'lucide-react';

const categoryData: Record<string, { name: string; description: string }> = {
  'export-guides': { name: 'Export Guides', description: 'Comprehensive guides for importing ornamental fish from Indonesia.' },
  'species': { name: 'Species', description: 'Detailed information about ornamental fish species available for export.' },
  'industry': { name: 'Industry News', description: 'Latest news and trends in the ornamental fish export industry.' },
  'care': { name: 'Fish Care', description: 'Expert fish care advice for importers and wholesalers.' },
};

const mockArticles = [
  { slug: 'guide-importing-ornamental-fish-indonesia', title: 'Complete Guide to Importing Ornamental Fish from Indonesia', excerpt: 'Everything you need to know about importing premium ornamental fish.', date: 'May 15, 2026', readTime: '12 min' },
  { slug: 'premium-guppy-strains-international', title: 'Top 10 Premium Guppy Strains for International Market', excerpt: 'Discover the most sought-after guppy strains.', date: 'May 12, 2026', readTime: '8 min' },
  { slug: 'discus-fish-export-quality-standards', title: 'Discus Fish Export: Quality Standards & Shipping Guide', excerpt: 'Learn about quality standards for exporting discus fish.', date: 'May 10, 2026', readTime: '10 min' },
];

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryData[category];
  return {
    title: cat ? `${cat.name} — Siripku Export Blog` : 'Category',
    description: cat?.description || 'Browse articles by category.',
    alternates: { canonical: `https://export.siripku.id/category/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categoryData[category] || { name: category, description: '' };

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              <Tag className="w-3 h-3 inline mr-1" />{cat.name}
            </span>
            <h1 className="text-4xl font-bold mb-4">{cat.name}</h1>
            <p className="text-slate-400 max-w-xl mx-auto">{cat.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles.map(article => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                <article className="glass-card rounded-2xl p-6 h-full hover:border-cyan-500/30 transition-all flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{article.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-1">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                    <span className="text-cyan-400 flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
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

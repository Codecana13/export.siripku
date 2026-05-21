import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Calendar, User, Clock, ArrowLeft, MessageCircle, Tag } from 'lucide-react';

const mockGuide = {
  title: 'How to Start Importing Tropical Fish from Indonesia',
  content: `
    <h2>Introduction to Indonesian Fish Export Industry</h2>
    <p>Indonesia is the world's largest archipelago nation, home to incredibly diverse freshwater ecosystems. The country's ornamental fish export industry generates over $30 million annually, supplying premium specimens to markets across Asia, Europe, North America, and the Middle East.</p>
    <h2>Step 1: Research Import Regulations</h2>
    <p>Before placing your first order, research your country's specific regulations regarding live fish imports. Most countries require import permits, health certificates, and quarantine periods for ornamental fish.</p>
    <h2>Step 2: Find a Reliable Indonesian Exporter</h2>
    <p>Look for exporters with proper licensing (SIUP, TDP, and export permits from the Indonesian government), positive track records, and transparent quality control processes. Siripku Export provides all necessary documentation and certifications.</p>
    <h2>Step 3: Place Your Order</h2>
    <p>Work with your chosen exporter to select species, quantities, and shipping dates. A good exporter will provide detailed stock lists with pricing, photos, and availability information.</p>
    <h2>Step 4: Shipping and Receiving</h2>
    <p>Fish are typically shipped via air freight in oxygen-sealed bags within insulated styrofoam boxes. Plan your receiving logistics carefully, including acclimation facilities and quarantine tanks.</p>
  `,
  category: 'Export Guides',
  author: 'Siripku Export',
  date: 'May 8, 2026',
  readTime: '15 min',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${mockGuide.title} | Siripku Export`,
    description: `Expert export guide: ${mockGuide.title}. Step-by-step instructions for international fish importers from Siripku Export Indonesia.`,
    alternates: { canonical: `https://export.siripku.id/export-guides/${slug}` },
  };
}

export default async function ExportGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <Navbar />
      <article className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-cyan-400 transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-slate-400 truncate">{mockGuide.title}</span>
          </nav>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">{mockGuide.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{mockGuide.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{mockGuide.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{mockGuide.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{mockGuide.readTime}</span>
            </div>
          </header>
          <div className="prose prose-invert prose-cyan max-w-none prose-lg prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-cyan-400"
            dangerouslySetInnerHTML={{ __html: mockGuide.content }} />
          <div className="mt-16 glass-card rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to Start Importing?</h3>
            <p className="text-slate-400 mb-6">Contact Siripku Export for wholesale pricing and availability.</p>
            <a href="https://wa.me/6289652456206" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </article>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'features' | 'cta' | 'faq';
  content: any;
}

export default function EditLandingPage() {
  const params = useParams();
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: '1', type: 'heading', content: { text: 'Premium Guppy Fish Exporter from Indonesia', level: 'h1' } },
    { id: '2', type: 'text', content: { text: 'Siripku Export is Indonesia\'s leading guppy fish exporter. We supply premium show-quality guppies to importers worldwide.' } },
    { id: '3', type: 'features', content: { items: ['20+ premium strains', 'Show-grade quality', 'Minimum 500 pairs', '98% survival guarantee'] } },
    { id: '4', type: 'faq', content: { items: [{ question: 'What guppy strains do you export?', answer: 'We export Halfmoon, Dumbo Ear, Mosaic, and 15+ more premium varieties.' }] } },
    { id: '5', type: 'cta', content: { text: 'Request Quote', url: 'https://wa.me/6289652456206' } },
  ]);

  const [seoData, setSeoData] = useState({
    seoTitle: 'Premium Guppy Fish Exporter from Indonesia | Siripku Export',
    metaDescription: 'Premium guppy fish exporter from Indonesia. Show-quality guppies including Halfmoon, Dumbo Ear, Mosaic & 20+ strains. Worldwide shipping.',
    focusKeyword: 'guppy fish exporter indonesia',
    slug: 'guppy-exporter',
  });

  const addBlock = (type: ContentBlock['type']) => {
    const defaults: Record<string, any> = {
      text: { text: '' },
      heading: { text: '', level: 'h2' },
      features: { items: [''] },
      cta: { text: 'Contact Us', url: '' },
      faq: { items: [{ question: '', answer: '' }] },
    };
    setBlocks([...blocks, { id: Date.now().toString(), type, content: defaults[type] }]);
  };

  const removeBlock = (id: string) => setBlocks(blocks.filter(b => b.id !== id));

  return (
    <div className="space-y-6 admin-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/landing-pages" className="p-1.5 rounded-lg hover:bg-white/10" style={{ color: 'var(--admin-text-muted)' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold" style={{ color: 'var(--admin-text)' }}>Edit Landing Page</h1>
        </div>
        <button className="admin-btn admin-btn-primary"><Save className="w-4 h-4" /> Save Page</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Content Blocks */}
        <div className="xl:col-span-2 space-y-4">
          {blocks.map((block, i) => (
            <div key={block.id} className="admin-card p-4 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 cursor-grab" style={{ color: 'var(--admin-text-muted)' }} />
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 uppercase">{block.type}</span>
                </div>
                <button onClick={() => removeBlock(block.id)} className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-red-400 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {block.type === 'heading' && (
                <input className="admin-input text-lg font-bold" value={block.content.text} onChange={e => {
                  const newBlocks = [...blocks]; newBlocks[i].content.text = e.target.value; setBlocks(newBlocks);
                }} placeholder="Heading text..." />
              )}
              {block.type === 'text' && (
                <textarea className="admin-input resize-none" rows={4} value={block.content.text} onChange={e => {
                  const newBlocks = [...blocks]; newBlocks[i].content.text = e.target.value; setBlocks(newBlocks);
                }} placeholder="Paragraph text..." />
              )}
              {block.type === 'features' && (
                <div className="space-y-2">
                  {block.content.items.map((item: string, j: number) => (
                    <input key={j} className="admin-input text-sm" value={item} onChange={e => {
                      const newBlocks = [...blocks]; newBlocks[i].content.items[j] = e.target.value; setBlocks(newBlocks);
                    }} placeholder="Feature item..." />
                  ))}
                  <button onClick={() => { const newBlocks = [...blocks]; newBlocks[i].content.items.push(''); setBlocks(newBlocks); }}
                    className="text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300"><Plus className="w-3 h-3" /> Add Feature</button>
                </div>
              )}
              {block.type === 'faq' && (
                <div className="space-y-3">
                  {block.content.items.map((faq: any, j: number) => (
                    <div key={j} className="space-y-2 p-3 rounded-lg" style={{ background: 'var(--admin-input-bg)' }}>
                      <input className="admin-input text-sm" value={faq.question} onChange={e => {
                        const newBlocks = [...blocks]; newBlocks[i].content.items[j].question = e.target.value; setBlocks(newBlocks);
                      }} placeholder="Question..." />
                      <textarea className="admin-input text-sm resize-none" rows={2} value={faq.answer} onChange={e => {
                        const newBlocks = [...blocks]; newBlocks[i].content.items[j].answer = e.target.value; setBlocks(newBlocks);
                      }} placeholder="Answer..." />
                    </div>
                  ))}
                  <button onClick={() => { const newBlocks = [...blocks]; newBlocks[i].content.items.push({ question: '', answer: '' }); setBlocks(newBlocks); }}
                    className="text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300"><Plus className="w-3 h-3" /> Add FAQ</button>
                </div>
              )}
              {block.type === 'cta' && (
                <div className="grid grid-cols-2 gap-3">
                  <input className="admin-input text-sm" value={block.content.text} onChange={e => {
                    const newBlocks = [...blocks]; newBlocks[i].content.text = e.target.value; setBlocks(newBlocks);
                  }} placeholder="Button text..." />
                  <input className="admin-input text-sm" value={block.content.url} onChange={e => {
                    const newBlocks = [...blocks]; newBlocks[i].content.url = e.target.value; setBlocks(newBlocks);
                  }} placeholder="Button URL..." />
                </div>
              )}
            </div>
          ))}

          {/* Add Block */}
          <div className="flex flex-wrap gap-2">
            {(['heading', 'text', 'features', 'faq', 'cta'] as const).map(type => (
              <button key={type} onClick={() => addBlock(type)} className="admin-btn admin-btn-secondary text-xs py-2 capitalize">
                <Plus className="w-3.5 h-3.5" /> {type}
              </button>
            ))}
          </div>
        </div>

        {/* SEO Settings */}
        <div className="admin-card p-5 space-y-4 h-fit">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--admin-text)' }}>SEO Settings</h3>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--admin-text-muted)' }}>SEO Title</label>
            <input className="admin-input text-xs" value={seoData.seoTitle} onChange={e => setSeoData({ ...seoData, seoTitle: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--admin-text-muted)' }}>Meta Description</label>
            <textarea className="admin-input text-xs resize-none" rows={3} value={seoData.metaDescription} onChange={e => setSeoData({ ...seoData, metaDescription: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--admin-text-muted)' }}>Focus Keyword</label>
            <input className="admin-input text-xs" value={seoData.focusKeyword} onChange={e => setSeoData({ ...seoData, focusKeyword: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--admin-text-muted)' }}>URL Slug</label>
            <input className="admin-input text-xs" value={seoData.slug} onChange={e => setSeoData({ ...seoData, slug: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
}

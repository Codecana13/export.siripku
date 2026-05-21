'use client';

import { useState, useEffect, useMemo } from 'react';
import { analyzeSEO, calculateKeywordDensity } from '@/lib/seo/analyzer';
import { calculateReadability } from '@/lib/seo/readability';
import {
  Target, Type, FileText, Link as LinkIcon, Image as ImageIcon,
  Hash, Globe, Calendar, Star, ChevronDown, ChevronUp,
  CheckCircle2, XCircle, AlertCircle, Sparkles
} from 'lucide-react';

interface SEOSidebarProps {
  articleData: {
    title: string;
    seoTitle: string;
    metaDescription: string;
    focusKeyword: string;
    schemaMarkup: string;
    slug: string;
    canonicalUrl: string;
    ogImage: string;
    category: string;
    tags: string[];
    language: string;
    status: string;
    isFeatured: boolean;
    scheduledDate: string;
    contentHtml: string;
    contentText: string;
  };
  onChange: (field: string, value: any) => void;
}

export default function SEOSidebar({ articleData, onChange }: SEOSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    seo: true, publish: true, score: true, keyword: false, readability: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const seoAnalysis = useMemo(() => analyzeSEO({
    title: articleData.title,
    seoTitle: articleData.seoTitle,
    metaDescription: articleData.metaDescription,
    focusKeyword: articleData.focusKeyword,
    content: articleData.contentHtml,
    slug: articleData.slug,
    ogImage: articleData.ogImage,
  }), [articleData]);

  const keywordDensity = useMemo(() =>
    calculateKeywordDensity(articleData.contentText, articleData.focusKeyword),
    [articleData.contentText, articleData.focusKeyword]
  );

  const readability = useMemo(() =>
    calculateReadability(articleData.contentText),
    [articleData.contentText]
  );

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  };

  const scoreColor = seoAnalysis.score >= 80 ? 'text-emerald-400' : seoAnalysis.score >= 60 ? 'text-amber-400' : 'text-red-400';
  const scoreBg = seoAnalysis.score >= 80 ? 'from-emerald-500' : seoAnalysis.score >= 60 ? 'from-amber-500' : 'from-red-500';

  const Section = ({ id, title, icon: Icon, children }: { id: string; title: string; icon: any; children: React.ReactNode }) => (
    <div style={{ borderBottom: '1px solid var(--admin-border)' }}>
      <button onClick={() => toggleSection(id)} className="flex items-center justify-between w-full p-4 text-left hover:bg-white/3 transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--admin-text)' }}>{title}</span>
        </div>
        {expandedSections[id] ? <ChevronUp className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />}
      </button>
      {expandedSections[id] && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );

  const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>{label}</label>
      {children}
      {hint && <p className="text-[10px] mt-1" style={{ color: 'var(--admin-text-muted)' }}>{hint}</p>}
    </div>
  );

  return (
    <div className="h-full overflow-y-auto" style={{ background: 'var(--admin-card-bg)', borderLeft: '1px solid var(--admin-border)' }}>
      {/* SEO Score */}
      <Section id="score" title="SEO Score" icon={Target}>
        <div className="flex items-center justify-center py-2">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--admin-border)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" className={`${scoreColor}`} stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${seoAnalysis.score * 2.64} 264`} style={{ transition: 'stroke-dasharray 0.5s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${scoreColor}`}>{seoAnalysis.score}</span>
              <span className="text-[9px]" style={{ color: 'var(--admin-text-muted)' }}>/ 100</span>
            </div>
          </div>
        </div>
        <div className="space-y-1.5 mt-2">
          {seoAnalysis.checks.map(check => (
            <div key={check.id} className="flex items-start gap-2 text-xs">
              {check.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />}
              <span style={{ color: check.passed ? 'var(--admin-text-secondary)' : 'var(--admin-text-muted)' }}>{check.message}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* SEO Fields */}
      <Section id="seo" title="SEO Settings" icon={Target}>
        <Field label="SEO Title" hint={`${articleData.seoTitle.length}/60 characters`}>
          <input className="admin-input text-xs" value={articleData.seoTitle} onChange={e => onChange('seoTitle', e.target.value)} placeholder="SEO optimized title..." />
        </Field>
        <Field label="Meta Description" hint={`${articleData.metaDescription.length}/160 characters`}>
          <textarea className="admin-input text-xs resize-none" rows={3} value={articleData.metaDescription} onChange={e => onChange('metaDescription', e.target.value)} placeholder="Compelling description for search results..." />
        </Field>
        <Field label="Focus Keywords" hint="Separate multiple keywords with commas">
          <input className="admin-input text-xs" value={articleData.focusKeyword} onChange={e => onChange('focusKeyword', e.target.value)} placeholder="e.g., ornamental fish, export indonesia" />
        </Field>
        <Field label="Schema Markup (JSON-LD)" hint="Structured data for rich snippets">
          <textarea className="admin-input text-[10px] font-mono resize-y" rows={4} value={articleData.schemaMarkup || ''} onChange={e => onChange('schemaMarkup', e.target.value)} placeholder='{ "@context": "https://schema.org", ... }' />
        </Field>
        <Field label="URL Slug">
          <div className="flex gap-1">
            <input className="admin-input text-xs" value={articleData.slug} onChange={e => onChange('slug', e.target.value)} placeholder="article-url-slug" />
            <button onClick={() => onChange('slug', generateSlug(articleData.title))} className="px-2 rounded-lg text-[10px] text-cyan-400 hover:bg-cyan-500/10 shrink-0 transition-colors" title="Auto-generate from title">
              Auto
            </button>
          </div>
        </Field>
        <Field label="Canonical URL">
          <input className="admin-input text-xs" value={articleData.canonicalUrl} onChange={e => onChange('canonicalUrl', e.target.value)} placeholder="https://export.siripku.id/blog/..." />
        </Field>
        <Field label="OG Image URL">
          <input className="admin-input text-xs" value={articleData.ogImage} onChange={e => onChange('ogImage', e.target.value)} placeholder="Open Graph image URL" />
          {articleData.ogImage && (
            <div className="mt-2 rounded-lg overflow-hidden">
              <img src={articleData.ogImage} alt="OG Preview" className="w-full h-auto object-cover rounded-lg max-h-40" />
            </div>
          )}
        </Field>
      </Section>

      {/* Keyword Density */}
      <Section id="keyword" title="Keyword Density" icon={Hash}>
        <div className="p-3 rounded-xl" style={{ background: 'var(--admin-input-bg)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>Density</span>
            <span className={`text-sm font-bold ${keywordDensity > 0.5 && keywordDensity < 3 ? 'text-emerald-400' : keywordDensity === 0 ? 'text-slate-500' : 'text-amber-400'}`}>
              {keywordDensity}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: 'var(--admin-border)' }}>
            <div className={`h-full rounded-full transition-all ${keywordDensity > 0.5 && keywordDensity < 3 ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${Math.min(keywordDensity * 20, 100)}%` }} />
          </div>
          <p className="text-[10px] mt-1" style={{ color: 'var(--admin-text-muted)' }}>Ideal: 0.5% — 2.5%</p>
        </div>
      </Section>

      {/* Readability */}
      <Section id="readability" title="Readability" icon={FileText}>
        <div className="p-3 rounded-xl" style={{ background: 'var(--admin-input-bg)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>Score</span>
            <span className={`text-sm font-bold ${readability.score >= 60 ? 'text-emerald-400' : readability.score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
              {readability.score} — {readability.label}
            </span>
          </div>
          <div className="mt-1 text-[10px]" style={{ color: 'var(--admin-text-muted)' }}>Grade: {readability.grade}</div>
        </div>
      </Section>

      {/* Publish Settings */}
      <Section id="publish" title="Publish" icon={Calendar}>
        <Field label="Status">
          <select className="admin-input text-xs" value={articleData.status} onChange={e => onChange('status', e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </Field>
        {articleData.status === 'scheduled' && (
          <Field label="Schedule Date">
            <input type="datetime-local" className="admin-input text-xs" value={articleData.scheduledDate} onChange={e => onChange('scheduledDate', e.target.value)} />
          </Field>
        )}
        <Field label="Category">
          <select className="admin-input text-xs" value={articleData.category} onChange={e => onChange('category', e.target.value)}>
            <option value="">Select category</option>
            <option value="export-guides">Export Guides</option>
            <option value="species">Species</option>
            <option value="industry">Industry News</option>
            <option value="care">Fish Care</option>
          </select>
        </Field>
        <Field label="Language">
          <select className="admin-input text-xs" value={articleData.language} onChange={e => onChange('language', e.target.value)}>
            <option value="en">🇺🇸 English</option>
            <option value="id">🇮🇩 Indonesian</option>
            <option value="zh">🇨🇳 Chinese (Simplified)</option>
          </select>
        </Field>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" checked={articleData.isFeatured} onChange={e => onChange('isFeatured', e.target.checked)}
            className="w-4 h-4 rounded accent-cyan-500" />
          <label htmlFor="featured" className="text-xs" style={{ color: 'var(--admin-text-secondary)' }}>Featured Article</label>
        </div>
      </Section>
    </div>
  );
}

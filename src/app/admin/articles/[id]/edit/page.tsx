'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import SEOSidebar from '@/components/admin/editor/SEOSidebar';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, Eye, Sparkles, PanelRightOpen, PanelRightClose, AlertCircle, CheckCircle, Zap, RefreshCw, Bot, CheckCheck } from 'lucide-react';
import Link from 'next/link';

const RichTextEditor = dynamic(() => import('@/components/admin/editor/RichTextEditor'), { ssr: false });

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiOptimizing, setAiOptimizing] = useState(false);
  const [aiProgress, setAiProgress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const [articleData, setArticleData] = useState({
    id: '',
    title: '',
    seoTitle: '',
    metaDescription: '',
    focusKeyword: '',
    slug: '',
    canonicalUrl: '',
    ogImage: '',
    category: '',
    tags: [] as string[],
    language: 'en',
    status: 'draft',
    isFeatured: false,
    scheduledDate: '',
    contentHtml: '',
    contentText: '',
    schemaMarkup: '',
  });

  // Load article on mount
  useEffect(() => {
    const loadArticle = async () => {
      try {
        const id = (await params).id as string;
        setArticleData(prev => ({ ...prev, id }));

        const response = await fetch(`/api/articles/${id}`);
        if (response.ok) {
          const { article } = await response.json();
          setArticleData(prev => ({
            ...prev,
            title: article.title || '',
            seoTitle: article.seo_title || '',
            metaDescription: article.meta_description || '',
            focusKeyword: article.focus_keyword || '',
            slug: article.slug || '',
            canonicalUrl: article.canonical_url || '',
            ogImage: article.og_image || '',
            category: article.category || '',
            tags: article.tags || [],
            language: article.language || 'en',
            status: article.status || 'draft',
            isFeatured: article.is_featured || false,
            scheduledDate: article.scheduled_date || '',
            contentHtml: article.content_html || '',
            contentText: article.content_text || '',
            schemaMarkup: article.schema_markup || '',
          }));
        } else if (response.status === 404) {
          setIsNew(true);
          setUnsavedChanges(true);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load article');
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Error loading article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [params]);

  const handleChange = useCallback((field: string, value: any) => {
    setArticleData(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
    setSuccess(null);
  }, []);

  const handleEditorChange = useCallback((html: string, text: string) => {
    setArticleData(prev => ({ ...prev, contentHtml: html, contentText: text }));
    setUnsavedChanges(true);
    setSuccess(null);
  }, []);

  const handleImageUpload = useCallback((url: string) => {
    handleChange('ogImage', url);
  }, [handleChange]);

  // AI Optimize SEO handler
  const handleAIOptimize = async () => {
    if (!articleData.title && !articleData.contentText) {
      setError('Please add a title and some content before optimizing.');
      return;
    }

    setAiOptimizing(true);
    setAiProgress('Connecting to AI...');
    setError(null);
    setSuccess(null);

    try {
      setAiProgress('Analyzing article content...');

      const response = await fetch('/api/ai/seo-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: articleData.title,
          contentText: articleData.contentText,
          contentHtml: articleData.contentHtml,
          category: articleData.category,
          currentSlug: articleData.slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'AI optimization failed');
      }

      const { seo } = data;

      setAiProgress('Applying SEO optimizations...');

      // Auto-fill all SEO fields with small delays for visual feedback
      const fields = [
        { field: 'seoTitle', value: seo.seoTitle, label: 'SEO Title' },
        { field: 'metaDescription', value: seo.metaDescription, label: 'Meta Description' },
        { field: 'focusKeyword', value: seo.focusKeyword, label: 'Focus Keyword' },
        { field: 'slug', value: seo.slug, label: 'URL Slug' },
        { field: 'category', value: seo.category, label: 'Category' },
        { field: 'tags', value: seo.tags, label: 'Tags' },
        { field: 'schemaMarkup', value: seo.schemaMarkup, label: 'Schema Markup' },
      ];

      for (const { field, value, label } of fields) {
        if (value && (typeof value === 'string' ? value.length > 0 : Array.isArray(value) && value.length > 0)) {
          setAiProgress(`Setting ${label}...`);
          handleChange(field, value);
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      // Handle internal links in content
      if (data.optimizedContentHtml && data.optimizedContentHtml !== articleData.contentHtml) {
        setAiProgress(`Applying AI internal links to content...`);
        handleChange('contentHtml', data.optimizedContentHtml);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Generate canonical URL
      if (seo.slug) {
        handleChange('canonicalUrl', `https://export.siripku.id/blog/${seo.slug}`);
      }

      setAiProgress('');
      setSuccess(`AI Optimization complete! (Model: ${data.model}) — All SEO fields updated.`);
      setUnsavedChanges(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI optimization failed. Make sure Ollama is running.');
      setAiProgress('');
    } finally {
      setAiOptimizing(false);
    }
  };

  const handleSave = async (status?: string) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const id = articleData.id;
      
      let finalSlug = articleData.slug;
      if (!finalSlug || finalSlug.trim() === '') {
        finalSlug = articleData.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
          
        if (finalSlug) {
          handleChange('slug', finalSlug);
        }
      }

      if (!finalSlug) {
        throw new Error('Title or slug is required');
      }

      const payload = {
        ...articleData,
        slug: finalSlug,
        status: status || articleData.status,
        scheduled_date: articleData.scheduledDate || null,
      };

      // If this is a new article, create it first
      if (isNew || !articleData.id || articleData.id.length === 0) {
        const createResponse = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData.error || 'Failed to create article');
        }

        const { article } = await createResponse.json();
        setArticleData(prev => ({ ...prev, id: article.id }));
        setSuccess(`Article ${status === 'published' ? 'published' : 'saved'} successfully!`);
        setUnsavedChanges(false);
        return;
      }

      // Otherwise update existing article
      const updateResponse = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.error || 'Failed to save article');
      }

      setSuccess(`Article ${status === 'published' ? 'published' : 'saved'} successfully!`);
      setUnsavedChanges(false);
      
      if (status === 'published') {
        setTimeout(() => {
          router.push('/admin/articles/new');
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-fade-in -m-4 lg:-m-6 flex flex-col h-[calc(100vh-64px)]">
      {/* Notifications */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 flex items-center gap-3" style={{ color: 'var(--admin-text)' }}>
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 flex items-center gap-3" style={{ color: 'var(--admin-text)' }}>
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ borderBottom: '1px solid var(--admin-border)' }}>
        <div className="flex items-center gap-3 flex-1">
          <Link href="/admin/articles" className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" style={{ color: 'var(--admin-text-muted)' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <input
            type="text"
            value={articleData.title}
            onChange={e => {
              handleChange('title', e.target.value);
              if (!articleData.seoTitle) handleChange('seoTitle', e.target.value);
            }}
            placeholder="Untitled Article"
            className="text-lg font-semibold bg-transparent outline-none border-none flex-1"
            style={{ color: 'var(--admin-text)' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className={`status-badge ${articleData.status === 'published' ? 'status-published' : articleData.status === 'scheduled' ? 'status-scheduled' : 'status-draft'}`}>
            {articleData.status}
          </span>
          <button onClick={() => setShowAI(!showAI)} className={`admin-btn text-xs py-2 px-3 ${showAI ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'admin-btn-secondary'}`}>
            <Sparkles className="w-3.5 h-3.5" /> AI
          </button>
          <button onClick={() => setShowSidebar(!showSidebar)} className="admin-btn admin-btn-secondary text-xs py-2 px-3 hidden lg:flex">
            {showSidebar ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
          </button>
          <button className="admin-btn admin-btn-secondary text-xs py-2 px-3">
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button onClick={() => handleSave('draft')} disabled={saving || !unsavedChanges} className="admin-btn admin-btn-secondary text-xs py-2 px-3">
            {saving ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={() => handleSave('published')} disabled={saving || !articleData.title || !articleData.contentHtml} className="admin-btn admin-btn-primary text-xs py-2 px-3">
            {saving ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Editor + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64" style={{ color: 'var(--admin-text-muted)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                  <span className="text-sm">Loading article...</span>
                </div>
              </div>
            ) : (
              <RichTextEditor content={articleData.contentHtml} onChange={handleEditorChange} />
            )}
          </div>
        </div>

        {/* AI Panel */}
        {showAI && (
          <div className="w-80 shrink-0 overflow-y-auto p-4 space-y-4 admin-slide-in" style={{ borderLeft: '1px solid var(--admin-border)', background: 'var(--admin-card-bg)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--admin-text)' }}>AI SEO Assistant</h3>
            </div>

            {/* Main AI Optimize Button */}
            <button
              onClick={handleAIOptimize}
              disabled={aiOptimizing || (!articleData.title && !articleData.contentText)}
              className="w-full p-4 rounded-xl transition-all group relative overflow-hidden"
              style={{
                background: aiOptimizing
                  ? 'linear-gradient(135deg, rgba(147,51,234,0.15), rgba(59,130,246,0.15))'
                  : 'linear-gradient(135deg, rgba(147,51,234,0.25), rgba(59,130,246,0.25))',
                border: '1px solid rgba(147,51,234,0.4)',
              }}
            >
              <div className="flex items-center gap-3">
                {aiOptimizing ? (
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-bold text-purple-300">
                    {aiOptimizing ? 'Optimizing...' : 'AI Optimize All SEO'}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>
                    {aiOptimizing ? aiProgress : 'Auto-fill all SEO fields with AI'}
                  </p>
                </div>
              </div>
              {aiOptimizing && (
                <div className="mt-3 w-full h-1 rounded-full bg-purple-900/50 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              )}
            </button>

            {/* Info about what AI Optimize does */}
            <div className="p-3 rounded-xl" style={{ background: 'var(--admin-input-bg)', border: '1px solid var(--admin-border)' }}>
              <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--admin-text-secondary)' }}>AI will auto-fill:</p>
              <div className="space-y-1.5">
                {[
                  { icon: '🎯', label: 'SEO Title (30-60 chars)' },
                  { icon: '📝', label: 'Meta Description (120-160 chars)' },
                  { icon: '🔑', label: 'Focus Keyword' },
                  { icon: '🔗', label: 'URL Slug (keyword-optimized)' },
                  { icon: '📂', label: 'Category' },
                  { icon: '🏷️', label: 'Tags (3-5 relevant tags)' },
                  { icon: '🌐', label: 'Canonical URL' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs">{item.icon}</span>
                    <span className="text-[10px]" style={{ color: 'var(--admin-text-muted)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl" style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.15)' }}>
              <div className="flex items-start gap-2">
                <Bot className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed" style={{ color: 'var(--admin-text-muted)' }}>
                  Powered by local Ollama LLM. Your content stays private and never leaves your machine.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SEO Sidebar */}
        {showSidebar && (
          <div className="hidden lg:block w-80 shrink-0 overflow-y-auto">
            <div style={{ background: 'var(--admin-card-bg)', borderLeft: '1px solid var(--admin-border)' }} className="h-full flex flex-col">
              {/* Image Upload */}
              <div className="p-4 border-b" style={{ borderColor: 'var(--admin-border)' }}>
                <ImageUpload 
                  onSuccess={handleImageUpload}
                  onError={(error) => setError(error)}
                  label="Featured Image (OG Image)"
                />
              </div>
              
              {/* SEO Sidebar */}
              <div className="flex-1 overflow-y-auto">
                <SEOSidebar articleData={articleData} onChange={handleChange} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

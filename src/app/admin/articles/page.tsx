'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2,
  Calendar, Star, ChevronLeft, ChevronRight, FileText, Loader
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  category: string;
  author?: string;
  seoScore?: number;
  language: string;
  is_featured: boolean;
  created_at: string;
  scheduled_date: string | null;
}

export default function ArticlesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles');
      if (response.ok) {
        const { articles } = await response.json();
        setArticles(articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setArticles(articles.filter(a => a.id !== id));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const filtered = articles.filter(a => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    return true;
  });

  const langFlags: Record<string, string> = { en: '🇺🇸', id: '🇮🇩', zh: '🇨🇳' };

  return (
    <div className="space-y-6 admin-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>Articles</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>
            Manage your SEO-optimized blog articles and export guides.
          </p>
        </div>
        <Link href="/admin/articles/new" className="admin-btn admin-btn-primary shrink-0">
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'scheduled'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                  statusFilter === status
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
                style={statusFilter !== status ? { color: 'var(--admin-text-muted)' } : undefined}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64" style={{ color: 'var(--admin-text-muted)' }}>
            <div className="flex items-center gap-3">
              <Loader className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading articles...</span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3" style={{ color: 'var(--admin-text-muted)' }}>
            <FileText className="w-10 h-10 opacity-50" />
            <span className="text-sm">No articles found</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: 'var(--admin-input-bg)', borderBottom: '1px solid var(--admin-border)' }}>
                <tr>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--admin-text-secondary)' }}>Title</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--admin-text-secondary)' }}>Status</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--admin-text-secondary)' }}>Category</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--admin-text-secondary)' }}>Language</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--admin-text-secondary)' }}>Created</th>
                  <th className="px-4 py-3 text-center font-medium" style={{ color: 'var(--admin-text-secondary)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(article => (
                  <tr key={article.id} style={{ borderBottom: '1px solid var(--admin-border)' }} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {article.is_featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                        <div>
                          <p className="font-medium" style={{ color: 'var(--admin-text)' }}>{article.title}</p>
                          <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>/{article.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`status-badge ${article.status === 'published' ? 'status-published' : article.status === 'scheduled' ? 'status-scheduled' : 'status-draft'}`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--admin-text-muted)' }}>{article.category || '-'}</td>
                    <td className="px-4 py-3">{langFlags[article.language] || article.language}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--admin-text-muted)' }}>
                      <span className="text-xs">{new Date(article.created_at).toLocaleDateString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1 relative">
                        <Link href={`/admin/articles/${article.id}/edit`} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />
                        </Link>
                        <button onClick={() => deleteArticle(article.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

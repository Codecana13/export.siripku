'use client';

import { useState } from 'react';
import { Globe, Plus, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', articles: 18, landing: 6, completion: 100 },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', articles: 8, landing: 3, completion: 45 },
  { code: 'zh', name: 'Chinese (Simplified)', flag: '🇨🇳', articles: 3, landing: 1, completion: 18 },
];

const translationQueue = [
  { title: 'Complete Guide to Importing Ornamental Fish', from: 'en', to: 'id', status: 'pending', priority: 'high' },
  { title: 'Premium Guppy Strains for International Market', from: 'en', to: 'id', status: 'in_progress', priority: 'medium' },
  { title: 'Guppy Exporter Landing Page', from: 'en', to: 'zh', status: 'pending', priority: 'high' },
  { title: 'Discus Fish Export Quality Standards', from: 'en', to: 'zh', status: 'pending', priority: 'low' },
  { title: 'Betta Fish Care for Importers', from: 'en', to: 'id', status: 'completed', priority: 'medium' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500/12 text-amber-400 border-amber-500/20',
  in_progress: 'bg-blue-500/12 text-blue-400 border-blue-500/20',
  completed: 'bg-emerald-500/12 text-emerald-400 border-emerald-500/20',
};

export default function LanguagesPage() {
  return (
    <div className="space-y-6 admin-fade-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>Multi-language SEO</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>Manage content translations for English, Indonesian, and Chinese.</p>
      </div>

      {/* Language Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {languages.map(lang => (
          <div key={lang.code} className="admin-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{lang.flag}</span>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--admin-text)' }}>{lang.name}</h3>
                <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>{lang.code.toUpperCase()}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--admin-text-muted)' }}>Articles</span>
                <span style={{ color: 'var(--admin-text)' }}>{lang.articles}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: 'var(--admin-text-muted)' }}>Landing Pages</span>
                <span style={{ color: 'var(--admin-text)' }}>{lang.landing}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: 'var(--admin-text-muted)' }}>Completion</span>
                  <span className={lang.completion === 100 ? 'text-emerald-400' : 'text-amber-400'}>{lang.completion}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: 'var(--admin-border)' }}>
                  <div className={`h-full rounded-full transition-all ${lang.completion === 100 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${lang.completion}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Translation Queue */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>Translation Queue</h2>
          <button className="admin-btn admin-btn-primary text-xs py-2"><Plus className="w-3.5 h-3.5" /> Add Translation</button>
        </div>
        <table className="admin-table">
          <thead><tr><th>Content</th><th>Translation</th><th>Priority</th><th>Status</th></tr></thead>
          <tbody>
            {translationQueue.map((item, i) => (
              <tr key={i}>
                <td>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-sm" style={{ color: 'var(--admin-text)' }}>{item.title}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--admin-text-muted)' }}>
                    {item.from.toUpperCase()} <ArrowRight className="w-3 h-3" /> {item.to.toUpperCase()}
                  </div>
                </td>
                <td>
                  <span className={`text-xs font-medium capitalize ${item.priority === 'high' ? 'text-red-400' : item.priority === 'medium' ? 'text-amber-400' : 'text-slate-400'}`}>
                    {item.priority}
                  </span>
                </td>
                <td>
                  <span className={`status-badge border ${statusColors[item.status]}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

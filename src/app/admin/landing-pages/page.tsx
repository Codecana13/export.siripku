'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Fish, MoreHorizontal, Globe } from 'lucide-react';

const fishCategories = [
  { id: '1', name: 'Guppy Exporter', slug: 'guppy-exporter', fish: 'Guppy', status: 'published', seoScore: 92, pages: 3, image: '🐠' },
  { id: '2', name: 'Discus Exporter', slug: 'discus-exporter', fish: 'Discus', status: 'published', seoScore: 88, pages: 2, image: '🐟' },
  { id: '3', name: 'Betta Exporter', slug: 'betta-exporter', fish: 'Betta', status: 'draft', seoScore: 75, pages: 1, image: '🐡' },
  { id: '4', name: 'Corydoras Exporter', slug: 'corydoras-exporter', fish: 'Corydoras', status: 'published', seoScore: 85, pages: 2, image: '🐠' },
  { id: '5', name: 'Pleco Exporter', slug: 'pleco-exporter', fish: 'Pleco', status: 'draft', seoScore: 60, pages: 1, image: '🐟' },
  { id: '6', name: 'Tetra Exporter', slug: 'tetra-exporter', fish: 'Tetra', status: 'published', seoScore: 82, pages: 2, image: '🐡' },
];

export default function LandingPagesPage() {
  return (
    <div className="space-y-6 admin-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>Landing Pages</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>Manage SEO landing pages for fish categories.</p>
        </div>
        <button className="admin-btn admin-btn-primary shrink-0"><Plus className="w-4 h-4" /> New Landing Page</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fishCategories.map(cat => (
          <div key={cat.id} className="admin-card p-5 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-2xl">
                  {cat.image}
                </div>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--admin-text)' }}>{cat.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>/species/{cat.slug}</p>
                </div>
              </div>
              <span className={`status-badge ${cat.status === 'published' ? 'status-published' : 'status-draft'}`}>{cat.status}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-[10px] mb-1" style={{ color: 'var(--admin-text-muted)' }}>SEO Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--admin-border)' }}>
                    <div className={`h-full rounded-full ${cat.seoScore >= 80 ? 'bg-emerald-400' : cat.seoScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${cat.seoScore}%` }} />
                  </div>
                  <span className={`text-xs font-bold ${cat.seoScore >= 80 ? 'text-emerald-400' : cat.seoScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{cat.seoScore}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] mb-1" style={{ color: 'var(--admin-text-muted)' }}>Languages</p>
                <div className="flex gap-1">
                  {['🇺🇸', '🇮🇩', '🇨🇳'].slice(0, cat.pages).map((flag, i) => (
                    <span key={i} className="text-sm">{flag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/admin/landing-pages/${cat.id}/edit`} className="admin-btn admin-btn-secondary text-xs py-2 flex-1 justify-center">
                <Edit className="w-3.5 h-3.5" /> Edit
              </Link>
              <button className="admin-btn admin-btn-secondary text-xs py-2 px-3">
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

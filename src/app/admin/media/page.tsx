'use client';

import { useState } from 'react';
import { Upload, Search, Grid, List, Trash2, Edit, Image as ImageIcon, Film, X, Plus } from 'lucide-react';

const mockMedia = [
  { id: '1', filename: 'premium-guppy-collection.webp', size: '245 KB', dimensions: '1200×800', alt: 'Premium guppy fish collection', type: 'image', url: '/images/guppy.jpg', date: '2026-05-15' },
  { id: '2', filename: 'discus-fish-export.webp', size: '312 KB', dimensions: '1200×800', alt: 'Discus fish ready for export', type: 'image', url: '/images/discus.jpg', date: '2026-05-14' },
  { id: '3', filename: 'betta-halfmoon.webp', size: '198 KB', dimensions: '1200×800', alt: 'Halfmoon betta fish', type: 'image', url: '/images/betta.jpg', date: '2026-05-12' },
  { id: '4', filename: 'packing-process.webp', size: '456 KB', dimensions: '1920×1080', alt: 'Fish packing process', type: 'image', url: '/images/packing.jpg', date: '2026-05-10' },
  { id: '5', filename: 'corydoras-group.webp', size: '287 KB', dimensions: '1200×800', alt: 'Corydoras catfish group', type: 'image', url: '/images/corydoras.jpg', date: '2026-05-08' },
  { id: '6', filename: 'facility-tour.webp', size: '534 KB', dimensions: '1920×1080', alt: 'Siripku export facility', type: 'image', url: '/images/facility.jpg', date: '2026-05-05' },
];

export default function MediaLibraryPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const filtered = mockMedia.filter(m => m.filename.toLowerCase().includes(search.toLowerCase()) || m.alt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 admin-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>Media Library</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>Upload and manage images with auto WebP conversion.</p>
        </div>
        <button className="admin-btn admin-btn-primary shrink-0">
          <Upload className="w-4 h-4" /> Upload Files
        </button>
      </div>

      {/* Upload Zone */}
      <div
        className={`admin-card p-8 text-center transition-all cursor-pointer ${dragOver ? 'border-cyan-400 bg-cyan-500/5' : ''}`}
        style={{ borderStyle: 'dashed', borderWidth: '2px' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); }}
      >
        <Upload className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
        <p className="text-sm font-medium" style={{ color: 'var(--admin-text)' }}>Drag & drop files here, or click to browse</p>
        <p className="text-xs mt-1" style={{ color: 'var(--admin-text-muted)' }}>PNG, JPG, WebP up to 10MB • Auto-compressed & converted to WebP</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />
          <input type="text" placeholder="Search media..." value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-10" />
        </div>
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--admin-border)' }}>
          <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : ''}`} style={view !== 'grid' ? { color: 'var(--admin-text-muted)' } : undefined}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-cyan-500/20 text-cyan-400' : ''}`} style={view !== 'list' ? { color: 'var(--admin-text-muted)' } : undefined}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(media => (
            <div key={media.id} onClick={() => setSelected(media.id)} className={`admin-card overflow-hidden cursor-pointer group ${selected === media.id ? 'ring-2 ring-cyan-400' : ''}`}>
              <div className="aspect-square bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center relative">
                <ImageIcon className="w-10 h-10 text-cyan-500/30" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30"><Edit className="w-4 h-4 text-white" /></button>
                  <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium truncate" style={{ color: 'var(--admin-text)' }}>{media.filename}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>{media.size} • {media.dimensions}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <table className="admin-table">
            <thead><tr><th>File</th><th>Alt Text</th><th>Size</th><th>Dimensions</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {filtered.map(media => (
                <tr key={media.id}>
                  <td><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center shrink-0"><ImageIcon className="w-4 h-4 text-cyan-400/50" /></div><span className="text-sm" style={{ color: 'var(--admin-text)' }}>{media.filename}</span></div></td>
                  <td className="text-xs">{media.alt}</td>
                  <td className="text-xs">{media.size}</td>
                  <td className="text-xs">{media.dimensions}</td>
                  <td className="text-xs">{media.date}</td>
                  <td><button className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

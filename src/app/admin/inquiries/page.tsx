'use client';

import { useState } from 'react';
import { MessageSquare, Search, Filter, Mail, Phone, Globe, ChevronRight, ExternalLink } from 'lucide-react';

const mockInquiries = [
  { id: '1', name: 'John Tanaka', email: 'john@tokyoaquatics.jp', company: 'Tokyo Aquatics Co.', country: 'Japan', phone: '+81-3-1234-5678', fish: 'Guppy, Discus', message: 'Interested in monthly supply of premium guppies...', status: 'new', source: '/species/guppy-exporter', date: '2026-05-19' },
  { id: '2', name: 'Hans Mueller', email: 'hans@aquarienhaus.de', company: 'Aquarien Haus GmbH', country: 'Germany', phone: '+49-30-9876543', fish: 'Discus, Corydoras', message: 'Looking for wholesale discus supplier from Indonesia...', status: 'contacted', source: '/blog/discus-export-guide', date: '2026-05-18' },
  { id: '3', name: 'Li Wei', email: 'liwei@fishworld.cn', company: 'Fish World Trading', country: 'China', phone: '+86-21-88889999', fish: 'Betta', message: 'We need 500 halfmoon bettas per month...', status: 'qualified', source: '/species/betta-exporter', date: '2026-05-17' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@tropicalimports.com', company: 'Tropical Imports LLC', country: 'USA', phone: '+1-305-555-0123', fish: 'Tetra, Pleco', message: 'Requesting price list for tetras and plecos...', status: 'new', source: '/', date: '2026-05-16' },
  { id: '5', name: 'Ahmed Hassan', email: 'ahmed@dubaifish.ae', company: 'Dubai Fish Market', country: 'UAE', phone: '+971-4-555-6789', fish: 'Guppy', message: 'Need premium show guppies for our stores...', status: 'closed', source: '/species/guppy-exporter', date: '2026-05-14' },
];

const statusStyles: Record<string, string> = {
  new: 'bg-blue-500/12 text-blue-400 border-blue-500/20',
  contacted: 'bg-amber-500/12 text-amber-400 border-amber-500/20',
  qualified: 'bg-emerald-500/12 text-emerald-400 border-emerald-500/20',
  closed: 'bg-slate-500/12 text-slate-400 border-slate-500/20',
};

export default function InquiriesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = mockInquiries.filter(inq => {
    if (search && !inq.name.toLowerCase().includes(search.toLowerCase()) && !inq.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && inq.status !== statusFilter) return false;
    return true;
  });

  const selectedInquiry = mockInquiries.find(i => i.id === selected);

  return (
    <div className="space-y-6 admin-fade-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>Inquiries</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>Manage buyer inquiries from your export website.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'New', value: '12', color: 'text-blue-400' },
          { label: 'Contacted', value: '8', color: 'text-amber-400' },
          { label: 'Qualified', value: '5', color: 'text-emerald-400' },
          { label: 'Closed', value: '23', color: 'text-slate-400' },
        ].map((s, i) => (
          <div key={i} className="admin-card p-4">
            <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />
          <input type="text" placeholder="Search by name or company..." value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-10" />
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'qualified', 'closed'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === s ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'hover:bg-white/5 border border-transparent'}`}
              style={statusFilter !== s ? { color: 'var(--admin-text-muted)' } : undefined}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry List + Detail */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 admin-card overflow-hidden">
          <table className="admin-table">
            <thead><tr><th>Contact</th><th className="hidden md:table-cell">Country</th><th>Fish Interest</th><th>Status</th><th className="hidden lg:table-cell">Date</th></tr></thead>
            <tbody>
              {filtered.map(inq => (
                <tr key={inq.id} onClick={() => setSelected(inq.id)} className={`cursor-pointer ${selected === inq.id ? '!bg-cyan-500/5' : ''}`}>
                  <td>
                    <p className="text-sm font-medium" style={{ color: 'var(--admin-text)' }}>{inq.name}</p>
                    <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>{inq.company}</p>
                  </td>
                  <td className="hidden md:table-cell text-sm">{inq.country}</td>
                  <td className="text-xs">{inq.fish}</td>
                  <td><span className={`status-badge border ${statusStyles[inq.status]}`}>{inq.status}</span></td>
                  <td className="hidden lg:table-cell text-xs" style={{ color: 'var(--admin-text-muted)' }}>{inq.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        <div className="admin-card p-6">
          {selectedInquiry ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>{selectedInquiry.name}</h3>
              <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>{selectedInquiry.company}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-cyan-400" /><span style={{ color: 'var(--admin-text-secondary)' }}>{selectedInquiry.email}</span></div>
                <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-cyan-400" /><span style={{ color: 'var(--admin-text-secondary)' }}>{selectedInquiry.phone}</span></div>
                <div className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4 text-cyan-400" /><span style={{ color: 'var(--admin-text-secondary)' }}>{selectedInquiry.country}</span></div>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--admin-text-muted)' }}>Message</p>
                <p className="text-sm p-3 rounded-xl" style={{ background: 'var(--admin-input-bg)', color: 'var(--admin-text-secondary)' }}>{selectedInquiry.message}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--admin-text-muted)' }}>Source</p>
                <p className="text-xs text-cyan-400">{selectedInquiry.source}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <a href={`https://wa.me/${selectedInquiry.phone?.replace(/[^0-9]/g, '')}`} target="_blank" className="admin-btn admin-btn-primary text-xs py-2 flex-1 justify-center">WhatsApp</a>
                <a href={`mailto:${selectedInquiry.email}`} className="admin-btn admin-btn-secondary text-xs py-2 flex-1 justify-center">Email</a>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-cyan-500/30" />
              <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

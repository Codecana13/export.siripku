'use client';

import { BarChart3, TrendingUp, Globe, Link as LinkIcon, FileText, Search, AlertTriangle, CheckCircle2, ArrowUpRight } from 'lucide-react';

const topKeywords = [
  { keyword: 'ornamental fish exporter indonesia', position: 3, change: '+2', volume: '2.4K', ctr: '12.5%' },
  { keyword: 'guppy fish exporter', position: 5, change: '+1', volume: '1.8K', ctr: '8.3%' },
  { keyword: 'discus fish supplier indonesia', position: 7, change: '+3', volume: '1.2K', ctr: '6.7%' },
  { keyword: 'tropical fish wholesale indonesia', position: 12, change: '-1', volume: '980', ctr: '4.2%' },
  { keyword: 'betta fish exporter', position: 8, change: '+5', volume: '1.5K', ctr: '7.1%' },
  { keyword: 'live fish export indonesia', position: 15, change: '+2', volume: '850', ctr: '3.1%' },
];

const topPages = [
  { page: '/blog/guide-importing-ornamental-fish', views: '3,421', avgPosition: '4.2', ctr: '11.2%' },
  { page: '/species/guppy-exporter', views: '2,856', avgPosition: '5.8', ctr: '8.9%' },
  { page: '/blog/premium-guppy-strains', views: '2,143', avgPosition: '6.1', ctr: '7.4%' },
  { page: '/species/discus-exporter', views: '1,987', avgPosition: '8.3', ctr: '5.6%' },
  { page: '/', views: '5,234', avgPosition: '3.1', ctr: '14.2%' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 admin-fade-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>SEO Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>Monitor your search performance and SEO health.</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Indexed Pages', value: '32', icon: FileText, change: '+4', color: 'text-cyan-400' },
          { label: 'Organic Clicks', value: '8.2K', icon: TrendingUp, change: '+23%', color: 'text-emerald-400' },
          { label: 'Avg. Position', value: '6.8', icon: Search, change: '+1.2', color: 'text-amber-400' },
          { label: 'Avg. CTR', value: '7.4%', icon: BarChart3, change: '+0.8%', color: 'text-purple-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="admin-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>{stat.value}</p>
              <span className="text-xs text-emerald-400">{stat.change} vs last month</span>
            </div>
          );
        })}
      </div>

      {/* Traffic Chart placeholder */}
      <div className="admin-card p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--admin-text)' }}>Organic Traffic Trend</h2>
        <div className="h-64 flex items-center justify-center rounded-xl" style={{ background: 'var(--admin-input-bg)' }}>
          <div className="text-center">
            <BarChart3 className="w-10 h-10 mx-auto mb-2 text-cyan-500/30" />
            <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Connect Google Search Console for live data</p>
            <button className="admin-btn admin-btn-primary text-xs mt-3 py-2 px-4">Connect GSC</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Keywords */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--admin-text)' }}>Top Keywords</h2>
          <table className="admin-table">
            <thead><tr><th>Keyword</th><th>Pos.</th><th>Δ</th><th>Volume</th><th>CTR</th></tr></thead>
            <tbody>
              {topKeywords.map((kw, i) => (
                <tr key={i}>
                  <td className="text-sm font-medium" style={{ color: 'var(--admin-text)' }}>{kw.keyword}</td>
                  <td><span className="text-sm font-bold text-cyan-400">{kw.position}</span></td>
                  <td><span className={`text-xs font-medium ${kw.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{kw.change}</span></td>
                  <td className="text-xs">{kw.volume}</td>
                  <td className="text-xs">{kw.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Pages */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--admin-text)' }}>Top Pages</h2>
          <table className="admin-table">
            <thead><tr><th>Page</th><th>Views</th><th>Avg. Pos</th><th>CTR</th></tr></thead>
            <tbody>
              {topPages.map((page, i) => (
                <tr key={i}>
                  <td className="text-xs font-medium text-cyan-400 max-w-[200px] truncate">{page.page}</td>
                  <td className="text-sm">{page.views}</td>
                  <td className="text-sm">{page.avgPosition}</td>
                  <td className="text-sm">{page.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Site Health */}
      <div className="admin-card p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--admin-text)' }}>Site Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Sitemap Status', value: 'Healthy', icon: CheckCircle2, ok: true, detail: '32 URLs indexed' },
            { label: 'Broken Links', value: '0 Found', icon: LinkIcon, ok: true, detail: 'Last checked: 2 hours ago' },
            { label: 'Core Web Vitals', value: 'Good', icon: Globe, ok: true, detail: 'LCP: 1.2s • FID: 12ms • CLS: 0.05' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'var(--admin-input-bg)' }}>
                <Icon className={`w-5 h-5 mt-0.5 ${item.ok ? 'text-emerald-400' : 'text-red-400'}`} />
                <div>
                  <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>{item.label}</p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--admin-text)' }}>{item.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--admin-text-muted)' }}>{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

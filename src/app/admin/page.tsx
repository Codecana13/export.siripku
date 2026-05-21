'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  FileText, Users, MessageSquare, TrendingUp,
  Eye, ArrowUpRight, Clock, Plus, BarChart3,
  Globe, Sparkles, Target
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Published Articles', value: '24', change: '+3 this week', icon: FileText, color: 'from-cyan-500 to-blue-500', trend: 'up' },
  { label: 'Total Inquiries', value: '156', change: '+12 this month', icon: MessageSquare, color: 'from-emerald-500 to-teal-500', trend: 'up' },
  { label: 'Avg. SEO Score', value: '87', change: '+5 points', icon: Target, color: 'from-amber-500 to-orange-500', trend: 'up' },
  { label: 'Page Views', value: '12.4K', change: '+18% vs last month', icon: Eye, color: 'from-purple-500 to-pink-500', trend: 'up' },
];

const recentActivity = [
  { user: 'Admin', action: 'Published article', target: 'Premium Guppy Export Guide 2026', time: '2 hours ago', type: 'publish' },
  { user: 'Sarah', action: 'Updated SEO for', target: 'Discus Fish Care & Export Standards', time: '4 hours ago', type: 'edit' },
  { user: 'Admin', action: 'New inquiry from', target: 'Tokyo Aquatics Co., Japan', time: '5 hours ago', type: 'inquiry' },
  { user: 'Mike', action: 'Uploaded 12 images to', target: 'Media Library', time: '1 day ago', type: 'upload' },
  { user: 'Admin', action: 'Created landing page', target: 'Betta Fish Exporter', time: '2 days ago', type: 'create' },
];

const topArticles = [
  { title: 'Complete Guide to Importing Ornamental Fish from Indonesia', views: '3,421', seoScore: 94, status: 'published' },
  { title: 'Top 10 Premium Guppy Strains for International Market', views: '2,856', seoScore: 91, status: 'published' },
  { title: 'Discus Fish Export: Quality Standards & Shipping Guide', views: '2,143', seoScore: 88, status: 'published' },
  { title: 'How to Start Importing Tropical Fish from Indonesia', views: '1,987', seoScore: 85, status: 'published' },
];

const quickActions = [
  { label: 'New Article', icon: Plus, href: '/admin/articles/new', color: 'from-cyan-500 to-blue-500' },
  { label: 'AI Assistant', icon: Sparkles, href: '/admin/ai-assistant', color: 'from-purple-500 to-pink-500' },
  { label: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'from-emerald-500 to-teal-500' },
  { label: 'Languages', icon: Globe, href: '/admin/languages', color: 'from-amber-500 to-orange-500' },
];

export default function AdminDashboard() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="space-y-6 admin-fade-in">
        <div className="admin-skeleton h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="admin-skeleton h-32 rounded-2xl" />)}
        </div>
        <div className="admin-skeleton h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 admin-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>
            Welcome back, {profile?.full_name || 'Admin'} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>
            Here&apos;s what&apos;s happening with your export content today.
          </p>
        </div>
        <Link href="/admin/articles/new" className="admin-btn admin-btn-primary shrink-0">
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="admin-card p-5 group" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--admin-text-muted)' }}>
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold" style={{ color: 'var(--admin-text)' }}>
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <Link
              key={i}
              href={action.href}
              className="admin-card p-4 flex items-center gap-3 group cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--admin-text)' }}>
                {action.label}
              </span>
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--admin-text-muted)' }} />
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Top Articles */}
        <div className="xl:col-span-2 admin-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>
              Top Performing Articles
            </h2>
            <Link href="/admin/articles" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {topArticles.map((article, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-white/5">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--admin-text)' }}>
                    {article.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--admin-text-muted)' }}>
                      <Eye className="w-3 h-3" /> {article.views}
                    </span>
                    <span className="status-badge status-published text-[10px]">Published</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-lg font-bold ${article.seoScore >= 90 ? 'text-emerald-400' : article.seoScore >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                    {article.seoScore}
                  </div>
                  <p className="text-[10px]" style={{ color: 'var(--admin-text-muted)' }}>SEO Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>
              Recent Activity
            </h2>
            <Link href="/admin/activity" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center text-[10px] font-bold text-cyan-400 shrink-0 mt-0.5">
                  {item.user[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm leading-snug" style={{ color: 'var(--admin-text-secondary)' }}>
                    <span className="font-medium" style={{ color: 'var(--admin-text)' }}>{item.user}</span>
                    {' '}{item.action}{' '}
                    <span className="font-medium text-cyan-400">{item.target}</span>
                  </p>
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--admin-text-muted)' }}>
                    <Clock className="w-3 h-3" /> {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Health Summary */}
      <div className="admin-card p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--admin-text)' }}>
          SEO Health Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Indexed Pages', value: '32', status: 'good' },
            { label: 'Avg. Load Time', value: '1.2s', status: 'good' },
            { label: 'Broken Links', value: '0', status: 'good' },
            { label: 'Sitemap Status', value: 'Healthy', status: 'good' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--admin-input-bg)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--admin-text-muted)' }}>{item.label}</p>
              <p className="text-xl font-bold text-emerald-400">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

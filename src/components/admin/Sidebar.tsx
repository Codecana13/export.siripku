'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission } from '@/lib/auth/roles';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  BarChart3,
  MessageSquare,
  Settings,
  Activity,
  Globe,
  ChevronLeft,
  ChevronRight,
  Fish,
  Sparkles,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
  onCloseMobile: () => void;
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, permission: null },
  { label: 'Articles', href: '/admin/articles', icon: FileText, permission: 'canCreateArticle' as const },
  { label: 'Landing Pages', href: '/admin/landing-pages', icon: Fish, permission: 'canManageLandingPages' as const },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon, permission: 'canManageMedia' as const },
  { label: 'AI Assistant', href: '/admin/ai-assistant', icon: Sparkles, permission: null },
  { label: 'SEO Analytics', href: '/admin/analytics', icon: BarChart3, permission: 'canViewAnalytics' as const },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare, permission: 'canManageInquiries' as const },
  { label: 'Multi-language', href: '/admin/languages', icon: Globe, permission: 'canManageLandingPages' as const },
  { label: 'Activity Logs', href: '/admin/activity', icon: Activity, permission: 'canViewActivityLogs' as const },
  { label: 'Settings', href: '/admin/settings', icon: Settings, permission: 'canManageSettings' as const },
];

export default function Sidebar({ isOpen, onToggle, isMobile, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const filteredItems = navItems.filter(item => {
    if (!item.permission) return true;
    if (!profile) return false;
    return hasPermission(profile.role, item.permission);
  });

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          transition-all duration-300 ease-in-out
          ${isMobile
            ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-72`
            : `${isOpen ? 'w-64' : 'w-[72px]'}`
          }
        `}
        style={{
          background: 'var(--admin-sidebar-bg)',
          borderRight: '1px solid var(--admin-border)',
        }}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-4 shrink-0"
          style={{ borderBottom: '1px solid var(--admin-border)' }}>
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shrink-0">
              <Fish className="w-5 h-5 text-white" />
            </div>
            {(isOpen || isMobile) && (
              <div className="overflow-hidden">
                <h1 className="text-sm font-bold whitespace-nowrap" style={{ color: 'var(--admin-text)' }}>
                  Siripku Export
                </h1>
                <p className="text-[10px] whitespace-nowrap" style={{ color: 'var(--admin-text-muted)' }}>
                  CMS Dashboard
                </p>
              </div>
            )}
          </Link>
          {isMobile && (
            <button onClick={onCloseMobile} className="p-1.5 rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" style={{ color: 'var(--admin-text-muted)' }} />
            </button>
          )}
          {!isMobile && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: 'var(--admin-text-muted)' }}
            >
              {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && onCloseMobile()}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-400 shadow-lg shadow-cyan-500/5'
                    : 'hover:bg-white/5'
                  }
                `}
                style={!isActive ? { color: 'var(--admin-text-muted)' } : undefined}
                title={!isOpen && !isMobile ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`} />
                {(isOpen || isMobile) && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section at bottom */}
        <div className="shrink-0 p-3" style={{ borderTop: '1px solid var(--admin-border)' }}>
          {profile && (isOpen || isMobile) && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {profile.full_name?.[0] || profile.email[0]?.toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium truncate" style={{ color: 'var(--admin-text)' }}>
                  {profile.full_name || profile.email}
                </p>
                <p className="text-[10px] capitalize" style={{ color: 'var(--admin-text-muted)' }}>
                  {profile.role.replace('_', ' ')}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-colors hover:bg-red-500/10 text-red-400 group"
            title={!isOpen && !isMobile ? 'Sign Out' : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-300 transition-colors" />
            {(isOpen || isMobile) && <span className="whitespace-nowrap">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminTheme } from '@/components/admin/ThemeProvider';
import { roleLabels, roleColors } from '@/lib/auth/roles';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/articles': 'Articles',
  '/admin/articles/new': 'New Article',
  '/admin/landing-pages': 'Landing Pages',
  '/admin/media': 'Media Library',
  '/admin/analytics': 'SEO Analytics',
  '/admin/inquiries': 'Inquiries',
  '/admin/settings': 'Settings',
  '/admin/activity': 'Activity Logs',
  '/admin/ai-assistant': 'AI Assistant',
  '/admin/languages': 'Multi-language',
};

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const { profile } = useAuth();
  const { theme, toggleTheme } = useAdminTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const crumbs: { label: string; path: string }[] = [];

    let currentPath = '';
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const label = breadcrumbMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      crumbs.push({ label, path: currentPath });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header
      className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6 backdrop-blur-xl"
      style={{
        background: 'var(--admin-header-bg)',
        borderBottom: '1px solid var(--admin-border)',
      }}
    >
      {/* Left: Menu + Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl transition-colors hover:bg-white/10"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--admin-text-muted)' }} />}
              <span
                className={i === breadcrumbs.length - 1 ? 'font-medium' : ''}
                style={{ color: i === breadcrumbs.length - 1 ? 'var(--admin-text)' : 'var(--admin-text-muted)' }}
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search articles..."
                autoFocus
                onBlur={() => setSearchOpen(false)}
                className="w-48 lg:w-64 px-3 py-1.5 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: 'var(--admin-input-bg)',
                  border: '1px solid var(--admin-border)',
                  color: 'var(--admin-text)',
                }}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl transition-colors hover:bg-white/10"
              style={{ color: 'var(--admin-text-muted)' }}
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl transition-all hover:bg-white/10"
          style={{ color: 'var(--admin-text-muted)' }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-xl transition-colors hover:bg-white/10 relative"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </button>

        {/* User avatar + role */}
        {profile && (
          <div className="hidden sm:flex items-center gap-2 ml-2 pl-2" style={{ borderLeft: '1px solid var(--admin-border)' }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              {profile.full_name?.[0] || profile.email[0]?.toUpperCase()}
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-medium" style={{ color: 'var(--admin-text)' }}>
                {profile.full_name || profile.email}
              </p>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${roleColors[profile.role]}`}>
                {roleLabels[profile.role]}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

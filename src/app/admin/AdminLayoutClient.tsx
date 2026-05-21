'use client';

import './admin.css';
import { useState, useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AdminThemeProvider } from '@/components/admin/ThemeProvider';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AuthProvider>
      <AdminThemeProvider>
        <div className="admin-dashboard min-h-screen" style={{ background: 'var(--admin-bg)' }}>
          <Sidebar
            isOpen={isMobile ? mobileMenuOpen : sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            isMobile={isMobile}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
          <div
            className="transition-all duration-300 min-h-screen flex flex-col"
            style={{
              marginLeft: isMobile ? 0 : sidebarOpen ? '256px' : '72px',
            }}
          >
            <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
            <main className="flex-1 p-4 lg:p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </AdminThemeProvider>
    </AuthProvider>
  );
}

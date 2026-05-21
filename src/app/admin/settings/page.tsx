'use client';

import { useState } from 'react';
import { Save, Globe, Shield, Key, Users, Bell, Palette } from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'seo', label: 'SEO Defaults', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6 admin-fade-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>Manage your CMS configuration and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-48 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5'}`}
                  style={activeTab !== tab.id ? { color: 'var(--admin-text-muted)' } : undefined}>
                  <Icon className="w-4 h-4" />{tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 admin-card p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>General Settings</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Site Name</label>
                  <input className="admin-input" defaultValue="Siripku Export" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Site Description</label>
                  <textarea className="admin-input resize-none" rows={3} defaultValue="Indonesia's leading freshwater ornamental fish exporter." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Site URL</label>
                  <input className="admin-input" defaultValue="https://export.siripku.id" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>WhatsApp Number</label>
                  <input className="admin-input" defaultValue="+62 896 5245 6206" placeholder="+62..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Contact Email</label>
                  <input className="admin-input" defaultValue="export.siripku@gmail.com" />
                </div>
              </div>
              <button className="admin-btn admin-btn-primary"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>Team Members</h2>
                <button className="admin-btn admin-btn-primary text-xs py-2"><Users className="w-3.5 h-3.5" /> Invite Member</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Admin User', email: 'admin@siripku.id', role: 'super_admin' },
                  { name: 'Sarah Editor', email: 'sarah@siripku.id', role: 'seo_editor' },
                  { name: 'Mike Writer', email: 'mike@siripku.id', role: 'content_writer' },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--admin-input-bg)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--admin-text)' }}>{member.name}</p>
                        <p className="text-xs" style={{ color: 'var(--admin-text-muted)' }}>{member.email}</p>
                      </div>
                    </div>
                    <select className="admin-input w-auto text-xs" defaultValue={member.role}>
                      <option value="super_admin">Super Admin</option>
                      <option value="seo_editor">SEO Editor</option>
                      <option value="content_writer">Content Writer</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>SEO Defaults</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Default Meta Title Template</label>
                  <input className="admin-input" defaultValue="%title% | Siripku Export" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Default Meta Description</label>
                  <textarea className="admin-input resize-none" rows={3} defaultValue="Premium freshwater ornamental fish from Indonesia. Worldwide shipping with export-grade quality." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Default OG Image</label>
                  <input className="admin-input" defaultValue="/images/og-default.jpg" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="auto-sitemap" defaultChecked className="w-4 h-4 accent-cyan-500" />
                  <label htmlFor="auto-sitemap" className="text-sm" style={{ color: 'var(--admin-text-secondary)' }}>Auto-generate XML Sitemap</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="auto-schema" defaultChecked className="w-4 h-4 accent-cyan-500" />
                  <label htmlFor="auto-schema" className="text-sm" style={{ color: 'var(--admin-text-secondary)' }}>Auto-generate Schema Markup</label>
                </div>
              </div>
              <button className="admin-btn admin-btn-primary"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--admin-text)' }}>API Keys</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>OpenAI API Key (for AI Assistant)</label>
                  <input type="password" className="admin-input" placeholder="sk-..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--admin-text-secondary)' }}>Google Search Console API</label>
                  <input type="password" className="admin-input" placeholder="API key..." />
                </div>
              </div>
              <button className="admin-btn admin-btn-primary"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          )}

          {(activeTab === 'security' || activeTab === 'notifications') && (
            <div className="text-center py-12">
              <Palette className="w-10 h-10 mx-auto mb-3 text-cyan-500/30" />
              <p className="text-sm" style={{ color: 'var(--admin-text-muted)' }}>Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

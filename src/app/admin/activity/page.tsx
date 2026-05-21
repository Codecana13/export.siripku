'use client';

import { Activity, FileText, Image, User, Settings, Clock, Filter } from 'lucide-react';

const activities = [
  { user: 'Admin', avatar: 'A', action: 'Published article', target: 'Premium Guppy Export Guide 2026', type: 'publish', time: '2 hours ago', icon: FileText },
  { user: 'Sarah', avatar: 'S', action: 'Updated SEO metadata for', target: 'Discus Fish Care & Export Standards', type: 'edit', time: '4 hours ago', icon: FileText },
  { user: 'Admin', avatar: 'A', action: 'Uploaded 12 images to', target: 'Media Library', type: 'upload', time: '5 hours ago', icon: Image },
  { user: 'Mike', avatar: 'M', action: 'Created draft article', target: 'Corydoras Packing Guide', type: 'create', time: '8 hours ago', icon: FileText },
  { user: 'Admin', avatar: 'A', action: 'Updated landing page', target: 'Betta Fish Exporter', type: 'edit', time: '1 day ago', icon: FileText },
  { user: 'Sarah', avatar: 'S', action: 'Changed user role for', target: 'Mike Writer → SEO Editor', type: 'settings', time: '1 day ago', icon: Settings },
  { user: 'Admin', avatar: 'A', action: 'Deleted draft article', target: 'Test Article', type: 'delete', time: '2 days ago', icon: FileText },
  { user: 'Admin', avatar: 'A', action: 'Updated site settings', target: 'WhatsApp number changed', type: 'settings', time: '3 days ago', icon: Settings },
  { user: 'Mike', avatar: 'M', action: 'Published article', target: 'Tetra Fish Export Guide', type: 'publish', time: '3 days ago', icon: FileText },
  { user: 'Sarah', avatar: 'S', action: 'Uploaded 5 images to', target: 'Media Library', type: 'upload', time: '4 days ago', icon: Image },
];

const typeColors: Record<string, string> = {
  publish: 'from-emerald-500 to-teal-500',
  edit: 'from-cyan-500 to-blue-500',
  create: 'from-purple-500 to-pink-500',
  upload: 'from-amber-500 to-orange-500',
  delete: 'from-red-500 to-rose-500',
  settings: 'from-slate-500 to-gray-500',
};

export default function ActivityPage() {
  return (
    <div className="space-y-6 admin-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--admin-text)' }}>Activity Logs</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--admin-text-muted)' }}>Track all actions performed by team members.</p>
        </div>
        <button className="admin-btn admin-btn-secondary text-xs py-2"><Filter className="w-3.5 h-3.5" /> Filter</button>
      </div>

      <div className="admin-card p-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: 'var(--admin-border)' }} />

          <div className="space-y-6">
            {activities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColors[activity.type]} flex items-center justify-center shrink-0 z-10 shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm leading-snug" style={{ color: 'var(--admin-text-secondary)' }}>
                      <span className="font-semibold" style={{ color: 'var(--admin-text)' }}>{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="font-medium text-cyan-400">{activity.target}</span>
                    </p>
                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--admin-text-muted)' }}>
                      <Clock className="w-3 h-3" /> {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

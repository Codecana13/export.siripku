export type UserRole = 'super_admin' | 'seo_editor' | 'content_writer';

export interface Permission {
  canCreateArticle: boolean;
  canEditArticle: boolean;
  canDeleteArticle: boolean;
  canPublishArticle: boolean;
  canManageLandingPages: boolean;
  canViewAnalytics: boolean;
  canManageMedia: boolean;
  canManageUsers: boolean;
  canViewActivityLogs: boolean;
  canManageSettings: boolean;
  canManageInquiries: boolean;
}

const rolePermissions: Record<UserRole, Permission> = {
  super_admin: {
    canCreateArticle: true,
    canEditArticle: true,
    canDeleteArticle: true,
    canPublishArticle: true,
    canManageLandingPages: true,
    canViewAnalytics: true,
    canManageMedia: true,
    canManageUsers: true,
    canViewActivityLogs: true,
    canManageSettings: true,
    canManageInquiries: true,
  },
  seo_editor: {
    canCreateArticle: true,
    canEditArticle: true,
    canDeleteArticle: false,
    canPublishArticle: true,
    canManageLandingPages: true,
    canViewAnalytics: true,
    canManageMedia: true,
    canManageUsers: false,
    canViewActivityLogs: true,
    canManageSettings: false,
    canManageInquiries: true,
  },
  content_writer: {
    canCreateArticle: true,
    canEditArticle: true,
    canDeleteArticle: false,
    canPublishArticle: false,
    canManageLandingPages: false,
    canViewAnalytics: false,
    canManageMedia: true,
    canManageUsers: false,
    canViewActivityLogs: false,
    canManageSettings: false,
    canManageInquiries: false,
  },
};

export function getPermissions(role: UserRole): Permission {
  return rolePermissions[role] || rolePermissions.content_writer;
}

export function hasPermission(role: UserRole, permission: keyof Permission): boolean {
  return getPermissions(role)[permission];
}

export const roleLabels: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  seo_editor: 'SEO Editor',
  content_writer: 'Content Writer',
};

export const roleColors: Record<UserRole, string> = {
  super_admin: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  seo_editor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  content_writer: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

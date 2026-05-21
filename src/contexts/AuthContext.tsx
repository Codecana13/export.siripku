'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UserRole, getPermissions, Permission } from '@/lib/auth/roles';
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  permissions: Permission | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  permissions: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const getUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);

        if (authUser) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (profileData) {
            setProfile(profileData as Profile);
          } else {
            const newProfile: Profile = {
              id: authUser.id,
              email: authUser.email || '',
              full_name: authUser.user_metadata?.full_name || null,
              avatar_url: null,
              role: 'content_writer',
            };
            await supabase.from('profiles').insert(newProfile);
            setProfile(newProfile);
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(profileData as Profile | null);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    if (!supabase) return;

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const permissions = profile ? getPermissions(profile.role) : null;

  return (
    <AuthContext.Provider value={{ user, profile, permissions, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

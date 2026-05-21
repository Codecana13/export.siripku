'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Fish, Eye, EyeOff, ArrowRight, Waves } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0b1120 0%, #0c2840 40%, #083344 70%, #0b1120 100%)' }}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #14b8a6, transparent)', animation: 'float 10s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', animation: 'float 12s ease-in-out infinite' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Waves at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <Waves className="w-full h-full text-cyan-500" />
        </div>
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="rounded-2xl p-8 backdrop-blur-xl"
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(6, 182, 212, 0.15)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 80px rgba(6,182,212,0.05)',
          }}>
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 mb-4 shadow-lg shadow-cyan-500/20">
              <Fish className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-sm text-slate-400">Sign in to Siripku Export CMS</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@siripku.id"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(6,182,212,0.2)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(6,182,212,0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(6,182,212,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 pr-12"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(6,182,212,0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(6,182,212,0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(6,182,212,0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
                boxShadow: '0 4px 20px rgba(6,182,212,0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,182,212,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(6,182,212,0.3)';
              }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Siripku Export CMS • Premium Fish Export Management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

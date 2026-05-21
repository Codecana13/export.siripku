import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '@/lib/supabase/env';

let browserClient: SupabaseClient | null = null;

/** Browser-only Supabase client. Returns null during SSR/build or when env is missing. */
export function createClient(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(config.url, config.anonKey);
  }

  return browserClient;
}

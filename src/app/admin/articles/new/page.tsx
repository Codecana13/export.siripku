'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewArticlePage() {
  const router = useRouter();

  useEffect(() => {
    // Generate a temporary ID and redirect to editor
    const id = crypto.randomUUID();
    router.replace(`/admin/articles/${id}/edit`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-3" style={{ color: 'var(--admin-text-muted)' }}>
        <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        <span className="text-sm">Creating new article...</span>
      </div>
    </div>
  );
}

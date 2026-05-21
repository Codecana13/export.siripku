-- Article generation jobs table
CREATE TABLE IF NOT EXISTS public.generation_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  niche TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'strategizing', 'outlining', 'writing', 'optimizing', 'linking', 'publishing', 'completed', 'failed')) DEFAULT 'pending',
  total_articles INTEGER DEFAULT 0,
  completed_articles INTEGER DEFAULT 0,
  topical_map JSONB,
  article_ideas JSONB,
  settings JSONB,
  error_log TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article generation queue table
CREATE TABLE IF NOT EXISTS public.article_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.generation_jobs(id) ON DELETE CASCADE,
  article_id UUID, -- References your existing articles table when published
  title TEXT NOT NULL,
  target_keyword TEXT,
  status TEXT CHECK (status IN ('queued', 'outline', 'writing', 'optimizing', 'linking', 'scheduled', 'published', 'failed')) DEFAULT 'queued',
  outline JSONB,
  sections JSONB,
  metadata JSONB,
  schema_markup JSONB,
  internal_links JSONB,
  word_count INTEGER DEFAULT 0,
  seo_score INTEGER DEFAULT 0,
  scheduled_date TIMESTAMPTZ,
  error_log TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_queue ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage AI jobs
CREATE POLICY "Allow auth read generation_jobs" ON public.generation_jobs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth insert generation_jobs" ON public.generation_jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow auth update generation_jobs" ON public.generation_jobs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth delete generation_jobs" ON public.generation_jobs FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow auth read article_queue" ON public.article_queue FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth insert article_queue" ON public.article_queue FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow auth update article_queue" ON public.article_queue FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth delete article_queue" ON public.article_queue FOR DELETE USING (auth.role() = 'authenticated');

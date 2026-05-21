-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content_html TEXT,
  content_text TEXT,
  seo_title VARCHAR(160),
  meta_description VARCHAR(160),
  focus_keyword VARCHAR(100),
  canonical_url VARCHAR(255),
  og_image VARCHAR(255),
  category VARCHAR(100),
  tags TEXT[] DEFAULT ARRAY[]::text[],
  language VARCHAR(10) DEFAULT 'en',
  status VARCHAR(50) DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  scheduled_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_language ON public.articles(language);

-- Enable Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read access" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.articles;

-- Create RLS policy to allow public read access
CREATE POLICY "Allow public read access" ON public.articles
  FOR SELECT
  USING (true);

-- Create RLS policy to allow public insert access (for now, can be restricted later)
CREATE POLICY "Allow public insert access" ON public.articles
  FOR INSERT
  WITH CHECK (true);

-- Create RLS policy to allow public update access (for now, can be restricted later)
CREATE POLICY "Allow public update access" ON public.articles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create RLS policy to allow public delete access (for now, can be restricted later)
CREATE POLICY "Allow public delete access" ON public.articles
  FOR DELETE
  USING (true);

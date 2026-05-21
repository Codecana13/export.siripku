# Setup Database Table untuk Articles

Error "Could not find the table 'public.articles'" berarti tabel `articles` di Supabase belum dibuat.

## Cara Setup:

### 1. Buka Supabase Dashboard
- Login ke https://app.supabase.com
- Pilih project Anda

### 2. Jalankan SQL Migration
- Buka tab **SQL Editor** di sidebar kiri
- Klik **New Query**
- Copy seluruh kode dari file `seo-agents/articles_table.sql`
- Paste ke SQL editor
- Klik **Run** (atau tekan Ctrl+Enter)

Atau alternatif:

- Buka **SQL Editor** → **New Query** → paste kode berikut:

```sql
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

CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_language ON public.articles(language);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.articles
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users full access" ON public.articles
  FOR ALL
  USING (auth.role() = 'authenticated');
```

### 3. Verifikasi Tabel
- Buka **Table Editor** di sidebar
- Pastikan tabel `articles` sudah muncul di list

### 4. Test Upload Article
- Kembali ke aplikasi
- Buka `/admin/articles/new`
- Coba upload article lagi

Setelah table dibuat, error seharusnya hilang dan Anda bisa publish artikel!

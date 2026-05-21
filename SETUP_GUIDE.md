# Panduan Setup Admin Article Publishing

Dokumen ini menjelaskan cara menyiapkan fitur publish artikel dengan Supabase dan Cloudinary.

## Prerequisites

- Node.js 18+
- Akun Supabase
- Akun Cloudinary

## Setup Steps

### 1. Supabase Database Setup

Buat tabel `articles` di Supabase dengan struktur berikut:

```sql
CREATE TABLE articles (
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

CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX idx_articles_slug ON articles(slug);
```

### 2. Environment Variables

Copy `.env.example` ke `.env.local` dan isi dengan kredensial Anda:

```bash
cp .env.example .env.local
```

Kemudian update nilai-nilainya:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=<URL dari Supabase project>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Anon key dari Supabase>

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Cloud name Anda>
CLOUDINARY_API_KEY=<API key Anda>
CLOUDINARY_API_SECRET=<API secret Anda>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Fitur-Fitur

#### A. Create New Article
- Navigasi ke `/admin/articles/new`
- Akan otomatis di-redirect ke halaman edit dengan ID unik

#### B. Edit Article
- Upload featured image (akan di-upload ke Cloudinary)
- Edit content dengan rich text editor
- Manage SEO settings di sidebar
- Save sebagai draft atau publish langsung

#### C. Publish Article
- Klik tombol "Publish" untuk langsung publish
- Atau "Save Draft" untuk menyimpan sebagai draft
- Status akan muncul di list articles

## API Endpoints

### GET /api/articles
Mendapatkan list semua articles

### POST /api/articles
Membuat artikel baru

### GET /api/articles/[id]
Mendapatkan detail artikel tertentu

### PUT /api/articles/[id]
Update artikel

### DELETE /api/articles/[id]
Hapus artikel

### POST /api/upload
Upload gambar ke Cloudinary

## Features

✅ Create article dengan unique ID  
✅ Upload featured image ke Cloudinary  
✅ Edit rich text content  
✅ Manage SEO settings (title, meta description, keywords)  
✅ Save as draft atau publish langsung  
✅ View article status (draft, published, scheduled)  
✅ Auto-generate URL slug  

## Troubleshooting

### Upload image gagal
- Pastikan CLOUDINARY_API_KEY dan CLOUDINARY_API_SECRET sudah benar
- Check Cloudinary dashboard untuk melihat error logs

### Article tidak tersimpan
- Pastikan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY benar
- Check browser console untuk error messages

### Slug duplicate error
- Slug harus unik, coba ubah title atau slug secara manual

## Next Steps

1. Setup AI integration untuk generate SEO titles dan descriptions
2. Implement preview functionality
3. Add scheduling feature untuk publish di waktu tertentu
4. Add version control untuk article history
5. Implement categories dan tags management

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidateAfterArticleChange } from '@/lib/seo/revalidate';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ articles: articles || [] });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from('articles')
      .insert({
        id: body.id,
        title: body.title,
        slug: body.slug,
        content_html: body.contentHtml,
        content_text: body.contentText,
        seo_title: body.seoTitle,
        meta_description: body.metaDescription,
        focus_keyword: body.focusKeyword,
        schema_markup: body.schemaMarkup,
        canonical_url: body.canonicalUrl,
        og_image: body.ogImage,
        category: body.category,
        tags: body.tags,
        language: body.language,
        status: body.status || 'draft',
        is_featured: body.isFeatured || false,
        scheduled_date: body.scheduledDate || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidateAfterArticleChange({ slug: data.slug });

    return NextResponse.json({ article: data });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

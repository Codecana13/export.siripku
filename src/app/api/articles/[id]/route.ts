import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidateAfterArticleChange } from '@/lib/seo/revalidate';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    
    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    const { data: existing } = await supabase
      .from('articles')
      .select('slug')
      .eq('id', id)
      .single();

    const { data, error } = await supabase
      .from('articles')
      .update({
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
        status: body.status,
        is_featured: body.isFeatured,
        scheduled_date: body.scheduledDate || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidateAfterArticleChange({
      slug: data.slug,
      previousSlug: existing?.slug,
    });

    return NextResponse.json({ article: data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerSupabaseClient();

    const { data: existing } = await supabase
      .from('articles')
      .select('slug')
      .eq('id', id)
      .single();

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidateAfterArticleChange({ slug: existing?.slug });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

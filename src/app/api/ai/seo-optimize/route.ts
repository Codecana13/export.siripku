import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3-vl:8b';

export async function POST(request: Request) {
  try {
    const { title, contentText, contentHtml, category, currentSlug } = await request.json();

    if (!title && !contentText) {
      return NextResponse.json({ error: 'Title or content is required' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: publishedArticles } = await supabase
      .from('articles')
      .select('title, slug')
      .eq('status', 'published')
      .neq('slug', currentSlug || '')
      .limit(10);

    let relatedContext = '';
    if (publishedArticles && publishedArticles.length >= 4) {
      relatedContext = `
You have the following internal articles available for linking:
${publishedArticles.map(a => `- Title: "${a.title}", slug: "${a.slug}"`).join('\n')}

Identify 2-3 EXACT phrases from the Content that can naturally link to these internal articles.`;
    }

    const articleSnippet = (contentText || '').substring(0, 1500);

    const userPrompt = `Analyze this article and return ONLY a JSON object with SEO metadata. No explanations.

Title: ${title || 'Untitled'}
Category: ${category || 'general'}
Content: ${articleSnippet}
${relatedContext}

Return ONLY this JSON:
{"seoTitle":"compelling title 30-60 chars with keyword","metaDescription":"description 120-160 chars with keyword","focusKeyword":"2-5 main keywords separated by commas (e.g., koi fish, export, indonesia)","schemaMarkup":"<script type=\\"application/ld+json\\">{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"title\\"}...</script>","slug":"url-slug-with-keyword","tags":["tag1","tag2","tag3"],"category":"one of: export-guides, species, industry, care","internalLinks":[{"phrase":"exact phrase found in content","slug":"target-slug"}]}

DO NOT INCLUDE ANY THINKING OR EXPLANATIONS.`;

    const assistantPrefix = '{"seoTitle":';

    const ollamaResponse = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'user', content: userPrompt },
          { role: 'assistant', content: assistantPrefix }
        ],
        stream: false,
        options: {
          temperature: 0.1,
          num_predict: 1024,
        },
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error('Ollama error:', errorText);
      return NextResponse.json(
        { error: `Ollama error (${ollamaResponse.status}): ${errorText}` },
        { status: 502 }
      );
    }

    const ollamaData = await ollamaResponse.json();
    
    // Concatenate the prefix we forced with the model's continuation
    let rawResponse = assistantPrefix + (ollamaData.message?.content || ollamaData.response || '');

    console.log('Ollama raw response:', rawResponse.substring(0, 500));

    if (!ollamaData.message?.content) {
      return NextResponse.json(
        { error: 'AI returned empty response. Please try again.' },
        { status: 422 }
      );
    }

    // Strip thinking tags if present
    rawResponse = rawResponse.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    // Remove markdown code fences
    rawResponse = rawResponse.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    // Extract JSON
    let seoData;

    // Try 1: Direct parse
    try {
      seoData = JSON.parse(rawResponse);
    } catch {
      // Try 2: Find outermost { ... }
      const match = rawResponse.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          seoData = JSON.parse(match[0]);
        } catch (e) {
          console.error('JSON parse failed. Extracted:', match[0]);
          return NextResponse.json(
            { error: 'AI returned malformed JSON. Please try again.', raw: rawResponse.substring(0, 300) },
            { status: 422 }
          );
        }
      } else {
        console.error('No JSON in response:', rawResponse.substring(0, 300));
        return NextResponse.json(
          { error: 'AI did not return JSON. Please try again.', raw: rawResponse.substring(0, 300) },
          { status: 422 }
        );
      }
    }

    // Validate and sanitize
    const result = {
      seoTitle: String(seoData.seoTitle || seoData.seo_title || title || '').substring(0, 60),
      metaDescription: String(seoData.metaDescription || seoData.meta_description || '').substring(0, 160),
      focusKeyword: String(seoData.focusKeyword || seoData.focus_keyword || ''),
      slug: String(seoData.slug || currentSlug || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim(),
      tags: Array.isArray(seoData.tags) ? seoData.tags.map(String).slice(0, 5) : [],
      category: String(seoData.category || category || ''),
      schemaMarkup: String(seoData.schemaMarkup || ''),
    };

    let optimizedContentHtml = contentHtml || '';
    if (seoData.internalLinks && Array.isArray(seoData.internalLinks)) {
      seoData.internalLinks.forEach((link: any) => {
        if (link.phrase && link.slug) {
          // Replace only outside of HTML tags using a simplified approach since JS doesn't have reliable lookbehinds
          const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(${escapeRegExp(link.phrase)})`, 'i');
          // Only replace the first occurrence to avoid over-linking
          optimizedContentHtml = optimizedContentHtml.replace(regex, `<a href="/blog/${link.slug}" class="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">$1</a>`);
        }
      });
    }

    return NextResponse.json({ seo: result, model: OLLAMA_MODEL, optimizedContentHtml });
  } catch (error) {
    console.error('AI SEO Optimize error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to connect to AI. Is Ollama running?' },
      { status: 500 }
    );
  }
}

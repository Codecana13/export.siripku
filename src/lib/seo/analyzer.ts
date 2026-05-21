export interface SEOAnalysis {
  score: number;
  checks: SEOCheck[];
}

export interface SEOCheck {
  id: string;
  label: string;
  passed: boolean;
  message: string;
  weight: number;
}

export function analyzeSEO(data: {
  title?: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  content?: string;
  slug?: string;
  ogImage?: string;
  headings?: string[];
}): SEOAnalysis {
  const checks: SEOCheck[] = [];
  const rawKws = (data.focusKeyword || '').split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
  const primaryKw = rawKws[0] || '';
  
  const title = data.seoTitle || data.title || '';
  const desc = data.metaDescription || '';
  const content = data.content || '';
  const contentLower = content.toLowerCase();

  // Title checks
  checks.push({
    id: 'title_length', label: 'SEO Title Length', weight: 10,
    passed: title.length >= 30 && title.length <= 60,
    message: title.length === 0 ? 'Add an SEO title' : title.length < 30 ? 'Title is too short (min 30 chars)' : title.length > 60 ? 'Title is too long (max 60 chars)' : `Title length is optimal (${title.length} chars)`,
  });
  
  const hasKwInTitle = rawKws.some(kw => title.toLowerCase().includes(kw));
  checks.push({
    id: 'title_keyword', label: 'Keyword in Title', weight: 15,
    passed: primaryKw.length > 0 && hasKwInTitle,
    message: primaryKw.length === 0 ? 'Set a focus keyword' : hasKwInTitle ? 'Focus keyword found in title' : 'Add focus keyword to title',
  });

  // Meta description
  checks.push({
    id: 'meta_length', label: 'Meta Description Length', weight: 10,
    passed: desc.length >= 120 && desc.length <= 160,
    message: desc.length === 0 ? 'Add a meta description' : desc.length < 120 ? 'Description too short (min 120 chars)' : desc.length > 160 ? 'Description too long (max 160 chars)' : `Description length is optimal (${desc.length} chars)`,
  });
  
  const hasKwInDesc = rawKws.some(kw => desc.toLowerCase().includes(kw));
  checks.push({
    id: 'meta_keyword', label: 'Keyword in Description', weight: 8,
    passed: primaryKw.length > 0 && hasKwInDesc,
    message: primaryKw.length === 0 ? 'Set a focus keyword' : hasKwInDesc ? 'Keyword found in description' : 'Add keyword to description',
  });

  // Content checks
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  checks.push({
    id: 'content_length', label: 'Content Length', weight: 12,
    passed: wordCount >= 300,
    message: wordCount === 0 ? 'Add content to your article' : wordCount < 300 ? `Content too short (${wordCount}/300 words)` : `Good content length (${wordCount} words)`,
  });
  
  const hasKwInContent = rawKws.some(kw => contentLower.includes(kw));
  checks.push({
    id: 'content_keyword', label: 'Keyword in Content', weight: 10,
    passed: primaryKw.length > 0 && hasKwInContent,
    message: primaryKw.length === 0 ? 'Set a focus keyword' : hasKwInContent ? 'Keyword found in content' : 'Add keyword to content body',
  });

  // Slug
  const slugLower = (data.slug || '').toLowerCase();
  const hasKwInSlug = rawKws.some(kw => slugLower.includes(kw.replace(/\s+/g, '-')));
  checks.push({
    id: 'slug_keyword', label: 'Keyword in URL', weight: 8,
    passed: primaryKw.length > 0 && hasKwInSlug,
    message: !data.slug ? 'Add a URL slug' : hasKwInSlug ? 'URL slug is optimized' : 'Include keyword in URL slug',
  });

  // OG Image
  checks.push({
    id: 'og_image', label: 'Open Graph Image', weight: 7,
    passed: !!data.ogImage,
    message: data.ogImage ? 'OG image is set' : 'Add an Open Graph image',
  });

  // Headings
  checks.push({
    id: 'has_headings', label: 'Uses Headings', weight: 8,
    passed: content.includes('<h2') || content.includes('<h3') || content.includes('## '),
    message: 'Use H2/H3 headings to structure content',
  });

  // Internal links
  checks.push({
    id: 'internal_links', label: 'Internal Links', weight: 7,
    passed: content.includes('href="/') || content.includes('href="https://export.siripku'),
    message: 'Add internal links to related content',
  });

  // Focus keyword exists
  checks.push({
    id: 'has_keyword', label: 'Focus Keyword Set', weight: 5,
    passed: primaryKw.length > 0,
    message: primaryKw.length > 0 ? `Focus keywords: "${rawKws.join(', ')}"` : 'Set focus keywords for SEO analysis',
  });

  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
  const earnedWeight = checks.filter(c => c.passed).reduce((sum, c) => sum + c.weight, 0);
  const score = Math.round((earnedWeight / totalWeight) * 100);

  return { score, checks };
}

export function calculateKeywordDensity(content: string, keywordStr: string): number {
  if (!content || !keywordStr) return 0;
  // Use the primary (first) keyword for density calculation
  const keyword = keywordStr.split(',')[0].trim();
  if (!keyword) return 0;
  
  const words = content.toLowerCase().split(/\s+/).filter(Boolean);
  const kwWords = keyword.toLowerCase().split(/\s+/);
  if (words.length === 0) return 0;

  let count = 0;
  for (let i = 0; i <= words.length - kwWords.length; i++) {
    const slice = words.slice(i, i + kwWords.length).join(' ');
    if (slice === keyword.toLowerCase()) count++;
  }

  return Math.round((count / words.length) * 10000) / 100;
}

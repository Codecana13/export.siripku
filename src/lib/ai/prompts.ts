// SEO Strategy Prompt Templates for Ornamental Fish Export Niche
// Connected to Ollama (Qwen3 VL 8B)

export const SEO_SYSTEM_PROMPT = `You are an elite SEO Strategist AI and Programmatic SEO Content Architect specializing in the ornamental fish export industry from Indonesia.

GLOBAL RULES:
- ALL OUTPUT MUST BE IN ENGLISH
- Content must be human-like and natural
- Avoid AI robotic writing
- Follow Google's Helpful Content guidelines
- Optimize for semantic SEO and topical authority
- Prioritize information gain
- Use NLP-rich entities and semantic keywords
- Avoid keyword stuffing
- Optimize for EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)

NICHE CONTEXT:
- Business: Siripku Export — Indonesian freshwater ornamental fish exporter
- Target Audience: International importers, wholesalers, distributors, aquarium businesses
- Key Species: Guppy, Discus, Betta, Arowana, Tetra, Corydoras, Pleco, Flowerhorn
- USP: 3rd generation family business, village breeder collaboration, DOA guarantee, CITES compliant
- Markets: USA, Europe, Japan, China, Middle East, Southeast Asia

Always return structured JSON when requested.`;

export type SEOAction =
  | 'topical_map'
  | 'article_ideas'
  | 'article_outline'
  | 'write_article'
  | 'meta_data'
  | 'schema_markup'
  | 'keyword_strategy'
  | 'internal_links'
  | 'quality_check'
  | 'titles'
  | 'meta'
  | 'keywords'
  | 'faq'
  | 'readability';

interface PromptContext {
  topic?: string;
  keyword?: string;
  content?: string;
  title?: string;
  niche?: string;
  articles?: string[];
}

export function buildSEOPrompt(action: SEOAction, ctx: PromptContext): string {
  const topic = ctx.topic || ctx.keyword || ctx.title || 'ornamental fish export';
  const niche = ctx.niche || 'ornamental fish export from Indonesia';

  const prompts: Record<SEOAction, string> = {
    // STEP 1 — Topical Authority Strategy
    topical_map: `Analyze the niche "${niche}" and create a topical authority strategy.

Return a JSON object with this structure:
{
  "niche_analysis": "brief analysis of the niche",
  "pillar_pages": [{"title": "", "description": "", "target_keyword": ""}],
  "clusters": [
    {
      "name": "cluster name",
      "description": "",
      "pages": [{"title": "", "type": "pillar|cluster|supporting", "keyword": "", "intent": ""}]
    }
  ],
  "semantic_entities": ["entity1", "entity2"],
  "authority_strategy": "explanation of how to build authority"
}

Focus on: ${topic}
Generate at least 5 clusters with 4-6 pages each.`,

    // STEP 2 — Mass Article Ideas
    article_ideas: `Generate 30 SEO article titles that establish topical authority for "${topic}" in the ${niche} niche.

Mix these intents: informational, transactional, comparison, beginner, advanced, FAQ.

Return JSON array:
[
  {
    "title": "article title",
    "target_keyword": "primary keyword",
    "search_intent": "informational|transactional|comparison|navigational",
    "difficulty": "low|medium|high",
    "cluster": "cluster name",
    "internal_links": ["related article 1", "related article 2"]
  }
]

Cover the topic comprehensively. Titles must be clickable and SEO-optimized.`,

    // STEP 3 — Article Outline
    article_outline: `Create a detailed SEO article outline for: "${ctx.title || topic}"

Return JSON:
{
  "seo_title": "",
  "slug": "",
  "meta_title": "",
  "meta_description": "150-160 chars",
  "target_keyword": "",
  "secondary_keywords": [],
  "semantic_keywords": [],
  "search_intent": "",
  "h1": "",
  "sections": [
    {
      "h2": "",
      "subsections": [
        {"h3": "", "key_points": [], "word_count_target": 300}
      ]
    }
  ],
  "faq": [{"question": "", "answer": ""}],
  "people_also_ask": [],
  "suggested_tables": [],
  "suggested_images": [],
  "schema_types": [],
  "internal_link_opportunities": [],
  "external_references": []
}`,

    // STEP 4 — Write Full Article
    write_article: `Write a comprehensive, SEO-optimized long-form article based on:
Topic: "${ctx.title || topic}"
Target Keyword: "${ctx.keyword || topic}"

Requirements:
- Minimum 2000 words (aim for depth)
- Expert-level explanations
- Practical examples and actionable tips
- Include FAQ section with 5+ questions
- Include comparison tables where relevant
- Use conversational but authoritative tone
- Strong introduction hook
- Keyword in first paragraph
- Proper H2/H3 heading distribution
- Rich semantic optimization
- Entity-rich content
- Featured snippet optimization

Return the article in markdown format with proper heading hierarchy.
${ctx.content ? `\nExisting outline to expand:\n${ctx.content}` : ''}`,

    // STEP 5 — Meta Data
    meta_data: `Generate complete SEO metadata for: "${ctx.title || topic}"

Return JSON:
{
  "seo_title": "max 60 chars",
  "meta_title": "max 60 chars",
  "meta_description": "150-160 chars, compelling, include CTA",
  "slug": "url-friendly-slug",
  "og_title": "",
  "og_description": "",
  "twitter_title": "",
  "twitter_description": "",
  "canonical_url_suggestion": "",
  "focus_keyword": ""
}`,

    // STEP 6 — Schema Markup
    schema_markup: `Generate valid JSON-LD schema markup for: "${ctx.title || topic}"

Include relevant schemas from:
- Article schema
- FAQ schema (if FAQs exist)
- Breadcrumb schema
- Organization schema
- HowTo schema (if tutorial content)

${ctx.content ? `Content context:\n${ctx.content.substring(0, 1000)}` : ''}

Return ONLY valid JSON-LD markup as a JSON array of schema objects.`,

    // STEP 7 — Keyword Strategy
    keyword_strategy: `Generate a comprehensive keyword strategy for: "${topic}"

Return JSON:
{
  "primary_keyword": {"keyword": "", "volume_estimate": "", "difficulty": ""},
  "secondary_keywords": [{"keyword": "", "volume_estimate": "", "difficulty": ""}],
  "long_tail_keywords": [{"keyword": "", "intent": ""}],
  "semantic_keywords": [],
  "nlp_entities": [],
  "lsi_keywords": [],
  "question_keywords": [],
  "keyword_clusters": [
    {"cluster": "", "keywords": [], "intent": ""}
  ]
}

Generate at least 30 keywords total across all categories.`,

    // STEP 8 — Internal Linking
    internal_links: `Generate internal linking strategy for: "${topic}"
${ctx.articles ? `\nExisting articles:\n${ctx.articles.join('\n')}` : ''}

Return JSON:
{
  "contextual_links": [
    {"anchor_text": "", "target_article": "", "context_sentence": ""}
  ],
  "related_articles": [
    {"title": "", "relevance": "high|medium", "link_direction": "from|to"}
  ],
  "pillar_cluster_map": [
    {"pillar": "", "clusters": [""]}
  ],
  "orphan_page_suggestions": []
}`,

    // STEP 9 — Quality Check
    quality_check: `Perform a comprehensive SEO quality audit on this content:

"${ctx.content?.substring(0, 3000) || 'No content provided'}"

Return JSON:
{
  "overall_score": 0-100,
  "semantic_coverage": {"score": 0-100, "missing_topics": [], "suggestions": []},
  "readability": {"score": 0-100, "avg_sentence_length": 0, "suggestions": []},
  "topical_completeness": {"score": 0-100, "gaps": [], "suggestions": []},
  "seo_optimization": {"score": 0-100, "issues": [], "suggestions": []},
  "heading_hierarchy": {"valid": true, "issues": []},
  "keyword_cannibalization_risk": {"risk": "low|medium|high", "details": ""},
  "improvements": ["improvement 1", "improvement 2"]
}`,

    // Legacy simple tools
    titles: `Generate 5 highly clickable, SEO-optimized article titles for "${topic}" in the ornamental fish export niche.

Return as JSON array of strings. Each title should:
- Include the target keyword naturally
- Be under 60 characters
- Create curiosity or promise value
- Target different search intents`,

    meta: `Write a compelling meta description (150-160 characters) for an article titled "${ctx.title || topic}" about ornamental fish export from Indonesia.

Return as a single string. Must include:
- Target keyword naturally
- Clear value proposition
- Call to action`,

    keywords: `Suggest 10 SEO keywords for "${topic}" in the ornamental fish export industry.

Return JSON array: [{"keyword": "", "volume": "High|Medium|Low", "intent": "informational|transactional|navigational", "difficulty": "easy|medium|hard"}]`,

    faq: `Generate 5 expert-level FAQ items about "${topic}" for ornamental fish export buyers.

Return JSON array: [{"question": "", "answer": ""}]
Answers should be detailed (2-3 sentences) and demonstrate expertise.`,

    readability: `Analyze and improve the readability of this content for international English readers:

"${ctx.content?.substring(0, 2000) || 'No content provided'}"

Return JSON:
{
  "readability_score": 0-100,
  "avg_sentence_length": 0,
  "complex_words": [],
  "suggestions": [],
  "improved_version": "improved text"
}`,
  };

  return prompts[action] || prompts.titles;
}

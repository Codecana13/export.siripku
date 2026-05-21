import { NextResponse } from 'next/server';
import { buildSEOPrompt, SEO_SYSTEM_PROMPT } from '@/lib/ai/prompts';
import type { SEOAction } from '@/lib/ai/prompts';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3:8b';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, topic, keyword, content, title, niche, articles } = body;

    const prompt = buildSEOPrompt(action as SEOAction, {
      topic,
      keyword,
      content,
      title,
      niche,
      articles,
    });

    // Try Ollama first
    try {
      const ollamaResponse = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: `${SEO_SYSTEM_PROMPT}\n\n${prompt}`,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 8192,
            top_p: 0.9,
          },
        }),
      });

      if (ollamaResponse.ok) {
        const data = await ollamaResponse.json();
        const rawResponse = data.response || '';

        // Try to extract JSON from the response
        const parsed = tryParseJSON(rawResponse);

        return NextResponse.json({
          result: parsed || rawResponse,
          raw: rawResponse,
          model: OLLAMA_MODEL,
          provider: 'ollama',
          eval_duration: data.eval_duration,
          total_duration: data.total_duration,
        });
      }
    } catch (ollamaError) {
      console.log('Ollama not available, using fallback:', ollamaError);
    }

    // Fallback: Check for OpenAI key
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'sk-placeholder-replace-with-your-key') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: SEO_SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const rawResponse = data.choices?.[0]?.message?.content || '';
      const parsed = tryParseJSON(rawResponse);

      return NextResponse.json({
        result: parsed || rawResponse,
        raw: rawResponse,
        model: 'gpt-4',
        provider: 'openai',
      });
    }

    // Final fallback: mock responses
    return NextResponse.json({
      result: getMockResponse(action, topic || keyword || title || ''),
      model: 'mock',
      provider: 'fallback',
      message: 'Ollama not running. Start Ollama with: ollama run qwen3:8b',
    });
  } catch (error) {
    console.error('AI route error:', error);
    return NextResponse.json(
      { error: 'AI request failed. Make sure Ollama is running.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      const models = data.models?.map((m: { name: string }) => m.name) || [];
      return NextResponse.json({
        status: 'connected',
        provider: 'ollama',
        url: OLLAMA_URL,
        models,
        configured_model: OLLAMA_MODEL,
        model_available: models.some((m: string) => m.startsWith(OLLAMA_MODEL.split(':')[0])),
      });
    }
    return NextResponse.json({ status: 'error', message: 'Ollama not responding' });
  } catch {
    return NextResponse.json({
      status: 'disconnected',
      message: 'Ollama is not running. Start it with: ollama serve',
      url: OLLAMA_URL,
    });
  }
}

function tryParseJSON(text: string): any {
  // Try direct parse
  try {
    return JSON.parse(text);
  } catch {
    // noop
  }

  // Try to extract JSON from markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1].trim());
    } catch {
      // noop
    }
  }

  // Try to find JSON array or object in text
  const bracketMatch = text.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  if (bracketMatch) {
    try {
      return JSON.parse(bracketMatch[1]);
    } catch {
      // noop
    }
  }

  return null;
}

function getMockResponse(action: string, topic: string) {
  const t = topic || 'ornamental fish';
  const mocks: Record<string, unknown> = {
    titles: [
      `Premium ${t} from Indonesia — Complete Export Guide 2026`,
      `How to Import ${t} from Indonesia | Trusted Supplier`,
      `${t}: Quality Standards & International Shipping Guide`,
      `Best Indonesian ${t} for Wholesale Buyers Worldwide`,
      `${t} Export Indonesia — Direct from Certified Farm`,
    ],
    meta: `Discover premium ${t} from Indonesia. Siripku Export offers certified quality with DOA guarantee & worldwide delivery. Request a quote today.`,
    keywords: [
      { keyword: `${t} exporter indonesia`, volume: 'High', intent: 'transactional', difficulty: 'medium' },
      { keyword: `buy ${t} wholesale`, volume: 'Medium', intent: 'transactional', difficulty: 'medium' },
      { keyword: `${t} supplier`, volume: 'High', intent: 'informational', difficulty: 'hard' },
      { keyword: `import ${t} from indonesia`, volume: 'Medium', intent: 'informational', difficulty: 'easy' },
      { keyword: `${t} shipping guide`, volume: 'Low', intent: 'informational', difficulty: 'easy' },
      { keyword: `best ${t} species export`, volume: 'Medium', intent: 'informational', difficulty: 'medium' },
    ],
    faq: [
      { question: `What quality standards do your ${t} meet?`, answer: 'All our fish meet international export quality standards with BKIPM health certificates, 14-day quarantine, and CITES compliance where applicable.' },
      { question: 'What is the minimum order quantity?', answer: 'MOQ varies by species — typically 500 pairs for standard varieties and 200 pairs for premium strains. Contact us for specific pricing.' },
      { question: 'How do you pack fish for international shipping?', answer: 'We use double-bag oxygen-sealed packing in insulated styrofoam boxes with temperature stabilizers, ensuring 72+ hours survival rate.' },
      { question: 'Do you provide DOA (Dead on Arrival) guarantee?', answer: 'Yes, we offer a DOA guarantee with credit or replacement on qualifying shipments. Claims must be made within 12 hours with photo evidence.' },
      { question: 'Which countries do you ship to?', answer: 'We export to 30+ countries including USA, Japan, EU, China, and Middle East. We handle all Indonesian export documentation.' },
    ],
    topical_map: {
      niche_analysis: `The ${t} niche has strong commercial potential with growing global demand. Key opportunities include species-specific guides, import regulations content, and care/breeding guides.`,
      pillar_pages: [
        { title: `Complete Guide to Importing ${t} from Indonesia`, description: 'Main pillar covering the entire import process', target_keyword: `import ${t} indonesia` },
        { title: `${t} Species Catalog & Export Guide`, description: 'Species catalog pillar page', target_keyword: `${t} species catalog` },
      ],
      clusters: [
        { name: 'Species Guides', description: 'Individual species export guides', pages: [
          { title: `Guppy Fish Export Guide`, type: 'cluster', keyword: 'guppy fish export', intent: 'informational' },
          { title: `Discus Fish Export Guide`, type: 'cluster', keyword: 'discus fish export', intent: 'informational' },
        ]},
      ],
    },
    article_ideas: Array.from({ length: 10 }, (_, i) => ({
      title: `${t} Article Idea ${i + 1}`,
      target_keyword: `${t} keyword ${i + 1}`,
      search_intent: ['informational', 'transactional', 'comparison'][i % 3],
      difficulty: ['low', 'medium', 'high'][i % 3],
      cluster: 'General',
      internal_links: [],
    })),
    keyword_strategy: {
      primary_keyword: { keyword: `${t} exporter indonesia`, volume_estimate: '1000-5000', difficulty: 'medium' },
      secondary_keywords: [
        { keyword: `buy ${t} wholesale`, volume_estimate: '500-1000', difficulty: 'medium' },
      ],
      long_tail_keywords: [
        { keyword: `how to import ${t} from indonesia to USA`, intent: 'informational' },
      ],
      semantic_keywords: [`tropical fish`, `aquarium fish`, `freshwater species`],
      question_keywords: [`where to buy ${t}?`, `how to import live fish?`],
    },
  };
  return mocks[action] || mocks.titles;
}

import { NextResponse } from 'next/server';

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, niche, num_articles } = body;

    if (action === 'start') {
      const response = await fetch(`${FASTAPI_URL}/api/pipeline/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, num_articles: num_articles || 50 }),
      });

      if (!response.ok) {
        throw new Error(`FastAPI returned ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });

  } catch (error: any) {
    console.error('Pipeline proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with AI Backend', details: error.message },
      { status: 503 }
    );
  }
}

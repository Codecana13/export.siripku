import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name: body.name,
        email: body.email,
        company: body.company,
        country: body.country,
        phone: body.phone,
        message: body.message,
        fish_interest: body.fishInterest,
        source_page: body.sourcePage,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ inquiry: data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

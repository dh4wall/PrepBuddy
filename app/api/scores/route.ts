import { NextRequest, NextResponse } from 'next/server';
import { getUserScores } from '@/lib/actions/general.action';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'User ID missing' }, { status: 400 });

  try {
    const scores = await getUserScores(userId);
    return NextResponse.json(scores || []);
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}
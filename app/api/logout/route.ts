// app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  
  // Properly clear the session cookie
  response.cookies.set('session', '', {
    maxAge: 0,
    path: '/',
  });

  return response;
}

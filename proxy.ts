import { NextRequest, NextResponse } from 'next/server';
import { decryptSession } from '@/app/lib/session';

export async function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  const session = await decryptSession(sessionCookie);

  if (!session) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/((?!login).*)'],
};

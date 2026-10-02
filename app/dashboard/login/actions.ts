'use server';

import { timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { encryptSession } from '@/app/lib/session';

export type LoginState = { status: 'idle' } | { status: 'error'; message: string };

function safeCompare(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get('username') ?? '');
  const password = String(formData.get('password') ?? '');

  const isValid =
    username.length > 0 &&
    password.length > 0 &&
    safeCompare(username, process.env.DASHBOARD_USER ?? '') &&
    safeCompare(password, process.env.DASHBOARD_PASSWORD ?? '');

  if (!isValid) {
    return { status: 'error', message: 'Identifiants incorrects.' };
  }

  const session = await encryptSession({ user: username });
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/dashboard/login');
}

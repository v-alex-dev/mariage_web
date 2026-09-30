import { SignJWT, jwtVerify } from 'jose';

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function encryptSession(payload: { user: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decryptSession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ['HS256'] });
    return payload as { user: string };
  } catch {
    return null; // signature invalide, expirée, ou absente
  }
}

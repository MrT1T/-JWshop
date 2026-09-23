import jwt from 'jsonwebtoken';

const rawSecret = process.env.JWT_SECRET;

if (!rawSecret) {
  throw new Error('JWT_SECRET environment variable is not set.');
}

const JWT_SECRET: string = rawSecret;
const JWT_EXPIRES_IN = '7d';

export function signAuthToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAuthToken(token: string): string {
  const payload = jwt.verify(token, JWT_SECRET);

  if (typeof payload === 'string' || typeof payload.sub !== 'string') {
    throw new Error('Invalid token payload.');
  }

  return payload.sub;
}

import { NextFunction, Request, Response } from 'express';

import { getAuthCookieName } from '../lib/authCookie';
import { verifyAuthToken } from '../lib/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[getAuthCookieName()];

  if (!token) {
    res
      .status(401)
      .json({ error: 'Unauthorized', message: 'Please sign in to continue.' });
    return;
  }

  try {
    req.userId = verifyAuthToken(token);
    next();
  } catch {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Your session has expired. Please sign in again.',
    });
  }
}

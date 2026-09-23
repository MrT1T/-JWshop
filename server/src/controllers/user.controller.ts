import { Request, Response } from 'express';

import { clearAuthCookie, setAuthCookie } from '../lib/authCookie';
import { signAuthToken } from '../lib/jwt';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';
import {
  authenticateUser,
  createUser,
  EmailAlreadyExistsError,
  getUserById,
  InvalidCredentialsError,
} from '../services/user.service';

export async function getCurrentUser(req: Request, res: Response) {
  const user = await getUserById(req.userId as string);

  if (!user) {
    res
      .status(401)
      .json({ error: 'Unauthorized', message: 'Please sign in to continue.' });
    return;
  }

  res.status(200).json(user);
}

export async function loginUser(req: Request, res: Response) {
  const parsed = loginUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: 'ValidationError',
      message: parsed.error.issues[0]?.message ?? 'Invalid request body.',
    });
    return;
  }

  try {
    const user = await authenticateUser(parsed.data);
    setAuthCookie(res, signAuthToken(user.id));
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      res
        .status(401)
        .json({ error: 'InvalidCredentials', message: error.message });
      return;
    }

    console.error('Failed to log in user:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Something went wrong. Please try again.',
    });
  }
}

export function logoutUser(_req: Request, res: Response) {
  clearAuthCookie(res);
  res.status(200).json({ message: 'Logged out.' });
}

export async function registerUser(req: Request, res: Response) {
  const parsed = registerUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: 'ValidationError',
      message: parsed.error.issues[0]?.message ?? 'Invalid request body.',
    });
    return;
  }

  try {
    const user = await createUser(parsed.data);
    setAuthCookie(res, signAuthToken(user.id));
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      res
        .status(409)
        .json({ error: 'EmailAlreadyExists', message: error.message });
      return;
    }

    console.error('Failed to register user:', error);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Something went wrong. Please try again.',
    });
  }
}

import { Request, Response } from 'express';

import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';
import {
  authenticateUser,
  createUser,
  EmailAlreadyExistsError,
  InvalidCredentialsError,
} from '../services/user.service';

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

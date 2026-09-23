import { Router } from 'express';

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth';

export const usersRouter = Router();

usersRouter.post('/', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/logout', logoutUser);
usersRouter.get('/me', requireAuth, getCurrentUser);

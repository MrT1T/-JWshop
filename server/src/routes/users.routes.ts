import { Router } from 'express';

import { loginUser, registerUser } from '../controllers/user.controller';

export const usersRouter = Router();

usersRouter.post('/', registerUser);
usersRouter.post('/login', loginUser);

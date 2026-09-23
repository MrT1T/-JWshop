import { Router } from 'express';

import { registerUser } from '../controllers/user.controller';

export const usersRouter = Router();

usersRouter.post('/', registerUser);

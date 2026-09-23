import { Router } from 'express';

import { usersRouter } from './users.routes';

export const routes = Router();

routes.use('/users', usersRouter);

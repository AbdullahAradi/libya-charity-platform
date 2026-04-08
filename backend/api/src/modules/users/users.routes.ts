import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './users.controller';
import { updateProfileSchema } from './users.schema';

export const usersRouter = Router();

usersRouter.get('/me', requireAuth, controller.getMe);
usersRouter.patch('/me', requireAuth, validate(updateProfileSchema), controller.updateMe);
usersRouter.get('/', requireAuth, requireRoles(...controller.adminRoles), controller.adminListUsers);

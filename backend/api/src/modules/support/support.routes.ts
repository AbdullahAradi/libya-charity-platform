import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './support.controller';
import { createSupportRequestSchema, updateSupportStatusSchema } from './support.schema';

export const supportRouter = Router();

supportRouter.post('/', requireAuth, validate(createSupportRequestSchema), controller.createSupportRequest);
supportRouter.get('/me', requireAuth, controller.listMySupportRequests);
supportRouter.get('/', requireAuth, requireRoles(...controller.supportRoles), controller.listAllSupportRequests);
supportRouter.patch('/:id/status', requireAuth, requireRoles(...controller.supportRoles), validate(updateSupportStatusSchema), controller.updateSupportRequestStatus);

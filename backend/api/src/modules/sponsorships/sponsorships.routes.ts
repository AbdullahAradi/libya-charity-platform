import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './sponsorships.controller';
import { sponsorshipSchema } from './sponsorships.schema';

export const sponsorshipsRouter = Router();

sponsorshipsRouter.get('/public', controller.listPublicPrograms);
sponsorshipsRouter.get('/public/:id', controller.getPublicProgram);
sponsorshipsRouter.post('/', requireAuth, requireRoles(...controller.adminRoles), validate(sponsorshipSchema), controller.createProgram);
sponsorshipsRouter.patch('/:id', requireAuth, requireRoles(...controller.adminRoles), validate(sponsorshipSchema), controller.updateProgram);

import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './organizations.controller';
import { createOrganizationSchema, updateOrganizationSchema } from './organizations.schema';

export const organizationsRouter = Router();

organizationsRouter.get('/', controller.listOrganizations);
organizationsRouter.get('/:id', controller.getOrganizationById);
organizationsRouter.post('/', requireAuth, requireRoles(...controller.adminRoles), validate(createOrganizationSchema), controller.createOrganization);
organizationsRouter.patch('/:id', requireAuth, requireRoles(...controller.adminRoles), validate(updateOrganizationSchema), controller.updateOrganization);
organizationsRouter.patch('/:id/verify', requireAuth, requireRoles(...controller.adminRoles), controller.verifyOrganization);
organizationsRouter.patch('/:id/suspend', requireAuth, requireRoles(...controller.adminRoles), controller.suspendOrganization);

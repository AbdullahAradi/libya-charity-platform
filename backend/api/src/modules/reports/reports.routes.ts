import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './reports.controller';
import { createReportSchema } from './reports.schema';

export const reportsRouter = Router();

reportsRouter.get('/public', controller.listPublicReports);
reportsRouter.get('/public/:id', controller.getPublicReport);
reportsRouter.post('/', requireAuth, requireRoles(...controller.adminRoles), validate(createReportSchema), controller.createReport);
reportsRouter.patch('/:id/publish', requireAuth, requireRoles(...controller.adminRoles), controller.publishReport);

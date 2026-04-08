import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import * as controller from './audit.controller';

export const auditRouter = Router();

auditRouter.get('/', requireAuth, requireRoles(...controller.adminRoles), controller.listAuditLogs);

import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './cases.controller';
import { addCaseUpdateSchema, publishCaseSchema, reviewCaseSchema, submitCaseSchema } from './cases.schema';

export const casesRouter = Router();

casesRouter.get('/public', controller.listPublicCases);
casesRouter.get('/public/:id', controller.getPublicCaseDetail);
casesRouter.get('/:id/updates', controller.listCaseUpdates);
casesRouter.get('/:id/reports', controller.listPublicCaseReports);

casesRouter.post('/submit/family', requireAuth, requireRoles('FAMILY_APPLICANT', 'SUPER_ADMIN'), validate(submitCaseSchema), controller.submitFamilyCase);
casesRouter.post('/submit/ngo', requireAuth, requireRoles(...controller.ngoRoles), validate(submitCaseSchema), controller.submitNgoCase);

casesRouter.get('/review/pending', requireAuth, requireRoles(...controller.reviewerRoles), controller.listPendingCases);
casesRouter.post('/:id/review/approve', requireAuth, requireRoles(...controller.reviewerRoles), validate(reviewCaseSchema), controller.approveCase);
casesRouter.post('/:id/review/reject', requireAuth, requireRoles(...controller.reviewerRoles), validate(reviewCaseSchema), controller.rejectCase);
casesRouter.post('/:id/review/request-info', requireAuth, requireRoles(...controller.reviewerRoles), validate(reviewCaseSchema), controller.requestMoreInfoCase);

casesRouter.patch('/:id/admin/status', requireAuth, requireRoles(...controller.adminRoles), validate(publishCaseSchema), controller.publishCase);
casesRouter.post('/:id/updates', requireAuth, requireRoles(...controller.ngoRoles, ...controller.adminRoles), validate(addCaseUpdateSchema), controller.addCaseUpdate);

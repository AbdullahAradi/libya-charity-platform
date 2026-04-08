import { Router } from 'express';

import { requireAuth, requireRoles } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './campaigns.controller';
import { campaignSchema } from './campaigns.schema';

export const campaignsRouter = Router();

campaignsRouter.get('/public', controller.listPublicCampaigns);
campaignsRouter.get('/public/:id', controller.getPublicCampaign);
campaignsRouter.post('/', requireAuth, requireRoles(...controller.adminRoles), validate(campaignSchema), controller.createCampaign);
campaignsRouter.patch('/:id', requireAuth, requireRoles(...controller.adminRoles), validate(campaignSchema), controller.updateCampaign);
campaignsRouter.patch('/:id/activate', requireAuth, requireRoles(...controller.adminRoles), controller.activateCampaign);
campaignsRouter.patch('/:id/deactivate', requireAuth, requireRoles(...controller.adminRoles), controller.deactivateCampaign);

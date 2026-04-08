import { Router } from 'express';

import { requireAuth } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as controller from './donations.controller';
import { createDonationSchema, createRecurringSchema } from './donations.schema';

export const donationsRouter = Router();

donationsRouter.post('/', requireAuth, validate(createDonationSchema), controller.createDonation);
donationsRouter.get('/me', requireAuth, controller.listMyDonations);
donationsRouter.get('/:id/receipt', requireAuth, controller.getDonationReceipt);
donationsRouter.post('/recurring', requireAuth, validate(createRecurringSchema), controller.createRecurringDonation);
donationsRouter.get('/recurring/me', requireAuth, controller.listMyRecurringDonations);

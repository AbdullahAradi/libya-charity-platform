import cors from 'cors';
import express from 'express';

import { authRouter } from './modules/auth/auth.routes';
import { usersRouter } from './modules/users/users.routes';
import { organizationsRouter } from './modules/organizations/organizations.routes';
import { casesRouter } from './modules/cases/cases.routes';
import { campaignsRouter } from './modules/campaigns/campaigns.routes';
import { sponsorshipsRouter } from './modules/sponsorships/sponsorships.routes';
import { donationsRouter } from './modules/donations/donations.routes';
import { reportsRouter } from './modules/reports/reports.routes';
import { supportRouter } from './modules/support/support.routes';
import { adminRouter } from './modules/admin/admin.routes';
import { auditRouter } from './modules/audit/audit.routes';
import { errorHandler, notFoundHandler } from './middleware/error-handler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'libya-charity-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/organizations', organizationsRouter);
app.use('/api/cases', casesRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/sponsorships', sponsorshipsRouter);
app.use('/api/donations', donationsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/support', supportRouter);
app.use('/api/admin', adminRouter);
app.use('/api/audit', auditRouter);

app.use(notFoundHandler);
app.use(errorHandler);

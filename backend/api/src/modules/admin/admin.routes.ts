import { Router } from 'express';

export const adminRouter = Router();

adminRouter.get('/overview', (_req, res) => {
  res.json({ message: 'Admin module placeholder for future dashboard aggregations.' });
});

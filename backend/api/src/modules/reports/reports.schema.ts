import { z } from 'zod';

export const createReportSchema = z.object({
  body: z.object({
    caseId: z.string().optional(),
    campaignId: z.string().optional(),
    title: z.string().min(3),
    summary: z.string().min(10),
  }),
});

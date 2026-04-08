import { z } from 'zod';

export const campaignSchema = z.object({
  body: z.object({
    titleAr: z.string().min(3),
    titleEn: z.string().optional(),
    summaryAr: z.string().min(8),
    campaignType: z.string().min(2),
    targetAmount: z.number().positive(),
    organizationId: z.string().optional(),
  }),
});

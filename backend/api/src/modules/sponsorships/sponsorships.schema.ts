import { z } from 'zod';

export const sponsorshipSchema = z.object({
  body: z.object({
    titleAr: z.string().min(3),
    titleEn: z.string().optional(),
    descriptionAr: z.string().min(5),
    monthlyAmount: z.number().positive(),
    organizationId: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

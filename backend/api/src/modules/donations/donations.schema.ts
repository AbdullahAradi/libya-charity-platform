import { z } from 'zod';

export const createDonationSchema = z.object({
  body: z.object({
    caseId: z.string().optional(),
    campaignId: z.string().optional(),
    amount: z.number().positive(),
    paymentMethod: z.string().min(2),
    isAnonymous: z.boolean().optional(),
    dedicatedTo: z.string().optional(),
    status: z.enum(['PENDING', 'PAID', 'FAILED', 'CANCELLED']).default('PENDING'),
  }),
});

export const createRecurringSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    frequency: z.string().min(2),
    paymentMethod: z.string().min(2),
    status: z.enum(['PENDING', 'PAID', 'FAILED', 'CANCELLED']).default('PENDING'),
  }),
});

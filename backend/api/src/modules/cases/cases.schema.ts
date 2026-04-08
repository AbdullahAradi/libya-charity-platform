import { z } from 'zod';

export const submitCaseSchema = z.object({
  body: z.object({
    titleAr: z.string().min(3),
    summaryAr: z.string().min(10),
    city: z.string().min(2),
    area: z.string().optional(),
    caseType: z.string().min(2),
    zakatEligible: z.boolean().default(false),
    isUrgent: z.boolean().default(false),
    targetAmount: z.number().positive(),
    organizationId: z.string().optional(),
  }),
});

export const reviewCaseSchema = z.object({
  body: z.object({
    notes: z.string().optional(),
  }),
});

export const publishCaseSchema = z.object({
  body: z.object({
    status: z.enum(['PUBLISHED', 'UNPUBLISHED', 'ARCHIVED']),
  }),
});

export const addCaseUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    body: z.string().min(5),
  }),
});

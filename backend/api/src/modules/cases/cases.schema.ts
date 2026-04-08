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

export const createCaseAlertSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    message: z.string().min(10),
    channel: z.enum(['PUSH', 'EMAIL']),
    audienceType: z.enum([
      'ALL_OPTED_IN_DONORS',
      'PAST_DONORS',
      'DONORS_BY_INTEREST_CATEGORY',
      'DONORS_FOLLOWED_SIMILAR_CASES',
      'DONORS_CONTRIBUTED_SIMILAR_CASE_TYPES',
    ]),
    scheduledAt: z.string().datetime().optional(),
    estimatedRecipientCount: z.number().int().positive().optional(),
    reason: z.string().optional(),
    isEmergencyOverride: z.boolean().default(false),
  }),
});

export const sendCaseAlertSchema = z.object({
  body: z.object({
    reason: z.string().optional(),
  }),
});

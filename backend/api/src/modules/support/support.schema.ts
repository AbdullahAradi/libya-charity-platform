import { z } from 'zod';

export const createSupportRequestSchema = z.object({
  body: z.object({
    subject: z.string().min(3),
    message: z.string().min(10),
    category: z.string().min(2),
  }),
});

export const updateSupportStatusSchema = z.object({
  body: z.object({
    status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
  }),
});

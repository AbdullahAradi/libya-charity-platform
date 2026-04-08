import { z } from 'zod';

export const createOrganizationSchema = z.object({
  body: z.object({
    nameAr: z.string().min(2),
    nameEn: z.string().optional(),
    city: z.string().min(2),
    description: z.string().optional(),
  }),
});

export const updateOrganizationSchema = z.object({
  body: z.object({
    nameAr: z.string().min(2).optional(),
    nameEn: z.string().optional(),
    city: z.string().min(2).optional(),
    description: z.string().optional(),
  }),
});

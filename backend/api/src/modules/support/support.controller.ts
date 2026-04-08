import { UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';

export const createSupportRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.supportRequest.create({
    data: { ...req.body, userId: req.user!.id },
  });
  res.status(201).json(item);
});

export const listMySupportRequests = asyncHandler(async (req: AuthRequest, res: Response) => {
  const items = await prisma.supportRequest.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export const listAllSupportRequests = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const items = await prisma.supportRequest.findMany({ include: { user: { select: { id: true, fullName: true, email: true } } }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export const updateSupportRequestStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.supportRequest.update({
    where: { id: req.params.id },
    data: {
      status: req.body.status,
      handledById: req.user!.id,
      handledBy: req.user!.role,
    },
  });
  res.json(item);
});

export const supportRoles = [UserRole.SUPER_ADMIN, UserRole.SUPPORT_AGENT];

import { UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, fullName: true, email: true, phone: true, city: true, role: true, status: true, createdAt: true },
  });
  res.json(user);
});

export const updateMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: req.body,
    select: { id: true, fullName: true, email: true, phone: true, city: true, role: true },
  });
  res.json(user);
});

export const adminListUsers = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, fullName: true, email: true, role: true, status: true, city: true },
  });
  res.json(users);
});

export const adminRoles = [UserRole.SUPER_ADMIN];

import { UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { asyncHandler } from '../../utils/async-handler';

export const listAuditLogs = asyncHandler(async (_req, res: Response) => {
  const items = await prisma.auditLog.findMany({
    include: { actor: { select: { id: true, fullName: true, role: true } } },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  res.json(items);
});

export const adminRoles = [UserRole.SUPER_ADMIN];

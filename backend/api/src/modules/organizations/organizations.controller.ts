import { OrganizationStatus, UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';
import { createAuditLog } from '../../utils/audit';

export const listOrganizations = asyncHandler(async (_req, res: Response) => {
  const items = await prisma.organization.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export const getOrganizationById = asyncHandler(async (req, res: Response) => {
  const item = await prisma.organization.findUnique({ where: { id: req.params.id } });
  res.json(item);
});

export const createOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.organization.create({ data: req.body });
  await createAuditLog(req.user!.id, 'ORGANIZATION_CREATE', 'Organization', item.id);
  res.status(201).json(item);
});

export const updateOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.organization.update({ where: { id: req.params.id }, data: req.body });
  await createAuditLog(req.user!.id, 'ORGANIZATION_UPDATE', 'Organization', item.id);
  res.json(item);
});

export const verifyOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.organization.update({
    where: { id: req.params.id },
    data: { status: OrganizationStatus.VERIFIED, verifiedAt: new Date(), suspendedAt: null },
  });
  await createAuditLog(req.user!.id, 'ORGANIZATION_VERIFY', 'Organization', item.id);
  res.json(item);
});

export const suspendOrganization = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.organization.update({
    where: { id: req.params.id },
    data: { status: OrganizationStatus.SUSPENDED, suspendedAt: new Date() },
  });
  await createAuditLog(req.user!.id, 'ORGANIZATION_SUSPEND', 'Organization', item.id);
  res.json(item);
});

export const adminRoles = [UserRole.SUPER_ADMIN];

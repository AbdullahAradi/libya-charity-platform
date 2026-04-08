import { ReportStatus, UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';
import { createAuditLog } from '../../utils/audit';

export const listPublicReports = asyncHandler(async (_req, res: Response) => {
  const items = await prisma.caseReport.findMany({
    where: { status: ReportStatus.PUBLISHED },
    select: { id: true, title: true, summary: true, publishedAt: true, caseId: true, campaignId: true },
    orderBy: { publishedAt: 'desc' },
  });
  res.json(items);
});

export const getPublicReport = asyncHandler(async (req, res: Response) => {
  const item = await prisma.caseReport.findFirst({
    where: { id: req.params.id, status: ReportStatus.PUBLISHED },
  });
  res.json(item);
});

export const createReport = asyncHandler(async (req, res: Response) => {
  const item = await prisma.caseReport.create({ data: req.body });
  res.status(201).json(item);
});

export const publishReport = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.caseReport.update({
    where: { id: req.params.id },
    data: { status: ReportStatus.PUBLISHED, publishedAt: new Date() },
  });
  await createAuditLog(req.user!.id, 'REPORT_PUBLISH', 'CaseReport', item.id);
  res.json(item);
});

export const adminRoles = [UserRole.SUPER_ADMIN, UserRole.NGO_MANAGER];

import { CaseStatus, Prisma, UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';
import { createAuditLog } from '../../utils/audit';

const publicCaseSelect = {
  id: true,
  titleAr: true,
  titleEn: true,
  summaryAr: true,
  city: true,
  area: true,
  caseType: true,
  zakatEligible: true,
  isUrgent: true,
  targetAmount: true,
  raisedAmount: true,
  status: true,
  publishedAt: true,
  organization: { select: { id: true, nameAr: true, city: true } },
};

export const listPublicCases = asyncHandler(async (req, res: Response) => {
  const where: Prisma.CaseWhereInput = { status: CaseStatus.PUBLISHED };

  if (req.query.city) where.city = String(req.query.city);
  if (req.query.caseType) where.caseType = String(req.query.caseType);
  if (req.query.zakatEligible) where.zakatEligible = req.query.zakatEligible === 'true';
  if (req.query.urgent) where.isUrgent = req.query.urgent === 'true';

  const items = await prisma.case.findMany({ where, select: publicCaseSelect, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export const getPublicCaseDetail = asyncHandler(async (req, res: Response) => {
  const item = await prisma.case.findFirst({
    where: { id: req.params.id, status: CaseStatus.PUBLISHED },
    select: { ...publicCaseSelect, updates: true },
  });
  res.json(item);
});

export const submitFamilyCase = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.case.create({
    data: {
      ...req.body,
      createdById: req.user!.id,
      submittedByType: 'FAMILY',
      status: CaseStatus.PENDING_REVIEW,
    },
  });
  res.status(201).json(item);
});

export const submitNgoCase = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.case.create({
    data: {
      ...req.body,
      createdById: req.user!.id,
      submittedByType: 'NGO',
      status: CaseStatus.PENDING_REVIEW,
    },
  });
  res.status(201).json(item);
});

export const listPendingCases = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const items = await prisma.case.findMany({
    where: { status: { in: [CaseStatus.PENDING_REVIEW, CaseStatus.NEEDS_MORE_INFO] } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(items);
});

export const approveCase = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.case.update({
    where: { id: req.params.id },
    data: { status: CaseStatus.APPROVED, reviewedById: req.user!.id, reviewNotes: req.body.notes ?? null },
  });
  await createAuditLog(req.user!.id, 'CASE_APPROVE', 'Case', item.id, { notes: req.body.notes });
  res.json(item);
});

export const rejectCase = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.case.update({
    where: { id: req.params.id },
    data: { status: CaseStatus.REJECTED, reviewedById: req.user!.id, reviewNotes: req.body.notes ?? null },
  });
  await createAuditLog(req.user!.id, 'CASE_REJECT', 'Case', item.id, { notes: req.body.notes });
  res.json(item);
});

export const requestMoreInfoCase = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.case.update({
    where: { id: req.params.id },
    data: { status: CaseStatus.NEEDS_MORE_INFO, reviewedById: req.user!.id, reviewNotes: req.body.notes ?? null },
  });
  await createAuditLog(req.user!.id, 'CASE_REQUEST_INFO', 'Case', item.id, { notes: req.body.notes });
  res.json(item);
});

export const publishCase = asyncHandler(async (req: AuthRequest, res: Response) => {
  const requested = req.body.status as CaseStatus;
  const item = await prisma.case.update({
    where: { id: req.params.id },
    data: {
      status: requested,
      publishedAt: requested === CaseStatus.PUBLISHED ? new Date() : null,
    },
  });
  await createAuditLog(req.user!.id, `CASE_${requested}`, 'Case', item.id);
  res.json(item);
});

export const addCaseUpdate = asyncHandler(async (req: AuthRequest, res: Response) => {
  const update = await prisma.caseUpdate.create({
    data: {
      caseId: req.params.id,
      title: req.body.title,
      body: req.body.body,
      createdById: req.user!.id,
    },
  });
  res.status(201).json(update);
});

export const listCaseUpdates = asyncHandler(async (req, res: Response) => {
  const updates = await prisma.caseUpdate.findMany({ where: { caseId: req.params.id }, orderBy: { createdAt: 'desc' } });
  res.json(updates);
});

export const listPublicCaseReports = asyncHandler(async (req, res: Response) => {
  const reports = await prisma.caseReport.findMany({
    where: { caseId: req.params.id, status: 'PUBLISHED' },
    select: { id: true, title: true, summary: true, publishedAt: true },
    orderBy: { publishedAt: 'desc' },
  });
  res.json(reports);
});

export const reviewerRoles = [UserRole.ZAKAT_REVIEWER, UserRole.FINANCE_REVIEWER, UserRole.SUPER_ADMIN];
export const adminRoles = [UserRole.SUPER_ADMIN];
export const ngoRoles = [UserRole.NGO_USER, UserRole.NGO_MANAGER, UserRole.SUPER_ADMIN];

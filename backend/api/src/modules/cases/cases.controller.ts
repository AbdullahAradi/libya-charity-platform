import { AlertDeliveryStatus, AlertStatus, CaseStatus, Prisma, UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';
import { AppError } from '../../utils/app-error';
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
  zakatRaisedAmount: true,
  nonZakatRaisedAmount: true,
  status: true,
  publishedAt: true,
  organization: { select: { id: true, nameAr: true, city: true } },
};

const MAX_PROMOTIONAL_ALERTS = 2;
const ROLLING_WINDOW_DAYS = 3;

const buildMockAudienceUserIds = async (caseId: string, audienceType: string) => {
  // Placeholder audience resolver. Future iteration should use donor interests/saved cases/preferences graph.
  const baseDonors = await prisma.user.findMany({
    where: { role: UserRole.DONOR, status: 'ACTIVE' },
    select: { id: true },
    take: audienceType === 'ALL_OPTED_IN_DONORS' ? 200 : 50,
  });

  if (audienceType === 'DONORS_FOLLOWED_SIMILAR_CASES') {
    return baseDonors.slice(0, 25).map((donor) => donor.id);
  }

  if (audienceType === 'DONORS_CONTRIBUTED_SIMILAR_CASE_TYPES') {
    const donorsBySimilarCaseType = await prisma.donation.findMany({
      where: { case: { id: caseId }, status: 'PAID' },
      select: { userId: true },
      distinct: ['userId'],
      take: 40,
    });
    return donorsBySimilarCaseType.map((donor) => donor.userId);
  }

  return baseDonors.map((donor) => donor.id);
};

const assertRateLimitForUsers = async (userIds: string[], isEmergencyOverride: boolean) => {
  if (isEmergencyOverride || userIds.length === 0) return [];

  const windowStart = new Date(Date.now() - ROLLING_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const recentPromotionalCounts = await prisma.alertRecipientLog.groupBy({
    by: ['userId'],
    where: {
      userId: { in: userIds },
      attemptedAt: { gte: windowStart },
      deliveryStatus: { in: [AlertDeliveryStatus.MOCK_SENT, AlertDeliveryStatus.PENDING] },
      alert: {
        isEmergencyOverride: false,
        reason: { not: 'TRANSACTIONAL' },
      },
    },
    _count: { userId: true },
  });

  const blockedUserIds = recentPromotionalCounts
    .filter((entry) => entry._count.userId >= MAX_PROMOTIONAL_ALERTS)
    .map((entry) => entry.userId);

  return blockedUserIds;
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

export const createCaseAlertDraft = asyncHandler(async (req: AuthRequest, res: Response) => {
  const caseExists = await prisma.case.findUnique({ where: { id: req.params.id }, select: { id: true } });
  if (!caseExists) throw new AppError('Case not found', 404);

  const audienceUserIds = await buildMockAudienceUserIds(req.params.id, req.body.audienceType);
  const alert = await prisma.caseAlert.create({
    data: {
      caseId: req.params.id,
      createdByUserId: req.user!.id,
      title: req.body.title,
      message: req.body.message,
      channel: req.body.channel,
      audienceType: req.body.audienceType,
      status: req.body.scheduledAt ? AlertStatus.SCHEDULED : AlertStatus.DRAFT,
      scheduledAt: req.body.scheduledAt ? new Date(req.body.scheduledAt) : null,
      estimatedRecipientCount: req.body.estimatedRecipientCount ?? audienceUserIds.length,
      reason: req.body.reason ?? null,
      isEmergencyOverride: Boolean(req.body.isEmergencyOverride),
    },
  });

  await createAuditLog(req.user!.id, 'CASE_ALERT_DRAFT_CREATED', 'CaseAlert', alert.id, {
    caseId: req.params.id,
    channel: alert.channel,
    audienceType: alert.audienceType,
    estimatedRecipientCount: alert.estimatedRecipientCount,
  });

  res.status(201).json(alert);
});

export const listCaseAlerts = asyncHandler(async (req, res: Response) => {
  const alerts = await prisma.caseAlert.findMany({
    where: { caseId: req.params.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      message: true,
      channel: true,
      audienceType: true,
      status: true,
      sentAt: true,
      scheduledAt: true,
      estimatedRecipientCount: true,
      actualRecipientCount: true,
      reason: true,
      isEmergencyOverride: true,
      createdAt: true,
      createdByUser: { select: { id: true, fullName: true } },
    },
  });

  res.json(alerts);
});

export const sendCaseAlert = asyncHandler(async (req: AuthRequest, res: Response) => {
  const alert = await prisma.caseAlert.findFirst({ where: { id: req.params.alertId, caseId: req.params.id } });
  if (!alert) throw new AppError('Case alert not found', 404);
  if (alert.status === AlertStatus.SENT) throw new AppError('Alert already sent', 400);

  const audienceUserIds = await buildMockAudienceUserIds(req.params.id, alert.audienceType);
  const blockedUserIds = await assertRateLimitForUsers(audienceUserIds, alert.isEmergencyOverride);
  const allowedUserIds = audienceUserIds.filter((userId) => !blockedUserIds.includes(userId));

  await prisma.$transaction(async (tx) => {
    if (allowedUserIds.length > 0) {
      await tx.alertRecipientLog.createMany({
        data: allowedUserIds.map((userId) => ({
          alertId: alert.id,
          userId,
          channel: alert.channel,
          deliveryStatus: AlertDeliveryStatus.MOCK_SENT,
        })),
      });
    }

    if (blockedUserIds.length > 0) {
      await tx.alertRecipientLog.createMany({
        data: blockedUserIds.map((userId) => ({
          alertId: alert.id,
          userId,
          channel: alert.channel,
          deliveryStatus: AlertDeliveryStatus.SKIPPED_RATE_LIMIT,
        })),
      });
    }

    await tx.caseAlert.update({
      where: { id: alert.id },
      data: {
        status: AlertStatus.SENT,
        sentAt: new Date(),
        actualRecipientCount: allowedUserIds.length,
        reason: req.body.reason ?? alert.reason,
      },
    });
  });

  // TODO: integrate external providers (FCM/APNs/email service) once delivery infrastructure is approved.
  await createAuditLog(req.user!.id, 'CASE_ALERT_SENT', 'CaseAlert', alert.id, {
    caseId: req.params.id,
    attemptedAudienceCount: audienceUserIds.length,
    sentCount: allowedUserIds.length,
    blockedByRateLimitCount: blockedUserIds.length,
    maxPromotionalPerUser: MAX_PROMOTIONAL_ALERTS,
    rollingWindowDays: ROLLING_WINDOW_DAYS,
    emergencyOverrideUsed: alert.isEmergencyOverride,
  });

  res.json({
    id: alert.id,
    status: AlertStatus.SENT,
    attemptedAudienceCount: audienceUserIds.length,
    sentCount: allowedUserIds.length,
    blockedByRateLimitCount: blockedUserIds.length,
    delivery: 'mocked',
  });
});

export const reviewerRoles = [UserRole.ZAKAT_REVIEWER, UserRole.FINANCE_REVIEWER, UserRole.SUPER_ADMIN];
export const adminRoles = [UserRole.SUPER_ADMIN];
export const ngoRoles = [UserRole.NGO_USER, UserRole.NGO_MANAGER, UserRole.SUPER_ADMIN];

import { DonationStatus, UserRole } from '@prisma/client';
import { Router } from 'express';

import { prisma } from '../../lib/prisma';
import { requireAuth, requireRoles } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';
import { getPlatformDonationTotals } from '../donations/donation-totals';

export const adminRouter = Router();

adminRouter.get('/overview', requireAuth, requireRoles(UserRole.SUPER_ADMIN, UserRole.NGO_MANAGER), asyncHandler(async (_req, res) => {
  const [platformTotals, activeCases, liveCampaigns] = await Promise.all([
    getPlatformDonationTotals(prisma),
    prisma.case.count({ where: { status: 'PUBLISHED' } }),
    prisma.campaign.count({ where: { status: 'ACTIVE' } }),
  ]);

  res.json({
    message: 'Admin operational overview',
    activeCases,
    liveCampaigns,
    platformTotals,
  });
}));

adminRouter.get('/funding-breakdown', requireAuth, requireRoles(UserRole.SUPER_ADMIN, UserRole.NGO_MANAGER), asyncHandler(async (_req, res) => {
  const [caseBreakdown, campaignBreakdown, platformTotals] = await Promise.all([
    prisma.case.findMany({
      select: {
        id: true,
        titleAr: true,
        zakatEligible: true,
        zakatRaisedAmount: true,
        nonZakatRaisedAmount: true,
        raisedAmount: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 25,
    }),
    prisma.campaign.findMany({
      select: {
        id: true,
        titleAr: true,
        zakatEligible: true,
        zakatRaisedAmount: true,
        nonZakatRaisedAmount: true,
        raisedAmount: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 25,
    }),
    getPlatformDonationTotals(prisma),
  ]);

  res.json({
    platformTotals,
    cases: caseBreakdown,
    campaigns: campaignBreakdown,
    paidDonationCount: await prisma.donation.count({ where: { status: DonationStatus.PAID } }),
  });
}));

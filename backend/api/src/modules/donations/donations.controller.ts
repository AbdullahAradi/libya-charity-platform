import { DonationStatus } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';

const buildReceiptReference = () => `LC-${Date.now()}`;

const resolveCountsAsZakat = (donationType: string, countsAsZakat?: boolean) => {
  if (typeof countsAsZakat === 'boolean') return countsAsZakat;
  return donationType === 'ZAKAT';
};

const syncLinkedFundingCounters = async (caseId?: string, campaignId?: string) => {
  if (caseId) {
    const [zakat, nonZakat] = await Promise.all([
      prisma.donation.aggregate({
        where: { caseId, status: DonationStatus.PAID, countsAsZakat: true },
        _sum: { amount: true },
      }),
      prisma.donation.aggregate({
        where: { caseId, status: DonationStatus.PAID, countsAsZakat: false },
        _sum: { amount: true },
      }),
    ]);

    const zakatRaisedAmount = zakat._sum.amount ?? 0;
    const nonZakatRaisedAmount = nonZakat._sum.amount ?? 0;

    await prisma.case.update({
      where: { id: caseId },
      data: {
        zakatRaisedAmount,
        nonZakatRaisedAmount,
        raisedAmount: Number(zakatRaisedAmount) + Number(nonZakatRaisedAmount),
      },
    });
  }

  if (campaignId) {
    const [zakat, nonZakat] = await Promise.all([
      prisma.donation.aggregate({
        where: { campaignId, status: DonationStatus.PAID, countsAsZakat: true },
        _sum: { amount: true },
      }),
      prisma.donation.aggregate({
        where: { campaignId, status: DonationStatus.PAID, countsAsZakat: false },
        _sum: { amount: true },
      }),
    ]);

    const zakatRaisedAmount = zakat._sum.amount ?? 0;
    const nonZakatRaisedAmount = nonZakat._sum.amount ?? 0;

    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        zakatRaisedAmount,
        nonZakatRaisedAmount,
        raisedAmount: Number(zakatRaisedAmount) + Number(nonZakatRaisedAmount),
      },
    });
  }
};

export const createDonation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const donationType = req.body.donationType ?? 'GENERAL';
  const countsAsZakat = resolveCountsAsZakat(donationType, req.body.countsAsZakat);

  const donation = await prisma.donation.create({
    data: {
      ...req.body,
      donationType,
      countsAsZakat,
      userId: req.user!.id,
    },
  });

  const receipt = await prisma.receipt.create({
    data: {
      donationId: donation.id,
      reference: buildReceiptReference(),
    },
  });

  if (donation.status === DonationStatus.PAID) {
    await syncLinkedFundingCounters(donation.caseId ?? undefined, donation.campaignId ?? undefined);
  }

  // TODO: hook into payment webhook lifecycle and asynchronous reconciliation.
  res.status(201).json({ donation, receipt });
});

export const listMyDonations = asyncHandler(async (req: AuthRequest, res: Response) => {
  const items = await prisma.donation.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export const getDonationReceipt = asyncHandler(async (req: AuthRequest, res: Response) => {
  const receipt = await prisma.receipt.findFirst({
    where: { donationId: req.params.id, donation: { userId: req.user!.id } },
    include: { donation: true },
  });
  res.json(receipt);
});

export const createRecurringDonation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.recurringDonation.create({
    data: { ...req.body, userId: req.user!.id },
  });

  // TODO: connect to recurring scheduler/payment provider later.
  res.status(201).json(item);
});

export const listMyRecurringDonations = asyncHandler(async (req: AuthRequest, res: Response) => {
  const items = await prisma.recurringDonation.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';

const buildReceiptReference = () => `LC-${Date.now()}`;

export const createDonation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const donation = await prisma.donation.create({
    data: { ...req.body, userId: req.user!.id },
  });

  const receipt = await prisma.receipt.create({
    data: {
      donationId: donation.id,
      reference: buildReceiptReference(),
    },
  });

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

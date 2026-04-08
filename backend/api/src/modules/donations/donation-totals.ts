import { DonationStatus, PrismaClient } from '@prisma/client';

export const getPlatformDonationTotals = async (prisma: PrismaClient) => {
  const [zakat, nonZakat] = await Promise.all([
    prisma.donation.aggregate({ where: { status: DonationStatus.PAID, countsAsZakat: true }, _sum: { amount: true } }),
    prisma.donation.aggregate({ where: { status: DonationStatus.PAID, countsAsZakat: false }, _sum: { amount: true } }),
  ]);

  return {
    zakatRaisedAmount: Number(zakat._sum.amount ?? 0),
    nonZakatRaisedAmount: Number(nonZakat._sum.amount ?? 0),
    totalRaisedAmount: Number(zakat._sum.amount ?? 0) + Number(nonZakat._sum.amount ?? 0),
  };
};

import { CampaignStatus, CaseStatus, ReportStatus, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.receipt.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.recurringDonation.deleteMany();
  await prisma.caseReport.deleteMany();
  await prisma.caseUpdate.deleteMany();
  await prisma.caseDocument.deleteMany();
  await prisma.case.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.sponsorshipProgram.deleteMany();
  await prisma.supportRequest.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  const passwordHash = await bcrypt.hash('Password123!', 10);

  const org1 = await prisma.organization.create({
    data: { nameAr: 'جمعية الرحمة بنغازي', nameEn: 'Rahma Benghazi', city: 'بنغازي', status: 'VERIFIED' },
  });
  const org2 = await prisma.organization.create({
    data: { nameAr: 'مؤسسة عطاء طرابلس', nameEn: 'Ataa Tripoli', city: 'طرابلس', status: 'VERIFIED' },
  });

  const admin = await prisma.user.create({
    data: { fullName: 'مدير النظام', email: 'admin@libyacharity.ly', passwordHash, role: UserRole.SUPER_ADMIN, city: 'طرابلس' },
  });
  const reviewer = await prisma.user.create({
    data: { fullName: 'مراجع الزكاة', email: 'reviewer@libyacharity.ly', passwordHash, role: UserRole.ZAKAT_REVIEWER, city: 'بنغازي' },
  });
  const donor = await prisma.user.create({
    data: { fullName: 'أحمد سالم', email: 'donor@libyacharity.ly', passwordHash, role: UserRole.DONOR, city: 'مصراتة' },
  });

  const case1 = await prisma.case.create({
    data: {
      titleAr: 'علاج طفل مصاب بمرض قلبي',
      summaryAr: 'حالة إنسانية عاجلة لطفل يحتاج تدخلاً جراحياً خلال فترة قريبة.',
      city: 'طرابلس',
      area: 'عين زارة',
      caseType: 'طبي',
      zakatEligible: true,
      isUrgent: true,
      targetAmount: 42000,
      raisedAmount: 31000,
      status: CaseStatus.PUBLISHED,
      submittedByType: 'NGO',
      organizationId: org2.id,
      createdById: admin.id,
      reviewedById: reviewer.id,
      publishedAt: new Date(),
    },
  });

  await prisma.case.create({
    data: {
      titleAr: 'ترميم منزل أسرة نازحة',
      summaryAr: 'الأسرة بحاجة لترميم عاجل بعد أضرار السيول.',
      city: 'درنة',
      caseType: 'سكن',
      zakatEligible: false,
      isUrgent: true,
      targetAmount: 28000,
      raisedAmount: 14000,
      status: CaseStatus.PENDING_REVIEW,
      submittedByType: 'FAMILY',
      createdById: donor.id,
    },
  });

  const campaign = await prisma.campaign.create({
    data: {
      titleAr: 'حملة إفطار صائم ليبيا',
      summaryAr: 'توفير سلال غذائية ووجبات يومية للأسر الأشد احتياجاً.',
      campaignType: 'رمضان',
      targetAmount: 150000,
      raisedAmount: 99000,
      status: CampaignStatus.ACTIVE,
      organizationId: org1.id,
    },
  });

  await prisma.sponsorshipProgram.createMany({
    data: [
      { titleAr: 'كفالة أسرة', descriptionAr: 'دعم شهري للأسر محدودة الدخل.', monthlyAmount: 450, organizationId: org1.id },
      { titleAr: 'كفالة يتيم', descriptionAr: 'رعاية تعليمية وصحية لليتيم.', monthlyAmount: 300, organizationId: org2.id },
    ],
  });

  await prisma.caseReport.create({
    data: {
      caseId: case1.id,
      title: 'تقرير تحديث حالة العلاج',
      summary: 'تم إتمام الفحوصات الأولية وتحويل الدفعة الأولى للمستشفى.',
      status: ReportStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  await prisma.caseReport.create({
    data: {
      campaignId: campaign.id,
      title: 'تقرير حملة إفطار صائم',
      summary: 'تم توزيع 1200 سلة غذائية في عدة مدن ليبية.',
      status: ReportStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const donation = await prisma.donation.create({
    data: { userId: donor.id, caseId: case1.id, amount: 200, paymentMethod: 'بطاقة دولية', status: 'PAID' },
  });

  await prisma.receipt.create({ data: { donationId: donation.id, reference: 'LC-SEED-0001' } });

  console.log('Seed complete');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

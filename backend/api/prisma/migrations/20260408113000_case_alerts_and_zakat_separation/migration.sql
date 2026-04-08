-- Create enums for donation categorization and alert architecture.
CREATE TYPE "DonationType" AS ENUM ('ZAKAT', 'SADAQAH', 'GENERAL', 'SPONSORSHIP', 'CAMPAIGN');
CREATE TYPE "AlertChannel" AS ENUM ('PUSH', 'EMAIL');
CREATE TYPE "AlertAudienceType" AS ENUM ('ALL_OPTED_IN_DONORS', 'PAST_DONORS', 'DONORS_BY_INTEREST_CATEGORY', 'DONORS_FOLLOWED_SIMILAR_CASES', 'DONORS_CONTRIBUTED_SIMILAR_CASE_TYPES');
CREATE TYPE "AlertStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'SENT', 'CANCELLED');
CREATE TYPE "AlertDeliveryStatus" AS ENUM ('PENDING', 'SKIPPED_RATE_LIMIT', 'MOCK_SENT', 'FAILED');

ALTER TABLE "Case"
  ADD COLUMN "zakatRaisedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  ADD COLUMN "nonZakatRaisedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0;

ALTER TABLE "Campaign"
  ADD COLUMN "zakatEligible" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "zakatRaisedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  ADD COLUMN "nonZakatRaisedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0;

ALTER TABLE "Donation"
  ADD COLUMN "donationType" "DonationType" NOT NULL DEFAULT 'GENERAL',
  ADD COLUMN "countsAsZakat" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE "CaseAlert" (
  "id" TEXT NOT NULL,
  "caseId" TEXT NOT NULL,
  "createdByUserId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "channel" "AlertChannel" NOT NULL,
  "audienceType" "AlertAudienceType" NOT NULL,
  "status" "AlertStatus" NOT NULL DEFAULT 'DRAFT',
  "scheduledAt" TIMESTAMP(3),
  "sentAt" TIMESTAMP(3),
  "estimatedRecipientCount" INTEGER,
  "actualRecipientCount" INTEGER,
  "reason" TEXT,
  "isEmergencyOverride" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CaseAlert_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AlertRecipientLog" (
  "id" TEXT NOT NULL,
  "alertId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "channel" "AlertChannel" NOT NULL,
  "deliveryStatus" "AlertDeliveryStatus" NOT NULL DEFAULT 'PENDING',
  "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AlertRecipientLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DonorNotificationPreference" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "pushOptIn" BOOLEAN NOT NULL DEFAULT true,
  "emailOptIn" BOOLEAN NOT NULL DEFAULT true,
  "interestedCaseCategories" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "emergencyOverrideAllowed" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "DonorNotificationPreference_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "DonorNotificationPreference_userId_key" ON "DonorNotificationPreference"("userId");
CREATE INDEX "CaseAlert_caseId_createdAt_idx" ON "CaseAlert"("caseId", "createdAt");
CREATE INDEX "CaseAlert_status_idx" ON "CaseAlert"("status");
CREATE INDEX "AlertRecipientLog_alertId_idx" ON "AlertRecipientLog"("alertId");
CREATE INDEX "AlertRecipientLog_userId_attemptedAt_idx" ON "AlertRecipientLog"("userId", "attemptedAt");

ALTER TABLE "CaseAlert"
  ADD CONSTRAINT "CaseAlert_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "CaseAlert_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "AlertRecipientLog"
  ADD CONSTRAINT "AlertRecipientLog_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "CaseAlert"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "AlertRecipientLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "DonorNotificationPreference"
  ADD CONSTRAINT "DonorNotificationPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

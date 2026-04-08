export type DashboardSummary = {
  totalDonations: number;
  activeCases: number;
  pendingReviews: number;
  liveCampaigns: number;
  supportRequests: number;
  platformZakatTotal: number;
  platformNonZakatTotal: number;
};

export type CaseAlertAudience =
  | 'ALL_OPTED_IN_DONORS'
  | 'PAST_DONORS'
  | 'DONORS_BY_INTEREST_CATEGORY'
  | 'DONORS_FOLLOWED_SIMILAR_CASES'
  | 'DONORS_CONTRIBUTED_SIMILAR_CASE_TYPES';

export type CaseAlertChannel = 'PUSH' | 'EMAIL';

export type CaseAlert = {
  id: string;
  title: string;
  message: string;
  channel: CaseAlertChannel;
  audienceType: CaseAlertAudience;
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'CANCELLED';
  estimatedRecipientCount?: number;
  actualRecipientCount?: number;
  sentAt?: string;
  createdAt: string;
  reason?: string;
  isEmergencyOverride: boolean;
};

export type CaseItem = {
  id: string;
  title: string;
  applicant: string;
  source: 'FAMILY' | 'NGO' | 'INTERNAL';
  city: string;
  organization: string;
  caseType: string;
  targetAmount: number;
  raisedAmount: number;
  zakatRaisedAmount: number;
  nonZakatRaisedAmount: number;
  zakatEligible: boolean;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  publicationStatus: 'PUBLISHED' | 'UNPUBLISHED' | 'ARCHIVED';
  fundingStatus: 'UNDER_FUNDED' | 'FUNDED';
  urgent: boolean;
  updatedAt: string;
  reviewer: string;
  notes: string;
  alerts: CaseAlert[];
};

export type Organization = {
  id: string;
  name: string;
  city: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'SUSPENDED';
  isActive: boolean;
  casesCount: number;
  campaignsCount: number;
};

export type Donation = {
  id: string;
  donor: string;
  amount: number;
  currency: string;
  type: 'ONE_TIME' | 'RECURRING';
  donationType: 'ZAKAT' | 'SADAQAH' | 'GENERAL' | 'SPONSORSHIP' | 'CAMPAIGN';
  countsAsZakat: boolean;
  linkedTo: string;
  linkedToZakatTotal?: number;
  linkedToNonZakatTotal?: number;
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  receiptNumber: string;
  createdAt: string;
};

export type Report = {
  id: string;
  title: string;
  linkedTo: string;
  author: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string;
};

export type SupportRequest = {
  id: string;
  subject: string;
  category: string;
  source: string;
  user: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  assignedTo: string;
  createdAt: string;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'SUSPENDED';
};

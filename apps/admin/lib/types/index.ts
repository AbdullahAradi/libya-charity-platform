export type DashboardSummary = {
  totalDonations: number;
  activeCases: number;
  pendingReviews: number;
  liveCampaigns: number;
  supportRequests: number;
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
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  publicationStatus: 'PUBLISHED' | 'UNPUBLISHED' | 'ARCHIVED';
  fundingStatus: 'UNDER_FUNDED' | 'FUNDED';
  urgent: boolean;
  updatedAt: string;
  reviewer: string;
  notes: string;
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
  linkedTo: string;
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

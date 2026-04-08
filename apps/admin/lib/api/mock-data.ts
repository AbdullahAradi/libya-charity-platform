import {
  AuditLog,
  CaseItem,
  DashboardSummary,
  Donation,
  Organization,
  Report,
  SupportRequest,
  User,
} from '../types';

const summary: DashboardSummary = {
  totalDonations: 2843000,
  activeCases: 128,
  pendingReviews: 37,
  liveCampaigns: 9,
  supportRequests: 24,
};

const cases: CaseItem[] = [
  {
    id: 'case-1',
    title: 'Cardiac surgery for child in Tripoli',
    applicant: 'Family Representative',
    source: 'FAMILY',
    city: 'Tripoli',
    organization: 'Ataa Tripoli',
    caseType: 'Medical',
    targetAmount: 42000,
    raisedAmount: 31000,
    verificationStatus: 'PENDING',
    publicationStatus: 'UNPUBLISHED',
    fundingStatus: 'UNDER_FUNDED',
    urgent: true,
    updatedAt: '2026-04-06',
    reviewer: 'Zakat Reviewer Team',
    notes: 'Awaiting supporting medical documents.',
  },
  {
    id: 'case-2',
    title: 'Home rehabilitation for displaced family',
    applicant: 'NGO Intake',
    source: 'NGO',
    city: 'Derna',
    organization: 'Rahma Benghazi',
    caseType: 'Housing',
    targetAmount: 28000,
    raisedAmount: 23000,
    verificationStatus: 'APPROVED',
    publicationStatus: 'PUBLISHED',
    fundingStatus: 'UNDER_FUNDED',
    urgent: true,
    updatedAt: '2026-04-01',
    reviewer: 'Finance Reviewer Team',
    notes: 'Can be published immediately.',
  },
];

const organizations: Organization[] = [
  { id: 'org-1', name: 'Rahma Benghazi', city: 'Benghazi', verificationStatus: 'VERIFIED', isActive: true, casesCount: 45, campaignsCount: 5 },
  { id: 'org-2', name: 'Ataa Tripoli', city: 'Tripoli', verificationStatus: 'VERIFIED', isActive: true, casesCount: 37, campaignsCount: 3 },
  { id: 'org-3', name: 'Noor Sabha', city: 'Sabha', verificationStatus: 'PENDING', isActive: true, casesCount: 8, campaignsCount: 1 },
];

const donations: Donation[] = [
  { id: 'don-1', donor: 'Ahmed Salem', amount: 200, currency: 'LYD', type: 'ONE_TIME', linkedTo: 'case-2', paymentMethod: 'Card', paymentStatus: 'PAID', receiptNumber: 'LC-2026-00120', createdAt: '2026-04-04' },
  { id: 'don-2', donor: 'Mariam Ali', amount: 120, currency: 'LYD', type: 'RECURRING', linkedTo: 'Campaign Ramadan', paymentMethod: 'LY Pay', paymentStatus: 'PENDING', receiptNumber: 'LC-2026-00121', createdAt: '2026-04-05' },
];

const reports: Report[] = [
  { id: 'rep-1', title: 'Monthly food distribution report', linkedTo: 'Campaign Ramadan', author: 'Operations Unit', status: 'PUBLISHED', publishedAt: '2026-04-01' },
  { id: 'rep-2', title: 'Medical case follow-up report', linkedTo: 'case-2', author: 'Field Team', status: 'DRAFT' },
];

const support: SupportRequest[] = [
  { id: 'sup-1', subject: 'Receipt not visible', category: 'Receipts', source: 'Mobile App', user: 'Huda Omar', status: 'OPEN', assignedTo: 'Support Team A', createdAt: '2026-04-06' },
  { id: 'sup-2', subject: 'Case update clarification', category: 'Cases', source: 'Web', user: 'Khaled Musa', status: 'IN_PROGRESS', assignedTo: 'Support Team B', createdAt: '2026-04-05' },
];

const audit: AuditLog[] = [
  { id: 'aud-1', actor: 'Admin User', action: 'CASE_APPROVED', entityType: 'Case', entityId: 'case-2', timestamp: '2026-04-04T09:00:00Z' },
  { id: 'aud-2', actor: 'Support Agent', action: 'SUPPORT_STATUS_UPDATED', entityType: 'SupportRequest', entityId: 'sup-1', timestamp: '2026-04-06T12:40:00Z' },
];

const users: User[] = [
  { id: 'usr-1', name: 'Admin User', email: 'admin@libyacharity.ly', role: 'SUPER_ADMIN', status: 'ACTIVE' },
  { id: 'usr-2', name: 'Zakat Reviewer', email: 'reviewer@libyacharity.ly', role: 'ZAKAT_REVIEWER', status: 'ACTIVE' },
  { id: 'usr-3', name: 'Support Agent', email: 'support@libyacharity.ly', role: 'SUPPORT_AGENT', status: 'ACTIVE' },
];

export const mockData = { summary, cases, organizations, donations, reports, support, audit, users };

import { endpoints } from './endpoints';
import {
  AuditLog,
  CaseAlert,
  CaseItem,
  DashboardSummary,
  Donation,
  Organization,
  Report,
  SupportRequest,
  User,
} from '../types';
import { mockData } from './mock-data';

export const apiClient = {
  // TODO: replace mocked return values with real fetch calls to backend/api.
  getDashboardSummary: async (): Promise<DashboardSummary> => mockData.summary,
  getCases: async (): Promise<CaseItem[]> => mockData.cases,
  getCaseById: async (id: string): Promise<CaseItem | undefined> =>
    mockData.cases.find((item) => item.id === id),
  getCaseAlerts: async (caseId: string): Promise<CaseAlert[]> =>
    mockData.cases.find((item) => item.id === caseId)?.alerts ?? [],
  getOrganizations: async (): Promise<Organization[]> => mockData.organizations,
  getDonations: async (): Promise<Donation[]> => mockData.donations,
  getReports: async (): Promise<Report[]> => mockData.reports,
  getSupportRequests: async (): Promise<SupportRequest[]> => mockData.support,
  getAuditLogs: async (): Promise<AuditLog[]> => mockData.audit,
  getUsers: async (): Promise<User[]> => mockData.users,
  endpoints,
};

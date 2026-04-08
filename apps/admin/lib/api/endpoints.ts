export const endpoints = {
  dashboardSummary: '/dashboard/summary',
  cases: '/cases',
  caseAlerts: (caseId: string) => `/cases/${caseId}/alerts`,
  organizations: '/organizations',
  donations: '/donations',
  fundingBreakdown: '/admin/funding-breakdown',
  reports: '/reports',
  support: '/support',
  audit: '/audit',
  users: '/users',
};

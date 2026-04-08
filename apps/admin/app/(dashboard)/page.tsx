import Link from 'next/link';
import { Activity, FileClock, HandCoins, HeartPulse, LifeBuoy, Scale } from 'lucide-react';

import { MetricCard } from '@/components/cards/metric-card';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function DashboardHomePage() {
  const [summary, cases, reports, support] = await Promise.all([
    apiClient.getDashboardSummary(),
    apiClient.getCases(),
    apiClient.getReports(),
    apiClient.getSupportRequests(),
  ]);

  return (
    <div>
      <PageHeader title="Dashboard Overview" description="Operational snapshot for Libya Charity." />

      <div className="grid gap-4 md:grid-cols-7">
        <MetricCard title="Total Donations" value={`${summary.totalDonations.toLocaleString()} LYD`} icon={HandCoins} />
        <MetricCard title="Active Cases" value={String(summary.activeCases)} icon={HeartPulse} />
        <MetricCard title="Pending Reviews" value={String(summary.pendingReviews)} icon={FileClock} />
        <MetricCard title="Live Campaigns" value={String(summary.liveCampaigns)} icon={Activity} />
        <MetricCard title="Support Requests" value={String(summary.supportRequests)} icon={LifeBuoy} />
        <MetricCard title="Zakat Total" value={`${summary.platformZakatTotal.toLocaleString()} LYD`} icon={Scale} />
        <MetricCard title="Non-Zakat Total" value={`${summary.platformNonZakatTotal.toLocaleString()} LYD`} icon={Scale} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PageHeader title="Recent Pending Cases" />
          <DataTable>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">City</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-3 py-2">{item.title}</td>
                    <td className="px-3 py-2">{item.city}</td>
                    <td className="px-3 py-2"><StatusBadge value={item.verificationStatus} /></td>
                    <td className="px-3 py-2"><Link className="text-brand hover:underline" href={`/cases/${item.id}`}>Review</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="mb-2 font-semibold">Recent Reports</h3>
            <ul className="space-y-2 text-sm">
              {reports.map((r) => (
                <li key={r.id} className="flex items-center justify-between">
                  <span>{r.title}</span>
                  <StatusBadge value={r.status} />
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="mb-2 font-semibold">Recent Support Issues</h3>
            <ul className="space-y-2 text-sm">
              {support.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span>{s.subject}</span>
                  <StatusBadge value={s.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 card p-4">
        <h3 className="mb-2 font-semibold">Quick Actions</h3>
        <div className="grid gap-2 md:grid-cols-4">
          <Link href="/cases" className="rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50">Review pending cases</Link>
          <Link href="/organizations" className="rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50">Verify organizations</Link>
          <Link href="/reports" className="rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50">Publish reports</Link>
          <Link href="/support" className="rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50">Resolve support tickets</Link>
        </div>
      </div>
    </div>
  );
}

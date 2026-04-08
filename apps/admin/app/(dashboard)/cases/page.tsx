import Link from 'next/link';

import { FilterBar } from '@/components/shared/filter-bar';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function CasesPage() {
  const cases = await apiClient.getCases();

  return (
    <div>
      <PageHeader title="Cases" description="Review, verify, and publish humanitarian cases." />
      <FilterBar>
        <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Search case" />
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Status</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>City</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Case Type</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Urgency</option></select>
      </FilterBar>
      <DataTable>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Applicant / Source</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Organization</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Raised</th>
              <th className="px-3 py-2">Verification</th>
              <th className="px-3 py-2">Publication</th>
              <th className="px-3 py-2">Funding</th>
              <th className="px-3 py-2">Updated</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item) => (
              <tr key={item.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2 text-brand"><Link href={`/cases/${item.id}`}>{item.title}</Link></td>
                <td className="px-3 py-2">{item.applicant} ({item.source})</td>
                <td className="px-3 py-2">{item.city}</td>
                <td className="px-3 py-2">{item.organization}</td>
                <td className="px-3 py-2">{item.targetAmount}</td>
                <td className="px-3 py-2">{item.raisedAmount}</td>
                <td className="px-3 py-2"><StatusBadge value={item.verificationStatus} /></td>
                <td className="px-3 py-2"><StatusBadge value={item.publicationStatus} /></td>
                <td className="px-3 py-2"><StatusBadge value={item.fundingStatus} /></td>
                <td className="px-3 py-2">{item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}

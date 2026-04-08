import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function OrganizationsPage() {
  const organizations = await apiClient.getOrganizations();

  return (
    <div>
      <PageHeader title="Organizations" description="Manage NGO partner verification and status." />
      <DataTable>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">Verification</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2">Cases</th>
              <th className="px-3 py-2">Campaigns</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{org.name}</td>
                <td className="px-3 py-2">{org.city}</td>
                <td className="px-3 py-2"><StatusBadge value={org.verificationStatus} /></td>
                <td className="px-3 py-2">{org.isActive ? 'Active' : 'Inactive'}</td>
                <td className="px-3 py-2">{org.casesCount}</td>
                <td className="px-3 py-2">{org.campaignsCount}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2 text-xs">
                    <button className="rounded border border-slate-300 px-2 py-1">Verify</button>
                    <button className="rounded border border-slate-300 px-2 py-1">Suspend</button>
                    <button className="rounded border border-slate-300 px-2 py-1">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}

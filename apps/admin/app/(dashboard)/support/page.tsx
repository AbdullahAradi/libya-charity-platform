import { FilterBar } from '@/components/shared/filter-bar';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function SupportPage() {
  const requests = await apiClient.getSupportRequests();

  return (
    <div>
      <PageHeader title="Support Requests" description="Handle user issues and assign agents." />
      <FilterBar>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Status</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Source</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Assigned Agent</option></select>
      </FilterBar>
      <DataTable>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Assigned</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{item.subject}</td>
                <td className="px-3 py-2">{item.category}</td>
                <td className="px-3 py-2">{item.source}</td>
                <td className="px-3 py-2">{item.user}</td>
                <td className="px-3 py-2"><StatusBadge value={item.status} /></td>
                <td className="px-3 py-2">{item.assignedTo}</td>
                <td className="px-3 py-2">{item.createdAt}</td>
                <td className="px-3 py-2"><div className="flex gap-2"><button className="rounded border px-2 py-1">Assign</button><button className="rounded border px-2 py-1">Resolve</button><button className="rounded border px-2 py-1">Add Note</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}

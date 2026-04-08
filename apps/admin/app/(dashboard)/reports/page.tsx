import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function ReportsPage() {
  const reports = await apiClient.getReports();

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Create and publish operational transparency reports."
        actions={<button className="rounded-md bg-brand px-3 py-2 text-sm text-white">Create Report</button>}
      />
      <DataTable>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Linked To</th>
              <th className="px-3 py-2">Author</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Published Date</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{r.title}</td>
                <td className="px-3 py-2">{r.linkedTo}</td>
                <td className="px-3 py-2">{r.author}</td>
                <td className="px-3 py-2"><StatusBadge value={r.status} /></td>
                <td className="px-3 py-2">{r.publishedAt ?? '-'}</td>
                <td className="px-3 py-2"><div className="flex gap-2"><button className="rounded border px-2 py-1">Edit</button><button className="rounded border px-2 py-1">Publish</button><button className="rounded border px-2 py-1">Unpublish</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}

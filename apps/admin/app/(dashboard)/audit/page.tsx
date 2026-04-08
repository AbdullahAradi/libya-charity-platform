import { FilterBar } from '@/components/shared/filter-bar';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function AuditPage() {
  const logs = await apiClient.getAuditLogs();

  return (
    <div>
      <PageHeader title="Audit Logs" description="Monitor sensitive operations and admin actions." />
      <FilterBar>
        <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Actor" />
        <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Entity" />
        <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Action" />
        <input className="rounded-md border border-slate-300 px-3 py-2" type="date" />
      </FilterBar>
      <DataTable>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Actor</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Entity Type</th>
              <th className="px-3 py-2">Entity ID</th>
              <th className="px-3 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{log.actor}</td>
                <td className="px-3 py-2">{log.action}</td>
                <td className="px-3 py-2">{log.entityType}</td>
                <td className="px-3 py-2">{log.entityId}</td>
                <td className="px-3 py-2">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}

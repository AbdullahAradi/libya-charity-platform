import { FilterBar } from '@/components/shared/filter-bar';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function UsersPage() {
  const users = await apiClient.getUsers();

  return (
    <div>
      <PageHeader title="Internal Users" description="Manage operational roles and access placeholders." />
      <FilterBar>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Role</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Status</option></select>
      </FilterBar>
      <DataTable>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{u.name}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.role}</td>
                <td className="px-3 py-2"><StatusBadge value={u.status} /></td>
                <td className="px-3 py-2"><div className="flex gap-2"><button className="rounded border px-2 py-1">Change Role</button><button className="rounded border px-2 py-1">Deactivate</button><button className="rounded border px-2 py-1">Reset Password</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}

import { FilterBar } from '@/components/shared/filter-bar';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTable } from '@/components/tables/data-table';
import { apiClient } from '@/lib/api/client';

export default async function DonationsPage() {
  const donations = await apiClient.getDonations();

  return (
    <div>
      <PageHeader title="Donations" description="Track one-time and recurring donation records." />
      <FilterBar>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Payment Status</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Payment Method</option></select>
        <select className="rounded-md border border-slate-300 px-3 py-2"><option>Donation Type</option></select>
        <input className="rounded-md border border-slate-300 px-3 py-2" type="date" />
      </FilterBar>
      <DataTable>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Donor</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Currency</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Linked To</th>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Receipt</th>
              <th className="px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{d.donor}</td>
                <td className="px-3 py-2">{d.amount}</td>
                <td className="px-3 py-2">{d.currency}</td>
                <td className="px-3 py-2">{d.type}</td>
                <td className="px-3 py-2">{d.linkedTo}</td>
                <td className="px-3 py-2">{d.paymentMethod}</td>
                <td className="px-3 py-2"><StatusBadge value={d.paymentStatus} /></td>
                <td className="px-3 py-2"><button className="text-brand">{d.receiptNumber}</button></td>
                <td className="px-3 py-2">{d.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
      <div className="card mt-4 p-4 text-sm text-slate-600">Recurring donations section placeholder ready for API integration.</div>
    </div>
  );
}

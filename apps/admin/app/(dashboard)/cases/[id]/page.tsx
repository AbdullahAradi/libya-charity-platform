import { notFound } from 'next/navigation';

import { DetailSectionCard } from '@/components/cards/detail-section-card';
import { ActionToolbar } from '@/components/shared/action-toolbar';
import { ConfirmationDialog } from '@/components/shared/confirmation-dialog';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { apiClient } from '@/lib/api/client';

const audienceLabels: Record<string, string> = {
  ALL_OPTED_IN_DONORS: 'All opted-in donors',
  PAST_DONORS: 'Past donors',
  DONORS_BY_INTEREST_CATEGORY: 'Donors by interest/category',
  DONORS_FOLLOWED_SIMILAR_CASES: 'Donors who follow similar cases',
  DONORS_CONTRIBUTED_SIMILAR_CASE_TYPES: 'Donors who contributed to similar case types',
};

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await apiClient.getCaseById(id);

  if (!item) return notFound();

  const remaining = item.targetAmount - item.raisedAmount;

  return (
    <div className="space-y-4">
      <PageHeader title={item.title} description="Case detail and operational controls" />

      <ActionToolbar>
        <ConfirmationDialog label="Approve" onConfirm={() => console.log('approve')} />
        <ConfirmationDialog label="Reject" onConfirm={() => console.log('reject')} />
        <ConfirmationDialog label="Request More Info" onConfirm={() => console.log('request-info')} />
        <ConfirmationDialog label="Publish" onConfirm={() => console.log('publish')} />
        <ConfirmationDialog label="Unpublish" onConfirm={() => console.log('unpublish')} />
        <ConfirmationDialog label="Archive" onConfirm={() => console.log('archive')} />
        <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Add Update</button>
        <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Add Report</button>
      </ActionToolbar>

      <div className="grid gap-4 lg:grid-cols-2">
        <DetailSectionCard title="Case Summary">
          <p className="text-sm text-slate-600">{item.notes}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge value={item.verificationStatus} />
            <StatusBadge value={item.publicationStatus} />
            <StatusBadge value={item.fundingStatus} />
            <StatusBadge value={item.zakatEligible ? 'ZAKAT_ELIGIBLE' : 'NON_ZAKAT'} />
          </div>
        </DetailSectionCard>

        <DetailSectionCard title="Applicant & Source">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Applicant</dt><dd>{item.applicant}</dd></div>
            <div className="flex justify-between"><dt>Source</dt><dd>{item.source}</dd></div>
            <div className="flex justify-between"><dt>City / Area</dt><dd>{item.city}</dd></div>
            <div className="flex justify-between"><dt>Organization</dt><dd>{item.organization}</dd></div>
            <div className="flex justify-between"><dt>Reviewer</dt><dd>{item.reviewer}</dd></div>
          </dl>
        </DetailSectionCard>

        <DetailSectionCard title="Funding Breakdown (Separated)">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Needed</dt><dd>{item.targetAmount} LYD</dd></div>
            <div className="flex justify-between"><dt>Total Raised</dt><dd>{item.raisedAmount} LYD</dd></div>
            <div className="flex justify-between"><dt>Zakat Raised</dt><dd>{item.zakatRaisedAmount} LYD</dd></div>
            <div className="flex justify-between"><dt>Non-Zakat Raised</dt><dd>{item.nonZakatRaisedAmount} LYD</dd></div>
            <div className="flex justify-between font-medium"><dt>Remaining</dt><dd>{remaining} LYD</dd></div>
          </dl>
        </DetailSectionCard>

        <DetailSectionCard title="Documents & Updates">
          <p className="text-sm text-slate-600">Documents placeholder (TODO: file uploads integration).</p>
          <ul className="mt-2 list-disc pl-4 text-sm text-slate-600">
            <li>Reviewer notes: {item.notes}</li>
            <li>Updates section placeholder</li>
            <li>Reports section placeholder</li>
          </ul>
        </DetailSectionCard>
      </div>

      <DetailSectionCard title="Case Alerts & Donor Notifications">
        <p className="text-sm text-slate-600">
          Controlled messaging only. Promotional alerts are limited to 2 per user in a rolling 3-day window.
          Emergency override exists for future workflow expansion.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input className="rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Alert title" />
          <select className="rounded-md border border-slate-300 px-3 py-2 text-sm" defaultValue="PUSH">
            <option value="PUSH">Mobile Push</option>
            <option value="EMAIL">Email</option>
          </select>
          <select className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2" defaultValue="ALL_OPTED_IN_DONORS">
            {Object.entries(audienceLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <textarea className="rounded-md border border-slate-300 px-3 py-2 text-sm md:col-span-2" rows={3} placeholder="Message" />
          <button className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white md:col-span-2">Send Alert (Mock)</button>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-slate-800">Previous alerts</h3>
          <div className="mt-2 space-y-2">
            {item.alerts.length === 0 ? (
              <p className="text-sm text-slate-500">No alerts have been created for this case yet.</p>
            ) : (
              item.alerts.map((alert) => (
                <div key={alert.id} className="rounded-md border border-slate-200 p-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-slate-800">{alert.title}</p>
                    <StatusBadge value={alert.status} />
                  </div>
                  <p className="mt-1 text-slate-600">{alert.message}</p>
                  <dl className="mt-2 grid gap-1 text-xs text-slate-500 md:grid-cols-2">
                    <div>Channel: {alert.channel}</div>
                    <div>Audience: {audienceLabels[alert.audienceType]}</div>
                    <div>Estimated recipients: {alert.estimatedRecipientCount ?? '—'}</div>
                    <div>Actual recipients: {alert.actualRecipientCount ?? '—'}</div>
                    <div>Sent at: {alert.sentAt ?? 'Not sent'}</div>
                  </dl>
                </div>
              ))
            )}
          </div>
        </div>
      </DetailSectionCard>
    </div>
  );
}

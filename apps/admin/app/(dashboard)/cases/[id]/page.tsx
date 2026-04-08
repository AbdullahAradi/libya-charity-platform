import { notFound } from 'next/navigation';

import { DetailSectionCard } from '@/components/cards/detail-section-card';
import { ActionToolbar } from '@/components/shared/action-toolbar';
import { ConfirmationDialog } from '@/components/shared/confirmation-dialog';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { apiClient } from '@/lib/api/client';

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

        <DetailSectionCard title="Funding Breakdown">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Needed</dt><dd>{item.targetAmount} LYD</dd></div>
            <div className="flex justify-between"><dt>Raised</dt><dd>{item.raisedAmount} LYD</dd></div>
            <div className="flex justify-between"><dt>Remaining</dt><dd>{remaining} LYD</dd></div>
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
    </div>
  );
}

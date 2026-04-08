'use client';

import { ActionToolbar } from '@/components/shared/action-toolbar';
import { ConfirmationDialog } from '@/components/shared/confirmation-dialog';

type CaseAction = 'approve' | 'reject' | 'request-info' | 'publish' | 'unpublish' | 'archive';

const actionLabels: Record<CaseAction, string> = {
  approve: 'Approve',
  reject: 'Reject',
  'request-info': 'Request More Info',
  publish: 'Publish',
  unpublish: 'Unpublish',
  archive: 'Archive',
};

export function CaseActionToolbar({
  caseId,
  title,
  currentStatus,
  availableActions,
}: {
  caseId: string;
  title: string;
  currentStatus: string;
  availableActions: CaseAction[];
}) {
  const onActionConfirm = (action: CaseAction) => {
    // TODO: connect to admin case actions API (approve/reject/request info/publish/unpublish/archive).
    console.log('case-action', { action, caseId, currentStatus, title });
  };

  return (
    <ActionToolbar>
      {availableActions.map((action) => (
        <ConfirmationDialog key={action} label={actionLabels[action]} onConfirm={() => onActionConfirm(action)} />
      ))}
      <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Add Update</button>
      <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Add Report</button>
    </ActionToolbar>
  );
}

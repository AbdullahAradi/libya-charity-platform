'use client';

import { useState } from 'react';

export function ConfirmationDialog({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button className="rounded-md border border-slate-300 px-3 py-2 text-sm" onClick={() => setOpen(true)}>
        {label}
      </button>
    );
  }

  return (
    <div className="rounded-md border border-slate-300 bg-white p-3 text-sm">
      <p className="mb-2">Confirm action?</p>
      <div className="flex gap-2">
        <button
          className="rounded-md bg-brand px-3 py-1 text-white"
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
        >
          Confirm
        </button>
        <button className="rounded-md border border-slate-300 px-3 py-1" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

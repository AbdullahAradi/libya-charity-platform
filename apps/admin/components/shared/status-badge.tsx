import { cn } from '@/lib/utils/cn';

const map: Record<string, string> = {
  PUBLISHED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PAID: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  OPEN: 'bg-amber-50 text-amber-700 border-amber-200',
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  UNPUBLISHED: 'bg-slate-100 text-slate-700 border-slate-200',
  ARCHIVED: 'bg-slate-100 text-slate-700 border-slate-200',
  REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
  SUSPENDED: 'bg-rose-50 text-rose-700 border-rose-200',
  SENT: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  SCHEDULED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  DRAFT: 'bg-slate-100 text-slate-700 border-slate-200',
  ZAKAT_ELIGIBLE: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  NON_ZAKAT: 'bg-orange-50 text-orange-700 border-orange-200',
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={cn('rounded-full border px-2 py-1 text-xs font-medium', map[value] ?? 'bg-slate-100 text-slate-700 border-slate-200')}>{value}</span>;
}

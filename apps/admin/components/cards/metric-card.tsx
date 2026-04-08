import { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export function MetricCard({ title, value, icon: Icon }: Props) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        <div className="rounded-lg bg-brand-soft p-2 text-brand-dark">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

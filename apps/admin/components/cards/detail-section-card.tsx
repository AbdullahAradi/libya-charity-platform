import { ReactNode } from 'react';

export function DetailSectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-4">
      <h3 className="mb-3 text-base font-semibold text-slate-800">{title}</h3>
      {children}
    </section>
  );
}

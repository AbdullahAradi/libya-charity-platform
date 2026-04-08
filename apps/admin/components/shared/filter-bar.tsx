import { ReactNode } from 'react';

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="card mb-4 grid gap-2 p-3 md:grid-cols-5">{children}</div>;
}

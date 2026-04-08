import { ReactNode } from 'react';

export function DataTable({ children }: { children: ReactNode }) {
  return <div className="card overflow-x-auto">{children}</div>;
}

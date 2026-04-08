import { ReactNode } from 'react';

export function ActionToolbar({ children }: { children: ReactNode }) {
  return <div className="card flex flex-wrap gap-2 p-3">{children}</div>;
}

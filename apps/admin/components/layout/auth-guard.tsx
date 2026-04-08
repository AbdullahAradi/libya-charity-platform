'use client';

import { ReactNode } from 'react';

import { useSessionGuard } from '@/hooks/use-session-guard';

export function AuthGuard({ children }: { children: ReactNode }) {
  const session = useSessionGuard();

  if (!session) {
    return <div className="p-8 text-sm text-slate-500">Checking session...</div>;
  }

  return <>{children}</>;
}

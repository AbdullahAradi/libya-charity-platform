'use client';

import { Bell, LogOut, UserCircle2 } from 'lucide-react';

import { useAuth } from '@/lib/auth/auth-context';

export function Topbar() {
  const { session, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-sm text-slate-500">Operations Center</p>
        <h1 className="text-lg font-semibold text-slate-800">Libya Charity Admin</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <UserCircle2 className="h-5 w-5" />
          <span>{session?.email ?? 'admin@libyacharity.ly'}</span>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

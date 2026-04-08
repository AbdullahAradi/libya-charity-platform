'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils/cn';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4">
      <div className="mb-6 rounded-xl bg-brand p-4 text-white">
        <p className="text-sm opacity-90">Libya Charity</p>
        <p className="text-lg font-semibold">Admin Dashboard</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100',
                active && 'bg-brand-soft text-brand-dark',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

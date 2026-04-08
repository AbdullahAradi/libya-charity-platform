import './globals.css';

import { ReactNode } from 'react';

import { QueryProvider } from '@/components/shared/query-provider';
import { AuthProvider } from '@/lib/auth/auth-context';

export const metadata = {
  title: 'Libya Charity Admin',
  description: 'Operational dashboard for Libya Charity',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

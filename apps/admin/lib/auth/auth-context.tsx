'use client';

import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Session = { email: string; role: string } | null;

type AuthContextValue = {
  session: Session;
  login: (email: string, _password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session>(null);

  const value = useMemo(
    () => ({
      session,
      login: (email: string) => {
        setSession({ email, role: 'SUPER_ADMIN' });
        router.push('/');
      },
      logout: () => {
        setSession(null);
        router.push('/login');
      },
    }),
    [session, router],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

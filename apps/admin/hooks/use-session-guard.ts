'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/lib/auth/auth-context';

export const useSessionGuard = () => {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push('/login');
  }, [session, router]);

  return session;
};

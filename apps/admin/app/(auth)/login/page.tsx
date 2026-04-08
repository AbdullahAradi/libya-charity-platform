'use client';

import { FormEvent, useState } from 'react';

import { useAuth } from '@/lib/auth/auth-context';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@libyacharity.ly');
  const [password, setPassword] = useState('Password123!');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f4] p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-brand">Libya Charity</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-800">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-500">Secure access for operations and review teams.</p>
        <div className="mt-5 space-y-3">
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="w-full rounded-lg bg-brand px-4 py-2 font-medium text-white">Login</button>
        </div>
      </form>
    </main>
  );
}

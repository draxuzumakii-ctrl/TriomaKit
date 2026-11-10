'use client';
import { useAuth } from '@/lib/firebase/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export function Protected({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (adminOnly && profile && !['admin','super_admin'].includes(profile.role)) router.push('/dashboard');
  }, [user, profile, loading, adminOnly, router]);
  if (loading || !user) return <div className="min-h-screen grid place-items-center text-white/40">Loading…</div>;
  if (adminOnly && profile && !['admin','super_admin'].includes(profile.role)) return null;
  return <>{children}</>;
}

'use client';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useAuth } from '@/lib/firebase/auth-context';
import { auth } from '@/lib/firebase/client';
import { signOut } from 'firebase/auth';

export function Nav() {
  const { user, profile } = useAuth();
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 glass-panel px-6 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-semibold text-white">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-blue-600 grid place-items-center"><Lock size={14} /></span>
        TRIOMA
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
        <Link href="/products" className="hover:text-white">Produk</Link>
        <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
        {(profile?.role === 'admin' || profile?.role === 'super_admin') && (
          <Link href="/admin" className="hover:text-white">Admin</Link>
        )}
      </div>
      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <span className="text-sm text-white/60 hidden sm:block">{profile?.fullName || user.email}</span>
            <button onClick={() => signOut(auth)} className="btn-ghost text-sm">Keluar</button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn-ghost text-sm">Masuk</Link>
            <Link href="/register" className="btn-primary text-sm">Daftar</Link>
          </>
        )}
      </div>
    </nav>
  );
}

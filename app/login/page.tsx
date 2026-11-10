'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

export default function Login() {
  const [email, setEmail] = useState(''); const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); const { push } = useToast();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { setLoading(true); await signInWithEmailAndPassword(auth, email, pass); push('Login berhasil', 'success'); router.push('/dashboard'); }
    catch (err: unknown) { push(err instanceof Error ? err.message : 'Terjadi kesalahan', 'error'); }
    finally { setLoading(false); }
  };
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <form onSubmit={onSubmit} className="glass-panel p-10 w-full max-w-md space-y-5">
        <h1 className="text-3xl font-semibold text-white">Masuk</h1>
        <p className="text-white/50 text-sm">Masuk ke akun TRIOMA Anda.</p>
        <input className="input-glass" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="input-glass" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
        <button disabled={loading} className="btn-primary w-full disabled:opacity-50">{loading ? 'Memproses…' : 'Masuk'}</button>
        <p className="text-sm text-white/40 text-center">Belum punya akun? <Link href="/register" className="text-electric">Daftar</Link></p>
      </form>
    </main>
  );
}

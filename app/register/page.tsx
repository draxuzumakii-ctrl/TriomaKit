'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

export default function Register() {
  const [email, setEmail] = useState(''); const [pass, setPass] = useState('');
  const [name, setName] = useState(''); const [loading, setLoading] = useState(false);
  const router = useRouter(); const { push } = useToast();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db, 'profiles', user.uid), { fullName: name, role: 'user', createdAt: serverTimestamp() });
      push('Akun berhasil dibuat', 'success'); router.push('/dashboard');
    } catch (err: unknown) { push(err instanceof Error ? err.message : 'Terjadi kesalahan', 'error'); }
    finally { setLoading(false); }
  };
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <form onSubmit={onSubmit} className="glass-panel p-10 w-full max-w-md space-y-5">
        <h1 className="text-3xl font-semibold text-white">Daftar</h1>
        <p className="text-white/50 text-sm">Buat akun TRIOMA Home Kit.</p>
        <input className="input-glass" placeholder="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} required />
        <input className="input-glass" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="input-glass" type="password" placeholder="Password (min 6)" minLength={6} value={pass} onChange={e => setPass(e.target.value)} required />
        <button disabled={loading} className="btn-primary w-full disabled:opacity-50">{loading ? 'Memproses…' : 'Daftar'}</button>
        <p className="text-sm text-white/40 text-center">Sudah punya akun? <Link href="/login" className="text-electric">Masuk</Link></p>
      </form>
    </main>
  );
}

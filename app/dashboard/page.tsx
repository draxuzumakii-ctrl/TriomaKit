'use client';
import { useAuth } from '@/lib/firebase/auth-context';
import { Nav } from '@/components/marketing/Nav';
import { Protected } from '@/components/ui/Protected';
import Link from 'next/link';
import { Home, Shield, Zap, Leaf } from 'lucide-react';

function Inner() {
  const { profile } = useAuth();
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-white">Selamat datang, {profile?.fullName || 'Pengguna'}</h1>
        <p className="text-white/50 mt-1">Rumah Anda dalam kondisi aman.</p>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {[
            { icon: Home, label: 'Hub', value: 'Terhubung' },
            { icon: Shield, label: 'Keamanan', value: 'Aman' },
            { icon: Zap, label: 'Energi', value: 'Baik' },
            { icon: Leaf, label: 'Efisiensi', value: '65%' },
          ].map(s => (
            <div key={s.label} className="glass-panel p-5">
              <s.icon className="text-electric mb-3" size={20} />
              <p className="text-white/50 text-sm">{s.label}</p>
              <p className="text-white text-lg font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/devices" className="glass-panel p-6 hover:border-electric/40 transition">
            <h3 className="text-white font-semibold">Perangkat Saya</h3>
            <p className="text-white/50 text-sm mt-1">Kelola sensor dan perangkat</p>
          </Link>
          <Link href="/orders" className="glass-panel p-6 hover:border-electric/40 transition">
            <h3 className="text-white font-semibold">Pesanan Saya</h3>
            <p className="text-white/50 text-sm mt-1">Lihat status pesanan</p>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function DashboardPage() { return <Protected><Inner /></Protected>; }

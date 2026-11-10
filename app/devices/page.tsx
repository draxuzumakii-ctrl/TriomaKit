'use client';
import { Nav } from '@/components/marketing/Nav';
import { Protected } from '@/components/ui/Protected';

function Inner() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-white">Perangkat Saya</h1>
        <p className="text-white/50 mt-1">Belum ada perangkat terhubung.</p>
        <div className="glass-panel mt-8 p-12 text-center text-white/40">
          Simulation mode belum aktif. Hubungkan perangkat fisik TRIOMA Hub untuk memulai.
        </div>
      </section>
    </main>
  );
}
export default function DevicesPage() { return <Protected><Inner /></Protected>; }

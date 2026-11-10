'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Zap, Leaf, ArrowRight } from 'lucide-react';
import { Nav } from '@/components/marketing/Nav';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <span className="inline-block text-xs tracking-widest uppercase text-electric border border-electric/30 rounded-full px-3 py-1 mb-6">TRIOMA Home Kit</span>
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] text-white">
            Your Home.<br /><span className="bg-gradient-to-r from-electric to-blue-400 bg-clip-text text-transparent">Under One Intelligence.</span>
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-lg">Experience a smarter way to manage automation, security, and energy through one connected ecosystem.</p>
          <div className="mt-10 flex gap-4">
            <Link href="/products" className="btn-primary flex items-center gap-2">Jelajahi Produk <ArrowRight size={16} /></Link>
            <Link href="/dashboard" className="btn-ghost">Coba Simulasi</Link>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="relative aspect-square glass-panel p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-transparent to-transparent" />
          <div className="relative h-full grid place-items-center text-center">
            <div>
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-electric/30 to-blue-600/20 grid place-items-center animate-pulse">
                <Shield size={48} className="text-electric" />
              </div>
              <p className="mt-6 text-white/80 font-medium">Connected Ecosystem</p>
              <p className="text-white/40 text-sm mt-1">Hub • Sensor • Cloud</p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Otomatisasi', desc: 'Kontrol perangkat secara cerdas dari satu hub.' },
            { icon: Shield, title: 'Keamanan', desc: 'Pantau rumah kapan saja dengan sensor real-time.' },
            { icon: Leaf, title: 'Hemat Energi', desc: 'Kelola konsumsi listrik dengan efisien.' },
          ].map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }} className="glass-panel p-8 hover:border-electric/40 transition">
              <div className="w-12 h-12 rounded-xl bg-electric/10 grid place-items-center mb-4"><f.icon className="text-electric" size={22} /></div>
              <h3 className="text-xl font-semibold text-white">{f.title}</h3>
              <p className="text-white/50 mt-2 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="px-6 max-w-4xl mx-auto py-24 text-center glass-panel mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">Siap memulai rumah pintar Anda?</h2>
        <p className="text-white/50 mt-3">Gabung dengan ribuan pengguna TRIOMA.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/register" className="btn-primary">Daftar Sekarang</Link>
          <Link href="/products" className="btn-ghost">Lihat Paket</Link>
        </div>
      </section>
      <footer className="py-12 text-center text-white/30 text-sm">© 2026 TRIOMA Home Kit</footer>
    </main>
  );
}

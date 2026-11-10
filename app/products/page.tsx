'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listProducts } from '@/lib/firebase/services';
import { Product } from '@/lib/types';
import { formatIDR } from '@/lib/utils';
import { Nav } from '@/components/marketing/Nav';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { listProducts().then(setProducts).finally(() => setLoading(false)); }, []);
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-40 pb-12 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold text-white">Paket TRIOMA</h1>
        <p className="text-white/50 mt-2">Satu jaringan, tiga fungsi utama.</p>
        {loading ? (
          <div className="mt-12 grid md:grid-cols-3 gap-6">{[1,2,3].map(i => <div key={i} className="glass-panel h-64 animate-pulse" />)}</div>
        ) : products.length === 0 ? (
          <div className="glass-panel mt-12 p-12 text-center text-white/40">Belum ada produk. Login sebagai admin dan buka /admin untuk menambahkan.</div>
        ) : (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="glass-panel p-6 flex flex-col">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-electric/20 to-blue-600/10 grid place-items-center mb-4">
                  <span className="text-white/70 font-medium">{p.focus}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                <p className="text-white/50 text-sm mt-1 flex-1">{p.description}</p>
                <p className="text-electric text-lg font-semibold mt-4">{formatIDR(p.price)}</p>
                <Link href={`/products/${p.slug}`} className="btn-primary mt-4 text-center text-sm">Detail</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

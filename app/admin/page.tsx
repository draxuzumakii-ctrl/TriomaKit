'use client';
import { useEffect, useState } from 'react';
import { Nav } from '@/components/marketing/Nav';
import { Protected } from '@/components/ui/Protected';
import { listAllOrders, listAllProfiles, createProduct, listProducts } from '@/lib/firebase/services';
import { Order, Profile, Product } from '@/lib/types';
import { formatIDR } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

function Inner() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ slug: '', name: '', description: '', price: 0, hpp: 0, stock: 0, focus: 'Otomatisasi' });
  const { push } = useToast();

  const reload = () => {
    listAllOrders().then(setOrders);
    listAllProfiles().then(setUsers);
    listProducts(false).then(setProducts);
  };
  useEffect(() => { reload(); }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({ ...form, isActive: true });
      push('Produk ditambahkan', 'success');
      setForm({ slug: '', name: '', description: '', price: 0, hpp: 0, stock: 0, focus: 'Otomatisasi' });
      reload();
    } catch (err: any) { push(err.message, 'error'); }
  };

  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-white">Admin Panel</h1>
          <p className="text-white/50 mt-1">Kelola produk, pesanan, dan pengguna.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-panel p-5"><p className="text-white/50 text-sm">Total Pesanan</p><p className="text-white text-2xl font-semibold">{orders.length}</p></div>
          <div className="glass-panel p-5"><p className="text-white/50 text-sm">Total Pengguna</p><p className="text-white text-2xl font-semibold">{users.length}</p></div>
          <div className="glass-panel p-5"><p className="text-white/50 text-sm">Total Produk</p><p className="text-white text-2xl font-semibold">{products.length}</p></div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tambah Produk</h2>
          <form onSubmit={addProduct} className="grid md:grid-cols-2 gap-3">
            <input className="input-glass" placeholder="Slug (contoh: paket-teras)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required />
            <input className="input-glass" placeholder="Nama Produk" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <textarea className="input-glass md:col-span-2" placeholder="Deskripsi" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
            <input type="number" className="input-glass" placeholder="Harga" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} required />
            <input type="number" className="input-glass" placeholder="HPP" value={form.hpp} onChange={e => setForm({...form, hpp: Number(e.target.value)})} required />
            <input type="number" className="input-glass" placeholder="Stok" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} required />
            <select className="input-glass" value={form.focus} onChange={e => setForm({...form, focus: e.target.value})}>
              <option>Otomatisasi</option><option>Keamanan</option><option>Hemat Energi</option>
            </select>
            <button className="btn-primary md:col-span-2">Tambah Produk</button>
          </form>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Pesanan Terbaru</h2>
          {orders.length === 0 ? <p className="text-white/40">Belum ada pesanan.</p> : (
            <div className="space-y-2">
              {orders.slice(0, 10).map(o => (
                <div key={o.id} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/80">{o.customerName} — {o.items.map(i => i.name).join(', ')}</span>
                  <span className="text-electric">{formatIDR(o.total)} · <span className="text-white/50 capitalize">{o.status}</span></span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Daftar Produk</h2>
          {products.map(p => (
            <div key={p.id} className="flex justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-white/80">{p.name}</span>
              <span className="text-white/60">{formatIDR(p.price)} · stok {p.stock}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
export default function AdminPage() { return <Protected adminOnly><Inner /></Protected>; }

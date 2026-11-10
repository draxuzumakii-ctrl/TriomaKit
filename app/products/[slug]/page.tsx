'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductBySlug, createOrder } from '@/lib/firebase/services';
import { Product } from '@/lib/types';
import { formatIDR } from '@/lib/utils';
import { useAuth } from '@/lib/firebase/auth-context';
import { useToast } from '@/components/ui/Toast';
import { Nav } from '@/components/marketing/Nav';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ customerName: '', customerPhone: '', customerAddress: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter(); const { push } = useToast();

  useEffect(() => { if (slug) getProductBySlug(slug).then(setProduct); }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { push('Silakan login dulu', 'error'); router.push('/login'); return; }
    if (!product) return;
    try {
      setLoading(true);
      await createOrder({
        userId: user.uid,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerAddress: form.customerAddress,
        notes: form.notes,
        items: [{ productId: product.id, name: product.name, qty, price: product.price }],
        total: product.price * qty,
      });
      push('Pesanan berhasil dibuat', 'success');
      router.push('/orders');
    } catch (err: any) { push(err.message, 'error'); }
    finally { setLoading(false); }
  };

  if (!product) return <div className="min-h-screen grid place-items-center text-white/40">Loading…</div>;

  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-40 pb-16 px-6 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-electric/20 to-blue-600/10 grid place-items-center">
            <span className="text-white/70 text-xl">{product.focus}</span>
          </div>
          <h1 className="text-3xl font-semibold text-white mt-6">{product.name}</h1>
          <p className="text-white/60 mt-3">{product.description}</p>
          <p className="text-electric text-2xl font-semibold mt-4">{formatIDR(product.price)}</p>
          <p className="text-white/40 text-sm mt-1">Stok: {product.stock}</p>
        </div>
        <form onSubmit={submit} className="glass-panel p-6 space-y-4 h-fit">
          <h2 className="text-xl font-semibold text-white">Buat Pesanan</h2>
          <div>
            <label className="text-sm text-white/60">Jumlah</label>
            <input type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value))} className="input-glass mt-1" />
          </div>
          <input className="input-glass" placeholder="Nama Penerima" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} required />
          <input className="input-glass" placeholder="Nomor WhatsApp" value={form.customerPhone} onChange={e => setForm({...form, customerPhone: e.target.value})} required />
          <textarea className="input-glass" placeholder="Alamat Lengkap" rows={3} value={form.customerAddress} onChange={e => setForm({...form, customerAddress: e.target.value})} required />
          <textarea className="input-glass" placeholder="Catatan (opsional)" rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          <div className="flex justify-between text-white pt-2">
            <span>Total</span>
            <span className="font-semibold">{formatIDR(product.price * qty)}</span>
          </div>
          <button disabled={loading} className="btn-primary w-full disabled:opacity-50">{loading ? 'Memproses…' : 'Pesan Sekarang'}</button>
        </form>
      </section>
    </main>
  );
}

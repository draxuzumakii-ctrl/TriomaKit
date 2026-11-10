'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth-context';
import { listMyOrders } from '@/lib/firebase/services';
import { Order } from '@/lib/types';
import { formatIDR } from '@/lib/utils';
import { Nav } from '@/components/marketing/Nav';
import { Protected } from '@/components/ui/Protected';

function Inner() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    listMyOrders(user.uid).then(setOrders).finally(() => setLoading(false));
  }, [user]);

  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-40 pb-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-white">Pesanan Saya</h1>
        {loading ? (
          <div className="mt-8 glass-panel h-32 animate-pulse" />
        ) : orders.length === 0 ? (
          <div className="glass-panel mt-8 p-12 text-center text-white/40">Belum ada pesanan.</div>
        ) : (
          <div className="mt-8 space-y-3">
            {orders.map(o => (
              <div key={o.id} className="glass-panel p-5 flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{o.items.map(i => `${i.name} x${i.qty}`).join(', ')}</p>
                  <p className="text-white/40 text-sm">{new Date(o.createdAt?.toMillis?.() ?? Date.now()).toLocaleString('id-ID')}</p>
                </div>
                <div className="text-right">
                  <p className="text-electric font-semibold">{formatIDR(o.total)}</p>
                  <p className="text-xs text-white/60 capitalize">{o.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
export default function OrdersPage() { return <Protected><Inner /></Protected>; }

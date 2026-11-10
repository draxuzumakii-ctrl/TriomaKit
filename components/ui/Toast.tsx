'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

type T = { id: number; message: string; type: 'success' | 'error' | 'info' };
const Ctx = createContext<{ push: (m: string, t?: T['type']) => void }>({ push: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<T[]>([]);
  const push = (message: string, type: T['type'] = 'info') => {
    const id = Date.now();
    setList(l => [...l, { id, message, type }]);
    setTimeout(() => setList(l => l.filter(x => x.id !== id)), 3500);
  };
  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 space-y-2 z-[100]">
        {list.map(t => (
          <div key={t.id} className="glass-panel px-4 py-3 text-sm flex items-center gap-3 min-w-[240px]">
            <span className={`status-dot ${t.type === 'success' ? 'bg-green-400' : t.type === 'error' ? 'bg-red-400' : 'bg-electric'}`} />
            <span className="flex-1">{t.message}</span>
            <button onClick={() => setList(l => l.filter(x => x.id !== t.id))}><X size={14} /></button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
export const useToast = () => useContext(Ctx);

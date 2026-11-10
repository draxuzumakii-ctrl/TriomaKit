'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './client';
import type { Profile } from '@/lib/types';

interface AuthCtx { user: User | null; profile: Profile | null; loading: boolean; }
const Ctx = createContext<AuthCtx>({ user: null, profile: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, 'profiles', u.uid));
        setProfile(snap.exists() ? ({ uid: snap.id, ...snap.data() } as Profile) : null);
      } else setProfile(null);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return <Ctx.Provider value={{ user, profile, loading }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);

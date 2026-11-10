import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where, serverTimestamp,
} from 'firebase/firestore';
import { db } from './client';
import type { Product, Order, Profile, OrderStatus } from '@/lib/types';

export async function listProducts(onlyActive = true): Promise<Product[]> {
  const q = onlyActive
    ? query(collection(db, 'products'), where('isActive', '==', true))
    : query(collection(db, 'products'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, 'products'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Product;
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt'>) {
  return addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp() });
}
export async function updateProduct(id: string, data: Partial<Product>) {
  return updateDoc(doc(db, 'products', id), data);
}
export async function deleteProduct(id: string) { return deleteDoc(doc(db, 'products', id)); }

export async function createOrder(payload: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) {
  return addDoc(collection(db, 'orders'), {
    ...payload, status: 'pending',
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
}

export async function listMyOrders(userId: string): Promise<Order[]> {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Order))
    .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
}

export async function listAllOrders(): Promise<Order[]> {
  const snap = await getDocs(collection(db, 'orders'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Order))
    .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return updateDoc(doc(db, 'orders', id), { status, updatedAt: serverTimestamp() });
}

export async function getProfile(uid: string): Promise<Profile | null> {
  const snap = await getDoc(doc(db, 'profiles', uid));
  return snap.exists() ? ({ uid: snap.id, ...snap.data() } as Profile) : null;
}

export async function listAllProfiles(): Promise<Profile[]> {
  const snap = await getDocs(collection(db, 'profiles'));
  return snap.docs.map(d => ({ uid: d.id, ...d.data() } as Profile));
}

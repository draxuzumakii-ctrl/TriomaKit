import { Timestamp } from 'firebase/firestore';
export type Role = 'user' | 'admin' | 'super_admin';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
export interface Profile { uid: string; fullName: string; phone?: string; role: Role; createdAt: Timestamp; }
export interface Product {
  id: string; slug: string; name: string; description: string;
  price: number; hpp: number; stock: number; imageUrl?: string;
  focus: string; isActive: boolean; createdAt: Timestamp;
}
export interface OrderItem { productId: string; name: string; qty: number; price: number; }
export interface Order {
  id: string; userId: string; status: OrderStatus; total: number;
  customerName: string; customerPhone: string; customerAddress: string;
  notes?: string; items: OrderItem[]; createdAt: Timestamp; updatedAt: Timestamp;
}

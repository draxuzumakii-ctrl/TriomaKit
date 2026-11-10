'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'placeholder-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'placeholder.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'placeholder',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'placeholder.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '0',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:0:web:placeholder',
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!_app) _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return _app;
}

// Lazy getters — hanya init saat benar-benar dipakai di client
export const auth = new Proxy({} as Auth, {
  get(_t, prop) {
    if (!_auth) _auth = getAuth(getFirebaseApp());
    return (_auth as any)[prop];
  },
});

export const db = new Proxy({} as Firestore, {
  get(_t, prop) {
    if (!_db) _db = getFirestore(getFirebaseApp());
    return (_db as any)[prop];
  },
});

export const storage = new Proxy({} as FirebaseStorage, {
  get(_t, prop) {
    if (!_storage) _storage = getStorage(getFirebaseApp());
    return (_storage as any)[prop];
  },
});

export default getFirebaseApp;

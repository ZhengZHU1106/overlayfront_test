// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXRrbJ1sHTxV-HpyuWuRwOXW3B8EuPFMY",
  authDomain: "overlay-adaa5.firebaseapp.com",
  projectId: "overlay-adaa5",
  storageBucket: "overlay-adaa5.firebasestorage.app",
  messagingSenderId: "207321146426",
  appId: "1:207321146426:web:a43b1d99daa9e20dcd8103",
  measurementId: "G-10LL2P6GHL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
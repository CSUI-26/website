import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "zenith-csui",
  appId: "1:1029895060300:web:bfd064b730f75f422bede9",
  storageBucket: "zenith-csui.firebasestorage.app",
  apiKey: "AIzaSyDUwvQ1UTjhpZ9AJY__jxP4iUMY8IOp1ac",
  authDomain: "zenith-csui.firebaseapp.com",
  messagingSenderId: "1029895060300",
  projectNumber: "1029895060300",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

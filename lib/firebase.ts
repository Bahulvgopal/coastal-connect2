import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH6iqsDWq3dX03LThFM7h654EPVpLZhRk",
  authDomain: "un9r4y.firebaseapp.com",
  projectId: "un9r4y",
  storageBucket: "un9r4y.firebasestorage.app",
  messagingSenderId: "10665526699",
  appId: "1:10665526699:web:1877cde4eb02a129977eee",
  measurementId: "G-F3726QFRT9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
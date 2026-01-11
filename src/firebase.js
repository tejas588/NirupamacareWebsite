import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgEqS76nQZ0pderxQ9B9JiP3-t9D_I4Jk",
  authDomain: "nirupamaauth.firebaseapp.com",
  projectId: "nirupamaauth",
  storageBucket: "nirupamaauth.firebasestorage.app",
  messagingSenderId: "656630885930",
  appId: "1:656630885930:web:9d9077cc3de1a6809d9d53",
  measurementId: "G-VEHJDHV6C1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
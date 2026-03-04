import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbrtEBVLf3YChzIZYksRaMkUdfVFH0-3o",
  authDomain: "barangay-pantal.firebaseapp.com",
  databaseURL: "https://barangay-pantal-default-rtdb.firebaseio.com",
  projectId: "barangay-pantal",
  storageBucket: "barangay-pantal.firebasestorage.app",
  messagingSenderId: "961952650917",
  appId: "1:961952650917:web:6ba1e0cc22318f618cdf4c",
  measurementId: "G-4NPP2Y0YJY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
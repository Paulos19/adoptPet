import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "gerador-2-c8519.firebaseapp.com",
  projectId: "gerador-2-c8519",
  storageBucket: "gerador-2-c8519.appspot.com",
  messagingSenderId: "228550178720",
  appId: "1:228550178720:web:5b3f6be199b9d9e6c8d6c5"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
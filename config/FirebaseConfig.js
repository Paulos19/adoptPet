import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE,
  messagingSenderId: process.env.MESSAGIN_ID,
  appId: process.env.APP_ID
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
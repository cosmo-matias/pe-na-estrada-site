import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiPPHK06XNgBKruXH8veC7tDx0SSr6PY8",
  authDomain: "pe-na-estrada-tour.firebaseapp.com",
  projectId: "pe-na-estrada-tour",
  storageBucket: "pe-na-estrada-tour.firebasestorage.app",
  messagingSenderId: "814607424540",
  appId: "1:814607424540:web:2866f25c94627d21b6d3d9"
};

// Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

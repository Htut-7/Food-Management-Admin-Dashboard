import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN-4vM-yYG8rhol9fOsv8P0rrtYexWD70",
  authDomain: "admin-panel-ff47e.firebaseapp.com",
  projectId: "admin-panel-ff47e",
  storageBucket: "admin-panel-ff47e.firebasestorage.app",
  messagingSenderId: "566388668575",
  appId: "1:566388668575:web:8472a44ff6341bcf640aaa",
  measurementId: "G-E6FBK4MKB8"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app)

export {db,auth}


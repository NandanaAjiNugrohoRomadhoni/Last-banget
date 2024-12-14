// // // Import Firebase SDK yang diperlukan
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyARJiIBaTba3qMzGOQ4kO_CsxDsEv3Sdjg",
    authDomain: "classworkfp.firebaseapp.com",
    projectId: "classworkfp",
    storageBucket: "classworkfp.firebasestorage.app",
    messagingSenderId: "666110474342",
    appId: "1:666110474342:web:fa310efb840ca10a98d5a7",
    measurementId: "G-ES1V3NCB4F"
  };

// // // Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);

// // // Mendapatkan referensi untuk Firebase Authentication dan Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

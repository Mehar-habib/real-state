// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-6f06c.firebaseapp.com",
  projectId: "mern-real-estate-6f06c",
  storageBucket: "mern-real-estate-6f06c.appspot.com",
  messagingSenderId: "624854093129",
  appId: "1:624854093129:web:e2f4de6a3609904e5b9e98",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

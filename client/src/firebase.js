// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9976e.firebaseapp.com",
  projectId: "mern-estate-9976e",
  storageBucket: "mern-estate-9976e.appspot.com",
  messagingSenderId: "496410625921",
  appId: "1:496410625921:web:3b468675ad89a947204a80",
  measurementId: "G-EB60DZ64FW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

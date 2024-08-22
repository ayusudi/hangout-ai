
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hangout-ai-ca0ef.firebaseapp.com",
  projectId: "hangout-ai-ca0ef",
  storageBucket: "hangout-ai-ca0ef.appspot.com",
  messagingSenderId: "306627337132",
  appId: "1:306627337132:web:3bf30069d4a7124ceab809",
  measurementId: "G-V0XK7DX50D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
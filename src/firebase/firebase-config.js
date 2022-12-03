import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD5tUTATxNLhDSiGPB4aRP92DuUbQjYYTQ",
  authDomain: "monkey-blogging-3a153.firebaseapp.com",
  projectId: "monkey-blogging-3a153",
  storageBucket: "monkey-blogging-3a153.appspot.com",
  messagingSenderId: "337042375331",
  appId: "1:337042375331:web:bc8957c297279a464b7516",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//database
export const db = getFirestore(app);
//Registe, login, logout
export const auth = getAuth(app);

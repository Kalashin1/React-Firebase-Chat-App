// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr_QvkD5qL-txmNniZbj6JsphGkHrN588",
  authDomain: "chat-app-5cad7.firebaseapp.com",
  projectId: "chat-app-5cad7",
  storageBucket: "chat-app-5cad7.firebasestorage.app",
  messagingSenderId: "914676085295",
  appId: "1:914676085295:web:d06dcb94c0d07b88fb0cda",
  measurementId: "G-GB9C9FPF17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
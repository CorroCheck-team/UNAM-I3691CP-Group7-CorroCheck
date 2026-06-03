// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw2SQIDXK58Z_pVQeyJlI0V9cCLsvG8Xg",
  authDomain: "corrocheck.firebaseapp.com",
  projectId: "corrocheck",
  storageBucket: "corrocheck.firebasestorage.app",
  messagingSenderId: "826588042607",
  appId: "1:826588042607:web:597494f669d6d6fa26849a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

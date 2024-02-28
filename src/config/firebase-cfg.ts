// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVDNEOz1akaDfd7XTZDztiebbXGNFzRzI",
  authDomain: "connectx-322be.firebaseapp.com",
  projectId: "connectx-322be",
  storageBucket: "connectx-322be.appspot.com",
  messagingSenderId: "276923841290",
  appId: "1:276923841290:web:fc973599fd2feb1791d8f3",
  measurementId: "G-87HQ2D682W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

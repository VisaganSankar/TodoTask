import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
const firebaseConfig ={
  apiKey: "AIzaSyCD_yh4GYCil1899lvyIVKjkm20kKK06O4",
  authDomain: "todoapp-7d63a.firebaseapp.com",
  projectId: "todoapp-7d63a",
  storageBucket: "todoapp-7d63a.firebasestorage.app",
  messagingSenderId: "230830045635",
  appId: "1:230830045635:web:53f399818b7ac5f1cde576",
  measurementId: "G-W0HD1Z15NN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

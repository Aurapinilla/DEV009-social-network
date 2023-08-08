// Create an app in firebase
import { initializeApp } from 'firebase/app';
// 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
// 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { getFirestore } from 'firebase/firestore';
// 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAbN7KpqnNUL5sYV3vhTNsjEoE82BoeKn8',
  authDomain: 'traveltribe-27207.firebaseapp.com',
  projectId: 'traveltribe-27207',
  storageBucket: 'traveltribe-27207.appspot.com',
  messagingSenderId: '1052926937510',
  appId: '1:1052926937510:web:d5ade6f96d24f9caa9a767',
  measurementId: 'G-12FDLTCW02',

});

const auth = getAuth();
const db = getFirestore();

// Detect state of authentication
onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log('Logged in!');
  } else {
    console.log('No user');
  }
});

export {
  auth,
  db,
  firebaseApp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
}

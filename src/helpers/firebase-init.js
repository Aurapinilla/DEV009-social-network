// Create an app in firebase
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  // onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Project Credentials
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
/* onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log('Logged in!');
  } else {
    console.log('No user');
  }
}); */

// Add users to FireStore
function saveUsers(nameVal, userVal, emailVal, passwordVal) {
  addDoc(collection(db, 'Users'), {
    Name: nameVal,
    User: userVal,
    Email: emailVal,
    Password: passwordVal,
  });
}

//Add/ save posts
// Agregar el usuario y fecha de publicacion
function publishPost(titleInput, locationInput, contentInput) {
  addDoc(collection(db, 'Posts'), {
    Title: titleInput,
    Location: locationInput,
    Content: contentInput,    
  });
}

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
  saveUsers,
  publishPost,
};

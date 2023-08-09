// aqui exportaras las funciones que necesites
import { AuthErrorCodes } from 'firebase/auth';

import {
  auth,
  // db,
  // firebaseApp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  // sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
}
  from '../helpers/firebase-init';

function showMessage(message) {
  messageContainer.innerText = message;
  messageContainer.style.display = 'block';
}
  
function hideMessage() {
  messageContainer.style.display = 'none';
}

function authErrors(error) {
  const errorCode = error.code;
  
  if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
   showMessage('This email is already registered.');
  } else if (errorCode === AuthErrorCodes.INVALID_PASSWORD) {
    showMessage('Wrong password. Please try again.');
  } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
    showMessage('Invalid email. Please type a valid email address.');
  } else {
    console.error(error);
  }
}

function newUser(name, userImput, email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user); // Signed in

        resolve(sendEmailVerification(auth.currentUser));
      })
      .catch((error) => {
        authErrors(error);
        reject(error);
      });
  });
}

function userLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const loggedInUser = userCredential.user;
      console.log(loggedInUser);

      if (!loggedInUser.emailVerified) {
        showMessage('Email has not been verified yet. Please check your inbox.');
        return false;
      }

      return true;
    })
    .catch((error) => {
      authErrors(error);
      reject(error);
    });
}

function googleAuth() {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
}

function logOut() {
  return new Promise((resolve, reject) => {
    auth.signOut()
      .then(() => {
        console.log('User signed out.');
        resolve();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);

        reject(error);
      });
  });
}

export {
  newUser,
  userLogin,
  googleAuth,
  logOut,
  showMessage,
  hideMessage,
  authErrors,
};

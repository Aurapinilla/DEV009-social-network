// aqui exportaras las funciones que necesites
import { AuthErrorCodes } from 'firebase/auth';

import {
  auth,
  db,
  firebaseApp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
}
  from '../helpers/firebase-init';

function newUser(name, user, email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user); // Signed in

        resolve(sendEmailVerification(auth.currentUser));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);

        if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
          window.alert('This email is already registered.');
        }

        reject(error);
      });
  });
};


async function userLogin(email, password) {
  try {
    const user = auth.currentUser;
    if (!user.emailVerified) {
      window.alert('Email has not been verified yet.');
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      console.log(loggedInUser);
      return true;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode + errorMessage);

    if (errorCode === AuthErrorCodes.INVALID_PASSWORD) {
      window.alert('Wrong password. Please try again.');
    }

    return false;
  }
};


function googleAuth() {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};

export {
  newUser,
  userLogin,
  googleAuth
}
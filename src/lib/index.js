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
}
  from '../helpers/firebase-init';

function newUser(name, userName, email, password) {
  //PROMESA PARA RECHAZAR SI YA EXISTE EL EMAIL Y/O USUARIO
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);//Signed in

        return sendEmailVerification(auth.currentUser);
      })
      .then(window.alert('Email verification sent to ' + email))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);
      });
  })
  //Debe generar el error y no permitir registro y login si el email o usuario ya existen
};


async function userLogin(email, password) {
  let errorCode, errorMessage; // Definir las variables al inicio

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
    errorCode = error.code;
    errorMessage = error.message;
    console.error(errorCode + errorMessage);

    if (errorCode === AuthErrorCodes.INVALID_PASSWORD) {
      window.alert('Wrong password. Please try again.');
    }

    return false;
  }
};

export {
  newUser,
  userLogin,
}
// aqui exportaras las funciones que necesites
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);

        return sendEmailVerification(auth.currentUser);
      })
      .then(window.alert('Email verification sent to ' + email))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);
      });
};

export {
  newUser,
}
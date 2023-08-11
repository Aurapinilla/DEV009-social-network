// eslint-disable-next-line import/no-cycle
import { showRegMessage } from '../components/register';
// eslint-disable-next-line import/no-cycle
import { showLogMessage } from '../components/login';
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
} from '../helpers/firebase-init';

/* function showMessage(message, containerId) {
   console.log(message);
  const messageContainer = document.getElementById(containerId);
  messageContainer.innerText = message;
  messageContainer.style.display = 'block';
} */

/* function authErrors(error, containerId) {
  let errorMessage = '';
   console.log(error);
   console.log('ERROR.CODE', error.code);
  if (error.code === 'auth/wrong-password') {
    errorMessage = 'Wrong password. Please try again.';
  } else if (error.code === 'auth/missing-password') {
    errorMessage = 'Please provide your password.';
  } else if (error.code === 'auth/invalid-email') {
    errorMessage = 'Invalid email. Please type a valid email address.';
  } else {
    errorMessage = error;
  }
   console.log(errorMessage);
  showMessage(errorMessage, containerId);
} */

function newUser(name, userImput, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      const message = `Email verification sent to ${email}`;
      console.log('mensaje?', message);
      return { success: true, message: message };
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        const message = 'This email is already registered.';
        return { success: false, error: message };
        // console.log('ERROR.CODE2', error.code);
        // console.log(errorMessage);
      } else {
        const message = error;
        return { success: false, error: message };
      }
    //  throw authErrors(error, 'messageContainer');
    });
}

function userLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const loggedInUser = userCredential.user;

      if (!loggedInUser.emailVerified) {
        const errorMessage = 'Email has not been verified yet. Please check your inbox.';
        return { success: false, error: errorMessage };
      }
      return { success: true };
    })
    .catch((error) => {
      let errorMessage = '';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Wrong password. Please try again.';
      } else if (error.code === 'auth/missing-password') {
        errorMessage = 'Please provide your password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email. Please type a valid email address.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'This account does not exist. Please register.';
      } else {
        errorMessage = error;
      }
      return { success: false, error: errorMessage };
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
        // console.log('User signed out.');
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export {
  newUser,
  userLogin,
  googleAuth,
  logOut,
};

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

function showMessage(message, containerId) {
  // console.log(message);
  const messageContainer = document.getElementById(containerId);
  messageContainer.innerText = message;
  messageContainer.style.display = 'block';
}

function authErrors(error, containerId) {
  let errorMessage = '';
  // console.log(error);
  // console.log('ERROR.CODE', error.code);
  if (error.code === 'auth/email-already-in-use') {
    // console.log('ERROR.CODE2', error.code);
    errorMessage = 'This email is already registered.';
    // console.log(errorMessage);
  } else if (error.code === 'auth/user-not-found') {
    errorMessage = 'This account does not exist. Please register.';
  } else if (error.code === 'auth/wrong-password') {
    errorMessage = 'Wrong password. Please try again.';
  } else if (error.code === 'auth/missing-password') {
    errorMessage = 'Please provide your password.';
  } else if (error.code === 'auth/invalid-email') {
    errorMessage = 'Invalid email. Please type a valid email address.';
  } else {
    errorMessage = error;
  }
  // console.log(errorMessage);
  showMessage(errorMessage, containerId);
}

function newUser(name, userImput, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      const message = `Email verification sent to ${email}`;
      authErrors(message, 'messageContainer');

      return sendEmailVerification(auth.currentUser);
    })
    .then(() => true)
    .catch((error) => {
      throw authErrors(error, 'messageContainer');
    });
}

function userLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const loggedInUser = userCredential.user;

      if (!loggedInUser.emailVerified) {
        const errorMessage = 'Email has not been verified yet. Please check your inbox.';
        throw showMessage(errorMessage, 'messageContainerl');
      }
      return true;
    })
    .catch((error) => {
      throw authErrors(error, 'messageContainerl');
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
        reject(authErrors(error));
      });
  });
}

export {
  newUser,
  userLogin,
  googleAuth,
  logOut,
  showMessage,
  authErrors,
};

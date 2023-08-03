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
    //Debe generar el error y no permitir registro y login si el email o usuario ya existen
};

function signIn(email, password) {
  const user = auth.currentUser;
  if (!user.emailVerified) {
    window.alert('Email has not been verified yet.');
    //error si el usuario no existe aun
    //error si el email está en formto incorrecto o vacio
    //error si la contraseña no es correcta
    //falta ocultar contraseña al escribirla
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode + errorMessage);
      });
  }

}

export {
  newUser,
  signIn,
}
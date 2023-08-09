import { newUser, userLogin, logOut, authErrors } from '../src/lib/index';
import { auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '../src/helpers/firebase-init';

jest.mock('../src/helpers/firebase-init', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  auth: {
    currentUser: {},
    signOut: jest.fn(),
  },
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: {}
}));

describe('newUser', () => {
  it('should create a new user and send email verification', () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: { email: 'email@example.com', password: 'password123' } });
    sendEmailVerification.mockResolvedValue();

    return newUser('email@example.com', 'password123').then(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(sendEmailVerification).toHaveBeenCalledTimes(1);
    });
  });
});

describe('newUser', () => {
  it('should allow an user to sign in', () => {
    signInWithEmailAndPassword.mockResolvedValue({ user: { email: 'email@example.com', password: 'password123' } });

    return userLogin('email@example.com', 'password123').then(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });
});

/* describe('googleAuth', () => {
  it('should call signInWithPopup with the GoogleAuthProvider', () => {
    const googleProvider = new GoogleAuthProvider();

    googleAuth();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(expect.any(Object), googleProvider);
  });
}); */

describe('logOut', () => {
  it('should call signOut function and resolve', () => {
    // Configurar el mock de signOut para resolver
    auth.signOut.mockResolvedValue();

    // Llamar a la función y usar then para manejar la promesa
    return logOut().then(() => {
      // Asegurarse de que la función se haya llamado
      expect(auth.signOut).toHaveBeenCalledTimes(1);
      console.log('User signed out.');
    });
  });
});
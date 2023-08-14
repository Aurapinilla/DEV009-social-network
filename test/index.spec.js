import {
  newUser,
  userLogin,
  logOut,
  googleAuth,
} from '../src/lib/index';

import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '../src/helpers/firebase-init';

jest.mock('../src/helpers/firebase-init');

describe('newUser', () => {
  it('should create a new user and send email verification', () => {
    const fakeContainer = {
      innerText: '',
      style: { display: '' },
    };

    createUserWithEmailAndPassword.mockResolvedValue({
      user: { email: 'email@example.com', password: 'password123' },
    });
    sendEmailVerification.mockResolvedValue();
    return newUser('Juan', 'Juan123', 'juan@correo.com', 'password123', fakeContainer)
      .then((result) => {
        expect(result).toEqual({
          "message": "Email verification sent to juan@correo.com", "success": true
        });
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'juan@correo.com', 'password123');
        expect(sendEmailVerification).toHaveBeenCalledTimes(1);
      });
  });
});

describe('userLogin', () => {
  it('should allow an user to sign in', () => {
    signInWithEmailAndPassword.mockResolvedValue({ user: { email: 'email@example.com', password: 'password123' } });

    return userLogin('email@example.com', 'password123').then(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });
});

describe('googleAuth', () => {
  it('should call signInWithPopup with the GoogleAuthProvider', () => {
    googleAuth()
      const googleProvider = new GoogleAuthProvider();

      expect(signInWithPopup).toHaveBeenCalledTimes(1);
      return signInWithPopup(auth, googleProvider)
  })
});

describe('logOut', () => {
  it('should call signOut function and resolve', () => {
    auth.signOut.mockResolvedValue();

    return logOut().then(() => {
      expect(auth.signOut).toHaveBeenCalledTimes(1);
    });
  });
});

// Test de las navegaciones de pagina

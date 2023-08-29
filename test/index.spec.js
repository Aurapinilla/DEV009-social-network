import {
  newUser,
  userLogin,
  logOut,
  googleAuth,
  publishPost,
  likePosts,
  deletePost,
} from '../src/lib/index';

import {
  doc,
  getDoc,
  auth,
  db,
  addDoc,
  collection,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  deleteDoc,
  updateDoc,
} from '../src/helpers/firebase-init';

jest.mock('../src/helpers/firebase-init');

describe('newUser', () => {
  it('should create a new user and send email verification', () => {
    const userContainer = {
      innerText: '',
      style: { display: '' },
    };

    createUserWithEmailAndPassword.mockResolvedValue({
      user: { email: 'email@example.com', password: 'password123' },
    });
    sendEmailVerification.mockResolvedValue();
    return newUser('Juan', 'Juan123', 'juan@correo.com', 'password123', userContainer)
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

describe('publishPost', () => {
  it('should create a post in firestore', async () => {
   const userId = 'Juan12';
   const author = 'Juan Gomez';
   const location = 'Italia';
   const title = 'Title';
   const content = 'content';
   const date = '24/10/2023';

   const postData = {
    userId,
    author,
    location,
    date,
    title,
    content,
    likesArr: [],
    likesCount: 0,
  };

    await publishPost(userId, author, location, date, title, content);

    expect(addDoc).toHaveBeenCalledWith(collection(db, 'Posts'), postData);
  });
});

describe('likePosts', () => {
  const postId = 'fakePostId';
  const userUid = 'fakeUserId';

  it('should allow user to add a like to a post', async () => {
    let likesCounting = 0;
    let likesArray = {};

    const postDocData = {
      likesCount: likesCounting,
      likesArr: likesArray,
    };

    const postRef = doc(db, 'Posts', postId);
    const postDoc = {
      exists: jest.fn(() => true),
      data: jest.fn(() => postDocData),
    };

    getDoc.mockResolvedValue(postDoc);
    auth.currentUser = {
      uid: userUid,
    };

    await likePosts(postId);

    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(postRef, {
      [`likesArr.${userUid}`]: true,
      likesCount: likesCounting + 1,
    });
  });
});

describe('deletePost', () => {
  it('should call deleteDoc with the correct arguments', async () => {
    const postId = 'Post#1';

    await deletePost(postId);

    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(doc(db, "Posts", postId));
  });
});

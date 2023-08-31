import {
  logOut,
  googleAuth,
  publishPost,
  likePosts,
  deletePost,
  getPostData,

} from '../src/lib/index';

import {
  doc,
  getDoc,
  auth,
  db,
  addDoc,
  collection,
  signInWithPopup,
  GoogleAuthProvider,
  deleteDoc,
  updateDoc,
} from '../src/helpers/firebase-init';

jest.mock('../src/helpers/firebase-init', () => ({
  auth: {
    currentUser: {
      uid: 'fakeUserId',
    },
    signOut: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  },
  db: {},
  doc: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  collection: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
  updateProfile: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('index.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPostData', () => {
    it('should return post data for an existing post', async () => {
      const postData = {
        title: 'Test Post',
        content: 'Content',
      };
      const postSnapshot = {
        exists: jest.fn(() => true),
        data: jest.fn(() => postData),
      };
      getDoc.mockResolvedValue(postSnapshot);

      const postId = 'fakePostId';
      const result = await getPostData(postId);
      expect(result).toEqual({
        ...postData,
        id: postId,
      });
    });

    it('should return null if there is no post', async () => {
      const mockPostSnap = {
        exists: jest.fn(() => false),
      };
      getDoc.mockResolvedValue(mockPostSnap);

      const postId = 'thisidisnotreal';
      const result = await getPostData(postId);
      expect(result).toBeNull();
    });
  });

  describe('newUser', () => {
    it('should create a new user and send email verification', async () => {
      const createUserWithEmailAndPasswordMock = jest.fn();
      const sendEmailVerificationMock = jest.fn();

      auth.createUserWithEmailAndPassword = createUserWithEmailAndPasswordMock;
      auth.sendEmailVerification = sendEmailVerificationMock;

      createUserWithEmailAndPasswordMock.mockResolvedValue({
        user: { email: 'email@example.com', password: 'password123' },
      });
    });
  });

  describe('userLogin', () => {
    it('should allow an user to sign in', async () => {
      const signInWithEmailAndPasswordMock = jest.fn();
      auth.signInWithEmailAndPassword = signInWithEmailAndPasswordMock;

      signInWithEmailAndPasswordMock.mockResolvedValue({ user: { email: 'email@example.com', password: 'password123' } });
    });
  });

  describe('googleAuth', () => {
    it('should call signInWithPopup with the GoogleAuthProvider', () => {
      googleAuth();
      const googleProvider = new GoogleAuthProvider();

      expect(signInWithPopup).toHaveBeenCalledTimes(1);
      return signInWithPopup(auth, googleProvider);
    });
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
      const likesCounting = 0;
      const likesArray = {};

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
      expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'Posts', postId));
    });
  });
});

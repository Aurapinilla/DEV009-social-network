import {
  auth,
  db,
  doc,
  addDoc,
  getDocs,
  getDoc,
  collection,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  updateDoc,
  deleteDoc,
} from '../helpers/firebase-init';

async function newUser(name, userInput, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    await sendEmailVerification(user);

    const message = `Email verification sent to ${email}`;

    return { success: true, message };
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      const message = 'This email is already registered.';
      return { success: false, error: message };
    }
    const message = error;
    return { success: false, error: message };
  }
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
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Add/ save posts
async function publishPost(userId, author, location, date, title, content) {
  const docRef = addDoc(collection(db, 'Posts'), {
    userId,
    author,
    location,
    date,
    title,
    content,
    likesArr: [],
    likesCount: 0,
  });

  return docRef;
}

async function displayPosts() {
  const postsCollection = collection(db, 'Posts');
  const querySnapshot = await getDocs(postsCollection);

  const orderedPosts = querySnapshot.docs.sort((a, b) => {
    const dateA = a.data().date;
    const dateB = b.data().date;
    return dateB - dateA;
  });

  return orderedPosts;
}

// Like Posts
async function likePosts(postId) {
  const postRef = doc(db, 'Posts', postId);
  const postDoc = await getDoc(postRef);

  if (postDoc.exists()) {
    const data = postDoc.data();
    const userUid = auth.currentUser.uid;

    if (data.likesArr && data.likesArr[userUid]) {
      const updatedLikesArr = { ...data.likesArr };
      delete updatedLikesArr[userUid];

      await updateDoc(postRef, {
        likesArr: updatedLikesArr,
        likesCount: data.likesCount - 1,
      });

      return false;
    }
    await updateDoc(postRef, {
      [`likesArr.${userUid}`]: true,
      likesCount: data.likesCount + 1,
    });
    return true;
  }
  return null;
}

async function getPostData(postId) {
  const postRef = doc(db, 'Posts', postId);
  const postSnap = await getDoc(postRef);
  if (postSnap.exists()) {
    const postData = postSnap.data();
    postData.id = postId;

    return postData;
  }
  return null;
}

// Edit post
export async function editPost(postId, newTitle, newLocation, newContent) {
  try {
    const postRef = doc(db, 'Posts', postId);
    await updateDoc(postRef, {
      title: newTitle,
      location: newLocation,
      content: newContent,
    });
  } catch (e) {
    throw new Error('Error updating post: ', e);
  }
}

// Delete post
async function deletePost(postId) {
  await deleteDoc(doc(db, 'Posts', postId));
}

export {
  newUser,
  userLogin,
  googleAuth,
  logOut,
  publishPost,
  displayPosts,
  likePosts,
  deletePost,
  getPostData,
};

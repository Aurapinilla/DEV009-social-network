import { logOut, publishPost, displayPosts, likePosts, newUser, userLogin} from '../lib/index';

import { auth, serverTimestamp, doc, getDoc, db, collection,} from '../helpers/firebase-init';

function createPost(navigateTo) {

    const postSection = document.createElement('section');
    postSection.classList.add('post-section');

    const upperMenu = document.createElement('div');
    upperMenu.classList.add('upperMenu');
  
    const logoMenu = document.createElement('img');
    logoMenu.setAttribute('src', './assets/logo TravelTribe.png');
    logoMenu.classList.add('logo-menu');
  
    const userProfile = document.createElement('i');
    userProfile.setAttribute('class', 'fa-solid fa-circle-user');
    userProfile.classList.add('user-profile', 'icons');
  
    const logOutBtn = document.createElement('i');
    logOutBtn.setAttribute('class', 'fa-solid fa-right-from-bracket');
    logOutBtn.classList.add('logout-btn', 'icons');
    logOutBtn.type = 'button';
    logOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
  
      logOut()
        .then(() => {
          navigateTo('/');
        })
        .catch((error) => {
          throw error;
        });
    });
  
    const rightMenu = document.createElement('div');
    rightMenu.classList.add('right-menu');
  
    rightMenu.append(userProfile, logOutBtn);
    upperMenu.append(logoMenu, rightMenu);

    const cancelBtn = document.createElement('i');
    cancelBtn.setAttribute('class', 'fa-solid fa-square-xmark');
    cancelBtn.classList.add('cancel-post', 'icons');
    cancelBtn.type = 'button';
    cancelBtn.addEventListener('click', () => {
        navigateTo('/feed');
    })

    const title = document.createElement('h2');
    title.textContent = 'Create Post';
    title.classList.add('createpost-title');

    const upperDiv = document.createElement('div');
    upperDiv.classList.add('newpost-upperdiv');
    upperDiv.append(cancelBtn, title);

    const postTitle = document.createElement('h4');
    postTitle.innerText = 'Title';
    postTitle.classList.add('newpost-headings');

    const titleInput = document.createElement('input');
    titleInput.classList.add('newpost-inputs');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('newpost-title');
    titleDiv.append(postTitle, titleInput);

    const location = document.createElement('h4');
    location.innerText = 'Location';
    location.classList.add('newpost-headings');

    const locationInput = document.createElement('input');
    locationInput.classList.add('newpost-inputs');

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('newpost-location');
    locationDiv.append(location, locationInput);

    const content = document.createElement('h4');
    content.innerText = 'Content';
    content.classList.add('newpost-headings');

    const contentInput = document.createElement('textarea');
    contentInput.classList.add('newpost-inputs', 'post-content');
    contentInput.placeholder = 'Ask/Share your experience, recommendation, etc.';

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('newpost-content');
    contentDiv.append(content, contentInput);    

    const postBtn = document.createElement('button');
    postBtn.textContent = 'Upload';
    postBtn.type = 'submit';
    postBtn.classList.add('newpost-upload-btn', 'buttons');

    const postForm = document.createElement('form');
    postForm.classList.add('newpost-form');
    postForm.append(titleDiv, locationDiv, contentDiv, postBtn);
    
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
      
        const user = auth.currentUser;
      if(user) {

          const userId = user.uid;
          const author = user.displayName;
          const location = locationInput.value;
          const date = serverTimestamp();
          const title = titleInput.value;
          const content = contentInput.value;
          const likes = likePosts();

          const userDocRef = await doc(db, 'Users', user.email);
          console.log('userDocRef', userDocRef);
          console.log('current user', auth.currentUser);
          console.log('user', user);
          const userDocSnap = await getDoc(userDocRef);
          console.log('userDocSnap', userDocSnap);
    

          const anyFieldIsEmpty = !title || !location || !content;
      
          if (anyFieldIsEmpty) {
            console.log('Empty fields');
            alert('One or more fields are empty');
          } else {
            try {
              console.log('post created');
              await publishPost(userId, author, location, date, title, content, likes);
              console.log('username', author);
              await displayPosts();
              navigateTo('/feed');
            } catch (error) {
              console.error('Error creating post:', error);
            }
          }
        } else {
            console.log('User not authenticated');
            // Aquí puedes manejar el caso donde el usuario no está autenticado
          }
      });

    postSection.append(upperMenu, upperDiv, postForm);
    return postSection;
}

export default createPost;

import {
  displayPosts,
  likePosts,
  deletePost,
  logOut,
  editPost,
  getPostData,
} from '../lib/index';

import {
  auth, doc, db, onSnapshot, getDoc,
} from '../helpers/firebase-init';

function confirmDeletePost(postId) {
  const deleteMessage = document.getElementById('deleteContainer');
  deleteMessage.dataset.postId = postId;
  deleteMessage.style.display = 'block';
}

function feed(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('main-container');

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

  const searchBar = document.createElement('input');
  searchBar.placeholder = 'Destination or keyword...';
  searchBar.classList.add('search-bar');

  const title = document.createElement('h2');
  title.textContent = 'Latest Experiences!';
  title.classList.add('feed-title');

  const upperSection = document.createElement('div');
  upperSection.classList.add('upper-section');
  upperSection.append(searchBar, title);

  const postsContainer = document.createElement('div');
  postsContainer.id = 'postsContainer';
  postsContainer.classList.add('post-container');

  // Add posts to html
  async function generatePostsHTML(postsData, userLikes) {
    const postHTMLArray = postsData.map((post) => {
      const userLiked = userLikes[post.id];
      const numLikes = post.likesCount;

      return `
        <div class="post">
          <div class="post-header">
            <div class="author-location">
              <p>Author: ${post.author}</p>
              <div class="post-location">
                <i class="fa-solid fa-map-pin"></i>
                <p>${post.location}</p>
              </div>
            </div>
            <p>${post.date.toDate().toLocaleDateString()}</p>
          </div>
          <h4>${post.title}</h4>
          <p>${post.content}</p>
          <div class= "post-settings">
            <div class= "edit-delete-post" id= "editDeletePost">
              <i class="fa-solid fa-trash-can post-icons" data-postid="${post.id}"></i>
              <i class="fa-solid fa-pen post-icons" data-postid="${post.id}"></i>
            </div>
            <div class="like-post">
              <i class="post-icons fa-solid fa-heart ${userLiked ? 'user-liked' : ''}" data-postid="${post.id}"></i>
              <span class="likes-count post-icons" id="likes-count-${post.id}">${numLikes}</span>
            </div>
          </div>  
        </div>
      `;
    });
    postsContainer.innerHTML = postHTMLArray.join('');

    // Los íconos editar/eliminar solo los ve el usuario que posteó
    postsData.forEach(async (post) => {
      const editPostBtns = postsContainer.querySelectorAll(`.fa-pen[data-postid="${post.id}"]`);
      const deletePostBtns = postsContainer.querySelectorAll(`.fa-trash-can[data-postid="${post.id}"]`);

      const postRef = doc(db, 'Posts', post.id);
      const docSnapshot = await getDoc(postRef);
      const postData = docSnapshot.data();
      const loggedUser = auth.currentUser.uid;

      if (loggedUser !== postData.userId) {
        editPostBtns.forEach((editIcon) => {
          editIcon.style.display = 'none';
        });

        deletePostBtns.forEach((deleteIcon) => {
          deleteIcon.style.display = 'none';
        });
      }
    });

    // Delete post
    postsData.forEach((post) => {
      const deleteIcons = postsContainer.querySelectorAll(`.fa-trash-can[data-postid="${post.id}"]`);

      deleteIcons.forEach((icon) => {
        const postId = icon.getAttribute('data-postid');
        icon.addEventListener('click', async () => {
          confirmDeletePost(postId);
        });
      });
    });

    // Formulario de edición
    function createEditForm(postData) {
      const editForm = document.createElement('form');
      editForm.id = 'editForm';
      editForm.classList.add('edit-post-form');

      const cancelBtn = document.createElement('i');
      cancelBtn.setAttribute('class', 'fa-solid fa-square-xmark post-icons');
      cancelBtn.classList.add('cancel-post', 'icons');
      cancelBtn.type = 'button';
      cancelBtn.addEventListener('click', () => {
        navigateTo('/feed');
      });

      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.innerHTML = postData.title;
      titleInput.classList.add('newpost-inputs', 'edit-title');

      const locationInput = document.createElement('input');
      locationInput.type = 'text';
      locationInput.innerHTML = postData.location;
      locationInput.classList.add('newpost-inputs', 'edit-location');

      const contentTextarea = document.createElement('textarea');
      contentTextarea.innerHTML = postData.content;
      contentTextarea.classList.add('newpost-inputs', 'post-content');

      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update Post';
      updateButton.type = 'button';
      updateButton.classList.add('updatePost-Btn', 'buttons');

      updateButton.addEventListener('click', async () => {
        const newTitle = titleInput.value;
        const newLocation = locationInput.value;
        const newContent = contentTextarea.value;

        await editPost(postData.id, newTitle, newLocation, newContent);
        postContainer();
      });

      editForm.append(cancelBtn, titleInput, locationInput, contentTextarea, updateButton);

      return editForm;
    }

    // Al hacer clic en el ícono de editar
    async function handleEditIconClick(icon) {
      const postId = icon.getAttribute('data-postid');
      const postData = await getPostData(postId);

      if (postData) {
        const editForm = createEditForm(postData);
        editForm.style.display = 'block';

        const postElement = icon.closest('.post');
        const postContent = postElement.innerHTML;
        const editPostContainer = document.createElement('div');
        editPostContainer.classList.add('editpost-container');

        if (postContent) {
          editPostContainer.innerHTML = postContent;

          postElement.innerHTML = '';

          editPostContainer.appendChild(editForm);

          postElement.appendChild(editPostContainer);

          const titleInput = editForm.querySelector('.edit-title');
          const locationInput = editForm.querySelector('.edit-location');
          const contentTextarea = editForm.querySelector('.post-content');

          titleInput.value = postData.title;
          locationInput.value = postData.location;
          contentTextarea.innerHTML = postData.content;
        }
      }
    }

    // Agregar evento de clic a los íconos de edición
    const editIcons = document.querySelectorAll('.fa-pen');
    editIcons.forEach((icon) => {
      icon.addEventListener('click', () => {
        handleEditIconClick(icon);
      });
    });

    // Like post
    const likeBtns = postsContainer.querySelectorAll('.fa-solid.fa-heart');
    likeBtns.forEach(async (icon) => {
      const postId = icon.getAttribute('data-postid');
      const postRef = doc(db, 'Posts', postId);

      const docSnapshot = await getDoc(postRef);
      const postData = docSnapshot.data();
      const loggedUser = auth.currentUser.uid;

      if (postData.likesArr && postData.likesArr[loggedUser]) {
        icon.style.color = 'red';
      }

      icon.addEventListener('click', async () => {
        const userLiked = await likePosts(postId);

        if (userLiked) {
          icon.style.color = 'red';
        } else {
          icon.style.color = '#2F4554';
        }
      });
    });

    postsData.forEach((post) => {
      const postRef = doc(db, 'Posts', post.id);
      onSnapshot(postRef, (snapshot) => {
        const updatedLikesCount = snapshot.data().likesCount;
        const likesCountSpan = document.getElementById(`likes-count-${post.id}`);
        likesCountSpan.textContent = updatedLikesCount.toString();
      });
    });
  }

  async function postContainer() {
    try {
      const postsSnapshot = await displayPosts();

      const postsData = [];
      const userLikes = {};

      postsSnapshot.forEach((docData) => {
        const post = docData.data();
        post.id = docData.id;
        postsData.push(post);

        if (post.likesArr && post.likesArr[auth.currentUser.uid]) {
          userLikes[post.id] = true;
        }
      });

      generatePostsHTML(postsData, userLikes);
    } catch (error) {
      throw new Error('Error generating posts:', error);
    }
  }

  const bottomMenu = document.createElement('div');
  bottomMenu.classList.add('bottom-menu');

  const homeBtn = document.createElement('i');
  homeBtn.setAttribute('class', 'fa-solid fa-house');
  homeBtn.classList.add('home-btn', 'icons');
  homeBtn.addEventListener('click', () => {
    navigateTo('/feed');
  });

  const newPost = document.createElement('i');
  newPost.setAttribute('class', 'fa-solid fa-square-plus');
  newPost.classList.add('post-btn', 'icons');
  newPost.addEventListener('click', () => {
    navigateTo('/createpost');
  });

  const calendar = document.createElement('div');
  calendar.setAttribute('class', 'fa-solid fa-calendar-days');
  calendar.classList.add('calendar-btn', 'icons');

  bottomMenu.append(homeBtn, newPost, calendar);

  // Delete confirmation message
  const confirmDelete = document.createElement('div');
  confirmDelete.id = 'deleteContainer';
  confirmDelete.classList.add('delete-confirmation', 'message-container');

  const confirmMessage = document.createElement('p');
  confirmMessage.textContent = 'Are you sure you want to delete this post?';

  const confirmDeleteBtn = document.createElement('button');
  confirmDeleteBtn.classList.add('confirm-deletepost');
  confirmDeleteBtn.textContent = 'Yes';

  // Delete post when click "Yes"
  confirmDeleteBtn.addEventListener('click', async () => {
    const postId = confirmDeleteBtn.closest('.delete-confirmation').dataset.postId;

    await deletePost(postId);
    postContainer();

    const deleteMessage = document.getElementById('deleteContainer');
    deleteMessage.style.display = 'none';
  });

  const cancelDeleteBtn = document.createElement('button');
  cancelDeleteBtn.classList.add('confirm-deletepost');
  cancelDeleteBtn.textContent = 'No';
  // Cancel the delete of post
  cancelDeleteBtn.addEventListener('click', () => {
    confirmDelete.style.display = 'none';
  });

  confirmDelete.append(confirmMessage, confirmDeleteBtn, cancelDeleteBtn);

  section.append(upperMenu, upperSection, postsContainer, bottomMenu, confirmDelete);
  postContainer();

  return section;
}

export default feed;

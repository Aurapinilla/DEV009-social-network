import {
  displayPosts,
  likePosts,
  deletePost,
  logOut,
  editPost,
  updatePostInFirestore,
  getPostData,
} from '../lib/index';
import { auth, doc, db, onSnapshot, getDoc } from '../helpers/firebase-init';

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

  //Adding posts
  async function postContainer() {
    try {
      const postsSnapshot = await displayPosts();
      console.log('postsnapshots', postsSnapshot);
      const postsData = [];
      const userLikes = {};
      
      postsSnapshot.forEach((doc) => {
        const post = doc.data();
        post.id = doc.id;
        postsData.push(post);

        if (post.likesArr && post.likesArr[auth.currentUser.uid]) {
          userLikes[post.id] = true;
        }
      });
      
      generatePostsHTML(postsData, userLikes);
    } catch (error) {
      console.error('Error generating posts:', error);
    }
  };
  postContainer();

  //REVISAR FUNCION => ERROR EN CONSOLA CON LA FECHA
  async function generatePostsHTML(postsData, userLikes) {
    let html = '';
  
    for (const post of postsData) {
  
      const userLiked = userLikes[post.id];
      const numLikes = post.likesCount;
      console.log('initiallikes', numLikes);
      
      html += `
        <div class="post">
          <div class="post-header">
            <div class="author-location">
              <p>Author: ${post.author}</p>
              <div class="post-location">
                <i class="fa-solid fa-map-pin"></i>
                <p>${post.location}</p>
              </div>
            </div>
            <p>${post.date}</p>
          </div>
          <h4>${post.title}</h4>
          <p>${post.content}</p>
          <div class= "post-settings">
            <div class= "edit-delete-post" id= "editDeletePost">
              <i class="fa-solid fa-trash-can" data-postid="${post.id}"></i>
              <i class="fa-solid fa-pen" data-postid="${post.id}"></i>
            </div>
            <div class="like-post">
              <i class="fa-solid fa-heart ${userLiked ? 'user-liked' : ''}" data-postid="${post.id}"></i>
              <span class="likes-count" id="likes-count-${post.id}">${numLikes}</span>
            </div>
          </div>  
        </div>
      `;
      console.log('date', post.date);
    };
    postsContainer.innerHTML = html;

  // Los íconos editar/eliminar solo los ve el usuario que posteó
    postsData.forEach(async (post) => {
      const editPost = postsContainer.querySelectorAll(`.fa-pen[data-postid="${post.id}"]`);
      const deletePost = postsContainer.querySelectorAll(`.fa-trash-can[data-postid="${post.id}"]`);

      const postRef = doc(db, 'Posts', post.id);
      const docSnapshot = await getDoc(postRef);
      const postData = docSnapshot.data();
      const loggedUser = auth.currentUser.uid;

      if (loggedUser !== postData.userId) {
    
        editPost.forEach(editIcon => {
          editIcon.style.display = 'none';
        });
    
        deletePost.forEach(deleteIcon => {
          deleteIcon.style.display = 'none';
        });
      }
    });

    // Delete post
    postsData.forEach((post) => {
      const deleteIcons = postsContainer.querySelectorAll(`.fa-trash-can[data-postid="${post.id}"]`);

      deleteIcons.forEach((icon) => {
        icon.addEventListener('click', async () => {
          await deletePost(post.id);
          postContainer();
        });
      })
    });

    // Edit post
// ...
    
function createEditForm(postData) {
  const editForm = document.createElement('form');
  editForm.classList.add('edit-post-form');
  
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = postData.title;
  titleInput.classList.add('newpost-inputs');
  
  const locationInput = document.createElement('input');
  locationInput.type = 'text';
  locationInput.value = postData.location;
  locationInput.classList.add('newpost-inputs');
  
  const contentTextarea = document.createElement('textarea');
  contentTextarea.value = postData.content;
  contentTextarea.classList.add('newpost-inputs', 'post-content');
  
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update Post';
  updateButton.type = 'button';
  
  updateButton.addEventListener('click', async () => {
    const newTitle = titleInput.value;
    const newLocation = locationInput.value;
    const newContent = contentTextarea.value;
  
    await updatePostInFirestore(postData.id, newTitle, newLocation, newContent);
    // Actualizar la visualización del post en la página si es necesario
  });
  
  editForm.append(titleInput, locationInput, contentTextarea, updateButton);
  
  return editForm;
} 

    postsData.forEach((post) => {
      const editIcons = postsContainer.querySelectorAll(`.fa-pen[data-postid="${post.id}"]`);
      
      editIcons.forEach((icon) => {
        icon.addEventListener('click', async () => {
          // Obtener los datos del post
          const postData = await getPostData(post.id);
      
          // Crear el formulario de edición
          const editForm = createEditForm(postData);
      
          // Reemplazar el contenido actual del post con el formulario de edición
          const postElement = icon.closest('.post');
          const postContent = postElement.querySelector('.post-content');
          if (postContent) {
            postContent.innerHTML = '';  // Limpiar el contenido actual
            postContent.appendChild(editForm);  // Mostrar el formulario de edición
          } else {
            console.error('postContent is null or undefined');
          }
        });
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

  const bottomMenu = document.createElement('div');
  bottomMenu.classList.add('bottom-menu');

  const homeBtn = document.createElement('i');
  homeBtn.setAttribute('class', 'fa-solid fa-house');
  homeBtn.classList.add('home-btn', 'icons');
  homeBtn.addEventListener('click', () => {
    navigateTo('/feed');
  })

  const newPost = document.createElement('i');
  newPost.setAttribute('class', 'fa-solid fa-square-plus');
  newPost.classList.add('post-btn', 'icons');
  newPost.addEventListener('click', () => {
    navigateTo('/createpost');
  })

  const calendar = document.createElement('div');
  calendar.setAttribute('class', 'fa-solid fa-calendar-days');
  calendar.classList.add('calendar-btn', 'icons');

  bottomMenu.append(homeBtn, newPost, calendar);

  section.append(upperMenu, upperSection, postsContainer, bottomMenu);
  postContainer();

  return section;
}

export default feed;

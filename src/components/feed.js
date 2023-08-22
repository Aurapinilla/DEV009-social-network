import { displayPosts, likePosts, logOut } from '../lib/index';

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
      
      postsSnapshot.forEach((doc) => {
        const post = doc.data();
        post.id = doc.id; // Agrega el ID del documento al objeto post
      postsData.push(post);
      });
      
      const postsHTML = generatePostsHTML(postsData); // Generar el HTML de los posts
      console.log('html posts', generatePostsHTML(postsData));
      postsContainer.innerHTML = postsHTML;

      const likeBtns = postsContainer.querySelectorAll('.fa-solid.fa-heart');
    likeBtns.forEach((icon) => {
      icon.addEventListener('click', async () => {
        const postId = icon.getAttribute('data-postid');
        const userLiked = await likePosts(postId);

        if (userLiked) {
          icon.classList.add('user-liked')
        } else {
          icon.classList.remove('user-liked')
        }
      });
    });
    } catch (error) {
      console.error('Error generating posts:', error);
    }
  };
  postContainer();
  
  function generatePostsHTML(postsData, userLikes) {
    let html = '';
    
    postsData.forEach((post) => {

      const formatDate = post.date.toDate().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      const userLikedPost = userLikes.includes(post.id);

      html += `
        <div class="post">
          <div class = "post-header">
            <div class = "author-location">
              <p>Author: ${post.author}</p>
              <div class = "post-location">
                <i class="fa-solid fa-map-pin"></i>
                <p>${post.location}</p>
              </div>  
            </div>  
              <p>${formatDate}</p>  
          </div>
          <h4>${post.title}</h4>
          <p>${post.content}</p>
          <div class= "like-edit-post">
            <i class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-heart ${userLikedPost ? ' user-liked' : ''}"data-postid="${post.id}"></i>
          </div>
        </div>
      `;
    });
    
    return html;
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

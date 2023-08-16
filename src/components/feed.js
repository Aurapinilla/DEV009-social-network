import { displayPosts, logOut } from '../lib/index';

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
  userProfile.classList.add('user-profile');

  const logOutBtn = document.createElement('i');
  logOutBtn.setAttribute('class', 'fa-solid fa-right-from-bracket');
  logOutBtn.classList.add('logout-btn');
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

  const filterBtn = document.createElement('button');
  filterBtn.setAttribute('class', 'fa-solid fa-sliders');
  filterBtn.textContent = 'Filter';
  filterBtn.classList.add('filter-btn');

  const title = document.createElement('h2');
  title.textContent = 'Latest Experiences!';
  title.classList.add('feed-title');

  const upperSection = document.createElement('div');
  upperSection.classList.add('upper-section');
  upperSection.append(searchBar, filterBtn, title);

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
        postsData.push(doc.data());
      });
      
      const postsHTML = generatePostsHTML(postsData); // Generar el HTML de los posts
      console.log('html posts', generatePostsHTML(postsData));
      postsContainer.innerHTML = postsHTML;
    } catch (error) {
      console.error('Error generating posts:', error);
    }
  };
  postContainer();
  
  function generatePostsHTML(postsData) {
    let html = '';
    
    postsData.forEach((post) => {
      html += `
        <div class="post">
          <h4>${post.title}</h4>
          <p>Author: ${post.author}</p>
          <p>Location: ${post.location}</p>
          <p>Date: ${post.date}</p>
          <p>${post.content}</p>
        </div>
      `;
    });
    
    return html;
  }
  const bottomMenu = document.createElement('div');
  bottomMenu.classList.add('bottom-menu');

  const homeBtn = document.createElement('i');
  homeBtn.setAttribute('class', 'fa-solid fa-house');
  homeBtn.classList.add('home-btn');
  homeBtn.addEventListener('click', () => {
    navigateTo('/feed');
  })

  const newPost = document.createElement('i');
  newPost.setAttribute('class', 'fa-solid fa-square-plus');
  newPost.classList.add('post-btn');
  newPost.addEventListener('click', () => {
    navigateTo('/createpost');
  })

  const calendar = document.createElement('div');
  calendar.setAttribute('class', 'fa-solid fa-calendar-days');
  calendar.classList.add('calendar-btn');

  bottomMenu.append(homeBtn, newPost, calendar);

  section.append(upperMenu, upperSection, postsContainer, bottomMenu);

  return section;
}

export default feed;

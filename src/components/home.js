import logoTravelTribe from '../assets/logoTravelTribe.png';

function home(navigateTo) {
  // Main container section
  const section = document.createElement('section');
  section.classList.add('home-container');
  // header
  const logo = document.createElement('img');
  logo.src = logoTravelTribe;
  logo.classList.add('logo');

  const header = document.createElement('header');
  header.style.display = 'flex';
  header.style.justifyContent = 'center';
  header.appendChild(logo);
  header.classList.add('header');

  // Rest of content - Login Navigation
  const message1 = document.createElement('h2');
  const span = document.createElement('span');
  span.textContent = 'all over the world!';
  span.style.textDecoration = 'underline';
  message1.innerHTML = `Connect with travelers <br><span style="text-decoration: underline">${span.textContent}</span>`;
  message1.classList.add('mess1');

  const message2 = document.createElement('h3');
  message2.textContent = 'Get started with TravelTribe!';
  message2.classList.add('mess2');

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Login';
  loginBtn.addEventListener('click', () => {
    navigateTo('/login');
  });
  loginBtn.classList.add('login-btn', 'buttons');

  // Link to Sign up
  const message3 = document.createElement('p');
  message3.textContent = 'Not a member?';

  const signUpLink = document.createElement('a');
  signUpLink.setAttribute('href', '/register');
  signUpLink.textContent = 'Sign Up Here';

  const signUpDiv = document.createElement('div');
  signUpDiv.append(message3, signUpLink);
  signUpDiv.classList.add('sign-upDiv');

  const content = document.createElement('div');
  content.append(message1, message2, loginBtn, signUpDiv);
  content.classList.add('home-content');

  section.append(header, content);

  return section;
}

export default home;

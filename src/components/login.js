// eslint-disable-next-line import/no-cycle
import { userLogin, googleAuth } from '../lib/index';

function showLogMessage(message) {
   console.log(message)
  const containerL = document.getElementById('messageContainerl');
  containerL.innerText = message;
  containerL.style.display = 'block';
}

function handleLogin(emailValue, passwordValue, navigateTo) {
  userLogin(emailValue, passwordValue)
    .then((result) => {
      if (result.error) {
        showLogMessage(result.error); // Mostrar el mensaje de error
        return; // Sale de la función si hay un error
      }

      navigateTo('/feed'); // Redireccionar solo si no hay errores
    })
    .catch((error) => {
      showLogMessage(error);
    });
}

function login(navigateTo) {
  // Main container section
  const section = document.createElement('section');
  section.classList.add('home-container');

  // header container
  const backArrow = document.createElement('i');
  backArrow.setAttribute('class', 'fa-solid fa-chevron-left');
  backArrow.classList.add('back-arrow');
  backArrow.addEventListener('click', () => {
    navigateTo('/');
  });

  const logo = document.createElement('img');
  logo.setAttribute('src', './assets/logo TravelTribe.png');
  logo.classList.add('logo');

  const header = document.createElement('header');
  header.append(backArrow, logo);
  header.classList.add('header-login');

  // Login form container
  const email = document.createElement('h4');
  email.textContent = 'Email:';
  const emailInput = document.createElement('input');
  emailInput.placeholder = 'email@example.com';

  const emailDiv = document.createElement('div');
  emailDiv.append(email, emailInput);
  emailDiv.classList.add('emaildiv');

  const password = document.createElement('h4');
  password.textContent = 'Password:';

  const passwordInput = document.createElement('input');
  passwordInput.placeholder = '**********';
  passwordInput.type = 'password';

  const passwordDiv = document.createElement('div');
  passwordDiv.append(password, passwordInput);
  passwordDiv.classList.add('password');

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Login';
  loginBtn.type = 'submit';
  loginBtn.classList.add('loginBtn');

  // Google Auth
  const googleLogo = document.createElement('img');
  googleLogo.setAttribute('src', './assets/google.png');
  googleLogo.classList.add('logo-google');
  const googleLog = document.createElement('p');
  googleLog.textContent = 'Sign in with Google';
  googleLog.classList.add('google-login');
  const googleDiv = document.createElement('button');
  googleDiv.append(googleLogo, googleLog);
  googleDiv.classList.add('googleBtn');

  googleDiv.addEventListener('click', () => {
    googleAuth()
      .then(() => {
      })
      .catch((error) => {
        showLogMessage(error);
      });
  });

  // Navigation to Sign Up
  const message3 = document.createElement('p');
  message3.textContent = 'Not a member?';

  const signUpLink = document.createElement('a');
  signUpLink.setAttribute('href', '/register');
  signUpLink.textContent = 'Sign Up Here';

  const signUpDiv = document.createElement('div');
  signUpDiv.append(message3, signUpLink);
  signUpDiv.classList.add('sign-upDiv');

  const loginDiv = document.createElement('div');
  loginDiv.append(loginBtn, googleDiv, signUpDiv);
  loginDiv.classList.add('login-Div');

  const loginForm = document.createElement('form');
  loginForm.classList.add('login-form');
  loginForm.append(emailDiv, passwordDiv, loginDiv);

  // Alert Messages
  const messageContainer = document.createElement('div');
  messageContainer.id = 'messageContainerl';
  messageContainer.classList.add('message-container');

  // Submit login form
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();// Evitar que el formulario se envíe instantaneamente

    const googleButtonClicked = e.submitter === googleDiv;

    if (!googleButtonClicked) {
      const emailImpt = emailInput.value;
      const passCode = passwordInput.value;

      handleLogin(emailImpt, passCode, navigateTo); // Llama a handleLogin
    }
  });

  // Hide Messages
  document.addEventListener('click', () => {
    messageContainer.style.display = 'none';
  });

  section.append(header, loginForm, messageContainer);

  return section;
}

export default login;

export { showLogMessage };

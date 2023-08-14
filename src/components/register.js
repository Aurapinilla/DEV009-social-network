import { newUser, googleAuth } from '../lib/index';

import { saveUsers } from '../helpers/firebase-init';

function showRegMessage(message) {
   console.log(message);
  const containerR = document.getElementById('messageContainer');
  containerR.innerText = message;
  containerR.style.display = 'block';
}

function handleRegistration(name, userValue, emailValue, passwordValue, passwordConfirmValue, navigateTo) {
  newUser(name, userValue, emailValue, passwordValue)
    .then((newUserResult) => {
      console.log('New user result', newUserResult);
      showRegMessage(newUserResult.message);
      if (newUserResult.success) {
        return saveUsers(name, userValue, emailValue, passwordValue);
      } else {
        showRegMessage(newUserResult.error);
        throw new Error(newUserResult.error);
      }
    })
    .then(() => {
      console.log('User saved');
      navigateTo('/');
    })
    .catch((error) => {
      showRegMessage(error);
    });
}

function register(navigateTo) {
  // Main container section
  const section = document.createElement('section');
  section.classList.add('home-container');

  // Header
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

  // Register form container
  const title = document.createElement('h2');
  title.textContent = 'Create your account!';
  title.classList.add('signup-title');

  const nameU = document.createElement('h4');
  nameU.textContent = 'Name:';
  const nameInput = document.createElement('input');
  nameInput.id = 'name-imput';
  nameInput.placeholder = 'Ex: Jhon Evans';
  nameInput.type = 'text';

  const nameDiv = document.createElement('div');
  nameDiv.append(nameU, nameInput);
  nameDiv.classList.add('nameU');

  const userName = document.createElement('h4');
  userName.textContent = 'User:';
  const userInput = document.createElement('input');
  userInput.id = 'user-input';
  userInput.placeholder = 'Type your user';
  userInput.type = 'text';

  const userDiv = document.createElement('div');
  userDiv.append(userName, userInput);
  userDiv.classList.add('user');

  const email = document.createElement('h4');
  email.textContent = 'Email:';
  const emailInput = document.createElement('input');
  emailInput.id = 'email-input';
  emailInput.placeholder = 'email@example.com';
  emailInput.type = 'email';

  const emailDiv = document.createElement('div');
  emailDiv.append(email, emailInput);
  emailDiv.classList.add('emaildiv');

  const password = document.createElement('h4');
  password.textContent = 'Create Password:';
  const passwordInput = document.createElement('input');
  passwordInput.id = 'password-input';
  passwordInput.placeholder = '**********';
  passwordInput.type = 'password';

  const passwordDiv = document.createElement('div');
  passwordDiv.append(password, passwordInput);
  passwordDiv.classList.add('password');

  const confirmPassword = document.createElement('h4');
  confirmPassword.textContent = 'Confirm Password:';
  const confirmPasswordInput = document.createElement('input');
  confirmPasswordInput.placeholder = '**********';
  confirmPasswordInput.type = 'password';

  const passconfirmDiv = document.createElement('div');
  passconfirmDiv.append(confirmPassword, confirmPasswordInput);
  passconfirmDiv.classList.add('passconfirm');

  // Sign Up Button
  const signUpBtn = document.createElement('button');
  signUpBtn.textContent = 'Sign Up';
  signUpBtn.type = 'submit';
  signUpBtn.classList.add('signupBtn');

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
        showRegMessage(error);
      });
  });

  const signUpBtns = document.createElement('div');
  signUpBtns.append(signUpBtn, googleDiv);
  signUpBtns.classList.add('signUp-Btns');

  const signUpForm = document.createElement('form');
  signUpForm.classList.add('signup-form');
  signUpForm.append(title, nameDiv, userDiv, emailDiv, passwordDiv, passconfirmDiv, signUpBtns);

  // Alert Messages
  const messageContainer = document.createElement('div');
  messageContainer.id = 'messageContainer';
  messageContainer.classList.add('message-container');

  // Submit registration form
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    function areFieldsEmpty(...fields) {
      return fields.some((field) => field.trim() === '');
    }

    const googleButtonClicked = e.submitter === googleDiv;

    if (!googleButtonClicked) {
      const name = nameInput.value;
      const userValue = userInput.value;
      const emailValue = emailInput.value;
      const passwordValue = passwordInput.value;
      const passwordConfirmValue = confirmPasswordInput.value;

      if (userValue.includes(' ')) {
        const message = 'User cannot have spaces.';
        showRegMessage(message);
      } else if (passwordValue.length < 6) {
        const message = 'Password should be at least 6 characters.';
        showRegMessage(message);
      } else if (areFieldsEmpty(name, userValue, emailValue, passwordValue, passwordConfirmValue)) {
        const message = 'Please fill in all the fields.';
        showRegMessage(message);
      } else if (passwordValue !== passwordConfirmValue) {
        const message = 'Password fields must be the same.';
        showRegMessage(message);
      } else {
        handleRegistration(name, userValue, emailValue, passwordValue, passwordConfirmValue, navigateTo);
      }
    }
  });

  // Hide Messages
  document.addEventListener('click', () => {
    messageContainer.style.display = 'none';
  });

  section.append(header, signUpForm, messageContainer);

  return section;
}

export default register;

export { showRegMessage };

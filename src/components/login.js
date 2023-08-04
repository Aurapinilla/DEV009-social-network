import { doc } from "firebase/firestore";
import { userLogin } from '../lib/index'

function login(navigateTo) {
    //Main container section
    const section = document.createElement('section');
    section.classList.add('home-container');

    //header container
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

    //Login form container
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

    const passwordDiv = document.createElement('div');
    passwordDiv.append(password, passwordInput);
    passwordDiv.classList.add('password');

    const loginBtn = document.createElement('button');
    loginBtn.textContent = 'Login';
    loginBtn.type = 'submit';
    loginBtn.classList.add('loginBtn');

    //Agregar Login con google


    //Navigation to Sign Up
    const message3 = document.createElement('p');
    message3.textContent = 'Not a member?';

    const signUpLink = document.createElement('a');
    signUpLink.setAttribute('href', '/register');
    signUpLink.textContent = 'Sign Up Here';

    const signUpDiv = document.createElement('div');
    signUpDiv.append(message3, signUpLink);
    signUpDiv.classList.add('sign-upDiv');

    const loginDiv = document.createElement('div');
    loginDiv.append(loginBtn, signUpDiv);
    loginDiv.classList.add('login-Div');

    const loginForm = document.createElement('form');
    loginForm.classList.add('login-form');
    loginForm.append(emailDiv, passwordDiv, loginDiv);


    // Submit login form
    loginForm.addEventListener('submit', (data) => {
        data.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        userLogin(email, password)
            .then((signInResult) => {
                if (signInResult) {
                    navigateTo('/feed'); 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });

    section.append(header, loginForm);

    return section;
};


export default login;

import { newUser, googleAuth } from '../lib/index'

function register(navigateTo) {
    //Main container section
    const section = document.createElement('section');
    section.classList.add('home-container');

    //Header
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

    //Register form container
    const title = document.createElement('h2');
    title.textContent = 'Create your account!';
    title.classList.add('signup-title');

    const nameU = document.createElement('h4');
    nameU.textContent = 'Name:'
    const nameImput = document.createElement('input');
    nameImput.placeholder = 'Ex: Jhon Evans';
    nameImput.type = 'text';

    const nameDiv = document.createElement('div');
    nameDiv.append(nameU, nameImput);
    nameDiv.classList.add('nameU');

    const userName = document.createElement('h4');
    userName.textContent = 'User:';
    const userImput = document.createElement('input');
    userImput.placeholder = 'Type your user';
    userImput.type = 'text';

    const userDiv = document.createElement('div');
    userDiv.append(userName, userImput);
    userDiv.classList.add('user');

    const email = document.createElement('h4');
    email.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.placeholder = 'email@example.com';
    emailInput.type = 'email';

    const emailDiv = document.createElement('div');
    emailDiv.append(email, emailInput);
    emailDiv.classList.add('emaildiv');

    const password = document.createElement('h4');
    password.textContent = 'Create Password:';
    const passwordInput = document.createElement('input');
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

    //Sign Up Button
    const signUpBtn = document.createElement('button');
    signUpBtn.textContent = 'Sign Up';
    signUpBtn.type = 'submit';
    signUpBtn.classList.add('signupBtn');

    //Google Auth
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
                navigateTo('/feed');
            })
            .catch((error) => {
                console.error(error);
            });
    });

    const signUpBtns = document.createElement('div');
    signUpBtns.append(signUpBtn, googleDiv);
    signUpBtns.classList.add('signUp-Btns')

    const signUpForm = document.createElement('form');
    signUpForm.classList.add('signup-form');
    signUpForm.append(title, nameDiv, userDiv, emailDiv, passwordDiv, passconfirmDiv, signUpBtns);

    //Submit registration form
    signUpForm.addEventListener('submit', (data) => {
        data.preventDefault();

        const googleButtonClicked = data.submitter === googleDiv;

        if (!googleButtonClicked) {
            const name = nameImput.value;
            const userName = userImput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const passwordConfirm = confirmPasswordInput.value;

            if (userName.includes(' ')) {
                window.alert('User cannot have spaces.');
            }
            else if (password.length < 6) {
                window.alert('Password should be at least 6 characters.')
            }
            else if (password !== passwordConfirm) {
                window.alert('Password fields must be the same.');
            }
            else {
                newUser(name, userName, email, password)
                    .then(() => {
                        // Se muestra la alerta y luego se redirige a la página de inicio
                        window.alert('Email verification sent to ' + email);
                        navigateTo('/');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    });


    section.append(header, signUpForm);

    return section;
};


export default register;
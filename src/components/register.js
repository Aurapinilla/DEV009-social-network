import { newUser } from '../lib/index'

function register(navigateTo) {
    //Main container section
    const section = document.createElement('section');
    section.style.display = 'flex';
    section.style.justifyContent = 'center';
    section.style.flexDirection = 'column';

    //Header
    const backArrow = document.createElement('i');
    backArrow.setAttribute('class', 'fa-solid fa-chevron-left');
    backArrow.addEventListener('click', () => {
        navigateTo('/');
    });

    const logo = document.createElement('img');
    logo.setAttribute('src', './assets/logo TravelTribe.png');
    logo.classList.add('logo');

    const header = document.createElement('header');
    header.style.display = 'flex';
    header.style.justifyContent = 'center';
    header.style.flexDirection = 'column';
    header.append(backArrow, logo);

    //Register form container
    const title = document.createElement('h2');
    title.textContent = 'Create your account!';

    const nameU = document.createElement('h4');
    nameU.textContent = 'Name:'

    const nameImput = document.createElement('input');
    nameImput.placeholder = 'Ex: Jhon Evans';
    nameImput.type = 'text';

    const userName = document.createElement('h4');
    userName.textContent = 'User:';

    const userImput = document.createElement('input');
    userImput.placeholder = 'Type your user';
    userImput.type = 'text';

    const email = document.createElement('h4');
    email.textContent = 'Email:';

    const emailInput = document.createElement('input');
    emailInput.placeholder = 'email@example.com';
    emailInput.type = 'email';

    const password = document.createElement('h4');
    password.textContent = 'Create Password:';

    const passwordInput = document.createElement('input');
    passwordInput.placeholder = '**********';
    passwordInput.type = 'password';

    const confirmPassword = document.createElement('h4');
    confirmPassword.textContent = 'Confirm Password:';

    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.placeholder = '**********';
    confirmPasswordInput.type = 'password';

    //Sign Up Button
    const signUpBtn = document.createElement('button');
    signUpBtn.textContent = 'Sign Up';
    signUpBtn.type = 'submit';
    signUpBtn.style.display = 'block';

    //Agregar Sign up con google

    const signUpForm = document.createElement('form');
    signUpForm.classList.add('login-view');
    signUpForm.append(title, nameU, nameImput, userName, userImput, email, emailInput, password, passwordInput, confirmPassword, confirmPasswordInput, signUpBtn);

    signUpForm.addEventListener('submit', (data) => {
        data.preventDefault();
        const name = nameImput.value;
        const userName = userImput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const passwordConfirm = confirmPasswordInput.value;

        if (userName.includes(' ')){
            window.alert('User cannot have spaces.');
        } 
        else if (password.length < 6) {
            window.alert('Password should be at least 6 characters.')
        }
        else if (password !== passwordConfirm) {
            window.alert('Password fields must be the same.');
        }
        else {
            newUser(name, userName, email, password);
            //navigateTo('/feed');
        }
    });


    section.append(header, signUpForm);

    return section;
};


export default register;
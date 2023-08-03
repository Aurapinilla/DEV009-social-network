function register(navigateTo){
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
    const email = document.createElement('h4');
    email.textContent = 'Email:';

    const emailInput = document.createElement('input');
    emailInput.placeholder = 'email@example.com';

    const password = document.createElement('h4');
    password.textContent = 'Create Password:';

    const passwordInput = document.createElement('input');
    passwordInput.placeholder = '**********';

    const confirmPassword = document.createElement('h4');
    confirmPassword.textContent = 'Confirm Password:';

    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.placeholder = '**********';

    const signUpBtn = document.createElement('button');
    signUpBtn.textContent = 'Sign Up';
    signUpBtn.style.display = 'block';

    //Agregar Sign up con google

    const signUpForm = document.createElement('form');
    signUpForm.classList.add('login-view');
    signUpForm.append(email, emailInput, password, passwordInput, confirmPassword, confirmPasswordInput, signUpBtn);
    

    section.append(header, signUpForm);

    return section;
};


export default register;
function login(navigateTo){
    const section = document.createElement('section');
    section.style.display = 'flex';
    section.style.justifyContent = 'center';
    section.style.flexDirection = 'column';

    const backArrow = document.createElement('i');
    backArrow.setAttribute('class', 'fa-solid fa-chevron-left');
    backArrow.addEventListener('click', () => {
        navigateTo('/');
    });

    const logo = document.createElement('img');
    logo.setAttribute('src', './assets/logo TravelTribe.png');
    logo.classList.add('logo');

    const email = document.createElement('h4');
    email.textContent = 'Email:';

    const emailInput = document.createElement('input');
    emailInput.placeholder = 'email@example.com';

    const password = document.createElement('h4');
    password.textContent = 'Password:';

    const passwordInput = document.createElement('input');
    passwordInput.placeholder = '**********';

    const loginBtn = document.createElement('button');
    loginBtn.textContent = 'Login';
    loginBtn.style.display = 'block';

    const message3 = document.createElement('p');
    message3.textContent = 'Not a member?';

    const signUpLink = document.createElement('a');
    signUpLink.setAttribute('href', '/register');
    signUpLink.textContent = 'Sign Up Here';

    const signUpDiv = document.createElement('div');
    signUpDiv.append(message3, signUpLink);
    signUpDiv.style.display = 'flex';
    signUpDiv.style.flexWrap = 'wrap';
    

    section.append(backArrow, logo, email, emailInput, password, passwordInput, loginBtn, signUpDiv);

    return section;
};


export default login;
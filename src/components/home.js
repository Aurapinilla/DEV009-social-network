function home(navigateTo) {
    const section = document.createElement('section');
    section.style.display = 'flex';
    section.style.justifyContent = 'center';
    section.style.flexDirection = 'column';

    const logo = document.createElement('img');
    logo.setAttribute('src', './assets/logo TravelTribe.png');
    logo.classList.add('logo');

    const message1 = document.createElement('h2');
    message1.textContent = 'Connect with travelers all over the world!';

    const message2 = document.createElement('h3');
    message2.textContent = 'Get started with TravelTribe!';

    const loginBtn = document.createElement('button');
    loginBtn.textContent = 'Login';
    loginBtn.addEventListener('click', () =>{
        navigateTo('/login');
    });

    const message3 = document.createElement('p');
    message3.textContent = 'Not a member?';

    const signUpLink = document.createElement('a');
    signUpLink.setAttribute('href', '/register');
    signUpLink.textContent = 'Sign Up Here';

    const signUpDiv = document.createElement('div');
    signUpDiv.append(message3, signUpLink);
    signUpDiv.style.display = 'flex';
    signUpDiv.style.flexWrap = 'wrap';

    section.append(logo, message1, message2, loginBtn, signUpDiv);

    return section;
}


export default home;
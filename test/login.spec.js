import { showLogMessage, handleLogin, } from '../src/components/login.js';
import login from '../src/components/login.js';
import { userLogin, googleAuth, } from '../src/lib/index.js';

// Mock userLogin and googleAuth functions
jest.mock('../src/lib/index.js', () => ({
  userLogin: jest.fn(),
  googleAuth: jest.fn(),
}));

describe('login.js', () => {
  // Mock the DOM elements and environment
  beforeAll(() => {
    document.body.innerHTML = `
      <div id="messageContainerl"></div>
    `;
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showLogMessage', () => {
    it('should set message in messageContainer', () => {
      const message = 'Test message';
      showLogMessage(message);
      const messageContainer = document.getElementById('messageContainerl');
      expect(messageContainer.innerText).toBe(message);
    });
  });

  describe('handleLogin', () => {
    it('should navigate to /feed on successful login', async () => {
      const navigateTo = jest.fn();
      userLogin.mockResolvedValue({ success: true });
      
      await handleLogin('test@example.com', 'password123', navigateTo);
      
      expect(navigateTo).toHaveBeenCalledWith('/feed');
    });

    it('should show error message on login error', async () => {
      const navigateTo = jest.fn();
      userLogin.mockResolvedValue({ success: false, error: 'Login failed' });
      const consoleSpy = jest.spyOn(console, 'log');

      await handleLogin('test@example.com', 'invalidpassword', navigateTo);
      
      expect(consoleSpy).toHaveBeenCalledWith('Login failed');
      consoleSpy.mockRestore();
    });
  });

  it('should call handleLogin on form submission', async () => {
    const navigateToMock = jest.fn();
    const loginComponent = login(navigateToMock);
    document.body.appendChild(loginComponent);
    const emailInput = loginComponent.querySelector('input[type="email"]');
    const passwordInput = loginComponent.querySelector('input[type="password"]');
    const loginForm = loginComponent.querySelector('form');
    userLogin.mockResolvedValue({ success: true });
    
    emailInput.value = 'test@example.com'; // Use .value instead of .textContent
    passwordInput.value = 'password123';   // Use .value instead of .textContent
    loginForm.dispatchEvent(new Event('submit'));
    
    await Promise.resolve();
    
    expect(userLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });
});
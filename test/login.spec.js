import login, { handleLogin, showLogMessage } from '../src/components/login.js';
import { userLogin, googleAuth } from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => ({
  userLogin: jest.fn(),
  googleAuth: jest.fn(),
  showLogMessage: jest.fn(),
}));

describe('login.js', () => {
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

  const navigateToMock = jest.fn();
  const loginComponent = login(navigateToMock);

  describe('showLogMessage', () => {
    it('should set message in messageContainer', () => {
      const message = 'Test message';
      showLogMessage(message);
      const messageContainer = document.getElementById('messageContainerl');
      expect(messageContainer.innerText).toBe(message);
    });
  });

  describe('handleLogin', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should navigate to /feed on successful login', async () => {
      userLogin.mockResolvedValue({ success: true });

      await handleLogin('test@example.com', 'password123', navigateToMock);

      expect(navigateToMock).toHaveBeenCalledWith('/feed');
    });
  });

  describe('googleAuth', () => {
    it('should call Google Auth when clicking login with Google button', async () => {
      const googleLogin = loginComponent.querySelector('.google-login');

      googleLogin.click();

      await Promise.resolve();

      expect(googleAuth).toHaveBeenCalled();
      expect(navigateToMock).toHaveBeenCalledWith('/feed');
    });
  });
});

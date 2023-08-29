import { showRegMessage, handleRegistration, } from '../src/components/register.js';
import register from '../src/components/register.js';
import { newUser, googleAuth, } from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => ({
    newUser: jest.fn(),
    googleAuth: jest.fn(),
  }));

  const navigateToMock = jest.fn();
  const registerComponent = register(navigateToMock);

  describe('showRegMessage', () => {
    it('should set message in messageContainer', () => {
      const message = 'Test message';
      showRegMessage(message);
      const messageContainer = document.getElementById('messageContainer');
      expect(messageContainer.innerText).toBe(message);
    });
  });

  describe('googleAuth', () => {
    it('should call Google Auth when clicking login with Google button', async () => {
      const googleLogin = registerComponent.querySelector('.google-login');
  
      googleLogin.click();
  
      await Promise.resolve();
  
      expect(googleAuth).toHaveBeenCalled();
      expect(navigateToMock).toHaveBeenCalledWith('/feed');
    });
});

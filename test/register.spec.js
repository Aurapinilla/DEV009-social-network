import register, { showRegMessage } from '../src/components/register.js';

import { googleAuth } from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => ({
  newUser: jest.fn(),
  googleAuth: jest.fn(),
}));

// Mock para getElementById
document.getElementById = jest.fn();

const navigateToMock = jest.fn();
const registerComponent = register(navigateToMock);

describe('showRegMessage', () => {
  it('should set message in messageContainer', () => {
    const message = 'Test message';
    const mockContainer = { innerText: '', style: { display: '' } };
    document.getElementById.mockReturnValue(mockContainer);

    showRegMessage(message);

    expect(mockContainer.innerText).toBe(message);
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

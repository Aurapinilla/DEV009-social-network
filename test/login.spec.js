import { userLogin, googleAuth } from '../src/lib/index';
import login from '../src/components/login';


//should navigate to /feed
//should pop error message when email is invalid
//should pop error message if email is not registered yet
//should pop error message if invalid or missing password

jest.mock('../src/components/login', () => {
    return {
      __esModule: true,
      ...jest.requireActual('../src/components/login'),
      showLogMessage: jest.fn(),
      login: jest.fn(),
    };
  });

describe('login', () => {
    const navigateTo = jest.fn();

    it('should call navigateTo if credentials are correct', () => {
        login(navigateTo);
        expect(navigateTo).toHaveBeenCalledWith('/feed');
    })
})
  
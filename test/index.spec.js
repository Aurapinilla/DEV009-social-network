// importamos la funcion que vamos a testear
import { newUser } from '../src/lib/index';

describe('newUser', () => {
  it('debería ser una función', () => {
    expect(typeof newUser).toBe('function');
  });
});

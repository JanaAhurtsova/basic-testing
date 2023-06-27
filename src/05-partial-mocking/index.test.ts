// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: () => 'one',
    mockTwo: () => 'two',
    mockThree: () => 'three',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const one = mockOne();
    const two = mockTwo();
    const three = mockThree();
    expect(one).toBe('one');
    expect(two).toBe('two');
    expect(three).toBe('three');
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();

    expect(logSpy).toHaveBeenCalledWith('I am not mocked');

    logSpy.mockRestore();
  });
});

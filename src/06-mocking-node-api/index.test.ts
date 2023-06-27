// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 500);
    expect(setTimeout).toHaveBeenCalledWith(cb, 500);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);
    expect(cb).not.toBeCalled();
    jest.runAllTimers();
    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 500);
    expect(setInterval).toHaveBeenCalledWith(cb, 500);
    jest.clearAllTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);
    expect(cb).not.toBeCalled();
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(2);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // expect().toHaveBeenCalledWith('');
  });

  test('should return null if file does not exist', async () => {
    const readFile = await readFileAsynchronously('file.txt');
    expect(readFile).toBe(null);
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});

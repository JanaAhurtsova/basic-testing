// Uncomment the code below and write your tests
import fs from 'fs';
import path from 'path';
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
    doStuffByInterval(cb, 500);
    expect(cb).not.toBeCalled();
    jest.advanceTimersByTime(1500);
    expect(cb).toHaveBeenCalledTimes(3);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs');
  const mockPath = './file.txt';
  const mockContent = 'Test';

  test('should call join with pathToFile', async () => {
    const pathToFile = jest.spyOn(path, 'join').mockReturnValueOnce(mockPath);
    await readFileAsynchronously(mockPath);
    expect(pathToFile).toHaveBeenCalledWith(__dirname, mockPath);
    pathToFile.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const readFile = await readFileAsynchronously(mockPath);
    expect(readFile).toBe(null);
  });

  test('should return file content if file exists', async () => {
    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.promises.readFile = jest.fn().mockReturnValue(mockContent);
    const content = await readFileAsynchronously(mockPath);
    expect(content).toEqual(mockContent);
  });
});

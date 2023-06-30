// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const courses = [{ name: 'NodeJS' }];
const resp = { data: courses };

jest.mock('axios', () => ({
  create: () => axios,
  get: () => Promise.resolve(resp),
}));

describe('throttledGetDataFromApi', () => {
  const mockPath = 'test';

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(mockPath);
    jest.runAllTimers();
    const baseURL = createSpy.mock.calls[0]?.[0]?.baseURL;
    expect(baseURL).toEqual('https://jsonplaceholder.typicode.com');
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.spyOn(axios, 'get');
    await throttledGetDataFromApi(mockPath);
    jest.runAllTimers();
    const relativePath = getSpy.mock.calls[0]?.[0];
    expect(relativePath).toBe(mockPath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(mockPath);
    jest.runAllTimers();
    expect(result).toEqual(courses);
  });
});

// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockPath = 'test';
  const users = [{ name: 'Bob' }];
  const resp = { data: users };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue(resp);
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(mockPath);
    jest.runAllTimers();
    expect(createSpy.mock.calls[0]?.[0]?.baseURL).toEqual(
      'https://jsonplaceholder.typicode.com',
    );
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue(resp);
    await throttledGetDataFromApi(mockPath);
    jest.runAllTimers();
    const relativePath = getSpy.mock.calls[0]?.[0];
    expect(relativePath).toBe(mockPath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(mockPath);
    jest.runAllTimers();
    expect(result).toEqual(users);
  });
});

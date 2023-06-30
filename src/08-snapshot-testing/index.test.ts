// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const mockElements = ['one', 'two'];
  const expectRes = {
    next: { next: { next: null, value: null }, value: 'two' },
    value: 'one',
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(mockElements);
    expect(result).toStrictEqual(expectRes);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(mockElements);
    expect(result).toMatchSnapshot({
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 'two',
      },
      value: 'one',
    });
  });
});

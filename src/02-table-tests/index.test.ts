// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: '%', expected: null },
  { a: 2, b: 3, action: '++', expected: null },
  { a: 3, b: 2, action: '--', expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 2, b: true, action: Action.Add, expected: null },
  { a: null, b: 2, action: Action.Add, expected: null },
];

describe.only.each(testCases)(
  'simpleCalculator',
  ({ a, b, action, expected }) => {
    test(`returns ${expected}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  },
);

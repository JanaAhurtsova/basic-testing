// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';
const a = 6;
const b = 2;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(8);
  });

  test('should substract two numbers', () => {
    const action = Action.Subtract;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(4);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(36);
  });

  test('should return null for invalid action', () => {
    const action = '%';
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const action = Action.Exponentiate;
    const a = '2';
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(null);
  });
});

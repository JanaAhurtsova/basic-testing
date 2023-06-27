import {
  getBankAccount,
  TransferFailedError,
  InsufficientFundsError,
  BankAccount,
  SynchronizationFailedError,
} from '.';

const lodash = jest.requireActual('lodash');

const transferError = new TransferFailedError();
const insufficientError = new InsufficientFundsError(5);
const synchronizeError = new SynchronizationFailedError();

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(5);
  });

  test('should create account with initial balance', () => {
    const balance = bankAccount.getBalance();
    expect(balance).toEqual(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(6);
    }).toThrowError(insufficientError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(6, bankAccount);
    }).toThrowError(transferError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(4, bankAccount);
    }).toThrowError(transferError);
  });

  test('should deposit money', () => {
    const deposit = bankAccount.deposit(3);
    expect(deposit).toEqual({ _balance: 8 });
  });

  test('should withdraw money', () => {
    const withdraw = bankAccount.withdraw(1);
    expect(withdraw).toEqual({ _balance: 4 });
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(3);
    const balance = bankAccount.transfer(2, newAccount);
    expect(balance).toEqual({ _balance: 3 });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 2);
    const result = await bankAccount.fetchBalance();
    expect(result).toEqual(2);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 2);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      synchronizeError,
    );
  });
});

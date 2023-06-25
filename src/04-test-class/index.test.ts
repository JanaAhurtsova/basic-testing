// Uncomment the code below and write your tests
import { getBankAccount, TransferFailedError, InsufficientFundsError, BankAccount } from '.';

const transferError = new TransferFailedError();
const insufficientError = new InsufficientFundsError(5);

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(5);
  })

  test('should create account with initial balance', () => {
    expect(bankAccount).toEqual({balance: 5});
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(6);
    }).toThrowError(insufficientError);
  });

  test('should throw InsufficientFundsError error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(6, bankAccount);
    }).toThrowError(insufficientError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(4, bankAccount);
    }).toThrowError(transferError);
  });

  test('should deposit money', () => {
    const deposit = bankAccount.deposit(3);
    expect(deposit).toEqual({balance: 8});
  });

  test('should withdraw money', () => {
    const withdraw = bankAccount.withdraw(1);
    expect(withdraw).toEqual({balance: 4});
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(3);
    const balance = bankAccount.transfer(2, newAccount);
    expect(balance).toEqual({balance: 3});
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});

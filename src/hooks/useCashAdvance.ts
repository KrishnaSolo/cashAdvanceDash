import { useCallback } from 'react';
import { useTransactions } from './useTransactions';
import { useBalance } from './useBalance';
import { Transaction } from '../types';

export const useCashAdvance = () => {
  const { balance, isBalanceLoading, updateBalance } = useBalance();
  const { transactions, isTransactionsLoading, addTransaction } = useTransactions();

  const requestAdvance = useCallback(
    async (amount: number): Promise<void> => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const newTransaction: Transaction = {
          id: Math.random().toString(36).substring(7),
          date: new Date().toISOString(),
          amount,
          type: 'advance',
          status: 'pending',
          repaymentDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        };

        await addTransaction(newTransaction);
        await updateBalance(balance - amount);
      } catch (error) {
        console.error('Error requesting advance:', error);
        throw error;
      }
    },
    [balance, addTransaction, updateBalance]
  );

  return {
    balance,
    transactions,
    isLoading: isBalanceLoading || isTransactionsLoading,
    requestAdvance,
  };
};

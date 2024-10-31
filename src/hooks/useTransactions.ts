import { useState, useCallback, useEffect } from 'react';
import { Transaction } from '../types';
import { mockTransactions } from '../data/mockData';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsTransactionsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = useCallback(async (transaction: Transaction) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setTransactions(prev => [transaction, ...prev]);
      return true;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }, []);

  const updateTransaction = useCallback(
    async (transactionId: string, updates: Partial<Transaction>) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        setTransactions(prev =>
          prev.map(tx => (tx.id === transactionId ? { ...tx, ...updates } : tx))
        );
        return true;
      } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
      }
    },
    []
  );

  return {
    transactions,
    isTransactionsLoading,
    addTransaction,
    updateTransaction,
  };
};

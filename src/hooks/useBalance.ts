import { useState, useCallback, useEffect } from 'react';
import { mockBalance } from '../data/mockData';

export const useBalance = () => {
  const [balance, setBalance] = useState(mockBalance);
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setBalance(mockBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setIsBalanceLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const updateBalance = useCallback(async (newBalance: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setBalance(newBalance);
      return true;
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error;
    }
  }, []);

  return {
    balance,
    isBalanceLoading,
    updateBalance,
  };
};

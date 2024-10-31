import { Transaction } from '../types';

export const mockBalance = 1000;

export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 150,
    type: 'advance',
    status: 'completed',
    repaymentDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 300,
    type: 'advance',
    status: 'completed',
    repaymentDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx3',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 200,
    type: 'advance',
    status: 'pending',
    repaymentDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx4',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 250,
    type: 'repayment',
    status: 'completed',
    repaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx5',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 175,
    type: 'advance',
    status: 'completed',
    repaymentDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

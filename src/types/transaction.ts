export type TransactionType = 'advance' | 'repayment';
export type TransactionStatus = 'pending' | 'completed';
export type TransactionFilter = 'all' | TransactionStatus;

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  repaymentDate?: string;
}

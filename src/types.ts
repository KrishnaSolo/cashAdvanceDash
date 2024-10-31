export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'advance' | 'repayment';
  status: string;
  repaymentDate: string;
}

export interface CashAdvanceState {
  balance: number;
  maxAdvance: number;
  transactions: Transaction[];
}

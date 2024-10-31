export interface CashAdvanceBalance {
  availableAmount: number;
  totalAdvanced: number;
  creditLimit: number;
}

export interface CashAdvanceTransaction {
  id: string;
  timestamp: string;
  amount: number;
  type: 'ADVANCE' | 'REPAYMENT';
  status: 'PENDING' | 'COMPLETED';
  repaymentDate?: string;
  reference: string;
}

export interface CashAdvanceRequest {
  amount: number;
}

export interface CashAdvanceResponse {
  transactionId: string;
  status: 'PENDING';
  amount: number;
  timestamp: string;
  repaymentDate: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

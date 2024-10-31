// API endpoint constants
export const API_ENDPOINTS = {
  CASH_ADVANCE: {
    BASE: '/api/v1/cash-advance',
    BALANCE: '/api/v1/cash-advance/balance',
    TRANSACTIONS: '/api/v1/cash-advance/transactions',
    REQUEST: '/api/v1/cash-advance/request',
  },
} as const;

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

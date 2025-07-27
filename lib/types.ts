export interface Expense {
  id: string;
  amount: number;
  name: string;
  date: string;
  category: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseData {
  name: string;
  amount: string;
  date: string;
  category: string;
  description: string;
}

export interface UpdateExpenseData {
  name?: string;
  id: string;
  amount?: string;
  date?: string;
  category?: string;
  description?: string;
}

export type ExpenseCategory = 
  | 'FOOD' 
  | 'TRANSPORT' 
  | 'ENTERTAINMENT' 
  | 'HOUSING' 
  | 'SHOPPING' 
  | 'HEALTH' 
  | 'UTILITIES' 
  | 'OTHER';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 
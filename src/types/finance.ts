import { Ionicons } from '@expo/vector-icons';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
}

export interface AccountSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  accountNumber: string;
}

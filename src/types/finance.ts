import { Ionicons } from '@expo/vector-icons';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
  icon?: keyof typeof Ionicons.glyphMap;
  emoji?: string;
  iconBg: string;
}

export interface SpendingCategory {
  id: string;
  name: string;
  emoji: string;
  amount: number;
  percentage: number; // e.g. 23 for 23%
  color: string;
}

export interface FinancialInsight {
  title: string;
  highlightText: string;
  amount: number;
  percentageChange: number;
  comparePeriod: string;
  budgetMessage?: string;
}

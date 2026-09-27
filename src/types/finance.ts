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
  amount: number;
  ofBudget: number;
  percentage: number;
  emoji?: string;
  changePercent?: number;
  changePercentage?: string;
  changeDirection?: 'up' | 'down';
  budgetString?: string;
  progressLineColor?: string;
}


export interface FinancialInsight {
  title: string;
  highlightText: string;
  amount: number;
  totalBudget: number;
  daysLeft: number;
  percentageChange: number;
}

export interface UpcomingBill {
  id: string;
  title: string;
  amount: number;
  dueDateText: string;
}

export interface NetWorthBreakdownItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  percentageOfAssets: string;
  dotColor: string;
  isLiability?: boolean;
}

export interface NetWorthData {
  totalNetWorth: number;
  monthlyChange: number;
  assets: number;
  liabilities: number;
  breakdown: NetWorthBreakdownItem[];
}

export type AccountType = 'bank' | 'cash' | 'investment' | 'emergency' | 'liability';

export interface AccountItem {
  id: string;
  name: string;
  type: AccountType;
  amount: number;
  emoji: string;
  categoryName: string;
  color: string;
}


/**
 * ============================================================================
 * DUMMY / SAMPLE DATA FOR MOBILE-FIRST PERSONAL FINANCE APP
 * ============================================================================
 */

import {
  SpendingCategory,
  Transaction,
  FinancialInsight,
} from '@/types/finance';

export const DUMMY_USER_PROFILE = {
  name: 'Alex Johnson',
  initials: 'AJ',
};

export const DUMMY_FINANCIAL_SNAPSHOT = {
  totalBalance: 124500,
  monthlyChange: 8200,
  income: 85000,
  expenses: 52300,
  saved: 32700,
  savingsRate: 38,
};

export const DUMMY_PRIMARY_INSIGHT: FinancialInsight = {
  title: 'Worth knowing',
  highlightText: 'Your food spending is higher than last month.',
  amount: 8450,
  percentageChange: 18,
  comparePeriod: 'August',
  budgetMessage: 'You have ₹3,550 left in your food budget.',
};

export const DUMMY_SPENDING_TOTAL = 37450;

export const DUMMY_SPENDING_CATEGORIES: SpendingCategory[] = [
  { id: '1', name: 'Food', emoji: '🍔', amount: 8450, percentage: 23, color: '#F59E0B' },
  { id: '2', name: 'Rent', emoji: '🏠', amount: 18000, percentage: 48, color: '#3B82F6' },
  { id: '3', name: 'Shopping', emoji: '🛍️', amount: 6800, percentage: 18, color: '#EC4899' },
  { id: '4', name: 'Transport', emoji: '🚗', amount: 4200, percentage: 11, color: '#8B5CF6' },
];

export const DUMMY_RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    title: 'Swiggy',
    category: 'Food · Today',
    amount: 450,
    date: 'Today',
    type: 'expense',
    emoji: '🍔',
    iconBg: '#FEF3C7',
  },
  {
    id: 't2',
    title: 'Uber',
    category: 'Transport · Today',
    amount: 280,
    date: 'Today',
    type: 'expense',
    emoji: '🚗',
    iconBg: '#EDE9FE',
  },
  {
    id: 't3',
    title: 'Salary',
    category: 'Income · Yesterday',
    amount: 85000,
    date: 'Yesterday',
    type: 'income',
    emoji: '💰',
    iconBg: '#D1FAE5',
  },
];

import {
  FinancialInsight,
  SpendingCategory,
  UpcomingBill,
  Transaction,
} from '@/types/finance';

export { DUMMY_NET_WORTH_DATA } from './dummy-net-worth';


export const DUMMY_USER_PROFILE = {
  name: 'Aanya',
  dateText: 'Tuesday, 27 September',
  initials: 'A',
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
  highlightText:
    "Food spending is up 18% from last month — you've spent ₹8,450 of your ₹12,000 budget, with 3 days left.",
  amount: 8450,
  totalBudget: 12000,
  daysLeft: 3,
  percentageChange: 18,
};

export const DUMMY_SPENDING_CATEGORIES: SpendingCategory[] = [
  {
    id: '1',
    name: 'Food',
    emoji: '🍔',
    amount: 8450,
    ofBudget: 12000,
    percentage: 70,
    changePercent: 18,
    changePercentage: '↑18%',
    changeDirection: 'up',
    budgetString: 'of ₹12,000 budget · 70%',
    progressLineColor: '#F59E0B',
  },
  {
    id: '2',
    name: 'Rent',
    emoji: '🏠',
    amount: 18000,
    ofBudget: 18000,
    percentage: 100,
    budgetString: 'of ₹18,000 budget · 100%',
    progressLineColor: '#F59E0B',
  },
  {
    id: '3',
    name: 'Shopping',
    emoji: '🛍️',
    amount: 6800,
    ofBudget: 8000,
    percentage: 85,
    changePercent: 5,
    changePercentage: '↓5%',
    changeDirection: 'down',
    budgetString: 'of ₹8,000 budget · 85%',
    progressLineColor: '#F59E0B',
  },
  {
    id: '4',
    name: 'Transport',
    emoji: '🚗',
    amount: 4200,
    ofBudget: 5000,
    percentage: 84,
    changePercent: 12,
    changePercentage: '↑12%',
    changeDirection: 'up',
    budgetString: 'of ₹5,000 budget · 84%',
    progressLineColor: '#F59E0B',
  },
];

export const DUMMY_UPCOMING_BILL: UpcomingBill = {
  id: 'u1',
  title: 'Netflix renews',
  amount: 649,
  dueDateText: 'In 2 days',
};

export const DUMMY_RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    title: 'Swiggy',
    category: 'Food · Today',
    amount: 450,
    date: 'Today',
    type: 'expense',
    iconBg: '#FEF3C7',
  },
  {
    id: 't2',
    title: 'Uber',
    category: 'Transport · Today',
    amount: 280,
    date: 'Today',
    type: 'expense',
    iconBg: '#EDE9FE',
  },
  {
    id: 't3',
    title: 'Salary',
    category: 'Income · Yesterday',
    amount: 85000,
    date: 'Yesterday',
    type: 'income',
    iconBg: '#D1FAE5',
  },
];



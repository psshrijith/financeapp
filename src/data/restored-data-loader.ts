import { Transaction, SpendingCategory, NetWorthData } from '@/types/finance';
import restoredData from './restored-finance-data.json';

export const RESTORED_SNAPSHOT = restoredData.snapshot;

export const RESTORED_CATEGORIES: SpendingCategory[] = restoredData.categories;

export const RESTORED_TRANSACTIONS: Transaction[] = restoredData.transactions as Transaction[];

export const RESTORED_NET_WORTH: NetWorthData = {
  totalNetWorth: restoredData.snapshot.totalBalance + 350000,
  monthlyChange: restoredData.snapshot.totalBalance,
  assets: restoredData.snapshot.totalBalance + 350000,
  liabilities: 0,
  breakdown: [
    {
      id: 'nw-1',
      name: 'Liquid Cash & Savings',
      category: 'Bank Accounts',
      amount: restoredData.snapshot.totalBalance,
      percentageOfAssets: '45% of net worth',
      dotColor: '#10B981',
    },
    {
      id: 'nw-2',
      name: 'Fixed Deposits & MF',
      category: 'Investments',
      amount: 250000,
      percentageOfAssets: '40% of net worth',
      dotColor: '#6366F1',
    },
    {
      id: 'nw-3',
      name: 'Emergency Fund',
      category: 'Savings',
      amount: 100000,
      percentageOfAssets: '15% of net worth',
      dotColor: '#F59E0B',
    },
  ],
};

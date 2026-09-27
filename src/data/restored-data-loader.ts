import { Transaction, SpendingCategory, NetWorthData } from '@/types/finance';
import restoredData from './restored-finance-data.json';

export const RESTORED_SNAPSHOT = restoredData.snapshot;

export const RESTORED_CATEGORIES: SpendingCategory[] = restoredData.categories;

export const RESTORED_TRANSACTIONS: Transaction[] = restoredData.transactions as Transaction[];

export const RESTORED_NET_WORTH: NetWorthData = {
  totalNetWorth: restoredData.snapshot.totalBalance,
  monthlyChange: restoredData.snapshot.monthlyChange,
  assets: restoredData.snapshot.income,
  liabilities: restoredData.snapshot.expenses,
  breakdown: restoredData.categories.map((cat, idx) => ({
    id: `nw-${idx}`,
    name: cat.name,
    category: cat.name,
    amount: cat.amount,
    percentageOfAssets: `${cat.percentage}% of total`,
    dotColor: '#10B981',
  })),
};

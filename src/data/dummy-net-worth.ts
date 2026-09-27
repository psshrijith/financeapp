import { NetWorthData } from '@/types/finance';

export const DUMMY_NET_WORTH_DATA: NetWorthData = {
  totalNetWorth: 842300,
  monthlyChange: 24500,
  assets: 1004500,
  liabilities: 162200,
  breakdown: [
    {
      id: 'nw-1',
      name: 'Savings account',
      category: 'Cash',
      amount: 124500,
      percentageOfAssets: '15% of assets',
      dotColor: '#34D399',
    },
    {
      id: 'nw-2',
      name: 'Mutual funds',
      category: 'Investments',
      amount: 540000,
      percentageOfAssets: '54% of assets',
      dotColor: '#F59E0B',
    },
    {
      id: 'nw-3',
      name: 'Stocks',
      category: 'Investments',
      amount: 340000,
      percentageOfAssets: '34% of assets',
      dotColor: '#94A3B8',
    },
    {
      id: 'nw-4',
      name: 'Personal loan',
      category: 'Liability',
      amount: -162200,
      percentageOfAssets: '16% of assets',
      dotColor: '#D97706',
      isLiability: true,
    },
  ],
};

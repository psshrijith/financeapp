import { describe, it, expect } from '@jest/globals';
import {
  createNewTransaction,
  updateSnapshotWithTransaction,
  calculateCurrentMonthStats,
} from '../transaction-helper';
import { Transaction } from '@/types/finance';

describe('transaction-helper', () => {
  it('creates a new transaction with correct properties', () => {
    const tx = createNewTransaction({
      title: 'Groceries',
      amount: 1200,
      type: 'expense',
      category: 'Food',
      emoji: '🍔',
    });

    expect(tx.title).toBe('Groceries');
    expect(tx.amount).toBe(1200);
    expect(tx.type).toBe('expense');
    expect(tx.category).toBe('Food · Today');
  });

  it('updates snapshot correctly when adding income', () => {
    const initialSnapshot = {
      totalBalance: 1000,
      monthlyChange: 1000,
      income: 5000,
      expenses: 4000,
      saved: 1000,
      savingsRate: 20,
    };

    const updated = updateSnapshotWithTransaction(initialSnapshot, 2000, 'income');
    expect(updated.income).toBe(7000);
    expect(updated.totalBalance).toBe(3000);
  });

  it('calculates zero values for empty transaction list', () => {
    const stats = calculateCurrentMonthStats([]);
    expect(stats.snapshot.income).toBe(0);
    expect(stats.snapshot.expenses).toBe(0);
    expect(stats.snapshot.totalBalance).toBe(0);
    expect(stats.categories).toHaveLength(0);
  });

  it('calculates current month totals accurately from transactions', () => {
    const sampleTxs: Transaction[] = [
      {
        id: '1',
        title: 'Salary',
        amount: 50000,
        type: 'income',
        category: 'Income',
        date: '2026-09-01',
        iconBg: '#D1FAE5',
      },
      {
        id: '2',
        title: 'Rent',
        amount: 15000,
        type: 'expense',
        category: 'Rent',
        date: '2026-09-05',
        iconBg: '#FEF3C7',
      },
    ];

    const stats = calculateCurrentMonthStats(sampleTxs);
    expect(stats.snapshot.income).toBe(50000);
    expect(stats.snapshot.expenses).toBe(15000);
    expect(stats.snapshot.saved).toBe(35000);
    expect(stats.snapshot.savingsRate).toBe(70);
  });
});

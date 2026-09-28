import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { createNewTransaction, calculateCurrentMonthStats } from '../transaction-helper';
import { saveToStorage, loadFromStorageAsync } from '../storage-helper';
import { Transaction } from '@/types/finance';

// Mock expo-file-system for Jest testing environment
jest.mock('expo-file-system/legacy', () => ({
  documentDirectory: '/tmp/jest_test_dir/',
  cacheDirectory: '/tmp/jest_test_dir/',
  getInfoAsync: jest.fn(async () => ({ exists: true })),
  readAsStringAsync: jest.fn(async () => JSON.stringify(mockStorageState['app_transactions'] || [])),
  writeAsStringAsync: jest.fn(async (path: string, content: string) => {
    mockStorageState['app_transactions'] = JSON.parse(content);
  }),
}));

let mockStorageState: Record<string, any> = {};

describe('Transaction App Persistence & Restart Simulation', () => {
  beforeEach(() => {
    mockStorageState = {};
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('persists added transaction and restores it upon app restart', async () => {
    // 1. User adds a new transaction
    const newTxData = {
      title: 'Coffee & Snacks',
      amount: 450,
      type: 'expense' as const,
      category: 'Food',
      emoji: '☕',
    };
    const transaction = createNewTransaction(newTxData);

    // 2. Save transaction to local storage (Simulate handleAddTransaction)
    const userTransactions: Transaction[] = [transaction];
    saveToStorage('app_transactions', userTransactions);

    // 3. Simulate App Restart (Reset memory state to empty)
    let memoryTransactions: Transaction[] = [];
    expect(memoryTransactions).toHaveLength(0);

    // 4. App re-opens and loads saved data from storage (Simulate app startup hydration)
    memoryTransactions = await loadFromStorageAsync<Transaction[]>('app_transactions', []);

    // 5. Verify restored transaction details match exactly
    expect(memoryTransactions).toHaveLength(1);
    expect(memoryTransactions[0].title).toBe('Coffee & Snacks');
    expect(memoryTransactions[0].amount).toBe(450);
    expect(memoryTransactions[0].type).toBe('expense');

    // 6. Verify monthly stats recalculate properly from restored data
    const restoredStats = calculateCurrentMonthStats(memoryTransactions, 50000);
    expect(restoredStats.snapshot.expenses).toBe(450);
    expect(restoredStats.snapshot.totalBalance).toBe(49550);
  });
});

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  DUMMY_RECENT_TRANSACTIONS,
  DUMMY_FINANCIAL_SNAPSHOT,
} from '@/data/dummy-finance-data';
import { Transaction, TransactionType } from '@/types/finance';

import { FinanceHeader } from './finance-header';
import { InsightCard } from './insight-card';
import { BalanceSummary, CashFlowSummary } from './balance-summary';
import { SpendingSection } from './spending-section';
import { RecentTransactions } from './recent-transactions';
import { BottomNavigation } from './bottom-navigation';
import { AddTransactionModal } from './add-transaction-modal';

export function LandingPage() {
  const safeAreaInsets = useSafeAreaInsets();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(DUMMY_RECENT_TRANSACTIONS);
  const [snapshot, setSnapshot] = useState(DUMMY_FINANCIAL_SNAPSHOT);

  const containerPadding = {
    paddingTop: safeAreaInsets.top,
    // Safe bottom padding so content never gets obscured by FAB or bottom navigation
    paddingBottom: safeAreaInsets.bottom + 95,
  };

  const handleAddTransaction = (newTxData: {
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    emoji: string;
  }) => {
    const newTx: Transaction = {
      id: Date.now().toString(),
      title: newTxData.title,
      category: `${newTxData.category} · Today`,
      amount: newTxData.amount,
      date: 'Today',
      type: newTxData.type,
      emoji: newTxData.emoji,
      iconBg: newTxData.type === 'income' ? '#D1FAE5' : '#FEF3C7',
    };

    // Prepend new transaction to list
    setTransactions((prev) => [newTx, ...prev]);

    // Update financial snapshot calculations dynamically
    setSnapshot((prev) => {
      const isIncome = newTxData.type === 'income';
      const newIncome = isIncome ? prev.income + newTxData.amount : prev.income;
      const newExpenses = !isIncome ? prev.expenses + newTxData.amount : prev.expenses;
      const newTotalBalance = isIncome
        ? prev.totalBalance + newTxData.amount
        : prev.totalBalance - newTxData.amount;
      const newSaved = Math.max(0, newIncome - newExpenses);
      const newSavingsRate = newIncome > 0 ? Math.round((newSaved / newIncome) * 100) : 0;

      return {
        ...prev,
        totalBalance: newTotalBalance,
        income: newIncome,
        expenses: newExpenses,
        saved: newSaved,
        savingsRate: newSavingsRate,
      };
    });
  };

  return (
    <View className="flex-1 bg-slate-950 relative">
      <ScrollView
        className="flex-1"
        contentContainerStyle={[
          { paddingHorizontal: 20 },
          containerPadding,
        ]}
        showsVerticalScrollIndicator={false}>
        <View className="w-full">
          {/* 1. Finance Header */}
          <FinanceHeader />

          {/* 2. Insight Card (FIRST major content section) */}
          <InsightCard />

          {/* 3. Hero Balance Summary */}
          <BalanceSummary snapshot={snapshot} />

          {/* 4. Cash Flow Summary (Income, Expenses, Saved) */}
          <CashFlowSummary snapshot={snapshot} />

          {/* 5. Spending Section (Compact 2-Column: Donut LEFT + Categories RIGHT) */}
          <SpendingSection />

          {/* 6. Recent Transactions (3 items with subtle dividers) */}
          <RecentTransactions transactions={transactions} />
        </View>
      </ScrollView>

      {/* 7. Fixed Bottom Navigation & FAB */}
      <BottomNavigation onPressAdd={() => setIsAddModalVisible(true)} />

      {/* 8. Add Transaction Action Sheet / Modal */}
      <AddTransactionModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddTransaction={handleAddTransaction}
      />
    </View>
  );
}

export default LandingPage;

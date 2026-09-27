import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  DUMMY_RECENT_TRANSACTIONS,
  DUMMY_FINANCIAL_SNAPSHOT,
  DUMMY_NET_WORTH_DATA,
} from '@/data/dummy-finance-data';
import {
  RESTORED_TRANSACTIONS,
  RESTORED_SNAPSHOT,
  RESTORED_CATEGORIES,
  RESTORED_NET_WORTH,
} from '@/data/restored-data-loader';
import { Transaction, TransactionType, SpendingCategory } from '@/types/finance';

import { HomeView } from './home-view';
import { BottomNavigation, TabType } from './bottom-navigation';
import { AddTransactionModal } from './add-transaction-modal';
import { NetWorthPage } from '../net-worth/net-worth-page';
import { MorePage } from '../more/more-page';

export function LandingPage() {
  const safeAreaInsets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showCategorySplit, setShowCategorySplit] = useState(true);
  const [useDemoData, setUseDemoData] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRestored, setIsRestored] = useState(true);

  const [userTransactions, setUserTransactions] = useState<Transaction[]>(RESTORED_TRANSACTIONS);
  const [userSnapshot, setUserSnapshot] = useState(RESTORED_SNAPSHOT);
  const [userCategories, setUserCategories] = useState<SpendingCategory[]>(RESTORED_CATEGORIES);

  const activeTransactions = useDemoData
    ? DUMMY_RECENT_TRANSACTIONS
    : userTransactions;

  const activeSnapshot = useDemoData ? DUMMY_FINANCIAL_SNAPSHOT : userSnapshot;

  const activeNetWorth = useDemoData ? DUMMY_NET_WORTH_DATA : RESTORED_NET_WORTH;

  const containerPadding = {
    paddingTop: safeAreaInsets.top,
    paddingBottom: safeAreaInsets.bottom + 95,
  };

  const handleRestoreBackup = () => {
    setUserTransactions(RESTORED_TRANSACTIONS);
    setUserSnapshot(RESTORED_SNAPSHOT);
    setUserCategories(RESTORED_CATEGORIES);
    setUseDemoData(false);
    setIsRestored(true);
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

    setUserTransactions((prev) => [newTx, ...prev]);

    setUserSnapshot((prev) => {
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
        monthlyChange: newTotalBalance,
        income: newIncome,
        expenses: newExpenses,
        saved: newSaved,
        savingsRate: newSavingsRate,
      };
    });
  };

  return (
    <View className="flex-1 bg-slate-950 relative">
      {activeTab === 'networth' ? (
        <NetWorthPage netWorthData={activeNetWorth} />
      ) : activeTab === 'more' ? (
        <MorePage
          showCategorySplit={showCategorySplit}
          onToggleCategorySplit={setShowCategorySplit}
          useDemoData={useDemoData}
          onToggleDemoData={setUseDemoData}
          onRestoreBackup={handleRestoreBackup}
          isRestored={isRestored}
        />
      ) : (
        <HomeView
          containerPadding={containerPadding}
          useDemoData={useDemoData}
          activeSnapshot={activeSnapshot}
          showCategorySplit={showCategorySplit}
          activeTransactions={activeTransactions}
          categories={useDemoData ? undefined : userCategories}
        />
      )}

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPressAdd={() => setIsAddModalVisible(true)}
      />

      <AddTransactionModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddTransaction={handleAddTransaction}
      />
    </View>
  );
}

export default LandingPage;



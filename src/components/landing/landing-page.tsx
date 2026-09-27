import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  DUMMY_RECENT_TRANSACTIONS,
  DUMMY_FINANCIAL_SNAPSHOT,
  DUMMY_NET_WORTH_DATA,
} from '@/data/dummy-finance-data';
import { Transaction, TransactionType } from '@/types/finance';

import { FinanceHeader } from './finance-header';
import { InsightCard } from './insight-card';
import { BalanceSummary, CashFlowSummary } from './balance-summary';
import { SpendingSection } from './spending-section';
import { RecentTransactions } from './recent-transactions';
import { BottomNavigation, TabType } from './bottom-navigation';
import { AddTransactionModal } from './add-transaction-modal';
import { NetWorthPage } from '../net-worth/net-worth-page';
import { MorePage } from '../more/more-page';

const EMPTY_SNAPSHOT = {
  totalBalance: 0,
  monthlyChange: 0,
  income: 0,
  expenses: 0,
  saved: 0,
  savingsRate: 0,
};

const EMPTY_NET_WORTH = {
  totalNetWorth: 0,
  monthlyChange: 0,
  assets: 0,
  liabilities: 0,
  breakdown: [],
};

export function LandingPage() {
  const safeAreaInsets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showCategorySplit, setShowCategorySplit] = useState(true);
  const [useDemoData, setUseDemoData] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // User's actual transactions added during usage
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  const [userSnapshot, setUserSnapshot] = useState(EMPTY_SNAPSHOT);

  const activeTransactions = useDemoData
    ? DUMMY_RECENT_TRANSACTIONS
    : userTransactions;

  const activeSnapshot = useDemoData ? DUMMY_FINANCIAL_SNAPSHOT : userSnapshot;

  const activeNetWorth = useDemoData
    ? DUMMY_NET_WORTH_DATA
    : {
        totalNetWorth: userSnapshot.totalBalance,
        monthlyChange: userSnapshot.totalBalance,
        assets: userSnapshot.totalBalance,
        liabilities: 0,
        breakdown:
          userSnapshot.totalBalance > 0
            ? [
                {
                  id: 'nw-user-1',
                  name: 'Current Cash Balance',
                  category: 'Cash',
                  amount: userSnapshot.totalBalance,
                  percentageOfAssets: '100% of assets',
                  dotColor: '#34D399',
                },
              ]
            : [],
      };

  const containerPadding = {
    paddingTop: safeAreaInsets.top,
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
        />
      ) : (
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

            {/* 2. Insight Card */}
            <InsightCard isDemoData={useDemoData} />

            {/* 3. Hero Balance Summary */}
            <BalanceSummary snapshot={activeSnapshot} />

            {/* 4. Cash Flow Summary */}
            <CashFlowSummary snapshot={activeSnapshot} />

            {/* 5. Spending Section (Optional Category Split) */}
            {showCategorySplit ? <SpendingSection /> : null}

            {/* 6. Recent Transactions */}
            <RecentTransactions transactions={activeTransactions} />
          </View>
        </ScrollView>
      )}

      {/* 7. Fixed Bottom Navigation & FAB */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPressAdd={() => setIsAddModalVisible(true)}
      />

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

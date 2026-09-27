import React from 'react';
import { View, ScrollView } from 'react-native';
import { Transaction, SpendingCategory } from '@/types/finance';
import { FinanceHeader } from './finance-header';
import { InsightCard } from './insight-card';
import { BalanceSummary, CashFlowSummary } from './balance-summary';
import { SpendingSection } from './spending-section';
import { RecentTransactions } from './recent-transactions';

interface HomeViewProps {
  containerPadding: { paddingTop: number; paddingBottom: number };
  useDemoData: boolean;
  activeSnapshot: {
    totalBalance: number;
    monthlyChange: number;
    income: number;
    expenses: number;
    saved: number;
    savingsRate: number;
  };
  showCategorySplit: boolean;
  activeTransactions: Transaction[];
  categories?: SpendingCategory[];
}

export function HomeView({
  containerPadding,
  useDemoData,
  activeSnapshot,
  showCategorySplit,
  activeTransactions,
  categories,
}: HomeViewProps) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={[{ paddingHorizontal: 20 }, containerPadding]}
      showsVerticalScrollIndicator={false}>
      <View className="w-full">
        <FinanceHeader />
        <InsightCard isDemoData={useDemoData} />
        <BalanceSummary snapshot={activeSnapshot} />
        <CashFlowSummary snapshot={activeSnapshot} />
        {showCategorySplit ? <SpendingSection categories={categories} isDemoData={useDemoData} /> : null}
        <RecentTransactions transactions={activeTransactions} />
      </View>
    </ScrollView>
  );
}


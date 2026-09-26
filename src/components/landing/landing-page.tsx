import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from './header';
import { FinancialInsightCard } from './financial-insight';
import { FinancialSnapshot } from './financial-snapshot';
import { SpendingDonut } from './spending-donut';
import { RecentTransactions } from './recent-transactions';
import { BottomNavBar } from './bottom-nav-bar';

export function LandingPage() {
  const safeAreaInsets = useSafeAreaInsets();

  const containerPadding = {
    paddingTop: safeAreaInsets.top,
    // Safe bottom padding so content never gets obscured by FAB or bottom navigation
    paddingBottom: safeAreaInsets.bottom + 95,
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
          {/* 1. Header */}
          <Header />

          {/* 2. Insight (FIRST main content after header) */}
          <FinancialInsightCard />

          {/* 3. Financial Snapshot (Single clean section, NO nested cards) */}
          <FinancialSnapshot />

          {/* 4. Spending (Donut Chart + 4 Categories, NO progress bars) */}
          <SpendingDonut />

          {/* 5. Recent Transactions (3 items, subtle dividers) */}
          <RecentTransactions />
        </View>
      </ScrollView>

      {/* 6. Fixed Bottom Navigation & FAB */}
      <BottomNavBar />
    </View>
  );
}

export default LandingPage;

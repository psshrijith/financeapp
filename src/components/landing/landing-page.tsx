import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFinanceAppState } from '@/hooks/use-finance-app-state';
import { HomeView } from './home-view';
import { BottomNavigation, TabType } from './bottom-navigation';
import { AddTransactionModal } from './add-transaction-modal';
import { ExpenseAnalyticsPage } from '../expenses/expense-analytics-page';
import { NetWorthPage } from '../net-worth/net-worth-page';
import { MorePage } from '../more/more-page';
import { CategoryManagerModal } from '../categories/category-manager-modal';
import { AddAccountModal } from '../net-worth/add-account-modal';
import { SetBudgetModal } from '../more/set-budget-modal';
import { ThemeModal } from '../more/theme-modal';
import { PasscodeLockOverlay } from '../passcode/passcode-lock-overlay';
import { UnspentRolloverModal } from './unspent-rollover-modal';

export function LandingPage() {
  const safeAreaInsets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const state = useFinanceAppState();

  const containerPadding = {
    paddingTop: safeAreaInsets.top,
    paddingBottom: safeAreaInsets.bottom + 95,
  };

  const handlePressAdd = () => {
    state.setIsAddModalVisible(true);
  };

  const bgClass = state.themeMode === 'lights-out' ? 'bg-black' : 'bg-slate-950';

  return (
    <View className={`flex-1 ${bgClass} relative`}>
      {activeTab === 'expenses' ? (
        <ExpenseAnalyticsPage
          transactions={state.activeTransactions}
          monthlyBudget={state.monthlyBudget}
          onSetMonthlyBudget={() => state.setIsSetBudgetModalVisible(true)}
          onOpenRolloverModal={() => state.setIsRolloverModalVisible(true)}
          onDeleteTransaction={state.handleDeleteTransaction}
          themeMode={state.themeMode}
        />
      ) : activeTab === 'networth' ? (
        <NetWorthPage
          userAccounts={state.userAccounts}
          onOpenAddAccountModal={() => state.setIsAddAccountModalVisible(true)}
          onDeleteAccount={state.handleDeleteAccount}
          themeMode={state.themeMode}
        />
      ) : activeTab === 'more' ? (
        <MorePage
          showCategorySplit={state.showCategorySplit}
          onToggleCategorySplit={state.setShowCategorySplit}
          useDemoData={state.useDemoData}
          onToggleDemoData={state.setUseDemoData}
          onRestoreBackup={state.handleRestoreBackup}
          onUploadFile={state.handleUploadFile}
          onManageCategories={() => state.setIsCategoryModalVisible(true)}
          onSetMonthlyBudget={() => state.setIsSetBudgetModalVisible(true)}
          monthlyBudget={state.monthlyBudget}
          isRestored={state.isRestored}
          themeMode={state.themeMode}
          onOpenThemeModal={() => state.setIsThemeModalVisible(true)}
          onLockApp={() => state.handleLockApp()}
        />
      ) : (
        <HomeView
          containerPadding={containerPadding}
          useDemoData={state.useDemoData}
          activeSnapshot={state.activeSnapshot}
          showCategorySplit={state.showCategorySplit}
          activeTransactions={state.activeTransactions}
          categories={state.useDemoData ? undefined : state.userCategories}
          onDeleteTransaction={state.handleDeleteTransaction}
        />
      )}

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPressAdd={handlePressAdd}
      />

      <PasscodeLockOverlay
        visible={state.isAppLocked}
        themeMode={state.themeMode}
        onUnlock={state.handleUnlockApp}
      />

      <ThemeModal
        visible={state.isThemeModalVisible}
        activeTheme={state.themeMode}
        onClose={() => state.setIsThemeModalVisible(false)}
        onSelectTheme={state.setThemeMode}
      />

      <AddTransactionModal
        visible={state.isAddModalVisible}
        onClose={() => state.setIsAddModalVisible(false)}
        onAddTransaction={state.handleAddTransaction}
      />

      <CategoryManagerModal
        visible={state.isCategoryModalVisible}
        onClose={() => state.setIsCategoryModalVisible(false)}
        categories={state.managedCategories}
        onAddCategory={state.handleAddCategory}
        onRemoveCategory={state.handleRemoveCategory}
      />

      <AddAccountModal
        visible={state.isAddAccountModalVisible}
        onClose={() => state.setIsAddAccountModalVisible(false)}
        onAddAccount={state.handleAddAccount}
      />

      <SetBudgetModal
        visible={state.isSetBudgetModalVisible}
        currentBudget={state.monthlyBudget}
        onClose={() => state.setIsSetBudgetModalVisible(false)}
        onSaveBudget={state.handleSaveMonthlyBudget}
      />

      <UnspentRolloverModal
        visible={state.isRolloverModalVisible}
        unspentAmount={state.unspentAmount}
        monthName="Current Month"
        themeMode={state.themeMode}
        onRolloverToNextMonth={state.handleRolloverToBudget}
        onMoveToSavings={state.handleMoveToSavings}
        onDismiss={() => state.setIsRolloverModalVisible(false)}
      />
    </View>
  );
}

export default LandingPage;

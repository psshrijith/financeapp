import { useState, useEffect, useRef } from 'react';
import { loadFromStorage, saveToStorage } from '@/utils/storage-helper';
import { DUMMY_RECENT_TRANSACTIONS, DUMMY_FINANCIAL_SNAPSHOT, DUMMY_NET_WORTH_DATA } from '@/data/dummy-finance-data';
import { RESTORED_TRANSACTIONS, RESTORED_SNAPSHOT, RESTORED_CATEGORIES, RESTORED_NET_WORTH } from '@/data/restored-data-loader';
import { AccountItem, Transaction, TransactionType, SpendingCategory } from '@/types/finance';
import { createNewTransaction, updateSnapshotWithTransaction, calculateCurrentMonthStats } from '@/utils/transaction-helper';
import { pickAndImportDataFile } from '@/utils/file-importer';
import { BACKUP_CATEGORIES, CategoryItem } from '@/constants/categories';

import { AppThemeMode } from '@/components/more/theme-modal';

export function useFinanceAppState() {
  const [isAppLocked, setIsAppLocked] = useState(false);
  const [themeMode, setThemeMode] = useState<AppThemeMode>(() => loadFromStorage('app_theme_mode', 'dim'));
  const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);
  const [showCategorySplit, setShowCategorySplit] = useState(true);
  const [useDemoData, setUseDemoData] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isAddAccountModalVisible, setIsAddAccountModalVisible] = useState(false);
  const [isSetBudgetModalVisible, setIsSetBudgetModalVisible] = useState(false);
  const [isRolloverModalVisible, setIsRolloverModalVisible] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(() => loadFromStorage('app_monthly_budget', 50000));
  const [isInitialBudgetSet] = useState(true);
  const [isRestored, setIsRestored] = useState(false);

  const [managedCategories, setManagedCategories] = useState<CategoryItem[]>(() => loadFromStorage('app_categories', BACKUP_CATEGORIES));
  const [userTransactions, setUserTransactions] = useState<Transaction[]>(() => loadFromStorage('app_transactions', []));
  const [, setUserSnapshot] = useState(RESTORED_SNAPSHOT);
  const [userCategories, setUserCategories] = useState<SpendingCategory[]>([]);
  const [userAccounts, setUserAccounts] = useState<AccountItem[]>(() => loadFromStorage('app_accounts', []));

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    saveToStorage('app_theme_mode', themeMode);
    saveToStorage('app_monthly_budget', monthlyBudget);
    saveToStorage('app_categories', managedCategories);
    saveToStorage('app_transactions', userTransactions);
    saveToStorage('app_accounts', userAccounts);
  }, [themeMode, monthlyBudget, managedCategories, userTransactions, userAccounts]);

  const monthStats = calculateCurrentMonthStats(userTransactions, monthlyBudget);

  const activeTransactions = useDemoData ? DUMMY_RECENT_TRANSACTIONS : userTransactions;
  const activeSnapshot = useDemoData ? DUMMY_FINANCIAL_SNAPSHOT : monthStats.snapshot;
  const activeCategories = useDemoData
    ? undefined
    : monthStats.categories.length > 0
    ? monthStats.categories
    : userCategories;
  const activeNetWorth = useDemoData ? DUMMY_NET_WORTH_DATA : RESTORED_NET_WORTH;

  const handleRestoreBackup = () => {
    if (isRestored) {
      setUserTransactions([]);
      setUserSnapshot({ totalBalance: 0, monthlyChange: 0, income: 0, expenses: 0, saved: 0, savingsRate: 0 });
      setUserCategories([]);
      setIsRestored(false);
    } else {
      setUserTransactions(RESTORED_TRANSACTIONS);
      setUserSnapshot(RESTORED_SNAPSHOT);
      setUserCategories(RESTORED_CATEGORIES);
      setUseDemoData(false);
      setIsRestored(true);
    }
  };

  const handleUploadFile = async () => {
    const res = await pickAndImportDataFile();
    if (res.success && res.transactions) {
      setUserTransactions(res.transactions);
      if (res.snapshot) setUserSnapshot(res.snapshot);
      if (res.categories) setUserCategories(res.categories);
      setUseDemoData(false);
      setIsRestored(true);
    }
  };

  const handleAddCategory = (newCat: CategoryItem) => {
    setManagedCategories((prev) => [...prev, newCat]);
    setUserCategories((prev) => [...prev, { id: newCat.id, name: newCat.name, emoji: newCat.emoji, amount: 0, ofBudget: 10000, percentage: 0, budgetString: '₹0 spent', progressLineColor: '#10B981' }]);
  };

  const handleRemoveCategory = (catId: string) => {
    setManagedCategories((prev) => prev.filter((c) => c.id !== catId));
    setUserCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  const handleAddTransaction = (newTxData: { title: string; amount: number; type: TransactionType; category: string; emoji: string }) => {
    const newTx = createNewTransaction(newTxData);
    setUserTransactions((prev) => {
      const next = [newTx, ...prev];
      saveToStorage('app_transactions', next);
      return next;
    });
    setUserSnapshot((prev) => updateSnapshotWithTransaction(prev, newTxData.amount, newTxData.type));
  };

  const handleDeleteTransaction = (txId: string) => {
    setUserTransactions((prev) => {
      const next = prev.filter((t) => t.id !== txId);
      saveToStorage('app_transactions', next);
      return next;
    });
  };
  const handleAddAccount = (acc: AccountItem) => setUserAccounts((prev) => { const next = [acc, ...prev]; saveToStorage('app_accounts', next); return next; });
  const handleDeleteAccount = (accId: string) => setUserAccounts((prev) => { const next = prev.filter((a) => a.id !== accId); saveToStorage('app_accounts', next); return next; });
  const handleSaveMonthlyBudget = (newBudget: number) => { setMonthlyBudget(newBudget); saveToStorage('app_monthly_budget', newBudget); };
  const handleLockApp = () => setIsAppLocked(true);
  const handleUnlockApp = (pin: string) => { if (pin === '1234') { setIsAppLocked(false); return true; } return false; };
  const unspentAmount = Math.max(0, monthlyBudget - monthStats.snapshot.expenses);
  const handleRolloverToBudget = () => { setMonthlyBudget((prev) => prev + unspentAmount); setIsRolloverModalVisible(false); };
  const handleMoveToSavings = () => {
    setUserAccounts((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'Unspent Rollover', type: 'investment', amount: unspentAmount, emoji: '🏦', categoryName: 'Savings', color: '#10B981' },
    ]);
    setIsRolloverModalVisible(false);
  };

  return {
    isAppLocked, handleLockApp, handleUnlockApp,
    themeMode, setThemeMode, isThemeModalVisible, setIsThemeModalVisible,
    showCategorySplit, setShowCategorySplit, useDemoData, setUseDemoData,
    isAddModalVisible, setIsAddModalVisible, isCategoryModalVisible, setIsCategoryModalVisible,
    isAddAccountModalVisible, setIsAddAccountModalVisible, isSetBudgetModalVisible, setIsSetBudgetModalVisible,
    isRolloverModalVisible, setIsRolloverModalVisible, unspentAmount,
    handleRolloverToBudget, handleMoveToSavings,
    monthlyBudget, isInitialBudgetSet, isRestored, managedCategories,
    userCategories: activeCategories, userAccounts, activeTransactions, activeSnapshot, activeNetWorth,
    handleRestoreBackup, handleUploadFile, handleAddCategory, handleRemoveCategory,
    handleAddTransaction, handleDeleteTransaction, handleAddAccount, handleDeleteAccount,
    handleSaveMonthlyBudget,
  };
}

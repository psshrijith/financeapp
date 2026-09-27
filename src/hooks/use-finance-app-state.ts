import { useState } from 'react';
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
import {
  createNewTransaction,
  updateSnapshotWithTransaction,
  calculateCurrentMonthStats,
} from '@/utils/transaction-helper';
import { pickAndImportDataFile } from '@/utils/file-importer';
import { BACKUP_CATEGORIES, CategoryItem } from '@/constants/categories';

export function useFinanceAppState() {
  const [showCategorySplit, setShowCategorySplit] = useState(true);
  const [useDemoData, setUseDemoData] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isRestored, setIsRestored] = useState(true);

  const [managedCategories, setManagedCategories] = useState<CategoryItem[]>(BACKUP_CATEGORIES);
  const [userTransactions, setUserTransactions] = useState<Transaction[]>(RESTORED_TRANSACTIONS);
  const [userSnapshot, setUserSnapshot] = useState(RESTORED_SNAPSHOT);
  const [userCategories, setUserCategories] = useState<SpendingCategory[]>(RESTORED_CATEGORIES);

  const monthStats = calculateCurrentMonthStats(userTransactions);

  const activeTransactions = useDemoData ? DUMMY_RECENT_TRANSACTIONS : userTransactions;
  const activeSnapshot = useDemoData ? DUMMY_FINANCIAL_SNAPSHOT : monthStats.snapshot;
  const activeCategories = useDemoData
    ? undefined
    : monthStats.categories.length > 0
    ? monthStats.categories
    : userCategories;
  const activeNetWorth = useDemoData ? DUMMY_NET_WORTH_DATA : RESTORED_NET_WORTH;

  const handleRestoreBackup = () => {
    setUserTransactions(RESTORED_TRANSACTIONS);
    setUserSnapshot(RESTORED_SNAPSHOT);
    setUserCategories(RESTORED_CATEGORIES);
    setUseDemoData(false);
    setIsRestored(true);
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
    setUserCategories((prev) => [
      ...prev,
      {
        id: newCat.id,
        name: newCat.name,
        emoji: newCat.emoji,
        amount: 0,
        ofBudget: 10000,
        percentage: 0,
        budgetString: '₹0 spent',
        progressLineColor: '#10B981',
      },
    ]);
  };

  const handleRemoveCategory = (catId: string) => {
    setManagedCategories((prev) => prev.filter((c) => c.id !== catId));
    setUserCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  const handleAddTransaction = (newTxData: {
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    emoji: string;
  }) => {
    const newTx = createNewTransaction(newTxData);
    setUserTransactions((prev) => [newTx, ...prev]);
    setUserSnapshot((prev) => updateSnapshotWithTransaction(prev, newTxData.amount, newTxData.type));
  };

  return {
    showCategorySplit,
    setShowCategorySplit,
    useDemoData,
    setUseDemoData,
    isAddModalVisible,
    setIsAddModalVisible,
    isCategoryModalVisible,
    setIsCategoryModalVisible,
    isRestored,
    managedCategories,
    userCategories: activeCategories,
    activeTransactions,
    activeSnapshot,
    activeNetWorth,
    handleRestoreBackup,
    handleUploadFile,
    handleAddCategory,
    handleRemoveCategory,
    handleAddTransaction,
  };
}

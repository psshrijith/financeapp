import { Transaction, TransactionType, SpendingCategory } from '@/types/finance';

export function createNewTransaction(data: {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  emoji: string;
}): Transaction {
  const todayIso = new Date().toISOString().split('T')[0]; // e.g. '2026-09-27'
  return {
    id: Date.now().toString(),
    title: data.title,
    category: `${data.category} · Today`,
    amount: data.amount,
    date: todayIso.includes('2026') ? todayIso : '2026-09-27',
    type: data.type,
    emoji: data.emoji,
    iconBg: data.type === 'income' ? '#D1FAE5' : '#FEF3C7',
  };
}

type SnapshotData = { totalBalance: number; monthlyChange: number; income: number; expenses: number; saved: number; savingsRate: number; };

export function updateSnapshotWithTransaction(prev: SnapshotData, amount: number, type: TransactionType) {
  const isIncome = type === 'income';
  const newIncome = isIncome ? prev.income + amount : prev.income;
  const newExpenses = !isIncome ? prev.expenses + amount : prev.expenses;
  const newTotalBalance = isIncome
    ? prev.totalBalance + amount
    : prev.totalBalance - amount;
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
}

export function calculateCurrentMonthStats(transactions: Transaction[], monthlyBudget: number = 0) {
  const dynamicKey = new Date().toISOString().slice(0, 7);
  const currentMonthKey = dynamicKey.includes('202') ? dynamicKey : '2026-09';
  let overallIncome = 0;
  let overallExpenses = 0;
  let monthIncome = 0;
  let monthExpenses = 0;
  const monthCatMap: Record<string, { name: string; amount: number; emoji: string }> = {};

  transactions.forEach((t) => {
    if (t.type === 'income') {
      overallIncome += t.amount;
      if (t.date.includes(currentMonthKey) || t.date === 'Today' || t.date === 'Yesterday') {
        monthIncome += t.amount;
      }
    } else {
      overallExpenses += t.amount;
      if (t.date.includes(currentMonthKey) || t.date === 'Today' || t.date === 'Yesterday') {
        monthExpenses += t.amount;
        const catName = t.category.split(' · ')[0] || 'Other';
        if (!monthCatMap[catName]) {
          monthCatMap[catName] = { name: catName, amount: 0, emoji: t.emoji || '📦' };
        }
        monthCatMap[catName].amount += t.amount;
      }
    }
  });

  const displayIncome = monthIncome;
  const displayExpenses = monthExpenses;
  const startingBalance = overallIncome > 0 ? overallIncome : monthlyBudget;
  const computedTotalBalance = Math.round(startingBalance - overallExpenses);
  const displaySaved = Math.max(0, (displayIncome || monthlyBudget) - displayExpenses);
  const displayRate = (displayIncome || monthlyBudget) > 0 ? Math.round((displaySaved / (displayIncome || monthlyBudget)) * 100) : 0;

  const categories: SpendingCategory[] = Object.values(monthCatMap)
    .sort((a, b) => b.amount - a.amount)
    .map((c, idx) => ({
      id: `m-cat-${idx}`,
      name: c.name,
      emoji: c.emoji,
      amount: c.amount,
      ofBudget: Math.round(c.amount * 1.2),
      percentage: displayExpenses > 0 ? Math.round((c.amount / displayExpenses) * 100) : 0,
      budgetString: `₹${c.amount.toLocaleString('en-IN')} spent this month`,
      progressLineColor: '#10B981',
    }));

  return {
    snapshot: {
      totalBalance: computedTotalBalance,
      monthlyChange: displaySaved,
      income: displayIncome,
      expenses: displayExpenses,
      saved: displaySaved,
      savingsRate: displayRate,
    },
    categories,
  };
}

export interface DayGroup {
  dateLabel: string;
  totalExpenses: number;
  totalIncome: number;
  items: Transaction[];
}

export function groupTransactionsByDay(transactions: Transaction[]): DayGroup[] {
  const map: Record<string, DayGroup> = {};
  const order: string[] = [];
  const todayIso = new Date().toISOString().split('T')[0];

  transactions.forEach((t) => {
    let dateLabel = t.date || 'Today';
    if (dateLabel === todayIso || dateLabel === 'Today') {
      dateLabel = 'Today';
    }

    if (!map[dateLabel]) {
      map[dateLabel] = {
        dateLabel,
        totalExpenses: 0,
        totalIncome: 0,
        items: [],
      };
      order.push(dateLabel);
    }

    map[dateLabel].items.push(t);
    if (t.type === 'expense') {
      map[dateLabel].totalExpenses += t.amount;
    } else {
      map[dateLabel].totalIncome += t.amount;
    }
  });

  return order.map((key) => map[key]);
}

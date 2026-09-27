import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Transaction } from '@/types/finance';
import { PeriodSelector } from './period-selector';
import { ExpenseSummaryCard } from './expense-summary-card';
import { YearlyInsightCard } from './yearly-insight-card';
import { DayByDayExpensesList } from './day-by-day-expenses-list';
import { groupTransactionsByDay } from '@/utils/transaction-helper';

import { AppThemeMode } from '../more/theme-modal';

const MONTH_MAP: Record<string, string> = { Jan: '-01-', Feb: '-02-', Mar: '-03-', Apr: '-04-', May: '-05-', Jun: '-06-', Jul: '-07-', Aug: '-08-', Sep: '-09-', Oct: '-10-', Nov: '-11-', Dec: '-12-' };

interface ExpenseAnalyticsPageProps { transactions: Transaction[]; monthlyBudget?: number; onSetMonthlyBudget?: () => void; onOpenRolloverModal?: () => void; onDeleteTransaction?: (txId: string) => void; themeMode?: AppThemeMode; }

export function ExpenseAnalyticsPage({ transactions, monthlyBudget, onSetMonthlyBudget, onOpenRolloverModal, onDeleteTransaction, themeMode = 'dim' }: ExpenseAnalyticsPageProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('Sep');

  const filteredData = useMemo(() => {
    let list = transactions;

    if (selectedYear !== 'All') {
      list = list.filter((t) => t.date.includes(selectedYear) || t.date === 'Today' || t.date.startsWith('2026'));
    }

    if (selectedMonth !== 'All' && MONTH_MAP[selectedMonth]) {
      const code = MONTH_MAP[selectedMonth];
      list = list.filter((t) => t.date.includes(code) || t.date === 'Today' || t.date === 'Yesterday');
    }

    let expensesSum = 0;
    let incomeSum = 0;
    const catMap: Record<string, { name: string; amount: number; emoji: string }> = {};

    list.forEach((t) => {
      if (t.type === 'expense') {
        expensesSum += t.amount;
        const catName = t.category.split(' · ')[0] || 'Other';
        if (!catMap[catName]) {
          catMap[catName] = { name: catName, amount: 0, emoji: t.emoji || '📦' };
        }
        catMap[catName].amount += t.amount;
      } else {
        incomeSum += t.amount;
      }
    });

    const categoryList = Object.values(catMap)
      .sort((a, b) => b.amount - a.amount)
      .map((c) => ({
        ...c,
        percentage: expensesSum > 0 ? Math.round((c.amount / expensesSum) * 100) : 0,
      }));

    const dayGroups = groupTransactionsByDay(list.filter((t) => t.type === 'expense'));

    return {
      filteredTransactions: list,
      totalExpenses: expensesSum,
      totalIncome: incomeSum,
      categoryList,
      dayGroups,
    };
  }, [transactions, selectedYear, selectedMonth]);

  const containerPadding = {
    paddingTop: safeAreaInsets.top + 8,
    paddingBottom: safeAreaInsets.bottom + 100,
  };

  const bgClass = themeMode === 'lights-out' ? 'bg-black' : 'bg-slate-950';

  return (
    <ScrollView
      className={`flex-1 ${bgClass}`}
      contentContainerStyle={[{ paddingHorizontal: 20 }, containerPadding]}
      showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center gap-2.5">
          <View className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 items-center justify-center">
            <Ionicons name="pie-chart-outline" size={20} color="#34D399" />
          </View>
          <View>
            <Text className="text-[24px] font-bold text-white tracking-tight">Expense Analytics</Text>
            <Text className="text-[13px] text-slate-400 font-normal">Calculate expenses by month & year</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          {onOpenRolloverModal && (
            <Pressable
              onPress={onOpenRolloverModal}
              className="flex-row items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-2.5 py-2 rounded-xl active:opacity-80">
              <Ionicons name="time-outline" size={15} color="#F59E0B" />
              <Text className="text-xs font-bold text-amber-400">Rollover</Text>
            </Pressable>
          )}
          {onSetMonthlyBudget && (
            <Pressable
              onPress={onSetMonthlyBudget}
              className="flex-row items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-3 py-2 rounded-xl active:opacity-80">
              <Ionicons name="wallet-outline" size={15} color="#34D399" />
              <Text className="text-xs font-bold text-emerald-400">Budget</Text>
            </Pressable>
          )}
        </View>
      </View>

      <PeriodSelector selectedYear={selectedYear} onSelectYear={setSelectedYear} selectedMonth={selectedMonth} onSelectMonth={setSelectedMonth} />
      <ExpenseSummaryCard totalExpenses={filteredData.totalExpenses} totalIncome={filteredData.totalIncome} transactionCount={filteredData.filteredTransactions.length} month={selectedMonth} year={selectedYear} monthlyBudget={monthlyBudget} onSetMonthlyBudget={onSetMonthlyBudget} />
      <YearlyInsightCard categoryList={filteredData.categoryList} totalExpenses={filteredData.totalExpenses} year={selectedYear} />

      {filteredData.categoryList.length > 0 && (
        <View className="mb-8">
          <Text className="text-[17px] font-semibold text-white mb-4">
            Category Breakdown ({selectedMonth !== 'All' ? selectedMonth : 'Period'})
          </Text>
          <View className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 divide-y divide-slate-800/40">
            {filteredData.categoryList.map((cat, idx) => (
              <View key={cat.name} className={`flex-row justify-between items-center py-3.5 ${idx === 0 ? '' : 'pt-4'}`}>
                <View className="flex-row items-center gap-3">
                  <Text className="text-[17px]">{cat.emoji}</Text>
                  <Text className="text-[15px] font-semibold text-white">{cat.name}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-[15px] font-bold text-white">₹{cat.amount.toLocaleString('en-IN')}</Text>
                  <Text className="text-[12px] text-slate-400 mt-0.5 font-medium">{cat.percentage}% of period</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Day-by-Day Expenses Breakdown */}
      <DayByDayExpensesList dayGroups={filteredData.dayGroups} onDeleteTransaction={onDeleteTransaction} />
    </ScrollView>
  );
}

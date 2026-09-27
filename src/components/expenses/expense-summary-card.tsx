import React from 'react';
import { View, Text } from 'react-native';

interface ExpenseSummaryCardProps {
  totalExpenses: number;
  totalIncome: number;
  transactionCount: number;
  month: string;
  year: string;
}

export function ExpenseSummaryCard({
  totalExpenses,
  totalIncome,
  transactionCount,
  month,
  year,
}: ExpenseSummaryCardProps) {
  const displayTitle = `${month !== 'All' ? month : ''} ${year !== 'All' ? year : 'Total Period'}`.trim();

  return (
    <View className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl mb-6">
      <Text className="text-[12px] uppercase font-semibold text-slate-400 mb-1">
        {displayTitle} Expenses
      </Text>
      <Text className="text-[34px] font-extrabold text-amber-400 tracking-tight">
        ₹{totalExpenses.toLocaleString('en-IN')}
      </Text>
      <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-slate-800/60">
        <Text className="text-[13px] text-slate-400 font-medium">
          {transactionCount} recorded transactions
        </Text>
        <Text className="text-[13px] text-emerald-400 font-medium">
          Income: ₹{totalIncome.toLocaleString('en-IN')}
        </Text>
      </View>
    </View>
  );
}

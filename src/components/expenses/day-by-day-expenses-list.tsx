import React from 'react';
import { View, Text } from 'react-native';
import { DayGroup } from '@/utils/transaction-helper';

interface DayByDayExpensesListProps {
  dayGroups: DayGroup[];
}

export function DayByDayExpensesList({ dayGroups }: DayByDayExpensesListProps) {
  if (dayGroups.length === 0) return null;

  return (
    <View className="mb-8">
      <Text className="text-[17px] font-semibold text-white mb-4">Day-by-Day Expenses</Text>
      <View className="gap-4">
        {dayGroups.map((group) => (
          <View key={group.dateLabel} className="bg-slate-900/40 border border-slate-800/40 rounded-2xl p-4">
            <View className="flex-row justify-between items-center pb-2.5 mb-2 border-b border-slate-800/60">
              <Text className="text-[14px] font-bold text-emerald-400">{group.dateLabel}</Text>
              <Text className="text-[13px] font-bold text-white">Total: ₹{group.totalExpenses.toLocaleString('en-IN')}</Text>
            </View>
            <View className="divide-y divide-slate-800/30">
              {group.items.map((item) => (
                <View key={item.id} className="flex-row justify-between items-center py-2">
                  <View className="flex-row items-center gap-2.5">
                    <Text className="text-base">{item.emoji || '📦'}</Text>
                    <View>
                      <Text className="text-[14px] font-medium text-white">{item.title}</Text>
                      <Text className="text-[11px] text-slate-400">{item.category}</Text>
                    </View>
                  </View>
                  <Text className="text-[14px] font-semibold text-slate-200">-₹{item.amount.toLocaleString('en-IN')}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

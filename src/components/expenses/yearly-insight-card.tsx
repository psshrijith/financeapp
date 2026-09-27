import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategorySpend {
  name: string;
  amount: number;
  emoji: string;
  percentage: number;
}

interface YearlyInsightCardProps {
  categoryList: CategorySpend[];
  totalExpenses: number;
  year: string;
}

export function YearlyInsightCard({ categoryList, totalExpenses, year }: YearlyInsightCardProps) {
  if (categoryList.length === 0 || totalExpenses === 0) return null;

  const topCategory = categoryList[0];
  const displayYear = year === 'All' ? 'Overall' : year;

  return (
    <View className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 mb-6 shadow-xl">
      {/* Top Banner Header */}
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 items-center justify-center">
          <Ionicons name="trophy-outline" size={16} color="#F59E0B" />
        </View>
        <Text className="text-[13px] uppercase font-bold tracking-wider text-amber-400">
          {displayYear} Top Expense Insight
        </Text>
      </View>

      {/* Main Insight Text */}
      <Text className="text-[16px] font-semibold text-white leading-snug mb-4">
        {topCategory.emoji} <Text className="font-bold text-amber-300">{topCategory.name}</Text> was your highest expense, totaling{' '}
        <Text className="font-extrabold text-white">₹{topCategory.amount.toLocaleString('en-IN')}</Text>{' '}
        ({topCategory.percentage}% of all {displayYear.toLowerCase()} spending).
      </Text>

      {/* Modern Horizontal Bar Graph */}
      <View className="space-y-3 pt-3 border-t border-slate-800/80">
        <Text className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Top Expenses Breakdown
        </Text>
        {categoryList.slice(0, 4).map((cat) => (
          <View key={cat.name} className="space-y-1">
            <View className="flex-row justify-between items-center text-[12px]">
              <Text className="text-[13px] font-medium text-slate-200">
                {cat.emoji} {cat.name}
              </Text>
              <Text className="text-[13px] font-bold text-slate-300">
                ₹{cat.amount.toLocaleString('en-IN')} ({cat.percentage}%)
              </Text>
            </View>

            {/* Visual Bar */}
            <View className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <View
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${Math.min(100, Math.max(5, cat.percentage))}%` }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

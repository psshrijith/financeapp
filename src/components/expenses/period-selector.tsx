import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

export const MONTHS = [
  'All',
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const YEARS = ['All', '2026', '2025', '2024', '2023'];

interface PeriodSelectorProps {
  selectedYear: string;
  onSelectYear: (year: string) => void;
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
}

export function PeriodSelector({
  selectedYear,
  onSelectYear,
  selectedMonth,
  onSelectMonth,
}: PeriodSelectorProps) {
  return (
    <View className="mb-6 space-y-3">
      {/* Year Selector */}
      <View>
        <Text className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Select Year
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {YEARS.map((yr) => {
            const isSelected = selectedYear === yr;
            return (
              <Pressable
                key={yr}
                onPress={() => onSelectYear(yr)}
                className={`px-3.5 py-1.5 rounded-full border mr-2 ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-500/20'
                    : 'border-slate-800 bg-slate-900/60'
                }`}>
                <Text
                  className={`text-[13px] font-medium ${
                    isSelected ? 'text-emerald-400 font-bold' : 'text-slate-300'
                  }`}>
                  {yr === 'All' ? 'All Years' : yr}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Month Selector */}
      <View className="mt-2">
        <Text className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Select Month
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {MONTHS.map((m, idx) => {
            const isSelected = selectedMonth === m;
            return (
              <Pressable
                key={m}
                onPress={() => onSelectMonth(m)}
                className={`px-3.5 py-1.5 rounded-full border mr-2 ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-500/20'
                    : 'border-slate-800 bg-slate-900/60'
                }`}>
                <Text
                  className={`text-[13px] font-medium ${
                    isSelected ? 'text-emerald-400 font-bold' : 'text-slate-300'
                  }`}>
                  {m === 'All' ? 'All Months' : m}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

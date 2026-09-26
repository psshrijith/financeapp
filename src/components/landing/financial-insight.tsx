import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DUMMY_PRIMARY_INSIGHT } from '@/data/dummy-finance-data';

export function FinancialInsightCard() {
  const { title, highlightText, amount, percentageChange, comparePeriod, budgetMessage } =
    DUMMY_PRIMARY_INSIGHT;

  return (
    <View className="mb-7 p-5 rounded-3xl bg-indigo-950/40 border border-indigo-900/40 gap-3">
      {/* Header Tag */}
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="sparkles" size={15} color="#818CF8" />
        <Text className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
          {title}
        </Text>
      </View>

      {/* Primary Insight Text */}
      <Text className="text-lg font-semibold text-slate-100 leading-snug">
        {highlightText}
      </Text>

      {/* Supporting Amount Stats */}
      <View className="flex-row items-baseline gap-2">
        <Text className="text-2xl font-bold text-white">
          ₹{amount.toLocaleString('en-IN')}
        </Text>
        <Text className="text-xs font-semibold text-amber-400">
          ↑ {percentageChange}% from {comparePeriod}
        </Text>
      </View>

      {/* Budget Message */}
      {budgetMessage ? (
        <Text className="text-sm text-slate-300 mt-0.5 font-normal">
          {budgetMessage}
        </Text>
      ) : null}

      <Pressable className="self-start mt-1 active:opacity-70">
        <Text className="text-sm font-semibold text-indigo-400">
          View details →
        </Text>
      </Pressable>
    </View>
  );
}

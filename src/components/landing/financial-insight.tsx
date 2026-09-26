import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DUMMY_PRIMARY_INSIGHT } from '@/data/dummy-finance-data';

export function FinancialInsightCard() {
  const { title, highlightText, amount, percentageChange, budgetMessage } =
    DUMMY_PRIMARY_INSIGHT;

  return (
    <View className="mb-6 p-4 rounded-[20px] bg-indigo-950/40 border border-indigo-900/40 max-h-[160px] justify-between">
      {/* Header Tag */}
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="sparkles" size={13} color="#818CF8" />
        <Text className="text-[12px] font-semibold text-indigo-300 uppercase tracking-wider">
          ✦ {title}
        </Text>
      </View>

      {/* Primary Headline */}
      <Text className="text-[17px] font-semibold text-slate-100 leading-snug my-1" numberOfLines={2}>
        {highlightText}
      </Text>

      {/* Amount + Change badge */}
      <View className="flex-row items-baseline gap-2">
        <Text className="text-[22px] font-bold text-white">
          ₹{amount.toLocaleString('en-IN')}
        </Text>
        <Text className="text-[13px] font-semibold text-amber-400">
          ↑{percentageChange}%
        </Text>
      </View>

      {/* Budget Message */}
      {budgetMessage ? (
        <Text className="text-[13px] text-slate-400 font-normal">
          {budgetMessage}
        </Text>
      ) : null}
    </View>
  );
}

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DUMMY_PRIMARY_INSIGHT } from '@/data/dummy-finance-data';

export function InsightCard() {
  const { title, highlightText, amount, percentageChange, budgetMessage } =
    DUMMY_PRIMARY_INSIGHT;

  return (
    <View className="mb-6 p-4 rounded-[22px] bg-indigo-950/40 border border-indigo-900/40 justify-between min-h-[135px]">
      {/* Header Tag */}
      <View className="flex-row items-center gap-1.5">
        <Ionicons name="sparkles" size={13} color="#818CF8" />
        <Text className="text-[12px] font-semibold text-indigo-300 uppercase tracking-wider">
          ✦ {title}
        </Text>
      </View>

      {/* Primary Headline */}
      <Text className="text-[17px] font-semibold text-slate-100 leading-snug my-1">
        {highlightText}
      </Text>

      {/* Amount + Change badge */}
      <View className="flex-row items-baseline gap-3">
        <Text className="text-[23px] font-bold text-white">
          ₹{amount.toLocaleString('en-IN')}
        </Text>
        <Text className="text-[13px] font-semibold text-amber-400">
          ↑{percentageChange}%
        </Text>
      </View>

      {/* Budget Note */}
      {budgetMessage ? (
        <Text className="text-[14px] text-slate-400 font-normal mt-0.5">
          {budgetMessage}
        </Text>
      ) : null}
    </View>
  );
}

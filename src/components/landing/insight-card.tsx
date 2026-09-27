import React from 'react';
import { View, Text } from 'react-native';

interface InsightCardProps {
  isDemoData?: boolean;
}

export function InsightCard({ isDemoData = true }: InsightCardProps) {
  if (!isDemoData) {
    return (
      <View className="border-l-2 border-emerald-500/90 pl-4 py-0.5 mb-8">
        <Text className="text-[13px] font-medium text-emerald-400 mb-1.5">
          Getting started
        </Text>

        <Text className="text-[15px] leading-relaxed text-slate-300 font-normal">
          Track your income, expenses, and net worth effortlessly. Tap{' '}
          <Text className="font-semibold text-white">+ Add Transaction</Text> to record your first entry.
        </Text>
      </View>
    );
  }

  return (
    <View className="border-l-2 border-emerald-500/90 pl-4 py-0.5 mb-8">
      <Text className="text-[13px] font-medium text-emerald-400 mb-1.5">
        Worth knowing
      </Text>

      <Text className="text-[15px] leading-relaxed text-slate-300 font-normal">
        Food spending is <Text className="font-bold text-white">up 18%</Text> from last month — you&apos;ve spent{' '}
        <Text className="font-bold text-emerald-400">₹8,450</Text> of your ₹12,000 budget, with 3 days left.
      </Text>
    </View>
  );
}



import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DUMMY_FINANCIAL_SNAPSHOT } from '@/data/dummy-finance-data';

interface FinancialSnapshotProps {
  snapshot?: typeof DUMMY_FINANCIAL_SNAPSHOT;
}

export function FinancialSnapshot({
  snapshot = DUMMY_FINANCIAL_SNAPSHOT,
}: FinancialSnapshotProps) {
  const [showBalance, setShowBalance] = useState(true);
  const { totalBalance, monthlyChange, income, expenses, saved, savingsRate } =
    snapshot;

  return (
    <View className="mb-7">
      {/* Month Label */}
      <Text className="text-[14px] font-semibold text-slate-400 mb-1">
        September
      </Text>

      {/* Primary Hero Balance */}
      <View className="flex-row items-center gap-3">
        <Text className="text-[36px] font-black text-white tracking-tight leading-none">
          {showBalance ? `₹${totalBalance.toLocaleString('en-IN')}` : '••••••••'}
        </Text>
        <Pressable onPress={() => setShowBalance(!showBalance)} className="active:opacity-70 p-1">
          <Ionicons
            name={showBalance ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color="#64748B"
          />
        </Pressable>
      </View>

      <Text className="text-[14px] text-slate-400 font-normal mt-1">
        Total balance
      </Text>

      <View className="flex-row items-center gap-1.5 mt-2">
        <Ionicons name="trending-up" size={14} color="#34D399" />
        <Text className="text-emerald-400 font-semibold text-[13px]">
          ↑ ₹{monthlyChange.toLocaleString('en-IN')} this month
        </Text>
      </View>

      {/* Subtle Horizontal Divider */}
      <View className="h-px bg-slate-800/80 my-5" />

      {/* 3-Column Cash Flow Summary (NO 3 separate cards) */}
      <View className="flex-row justify-between items-start divide-x divide-slate-800/80">
        {/* Income Column */}
        <View className="flex-1 pr-2">
          <Text className="text-[13px] text-slate-400 font-normal mb-0.5">
            Income
          </Text>
          <Text className="text-[17px] font-bold text-white">
            ₹{income.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Expenses Column */}
        <View className="flex-1 px-3">
          <Text className="text-[13px] text-slate-400 font-normal mb-0.5">
            Expenses
          </Text>
          <Text className="text-[17px] font-bold text-white">
            ₹{expenses.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Saved Column */}
        <View className="flex-1 pl-3">
          <Text className="text-[13px] text-slate-400 font-normal mb-0.5">
            Saved
          </Text>
          <Text className="text-[17px] font-bold text-white">
            ₹{saved.toLocaleString('en-IN')}
          </Text>
          <Text className="text-[12px] font-semibold text-indigo-400 mt-0.5">
            {savingsRate}%
          </Text>
        </View>
      </View>
    </View>
  );
}

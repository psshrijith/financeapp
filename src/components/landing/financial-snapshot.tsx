import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DUMMY_FINANCIAL_SNAPSHOT } from '@/data/dummy-finance-data';

export function FinancialSnapshot() {
  const [showBalance, setShowBalance] = useState(true);
  const { totalBalance, monthlyChange, income, expenses, saved, savingsRate } =
    DUMMY_FINANCIAL_SNAPSHOT;

  return (
    <View className="mb-8">
      {/* Month Title */}
      <Text className="text-sm font-semibold text-slate-400 mb-2">
        September
      </Text>

      {/* Primary Balance Row */}
      <View className="flex-row items-center gap-3">
        <Text className="text-3.5xl font-black text-white tracking-tight">
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

      <Text className="text-sm text-slate-400 font-medium mt-1">
        Total balance
      </Text>

      <View className="flex-row items-center gap-1.5 mt-2">
        <Ionicons name="trending-up" size={15} color="#34D399" />
        <Text className="text-emerald-400 font-semibold text-xs">
          ↑ ₹{monthlyChange.toLocaleString('en-IN')} this month
        </Text>
      </View>

      {/* Subtle Horizontal Divider */}
      <View className="h-px bg-slate-800/80 my-5" />

      {/* Income & Expenses Grid */}
      <View className="flex-row justify-between mb-4">
        <View>
          <Text className="text-sm text-slate-400 font-medium mb-1">Income</Text>
          <Text className="text-lg font-bold text-white">
            ₹{income.toLocaleString('en-IN')}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-sm text-slate-400 font-medium mb-1">Expenses</Text>
          <Text className="text-lg font-bold text-white">
            ₹{expenses.toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      {/* Saved Summary */}
      <View className="mt-1">
        <Text className="text-sm text-slate-400 font-medium mb-1">Saved</Text>
        <Text className="text-xl font-extrabold text-white">
          ₹{saved.toLocaleString('en-IN')}{' '}
          <Text className="text-sm font-semibold text-indigo-400">
            · {savingsRate}%
          </Text>
        </Text>
      </View>
    </View>
  );
}

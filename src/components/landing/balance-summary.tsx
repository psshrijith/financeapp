import React, { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

import { DUMMY_FINANCIAL_SNAPSHOT } from '@/data/dummy-finance-data';

interface BalanceSummaryProps {
  snapshot?: typeof DUMMY_FINANCIAL_SNAPSHOT;
}

export function BalanceSummary({
  snapshot = DUMMY_FINANCIAL_SNAPSHOT,
}: BalanceSummaryProps) {
  const [showBalance, setShowBalance] = useState(true);
  const { totalBalance, monthlyChange } = snapshot;

  return (
    <View className="mb-6">
      {/* Label */}
      <Text className="text-[13px] font-medium text-slate-400 mb-1">
        Total balance
      </Text>

      {/* Hero Balance & Mini Sparkline Graph */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2.5">
          <Text
            className="text-[38px] font-bold text-white tracking-tight leading-none font-serif"
            style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
          >
            {showBalance ? `₹${totalBalance.toLocaleString('en-IN')}` : '••••••••'}
          </Text>
          <Pressable onPress={() => setShowBalance(!showBalance)} className="active:opacity-70 p-1">
            <Ionicons
              name={showBalance ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#64748B"
            />
          </Pressable>
        </View>

        {/* Mini SVG Sparkline */}
        <View className="w-20 h-9 items-center justify-center">
          <Svg width={72} height={32} viewBox="0 0 72 32" fill="none">
            <Defs>
              <LinearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#34D399" stopOpacity="0.4" />
                <Stop offset="100%" stopColor="#34D399" stopOpacity="0.0" />
              </LinearGradient>
            </Defs>
            <Path
              d="M 2 26 Q 18 28 32 18 T 54 12 T 70 4 L 70 30 L 2 30 Z"
              fill="url(#sparklineGrad)"
            />
            <Path
              d="M 2 26 Q 18 28 32 18 T 54 12 T 70 4"
              stroke="#34D399"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </View>

      {/* Monthly Change Trend Data Point */}
      <View className="flex-row items-center gap-1.5 mt-2">
        <Ionicons name="trending-up" size={14} color="#34D399" />
        <Text className="text-emerald-400 font-semibold text-[13px]">
          ↑ ₹{monthlyChange.toLocaleString('en-IN')} this month
        </Text>
      </View>
    </View>
  );
}

export function CashFlowSummary({
  snapshot = DUMMY_FINANCIAL_SNAPSHOT,
}: BalanceSummaryProps) {
  const { income, expenses, saved, savingsRate } = snapshot;

  return (
    <View className="mb-8">
      {/* Subtle Divider */}
      <View className="h-px bg-slate-800/80 mb-5" />

      {/* 3-Column Cash Flow (No boxed cards, vertical dividers) */}
      <View className="flex-row justify-between items-center divide-x divide-slate-800/80">
        {/* Income Column */}
        <View className="flex-1 pr-2">
          <Text className="text-[12px] uppercase tracking-wider text-slate-400 font-medium mb-1">
            Income
          </Text>
          <Text className="text-[17px] font-semibold text-white">
            ₹{income.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Expenses Column */}
        <View className="flex-1 px-3">
          <Text className="text-[12px] uppercase tracking-wider text-slate-400 font-medium mb-1">
            Expenses
          </Text>
          <Text className="text-[17px] font-semibold text-white">
            ₹{expenses.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Saved Column */}
        <View className="flex-1 pl-3">
          <Text className="text-[12px] uppercase tracking-wider text-slate-400 font-medium mb-1">
            Saved
          </Text>
          <Text className="text-[17px] font-bold text-emerald-400">
            ₹{saved.toLocaleString('en-IN')}
          </Text>
          <Text className="text-[11px] font-medium text-slate-400 mt-0.5">
            {savingsRate}% of income
          </Text>
        </View>
      </View>
    </View>
  );
}


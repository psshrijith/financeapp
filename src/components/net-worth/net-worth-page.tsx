import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NetWorthData } from '@/types/finance';
import { DUMMY_NET_WORTH_DATA } from '@/data/dummy-finance-data';


interface NetWorthPageProps {
  netWorthData?: NetWorthData;
}

export function NetWorthPage({
  netWorthData = DUMMY_NET_WORTH_DATA,
}: NetWorthPageProps) {

  const safeAreaInsets = useSafeAreaInsets();
  const { totalNetWorth, monthlyChange, assets, liabilities, breakdown } =
    netWorthData;

  const containerPadding = {
    paddingTop: safeAreaInsets.top + 8,
    paddingBottom: safeAreaInsets.bottom + 100,
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={[{ paddingHorizontal: 20 }, containerPadding]}
      showsVerticalScrollIndicator={false}>
      {/* 1. Header */}
      <View className="mb-6">
        <Text className="text-[24px] font-bold text-white tracking-tight">
          Net worth
        </Text>
        <Text className="text-[13px] text-slate-400 font-normal mt-0.5">
          Everything you own, minus what you owe
        </Text>
      </View>


      {/* 2. Hero Net Worth Summary */}
      <View className="mb-2">
        <Text className="text-[13px] text-slate-400 font-medium mb-1">
          Total net worth
        </Text>
        <Text
          className="text-[38px] font-bold text-white tracking-tight leading-none font-serif"
          style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}>
          ₹{totalNetWorth.toLocaleString('en-IN')}
        </Text>

        <View className="flex-row items-center gap-1.5 mt-2 mb-6">
          <Text className="text-emerald-400 font-semibold text-[13px]">
            ↑ ₹{monthlyChange.toLocaleString('en-IN')} this month
          </Text>
        </View>
      </View>

      {/* 3. Smooth Growth SVG Chart */}
      <View className="w-full h-20 mb-8 items-center justify-center">
        <Svg height={64} width="100%" viewBox="0 0 320 64" fill="none">
          <Path
            d="M 2 52 C 80 50, 160 38, 240 22 T 316 8"
            stroke="#34D399"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Circle cx={316} cy={8} r={4} fill="#34D399" />
        </Svg>
      </View>

      {/* 4. Assets & Liabilities Cards Row */}
      <View className="flex-row gap-3 mb-8">
        {/* Assets Card */}
        <View className="flex-1 bg-slate-900/60 border border-slate-800/40 rounded-2xl p-4">
          <Text className="text-[13px] text-slate-400 font-medium mb-1">
            Assets
          </Text>
          <Text className="text-[20px] font-bold text-emerald-400 tracking-tight">
            ₹{assets.toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Liabilities Card */}
        <View className="flex-1 bg-slate-900/60 border border-slate-800/40 rounded-2xl p-4">
          <Text className="text-[13px] text-slate-400 font-medium mb-1">
            Liabilities
          </Text>
          <Text className="text-[20px] font-bold text-amber-500 tracking-tight">
            ₹{liabilities.toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      {/* 5. Breakdown Section */}
      <View className="mb-8">
        <Text className="text-[18px] font-bold text-white mb-3">
          Breakdown
        </Text>

        <View className="divide-y divide-slate-800/40">
          {breakdown.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center py-3.5">
              {/* Left: Dot + Title + Category */}
              <View className="flex-row items-center flex-1">
                <View
                  className="w-2.5 h-2.5 rounded-full mr-3"
                  style={{ backgroundColor: item.dotColor }}
                />
                <View>
                  <Text className="text-[15px] font-medium text-white">
                    {item.name}
                  </Text>
                  <Text className="text-[12px] text-slate-400 mt-0.5 font-normal">
                    {item.category}
                  </Text>
                </View>
              </View>

              {/* Right: Amount + Percentage of assets */}
              <View className="items-end">
                <Text className="text-[15px] font-semibold text-white">
                  {item.amount < 0
                    ? `-₹${Math.abs(item.amount).toLocaleString('en-IN')}`
                    : `₹${item.amount.toLocaleString('en-IN')}`}
                </Text>
                <Text className="text-[12px] text-slate-400 mt-0.5 font-normal">
                  {item.percentageOfAssets}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default NetWorthPage;

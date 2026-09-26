import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

import {
  DUMMY_SPENDING_CATEGORIES,
  DUMMY_SPENDING_TOTAL,
} from '@/data/dummy-finance-data';

export function SpendingDonut() {
  const size = 150;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate arc offsets for segments
  let cumulativePercent = 0;

  return (
    <View className="mb-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-xl font-bold text-white tracking-tight">
          Spending
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="text-sm font-semibold text-indigo-400">
            View all →
          </Text>
        </Pressable>
      </View>

      {/* Donut Chart Block */}
      <View className="items-center justify-center my-2 py-2">
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={size} height={size}>
            <G transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              {DUMMY_SPENDING_CATEGORIES.map((cat) => {
                const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((cumulativePercent / 100) * circumference);
                cumulativePercent += cat.percentage;

                return (
                  <Circle
                    key={cat.id}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={cat.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                  />
                );
              })}
            </G>
          </Svg>

          {/* Center Text in Donut Chart */}
          <View className="absolute items-center justify-center">
            <Text className="text-base font-extrabold text-white">
              ₹{DUMMY_SPENDING_TOTAL.toLocaleString('en-IN')}
            </Text>
            <Text className="text-xs text-slate-400 font-medium">
              spent
            </Text>
          </View>
        </View>
      </View>

      {/* 4 Clean Category Rows (52-60px tap height) */}
      <View className="gap-1 mt-4">
        {DUMMY_SPENDING_CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            className="flex-row justify-between items-center h-14 px-1 rounded-xl active:bg-slate-900/50">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 items-center justify-center">
                <Text className="text-base">{cat.emoji}</Text>
              </View>
              <Text className="text-base font-semibold text-slate-100">
                {cat.name}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-base font-bold text-white">
                ₹{cat.amount.toLocaleString('en-IN')}
              </Text>
              <Text className="text-xs text-slate-400 font-medium mt-0.5">
                {cat.percentage}%
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

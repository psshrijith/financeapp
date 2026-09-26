import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

import {
  DUMMY_SPENDING_CATEGORIES,
  DUMMY_SPENDING_TOTAL,
} from '@/data/dummy-finance-data';

export function SpendingDonut() {
  const size = 125;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate arc offsets for segments
  let cumulativePercent = 0;

  return (
    <View className="mb-7">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[19px] font-bold text-white tracking-tight">
          Spending
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="text-[14px] font-semibold text-indigo-400">
            See all →
          </Text>
        </Pressable>
      </View>

      {/* Side-by-Side Two-Column Layout (Donut LEFT + Categories RIGHT) */}
      <View className="flex-row items-center justify-between">
        {/* LEFT COLUMN: 125px Compact Donut Chart */}
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

          {/* Center Total Text */}
          <View className="absolute items-center justify-center">
            <Text className="text-[15px] font-extrabold text-white">
              ₹37,450
            </Text>
            <Text className="text-[11px] text-slate-400 font-medium">
              spent
            </Text>
          </View>
        </View>

        {/* RIGHT COLUMN: 4 Compact Category Rows (sitting right beside donut) */}
        <View className="flex-1 pl-4 gap-1">
          {DUMMY_SPENDING_CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              className="flex-row justify-between items-center h-[38px] active:opacity-70">
              <View className="flex-row items-center gap-2">
                <Text className="text-[15px]">{cat.emoji}</Text>
                <Text className="text-[15px] font-semibold text-slate-100">
                  {cat.name}
                </Text>
              </View>

              <Text className="text-[14px] font-semibold text-slate-200">
                ₹{cat.amount.toLocaleString('en-IN')}{' '}
                <Text className="text-[13px] text-slate-400 font-normal">
                  · {cat.percentage}%
                </Text>
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

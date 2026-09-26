import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getGreetingByTime } from '@/utils/greeting';
import { getCurrentMonthYear } from '@/utils/date';

export function FinanceHeader() {
  const greeting = getGreetingByTime();
  const currentMonthYear = getCurrentMonthYear();

  return (
    <View className="flex-row justify-between items-start pt-2 pb-5">
      <View>
        <Text className="text-[23px] font-semibold text-slate-100 tracking-tight">
          {greeting}
        </Text>
        <Text className="text-[14px] text-slate-400 font-normal mt-0.5">
          {currentMonthYear}
        </Text>
      </View>

      <Pressable className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 items-center justify-center active:opacity-70">
        <Ionicons name="person" size={18} color="#F1F5F9" />
      </Pressable>
    </View>
  );
}

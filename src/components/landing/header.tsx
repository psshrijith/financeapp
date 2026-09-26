import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getGreetingByTime } from '@/utils/greeting';
import { getCurrentMonthYear } from '@/utils/date';

export function Header() {
  const greeting = getGreetingByTime();
  const currentMonthYear = getCurrentMonthYear();

  return (
    <View className="flex-row justify-between items-start pt-2 pb-6">
      <View>
        <Text className="text-2.5xl font-semibold text-slate-100 tracking-tight">
          {greeting}
        </Text>
        <Text className="text-base text-slate-400 font-normal mt-1">
          {currentMonthYear}
        </Text>
      </View>

      <Pressable className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 items-center justify-center active:opacity-70 shadow-xs">
        <Ionicons name="person-outline" size={20} color="#F1F5F9" />
      </Pressable>
    </View>
  );
}

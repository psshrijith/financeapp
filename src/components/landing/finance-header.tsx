import React from 'react';
import { View, Text } from 'react-native';
import { getGreetingByTime } from '@/utils/greeting';

export function FinanceHeader() {
  const greeting = getGreetingByTime();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View className="pt-3 pb-6">
      <Text className="text-[23px] font-semibold text-white tracking-tight">
        {greeting}
      </Text>
      <Text className="text-[14px] text-slate-400 font-normal mt-1">
        {currentDate}
      </Text>
    </View>
  );
}

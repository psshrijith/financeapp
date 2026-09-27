import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { DUMMY_USER_PROFILE } from '@/data/dummy-finance-data';

export function FinanceHeader() {
  return (
    <View className="pt-3 pb-6">
      <Text className="text-[23px] font-semibold text-white tracking-tight">
        Good evening 👋
      </Text>
      <Text className="text-[14px] text-slate-400 font-normal mt-1">
        September 2026
      </Text>
    </View>
  );
}


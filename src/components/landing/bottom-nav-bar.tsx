import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function BottomNavBar() {
  const insets = useSafeAreaInsets();

  return (
    <View className="absolute bottom-0 left-0 right-0 z-40 bg-slate-950 border-t border-slate-800/80">
      {/* Floating Action Button (+) centered fixed above navigation */}
      <View
        className="absolute -top-7 align-self-center z-50 pointer-events-box-none"
        style={{ left: 0, right: 0, alignItems: 'center' }}>
        <Pressable className="w-14 h-14 rounded-full bg-indigo-600 items-center justify-center shadow-lg shadow-indigo-600/40 active:scale-95 active:opacity-90">
          <Ionicons name="add-outline" size={32} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* 4 Navigation Tabs */}
      <View
        className="flex-row justify-around items-center pt-2.5 pb-1"
        style={{ paddingBottom: Math.max(insets.bottom, 10) }}>
        {/* Home (Active Tab) */}
        <Pressable className="items-center flex-1 active:opacity-70 min-h-[44px] justify-center">
          <Ionicons name="home" size={20} color="#818CF8" />
          <Text className="text-xs font-bold text-indigo-400 mt-1">
            Home
          </Text>
        </Pressable>

        {/* Transactions Tab */}
        <Pressable className="items-center flex-1 active:opacity-70 pr-4 min-h-[44px] justify-center">
          <Ionicons name="swap-horizontal-outline" size={20} color="#64748B" />
          <Text className="text-xs font-medium text-slate-400 mt-1">
            Transactions
          </Text>
        </Pressable>

        {/* Goals Tab */}
        <Pressable className="items-center flex-1 active:opacity-70 pl-4 min-h-[44px] justify-center">
          <Ionicons name="pie-chart-outline" size={20} color="#64748B" />
          <Text className="text-xs font-medium text-slate-400 mt-1">
            Goals
          </Text>
        </Pressable>

        {/* More Tab */}
        <Pressable className="items-center flex-1 active:opacity-70 min-h-[44px] justify-center">
          <Ionicons name="ellipsis-horizontal-outline" size={20} color="#64748B" />
          <Text className="text-xs font-medium text-slate-400 mt-1">
            More
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

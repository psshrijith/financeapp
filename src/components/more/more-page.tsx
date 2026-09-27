import React from 'react';
import { View, Text, ScrollView, Switch, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DUMMY_USER_PROFILE } from '@/data/dummy-finance-data';

interface MorePageProps {
  showCategorySplit: boolean;
  onToggleCategorySplit: (value: boolean) => void;
  useDemoData: boolean;
  onToggleDemoData: (value: boolean) => void;
}

export function MorePage({
  showCategorySplit,
  onToggleCategorySplit,
  useDemoData,
  onToggleDemoData,
}: MorePageProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const containerPadding = {
    paddingTop: safeAreaInsets.top + 8,
    paddingBottom: safeAreaInsets.bottom + 100,
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={[{ paddingHorizontal: 20 }, containerPadding]}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="flex-row items-center gap-2.5 mb-6">
        <View className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 items-center justify-center">
          <Ionicons name="settings-outline" size={20} color="#34D399" />
        </View>
        <View>
          <Text className="text-[24px] font-bold text-white tracking-tight">
            Settings
          </Text>
          <Text className="text-[13px] text-slate-400 font-normal">
            App preferences & controls
          </Text>
        </View>
      </View>

      {/* App Data & Customization Section */}
      <View className="mb-6">
        <Text className="text-[13px] uppercase tracking-wider text-slate-400 font-medium mb-3">
          App Data & Customization
        </Text>

        <View className="bg-slate-900/60 border border-slate-800/60 rounded-2xl divide-y divide-slate-800/40">
          {/* Demo Data Toggle */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-3 flex-1 pr-3">
              <View className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center">
                <Ionicons name="flask-outline" size={18} color="#34D399" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-white">
                  Sample / Demo Data
                </Text>
                <Text className="text-[12px] text-slate-400 mt-0.5">
                  Populate app with sample transactions & values
                </Text>
              </View>
            </View>

            <Switch
              value={useDemoData}
              onValueChange={onToggleDemoData}
              trackColor={{ false: '#334155', true: '#10B981' }}
              thumbColor={useDemoData ? '#FFFFFF' : '#94A3B8'}
            />
          </View>

          {/* Category Split Toggle */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-3 flex-1 pr-3">
              <View className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center">
                <Ionicons name="pie-chart-outline" size={18} color="#34D399" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-semibold text-white">
                  Split by Category
                </Text>
                <Text className="text-[12px] text-slate-400 mt-0.5">
                  Show Spending by Category section on homepage
                </Text>
              </View>
            </View>

            <Switch
              value={showCategorySplit}
              onValueChange={onToggleCategorySplit}
              trackColor={{ false: '#334155', true: '#10B981' }}
              thumbColor={showCategorySplit ? '#FFFFFF' : '#94A3B8'}
            />
          </View>
        </View>
      </View>



      {/* General Settings Section */}
      <View className="mb-6">
        <Text className="text-[13px] uppercase tracking-wider text-slate-400 font-medium mb-3">
          General Preferences
        </Text>

        <View className="bg-slate-900/60 border border-slate-800/60 rounded-2xl divide-y divide-slate-800/40">
          {/* Currency */}
          <Pressable className="flex-row items-center justify-between p-4 active:opacity-70">
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 items-center justify-center">
                <Ionicons name="cash-outline" size={18} color="#818CF8" />
              </View>
              <Text className="text-[15px] font-medium text-white">
                Currency
              </Text>
            </View>
            <Text className="text-[14px] text-slate-400 font-medium">
              INR (₹)
            </Text>
          </Pressable>

          {/* Security */}
          <Pressable className="flex-row items-center justify-between p-4 active:opacity-70">
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center">
                <Ionicons name="shield-checkmark-outline" size={18} color="#34D399" />
              </View>
              <Text className="text-[15px] font-medium text-white">
                Biometric Lock
              </Text>
            </View>
            <Text className="text-[14px] text-slate-400 font-medium">
              Enabled
            </Text>
          </Pressable>

          {/* Appearance */}
          <Pressable className="flex-row items-center justify-between p-4 active:opacity-70">
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 items-center justify-center">
                <Ionicons name="moon-outline" size={18} color="#94A3B8" />
              </View>
              <Text className="text-[15px] font-medium text-white">
                Theme
              </Text>
            </View>
            <Text className="text-[14px] text-slate-400 font-medium">
              Dark Minimal
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default MorePage;

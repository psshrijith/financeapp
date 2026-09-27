import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsList } from './settings-list';

interface MorePageProps {
  showCategorySplit: boolean;
  onToggleCategorySplit: (value: boolean) => void;
  useDemoData: boolean;
  onToggleDemoData: (value: boolean) => void;
  onRestoreBackup?: () => void;
  isRestored?: boolean;
}

export function MorePage({
  showCategorySplit,
  onToggleCategorySplit,
  useDemoData,
  onToggleDemoData,
  onRestoreBackup,
  isRestored,
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

      <SettingsList
        useDemoData={useDemoData}
        onToggleDemoData={onToggleDemoData}
        showCategorySplit={showCategorySplit}
        onToggleCategorySplit={onToggleCategorySplit}
        onRestoreBackup={onRestoreBackup}
        isRestored={isRestored}
      />
    </ScrollView>
  );
}

export default MorePage;



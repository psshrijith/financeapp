import React from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppDataSettingsProps {
  useDemoData: boolean;
  onToggleDemoData: (value: boolean) => void;
  showCategorySplit: boolean;
  onToggleCategorySplit: (value: boolean) => void;
  onRestoreBackup?: () => void;
  onUploadFile?: () => void;
  onManageCategories?: () => void;
  isRestored?: boolean;
}

export function AppDataSettings({
  useDemoData,
  onToggleDemoData,
  showCategorySplit,
  onToggleCategorySplit,
  onRestoreBackup,
  onUploadFile,
  onManageCategories,
  isRestored,
}: AppDataSettingsProps) {
  return (
    <View className="mb-6">
      <Text className="text-[13px] uppercase tracking-wider text-slate-400 font-medium mb-3">
        App Data & Customization
      </Text>

      <View className="bg-slate-900/60 border border-slate-800/60 rounded-2xl divide-y divide-slate-800/40">
        <Pressable
          onPress={onManageCategories}
          className="flex-row items-center justify-between p-4 active:opacity-70">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <View className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 items-center justify-center">
              <Ionicons name="grid-outline" size={18} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-white">Manage Categories</Text>
              <Text className="text-[12px] text-slate-400 mt-0.5">Add custom categories or delete existing ones</Text>
            </View>
          </View>
          <Text className="text-[13px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">Manage</Text>
        </Pressable>

        <Pressable
          onPress={onUploadFile || onRestoreBackup}
          className="flex-row items-center justify-between p-4 active:opacity-70">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <View className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 items-center justify-center">
              <Ionicons name="document-attach-outline" size={18} color="#C084FC" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-white">Upload Backup File</Text>
              <Text className="text-[12px] text-slate-400 mt-0.5">Choose SQLite or JSON file from device</Text>
            </View>
          </View>
          <Text className="text-[13px] font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">Upload</Text>
        </Pressable>

        <Pressable
          onPress={onRestoreBackup}
          className="flex-row items-center justify-between p-4 active:opacity-70">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <View className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 items-center justify-center">
              <Ionicons name="cloud-download-outline" size={18} color="#60A5FA" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-white">Restore Historical Backup</Text>
              <Text className="text-[12px] text-slate-400 mt-0.5">{isRestored ? 'Restored 2,916 transactions from backup' : 'Import 2,916 transactions from ~/Downloads'}</Text>
            </View>
          </View>
          <Text className="text-[13px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">{isRestored ? 'Active' : 'Restore'}</Text>
        </Pressable>

        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <View className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center">
              <Ionicons name="flask-outline" size={18} color="#34D399" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-white">Sample / Demo Data</Text>
              <Text className="text-[12px] text-slate-400 mt-0.5">Populate app with sample transactions & values</Text>
            </View>
          </View>
          <Switch value={useDemoData} onValueChange={onToggleDemoData} trackColor={{ false: '#334155', true: '#10B981' }} thumbColor={useDemoData ? '#FFFFFF' : '#94A3B8'} />
        </View>

        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <View className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center">
              <Ionicons name="pie-chart-outline" size={18} color="#34D399" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-white">Split by Category</Text>
              <Text className="text-[12px] text-slate-400 mt-0.5">Show Spending by Category section on homepage</Text>
            </View>
          </View>
          <Switch value={showCategorySplit} onValueChange={onToggleCategorySplit} trackColor={{ false: '#334155', true: '#10B981' }} thumbColor={showCategorySplit ? '#FFFFFF' : '#94A3B8'} />
        </View>
      </View>
    </View>
  );
}

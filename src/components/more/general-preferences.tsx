import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeMode } from './theme-modal';

interface GeneralPreferencesProps {
  themeMode?: AppThemeMode;
  onOpenThemeModal?: () => void;
  onLockApp?: () => void;
}

export function GeneralPreferences({
  themeMode = 'dim',
  onOpenThemeModal,
  onLockApp,
}: GeneralPreferencesProps) {
  const themeLabel = themeMode === 'lights-out' ? 'Lights Out (#000000)' : 'Dim (Slate)';

  return (
    <View className="mb-6">
      <Text className="text-[13px] uppercase tracking-wider text-slate-400 font-medium mb-3">
        General Preferences
      </Text>

      <View className="bg-slate-900/60 border border-slate-800/60 rounded-2xl divide-y divide-slate-800/40">
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

        <Pressable onPress={onLockApp} className="flex-row items-center justify-between p-4 active:opacity-70">
          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center">
              <Ionicons name="shield-checkmark-outline" size={18} color="#34D399" />
            </View>
            <Text className="text-[15px] font-medium text-white">
              Biometric Lock
            </Text>
          </View>
          <Text className="text-[13px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Lock Now 🔒
          </Text>
        </Pressable>

        <Pressable onPress={onOpenThemeModal} className="flex-row items-center justify-between p-4 active:opacity-70">
          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 items-center justify-center">
              <Ionicons name={themeMode === 'lights-out' ? 'sparkles-outline' : 'moon-outline'} size={18} color="#34D399" />
            </View>
            <Text className="text-[15px] font-medium text-white">
              Theme
            </Text>
          </View>
          <Text className="text-[14px] text-emerald-400 font-semibold">
            {themeLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

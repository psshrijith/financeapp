import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeMode } from './theme-modal';

interface GeneralPreferencesProps {
  themeMode?: AppThemeMode;
  onOpenThemeModal?: () => void;
  isAppLockEnabled?: boolean;
  hasPasscode?: boolean;
  onToggleAppLock?: () => void;
  onChangePasscode?: () => void;
  onLockApp?: () => void;
}

export function GeneralPreferences({
  themeMode = 'dim',
  onOpenThemeModal,
  isAppLockEnabled = false,
  hasPasscode = false,
  onToggleAppLock,
  onChangePasscode,
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

        {/* Passcode Lock Switch / Setup */}
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <View className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center">
              <Ionicons name="shield-checkmark-outline" size={18} color="#34D399" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-medium text-white">
                Passcode Lock
              </Text>
              <Text className="text-[12px] text-slate-400 mt-0.5">
                {hasPasscode
                  ? isAppLockEnabled
                    ? 'App locks on launch & background'
                    : 'App lock disabled'
                  : 'Protect your app with a 4-digit PIN'}
              </Text>
            </View>
          </View>
          {hasPasscode ? (
            <Switch
              value={isAppLockEnabled}
              onValueChange={onToggleAppLock}
              trackColor={{ false: '#334155', true: '#10B981' }}
              thumbColor={isAppLockEnabled ? '#FFFFFF' : '#94A3B8'}
            />
          ) : (
            <Pressable
              onPress={onToggleAppLock}
              className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full active:opacity-70">
              <Text className="text-[13px] font-semibold text-emerald-400">Set Up 🔒</Text>
            </Pressable>
          )}
        </View>

        {/* Change Passcode (Visible if passcode is created) */}
        {hasPasscode && (
          <Pressable
            onPress={onChangePasscode}
            className="flex-row items-center justify-between p-4 active:opacity-70">
            <View className="flex-row items-center gap-3 flex-1 pr-3">
              <View className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 items-center justify-center">
                <Ionicons name="key-outline" size={18} color="#F59E0B" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-medium text-white">
                  Change Passcode
                </Text>
                <Text className="text-[12px] text-slate-400 mt-0.5">
                  Update your 4-digit security code
                </Text>
              </View>
            </View>
            <Text className="text-[13px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Update
            </Text>
          </Pressable>
        )}

        {/* Manual Lock Now (Visible if lock is enabled) */}
        {hasPasscode && isAppLockEnabled && (
          <Pressable
            onPress={onLockApp}
            className="flex-row items-center justify-between p-4 active:opacity-70">
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 items-center justify-center">
                <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" />
              </View>
              <Text className="text-[15px] font-medium text-white">
                Lock App Now
              </Text>
            </View>
            <Text className="text-[13px] font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              Lock 🔒
            </Text>
          </Pressable>
        )}

        <Pressable onPress={onOpenThemeModal} className="flex-row items-center justify-between p-4 active:opacity-70">
          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 items-center justify-center">
              <Ionicons name={themeMode === 'lights-out' ? 'sparkles-outline' : 'moon-outline'} size={18} color="#34D399" />
            </View>
            <Text className="text-[15px] font-medium text-white">
              Theme
            </Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Text className="text-[14px] text-slate-400 font-medium">
              {themeLabel}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#64748B" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeMode } from '../more/theme-modal';

interface FirstTimeSecurityModalProps {
  visible: boolean;
  themeMode?: AppThemeMode;
  onSetupPasscode: () => void;
  onSkip: () => void;
}

export function FirstTimeSecurityModal({
  visible,
  themeMode = 'dim',
  onSetupPasscode,
  onSkip,
}: FirstTimeSecurityModalProps) {
  const isLightsOut = themeMode === 'lights-out';
  const cardBg = isLightsOut ? 'bg-black border-slate-900' : 'bg-slate-900 border-slate-800';

  return (
    <Modal visible={visible} animationType="fade" transparent={true} statusBarTranslucent>
      <View className="flex-1 bg-black/80 items-center justify-center px-6">
        <View className={`w-full max-w-[340px] rounded-3xl p-6 border ${cardBg} shadow-2xl items-center`}>
          {/* Header Icon */}
          <View className="w-18 h-18 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 items-center justify-center mb-5 p-4">
            <Ionicons name="shield-checkmark" size={40} color="#34D399" />
          </View>

          {/* Title & Description */}
          <Text className="text-[22px] font-bold text-white text-center tracking-tight mb-2">
            Secure Your Finances
          </Text>
          <Text className="text-[14px] text-slate-400 text-center leading-5 mb-6 px-2">
            Set up a 4-digit passcode to keep your personal transactions, balances, and budgets completely private.
          </Text>

          {/* Features Pill Box */}
          <View className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5 gap-2.5 mb-6">
            <View className="flex-row items-center gap-3">
              <View className="w-6 h-6 rounded-full bg-emerald-500/20 items-center justify-center">
                <Ionicons name="lock-closed" size={13} color="#34D399" />
              </View>
              <Text className="text-[13px] text-slate-300 font-medium flex-1">
                Locks on app launch & background
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="w-6 h-6 rounded-full bg-emerald-500/20 items-center justify-center">
                <Ionicons name="key" size={13} color="#34D399" />
              </View>
              <Text className="text-[13px] text-slate-300 font-medium flex-1">
                Stored securely on your device
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="w-full gap-3">
            <Pressable
              onPress={onSetupPasscode}
              className="w-full bg-emerald-500 rounded-2xl py-3.5 items-center justify-center shadow-lg shadow-emerald-500/25 active:bg-emerald-600 active:scale-[0.98]">
              <Text className="text-[15px] font-bold text-slate-950">
                Set 4-Digit Passcode
              </Text>
            </Pressable>

            <Pressable
              onPress={onSkip}
              className="w-full py-2.5 items-center justify-center active:opacity-60">
              <Text className="text-[14px] font-medium text-slate-400">
                Maybe Later
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

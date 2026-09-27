import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeMode } from '../more/theme-modal';

interface UnspentRolloverModalProps {
  visible: boolean;
  unspentAmount: number;
  monthName: string;
  themeMode?: AppThemeMode;
  onRolloverToNextMonth: () => void;
  onMoveToSavings: () => void;
  onDismiss: () => void;
}

export function UnspentRolloverModal({
  visible,
  unspentAmount,
  monthName,
  themeMode = 'dim',
  onRolloverToNextMonth,
  onMoveToSavings,
  onDismiss,
}: UnspentRolloverModalProps) {
  const bgClass = themeMode === 'lights-out' ? 'bg-black' : 'bg-slate-950';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/75 justify-center items-center px-5">
        <View className={`w-full max-w-sm ${bgClass} border border-slate-800 rounded-3xl p-6`}>
          <View className="items-center mb-5">
            <View className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 items-center justify-center mb-3">
              <Ionicons name="time-outline" size={28} color="#F59E0B" />
            </View>
            <Text className="text-[20px] font-bold text-white text-center">Month Ending Alert</Text>
            <Text className="text-[13px] text-slate-400 text-center mt-1">
              {monthName} is ending! You have unspent budget remaining.
            </Text>
          </View>

          <View className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 mb-6 items-center">
            <Text className="text-xs text-slate-400 font-medium">Unspent Balance</Text>
            <Text className="text-[26px] font-bold text-emerald-400 mt-1">
              ₹{unspentAmount.toLocaleString('en-IN')}
            </Text>
          </View>

          <Text className="text-[14px] font-semibold text-slate-300 mb-3">
            What should we do with the remaining amount?
          </Text>

          <View className="gap-2.5 mb-4">
            <Pressable
              onPress={onRolloverToNextMonth}
              className="flex-row items-center gap-3 bg-emerald-500/15 border border-emerald-500/30 p-3.5 rounded-2xl active:opacity-80">
              <Ionicons name="add-circle-outline" size={20} color="#34D399" />
              <View className="flex-1">
                <Text className="text-sm font-semibold text-emerald-400">Add to Next Month's Budget</Text>
                <Text className="text-[11px] text-slate-400">Increase next month budget limit</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={onMoveToSavings}
              className="flex-row items-center gap-3 bg-indigo-500/15 border border-indigo-500/30 p-3.5 rounded-2xl active:opacity-80">
              <Ionicons name="wallet-outline" size={20} color="#818CF8" />
              <View className="flex-1">
                <Text className="text-sm font-semibold text-indigo-300">Move to Net Worth / Savings</Text>
                <Text className="text-[11px] text-slate-400">Transfer unspent funds to savings</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={onDismiss}
              className="flex-row items-center justify-center p-3 rounded-2xl bg-slate-900 border border-slate-800 active:opacity-80">
              <Text className="text-xs font-semibold text-slate-400">Keep standard budget / Ignore</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default UnspentRolloverModal;

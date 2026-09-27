import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SetBudgetModalProps {
  visible: boolean;
  currentBudget: number;
  onClose: () => void;
  onSaveBudget: (newBudget: number) => void;
}

export function SetBudgetModal({ visible, currentBudget, onClose, onSaveBudget }: SetBudgetModalProps) {
  const [budget, setBudget] = useState(currentBudget ? currentBudget.toString() : '50000');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = () => {
    setErrorMessage('');
    const val = parseFloat(budget.replace(/[^0-9.]/g, '')) || 0;
    if (val <= 0) {
      setErrorMessage('Please enter a budget greater than 0');
      return;
    }
    onSaveBudget(val);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        className="flex-1 justify-center items-center px-4 bg-black/80">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="w-full max-w-[360px] bg-[#0E131F] border border-slate-800 rounded-3xl p-5 shadow-2xl my-auto">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[18px] font-bold text-white tracking-tight">Set Monthly Budget</Text>
            <Pressable onPress={onClose} className="w-7 h-7 rounded-full bg-slate-800/60 items-center justify-center active:opacity-70">
              <Ionicons name="close" size={16} color="#94A3B8" />
            </Pressable>
          </View>

          <Text className="text-[13px] text-slate-400 font-normal mb-4">
            Enter your target spending limit for the current month.
          </Text>

          {errorMessage ? (
            <View className="bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-xl mb-3">
              <Text className="text-xs font-semibold text-red-400 text-center">⚠️ {errorMessage}</Text>
            </View>
          ) : null}

          <View className="flex-row items-center py-2 mb-4 border-b border-slate-800 w-full overflow-hidden px-1">
            <Text className="text-[28px] font-normal text-slate-400 mr-2">₹</Text>
            <TextInput
              value={budget}
              onChangeText={(val) => { setBudget(val); if (errorMessage) setErrorMessage(''); }}
              placeholder="50000"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              autoFocus
              style={{ outlineStyle: 'none' } as any}
              className="text-[32px] font-normal text-white flex-1 min-w-0"
            />
          </View>

          <Pressable onPress={handleSave} className="bg-emerald-500 py-3 rounded-xl items-center active:opacity-90 mt-2">
            <Text className="text-slate-950 font-bold text-[15px]">Save Monthly Budget</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

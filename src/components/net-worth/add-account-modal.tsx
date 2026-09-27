import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AccountItem, AccountType } from '@/types/finance';

interface AddAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onAddAccount: (account: AccountItem) => void;
}

const ACCOUNT_TYPES: { type: AccountType; label: string; emoji: string; color: string }[] = [
  { type: 'bank', label: 'Bank Account', emoji: '🏦', color: '#60A5FA' },
  { type: 'cash', label: 'Cash / Wallet', emoji: '💵', color: '#34D399' },
  { type: 'investment', label: 'Mutual Funds / FD', emoji: '📈', color: '#F59E0B' },
  { type: 'emergency', label: 'Emergency Fund', emoji: '🛡️', color: '#A78BFA' },
  { type: 'liability', label: 'Loan / Debt', emoji: '💳', color: '#F87171' },
];

export function AddAccountModal({ visible, onClose, onAddAccount }: AddAccountModalProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState(ACCOUNT_TYPES[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    setErrorMessage('');
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    if (!name.trim()) {
      setErrorMessage('Please enter an account name');
      return;
    }
    if (numericAmount <= 0) {
      setErrorMessage('Please enter a balance greater than 0');
      return;
    }

    onAddAccount({
      id: Date.now().toString(),
      name: name.trim(),
      type: selectedType.type,
      amount: selectedType.type === 'liability' ? -numericAmount : numericAmount,
      emoji: selectedType.emoji,
      categoryName: selectedType.label,
      color: selectedType.color,
    });

    setName('');
    setAmount('');
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        className="flex-1 justify-center items-center px-4 bg-black/80">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="w-full max-w-[360px] bg-[#0E131F] border border-slate-800 rounded-3xl p-5 shadow-2xl my-auto">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[18px] font-bold text-white tracking-tight">Add asset account</Text>
            <Pressable onPress={onClose} className="w-7 h-7 rounded-full bg-slate-800/60 items-center justify-center active:opacity-70">
              <Ionicons name="close" size={16} color="#94A3B8" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className="gap-4">
            {errorMessage ? (
              <View className="bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-xl">
                <Text className="text-xs font-semibold text-red-400 text-center">⚠️ {errorMessage}</Text>
              </View>
            ) : null}

            <View>
              <Text className="text-[12px] font-medium text-slate-400 mb-1">Account name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g. HDFC Bank, SBI FD"
                placeholderTextColor="#475569"
                className="border-b border-slate-800/80 pb-2 text-[15px] font-normal text-white"
              />
            </View>

            <View className="flex-row items-center py-1">
              <Text className="text-[28px] font-normal text-slate-400 mr-2">₹</Text>
              <TextInput
                value={amount}
                onChangeText={(val) => { setAmount(val); if (errorMessage) setErrorMessage(''); }}
                placeholder="0"
                placeholderTextColor="#64748B"
                keyboardType="numeric"
                className="text-[32px] font-normal text-white flex-1"
              />
            </View>

            <View>
              <Text className="text-[12px] font-medium text-slate-400 mb-2">Account type</Text>
              <View className="flex-row flex-wrap gap-2">
                {ACCOUNT_TYPES.map((at) => {
                  const isSelected = selectedType.type === at.type;
                  return (
                    <Pressable
                      key={at.type}
                      onPress={() => setSelectedType(at)}
                      className={`flex-row items-center px-3 py-1.5 rounded-xl border ${
                        isSelected ? 'bg-emerald-500/20 border-emerald-500' : 'bg-slate-900 border-slate-800'
                      }`}>
                      <Text className="text-sm mr-1.5">{at.emoji}</Text>
                      <Text className={`text-xs ${isSelected ? 'font-bold text-emerald-400' : 'text-slate-300'}`}>
                        {at.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <Pressable onPress={handleSubmit} className="bg-emerald-500 py-3 rounded-xl items-center active:opacity-90 mt-4 mb-1">
              <Text className="text-slate-950 font-bold text-[15px]">Save account</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

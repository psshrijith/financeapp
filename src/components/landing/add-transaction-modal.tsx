import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { TransactionType } from '@/types/finance';
import { CategorySelector, CATEGORY_OPTIONS } from './category-selector';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: { title: string; amount: number; type: TransactionType; category: string; emoji: string }) => void;
}

export function AddTransactionModal({ visible, onClose, onAddTransaction }: AddTransactionModalProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    setErrorMessage('');
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    if (numericAmount <= 0) {
      setErrorMessage('Please enter an amount greater than 0');
      return;
    }
    const finalTitle = title.trim() || selectedCategory.name;
    onAddTransaction({
      title: finalTitle,
      amount: numericAmount,
      type,
      category: selectedCategory.name,
      emoji: selectedCategory.emoji,
    });
    setAmount('');
    setTitle('');
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
            <Text className="text-[18px] font-bold text-white tracking-tight">Add transaction</Text>
            <Pressable onPress={onClose} className="w-7 h-7 rounded-full bg-slate-800/60 items-center justify-center active:opacity-70">
              <Ionicons name="close" size={16} color="#94A3B8" />
            </Pressable>
          </View>
          <View className="flex-row border-b border-slate-800/80 mb-4 gap-6">
            <Pressable onPress={() => setType('expense')} className={`pb-2 ${type === 'expense' ? 'border-b-2 border-emerald-400' : ''}`}>
              <Text className={`text-[14px] ${type === 'expense' ? 'font-bold text-white' : 'font-medium text-slate-400'}`}>Expense</Text>
            </Pressable>
            <Pressable onPress={() => setType('income')} className={`pb-2 ${type === 'income' ? 'border-b-2 border-emerald-400' : ''}`}>
              <Text className={`text-[14px] ${type === 'income' ? 'font-bold text-white' : 'font-medium text-slate-400'}`}>Income</Text>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" className="gap-4">
            {errorMessage ? (
              <View className="bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-xl">
                <Text className="text-xs font-semibold text-red-400 text-center">⚠️ {errorMessage}</Text>
              </View>
            ) : null}
            <View className="flex-row items-center py-1">
              <Text className="text-[28px] font-normal text-slate-400 mr-2">₹</Text>
              <TextInput
                value={amount}
                onChangeText={(val) => { setAmount(val); if (errorMessage) setErrorMessage(''); }}
                placeholder="0"
                placeholderTextColor="#64748B"
                keyboardType="numeric"
                autoFocus
                className="text-[32px] font-normal text-white flex-1"
              />
            </View>
            <View>
              <Text className="text-[12px] font-medium text-slate-400 mb-1">Merchant or title</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Swiggy"
                placeholderTextColor="#475569"
                className="border-b border-slate-800/80 pb-2 text-[14px] font-normal text-white"
              />
            </View>
            <CategorySelector selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <Pressable onPress={handleSubmit} className="bg-emerald-500 py-3 rounded-xl items-center active:opacity-90 mt-3 mb-1">
              <Text className="text-slate-950 font-bold text-[15px]">Save transaction</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}




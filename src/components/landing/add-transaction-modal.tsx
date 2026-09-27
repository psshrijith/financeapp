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
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 justify-end bg-black/75">
        <Pressable className="flex-1" onPress={onClose} />
        <View className="bg-[#0E131F] border-t border-slate-800/80 rounded-t-[32px] p-6 shadow-2xl">
          <View className="w-10 h-1 bg-slate-700/60 rounded-full self-center mb-4" />
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[20px] font-bold text-white tracking-tight">Add transaction</Text>
            <Pressable onPress={onClose} className="w-7 h-7 rounded-full bg-slate-800/60 items-center justify-center active:opacity-70">
              <Ionicons name="close" size={16} color="#94A3B8" />
            </Pressable>
          </View>
          <View className="flex-row border-b border-slate-800/80 mb-6 gap-6">
            <Pressable onPress={() => setType('expense')} className={`pb-2.5 ${type === 'expense' ? 'border-b-2 border-emerald-400' : ''}`}>
              <Text className={`text-[15px] ${type === 'expense' ? 'font-bold text-white' : 'font-medium text-slate-400'}`}>Expense</Text>
            </Pressable>
            <Pressable onPress={() => setType('income')} className={`pb-2.5 ${type === 'income' ? 'border-b-2 border-emerald-400' : ''}`}>
              <Text className={`text-[15px] ${type === 'income' ? 'font-bold text-white' : 'font-medium text-slate-400'}`}>Income</Text>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} className="gap-5">
            {errorMessage ? (
              <View className="bg-red-500/20 border border-red-500/40 px-3 py-2 rounded-xl">
                <Text className="text-xs font-semibold text-red-400 text-center">⚠️ {errorMessage}</Text>
              </View>
            ) : null}
            <View className="flex-row items-center py-2">
              <Text className="text-[32px] font-normal text-slate-400 mr-2">₹</Text>
              <TextInput
                value={amount}
                onChangeText={(val) => { setAmount(val); if (errorMessage) setErrorMessage(''); }}
                placeholder="0"
                placeholderTextColor="#64748B"
                keyboardType="numeric"
                autoFocus
                className="text-[38px] font-normal text-white flex-1"
              />
            </View>
            <View className="mt-1">
              <Text className="text-[12px] font-medium text-slate-400 mb-1">Merchant or title</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Swiggy"
                placeholderTextColor="#475569"
                className="border-b border-slate-800/80 pb-2 text-[15px] font-normal text-white"
              />
            </View>
            <CategorySelector selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <Pressable onPress={handleSubmit} className="bg-emerald-500 py-3.5 rounded-2xl items-center active:opacity-90 mt-4 mb-2">
              <Text className="text-slate-950 font-bold text-[16px]">Save transaction</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}




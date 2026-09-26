import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { TransactionType } from '@/types/finance';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: {
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    emoji: string;
  }) => void;
}

const CATEGORY_OPTIONS = [
  { id: '1', name: 'Food', emoji: '🍔' },
  { id: '2', name: 'Rent', emoji: '🏠' },
  { id: '3', name: 'Transport', emoji: '🚗' },
  { id: '4', name: 'Shopping', emoji: '🛍️' },
  { id: '5', name: 'Salary', emoji: '💰' },
  { id: '6', name: 'Bills', emoji: '⚡' },
];

export function AddTransactionModal({
  visible,
  onClose,
  onAddTransaction,
}: AddTransactionModalProps) {
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

    // Reset form
    setAmount('');
    setTitle('');
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-end bg-black/75">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 shadow-2xl">
          {/* Header */}
          <View className="flex-row justify-between items-center pb-3 border-b border-slate-800">
            <Text className="text-lg font-bold text-white">Add Transaction</Text>
            <Pressable
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center active:opacity-70">
              <Ionicons name="close" size={18} color="#94A3B8" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mt-3 gap-3">
            {/* Error Message Alert Banner */}
            {errorMessage ? (
              <View className="bg-red-500/20 border border-red-500/50 px-3 py-2 rounded-xl mb-1">
                <Text className="text-xs font-semibold text-red-400 text-center">
                  ⚠️ {errorMessage}
                </Text>
              </View>
            ) : null}

            {/* Type Selector (Expense / Income) */}
            <View className="flex-row bg-slate-950 p-1 rounded-2xl border border-slate-800">
              <Pressable
                onPress={() => setType('expense')}
                className={`flex-1 py-2.5 rounded-xl items-center ${
                  type === 'expense' ? 'bg-red-500/20 border border-red-500/40' : ''
                }`}>
                <Text
                  className={`text-xs font-bold ${
                    type === 'expense' ? 'text-red-400' : 'text-slate-400'
                  }`}>
                  Expense
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setType('income')}
                className={`flex-1 py-2.5 rounded-xl items-center ${
                  type === 'income' ? 'bg-emerald-500/20 border border-emerald-500/40' : ''
                }`}>
                <Text
                  className={`text-xs font-bold ${
                    type === 'income' ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                  Income
                </Text>
              </Pressable>
            </View>

            {/* Amount Display / Input */}
            <View className="items-center justify-center my-2 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80">
              <Text className="text-xs text-slate-400 font-medium mb-1">Enter Amount</Text>
              <View className="flex-row items-center">
                <Text className="text-3xl font-black text-indigo-400 mr-1">₹</Text>
                <TextInput
                  value={amount}
                  onChangeText={(val) => {
                    setAmount(val);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="0"
                  placeholderTextColor="#475569"
                  keyboardType="numeric"
                  autoFocus
                  className="text-3xl font-black text-white min-w-[120px] text-center"
                />
              </View>
            </View>

            {/* Title Input */}
            <View>
              <Text className="text-xs font-semibold text-slate-400 mb-1">
                Merchant / Title (Optional)
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder={`e.g. ${selectedCategory.name}`}
                placeholderTextColor="#64748B"
                className="bg-slate-950 text-white p-3 rounded-2xl border border-slate-800 text-sm font-medium"
              />
            </View>

            {/* Category Selector Chips */}
            <View>
              <Text className="text-xs font-semibold text-slate-400 mb-2">Select Category</Text>
              <View className="flex-row flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((cat) => {
                  const isSelected = selectedCategory.id === cat.id;
                  return (
                    <Pressable
                      key={cat.id}
                      onPress={() => setSelectedCategory(cat)}
                      className={`flex-row items-center gap-1.5 px-3 py-2 rounded-xl border ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500'
                          : 'bg-slate-950 border-slate-800'
                      }`}>
                      <Text className="text-sm">{cat.emoji}</Text>
                      <Text
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-indigo-300' : 'text-slate-300'
                        }`}>
                        {cat.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Save Button */}
            <Pressable
              onPress={handleSubmit}
              className="bg-indigo-600 py-3.5 rounded-2xl items-center active:bg-indigo-700 mt-2 mb-2 shadow-lg shadow-indigo-600/30">
              <Text className="text-white font-bold text-base">Save Transaction</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

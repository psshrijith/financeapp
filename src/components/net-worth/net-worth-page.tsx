import React from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountItem } from '@/types/finance';
import { NetWorthInsights } from './net-worth-insights';

interface NetWorthPageProps {
  userAccounts?: AccountItem[];
  onOpenAddAccountModal?: () => void;
  onDeleteAccount?: (accId: string) => void;
}

export function NetWorthPage({
  userAccounts = [],
  onOpenAddAccountModal,
  onDeleteAccount,
}: NetWorthPageProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const assetsSum = userAccounts.reduce(
    (acc, a) => (a.amount > 0 ? acc + a.amount : acc),
    0
  );
  const liabilitiesSum = userAccounts.reduce(
    (acc, a) => (a.amount < 0 ? acc + Math.abs(a.amount) : acc),
    0
  );
  const totalNetWorth = assetsSum - liabilitiesSum;

  const containerPadding = {
    paddingTop: safeAreaInsets.top + 8,
    paddingBottom: safeAreaInsets.bottom + 100,
  };

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerStyle={[{ paddingHorizontal: 20 }, containerPadding]}
      showsVerticalScrollIndicator={false}>
      {/* 1. Header & Add Button */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-[24px] font-bold text-white tracking-tight">Net worth</Text>
          <Text className="text-[13px] text-slate-400 font-normal mt-0.5">
            Everything you own, minus what you owe
          </Text>
        </View>
        <Pressable
          onPress={onOpenAddAccountModal}
          className="flex-row items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 px-3 py-2 rounded-xl active:opacity-80">
          <Ionicons name="add" size={16} color="#34D399" />
          <Text className="text-xs font-bold text-emerald-400">Add Account</Text>
        </Pressable>
      </View>

      {/* Hero Net Worth Summary */}
      <View className="mb-6 bg-slate-900/60 border border-slate-800/60 rounded-3xl p-5">
        <Text className="text-[13px] text-slate-400 font-medium mb-1">Total net worth</Text>
        <Text
          className="text-[36px] font-bold text-white tracking-tight leading-none"
          style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}>
          ₹{totalNetWorth.toLocaleString('en-IN')}
        </Text>

        <View className="flex-row gap-3 mt-5 pt-4 border-t border-slate-800/60">
          <View className="flex-1">
            <Text className="text-[12px] text-slate-400 font-medium mb-0.5">Assets</Text>
            <Text className="text-[17px] font-bold text-emerald-400">
              ₹{assetsSum.toLocaleString('en-IN')}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-[12px] text-slate-400 font-medium mb-0.5">Liabilities</Text>
            <Text className="text-[17px] font-bold text-amber-500">
              ₹{liabilitiesSum.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
      </View>

      {/* Asset Contribution Graph & Insights */}
      <NetWorthInsights userAccounts={userAccounts} assetsSum={assetsSum} />

      {/* 3. Accounts Breakdown */}
      <View className="mb-8">
        <Text className="text-[17px] font-semibold text-white mb-3">Your Accounts & Assets</Text>

        {userAccounts.length === 0 ? (
          <View className="py-8 items-center justify-center border border-dashed border-slate-800/80 rounded-2xl bg-slate-900/30 px-4">
            <Text className="text-[28px] mb-2">🏦</Text>
            <Text className="text-[15px] font-semibold text-slate-200">No accounts added yet</Text>
            <Text className="text-[12px] text-slate-400 font-normal mt-1 text-center mb-4">
              Add your bank accounts, cash, fixed deposits, or mutual funds to track your net worth
            </Text>
            <Pressable
              onPress={onOpenAddAccountModal}
              className="bg-emerald-500 px-4 py-2.5 rounded-xl active:opacity-90">
              <Text className="text-slate-950 font-bold text-xs">+ Add First Account</Text>
            </Pressable>
          </View>
        ) : (
          <View className="bg-slate-900/40 border border-slate-800/40 rounded-2xl p-4 divide-y divide-slate-800/40">
            {userAccounts.map((acc) => (
              <View key={acc.id} className="flex-row justify-between items-center py-3">
                <View className="flex-row items-center gap-3 flex-1">
                  <Text className="text-xl">{acc.emoji}</Text>
                  <View>
                    <Text className="text-[15px] font-semibold text-white">{acc.name}</Text>
                    <Text className="text-[12px] text-slate-400 mt-0.5">{acc.categoryName}</Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <Text className={`text-[15px] font-bold ${acc.amount < 0 ? 'text-amber-500' : 'text-white'}`}>
                    {acc.amount < 0 ? `-₹${Math.abs(acc.amount).toLocaleString('en-IN')}` : `₹${acc.amount.toLocaleString('en-IN')}`}
                  </Text>
                  {onDeleteAccount && (
                    <Pressable onPress={() => onDeleteAccount(acc.id)} className="p-1 active:opacity-60">
                      <Ionicons name="trash-outline" size={16} color="#F87171" />
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default NetWorthPage;

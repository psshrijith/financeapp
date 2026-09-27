import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Transaction } from '@/types/finance';
import { DUMMY_RECENT_TRANSACTIONS } from '@/data/dummy-finance-data';

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onDeleteTransaction?: (txId: string) => void;
}

export function RecentTransactions({
  transactions = DUMMY_RECENT_TRANSACTIONS,
  onDeleteTransaction,
}: RecentTransactionsProps) {
  return (
    <View className="mb-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[17px] font-semibold text-white tracking-tight">
          Recent transactions
        </Text>
        {transactions.length > 0 ? (
          <Pressable className="active:opacity-70">
            <Text className="text-[13px] font-medium text-slate-400">
              See all →
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* Empty State or Transactions List */}
      {transactions.length === 0 ? (
        <View className="py-8 items-center justify-center border border-dashed border-slate-800/80 rounded-2xl bg-slate-900/30 px-4">
          <Text className="text-[14px] font-semibold text-slate-300">
            No transactions yet
          </Text>
          <Text className="text-[12px] text-slate-400 font-normal mt-1 text-center">
            Tap &quot;+ Add Transaction&quot; below to record your first expense or income
          </Text>
        </View>
      ) : (
        <View className="divide-y divide-slate-800/40">
          {transactions.slice(0, 5).map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <View
                key={tx.id}
                className="flex-row justify-between items-center py-3.5">
                <View>
                  <Text className="text-[15px] font-medium text-white">
                    {tx.title}
                  </Text>
                  <Text className="text-[12px] text-slate-400 mt-0.5 font-normal">
                    {tx.category}
                  </Text>
                </View>

                <View className="flex-row items-center gap-3">
                  <Text
                    className={`text-[15px] font-semibold ${
                      isIncome ? 'text-emerald-400' : 'text-slate-200'
                    }`}>
                    {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </Text>
                  {onDeleteTransaction && (
                    <Pressable onPress={() => onDeleteTransaction(tx.id)} className="p-1 active:opacity-60">
                      <Ionicons name="trash-outline" size={15} color="#F87171" />
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}



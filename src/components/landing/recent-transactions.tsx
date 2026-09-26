import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { Transaction } from '@/types/finance';
import { DUMMY_RECENT_TRANSACTIONS } from '@/data/dummy-finance-data';

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

export function RecentTransactions({
  transactions = DUMMY_RECENT_TRANSACTIONS,
}: RecentTransactionsProps) {
  return (
    <View className="mb-7">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[19px] font-bold text-white tracking-tight">
          Recent transactions
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="text-[14px] font-semibold text-indigo-400">
            See all →
          </Text>
        </Pressable>
      </View>

      {/* Transactions List with subtle separators */}
      <View className="divide-y divide-slate-800/60">
        {transactions.slice(0, 5).map((tx) => {
          const isIncome = tx.type === 'income';
          return (
            <Pressable
              key={tx.id}
              className="flex-row justify-between items-center py-3 active:opacity-70">
              <View>
                <Text className="text-[16px] font-semibold text-slate-100">
                  {tx.title}
                </Text>
                <Text className="text-[13px] text-slate-400 mt-0.5 font-normal">
                  {tx.category}
                </Text>
              </View>

              <Text
                className={`text-[16px] font-bold ${
                  isIncome ? 'text-emerald-400' : 'text-slate-100'
                }`}>
                {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

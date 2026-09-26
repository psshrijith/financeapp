import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { DUMMY_RECENT_TRANSACTIONS } from '@/data/dummy-finance-data';

export function RecentTransactions() {
  return (
    <View className="mb-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-white tracking-tight">
          Recent transactions
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="text-sm font-semibold text-indigo-400">
            See all →
          </Text>
        </Pressable>
      </View>

      {/* Transaction List with subtle dividers */}
      <View className="divide-y divide-slate-800/60">
        {DUMMY_RECENT_TRANSACTIONS.map((tx) => {
          const isIncome = tx.type === 'income';
          return (
            <View
              key={tx.id}
              className="flex-row justify-between items-center py-3.5 px-1">
              <View>
                <Text className="text-base font-semibold text-slate-100">
                  {tx.title}
                </Text>
                <Text className="text-xs text-slate-400 mt-0.5 font-normal">
                  {tx.category}
                </Text>
              </View>

              <Text
                className={`text-base font-bold ${
                  isIncome ? 'text-emerald-400' : 'text-slate-100'
                }`}>
                {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

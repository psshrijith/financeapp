import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { DUMMY_SPENDING_CATEGORIES } from '@/data/dummy-finance-data';
import { SpendingCategory } from '@/types/finance';

interface SpendingSectionProps {
  categories?: SpendingCategory[];
}

export function SpendingSection({ categories }: SpendingSectionProps) {
  const displayCategories = categories && categories.length > 0
    ? categories
    : DUMMY_SPENDING_CATEGORIES;

  return (
    <View className="mb-8">
      {/* Section Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-[17px] font-semibold text-white tracking-tight">
          Spending by category
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="text-[13px] font-medium text-slate-400">
            See all →
          </Text>
        </Pressable>
      </View>

      {/* Cardless Category List */}
      <View className="space-y-4">
        {displayCategories.map((cat, index) => {
          const isIncrease = cat.changePercentage?.startsWith('↑');
          return (
            <View key={cat.id}>
              {index > 0 && <View className="h-px bg-slate-800/40 my-3" />}
              <Pressable className="flex-row justify-between items-start active:opacity-70">
                {/* Left: Emoji + Category Name + Budget String */}
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="text-[15px]">{cat.emoji}</Text>
                    <Text className="text-[15px] font-semibold text-white">
                      {cat.name}
                    </Text>
                    {cat.changePercentage && (
                      <Text
                        className={`text-[12px] font-medium ml-1 ${
                          isIncrease ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {cat.changePercentage}
                      </Text>
                    )}
                  </View>

                  <Text className="text-[12px] text-slate-400 font-normal">
                    {cat.budgetString || `of ₹${(cat.amount * 1.3).toFixed(0)} budget · ${cat.percentage}%`}
                  </Text>
                </View>

                {/* Right: Amount */}
                <View className="items-end">
                  <Text className="text-[16px] font-bold text-white">
                    ₹{cat.amount.toLocaleString('en-IN')}
                  </Text>
                  <Text className="text-[12px] text-slate-400 mt-0.5 font-medium">
                    {cat.percentage}% of total
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}



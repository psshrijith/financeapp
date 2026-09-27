import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

export interface CategoryOption {
  id: string;
  name: string;
  emoji: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: '1', name: 'Food', emoji: '🍔' },
  { id: '2', name: 'Rent', emoji: '🏠' },
  { id: '3', name: 'Transport', emoji: '🚗' },
  { id: '4', name: 'Shopping', emoji: '🛍️' },
  { id: '5', name: 'Salary', emoji: '💰' },
  { id: '6', name: 'Bills', emoji: '⚡' },
];

interface CategorySelectorProps {
  selectedCategory: CategoryOption;
  onSelectCategory: (category: CategoryOption) => void;
}

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <View className="mt-2">
      <Text className="text-[12px] font-medium text-slate-400 mb-2.5">
        Category
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row">
        {CATEGORY_OPTIONS.map((cat) => {
          const isSelected = selectedCategory.id === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() => onSelectCategory(cat)}
              className={`flex-row items-center gap-1.5 px-4 py-2 rounded-full border mr-2.5 ${
                isSelected
                  ? 'border-emerald-400/90 bg-emerald-400/10'
                  : 'border-slate-800/90 bg-slate-900/40'
              }`}>
              <Text className="text-[14px]">{cat.emoji}</Text>
              <Text
                className={`text-[13px] font-medium ${
                  isSelected ? 'text-white font-semibold' : 'text-slate-300'
                }`}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

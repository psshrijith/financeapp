import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BACKUP_CATEGORIES, CategoryItem } from '@/constants/categories';

export type CategoryOption = CategoryItem;
export const CATEGORY_OPTIONS: CategoryOption[] = BACKUP_CATEGORIES;

interface CategorySelectorProps {
  selectedCategory: CategoryOption;
  onSelectCategory: (category: CategoryOption) => void;
}

export function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mt-1">
      <Text className="text-[12px] font-medium text-slate-400 mb-1.5">
        Category
      </Text>

      {/* Dropdown Trigger */}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row justify-between items-center bg-slate-900/80 border border-slate-800 p-3 rounded-2xl active:opacity-80">
        <View className="flex-row items-center gap-2.5">
          <Text className="text-base">{selectedCategory.emoji}</Text>
          <Text className="text-[14px] font-semibold text-white">
            {selectedCategory.name}
          </Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#94A3B8"
        />
      </Pressable>

      {/* Inline Dropdown Options List */}
      {isOpen && (
        <View className="mt-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 max-h-48">
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {CATEGORY_OPTIONS.map((cat) => {
              const isSelected = selectedCategory.id === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => {
                    onSelectCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`flex-row items-center justify-between p-2.5 rounded-xl ${
                    isSelected ? 'bg-emerald-500/20 border border-emerald-500/40' : 'active:bg-slate-800/50'
                  }`}>
                  <View className="flex-row items-center gap-2.5">
                    <Text className="text-base">{cat.emoji}</Text>
                    <Text className={`text-[14px] ${isSelected ? 'font-bold text-emerald-400' : 'font-medium text-slate-200'}`}>
                      {cat.name}
                    </Text>
                  </View>
                  {isSelected && <Ionicons name="checkmark" size={16} color="#34D399" />}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}


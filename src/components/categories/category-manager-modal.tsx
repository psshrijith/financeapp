import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryItem } from '@/constants/categories';

interface CategoryManagerModalProps {
  visible: boolean;
  onClose: () => void;
  categories: CategoryItem[];
  onAddCategory: (category: CategoryItem) => void;
  onRemoveCategory: (categoryId: string) => void;
}

export function CategoryManagerModal({
  visible,
  onClose,
  categories,
  onAddCategory,
  onRemoveCategory,
}: CategoryManagerModalProps) {
  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('🏷️');

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newCat: CategoryItem = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      emoji: newEmoji.trim() || '🏷️',
      color: '#10B981',
    };
    onAddCategory(newCat);
    setNewName('');
    setNewEmoji('🏷️');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/70 justify-end">
        <View className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 max-h-[85%]">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-[20px] font-bold text-white tracking-tight">
              Manage Categories
            </Text>
            <Pressable onPress={onClose} className="p-1">
              <Ionicons name="close" size={24} color="#94A3B8" />
            </Pressable>
          </View>

          <View className="bg-slate-950 border border-slate-800 p-4 rounded-2xl mb-5 space-y-3">
            <Text className="text-[12px] uppercase font-semibold text-slate-400">
              Add New Category
            </Text>
            <View className="flex-row gap-2">
              <TextInput
                value={newEmoji}
                onChangeText={setNewEmoji}
                placeholder="Emoji"
                placeholderTextColor="#64748B"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[18px] text-center w-14 text-white"
              />
              <TextInput
                value={newName}
                onChangeText={setNewName}
                placeholder="Category Name (e.g. Subscriptions)"
                placeholderTextColor="#64748B"
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-[14px] text-white flex-1"
              />
            </View>
            <Pressable
              onPress={handleAdd}
              className="bg-emerald-500 py-2.5 rounded-xl items-center active:opacity-80">
              <Text className="text-slate-950 font-bold text-[14px]">
                Add Category
              </Text>
            </Pressable>
          </View>

          <Text className="text-[12px] uppercase font-semibold text-slate-400 mb-3">
            Existing Categories ({categories.length})
          </Text>

          <ScrollView className="space-y-2 mb-4" showsVerticalScrollIndicator={false}>
            {categories.map((cat) => (
              <View
                key={cat.id}
                className="flex-row justify-between items-center bg-slate-950/60 border border-slate-800/60 p-3 rounded-xl mb-2">
                <View className="flex-row items-center gap-2.5">
                  <Text className="text-[18px]">{cat.emoji}</Text>
                  <Text className="text-[14px] font-semibold text-white">{cat.name}</Text>
                </View>
                <Pressable
                  onPress={() => onRemoveCategory(cat.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 active:opacity-70">
                  <Ionicons name="trash-outline" size={16} color="#F43F5E" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

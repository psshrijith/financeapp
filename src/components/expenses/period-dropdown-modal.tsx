import React from 'react';
import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PeriodDropdownModalProps {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export function PeriodDropdownModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}: PeriodDropdownModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable onPress={onClose} className="flex-1 bg-black/70 justify-center items-center px-6">
        <Pressable className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-5 max-h-[70%]">
          {/* Header */}
          <View className="flex-row justify-between items-center pb-4 mb-2 border-b border-slate-800">
            <Text className="text-[17px] font-bold text-white tracking-tight">
              Select {title}
            </Text>
            <Pressable onPress={onClose} className="p-1">
              <Ionicons name="close" size={20} color="#94A3B8" />
            </Pressable>
          </View>

          {/* Options List */}
          <ScrollView showsVerticalScrollIndicator={false} className="space-y-1">
            {options.map((opt) => {
              const isSelected = selectedValue === opt;
              return (
                <Pressable
                  key={opt}
                  onPress={() => {
                    onSelect(opt);
                    onClose();
                  }}
                  className={`flex-row justify-between items-center p-3.5 rounded-xl my-1 ${
                    isSelected ? 'bg-emerald-500/15 border border-emerald-500/30' : 'active:bg-slate-800/60'
                  }`}>
                  <Text className={`text-[15px] font-medium ${isSelected ? 'text-emerald-400 font-bold' : 'text-slate-200'}`}>
                    {opt === 'All' ? `All ${title}s` : opt}
                  </Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={18} color="#34D399" />}
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

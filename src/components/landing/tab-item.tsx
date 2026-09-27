import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabType } from './bottom-navigation';

interface TabItemProps {
  tabKey: TabType;
  label: string;
  iconActive: keyof typeof Ionicons.glyphMap;
  iconInactive: keyof typeof Ionicons.glyphMap;
  activeTab: TabType;
  onSelect: (tab: TabType) => void;
}

export function TabItem({
  tabKey,
  label,
  iconActive,
  iconInactive,
  activeTab,
  onSelect,
}: TabItemProps) {
  const isActive = activeTab === tabKey;

  return (
    <Pressable
      onPress={() => onSelect(tabKey)}
      className="flex-1 items-center justify-center h-full active:scale-95">
      <View
        className={`items-center justify-center px-3.5 py-1.5 rounded-full transition-all ${
          isActive
            ? 'bg-emerald-500/15 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
            : ''
        }`}>
        <Ionicons
          name={isActive ? iconActive : iconInactive}
          size={20}
          color={isActive ? '#34D399' : '#64748B'}
        />
        <Text
          className={`text-[10px] mt-0.5 tracking-tight ${
            isActive ? 'font-bold text-emerald-400' : 'font-medium text-slate-400'
          }`}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

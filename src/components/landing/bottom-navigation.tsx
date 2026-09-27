import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabItem } from './tab-item';

export type TabType = 'home' | 'expenses' | 'transactions' | 'networth' | 'more';

interface BottomNavigationProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  onPressAdd?: () => void;
}

export function BottomNavigation({
  activeTab: controlledActiveTab,
  onTabChange,
  onPressAdd,
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const [internalTab, setInternalTab] = useState<TabType>('home');
  const activeTab = controlledActiveTab ?? internalTab;

  const handleTabPress = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  return (
    <View
      className="absolute bottom-0 left-0 right-0 z-40 px-5 pointer-events-box-none items-center"
      style={{ paddingBottom: Math.max(insets.bottom, 14) }}>
      {/* Clean Floating Add Button Above Capsule Bar - No Overlap */}
      <View className="mb-3.5 z-50 pointer-events-auto">
        <Pressable
          onPress={onPressAdd}
          accessibilityLabel="Add New Transaction"
          className="flex-row items-center gap-2 bg-emerald-500 px-5 py-3 rounded-full shadow-2xl shadow-emerald-500/50 border border-emerald-400/40 active:scale-95">
          <Ionicons name="add-circle" size={20} color="#042F2E" />
          <Text className="text-slate-950 text-[13px] font-extrabold tracking-wide">
            Add Transaction
          </Text>
        </Pressable>
      </View>

      {/* Evenly Spaced Floating Capsule Navigation Bar */}
      <View className="w-full bg-slate-900/95 border border-slate-800/90 rounded-full shadow-2xl shadow-black flex-row justify-between items-center h-16 px-2">
        <TabItem
          tabKey="home"
          label="Home"
          iconActive="home"
          iconInactive="home-outline"
          activeTab={activeTab}
          onSelect={handleTabPress}
        />
        <TabItem
          tabKey="expenses"
          label="Expenses"
          iconActive="pie-chart"
          iconInactive="pie-chart-outline"
          activeTab={activeTab}
          onSelect={handleTabPress}
        />
        <TabItem
          tabKey="networth"
          label="Net worth"
          iconActive="trending-up"
          iconInactive="trending-up-outline"
          activeTab={activeTab}
          onSelect={handleTabPress}
        />
        <TabItem
          tabKey="more"
          label="More"
          iconActive="settings"
          iconInactive="settings-outline"
          activeTab={activeTab}
          onSelect={handleTabPress}
        />
      </View>
    </View>
  );
}

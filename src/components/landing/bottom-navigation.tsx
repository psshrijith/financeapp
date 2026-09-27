import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabItem } from './tab-item';


export type TabType = 'home' | 'transactions' | 'networth' | 'more';

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
      className="absolute bottom-0 left-0 right-0 z-40 px-4 pointer-events-box-none"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
      <View className="align-self-center items-center -mb-4 z-50 pointer-events-auto">
        <Pressable
          onPress={onPressAdd}
          accessibilityLabel="Add New Transaction"
          className="flex-row items-center gap-2 bg-emerald-500 px-5 py-3 rounded-full shadow-xl shadow-emerald-500/30 border-2 border-slate-950 active:scale-95">
          <Ionicons name="add-circle" size={22} color="#042F2E" />
          <Text className="text-slate-950 text-sm font-bold tracking-wide">
            Add Transaction
          </Text>
        </Pressable>
      </View>

      <View className="bg-slate-900/95 border border-slate-800/90 rounded-3xl shadow-2xl shadow-black/80 flex-row justify-around items-center h-16 px-2 relative pt-2">
        <TabItem
          tabKey="home"
          label="Home"
          iconActive="home"
          iconInactive="home-outline"
          activeTab={activeTab}
          onSelect={handleTabPress}
        />
        <TabItem
          tabKey="transactions"
          label="Activity"
          iconActive="receipt"
          iconInactive="receipt-outline"
          activeTab={activeTab}
          onSelect={handleTabPress}
        />
        <View className="w-10" />
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





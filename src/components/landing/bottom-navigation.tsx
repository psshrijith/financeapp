import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
      
      {/* Primary Floating Action Pill ("+ Add Transaction") */}
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

      {/* Floating Island Navigation Bar */}
      <View className="bg-slate-900/95 border border-slate-800/90 rounded-3xl shadow-2xl shadow-black/80 flex-row justify-around items-center h-16 px-2 relative pt-2">
        {/* Home Tab */}
        <Pressable
          onPress={() => handleTabPress('home')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'home' ? 'bg-emerald-500/15' : ''
            }`}>
            <Ionicons
              name={activeTab === 'home' ? 'home' : 'home-outline'}
              size={19}
              color={activeTab === 'home' ? '#34D399' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'home'
                  ? 'font-bold text-emerald-400'
                  : 'font-medium text-slate-400'
              }`}>
              Home
            </Text>
          </View>
        </Pressable>

        {/* Transactions Tab */}
        <Pressable
          onPress={() => handleTabPress('transactions')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'transactions' ? 'bg-emerald-500/15' : ''
            }`}>
            <Ionicons
              name={
                activeTab === 'transactions'
                  ? 'receipt'
                  : 'receipt-outline'
              }
              size={19}
              color={activeTab === 'transactions' ? '#34D399' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'transactions'
                  ? 'font-bold text-emerald-400'
                  : 'font-medium text-slate-400'
              }`}>
              Activity
            </Text>
          </View>
        </Pressable>

        {/* Spacer for Floating Pill alignment */}
        <View className="w-10" />

        {/* Net Worth Tab */}
        <Pressable
          onPress={() => handleTabPress('networth')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'networth' ? 'bg-emerald-500/15' : ''
            }`}>
            <Ionicons
              name={
                activeTab === 'networth'
                  ? 'trending-up'
                  : 'trending-up-outline'
              }
              size={19}
              color={activeTab === 'networth' ? '#34D399' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'networth'
                  ? 'font-bold text-emerald-400'
                  : 'font-medium text-slate-400'
              }`}>
              Net worth
            </Text>
          </View>
        </Pressable>

        {/* More / Settings Tab */}
        <Pressable
          onPress={() => handleTabPress('more')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'more' ? 'bg-emerald-500/15' : ''
            }`}>
            <Ionicons
              name={
                activeTab === 'more'
                  ? 'settings'
                  : 'settings-outline'
              }
              size={19}
              color={activeTab === 'more' ? '#34D399' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'more'
                  ? 'font-bold text-emerald-400'
                  : 'font-medium text-slate-400'
              }`}>
              More
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}




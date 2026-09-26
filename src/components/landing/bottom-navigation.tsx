import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabType = 'home' | 'transactions' | 'goals' | 'more';

interface BottomNavigationProps {
  onPressAdd?: () => void;
}

export function BottomNavigation({ onPressAdd }: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <View
      className="absolute bottom-0 left-0 right-0 z-40 px-4 pointer-events-box-none"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
      
      {/* Primary Floating Action Pill ("+ Add Transaction") */}
      <View className="align-self-center items-center -mb-4 z-50 pointer-events-auto">
        <Pressable
          onPress={onPressAdd}
          accessibilityLabel="Add New Transaction"
          className="flex-row items-center gap-2 bg-indigo-600 px-5 py-3 rounded-full shadow-xl shadow-indigo-600/60 border-2 border-slate-950 active:scale-95">
          <Ionicons name="add-circle" size={22} color="#FFFFFF" />
          <Text className="text-white text-sm font-extrabold tracking-wide">
            Add Transaction
          </Text>
        </Pressable>
      </View>

      {/* Floating Island Navigation Bar */}
      <View className="bg-slate-900/95 border border-slate-800/90 rounded-3xl shadow-2xl shadow-black/80 flex-row justify-around items-center h-16 px-2 relative pt-2">
        {/* Home Tab */}
        <Pressable
          onPress={() => setActiveTab('home')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'home' ? 'bg-indigo-500/15' : ''
            }`}>
            <Ionicons
              name={activeTab === 'home' ? 'home' : 'home-outline'}
              size={19}
              color={activeTab === 'home' ? '#818CF8' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'home'
                  ? 'font-bold text-indigo-400'
                  : 'font-medium text-slate-400'
              }`}>
              Home
            </Text>
          </View>
        </Pressable>

        {/* Transactions Tab */}
        <Pressable
          onPress={() => setActiveTab('transactions')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'transactions' ? 'bg-indigo-500/15' : ''
            }`}>
            <Ionicons
              name={
                activeTab === 'transactions'
                  ? 'receipt'
                  : 'receipt-outline'
              }
              size={19}
              color={activeTab === 'transactions' ? '#818CF8' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'transactions'
                  ? 'font-bold text-indigo-400'
                  : 'font-medium text-slate-400'
              }`}>
              Activity
            </Text>
          </View>
        </Pressable>

        {/* Spacer for Floating Pill alignment */}
        <View className="w-10" />

        {/* Goals Tab */}
        <Pressable
          onPress={() => setActiveTab('goals')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'goals' ? 'bg-indigo-500/15' : ''
            }`}>
            <Ionicons
              name={
                activeTab === 'goals'
                  ? 'compass'
                  : 'compass-outline'
              }
              size={19}
              color={activeTab === 'goals' ? '#818CF8' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'goals'
                  ? 'font-bold text-indigo-400'
                  : 'font-medium text-slate-400'
              }`}>
              Goals
            </Text>
          </View>
        </Pressable>

        {/* More Tab */}
        <Pressable
          onPress={() => setActiveTab('more')}
          className="flex-1 items-center justify-center h-full active:opacity-80">
          <View
            className={`items-center justify-center px-3 py-1 rounded-full ${
              activeTab === 'more' ? 'bg-indigo-500/15' : ''
            }`}>
            <Ionicons
              name={
                activeTab === 'more'
                  ? 'grid'
                  : 'grid-outline'
              }
              size={19}
              color={activeTab === 'more' ? '#818CF8' : '#64748B'}
            />
            <Text
              className={`text-[10px] mt-0.5 ${
                activeTab === 'more'
                  ? 'font-bold text-indigo-400'
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

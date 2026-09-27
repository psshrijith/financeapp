import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PeriodDropdownModal } from './period-dropdown-modal';

export const MONTHS = [
  'All',
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const YEARS = ['All', '2026', '2025', '2024', '2023'];

interface PeriodSelectorProps {
  selectedYear: string;
  onSelectYear: (year: string) => void;
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
}

export function PeriodSelector({
  selectedYear,
  onSelectYear,
  selectedMonth,
  onSelectMonth,
}: PeriodSelectorProps) {
  const [activeModal, setActiveModal] = useState<'year' | 'month' | null>(null);

  return (
    <View className="mb-6 flex-row gap-3">
      {/* Year Dropdown Trigger */}
      <Pressable
        onPress={() => setActiveModal('year')}
        className="flex-1 bg-slate-900/90 border border-slate-800/90 p-3.5 rounded-2xl flex-row justify-between items-center active:opacity-80">
        <View className="flex-row items-center gap-2">
          <Ionicons name="calendar-outline" size={18} color="#34D399" />
          <View>
            <Text className="text-[10px] uppercase font-bold text-slate-400">Year</Text>
            <Text className="text-[14px] font-bold text-white mt-0.5">
              {selectedYear === 'All' ? 'All Years' : selectedYear}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={16} color="#94A3B8" />
      </Pressable>

      {/* Month Dropdown Trigger */}
      <Pressable
        onPress={() => setActiveModal('month')}
        className="flex-1 bg-slate-900/90 border border-slate-800/90 p-3.5 rounded-2xl flex-row justify-between items-center active:opacity-80">
        <View className="flex-row items-center gap-2">
          <Ionicons name="time-outline" size={18} color="#60A5FA" />
          <View>
            <Text className="text-[10px] uppercase font-bold text-slate-400">Month</Text>
            <Text className="text-[14px] font-bold text-white mt-0.5">
              {selectedMonth === 'All' ? 'All Months' : selectedMonth}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={16} color="#94A3B8" />
      </Pressable>

      {/* Modals */}
      <PeriodDropdownModal
        visible={activeModal === 'year'}
        title="Year"
        options={YEARS}
        selectedValue={selectedYear}
        onSelect={onSelectYear}
        onClose={() => setActiveModal(null)}
      />

      <PeriodDropdownModal
        visible={activeModal === 'month'}
        title="Month"
        options={MONTHS}
        selectedValue={selectedMonth}
        onSelect={onSelectMonth}
        onClose={() => setActiveModal(null)}
      />
    </View>
  );
}

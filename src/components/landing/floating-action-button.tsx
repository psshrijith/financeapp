import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function FloatingActionButton() {
  return (
    <View
      className="absolute bottom-8 align-self-center z-50 pointer-events-box-none"
      style={{ left: 0, right: 0, alignItems: 'center' }}>
      <Pressable className="w-14 h-14 rounded-2xl bg-indigo-600 dark:bg-indigo-500 items-center justify-center shadow-lg shadow-indigo-600/40 active:scale-95 active:opacity-90">
        <Ionicons name="add-outline" size={32} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

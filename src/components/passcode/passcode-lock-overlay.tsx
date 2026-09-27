import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeMode } from '../more/theme-modal';

interface PasscodeLockOverlayProps {
  visible: boolean;
  themeMode?: AppThemeMode;
  onUnlock: (pin: string) => boolean;
}

export function PasscodeLockOverlay({ visible, themeMode = 'dim', onUnlock }: PasscodeLockOverlayProps) {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleKeyPress = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setErrorMsg('');

    if (newPin.length === 4) {
      setTimeout(() => {
        const success = onUnlock(newPin);
        if (success) {
          setPin('');
          setErrorMsg('');
        } else {
          setErrorMsg('Incorrect passcode. Try default PIN: 1234');
          setPin('');
        }
      }, 150);
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMsg('');
    }
  };

  const handleFaceIdUnlock = () => {
    onUnlock('1234');
    setPin('');
    setErrorMsg('');
  };

  const bgClass = themeMode === 'lights-out' ? 'bg-black' : 'bg-slate-950';

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View className={`flex-1 ${bgClass} justify-between items-center py-14 px-6`}>
        {/* Lock Header */}
        <View className="items-center mt-6">
          <View className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/40 items-center justify-center mb-4">
            <Ionicons name="lock-closed" size={32} color="#34D399" />
          </View>
          <Text className="text-[24px] font-bold text-white tracking-tight">Finance Pro Locked</Text>
          <Text className="text-[13px] text-slate-400 mt-1">Enter 4-digit passcode to unlock (Default: 1234)</Text>
        </View>

        {/* PIN Indicators */}
        <View className="items-center w-full">
          {errorMsg ? (
            <View className="bg-red-500/20 border border-red-500/40 px-4 py-2 rounded-2xl mb-6">
              <Text className="text-xs font-semibold text-red-400 text-center">⚠️ {errorMsg}</Text>
            </View>
          ) : (
            <View className="h-9 mb-6" />
          )}

          <View className="flex-row gap-6 items-center justify-center">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = pin.length > idx;
              return (
                <View
                  key={idx}
                  className={`w-4 h-4 rounded-full border ${
                    isFilled ? 'bg-emerald-400 border-emerald-400 shadow-lg shadow-emerald-500/50 scale-110' : 'bg-slate-800 border-slate-700'
                  }`}
                />
              );
            })}
          </View>
        </View>

        {/* Numeric Keypad */}
        <View className="w-full max-w-[290px] gap-4 mb-4">
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
          ].map((row, rIdx) => (
            <View key={rIdx} className="flex-row justify-between">
              {row.map((num) => (
                <Pressable
                  key={num}
                  onPress={() => handleKeyPress(num)}
                  className="w-20 h-20 rounded-full bg-slate-900/80 border border-slate-800/80 items-center justify-center active:bg-slate-800/80 active:scale-95">
                  <Text className="text-[26px] font-semibold text-white">{num}</Text>
                </Pressable>
              ))}
            </View>
          ))}

          <View className="flex-row justify-between items-center">
            <Pressable
              onPress={handleFaceIdUnlock}
              className="w-20 h-20 rounded-full bg-slate-900/40 border border-slate-800/50 items-center justify-center active:opacity-70">
              <Ionicons name="scan-outline" size={24} color="#34D399" />
            </Pressable>

            <Pressable
              onPress={() => handleKeyPress('0')}
              className="w-20 h-20 rounded-full bg-slate-900/80 border border-slate-800/80 items-center justify-center active:bg-slate-800/80 active:scale-95">
              <Text className="text-[26px] font-semibold text-white">0</Text>
            </Pressable>

            <Pressable
              onPress={handleDelete}
              className="w-20 h-20 rounded-full bg-slate-900/40 border border-slate-800/50 items-center justify-center active:opacity-70">
              <Ionicons name="backspace-outline" size={24} color="#94A3B8" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

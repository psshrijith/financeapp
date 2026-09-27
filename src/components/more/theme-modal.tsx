import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type AppThemeMode = 'dim' | 'lights-out';

interface ThemeModalProps {
  visible: boolean;
  activeTheme: AppThemeMode;
  onClose: () => void;
  onSelectTheme: (theme: AppThemeMode) => void;
}

export function ThemeModal({
  visible,
  activeTheme,
  onClose,
  onSelectTheme,
}: ThemeModalProps) {
  const options: { id: AppThemeMode; title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap; bgPreview: string }[] = [
    {
      id: 'dim',
      title: 'Dim (Slate Dark)',
      subtitle: 'Deep slate & navy undertones — easy on the eyes',
      icon: 'moon-outline',
      bgPreview: 'bg-slate-900 border-slate-700',
    },
    {
      id: 'lights-out',
      title: 'Lights Out (Complete Dark)',
      subtitle: 'Pitch black #000000 OLED theme — X / Twitter style',
      icon: 'sparkles-outline',
      bgPreview: 'bg-black border-zinc-800',
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-center items-center px-4 bg-black/80" onPress={onClose}>
        <Pressable className="w-full max-w-[360px] bg-[#0E131F] border border-slate-800 rounded-3xl p-5 shadow-2xl" onPress={(e) => e.stopPropagation()}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[18px] font-bold text-white tracking-tight">App Theme</Text>
            <Pressable onPress={onClose} className="w-7 h-7 rounded-full bg-slate-800/60 items-center justify-center active:opacity-70">
              <Ionicons name="close" size={16} color="#94A3B8" />
            </Pressable>
          </View>

          <Text className="text-[13px] text-slate-400 font-normal mb-5">
            Choose your preferred dark mode aesthetic.
          </Text>

          <View className="gap-3 mb-2">
            {options.map((opt) => {
              const isSelected = activeTheme === opt.id;
              return (
                <Pressable
                  key={opt.id}
                  onPress={() => {
                    onSelectTheme(opt.id);
                    onClose();
                  }}
                  className={`flex-row items-center justify-between p-4 rounded-2xl border ${
                    isSelected ? 'bg-emerald-500/15 border-emerald-500/50' : 'bg-slate-900/60 border-slate-800/60'
                  }`}>
                  <View className="flex-row items-center gap-3.5 flex-1 pr-2">
                    <View className={`w-10 h-10 rounded-xl items-center justify-center border ${opt.bgPreview}`}>
                      <Ionicons name={opt.icon} size={20} color={isSelected ? '#34D399' : '#94A3B8'} />
                    </View>
                    <View className="flex-1">
                      <Text className={`text-[15px] font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {opt.title}
                      </Text>
                      <Text className="text-[12px] text-slate-400 mt-0.5 leading-tight">{opt.subtitle}</Text>
                    </View>
                  </View>

                  {isSelected && (
                    <View className="w-6 h-6 rounded-full bg-emerald-500 items-center justify-center">
                      <Ionicons name="checkmark" size={14} color="#090D16" />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

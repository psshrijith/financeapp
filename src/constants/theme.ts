/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0D1B2A',
    background: '#F4F6F9',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E2E8F0',
    textSecondary: '#64748B',
    primary: '#1E56A0',
    primaryLight: '#E8F1FF',
    income: '#10B981',
    incomeBg: '#E6F4EA',
    expense: '#EF4444',
    expenseBg: '#FCE8E6',
    cardBackground: '#162447',
    cardText: '#FFFFFF',
    border: '#E2E8F0',
    accent: '#3B82F6',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    backgroundElement: '#1E293B',
    backgroundSelected: '#334155',
    textSecondary: '#94A3B8',
    primary: '#3B82F6',
    primaryLight: '#1E293B',
    income: '#34D399',
    incomeBg: '#064E3B',
    expense: '#F87171',
    expenseBg: '#7F1D1D',
    cardBackground: '#1E293B',
    cardText: '#FFFFFF',
    border: '#334155',
    accent: '#60A5FA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

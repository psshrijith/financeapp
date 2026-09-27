import React from 'react';
import { View, Text } from 'react-native';
import { AccountItem, AccountType } from '@/types/finance';

interface NetWorthInsightsProps {
  userAccounts: AccountItem[];
  assetsSum: number;
}

const TYPE_CONFIG: Record<AccountType, { label: string; emoji: string; color: string }> = {
  bank: { label: 'Bank Account', emoji: '🏦', color: '#60A5FA' },
  cash: { label: 'Cash / Wallet', emoji: '💵', color: '#34D399' },
  investment: { label: 'Mutual Funds / FD', emoji: '📈', color: '#F59E0B' },
  emergency: { label: 'Emergency Fund', emoji: '🛡️', color: '#A78BFA' },
  liability: { label: 'Loans / Liabilities', emoji: '💳', color: '#F87171' },
};

export function NetWorthInsights({ userAccounts, assetsSum }: NetWorthInsightsProps) {
  if (userAccounts.length === 0 || assetsSum <= 0) return null;

  const typeMap: Record<string, { label: string; emoji: string; color: string; amount: number }> = {};

  userAccounts.forEach((acc) => {
    if (acc.amount > 0) {
      const cfg = TYPE_CONFIG[acc.type] || { label: acc.categoryName || 'Other', emoji: acc.emoji || '📦', color: '#34D399' };
      if (!typeMap[acc.type]) {
        typeMap[acc.type] = { label: cfg.label, emoji: cfg.emoji, color: cfg.color, amount: 0 };
      }
      typeMap[acc.type].amount += acc.amount;
    }
  });

  const typeContributions = Object.values(typeMap).map((t) => ({
    ...t,
    pct: assetsSum > 0 ? Math.round((t.amount / assetsSum) * 100) : 0,
  })).sort((a, b) => b.amount - a.amount);

  const liquidAssets = (typeMap['bank']?.amount || 0) + (typeMap['cash']?.amount || 0);
  const liquidPct = assetsSum > 0 ? Math.round((liquidAssets / assetsSum) * 100) : 0;

  return (
    <View className="mb-8 gap-4">
      {/* 1. Asset Type Contribution Graph */}
      <View className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4">
        <Text className="text-[15px] font-bold text-white mb-1">Asset Contribution Graph</Text>
        <Text className="text-[12px] text-slate-400 mb-3">Percentage contribution by account type</Text>

        {/* Multi-colored Segmented Bar */}
        <View className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex-row mb-4">
          {typeContributions.map((t) => (
            <View
              key={t.label}
              style={{ width: `${t.pct}%`, backgroundColor: t.color }}
              className="h-full"
            />
          ))}
        </View>

        {/* Breakdown Legend by Type */}
        <View className="gap-2.5">
          {typeContributions.map((t) => (
            <View key={t.label} className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                <Text className="text-base">{t.emoji}</Text>
                <Text className="text-[13px] font-semibold text-white">{t.label}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-[13px] font-bold text-white">₹{t.amount.toLocaleString('en-IN')}</Text>
                <Text className="text-[12px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {t.pct}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 2. Key Insights Summary */}
      <View className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4">
        <Text className="text-[14px] font-semibold text-white mb-3">💡 Financial Insights</Text>
        <View className="gap-2.5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-slate-400">Liquid Accessibility Ratio</Text>
            <Text className="text-xs font-bold text-emerald-400">{liquidPct}% in Cash/Bank</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-slate-400">Active Accounts</Text>
            <Text className="text-xs font-bold text-white">{userAccounts.length} Total Accounts</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

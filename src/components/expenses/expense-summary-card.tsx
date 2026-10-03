import { View, Text, Pressable } from 'react-native';

interface ExpenseSummaryCardProps {
  totalExpenses: number;
  totalIncome: number;
  transactionCount: number;
  month: string;
  year: string;
  monthlyBudget?: number;
  onSetMonthlyBudget?: () => void;
}

export function ExpenseSummaryCard({
  totalExpenses,
  totalIncome,
  transactionCount,
  month,
  year,
  monthlyBudget = 50000,
  onSetMonthlyBudget,
}: ExpenseSummaryCardProps) {
  const displayTitle = `${month !== 'All' ? month : ''} ${year !== 'All' ? year : 'Total Period'}`.trim();

  const isOverBudget = totalExpenses > monthlyBudget;
  const pctUsed = monthlyBudget > 0 ? Math.min(100, Math.round((totalExpenses / monthlyBudget) * 100)) : 0;
  const remaining = monthlyBudget - totalExpenses;

  return (
    <View className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl mb-6">
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-[12px] uppercase font-semibold text-slate-400 mb-1">
            {displayTitle} Expenses
          </Text>
          <Text className="text-[34px] font-extrabold text-amber-400 tracking-tight">
            ₹{totalExpenses.toLocaleString('en-IN')}
          </Text>
        </View>

        <Pressable onPress={onSetMonthlyBudget} className="items-end active:opacity-70 bg-slate-800/60 px-3 py-2 rounded-2xl border border-slate-700/60">
          <Text className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Monthly Budget</Text>
          <Text className="text-[16px] font-bold text-emerald-400">₹{monthlyBudget.toLocaleString('en-IN')}</Text>
          <Text className="text-[10px] font-semibold text-slate-400 mt-0.5">Edit ✎</Text>
        </Pressable>
      </View>

      {/* Budget Progress Bar */}
      <View className="mt-2 mb-3">
        <View className="flex-row justify-between items-center mb-1.5">
          <Text className="text-[12px] font-medium text-slate-300">
            {pctUsed}% of budget spent
          </Text>
          <Text className={`text-[12px] font-semibold ${isOverBudget ? 'text-red-400' : 'text-emerald-400'}`}>
            {isOverBudget ? `Over by ₹${Math.abs(remaining).toLocaleString('en-IN')}` : `₹${remaining.toLocaleString('en-IN')} left`}
          </Text>
        </View>
        <View className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <View
            style={{ width: `${pctUsed}%` }}
            className={`h-full rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-emerald-400'}`}
          />
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-3 border-t border-slate-800/60">
        <Text className="text-[13px] text-slate-400 font-medium">
          {transactionCount} transactions
        </Text>
        <Text className="text-[13px] text-emerald-400 font-medium">
          Income: ₹{totalIncome.toLocaleString('en-IN')}
        </Text>
      </View>
    </View>
  );
}

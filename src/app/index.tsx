import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { Transaction } from '@/types/finance';
import { styles } from '@/styles/home.styles';

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 14.99,
    date: 'Today, 2:45 PM',
    type: 'expense',
    icon: 'film-outline',
    iconBg: '#FEE2E2',
  },
  {
    id: '2',
    title: 'Acme Corp Salary',
    category: 'Income',
    amount: 3500.0,
    date: 'Yesterday, 9:00 AM',
    type: 'income',
    icon: 'wallet-outline',
    iconBg: '#D1FAE5',
  },
  {
    id: '3',
    title: 'Starbucks Coffee',
    category: 'Food & Dining',
    amount: 6.5,
    date: 'Sep 24, 10:15 AM',
    type: 'expense',
    icon: 'cafe-outline',
    iconBg: '#FEF3C7',
  },
  {
    id: '4',
    title: 'Whole Foods Market',
    category: 'Groceries',
    amount: 84.2,
    date: 'Sep 23, 6:30 PM',
    type: 'expense',
    icon: 'cart-outline',
    iconBg: '#E0E7FF',
  },
  {
    id: '5',
    title: 'Freelance Design Project',
    category: 'Income',
    amount: 750.0,
    date: 'Sep 21, 4:20 PM',
    type: 'income',
    icon: 'code-slash-outline',
    iconBg: '#D1FAE5',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [showBalance, setShowBalance] = useState(true);

  const containerPadding = {
    paddingTop: safeAreaInsets.top + Spacing.two,
    paddingBottom: safeAreaInsets.bottom + BottomTabInset + Spacing.four,
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.contentContainer, containerPadding]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainWrapper}>
        {/* Header / Greeting */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.greetingText, { color: theme.textSecondary }]}>
              Good morning 👋
            </Text>
            <Text style={[styles.userNameText, { color: theme.text }]}>
              Alex Johnson
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <Pressable
              style={({ pressed }) => [
                styles.iconButton,
                { backgroundColor: theme.backgroundElement },
                pressed && styles.pressed,
              ]}>
              <Ionicons name="notifications-outline" size={22} color={theme.text} />
              <View style={[styles.notificationBadge, { backgroundColor: theme.expense }]} />
            </Pressable>
            <View style={[styles.avatarChip, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarText}>AJ</Text>
            </View>
          </View>
        </View>

        {/* Total Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardSubtitle}>Total Balance</Text>
              <View style={styles.accountBadge}>
                <Text style={styles.accountBadgeText}>Primary • **** 4829</Text>
              </View>
            </View>
            <Pressable
              onPress={() => setShowBalance(!showBalance)}
              style={({ pressed }) => pressed && styles.pressed}>
              <Ionicons
                name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#94A3B8"
              />
            </Pressable>
          </View>

          <Text style={styles.balanceAmount}>
            {showBalance ? '$24,850.50' : '••••••••'}
          </Text>

          <View style={styles.cardDivider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Ionicons name="arrow-down-outline" size={14} color="#34D399" />
              </View>
              <View>
                <Text style={styles.statLabel}>Income</Text>
                <Text style={[styles.statValue, { color: '#34D399' }]}>
                  +$4,250.00
                </Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={[styles.statIconBadge, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                <Ionicons name="arrow-up-outline" size={14} color="#F87171" />
              </View>
              <View>
                <Text style={styles.statLabel}>Expenses</Text>
                <Text style={[styles.statValue, { color: '#F87171' }]}>
                  -$1,820.30
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.quickActionsContainer}>
          <Pressable style={styles.actionItem}>
            <View style={[styles.actionCircle, { backgroundColor: theme.primary }]}>
              <Ionicons name="paper-plane-outline" size={22} color="#FFFFFF" />
            </View>
            <Text style={[styles.actionLabel, { color: theme.text }]}>Send</Text>
          </Pressable>

          <Pressable style={styles.actionItem}>
            <View style={[styles.actionCircle, { backgroundColor: theme.backgroundElement }]}>
              <Ionicons name="add-circle-outline" size={22} color={theme.text} />
            </View>
            <Text style={[styles.actionLabel, { color: theme.text }]}>Receive</Text>
          </Pressable>

          <Pressable style={styles.actionItem}>
            <View style={[styles.actionCircle, { backgroundColor: theme.backgroundElement }]}>
              <Ionicons name="pie-chart-outline" size={22} color={theme.text} />
            </View>
            <Text style={[styles.actionLabel, { color: theme.text }]}>Analytics</Text>
          </Pressable>

          <Pressable style={styles.actionItem}>
            <View style={[styles.actionCircle, { backgroundColor: theme.backgroundElement }]}>
              <Ionicons name="card-outline" size={22} color={theme.text} />
            </View>
            <Text style={[styles.actionLabel, { color: theme.text }]}>Cards</Text>
          </Pressable>
        </View>

        {/* Monthly Budget Progress Card */}
        <View style={[styles.budgetCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.budgetHeader}>
            <View style={styles.budgetTitleGroup}>
              <Ionicons name="compass-outline" size={20} color={theme.primary} />
              <Text style={[styles.budgetTitle, { color: theme.text }]}>Monthly Budget</Text>
            </View>
            <View style={[styles.statusTag, { backgroundColor: theme.incomeBg }]}>
              <Text style={[styles.statusTagText, { color: theme.income }]}>On Track</Text>
            </View>
          </View>

          <View style={styles.progressTextRow}>
            <Text style={[styles.spentText, { color: theme.text }]}>
              $1,820.30 <Text style={{ color: theme.textSecondary, fontWeight: '400' }}>spent</Text>
            </Text>
            <Text style={[styles.limitText, { color: theme.textSecondary }]}>
              of $2,500.00
            </Text>
          </View>

          <View style={[styles.progressBarTrack, { backgroundColor: theme.backgroundSelected }]}>
            <View
              style={[
                styles.progressBarFill,
                { width: '72.8%', backgroundColor: theme.primary },
              ]}
            />
          </View>
        </View>

        {/* Recent Transactions Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Transactions
          </Text>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
          </Pressable>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {SAMPLE_TRANSACTIONS.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <View
                key={tx.id}
                style={[
                  styles.transactionRow,
                  { backgroundColor: theme.backgroundElement },
                ]}>
                <View style={[styles.txIconContainer, { backgroundColor: tx.iconBg }]}>
                  <Ionicons name={tx.icon} size={20} color="#1E293B" />
                </View>

                <View style={styles.txDetails}>
                  <Text style={[styles.txTitle, { color: theme.text }]} numberOfLines={1}>
                    {tx.title}
                  </Text>
                  <Text style={[styles.txSubtitle, { color: theme.textSecondary }]}>
                    {tx.category} • {tx.date}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.txAmount,
                    { color: isIncome ? theme.income : theme.text },
                  ]}>
                  {isIncome ? '+' : '-'}${tx.amount.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

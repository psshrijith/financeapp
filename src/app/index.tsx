import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
}

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

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
  },
  mainWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  avatarChip: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  balanceCard: {
    borderRadius: 24,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  accountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  accountBadgeText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginVertical: Spacing.three,
    letterSpacing: 0.5,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: Spacing.three,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  statIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 1,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.one,
  },
  actionItem: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  actionCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  budgetCard: {
    borderRadius: 20,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  budgetTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  spentText: {
    fontSize: 16,
    fontWeight: '700',
  },
  limitText: {
    fontSize: 12,
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsList: {
    gap: Spacing.two,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 18,
    gap: Spacing.three,
  },
  txIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txDetails: {
    flex: 1,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  txSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});

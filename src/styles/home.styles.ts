import { StyleSheet } from 'react-native';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Star,
  MapPin,
  Car,
  Ticket,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Shield,
  CreditCard,
  Bell,
  Globe,
} from 'lucide-react-native';
import { Avatar, Card, Badge, Divider } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '@/constants/theme';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress: () => void;
  danger?: boolean;
}

function MenuItem({ icon, label, value, onPress, danger }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>
          {label}
        </Text>
        {value && <Text style={styles.menuValue}>{value}</Text>}
      </View>
      <ChevronRight size={20} color={COLORS.gray400} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Chiqish',
      'Hisobingizdan chiqmoqchimisiz?',
      [
        { text: 'Bekor qilish', style: 'cancel' },
        {
          text: 'Chiqish',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  if (!isAuthenticated || !user) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.notLoggedIn}>
          <Text style={styles.notLoggedInTitle}>Tizimga kiring</Text>
          <Text style={styles.notLoggedInText}>
            Profilni ko'rish uchun tizimga kiring
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginButtonText}>Kirish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarSection}>
          <Avatar source={user.avatar} name={user.name} size="xl" />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/profile/edit')}
          >
            <Edit size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userPhone}>{user.phone}</Text>
        
        {user.isVerified && (
          <Badge variant="success" style={styles.verifiedBadge}>
            Tasdiqlangan
          </Badge>
        )}

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Star size={20} color={COLORS.warning} fill={COLORS.warning} />
            <Text style={styles.statValue}>{user.rating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Reyting</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Car size={20} color={COLORS.primary} />
            <Text style={styles.statValue}>{user.ridesCount}</Text>
            <Text style={styles.statLabel}>Safarlar</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Shield size={20} color={COLORS.secondary} />
            <Text style={styles.statValue}>
              {new Date(user.memberSince).getFullYear()}
            </Text>
            <Text style={styles.statLabel}>dan beri</Text>
          </View>
        </View>
      </View>

      {/* Menu Sections */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Safarlar</Text>
        <Card style={styles.menuCard} padding="sm">
          <MenuItem
            icon={<Ticket size={20} color={COLORS.primary} />}
            label="Chiptalarim"
            onPress={() => router.push('/tickets')}
          />
          <MenuItem
            icon={<Car size={20} color={COLORS.primary} />}
            label="Safarlarim"
            onPress={() => router.push('/my-rides')}
          />
          <MenuItem
            icon={<MapPin size={20} color={COLORS.primary} />}
            label="Saqlangan manzillar"
            onPress={() => router.push('/profile/addresses')}
          />
        </Card>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Sozlamalar</Text>
        <Card style={styles.menuCard} padding="sm">
          <MenuItem
            icon={<Bell size={20} color={COLORS.gray600} />}
            label="Bildirishnomalar"
            onPress={() => router.push('/settings/notifications')}
          />
          <MenuItem
            icon={<Globe size={20} color={COLORS.gray600} />}
            label="Til"
            value="O'zbekcha"
            onPress={() => router.push('/settings/language')}
          />
          <MenuItem
            icon={<Settings size={20} color={COLORS.gray600} />}
            label="Sozlamalar"
            onPress={() => router.push('/settings')}
          />
        </Card>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Yordam</Text>
        <Card style={styles.menuCard} padding="sm">
          <MenuItem
            icon={<HelpCircle size={20} color={COLORS.gray600} />}
            label="Yordam markazi"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Shield size={20} color={COLORS.gray600} />}
            label="Maxfiylik siyosati"
            onPress={() => {}}
          />
        </Card>
      </View>

      <View style={styles.menuSection}>
        <Card style={styles.menuCard} padding="sm">
          <MenuItem
            icon={<LogOut size={20} color={COLORS.error} />}
            label="Chiqish"
            onPress={handleLogout}
            danger
          />
        </Card>
      </View>

      <Text style={styles.version}>Versiya 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  scrollContent: {
    paddingBottom: SPACING['4xl'],
  },
  notLoggedIn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING['3xl'],
  },
  notLoggedInTitle: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  notLoggedInText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING['3xl'],
    borderRadius: BORDER_RADIUS.lg,
  },
  loginButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: SPACING['2xl'],
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: BORDER_RADIUS['2xl'],
    borderBottomRightRadius: BORDER_RADIUS['2xl'],
  },
  avatarSection: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  userPhone: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  verifiedBadge: {
    marginBottom: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginTop: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  menuSection: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  menuCard: {},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuIconDanger: {
    backgroundColor: COLORS.errorLight,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  menuLabelDanger: {
    color: COLORS.error,
  },
  menuValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  version: {
    textAlign: 'center',
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
    marginTop: SPACING['2xl'],
  },
});

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MapPin,
  Bell,
  ChevronRight,
  Car,
  Users,
  TrendingUp,
} from 'lucide-react-native';
import { Avatar, Card, Badge, FadeIn, SlideIn, ScalePress } from '@/components/ui';
import { RideCard } from '@/components/RideCard';
import { useAuthStore } from '@/stores/authStore';
import { useRidesStore } from '@/stores/ridesStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '@/constants/theme';
import { popularCities } from '@/shared/data/mock';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, role, setRole, isAuthenticated } = useAuthStore();
  const { rides, fetchRides, isLoading } = useRidesStore();

  const isDriver = role === 'driver';

  useEffect(() => {
    fetchRides();
  }, []);

  const handleRoleToggle = () => {
    setRole(isDriver ? 'passenger' : 'driver');
  };

  const recentRides = rides.slice(0, 3);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: SPACING['4xl'] }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={fetchRides}
          colors={[COLORS.primary]}
        />
      }
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={styles.avatarContainer}
          >
            <Avatar
              source={user?.avatar}
              name={user?.name || 'Foydalanuvchi'}
              size="md"
            />
          </TouchableOpacity>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Salom,</Text>
            <Text style={styles.userName}>{user?.name || 'Mehmon'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={COLORS.text} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Role Switcher */}
      <FadeIn delay={100}>
      <View style={styles.roleSwitcher}>
        <TouchableOpacity
          onPress={() => setRole('passenger')}
          style={[
            styles.roleButton,
            !isDriver && styles.roleButtonActive,
          ]}
        >
          <Users size={20} color={!isDriver ? COLORS.white : COLORS.gray600} />
          <Text
            style={[
              styles.roleButtonText,
              !isDriver && styles.roleButtonTextActive,
            ]}
          >
            Yo'lovchi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRole('driver')}
          style={[
            styles.roleButton,
            isDriver && styles.roleButtonActive,
          ]}
        >
          <Car size={20} color={isDriver ? COLORS.white : COLORS.gray600} />
          <Text
            style={[
              styles.roleButtonText,
              isDriver && styles.roleButtonTextActive,
            ]}
          >
            Haydovchi
          </Text>
        </TouchableOpacity>
      </View>
      </FadeIn>

      {/* Quick Action Card */}
      <SlideIn delay={200} direction="up">
      <ScalePress onPress={() => isDriver ? router.push('/create') : router.push('/search')}>
      <Card style={styles.actionCard}>
        <View style={styles.actionContent}>
          <View style={styles.actionIcon}>
            {isDriver ? (
              <Car size={28} color={COLORS.primary} />
            ) : (
              <MapPin size={28} color={COLORS.primary} />
            )}
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>
              {isDriver ? "Yangi e'lon yaratish" : 'Safar qidirish'}
            </Text>
            <Text style={styles.actionSubtitle}>
              {isDriver
                ? 'Yo\'lovchilar bilan bog\'laning'
                : 'Eng yaxshi narxlar bilan sayohat qiling'}
            </Text>
          </View>
          <ChevronRight size={24} color={COLORS.gray400} />
        </View>
      </Card>
      </ScalePress>
      </SlideIn>

      {/* Popular Routes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mashhur yo'nalishlar</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.routesContainer}
        >
          {[
            { from: 'Toshkent', to: 'Samarqand' },
            { from: 'Toshkent', to: 'Buxoro' },
            { from: 'Toshkent', to: 'Fargona' },
            { from: 'Samarqand', to: 'Buxoro' },
          ].map((route, index) => (
            <TouchableOpacity
              key={index}
              style={styles.routeCard}
              onPress={() => router.push({
                pathname: '/search',
                params: { from: route.from, to: route.to },
              })}
            >
              <View style={styles.routeIcon}>
                <TrendingUp size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.routeFrom}>{route.from}</Text>
              <ChevronRight size={14} color={COLORS.gray400} />
              <Text style={styles.routeTo}>{route.to}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Rides */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>So'nggi e'lonlar</Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Text style={styles.seeAllText}>Barchasini ko'rish</Text>
          </TouchableOpacity>
        </View>
        {recentRides.map(ride => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </View>

      {/* Stats Card (for driver) */}
      {isDriver && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sizning statistikangiz</Text>
          <Card style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user?.ridesCount || 0}</Text>
                <Text style={styles.statLabel}>Safarlar</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user?.rating?.toFixed(1) || '0.0'}</Text>
                <Text style={styles.statLabel}>Reyting</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Sharhlar</Text>
              </View>
            </View>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatarContainer: {},
  greeting: {},
  greetingText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  notificationButton: {
    padding: SPACING.sm,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  roleSwitcher: {
    flexDirection: 'row',
    margin: SPACING.lg,
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xs,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  roleButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.gray600,
  },
  roleButtonTextActive: {
    color: COLORS.white,
  },
  actionCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  actionSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  seeAllText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: SPACING.md,
  },
  routesContainer: {
    paddingRight: SPACING.lg,
    gap: SPACING.sm,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.sm,
    ...SHADOW.sm,
  },
  routeIcon: {
    marginRight: SPACING.sm,
  },
  routeFrom: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  routeTo: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  statsCard: {
    padding: SPACING.xl,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZE['3xl'],
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
});

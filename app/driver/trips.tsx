import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { Card, Badge } from '@/components/ui';
import { EmptyState } from '@/components/EmptyState';
import { useRidesStore } from '@/stores/ridesStore';
import { formatPrice, formatDate, formatTime } from '@/utils/format';
import type { Ride } from '@/shared/types';

const statusLabels: Record<string, string> = {
  active: 'Faol',
  completed: 'Tugallangan',
  cancelled: 'Bekor qilingan',
};

const statusColors: Record<string, 'success' | 'warning' | 'destructive' | 'default'> = {
  active: 'success',
  completed: 'default',
  cancelled: 'destructive',
};

export default function DriverTripsScreen() {
  const { driverRides, fetchDriverRides } = useRidesStore();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDriverRides();
    setRefreshing(false);
  };

  const filteredRides = driverRides.filter(ride => {
    if (filter === 'all') return true;
    if (filter === 'active') return ride.status === 'active';
    if (filter === 'completed') return ride.status === 'completed';
    return true;
  });

  const renderRide = ({ item }: { item: Ride }) => (
    <TouchableOpacity onPress={() => router.push(`/ride/${item.id}`)}>
      <Card style={styles.rideCard}>
        <View style={styles.rideHeader}>
          <View style={styles.dateTime}>
            <Text style={styles.date}>{formatDate(item.departureDate)}</Text>
            <Text style={styles.time}>{formatTime(item.departureDate)}</Text>
          </View>
          <Badge variant={statusColors[item.status] || 'default'}>
            {statusLabels[item.status] || item.status}
          </Badge>
        </View>

        <View style={styles.route}>
          <View style={styles.routePoint}>
            <View style={styles.dot} />
            <Text style={styles.cityName}>{item.from.city}</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routePoint}>
            <View style={[styles.dot, styles.dotEnd]} />
            <Text style={styles.cityName}>{item.to.city}</Text>
          </View>
        </View>

        <View style={styles.rideFooter}>
          <View style={styles.stat}>
            <Ionicons name="people-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.statText}>
              {item.bookedSeats}/{item.availableSeats} yo'lovchi
            </Text>
          </View>
          <Text style={styles.price}>{formatPrice(item.pricePerSeat)}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mening safarlarim</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.filters}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'Barchasi' : f === 'active' ? 'Faol' : 'Tugallangan'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredRides.length === 0 ? (
        <EmptyState
          icon="car-outline"
          title="Safarlar yo'q"
          description={filter === 'all' 
            ? "Hali e'lon joylashtirilmagan" 
            : `${filter === 'active' ? 'Faol' : 'Tugallangan'} safarlar yo'q`
          }
        />
      ) : (
        <FlatList
          data={filteredRides}
          renderItem={renderRide}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 32,
  },
  filters: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  filterButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.muted,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.background,
    fontWeight: '500',
  },
  list: {
    padding: Spacing.md,
  },
  rideCard: {
    padding: Spacing.md,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  dateTime: {
    gap: 2,
  },
  date: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.text,
  },
  time: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  route: {
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  dotEnd: {
    backgroundColor: Colors.success,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.border,
    marginLeft: 4,
  },
  cityName: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statText: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  price: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  separator: {
    height: Spacing.sm,
  },
});

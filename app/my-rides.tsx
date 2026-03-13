import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Car } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { RideCard } from '@/components/RideCard';
import { EmptyState } from '@/components/EmptyState';
import { Badge } from '@/components/ui';
import { useRidesStore } from '@/stores/ridesStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import type { Ride } from '@/shared/types';

type FilterType = 'all' | 'active' | 'completed' | 'cancelled';

export default function MyRidesScreen() {
  const insets = useSafeAreaInsets();
  const { myRides, fetchMyRides, isLoading } = useRidesStore();
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    fetchMyRides();
  }, []);

  const filteredRides = myRides.filter(ride => {
    if (filter === 'all') return true;
    return ride.status === filter;
  });

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Barchasi' },
    { value: 'active', label: 'Faol' },
    { value: 'completed', label: 'Tugallangan' },
    { value: 'cancelled', label: 'Bekor' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Safarlarim" />
      
      {/* Filters */}
      <View style={styles.filtersContainer}>
        {filters.map(f => (
          <TouchableOpacity
            key={f.value}
            style={[
              styles.filterButton,
              filter === f.value && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(f.value)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.value && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRides}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={fetchMyRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        ListEmptyComponent={
          <EmptyState
            icon={<Car size={48} color={COLORS.gray300} />}
            title="Safarlar yo'q"
            description="Siz hali hech qanday safar yaratmagansiz"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  filtersContainer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  filterButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray100,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: SPACING.lg,
    flexGrow: 1,
  },
});

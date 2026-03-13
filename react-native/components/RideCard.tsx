import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ChevronRight,
} from 'lucide-react-native';
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '@/constants/theme';
import type { Ride } from '@/shared/types';
import { format } from 'date-fns';

interface RideCardProps {
  ride: Ride;
  variant?: 'default' | 'compact';
}

export function RideCard({ ride, variant = 'default' }: RideCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/ride/${ride.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd MMM');
    } catch {
      return dateStr;
    }
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[styles.card, styles.cardCompact]}
      >
        <View style={styles.routeCompact}>
          <Text style={styles.cityCompact}>{ride.from.city}</Text>
          <ChevronRight size={16} color={COLORS.gray400} />
          <Text style={styles.cityCompact}>{ride.to.city}</Text>
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.dateCompact}>
            {formatDate(ride.date)} {ride.time}
          </Text>
          <Text style={styles.priceCompact}>{formatPrice(ride.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.card}
    >
      {/* Route Section */}
      <View style={styles.routeSection}>
        <View style={styles.routeVisual}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={[styles.dot, styles.dotDestination]} />
        </View>
        <View style={styles.routeDetails}>
          <View style={styles.routePoint}>
            <Text style={styles.city}>{ride.from.city}</Text>
            {ride.from.address && (
              <Text style={styles.address}>{ride.from.address}</Text>
            )}
          </View>
          <View style={styles.routePoint}>
            <Text style={styles.city}>{ride.to.city}</Text>
            {ride.to.address && (
              <Text style={styles.address}>{ride.to.address}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Time & Price Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Calendar size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{formatDate(ride.date)}</Text>
        </View>
        <View style={styles.infoItem}>
          <Clock size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{ride.time}</Text>
        </View>
        <View style={styles.infoItem}>
          <Users size={16} color={COLORS.gray500} />
          <Text style={styles.infoText}>{ride.availableSeats} joy</Text>
        </View>
      </View>

      {/* Driver & Price Section */}
      <View style={styles.bottomSection}>
        <View style={styles.driverInfo}>
          <Avatar source={ride.driver.avatar} name={ride.driver.name} size="sm" />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{ride.driver.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={12} color={COLORS.warning} fill={COLORS.warning} />
              <Text style={styles.rating}>{ride.driver.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(ride.price)}</Text>
          {ride.car && (
            <Text style={styles.carInfo}>
              {ride.car.brand} {ride.car.model}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOW.md,
  },
  cardCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  routeSection: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  routeVisual: {
    alignItems: 'center',
    marginRight: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  dotDestination: {
    backgroundColor: COLORS.secondary,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: SPACING.xs,
  },
  routeDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  routePoint: {
    marginBottom: SPACING.md,
  },
  city: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  address: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  infoSection: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.gray100,
    gap: SPACING.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  driverDetails: {
    gap: 2,
  },
  driverName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  carInfo: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  // Compact styles
  routeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  cityCompact: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  compactInfo: {
    alignItems: 'flex-end',
  },
  dateCompact: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  priceCompact: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

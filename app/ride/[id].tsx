import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  MessageCircle,
  Phone,
  Car,
  PawPrint,
  Cigarette,
  Music,
  Package,
  ChevronLeft,
  Share2,
} from 'lucide-react-native';
import { Button, Avatar, Badge, Card, BottomSheet } from '@/components/ui';
import { useRidesStore } from '@/stores/ridesStore';
import { useAuthStore } from '@/stores/authStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOW } from '@/constants/theme';
import { mockRides } from '@/shared/data/mock';
import { format } from 'date-fns';

export default function RideDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { bookRide, isLoading } = useRidesStore();
  const user = useAuthStore(state => state.user);

  const [showBooking, setShowBooking] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(1);

  // Find ride from mock data
  const ride = mockRides.find(r => r.id === id);

  if (!ride) {
    return (
      <View style={[styles.container, styles.notFound]}>
        <Text style={styles.notFoundText}>Safar topilmadi</Text>
        <Button onPress={() => router.back()}>Orqaga</Button>
      </View>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd MMMM yyyy');
    } catch {
      return dateStr;
    }
  };

  const handleBook = async () => {
    const success = await bookRide(ride.id, selectedSeats);
    if (success) {
      setShowBooking(false);
      Alert.alert(
        'Muvaffaqiyatli!',
        'Safar muvaffaqiyatli band qilindi. Haydovchi sizga xabar beradi.',
        [{ text: 'Yaxshi', onPress: () => router.back() }]
      );
    } else {
      Alert.alert('Xatolik', 'Band qilishda xatolik yuz berdi');
    }
  };

  const isOwnRide = ride.driver.id === user?.id;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safar tafsilotlari</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Share2 size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Route Card */}
        <Card style={styles.routeCard}>
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

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Calendar size={18} color={COLORS.gray500} />
              <Text style={styles.infoText}>{formatDate(ride.date)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={18} color={COLORS.gray500} />
              <Text style={styles.infoText}>{ride.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Users size={18} color={COLORS.gray500} />
              <Text style={styles.infoText}>{ride.availableSeats} joy bor</Text>
            </View>
          </View>
        </Card>

        {/* Price */}
        <Card style={styles.priceCard}>
          <Text style={styles.priceLabel}>1 kishi uchun narx</Text>
          <Text style={styles.price}>{formatPrice(ride.price)}</Text>
        </Card>

        {/* Driver */}
        <Card style={styles.driverCard}>
          <Text style={styles.sectionTitle}>Haydovchi</Text>
          <TouchableOpacity style={styles.driverInfo}>
            <Avatar source={ride.driver.avatar} name={ride.driver.name} size="lg" />
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{ride.driver.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                <Text style={styles.rating}>
                  {ride.driver.rating.toFixed(1)} ({ride.driver.ridesCount} safar)
                </Text>
              </View>
              {ride.driver.isVerified && (
                <Badge variant="success" size="sm">Tasdiqlangan</Badge>
              )}
            </View>
          </TouchableOpacity>

          {!isOwnRide && (
            <View style={styles.contactButtons}>
              <Button
                variant="outline"
                leftIcon={<MessageCircle size={18} color={COLORS.primary} />}
                onPress={() => router.push(`/chat/${ride.id}`)}
                style={styles.contactButton}
              >
                Xabar
              </Button>
              <Button
                variant="outline"
                leftIcon={<Phone size={18} color={COLORS.primary} />}
                style={styles.contactButton}
              >
                Qo'ng'iroq
              </Button>
            </View>
          )}
        </Card>

        {/* Car */}
        {ride.car && (
          <Card style={styles.carCard}>
            <Text style={styles.sectionTitle}>Mashina</Text>
            <View style={styles.carInfo}>
              <Car size={24} color={COLORS.primary} />
              <View style={styles.carDetails}>
                <Text style={styles.carName}>
                  {ride.car.brand} {ride.car.model}
                </Text>
                <Text style={styles.carMeta}>
                  {ride.car.color} • {ride.car.year} • {ride.car.plateNumber}
                </Text>
              </View>
            </View>
          </Card>
        )}

        {/* Options */}
        <Card style={styles.optionsCard}>
          <Text style={styles.sectionTitle}>Safar qoidalari</Text>
          <View style={styles.optionsList}>
            <View style={styles.optionItem}>
              <PawPrint
                size={20}
                color={ride.allowPets ? COLORS.primary : COLORS.gray400}
              />
              <Text
                style={[
                  styles.optionText,
                  !ride.allowPets && styles.optionTextDisabled,
                ]}
              >
                Uy hayvonlari {ride.allowPets ? 'ruxsat' : 'ruxsat emas'}
              </Text>
            </View>
            <View style={styles.optionItem}>
              <Cigarette
                size={20}
                color={ride.allowSmoking ? COLORS.primary : COLORS.gray400}
              />
              <Text
                style={[
                  styles.optionText,
                  !ride.allowSmoking && styles.optionTextDisabled,
                ]}
              >
                Chekish {ride.allowSmoking ? 'ruxsat' : 'ruxsat emas'}
              </Text>
            </View>
            <View style={styles.optionItem}>
              <Music
                size={20}
                color={ride.allowMusic ? COLORS.primary : COLORS.gray400}
              />
              <Text
                style={[
                  styles.optionText,
                  !ride.allowMusic && styles.optionTextDisabled,
                ]}
              >
                Musiqa {ride.allowMusic ? 'tinglash mumkin' : 'o\'chirilgan'}
              </Text>
            </View>
            {ride.maxLuggage && (
              <View style={styles.optionItem}>
                <Package size={20} color={COLORS.primary} />
                <Text style={styles.optionText}>
                  {ride.maxLuggage === 'small'
                    ? 'Kichik yuk'
                    : ride.maxLuggage === 'medium'
                    ? "O'rtacha yuk"
                    : 'Katta yuk'}{' '}
                  olish mumkin
                </Text>
              </View>
            )}
          </View>
        </Card>

        {/* Description */}
        {ride.description && (
          <Card style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Qo'shimcha ma'lumot</Text>
            <Text style={styles.description}>{ride.description}</Text>
          </Card>
        )}
      </ScrollView>

      {/* Bottom Action */}
      {!isOwnRide && (
        <View style={[styles.bottomAction, { paddingBottom: insets.bottom + SPACING.md }]}>
          <View style={styles.bottomPrice}>
            <Text style={styles.bottomPriceLabel}>Narx</Text>
            <Text style={styles.bottomPriceValue}>{formatPrice(ride.price)}</Text>
          </View>
          <Button
            onPress={() => setShowBooking(true)}
            style={styles.bookButton}
            disabled={ride.availableSeats === 0}
          >
            {ride.availableSeats > 0 ? 'Band qilish' : 'Joy qolmagan'}
          </Button>
        </View>
      )}

      {/* Booking Sheet */}
      <BottomSheet
        visible={showBooking}
        onClose={() => setShowBooking(false)}
        title="Safarni band qilish"
      >
        <View style={styles.bookingContent}>
          <Text style={styles.bookingLabel}>Nechta joy kerak?</Text>
          <View style={styles.seatsSelector}>
            {[1, 2, 3].map(num => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.seatOption,
                  selectedSeats === num && styles.seatOptionActive,
                  num > ride.availableSeats && styles.seatOptionDisabled,
                ]}
                onPress={() => num <= ride.availableSeats && setSelectedSeats(num)}
                disabled={num > ride.availableSeats}
              >
                <Text
                  style={[
                    styles.seatOptionText,
                    selectedSeats === num && styles.seatOptionTextActive,
                    num > ride.availableSeats && styles.seatOptionTextDisabled,
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.totalPrice}>
            <Text style={styles.totalLabel}>Jami narx</Text>
            <Text style={styles.totalValue}>
              {formatPrice(ride.price * selectedSeats)}
            </Text>
          </View>

          <Button
            onPress={handleBook}
            loading={isLoading}
            fullWidth
            size="lg"
          >
            Tasdiqlash
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  notFound: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING['3xl'],
  },
  notFoundText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  shareButton: {
    padding: SPACING.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  routeCard: {
    marginBottom: SPACING.md,
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
    width: 12,
    height: 12,
    borderRadius: 6,
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
  },
  routePoint: {
    marginBottom: SPACING.lg,
  },
  city: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    color: COLORS.text,
  },
  address: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  infoGrid: {
    flexDirection: 'row',
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
  priceCard: {
    marginBottom: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight + '20',
  },
  priceLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: FONT_SIZE['3xl'],
    fontWeight: '700',
    color: COLORS.primary,
  },
  driverCard: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  driverDetails: {
    flex: 1,
    gap: SPACING.xs,
  },
  driverName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  rating: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  contactButton: {
    flex: 1,
  },
  carCard: {
    marginBottom: SPACING.md,
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  carDetails: {
    flex: 1,
  },
  carName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  carMeta: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  optionsCard: {
    marginBottom: SPACING.md,
  },
  optionsList: {
    gap: SPACING.md,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  optionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  optionTextDisabled: {
    color: COLORS.gray400,
  },
  descriptionCard: {
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.lg,
  },
  bottomPrice: {},
  bottomPriceLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  bottomPriceValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bookButton: {
    flex: 1,
  },
  bookingContent: {},
  bookingLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  seatsSelector: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  seatOption: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 60,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatOptionActive: {
    backgroundColor: COLORS.primary,
  },
  seatOptionDisabled: {
    opacity: 0.5,
  },
  seatOptionText: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '600',
    color: COLORS.text,
  },
  seatOptionTextActive: {
    color: COLORS.white,
  },
  seatOptionTextDisabled: {
    color: COLORS.gray400,
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    color: COLORS.primary,
  },
});

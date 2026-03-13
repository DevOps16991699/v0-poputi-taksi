import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Car,
  PawPrint,
  Cigarette,
  Music,
  Package,
  ChevronRight,
  Check,
} from 'lucide-react-native';
import { Button, Input, Card, BottomSheet } from '@/components/ui';
import { Header } from '@/components/Header';
import { useRidesStore } from '@/stores/ridesStore';
import { useAuthStore } from '@/stores/authStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { popularCities, LUGGAGE_OPTIONS } from '@/shared/data/mock';
import type { Ride } from '@/shared/types';

export default function CreateRideScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { createRide, isLoading } = useRidesStore();
  const user = useAuthStore(state => state.user);

  // Form state
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState(3);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  // Options
  const [allowPets, setAllowPets] = useState(false);
  const [allowSmoking, setAllowSmoking] = useState(false);
  const [allowMusic, setAllowMusic] = useState(true);
  const [maxLuggage, setMaxLuggage] = useState<'small' | 'medium' | 'large'>('medium');

  // UI state
  const [showCityPicker, setShowCityPicker] = useState<'from' | 'to' | null>(null);
  const [step, setStep] = useState(1);

  const validateStep1 = () => {
    if (!from.trim()) {
      Alert.alert('Xatolik', 'Qayerdan ketishingizni tanlang');
      return false;
    }
    if (!to.trim()) {
      Alert.alert('Xatolik', 'Qayerga borishingizni tanlang');
      return false;
    }
    if (!date.trim()) {
      Alert.alert('Xatolik', 'Sanani kiriting');
      return false;
    }
    if (!time.trim()) {
      Alert.alert('Xatolik', 'Vaqtni kiriting');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!price.trim()) {
      Alert.alert('Xatolik', 'Narxni kiriting');
      return false;
    }
    const priceNum = parseInt(price);
    if (isNaN(priceNum) || priceNum < 10000) {
      Alert.alert('Xatolik', 'Narx kamida 10,000 so\'m bo\'lishi kerak');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    const rideData: Partial<Ride> = {
      from: { city: from },
      to: { city: to },
      date,
      time,
      seats,
      availableSeats: seats,
      price: parseInt(price),
      description,
      allowPets,
      allowSmoking,
      allowMusic,
      maxLuggage,
    };

    const newRide = await createRide(rideData);
    if (newRide) {
      Alert.alert(
        'Muvaffaqiyatli',
        'E\'loningiz joylashtirildi!',
        [
          {
            text: 'Yaxshi',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } else {
      Alert.alert('Xatolik', 'E\'lonni joylashtirish imkoni bo\'lmadi');
    }
  };

  const handleCitySelect = (city: string) => {
    if (showCityPicker === 'from') {
      setFrom(city);
    } else {
      setTo(city);
    }
    setShowCityPicker(null);
  };

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Yo'nalish va vaqt</Text>
      <Text style={styles.stepSubtitle}>Safar ma'lumotlarini kiriting</Text>

      <TouchableOpacity
        style={styles.selectInput}
        onPress={() => setShowCityPicker('from')}
      >
        <MapPin size={20} color={COLORS.primary} />
        <Text style={from ? styles.selectText : styles.selectPlaceholder}>
          {from || 'Qayerdan'}
        </Text>
        <ChevronRight size={20} color={COLORS.gray400} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.selectInput}
        onPress={() => setShowCityPicker('to')}
      >
        <MapPin size={20} color={COLORS.secondary} />
        <Text style={to ? styles.selectText : styles.selectPlaceholder}>
          {to || 'Qayerga'}
        </Text>
        <ChevronRight size={20} color={COLORS.gray400} />
      </TouchableOpacity>

      <Input
        label="Sana"
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
        leftIcon={<Calendar size={20} color={COLORS.gray400} />}
      />

      <Input
        label="Vaqt"
        placeholder="HH:MM"
        value={time}
        onChangeText={setTime}
        leftIcon={<Clock size={20} color={COLORS.gray400} />}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Narx va joylar</Text>
      <Text style={styles.stepSubtitle}>Yo'lovchilar uchun ma'lumotlar</Text>

      <View style={styles.seatsSelector}>
        <Text style={styles.inputLabel}>Bo'sh joylar soni</Text>
        <View style={styles.seatsControl}>
          <TouchableOpacity
            style={styles.seatsButton}
            onPress={() => setSeats(Math.max(1, seats - 1))}
          >
            <Text style={styles.seatsButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.seatsValue}>{seats}</Text>
          <TouchableOpacity
            style={styles.seatsButton}
            onPress={() => setSeats(Math.min(7, seats + 1))}
          >
            <Text style={styles.seatsButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Input
        label="Narx (1 kishi uchun)"
        placeholder="100000"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        leftIcon={<DollarSign size={20} color={COLORS.gray400} />}
      />

      <Input
        label="Qo'shimcha ma'lumot"
        placeholder="Masalan: Konditsioner bor, ertalab ketamiz..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Qo'shimcha imkoniyatlar</Text>
      <Text style={styles.stepSubtitle}>Safar qoidalarini belgilang</Text>

      <View style={styles.optionsList}>
        <View style={styles.optionItem}>
          <View style={styles.optionLeft}>
            <PawPrint size={24} color={COLORS.gray600} />
            <Text style={styles.optionLabel}>Uy hayvonlari</Text>
          </View>
          <Switch
            value={allowPets}
            onValueChange={setAllowPets}
            trackColor={{ false: COLORS.gray200, true: COLORS.primaryLight }}
            thumbColor={allowPets ? COLORS.primary : COLORS.gray400}
          />
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionLeft}>
            <Cigarette size={24} color={COLORS.gray600} />
            <Text style={styles.optionLabel}>Chekish</Text>
          </View>
          <Switch
            value={allowSmoking}
            onValueChange={setAllowSmoking}
            trackColor={{ false: COLORS.gray200, true: COLORS.primaryLight }}
            thumbColor={allowSmoking ? COLORS.primary : COLORS.gray400}
          />
        </View>

        <View style={styles.optionItem}>
          <View style={styles.optionLeft}>
            <Music size={24} color={COLORS.gray600} />
            <Text style={styles.optionLabel}>Musiqa</Text>
          </View>
          <Switch
            value={allowMusic}
            onValueChange={setAllowMusic}
            trackColor={{ false: COLORS.gray200, true: COLORS.primaryLight }}
            thumbColor={allowMusic ? COLORS.primary : COLORS.gray400}
          />
        </View>
      </View>

      <Text style={styles.inputLabel}>Yuk hajmi</Text>
      <View style={styles.luggageOptions}>
        {(['small', 'medium', 'large'] as const).map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.luggageOption,
              maxLuggage === option && styles.luggageOptionActive,
            ]}
            onPress={() => setMaxLuggage(option)}
          >
            <Package
              size={20}
              color={maxLuggage === option ? COLORS.white : COLORS.gray600}
            />
            <Text
              style={[
                styles.luggageOptionText,
                maxLuggage === option && styles.luggageOptionTextActive,
              ]}
            >
              {option === 'small' ? 'Kichik' : option === 'medium' ? "O'rtacha" : 'Katta'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Xulosa</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Yo'nalish</Text>
          <Text style={styles.summaryValue}>{from} - {to}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sana va vaqt</Text>
          <Text style={styles.summaryValue}>{date}, {time}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Joylar</Text>
          <Text style={styles.summaryValue}>{seats} ta</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Narx</Text>
          <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
            {parseInt(price || '0').toLocaleString()} so'm
          </Text>
        </View>
      </Card>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="E'lon yaratish"
        showBack={step > 1}
        leftAction={
          step === 1 ? (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancelText}>Bekor</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      {/* Progress */}
      <View style={styles.progress}>
        {[1, 2, 3].map(s => (
          <View
            key={s}
            style={[
              styles.progressStep,
              s <= step && styles.progressStepActive,
            ]}
          />
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>

      {/* Actions */}
      <View style={[styles.actions, { paddingBottom: insets.bottom + SPACING.md }]}>
        {step > 1 && (
          <Button variant="outline" onPress={handleBack} style={styles.backBtn}>
            Orqaga
          </Button>
        )}
        <Button
          onPress={step === 3 ? handleSubmit : handleNext}
          loading={isLoading}
          style={styles.nextBtn}
        >
          {step === 3 ? "E'lon joylash" : 'Davom etish'}
        </Button>
      </View>

      {/* City Picker */}
      <BottomSheet
        visible={showCityPicker !== null}
        onClose={() => setShowCityPicker(null)}
        title={showCityPicker === 'from' ? 'Qayerdan' : 'Qayerga'}
        scrollable
      >
        {popularCities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cityItem}
            onPress={() => handleCitySelect(city)}
          >
            <MapPin size={20} color={COLORS.gray500} />
            <Text style={styles.cityName}>{city}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cancelText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  progress: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray200,
  },
  progressStepActive: {
    backgroundColor: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.xl,
  },
  stepContent: {},
  stepTitle: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  stepSubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING['2xl'],
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  selectText: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  selectPlaceholder: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray400,
  },
  inputLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  seatsSelector: {
    marginBottom: SPACING.lg,
  },
  seatsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    gap: SPACING.xl,
  },
  seatsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  seatsButtonText: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '600',
    color: COLORS.text,
  },
  seatsValue: {
    fontSize: FONT_SIZE['3xl'],
    fontWeight: '700',
    color: COLORS.primary,
    minWidth: 50,
    textAlign: 'center',
  },
  optionsList: {
    marginBottom: SPACING.xl,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  optionLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  luggageOptions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  luggageOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray100,
  },
  luggageOptionActive: {
    backgroundColor: COLORS.primary,
  },
  luggageOptionText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  luggageOptionTextActive: {
    color: COLORS.white,
  },
  summaryCard: {
    backgroundColor: COLORS.gray50,
  },
  summaryTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.text,
  },
  actions: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    flex: 1,
  },
  nextBtn: {
    flex: 2,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  cityName: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
});

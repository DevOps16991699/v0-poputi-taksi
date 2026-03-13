import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { Button, Card, Badge } from '@/components/ui';
import { EmptyState } from '@/components/EmptyState';
import { mockCars } from '@/shared/data/mock';
import type { Car } from '@/shared/types';

export default function MyCarsScreen() {
  const [cars, setCars] = useState<Car[]>(mockCars);

  const handleDeleteCar = (carId: string) => {
    Alert.alert(
      "Mashinani o'chirish",
      "Rostdan ham bu mashinani o'chirmoqchimisiz?",
      [
        { text: 'Bekor qilish', style: 'cancel' },
        {
          text: "O'chirish",
          style: 'destructive',
          onPress: () => {
            setCars(cars.filter(car => car.id !== carId));
          },
        },
      ]
    );
  };

  const handleSetPrimary = (carId: string) => {
    setCars(cars.map(car => ({
      ...car,
      isPrimary: car.id === carId,
    })));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mening mashinalarim</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cars.length === 0 ? (
          <EmptyState
            icon="car-outline"
            title="Mashinalar yo'q"
            description="Mashina qo'shish uchun + tugmasini bosing"
          />
        ) : (
          <View style={styles.carsList}>
            {cars.map((car) => (
              <Card key={car.id} style={styles.carCard}>
                <View style={styles.carHeader}>
                  <View style={styles.carIcon}>
                    <Ionicons name="car" size={24} color={Colors.primary} />
                  </View>
                  <View style={styles.carInfo}>
                    <View style={styles.carNameRow}>
                      <Text style={styles.carName}>
                        {car.brand} {car.model}
                      </Text>
                      {car.isPrimary && (
                        <Badge variant="success" size="small">Asosiy</Badge>
                      )}
                    </View>
                    <Text style={styles.carDetails}>
                      {car.year} • {car.color}
                    </Text>
                    <Text style={styles.carPlate}>{car.plateNumber}</Text>
                  </View>
                </View>

                <View style={styles.carActions}>
                  {!car.isPrimary && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleSetPrimary(car.id)}
                    >
                      <Ionicons name="star-outline" size={18} color={Colors.primary} />
                      <Text style={styles.actionText}>Asosiy qilish</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => router.push(`/profile/edit-car/${car.id}`)}
                  >
                    <Ionicons name="pencil-outline" size={18} color={Colors.textMuted} />
                    <Text style={[styles.actionText, { color: Colors.textMuted }]}>
                      Tahrirlash
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteCar(car.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color={Colors.destructive} />
                    <Text style={[styles.actionText, { color: Colors.destructive }]}>
                      O'chirish
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        <View style={styles.addCarSection}>
          <Button
            title="Yangi mashina qo'shish"
            variant="outline"
            icon={<Ionicons name="add-circle-outline" size={20} color={Colors.primary} />}
            onPress={() => router.push('/profile/add-car')}
          />
        </View>
      </ScrollView>
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
  addButton: {
    padding: Spacing.xs,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  carsList: {
    gap: Spacing.md,
  },
  carCard: {
    padding: Spacing.md,
  },
  carHeader: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  carIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carInfo: {
    flex: 1,
  },
  carNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  carName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  carDetails: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  carPlate: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  carActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
  },
  addCarSection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
});

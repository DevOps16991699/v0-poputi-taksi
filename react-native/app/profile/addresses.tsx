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
import { Button, Card } from '@/components/ui';
import { EmptyState } from '@/components/EmptyState';
import { mockAddresses } from '@/shared/data/mock';
import type { SavedAddress } from '@/shared/types';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home',
  work: 'briefcase',
  other: 'location',
};

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(mockAddresses);

  const handleDeleteAddress = (addressId: string) => {
    Alert.alert(
      "Manzilni o'chirish",
      "Rostdan ham bu manzilni o'chirmoqchimisiz?",
      [
        { text: 'Bekor qilish', style: 'cancel' },
        {
          text: "O'chirish",
          style: 'destructive',
          onPress: () => {
            setAddresses(addresses.filter(addr => addr.id !== addressId));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saqlangan manzillar</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {addresses.length === 0 ? (
          <EmptyState
            icon="location-outline"
            title="Manzillar yo'q"
            description="Tez-tez ishlatiladigan manzillarni saqlang"
          />
        ) : (
          <View style={styles.addressList}>
            {addresses.map((address) => (
              <Card key={address.id} style={styles.addressCard}>
                <View style={styles.addressContent}>
                  <View style={[
                    styles.iconContainer,
                    address.type === 'home' && styles.homeIcon,
                    address.type === 'work' && styles.workIcon,
                  ]}>
                    <Ionicons
                      name={iconMap[address.type] || 'location'}
                      size={20}
                      color={
                        address.type === 'home'
                          ? Colors.primary
                          : address.type === 'work'
                          ? Colors.warning
                          : Colors.textMuted
                      }
                    />
                  </View>
                  <View style={styles.addressInfo}>
                    <Text style={styles.addressLabel}>{address.label}</Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                      {address.address}
                    </Text>
                  </View>
                  <View style={styles.addressActions}>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => {}}
                    >
                      <Ionicons name="pencil" size={18} color={Colors.textMuted} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => handleDeleteAddress(address.id)}
                    >
                      <Ionicons name="trash" size={18} color={Colors.destructive} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        <View style={styles.addSection}>
          <Button
            title="Yangi manzil qo'shish"
            variant="outline"
            icon={<Ionicons name="add-circle-outline" size={20} color={Colors.primary} />}
            onPress={() => {}}
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
  addressList: {
    gap: Spacing.sm,
  },
  addressCard: {
    padding: Spacing.md,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    backgroundColor: Colors.primaryLight,
  },
  workIcon: {
    backgroundColor: '#FEF3C7',
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  addressText: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  addressActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionBtn: {
    padding: Spacing.xs,
  },
  addSection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
});

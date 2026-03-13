import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import { Card } from '@/components/ui';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsSettingsScreen() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'push',
      label: 'Push bildirishnomalar',
      description: 'Yangi xabarlar va safar yangilanishlari',
      enabled: true,
    },
    {
      id: 'messages',
      label: 'Xabarlar',
      description: 'Yangi xabar kelganda xabar berish',
      enabled: true,
    },
    {
      id: 'rides',
      label: 'Safar yangilanishlari',
      description: 'Band qilish va bekor qilish haqida',
      enabled: true,
    },
    {
      id: 'promo',
      label: 'Aksiyalar va takliflar',
      description: 'Maxsus takliflar va chegirmalar',
      enabled: false,
    },
    {
      id: 'reminders',
      label: 'Eslatmalar',
      description: 'Safar boshlanishidan oldin eslatish',
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirishnomalar</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Bildirishnoma sozlamalari</Text>
        <Card style={styles.card}>
          {settings.map((setting, index) => (
            <View
              key={setting.id}
              style={[
                styles.option,
                index < settings.length - 1 && styles.optionBorder,
              ]}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionLabel}>{setting.label}</Text>
                <Text style={styles.optionDescription}>{setting.description}</Text>
              </View>
              <Switch
                value={setting.enabled}
                onValueChange={() => toggleSetting(setting.id)}
                trackColor={{ false: Colors.muted, true: Colors.primaryLight }}
                thumbColor={setting.enabled ? Colors.primary : Colors.textMuted}
              />
            </View>
          ))}
        </Card>

        <Text style={styles.hint}>
          Bildirishnomalarni to'liq o'chirish uchun qurilma sozlamalaridan 
          ilovaning ruxsatlarini boshqaring.
        </Text>
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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  optionLabel: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  optionDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  hint: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: Spacing.md,
    lineHeight: 20,
  },
});

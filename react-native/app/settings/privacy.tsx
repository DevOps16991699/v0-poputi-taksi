import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import { Card, Button } from '@/components/ui';

export default function PrivacySettingsScreen() {
  const [settings, setSettings] = useState({
    showPhone: true,
    showRating: true,
    showReviews: true,
    shareLocation: true,
    analytics: false,
  });

  const handleDeleteAccount = () => {
    Alert.alert(
      "Hisobni o'chirish",
      "Rostdan ham hisobingizni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.",
      [
        { text: 'Bekor qilish', style: 'cancel' },
        {
          text: "O'chirish",
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
          },
        },
      ]
    );
  };

  const handleDownloadData = () => {
    Alert.alert(
      "Ma'lumotlarni yuklab olish",
      "Sizning barcha ma'lumotlaringiz tayyorlanmoqda. Email orqali xabar beramiz.",
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Maxfiylik</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Profil ko'rinishi</Text>
        <Card style={styles.card}>
          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionLabel}>Telefon raqamni ko'rsatish</Text>
              <Text style={styles.optionDescription}>
                Boshqa foydalanuvchilar raqamingizni ko'radi
              </Text>
            </View>
            <Switch
              value={settings.showPhone}
              onValueChange={(value) => setSettings({ ...settings, showPhone: value })}
              trackColor={{ false: Colors.muted, true: Colors.primaryLight }}
              thumbColor={settings.showPhone ? Colors.primary : Colors.textMuted}
            />
          </View>
          <View style={[styles.option, styles.optionBorder]}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionLabel}>Reytingni ko'rsatish</Text>
            </View>
            <Switch
              value={settings.showRating}
              onValueChange={(value) => setSettings({ ...settings, showRating: value })}
              trackColor={{ false: Colors.muted, true: Colors.primaryLight }}
              thumbColor={settings.showRating ? Colors.primary : Colors.textMuted}
            />
          </View>
          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionLabel}>Sharhlarni ko'rsatish</Text>
            </View>
            <Switch
              value={settings.showReviews}
              onValueChange={(value) => setSettings({ ...settings, showReviews: value })}
              trackColor={{ false: Colors.muted, true: Colors.primaryLight }}
              thumbColor={settings.showReviews ? Colors.primary : Colors.textMuted}
            />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Joylashuv</Text>
        <Card style={styles.card}>
          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionLabel}>Joylashuvni ulashish</Text>
              <Text style={styles.optionDescription}>
                Safar davomida haydovchi/yo'lovchi bilan
              </Text>
            </View>
            <Switch
              value={settings.shareLocation}
              onValueChange={(value) => setSettings({ ...settings, shareLocation: value })}
              trackColor={{ false: Colors.muted, true: Colors.primaryLight }}
              thumbColor={settings.shareLocation ? Colors.primary : Colors.textMuted}
            />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Ma'lumotlar</Text>
        <Card style={styles.card}>
          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionLabel}>Analitika ma'lumotlari</Text>
              <Text style={styles.optionDescription}>
                Ilovani yaxshilash uchun anonim ma'lumotlar
              </Text>
            </View>
            <Switch
              value={settings.analytics}
              onValueChange={(value) => setSettings({ ...settings, analytics: value })}
              trackColor={{ false: Colors.muted, true: Colors.primaryLight }}
              thumbColor={settings.analytics ? Colors.primary : Colors.textMuted}
            />
          </View>
        </Card>

        <View style={styles.actionsSection}>
          <Button
            title="Ma'lumotlarni yuklab olish"
            variant="outline"
            onPress={handleDownloadData}
            icon={<Ionicons name="download-outline" size={20} color={Colors.primary} />}
          />

          <Button
            title="Hisobni o'chirish"
            variant="ghost"
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
            icon={<Ionicons name="trash-outline" size={20} color={Colors.destructive} />}
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
    marginTop: Spacing.md,
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
    borderTopWidth: 1,
    borderTopColor: Colors.border,
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
  actionsSection: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  deleteButton: {
    borderColor: Colors.destructive,
  },
  deleteButtonText: {
    color: Colors.destructive,
  },
});

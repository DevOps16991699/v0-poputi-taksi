import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { Card } from '@/components/ui';

type ThemeOption = 'light' | 'dark' | 'system';

export default function AppearanceSettingsScreen() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('system');

  const themes: { value: ThemeOption; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { value: 'light', label: 'Yorug', icon: 'sunny' },
    { value: 'dark', label: 'Qorong\'i', icon: 'moon' },
    { value: 'system', label: 'Tizim sozlamasi', icon: 'phone-portrait' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ko'rinish</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Mavzu</Text>
        <Card style={styles.card}>
          {themes.map((theme, index) => (
            <TouchableOpacity
              key={theme.value}
              style={[
                styles.option,
                index < themes.length - 1 && styles.optionBorder,
              ]}
              onPress={() => setSelectedTheme(theme.value)}
            >
              <View style={styles.optionLeft}>
                <Ionicons name={theme.icon} size={22} color={Colors.textSecondary} />
                <Text style={styles.optionLabel}>{theme.label}</Text>
              </View>
              {selectedTheme === theme.value && (
                <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </Card>

        <Text style={styles.hint}>
          "Tizim sozlamasi" tanlaganda ilova qurilmangiz sozlamalariga qarab 
          avtomatik ravishda yorug' yoki qorong'i mavzuni tanlaydi.
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  optionLabel: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  hint: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: Spacing.md,
    lineHeight: 20,
  },
});
